'use client';

import React, { useMemo } from 'react';
import {
  Users,
  MessageSquare,
  Star,
  Globe,
  Terminal,
  Cpu,
  Loader2,
  Cloud,
  Activity,
  Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, collectionGroup } from 'firebase/firestore';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { countries } from '@/lib/countries';

/**
 * @fileOverview Administrative dashboard providing high-fidelity analytics and system health metrics.
 */
export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  const usersQuery = useMemoFirebase(() => {
    if (!firestore || isUserLoading || !user) return null;
    return collection(firestore, 'users');
  }, [firestore, user, isUserLoading]);
  const { data: users, isLoading: isUsersLoading } = useCollection(usersQuery);

  const feedbackQuery = useMemoFirebase(() => {
    if (!firestore || isUserLoading || !user) return null;
    return collectionGroup(firestore, 'feedback');
  }, [firestore, user, isUserLoading]);
  const { data: allFeedback, isLoading: isFeedbackLoading } = useCollection(feedbackQuery);

  const registeredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(u => u.email && u.email.includes('@'));
  }, [users]);

  const totalUsers = registeredUsers.length;
  const totalFeedbacks = allFeedback?.length || 0;

  const avgRating = useMemo(() => {
    if (!allFeedback || allFeedback.length === 0) return "0.0";
    const sum = allFeedback.reduce((acc, f) => acc + (Number(f.rating) || 0), 0);
    return (sum / allFeedback.length).toFixed(1);
  }, [allFeedback]);

  // Robust logic to identify and group demographics
  const countryData = useMemo(() => {
    if (!registeredUsers || registeredUsers.length === 0) return [];
    const counts: Record<string, number> = {};

    registeredUsers.forEach(u => {
      // Robust detection for India/IN
      const countryVal = u.country?.trim().toUpperCase() || 'IN';

      const match = countries.find(c =>
        c.code.toUpperCase() === countryVal ||
        c.name.toUpperCase() === countryVal
      );

      const name = match ? match.name : 'Unknown';
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [registeredUsers]);

  const COLORS = ['#1e3a8a', '#064e3b', '#10b981', '#00A3AD', '#8b5cf6', '#f59e0b', '#ef4444', '#3b82f6'];

  if (isUserLoading || isUsersLoading || isFeedbackLoading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-700">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b]">Dashboard</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">Welcome back, WalletTallyAdmin!</p>
        </div>
      </div>

      {/* Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <SummaryItem icon={Users} label="Total Users" value={totalUsers} />
        <SummaryItem icon={MessageSquare} label="Total Feedbacks" value={totalFeedbacks} />
        <SummaryItem icon={Star} label="Avg Rating" value={`${avgRating} ★`} />
      </div>

      {/* Analytics Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="shadow-lg border-0 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="py-4 md:py-5 px-4 md:px-6 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm md:text-base font-bold text-slate-700 flex items-center gap-2">
              <Globe className="w-4 h-4 md:w-5 md:h-5 text-primary" /> User Demographics
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[350px] p-4 md:p-6">
            {countryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData}
                    innerRadius={0}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                    nameKey="name"
                    stroke="#fff"
                    strokeWidth={2}
                    startAngle={90}
                    endAngle={450}
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const total = countryData.reduce((acc, curr) => acc + curr.value, 0);
                        const percent = ((data.value / total) * 100).toFixed(1);
                        return (
                          <div className="bg-[#1a1c1e] text-white p-3 rounded-lg shadow-2xl text-[10px] border border-white/10 min-w-[140px]">
                            <p className="font-bold mb-1.5 text-xs border-b border-white/10 pb-1">{data.name}</p>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].color }} />
                              <span className="font-medium">{data.value} users ({percent}%)</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ paddingLeft: '20px' }}
                    formatter={(value) => <span className="text-[11px] font-medium text-slate-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Globe className="w-12 h-12 text-slate-200 mb-3" />
                <p className="text-sm font-medium text-slate-400">No demographic data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="py-4 md:py-5 px-4 md:px-6 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm md:text-base font-bold text-slate-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Feedback Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[350px] flex items-center justify-center p-4 md:p-6">
            {allFeedback && allFeedback.length > 0 ? (
              <div className="w-full space-y-5">
                {[5, 4, 3, 2, 1].map(r => {
                  const count = allFeedback.filter(f => Number(f.rating) === r).length;
                  const percent = (allFeedback.length > 0) ? (count / allFeedback.length) * 100 : 0;
                  return (
                    <div key={r} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-600 w-8">{r} ★</span>
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500 w-10 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center space-y-3">
                <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-400">No feedback data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Health Section */}
      <div className="space-y-3 md:space-y-4">
        <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Terminal className="w-3 h-3 md:w-4 md:h-4 text-primary" /> System Information
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <SystemInfoCard icon={Cloud} label="Platform" value="Firebase Hosting" badge="Live" />
          <SystemInfoCard icon={Database} label="Primary DB" value="Cloud Firestore" badge="Stable" />
          <SystemInfoCard icon={Cpu} label="Runtime" value="Next.js v15.5" />
          <SystemInfoCard icon={Activity} label="Monitoring" value="Firebase Vitals" />
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) {
  return (
    <Card className="shadow-lg border-0 rounded-2xl bg-white hover:shadow-xl transition-all">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <div className="text-3xl font-bold text-[#1e293b] mt-1">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function SystemInfoCard({ icon: Icon, label, value, badge }: { icon: any, label: string, value: string, badge?: string }) {
  return (
    <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-all rounded-xl">
      <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
          <div className="text-sm font-bold text-[#1e293b]">{value}</div>
          {badge && <Badge className="h-5 px-2 text-[9px] font-bold bg-emerald-500 hover:bg-emerald-600 border-0 rounded-full">{badge}</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}
