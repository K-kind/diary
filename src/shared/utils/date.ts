import { format as dateFnsFormat, add as dateFnsAdd } from "date-fns";
import { ja } from "date-fns/locale";

export type Duration = {
  years?: number | undefined;
  months?: number | undefined;
  weeks?: number | undefined;
  days?: number | undefined;
  hours?: number | undefined;
  minutes?: number | undefined;
  seconds?: number | undefined;
};

export const format = (date: Date | number, fmt: string) => {
  return dateFnsFormat(date, fmt, { locale: ja });
};

export const add = (date: Date | number, duration: Duration) => {
  return dateFnsAdd(date, duration);
};
