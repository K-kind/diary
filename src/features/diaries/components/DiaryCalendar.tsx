import { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { LoadingOverlay, useMantineTheme } from "@mantine/core";
import { useDiaryList } from "@/features/diaries/api/getDiaryList";
import { DatesSetArg } from "@fullcalendar/core";
import { format, add } from "@/shared/utils/date";
import styled from "@emotion/styled";

type DateRange = { from: string; to: string };

type Props = {
  initialDate?: string;
};

export const DiaryCalendar = ({ initialDate }: Props) => {
  const theme = useMantineTheme();
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const diaryListQuery = useDiaryList({
    from: dateRange?.from!,
    to: dateRange?.to!,
    config: { enabled: dateRange !== null, suspense: false },
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

  const handleDatesSet = ({ start, end }: DatesSetArg) => {
    const from = format(start, "yyyy-MM-dd");
    const to = format(add(end, { days: -1 }), "yyyy-MM-dd");
    setDateRange({ from, to });
  };

  return (
    <StyledWrapper style={{ position: "relative" }}>
      <LoadingOverlay visible={diaryListQuery.isLoading} />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale="ja"
        buttonText={{ today: "今日" }}
        businessHours
        eventBackgroundColor={theme.colors.red[0]}
        eventBorderColor={theme.colors.red[0]}
        eventTextColor={theme.colors.dark[3]}
        height="auto"
        initialDate={initialDate}
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
