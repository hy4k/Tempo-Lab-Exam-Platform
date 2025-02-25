export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      exams: {
        Row: {
          id: string;
          title: string;
          time_limit: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          time_limit: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          time_limit?: number;
          created_at?: string;
        };
      };
      questions: {
        Row: {
          id: string;
          exam_id: string;
          content: string;
          type: string;
          options: Json[];
          created_at: string;
        };
        Insert: {
          id?: string;
          exam_id: string;
          content: string;
          type: string;
          options?: Json[];
          created_at?: string;
        };
        Update: {
          id?: string;
          exam_id?: string;
          content?: string;
          type?: string;
          options?: Json[];
          created_at?: string;
        };
      };
    };
  };
}
