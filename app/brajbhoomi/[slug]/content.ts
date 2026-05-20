export type PlaceDetail = {
  slug: string;
  name: string;
  nameHi: string;
  tagline: string;
  taglineHi: string;
  image: string;
  intro: string;
  introHi: string;
  sections: { heading: string; headingHi: string; body: string; bodyHi: string }[];
  metaDescription: string;
};

export const placeDetails: Record<string, PlaceDetail> = {
  vrindavan: {
    slug: 'vrindavan', name: 'Vrindavan', nameHi: 'वृंदावन',
    tagline: 'The Land of Divine Love and Bhakti', taglineHi: 'दिव्य प्रेम और भक्ति की भूमि',
    image: '/attached_assets/Temple/Prem_mandir.png',
    intro: 'Vrindavan is the eternal playground of Shri Radha and Shri Krishna. Every grove, river bend and temple echoes with their leelas and the bhakti of countless saints.',
    introHi: 'वृंदावन श्री राधा और श्री कृष्ण की शाश्वत लीलाभूमि है। यहाँ का प्रत्येक कुंज, यमुना का प्रत्येक मोड़ और प्रत्येक मंदिर उनकी लीलाओं तथा असंख्य संतों की भक्ति से गूँजता है।',
    sections: [
      { heading: 'Famous Temples', headingHi: 'प्रसिद्ध मंदिर', body: 'Banke Bihari, Prem Mandir, ISKCON, Radha Raman, Radha Vallabh and Nidhivan are among the must-visit shrines.', bodyHi: 'बांके बिहारी, प्रेम मंदिर, इस्कॉन, राधा रमण, राधा वल्लभ और निधिवन प्रमुख दर्शनीय मंदिर हैं।' },
      { heading: 'Spiritual Significance', headingHi: 'आध्यात्मिक महत्व', body: 'It is said that the dust of Vrindavan itself is liberating. Even a single visit deepens one\'s bhakti.', bodyHi: 'कहा जाता है कि वृंदावन की रज ही मुक्ति देती है। एक भी यात्रा भक्ति को गहरा कर देती है।' },
    ],
    metaDescription: 'Vrindavan — sacred land of Shri Radha Krishna. Temples, leelas, bhakti and spiritual significance on Asthawaani.',
  },
  gokul: {
    slug: 'gokul', name: 'Gokul', nameHi: 'गोकुल',
    tagline: 'The Sacred Childhood Abode of Shri Krishna', taglineHi: 'श्रीकृष्ण की पवित्र बाल-लीला भूमि',
    image: '/attached_assets/Temple/Raman_reti.png',
    intro: 'Gokul is the village where baby Krishna spent his earliest years with Nanda Baba and Yashoda Maiya. The leelas of Makhan Chori and Damodar Leela took place here.',
    introHi: 'गोकुल वह ग्राम है जहाँ बाल कृष्ण ने नंद बाबा और यशोदा मैया के साथ अपने प्रारंभिक वर्ष बिताए। माखन चोरी और दामोदर लीला यहीं हुई।',
    sections: [
      { heading: 'Raman Reti', headingHi: 'रमन रेती', body: 'The soft golden sands where Krishna played with his friends. Devotees still roll in this sand as an act of bhakti.', bodyHi: 'मुलायम सुनहरी रेत जहाँ कृष्ण अपने सखाओं के साथ खेलते थे। भक्त आज भी इस रेत में लोटकर भक्ति प्रकट करते हैं।' },
      { heading: 'Key Temples', headingHi: 'मुख्य मंदिर', body: 'Nand Bhavan, Yashoda Ghat and Chaurasi Khamba are the heart of Gokul darshan.', bodyHi: 'नंद भवन, यशोदा घाट और चौरासी खंभा गोकुल दर्शन के केंद्र हैं।' },
    ],
    metaDescription: 'Gokul — childhood village of Shri Krishna. Raman Reti, Nand Bhavan and bal-leela darshan on Asthawaani.',
  },
  govardhan: {
    slug: 'govardhan', name: 'Govardhan', nameHi: 'गोवर्धन',
    tagline: 'The Sacred Hill of Protection', taglineHi: 'रक्षा का पवित्र पर्वत',
    image: '/attached_assets/Temple/Daan_Ghati.png',
    intro: 'Govardhan is the sacred hill lifted by Shri Krishna on his little finger to protect the people of Braj. The 21-km parikrama is one of the most powerful spiritual practices in Sanatan Dharma.',
    introHi: 'गोवर्धन वह पवित्र पर्वत है जिसे श्रीकृष्ण ने ब्रजवासियों की रक्षा हेतु अपनी कनिष्ठा अंगुली पर उठाया था। 21 किलोमीटर की परिक्रमा सनातन धर्म की सबसे शक्तिशाली साधनाओं में से एक है।',
    sections: [
      { heading: 'Daan Ghati', headingHi: 'दान घाटी', body: 'The spot where Krishna is said to have taken "daan" from the gopis. The temple here is a primary darshan site.', bodyHi: 'वह स्थान जहाँ कृष्ण ने गोपियों से "दान" लिया था। यहाँ का मंदिर मुख्य दर्शन स्थल है।' },
      { heading: 'Parikrama', headingHi: 'परिक्रमा', body: 'Devotees walk barefoot around the hill — many also do "dandavat parikrama" by full prostration.', bodyHi: 'भक्त नंगे पाँव परिक्रमा करते हैं — कई "दंडवत परिक्रमा" भी करते हैं।' },
    ],
    metaDescription: 'Govardhan parikrama, Daan Ghati and the sacred hill lifted by Krishna — pilgrimage details on Asthawaani.',
  },
  mahavan: {
    slug: 'mahavan', name: 'Mahavan', nameHi: 'महावन',
    tagline: 'The Forest of Divine Protection', taglineHi: 'दिव्य संरक्षण का वन',
    image: '/attached_assets/Temple/mahaban_Chaurasi.png',
    intro: 'Mahavan, also called Gokul Mahavan, holds Chaurasi Khamba — 84 ancient pillars said to be from the original Nanda Bhavan where Krishna grew up.',
    introHi: 'महावन, जिसे गोकुल महावन भी कहा जाता है, में चौरासी खंभा हैं — 84 प्राचीन स्तंभ जो मूल नंद भवन के माने जाते हैं जहाँ कृष्ण बड़े हुए।',
    sections: [
      { heading: 'Chaurasi Khamba', headingHi: 'चौरासी खंभा', body: 'These pillars are believed to be living witnesses of Krishna\'s bal-leelas.', bodyHi: 'ये स्तंभ कृष्ण की बाल-लीलाओं के जीवंत साक्षी माने जाते हैं।' },
    ],
    metaDescription: 'Mahavan and Chaurasi Khamba — ancient pillars of Krishna\'s childhood home in Braj. Details on Asthawaani.',
  },
  barsana: {
    slug: 'barsana', name: 'Barsana', nameHi: 'बरसाना',
    tagline: 'The Divine Land of Radha Rani', taglineHi: 'राधा रानी की दिव्य भूमि',
    image: '/attached_assets/Temple/Barsana_Radha_Rani.png',
    intro: 'Barsana is the birthplace of Shri Radha Rani. Set on lush hills, it is home to the famous Shriji Temple and the unique Lathmar Holi festival.',
    introHi: 'बरसाना श्री राधा रानी की जन्मस्थली है। हरी-भरी पहाड़ियों पर स्थित यहाँ प्रसिद्ध श्रीजी मंदिर और अद्वितीय लठमार होली का उत्सव होता है।',
    sections: [
      { heading: 'Shriji Temple', headingHi: 'श्रीजी मंदिर', body: 'The main temple of Radha Rani on Brahma Parvat, reached by climbing 200+ steps.', bodyHi: 'ब्रह्म पर्वत पर राधा रानी का मुख्य मंदिर, जहाँ 200+ सीढ़ियाँ चढ़कर पहुँचा जाता है।' },
      { heading: 'Lathmar Holi', headingHi: 'लठमार होली', body: 'A playful, world-famous Holi where the women of Barsana lovingly chase the men of Nandgaon with sticks.', bodyHi: 'विश्व-प्रसिद्ध, मनोहर होली जहाँ बरसाने की महिलाएँ नंदगाँव के पुरुषों का लाठियों से पीछा करती हैं।' },
    ],
    metaDescription: 'Barsana — birthplace of Radha Rani. Shriji Temple, Lathmar Holi and Braj darshan on Asthawaani.',
  },
};

export const placeSlugs = Object.keys(placeDetails);