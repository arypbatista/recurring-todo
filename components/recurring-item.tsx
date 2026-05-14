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
  occurrence: Occurrence;
  recurringTodo: RecurringTodo;
  onEdit: (todo: RecurringTodo) => void;
}

export function RecurringItem({ occurrence, recurringTodo, onEdit }: RecurringItemProps) {
  const toggleOccurrenceStatus = useStore((state) => state.toggleOccurrenceStatus);
  const isPending = occurrence.status === "pending";

  const currentMonthStr = format(new Date(), "yyyy-MM");
  const isOverdue =
    isPending &&
    (occurrence.period < currentMonthStr ||
      (occurrence.period === currentMonthStr &&
        recurringTodo.dueDay &&
        recurringTodo.dueDay < new Date().getDate()));

  return (
    <Card className={`mb-2 transition-colors ${isPending ? "bg-card" : "bg-muted/50 opacity-80"}`}>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={occurrence.status === "paid"}
            onCheckedChange={() => toggleOccurrenceStatus(occurrence.id)}
            className="w-6 h-6 rounded-full"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className={`font-semibold ${!isPending && "line-through text-muted-foreground"}`}>
                {recurringTodo.title}
              </h3>
              {isOverdue && <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">Overdue</Badge>}
            </div>

            <div className="flex items-center text-xs text-muted-foreground mt-1 space-x-3">
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

        <Button variant="ghost" size="icon" onClick={() => onEdit(recurringTodo)}>
          <Edit2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </CardContent>
    </Card>
  );
}
