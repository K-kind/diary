import { supabase } from "@/shared/lib/supabase";
import { AuthContext } from "@/shared/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

type SignUpParams = { email: string; password: string };

export const signUp = async ({ email, password }: SignUpParams) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  return { user: data.user!, session: data.session! };
};

export const useSignUp = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({ email, password }: SignUpParams) =>
      signUp({ email, password }).then(({ user }) => setUser(user)),
  });
};
