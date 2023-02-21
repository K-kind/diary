import { supabase } from "@/shared/lib/supabase";
import { AuthContext } from "@/shared/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

type SignInParams = { email: string; password: string };

export const signIn = async ({ email, password }: SignInParams) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return { user: data.user!, session: data.session! };
};

export const useSignIn = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({ email, password }: SignInParams) =>
      signIn({ email, password }).then(({ user }) => setUser(user)),
  });
};
