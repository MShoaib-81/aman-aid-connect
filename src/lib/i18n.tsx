import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ur" | "sd";

export const LANGS: { code: Lang; label: string; native: string; rtl: boolean }[] = [
  { code: "en", label: "English", native: "English", rtl: false },
  { code: "ur", label: "Urdu", native: "اردو", rtl: true },
  { code: "sd", label: "Sindhi", native: "سنڌي", rtl: true },
];

type Dict = Record<string, string>;

const en: Dict = {
  appName: "Aman AI",
  tagline: "Emergency assistance for everyone",
  chooseLanguage: "Choose your language",
  continue: "Continue",
  home: "Home",
  report: "Report",
  firstAid: "First Aid",
  hospitals: "Hospitals",
  aqi: "AQI",
  voice: "Voice",
  sos: "SOS",
  sosHold: "Hold for emergency call",
  sosCalling: "Connecting to Rescue 1122…",
  cancel: "Cancel",
  greeting: "You are protected",
  currentLocation: "Current location",
  liveAqi: "Live air quality",
  activeAlert: "Active alert",
  quickAccess: "Quick access",
  aiTriage: "AI Triage",
  incidentHistory: "Incident history",
  settings: "Settings",
  alerts: "Alerts",
  viewAll: "View all",
  reportEmergency: "Report an emergency",
  selectCategory: "Select category",
  flood: "Flood",
  fire: "Fire",
  medical: "Medical",
  accident: "Accident",
  other: "Other",
  location: "Location",
  autoDetected: "Auto-detected — tap to edit",
  description: "Description",
  describePlaceholder: "Describe what is happening…",
  recordVoice: "Record voice note",
  recording: "Recording… tap to stop",
  attachPhoto: "Attach photo",
  photoAttached: "Photo attached",
  submitReport: "Submit report",
  reportSubmitted: "Report submitted",
  reportId: "Report ID",
  responderNote: "Nearest responder unit has been notified. Keep your phone reachable.",
  backHome: "Back to home",
  viewHistory: "View my reports",
  triageIntro: "Answer a few quick questions so I can guide you.",
  yourAnswer: "Type your answer…",
  send: "Send",
  recommendation: "Recommendation",
  openFirstAid: "Open first aid guide",
  findHospital: "Find nearest hospital",
  fileReport: "File emergency report",
  searchScenarios: "Search first aid scenarios",
  steps: "Steps",
  playVoiceGuide: "Play voice guide",
  playingVoiceGuide: "Playing voice guide…",
  mapView: "Map",
  listView: "List",
  call: "Call",
  directions: "Directions",
  km: "km away",
  open24: "Open 24/7",
  aqiMonitor: "Air quality monitor",
  healthAdvice: "Health recommendation",
  trend: "48-hour trend",
  selectCity: "Select city",
  weatherAlerts: "Weather & disaster alerts",
  watch: "Watch",
  warning: "Warning",
  critical: "Critical",
  voiceAssistant: "Voice assistant",
  tapToSpeak: "Tap the mic and speak",
  listening: "Listening…",
  transcript: "Transcript",
  assistantReply: "Assistant",
  myReports: "My reports",
  submitted: "Submitted",
  inReview: "In review",
  resolved: "Resolved",
  language: "Language",
  emergencyContacts: "Emergency contacts",
  addContact: "Add contact",
  notifications: "Notifications",
  alertNotifications: "Disaster alerts",
  aqiNotifications: "Air quality warnings",
  nearbyIncidents: "Nearby incidents",
  textSize: "Text size",
  darkMode: "Dark mode",
  small: "Small",
  large: "Large",
  noResults: "No results found",
};

const ur: Dict = {
  appName: "امان اے آئی",
  tagline: "ہر ایک کے لیے ہنگامی مدد",
  chooseLanguage: "اپنی زبان منتخب کریں",
  continue: "جاری رکھیں",
  home: "ہوم",
  report: "رپورٹ",
  firstAid: "ابتدائی طبی امداد",
  hospitals: "ہسپتال",
  aqi: "فضائی معیار",
  voice: "آواز",
  sos: "ایس او ایس",
  sosHold: "ہنگامی کال کے لیے دبائیں",
  sosCalling: "ریسکیو 1122 سے رابطہ ہو رہا ہے…",
  cancel: "منسوخ کریں",
  greeting: "آپ محفوظ ہیں",
  currentLocation: "موجودہ مقام",
  liveAqi: "براہِ راست فضائی معیار",
  activeAlert: "فعال انتباہ",
  quickAccess: "فوری رسائی",
  aiTriage: "اے آئی رہنمائی",
  incidentHistory: "پرانی رپورٹس",
  settings: "ترتیبات",
  alerts: "انتباہات",
  viewAll: "سب دیکھیں",
  reportEmergency: "ہنگامی صورتحال رپورٹ کریں",
  selectCategory: "قسم منتخب کریں",
  flood: "سیلاب",
  fire: "آگ",
  medical: "طبی",
  accident: "حادثہ",
  other: "دیگر",
  location: "مقام",
  autoDetected: "خودکار طور پر معلوم — تبدیلی کے لیے دبائیں",
  description: "تفصیل",
  describePlaceholder: "کیا ہو رہا ہے، بتائیں…",
  recordVoice: "آواز ریکارڈ کریں",
  recording: "ریکارڈنگ جاری… روکنے کے لیے دبائیں",
  attachPhoto: "تصویر منسلک کریں",
  photoAttached: "تصویر منسلک ہو گئی",
  submitReport: "رپورٹ جمع کروائیں",
  reportSubmitted: "رپورٹ جمع ہو گئی",
  reportId: "رپورٹ نمبر",
  responderNote: "قریبی امدادی ٹیم کو اطلاع دے دی گئی ہے۔ اپنا فون قریب رکھیں۔",
  backHome: "ہوم پر واپس",
  viewHistory: "میری رپورٹس دیکھیں",
  triageIntro: "چند مختصر سوالات کے جواب دیں تاکہ میں رہنمائی کر سکوں۔",
  yourAnswer: "اپنا جواب لکھیں…",
  send: "بھیجیں",
  recommendation: "تجویز",
  openFirstAid: "ابتدائی طبی امداد کھولیں",
  findHospital: "قریبی ہسپتال تلاش کریں",
  fileReport: "ہنگامی رپورٹ درج کریں",
  searchScenarios: "ابتدائی امداد تلاش کریں",
  steps: "مراحل",
  playVoiceGuide: "آواز میں رہنمائی سنیں",
  playingVoiceGuide: "آواز میں رہنمائی چل رہی ہے…",
  mapView: "نقشہ",
  listView: "فہرست",
  call: "کال",
  directions: "راستہ",
  km: "کلومیٹر دور",
  open24: "24 گھنٹے کھلا",
  aqiMonitor: "فضائی معیار کی نگرانی",
  healthAdvice: "صحت سے متعلق تجویز",
  trend: "48 گھنٹے کا رجحان",
  selectCity: "شہر منتخب کریں",
  weatherAlerts: "موسم اور آفات کے انتباہات",
  watch: "نگرانی",
  warning: "انتباہ",
  critical: "شدید",
  voiceAssistant: "صوتی معاون",
  tapToSpeak: "مائیک دبائیں اور بولیں",
  listening: "سن رہا ہوں…",
  transcript: "متن",
  assistantReply: "معاون",
  myReports: "میری رپورٹس",
  submitted: "جمع شدہ",
  inReview: "زیرِ جائزہ",
  resolved: "حل شدہ",
  language: "زبان",
  emergencyContacts: "ہنگامی رابطے",
  addContact: "رابطہ شامل کریں",
  notifications: "اطلاعات",
  alertNotifications: "آفات کے انتباہات",
  aqiNotifications: "فضائی معیار کی وارننگ",
  nearbyIncidents: "قریبی واقعات",
  textSize: "متن کا سائز",
  darkMode: "ڈارک موڈ",
  small: "چھوٹا",
  large: "بڑا",
  noResults: "کوئی نتیجہ نہیں ملا",
};

const sd: Dict = {
  ...ur,
  appName: "امان اي آءِ",
  tagline: "هر ڪنهن لاءِ ايمرجنسي مدد",
  chooseLanguage: "پنهنجي ٻولي چونڊيو",
  continue: "اڳتي هلو",
  home: "گهر",
  report: "رپورٽ",
  firstAid: "ابتدائي طبي امداد",
  hospitals: "اسپتال",
  aqi: "هوا جو معيار",
  voice: "آواز",
  greeting: "توهان محفوظ آهيو",
  currentLocation: "موجوده هنڌ",
  liveAqi: "سڌي نشرياتي هوا جو معيار",
  activeAlert: "فعال ڊيڄاريندڙ",
  quickAccess: "تڪڙي رسائي",
  settings: "سيٽنگون",
  alerts: "ڊيڄاريندڙ",
  viewAll: "سڀ ڏسو",
  reportEmergency: "ايمرجنسي رپورٽ ڪريو",
  selectCategory: "قسم چونڊيو",
  flood: "ٻوڏ",
  fire: "باهه",
  medical: "طبي",
  accident: "حادثو",
  other: "ٻيو",
  location: "هنڌ",
  description: "تفصيل",
  submitReport: "رپورٽ جمع ڪريو",
  reportSubmitted: "رپورٽ جمع ٿي وئي",
  reportId: "رپورٽ نمبر",
  backHome: "گهر واپس",
  call: "ڪال",
  directions: "رستو",
  language: "ٻولي",
  darkMode: "ڊارڪ موڊ",
  textSize: "لکت جو سائيز",
};

const DICTS: Record<Lang, Dict> = { en, ur, sd };

type I18nCtx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  rtl: boolean;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof en | string) => string;
  dark: boolean;
  setDark: (v: boolean) => void;
  fontScale: number;
  setFontScale: (v: number) => void;
};

const Ctx = createContext<I18nCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [dark, setDarkState] = useState(false);
  const [fontScale, setFontScaleState] = useState(17);

  useEffect(() => {
    const l = localStorage.getItem("aman-lang") as Lang | null;
    if (l) setLangState(l);
    const d = localStorage.getItem("aman-dark");
    if (d) setDarkState(d === "1");
    const f = localStorage.getItem("aman-font");
    if (f) setFontScaleState(Number(f));
  }, []);

  const rtl = lang !== "en";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.style.setProperty("--app-font-size", `${fontScale}px`);
  }, [fontScale]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("aman-lang", l);
  }, []);
  const setDark = useCallback((v: boolean) => {
    setDarkState(v);
    localStorage.setItem("aman-dark", v ? "1" : "0");
  }, []);
  const setFontScale = useCallback((v: number) => {
    setFontScaleState(v);
    localStorage.setItem("aman-font", String(v));
  }, []);

  const t = useCallback((key: string) => DICTS[lang][key] ?? DICTS.en[key] ?? key, [lang]);

  const value = useMemo(
    () => ({
      lang,
      rtl,
      dir: (rtl ? "rtl" : "ltr") as "ltr" | "rtl",
      setLang,
      t,
      dark,
      setDark,
      fontScale,
      setFontScale,
    }),
    [lang, rtl, setLang, t, dark, setDark, fontScale, setFontScale],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
