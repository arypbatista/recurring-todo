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
    <div className="flex items-center justify-center gap-4 py-4">
      <Button variant="outline" size="icon" className="rounded-full border-2 border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 h-10 w-10" onClick={handlePrev}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-pink-300">✧</span>
          <h2 className="text-xl font-bold text-indigo-900">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <span className="text-emerald-300">✦</span>
        </div>
        {currentPeriod !== format(new Date(), "yyyy-MM") && (
          <button 
            onClick={handleToday}
            className="text-xs text-indigo-400 hover:text-indigo-600 hover:underline mt-1"
          >
            Back to current month
          </button>
        )}
      </div>

      <Button variant="outline" size="icon" className="rounded-full border-2 border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 h-10 w-10" onClick={handleNext}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
