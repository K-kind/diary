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
    content: row.content,
    date: new Date(row.date),
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
};

export function toDiaryRow(room: Diary): DiaryRow;
export function toDiaryRow(room: DiaryCreateParams): DiaryInsertRow;
export function toDiaryRow(room: DiaryUpdateParams): DiaryUpdateRow;
export function toDiaryRow(room: Partial<Diary>): Partial<DiaryRow> {
  return {
    id: room?.id,
    user_id: room?.userId,
    content: room?.content,
    date: room.date?.toUTCString(),
    created_at: room.createdAt?.toUTCString(),
    updated_at: room.updatedAt?.toUTCString(),
  };
}
