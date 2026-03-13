import { IncomeVsExpenseChart } from '@/components/reports/income-vs-expense-chart';
import { SpendingByCategoryChart } from '@/components/reports/spending-by-category-chart';
import { transactions } from '@/lib/data';

export default function ReportsPage() {
  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Visualize your financial patterns.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <SpendingByCategoryChart transactions={transactions} />
        <IncomeVsExpenseChart />
      </div>
    </div>
  );
}
