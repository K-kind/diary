import { useMutation } from "@tanstack/react-query";
import { DiaryCreateParams } from "@/features/diaries/types/diary";
import { supabase } from "@/shared/lib/supabase";
import { parseDiary, toDiaryRow } from "@/features/diaries/models/diary";
import { useContext } from "react";
import { AuthContext } from "@/shared/providers/auth";

export type createDiaryDTO = {
  params: DiaryCreateParams;
};

export const createDiary = async ({ params }: createDiaryDTO) => {
  const { data, error } = await supabase
    .from("diaries")
    .insert(toDiaryRow({ ...params }))
    .select()
    .single();
  if (error) throw error;
  if (data == null) throw new Error("Error creating a diary");

  return parseDiary(data);
};

export const useCreateDiary = () => {
  const { user } = useContext(AuthContext);

  return useMutation({
    mutationFn: (params: createDiaryDTO["params"]) =>
      createDiary({ params: { userId: user?.id, ...params } }),
  });
};
