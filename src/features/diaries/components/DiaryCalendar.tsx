import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { LoadingOverlay, useMantineTheme } from "@mantine/core";
import { useDiaryList } from "@/features/diaries/api/getDiaryList";
import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { format, add } from "@/shared/utils/date";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Diary } from "@/features/diaries/types/diary";

type DateRange = { from: string; to: string };

type Props = {
  selectedDate?: string;
  selectedDiary: Diary | null;
  setSelectedDiary: (diary: Diary | null) => void;
};

export const DiaryCalendar = ({
  selectedDate,
  selectedDiary,
  setSelectedDiary,
}: Props) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const calendarRef = useRef<FullCalendar>(null!);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const diaryListQuery = useDiaryList({
    from: dateRange?.from!,
    to: dateRange?.to!,
    config: {
      enabled: dateRange !== null,
      suspense: false,
      onSuccess: (diaries) => {
        if (selectedDiary != null) return;

        const diary = diaries.find((diary) => diary.date === selectedDate);
        diary && setSelectedDiary(diary);
      },
    },
  });

  const events = useMemo(() => {
    return (diaryListQuery.data || []).map((diary) => {
      return {
        title: diary.content.slice(0, 12),
        start: diary.date,
      };
    });
  }, [diaryListQuery.data]);

  const handleDatesSet = useCallback(({ start, end }: DatesSetArg) => {
    const from = format(start, "yyyy-MM-dd");
    const to = format(add(end, { days: -1 }), "yyyy-MM-dd");
    setDateRange({ from, to });
  }, []);

  const handleDateClick = useCallback(
    ({ dateStr }: DateClickArg) => {
      if (dateStr === selectedDate) return;

      router.push(`/diaries/${dateStr}`);
    },
    [selectedDate, router]
  );

  const handleEventClick = useCallback(
    ({ event: { startStr } }: EventClickArg) => {
      if (startStr === selectedDate) return;

      router.push(`/diaries/${startStr}`);
    },
    [selectedDate, router]
  );

  useEffect(() => {
    if (selectedDate == undefined) return;

    calendarRef.current.getApi().select(selectedDate);

    const diary = diaryListQuery.data?.find(
      (diary) => diary.date === selectedDate
    );
    setSelectedDiary(diary ?? null);
  }, [selectedDate, diaryListQuery, setSelectedDiary]);

  return (
    <StyledWrapper style={{ position: "relative" }}>
      <LoadingOverlay visible={diaryListQuery.isLoading} />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        locale="ja"
        buttonText={{ today: "今日" }}
        businessHours
        eventBackgroundColor={theme.colors.red[0]}
        eventBorderColor={theme.colors.red[0]}
        eventTextColor={theme.colors.dark[3]}
        height="auto"
        initialDate={selectedDate}
        events={events}
        selectable
        datesSet={handleDatesSet}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled("div")`
  .fc-toolbar.fc-header-toolbar {
    margin-bottom: 12px;
  }

  .fc-button {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .fc-toolbar-title {
    font-size: 20px;
  }

  .fc-today-button {
    background-color: #228be6;
    border: none;
    &:disabled {
      background-color: #e9ecef;
      color: #adb5bd;
    }
    &:not(:disabled) {
      &:hover,
      &:active {
        background-color: #1c7ed6 !important;
      }
    }
  }

  .fc-prev-button,
  .fc-next-button {
    background-color: white;
    border-color: rgb(206, 212, 218);
    color: black;
    &:hover,
    &:active {
      background-color: #f8f9fa !important;
      border-color: rgb(206, 212, 218) !important;
      color: black !important;
    }
  }
`;
