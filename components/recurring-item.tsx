"use client";

import { RecurringTodo, Occurrence } from "@/types";
import { useStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface RecurringItemProps {
  index?: number;
  occurrence: Occurrence;
  recurringTodo: RecurringTodo;
  onEdit: (todo: RecurringTodo) => void;
}

export function RecurringItem({ index, occurrence, recurringTodo, onEdit }: RecurringItemProps) {
  const toggleOccurrenceStatus = useStore((state) => state.toggleOccurrenceStatus);
  const isPending = occurrence.status === "pending";

  const currentMonthStr = format(new Date(), "yyyy-MM");
  const isOverdue =
    isPending &&
    (occurrence.period < currentMonthStr ||
      (occurrence.period === currentMonthStr &&
        recurringTodo.dueDay &&
        recurringTodo.dueDay < new Date().getDate()));

  const pastelColors = [
    "bg-indigo-50 border-indigo-100 text-indigo-900",
    "bg-pink-50 border-pink-100 text-pink-900",
    "bg-orange-50 border-orange-100 text-orange-900",
    "bg-yellow-50 border-yellow-100 text-yellow-900",
    "bg-emerald-50 border-emerald-100 text-emerald-900",
    "bg-blue-50 border-blue-100 text-blue-900",
  ];
  
  const colorClass = index !== undefined ? pastelColors[index % pastelColors.length] : pastelColors[0];
  const pendingClass = isPending ? colorClass : "bg-muted/50 opacity-80 border-transparent text-muted-foreground";

  return (
    <Card className={`mb-2 transition-colors rounded-3xl border-2 shadow-sm ${pendingClass}`}>
      <CardContent className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={occurrence.status === "paid"}
            onCheckedChange={() => toggleOccurrenceStatus(occurrence.id)}
            className="w-6 h-6 rounded-full"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className={`text-base font-bold ${!isPending && "line-through text-muted-foreground"}`}>
                {recurringTodo.title}
              </h3>
              {isOverdue && <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">Overdue</Badge>}
            </div>

            <div className="flex items-center text-sm text-muted-foreground mt-0.5 space-x-3">
              {recurringTodo.category && (
                <span className="bg-secondary px-1.5 py-0.5 rounded-sm">{recurringTodo.category}</span>
              )}

              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {occurrence.period}
                {recurringTodo.dueDay && ` (Due: ${recurringTodo.dueDay})`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {recurringTodo.amount !== undefined && (
            <span
              className={`font-medium ${
                recurringTodo.direction === "inbound"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-foreground"
              }`}
            >
              {recurringTodo.direction === "inbound" ? "+" : ""}
              ${recurringTodo.amount.toFixed(2)}
            </span>
          )}
          <Button variant="ghost" size="icon" className="rounded-full bg-white/40 hover:bg-white text-indigo-900" onClick={() => onEdit(recurringTodo)}>
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
