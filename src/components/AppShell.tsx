import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ShieldCheck, Settings as Cog } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";
import { SosButton } from "./SosButton";
import { useApp } from "@/lib/i18n";

export function AppShell({
  title,
  children,
  back,
  showSettings = true,
  maxWidth = "max-w-lg lg:max-w-6xl",
}: {
  title: string;
  children: ReactNode;
  back?: string;
  showSettings?: boolean;
  maxWidth?: string;
}) {
  const { rtl } = useApp();
  const BackIcon = rtl ? ChevronRight : ChevronLeft;

  return (
    <div className="min-h-screen bg-background pb-44 lg:ps-64 lg:pb-16">
      <SideNav />

      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className={`mx-auto flex ${maxWidth} items-center gap-2 px-3 py-3 lg:px-8 lg:py-5`}>
          {back ? (
            <Link to={back} className="tap -ms-2 flex items-center justify-center rounded-lg">
              <BackIcon className="size-6" aria-hidden />
            </Link>
          ) : (
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground lg:hidden">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
          )}
          <h1 className="flex-1 truncate text-lg font-bold lg:text-2xl">{title}</h1>
          {showSettings && (
            <Link
              to="/settings"
              aria-label="Settings"
              className="tap flex items-center justify-center rounded-lg text-muted-foreground lg:hidden"
            >
              <Cog className="size-5" aria-hidden />
            </Link>
          )}
        </div>
      </header>

      <main className={`mx-auto ${maxWidth} px-4 py-4 lg:px-8 lg:py-8`}>{children}</main>

      <SosButton />
      <BottomNav />
    </div>
  );
}
