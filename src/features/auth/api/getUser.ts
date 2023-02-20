import { supabase } from "@/shared/lib/supabase";

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user };
};
