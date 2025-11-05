import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ModelUpdate {
  id: string;
  project_id: string;
  participant_id: string;
  round_number: number;
  model_weights_hash: string;
  model_weights_url: string | null;
  loss: number | null;
  accuracy: number | null;
  training_samples: number | null;
  privacy_metrics: any;
  submitted_at: string;
}

interface Participant {
  id: string;
  contribution_count: number;
  performance_metrics: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { projectId, roundNumber } = await req.json();

    if (!projectId || roundNumber === undefined) {
      return new Response(
        JSON.stringify({ error: 'projectId and roundNumber are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Aggregating models for project ${projectId}, round ${roundNumber}`);

    // Fetch the project details
    const { data: project, error: projectError } = await supabase
      .from('federated_learning_projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (projectError || !project) {
      throw new Error(`Project not found: ${projectError?.message}`);
    }

    // Fetch all model updates for this round
    const { data: modelUpdates, error: updatesError } = await supabase
      .from('federated_model_updates')
      .select('*')
      .eq('project_id', projectId)
      .eq('round_number', roundNumber);

    if (updatesError) {
      throw new Error(`Error fetching updates: ${updatesError.message}`);
    }

    if (!modelUpdates || modelUpdates.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No model updates found for this round' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch participant information for quality assessment including reputation
    const participantIds = modelUpdates.map((u: ModelUpdate) => u.participant_id);
    const { data: participants, error: participantsError } = await supabase
      .from('federated_learning_participants')
      .select('*')
      .in('id', participantIds);

    if (participantsError) {
      throw new Error(`Error fetching participants: ${participantsError.message}`);
    }

    // Use Lovable AI to analyze contribution quality and determine weights
    const analysisPrompt = `You are analyzing federated learning model updates to determine quality-based weights for aggregation.

Project: ${project.name}
Model Type: ${project.model_type}
Learning Objective: ${project.learning_objective}
Round: ${roundNumber}

Model Updates:
${modelUpdates.map((update: ModelUpdate, idx: number) => {
  const participant = participants?.find((p: Participant) => p.id === update.participant_id);
  return `
Update ${idx + 1}:
- Participant contributions: ${participant?.contribution_count || 0}
- Reputation score: ${participant?.reputation_score?.toFixed(1) || '50.0'}/100
- Quality score: ${participant?.quality_score?.toFixed(1) || '0.0'}
- Consistency score: ${participant?.consistency_score?.toFixed(1) || '0.0'}
- Impact score: ${participant?.impact_score?.toFixed(1) || '0.0'}
- Accuracy: ${update.accuracy?.toFixed(4) || 'N/A'}
- Loss: ${update.loss?.toFixed(4) || 'N/A'}
- Training samples: ${update.training_samples || 'N/A'}
- Privacy budget consumed: ${update.privacy_metrics?.epsilon_spent || 'N/A'}
`;
}).join('\n')}

Based on these metrics, assign a quality weight (0.0 to 1.0) to each update. Consider:
1. Reputation scores (higher reputation = higher weight baseline)
2. Model performance (accuracy and loss)
3. Number of training samples (more samples = more reliable)
4. Participant history and consistency
5. Privacy preservation (respecting privacy budget)

IMPORTANT: Participants with higher reputation scores should receive proportionally higher weights.
A participant with reputation 80 should get roughly 2x the weight of one with reputation 40, all else equal.

Return ONLY a JSON array of weights in order, normalized to sum to 1.0. Example: [0.3, 0.4, 0.3]`;

    console.log('Calling Lovable AI for quality analysis...');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a federated learning aggregation specialist. Analyze model updates and return quality weights as a JSON array.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Lovable AI error:', aiResponse.status, errorText);
      throw new Error(`Lovable AI request failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;
    
    console.log('AI Response:', aiContent);

    // Extract weights from AI response
    let weights: number[];
    try {
      // Try to parse JSON array directly
      const jsonMatch = aiContent.match(/\[[\d\s,\.]+\]/);
      if (jsonMatch) {
        weights = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: equal weights
        console.warn('Could not parse AI weights, using equal weights');
        weights = modelUpdates.map(() => 1.0 / modelUpdates.length);
      }

      // Validate and normalize weights
      if (weights.length !== modelUpdates.length) {
        throw new Error('Weight count mismatch');
      }

      const sum = weights.reduce((a: number, b: number) => a + b, 0);
      weights = weights.map((w: number) => w / sum);
    } catch (error) {
      console.error('Error parsing weights:', error);
      weights = modelUpdates.map(() => 1.0 / modelUpdates.length);
    }

    // Perform weighted averaging (simulated - in production this would aggregate actual model weights)
    const aggregatedMetrics = {
      globalAccuracy: modelUpdates.reduce((sum: number, update: ModelUpdate, idx: number) => {
        return sum + (update.accuracy || 0) * weights[idx];
      }, 0),
      globalLoss: modelUpdates.reduce((sum: number, update: ModelUpdate, idx: number) => {
        return sum + (update.loss || 0) * weights[idx];
      }, 0),
      totalSamples: modelUpdates.reduce((sum: number, update: ModelUpdate) => {
        return sum + (update.training_samples || 0);
      }, 0),
    };

    // Generate aggregated model hash (in production, this would be the actual aggregated weights hash)
    const aggregatedHash = `aggregated_${projectId}_round_${roundNumber}_${Date.now()}`;

    // Store aggregated model
    const { data: aggregatedModel, error: aggregateError } = await supabase
      .from('federated_aggregated_models')
      .insert({
        project_id: projectId,
        round_number: roundNumber,
        model_weights_hash: aggregatedHash,
        participating_clients: modelUpdates.length,
        global_loss: aggregatedMetrics.globalLoss,
        global_accuracy: aggregatedMetrics.globalAccuracy,
        aggregation_metadata: {
          weights: weights,
          total_samples: aggregatedMetrics.totalSamples,
          updates_included: modelUpdates.length,
          aggregation_method: 'ai_weighted_averaging',
          ai_model: 'google/gemini-2.5-flash',
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (aggregateError) {
      throw new Error(`Error storing aggregated model: ${aggregateError.message}`);
    }

    // Update project round
    const { error: updateProjectError } = await supabase
      .from('federated_learning_projects')
      .update({ 
        current_round: roundNumber,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId);

    if (updateProjectError) {
      console.error('Error updating project round:', updateProjectError);
    }

    // Update participant contribution counts
    for (let i = 0; i < modelUpdates.length; i++) {
      const update = modelUpdates[i];
      const { error: updateParticipantError } = await supabase
        .from('federated_learning_participants')
        .update({
          contribution_count: supabase.rpc('increment', { x: 1 }),
          last_contribution_at: new Date().toISOString(),
          performance_metrics: {
            ...participants?.find((p: Participant) => p.id === update.participant_id)?.performance_metrics,
            [`round_${roundNumber}_weight`]: weights[i],
            [`round_${roundNumber}_accuracy`]: update.accuracy
          }
        })
        .eq('id', update.participant_id);

      if (updateParticipantError) {
        console.error(`Error updating participant ${update.participant_id}:`, updateParticipantError);
      }
    }

    console.log('Aggregation complete:', aggregatedModel);

    return new Response(
      JSON.stringify({
        success: true,
        aggregatedModel,
        weights,
        metrics: aggregatedMetrics,
        participatingClients: modelUpdates.length
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in aggregate-federated-model:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
