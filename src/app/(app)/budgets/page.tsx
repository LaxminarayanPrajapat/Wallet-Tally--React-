import { BudgetCard } from '@/components/budgets/budget-card';
import { EditBudgetDialog } from '@/components/budgets/edit-budget-dialog';
import { Button } from '@/components/ui/button';
import { budgets } from '@/lib/data';
import { PlusCircle } from 'lucide-react';

export default function BudgetsPage() {
  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Budgets</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Set and track your monthly spending goals.
          </p>
        </div>
        <Button size="sm" className="gap-1 w-full sm:w-auto">
          <PlusCircle className="h-4 w-4" />
          Create Budget
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
        {/* Placeholder for creating a new budget */}
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-6 text-center min-h-[200px]">
          <PlusCircle className='h-10 w-10 text-muted-foreground/50 mb-4' />
          <h3 className="text-base md:text-lg font-medium text-muted-foreground">New Budget</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            Click the button to create a new budget.
          </p>
        </div>
      </div>
    </div>
  );
}
