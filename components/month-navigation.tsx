"use client";

import { useStore } from "@/lib/store";
import { parse, format, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "./i18n-provider";

export function MonthNavigation() {
  const { t } = useI18n();
  const currentPeriod = useStore((state) => state.currentPeriod);
  const setCurrentPeriod = useStore((state) => state.setCurrentPeriod);

  const currentDate = parse(currentPeriod, "yyyy-MM", new Date());

  const handlePrev = () => {
    setCurrentPeriod(format(subMonths(currentDate, 1), "yyyy-MM"));
  };

  const handleNext = () => {
    setCurrentPeriod(format(addMonths(currentDate, 1), "yyyy-MM"));
  };

  const handleToday = () => {
    setCurrentPeriod(format(new Date(), "yyyy-MM"));
  };

  return (
    <div className="flex items-center justify-center gap-5 py-3">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10 bg-card/60 backdrop-blur-sm border border-border/50 text-foreground hover:bg-card hover:scale-105 transition-all duration-200 shadow-sm"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex flex-col items-center min-w-[180px]">
        <h2 className="text-xl font-bold text-foreground">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        {currentPeriod !== format(new Date(), "yyyy-MM") && (
          <button
            onClick={handleToday}
            className="text-sm text-primary/90 hover:text-primary hover:underline mt-0.5 transition-colors duration-150"
          >
            {t('backToCurrentMonth')}
          </button>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10 bg-card/60 backdrop-blur-sm border border-border/50 text-foreground hover:bg-card hover:scale-105 transition-all duration-200 shadow-sm"
        onClick={handleNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
