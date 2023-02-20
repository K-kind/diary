import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase";

export type DeleteDiaryDTO = {
  params: { id: number };
};

export const deleteDiary = async ({ params }: DeleteDiaryDTO) => {
  const { error } = await supabase.from("diaries").delete().eq("id", params.id);
  if (error) throw error;
};

export const useDeleteDiary = () => {
  return useMutation({
    mutationFn: (params: DeleteDiaryDTO["params"]) => deleteDiary({ params }),
  });
};
