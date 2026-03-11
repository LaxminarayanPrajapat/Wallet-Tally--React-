'use client';

import { getSimpleColumns } from '@/components/transactions/columns-simple';
import { DataTableSimple } from '@/components/transactions/data-table-simple';
import { AddTransactionSheet } from '@/components/transactions/add-transaction-sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCurrencySymbol } from '@/hooks/use-currency';
import { useMemo, useState, useEffect } from 'react';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { startOfMonth, endOfMonth, format, subMonths, addMonths, isSameMonth } from 'date-fns';

export default function TransactionsPage() {
  const currencySymbol = useCurrencySymbol();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [viewDate, setViewDate] = useState<Date | null>(null);

  useEffect(() => {
    setViewDate(new Date());
  }, []);

  const accountCreationDate = useMemo(() => {
    if (user?.metadata?.creationTime) {
      return new Date(user.metadata.creationTime);
    }
    return new Date();
  }, [user]);

  const transactionsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'transactions'),
      orderBy('date', 'desc')
    );
  }, [firestore, user]);

  const { data: transactions, isLoading: isTransactionsLoading } = useCollection(transactionsQuery);

  const filteredTransactions = useMemo(() => {
    if (!transactions || !viewDate) return [];
    const start = startOfMonth(viewDate);
    const end = endOfMonth(viewDate);
    return transactions.filter(t => {
      const d = t.date instanceof Timestamp ? t.date.toDate() : new Date(t.date);
      return d >= start && d <= end;
    });
  }, [transactions, viewDate]);

  const columns = useMemo(() => getSimpleColumns(currencySymbol), [currencySymbol]);

  // Calculate monthly summary
  const monthlySummary = useMemo(() => {
    if (!filteredTransactions) return { income: 0, expense: 0, balance: 0 };

    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const expense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    return {
      income,
      expense,
      balance: income - expense
    };
  }, [filteredTransactions]);

  if (isUserLoading || isTransactionsLoading || !viewDate) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isFirstMonth = isSameMonth(viewDate, accountCreationDate);
  const isLastMonth = isSameMonth(viewDate, new Date());

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
            <CardTitle className="text-base md:text-lg font-bold text-[#1e293b]">All Transactions</CardTitle>
            <div className="flex items-center gap-1.5 bg-[#f1f5f9] p-1 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 rounded-md hover:bg-white shadow-none"
                disabled={isFirstMonth}
                onClick={() => setViewDate(subMonths(viewDate, 1))}
              >
                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <span className="text-xs font-bold text-[#1e293b] min-w-[90px] md:min-w-[100px] text-center">
                {format(viewDate, 'MMMM yyyy')}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 rounded-md hover:bg-white shadow-none"
                disabled={isLastMonth}
                onClick={() => setViewDate(addMonths(viewDate, 1))}
              >
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
          <AddTransactionSheet />
        </CardHeader>
      </Card>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-md border-l-4 border-l-[#10b981]">
          <CardContent className="p-4">
            <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-1">Income</p>
            <p className="text-2xl font-black text-[#10b981]">
              {currencySymbol}{monthlySummary.income.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-l-4 border-l-[#ef4444]">
          <CardContent className="p-4">
            <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-1">Expense</p>
            <p className="text-2xl font-black text-[#ef4444]">
              {currencySymbol}{monthlySummary.expense.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-l-4 border-l-[#3b82f6]">
          <CardContent className="p-4">
            <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-1">Net</p>
            <p className={`text-2xl font-black ${monthlySummary.balance >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
              {currencySymbol}{monthlySummary.balance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <DataTableSimple columns={columns} data={filteredTransactions || []} />
    </div>
  );
}