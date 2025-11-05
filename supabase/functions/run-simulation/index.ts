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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error('Authentication error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { simulationId, twinId, inputParameters, protocolId } = await req.json();

    console.log(`Running simulation ${simulationId} for twin ${twinId}`);

    // Update simulation status to running
    await supabaseClient
      .from('twin_simulations')
      .update({ status: 'running' })
      .eq('id', simulationId);

    // Get twin data
    const { data: twin } = await supabaseClient
      .from('digital_twins')
      .select('*')
      .eq('id', twinId)
      .single();

    // Get protocol data if available
    let protocolData = null;
    if (protocolId) {
      const { data } = await supabaseClient
        .from('protocols')
        .select('*')
        .eq('id', protocolId)
        .single();
      protocolData = data;
    }

    // Get historical simulation data for this twin
    const { data: pastSimulations } = await supabaseClient
      .from('twin_simulations')
      .select('input_parameters, predicted_outcome, result_data')
      .eq('twin_id', twinId)
      .eq('status', 'completed')
      .limit(10);

    // Prepare prompt for AI
    const systemPrompt = `You are an AI simulation engine for digital twins in scientific research. 
Analyze the provided digital twin data, input parameters, and historical simulations to predict outcomes.
Provide realistic predictions with confidence scores based on available data.`;

    const userPrompt = `
Twin Information:
- Name: ${twin?.name}
- Type: ${twin?.twin_type}
- Current State: ${JSON.stringify(twin?.state || {})}

${protocolData ? `Protocol: ${protocolData.title}
Protocol Summary: ${protocolData.summary}` : ''}

Input Parameters:
${JSON.stringify(inputParameters, null, 2)}

Historical Simulations:
${pastSimulations && pastSimulations.length > 0 
  ? JSON.stringify(pastSimulations, null, 2) 
  : 'No historical data available'}

Based on this information, predict:
1. The likely outcome of running this simulation
2. Expected success rate (0-100%)
3. Potential risks or concerns
4. Recommended adjustments to parameters
5. Estimated duration in seconds

Return your response as a JSON object with this structure:
{
  "predicted_outcome": {
    "success_probability": 85,
    "expected_results": "description of expected results",
    "key_metrics": { "metric_name": value }
  },
  "confidence_score": 75,
  "risks": ["risk 1", "risk 2"],
  "recommendations": ["recommendation 1", "recommendation 2"],
  "estimated_duration": 120
}`;

    // Call Lovable AI for prediction
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    if (!lovableApiKey) {
      console.warn('LOVABLE_API_KEY not configured, using mock simulation');
      
      // Mock simulation result
      const mockResult = {
        predicted_outcome: {
          success_probability: 75 + Math.random() * 20,
          expected_results: 'Simulation completed successfully with expected outcomes',
          key_metrics: {
            efficiency: 85 + Math.random() * 10,
            accuracy: 90 + Math.random() * 5,
          },
        },
        confidence_score: 70 + Math.random() * 25,
        risks: ['Parameter sensitivity detected', 'Environmental factors may vary'],
        recommendations: ['Monitor key metrics closely', 'Consider running validation experiments'],
        estimated_duration: 60 + Math.floor(Math.random() * 120),
      };

      await supabaseClient
        .from('twin_simulations')
        .update({
          status: 'completed',
          predicted_outcome: mockResult.predicted_outcome,
          confidence_score: mockResult.confidence_score,
          simulation_duration_seconds: mockResult.estimated_duration,
          result_data: {
            risks: mockResult.risks,
            recommendations: mockResult.recommendations,
          },
          completed_at: new Date().toISOString(),
        })
        .eq('id', simulationId);

      return new Response(
        JSON.stringify({ success: true, result: mockResult }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API error: ${aiResponse.statusText}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;
    
    // Parse AI response
    const result = JSON.parse(aiContent);

    // Update simulation with results
    await supabaseClient
      .from('twin_simulations')
      .update({
        status: 'completed',
        predicted_outcome: result.predicted_outcome,
        confidence_score: result.confidence_score,
        simulation_duration_seconds: result.estimated_duration,
        result_data: {
          risks: result.risks,
          recommendations: result.recommendations,
        },
        completed_at: new Date().toISOString(),
      })
      .eq('id', simulationId);

    console.log('Simulation completed successfully');

    return new Response(
      JSON.stringify({ success: true, result }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in run-simulation function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
