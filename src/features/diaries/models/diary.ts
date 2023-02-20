import {
  Diary,
  DiaryCreateParams,
  DiaryInsertRow,
  DiaryRow,
  DiaryUpdateParams,
  DiaryUpdateRow,
} from "@/features/diaries/types/diary";

export const parseDiary = (row: DiaryRow): Diary => {
  return {
    id: row.id,
    userId: row.user_id,
    plainContent: row.plain_content,
    content: row.content,
    date: row.date,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
};

export function toDiaryRow(diary: Diary): DiaryRow;
export function toDiaryRow(diary: DiaryCreateParams): DiaryInsertRow;
export function toDiaryRow(diary: DiaryUpdateParams): DiaryUpdateRow;
export function toDiaryRow(diary: Partial<Diary>): Partial<DiaryRow> {
  return {
    id: diary.id,
    user_id: diary.userId,
    plain_content: diary.plainContent,
    content: diary.content,
    date: diary.date,
    created_at: diary.createdAt?.toUTCString(),
    updated_at: diary.updatedAt?.toUTCString(),
  };
}
