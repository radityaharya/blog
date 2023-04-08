export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      mailing_list: {
        Row: {
          address: string
          created_at: string | null
          id: number
          is_unsubscribed: boolean
        }
        Insert: {
          address: string
          created_at?: string | null
          id?: number
          is_unsubscribed?: boolean
        }
        Update: {
          address?: string
          created_at?: string | null
          id?: number
          is_unsubscribed?: boolean
        }
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
