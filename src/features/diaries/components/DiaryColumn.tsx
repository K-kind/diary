import { Diary } from "@/features/diaries/types/diary";
import { Divider, Text } from "@mantine/core";
import { format } from "@/shared/utils/date";
import { useMemo } from "react";

type Props = {
  date: string;
  diary: Diary | null;
};

export const DiaryColumn = ({ date, diary }: Props) => {
  const dateString = useMemo(
    () => format(new Date(date), "yyyy年MM月dd日（ccc）"),
    [date]
  );

  return (
    <div>
      <Text size="xl" mt={2}>
        {dateString}
      </Text>
      <Divider my="md" />
    </div>
  );
};
