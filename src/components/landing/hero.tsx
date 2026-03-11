
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import './animations.css';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import placeholderData from '@/app/lib/placeholder-images.json';

const allIcons = placeholderData.placeholderImages;
const row1Icons = allIcons.slice(0, 8);
const row2Icons = allIcons.slice(8, 16);

const IconRow = ({
  icons,
  direction = 'left',
}: {
  icons: typeof row1Icons;
  direction?: 'left' | 'right';
}) => (
  <div
    className={cn(
      'flex w-max',
      direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
    )}
  >
    {[...icons, ...icons, ...icons].map((icon, index) => (
      <div key={`${icon.id}-${index}`} className="mx-16 h-40 w-40 shrink-0 opacity-40 transition-opacity">
        <Image
          src={icon.imageUrl}
          alt={icon.description}
          width={160}
          height={160}
          data-ai-hint={icon.imageHint}
          unoptimized
        />
      </div>
    ))}
  </div>
);

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Marquee Container */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center gap-0 blur-[1px] opacity-40 pointer-events-none">
        <IconRow icons={row1Icons} direction="right" />
        <IconRow icons={row2Icons} direction="left" />
      </div>

      {/* Foreground Content Overlaid on Marquee */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl space-y-6 sm:space-y-8 bg-background/10 backdrop-blur-[1px] py-12 sm:py-16 md:py-20 rounded-2xl sm:rounded-3xl mx-4">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-tr from-primary to-accent bg-clip-text text-transparent leading-tight tracking-tight">
          Track Your Cash Flow
        </h1>
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-primary font-medium leading-relaxed px-2">
          The simplest way to manage your cash balance. Record daily income,
          track expenses, and get insight to grow your savings.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 pt-4 w-full sm:w-auto px-4 sm:px-0">
          <Button
            size="lg"
            asChild
            className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 text-white bg-gradient-to-tr from-primary to-accent shadow-xl transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <Link href="/register">Start Saving Now</Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 text-white bg-gradient-to-tr from-primary to-accent shadow-xl transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <Link href="/login">Login to Account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
