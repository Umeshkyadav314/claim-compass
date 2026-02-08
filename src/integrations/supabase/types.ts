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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      auto_loss_forms: {
        Row: {
          agency_address: string | null
          agency_code: string | null
          agency_contact: string | null
          agency_customer_id: string | null
          agency_email: string | null
          agency_fax: string | null
          agency_name: string | null
          agency_phone: string | null
          agency_subcode: string | null
          carrier: string | null
          contact_address: string | null
          contact_email_primary: string | null
          contact_email_secondary: string | null
          contact_is_insured: boolean | null
          contact_name: string | null
          contact_phone_primary: string | null
          contact_phone_secondary: string | null
          contact_when: string | null
          created_at: string
          form_date: string | null
          id: string
          injured_persons: Json | null
          insured_address: string | null
          insured_dob: string | null
          insured_email_primary: string | null
          insured_email_secondary: string | null
          insured_fein: string | null
          insured_location_code: string | null
          insured_marital_status: string | null
          insured_name: string | null
          insured_phone_primary: string | null
          insured_phone_secondary: string | null
          insured_vehicle: Json | null
          line_of_business: string | null
          loss_accident_desc: string | null
          loss_city_state_zip: string | null
          loss_country: string | null
          loss_date: string | null
          loss_department: string | null
          loss_location: string | null
          loss_location_desc: string | null
          loss_report_number: string | null
          loss_street: string | null
          loss_time: string | null
          naic_code: string | null
          other_vehicle: Json | null
          policy_number: string | null
          remarks: string | null
          reported_by: string | null
          reported_to: string | null
          status: string | null
          updated_at: string
          user_id: string | null
          witnesses: Json | null
        }
        Insert: {
          agency_address?: string | null
          agency_code?: string | null
          agency_contact?: string | null
          agency_customer_id?: string | null
          agency_email?: string | null
          agency_fax?: string | null
          agency_name?: string | null
          agency_phone?: string | null
          agency_subcode?: string | null
          carrier?: string | null
          contact_address?: string | null
          contact_email_primary?: string | null
          contact_email_secondary?: string | null
          contact_is_insured?: boolean | null
          contact_name?: string | null
          contact_phone_primary?: string | null
          contact_phone_secondary?: string | null
          contact_when?: string | null
          created_at?: string
          form_date?: string | null
          id?: string
          injured_persons?: Json | null
          insured_address?: string | null
          insured_dob?: string | null
          insured_email_primary?: string | null
          insured_email_secondary?: string | null
          insured_fein?: string | null
          insured_location_code?: string | null
          insured_marital_status?: string | null
          insured_name?: string | null
          insured_phone_primary?: string | null
          insured_phone_secondary?: string | null
          insured_vehicle?: Json | null
          line_of_business?: string | null
          loss_accident_desc?: string | null
          loss_city_state_zip?: string | null
          loss_country?: string | null
          loss_date?: string | null
          loss_department?: string | null
          loss_location?: string | null
          loss_location_desc?: string | null
          loss_report_number?: string | null
          loss_street?: string | null
          loss_time?: string | null
          naic_code?: string | null
          other_vehicle?: Json | null
          policy_number?: string | null
          remarks?: string | null
          reported_by?: string | null
          reported_to?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          witnesses?: Json | null
        }
        Update: {
          agency_address?: string | null
          agency_code?: string | null
          agency_contact?: string | null
          agency_customer_id?: string | null
          agency_email?: string | null
          agency_fax?: string | null
          agency_name?: string | null
          agency_phone?: string | null
          agency_subcode?: string | null
          carrier?: string | null
          contact_address?: string | null
          contact_email_primary?: string | null
          contact_email_secondary?: string | null
          contact_is_insured?: boolean | null
          contact_name?: string | null
          contact_phone_primary?: string | null
          contact_phone_secondary?: string | null
          contact_when?: string | null
          created_at?: string
          form_date?: string | null
          id?: string
          injured_persons?: Json | null
          insured_address?: string | null
          insured_dob?: string | null
          insured_email_primary?: string | null
          insured_email_secondary?: string | null
          insured_fein?: string | null
          insured_location_code?: string | null
          insured_marital_status?: string | null
          insured_name?: string | null
          insured_phone_primary?: string | null
          insured_phone_secondary?: string | null
          insured_vehicle?: Json | null
          line_of_business?: string | null
          loss_accident_desc?: string | null
          loss_city_state_zip?: string | null
          loss_country?: string | null
          loss_date?: string | null
          loss_department?: string | null
          loss_location?: string | null
          loss_location_desc?: string | null
          loss_report_number?: string | null
          loss_street?: string | null
          loss_time?: string | null
          naic_code?: string | null
          other_vehicle?: Json | null
          policy_number?: string | null
          remarks?: string | null
          reported_by?: string | null
          reported_to?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          witnesses?: Json | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          agency_email: string | null
          agency_name: string | null
          agency_phone: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          agency_email?: string | null
          agency_name?: string | null
          agency_phone?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          agency_email?: string | null
          agency_name?: string | null
          agency_phone?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
