"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { RecurringTodo } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface BulkAddDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkAddDialog({ isOpen, onOpenChange }: BulkAddDialogProps) {
  const addRecurringTodo = useStore((state) => state.addRecurringTodo);
  const [text, setText] = useState("");
  
  const parseText = (input: string) => {
    const lines = input.split("\n");
    const items: { title: string; dueDay?: number }[] = [];
    
    // Matches: "- Title (30/mes)" or "- Title"
    const regex = /^\s*-\s+(.+?)(?:\s*\((\d+)\/mes\))?\s*$/;
    
    for (const line of lines) {
      const match = line.match(regex);
      if (match) {
        const title = match[1].trim();
        const dueDayStr = match[2];
        let dueDay: number | undefined = undefined;
        
        if (dueDayStr) {
          const parsed = parseInt(dueDayStr, 10);
          if (!isNaN(parsed) && parsed >= 1 && parsed <= 31) {
            dueDay = parsed;
          }
        }
        
        items.push({ title, dueDay });
      }
    }
    
    return items;
  };

  const parsedItems = parseText(text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedItems.length === 0) return;

    for (const item of parsedItems) {
      const newTodo: RecurringTodo = {
        id: uuidv4(),
        title: item.title,
        recurrence: "monthly",
        dueDay: item.dueDay,
        active: true,
        createdAt: new Date().toISOString(),
      };
      addRecurringTodo(newTodo);
    }
    
    setText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Bulk Import</DialogTitle>
            <DialogDescription>
              Paste a list of tasks. Format: <code className="bg-muted px-1 py-0.5 rounded">- Task Name (30/mes)</code>
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="- Gastos Comunes (30/mes)&#10;- Tributos domiciliarios (30/mes)&#10;- Internet"
              className="min-h-[200px]"
            />
            
            {text.trim() && (
              <div className="mt-4 text-sm">
                <p className="font-semibold mb-2">Preview ({parsedItems.length} items to add):</p>
                <div className="max-h-32 overflow-y-auto space-y-1 bg-muted/50 p-2 rounded border">
                  {parsedItems.length === 0 ? (
                    <span className="text-muted-foreground">No matching items found.</span>
                  ) : (
                    parsedItems.map((item, i) => (
                      <div key={i} className="flex justify-between border-b last:border-0 pb-1 last:pb-0 border-border/50">
                        <span>{item.title}</span>
                        {item.dueDay && <span className="text-muted-foreground">Day {item.dueDay}</span>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={parsedItems.length === 0}>
              Import {parsedItems.length} Items
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
