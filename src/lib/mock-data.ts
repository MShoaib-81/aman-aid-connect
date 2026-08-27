export type Hospital = {
  id: string;
  name: string;
  nameUr: string;
  area: string;
  distanceKm: number;
  phone: string;
  tags: string[];
  tagsUr: string[];
  open24: boolean;
  x: number;
  y: number;
};

export const HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "Jinnah Postgraduate Medical Centre",
    nameUr: "جناح پوسٹ گریجویٹ میڈیکل سینٹر",
    area: "Saddar",
    distanceKm: 1.2,
    phone: "+92 21 99201300",
    tags: ["Trauma", "Burns", "Emergency"],
    tagsUr: ["حادثات", "جلنے کا علاج", "ایمرجنسی"],
    open24: true,
    x: 28,
    y: 34,
  },
  {
    id: "h2",
    name: "Civil Hospital Karachi",
    nameUr: "سول ہسپتال کراچی",
    area: "Ranchore Line",
    distanceKm: 2.4,
    phone: "+92 21 99215740",
    tags: ["General", "Snakebite", "Pediatrics"],
    tagsUr: ["جنرل", "سانپ کا کاٹا", "بچوں کا شعبہ"],
    open24: true,
    x: 55,
    y: 22,
  },
  {
    id: "h3",
    name: "Aga Khan University Hospital",
    nameUr: "آغا خان یونیورسٹی ہسپتال",
    area: "Stadium Road",
    distanceKm: 4.8,
    phone: "+92 21 111911911",
    tags: ["Cardiac", "ICU", "Emergency"],
    tagsUr: ["امراضِ قلب", "آئی سی یو", "ایمرجنسی"],
    open24: true,
    x: 72,
    y: 55,
  },
  {
    id: "h4",
    name: "Indus Hospital",
    nameUr: "انڈس ہسپتال",
    area: "Korangi",
    distanceKm: 7.1,
    phone: "+92 21 111117333",
    tags: ["Free care", "Trauma", "Dialysis"],
    tagsUr: ["مفت علاج", "حادثات", "ڈائیلاسز"],
    open24: true,
    x: 40,
    y: 72,
  },
  {
    id: "h5",
    name: "Liaquat National Hospital",
    nameUr: "لیاقت نیشنل ہسپتال",
    area: "Stadium Road",
    distanceKm: 5.3,
    phone: "+92 21 34412001",
    tags: ["Ortho", "Maternity", "Emergency"],
    tagsUr: ["ہڈیوں کا شعبہ", "زچگی", "ایمرجنسی"],
    open24: false,
    x: 62,
    y: 78,
  },
  {
    id: "h6",
    name: "Ziauddin Hospital Clifton",
    nameUr: "ضیاء الدین ہسپتال کلفٹن",
    area: "Clifton",
    distanceKm: 3.6,
    phone: "+92 21 35862937",
    tags: ["General", "Pediatrics"],
    tagsUr: ["جنرل", "بچوں کا شعبہ"],
    open24: false,
    x: 18,
    y: 62,
  },
];

export type Severity = "watch" | "warning" | "critical";

export type Alert = {
  id: string;
  title: string;
  titleUr: string;
  body: string;
  bodyUr: string;
  severity: Severity;
  time: string;
  area: string;
};

export const ALERTS: Alert[] = [
  {
    id: "a1",
    title: "Urban flooding — Gulshan & Nazimabad",
    titleUr: "شہری سیلاب — گلشن و ناظم آباد",
    body: "Heavy rainfall of 68mm recorded in 3 hours. Underpasses closed. Avoid low-lying roads and stay away from electric poles.",
    bodyUr:
      "تین گھنٹوں میں 68 ملی میٹر بارش ریکارڈ کی گئی۔ انڈر پاس بند ہیں۔ نشیبی سڑکوں سے گریز کریں اور بجلی کے کھمبوں سے دور رہیں۔",
    severity: "critical",
    time: "12 min ago",
    area: "Karachi Central",
  },
  {
    id: "a2",
    title: "Thunderstorm warning until 9 PM",
    titleUr: "رات 9 بجے تک گرج چمک کا انتباہ",
    body: "Wind gusts up to 60 km/h expected with intermittent lightning. Secure loose rooftop items.",
    bodyUr:
      "60 کلومیٹر فی گھنٹہ کی رفتار سے ہوائیں اور وقفے وقفے سے بجلی چمکنے کا امکان ہے۔ چھت پر رکھی اشیاء محفوظ کریں۔",
    severity: "warning",
    time: "48 min ago",
    area: "Karachi South",
  },
  {
    id: "a3",
    title: "Heat advisory for tomorrow",
    titleUr: "کل کے لیے گرمی کی ایڈوائزری",
    body: "Feels-like temperature may reach 43°C between 12 PM and 4 PM. Hydrate and limit outdoor work.",
    bodyUr:
      "دوپہر 12 سے شام 4 بجے کے دوران محسوس ہونے والا درجہ حرارت 43 ڈگری تک جا سکتا ہے۔ پانی پیتے رہیں۔",
    severity: "watch",
    time: "2 hrs ago",
    area: "Sindh",
  },
  {
    id: "a4",
    title: "Indus river level rising at Sukkur barrage",
    titleUr: "سکھر بیراج پر دریائے سندھ کی سطح بلند",
    body: "Medium flood level expected within 24 hours. Riverine communities should prepare to relocate livestock.",
    bodyUr:
      "24 گھنٹوں میں درمیانے درجے کے سیلاب کا امکان۔ دریا کنارے آبادیاں مویشیوں کو منتقل کرنے کی تیاری کریں۔",
    severity: "warning",
    time: "5 hrs ago",
    area: "Sukkur",
  },
];

export const CITIES = ["Karachi", "Lahore", "Hyderabad", "Sukkur", "Islamabad"];

export const AQI_BY_CITY: Record<string, number> = {
  Karachi: 164,
  Lahore: 232,
  Hyderabad: 118,
  Sukkur: 96,
  Islamabad: 74,
};

export function aqiTrend(base: number) {
  const pts = [];
  for (let i = 47; i >= 0; i--) {
    const wave = Math.sin(i / 5) * 22 + Math.cos(i / 3) * 11;
    pts.push({
      hour: `-${i}h`,
      aqi: Math.max(20, Math.round(base + wave)),
    });
  }
  return pts;
}

export type AqiBand = {
  label: string;
  labelUr: string;
  token: "safe" | "caution" | "emergency";
  advice: string;
  adviceUr: string;
};

export function aqiBand(aqi: number): AqiBand {
  if (aqi <= 50)
    return {
      label: "Good",
      labelUr: "اچھا",
      token: "safe",
      advice: "Air quality is healthy. Outdoor activity is safe for everyone.",
      adviceUr: "فضا صاف ہے۔ باہر کی سرگرمیاں سب کے لیے محفوظ ہیں۔",
    };
  if (aqi <= 100)
    return {
      label: "Moderate",
      labelUr: "درمیانہ",
      token: "safe",
      advice: "Acceptable. Unusually sensitive people should limit long outdoor exertion.",
      adviceUr: "قابلِ قبول۔ حساس افراد طویل بیرونی مشقت سے گریز کریں۔",
    };
  if (aqi <= 150)
    return {
      label: "Unhealthy for sensitive groups",
      labelUr: "حساس افراد کے لیے مضر",
      token: "caution",
      advice: "Children, elderly and asthma patients should reduce outdoor time.",
      adviceUr: "بچے، بزرگ اور دمہ کے مریض باہر کا وقت کم کریں۔",
    };
  if (aqi <= 200)
    return {
      label: "Unhealthy",
      labelUr: "مضرِ صحت",
      token: "caution",
      advice: "Wear an N95 mask outdoors, keep windows closed and avoid heavy exertion.",
      adviceUr: "باہر N95 ماسک پہنیں، کھڑکیاں بند رکھیں اور سخت مشقت سے بچیں۔",
    };
  return {
    label: "Very unhealthy",
    labelUr: "انتہائی مضر",
    token: "emergency",
    advice: "Stay indoors. Run an air purifier if available and seek care for breathing difficulty.",
    adviceUr: "گھر کے اندر رہیں۔ ایئر پیوریفائر چلائیں اور سانس کی تکلیف پر فوراً رجوع کریں۔",
  };
}

export type FirstAidTopic = {
  id: string;
  title: string;
  titleUr: string;
  category: string;
  icon: string;
  steps: string[];
  stepsUr: string[];
};

export const FIRST_AID: FirstAidTopic[] = [
  {
    id: "bleeding",
    title: "Severe bleeding",
    titleUr: "شدید خون بہنا",
    category: "trauma",
    icon: "droplet",
    steps: [
      "Wear gloves or use a clean cloth to protect yourself.",
      "Press firmly on the wound with a clean pad, without lifting it.",
      "Raise the injured limb above heart level if no fracture is suspected.",
      "Add more padding on top if blood soaks through — never remove the first layer.",
      "Call 1122 and keep the person warm and lying down until help arrives.",
    ],
    stepsUr: [
      "دستانے پہنیں یا صاف کپڑا استعمال کریں۔",
      "صاف پٹی سے زخم پر مضبوطی سے دباؤ ڈالیں اور ہٹائیں نہیں۔",
      "اگر فریکچر نہ ہو تو زخمی حصے کو دل کی سطح سے اوپر رکھیں۔",
      "خون رِسنے پر اوپر مزید پٹی رکھیں، پہلی تہہ نہ ہٹائیں۔",
      "1122 پر کال کریں اور مریض کو گرم اور لیٹا رکھیں۔",
    ],
  },
  {
    id: "burns",
    title: "Burns",
    titleUr: "جلنا",
    category: "trauma",
    icon: "flame",
    steps: [
      "Move the person away from the heat source safely.",
      "Cool the burn under clean running water for 20 minutes.",
      "Remove rings and tight clothing near the burn before swelling starts.",
      "Cover loosely with cling film or a clean non-fluffy cloth.",
      "Never apply toothpaste, oil or ice. Seek hospital care for large or facial burns.",
    ],
    stepsUr: [
      "مریض کو گرمی کے ذریعے سے محفوظ طریقے سے دور کریں۔",
      "جلے حصے کو 20 منٹ تک صاف بہتے پانی کے نیچے رکھیں۔",
      "سوجن سے پہلے انگوٹھیاں اور تنگ کپڑے اتار دیں۔",
      "کلنگ فلم یا صاف کپڑے سے ڈھیلا ڈھانپیں۔",
      "ٹوتھ پیسٹ، تیل یا برف ہرگز نہ لگائیں۔ بڑے زخم پر ہسپتال جائیں۔",
    ],
  },
  {
    id: "cpr",
    title: "CPR (adult)",
    titleUr: "سی پی آر (بالغ)",
    category: "cardiac",
    icon: "heart",
    steps: [
      "Check response and breathing for no more than 10 seconds.",
      "Call 1122 immediately and ask for an ambulance.",
      "Place hands in the centre of the chest, arms straight.",
      "Push hard and fast — 5-6 cm deep, 100-120 compressions per minute.",
      "Continue without long pauses until the person breathes or help arrives.",
    ],
    stepsUr: [
      "10 سیکنڈ میں مریض کا ردِعمل اور سانس چیک کریں۔",
      "فوراً 1122 پر کال کر کے ایمبولینس منگوائیں۔",
      "ہاتھ سینے کے وسط میں رکھیں، بازو سیدھے رکھیں۔",
      "5 تا 6 سینٹی میٹر گہرا، 100 تا 120 دباؤ فی منٹ دیں۔",
      "مریض کے سانس لینے یا مدد آنے تک جاری رکھیں۔",
    ],
  },
  {
    id: "choking",
    title: "Choking",
    titleUr: "گلے میں پھنسنا",
    category: "airway",
    icon: "wind",
    steps: [
      "Ask 'Are you choking?' — if they cannot speak, act now.",
      "Give 5 sharp back blows between the shoulder blades.",
      "Give 5 abdominal thrusts above the navel.",
      "Alternate 5 back blows and 5 thrusts until the object clears.",
      "If the person collapses, start CPR and call 1122.",
    ],
    stepsUr: [
      "پوچھیں کیا آپ کا سانس رک رہا ہے؟ اگر بول نہ سکیں تو فوراً عمل کریں۔",
      "کندھوں کے درمیان 5 زوردار تھپکیاں دیں۔",
      "ناف کے اوپر 5 دباؤ (ابڈومنل تھرسٹ) دیں۔",
      "5 تھپکیاں اور 5 دباؤ باری باری دہرائیں۔",
      "اگر مریض گر جائے تو سی پی آر شروع کریں اور 1122 کال کریں۔",
    ],
  },
  {
    id: "fracture",
    title: "Fractures",
    titleUr: "ہڈی ٹوٹنا",
    category: "trauma",
    icon: "bone",
    steps: [
      "Keep the person still and do not try to straighten the limb.",
      "Support the injury with padding on both sides.",
      "Immobilise with a splint or sling if you are trained.",
      "Apply a cold pack over cloth to reduce swelling.",
      "Arrange transport to hospital; do not give food or water.",
    ],
    stepsUr: [
      "مریض کو ساکن رکھیں اور ہڈی سیدھی کرنے کی کوشش نہ کریں۔",
      "زخمی حصے کے دونوں طرف سہارا رکھیں۔",
      "تربیت ہو تو اسپلنٹ یا سلنگ لگائیں۔",
      "کپڑے کے اوپر ٹھنڈا پیک رکھیں تاکہ سوجن کم ہو۔",
      "ہسپتال منتقل کریں؛ کھانا پینا نہ دیں۔",
    ],
  },
  {
    id: "drowning",
    title: "Drowning",
    titleUr: "ڈوبنا",
    category: "airway",
    icon: "waves",
    steps: [
      "Do not enter the water unless trained — reach or throw a float.",
      "Once out, check breathing immediately.",
      "If not breathing, give 5 rescue breaths then start CPR.",
      "Turn the head to the side if water comes out of the mouth.",
      "Keep the person warm; all drowning cases need hospital assessment.",
    ],
    stepsUr: [
      "تربیت نہ ہو تو پانی میں نہ اتریں — رسی یا تیرنے والی چیز پھینکیں۔",
      "باہر نکالنے کے بعد فوراً سانس چیک کریں۔",
      "سانس نہ ہو تو 5 ریسکیو سانس دیں پھر سی پی آر شروع کریں۔",
      "منہ سے پانی نکلے تو سر ایک طرف موڑ دیں۔",
      "مریض کو گرم رکھیں؛ ہر کیس کا ہسپتال میں معائنہ ضروری ہے۔",
    ],
  },
];

export type IncidentStatus = "submitted" | "inReview" | "resolved";

export const INCIDENTS: {
  id: string;
  category: string;
  categoryUr: string;
  location: string;
  date: string;
  status: IncidentStatus;
}[] = [
  {
    id: "AMN-83421",
    category: "Flood",
    categoryUr: "سیلاب",
    location: "Gulshan-e-Iqbal Block 6",
    date: "Today, 09:14",
    status: "inReview",
  },
  {
    id: "AMN-83102",
    category: "Medical",
    categoryUr: "طبی",
    location: "Shahrah-e-Faisal",
    date: "Yesterday, 21:40",
    status: "resolved",
  },
  {
    id: "AMN-82877",
    category: "Fire",
    categoryUr: "آگ",
    location: "Korangi Industrial Area",
    date: "12 Aug, 16:02",
    status: "resolved",
  },
  {
    id: "AMN-82640",
    category: "Accident",
    categoryUr: "حادثہ",
    location: "Nazimabad No. 2",
    date: "08 Aug, 07:55",
    status: "submitted",
  },
];
