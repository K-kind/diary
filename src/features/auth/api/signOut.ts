import { supabase } from "@/shared/lib/supabase";
import { AuthContext } from "@/shared/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const sigOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const useSignOut = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: () => sigOut().then(() => setUser(null)),
  });
};
