"use client";

import { useStore } from "@/lib/store";
import { RecurringItem } from "./recurring-item";
import { RecurringTodo } from "@/types";
import { format } from "date-fns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RecurringListProps {
  onEdit: (todo: RecurringTodo) => void;
}

export function RecurringList({ onEdit }: RecurringListProps) {
  const { occurrences, recurringTodos, currentPeriod, _hasHydrated } = useStore();

  if (!_hasHydrated) {
    return <div className="py-8 text-center text-muted-foreground">Loading...</div>;
  }

  const currentMonthStr = format(new Date(), "yyyy-MM");
  const todayDate = new Date().getDate();

  // Create a map for quick lookup
  const todoMap = new Map<string, RecurringTodo>(recurringTodos.map(t => [t.id, t]));

  // Filter pending items
  // Pending list includes: Current month pending, Older unpaid occurrences
  const pendingItems = occurrences.filter(
    (o) => o.status === "pending" && o.period <= currentPeriod
  ).map(o => ({ occurrence: o, todo: todoMap.get(o.recurringTodoId)! }))
   .filter(item => item.todo !== undefined); // safeguard

  // Sort pending items
  pendingItems.sort((a, b) => {
    // 1. Overdue first
    const aOverdue = a.occurrence.period < currentMonthStr || (a.occurrence.period === currentMonthStr && a.todo.dueDay && a.todo.dueDay < todayDate);
    const bOverdue = b.occurrence.period < currentMonthStr || (b.occurrence.period === currentMonthStr && b.todo.dueDay && b.todo.dueDay < todayDate);
    
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;

    // 2. Due date
    const aDueDay = a.todo.dueDay || 999;
    const bDueDay = b.todo.dueDay || 999;
    if (aDueDay !== bDueDay) return aDueDay - bDueDay;

    // 3. Creation order
    return new Date(a.todo.createdAt).getTime() - new Date(b.todo.createdAt).getTime();
  });

  // Filter completed items for current period only
  const completedItems = occurrences.filter(
    (o) => o.status === "paid" && o.period === currentPeriod
  ).map(o => ({ occurrence: o, todo: todoMap.get(o.recurringTodoId)! }))
   .filter(item => item.todo !== undefined);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
          Pending ({pendingItems.length})
        </h3>
        {pendingItems.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground border border-dashed rounded-lg bg-card/50">
            No pending items. You're all caught up!
          </div>
        ) : (
          <div>
            {pendingItems.map(({ occurrence, todo }) => (
              <RecurringItem 
                key={occurrence.id} 
                occurrence={occurrence} 
                recurringTodo={todo} 
                onEdit={onEdit} 
              />
            ))}
          </div>
        )}
      </div>

      {completedItems.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="completed" className="border-none">
            <AccordionTrigger className="hover:no-underline py-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Completed ({completedItems.length})
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              {completedItems.map(({ occurrence, todo }) => (
                <RecurringItem 
                  key={occurrence.id} 
                  occurrence={occurrence} 
                  recurringTodo={todo} 
                  onEdit={onEdit} 
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
