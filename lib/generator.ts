import { v4 as uuidv4 } from "uuid";
import { parseISO, format, differenceInMonths, addMonths, startOfMonth, parse } from "date-fns";
import { RecurringTodo, Occurrence } from "@/types";

/**
 * Generates missing occurrences for active recurring todos up to the target period.
 * Missing occurrences are generated for every month starting from the recurring todo's creation
 * month, up to the target period, provided the recurring todo is active.
 * (If an item is inactive, we don't generate new ones, but we might still want to
 * generate past ones if it was active back then, but for simplicity, the spec says:
 * "Missing monthly occurrences auto-generate on app startup/navigation" for active ones.)
 */
export function generateMissingOccurrences(
  recurringTodos: RecurringTodo[],
  existingOccurrences: Occurrence[],
  targetPeriod: string // "YYYY-MM"
): Occurrence[] {
  const newOccurrences: Occurrence[] = [];
  
  // Create a fast lookup map: recurringTodoId -> set of existing periods
  const occurrenceMap = new Map<string, Set<string>>();
  for (const occ of existingOccurrences) {
    if (!occurrenceMap.has(occ.recurringTodoId)) {
      occurrenceMap.set(occ.recurringTodoId, new Set());
    }
    occurrenceMap.get(occ.recurringTodoId)!.add(occ.period);
  }

  const targetDate = parse(targetPeriod, "yyyy-MM", new Date());
  const targetMonthStart = startOfMonth(targetDate);

  for (const todo of recurringTodos) {
    if (!todo.active) continue;

    const createdDate = parseISO(todo.createdAt);
    const createdMonthStart = startOfMonth(createdDate);
    
    // We only generate up to the current target period or from creation, whichever is needed.
    // If target period is in the past compared to creation, diff will be negative
    const totalMonths = differenceInMonths(targetMonthStart, createdMonthStart);
    
    if (totalMonths < 0) continue; // target period is before the todo was created

    const existingPeriods = occurrenceMap.get(todo.id) || new Set<string>();

    for (let i = 0; i <= totalMonths; i++) {
      const currentMonth = addMonths(createdMonthStart, i);
      const periodString = format(currentMonth, "yyyy-MM");

      if (!existingPeriods.has(periodString)) {
        newOccurrences.push({
          id: uuidv4(),
          recurringTodoId: todo.id,
          period: periodString,
          status: "pending",
          createdAt: new Date().toISOString(),
        });
        existingPeriods.add(periodString); // prevent duplicates within generation cycle
      }
    }
  }

  return newOccurrences;
}
