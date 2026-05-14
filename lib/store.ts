import { create } from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns";
import { RecurringTodo, Occurrence } from "@/types";
import { generateMissingOccurrences } from "./generator";

interface RtState {
  recurringTodos: RecurringTodo[];
  occurrences: Occurrence[];
  currentPeriod: string; // "YYYY-MM"
  
  // Actions
  addRecurringTodo: (todo: RecurringTodo) => void;
  editRecurringTodo: (id: string, updates: Partial<RecurringTodo>) => void;
  toggleOccurrenceStatus: (id: string) => void;
  setCurrentPeriod: (period: string) => void;
  triggerGeneration: () => void;
  
  // To deal with hydration issues in Next.js
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useStore = create<RtState>()(
  persist(
    (set, get) => ({
      recurringTodos: [],
      occurrences: [],
      currentPeriod: format(new Date(), "yyyy-MM"),
      
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      addRecurringTodo: (todo) => {
        set((state) => ({
          recurringTodos: [...state.recurringTodos, todo],
        }));
        get().triggerGeneration();
      },

      editRecurringTodo: (id, updates) => {
        set((state) => ({
          recurringTodos: state.recurringTodos.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
        get().triggerGeneration();
      },

      toggleOccurrenceStatus: (id) => {
        set((state) => ({
          occurrences: state.occurrences.map((o) => {
            if (o.id === id) {
              const isPending = o.status === "pending";
              return {
                ...o,
                status: isPending ? "paid" : "pending",
                paidAt: isPending ? new Date().toISOString() : undefined,
              };
            }
            return o;
          }),
        }));
      },

      setCurrentPeriod: (period) => {
        set({ currentPeriod: period });
        get().triggerGeneration();
      },

      triggerGeneration: () => {
        set((state) => {
          const newOccurrences = generateMissingOccurrences(
            state.recurringTodos,
            state.occurrences,
            state.currentPeriod
          );
          
          if (newOccurrences.length > 0) {
            return { occurrences: [...state.occurrences, ...newOccurrences] };
          }
          return state; // no change
        });
      },
    }),
    {
      name: "rt.state",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        state?.triggerGeneration();
      },
    }
  )
);
