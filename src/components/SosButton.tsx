import { useEffect, useState } from "react";
import { PhoneCall, X } from "lucide-react";
import { useApp } from "@/lib/i18n";

export function SosButton() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!open) {
      setCount(3);
      return;
    }
    const id = setInterval(() => setCount((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("sos")}
        className="sos-pulse fixed bottom-24 end-4 z-50 flex size-16 flex-col items-center justify-center rounded-full bg-emergency text-emergency-foreground shadow-lg ring-4 ring-background transition-transform active:scale-95 lg:bottom-8 lg:end-8 lg:size-20"
      >
        <span className="text-base font-extrabold tracking-wide">{t("sos")}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 p-4 backdrop-blur-sm sm:items-center">
          <div className="surface w-full max-w-md p-5 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emergency text-emergency-foreground">
              <PhoneCall className="size-8" aria-hidden />
            </div>
            <h2 className="text-lg font-bold">{t("sosCalling")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {count > 0 ? `${count}…` : "1122 • 15 • 115"}
            </p>
            <div className="mt-5 grid gap-2">
              <a
                href="tel:1122"
                className="tap flex items-center justify-center rounded-lg bg-emergency px-4 py-3 font-semibold text-emergency-foreground"
              >
                1122
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="tap flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 font-medium"
              >
                <X className="size-4" aria-hidden />
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
