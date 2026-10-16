import { SITE } from './site';

export interface OpenStatus {
  open: boolean;
  label: string;
  /** Index into WEEK (0 = Monday) for the current day in the shop's time zone. */
  dayIndex: number;
}

/** Is the shop open right now, in Amalfi time? Browser-only: call after render. */
export function openStatus(now = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: SITE.hours.timeZone,
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon';
  const dayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(weekday);

  const open = hour >= SITE.hours.opens;
  return {
    open,
    dayIndex: Math.max(dayIndex, 0),
    label: open ? 'Open now, until midnight' : `Opens today at ${SITE.hours.opens}:00`,
  };
}
