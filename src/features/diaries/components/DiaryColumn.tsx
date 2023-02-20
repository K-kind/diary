import { Diary } from "@/features/diaries/types/diary";
import { Box, Button, Divider, Flex, Text } from "@mantine/core";
import { format } from "@/shared/utils/date";
import { useMemo, useState } from "react";
import { DiaryForm } from "@/features/diaries/components/DiaryForm";
import { IconPencil } from "@tabler/icons";

type Props = {
  date: string;
  diary: Diary | null;
  editing: boolean;
  setEditing: (editing: boolean) => void;
};

export const DiaryColumn = ({ date, diary, editing, setEditing }: Props) => {
  const dateString = useMemo(
    () => format(new Date(date), "yyyy年MM月dd日（ccc）"),
    [date]
  );

  const renderContent = () => {
    if (editing)
      return <DiaryForm date={date} diary={diary} setEditing={setEditing} />;

    if (diary) {
      return (
        <Box
          sx={(theme) => ({
            cursor: "pointer",
            borderRadius: 4,
            "&:hover": { backgroundColor: theme.colors.gray[0] },
          })}
          mih={450}
          onClick={() => setEditing(true)}
        >
          <div dangerouslySetInnerHTML={{ __html: diary.content }} />
        </Box>
      );
    }

    return (
      <Flex justify="center" py={60}>
        <Button
          variant="outline"
          size="lg"
          leftIcon={<IconPencil />}
          onClick={() => setEditing(true)}
        >
          日記を書く
        </Button>
      </Flex>
    );
  };

  return (
    <div>
      <Text size="xl" mt={2}>
        {dateString}
      </Text>
      <Divider mt="md" mb="xl" />
      {renderContent()}
    </div>
  );
};
