import { useUpdateDiary } from "@/features/diaries/api/updateDiary";
import { Diary } from "@/features/diaries/types/diary";
import {
  RichTextEditor,
  RichTextState,
} from "@/shared/components/RichTextEditor";
import { useNotification } from "@/shared/hooks/useNotification";
import { Button, Flex } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useCallback, useState } from "react";

type Props = {
  diary: Diary;
  setEditing: (editing: boolean) => void;
};

export const DiaryUpdateForm = ({ diary, setEditing }: Props) => {
  const [richTextState, setRichTextState] = useState<RichTextState | null>(
    null
  );
  const { notifySuccess, notifyError } = useNotification();
  const updateDiaryMutation = useUpdateDiary({ id: diary.id });
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
        await updateDiaryMutation.mutateAsync({ plainContent, content });
        queryClient.invalidateQueries({ queryKey: ["diaries"] });
        close();
        notifySuccess({ message: "日記を保存しました。" });
      } catch (e) {
        notifyError();
      }
    },
    [
      richTextState,
      updateDiaryMutation,
      notifyError,
      notifySuccess,
      close,
      queryClient,
    ]
  );

  return (
    <form onSubmit={handleSubmit}>
      <RichTextEditor
        initialContent={diary?.content || null}
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
