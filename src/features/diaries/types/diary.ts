import { Database } from "@/../generated-schema";

export type DiaryRow = Database["public"]["Tables"]["diaries"]["Row"];
export type DiaryInsertRow = Database["public"]["Tables"]["diaries"]["Insert"];
export type DiaryUpdateRow = Database["public"]["Tables"]["diaries"]["Update"];

export type Diary = {
  id: DiaryRow["id"];
  userId: DiaryRow["user_id"];
  plainContent: DiaryRow["plain_content"];
  content: DiaryRow["content"];
  date: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DiaryCreateParams = Partial<Diary> & {
  plainContent: Diary["plainContent"];
  content: Diary["content"];
  date: Diary["date"];
};
export type DiaryUpdateParams = Partial<Diary>;
