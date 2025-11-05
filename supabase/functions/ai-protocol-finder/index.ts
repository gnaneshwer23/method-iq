import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userId } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('AI Protocol Finder request:', { query, userId });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Call Lovable AI for protocol recommendations
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert research assistant specializing in laboratory protocols and experimental methods across all scientific disciplines including biology, chemistry, physics, materials science, and clinical research.

When a researcher asks for a protocol or method, you should:
1. Understand the research goal and context
2. Recommend 3-5 relevant protocols with clear titles
3. For each protocol, provide:
   - A concise summary (2-3 sentences)
   - Estimated duration in minutes
   - Estimated cost (as a number, approximate USD)
   - Required equipment (be specific, as array of strings)
   - Success rate estimate (0-100 percentage)
   - Relevant tags (e.g., "molecular-biology", "protein-analysis", "high-throughput")
   - Key considerations or common pitfalls

Format your response as a JSON object with this exact structure:
{
  "protocols": [
    {
      "title": "string",
      "summary": "string",
      "estimated_duration_minutes": number,
      "estimated_cost": number,
      "equipment": ["string"],
      "tags": ["string"],
      "success_rate": number,
      "key_considerations": "string"
    }
  ]
}

Be precise, evidence-based, and cite general knowledge from scientific literature when relevant.`
          },
          {
            role: 'user',
            content: query
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires payment. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0]?.message?.content;
    
    if (!aiContent) {
      throw new Error('No content returned from AI');
    }

    console.log('AI response content:', aiContent);

    // Parse the JSON response from AI
    let parsedResponse;
    try {
      // Try to extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || aiContent.match(/```\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : aiContent;
      parsedResponse = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Failed to parse AI response as JSON');
    }

    // Save protocols to database if userId is provided
    if (userId && parsedResponse.protocols && Array.isArray(parsedResponse.protocols)) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const protocolsToInsert = parsedResponse.protocols.map((protocol: any) => ({
        title: protocol.title,
        summary: protocol.summary,
        estimated_duration_minutes: protocol.estimated_duration_minutes,
        estimated_cost: protocol.estimated_cost,
        tags: protocol.tags || [],
        success_rate: protocol.success_rate,
        created_by: userId,
        verified: false,
        detailed_steps: {
          ai_generated: true,
          key_considerations: protocol.key_considerations,
          equipment_needed: protocol.equipment
        }
      }));

      const { data: savedProtocols, error: saveError } = await supabase
        .from('protocols')
        .insert(protocolsToInsert)
        .select();

      if (saveError) {
        console.error('Error saving protocols:', saveError);
        // Don't fail the request if saving fails, just log it
      } else {
        console.log('Successfully saved protocols:', savedProtocols?.length);
        parsedResponse.saved_protocol_ids = savedProtocols?.map((p: any) => p.id);
      }
    }

    return new Response(
      JSON.stringify(parsedResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in ai-protocol-finder:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
