"use client";

import { useState } from "react";
import { MonthNavigation } from "@/components/month-navigation";
import { RecurringList } from "@/components/recurring-list";
import { AddEditDialog } from "@/components/add-edit-dialog";
import { BulkAddDialog } from "@/components/bulk-add-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { RecurringTodo } from "@/types";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
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
    <div className="min-h-screen text-foreground pb-28 relative">
      {/* Decorative floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-pink-200/30 blur-2xl animate-float" />
        <div className="absolute top-1/4 -right-12 w-40 h-40 rounded-full bg-violet-200/25 blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 -left-16 w-36 h-36 rounded-full bg-amber-200/20 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <header className="pt-8 pb-2">
          <div className="container max-w-2xl mx-auto px-5 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
                <span className="animate-float inline-block mr-1.5">🌟</span>
                Recurring TO-DOs
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">Keep track of what matters, month by month</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
              onClick={() => setIsBulkDialogOpen(true)}
            >
              <Download className="w-4 h-4 mr-1.5" />
              Import
            </Button>
          </div>
        </header>

        <main className="container max-w-2xl mx-auto px-5 py-4">
          <MonthNavigation />

          <div className="mt-6">
            <RecurringList onEdit={handleOpenEditDialog} />
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 animate-fab-pulse"
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

      <BulkAddDialog
        isOpen={isBulkDialogOpen}
        onOpenChange={setIsBulkDialogOpen}
      />

      {/* Footer disclaimer */}
      <footer className="relative z-10 pb-6 pt-12 text-center">
        <p className="text-sm text-muted-foreground/70 flex items-center justify-center gap-1.5">
          <span>🔒</span>
          Your data is stored locally in your browser. Nothing is uploaded to the cloud.
        </p>
      </footer>
    </div>
  );
}
