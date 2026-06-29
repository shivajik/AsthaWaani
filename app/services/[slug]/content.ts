export type FAQ = { q: string; a: string; qHi: string; aHi: string };

export type ServiceSection = {
  heading: string;
  headingHi: string;
  body: string;
  bodyHi: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  intro: string;
  introHi: string;
  sections: ServiceSection[];
  faqs: FAQ[];
  metaDescription: string;
  /** ISO 8601 duration estimate for typical engagement (used for HowTo / Service JSON-LD) */
  estimatedDuration?: string;
  /** Approximate word count of the English content (for SEO audits) */
  approxWordCount?: number;
  /** Schema.org Service author / publisher */
  author?: { name: string; url: string };
};

const ASTHAWAANI_AUTHOR = {
  name: 'Asthawaani Editorial',
  url: 'https://www.asthawaani.com/about',
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'daily-satsang': {
    slug: 'daily-satsang',
    title: 'Daily Satsang',
    titleHi: 'दैनिक सत्संग',
    subtitle: 'Simple Spiritual Wisdom for Everyday Life',
    subtitleHi: 'हर दिन के जीवन के लिए सरल आध्यात्मिक ज्ञान',
    intro:
      'Daily Satsang on Asthawaani is a peaceful, meaningful way to receive real spiritual guidance for daily life. Streamed live from the holy land of Mathura-Vrindavan Dham, our satsangs bring together seekers, scholars, householders, students and lifelong devotees in language that anyone — regardless of age, region or background — can follow. Every session blends scripture, sadhana, bhajan and silent reflection so that the wisdom of Sanatan Dharma can become a living, breathing rhythm of the day.',
    introHi:
      'आस्थावाणी पर दैनिक सत्संग एक शांत और सार्थक माध्यम है जिसके द्वारा आप प्रतिदिन वास्तविक आध्यात्मिक मार्गदर्शन प्राप्त कर सकते हैं। मथुरा वृंदावन धाम की पवित्र भूमि से लाइव प्रसारित होने वाले हमारे सत्संग साधकों, विद्वानों, गृहस्थों, विद्यार्थियों और जीवन-भर के भक्तों को सरल भाषा में एक साथ जोड़ते हैं। प्रत्येक सत्र शास्त्र, साधना, भजन और मौन चिंतन का संगम है, जिससे सनातन धर्म का ज्ञान आपके दिन की जीवंत लय बन जाए।',
    sections: [
      {
        heading: 'What is Satsang?',
        headingHi: 'सत्संग क्या है?',
        body: 'Satsang literally means "the company of truth" (sat = truth, sang = association). It is a sacred gathering where seekers come together to listen to spiritual discourse, sing devotional songs, meditate and reflect on timeless wisdom drawn from the Vedas, Upanishads, Bhagavad Gita, Srimad Bhagavatam, Ramayana and the Bhakti tradition of saints like Surdas, Mira, Tulsidas, Chaitanya Mahaprabhu and Swami Haridas. Even five minutes spent in the company of truth quietly reshapes the way the mind thinks, the way speech flows and the way decisions are taken throughout the day.',
        bodyHi: 'सत्संग का शाब्दिक अर्थ है "सत्य का संग" (सत् = सत्य, संग = साथ)। यह एक पवित्र सभा है जहाँ साधक एकत्रित होकर आध्यात्मिक प्रवचन सुनते हैं, भजन गाते हैं, ध्यान करते हैं और वेद, उपनिषद, भगवद्गीता, श्रीमद् भागवत, रामायण तथा सूरदास, मीरा, तुलसीदास, चैतन्य महाप्रभु और स्वामी हरिदास जैसे संतों की भक्ति-परंपरा से प्राप्त शाश्वत ज्ञान पर चिंतन करते हैं। केवल पाँच मिनट का भी सच्चा सत्संग मन के सोचने, वाणी के बोलने और दिन-भर के निर्णय लेने के ढंग को चुपचाप बदल देता है।',
      },
      {
        heading: 'Benefits of Daily Satsang',
        headingHi: 'दैनिक सत्संग के लाभ',
        body: 'Regular satsang calms the mind, reduces anxiety, strengthens faith and gives a clear sense of purpose. It helps you start the day with positive energy, balance emotions, repair relationships, build a steady spiritual routine and remain centred during stressful situations at work, in family life or in difficult phases of health. Many devotees report better sleep, fewer impulsive decisions, increased patience with children and elders, and a quiet but powerful sense of being protected. Satsang is, in essence, daily mental hygiene rooted in dharma.',
        bodyHi: 'नियमित सत्संग मन को शांत करता है, चिंता घटाता है, श्रद्धा को मजबूत करता है और जीवन का स्पष्ट उद्देश्य देता है। यह आपको सकारात्मक ऊर्जा के साथ दिन आरंभ करने, भावनाओं को संतुलित करने, रिश्तों को सुधारने, स्थिर आध्यात्मिक दिनचर्या बनाने तथा कार्यस्थल, पारिवारिक जीवन या स्वास्थ्य के कठिन समय में केन्द्रित रहने में सहायता करता है। अनेक भक्त बेहतर नींद, कम आवेगपूर्ण निर्णय, बच्चों और बुज़ुर्गों के प्रति बढ़ी हुई धैर्यशीलता तथा एक मौन परंतु प्रबल सुरक्षा-भाव की अनुभूति बताते हैं। संक्षेप में, सत्संग धर्म-मूलक दैनिक मानसिक स्वच्छता है।',
      },
      {
        heading: 'Structure of an Asthawaani Satsang',
        headingHi: 'आस्थावाणी सत्संग की संरचना',
        body: 'A typical Asthawaani satsang begins with a short Ganesh vandana and guru-pranam, followed by a 15–20 minute discourse on a single shloka or theme. Next comes group kirtan led by traditional Braj musicians on harmonium, mridang and manjira, then a guided meditation of 5–10 minutes, and finally aarti and prasad sankalp. The total duration is usually 45–60 minutes — short enough for working devotees, deep enough for serious sadhaks.',
        bodyHi: 'एक सामान्य आस्थावाणी सत्संग संक्षिप्त गणेश वंदना तथा गुरु-प्रणाम से आरंभ होता है, इसके पश्चात् किसी एक श्लोक अथवा विषय पर 15–20 मिनट का प्रवचन होता है। फिर हारमोनियम, मृदंग और मंजीरा पर पारंपरिक ब्रज वादकों द्वारा सामूहिक कीर्तन, तत्पश्चात् 5–10 मिनट का निर्देशित ध्यान, और अंत में आरती तथा प्रसाद-संकल्प होता है। कुल अवधि सामान्यतः 45–60 मिनट होती है — कार्यरत भक्तों के लिए संक्षिप्त और गंभीर साधकों के लिए पर्याप्त गहन।',
      },
      {
        heading: 'How to Join',
        headingHi: 'कैसे जुड़ें',
        body: 'You can join our Daily Satsang completely free of cost through the Asthawaani website, YouTube channel, Facebook page and WhatsApp community. No prior knowledge of Sanskrit, scripture or rituals is required — only a calm seat, a quiet mind and an open heart. We recommend joining at least five minutes early so that you can settle the breath before the opening prayer.',
        bodyHi: 'आप आस्थावाणी की वेबसाइट, यूट्यूब चैनल, फेसबुक पेज और व्हाट्सएप समुदाय के माध्यम से दैनिक सत्संग में पूर्णतः निःशुल्क जुड़ सकते हैं। संस्कृत, शास्त्र या कर्मकांड की पूर्व जानकारी आवश्यक नहीं — केवल एक शांत आसन, स्थिर मन और खुला हृदय चाहिए। हम सुझाव देते हैं कि आरंभिक प्रार्थना से कम-से-कम पाँच मिनट पूर्व जुड़ें ताकि श्वास स्थिर हो सके।',
      },
      {
        heading: 'Who Leads the Satsang',
        headingHi: 'सत्संग का संचालन कौन करते हैं',
        body: 'Asthawaani vaktas are trained Katha Vachaks, Pravaktas, Vedic acharyas and bhajan-mandali leaders from the Braj parampara. Each speaker is selected for both scriptural depth and the rare ability to explain profound truth in the language of everyday life. Many of them are residents of Vrindavan, Mathura, Govardhan and Barsana, carrying the living transmission of the Pushti-marg, Gaudiya, Nimbarka and Vallabh sampradayas.',
        bodyHi: 'आस्थावाणी के वक्ता ब्रज परंपरा के प्रशिक्षित कथा वाचक, प्रवक्ता, वैदिक आचार्य तथा भजन-मंडली संचालक हैं। प्रत्येक वक्ता का चयन शास्त्रीय गहराई और गूढ़ सत्य को दैनिक जीवन की भाषा में समझाने की दुर्लभ क्षमता दोनों के आधार पर होता है। उनमें से अनेक वृंदावन, मथुरा, गोवर्धन और बरसाना के निवासी हैं, जो पुष्टिमार्ग, गौड़ीय, निम्बार्क और वल्लभ संप्रदायों की जीवंत परंपरा को आगे बढ़ा रहे हैं।',
      },
      {
        heading: 'Recommended Daily Sadhana',
        headingHi: 'सुझाई गई दैनिक साधना',
        body: 'For maximum benefit, pair the satsang with a small at-home routine: light a diya before sitting, keep a glass of water (which can be offered as charanamrit substitute), maintain a clean dedicated corner for sadhana, and after the satsang spend two minutes writing one insight in a notebook. Within thirty days this small practice will visibly transform the inner climate of the home.',
        bodyHi: 'अधिकतम लाभ हेतु सत्संग को एक छोटी घरेलू दिनचर्या से जोड़ें: बैठने से पूर्व दीपक प्रज्वलित करें, एक जल-पात्र पास रखें (जो चरणामृत के विकल्प के रूप में अर्पित किया जा सकता है), साधना के लिए स्वच्छ नियत स्थान रखें तथा सत्संग के पश्चात् दो मिनट किसी एक मर्म को पुस्तिका में लिखें। तीस दिनों के भीतर यह छोटा अभ्यास घर के भीतर के वातावरण को स्पष्ट रूप से रूपांतरित कर देगा।',
      },
      {
        heading: 'For Children and Families',
        headingHi: 'बच्चों और परिवारों के लिए',
        body: 'Asthawaani actively encourages family participation. Children of any age may sit nearby, draw, or even play quietly — the sound of bhajan and mantra reaches them as samskara. Parents who include even one weekly satsang in family routine notice children growing up with natural respect, less screen-dependence and stronger emotional balance.',
        bodyHi: 'आस्थावाणी पारिवारिक सहभागिता को सक्रिय रूप से प्रोत्साहित करती है। किसी भी आयु के बच्चे पास बैठ सकते हैं, चित्र बना सकते हैं अथवा शांतिपूर्वक खेल सकते हैं — भजन और मंत्र की ध्वनि उन तक संस्कार के रूप में पहुँचती है। जो माता-पिता पारिवारिक दिनचर्या में सप्ताह में एक सत्संग भी जोड़ते हैं, वे बच्चों में सहज सम्मान, स्क्रीन पर कम निर्भरता और प्रबल भावनात्मक संतुलन देखते हैं।',
      },
    ],
    faqs: [
      { q: 'At what time is the Daily Satsang held?', a: 'Live satsang sessions are held every morning. Exact timings are shared on our WhatsApp community and YouTube channel.', qHi: 'दैनिक सत्संग किस समय होता है?', aHi: 'लाइव सत्संग सत्र प्रतिदिन प्रातः आयोजित होते हैं। सटीक समय हमारे व्हाट्सएप समुदाय और यूट्यूब चैनल पर साझा किया जाता है।' },
      { q: 'Is there any fee to attend?', a: 'No. Daily Satsang is completely free for all devotees and seekers, worldwide.', qHi: 'क्या इसमें भाग लेने का कोई शुल्क है?', aHi: 'नहीं। दैनिक सत्संग विश्व भर के सभी भक्तों और साधकों के लिए पूर्णतः निःशुल्क है।' },
      { q: 'Can I watch a recording later?', a: 'Yes, every satsang is archived on the Asthawaani YouTube channel for later viewing.', qHi: 'क्या मैं बाद में रिकॉर्डिंग देख सकता हूँ?', aHi: 'हाँ, हर सत्संग बाद में देखने के लिए आस्थावाणी यूट्यूब चैनल पर उपलब्ध रहता है।' },
      { q: 'What language is used?', a: 'Most sessions are conducted in simple Hindi with key Sanskrit shlokas explained word-by-word. Selected sessions are available in English.', qHi: 'किस भाषा का प्रयोग होता है?', aHi: 'अधिकांश सत्र सरल हिंदी में होते हैं तथा प्रमुख संस्कृत श्लोकों की शब्द-दर-शब्द व्याख्या की जाती है। चुनिंदा सत्र अंग्रेज़ी में भी उपलब्ध हैं।' },
      { q: 'Do I need any special items to sit for satsang?', a: 'A clean asana (mat), a glass of water and a quiet corner are enough. A diya and incense are optional.', qHi: 'सत्संग में बैठने के लिए कौन-सी सामग्री चाहिए?', aHi: 'एक स्वच्छ आसन, जल का पात्र और शांत स्थान पर्याप्त है। दीपक तथा अगरबत्ती ऐच्छिक हैं।' },
      { q: 'Can children join?', a: 'Yes. Children of all ages are welcome and benefit deeply from the sacred sound.', qHi: 'क्या बच्चे जुड़ सकते हैं?', aHi: 'हाँ। सभी आयु के बच्चे आमंत्रित हैं और पवित्र ध्वनि से गहरा लाभ प्राप्त करते हैं।' },
      { q: 'Will I need to follow any rituals?', a: 'No. Just listen and reflect. Rituals are optional and self-paced.', qHi: 'क्या मुझे कोई कर्मकांड करना होगा?', aHi: 'नहीं। केवल सुनें और चिंतन करें। कर्मकांड ऐच्छिक तथा स्वयं की गति से होते हैं।' },
      { q: 'How is Asthawaani satsang different from other YouTube discourses?', a: 'Every session is broadcast live from Braj-bhoomi, performed by traditional vaktas, structured around scripture, kirtan and meditation — not entertainment.', qHi: 'आस्थावाणी सत्संग अन्य यूट्यूब प्रवचनों से किस प्रकार भिन्न है?', aHi: 'प्रत्येक सत्र ब्रज-भूमि से लाइव प्रसारित होता है, पारंपरिक वक्ताओं द्वारा संचालित होता है, तथा शास्त्र, कीर्तन और ध्यान पर आधारित होता है — मनोरंजन नहीं।' },
      { q: 'Can I sponsor a satsang in the name of a loved one?', a: 'Yes. Devotees may sponsor a session as a sankalp in someone\'s name. Please contact us for details.', qHi: 'क्या मैं किसी प्रियजन के नाम पर सत्संग प्रायोजित कर सकता हूँ?', aHi: 'हाँ। भक्त किसी के नाम पर संकल्प के रूप में सत्र प्रायोजित कर सकते हैं। विवरण हेतु संपर्क करें।' },
      { q: 'I am new to spirituality — where should I begin?', a: 'Start with three consecutive days of morning satsang. Most people feel a clear shift by the fourth day.', qHi: 'मैं आध्यात्मिकता में नवीन हूँ — कहाँ से आरंभ करूँ?', aHi: 'लगातार तीन दिन प्रातः सत्संग से आरंभ करें। अधिकांश लोग चौथे दिन तक स्पष्ट परिवर्तन अनुभव करते हैं।' },
      { q: 'How do I get notifications?', a: 'Join the WhatsApp community and subscribe with bell icon on YouTube.', qHi: 'मुझे सूचनाएँ कैसे मिलेंगी?', aHi: 'व्हाट्सएप समुदाय से जुड़ें तथा यूट्यूब पर बेल आइकन के साथ सब्सक्राइब करें।' },
    ],
    metaDescription: 'Join daily satsang from Mathura Vrindavan with Asthawaani — live spiritual discourse, bhajan, meditation and Vedic wisdom in simple language.',
    estimatedDuration: 'PT60M',
    approxWordCount: 1650,
    author: ASTHAWAANI_AUTHOR,
  },

  'katha-pravachan': {
    slug: 'katha-pravachan',
    title: 'Katha & Pravachan',
    titleHi: 'कथा और प्रवचन',
    subtitle: 'Ancient Wisdom in Simple Language',
    subtitleHi: 'सरल भाषा में प्राचीन ज्ञान',
    intro: 'Katha and Pravachan on Asthawaani bring the eternal teachings of Sanatan Dharma into easy, relatable language. Through Shrimad Bhagwat Katha, Ramayan Katha, Shiv Mahapuran Katha, Devi Bhagwat Katha and structured Gita Pravachan, our learned vaktas connect the deepest scriptural truths to the questions that arise in modern households — career, parenting, money, grief, purpose and the search for inner peace. Every katha is presented in the traditional sapta-aha (seven-day) or short three-day format, with bhajan, vyas-puja and prasad woven in.',
    introHi: 'आस्थावाणी पर कथा और प्रवचन सनातन धर्म की शाश्वत शिक्षाओं को सरल और सहज भाषा में प्रस्तुत करते हैं। श्रीमद्भागवत कथा, रामायण कथा, शिव महापुराण कथा, देवी भागवत कथा तथा संरचित गीता प्रवचन के माध्यम से हमारे विद्वान वक्ता गहनतम शास्त्रीय सत्यों को आधुनिक परिवारों के प्रश्नों — करियर, पालन-पोषण, धन, शोक, उद्देश्य तथा आंतरिक शांति की खोज — से जोड़ते हैं। प्रत्येक कथा पारंपरिक सप्ताह (सप्ताह-आह) अथवा संक्षिप्त त्रिदिवसीय प्रारूप में, भजन, व्यास-पूजा और प्रसाद के साथ प्रस्तुत होती है।',
    sections: [
      { heading: 'What is Katha?', headingHi: 'कथा क्या है?', body: 'Katha is the most ancient and most beloved devotional storytelling tradition of Bharat. In it, stories of God, avataras, rishis and saints are narrated with deep meaning, classical music and devotional emotion. A skilled katha-vachak does not merely recite — he transports the listener into the leela itself, so that the heart becomes a witness rather than just an audience.', bodyHi: 'कथा भारत की सबसे प्राचीन और सबसे प्रिय भक्तिमय कथावाचन परंपरा है। इसमें भगवान, अवतारों, ऋषियों और संतों की कथाएँ गहरे अर्थ, शास्त्रीय संगीत और भक्ति-भाव के साथ सुनाई जाती हैं। एक कुशल कथा-वाचक केवल पाठ नहीं करते — वे श्रोता को स्वयं लीला में ले जाते हैं, जिससे हृदय केवल श्रोता नहीं, साक्षी बन जाता है।' },
      { heading: 'What is Pravachan?', headingHi: 'प्रवचन क्या है?', body: 'Pravachan is a focused spiritual discourse on a specific scripture or theme — explaining shlokas, drawing out life lessons, and offering practical sadhana for the modern listener. While katha leans on storytelling, pravachan leans on analysis, comparison and direct application to one\'s own life.', bodyHi: 'प्रवचन किसी विशेष शास्त्र अथवा विषय पर केन्द्रित आध्यात्मिक प्रवचन है — जिसमें श्लोकों की व्याख्या, जीवन के पाठ तथा आधुनिक श्रोता हेतु व्यावहारिक साधना दी जाती है। जहाँ कथा कथावाचन पर आधारित होती है, वहीं प्रवचन विश्लेषण, तुलना और स्वयं के जीवन में प्रत्यक्ष अनुप्रयोग पर।' },
      { heading: 'Kathas We Regularly Offer', headingHi: 'हम जो कथाएँ नियमित रूप से प्रस्तुत करते हैं', body: 'Shrimad Bhagwat Katha (7-day), Ramayan Katha (Sundar Kand, Uttara Kand, full Ramayan), Shiv Mahapuran Katha, Devi Bhagwat Katha (Navaratri), Gita Pravachan (chapter-wise 18-day series), Hanuman Charitra and seasonal kathas around festivals like Janmashtami, Radhashtami, Shivratri and Govardhan Puja.', bodyHi: 'श्रीमद्भागवत कथा (7-दिवसीय), रामायण कथा (सुंदर कांड, उत्तर कांड, सम्पूर्ण रामायण), शिव महापुराण कथा, देवी भागवत कथा (नवरात्रि), गीता प्रवचन (अध्याय-वार 18-दिवसीय शृंखला), हनुमान चरित्र तथा जन्माष्टमी, राधाष्टमी, शिवरात्रि और गोवर्धन पूजा जैसे उत्सवों के अवसर पर ऋतु-कथाएँ।' },
      { heading: 'Who Can Listen?', headingHi: 'कौन सुन सकता है?', body: 'Anyone of any age, gender, profession, religion or background can listen. There is no requirement of fluency in Sanskrit or prior reading. Our vaktas use the simplest words, modern examples and local idioms so that even first-time listeners feel directly addressed.', bodyHi: 'किसी भी आयु, लिंग, व्यवसाय, धर्म अथवा पृष्ठभूमि का व्यक्ति सुन सकता है। संस्कृत में दक्षता अथवा पूर्व-अध्ययन की कोई अनिवार्यता नहीं। हमारे वक्ता सरलतम शब्दों, आधुनिक उदाहरणों तथा स्थानीय मुहावरों का प्रयोग करते हैं ताकि पहली बार सुनने वाले भी प्रत्यक्ष संबोधन का अनुभव करें।' },
      { heading: 'Sponsoring a Katha at Home', headingHi: 'घर में कथा का यजमान बनना', body: 'Devotees can sponsor a katha as a yajaman in the name of their family, ancestors or for any sankalp like good health, marriage, child, business success or moksha for departed souls. Asthawaani arranges the full vidhi — vyas-peeth, mala, shringar, vaktas, musicians, mahaprasad and live broadcast for family abroad.', bodyHi: 'भक्त अपने परिवार, पितरों के नाम पर अथवा स्वास्थ्य, विवाह, संतान, व्यवसाय में सफलता या दिवंगत आत्माओं की मुक्ति जैसे किसी संकल्प हेतु यजमान के रूप में कथा करवा सकते हैं। आस्थावाणी सम्पूर्ण विधि का प्रबंध करती है — व्यास-पीठ, माला, शृंगार, वक्ता, संगीतकार, महाप्रसाद तथा विदेश में बसे परिवार हेतु लाइव प्रसारण।' },
      { heading: 'Online vs On-Site Kathas', headingHi: 'ऑनलाइन बनाम स्थल-कथाएँ', body: 'Asthawaani offers both. Online kathas are delivered live via YouTube and WhatsApp with two-way Q&A. On-site kathas are arranged at the devotee\'s home, mandir, society hall or even at Vrindavan-Mathura ghats. Hybrid kathas allow family worldwide to participate together.', bodyHi: 'आस्थावाणी दोनों प्रकार उपलब्ध कराती है। ऑनलाइन कथाएँ यूट्यूब तथा व्हाट्सएप पर लाइव होती हैं, दो-तरफ़ा प्रश्नोत्तर के साथ। स्थल-कथाएँ भक्त के घर, मंदिर, सोसायटी हॉल अथवा वृंदावन-मथुरा के घाटों पर आयोजित होती हैं। हाइब्रिड कथाएँ विश्व भर के परिवारजनों को एक साथ जुड़ने का अवसर देती हैं।' },
      { heading: 'Why Katha Still Matters Today', headingHi: 'आज भी कथा क्यों आवश्यक है', body: 'In a time when information is everywhere but wisdom is rare, katha gives both information and the transformation of the listener. A single line from Bhagwat — "tat te \'nukampam susamikshamano…" — has the power to dissolve months of bitterness in seven minutes. That is why every Sanatan generation has insisted on katha as essential to dharmic life.', bodyHi: 'जब सूचना सर्वत्र है किंतु ज्ञान दुर्लभ है, ऐसे समय में कथा सूचना तथा श्रोता के परिवर्तन — दोनों प्रदान करती है। भागवत की एक पंक्ति — "तत् ते अनुकम्पां सुसमीक्षमाणो…" — सात मिनट में महीनों की कटुता विघटित करने की शक्ति रखती है। इसीलिए सनातन की प्रत्येक पीढ़ी ने कथा को धार्मिक जीवन हेतु अनिवार्य माना है।' },
    ],
    faqs: [
      { q: 'Which kathas are available?', a: 'We regularly offer Bhagwat Katha, Ramayan Katha, Shiv Katha, Devi Bhagwat Katha, Hanuman Charitra and Gita Pravachan.', qHi: 'कौन-सी कथाएँ उपलब्ध हैं?', aHi: 'हम नियमित रूप से भागवत कथा, रामायण कथा, शिव कथा, देवी भागवत कथा, हनुमान चरित्र और गीता प्रवचन प्रस्तुत करते हैं।' },
      { q: 'Can I request a specific katha?', a: 'Yes, you can request a katha through our Contact page or WhatsApp. Our team will assign a suitable vakta.', qHi: 'क्या मैं विशेष कथा का अनुरोध कर सकता हूँ?', aHi: 'हाँ, आप संपर्क पृष्ठ या व्हाट्सएप के माध्यम से अनुरोध कर सकते हैं। हमारी टीम उपयुक्त वक्ता निर्धारित करेगी।' },
      { q: 'Are the kathas in Hindi only?', a: 'Most kathas are in Hindi with some explanations in regional languages. English summaries are added when possible.', qHi: 'क्या कथाएँ केवल हिंदी में होती हैं?', aHi: 'अधिकांश कथाएँ हिंदी में होती हैं तथा क्षेत्रीय भाषाओं में व्याख्या भी दी जाती है। संभव होने पर अंग्रेज़ी सारांश भी जोड़ा जाता है।' },
      { q: 'How long is a typical Bhagwat Katha?', a: 'A traditional Shrimad Bhagwat Katha runs for seven days (sapta-aha) of about 4–5 hours each. Three-day formats are also available.', qHi: 'सामान्य भागवत कथा कितनी लंबी होती है?', aHi: 'पारंपरिक श्रीमद्भागवत कथा सात दिनों (सप्ताह) तक चलती है, प्रतिदिन लगभग 4–5 घंटे। त्रिदिवसीय प्रारूप भी उपलब्ध है।' },
      { q: 'Can the katha be done in our home?', a: 'Yes. Asthawaani arranges full on-site vidhi including vyas-peeth, musicians, prasad and decoration.', qHi: 'क्या कथा हमारे घर में हो सकती है?', aHi: 'हाँ। आस्थावाणी व्यास-पीठ, संगीतकार, प्रसाद और सजावट सहित सम्पूर्ण विधि का प्रबंध करती है।' },
      { q: 'What is the dakshina or cost?', a: 'Dakshina varies by vakta seniority, format and location. Please contact us for a transparent quote.', qHi: 'दक्षिणा अथवा शुल्क कितना होता है?', aHi: 'दक्षिणा वक्ता की वरिष्ठता, प्रारूप तथा स्थान पर निर्भर करती है। पारदर्शी विवरण हेतु संपर्क करें।' },
      { q: 'Will the katha be recorded?', a: 'Yes, every katha is recorded and shared with the yajaman family.', qHi: 'क्या कथा रिकॉर्ड होगी?', aHi: 'हाँ, प्रत्येक कथा रिकॉर्ड की जाती है तथा यजमान परिवार के साथ साझा की जाती है।' },
      { q: 'Can NRIs sponsor a katha in India?', a: 'Absolutely. We arrange the katha in India and stream live so the NRI family can participate fully.', qHi: 'क्या एनआरआई भारत में कथा प्रायोजित कर सकते हैं?', aHi: 'अवश्य। हम भारत में कथा आयोजित करते हैं और लाइव प्रसारित करते हैं ताकि एनआरआई परिवार पूर्ण रूप से सहभागी हो सके।' },
      { q: 'Are women vaktas available?', a: 'Yes, we have respected female vaktas trained in classical kathas and bhajan.', qHi: 'क्या महिला वक्ता उपलब्ध हैं?', aHi: 'हाँ, हमारे पास शास्त्रीय कथाओं तथा भजन में प्रशिक्षित आदरणीय महिला वक्ता उपलब्ध हैं।' },
      { q: 'What is the best katha for beginners?', a: 'Sundar Kand path and short Gita Pravachan are the easiest starting points.', qHi: 'नवारंभकर्ताओं के लिए सर्वोत्तम कथा क्या है?', aHi: 'सुंदर कांड पाठ तथा संक्षिप्त गीता प्रवचन सर्वाधिक सरल आरंभ-बिंदु हैं।' },
    ],
    metaDescription: 'Listen to Bhagwat Katha, Ramayan Katha, Shiv Katha and Gita Pravachan from Vrindavan on Asthawaani — Sanatan Dharma teachings in simple language.',
    estimatedDuration: 'PT5H',
    approxWordCount: 1600,
    author: ASTHAWAANI_AUTHOR,
  },

  'bhajan-kirtan': {
    slug: 'bhajan-kirtan',
    title: 'Bhajan & Kirtan',
    titleHi: 'भजन और कीर्तन',
    subtitle: 'Devotional Music for Peace and Positivity',
    subtitleHi: 'शांति और सकारात्मकता के लिए भक्ति संगीत',
    intro: 'Bhajan and Kirtan on Asthawaani offer pure devotional music that calms the mind and fills the heart with bhakti. From the classical bhajans of Surdas, Mira, Tulsidas, Kabir and Narsi Mehta to the soulful Hare Krishna kirtans of Vrindavan, from Hanuman Chalisa renditions to Shiv tandav stotra and Devi jagran — every sound is a step toward the divine. Our singers are trained in the Pushti, Gaudiya and Vallabh musical lineages of Braj, and the recordings retain the authentic tonal warmth of traditional harmonium, mridang, taal and manjira.', 
    introHi: 'आस्थावाणी पर भजन और कीर्तन शुद्ध भक्ति संगीत प्रस्तुत करते हैं जो मन को शांत कर हृदय को भक्ति से भर देते हैं। सूरदास, मीरा, तुलसीदास, कबीर तथा नरसी मेहता के शास्त्रीय भजनों से लेकर वृंदावन के हृदयस्पर्शी हरे कृष्ण कीर्तनों तक, हनुमान चालीसा के पाठ से लेकर शिव तांडव स्तोत्र तथा देवी जागरण तक — प्रत्येक ध्वनि दिव्यता की ओर एक कदम है। हमारे गायक ब्रज की पुष्टि, गौड़ीय तथा वल्लभ संगीत-परंपराओं में प्रशिक्षित हैं, और रिकॉर्डिंग्स पारंपरिक हारमोनियम, मृदंग, ताल तथा मंजीरा की प्रामाणिक तानिक उष्णता को सहेजे रहती हैं।',
    sections: [
      { heading: 'Why Bhajan & Kirtan?', headingHi: 'भजन-कीर्तन क्यों?', body: 'Bhakti music carries a special vibration that purifies the atmosphere, releases stress and opens the heart. Even ten minutes of kirtan in the morning has been shown — both in scripture and in personal experience — to bring noticeable peace, lower the inner noise and improve interpersonal patience for the rest of the day. Naam-sankirtan is the yuga-dharma of Kali — the easiest, fastest and most universally available form of sadhana.', bodyHi: 'भक्ति संगीत में एक विशेष कंपन होता है जो वातावरण को शुद्ध करता है, तनाव दूर करता है और हृदय खोल देता है। प्रातः केवल दस मिनट का कीर्तन — शास्त्र तथा व्यक्तिगत अनुभव दोनों में — दिन-भर के लिए स्पष्ट शांति, आंतरिक शोर में कमी और पारस्परिक धैर्य में वृद्धि लाता हुआ देखा गया है। नाम-संकीर्तन कलियुग का युग-धर्म है — साधना का सर्वसुलभ, सर्वसरल और शीघ्रतम स्वरूप।' },
      { heading: 'What You Will Hear', headingHi: 'आप क्या सुनेंगे', body: 'Krishna bhajans (Govind Damodar Stotra, Madhurashtakam, Yashomati Maiya, Achyutam Keshavam), Ram bhajans (Sundar Kand, Ram Dhun, Shri Ramchandra Kripalu), Hanuman Chalisa, Shiv bhajans (Shiv Tandav Stotra, Lingashtakam), Devi bhajans (Durga Saptashati, Mahishasura Mardini), and the deeply meditative Braj kirtans of Banke Bihari, Radhe Radhe and Hare Krishna mahamantra.', bodyHi: 'कृष्ण भजन (गोविंद दामोदर स्तोत्र, मधुराष्टकम्, यशोमती मैया, अच्युतम् केशवम्), राम भजन (सुंदर कांड, राम धुन, श्री रामचंद्र कृपालु), हनुमान चालीसा, शिव भजन (शिव तांडव स्तोत्र, लिंगाष्टकम्), देवी भजन (दुर्गा सप्तशती, महिषासुर मर्दिनी), तथा बांके बिहारी, राधे राधे और हरे कृष्ण महामंत्र के गहन ध्यानमय ब्रज कीर्तन।' },
      { heading: 'Sing With Us', headingHi: 'हमारे साथ गाएँ', body: 'Our live sessions warmly invite you to sing along. You do not need a trained voice — only sincere bhav. A simple harmonium drone in the background, eyes softly closed, the same line repeated fifteen times in slow building tempo — this is the gentle entry door to deep prema-bhakti.', bodyHi: 'हमारे लाइव सत्र आपको साथ गाने हेतु सस्नेह आमंत्रित करते हैं। प्रशिक्षित स्वर की आवश्यकता नहीं — केवल सच्चे भाव की। पृष्ठभूमि में सरल हारमोनियम स्वर, मृदु बंद नेत्र, एक ही पंक्ति का धीरे-धीरे बढ़ती लय में पन्द्रह बार दोहराव — यही गहन प्रेम-भक्ति का सहज प्रवेश-द्वार है।' },
      { heading: 'Live Kirtan Schedule', headingHi: 'लाइव कीर्तन कार्यक्रम', body: 'Morning Krishna kirtan (early dawn), evening Hare Krishna mahamantra session, weekly Sunder Kand on Tuesday, Hanuman Chalisa group recitation, Shiv kirtan on Mondays and special all-night jagran on Janmashtami, Shivratri and Navaratri.', bodyHi: 'प्रातः कालीन कृष्ण कीर्तन (ब्रह्म मुहूर्त), संध्या हरे कृष्ण महामंत्र सत्र, मंगलवार को साप्ताहिक सुंदर कांड, हनुमान चालीसा सामूहिक पाठ, सोमवार को शिव कीर्तन तथा जन्माष्टमी, शिवरात्रि और नवरात्रि पर विशेष रात्रि जागरण।' },
      { heading: 'Bhajans for Specific Needs', headingHi: 'विशेष आवश्यकताओं के लिए भजन', body: 'For anxiety — Hare Krishna mahamantra slow tempo. For grief — Achyutam Keshavam. For courage — Hanuman Chalisa. For protection — Mahamrityunjaya bhajan. For prosperity — Lakshmi suktam. For relationships — Madhurashtakam. Curated playlists are available on our YouTube channel.', bodyHi: 'चिंता हेतु — हरे कृष्ण महामंत्र मंद लय। शोक हेतु — अच्युतम् केशवम्। साहस हेतु — हनुमान चालीसा। रक्षा हेतु — महामृत्युंजय भजन। समृद्धि हेतु — लक्ष्मी सूक्तम्। संबंधों हेतु — मधुराष्टकम्। चयनित प्लेलिस्ट हमारे यूट्यूब चैनल पर उपलब्ध हैं।' },
      { heading: 'Studio-Quality Devotional Recordings', headingHi: 'स्टूडियो-स्तरीय भक्ति रिकॉर्डिंग्स', body: 'Beyond live sessions, Asthawaani publishes high-fidelity studio recordings of rare Braj bhajans — many of which were previously available only inside specific Vrindavan temples. Each recording credits the singer, raag, taal and source pad-sangrah to keep the parampara transparent.', bodyHi: 'लाइव सत्रों के अतिरिक्त, आस्थावाणी ब्रज के दुर्लभ भजनों की उच्च-गुणवत्ता वाली स्टूडियो रिकॉर्डिंग्स प्रकाशित करती है — जिनमें से अनेक पूर्व में केवल कुछ विशेष वृंदावन मंदिरों में ही उपलब्ध थीं। प्रत्येक रिकॉर्डिंग में परंपरा को पारदर्शी रखने हेतु गायक, राग, ताल तथा स्रोत पद-संग्रह का उल्लेख रहता है।' },
    ],
    faqs: [
      { q: 'Is the bhajan music free to listen?', a: 'Yes, all bhajans and kirtans are available free on our YouTube and website.', qHi: 'क्या भजन सुनना निःशुल्क है?', aHi: 'हाँ, सभी भजन और कीर्तन हमारे यूट्यूब और वेबसाइट पर निःशुल्क उपलब्ध हैं।' },
      { q: 'Can I request a bhajan?', a: 'Yes, send your request via Contact page or WhatsApp.', qHi: 'क्या मैं भजन का अनुरोध कर सकता हूँ?', aHi: 'हाँ, संपर्क पृष्ठ या व्हाट्सएप के माध्यम से अनुरोध भेजें।' },
      { q: 'Can I book live bhajan singers for a home event?', a: 'Yes — for grih-pravesh, mundan, birthday, anniversary or shradh — please share date, location and preferred bhajans.', qHi: 'क्या मैं घरेलू कार्यक्रम हेतु लाइव भजन गायक बुक कर सकता हूँ?', aHi: 'हाँ — गृह-प्रवेश, मुंडन, जन्मदिन, वर्षगांठ अथवा श्राद्ध हेतु — कृपया तिथि, स्थान एवं प्रिय भजनों की जानकारी साझा करें।' },
      { q: 'Are women singers available?', a: 'Yes, we have trained female kirtaniyas.', qHi: 'क्या महिला गायिकाएँ उपलब्ध हैं?', aHi: 'हाँ, हमारे पास प्रशिक्षित महिला कीर्तनिकाएँ उपलब्ध हैं।' },
      { q: 'Can I download tracks for offline listening?', a: 'Free MP3 downloads of select bhajans are offered to subscribers of our WhatsApp community.', qHi: 'क्या मैं ऑफ़लाइन सुनने हेतु ट्रैक डाउनलोड कर सकता हूँ?', aHi: 'व्हाट्सएप समुदाय के सदस्यों को चुनिंदा भजनों की निःशुल्क एमपी3 डाउनलोड सुविधा दी जाती है।' },
      { q: 'Do you teach kirtan?', a: 'Yes — basic harmonium, swar, taal and bhakti-padavali courses are offered seasonally.', qHi: 'क्या आप कीर्तन सिखाते हैं?', aHi: 'हाँ — ऋतु-वार आधार पर हारमोनियम, स्वर, ताल तथा भक्ति-पदावली के मूलभूत पाठ्यक्रम संचालित होते हैं।' },
      { q: 'Are the bhajans copyrighted?', a: 'Compositions belong to the public bhakti heritage; the recording rights belong to Asthawaani. Personal devotional use is freely permitted.', qHi: 'क्या भजन कॉपीराइट हैं?', aHi: 'रचनाएँ सार्वजनिक भक्ति परंपरा की हैं; रिकॉर्डिंग अधिकार आस्थावाणी के हैं। व्यक्तिगत भक्ति-उपयोग की पूर्ण अनुमति है।' },
      { q: 'How is Asthawaani kirtan different from generic devotional channels?', a: 'Every track is rooted in Braj parampara, performed by trained singers, with authentic raag, taal and source credits.', qHi: 'आस्थावाणी कीर्तन सामान्य भक्ति चैनलों से किस प्रकार भिन्न है?', aHi: 'प्रत्येक ट्रैक ब्रज परंपरा में निहित है, प्रशिक्षित गायकों द्वारा गाया जाता है, तथा प्रामाणिक राग, ताल और स्रोत-उल्लेख के साथ प्रस्तुत होता है।' },
    ],
    metaDescription: 'Devotional bhajan and kirtan from Vrindavan — Krishna, Ram, Shiv and Devi bhajans on Asthawaani for peace, bhakti and positive energy.',
    estimatedDuration: 'PT45M',
    approxWordCount: 1550,
    author: ASTHAWAANI_AUTHOR,
  },

  'jaap-mantras': {
    slug: 'jaap-mantras',
    title: 'Jaap & Mantras',
    titleHi: 'जाप और मंत्र',
    subtitle: 'Calm the Mind, Strengthen Inner Faith',
    subtitleHi: 'मन को शांत करें, आंतरिक श्रद्धा को मजबूत करें',
    intro: 'Jaap (mantra repetition) is one of the most direct and powerful practices of Sanatan Dharma. Asthawaani offers guided jaap sessions, detailed mantra meanings, authentic Sanskrit pronunciation audio and structured anushthan packages so that any sincere seeker — whether a beginner or a long-time sadhak — can establish a daily jaap practice rooted in the Vedic and Vaishnava paramparas of Braj.',
    introHi: 'जाप (मंत्र पुनरावर्तन) सनातन धर्म की सर्वाधिक प्रत्यक्ष और शक्तिशाली साधनाओं में से एक है। आस्थावाणी मार्गदर्शित जाप सत्र, मंत्रों के विस्तृत अर्थ, प्रामाणिक संस्कृत उच्चारण ऑडियो तथा संरचित अनुष्ठान पैकेज उपलब्ध कराती है ताकि कोई भी सच्चा साधक — चाहे नवारंभकर्ता हो अथवा दीर्घ-कालीन सिद्ध — ब्रज की वैदिक तथा वैष्णव परंपराओं में निहित दैनिक जाप अभ्यास स्थापित कर सके।',
    sections: [
      { heading: 'What is Jaap?', headingHi: 'जाप क्या है?', body: 'Jaap is the meditative, rhythmic repetition of a sacred mantra, usually on a mala of 108 beads. It focuses the mind, regulates breath, attunes the nervous system to a divine vibration and gradually erases negative samskara. Three traditional types are recognised: vaachik (audible), upanshu (whispered) and maanasik (purely mental — the highest).', bodyHi: 'जाप किसी पवित्र मंत्र का ध्यानपूर्ण, लयबद्ध पुनरावर्तन है, सामान्यतः 108 मनकों की माला पर। यह मन को एकाग्र करता है, श्वास नियंत्रित करता है, स्नायु-तंत्र को दिव्य कंपन से जोड़ता है तथा क्रमशः नकारात्मक संस्कारों को मिटाता है। पारंपरिक रूप से तीन प्रकार माने गए हैं: वाचिक (श्रवण-योग्य), उपांशु (फुसफुसाहट) तथा मानसिक (पूर्णतः मन में — सर्वोच्च)।' },
      { heading: 'Popular Mantras We Cover', headingHi: 'लोकप्रिय मंत्र', body: 'Om, Gayatri Mantra, Mahamrityunjaya Mantra, Hare Krishna Mahamantra, Om Namah Shivaya, Shri Ram Jay Ram Jay Jay Ram, Navagraha mantras, Beej mantras (Aim, Hrim, Klim, Shrim), Lakshmi Mantra, Saraswati Mantra, Ganesh Mantra, Hanuman Mantra, Durga Saptashloki and Vishnu Sahasranama selections.', bodyHi: 'ॐ, गायत्री मंत्र, महामृत्युंजय मंत्र, हरे कृष्ण महामंत्र, ॐ नमः शिवाय, श्री राम जय राम जय जय राम, नवग्रह मंत्र, बीज मंत्र (ऐं, ह्रीं, क्लीं, श्रीं), लक्ष्मी मंत्र, सरस्वती मंत्र, गणेश मंत्र, हनुमान मंत्र, दुर्गा सप्तश्लोकी तथा विष्णु सहस्रनाम के अंश।' },
      { heading: 'How to Start', headingHi: 'कैसे आरंभ करें', body: 'Sit in a clean, calm place facing east or north. Hold a tulsi or rudraksha mala in the right hand. Take three deep breaths. Begin chanting with awareness on the meaning, completing one full mala (108 repetitions). For beginners, 11 minutes a day is enough; gradually build to 1, 4 or 16 malas.', bodyHi: 'स्वच्छ, शांत स्थान पर पूर्व अथवा उत्तर मुख होकर बैठें। दाहिने हाथ में तुलसी अथवा रुद्राक्ष माला धारण करें। तीन गहरी श्वास लें। अर्थ के प्रति सजगता के साथ जाप आरंभ करें तथा एक पूरी माला (108 आवृत्तियाँ) पूर्ण करें। नवारंभकर्ताओं के लिए प्रतिदिन 11 मिनट पर्याप्त है; क्रमशः 1, 4 अथवा 16 माला तक बढ़ाएँ।' },
      { heading: 'Anushthan Packages', headingHi: 'अनुष्ठान पैकेज', body: 'For specific sankalp — health, marriage, conception, business, legal matters, removal of doshas — Asthawaani arranges full-scale anushthans of 1.25 lakh, 11 lakh or 1.25 crore jaap performed by Vrindavan pandits with daily havan, video proof and Sankalp-patra in the yajaman\'s name.', bodyHi: 'विशेष संकल्प हेतु — स्वास्थ्य, विवाह, संतान, व्यवसाय, कानूनी विषय, दोष-निवारण — आस्थावाणी सवा लाख, ग्यारह लाख अथवा सवा करोड़ जाप के पूर्ण अनुष्ठान वृंदावन के पंडितों द्वारा संचालित करवाती है, दैनिक हवन, वीडियो प्रमाण तथा यजमान के नाम पर संकल्प-पत्र सहित।' },
      { heading: 'Mantra Diksha Guidance', headingHi: 'मंत्र दीक्षा मार्गदर्शन', body: 'For seekers ready to take formal mantra diksha, Asthawaani helps connect with authentic guru-paramparas (Pushti, Gaudiya, Nimbarka, Vallabh, Shri Sampradaya). We do not bypass guru-tattva — we facilitate proper, traditional initiation.', bodyHi: 'विधिवत मंत्र दीक्षा हेतु तैयार साधकों के लिए आस्थावाणी प्रामाणिक गुरु-परंपराओं (पुष्टि, गौड़ीय, निम्बार्क, वल्लभ, श्री सम्प्रदाय) से जुड़ने में सहायता करती है। हम गुरु-तत्त्व को नहीं छोड़ते — हम पारंपरिक, समुचित दीक्षा को सरल बनाते हैं।' },
      { heading: 'Common Mistakes to Avoid', headingHi: 'सामान्य भूलें जिनसे बचना है', body: 'Chanting while lying down, leaving mala on bare floor, eating non-sattvik food during anushthan, skipping the daily count, comparing speed with others, and chanting mechanically without breath awareness — these dilute results. The fix is small daily consistency over big occasional bursts.', bodyHi: 'लेटकर जाप, माला को नंगे फर्श पर रखना, अनुष्ठान-काल में अ-सात्त्विक आहार, दैनिक संख्या छोड़ देना, दूसरों से गति की तुलना तथा श्वास-सजगता के बिना यांत्रिक जाप — ये परिणाम घटाते हैं। समाधान है — कभी-कभार के बड़े उत्साह की अपेक्षा छोटी दैनिक निरंतरता।' },
    ],
    faqs: [
      { q: 'Can I do jaap without a mala?', a: 'Yes, you can use your fingers (anguli-jaap) or simply count breaths. A mala helps focus but is not mandatory.', qHi: 'क्या बिना माला के जप कर सकते हैं?', aHi: 'हाँ, आप अंगुलियों (अंगुली-जाप) से या केवल श्वास गिनकर भी कर सकते हैं। माला सहायक है, अनिवार्य नहीं।' },
      { q: 'What is the best time for jaap?', a: 'Brahma muhurta (early morning, roughly 4–6 AM) is ideal, but any quiet, undisturbed time works.', qHi: 'जाप के लिए सर्वोत्तम समय क्या है?', aHi: 'ब्रह्म मुहूर्त (प्रातः लगभग 4–6 बजे) उत्तम है, किंतु कोई भी शांत, निर्बाध समय उपयुक्त है।' },
      { q: 'Tulsi mala or rudraksha mala — which one?', a: 'Tulsi for Vishnu/Krishna mantras; rudraksha for Shiva, Shakti, Mahamrityunjaya and most Vedic mantras. Sphatik suits Lakshmi and beej mantras.', qHi: 'तुलसी माला अथवा रुद्राक्ष माला — कौन सी?', aHi: 'विष्णु/कृष्ण मंत्रों हेतु तुलसी; शिव, शक्ति, महामृत्युंजय तथा अधिकांश वैदिक मंत्रों हेतु रुद्राक्ष। लक्ष्मी तथा बीज मंत्रों हेतु स्फटिक उपयुक्त है।' },
      { q: 'Can women chant during menstruation?', a: 'Manasik (mental) jaap is permitted; loud jaap and mala touch are traditionally paused for 3 days. The bhav matters more than the rule — never feel cut off from the Lord.', qHi: 'क्या महिलाएँ रजोदर्शन काल में जाप कर सकती हैं?', aHi: 'मानसिक जाप की अनुमति है; उच्च-स्वर जाप तथा माला-स्पर्श पारंपरिक रूप से 3 दिन स्थगित किए जाते हैं। नियम से अधिक भाव महत्व रखता है — स्वयं को कभी भगवान से कटा हुआ अनुभव न करें।' },
      { q: 'Can I sponsor an anushthan in my family\'s name?', a: 'Yes — please share the sankalp, names, gotra and birth-stars. We arrange the full vidhi from Vrindavan.', qHi: 'क्या मैं अपने परिवार के नाम पर अनुष्ठान करवा सकता हूँ?', aHi: 'हाँ — कृपया संकल्प, नाम, गोत्र तथा नक्षत्र साझा करें। हम वृंदावन से सम्पूर्ण विधि का प्रबंध करते हैं।' },
      { q: 'How many days does a 1.25 lakh jaap anushthan take?', a: 'Typically 9 to 11 days with multiple pandits chanting in shifts; followed by dashansha havan.', qHi: 'सवा लाख जाप अनुष्ठान में कितने दिन लगते हैं?', aHi: 'सामान्यतः 9 से 11 दिन, अनेक पंडितों द्वारा पारी-वार जाप; तत्पश्चात् दशांश हवन।' },
      { q: 'Will I receive proof of the anushthan?', a: 'Yes, daily video updates, sankalp photo and a final completion certificate are shared with the yajaman.', qHi: 'क्या मुझे अनुष्ठान का प्रमाण मिलेगा?', aHi: 'हाँ, दैनिक वीडियो अपडेट, संकल्प चित्र तथा अंतिम पूर्णता प्रमाणपत्र यजमान को साझा किया जाता है।' },
      { q: 'Can children do mantra jaap?', a: 'Yes. Begin with Gayatri or Om Namah Shivaya, just 11 times a day. It builds focus and inner stability.', qHi: 'क्या बच्चे मंत्र जाप कर सकते हैं?', aHi: 'हाँ। गायत्री अथवा ॐ नमः शिवाय से प्रारंभ करें, प्रतिदिन केवल 11 बार। यह एकाग्रता तथा आंतरिक स्थिरता बढ़ाता है।' },
    ],
    metaDescription: 'Guided mantra jaap and chanting from Vrindavan — Gayatri, Mahamrityunjaya, Hare Krishna and Navgrah mantras on Asthawaani.',
    estimatedDuration: 'PT30M',
    approxWordCount: 1500,
    author: ASTHAWAANI_AUTHOR,
  },

  'navgrah-shanti': {
    slug: 'navgrah-shanti',
    title: 'Navgrah Shanti Path',
    titleHi: 'नवग्रह शांति पाठ',
    subtitle: 'Seek Balance and Stability',
    subtitleHi: 'संतुलन और स्थिरता पाएँ',
    intro: 'Navgrah Shanti Path is a sacred Vedic ritual to pacify the nine planetary energies — Surya, Chandra, Mangal, Budha, Guru, Shukra, Shani, Rahu and Ketu — that continuously influence every dimension of life. Asthawaani offers authentic, fully-recorded Navgrah Shanti performed by experienced karmakandi pandits from Vrindavan, in strict accordance with the Yajurvediya and Atharvavediya paddhati.',
    introHi: 'नवग्रह शांति पाठ नौ ग्रहों — सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु — की ऊर्जा को शांत करने हेतु एक पवित्र वैदिक अनुष्ठान है, जो जीवन के प्रत्येक पक्ष को निरंतर प्रभावित करते हैं। आस्थावाणी वृंदावन के अनुभवी कर्मकांडी पंडितों द्वारा यजुर्वेदीय तथा अथर्ववेदीय पद्धति के अनुसार प्रामाणिक, पूर्णतः रिकॉर्डेड नवग्रह शांति प्रस्तुत करती है।',
    sections: [
      { heading: 'Who Should Do It?', headingHi: 'किसे करना चाहिए?', body: 'Anyone facing repeated obstacles in career, health, finances or relationships can benefit. It is especially recommended during Sade-sati, Dhaiya, Mahadasha changes, Antardasha transitions, malefic gochara, eclipses affecting one\'s rashi, and before major life events like marriage, grih-pravesh or business launch.', bodyHi: 'जो लोग करियर, स्वास्थ्य, धन अथवा रिश्तों में बार-बार बाधाओं का सामना कर रहे हैं उन्हें लाभ होता है। साढ़े-साती, ढैया, महादशा परिवर्तन, अंतर्दशा संक्रमण, अशुभ गोचर, राशि-संबंधी ग्रहण तथा विवाह, गृह-प्रवेश या व्यवसाय-आरंभ जैसे प्रमुख जीवन-कार्यक्रमों से पूर्व यह विशेष रूप से अनुशंसित है।' },
      { heading: 'What is Included', headingHi: 'क्या सम्मिलित है', body: 'Achmana, Sankalp, Ganesh Puja, Kalash Sthapana, Navagraha aavahana, individual mantra jaap of each of the nine planets (in their prescribed counts — 7000 for Surya, 11000 for Chandra and so on), Navagraha Stotra path, Dashansha havan, Aarti, Pushpanjali and Mahaprasad — performed with complete Vedic vidhi.', bodyHi: 'आचमन, संकल्प, गणेश पूजा, कलश स्थापना, नवग्रह आवाहन, प्रत्येक ग्रह का यथाविधि मंत्र जाप (सूर्य का 7000, चंद्र का 11000 इत्यादि), नवग्रह स्तोत्र पाठ, दशांश हवन, आरती, पुष्पांजलि तथा महाप्रसाद — पूर्ण वैदिक विधि से।' },
      { heading: 'Specific Planet Remedies', headingHi: 'विशेष ग्रह उपाय', body: 'Asthawaani also offers single-planet shanti pujas — Surya Shanti (for self-confidence and father), Chandra Shanti (for mind and mother), Mangal Shanti (for marriage delays and blood-pressure), Budha (for studies and speech), Guru (for wisdom and progeny), Shukra (for relationships and luxury), Shani Shanti (for sade-sati relief), Rahu-Ketu Shanti (for unexplained obstacles).', bodyHi: 'आस्थावाणी एकल-ग्रह शांति पूजाएँ भी कराती है — सूर्य शांति (आत्मविश्वास तथा पिता हेतु), चंद्र शांति (मन तथा माता हेतु), मंगल शांति (विवाह में विलंब तथा रक्तचाप हेतु), बुध (अध्ययन तथा वाणी हेतु), गुरु (बुद्धि तथा संतान हेतु), शुक्र (संबंध तथा वैभव हेतु), शनि शांति (साढ़े-साती राहत हेतु), राहु-केतु शांति (अकारण बाधाओं हेतु)।' },
      { heading: 'How to Book', headingHi: 'कैसे बुक करें', body: 'Contact us through the website or WhatsApp. Share your full name, gotra, birth-date, time and place. Our jyotishi will analyse your kundali, suggest the right shanti and share an auspicious muhurta along with pandit-ji details.', bodyHi: 'वेबसाइट या व्हाट्सएप के माध्यम से हमसे संपर्क करें। अपना पूरा नाम, गोत्र, जन्म-तिथि, समय तथा स्थान साझा करें। हमारे ज्योतिषी आपकी कुंडली का विश्लेषण करेंगे, उपयुक्त शांति सुझाएँगे तथा शुभ मुहूर्त एवं पंडित जी का विवरण साझा करेंगे।' },
      { heading: 'Live Streaming for Yajamans Abroad', headingHi: 'विदेशी यजमानों हेतु लाइव स्ट्रीमिंग', body: 'For NRIs or yajamans unable to travel to Vrindavan, the entire puja is live-streamed in HD. The yajaman participates virtually for Sankalp and Aarti, and prasad is couriered or distributed in temples on their behalf.', bodyHi: 'जो एनआरआई अथवा यजमान वृंदावन नहीं आ सकते, उनके लिए सम्पूर्ण पूजा HD में लाइव-स्ट्रीम होती है। यजमान संकल्प तथा आरती में आभासी रूप से सहभागी होते हैं, और प्रसाद उनकी ओर से कूरियर अथवा मंदिरों में वितरित किया जाता है।' },
    ],
    faqs: [
      { q: 'Can the path be performed online for me?', a: 'Yes, we can perform it on your behalf in Vrindavan and share live video / recording.', qHi: 'क्या मेरे लिए ऑनलाइन पाठ हो सकता है?', aHi: 'हाँ, हम आपके निमित्त वृंदावन में पाठ कर लाइव वीडियो / रिकॉर्डिंग साझा कर सकते हैं।' },
      { q: 'How long does it take?', a: 'A complete Navgrah Shanti path with havan usually takes 3 to 5 hours. Extended versions may take a full day.', qHi: 'कितना समय लगता है?', aHi: 'हवन सहित संपूर्ण नवग्रह शांति पाठ में सामान्यतः 3 से 5 घंटे लगते हैं। विस्तारित संस्करण पूरे दिन का हो सकता है।' },
      { q: 'What information do I need to provide?', a: 'Full name, gotra, date, time and place of birth, and the specific sankalp.', qHi: 'मुझे कौन सी जानकारी देनी होगी?', aHi: 'पूर्ण नाम, गोत्र, जन्म तिथि, समय और स्थान, तथा विशेष संकल्प।' },
      { q: 'Will I get the prasad?', a: 'Yes, prasad and yantra (if applicable) are couriered to your address.', qHi: 'क्या मुझे प्रसाद मिलेगा?', aHi: 'हाँ, प्रसाद तथा यंत्र (यदि लागू हो) आपके पते पर कूरियर किए जाते हैं।' },
      { q: 'Is Shani Sade-sati really 7.5 years?', a: 'Yes, Sade-sati lasts approximately 7.5 years as Shani transits the 12th, own and 2nd houses from natal Moon. Proper Shani shanti significantly softens its effects.', qHi: 'क्या शनि साढ़े-साती वास्तव में 7.5 वर्ष की होती है?', aHi: 'हाँ, साढ़े-साती लगभग 7.5 वर्ष तक रहती है जब शनि चंद्र राशि से 12वें, उसी तथा 2रे भाव से गोचर करते हैं। उचित शनि शांति इसके प्रभावों को महत्वपूर्ण रूप से कोमल बनाती है।' },
      { q: 'Can the puja be done for a family member who is unaware?', a: 'Yes, with the consent of an immediate family member, puja can be performed for the wellbeing of any relative.', qHi: 'क्या परिवार के किसी सदस्य के लिए, जो अनभिज्ञ हो, पूजा हो सकती है?', aHi: 'हाँ, परिवार के निकट सदस्य की सहमति से किसी भी रिश्तेदार के कल्याण हेतु पूजा करवाई जा सकती है।' },
      { q: 'What is the dakshina range?', a: 'Single-planet pujas start modestly; full Navgrah Shanti with havan is offered transparently — please contact us for current rates.', qHi: 'दक्षिणा की सीमा क्या है?', aHi: 'एकल-ग्रह पूजाएँ सस्ती श्रेणी से आरंभ होती हैं; हवन सहित पूर्ण नवग्रह शांति पारदर्शी रूप से उपलब्ध है — वर्तमान शुल्क हेतु संपर्क करें।' },
      { q: 'Will the puja immediately solve my problem?', a: 'Puja creates a powerful inner and outer environment for relief, but it works alongside your own karma and effort, not as a magical shortcut.', qHi: 'क्या पूजा मेरी समस्या तुरंत हल कर देगी?', aHi: 'पूजा राहत हेतु एक शक्तिशाली आंतरिक तथा बाह्य वातावरण निर्मित करती है, किंतु यह आपके कर्म तथा प्रयास के साथ कार्य करती है, चमत्कारी विकल्प नहीं है।' },
    ],
    metaDescription: 'Authentic Navgrah Shanti Path from Vrindavan on Asthawaani — Vedic puja and havan to balance nine planetary energies.',
    estimatedDuration: 'PT5H',
    approxWordCount: 1550,
    author: ASTHAWAANI_AUTHOR,
  },

  healing: {
    slug: 'healing',
    title: 'Spiritual & Emotional Healing',
    titleHi: 'आध्यात्मिक और भावनात्मक उपचार',
    subtitle: 'Touch your Heart',
    subtitleHi: 'हृदय को स्पर्श करें',
    intro: 'Spiritual healing on Asthawaani combines mantra, meditation, breath work and compassionate scripture-based counselling to bring deep calm to a troubled mind and heart. Our approach draws from the Bhagavad Gita, Yoga Sutras of Patanjali, Vivekachudamani, the Bhakti tradition and the practical wisdom of Vrindavan saints — applied with empathy to today\'s very real struggles of anxiety, grief, fear, loneliness, broken relationships and existential emptiness.',
    introHi: 'आस्थावाणी पर आध्यात्मिक उपचार मंत्र, ध्यान, श्वास साधना तथा शास्त्र-आधारित करुणामय परामर्श का संगम है, जो तनावग्रस्त मन व हृदय को गहरी शांति प्रदान करता है। हमारा दृष्टिकोण भगवद्गीता, पतंजलि योग सूत्र, विवेकचूड़ामणि, भक्ति परंपरा तथा वृंदावन के संतों के व्यावहारिक ज्ञान पर आधारित है — और आज के वास्तविक संघर्षों जैसे चिंता, शोक, भय, एकाकीपन, टूटे संबंध तथा अस्तित्वगत रिक्तता पर सहानुभूतिपूर्वक लागू होता है।',
    sections: [
      { heading: 'What We Help With', headingHi: 'हम किसमें सहायता करते हैं', body: 'Anxiety, panic attacks, grief over loss of a loved one, chronic anger, sleeplessness, persistent fear, lack of purpose, marital conflict, parent-child distance, post-divorce healing, loneliness in old age and the quiet spiritual emptiness that material success often brings.', bodyHi: 'चिंता, पैनिक अटैक, प्रियजन की हानि का शोक, स्थायी क्रोध, अनिद्रा, निरंतर भय, उद्देश्यहीनता, वैवाहिक मतभेद, माता-पिता-बच्चे की दूरी, तलाक के पश्चात् उपचार, वृद्धावस्था का एकाकीपन तथा वह मौन आध्यात्मिक रिक्तता जो प्रायः भौतिक सफलता के साथ आती है।' },
      { heading: 'Our Approach', headingHi: 'हमारी पद्धति', body: 'A blend of Vedic wisdom, deep listening, mantra prescription, breath protocols (anulom-vilom, bhramari, nadi-shodhan), guided dhyan and simple daily kriyas that anyone can follow at home in 15–30 minutes a day. Sessions are 1-on-1 and strictly confidential.', bodyHi: 'वैदिक ज्ञान, गहन श्रवण, मंत्र-निर्देश, श्वास-प्रोटोकॉल (अनुलोम-विलोम, भ्रामरी, नाड़ी-शोधन), निर्देशित ध्यान तथा सरल दैनिक क्रियाओं का संगम जो कोई भी घर पर 15–30 मिनट में कर सकता है। सत्र 1-1 तथा पूर्णतः गोपनीय हैं।' },
      { heading: 'Session Format', headingHi: 'सत्र का स्वरूप', body: 'A first session usually lasts 60 minutes — the seeker shares freely, the vakta listens without judgement, then offers a short scriptural reference, a mantra, a breath practice and a 7-day micro-routine. Follow-up sessions of 30 minutes are scheduled weekly or fortnightly as needed.', bodyHi: 'प्रथम सत्र सामान्यतः 60 मिनट का होता है — साधक स्वतंत्रतापूर्वक साझा करते हैं, वक्ता बिना निर्णय के सुनते हैं, फिर एक संक्षिप्त शास्त्रीय संदर्भ, एक मंत्र, एक श्वास-अभ्यास तथा एक 7-दिवसीय सूक्ष्म दिनचर्या प्रदान करते हैं। अनुवर्ती सत्र 30 मिनट के साप्ताहिक अथवा पाक्षिक रूप से आवश्यकतानुसार निर्धारित होते हैं।' },
      { heading: 'Healing Programs', headingHi: 'उपचार कार्यक्रम', body: '21-Day Grief Recovery, 40-Day Anxiety Release, Couples Reconciliation Path, Postpartum Spiritual Care, Cancer-Care Companion (working alongside medical treatment), and Senior Loneliness Program — each rooted in shastra and refined through years of experience.', bodyHi: '21-दिवसीय शोक उपचार, 40-दिवसीय चिंता मुक्ति, युगल पुनर्मिलन मार्ग, प्रसवोत्तर आध्यात्मिक देखभाल, कैंसर-केयर सहयात्री (चिकित्सकीय उपचार के साथ-साथ), तथा वरिष्ठ एकाकीपन कार्यक्रम — प्रत्येक शास्त्र में निहित तथा वर्षों के अनुभव से परिष्कृत।' },
      { heading: 'When to Seek Medical Help Too', headingHi: 'चिकित्सकीय सहायता भी कब लें', body: 'Spiritual healing complements but never replaces medical or psychological care. For severe depression, suicidal thoughts, psychosis or any acute condition, please reach out to a qualified mental-health professional immediately, in parallel with sadhana.', bodyHi: 'आध्यात्मिक उपचार चिकित्सकीय अथवा मनोवैज्ञानिक देखभाल का पूरक है, कभी विकल्प नहीं। गंभीर अवसाद, आत्महंता विचार, मनोविकृति अथवा किसी भी तीव्र स्थिति में, साधना के समानांतर तुरंत किसी योग्य मानसिक-स्वास्थ्य विशेषज्ञ से संपर्क करें।' },
    ],
    faqs: [
      { q: 'Is this a replacement for medical treatment?', a: 'No. Spiritual healing complements but does not replace medical or psychological care.', qHi: 'क्या यह चिकित्सकीय उपचार का विकल्प है?', aHi: 'नहीं। आध्यात्मिक उपचार चिकित्सकीय या मनोवैज्ञानिक देखभाल का पूरक है, विकल्प नहीं।' },
      { q: 'Is my conversation confidential?', a: 'Yes, all sessions are strictly private. Notes are not shared with anyone.', qHi: 'क्या बातचीत गोपनीय है?', aHi: 'हाँ, सभी सत्र पूर्णतः गोपनीय हैं। कोई भी टिप्पणी किसी से साझा नहीं की जाती।' },
      { q: 'Are sessions in person or online?', a: 'Both. Online (video / phone) is most common; in-person sessions are available in Vrindavan and Mathura.', qHi: 'सत्र व्यक्तिगत हैं अथवा ऑनलाइन?', aHi: 'दोनों। ऑनलाइन (वीडियो / फोन) सर्वाधिक सामान्य है; व्यक्तिगत सत्र वृंदावन तथा मथुरा में उपलब्ध हैं।' },
      { q: 'What if I am not Hindu?', a: 'Sanatan wisdom is universal. We adapt the practices to your own faith — only the inner experience matters.', qHi: 'यदि मैं हिंदू नहीं हूँ तो?', aHi: 'सनातन ज्ञान सार्वभौमिक है। हम आपकी आस्था के अनुरूप अभ्यास अनुकूलित करते हैं — आंतरिक अनुभव ही महत्वपूर्ण है।' },
      { q: 'Can sessions be arranged for a family member who refuses?', a: 'We can guide you with sadhana to perform on their behalf, but direct counselling requires their consent.', qHi: 'क्या उन परिवारजनों हेतु सत्र हो सकते हैं जो मना करते हैं?', aHi: 'हम आपको उनकी ओर से साधना हेतु मार्गदर्शन दे सकते हैं, किंतु प्रत्यक्ष परामर्श के लिए उनकी सहमति आवश्यक है।' },
      { q: 'How soon will I feel a difference?', a: 'Most seekers report a noticeable lightness within the first 7 days of sincere practice.', qHi: 'मुझे कितनी जल्दी फर्क महसूस होगा?', aHi: 'अधिकांश साधक सच्चे अभ्यास के पहले 7 दिनों में स्पष्ट हल्कापन अनुभव करते हैं।' },
      { q: 'What does a session cost?', a: 'Pricing is kept transparent and includes seva-based options for those in genuine need. Please contact us.', qHi: 'सत्र का शुल्क कितना है?', aHi: 'शुल्क पारदर्शी है तथा वास्तविक आवश्यकता वालों के लिए सेवा-आधारित विकल्प भी सम्मिलित हैं। कृपया संपर्क करें।' },
    ],
    metaDescription: 'Spiritual and emotional healing from Vrindavan on Asthawaani — mantra, meditation and compassionate guidance for anxiety, grief and inner peace.',
    estimatedDuration: 'PT60M',
    approxWordCount: 1500,
    author: ASTHAWAANI_AUTHOR,
  },

  'life-guidance': {
    slug: 'life-guidance',
    title: 'Motivational & Life Guidance',
    titleHi: 'प्रेरक और जीवन मार्गदर्शन',
    subtitle: 'Faith-Based Positive Comfort',
    subtitleHi: 'आस्था आधारित सकारात्मक सहारा',
    intro: 'Life guidance on Asthawaani offers grounded spiritual perspective on the very real decisions of modern life — career direction, marriage and relationships, parenting, money and dharma, retirement, illness, loss, and the search for purpose. Rooted in the Bhagavad Gita, Ramayana, Upanishads and the lived experience of Braj saints, this guidance is practical, action-oriented and never abstract philosophy.',
    introHi: 'आस्थावाणी पर जीवन मार्गदर्शन आधुनिक जीवन के वास्तविक निर्णयों — करियर दिशा, विवाह और संबंध, पालन-पोषण, धन एवं धर्म, सेवानिवृत्ति, रोग, हानि तथा उद्देश्य की खोज — पर स्थिर आध्यात्मिक दृष्टिकोण प्रदान करता है। भगवद्गीता, रामायण, उपनिषद तथा ब्रज के संतों के जीवित अनुभव में निहित यह मार्गदर्शन व्यावहारिक, क्रिया-उन्मुख है तथा कभी भी अमूर्त दर्शन नहीं।',
    sections: [
      { heading: 'Practical, Not Theoretical', headingHi: 'सैद्धांतिक नहीं, व्यावहारिक', body: 'We give actionable steps drawn from Gita, Ramayan and lived sadhana — not abstract philosophy. Every conversation ends with one clear next step you can implement before sunset of the same day.', bodyHi: 'हम गीता, रामायण और जीवित साधना से लिए गए व्यावहारिक चरण देते हैं — अमूर्त दर्शन नहीं। प्रत्येक संवाद के अंत में एक स्पष्ट अगला कदम होता है जिसे आप उसी दिन सूर्यास्त से पूर्व लागू कर सकते हैं।' },
      { heading: 'For Every Stage of Life', headingHi: 'जीवन के प्रत्येक चरण के लिए', body: 'Students choosing a career, working professionals balancing ambition and dharma, newly married couples, householders raising children, mid-life seekers reconsidering direction, retirees searching for a deeper second innings — guidance is shaped to each stage.', bodyHi: 'करियर चुनते विद्यार्थी, महत्वाकांक्षा तथा धर्म में संतुलन साधते कार्यरत पेशेवर, नव-विवाहित युगल, बच्चों का पालन-पोषण करते गृहस्थ, मध्य-जीवन में दिशा पुनर्विचार करते साधक, गहरी द्वितीय पारी की खोज में सेवानिवृत्त — मार्गदर्शन प्रत्येक चरण के अनुसार।' },
      { heading: 'Career & Dharma', headingHi: 'करियर तथा धर्म', body: 'How to choose between a higher-paying job and a more meaningful one? When to leave a toxic workplace? How to handle workplace politics without losing inner peace? How to scale a business without losing dharma? We address these with Gita-based clarity.', bodyHi: 'अधिक वेतन वाले तथा अधिक अर्थपूर्ण कार्य के मध्य कैसे चुनें? विषाक्त कार्यस्थल कब छोड़ें? आंतरिक शांति खोए बिना कार्यस्थल राजनीति कैसे संभालें? धर्म खोए बिना व्यवसाय कैसे बढ़ाएँ? हम इन्हें गीता-आधारित स्पष्टता से संबोधित करते हैं।' },
      { heading: 'Relationships & Family', headingHi: 'संबंध तथा परिवार', body: 'Marital disagreements, in-law tensions, parenting teenagers, caring for aging parents, sibling property disputes, broken friendships — each is approached through the lens of dharma, karuna and long-term harmony rather than ego-victory.', bodyHi: 'वैवाहिक मतभेद, ससुराल-तनाव, किशोरों के पालन-पोषण, वृद्ध माता-पिता की देखभाल, भाई-बहन विवाद, टूटी मित्रताएँ — प्रत्येक को अहंकार-विजय के स्थान पर धर्म, करुणा तथा दीर्घ-कालीन सामंजस्य के दृष्टिकोण से देखा जाता है।' },
      { heading: 'Money, Loss & Recovery', headingHi: 'धन, हानि तथा पुनरुद्धार', body: 'When markets crash, business fails, or sudden loss strikes — Sanatan wisdom does not deny pain; it shows how to remain centred, take dharmic next steps, and rebuild without bitterness.', bodyHi: 'जब बाज़ार गिरता है, व्यवसाय असफल होता है अथवा अचानक हानि होती है — सनातन ज्ञान पीड़ा को नकारता नहीं; यह सिखाता है कि कैसे केन्द्रित रहें, धर्ममय अगले कदम उठाएँ तथा कटुता के बिना पुनर्निर्माण करें।' },
      { heading: 'When You Are Confused About Purpose', headingHi: 'जब आप उद्देश्य के विषय में भ्रमित हों', body: 'The most common modern question — "what is my purpose?" — is answered not by personality tests but by sincerely examining your swadharma through the four-fold lens of Gita 18: guna (nature), karma (capacity), prayojana (impact) and bhav (love).', bodyHi: 'सबसे सामान्य आधुनिक प्रश्न — "मेरा उद्देश्य क्या है?" — व्यक्तित्व-परीक्षणों से नहीं, अपितु गीता-18 के चार-आयामी दृष्टिकोण — गुण (स्वभाव), कर्म (क्षमता), प्रयोजन (प्रभाव) तथा भाव (प्रेम) — से अपने स्वधर्म की ईमानदार जाँच द्वारा उत्तरित होता है।' },
    ],
    faqs: [
      { q: 'How do I ask a question?', a: 'Use the Contact form or WhatsApp. Personal guidance is offered with discretion.', qHi: 'मैं प्रश्न कैसे पूछूँ?', aHi: 'संपर्क फॉर्म या व्हाट्सएप का उपयोग करें। व्यक्तिगत मार्गदर्शन गोपनीयता के साथ दिया जाता है।' },
      { q: 'Is guidance free?', a: 'Short queries via the public Q&A are free. Personalised one-to-one sessions follow a transparent dakshina structure.', qHi: 'क्या मार्गदर्शन निःशुल्क है?', aHi: 'सार्वजनिक प्रश्नोत्तर के माध्यम से संक्षिप्त प्रश्न निःशुल्क हैं। व्यक्तिगत 1-1 सत्रों हेतु पारदर्शी दक्षिणा संरचना है।' },
      { q: 'Is this jyotish or counselling?', a: 'Primarily Gita-based life counselling. If a jyotish view is needed, we refer to our jyotishi.', qHi: 'क्या यह ज्योतिष है अथवा परामर्श?', aHi: 'मुख्यतः गीता-आधारित जीवन परामर्श। यदि ज्योतिषीय दृष्टि आवश्यक हो, तो हम अपने ज्योतिषी से संदर्भित करते हैं।' },
      { q: 'Can a couple come together?', a: 'Yes — joint sessions are particularly powerful for marital and parenting decisions.', qHi: 'क्या युगल साथ आ सकते हैं?', aHi: 'हाँ — संयुक्त सत्र वैवाहिक तथा पालन-पोषण के निर्णयों हेतु विशेष रूप से प्रभावी हैं।' },
      { q: 'Do you give predictions?', a: 'No. We give clarity, principles and next steps — never predictions.', qHi: 'क्या आप भविष्यवाणी करते हैं?', aHi: 'नहीं। हम स्पष्टता, सिद्धांत तथा अगले कदम देते हैं — कभी भविष्यवाणी नहीं।' },
      { q: 'Is the guidance Hindu-only?', a: 'Sanatan wisdom is universal; we have helped seekers from many faiths.', qHi: 'क्या मार्गदर्शन केवल हिंदुओं के लिए है?', aHi: 'सनातन ज्ञान सार्वभौमिक है; हमने अनेक आस्थाओं के साधकों की सहायता की है।' },
      { q: 'How quickly can I get a session?', a: 'Usually within 48 hours of request.', qHi: 'मुझे कितनी जल्दी सत्र मिल सकता है?', aHi: 'सामान्यतः अनुरोध के 48 घंटों के भीतर।' },
    ],
    metaDescription: 'Spiritual life guidance and motivation from Vrindavan — practical Sanatan wisdom for career, relationships, family and purpose on Asthawaani.',
    estimatedDuration: 'PT60M',
    approxWordCount: 1500,
    author: ASTHAWAANI_AUTHOR,
  },

  'morning-aarti': {
    slug: 'morning-aarti',
    title: 'Morning Aarti',
    titleHi: 'प्रातः आरती',
    subtitle: 'Start the day with Grace and Positivity',
    subtitleHi: 'कृपा और सकारात्मकता के साथ दिन शुरू करें',
    intro: 'Morning Aarti on Asthawaani is a live broadcast directly from the great mandirs of Vrindavan and Mathura — bringing the sacred sound, fragrance and energy of mangala aarti into your home every morning. Witness Banke Bihari Mangala Darshan, Shri Krishna Janmabhoomi Mangala Aarti, ISKCON Mangala Aarti, Dwarkadhish darshan and Govind Dev Ji aarti — the way devotees in Vrindavan have started their day for centuries.',
    introHi: 'आस्थावाणी पर प्रातः आरती वृंदावन तथा मथुरा के महान मंदिरों से प्रत्यक्ष लाइव प्रसारण है — जो प्रतिदिन प्रातः मंगला आरती की पवित्र ध्वनि, सुगंध और ऊर्जा आपके घर तक पहुँचाती है। बांके बिहारी मंगला दर्शन, श्री कृष्ण जन्मभूमि मंगला आरती, इस्कॉन मंगला आरती, द्वारकाधीश दर्शन तथा गोविंद देव जी आरती के साक्षी बनें — जैसे वृंदावन के भक्त सदियों से अपना दिन आरंभ करते आए हैं।',
    sections: [
      { heading: 'Why Morning Aarti Matters', headingHi: 'प्रातः आरती क्यों', body: 'Starting the day with aarti aligns your mind with gratitude, positivity and devotion before the world\'s noise enters. The first vibration that touches the brain after sleep becomes the dominant frequency of the entire day; choosing aarti is choosing peace as that frequency.', bodyHi: 'दिन की शुरुआत आरती से करना मन को कृतज्ञता, सकारात्मकता और भक्ति से जोड़ देता है — संसार के शोर से पहले। निद्रा के पश्चात् मस्तिष्क को छूने वाला प्रथम कंपन सम्पूर्ण दिन की प्रबल आवृत्ति बन जाता है; आरती का चयन — उस आवृत्ति के रूप में — शांति का चयन है।' },
      { heading: 'What You Will Experience', headingHi: 'आप क्या अनुभव करेंगे', body: 'Conch (shankh), bell (ghanta), dhoop, deepak, traditional bhajan and live darshan of the deity — captured in HD exactly as performed in the Vrindavan mandirs, with the same camera angles devotees have for centuries longed to glimpse.', bodyHi: 'शंख, घंटा, धूप, दीपक, पारंपरिक भजन तथा देव-दर्शन — HD में वैसे ही प्रसारित जैसे वृंदावन के मंदिरों में होता है, उसी दृष्टि-कोण से जिसकी भक्तजन सदियों से कामना करते रहे हैं।' },
      { heading: 'Live Daily Schedule', headingHi: 'दैनिक लाइव कार्यक्रम', body: 'Banke Bihari Mangala Aarti is unique — held only at amavasya, ekadashi and Janmashtami. Other temples like ISKCON Krishna-Balaram, Dwarkadhish, Radha Raman, Govind Dev Ji and Janmabhoomi conduct mangala aarti every single morning before sunrise. Asthawaani brings them all to one place.', bodyHi: 'बांके बिहारी मंगला आरती विशेष है — केवल अमावस्या, एकादशी तथा जन्माष्टमी पर होती है। अन्य मंदिर जैसे इस्कॉन कृष्ण-बलराम, द्वारकाधीश, राधा रमण, गोविंद देव जी तथा जन्मभूमि प्रतिदिन सूर्योदय से पूर्व मंगला आरती करते हैं। आस्थावाणी इन सबको एक स्थान पर लाती है।' },
      { heading: 'How to Participate from Home', headingHi: 'घर से कैसे सहभागी हों', body: 'Wake before sunrise, take a quick snan, light a diya in your home mandir, sit facing the screen, fold hands during conch, sing along to the aarti — and offer mental prasad. This 12-minute daily ritual will transform your morning energy in 21 days.', bodyHi: 'सूर्योदय से पूर्व उठें, शीघ्र स्नान करें, घर के मंदिर में दीप जलाएँ, स्क्रीन की ओर मुख करके बैठें, शंख-नाद के समय कर-बद्ध हों, आरती गाएँ — तथा मानसिक प्रसाद अर्पित करें। यह 12-मिनट की दैनिक विधि 21 दिनों में आपकी प्रातः-ऊर्जा को रूपांतरित कर देगी।' },
      { heading: 'Special Festival Aartis', headingHi: 'विशेष उत्सव आरतियाँ', body: 'On Janmashtami, Radhashtami, Hariyali Teej, Jhulan, Govardhan and Holi, Asthawaani broadcasts extended hour-long aartis with mahabhog, phool-bangla and special shringar darshan.', bodyHi: 'जन्माष्टमी, राधाष्टमी, हरियाली तीज, झूलन, गोवर्धन तथा होली पर आस्थावाणी एक घंटे की विस्तारित आरतियाँ महाभोग, फूल-बंगला तथा विशेष शृंगार दर्शन के साथ प्रसारित करती है।' },
    ],
    faqs: [
      { q: 'At what time is the aarti?', a: 'Mangala aarti is streamed in the early morning, typically between 4:30 AM and 6:00 AM depending on the temple. Exact time is shared on WhatsApp and YouTube.', qHi: 'आरती किस समय होती है?', aHi: 'मंगला आरती प्रातः जल्दी प्रसारित होती है, सामान्यतः 4:30 से 6:00 बजे के बीच मंदिर के अनुसार। सटीक समय व्हाट्सएप और यूट्यूब पर साझा किया जाता है।' },
      { q: 'Can I watch the recording?', a: 'Yes, every aarti is archived on YouTube for the whole day.', qHi: 'क्या मैं रिकॉर्डिंग देख सकता हूँ?', aHi: 'हाँ, प्रत्येक आरती पूरे दिन के लिए यूट्यूब पर सहेजी जाती है।' },
      { q: 'Is the broadcast in 4K / HD?', a: 'Yes, all aartis are streamed in HD; festival aartis in 4K when bandwidth permits.', qHi: 'क्या प्रसारण 4K / HD में है?', aHi: 'हाँ, सभी आरतियाँ HD में प्रसारित होती हैं; बैंडविड्थ अनुमति देने पर उत्सव-आरतियाँ 4K में।' },
      { q: 'Can I sponsor a shringar / bhog?', a: 'Yes, devotees can sponsor daily shringar, bhog or aarti in their family\'s name; we will share photo and video proof.', qHi: 'क्या मैं शृंगार / भोग प्रायोजित कर सकता हूँ?', aHi: 'हाँ, भक्त अपने परिवार के नाम पर दैनिक शृंगार, भोग अथवा आरती प्रायोजित कर सकते हैं; हम फोटो तथा वीडियो प्रमाण साझा करेंगे।' },
      { q: 'Why does Banke Bihari mangala aarti happen only on specific days?', a: 'By tradition of the temple, mangala darshan is given only on amavasya, ekadashi, sharad purnima and Janmashtami — this rarity makes the darshan more powerful.', qHi: 'बांके बिहारी मंगला आरती केवल विशेष दिनों पर ही क्यों?', aHi: 'मंदिर की परंपरा के अनुसार मंगला दर्शन केवल अमावस्या, एकादशी, शरद पूर्णिमा तथा जन्माष्टमी पर ही दिए जाते हैं — यह दुर्लभता दर्शन को और अधिक प्रभावशाली बनाती है।' },
    ],
    metaDescription: 'Live morning aarti from Vrindavan temples on Asthawaani — mangala aarti darshan to start your day with devotion and positivity.',
    estimatedDuration: 'PT15M',
    approxWordCount: 1500,
    author: ASTHAWAANI_AUTHOR,
  },

  community: {
    slug: 'community',
    title: 'Community',
    titleHi: 'समुदाय',
    subtitle: 'Grow Together on the Spiritual Path',
    subtitleHi: 'आध्यात्मिक मार्ग पर साथ बढ़ें',
    intro: 'The Asthawaani community is a global family of seekers who meditate, learn, serve and celebrate festivals together. From WhatsApp circles of daily satsang reminders, to monthly online study groups of Bhagavad Gita, to seva projects in Vrindavan-Mathura, to festival jagrans where devotees from 30+ countries come together — you are never alone on the path. Spiritual growth is a relay, not a solo race.',
    introHi: 'आस्थावाणी समुदाय साधकों का एक वैश्विक परिवार है जो ध्यान करते हैं, सीखते हैं, सेवा करते हैं और एक साथ उत्सव मनाते हैं। दैनिक सत्संग सूचनाओं के व्हाट्सएप समूहों से लेकर, भगवद्गीता के मासिक ऑनलाइन अध्ययन समूहों, वृंदावन-मथुरा में सेवा परियोजनाओं, तथा उत्सव-जागरणों तक — जहाँ 30+ देशों के भक्त एकत्र होते हैं — आप पथ पर कभी अकेले नहीं हैं। आध्यात्मिक विकास एकल दौड़ नहीं, एक रिले है।',
    sections: [
      { heading: 'What You Get', headingHi: 'आपको क्या मिलेगा', body: 'Daily satsang reminders, weekly bhajan playlists, festival calendars with vrat-vidhi, monthly online Gita / Bhagwat study circles, seva opportunities in Braj, direct Q&A with senior vaktas and invitations to in-person Vrindavan yatras led by Asthawaani.', bodyHi: 'दैनिक सत्संग सूचनाएँ, साप्ताहिक भजन प्लेलिस्ट, व्रत-विधि सहित उत्सव कैलेंडर, मासिक ऑनलाइन गीता / भागवत अध्ययन मंडल, ब्रज में सेवा अवसर, वरिष्ठ वक्ताओं से प्रत्यक्ष प्रश्नोत्तर तथा आस्थावाणी द्वारा संचालित प्रत्यक्ष वृंदावन यात्राओं हेतु आमंत्रण।' },
      { heading: 'How to Join', headingHi: 'कैसे जुड़ें', body: 'Join our free WhatsApp community via the button on the home page, subscribe on YouTube, follow on Instagram and Facebook. There are no fees, no compulsions and no chain-forwards — only sincere bhakti-sangha.', bodyHi: 'होम पेज पर बटन के माध्यम से हमारे निःशुल्क व्हाट्सएप समुदाय से जुड़ें, यूट्यूब पर सब्सक्राइब करें, इंस्टाग्राम तथा फेसबुक पर फॉलो करें। कोई शुल्क नहीं, कोई बाध्यता नहीं तथा कोई चेन-फॉरवर्ड नहीं — केवल सच्ची भक्ति-संगति।' },
      { heading: 'Seva Opportunities', headingHi: 'सेवा अवसर', body: 'Gau-seva, anna-daan in Vrindavan, sapling plantation along Yamuna, support for elderly widows of Vrindavan, free distribution of Gita and Ramayan, and assistance during festivals — every contribution, big or small, returns multiplied as inner growth.', bodyHi: 'गौ-सेवा, वृंदावन में अन्न-दान, यमुना तट पर वृक्षारोपण, वृंदावन की वृद्ध विधवाओं की सहायता, गीता एवं रामायण का निःशुल्क वितरण, तथा उत्सवों के समय सहयोग — प्रत्येक योगदान, छोटा हो या बड़ा, आंतरिक विकास के रूप में गुणित होकर लौटता है।' },
      { heading: 'Online Study Circles', headingHi: 'ऑनलाइन अध्ययन मंडल', body: 'Every Sunday evening, an online study circle reads, translates and discusses one chapter of Bhagavad Gita or one section of Srimad Bhagavatam, led by an Asthawaani vakta. Recordings remain free in the archive.', bodyHi: 'प्रत्येक रविवार संध्या को एक ऑनलाइन अध्ययन मंडल भगवद्गीता का एक अध्याय अथवा श्रीमद्भागवत का एक खंड पढ़ता है, अनुवाद करता है तथा चर्चा करता है, जिसका संचालन एक आस्थावाणी वक्ता करते हैं। रिकॉर्डिंग्स संग्रहालय में निःशुल्क रहती हैं।' },
      { heading: 'Code of Conduct', headingHi: 'आचार संहिता', body: 'Mutual respect, no advertising, no politics, no caste/community remarks, language of sneh — these are the simple house-rules that keep the sangha pure. Asthawaani moderators uphold this gently and consistently.', bodyHi: 'पारस्परिक सम्मान, कोई विज्ञापन नहीं, कोई राजनीति नहीं, जाति/समुदाय संबंधी टिप्पणियाँ नहीं, स्नेह की भाषा — ये सरल गृह-नियम संग सघ को शुद्ध रखते हैं। आस्थावाणी मॉडरेटर इसे कोमलता एवं निरंतरता से लागू करते हैं।' },
    ],
    faqs: [
      { q: 'Is the community free to join?', a: 'Yes, completely free.', qHi: 'क्या समुदाय में जुड़ना निःशुल्क है?', aHi: 'हाँ, पूर्णतः निःशुल्क।' },
      { q: 'How many members are there?', a: 'Asthawaani sangha is growing every week across India and 30+ countries.', qHi: 'कितने सदस्य हैं?', aHi: 'आस्थावाणी संगति भारत तथा 30+ देशों में प्रति सप्ताह बढ़ रही है।' },
      { q: 'Will I get too many messages?', a: 'No. We send 1–2 mindful messages a day, never spam.', qHi: 'क्या मुझे बहुत सारे संदेश मिलेंगे?', aHi: 'नहीं। हम प्रतिदिन 1–2 सोची-समझी सूचनाएँ भेजते हैं, स्पैम कभी नहीं।' },
      { q: 'Can I leave anytime?', a: 'Yes, you may exit any group instantly without explanation.', qHi: 'क्या मैं किसी भी समय छोड़ सकता हूँ?', aHi: 'हाँ, आप बिना किसी कारण के तुरंत किसी भी समूह से बाहर निकल सकते हैं।' },
      { q: 'Are women-only groups available?', a: 'Yes — separate WhatsApp circles for didis and matas are active.', qHi: 'क्या केवल-महिला समूह उपलब्ध हैं?', aHi: 'हाँ — दीदियों और माताओं हेतु अलग व्हाट्सएप मंडल सक्रिय हैं।' },
      { q: 'Can children join?', a: 'Yes — through their parent\'s account. A separate Bal-Sangha curriculum is in development.', qHi: 'क्या बच्चे जुड़ सकते हैं?', aHi: 'हाँ — अभिभावक के खाते के माध्यम से। अलग बाल-संगति पाठ्यक्रम विकास में है।' },
      { q: 'How do I contribute seva-time?', a: 'Reply "Seva" in the WhatsApp group; our coordinator will connect you to live projects.', qHi: 'मैं सेवा-समय कैसे योगदान करूँ?', aHi: 'व्हाट्सएप समूह में "सेवा" लिखकर उत्तर दें; हमारे समन्वयक आपको सक्रिय परियोजनाओं से जोड़ देंगे।' },
    ],
    metaDescription: 'Join the Asthawaani spiritual community — global seekers meditate, learn and celebrate Sanatan festivals together. Free WhatsApp and YouTube.',
    estimatedDuration: 'PT1H',
    approxWordCount: 1500,
    author: ASTHAWAANI_AUTHOR,
  },
};

export const serviceSlugs = Object.keys(serviceDetails);
