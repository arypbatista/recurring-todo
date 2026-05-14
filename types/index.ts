export type RecurrenceType = "monthly";

export interface RecurringTodo {
  id: string;
  title: string;
  category?: string;
  recurrence: RecurrenceType;
  dueDay?: number; // 1-31
  active: boolean;
  createdAt: string; // ISO string
}

export type OccurrenceStatus = "pending" | "paid";

export interface Occurrence {
  id: string;
  recurringTodoId: string;
  period: string; // "YYYY-MM"
  status: OccurrenceStatus;
  paidAt?: string; // ISO string
  createdAt: string; // ISO string
}
