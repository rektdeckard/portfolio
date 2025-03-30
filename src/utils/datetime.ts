import dayjs from "dayjs";

const DENVER_UTC_OFFSET = 6 * 60;
const DEFAULT_HOURS = 12;

export function shiftUTCToMDT(date: Date): Date {
  return dayjs(date)
    .add(DENVER_UTC_OFFSET, "minutes")
    .add(DEFAULT_HOURS, "hours")
    .toDate();
}

export function formatLongDate(date: Date): string {
  return dayjs(date).format("MMMM D, YYYY");
}
