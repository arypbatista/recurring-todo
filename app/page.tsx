"use client";

import { useState } from "react";
import { MonthNavigation } from "@/components/month-navigation";
import { RecurringList } from "@/components/recurring-list";
import { AddEditDialog } from "@/components/add-edit-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RecurringTodo } from "@/types";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<RecurringTodo | null>(null);

  const handleOpenAddDialog = () => {
    setEditingTodo(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (todo: RecurringTodo) => {
    setEditingTodo(todo);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <header className="border-b bg-card">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center tracking-tight">Recurring TO-DOs</h1>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6">
        <MonthNavigation />
        
        <div className="mt-6">
          <RecurringList onEdit={handleOpenEditDialog} />
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          size="icon" 
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={handleOpenAddDialog}
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add Recurring Task</span>
        </Button>
      </div>

      <AddEditDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        editTodo={editingTodo} 
      />
    </div>
  );
}
