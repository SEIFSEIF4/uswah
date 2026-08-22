// Generated from the Supabase project. Do not edit by hand.
// Regenerate after every migration.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      dorar_hadith: {
        Row: {
          categories: Json | null
          cited: Json | null
          fetched_at: string
          hadith_id: string | null
          query: string
          results: Json
          slug: string
          takhrij: string | null
        }
        Insert: {
          categories?: Json | null
          cited?: Json | null
          fetched_at: string
          hadith_id?: string | null
          query: string
          results: Json
          slug: string
          takhrij?: string | null
        }
        Update: {
          categories?: Json | null
          cited?: Json | null
          fetched_at?: string
          hadith_id?: string | null
          query?: string
          results?: Json
          slug?: string
          takhrij?: string | null
        }
        Relationships: []
      }
      intention_translations: {
        Row: {
          act: string
          intention: string
          intention_id: string
          locale: string
          note: string
          source_label: string
        }
        Insert: {
          act: string
          intention: string
          intention_id: string
          locale: string
          note: string
          source_label: string
        }
        Update: {
          act?: string
          intention?: string
          intention_id?: string
          locale?: string
          note?: string
          source_label?: string
        }
        Relationships: [
          {
            foreignKeyName: "intention_translations_intention_id_fkey"
            columns: ["intention_id"]
            isOneToOne: false
            referencedRelation: "intentions"
            referencedColumns: ["id"]
          },
        ]
      }
      intentions: {
        Row: {
          act_group: string
          created_at: string
          id: string
          published_at: string | null
          slug: string
          source_original: string | null
        }
        Insert: {
          act_group: string
          created_at?: string
          id?: string
          published_at?: string | null
          slug: string
          source_original?: string | null
        }
        Update: {
          act_group?: string
          created_at?: string
          id?: string
          published_at?: string | null
          slug?: string
          source_original?: string | null
        }
        Relationships: []
      }
      saying_translations: {
        Row: {
          angle: string
          closeness: string
          locale: string
          saying_id: string
          source_label: string
        }
        Insert: {
          angle: string
          closeness: string
          locale: string
          saying_id: string
          source_label: string
        }
        Update: {
          angle?: string
          closeness?: string
          locale?: string
          saying_id?: string
          source_label?: string
        }
        Relationships: [
          {
            foreignKeyName: "saying_translations_saying_id_fkey"
            columns: ["saying_id"]
            isOneToOne: false
            referencedRelation: "sayings"
            referencedColumns: ["id"]
          },
        ]
      }
      sayings: {
        Row: {
          created_at: string
          grade: string
          id: string
          published_at: string | null
          saying: string
          situation_slug: string | null
          slug: string
          source_original: string | null
        }
        Insert: {
          created_at?: string
          grade: string
          id?: string
          published_at?: string | null
          saying: string
          situation_slug?: string | null
          slug: string
          source_original?: string | null
        }
        Update: {
          created_at?: string
          grade?: string
          id?: string
          published_at?: string | null
          saying?: string
          situation_slug?: string | null
          slug?: string
          source_original?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sayings_situation_slug_fkey"
            columns: ["situation_slug"]
            isOneToOne: false
            referencedRelation: "situations"
            referencedColumns: ["slug"]
          },
        ]
      }
      entries: {
        Row: {
          id: string
          position: number
          reviewed_at: string
          reviewed_by: string
          situation_id: string
          source_id: string
        }
        Insert: {
          id?: string
          position: number
          reviewed_at: string
          reviewed_by: string
          situation_id: string
          source_id: string
        }
        Update: {
          id?: string
          position?: number
          reviewed_at?: string
          reviewed_by?: string
          situation_id?: string
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entries_situation_id_fkey"
            columns: ["situation_id"]
            isOneToOne: false
            referencedRelation: "situations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entries_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      entry_translations: {
        Row: {
          body: string
          entry_id: string
          locale: string
          search_vector: unknown
          takeaway: string
        }
        Insert: {
          body: string
          entry_id: string
          locale: string
          search_vector?: unknown
          takeaway: string
        }
        Update: {
          body?: string
          entry_id?: string
          locale?: string
          search_vector?: unknown
          takeaway?: string
        }
        Relationships: [
          {
            foreignKeyName: "entry_translations_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entry_translations_locale_fkey"
            columns: ["locale"]
            isOneToOne: false
            referencedRelation: "locales"
            referencedColumns: ["code"]
          },
        ]
      }
      locales: {
        Row: {
          code: string
          dir: string
        }
        Insert: {
          code: string
          dir?: string
        }
        Update: {
          code?: string
          dir?: string
        }
        Relationships: []
      }
      saved_situations: {
        Row: {
          created_at: string
          situation_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          situation_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          situation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_situations_situation_id_fkey"
            columns: ["situation_id"]
            isOneToOne: false
            referencedRelation: "situations"
            referencedColumns: ["id"]
          },
        ]
      }
      situation_translations: {
        Row: {
          image_alt: string | null
          locale: string
          search_vector: unknown
          situation_id: string
          summary: string
          title: string
        }
        Insert: {
          image_alt?: string | null
          locale: string
          search_vector?: unknown
          situation_id: string
          summary: string
          title: string
        }
        Update: {
          image_alt?: string | null
          locale?: string
          search_vector?: unknown
          situation_id?: string
          summary?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "situation_translations_locale_fkey"
            columns: ["locale"]
            isOneToOne: false
            referencedRelation: "locales"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "situation_translations_situation_id_fkey"
            columns: ["situation_id"]
            isOneToOne: false
            referencedRelation: "situations"
            referencedColumns: ["id"]
          },
        ]
      }
      situations: {
        Row: {
          created_at: string
          id: string
          image_cleared_at: string | null
          image_cleared_by: string | null
          image_credit: string | null
          image_license: string | null
          image_source_url: string | null
          image_url: string | null
          minutes: number | null
          published_at: string | null
          slug: string
          topic: string | null
          feature: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_cleared_at?: string | null
          image_cleared_by?: string | null
          image_credit?: string | null
          image_license?: string | null
          image_source_url?: string | null
          image_url?: string | null
          minutes?: number | null
          published_at?: string | null
          slug: string
          topic?: string | null
          feature?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_cleared_at?: string | null
          image_cleared_by?: string | null
          image_credit?: string | null
          image_license?: string | null
          image_source_url?: string | null
          image_url?: string | null
          minutes?: number | null
          published_at?: string | null
          slug?: string
          topic?: string | null
          feature?: string | null
        }
        Relationships: []
      }
      source_translations: {
        Row: {
          locale: string
          source_id: string
          text: string
          translator: string
        }
        Insert: {
          locale: string
          source_id: string
          text: string
          translator: string
        }
        Update: {
          locale?: string
          source_id?: string
          text?: string
          translator?: string
        }
        Relationships: [
          {
            foreignKeyName: "source_translations_locale_fkey"
            columns: ["locale"]
            isOneToOne: false
            referencedRelation: "locales"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "source_translations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          collection: string | null
          created_at: string
          grade: Database["public"]["Enums"]["source_grade"]
          id: string
          kind: Database["public"]["Enums"]["source_kind"]
          ref: string
          text_original: string
        }
        Insert: {
          collection?: string | null
          created_at?: string
          grade: Database["public"]["Enums"]["source_grade"]
          id?: string
          kind: Database["public"]["Enums"]["source_kind"]
          ref: string
          text_original: string
        }
        Update: {
          collection?: string | null
          created_at?: string
          grade?: Database["public"]["Enums"]["source_grade"]
          id?: string
          kind?: Database["public"]["Enums"]["source_kind"]
          ref?: string
          text_original?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ar_norm: { Args: { t: string }; Returns: string }
      search_situations: {
        Args: { loc: string; q: string }
        Returns: {
          rank: number
          slug: string
          summary: string
          title: string
        }[]
      }
      tsv: { Args: { loc: string; t: string }; Returns: unknown }
    }
    Enums: {
      source_grade: "quran" | "sahih"
      source_kind: "quran" | "hadith"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
