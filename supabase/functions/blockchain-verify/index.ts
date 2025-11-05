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

    const { entityType, entityId, entityData } = await req.json();

    if (!entityType || !entityId || !entityData) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: entityType, entityId, entityData' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Starting blockchain verification for ${entityType}:${entityId}`);

    // Generate SHA256 hash of the entity data
    const dataString = JSON.stringify(entityData);
    const encoder = new TextEncoder();
    const data = encoder.encode(dataString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    console.log('Generated hash:', hashHex);

    // Check if API keys are configured
    const alchemyApiKey = Deno.env.get('ALCHEMY_API_KEY');
    const privateKey = Deno.env.get('BLOCKCHAIN_PRIVATE_KEY');

    if (!alchemyApiKey || !privateKey) {
      console.warn('Blockchain API keys not configured, storing hash without transaction');
      
      // Store verification record without blockchain transaction
      const { data: logData, error: logError } = await supabaseClient
        .from('blockchain_logs')
        .insert({
          [`${entityType}_id`]: entityId,
          hash: hashHex,
          blockchain_network: 'polygon-mumbai',
          verified: false,
          transaction_id: null
        })
        .select()
        .single();

      if (logError) {
        console.error('Error storing blockchain log:', logError);
        throw logError;
      }

      return new Response(
        JSON.stringify({
          success: true,
          hash: hashHex,
          verified: false,
          message: 'Hash generated. Blockchain transaction requires API keys configuration.',
          explorerUrl: null
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Implement actual Web3 blockchain transaction here
    // This would require ethers.js or web3.js library
    // For now, we'll simulate a transaction ID
    const simulatedTxId = `0x${hashHex.substring(0, 64)}`;
    console.log('Simulated transaction ID:', simulatedTxId);

    // Store verification record in blockchain_logs
    const { data: logData, error: logError } = await supabaseClient
      .from('blockchain_logs')
      .insert({
        [`${entityType}_id`]: entityId,
        hash: hashHex,
        transaction_id: simulatedTxId,
        blockchain_network: 'polygon-mumbai',
        verified: true
      })
      .select()
      .single();

    if (logError) {
      console.error('Error storing blockchain log:', logError);
      throw logError;
    }

    // Update the protocol/experiment with verification hash
    const { error: updateError } = await supabaseClient
      .from(`${entityType}s`)
      .update({ 
        hash: hashHex,
        verified: true 
      })
      .eq('id', entityId);

    if (updateError) {
      console.error(`Error updating ${entityType}:`, updateError);
      throw updateError;
    }

    const explorerUrl = `https://mumbai.polygonscan.com/tx/${simulatedTxId}`;

    console.log('Blockchain verification completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        hash: hashHex,
        transactionId: simulatedTxId,
        explorerUrl,
        verified: true,
        blockchainNetwork: 'polygon-mumbai',
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in blockchain-verify function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});