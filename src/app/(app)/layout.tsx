import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex flex-1 flex-col p-4 md:p-6">{children}</main>
      <AppFooter />
    </div>
  );
}
