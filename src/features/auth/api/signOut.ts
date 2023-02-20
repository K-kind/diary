import { supabase } from "@/shared/lib/supabase";

export const sigOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
