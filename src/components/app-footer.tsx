'use client';

import { Mail } from 'lucide-react';

export function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gradient-to-r from-primary to-accent text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Brand and Copyright */}
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <h3 className="text-base md:text-lg font-bold">Wallet Tally</h3>
                        <span className="hidden md:inline text-white/40">|</span>
                        <p className="text-xs md:text-sm text-white/90">
                            © {currentYear} All rights reserved.
                        </p>
                    </div>

                    {/* Admin Contact */}
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                        <Mail className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                        <a
                            href="mailto:admin@wallettally.com"
                            className="text-white/90 hover:text-white transition-colors"
                        >
                            admin@wallettally.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
