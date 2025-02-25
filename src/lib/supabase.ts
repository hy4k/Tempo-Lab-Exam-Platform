import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase-types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const getExams = async () => {
  const { data, error } = await supabase
    .from("exams")
    .select(
      `
      *,
      questions (id, content, type, options, is_flagged)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getExam = async (id: string) => {
  const { data, error } = await supabase
    .from("exams")
    .select(
      `
      *,
      questions (*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const submitAnswer = async (questionId: string, answer: string) => {
  const { error } = await supabase.from("answers").upsert({
    question_id: questionId,
    answer_content: answer,
    submitted_at: new Date().toISOString(),
  });

  if (error) throw error;
};

export const flagQuestion = async (questionId: string, isFlagged: boolean) => {
  const { error } = await supabase
    .from("questions")
    .update({ is_flagged: isFlagged })
    .eq("id", questionId);

  if (error) throw error;
};
