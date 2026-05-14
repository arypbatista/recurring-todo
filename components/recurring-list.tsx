"use client";

import { useStore } from "@/lib/store";
import { RecurringItem } from "./recurring-item";
import { RecurringTodo } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowDownLeft, ArrowUpRight, Sparkles, PartyPopper } from "lucide-react";
import { useI18n } from "./i18n-provider";

interface RecurringListProps {
  onEdit: (todo: RecurringTodo) => void;
}

export function RecurringList({ onEdit }: RecurringListProps) {
  const { t } = useI18n();
  const { occurrences, recurringTodos, currentPeriod } = useStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <Sparkles className="w-6 h-6 mx-auto mb-2 animate-float text-primary/50" />
        <span className="text-sm">Loading...</span>
      </div>
    );
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

    // 2. Due date (DESC)
    const aDueDay = a.todo.dueDay || 0;
    const bDueDay = b.todo.dueDay || 0;
    if (aDueDay !== bDueDay) return bDueDay - aDueDay;

    // 3. Creation order
    return new Date(a.todo.createdAt).getTime() - new Date(b.todo.createdAt).getTime();
  });

  // Filter completed items for current period only
  const completedItems = occurrences.filter(
    (o) => o.status === "paid" && o.period === currentPeriod
  ).map(o => ({ occurrence: o, todo: todoMap.get(o.recurringTodoId)! }))
    .filter(item => item.todo !== undefined);

  // Sort completed items similarly (Due date DESC, then creation order)
  completedItems.sort((a, b) => {
    const aDueDay = a.todo.dueDay || 0;
    const bDueDay = b.todo.dueDay || 0;
    if (aDueDay !== bDueDay) return bDueDay - aDueDay;
    return new Date(a.todo.createdAt).getTime() - new Date(b.todo.createdAt).getTime();
  });

  // Calculate monthly summary
  let totalInbound = 0;
  let totalOutbound = 0;
  let hasAmounts = false;

  occurrences
    .filter((o) => o.period === currentPeriod)
    .forEach((o) => {
      const todo = todoMap.get(o.recurringTodoId);
      if (todo && todo.amount !== undefined) {
        hasAmounts = true;
        if (todo.direction === "inbound") {
          totalInbound += todo.amount;
        } else {
          totalOutbound += todo.amount;
        }
      }
    });

  return (
    <div className="space-y-5">
      {/* Monthly Summary */}
      {hasAmounts && (
        <div className={`grid gap-3 ${totalInbound > 0 && totalOutbound > 0 ? "grid-cols-2" : "grid-cols-1"}`}>
          {totalInbound > 0 && (
            <div className="bg-emerald-50/70 backdrop-blur-sm border-2 border-emerald-200/50 rounded-2xl p-3 flex items-center gap-3 shadow-sm">
              <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-emerald-600/70 uppercase tracking-wider block">{t('inbound')}</span>
                <span className="text-lg font-bold text-emerald-700 leading-tight">${totalInbound.toFixed(2)}</span>
              </div>
            </div>
          )}
          {totalOutbound > 0 && (
            <div className="bg-orange-50/70 backdrop-blur-sm border-2 border-orange-200/50 rounded-2xl p-3 flex items-center gap-3 shadow-sm">
              <div className="h-9 w-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-orange-600/70 uppercase tracking-wider block">{t('outbound')}</span>
                <span className="text-lg font-bold text-orange-700 leading-tight">${totalOutbound.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pending Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xs font-bold text-foreground/60 uppercase tracking-widest">
            {t('pending')}
          </h3>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {pendingItems.length}
          </span>
        </div>
        {pendingItems.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-2xl bg-card/30 backdrop-blur-sm">
            <PartyPopper className="w-8 h-8 mx-auto mb-2 text-primary/40 animate-float" />
            <p className="font-semibold">{t('allCaughtUp')}</p>
            <p className="text-sm opacity-60 mt-0.5">{t('nothingPending')}</p>
          </div>
        ) : (
          <div>
            {pendingItems.map(({ occurrence, todo }, index) => (
              <RecurringItem
                key={occurrence.id}
                index={index}
                occurrence={occurrence}
                recurringTodo={todo}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Completed Section */}
      {completedItems.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="completed" className="border-none">
            <AccordionTrigger className="hover:no-underline py-2 px-4 rounded-full bg-emerald-50/70 border border-emerald-200/50 text-emerald-700 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <div className="flex items-center gap-2">
                {t('completed')}
                <span className="bg-emerald-200/50 text-emerald-800 px-2 py-0.5 rounded-full text-[10px]">
                  {completedItems.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              {completedItems.map(({ occurrence, todo }, index) => (
                <RecurringItem
                  key={occurrence.id}
                  index={index}
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
