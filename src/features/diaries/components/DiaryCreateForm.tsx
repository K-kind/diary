import { useCreateDiary } from "@/features/diaries/api/createDiary";
import {
  RichTextEditor,
  RichTextState,
} from "@/shared/components/RichTextEditor";
import { useNotification } from "@/shared/hooks/useNotification";
import { Button, Flex } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useCallback, useState } from "react";

type Props = {
  date: string;
  setEditing: (editing: boolean) => void;
};

export const DiaryCreateForm = ({ date, setEditing }: Props) => {
  const [richTextState, setRichTextState] = useState<RichTextState | null>(
    null
  );
  const { notifySuccess, notifyError } = useNotification();
  const createDiaryMutation = useCreateDiary();
  const queryClient = useQueryClient();

  const close = useCallback(() => {
    setRichTextState(null);
    setEditing(false);
  }, [setEditing]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!richTextState) {
        return notifyError({ message: "内容を入力してください。" });
      }

      const { plainContent, content } = richTextState;

      try {
        await createDiaryMutation.mutateAsync({ date, plainContent, content });
        queryClient.invalidateQueries({ queryKey: ["diaries"] });
        close();
        notifySuccess({ message: "日記を保存しました。" });
      } catch (e) {
        notifyError();
      }
    },
    [
      richTextState,
      date,
      createDiaryMutation,
      notifyError,
      notifySuccess,
      close,
      queryClient,
    ]
  );

  return (
    <form onSubmit={handleSubmit}>
      <RichTextEditor
        initialContent={null}
        setRichTextState={setRichTextState}
      />

      <Flex justify="flex-end" align="center" mt="md">
        <Button variant="subtle" color="gray" mr="md" onClick={close}>
          キャンセル
        </Button>
        <Button type="submit" w={112}>
          保存
        </Button>
      </Flex>
    </form>
  );
};
