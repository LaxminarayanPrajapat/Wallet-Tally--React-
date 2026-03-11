'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Eye, Database, Cpu, Mail, Shield, UserCheck, FileText, Globe, Cookie } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent py-12 md:py-16 px-4 shadow-xl">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-4 md:space-y-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
            <Icons.Logo className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Privacy Policy</h1>
            <p className="text-white/90 font-medium max-w-2xl text-sm md:text-base">
              Effective Date: January 1, 2024 | Last Updated: March 11, 2024
            </p>
          </div>
          <p className="text-white/80 font-medium max-w-2xl text-sm md:text-base">
            Your financial privacy and data security are our highest priorities. Learn how we collect, use, and protect your information.
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
                <Shield className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">IMPORTANT: Manual Cash Transaction Tracking Only</h3>
                  <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                    THIS APPLICATION KEEPS TRACK RECORD OF CASH TRANSACTIONS ONLY THAT ARE ENTERED BY THE USER MANUALLY.
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Wallet Tally ("we," "us," or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data. By using Wallet Tally, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">1. Scope of Application</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed font-semibold">
                  Wallet Tally is a personal finance management application designed exclusively for manual cash transaction tracking. Users must manually enter all transaction data.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>This service explicitly:</strong>
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✗</span>
                    <span><strong>Does NOT</strong> connect to banks or financial institutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✗</span>
                    <span><strong>Does NOT</strong> process online payments or UPI transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✗</span>
                    <span><strong>Does NOT</strong> access your bank account information or credit card details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✗</span>
                    <span><strong>Does NOT</strong> automatically sync or import transactions from any source</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold shrink-0">✓</span>
                    <span>All financial data is entered <strong>manually by users</strong> for personal record-keeping only</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">2. Information We Collect</h2>
              </div>
              <div className="space-y-4 pl-0 md:pl-13">
                <div>
                  <h3 className="font-bold text-slate-700 mb-2">2.1 Personal Information</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span><strong>Email Address:</strong> Required for account creation and OTP verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span><strong>Username:</strong> Optional display name for your account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span><strong>Country Selection:</strong> For currency localization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span><strong>Profile Avatar:</strong> Optional profile picture</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 mb-2">2.2 Financial Data (User-Entered)</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span>Manual cash income and expense transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span>Transaction categories, amounts, and descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span>Budget allocations and spending limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span>Custom category preferences</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 mb-2">2.3 Usage Data</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span>Account creation and login timestamps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span>Email delivery logs (OTP, warnings, notifications)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      <span>User feedback and ratings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">3. How We Use Your Information</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  We process your data exclusively for the following purposes:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Account Management:</strong> Create and maintain your user account with secure authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Financial Tracking:</strong> Calculate real-time balance, category distributions, and spending analytics based on your manual entries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Email Communications:</strong> Send OTP verification codes, password reset links, account security alerts, and administrative notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Report Generation:</strong> Provide downloadable PDF reports of your transaction history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Service Improvement:</strong> Analyze aggregated, anonymized usage patterns to enhance features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Content Moderation:</strong> Review and approve user feedback for testimonials</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">4. Data Security & Protection</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  <strong>4.1 Infrastructure:</strong> We leverage Google Firebase, a secure cloud platform, for all authentication and database services. Your data is stored in Google Cloud's infrastructure with industry-standard security measures.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>4.2 Encryption:</strong> All data transmission is encrypted using HTTPS/TLS protocols. Passwords are hashed using Firebase Authentication's secure algorithms.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>4.3 Access Control:</strong> Firestore Security Rules ensure that only authenticated users can access their own financial data. Administrative access is limited to moderation purposes only (warnings, account termination, feedback approval).
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>4.4 Data Isolation:</strong> Each user's financial records are isolated and cannot be accessed by other users. Transaction data is never shared or sold to third parties.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">5. Data Sharing & Third Parties</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  <strong>We do NOT sell, rent, or trade your personal information.</strong> Your data is shared only in the following limited circumstances:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Service Providers:</strong> Google Firebase for hosting, authentication, and database services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Email Service:</strong> SMTP providers for sending OTP and notification emails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">6. Your Privacy Rights</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">You have the following rights regarding your personal data:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Access:</strong> View all your financial data anytime via the dashboard or PDF exports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Correction:</strong> Update your profile information, password, and avatar in Settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Deletion:</strong> Request full account deletion by contacting support (all data will be permanently removed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Data Portability:</strong> Export your transaction history as PDF reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Withdrawal of Consent:</strong> Stop using the service at any time</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">7. Cookies & Tracking</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  Wallet Tally uses minimal cookies and local storage for essential functionality:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Authentication Tokens:</strong> To keep you logged in securely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Session Management:</strong> To maintain your active session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">•</span>
                    <span><strong>Preferences:</strong> To remember your currency and display settings</span>
                  </li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  We do NOT use third-party analytics, advertising cookies, or tracking pixels.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">8. Data Retention</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  We retain your personal information for as long as your account is active or as needed to provide services. Upon account deletion, all personal data and financial records are permanently removed through cascading deletion. Email logs may be retained for up to 90 days for security and compliance purposes.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">9. Contact Us</h2>
              </div>
              <div className="space-y-3 pl-0 md:pl-13">
                <p className="text-slate-600 leading-relaxed">
                  If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-slate-700 font-semibold">Email: <a href="mailto:laxminarayanp519@gmail.com?subject=Privacy Policy Inquiry - Wallet Tally" className="text-primary hover:underline">admin@wallettally.com</a></p>
                  <p className="text-slate-600 text-sm mt-1">We will respond to your inquiry within 48 hours.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="pt-8 border-t-2 border-slate-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Compliance Status</p>
                  <p className="text-lg font-bold text-emerald-600">GDPR Ready</p>
                  <p className="text-xs text-slate-500 mt-1">Last Updated: March 11, 2024</p>
                </div>
                <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl px-8 h-12 font-bold shadow-lg border-0 transition-all active:scale-95">
                  <Link href="/register">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Registration
                  </Link>
                </Button>
              </div>
            </div>

          </CardContent>
        </Card>
      </main>
    </div>
  );
}
