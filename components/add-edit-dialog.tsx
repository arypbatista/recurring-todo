"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { RecurringTodo } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editTodo?: RecurringTodo | null;
}

export function AddEditDialog({ isOpen, onOpenChange, editTodo }: AddEditDialogProps) {
  const addRecurringTodo = useStore((state) => state.addRecurringTodo);
  const editRecurringTodo = useStore((state) => state.editRecurringTodo);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dueDay, setDueDay] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [direction, setDirection] = useState<"inbound" | "outbound">("outbound");
  const [active, setActive] = useState(true);

  // Initialize state when editing
  useEffect(() => {
    if (isOpen) {
      if (editTodo) {
        setTitle(editTodo.title);
        setCategory(editTodo.category || "");
        setDueDay(editTodo.dueDay ? editTodo.dueDay.toString() : "");
        setAmount(editTodo.amount ? editTodo.amount.toString() : "");
        setDirection(editTodo.direction || "outbound");
        setActive(editTodo.active);
      } else {
        setTitle("");
        setCategory("");
        setDueDay("");
        setAmount("");
        setDirection("outbound");
        setActive(true);
      }
    }
  }, [isOpen, editTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedDueDay = dueDay ? parseInt(dueDay, 10) : undefined;
    const parsedAmount = amount ? parseFloat(amount) : undefined;

    if (editTodo) {
      editRecurringTodo(editTodo.id, {
        title: title.trim(),
        category: category.trim() || undefined,
        dueDay: parsedDueDay,
        amount: parsedAmount,
        direction: parsedAmount !== undefined ? direction : undefined,
        active,
      });
    } else {
      const newTodo: RecurringTodo = {
        id: uuidv4(),
        title: title.trim(),
        category: category.trim() || undefined,
        recurrence: "monthly",
        dueDay: parsedDueDay,
        amount: parsedAmount,
        direction: parsedAmount !== undefined ? direction : undefined,
        active,
        createdAt: new Date().toISOString(),
      };
      addRecurringTodo(newTodo);
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editTodo ? "Edit Recurring Task" : "Add Recurring Task"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Rent, Internet"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category (Optional)</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Housing, Utilities"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="dueDay">Due Day (1-31, Optional)</Label>
              <Input
                id="dueDay"
                type="number"
                min="1"
                max="31"
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                placeholder="e.g., 5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (Optional)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 50.00"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="direction">Direction</Label>
                <Select value={direction} onValueChange={(v) => setDirection(v as "inbound" | "outbound")}>
                  <SelectTrigger id="direction">
                    <SelectValue placeholder="Direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outbound">Outbound (Expense)</SelectItem>
                    <SelectItem value="inbound">Inbound (Income)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="active"
                checked={active}
                onCheckedChange={(checked) => setActive(checked as boolean)}
              />
              <Label htmlFor="active" className="font-normal">
                Active (generates monthly occurrences)
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editTodo ? "Save Changes" : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
