import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase";
import { DiaryUpdateParams } from "@/features/diaries/types/diary";
import { toDiaryRow } from "@/features/diaries/models/diary";

export type UpdateDiaryDTO = {
  id: number;
  params: DiaryUpdateParams;
};

export const updateDiary = async ({ id, params }: UpdateDiaryDTO) => {
  const { error } = await supabase
    .from("diaries")
    .update(toDiaryRow(params))
    .eq("id", id);
  if (error) throw error;
};

type Options = {
  id: number;
};

export const useUpdateDiary = ({ id }: Options) => {
  return useMutation({
    mutationFn: (params: UpdateDiaryDTO["params"]) =>
      updateDiary({ id, params }),
  });
};
