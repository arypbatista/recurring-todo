"use client";

import { RecurringTodo, Occurrence } from "@/types";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useI18n } from "./i18n-provider";

const PASTEL_THEMES = [
  { bg: "bg-violet-50/80", border: "border-violet-200/60", text: "text-violet-900", editBg: "bg-violet-100/60 hover:bg-violet-200/80 text-violet-700", checkBorder: "border-violet-300" },
  { bg: "bg-rose-50/80", border: "border-rose-200/60", text: "text-rose-900", editBg: "bg-rose-100/60 hover:bg-rose-200/80 text-rose-700", checkBorder: "border-rose-300" },
  { bg: "bg-amber-50/80", border: "border-amber-200/60", text: "text-amber-900", editBg: "bg-amber-100/60 hover:bg-amber-200/80 text-amber-700", checkBorder: "border-amber-300" },
  { bg: "bg-emerald-50/80", border: "border-emerald-200/60", text: "text-emerald-900", editBg: "bg-emerald-100/60 hover:bg-emerald-200/80 text-emerald-700", checkBorder: "border-emerald-300" },
  { bg: "bg-sky-50/80", border: "border-sky-200/60", text: "text-sky-900", editBg: "bg-sky-100/60 hover:bg-sky-200/80 text-sky-700", checkBorder: "border-sky-300" },
  { bg: "bg-fuchsia-50/80", border: "border-fuchsia-200/60", text: "text-fuchsia-900", editBg: "bg-fuchsia-100/60 hover:bg-fuchsia-200/80 text-fuchsia-700", checkBorder: "border-fuchsia-300" },
];

interface RecurringItemProps {
  index?: number;
  occurrence: Occurrence;
  recurringTodo: RecurringTodo;
  onEdit: (todo: RecurringTodo) => void;
}

export function RecurringItem({ index, occurrence, recurringTodo, onEdit }: RecurringItemProps) {
  const { t } = useI18n();

  const toggleOccurrenceStatus = useStore((state) => state.toggleOccurrenceStatus);
  const isPending = occurrence.status === "pending";

  const currentMonthStr = format(new Date(), "yyyy-MM");
  const isOverdue =
    isPending &&
    (occurrence.period < currentMonthStr ||
      (occurrence.period === currentMonthStr &&
        recurringTodo.dueDay &&
        recurringTodo.dueDay < new Date().getDate()));

  const theme = index !== undefined ? PASTEL_THEMES[index % PASTEL_THEMES.length] : PASTEL_THEMES[0];

  return (
    <div
      className={`
        mb-2.5 rounded-2xl border-2 backdrop-blur-sm
        transition-all duration-200 ease-out
        hover:-translate-y-px hover:shadow-md
        animate-slide-up
        ${isPending
          ? `${theme.bg} ${theme.border} ${theme.text} shadow-sm`
          : "bg-muted/30 border-transparent text-muted-foreground opacity-70"
        }
      `}
      style={{ animationDelay: `${(index ?? 0) * 50}ms` }}
    >
      <div className="flex items-center justify-between py-2.5 px-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={occurrence.status === "paid"}
            onCheckedChange={() => toggleOccurrenceStatus(occurrence.id)}
            className={`w-6 h-6 rounded-full ${isPending ? theme.checkBorder : ""} transition-colors`}
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold leading-snug ${!isPending && "line-through"}`}>
                {recurringTodo.title}
              </h3>
              {isOverdue && (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 rounded-full font-semibold">
                  {t('overdue')}
                </Badge>
              )}
            </div>

            <div className="flex items-center text-sm opacity-65 mt-0.5 gap-3">
              {recurringTodo.category && (
                <span className="bg-white/50 px-1.5 py-0 rounded-full text-xs font-medium">
                  {recurringTodo.category}
                </span>
              )}
              <span className="flex items-center text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {occurrence.period}
                {recurringTodo.dueDay && ` · Due ${recurringTodo.dueDay}`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {recurringTodo.amount !== undefined && (
            <span
              className={`text-sm font-bold tabular-nums ${recurringTodo.direction === "inbound"
                ? "text-emerald-600"
                : ""
                }`}
            >
              {recurringTodo.direction === "inbound" ? "+" : ""}
              ${recurringTodo.amount.toFixed(2)}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full h-8 w-8 transition-all duration-150 ${isPending ? theme.editBg : "hover:bg-muted"}`}
            onClick={() => onEdit(recurringTodo)}
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
