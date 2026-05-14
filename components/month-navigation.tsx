"use client";

import { useStore } from "@/lib/store";
import { parse, format, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MonthNavigation() {
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
    <div className="flex items-center justify-between py-4">
      <Button variant="outline" size="icon" onClick={handlePrev}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        {currentPeriod !== format(new Date(), "yyyy-MM") && (
          <button 
            onClick={handleToday}
            className="text-xs text-muted-foreground hover:underline mt-1"
          >
            Back to current month
          </button>
        )}
      </div>

      <Button variant="outline" size="icon" onClick={handleNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
