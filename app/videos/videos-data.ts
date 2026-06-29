export type SiteVideo = {
  videoId: string;
  title: string;
  duration: string; // ISO-friendly mm:ss
  thumbnailUrl: string;
};

export const SITE_VIDEOS: SiteVideo[] = [
  { videoId: 'wRAHgryads0', title: 'पंडित अखिलेश गौड़ जी की चेतावनी! आज नहीं संभले तो देर हो जाएगी।', duration: '13:53', thumbnailUrl: 'https://i.ytimg.com/vi/wRAHgryads0/sddefault.jpg' },
  { videoId: 'WkuCencbA9g', title: 'Sankat Mochan Hanuman Ashtak – Asthavaani Version', duration: '5:16', thumbnailUrl: 'https://i.ytimg.com/vi/WkuCencbA9g/sddefault.jpg' },
  { videoId: '7CHJ-56pf7s', title: 'अंजनी के लाल सालासर वाले | जय बजरंगबली | Salasar ji Balaji', duration: '2:12', thumbnailUrl: 'https://i.ytimg.com/vi/7CHJ-56pf7s/sddefault.jpg' },
  { videoId: 'PlHBsxaO-ys', title: 'True Friendship Has No Gender | Radha Krishna Prem Sandesh', duration: '2:34', thumbnailUrl: 'https://img.youtube.com/vi/PlHBsxaO-ys/sddefault.jpg' },
  { videoId: 'dCzdE9umrr4', title: 'अब डर कैसा? श्याम बाबा ने हाथ थाम लिया', duration: '3:49', thumbnailUrl: 'https://img.youtube.com/vi/dCzdE9umrr4/sddefault.jpg' },
  { videoId: '8cAb1LM_cfo', title: 'ॐ शं शनैश्चराय नमः 108 बार | Shani Dev Mantra Jaap', duration: '6:37', thumbnailUrl: 'https://img.youtube.com/vi/8cAb1LM_cfo/sddefault.jpg' },
  { videoId: 'y8WQ15YboH8', title: 'श्रीनाथ जी के गोवर्धन परिक्रमा पर स्थित जतीपुरा मंदिर की अद्भुत महिमा', duration: '1:26', thumbnailUrl: 'https://img.youtube.com/vi/y8WQ15YboH8/sddefault.jpg' },
  { videoId: 'zdrdSuRnYNs', title: 'Morning Workout+Mantra 🔥 | Gym Anthem with Krishna, Shiv, Hanuman & Gayatri mantra', duration: '3:34', thumbnailUrl: 'https://i.ytimg.com/vi/zdrdSuRnYNs/sddefault.jpg' },
  { videoId: '23jTVAeVHyA', title: 'आस्थावाणी – आपकी आस्था का सच्चा साथी। Asthawaani', duration: '0:25', thumbnailUrl: 'https://i.ytimg.com/vi/23jTVAeVHyA/sddefault.jpg' },
  { videoId: 'zc9SG4i-f64', title: 'Death came in a beautiful form… and Krishna granted salvation | Putana Moksha Katha', duration: '36:52', thumbnailUrl: 'https://i.ytimg.com/vi/zc9SG4i-f64/sddefault.jpg' },
];

export function durationToISO(d: string): string {
  const parts = d.split(':').map(Number);
  let h = 0, m = 0, s = 0;
  if (parts.length === 3) [h, m, s] = parts;
  else if (parts.length === 2) [m, s] = parts;
  else [s] = parts;
  return `PT${h ? h + 'H' : ''}${m ? m + 'M' : ''}${s ? s + 'S' : ''}` || 'PT0S';
}
