import { useMutation } from "@tanstack/react-query";
import { DiaryCreateParams } from "@/features/diaries/types/diary";
import { supabase } from "@/shared/lib/supabase";
import { parseDiary, toDiaryRow } from "@/features/diaries/models/diary";

export type createDiaryDTO = {
  params: DiaryCreateParams;
};

export const createDiary = async ({ params }: createDiaryDTO) => {
  const { data, error } = await supabase
    .from("diaries")
    .insert(
      toDiaryRow({ ...params, userId: "4acca826-cfa4-4f06-b7ce-c8e5415fd0f6" })
    ) // TODO
    .select()
    .single();
  if (error) throw error;
  if (data == null) throw new Error("Error creating a diary");

  return parseDiary(data);
};

export const useCreateDiary = () => {
  return useMutation({
    mutationFn: (params: createDiaryDTO["params"]) => createDiary({ params }),
  });
};
