export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blockchain_logs: {
        Row: {
          blockchain_network: string | null
          created_at: string
          experiment_id: string | null
          hash: string
          id: string
          protocol_id: string | null
          transaction_id: string | null
          verified: boolean | null
        }
        Insert: {
          blockchain_network?: string | null
          created_at?: string
          experiment_id?: string | null
          hash: string
          id?: string
          protocol_id?: string | null
          transaction_id?: string | null
          verified?: boolean | null
        }
        Update: {
          blockchain_network?: string | null
          created_at?: string
          experiment_id?: string | null
          hash?: string
          id?: string
          protocol_id?: string | null
          transaction_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "blockchain_logs_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "experiments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blockchain_logs_protocol_id_fkey"
            columns: ["protocol_id"]
            isOneToOne: false
            referencedRelation: "protocols"
            referencedColumns: ["id"]
          },
        ]
      }
      data_uploads: {
        Row: {
          created_at: string
          experiment_id: string
          file_name: string
          file_size_bytes: number | null
          file_type: string | null
          file_url: string
          id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          experiment_id: string
          file_name: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          experiment_id?: string
          file_name?: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_uploads_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "experiments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_uploads_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      digital_twins: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          physical_id: string | null
          state: Json | null
          twin_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          physical_id?: string | null
          state?: Json | null
          twin_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          physical_id?: string | null
          state?: Json | null
          twin_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      experiments: {
        Row: {
          blockchain_hash: string | null
          created_at: string
          data_file_url: string | null
          environment_conditions: Json | null
          id: string
          notes: string | null
          protocol_id: string
          researcher_id: string
          success_percentage: number | null
          time_taken_minutes: number | null
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          blockchain_hash?: string | null
          created_at?: string
          data_file_url?: string | null
          environment_conditions?: Json | null
          id?: string
          notes?: string | null
          protocol_id: string
          researcher_id: string
          success_percentage?: number | null
          time_taken_minutes?: number | null
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          blockchain_hash?: string | null
          created_at?: string
          data_file_url?: string | null
          environment_conditions?: Json | null
          id?: string
          notes?: string | null
          protocol_id?: string
          researcher_id?: string
          success_percentage?: number | null
          time_taken_minutes?: number | null
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "experiments_protocol_id_fkey"
            columns: ["protocol_id"]
            isOneToOne: false
            referencedRelation: "protocols"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiments_researcher_id_fkey"
            columns: ["researcher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      federated_aggregated_models: {
        Row: {
          aggregation_metadata: Json | null
          created_at: string
          global_accuracy: number | null
          global_loss: number | null
          id: string
          model_weights_hash: string
          model_weights_url: string | null
          participating_clients: number
          project_id: string
          round_number: number
        }
        Insert: {
          aggregation_metadata?: Json | null
          created_at?: string
          global_accuracy?: number | null
          global_loss?: number | null
          id?: string
          model_weights_hash: string
          model_weights_url?: string | null
          participating_clients: number
          project_id: string
          round_number: number
        }
        Update: {
          aggregation_metadata?: Json | null
          created_at?: string
          global_accuracy?: number | null
          global_loss?: number | null
          id?: string
          model_weights_hash?: string
          model_weights_url?: string | null
          participating_clients?: number
          project_id?: string
          round_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "federated_aggregated_models_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "federated_learning_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      federated_learning_participants: {
        Row: {
          contribution_count: number | null
          id: string
          joined_at: string
          last_contribution_at: string | null
          local_data_size: number | null
          performance_metrics: Json | null
          project_id: string
          status: string
          user_id: string
        }
        Insert: {
          contribution_count?: number | null
          id?: string
          joined_at?: string
          last_contribution_at?: string | null
          local_data_size?: number | null
          performance_metrics?: Json | null
          project_id: string
          status?: string
          user_id: string
        }
        Update: {
          contribution_count?: number | null
          id?: string
          joined_at?: string
          last_contribution_at?: string | null
          local_data_size?: number | null
          performance_metrics?: Json | null
          project_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "federated_learning_participants_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "federated_learning_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      federated_learning_projects: {
        Row: {
          aggregation_method: string | null
          created_at: string
          created_by: string
          current_round: number | null
          description: string | null
          id: string
          learning_objective: string
          min_participants: number | null
          model_type: string
          name: string
          parameters: Json | null
          privacy_budget: number | null
          status: string
          total_rounds: number
          updated_at: string
        }
        Insert: {
          aggregation_method?: string | null
          created_at?: string
          created_by: string
          current_round?: number | null
          description?: string | null
          id?: string
          learning_objective: string
          min_participants?: number | null
          model_type: string
          name: string
          parameters?: Json | null
          privacy_budget?: number | null
          status?: string
          total_rounds?: number
          updated_at?: string
        }
        Update: {
          aggregation_method?: string | null
          created_at?: string
          created_by?: string
          current_round?: number | null
          description?: string | null
          id?: string
          learning_objective?: string
          min_participants?: number | null
          model_type?: string
          name?: string
          parameters?: Json | null
          privacy_budget?: number | null
          status?: string
          total_rounds?: number
          updated_at?: string
        }
        Relationships: []
      }
      federated_model_updates: {
        Row: {
          accuracy: number | null
          id: string
          loss: number | null
          model_weights_hash: string
          model_weights_url: string | null
          participant_id: string
          privacy_metrics: Json | null
          project_id: string
          round_number: number
          submitted_at: string
          training_samples: number | null
        }
        Insert: {
          accuracy?: number | null
          id?: string
          loss?: number | null
          model_weights_hash: string
          model_weights_url?: string | null
          participant_id: string
          privacy_metrics?: Json | null
          project_id: string
          round_number: number
          submitted_at?: string
          training_samples?: number | null
        }
        Update: {
          accuracy?: number | null
          id?: string
          loss?: number | null
          model_weights_hash?: string
          model_weights_url?: string | null
          participant_id?: string
          privacy_metrics?: Json | null
          project_id?: string
          round_number?: number
          submitted_at?: string
          training_samples?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "federated_model_updates_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "federated_learning_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "federated_model_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "federated_learning_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      iot_devices: {
        Row: {
          configuration: Json | null
          connection_status: string
          created_at: string
          device_name: string
          device_type: string
          id: string
          last_connected_at: string | null
          manufacturer: string | null
          metadata: Json | null
          model: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          configuration?: Json | null
          connection_status?: string
          created_at?: string
          device_name: string
          device_type: string
          id?: string
          last_connected_at?: string | null
          manufacturer?: string | null
          metadata?: Json | null
          model?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          configuration?: Json | null
          connection_status?: string
          created_at?: string
          device_name?: string
          device_type?: string
          id?: string
          last_connected_at?: string | null
          manufacturer?: string | null
          metadata?: Json | null
          model?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          institution: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          institution?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          institution?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      protocols: {
        Row: {
          average_rating: number | null
          created_at: string
          created_by: string | null
          detailed_steps: Json | null
          equipment_ids: string[] | null
          estimated_cost: number | null
          estimated_duration_minutes: number | null
          hash: string | null
          id: string
          rating_count: number | null
          success_rate: number | null
          summary: string
          tags: string[] | null
          title: string
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          average_rating?: number | null
          created_at?: string
          created_by?: string | null
          detailed_steps?: Json | null
          equipment_ids?: string[] | null
          estimated_cost?: number | null
          estimated_duration_minutes?: number | null
          hash?: string | null
          id?: string
          rating_count?: number | null
          success_rate?: number | null
          summary: string
          tags?: string[] | null
          title: string
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          average_rating?: number | null
          created_at?: string
          created_by?: string | null
          detailed_steps?: Json | null
          equipment_ids?: string[] | null
          estimated_cost?: number | null
          estimated_duration_minutes?: number | null
          hash?: string | null
          id?: string
          rating_count?: number | null
          success_rate?: number | null
          summary?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "protocols_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          protocol_id: string
          stars: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          protocol_id: string
          stars: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          protocol_id?: string
          stars?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_protocol_id_fkey"
            columns: ["protocol_id"]
            isOneToOne: false
            referencedRelation: "protocols"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sensor_data: {
        Row: {
          device_id: string
          experiment_id: string | null
          id: string
          metadata: Json | null
          sensor_type: string
          timestamp: string
          unit: string
          value: number
        }
        Insert: {
          device_id: string
          experiment_id?: string | null
          id?: string
          metadata?: Json | null
          sensor_type: string
          timestamp?: string
          unit: string
          value: number
        }
        Update: {
          device_id?: string
          experiment_id?: string | null
          id?: string
          metadata?: Json | null
          sensor_type?: string
          timestamp?: string
          unit?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "sensor_data_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "iot_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sensor_data_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "experiments"
            referencedColumns: ["id"]
          },
        ]
      }
      twin_metrics: {
        Row: {
          id: string
          metadata: Json | null
          metric_name: string
          metric_unit: string | null
          metric_value: number
          timestamp: string
          twin_id: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_unit?: string | null
          metric_value: number
          timestamp?: string
          twin_id: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number
          timestamp?: string
          twin_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "twin_metrics_twin_id_fkey"
            columns: ["twin_id"]
            isOneToOne: false
            referencedRelation: "digital_twins"
            referencedColumns: ["id"]
          },
        ]
      }
      twin_simulations: {
        Row: {
          completed_at: string | null
          confidence_score: number | null
          created_at: string
          created_by: string
          description: string | null
          error_message: string | null
          id: string
          input_parameters: Json
          name: string
          predicted_outcome: Json | null
          protocol_id: string | null
          result_data: Json | null
          simulation_duration_seconds: number | null
          status: string
          twin_id: string
        }
        Insert: {
          completed_at?: string | null
          confidence_score?: number | null
          created_at?: string
          created_by: string
          description?: string | null
          error_message?: string | null
          id?: string
          input_parameters?: Json
          name: string
          predicted_outcome?: Json | null
          protocol_id?: string | null
          result_data?: Json | null
          simulation_duration_seconds?: number | null
          status?: string
          twin_id: string
        }
        Update: {
          completed_at?: string | null
          confidence_score?: number | null
          created_at?: string
          created_by?: string
          description?: string | null
          error_message?: string | null
          id?: string
          input_parameters?: Json
          name?: string
          predicted_outcome?: Json | null
          protocol_id?: string | null
          result_data?: Json | null
          simulation_duration_seconds?: number | null
          status?: string
          twin_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "twin_simulations_protocol_id_fkey"
            columns: ["protocol_id"]
            isOneToOne: false
            referencedRelation: "protocols"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "twin_simulations_twin_id_fkey"
            columns: ["twin_id"]
            isOneToOne: false
            referencedRelation: "digital_twins"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "researcher" | "reviewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "researcher", "reviewer"],
    },
  },
} as const
