export type FAQ = { q: string; a: string; qHi: string; aHi: string };

export type ServiceDetail = {
  slug: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  intro: string;
  introHi: string;
  sections: { heading: string; headingHi: string; body: string; bodyHi: string }[];
  faqs: FAQ[];
  metaDescription: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'daily-satsang': {
    slug: 'daily-satsang',
    title: 'Daily Satsang',
    titleHi: 'दैनिक सत्संग',
    subtitle: 'Simple Spiritual Wisdom for Everyday Life',
    subtitleHi: 'हर दिन के जीवन के लिए सरल आध्यात्मिक ज्ञान',
    intro:
      'Daily Satsang on Asthawaani is a peaceful, meaningful way to receive real spiritual guidance for daily life. Streamed live from Mathura Vrindavan Dham, our satsangs bring together seekers, scholars and devotees in simple language anyone can follow.',
    introHi:
      'आस्थावाणी पर दैनिक सत्संग एक शांत और सार्थक माध्यम है जिसके द्वारा आप प्रतिदिन वास्तविक आध्यात्मिक मार्गदर्शन प्राप्त कर सकते हैं। मथुरा वृंदावन धाम से लाइव प्रसारित होने वाले हमारे सत्संग साधकों, विद्वानों और भक्तों को सरल भाषा में जोड़ते हैं।',
    sections: [
      {
        heading: 'What is Satsang?',
        headingHi: 'सत्संग क्या है?',
        body: 'Satsang literally means "the company of truth". It is a sacred gathering where seekers come together to listen to spiritual discourse, sing devotional songs, meditate and reflect on timeless wisdom from the Vedas, Upanishads, Bhagavad Gita and Bhakti tradition.',
        bodyHi: 'सत्संग का शाब्दिक अर्थ है "सत्य का संग"। यह एक पवित्र सभा है जहाँ साधक एकत्रित होकर आध्यात्मिक प्रवचन सुनते हैं, भजन गाते हैं, ध्यान करते हैं और वेद, उपनिषद, भगवद्गीता और भक्ति परंपरा के शाश्वत ज्ञान पर चिंतन करते हैं।',
      },
      {
        heading: 'Benefits of Daily Satsang',
        headingHi: 'दैनिक सत्संग के लाभ',
        body: 'Regular satsang calms the mind, reduces stress, strengthens faith and gives a clear sense of purpose. It helps you start the day with positive energy, balance emotions, and build a steady spiritual routine without leaving your home.',
        bodyHi: 'नियमित सत्संग मन को शांत करता है, तनाव कम करता है, श्रद्धा को मजबूत करता है और जीवन का स्पष्ट उद्देश्य देता है। यह आपको सकारात्मक ऊर्जा के साथ दिन शुरू करने, भावनाओं को संतुलित करने और घर बैठे एक स्थिर आध्यात्मिक दिनचर्या बनाने में मदद करता है।',
      },
      {
        heading: 'How to Join',
        headingHi: 'कैसे जुड़ें',
        body: 'You can join our Daily Satsang free of cost through the Asthawaani website, YouTube channel and WhatsApp community. No prior knowledge is required — only a calm seat, a quiet mind and an open heart.',
        bodyHi: 'आप आस्थावाणी की वेबसाइट, यूट्यूब चैनल और व्हाट्सएप समुदाय के माध्यम से निःशुल्क हमारे दैनिक सत्संग से जुड़ सकते हैं। किसी पूर्व ज्ञान की आवश्यकता नहीं — केवल एक शांत आसन, शांत मन और खुला हृदय चाहिए।',
      },
    ],
    faqs: [
      { q: 'At what time is the Daily Satsang held?', a: 'Live satsang sessions are held every morning. Exact timings are shared on our WhatsApp community and YouTube channel.', qHi: 'दैनिक सत्संग किस समय होता है?', aHi: 'लाइव सत्संग सत्र प्रतिदिन प्रातः आयोजित होते हैं। सटीक समय हमारे व्हाट्सएप समुदाय और यूट्यूब चैनल पर साझा किया जाता है।' },
      { q: 'Is there any fee to attend?', a: 'No. Daily Satsang is completely free for all devotees and seekers.', qHi: 'क्या इसमें भाग लेने का कोई शुल्क है?', aHi: 'नहीं। दैनिक सत्संग सभी भक्तों और साधकों के लिए पूर्णतः निःशुल्क है।' },
      { q: 'Can I watch a recording later?', a: 'Yes, every satsang is archived on the Asthawaani YouTube channel for later viewing.', qHi: 'क्या मैं बाद में रिकॉर्डिंग देख सकता हूँ?', aHi: 'हाँ, हर सत्संग बाद में देखने के लिए आस्थावाणी यूट्यूब चैनल पर उपलब्ध रहता है।' },
    ],
    metaDescription: 'Join daily satsang from Mathura Vrindavan with Asthawaani — live spiritual discourse, bhajan, meditation and Vedic wisdom in simple language.',
  },

  'katha-pravachan': {
    slug: 'katha-pravachan',
    title: 'Katha & Pravachan',
    titleHi: 'कथा और प्रवचन',
    subtitle: 'Ancient Wisdom in Simple Language',
    subtitleHi: 'सरल भाषा में प्राचीन ज्ञान',
    intro: 'Katha and Pravachan on Asthawaani bring Sanatan Dharma teachings in easy, relatable language. Through Bhagwat Katha, Ramayan Katha, Shiv Katha and Gita Pravachan, our learned vaktas connect ancient scriptures with everyday life.',
    introHi: 'आस्थावाणी पर कथा और प्रवचन सनातन धर्म की शिक्षाओं को सरल और सहज भाषा में प्रस्तुत करते हैं। भागवत कथा, रामायण कथा, शिव कथा और गीता प्रवचन के माध्यम से हमारे विद्वान वक्ता प्राचीन शास्त्रों को दैनिक जीवन से जोड़ते हैं।',
    sections: [
      { heading: 'What is Katha?', headingHi: 'कथा क्या है?', body: 'Katha is a devotional storytelling tradition where stories of God and saints are narrated with deep meaning, music and emotion. It is one of the oldest and most loved ways of teaching dharma.', bodyHi: 'कथा एक भक्तिमय कथावाचन परंपरा है जिसमें भगवान और संतों की कथाएँ गहरे अर्थ, संगीत और भाव के साथ सुनाई जाती हैं। यह धर्म सिखाने का सबसे प्राचीन और प्रिय माध्यम है।' },
      { heading: 'What is Pravachan?', headingHi: 'प्रवचन क्या है?', body: 'Pravachan is a spiritual discourse on a specific scripture or topic — explaining shlokas, life lessons and practical sadhana for a modern listener.', bodyHi: 'प्रवचन किसी विशेष शास्त्र या विषय पर आध्यात्मिक प्रवचन है — जिसमें श्लोक, जीवन के पाठ और आधुनिक श्रोता के लिए व्यावहारिक साधना समझाई जाती है।' },
      { heading: 'Who Can Listen?', headingHi: 'कौन सुन सकता है?', body: 'Anyone of any age, background or experience level can listen. Our vaktas use the simplest words so that even first-time listeners feel connected.', bodyHi: 'किसी भी आयु, पृष्ठभूमि या अनुभव वाले लोग सुन सकते हैं। हमारे वक्ता सरलतम शब्दों का उपयोग करते हैं जिससे पहली बार सुनने वाले भी जुड़ाव महसूस करें।' },
    ],
    faqs: [
      { q: 'Which kathas are available?', a: 'We regularly feature Bhagwat Katha, Ramayan Katha, Shiv Katha, Devi Katha and Gita Pravachan.', qHi: 'कौन-सी कथाएँ उपलब्ध हैं?', aHi: 'हम नियमित रूप से भागवत कथा, रामायण कथा, शिव कथा, देवी कथा और गीता प्रवचन प्रस्तुत करते हैं।' },
      { q: 'Can I request a specific katha?', a: 'Yes, you can request a katha through our Contact page or WhatsApp.', qHi: 'क्या मैं विशेष कथा का अनुरोध कर सकता हूँ?', aHi: 'हाँ, आप संपर्क पृष्ठ या व्हाट्सएप के माध्यम से कथा का अनुरोध कर सकते हैं।' },
      { q: 'Are the kathas in Hindi only?', a: 'Most kathas are in Hindi with some explanations in regional languages. English summaries are also added when possible.', qHi: 'क्या कथाएँ केवल हिंदी में होती हैं?', aHi: 'अधिकांश कथाएँ हिंदी में होती हैं तथा क्षेत्रीय भाषाओं में व्याख्या भी दी जाती है। संभव होने पर अंग्रेज़ी सारांश भी जोड़ा जाता है।' },
    ],
    metaDescription: 'Listen to Bhagwat Katha, Ramayan Katha, Shiv Katha and Gita Pravachan from Vrindavan on Asthawaani — Sanatan Dharma teachings in simple language.',
  },

  'bhajan-kirtan': {
    slug: 'bhajan-kirtan',
    title: 'Bhajan & Kirtan',
    titleHi: 'भजन और कीर्तन',
    subtitle: 'Devotional Music for Peace and Positivity',
    subtitleHi: 'शांति और सकारात्मकता के लिए भक्ति संगीत',
    intro: 'Bhajan and Kirtan on Asthawaani offer pure devotional music that calms the mind and fills the heart with bhakti. From classical bhajans of Surdas, Mira and Tulsidas to soulful Hare Krishna kirtans of Vrindavan, every sound is a step towards the divine.',
    introHi: 'आस्थावाणी पर भजन और कीर्तन शुद्ध भक्ति संगीत प्रस्तुत करते हैं जो मन को शांत कर हृदय को भक्ति से भर देते हैं। सूरदास, मीरा और तुलसीदास के शास्त्रीय भजनों से लेकर वृंदावन के हरे कृष्ण कीर्तनों तक, हर ध्वनि दिव्यता की ओर एक कदम है।',
    sections: [
      { heading: 'Why Bhajan & Kirtan?', headingHi: 'भजन-कीर्तन क्यों?', body: 'Bhakti music carries a special vibration that purifies the atmosphere, releases stress and opens the heart. Even a few minutes of kirtan brings noticeable peace.', bodyHi: 'भक्ति संगीत में एक विशेष कंपन होता है जो वातावरण को शुद्ध करता है, तनाव दूर करता है और हृदय खोल देता है। कुछ मिनट का कीर्तन भी स्पष्ट शांति लाता है।' },
      { heading: 'What You Will Hear', headingHi: 'आप क्या सुनेंगे', body: 'Krishna bhajans, Ram bhajans, Hanuman Chalisa, Shiv bhajans, Devi bhajans and traditional Vrindavan kirtans with harmonium, mridang and manjira.', bodyHi: 'कृष्ण भजन, राम भजन, हनुमान चालीसा, शिव भजन, देवी भजन तथा हारमोनियम, मृदंग और मंजीरा के साथ पारंपरिक वृंदावन कीर्तन।' },
      { heading: 'Sing With Us', headingHi: 'हमारे साथ गाएँ', body: 'Our live sessions invite you to sing along. You don\'t need a trained voice — only sincere bhav.', bodyHi: 'हमारे लाइव सत्रों में आप साथ गा सकते हैं। प्रशिक्षित आवाज़ की ज़रूरत नहीं — केवल सच्चा भाव चाहिए।' },
    ],
    faqs: [
      { q: 'Is the bhajan music free to listen?', a: 'Yes, all bhajans and kirtans are available free on our YouTube and website.', qHi: 'क्या भजन सुनना निःशुल्क है?', aHi: 'हाँ, सभी भजन और कीर्तन हमारे यूट्यूब और वेबसाइट पर निःशुल्क उपलब्ध हैं।' },
      { q: 'Can I request a bhajan?', a: 'Yes, send your request via Contact page or WhatsApp.', qHi: 'क्या मैं भजन का अनुरोध कर सकता हूँ?', aHi: 'हाँ, संपर्क पृष्ठ या व्हाट्सएप के माध्यम से अनुरोध भेजें।' },
    ],
    metaDescription: 'Devotional bhajan and kirtan from Vrindavan — Krishna, Ram, Shiv and Devi bhajans on Asthawaani for peace, bhakti and positive energy.',
  },

  'jaap-mantras': {
    slug: 'jaap-mantras',
    title: 'Jaap & Mantras',
    titleHi: 'जाप और मंत्र',
    subtitle: 'Calm the Mind, Strengthen Inner Faith',
    subtitleHi: 'मन को शांत करें, आंतरिक श्रद्धा को मजबूत करें',
    intro: 'Jaap and Mantra chanting are among the most powerful spiritual practices of Sanatan Dharma. Asthawaani offers guided jaap sessions, mantra meanings and sacred audio for daily sadhana.',
    introHi: 'जाप और मंत्र जप सनातन धर्म की सर्वाधिक शक्तिशाली आध्यात्मिक साधनाओं में से एक हैं। आस्थावाणी मार्गदर्शित जाप सत्र, मंत्र अर्थ और दैनिक साधना हेतु पवित्र ऑडियो प्रस्तुत करता है।',
    sections: [
      { heading: 'What is Jaap?', headingHi: 'जाप क्या है?', body: 'Jaap is the meditative repetition of a sacred mantra, often on a mala of 108 beads. It focuses the mind, balances breath and attunes consciousness to a divine vibration.', bodyHi: 'जाप किसी पवित्र मंत्र का ध्यानपूर्वक पुनरावर्तन है, प्रायः 108 मनकों की माला पर। यह मन को एकाग्र करता है, श्वास संतुलित करता है और चेतना को दिव्य कंपन से जोड़ता है।' },
      { heading: 'Popular Mantras We Cover', headingHi: 'लोकप्रिय मंत्र', body: 'Om, Gayatri Mantra, Mahamrityunjaya Mantra, Hare Krishna Mahamantra, Om Namah Shivaya, Shri Ram Jay Ram and Navgrah mantras.', bodyHi: 'ॐ, गायत्री मंत्र, महामृत्युंजय मंत्र, हरे कृष्ण महामंत्र, ॐ नमः शिवाय, श्री राम जय राम और नवग्रह मंत्र।' },
      { heading: 'How to Start', headingHi: 'कैसे आरंभ करें', body: 'Sit in a calm place, hold a mala if available, and chant for at least 11 minutes daily. Increase gradually.', bodyHi: 'शांत स्थान पर बैठें, यदि उपलब्ध हो तो माला लें और प्रतिदिन कम से कम 11 मिनट जप करें। धीरे-धीरे बढ़ाएँ।' },
    ],
    faqs: [
      { q: 'Can I do jaap without a mala?', a: 'Yes, you can use your fingers or simply count breaths. A mala helps focus but is not mandatory.', qHi: 'क्या बिना माला के जप कर सकते हैं?', aHi: 'हाँ, आप अंगुलियों से या केवल श्वास गिनकर भी कर सकते हैं। माला सहायक है, अनिवार्य नहीं।' },
      { q: 'What is the best time for jaap?', a: 'Brahma muhurta (early morning before sunrise) is ideal, but any quiet time works.', qHi: 'जाप के लिए सर्वोत्तम समय क्या है?', aHi: 'ब्रह्म मुहूर्त (सूर्योदय से पूर्व प्रातः) उत्तम है, किंतु कोई भी शांत समय उपयुक्त है।' },
    ],
    metaDescription: 'Guided mantra jaap and chanting from Vrindavan — Gayatri, Mahamrityunjaya, Hare Krishna and Navgrah mantras on Asthawaani.',
  },

  'navgrah-shanti': {
    slug: 'navgrah-shanti',
    title: 'Navgrah Shanti Path',
    titleHi: 'नवग्रह शांति पाठ',
    subtitle: 'Seek Balance and Stability',
    subtitleHi: 'संतुलन और स्थिरता पाएँ',
    intro: 'Navgrah Shanti Path is a sacred Vedic ritual to pacify the nine planetary energies that influence life. Asthawaani offers authentic Navgrah path performed by experienced pandits from Vrindavan.',
    introHi: 'नवग्रह शांति पाठ नौ ग्रहों की ऊर्जा को शांत करने हेतु एक पवित्र वैदिक अनुष्ठान है। आस्थावाणी वृंदावन के अनुभवी पंडितों द्वारा प्रामाणिक नवग्रह पाठ प्रस्तुत करता है।',
    sections: [
      { heading: 'Who Should Do It?', headingHi: 'किसे करना चाहिए?', body: 'Anyone facing repeated obstacles in career, health, finances or relationships can benefit. It is also recommended during sade-sati, dasha changes and gochara doshas.', bodyHi: 'जो लोग करियर, स्वास्थ्य, धन या रिश्तों में बार-बार बाधाओं का सामना कर रहे हैं उन्हें लाभ मिलता है। साढ़े-साती, दशा परिवर्तन और गोचर दोष में यह विशेष लाभदायक है।' },
      { heading: 'What is Included', headingHi: 'क्या सम्मिलित है', body: 'Sankalp, Ganesh puja, Navgrah mantra jaap of each planet, havan and aarti — performed with full Vedic vidhi.', bodyHi: 'संकल्प, गणेश पूजा, प्रत्येक ग्रह का नवग्रह मंत्र जाप, हवन और आरती — पूर्ण वैदिक विधि से।' },
      { heading: 'How to Book', headingHi: 'कैसे बुक करें', body: 'Contact us through the website or WhatsApp. We will share auspicious muhurta and pandit details.', bodyHi: 'वेबसाइट या व्हाट्सएप के माध्यम से हमसे संपर्क करें। हम शुभ मुहूर्त और पंडित विवरण साझा करेंगे।' },
    ],
    faqs: [
      { q: 'Can the path be performed online for me?', a: 'Yes, we can perform it on your behalf in Vrindavan and share live video / recording.', qHi: 'क्या मेरे लिए ऑनलाइन पाठ हो सकता है?', aHi: 'हाँ, हम आपके निमित्त वृंदावन में पाठ कर लाइव वीडियो / रिकॉर्डिंग साझा कर सकते हैं।' },
      { q: 'How long does it take?', a: 'A complete Navgrah Shanti path with havan usually takes 3 to 5 hours.', qHi: 'कितना समय लगता है?', aHi: 'हवन सहित संपूर्ण नवग्रह शांति पाठ में सामान्यतः 3 से 5 घंटे लगते हैं।' },
    ],
    metaDescription: 'Authentic Navgrah Shanti Path from Vrindavan on Asthawaani — Vedic puja and havan to balance nine planetary energies.',
  },

  healing: {
    slug: 'healing',
    title: 'Spiritual & Emotional Healing',
    titleHi: 'आध्यात्मिक और भावनात्मक उपचार',
    subtitle: 'Touch your Heart',
    subtitleHi: 'हृदय को स्पर्श करें',
    intro: 'Spiritual healing on Asthawaani combines mantra, meditation, breath work and compassionate counselling to bring calm to a troubled mind and heart.',
    introHi: 'आस्थावाणी पर आध्यात्मिक उपचार मंत्र, ध्यान, श्वास साधना और करुणामय परामर्श का संगम है, जो तनावग्रस्त मन व हृदय को शांति प्रदान करता है।',
    sections: [
      { heading: 'What We Help With', headingHi: 'हम किसमें सहायता करते हैं', body: 'Anxiety, grief, fear, anger, sleep issues, lack of purpose, family conflicts and spiritual emptiness.', bodyHi: 'चिंता, शोक, भय, क्रोध, नींद की समस्या, उद्देश्यहीनता, पारिवारिक मतभेद और आध्यात्मिक रिक्तता।' },
      { heading: 'Our Approach', headingHi: 'हमारी पद्धति', body: 'A blend of Vedic wisdom, listening with empathy, and simple daily practices that anyone can follow.', bodyHi: 'वैदिक ज्ञान, सहानुभूतिपूर्ण श्रवण और किसी के भी द्वारा अपनाई जा सकने वाली सरल दैनिक साधनाओं का संगम।' },
    ],
    faqs: [
      { q: 'Is this a replacement for medical treatment?', a: 'No. Spiritual healing complements but does not replace medical or psychological care.', qHi: 'क्या यह चिकित्सकीय उपचार का विकल्प है?', aHi: 'नहीं। आध्यात्मिक उपचार चिकित्सकीय या मनोवैज्ञानिक देखभाल का पूरक है, विकल्प नहीं।' },
      { q: 'Is my conversation confidential?', a: 'Yes, all sessions are strictly private.', qHi: 'क्या बातचीत गोपनीय है?', aHi: 'हाँ, सभी सत्र पूर्णतः गोपनीय हैं।' },
    ],
    metaDescription: 'Spiritual and emotional healing from Vrindavan on Asthawaani — mantra, meditation and compassionate guidance for anxiety, grief and inner peace.',
  },

  'life-guidance': {
    slug: 'life-guidance',
    title: 'Motivational & Life Guidance',
    titleHi: 'प्रेरक और जीवन मार्गदर्शन',
    subtitle: 'Faith-Based Positive Comfort',
    subtitleHi: 'आस्था आधारित सकारात्मक सहारा',
    intro: 'Life guidance on Asthawaani offers grounded spiritual perspective on real-life decisions — career, relationships, family, money and purpose — rooted in Sanatan wisdom.',
    introHi: 'आस्थावाणी पर जीवन मार्गदर्शन वास्तविक जीवन के निर्णयों — करियर, रिश्ते, परिवार, धन और उद्देश्य — पर सनातन ज्ञान पर आधारित स्थिर आध्यात्मिक दृष्टिकोण प्रदान करता है।',
    sections: [
      { heading: 'Practical, Not Theoretical', headingHi: 'सैद्धांतिक नहीं, व्यावहारिक', body: 'We give actionable steps drawn from Gita, Ramayan and lived sadhana — not abstract philosophy.', bodyHi: 'हम गीता, रामायण और जीवित साधना से लिए गए व्यावहारिक चरण देते हैं — अमूर्त दर्शन नहीं।' },
      { heading: 'For Every Stage of Life', headingHi: 'जीवन के प्रत्येक चरण के लिए', body: 'Students, working professionals, householders, retirees — guidance is shaped to each stage.', bodyHi: 'विद्यार्थी, कार्यरत पेशेवर, गृहस्थ, सेवानिवृत्त — मार्गदर्शन प्रत्येक चरण के अनुसार।' },
    ],
    faqs: [
      { q: 'How do I ask a question?', a: 'Use the Contact form or WhatsApp. Personal guidance is offered with discretion.', qHi: 'मैं प्रश्न कैसे पूछूँ?', aHi: 'संपर्क फॉर्म या व्हाट्सएप का उपयोग करें। व्यक्तिगत मार्गदर्शन गोपनीयता के साथ दिया जाता है।' },
    ],
    metaDescription: 'Spiritual life guidance and motivation from Vrindavan — practical Sanatan wisdom for career, relationships, family and purpose on Asthawaani.',
  },

  'morning-aarti': {
    slug: 'morning-aarti',
    title: 'Morning Aarti',
    titleHi: 'प्रातः आरती',
    subtitle: 'Start the day with Grace and Positivity',
    subtitleHi: 'कृपा और सकारात्मकता के साथ दिन शुरू करें',
    intro: 'Morning Aarti on Asthawaani is a live broadcast from Vrindavan temples — bringing the sacred sound, fragrance and energy of mangala aarti into your home every morning.',
    introHi: 'आस्थावाणी पर प्रातः आरती वृंदावन के मंदिरों से लाइव प्रसारण है — जो प्रतिदिन मंगला आरती की पवित्र ध्वनि, सुगंध और ऊर्जा आपके घर पहुँचाती है।',
    sections: [
      { heading: 'Why Morning Aarti Matters', headingHi: 'प्रातः आरती क्यों', body: 'Starting the day with aarti aligns your mind with gratitude, positivity and devotion before the world\'s noise enters.', bodyHi: 'दिन की शुरुआत आरती से करना मन को कृतज्ञता, सकारात्मकता और भक्ति से जोड़ देता है — संसार के शोर से पहले।' },
      { heading: 'What You Will Experience', headingHi: 'आप क्या अनुभव करेंगे', body: 'Conch, ghanta, dhoop, bhajan and darshan of the deity — exactly as performed in Vrindavan temples.', bodyHi: 'शंख, घंटा, धूप, भजन और देव दर्शन — ठीक वैसे ही जैसे वृंदावन के मंदिरों में होता है।' },
    ],
    faqs: [
      { q: 'At what time is the aarti?', a: 'Mangala aarti is streamed in the early morning. Exact time is shared on WhatsApp and YouTube.', qHi: 'आरती किस समय होती है?', aHi: 'मंगला आरती प्रातः जल्दी प्रसारित होती है। सटीक समय व्हाट्सएप और यूट्यूब पर साझा किया जाता है।' },
    ],
    metaDescription: 'Live morning aarti from Vrindavan temples on Asthawaani — mangala aarti darshan to start your day with devotion and positivity.',
  },

  community: {
    slug: 'community',
    title: 'Community',
    titleHi: 'समुदाय',
    subtitle: 'Grow Together on the Spiritual Path',
    subtitleHi: 'आध्यात्मिक मार्ग पर साथ बढ़ें',
    intro: 'The Asthawaani community is a global family of seekers who meditate, learn, serve and celebrate festivals together. You are never alone on the path.',
    introHi: 'आस्थावाणी समुदाय साधकों का एक वैश्विक परिवार है जो ध्यान करते हैं, सीखते हैं, सेवा करते हैं और एक साथ उत्सव मनाते हैं। आप पथ पर कभी अकेले नहीं हैं।',
    sections: [
      { heading: 'What You Get', headingHi: 'आपको क्या मिलेगा', body: 'Daily satsang reminders, festival schedules, study groups, seva opportunities and direct interaction with vaktas.', bodyHi: 'दैनिक सत्संग सूचनाएँ, उत्सव कार्यक्रम, अध्ययन समूह, सेवा अवसर और वक्ताओं से प्रत्यक्ष संवाद।' },
      { heading: 'How to Join', headingHi: 'कैसे जुड़ें', body: 'Join our WhatsApp community and subscribe on YouTube — both are free.', bodyHi: 'हमारे व्हाट्सएप समुदाय से जुड़ें और यूट्यूब पर सब्सक्राइब करें — दोनों निःशुल्क हैं।' },
    ],
    faqs: [
      { q: 'Is the community free to join?', a: 'Yes, completely free.', qHi: 'क्या समुदाय में जुड़ना निःशुल्क है?', aHi: 'हाँ, पूर्णतः निःशुल्क।' },
    ],
    metaDescription: 'Join the Asthawaani spiritual community — global seekers meditate, learn and celebrate Sanatan festivals together. Free WhatsApp and YouTube.',
  },
};

export const serviceSlugs = Object.keys(serviceDetails);