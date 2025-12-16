import { Hand, Heart, Users, Video, Music, Sun, MapPin, Phone, Mail } from "lucide-react";
import vrindavanSunrise from "@assets/generated_images/vrindavan_sunrise_temple_landscape.png";
import guruTeaching from "@assets/generated_images/spiritual_guru_teaching.png";
import bhajanKirtan from "@assets/generated_images/devotional_bhajan_kirtan.png";
import meditation from "@assets/generated_images/peaceful_river_ghat_meditation.png";
import mathuraImage from "@assets/stock_images/mathura_temple_ghat__d4f9531c.jpg";
import vrindavanImage from "@assets/stock_images/vrindavan_banke_biha_e70bac1b.jpg";
import gokulImage from "@assets/stock_images/gokul_krishna_birthp_14f078c6.jpg";
import govardhanImage from "@assets/stock_images/govardhan_hill_templ_59e90b12.jpg";
import mahavanImage from "@assets/stock_images/mahavan_gokul_temple_486bbc8f.jpg";

export const assets = {
  hero: vrindavanSunrise,
  guru: guruTeaching,
  bhajan: bhajanKirtan,
  meditation: meditation,
};

export const offerings = [
  {
    icon: Video,
    title: { en: "Daily Satsang", hi: "दैनिक सत्संग" },
    desc: { en: "Live wisdom from Vrindavan.", hi: "वृंदावन से सीधा ज्ञान प्रसार।" }
  },
  {
    icon: Music,
    title: { en: "Bhajan Kirtan", hi: "भजन कीर्तन" },
    desc: { en: "Devotional music for the soul.", hi: "आत्मा के लिए भक्ति संगीत।" }
  },
  {
    icon: Sun,
    title: { en: "Morning Aarti", hi: "प्रातः आरती" },
    desc: { en: "Start your day with blessings.", hi: "दिन की शुरुआत आशीर्वाद के साथ।" }
  },
  {
    icon: Users,
    title: { en: "Community", hi: "समुदाय" },
    desc: { en: "Connect with fellow seekers.", hi: "साथी साधकों से जुड़ें।" }
  }
];

export const values = [
  { title: { en: "Truth", hi: "सत्य" }, icon: Sun },
  { title: { en: "Respect", hi: "सम्मान" }, icon: Hand },
  { title: { en: "Simplicity", hi: "सरलता" }, icon: Heart },
  { title: { en: "Compassion", hi: "करुणा" }, icon: Heart },
  { title: { en: "Unity", hi: "एकता" }, icon: Users },
];

export const locations = [
  { name: "Mathura", image: mathuraImage },
  { name: "Vrindavan", image: vrindavanImage },
  { name: "Gokul", image: gokulImage },
  { name: "Govardhan", image: govardhanImage },
  { name: "Mahavan", image: mahavanImage },
];

export const aboutContent = {
  en: [
    "Asthawaani is a spiritual platform born from the sacred land of Mathura–Vrindavan. Its purpose is simple — to bring India’s purest voices of wisdom to every home.",
    "Across India, many gifted Katha Vachaks, Pravaktas, Spiritual Speakers, Bhajan Singers, and Astrologers carry deep knowledge and devotion, yet they remain unseen on larger platforms.",
    "Asthawaani opens a doorway for them. It connects these divine voices with seekers across India and the world — so that no true teacher remains unheard, and no true seeker remains unguided.",
    "Asthawaani is not just a channel. It is a digital satsang mandir, a healing space, a spiritual family."
  ],
  hi: [
    "आस्थावाणी मथुरा–वृंदावन की पवित्र भूमि से जन्मा एक आध्यात्मिक मंच है। इसका उद्देश्य बहुत सरल है — भारत की सच्ची ज्ञान-वाणी को हर घर तक पहुँचाना।",
    "भारत भर में कई विद्वान कथा-वाचक, प्रवक्ता, भजन गायक, आध्यात्मिक वक्ता और ज्योतिषाचार्य हैं जिनके पास अद्भुत ज्ञान है, पर वे अभी बड़ी दुनिया के सामने नहीं आ पाए हैं।",
    "आस्थावाणी उनके लिए वह द्वार खोलता है। यह इन सभी दैवीय वाणियों को भारत और विश्व के भक्तों से जोड़ता है — ताकि कोई सच्चा गुरु अनसुना न रहे, और कोई सच्चा भक्त बिना मार्गदर्शन न रहे।",
    "आस्थावाणी केवल एक चैनल नहीं… यह डिजिटल सत्संग का मंदिर है, यह healing का स्थान है, यह भक्ति का परिवार है।"
  ]
};
