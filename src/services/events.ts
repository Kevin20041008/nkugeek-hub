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
  return [];
}

export async function getEventRegistrationSummaries(): Promise<
  EventRegistrationSummary[]
> {
  return [];
}
