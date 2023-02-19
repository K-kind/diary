import {
  DateRange,
  DiaryCalendar,
} from "@/features/diaries/components/DiaryCalendar";
import { DiaryColumn } from "@/features/diaries/components/DiaryColumn";
import { Diary } from "@/features/diaries/types/diary";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { Grid } from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";

export default function DiaryDetailPage() {
  const router = useRouter();
  // TODO: 無効なdateが渡ってくることは想定しない
  const date = router.query.date as string;
  // Suspense等の都合でカレンダー側で持つのは難しいため親で持つ
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);

  return (
    <>
      <Head>
        <title>シンプル日記</title>
      </Head>

      <Grid>
        <Grid.Col span={7}>
          {date && <DiaryColumn date={date} diary={selectedDiary} />}
        </Grid.Col>
        <Grid.Col span={5}>
          <Suspense fallback={<ContentLoader height={594} />}>
            {date && (
              <DiaryCalendar
                initialDate={date}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            )}
          </Suspense>
        </Grid.Col>
      </Grid>
    </>
  );
}
