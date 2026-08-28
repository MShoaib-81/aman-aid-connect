import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mic, Bot } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/i18n";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Voice Assistant — Aman AI" },
      {
        name: "description",
        content: "Speak your emergency in Urdu, English or Sindhi and get spoken guidance hands-free.",
      },
      { property: "og:title", content: "Voice Assistant — Aman AI" },
      { property: "og:description", content: "Hands-free emergency help in your own language." },
    ],
  }),
  component: VoicePage,
});

const DEMO = {
  en: {
    transcript: "There is water rising in our street and my father cannot walk on his own.",
    reply:
      "Move to the highest floor you can reach and avoid contact with electrical fittings. I have located a rescue point 600 m north on Rashid Minhas Road. Would you like me to file a flood rescue report with your location?",
  },
  ur: {
    transcript: "ہماری گلی میں پانی بڑھ رہا ہے اور میرے والد خود چل نہیں سکتے۔",
    reply:
      "جتنی ممکن ہو اوپری منزل پر منتقل ہوں اور بجلی کے سوئچز سے دور رہیں۔ راشد منہاس روڈ پر 600 میٹر شمال میں امدادی مرکز موجود ہے۔ کیا میں آپ کے مقام کے ساتھ سیلاب ریسکیو رپورٹ درج کر دوں؟",
  },
  sd: {
    transcript: "اسان جي گهٽيءَ ۾ پاڻي وڌي رهيو آهي ۽ منهنجو والد پاڻ هلي نٿو سگهي.",
    reply:
      "مٿانهين منزل تي وڃو ۽ بجليءَ جي سامان کان پري رهو. ويجهو امدادي مرڪز 600 ميٽر اتر ۾ آهي. ڇا مان توهان جي هنڌ سان ٻوڏ جي رپورٽ درج ڪريان؟",
  },
} as const;

function VoicePage() {
  const { t, lang } = useApp();
  const [listening, setListening] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!listening) return;
    const id = setTimeout(() => {
      setListening(false);
      setShown(true);
    }, 2600);
    return () => clearTimeout(id);
  }, [listening]);

  const demo = DEMO[lang];

  return (
    <AppShell title={t("voiceAssistant")} back="/home">
      <div className="flex flex-col items-center py-6">
        <button
          type="button"
          onClick={() => {
            setShown(false);
            setListening(true);
          }}
          aria-label={t("tapToSpeak")}
          className={`flex size-32 items-center justify-center rounded-full text-primary-foreground transition-transform active:scale-95 ${
            listening ? "bg-emergency sos-pulse" : "bg-primary"
          }`}
        >
          <Mic className="size-14" aria-hidden />
        </button>
        <p className="mt-4 font-semibold">{listening ? t("listening") : t("tapToSpeak")}</p>

        <div className="mt-6 flex h-16 items-end gap-1.5" aria-hidden>
          {Array.from({ length: 21 }).map((_, i) => (
            <span
              key={i}
              className={`w-2 rounded-full bg-primary ${listening ? "wave-bar" : ""}`}
              style={{
                height: `${20 + ((i * 37) % 44)}px`,
                animationDelay: `${(i % 7) * 0.09}s`,
                opacity: listening ? 1 : 0.25,
              }}
            />
          ))}
        </div>
      </div>

      <div className="surface p-4">
        <h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {t("transcript")}
        </h2>
        <p className="mt-2 min-h-12 leading-relaxed">{shown ? demo.transcript : "—"}</p>
      </div>

      {shown && (
        <div className="surface mt-3 border-s-4 border-s-primary p-4">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Bot className="size-4" aria-hidden />
            {t("assistantReply")}
          </h2>
          <p className="mt-2 leading-relaxed">{demo.reply}</p>
        </div>
      )}
    </AppShell>
  );
}
