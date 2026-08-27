import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ShieldCheck, Settings as Cog } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { SosButton } from "./SosButton";
import { useApp } from "@/lib/i18n";

export function AppShell({
  title,
  children,
  back,
  showSettings = true,
}: {
  title: string;
  children: ReactNode;
  back?: string;
  showSettings?: boolean;
}) {
  const { rtl } = useApp();
  const BackIcon = rtl ? ChevronRight : ChevronLeft;

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center gap-2 px-3 py-3">
          {back ? (
            <Link to={back} className="tap -ms-2 flex items-center justify-center rounded-lg">
              <BackIcon className="size-6" aria-hidden />
            </Link>
          ) : (
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
          )}
          <h1 className="flex-1 truncate text-lg font-bold">{title}</h1>
          {showSettings && (
            <Link
              to="/settings"
              aria-label="Settings"
              className="tap flex items-center justify-center rounded-lg text-muted-foreground"
            >
              <Cog className="size-5" aria-hidden />
            </Link>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4">{children}</main>

      <SosButton />
      <BottomNav />
    </div>
  );
}
