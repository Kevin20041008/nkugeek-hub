import { events } from "@/data/platform";

export interface EventCard {
  type: string;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  status: string;
  description: string;
}

export interface EventRegistrationSummary {
  title: string;
  registered: number;
  capacity: number;
  remaining: number;
}

export async function getEventCards(): Promise<EventCard[]> {
  return events;
}

export async function getEventRegistrationSummaries(): Promise<EventRegistrationSummary[]> {
  return events.map((event, index) => {
    const capacity = Number.parseInt(event.capacity, 10) || 0;
    const registered = [18, 24, 12, 9][index] ?? 0;

    return {
      title: event.title,
      registered,
      capacity,
      remaining: capacity ? Math.max(capacity - registered, 0) : 0,
    };
  });
}
