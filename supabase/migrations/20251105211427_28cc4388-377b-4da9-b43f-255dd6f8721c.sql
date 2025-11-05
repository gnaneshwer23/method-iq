-- Enable realtime for federated learning tables
ALTER TABLE federated_learning_projects REPLICA IDENTITY FULL;
ALTER TABLE federated_model_updates REPLICA IDENTITY FULL;
ALTER TABLE federated_aggregated_models REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE federated_learning_projects;
ALTER PUBLICATION supabase_realtime ADD TABLE federated_model_updates;
ALTER PUBLICATION supabase_realtime ADD TABLE federated_aggregated_models;