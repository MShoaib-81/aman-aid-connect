import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Send, HeartPulse, Hospital, FileWarning } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/i18n";

export const Route = createFileRoute("/triage")({
  head: () => ({
    meta: [
      { title: "AI Triage — Aman AI" },
      {
        name: "description",
        content: "Answer a few questions and get routed to first aid steps, the nearest hospital, or an emergency report.",
      },
      { property: "og:title", content: "AI Triage — Aman AI" },
      { property: "og:description", content: "Guided emergency triage in Urdu, English and Sindhi." },
    ],
  }),
  component: TriagePage,
});

const QUESTIONS = {
  en: [
    "Is the person conscious and breathing normally?",
    "Is there heavy bleeding, a burn, or difficulty breathing?",
    "How far are you from the nearest road a vehicle can reach?",
  ],
  ur: [
    "کیا مریض ہوش میں ہے اور معمول کے مطابق سانس لے رہا ہے؟",
    "کیا شدید خون بہہ رہا ہے، جلن ہے یا سانس لینے میں دشواری ہے؟",
    "قریبی سڑک آپ سے کتنی دور ہے جہاں گاڑی پہنچ سکے؟",
  ],
  sd: [
    "ڇا مريض هوش ۾ آهي ۽ عام طور سان ساهه کڻي رهيو آهي؟",
    "ڇا تمام گهڻو رت وهي رهيو آهي يا ساهه کڻڻ ۾ ڏکيائي آهي؟",
    "توهان کان ويجهي روڊ ڪيترو پري آهي؟",
  ],
} as const;

type Msg = { role: "ai" | "user"; text: string };

function TriagePage() {
  const { t, lang } = useApp();
  const qs = QUESTIONS[lang];
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: qs[0] as string },
  ]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const done = step >= 3;

  function send() {
    if (!input.trim() || done) return;
    const next = step + 1;
    const reply = next < 3 ? (qs[next] as string) : null;
    setMessages((m) => [
      ...m,
      { role: "user", text: input.trim() },
      ...(reply ? [{ role: "ai" as const, text: reply }] : []),
    ]);
    setInput("");
    setStep(next);
  }

  return (
    <AppShell title={t("aiTriage")} back="/home">
      <p className="text-sm text-muted-foreground">{t("triageIntro")}</p>

      <div className="mt-4 grid gap-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex max-w-[85%] gap-2 rounded-2xl px-4 py-3 text-base leading-relaxed ${
              m.role === "ai"
                ? "me-auto bg-card border border-border"
                : "ms-auto bg-primary text-primary-foreground"
            }`}
          >
            {m.role === "ai" && <Bot className="mt-1 size-4 shrink-0 text-primary" aria-hidden />}
            <span>{m.text}</span>
          </div>
        ))}
      </div>

      {done && (
        <div className="surface mt-4 border-s-4 border-s-caution p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-caution-foreground">
            {t("recommendation")}
          </p>
          <p className="mt-2 font-semibold leading-relaxed">
            {lang === "en"
              ? "Control the bleeding now with direct pressure, then move to a trauma-capable hospital. Emergency services should be notified."
              : "پہلے براہِ راست دباؤ سے خون روکیں، پھر حادثات کے شعبے والے ہسپتال منتقل کریں اور امدادی اداروں کو اطلاع دیں۔"}
          </p>
          <div className="mt-4 grid gap-2">
            <Link
              to="/first-aid"
              className="tap flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground"
            >
              <HeartPulse className="size-5" aria-hidden />
              {t("openFirstAid")}
            </Link>
            <Link
              to="/hospitals"
              className="tap flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 font-medium"
            >
              <Hospital className="size-5" aria-hidden />
              {t("findHospital")}
            </Link>
            <Link
              to="/report"
              className="tap flex items-center justify-center gap-2 rounded-lg bg-emergency px-4 py-3 font-semibold text-emergency-foreground"
            >
              <FileWarning className="size-5" aria-hidden />
              {t("fileReport")}
            </Link>
          </div>
        </div>
      )}

      {!done && (
        <div className="surface mt-4 flex items-center gap-2 p-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t("yourAnswer")}
            className="tap w-full bg-transparent px-2 text-base outline-none"
            aria-label={t("yourAnswer")}
          />
          <button
            type="button"
            onClick={send}
            aria-label={t("send")}
            className="tap flex items-center justify-center rounded-lg bg-primary px-4 text-primary-foreground"
          >
            <Send className="size-5 rtl:-scale-x-100" aria-hidden />
          </button>
        </div>
      )}
    </AppShell>
  );
}
