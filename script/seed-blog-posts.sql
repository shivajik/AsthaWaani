-- ============================================
-- Asthawaani Blog/Post Seed Data
-- 15 Blog Posts with English + Hindi content
-- H1 as descriptive paragraph, H2 as FAQ sections
-- ============================================
-- Run this in your Supabase Dashboard > SQL Editor
-- ============================================

-- PAGE 1: Mantra Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'mantra-jaap',
  'Mantra Jaap – Sacred Chanting for Peace, Positivity & Spiritual Balance',
  'मंत्र जाप – शांति, सकारात्मकता और आध्यात्मिक संतुलन के लिए पवित्र जाप',
  'Mantra Jaap is a powerful spiritual practice of sacred chanting for peace, positivity, and spiritual growth. Performed by experienced Vedic priests at Asthawaani.',
  'मंत्र जाप एक शक्तिशाली आध्यात्मिक साधना है जो शांति, सकारात्मकता और आध्यात्मिक विकास के लिए की जाती है। आस्थावाणी में अनुभवी वैदिक पुरोहितों द्वारा संपन्न।',
  '<p>Mantra Jaap is a powerful spiritual practice where sacred mantras are chanted with devotion and discipline. It helps calm the mind, remove negative energies, and attract positivity into life. Since ancient Vedic times, mantra jaap has been used for peace, health, success, and spiritual growth.</p>
<p>At Asthawaani, Mantra Jaap is performed by experienced Vedic priests following proper vidhi, sankalp, and mantra count, ensuring complete spiritual effectiveness.</p>

<details>
  <summary>What is Mantra Jaap?</summary>
  <ul>
    <li>Mantra Jaap means the continuous chanting of a specific mantra with focus and devotion. Each mantra has a vibration that influences the mind, body, and surroundings. Regular jaap helps align your energy with positive cosmic forces.</li>
  </ul>
</details>

<details>
  <summary>Benefits of Mantra Jaap</summary>
  <ul>
    <li>Mental peace and emotional stability</li>
    <li>Removal of negative thoughts and fear</li>
    <li>Improved focus and positivity</li>
    <li>Spiritual protection and inner strength</li>
  </ul>
</details>

<details>
  <summary>Types of Mantra Jaap at Asthawaani</summary>
  <ul>
    <li>Daily Mantra Jaap</li>
    <li>Live Mantra Jaap</li>
    <li>Online Mantra Jaap</li>
    <li>24x7 Mantra Jaap</li>
  </ul>
</details>

<details>
  <summary>Why Choose Asthawaani for Mantra Jaap</summary>
  <ul>
    <li>Authentic Vedic process</li>
    <li>Experienced priests</li>
    <li>Live and online availability</li>
    <li>Sankalp taken in devotee''s name</li>
  </ul>
</details>

<p>👉 Book your Mantra Jaap today and invite peace into your life.</p>',

  '<p>मंत्र जाप एक शक्तिशाली आध्यात्मिक साधना है जिसमें पवित्र मंत्रों का भक्ति और अनुशासन के साथ जाप किया जाता है। यह मन को शांत करने, नकारात्मक ऊर्जाओं को दूर करने और जीवन में सकारात्मकता लाने में सहायक है। प्राचीन वैदिक काल से मंत्र जाप शांति, स्वास्थ्य, सफलता और आध्यात्मिक विकास के लिए किया जाता रहा है।</p>
<p>आस्थावाणी में मंत्र जाप अनुभवी वैदिक पुरोहितों द्वारा उचित विधि, संकल्प और मंत्र गणना के साथ किया जाता है, जिससे पूर्ण आध्यात्मिक प्रभावशीलता सुनिश्चित होती है।</p>

<details>
  <summary>मंत्र जाप क्या है?</summary>
  <ul>
    <li>मंत्र जाप का अर्थ है एक विशेष मंत्र का एकाग्रता और भक्ति के साथ निरंतर जाप करना। प्रत्येक मंत्र में एक कंपन होता है जो मन, शरीर और वातावरण को प्रभावित करता है। नियमित जाप आपकी ऊर्जा को सकारात्मक ब्रह्मांडीय शक्तियों के साथ संरेखित करता है।</li>
  </ul>
</details>

<details>
  <summary>मंत्र जाप के लाभ</summary>
  <ul>
    <li>मानसिक शांति और भावनात्मक स्थिरता</li>
    <li>नकारात्मक विचारों और भय का निवारण</li>
    <li>एकाग्रता और सकारात्मकता में सुधार</li>
    <li>आध्यात्मिक सुरक्षा और आंतरिक शक्ति</li>
  </ul>
</details>

<details>
  <summary>आस्थावाणी में मंत्र जाप के प्रकार</summary>
  <ul>
    <li>दैनिक मंत्र जाप</li>
    <li>लाइव मंत्र जाप</li>
    <li>ऑनलाइन मंत्र जाप</li>
    <li>24x7 मंत्र जाप</li>
  </ul>
</details>

<details>
  <summary>मंत्र जाप के लिए आस्थावाणी क्यों चुनें</summary>
  <ul>
    <li>प्रामाणिक वैदिक प्रक्रिया</li>
    <li>अनुभवी पुरोहित</li>
    <li>लाइव और ऑनलाइन उपलब्धता</li>
    <li>भक्त के नाम से संकल्प</li>
  </ul>
</details>

<p>👉 आज ही अपना मंत्र जाप बुक करें और जीवन में शांति को आमंत्रित करें।</p>',

  'Mantra Jaap – Sacred Chanting for Peace & Positivity | Asthawaani',
  'Book authentic Mantra Jaap by experienced Vedic priests at Asthawaani. Sacred chanting for peace, positivity, spiritual balance, and removal of negative energies.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 2: Live Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'live-jaap',
  'Live Jaap – Experience Real-Time Sacred Mantra Chanting',
  'लाइव जाप – वास्तविक समय में पवित्र मंत्र जाप का अनुभव करें',
  'Live Jaap allows devotees to participate in real-time mantra chanting with personalised sankalp by qualified priests at Asthawaani.',
  'लाइव जाप भक्तों को आस्थावाणी के योग्य पुरोहितों द्वारा व्यक्तिगत संकल्प के साथ वास्तविक समय में मंत्र जाप में भाग लेने का अवसर देता है।',
  '<p>Live Jaap allows devotees to participate in mantra chanting as it happens. Unlike recorded chanting, live jaap carries real-time spiritual energy, intention, and purity. It is ideal for those seeking immediate spiritual support.</p>
<p>Asthawaani offers live jaap sessions conducted by qualified priests, where every mantra is chanted with complete focus and devotion.</p>

<details>
  <summary>What is Live Jaap?</summary>
  <ul>
    <li>Live Jaap is performed in real time, where priests chant mantras specifically for you, taking your name and purpose during sankalp. You can attend live or receive confirmation after completion.</li>
  </ul>
</details>

<details>
  <summary>Benefits of Live Jaap</summary>
  <ul>
    <li>Strong spiritual impact</li>
    <li>Personalised sankalp</li>
    <li>Immediate positivity and relief</li>
    <li>Higher belief and trust</li>
  </ul>
</details>

<details>
  <summary>Live Jaap Today with Asthawaani</summary>
  <ul>
    <li>You can book live jaap today for:</li>
    <li>Grah shanti</li>
    <li>Mental peace</li>
    <li>Health and protection</li>
  </ul>
</details>

<p>👉 Book Live Jaap Today and feel the divine energy.</p>',

  '<p>लाइव जाप भक्तों को मंत्र जाप में उसी समय भाग लेने का अवसर देता है जब वह हो रहा होता है। रिकॉर्डेड जाप के विपरीत, लाइव जाप में वास्तविक समय की आध्यात्मिक ऊर्जा, संकल्प और पवित्रता होती है। यह उन लोगों के लिए आदर्श है जो तत्काल आध्यात्मिक सहायता चाहते हैं।</p>
<p>आस्थावाणी योग्य पुरोहितों द्वारा संचालित लाइव जाप सत्र प्रदान करता है, जहाँ प्रत्येक मंत्र पूर्ण एकाग्रता और भक्ति के साथ जपा जाता है।</p>

<details>
  <summary>लाइव जाप क्या है?</summary>
  <ul>
    <li>लाइव जाप वास्तविक समय में किया जाता है, जहाँ पुरोहित विशेष रूप से आपके लिए मंत्र जपते हैं, संकल्प के दौरान आपका नाम और उद्देश्य लेते हैं। आप लाइव उपस्थित हो सकते हैं या पूर्ण होने के बाद पुष्टि प्राप्त कर सकते हैं।</li>
  </ul>
</details>

<details>
  <summary>लाइव जाप के लाभ</summary>
  <ul>
    <li>प्रबल आध्यात्मिक प्रभाव</li>
    <li>व्यक्तिगत संकल्प</li>
    <li>तत्काल सकारात्मकता और राहत</li>
    <li>उच्च विश्वास और श्रद्धा</li>
  </ul>
</details>

<details>
  <summary>आस्थावाणी के साथ आज लाइव जाप</summary>
  <ul>
    <li>आप आज लाइव जाप बुक कर सकते हैं:</li>
    <li>ग्रह शांति</li>
    <li>मानसिक शांति</li>
    <li>स्वास्थ्य और सुरक्षा</li>
  </ul>
</details>

<p>👉 आज ही लाइव जाप बुक करें और दिव्य ऊर्जा का अनुभव करें।</p>',

  'Live Jaap – Real-Time Sacred Mantra Chanting | Asthawaani',
  'Experience Live Jaap with personalised sankalp by qualified Vedic priests at Asthawaani. Real-time mantra chanting for immediate spiritual support.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 3: Online Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'online-jaap',
  'Online Jaap – Sacred Mantra Chanting from Anywhere',
  'ऑनलाइन जाप – कहीं से भी पवित्र मंत्र जाप',
  'Online Jaap makes spiritual services accessible to everyone. Authentic mantra jaap by Vedic priests without visiting a temple.',
  'ऑनलाइन जाप आध्यात्मिक सेवाओं को सभी के लिए सुलभ बनाता है। मंदिर जाए बिना वैदिक पुरोहितों द्वारा प्रामाणिक मंत्र जाप।',
  '<p>Online Jaap makes spiritual services accessible to everyone, no matter where they are. Through Asthawaani, devotees can receive authentic mantra jaap without visiting a temple.</p>

<details>
  <summary>How Online Jaap Works</summary>
  <ul>
    <li>You book the jaap online</li>
    <li>Sankalp is taken in your name</li>
    <li>Jaap is performed by Vedic priests</li>
    <li>Completion details are shared</li>
  </ul>
</details>

<details>
  <summary>Who Should Choose Online Jaap</summary>
  <ul>
    <li>Working professionals</li>
    <li>NRIs and overseas devotees</li>
    <li>People unable to travel</li>
  </ul>
</details>

<p>👉 Get divine blessings with Online Jaap by Asthawaani.</p>',

  '<p>ऑनलाइन जाप आध्यात्मिक सेवाओं को सभी के लिए सुलभ बनाता है, चाहे वे कहीं भी हों। आस्थावाणी के माध्यम से भक्त बिना मंदिर जाए प्रामाणिक मंत्र जाप प्राप्त कर सकते हैं।</p>

<details>
  <summary>ऑनलाइन जाप कैसे काम करता है</summary>
  <ul>
    <li>आप ऑनलाइन जाप बुक करते हैं</li>
    <li>आपके नाम से संकल्प लिया जाता है</li>
    <li>वैदिक पुरोहितों द्वारा जाप किया जाता है</li>
    <li>पूर्णता का विवरण साझा किया जाता है</li>
  </ul>
</details>

<details>
  <summary>ऑनलाइन जाप किसे चुनना चाहिए</summary>
  <ul>
    <li>कामकाजी पेशेवर</li>
    <li>NRI और विदेश में रहने वाले भक्त</li>
    <li>यात्रा करने में असमर्थ लोग</li>
  </ul>
</details>

<p>👉 आस्थावाणी द्वारा ऑनलाइन जाप से दिव्य आशीर्वाद प्राप्त करें।</p>',

  'Online Jaap – Sacred Mantra Chanting from Anywhere | Asthawaani',
  'Book Online Jaap with Asthawaani. Authentic mantra chanting by Vedic priests accessible from anywhere in the world.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 4: Navgrah Shanti Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-shanti',
  'Navgrah Shanti Jaap – Balance the Nine Planetary Energies',
  'नवग्रह शांति जाप – नौ ग्रहों की ऊर्जा को संतुलित करें',
  'Navgrah Shanti Jaap balances the effects of nine planets in your horoscope. Performed with authentic mantras and proper Vedic rituals at Asthawaani.',
  'नवग्रह शांति जाप आपकी कुंडली में नौ ग्रहों के प्रभावों को संतुलित करता है। आस्थावाणी में प्रामाणिक मंत्रों और उचित वैदिक अनुष्ठानों के साथ संपन्न।',
  '<p>Navgrah Shanti Jaap is performed to balance the effects of the nine planets in one''s horoscope. Imbalance in grahs can cause obstacles in career, health, marriage, and peace of mind.</p>
<p>Asthawaani performs Navgrah Shanti Jaap using authentic mantras, correct counts, and proper rituals as prescribed in Vedic scriptures.</p>

<details>
  <summary>What are Navgrahs?</summary>
  <ul>
    <li>The nine grahs are Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu, and Ketu. Each planet influences different aspects of life.</li>
  </ul>
</details>

<details>
  <summary>When is Navgrah Shanti Required?</summary>
  <ul>
    <li>Repeated failures or delays</li>
    <li>Health or financial issues</li>
    <li>Relationship problems</li>
    <li>Dosha mentioned in horoscope</li>
  </ul>
</details>

<details>
  <summary>Benefits of Navgrah Shanti Jaap</summary>
  <ul>
    <li>Reduction of planetary dosh</li>
    <li>Stability and peace in life</li>
    <li>Positive growth and clarity</li>
  </ul>
</details>

<p>👉 Book Navgrah Shanti Jaap Online with Asthawaani.</p>',

  '<p>नवग्रह शांति जाप कुंडली में नौ ग्रहों के प्रभावों को संतुलित करने के लिए किया जाता है। ग्रहों में असंतुलन करियर, स्वास्थ्य, विवाह और मानसिक शांति में बाधाएँ उत्पन्न कर सकता है।</p>
<p>आस्थावाणी वैदिक शास्त्रों में निर्धारित प्रामाणिक मंत्रों, सही गणना और उचित अनुष्ठानों का उपयोग करके नवग्रह शांति जाप करता है।</p>

<details>
  <summary>नवग्रह क्या हैं?</summary>
  <ul>
    <li>नौ ग्रह हैं - सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु। प्रत्येक ग्रह जीवन के विभिन्न पहलुओं को प्रभावित करता है।</li>
  </ul>
</details>

<details>
  <summary>नवग्रह शांति कब आवश्यक है?</summary>
  <ul>
    <li>बार-बार असफलता या देरी</li>
    <li>स्वास्थ्य या आर्थिक समस्याएँ</li>
    <li>संबंधों में समस्याएँ</li>
    <li>कुंडली में दोष का उल्लेख</li>
  </ul>
</details>

<details>
  <summary>नवग्रह शांति जाप के लाभ</summary>
  <ul>
    <li>ग्रह दोषों में कमी</li>
    <li>जीवन में स्थिरता और शांति</li>
    <li>सकारात्मक विकास और स्पष्टता</li>
  </ul>
</details>

<p>👉 आस्थावाणी के साथ ऑनलाइन नवग्रह शांति जाप बुक करें।</p>',

  'Navgrah Shanti Jaap – Balance Nine Planetary Energies | Asthawaani',
  'Book Navgrah Shanti Jaap with Asthawaani to balance the nine planetary energies. Authentic Vedic rituals for career, health, and peace.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 5: Shani Dev Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-shani-dev-jaap',
  'Shani Dev Jaap – Relief from Sade Sati and Dhaiya',
  'शनि देव जाप – साढ़े साती और ढैय्या से राहत',
  'Shani Dev Jaap helps reduce malefic effects of Shani grah including Sade Sati and Dhaiya. Performed by Vedic priests at Asthawaani.',
  'शनि देव जाप शनि ग्रह के अशुभ प्रभावों जैसे साढ़े साती और ढैय्या को कम करने में सहायक है। आस्थावाणी में वैदिक पुरोहितों द्वारा संपन्न।',
  '<p>Shani Dev Jaap helps reduce the malefic effects of Shani grah. Shani governs karma, discipline, and justice. When Shani is unfavourable, it can bring delays, struggles, and stress.</p>

<details>
  <summary>Shani Sade Sati & Dhaiya</summary>
  <ul>
    <li>During Sade Sati and Dhaiya, Shani Dev Jaap provides protection, patience, and strength to overcome difficulties.</li>
  </ul>
</details>

<details>
  <summary>Benefits of Shani Dev Jaap</summary>
  <ul>
    <li>Reduction in hardships</li>
    <li>Mental strength and stability</li>
    <li>Improvement in career and finances</li>
  </ul>
</details>

<p>👉 Start your Shani Dev Jaap with Asthawaani today.</p>',

  '<p>शनि देव जाप शनि ग्रह के अशुभ प्रभावों को कम करने में सहायक है। शनि कर्म, अनुशासन और न्याय को नियंत्रित करते हैं। जब शनि प्रतिकूल होते हैं, तो देरी, संघर्ष और तनाव ला सकते हैं।</p>

<details>
  <summary>शनि साढ़े साती और ढैय्या</summary>
  <ul>
    <li>साढ़े साती और ढैय्या के दौरान शनि देव जाप कठिनाइयों से उबरने के लिए सुरक्षा, धैर्य और शक्ति प्रदान करता है।</li>
  </ul>
</details>

<details>
  <summary>शनि देव जाप के लाभ</summary>
  <ul>
    <li>कठिनाइयों में कमी</li>
    <li>मानसिक शक्ति और स्थिरता</li>
    <li>करियर और वित्त में सुधार</li>
  </ul>
</details>

<p>👉 आज ही आस्थावाणी के साथ शनि देव जाप शुरू करें।</p>',

  'Shani Dev Jaap – Sade Sati & Dhaiya Relief | Asthawaani',
  'Book Shani Dev Jaap with Asthawaani for relief from Sade Sati and Dhaiya. Reduce hardships and gain mental strength.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 6: Surya Dev Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-surya-dev-jaap',
  'Surya Dev Jaap – Strength, Health & Success Through Divine Energy',
  'सूर्य देव जाप – दिव्य ऊर्जा से शक्ति, स्वास्थ्य और सफलता',
  'Surya Dev Jaap strengthens solar energy for health, confidence, and career growth. Performed by Vedic priests at Asthawaani.',
  'सूर्य देव जाप स्वास्थ्य, आत्मविश्वास और करियर विकास के लिए सौर ऊर्जा को मजबूत करता है। आस्थावाणी में वैदिक पुरोहितों द्वारा संपन्न।',
  '<p>Surya Dev represents energy, confidence, health, and authority. When Surya grah is weak or afflicted, a person may face health issues, lack of confidence, or career obstacles. Surya Dev Jaap helps strengthen solar energy and brings clarity and vitality into life.</p>

<details>
  <summary>Benefits of Surya Dev Jaap</summary>
  <ul>
    <li>Improved health and immunity</li>
    <li>Growth in career and leadership</li>
    <li>Increased confidence and positivity</li>
  </ul>
</details>

<details>
  <summary>Who Should Perform Surya Jaap</summary>
  <ul>
    <li>People facing career stagnation</li>
    <li>Health-related concerns</li>
    <li>Weak Surya in horoscope</li>
  </ul>
</details>

<p>👉 Book Surya Dev Jaap online with Asthawaani for divine strength.</p>',

  '<p>सूर्य देव ऊर्जा, आत्मविश्वास, स्वास्थ्य और अधिकार का प्रतिनिधित्व करते हैं। जब सूर्य ग्रह कमजोर या पीड़ित होता है, तो व्यक्ति को स्वास्थ्य समस्याओं, आत्मविश्वास की कमी या करियर में बाधाओं का सामना करना पड़ सकता है। सूर्य देव जाप सौर ऊर्जा को मजबूत करता है और जीवन में स्पष्टता और जीवनशक्ति लाता है।</p>

<details>
  <summary>सूर्य देव जाप के लाभ</summary>
  <ul>
    <li>स्वास्थ्य और प्रतिरक्षा में सुधार</li>
    <li>करियर और नेतृत्व में विकास</li>
    <li>आत्मविश्वास और सकारात्मकता में वृद्धि</li>
  </ul>
</details>

<details>
  <summary>सूर्य जाप किसे करना चाहिए</summary>
  <ul>
    <li>करियर में ठहराव का सामना करने वाले लोग</li>
    <li>स्वास्थ्य संबंधी चिंताएँ</li>
    <li>कुंडली में कमजोर सूर्य</li>
  </ul>
</details>

<p>👉 दिव्य शक्ति के लिए आस्थावाणी के साथ ऑनलाइन सूर्य देव जाप बुक करें।</p>',

  'Surya Dev Jaap – Strength, Health & Success | Asthawaani',
  'Book Surya Dev Jaap with Asthawaani for improved health, career growth, and confidence through divine solar energy.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 7: Chandra Dev Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-chandra-dev-jaap',
  'Chandra Dev Jaap – Peace, Emotional Balance & Mental Stability',
  'चंद्र देव जाप – शांति, भावनात्मक संतुलन और मानसिक स्थिरता',
  'Chandra Dev Jaap calms the mind and restores emotional harmony. For mental peace and stability by Asthawaani.',
  'चंद्र देव जाप मन को शांत करता है और भावनात्मक सामंजस्य पुनर्स्थापित करता है। आस्थावाणी द्वारा मानसिक शांति और स्थिरता के लिए।',
  '<p>Chandra Dev governs the mind, emotions, and peace. A disturbed Moon can cause stress, anxiety, mood swings, and lack of mental clarity. Chandra Dev Jaap calms the mind and restores emotional harmony.</p>

<details>
  <summary>Benefits of Chandra Dev Jaap</summary>
  <ul>
    <li>Mental peace and calmness</li>
    <li>Emotional balance</li>
    <li>Better sleep and focus</li>
  </ul>
</details>

<p>👉 Experience inner peace with Chandra Dev Jaap by Asthawaani.</p>',

  '<p>चंद्र देव मन, भावनाओं और शांति को नियंत्रित करते हैं। अशांत चंद्रमा तनाव, चिंता, मनोदशा में उतार-चढ़ाव और मानसिक स्पष्टता की कमी का कारण बन सकता है। चंद्र देव जाप मन को शांत करता है और भावनात्मक सामंजस्य पुनर्स्थापित करता है।</p>

<details>
  <summary>चंद्र देव जाप के लाभ</summary>
  <ul>
    <li>मानसिक शांति और सुकून</li>
    <li>भावनात्मक संतुलन</li>
    <li>बेहतर नींद और एकाग्रता</li>
  </ul>
</details>

<p>👉 आस्थावाणी द्वारा चंद्र देव जाप से आंतरिक शांति का अनुभव करें।</p>',

  'Chandra Dev Jaap – Peace & Emotional Balance | Asthawaani',
  'Book Chandra Dev Jaap with Asthawaani for mental peace, emotional balance, and better sleep. Calm your mind with sacred chanting.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 8: Mangal Dev Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-mangal-dev-jaap',
  'Mangal Dev Jaap – Relief from Mangal Dosh & Relationship Issues',
  'मंगल देव जाप – मंगल दोष और रिश्तों की समस्याओं से राहत',
  'Mangal Dev Jaap reduces aggressive energies and brings harmony. Relief from Mangal Dosh by Asthawaani.',
  'मंगल देव जाप आक्रामक ऊर्जाओं को कम करता है और सामंजस्य लाता है। आस्थावाणी द्वारा मंगल दोष से राहत।',
  '<p>Mangal Dev influences courage, energy, and relationships. Mangal Dosh can delay marriage and create conflicts. Mangal Dev Jaap helps reduce aggressive energies and brings harmony.</p>

<details>
  <summary>Benefits of Mangal Dev Jaap</summary>
  <ul>
    <li>Mangal dosh shanti</li>
    <li>Peaceful relationships</li>
    <li>Improved confidence</li>
  </ul>
</details>

<p>👉 Start Mangal Dev Jaap with Asthawaani today.</p>',

  '<p>मंगल देव साहस, ऊर्जा और रिश्तों को प्रभावित करते हैं। मंगल दोष विवाह में देरी और संघर्ष पैदा कर सकता है। मंगल देव जाप आक्रामक ऊर्जाओं को कम करने और सामंजस्य लाने में मदद करता है।</p>

<details>
  <summary>मंगल देव जाप के लाभ</summary>
  <ul>
    <li>मंगल दोष शांति</li>
    <li>शांतिपूर्ण रिश्ते</li>
    <li>आत्मविश्वास में सुधार</li>
  </ul>
</details>

<p>👉 आज ही आस्थावाणी के साथ मंगल देव जाप शुरू करें।</p>',

  'Mangal Dev Jaap – Mangal Dosh Relief | Asthawaani',
  'Book Mangal Dev Jaap with Asthawaani for Mangal Dosh shanti, peaceful relationships, and improved confidence.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 9: Budh Dev Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-budh-dev-jaap',
  'Budh Dev Jaap – Intelligence, Communication & Business Growth',
  'बुध देव जाप – बुद्धि, संवाद और व्यापार वृद्धि',
  'Budh Dev Jaap sharpens intellect and improves clarity for studies, business, and communication. By Asthawaani.',
  'बुध देव जाप बुद्धि को तेज करता है और अध्ययन, व्यापार और संवाद के लिए स्पष्टता में सुधार करता है। आस्थावाणी द्वारा।',
  '<p>Budh Dev controls intelligence, communication, and financial decision-making. Weak Budh can affect studies, business, and speech. Budh Dev Jaap sharpens intellect and improves clarity.</p>

<details>
  <summary>Benefits of Budh Dev Jaap</summary>
  <ul>
    <li>Improved learning ability</li>
    <li>Business and financial growth</li>
    <li>Clear communication</li>
  </ul>
</details>

<p>👉 Book Budh Dev Jaap for wisdom and success.</p>',

  '<p>बुध देव बुद्धि, संवाद और वित्तीय निर्णय लेने की क्षमता को नियंत्रित करते हैं। कमजोर बुध अध्ययन, व्यापार और वाणी को प्रभावित कर सकता है। बुध देव जाप बुद्धि को तेज करता है और स्पष्टता में सुधार करता है।</p>

<details>
  <summary>बुध देव जाप के लाभ</summary>
  <ul>
    <li>सीखने की क्षमता में सुधार</li>
    <li>व्यापार और वित्तीय वृद्धि</li>
    <li>स्पष्ट संवाद</li>
  </ul>
</details>

<p>👉 ज्ञान और सफलता के लिए बुध देव जाप बुक करें।</p>',

  'Budh Dev Jaap – Intelligence & Business Growth | Asthawaani',
  'Book Budh Dev Jaap with Asthawaani for improved intellect, business growth, and clear communication.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 10: Guru / Brihaspati Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-guru-grah-jaap',
  'Guru Grah Jaap – Wisdom, Prosperity & Spiritual Growth',
  'गुरु ग्रह जाप – ज्ञान, समृद्धि और आध्यात्मिक विकास',
  'Guru Grah Jaap attracts prosperity, wisdom, and divine guidance. By Vedic priests at Asthawaani.',
  'गुरु ग्रह जाप समृद्धि, ज्ञान और दिव्य मार्गदर्शन को आकर्षित करता है। आस्थावाणी में वैदिक पुरोहितों द्वारा।',
  '<p>Guru or Brihaspati Dev signifies knowledge, blessings, and expansion. Guru Grah Jaap helps attract prosperity, wisdom, and divine guidance.</p>

<details>
  <summary>Benefits of Guru Grah Jaap</summary>
  <ul>
    <li>Financial stability</li>
    <li>Career and education growth</li>
    <li>Spiritual clarity</li>
  </ul>
</details>

<p>👉 Invoke Guru''s blessings with Asthawaani.</p>',

  '<p>गुरु या बृहस्पति देव ज्ञान, आशीर्वाद और विस्तार का प्रतीक हैं। गुरु ग्रह जाप समृद्धि, ज्ञान और दिव्य मार्गदर्शन को आकर्षित करने में सहायक है।</p>

<details>
  <summary>गुरु ग्रह जाप के लाभ</summary>
  <ul>
    <li>आर्थिक स्थिरता</li>
    <li>करियर और शिक्षा में विकास</li>
    <li>आध्यात्मिक स्पष्टता</li>
  </ul>
</details>

<p>👉 आस्थावाणी के साथ गुरु का आशीर्वाद प्राप्त करें।</p>',

  'Guru Grah Jaap – Wisdom & Prosperity | Asthawaani',
  'Book Guru Grah Jaap with Asthawaani for financial stability, career growth, and spiritual wisdom.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 11: Shukra Dev Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-shukra-grah-jaap',
  'Shukra Dev Jaap – Love, Luxury & Relationship Harmony',
  'शुक्र देव जाप – प्रेम, विलासिता और रिश्तों में सामंजस्य',
  'Shukra Dev Jaap balances desires and improves relationships. For love and marital happiness by Asthawaani.',
  'शुक्र देव जाप इच्छाओं को संतुलित करता है और रिश्तों में सुधार करता है। आस्थावाणी द्वारा प्रेम और वैवाहिक सुख के लिए।',
  '<p>Shukra Dev represents love, beauty, comfort, and marital happiness. Shukra Dev Jaap helps balance desires and improve relationships.</p>

<details>
  <summary>Benefits of Shukra Dev Jaap</summary>
  <ul>
    <li>Happy married life</li>
    <li>Financial comfort</li>
    <li>Attraction of positivity</li>
  </ul>
</details>

<p>👉 Book Shukra Dev Jaap online today.</p>',

  '<p>शुक्र देव प्रेम, सौंदर्य, आराम और वैवाहिक सुख का प्रतिनिधित्व करते हैं। शुक्र देव जाप इच्छाओं को संतुलित करने और रिश्तों में सुधार करने में सहायक है।</p>

<details>
  <summary>शुक्र देव जाप के लाभ</summary>
  <ul>
    <li>सुखी वैवाहिक जीवन</li>
    <li>आर्थिक सुख-सुविधा</li>
    <li>सकारात्मकता का आकर्षण</li>
  </ul>
</details>

<p>👉 आज ही ऑनलाइन शुक्र देव जाप बुक करें।</p>',

  'Shukra Dev Jaap – Love & Relationship Harmony | Asthawaani',
  'Book Shukra Dev Jaap with Asthawaani for happy married life, financial comfort, and relationship harmony.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 12: Rahu Grah Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-rahu-grah-jaap',
  'Rahu Grah Jaap – Protection from Confusion & Sudden Problems',
  'राहु ग्रह जाप – भ्रम और अचानक समस्याओं से सुरक्षा',
  'Rahu Grah Jaap brings clarity, protection, and stability. Relief from fear and unexpected obstacles by Asthawaani.',
  'राहु ग्रह जाप स्पष्टता, सुरक्षा और स्थिरता लाता है। आस्थावाणी द्वारा भय और अप्रत्याशित बाधाओं से राहत।',
  '<p>Rahu Grah creates illusion, fear, and unexpected obstacles. Rahu Grah Jaap brings clarity, protection, and stability.</p>

<details>
  <summary>Benefits of Rahu Grah Jaap</summary>
  <ul>
    <li>Reduced fear and anxiety</li>
    <li>Protection from sudden losses</li>
    <li>Mental clarity</li>
  </ul>
</details>

<p>👉 Perform Rahu Grah Jaap with Asthawaani.</p>',

  '<p>राहु ग्रह भ्रम, भय और अप्रत्याशित बाधाएँ उत्पन्न करता है। राहु ग्रह जाप स्पष्टता, सुरक्षा और स्थिरता लाता है।</p>

<details>
  <summary>राहु ग्रह जाप के लाभ</summary>
  <ul>
    <li>भय और चिंता में कमी</li>
    <li>अचानक हानि से सुरक्षा</li>
    <li>मानसिक स्पष्टता</li>
  </ul>
</details>

<p>👉 आस्थावाणी के साथ राहु ग्रह जाप करें।</p>',

  'Rahu Grah Jaap – Protection from Confusion | Asthawaani',
  'Book Rahu Grah Jaap with Asthawaani for protection from fear, sudden problems, and mental clarity.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 13: Ketu Grah Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'navgrah-ketu-grah-jaap',
  'Ketu Grah Jaap – Spiritual Protection & Detachment',
  'केतु ग्रह जाप – आध्यात्मिक सुरक्षा और वैराग्य',
  'Ketu Grah Jaap removes hidden obstacles and spiritual confusion. For spiritual growth by Asthawaani.',
  'केतु ग्रह जाप छिपी बाधाओं और आध्यात्मिक भ्रम को दूर करता है। आस्थावाणी द्वारा आध्यात्मिक विकास के लिए।',
  '<p>Ketu Dev influences spirituality and detachment. Ketu Grah Jaap helps remove hidden obstacles and spiritual confusion.</p>

<details>
  <summary>Benefits of Ketu Grah Jaap</summary>
  <ul>
    <li>Spiritual growth</li>
    <li>Protection from negativity</li>
    <li>Inner clarity</li>
  </ul>
</details>

<p>👉 Book Ketu Grah Jaap online now.</p>',

  '<p>केतु देव आध्यात्मिकता और वैराग्य को प्रभावित करते हैं। केतु ग्रह जाप छिपी बाधाओं और आध्यात्मिक भ्रम को दूर करने में सहायक है।</p>

<details>
  <summary>केतु ग्रह जाप के लाभ</summary>
  <ul>
    <li>आध्यात्मिक विकास</li>
    <li>नकारात्मकता से सुरक्षा</li>
    <li>आंतरिक स्पष्टता</li>
  </ul>
</details>

<p>👉 अभी ऑनलाइन केतु ग्रह जाप बुक करें।</p>',

  'Ketu Grah Jaap – Spiritual Protection | Asthawaani',
  'Book Ketu Grah Jaap with Asthawaani for spiritual growth, protection from negativity, and inner clarity.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 14: Daily Mantra Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'daily-jaap',
  'Daily Mantra Jaap – Create a Powerful Spiritual Routine',
  'दैनिक मंत्र जाप – एक शक्तिशाली आध्यात्मिक दिनचर्या बनाएं',
  'Daily Mantra Jaap builds discipline, positivity, and long-term peace. Start your daily spiritual routine with Asthawaani.',
  'दैनिक मंत्र जाप अनुशासन, सकारात्मकता और दीर्घकालिक शांति का निर्माण करता है। आस्थावाणी के साथ अपनी दैनिक आध्यात्मिक दिनचर्या शुरू करें।',
  '<p>Daily Mantra Jaap builds discipline, positivity, and long-term peace. Regular chanting keeps negative energies away and strengthens faith.</p>

<details>
  <summary>Benefits of Daily Mantra Jaap</summary>
  <ul>
    <li>Builds spiritual discipline</li>
    <li>Long-term positivity and peace</li>
    <li>Keeps negative energies away</li>
    <li>Strengthens faith and devotion</li>
  </ul>
</details>

<details>
  <summary>How to Start Daily Jaap</summary>
  <ul>
    <li>Choose a mantra that resonates with you</li>
    <li>Set a fixed time each day</li>
    <li>Chant with focus and devotion</li>
    <li>Join Asthawaani for guided daily jaap</li>
  </ul>
</details>

<p>👉 Start your daily jaap routine with Asthawaani.</p>',

  '<p>दैनिक मंत्र जाप अनुशासन, सकारात्मकता और दीर्घकालिक शांति का निर्माण करता है। नियमित जाप नकारात्मक ऊर्जाओं को दूर रखता है और विश्वास को मजबूत करता है।</p>

<details>
  <summary>दैनिक मंत्र जाप के लाभ</summary>
  <ul>
    <li>आध्यात्मिक अनुशासन का निर्माण</li>
    <li>दीर्घकालिक सकारात्मकता और शांति</li>
    <li>नकारात्मक ऊर्जाओं को दूर रखता है</li>
    <li>विश्वास और भक्ति को मजबूत करता है</li>
  </ul>
</details>

<details>
  <summary>दैनिक जाप कैसे शुरू करें</summary>
  <ul>
    <li>अपने अनुकूल मंत्र चुनें</li>
    <li>प्रतिदिन एक निश्चित समय तय करें</li>
    <li>एकाग्रता और भक्ति के साथ जाप करें</li>
    <li>निर्देशित दैनिक जाप के लिए आस्थावाणी से जुड़ें</li>
  </ul>
</details>

<p>👉 आस्थावाणी के साथ अपनी दैनिक जाप दिनचर्या शुरू करें।</p>',

  'Daily Mantra Jaap – Spiritual Routine | Asthawaani',
  'Start Daily Mantra Jaap with Asthawaani for discipline, positivity, and long-term spiritual peace.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- PAGE 15: Aaj ka Jaap
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES (
  'aaj-ka-jaap',
  'Aaj ka Jaap – Today''s Sacred Mantra for You',
  'आज का जाप – आज का पवित्र मंत्र आपके लिए',
  'Aaj ka Jaap is specially selected for the day''s planetary influence. Perform today''s jaap for instant balance and peace with Asthawaani.',
  'आज का जाप दिन के ग्रह प्रभाव के लिए विशेष रूप से चुना गया है। आस्थावाणी के साथ तत्काल संतुलन और शांति के लिए आज का जाप करें।',
  '<p>Aaj ka Jaap is specially selected for the day''s planetary influence. Performing today''s jaap brings instant balance and peace.</p>

<details>
  <summary>Why Perform Aaj ka Jaap?</summary>
  <ul>
    <li>Aligned with today''s planetary energy</li>
    <li>Instant spiritual balance</li>
    <li>Daily protection and positivity</li>
    <li>Simple and effective practice</li>
  </ul>
</details>

<details>
  <summary>How Aaj ka Jaap Works</summary>
  <ul>
    <li>Each day is governed by a specific planet. Aaj ka Jaap selects the appropriate mantra for the ruling planet of the day, maximizing spiritual benefit and cosmic alignment.</li>
  </ul>
</details>

<p>👉 Perform Aaj ka Jaap with Asthawaani today.</p>',

  '<p>आज का जाप दिन के ग्रह प्रभाव के लिए विशेष रूप से चुना गया है। आज का जाप करने से तत्काल संतुलन और शांति मिलती है।</p>

<details>
  <summary>आज का जाप क्यों करें?</summary>
  <ul>
    <li>आज की ग्रह ऊर्जा के अनुरूप</li>
    <li>तत्काल आध्यात्मिक संतुलन</li>
    <li>दैनिक सुरक्षा और सकारात्मकता</li>
    <li>सरल और प्रभावी साधना</li>
  </ul>
</details>

<details>
  <summary>आज का जाप कैसे काम करता है</summary>
  <ul>
    <li>प्रत्येक दिन एक विशेष ग्रह द्वारा शासित होता है। आज का जाप दिन के शासक ग्रह के लिए उपयुक्त मंत्र का चयन करता है, जिससे आध्यात्मिक लाभ और ब्रह्मांडीय संरेखण अधिकतम होता है।</li>
  </ul>
</details>

<p>👉 आज ही आस्थावाणी के साथ आज का जाप करें।</p>',

  'Aaj ka Jaap – Today''s Sacred Mantra | Asthawaani',
  'Perform Aaj ka Jaap with Asthawaani. Today''s specially selected mantra for instant spiritual balance and peace.',
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;
