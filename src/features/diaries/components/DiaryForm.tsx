import { Diary } from "@/features/diaries/types/diary";
import { RichTextEditor } from "@/shared/components/RichTextEditor";
import { Button, Flex } from "@mantine/core";

type Props = {
  diary: Diary | null;
  setEditing: (editing: boolean) => void;
};

export const DiaryForm = ({ diary, setEditing }: Props) => {
  return (
    <form>
      <RichTextEditor content={diary?.content || null} />
      <Flex justify="flex-end" align="center" mt="md">
        <Button
          variant="subtle"
          color="gray"
          mr="md"
          onClick={() => setEditing(false)}
        >
          キャンセル
        </Button>
        <Button onClick={() => console.log(diary?.content)} w={112}>
          保存
        </Button>
      </Flex>
    </form>
  );
};
