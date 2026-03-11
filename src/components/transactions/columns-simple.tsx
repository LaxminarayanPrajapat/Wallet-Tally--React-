'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { Timestamp } from 'firebase/firestore';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export const getSimpleColumns = (currencySymbol: string | null): ColumnDef<any>[] => [
    {
        accessorKey: 'date',
        header: () => <div className="font-bold text-[#64748b] text-xs uppercase tracking-wider">Date</div>,
        cell: ({ row }) => {
            const date = row.original.date;
            let dateStr = 'Pending...';

            if (date instanceof Timestamp) {
                dateStr = date.toDate().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            }

            return <span className="text-sm font-medium text-[#334155]">{dateStr}</span>;
        },
    },
    {
        accessorKey: 'type',
        header: () => <div className="font-bold text-[#64748b] text-xs uppercase tracking-wider">Type</div>,
        cell: ({ row }) => {
            const type = row.original.type;
            const isIncome = type === 'income';

            return (
                <div className="flex items-center gap-2">
                    {isIncome ? (
                        <ArrowUpCircle className="h-4 w-4 text-[#10b981]" />
                    ) : (
                        <ArrowDownCircle className="h-4 w-4 text-[#ef4444]" />
                    )}
                    <Badge
                        className={cn(
                            "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border-0",
                            isIncome
                                ? "bg-[#d1fae5] text-[#059669]"
                                : "bg-[#fee2e2] text-[#dc2626]"
                        )}
                    >
                        {type}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: 'category',
        header: () => <div className="font-bold text-[#64748b] text-xs uppercase tracking-wider">Category</div>,
        cell: ({ row }) => {
            const categoryName = row.original.category;

            return (
                <Badge
                    variant="secondary"
                    className="bg-[#dbeafe] text-[#2563eb] border-0 rounded-md px-2 py-0.5 text-[10px] font-bold"
                >
                    {categoryName}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'description',
        header: () => <div className="font-bold text-[#64748b] text-xs uppercase tracking-wider">Description</div>,
        cell: ({ row }) => {
            const description = row.original.description || '-';
            return (
                <span className="text-sm text-[#64748b] truncate max-w-[250px] block">
                    {description}
                </span>
            );
        }
    },
    {
        accessorKey: 'amount',
        header: () => <div className="font-bold text-[#64748b] text-xs uppercase tracking-wider text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            const { type } = row.original;

            if (currencySymbol === null) {
                return <Skeleton className="h-6 w-24 ml-auto" />;
            }

            const formatted = new Intl.NumberFormat('en-IN', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(amount);

            const displayAmount = `${currencySymbol}${formatted}`;

            return (
                <div
                    className={cn(
                        'text-right font-bold text-base',
                        type === 'income' ? 'text-[#10b981]' : 'text-[#ef4444]',
                    )}
                >
                    {type === 'income' ? `+${displayAmount}` : `-${displayAmount}`}
                </div>
            );
        },
    },
];
