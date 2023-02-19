import { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { LoadingOverlay, useMantineTheme } from "@mantine/core";
import { useDiaryList } from "@/features/diaries/api/getDiaryList";
import { DatesSetArg } from "@fullcalendar/core";
import { addDays, subDays } from "date-fns";
import { format } from "@/shared/utils/date";
import styled from "@emotion/styled";

export type DateRange = { from: string; to: string };

type Props = {
  initialDate?: string;
  dateRange: DateRange | null;
  setDateRange: (dateRange: DateRange) => void;
};

export const DiaryCalendar = ({
  initialDate,
  dateRange,
  setDateRange,
}: Props) => {
  const theme = useMantineTheme();
  const diaryListQuery = useDiaryList({
    from: dateRange?.from!,
    to: dateRange?.to!,
    config: { enabled: dateRange !== null },
  });

  const events = useMemo(() => {
    return (diaryListQuery.data || []).map((diary) => {
      return {
        // id: diary.id,
        title: diary.content.slice(0, 30),
        start: diary.date,
      };
    });
  }, [diaryListQuery.data]);

  // Suspenseの関係でFullCalendarは再度マウントされる。その時initialDateを保つため、from toの中間くらいの日付を取得。
  const middleDate = useMemo(() => {
    if (dateRange == null) return undefined;

    const day = addDays(new Date(dateRange.from), 15);
    return format(day, "yyyy-MM-dd");
  }, [dateRange]);

  const handleDatesSet = ({ start, end }: DatesSetArg) => {
    const from = format(start, "yyyy-MM-dd");
    const to = format(subDays(end, 1), "yyyy-MM-dd");
    setDateRange({ from, to });
  };

  return (
    <StyledWrapper style={{ position: "relative" }}>
      {/* <LoadingOverlay visible={true} /> */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale="ja"
        buttonText={{ today: "今日" }}
        businessHours
        eventBackgroundColor={theme.colors.red[0]}
        eventBorderColor={theme.colors.red[0]}
        eventTextColor={theme.colors.dark[3]}
        height="auto"
        initialDate={middleDate ?? initialDate}
        events={events}
        selectable
        datesSet={handleDatesSet}
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
