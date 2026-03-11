'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Clock, MessageSquare, Ban, Scale, FileText, AlertTriangle, UserX, Gavel } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent py-12 md:py-16 px-4 shadow-xl">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-4 md:space-y-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
            <Icons.Logo className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Terms & Conditions</h1>
            <p className="text-white/90 font-medium max-w-2xl text-sm md:text-base">
              Effective Date: January 1, 2024 | Last Updated: March 11, 2024
            </p>
          </div>
          <p className="text-white/80 font-medium max-w-2xl text-sm md:text-base">
            Please read these terms carefully before using Wallet Tally. By accessing or using our service, you agree to be bound by these terms.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <Card className="rounded-3xl shadow-2xl border-0 overflow-hidden bg-white">
          <CardContent className="p-6 md:p-12 space-y-8 md:space-y-12">

            {/* Introduction */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">IMPORTANT: Manual Cash Transaction Tracking Only</h3>
                  <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                    THIS APPLICATION KEEPS TRACK RECORD OF CASH TRANSACTIONS ONLY THAT ARE ENTERED BY THE USER MANUALLY.
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Wallet Tally is a personal finance management application designed exclusively for manual cash transaction tracking. This service does NOT connect to banks, does NOT process online payments, does NOT handle UPI transactions, and does NOT access your bank accounts or credit cards. All financial data must be entered manually by users for personal record-keeping purposes only.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">1. Acceptance of Terms</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  By creating an account, accessing, or using Wallet Tally ("the Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must not use the Service.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  These terms constitute a legally binding agreement between you ("User") and Wallet Tally ("we," "us," or "our"). We reserve the right to modify these terms at any time, and continued use of the Service constitutes acceptance of any changes.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">2. Account Registration & Security</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  <strong>2.1 Registration:</strong> Users may register using a valid email address with OTP verification. Each user must provide accurate, current, and complete information during registration.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>2.2 Account Security:</strong> You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized access or security breach.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>2.3 Account Termination:</strong> We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or pose security risks to other users.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">3. Transaction Management & Data Integrity</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  <strong>3.1 24-Hour Edit Window:</strong> To maintain financial integrity and prevent data manipulation, transactions can only be modified or deleted within 24 hours of creation. After this period, records become permanent to ensure a reliable audit trail.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>3.2 Balance Validation:</strong> The system prevents users from adding expenses that exceed their current balance, ensuring realistic financial tracking. Users cannot delete income transactions if it would result in a negative balance.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>3.3 Data Accuracy:</strong> Users are responsible for the accuracy of all manually entered transaction data. Wallet Tally is not liable for any financial decisions made based on user-entered information.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">4. User Feedback & Content</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  <strong>4.1 Feedback Submission:</strong> Users may submit feedback and ratings about their experience with Wallet Tally. By submitting feedback, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and feature your feedback as testimonials.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>4.2 Content Moderation:</strong> Our administrative team reserves the right to approve, disapprove, or remove feedback that is false, misleading, inappropriate, offensive, or violates these terms.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>4.3 Automatic Disapproval:</strong> If you edit previously approved feedback, it will be automatically disapproved and require re-approval by administrators to maintain content integrity.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-red-200">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Ban className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">5. Prohibited Conduct</h2>
              </div>
              <div className="space-y-2 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed mb-3">Users are strictly prohibited from:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>Attempting to bypass security measures or access other users' data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>Providing false, misleading, or fraudulent information during registration or feedback submission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>Spamming system features, automated email services, or administrative tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>Using the Service for illegal activities or money laundering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>Reverse engineering, decompiling, or attempting to extract source code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>Distributing malware, viruses, or harmful code through the platform</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">6. Warning System & Enforcement</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  <strong>6.1 Official Warnings:</strong> Administrators may issue official warnings to users who violate these terms. Warnings are tracked and documented with specific violation details.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>6.2 Account Suspension:</strong> Repeated violations or serious breaches may result in temporary or permanent account suspension without prior notice.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>6.3 Data Deletion:</strong> Upon account termination, all user data including transactions, budgets, and feedback will be permanently deleted through cascading removal.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Gavel className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">7. Limitation of Liability</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  Wallet Tally is provided "as is" without warranties of any kind. We are not liable for any financial losses, data loss, or damages arising from the use or inability to use the Service. Users acknowledge that this is a personal tracking tool and not professional financial advice.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We do not guarantee uninterrupted access, error-free operation, or that the Service will meet your specific requirements. Your use of the Service is at your own risk.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <UserX className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">8. Contact & Support</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  For questions, concerns, or support regarding these Terms and Conditions, please contact our administrative team at <a href="mailto:laxminarayanp519@gmail.com?subject=Terms and Conditions Inquiry - Wallet Tally" className="text-primary font-semibold hover:underline">admin@wallettally.com</a>
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="pt-8 border-t-2 border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Last Updated</p>
                <p className="text-lg font-bold text-slate-700">March 11, 2024</p>
              </div>
              <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl px-8 h-12 font-bold shadow-lg border-0 transition-all active:scale-95">
                <Link href="/register">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Registration
                </Link>
              </Button>
            </div>

          </CardContent>
        </Card>
      </main>
    </div>
  );
}
