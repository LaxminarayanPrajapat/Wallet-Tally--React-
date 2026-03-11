
'use client';

import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Download, Loader2, MailCheck } from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useCurrencySymbol } from '@/hooks/use-currency';
import { exportTransactionsToPdf } from '@/app/actions/export';
import { format, startOfDay, endOfDay, isBefore, isAfter } from 'date-fns';

export function ExportDialog() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const currencySymbol = useCurrencySymbol();

  const [open, setOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-01'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const accountCreationDate = useMemo(() => {
    if (user?.metadata?.creationTime) {
      return format(new Date(user.metadata.creationTime), 'yyyy-MM-dd');
    }
    return format(new Date(), 'yyyy-MM-dd');
  }, [user]);

  const today = format(new Date(), 'yyyy-MM-dd');

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore) return;

    const start = startOfDay(new Date(startDate));
    const end = endOfDay(new Date(endDate));
    const accountCreation = startOfDay(new Date(accountCreationDate));
    const currentDate = endOfDay(new Date());

    // Validate: start date should not be less than user registered date
    if (isBefore(start, accountCreation)) {
      toast({
        variant: "destructive",
        title: "Invalid Start Date",
        description: "Start date cannot be earlier than your account creation date.",
      });
      return;
    }

    // Validate: end date should be greater or equal than start date
    if (isBefore(end, start)) {
      toast({
        variant: "destructive",
        title: "Invalid Date Range",
        description: "End date cannot be earlier than the start date.",
      });
      return;
    }

    // Validate: end date should not be greater than current date
    if (isAfter(end, currentDate)) {
      toast({
        variant: "destructive",
        title: "Invalid End Date",
        description: "End date cannot be in the future.",
      });
      return;
    }

    setIsExporting(true);
    try {
      const transactionsRef = collection(firestore, 'users', user.uid, 'transactions');
      const q = query(
        transactionsRef,
        where('date', '>=', start),
        where('date', '<=', end),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(q);

      const transactions = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          amount: data.amount,
          type: data.type,
          category: data.category,
          description: data.description,
          date: data.date && typeof data.date.toDate === 'function'
            ? data.date.toDate().toISOString()
            : null
        };
      });

      if (transactions.length === 0) {
        toast({
          variant: "destructive",
          title: "No Data",
          description: "There are no transactions in the selected date range.",
        });
        setIsExporting(false);
        return;
      }

      const result = await exportTransactionsToPdf(
        user.email!,
        transactions,
        startDate,
        endDate,
        currencySymbol || '₹'
      );

      if (result.success) {
        toast({
          title: "Report Sent!",
          description: `A PDF report has been sent to ${user.email}.`,
        });
        setOpen(false);
      } else {
        throw new Error(result.error || 'Failed to generate PDF');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: error.message || "An error occurred while generating your report.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="ml-auto bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white gap-2 px-4 rounded-md font-bold shadow-sm border-0"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] bg-white border-0 shadow-2xl p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-tr from-primary to-accent bg-clip-text text-transparent">
            Export Report
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium pt-2">
            Select a date range to receive a detailed PDF report of your transactions via email.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleExport} className="space-y-6 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                min={accountCreationDate}
                max={today}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-xl border-[#cbd5e1] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                min={startDate}
                max={today}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-xl border-[#cbd5e1] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isExporting}
            className="w-full h-14 bg-gradient-to-tr from-primary to-accent hover:opacity-95 text-white font-bold text-lg rounded-2xl transition-all shadow-xl mt-4 border-0"
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <MailCheck className="mr-2 h-5 w-5" />
                Send PDF Report
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
