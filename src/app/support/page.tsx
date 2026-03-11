'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, FileQuestion, Book, AlertCircle, Send } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
            {/* Header */}
            <header className="bg-gradient-to-r from-primary to-accent py-12 md:py-16 px-4 shadow-xl">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-4 md:space-y-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                        <Icons.Logo className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Support & Help</h1>
                        <p className="text-white/90 font-medium max-w-2xl text-sm md:text-base">
                            We're here to help you get the most out of Wallet Tally
                        </p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
                <div className="space-y-6">

                    {/* Back Button */}
                    <Link href="/">
                        <Button variant="outline" className="rounded-xl font-bold gap-2 hover:bg-primary/5">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>

                    {/* Contact Card */}
                    <Card className="rounded-3xl shadow-2xl border-0 overflow-hidden bg-white">
                        <CardContent className="p-6 md:p-12 space-y-8">

                            {/* Email Support */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Email Support</h2>
                                </div>
                                <div className="space-y-4 pl-0 md:pl-13">
                                    <p className="text-slate-600 leading-relaxed">
                                        For questions, technical issues, or general support, please contact our administrative team:
                                    </p>
                                    <a
                                        href="mailto:laxminarayanp519@gmail.com?subject=Support Request - Wallet Tally"
                                        className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all hover:scale-[1.02]"
                                    >
                                        <Send className="w-5 h-5" />
                                        admin@wallettally.com
                                    </a>
                                    <p className="text-sm text-slate-500 italic">
                                        We typically respond within 24-48 hours during business days.
                                    </p>
                                </div>
                            </section>

                            {/* Common Questions */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <FileQuestion className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Frequently Asked Questions</h2>
                                </div>
                                <div className="space-y-4 pl-0 md:pl-13">

                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                        <h3 className="font-bold text-slate-800 mb-2">How do I reset my password?</h3>
                                        <p className="text-slate-600 text-sm">
                                            Visit the <Link href="/forgot-password" className="text-primary font-semibold hover:underline">Forgot Password</Link> page and enter your registered email address. You'll receive an OTP to reset your password.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                        <h3 className="font-bold text-slate-800 mb-2">Can I edit or delete old transactions?</h3>
                                        <p className="text-slate-600 text-sm">
                                            Transactions can only be edited or deleted within 24 hours of creation. This ensures data integrity and maintains a reliable financial audit trail.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                        <h3 className="font-bold text-slate-800 mb-2">Does Wallet Tally connect to my bank account?</h3>
                                        <p className="text-slate-600 text-sm">
                                            No. Wallet Tally is designed for manual cash transaction tracking only. It does NOT connect to banks, process online payments, or handle UPI transactions. All data must be entered manually.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                        <h3 className="font-bold text-slate-800 mb-2">How do I export my transaction data?</h3>
                                        <p className="text-slate-600 text-sm">
                                            Go to your Dashboard, click the "Export" button, select your date range, and choose to download as PDF or receive it via email.
                                        </p>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                        <h3 className="font-bold text-slate-800 mb-2">How do I delete my account?</h3>
                                        <p className="text-slate-600 text-sm">
                                            Please contact our support team at <a href="mailto:laxminarayanp519@gmail.com?subject=Account Deletion Request - Wallet Tally" className="text-primary font-semibold hover:underline">admin@wallettally.com</a> with your account details. We'll process your deletion request and permanently remove all your data.
                                        </p>
                                    </div>

                                </div>
                            </section>

                            {/* Important Information */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <AlertCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Important Information</h2>
                                </div>
                                <div className="space-y-3 pl-0 md:pl-13">
                                    <div className="p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500">
                                        <p className="text-slate-700 text-sm leading-relaxed">
                                            <strong>Manual Transaction Tracking:</strong> This application keeps track record of cash transactions only that are entered by the user manually. We do not have access to your bank accounts or financial institutions.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Additional Resources */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Book className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Additional Resources</h2>
                                </div>
                                <div className="space-y-3 pl-0 md:pl-13">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link href="/terms" className="flex-1">
                                            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                                                <h3 className="font-bold text-slate-800 mb-1">Terms & Conditions</h3>
                                                <p className="text-slate-600 text-sm">Review our terms of service</p>
                                            </div>
                                        </Link>
                                        <Link href="/privacy" className="flex-1">
                                            <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-md transition-all cursor-pointer">
                                                <h3 className="font-bold text-slate-800 mb-1">Privacy Policy</h3>
                                                <p className="text-slate-600 text-sm">Learn how we protect your data</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </section>

                        </CardContent>
                    </Card>

                    {/* Footer Note */}
                    <div className="text-center py-6">
                        <p className="text-slate-500 text-sm">
                            © 2026 Wallet Tally. All rights reserved.
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}
