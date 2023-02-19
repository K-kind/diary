import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase";
import { parseDiary } from "@/features/diaries/models/diary";
import { Diary } from "@/features/diaries/types/diary";
import { ExtractFnReturnType, QueryConfig } from "@/shared/lib/reactQuery";

export type GetDiaryListDTO = {
  from: string;
  to: string;
};

export const getDiaryList = async ({
  from,
  to,
}: GetDiaryListDTO): Promise<Diary[]> => {
  const { data, error } = await supabase
    .from("diaries")
    .select("*")
    .gte("date", from)
    .lte("date", to)
    .order("date");
  if (error) throw error;

  return data.map(parseDiary);
};

type QueryFnType = typeof getDiaryList;

type Options = {
  from: string;
  to: string;
  config?: QueryConfig<QueryFnType>;
};

export const useDiaryList = ({ from, to, config }: Options) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["diaries", { from, to }],
    queryFn: () => getDiaryList({ from, to }),
    retry: false,
    ...config,
  });
};
