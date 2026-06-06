-- ============================================
-- Asthawaani Blog/Post Seed Data — Batch 2
-- 10 new blog posts (English + Hindi) with SEO meta
-- Assigned to categories via post_categories junction
-- Run in Supabase Dashboard > SQL Editor
-- ============================================

-- ---------- 1. Seed Categories (idempotent) ----------
INSERT INTO categories (slug, name, name_hi, description, description_hi) VALUES
  ('spiritual-practices', 'Spiritual Practices', 'आध्यात्मिक साधना', 'Daily sadhana, jaap, meditation and rituals', 'दैनिक साधना, जाप, ध्यान और अनुष्ठान'),
  ('festivals-and-vrat', 'Festivals & Vrat', 'त्योहार और व्रत', 'Hindu festivals, vrat katha and observances', 'हिंदू त्योहार, व्रत कथा और परंपराएँ'),
  ('braj-and-pilgrimage', 'Braj & Pilgrimage', 'ब्रज और तीर्थ', 'Mathura, Vrindavan, Govardhan and sacred yatras', 'मथुरा, वृंदावन, गोवर्धन और पवित्र यात्राएँ'),
  ('devotional-wisdom', 'Devotional Wisdom', 'भक्ति ज्ञान', 'Bhakti, Gita teachings and saint wisdom', 'भक्ति, गीता उपदेश और संत ज्ञान'),
  ('mantras-and-stotras', 'Mantras & Stotras', 'मंत्र और स्तोत्र', 'Powerful mantras, stotras and their meanings', 'शक्तिशाली मंत्र, स्तोत्र और उनके अर्थ')
ON CONFLICT (slug) DO NOTHING;

-- ---------- 2. Insert 10 New Posts ----------
INSERT INTO posts (slug, title, title_hi, excerpt, excerpt_hi, content, content_hi, meta_title, meta_description, status, published_at)
VALUES
(
  'morning-meditation-benefits',
  'Morning Meditation – 7 Spiritual & Mental Benefits of Starting Your Day with Dhyana',
  'प्रातः ध्यान – दिन की शुरुआत ध्यान से करने के 7 आध्यात्मिक और मानसिक लाभ',
  'Discover how just 15 minutes of morning meditation can transform your mind, energy, and spiritual focus. A complete guide from Asthawaani.',
  'जानिए कैसे केवल 15 मिनट का प्रातः ध्यान आपके मन, ऊर्जा और आध्यात्मिक एकाग्रता को बदल सकता है। आस्थावाणी की पूर्ण मार्गदर्शिका।',
  '<p>Morning meditation, or <strong>Pratah Dhyana</strong>, is one of the most powerful spiritual practices recommended in the Vedas. The Brahma Muhurta — roughly 90 minutes before sunrise — is considered the most sattvic time of the day, when the mind is naturally calm and receptive.</p><p>At Asthawaani, sadhakas begin every day with guided dhyana to align body, breath, and consciousness.</p><details><summary>1. Mental clarity and focus</summary><ul><li>Reduces brain fog and improves decision-making throughout the day.</li></ul></details><details><summary>2. Lower stress and anxiety</summary><ul><li>Activates the parasympathetic nervous system and lowers cortisol levels.</li></ul></details><details><summary>3. Better emotional balance</summary><ul><li>Helps you respond instead of react to daily situations.</li></ul></details><details><summary>4. Deeper spiritual connection</summary><ul><li>Strengthens your bond with the Divine through silence and inner listening.</li></ul></details><details><summary>5. Improved sleep cycle</summary><ul><li>Regulates your body clock and improves sleep quality at night.</li></ul></details><details><summary>6. Stronger willpower</summary><ul><li>Builds discipline that flows into every other area of life.</li></ul></details><details><summary>7. Awakening of inner joy</summary><ul><li>Reveals the steady ananda that lies beneath thought.</li></ul></details><p>👉 Join Asthawaani''s daily morning dhyana sessions and experience the difference within 21 days.</p>',
  '<p>प्रातः ध्यान या <strong>प्रातः साधना</strong> वेदों में बताई गई सबसे शक्तिशाली आध्यात्मिक साधनाओं में से एक है। ब्रह्म मुहूर्त — सूर्योदय से लगभग 90 मिनट पहले — दिन का सबसे सात्विक समय माना जाता है, जब मन स्वाभाविक रूप से शांत और ग्रहणशील होता है।</p><p>आस्थावाणी में साधक प्रत्येक दिन की शुरुआत निर्देशित ध्यान से करते हैं ताकि शरीर, श्वास और चेतना एक हो सकें।</p><details><summary>1. मानसिक स्पष्टता और एकाग्रता</summary><ul><li>दिन भर निर्णय लेने की क्षमता और स्पष्टता बढ़ाता है।</li></ul></details><details><summary>2. तनाव और चिंता में कमी</summary><ul><li>परासहानुभूति तंत्र को सक्रिय कर कोर्टिसोल कम करता है।</li></ul></details><details><summary>3. भावनात्मक संतुलन</summary><ul><li>प्रतिक्रिया के स्थान पर सजग उत्तर देने की शक्ति आती है।</li></ul></details><details><summary>4. गहरा आध्यात्मिक जुड़ाव</summary><ul><li>मौन और आंतरिक श्रवण से ईश्वर से संबंध दृढ़ होता है।</li></ul></details><details><summary>5. बेहतर नींद चक्र</summary><ul><li>शरीर की जैविक घड़ी संतुलित होती है।</li></ul></details><details><summary>6. प्रबल इच्छाशक्ति</summary><ul><li>अनुशासन जीवन के हर क्षेत्र में दिखाई देता है।</li></ul></details><details><summary>7. आंतरिक आनंद का जागरण</summary><ul><li>विचारों के नीचे स्थित स्थिर आनंद प्रकट होता है।</li></ul></details><p>👉 आस्थावाणी के दैनिक प्रातः ध्यान सत्र से जुड़ें और 21 दिनों में अंतर अनुभव करें।</p>',
  'Morning Meditation Benefits – 7 Reasons to Start Dhyana | Asthawaani',
  '7 powerful spiritual & mental benefits of morning meditation. Learn how Brahma Muhurta dhyana transforms focus, peace and inner joy. Asthawaani guide.',
  'published', NOW()
),
(
  'gayatri-mantra-meaning-power',
  'Gayatri Mantra – Meaning, Power, Pronunciation & Spiritual Benefits',
  'गायत्री मंत्र – अर्थ, शक्ति, उच्चारण और आध्यात्मिक लाभ',
  'A complete guide to the Gayatri Mantra: word-by-word meaning, correct chanting method, and the spiritual benefits described in the Vedas.',
  'गायत्री मंत्र की पूर्ण मार्गदर्शिका: शब्द-दर-शब्द अर्थ, सही जाप विधि और वेदों में वर्णित आध्यात्मिक लाभ।',
  '<p>The <strong>Gayatri Mantra</strong> is considered the mother of all Vedic mantras. Revealed to Rishi Vishwamitra, it is a prayer to Savitr, the radiant solar form of the Divine, asking for the awakening of the highest intellect.</p><p>"Om Bhur Bhuvah Swaha, Tat Savitur Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayat."</p><details><summary>Word-by-word meaning</summary><ul><li>Om — primordial sound; Bhur Bhuvah Swaha — three worlds; Tat Savitur Varenyam — that adorable supreme; Bhargo Devasya Dheemahi — we meditate on that divine light; Dhiyo Yo Nah Prachodayat — may it inspire our intellect.</li></ul></details><details><summary>Correct chanting method</summary><ul><li>Best chanted at sunrise, noon, and sunset (Sandhya).</li><li>Use a rudraksha or tulsi mala of 108 beads.</li><li>Maintain stable spine and steady breath.</li></ul></details><details><summary>Spiritual benefits</summary><ul><li>Sharpens intellect and memory.</li><li>Destroys negative karmas.</li><li>Awakens the inner solar energy.</li><li>Brings peace, protection and clarity.</li></ul></details><p>👉 Begin your Gayatri sadhana with Asthawaani''s guided 40-day program.</p>',
  '<p><strong>गायत्री मंत्र</strong> सभी वैदिक मंत्रों की माता मानी जाती है। ऋषि विश्वामित्र को प्रकट यह मंत्र सूर्य के तेजोमय रूप सवित्र की स्तुति है, जो श्रेष्ठ बुद्धि की प्रेरणा देती है।</p><p>"ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं। भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥"</p><details><summary>शब्द-दर-शब्द अर्थ</summary><ul><li>ॐ — आदि ध्वनि; भूर्भुवः स्वः — तीन लोक; तत्सवितुर्वरेण्यं — वह श्रेष्ठ सवित्र; भर्गो देवस्य धीमहि — उस दिव्य तेज का ध्यान करते हैं; धियो यो नः प्रचोदयात् — हमारी बुद्धि को प्रेरित करे।</li></ul></details><details><summary>सही जाप विधि</summary><ul><li>सूर्योदय, मध्याह्न और सूर्यास्त (संध्या) में जाप उत्तम है।</li><li>108 दानों की रुद्राक्ष या तुलसी माला का प्रयोग करें।</li><li>रीढ़ सीधी और श्वास स्थिर रखें।</li></ul></details><details><summary>आध्यात्मिक लाभ</summary><ul><li>बुद्धि और स्मरण शक्ति बढ़ाता है।</li><li>नकारात्मक कर्मों का नाश करता है।</li><li>आंतरिक सौर ऊर्जा जागृत करता है।</li><li>शांति, सुरक्षा और स्पष्टता लाता है।</li></ul></details><p>👉 आस्थावाणी के 40-दिवसीय निर्देशित कार्यक्रम से गायत्री साधना आरंभ करें।</p>',
  'Gayatri Mantra – Meaning, Power & Benefits | Asthawaani',
  'Learn the meaning, correct pronunciation and spiritual benefits of the Gayatri Mantra. A complete Vedic guide from Asthawaani.',
  'published', NOW()
),
(
  'tulsi-plant-spiritual-significance',
  'Tulsi Plant – Spiritual Significance, Daily Worship & Health Benefits',
  'तुलसी पौधा – आध्यात्मिक महत्व, दैनिक पूजा और स्वास्थ्य लाभ',
  'Why Tulsi is called the holiest plant in Hinduism — spiritual significance, daily puja vidhi and Ayurvedic benefits explained.',
  'हिंदू धर्म में तुलसी को सबसे पवित्र पौधा क्यों कहा जाता है — आध्यात्मिक महत्व, दैनिक पूजा विधि और आयुर्वेदिक लाभ।',
  '<p>The <strong>Tulsi plant</strong> (Holy Basil) is revered as Goddess Lakshmi herself and is the only plant worshipped in every devout Hindu home. Lord Krishna accepts only those offerings that include a Tulsi leaf.</p><details><summary>Spiritual significance</summary><ul><li>Symbol of purity and devotion.</li><li>Protects the home from negative energies.</li><li>Considered a direct path to Vaikuntha.</li></ul></details><details><summary>Daily worship vidhi</summary><ul><li>Water the plant every morning after bathing.</li><li>Light a diya in the evening.</li><li>Chant "Om Tulasyai Namah" 11 times.</li><li>Never pluck leaves on Sundays, Ekadashi or after sunset.</li></ul></details><details><summary>Ayurvedic & health benefits</summary><ul><li>Boosts immunity and respiratory health.</li><li>Reduces stress and balances cortisol.</li><li>Purifies the air around the home.</li></ul></details><p>👉 Bring a Tulsi plant home and begin daily worship with Asthawaani''s guided rituals.</p>',
  '<p><strong>तुलसी पौधा</strong> स्वयं लक्ष्मी देवी के रूप में पूजनीय है और यह एकमात्र पौधा है जिसकी प्रत्येक भक्त के घर में पूजा होती है। भगवान कृष्ण केवल तुलसी पत्र युक्त भोग ही स्वीकार करते हैं।</p><details><summary>आध्यात्मिक महत्व</summary><ul><li>शुद्धता और भक्ति का प्रतीक।</li><li>घर को नकारात्मक ऊर्जा से बचाता है।</li><li>वैकुंठ का सीधा मार्ग माना जाता है।</li></ul></details><details><summary>दैनिक पूजा विधि</summary><ul><li>स्नान के बाद प्रतिदिन जल अर्पित करें।</li><li>संध्या समय दीपक जलाएँ।</li><li>"ॐ तुलस्यै नमः" 11 बार जप करें।</li><li>रविवार, एकादशी और सूर्यास्त के बाद पत्ते न तोड़ें।</li></ul></details><details><summary>आयुर्वेदिक एवं स्वास्थ्य लाभ</summary><ul><li>प्रतिरक्षा और श्वसन स्वास्थ्य बढ़ाता है।</li><li>तनाव कम कर कोर्टिसोल संतुलित करता है।</li><li>घर की वायु शुद्ध करता है।</li></ul></details><p>👉 घर में तुलसी लाएँ और आस्थावाणी की निर्देशित विधि से दैनिक पूजा आरंभ करें।</p>',
  'Tulsi Plant – Spiritual Significance & Benefits | Asthawaani',
  'Discover the spiritual significance of Tulsi, daily worship vidhi and Ayurvedic benefits. Complete guide from Asthawaani.',
  'published', NOW()
),
(
  'ekadashi-vrat-significance',
  'Ekadashi Vrat – Significance, Rules and Spiritual Benefits',
  'एकादशी व्रत – महत्व, नियम और आध्यात्मिक लाभ',
  'Ekadashi falls twice a month and is the most powerful vrat for Lord Vishnu''s devotees. Learn its rules, fasting method and spiritual rewards.',
  'एकादशी प्रत्येक माह दो बार आती है और भगवान विष्णु के भक्तों के लिए सबसे शक्तिशाली व्रत है। जानें इसके नियम, उपवास विधि और आध्यात्मिक फल।',
  '<p><strong>Ekadashi Vrat</strong> is observed on the 11th lunar day of both the bright and dark fortnights. It is dedicated to Lord Vishnu and is said to destroy lifetimes of accumulated karma when observed with devotion.</p><details><summary>Spiritual significance</summary><ul><li>Pleases Lord Vishnu and Goddess Lakshmi.</li><li>Burns past karmas and purifies the mind.</li><li>Strengthens vairagya (detachment).</li></ul></details><details><summary>Fasting rules</summary><ul><li>Avoid grains, beans and tamasic food.</li><li>Consume only fruits, milk, and water (or nirjala for advanced sadhakas).</li><li>Spend the day in jaap, kirtan and Vishnu Sahasranama path.</li></ul></details><details><summary>How to break the fast</summary><ul><li>Parana is done on Dwadashi morning within the prescribed window.</li><li>Offer bhog to Lord Vishnu before eating.</li></ul></details><p>👉 Asthawaani conducts live Ekadashi katha and Vishnu Sahasranama path every Ekadashi.</p>',
  '<p><strong>एकादशी व्रत</strong> शुक्ल और कृष्ण पक्ष की 11वीं तिथि को मनाया जाता है। यह भगवान विष्णु को समर्पित है और श्रद्धा से किया गया एकादशी व्रत जन्मों के संचित कर्मों का नाश करता है।</p><details><summary>आध्यात्मिक महत्व</summary><ul><li>भगवान विष्णु और लक्ष्मी प्रसन्न होती हैं।</li><li>कर्म जलाकर मन को शुद्ध करता है।</li><li>वैराग्य की शक्ति बढ़ती है।</li></ul></details><details><summary>उपवास नियम</summary><ul><li>अनाज, दालें और तामसिक भोजन त्यागें।</li><li>केवल फल, दूध, जल का सेवन करें (साधक निर्जला भी कर सकते हैं)।</li><li>दिन भर जाप, कीर्तन और विष्णु सहस्रनाम पाठ करें।</li></ul></details><details><summary>पारणा विधि</summary><ul><li>द्वादशी प्रातः शुभ मुहूर्त में पारणा करें।</li><li>भोजन से पूर्व भगवान विष्णु को भोग अर्पित करें।</li></ul></details><p>👉 आस्थावाणी प्रत्येक एकादशी पर सजीव कथा और विष्णु सहस्रनाम पाठ आयोजित करता है।</p>',
  'Ekadashi Vrat – Significance, Rules & Benefits | Asthawaani',
  'Complete guide to Ekadashi Vrat — significance, fasting rules, parana vidhi and spiritual benefits. Join live Asthawaani Ekadashi katha.',
  'published', NOW()
),
(
  'govardhan-parikrama-guide',
  'Govardhan Parikrama – Complete Guide to the Sacred 21 KM Yatra',
  'गोवर्धन परिक्रमा – पवित्र 21 किमी यात्रा की पूर्ण मार्गदर्शिका',
  'Plan your Govardhan Parikrama with Asthawaani — route, best time, rules, key stops and the spiritual benefits of this sacred 21 km walk.',
  'आस्थावाणी के साथ अपनी गोवर्धन परिक्रमा की योजना बनाएं — मार्ग, उत्तम समय, नियम, मुख्य पड़ाव और इस पवित्र 21 किमी यात्रा के आध्यात्मिक लाभ।',
  '<p><strong>Govardhan Parikrama</strong> is a 21 km circumambulation of the sacred Govardhan Hill, lifted by Lord Krishna to protect the people of Braj from Indra''s storm. Devotees believe one full parikrama destroys countless sins.</p><details><summary>Best time to go</summary><ul><li>Guru Purnima, Govardhan Puja, Kartik Purnima and Ekadashi.</li><li>Early morning starts are coolest and most peaceful.</li></ul></details><details><summary>Key stops on the route</summary><ul><li>Manasi Ganga</li><li>Mukharvind Temple</li><li>Radha Kund and Shyam Kund</li><li>Daan Ghati</li><li>Punchari Lota Baba</li></ul></details><details><summary>Rules to follow</summary><ul><li>Walk barefoot if health permits.</li><li>Maintain silence or chant "Radhe Radhe".</li><li>Do not climb the hill — it is the swarup of Krishna himself.</li></ul></details><p>👉 Book a guided Govardhan Parikrama yatra with Asthawaani from Mathura.</p>',
  '<p><strong>गोवर्धन परिक्रमा</strong> पवित्र गोवर्धन पर्वत की 21 किमी की प्रदक्षिणा है, जिसे भगवान कृष्ण ने ब्रजवासियों की रक्षा हेतु अपनी कनिष्ठा अंगुली पर उठाया था। एक पूर्ण परिक्रमा से अनगिनत पापों का नाश माना जाता है।</p><details><summary>उत्तम समय</summary><ul><li>गुरु पूर्णिमा, गोवर्धन पूजा, कार्तिक पूर्णिमा और एकादशी।</li><li>प्रातःकाल आरंभ करना सबसे शीतल और शांत रहता है।</li></ul></details><details><summary>मुख्य पड़ाव</summary><ul><li>मानसी गंगा</li><li>मुखारविंद मंदिर</li><li>राधा कुंड और श्याम कुंड</li><li>दान घाटी</li><li>पूंछरी लोटा बाबा</li></ul></details><details><summary>पालन योग्य नियम</summary><ul><li>स्वास्थ्य ठीक हो तो नंगे पैर चलें।</li><li>मौन रहें या "राधे राधे" का जाप करें।</li><li>पर्वत पर न चढ़ें — यह स्वयं कृष्ण का स्वरूप है।</li></ul></details><p>👉 आस्थावाणी के साथ मथुरा से निर्देशित गोवर्धन परिक्रमा यात्रा बुक करें।</p>',
  'Govardhan Parikrama Guide – 21 KM Sacred Yatra | Asthawaani',
  'Plan Govardhan Parikrama with route, best time, rules and key stops. Book guided 21 km yatra from Mathura with Asthawaani.',
  'published', NOW()
),
(
  'bhagavad-gita-life-lessons',
  'Bhagavad Gita – 10 Timeless Life Lessons for Modern Living',
  'भगवद गीता – आधुनिक जीवन के लिए 10 शाश्वत जीवन-शिक्षाएँ',
  'Ten powerful lessons from the Bhagavad Gita that apply directly to work, relationships and mental peace in today''s world.',
  'भगवद गीता से 10 शक्तिशाली शिक्षाएँ जो आज के कार्य, रिश्तों और मानसिक शांति में सीधे लागू होती हैं।',
  '<p>The <strong>Bhagavad Gita</strong> is a 700-verse dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra. Its wisdom transcends time and applies to every challenge of modern life.</p><details><summary>1. Do your duty without attachment</summary><ul><li>Karmanye vadhikaraste — focus on action, not the fruit.</li></ul></details><details><summary>2. The soul is eternal</summary><ul><li>Fear of loss disappears when you know the atma never dies.</li></ul></details><details><summary>3. Steady mind in pleasure and pain</summary><ul><li>Sthitaprajna is the highest state of stability.</li></ul></details><details><summary>4. Control the senses</summary><ul><li>The chariot of the body is steady only when reins are firm.</li></ul></details><details><summary>5. Choose sattva over rajas and tamas</summary><ul><li>Food, thoughts and company shape your gunas.</li></ul></details><details><summary>6. Surrender to the Divine</summary><ul><li>Sarva dharman parityajya — let go and take refuge.</li></ul></details><details><summary>7. Selfless service is the highest yoga</summary><ul><li>Work becomes worship when done for others.</li></ul></details><details><summary>8. Anger is the gateway to destruction</summary><ul><li>From anger comes delusion, from delusion loss of memory.</li></ul></details><details><summary>9. Faith shapes your destiny</summary><ul><li>You become what you believe.</li></ul></details><details><summary>10. The Divine is within you</summary><ul><li>Ishwarah sarvabhutanam — God dwells in every heart.</li></ul></details><p>👉 Join Asthawaani''s weekly Bhagavad Gita pravachan series.</p>',
  '<p><strong>भगवद गीता</strong> कुरुक्षेत्र के युद्धभूमि पर भगवान कृष्ण और अर्जुन का 700 श्लोकों का संवाद है। इसका ज्ञान काल से परे है और आज के जीवन की हर चुनौती पर लागू होता है।</p><details><summary>1. फल की चिंता किए बिना कर्म करो</summary><ul><li>कर्मण्येवाधिकारस्ते — कर्म पर ध्यान दो, फल पर नहीं।</li></ul></details><details><summary>2. आत्मा शाश्वत है</summary><ul><li>जब जान लो आत्मा कभी नहीं मरती, तब हानि का भय मिट जाता है।</li></ul></details><details><summary>3. सुख-दुख में स्थिर मन</summary><ul><li>स्थितप्रज्ञ ही सर्वोच्च अवस्था है।</li></ul></details><details><summary>4. इंद्रियों पर नियंत्रण</summary><ul><li>शरीर रूपी रथ तभी सधा रहता है जब लगाम दृढ़ हो।</li></ul></details><details><summary>5. सत्व को चुनें</summary><ul><li>भोजन, विचार और संगति आपके गुण निर्धारित करते हैं।</li></ul></details><details><summary>6. ईश्वर को समर्पण</summary><ul><li>सर्वधर्मान्परित्यज्य — छोड़ो और शरण लो।</li></ul></details><details><summary>7. निःस्वार्थ सेवा परम योग है</summary><ul><li>दूसरों के लिए किया गया कर्म पूजा बन जाता है।</li></ul></details><details><summary>8. क्रोध विनाश का द्वार है</summary><ul><li>क्रोध से मोह, मोह से स्मृति-विनाश।</li></ul></details><details><summary>9. श्रद्धा भाग्य गढ़ती है</summary><ul><li>जैसी श्रद्धा वैसा ही व्यक्ति।</li></ul></details><details><summary>10. ईश्वर तुम्हारे भीतर है</summary><ul><li>ईश्वरः सर्वभूतानाम् — हर हृदय में परमात्मा वास करते हैं।</li></ul></details><p>👉 आस्थावाणी की साप्ताहिक भगवद गीता प्रवचन श्रृंखला से जुड़ें।</p>',
  'Bhagavad Gita – 10 Life Lessons for Modern Living | Asthawaani',
  '10 timeless Bhagavad Gita lessons for work, relationships and peace. Join Asthawaani weekly Gita pravachan.',
  'published', NOW()
),
(
  'hanuman-chalisa-benefits',
  'Hanuman Chalisa – Daily Benefits, Correct Path Vidhi & Hidden Powers',
  'हनुमान चालीसा – दैनिक लाभ, सही पाठ विधि और गूढ़ शक्तियाँ',
  'Why chanting the Hanuman Chalisa daily removes fear, debt and obstacles — complete path vidhi and 11 powerful benefits.',
  'दैनिक हनुमान चालीसा पाठ क्यों भय, ऋण और बाधाओं को दूर करता है — पूर्ण पाठ विधि और 11 शक्तिशाली लाभ।',
  '<p>The <strong>Hanuman Chalisa</strong>, composed by Sant Tulsidas, is a 40-verse stotra of unmatched protective power. Reciting it daily invokes Lord Hanuman''s grace for courage, strength and removal of all obstacles.</p><details><summary>Correct path vidhi</summary><ul><li>Best chanted on Tuesday and Saturday morning.</li><li>Sit facing east or north after a bath.</li><li>Light a diya of ghee or mustard oil before Hanumanji.</li><li>Recite 1, 7, 11 or 108 times based on sankalp.</li></ul></details><details><summary>11 benefits of daily recitation</summary><ul><li>Removes fear and nightmares</li><li>Destroys black magic and evil eye</li><li>Brings courage and confidence</li><li>Clears financial debt over time</li><li>Heals body and mind</li><li>Improves focus and willpower</li><li>Protects from accidents</li><li>Strengthens devotion to Shri Ram</li><li>Pacifies Shani dosha</li><li>Removes pitru dosha</li><li>Awakens inner brahmacharya shakti</li></ul></details><p>👉 Join Asthawaani''s 40-day Hanuman Chalisa sankalp anushthan.</p>',
  '<p><strong>हनुमान चालीसा</strong>, संत तुलसीदास द्वारा रचित 40 चौपाइयों का स्तोत्र, अद्वितीय रक्षक शक्ति रखता है। दैनिक पाठ हनुमान जी की कृपा से साहस, बल और बाधाओं का नाश करता है।</p><details><summary>सही पाठ विधि</summary><ul><li>मंगलवार और शनिवार प्रातः पाठ श्रेष्ठ है।</li><li>स्नान कर पूर्व या उत्तर मुख होकर बैठें।</li><li>हनुमान जी के सम्मुख घी या सरसों के तेल का दीपक जलाएँ।</li><li>संकल्प अनुसार 1, 7, 11 या 108 बार पाठ करें।</li></ul></details><details><summary>दैनिक पाठ के 11 लाभ</summary><ul><li>भय और दुःस्वप्न का नाश</li><li>तंत्र-मंत्र और बुरी दृष्टि से रक्षा</li><li>साहस और आत्मविश्वास में वृद्धि</li><li>समय के साथ ऋण मुक्ति</li><li>शरीर और मन की चिकित्सा</li><li>एकाग्रता और संकल्प शक्ति</li><li>दुर्घटनाओं से रक्षा</li><li>श्रीराम भक्ति की दृढ़ता</li><li>शनि दोष शांति</li><li>पितृ दोष निवारण</li><li>आंतरिक ब्रह्मचर्य शक्ति का जागरण</li></ul></details><p>👉 आस्थावाणी के 40-दिवसीय हनुमान चालीसा संकल्प अनुष्ठान से जुड़ें।</p>',
  'Hanuman Chalisa – 11 Benefits & Correct Vidhi | Asthawaani',
  'Daily Hanuman Chalisa removes fear, debt and obstacles. Learn 11 benefits and correct path vidhi with Asthawaani.',
  'published', NOW()
),
(
  'navratri-9-forms-of-durga',
  'Navratri – The 9 Divine Forms of Maa Durga and Their Spiritual Powers',
  'नवरात्रि – माँ दुर्गा के 9 दिव्य स्वरूप और उनकी आध्यात्मिक शक्तियाँ',
  'A complete guide to the nine forms of Maa Durga worshipped during Navratri, their mantras, colors and the blessings each grants.',
  'नवरात्रि में पूजित माँ दुर्गा के नौ स्वरूपों, उनके मंत्रों, रंगों और प्रत्येक के आशीर्वाद की पूर्ण मार्गदर्शिका।',
  '<p><strong>Navratri</strong> celebrates the nine divine forms of Maa Durga across nine sacred nights. Each form represents a unique shakti and is invoked on a specific day with a specific color and mantra.</p><details><summary>The 9 forms</summary><ul><li>Day 1 – Shailaputri (Grey) – stability</li><li>Day 2 – Brahmacharini (Orange) – devotion</li><li>Day 3 – Chandraghanta (White) – courage</li><li>Day 4 – Kushmanda (Red) – health and energy</li><li>Day 5 – Skandamata (Royal Blue) – nurturing love</li><li>Day 6 – Katyayani (Yellow) – removal of obstacles</li><li>Day 7 – Kalaratri (Green) – destruction of fear</li><li>Day 8 – Mahagauri (Peacock Green) – purification</li><li>Day 9 – Siddhidatri (Pink) – siddhis and moksha</li></ul></details><details><summary>How to observe Navratri</summary><ul><li>Maintain sattvic diet and brahmacharya.</li><li>Light an akhand jyoti for nine days.</li><li>Chant Durga Saptashati or Argala Stotra daily.</li><li>Perform kanya pujan on Ashtami or Navami.</li></ul></details><p>👉 Join Asthawaani''s live Navratri katha and Durga Saptashati path.</p>',
  '<p><strong>नवरात्रि</strong> नौ पवित्र रात्रियों में माँ दुर्गा के नौ दिव्य स्वरूपों का उत्सव है। प्रत्येक स्वरूप एक विशिष्ट शक्ति का प्रतीक है और विशेष दिन, रंग व मंत्र के साथ पूजित होता है।</p><details><summary>9 स्वरूप</summary><ul><li>दिन 1 – शैलपुत्री (धूसर) – स्थिरता</li><li>दिन 2 – ब्रह्मचारिणी (नारंगी) – भक्ति</li><li>दिन 3 – चंद्रघंटा (श्वेत) – साहस</li><li>दिन 4 – कुष्मांडा (लाल) – स्वास्थ्य और ऊर्जा</li><li>दिन 5 – स्कंदमाता (राजसी नीला) – ममता</li><li>दिन 6 – कात्यायनी (पीला) – बाधा निवारण</li><li>दिन 7 – कालरात्रि (हरा) – भय नाश</li><li>दिन 8 – महागौरी (मयूर हरा) – शुद्धि</li><li>दिन 9 – सिद्धिदात्री (गुलाबी) – सिद्धि और मोक्ष</li></ul></details><details><summary>नवरात्रि व्रत विधि</summary><ul><li>सात्विक आहार और ब्रह्मचर्य का पालन करें।</li><li>नौ दिन अखंड ज्योति प्रज्वलित रखें।</li><li>दुर्गा सप्तशती या अर्गला स्तोत्र का पाठ करें।</li><li>अष्टमी या नवमी पर कन्या पूजन करें।</li></ul></details><p>👉 आस्थावाणी की सजीव नवरात्रि कथा और दुर्गा सप्तशती पाठ से जुड़ें।</p>',
  'Navratri – 9 Forms of Maa Durga & Their Powers | Asthawaani',
  '9 divine forms of Maa Durga with mantras, colors and blessings. Join Asthawaani live Navratri katha.',
  'published', NOW()
),
(
  'vrindavan-darshan-guide',
  'Vrindavan Darshan – Top 10 Sacred Temples Every Devotee Must Visit',
  'वृंदावन दर्शन – हर भक्त को अवश्य देखने योग्य 10 प्रमुख मंदिर',
  'A devotee''s guide to the 10 most sacred temples of Vrindavan — Banke Bihari, Prem Mandir, ISKCON, Radha Raman and more.',
  'वृंदावन के 10 सबसे पवित्र मंदिरों — बांके बिहारी, प्रेम मंदिर, इस्कॉन, राधा रमण आदि — की भक्त मार्गदर्शिका।',
  '<p><strong>Vrindavan</strong>, the eternal playground of Shri Krishna and Radha Rani, is home to thousands of temples. Here are the 10 darshan sites every devotee must include in their yatra.</p><details><summary>Top 10 temples</summary><ul><li>Banke Bihari Temple</li><li>Prem Mandir</li><li>ISKCON Krishna-Balaram Mandir</li><li>Radha Raman Temple</li><li>Shri Radha Vallabh Temple</li><li>Nidhivan</li><li>Seva Kunj</li><li>Shahji Temple</li><li>Govind Dev Ji Temple</li><li>Madan Mohan Temple</li></ul></details><details><summary>Best time to visit</summary><ul><li>Janmashtami, Holi, Sharad Purnima and Kartik month.</li><li>Mornings (Mangala arati) and evenings (Sandhya arati) are most powerful.</li></ul></details><details><summary>Tips for darshan</summary><ul><li>Carry minimal valuables; phones are restricted at Banke Bihari.</li><li>Wear modest clothing.</li><li>Walk in silence near Nidhivan after sunset.</li></ul></details><p>👉 Book a guided Vrindavan darshan yatra with Asthawaani.</p>',
  '<p><strong>वृंदावन</strong>, श्री कृष्ण और राधा रानी की नित्य लीला भूमि, हजारों मंदिरों का घर है। यहाँ हैं 10 दर्शन स्थल जो हर भक्त की यात्रा में अवश्य होने चाहिए।</p><details><summary>शीर्ष 10 मंदिर</summary><ul><li>बांके बिहारी मंदिर</li><li>प्रेम मंदिर</li><li>इस्कॉन कृष्ण-बलराम मंदिर</li><li>राधा रमण मंदिर</li><li>श्री राधा वल्लभ मंदिर</li><li>निधिवन</li><li>सेवा कुंज</li><li>शाहजी मंदिर</li><li>गोविंद देव जी मंदिर</li><li>मदन मोहन मंदिर</li></ul></details><details><summary>उत्तम समय</summary><ul><li>जन्माष्टमी, होली, शरद पूर्णिमा और कार्तिक मास।</li><li>मंगला आरती और संध्या आरती सर्वाधिक शक्तिशाली होती हैं।</li></ul></details><details><summary>दर्शन के सुझाव</summary><ul><li>कम मूल्यवान वस्तुएँ साथ रखें; बांके बिहारी में मोबाइल वर्जित है।</li><li>शालीन वस्त्र पहनें।</li><li>निधिवन में सूर्यास्त के बाद मौन में चलें।</li></ul></details><p>👉 आस्थावाणी के साथ निर्देशित वृंदावन दर्शन यात्रा बुक करें।</p>',
  'Vrindavan Darshan – Top 10 Sacred Temples | Asthawaani',
  '10 most sacred temples of Vrindavan — Banke Bihari, Prem Mandir, ISKCON and more. Book Asthawaani darshan yatra.',
  'published', NOW()
),
(
  'shiva-mahamrityunjaya-mantra',
  'Mahamrityunjaya Mantra – The Ultimate Healing & Protection Mantra of Lord Shiva',
  'महामृत्युंजय मंत्र – भगवान शिव का परम चिकित्सा और रक्षा मंत्र',
  'Meaning, vidhi and benefits of the Mahamrityunjaya Mantra — the most powerful Shiva mantra for healing, longevity and freedom from fear of death.',
  'महामृत्युंजय मंत्र का अर्थ, विधि और लाभ — चिकित्सा, दीर्घायु और मृत्यु भय से मुक्ति का सबसे शक्तिशाली शिव मंत्र।',
  '<p>The <strong>Mahamrityunjaya Mantra</strong> from the Rig Veda is dedicated to Lord Shiva in his form as Tryambakeshwar. It is the supreme mantra for healing, protection and conquest of fear.</p><p>"Om Tryambakam Yajamahe Sugandhim Pushtivardhanam, Urvarukamiva Bandhanan Mrityormukshiya Maamritat."</p><details><summary>Meaning</summary><ul><li>We worship the three-eyed One, fragrant and life-nourishing. May He liberate us from the bondage of death, as a ripe cucumber falls from its vine, and grant us immortality.</li></ul></details><details><summary>Path vidhi</summary><ul><li>Best chanted on Monday, during Pradosh kaal or Mahashivratri.</li><li>Use a rudraksha mala of 108 beads.</li><li>Recite 11, 108, or 1008 times with sankalp.</li><li>Sit facing north or east.</li></ul></details><details><summary>Benefits</summary><ul><li>Heals chronic illness and accelerates recovery.</li><li>Removes fear of untimely death.</li><li>Pacifies grah dosha and shani dosha.</li><li>Brings courage, longevity and inner strength.</li></ul></details><p>👉 Book a Mahamrityunjaya Jaap with Asthawaani in your or your loved one''s name.</p>',
  '<p><strong>महामृत्युंजय मंत्र</strong> ऋग्वेद से लिया गया है और भगवान शिव के त्र्यंबकेश्वर स्वरूप को समर्पित है। यह चिकित्सा, सुरक्षा और भय विजय का सर्वोच्च मंत्र है।</p><p>"ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥"</p><details><summary>अर्थ</summary><ul><li>हम त्रिनेत्र, सुगंधित और पुष्टिवर्धक शिव की आराधना करते हैं। जैसे पका खीरा अपनी बेल से सहज मुक्त होता है, वैसे ही वे हमें मृत्यु के बंधन से मुक्त कर अमरत्व प्रदान करें।</li></ul></details><details><summary>पाठ विधि</summary><ul><li>सोमवार, प्रदोष काल या महाशिवरात्रि पर श्रेष्ठ।</li><li>108 दानों की रुद्राक्ष माला का उपयोग करें।</li><li>संकल्प के साथ 11, 108 या 1008 बार जप करें।</li><li>उत्तर या पूर्व दिशा में बैठें।</li></ul></details><details><summary>लाभ</summary><ul><li>दीर्घ रोगों की चिकित्सा और शीघ्र स्वास्थ्य लाभ।</li><li>अकाल मृत्यु के भय का नाश।</li><li>ग्रह दोष और शनि दोष की शांति।</li><li>साहस, दीर्घायु और आंतरिक बल।</li></ul></details><p>👉 आस्थावाणी के साथ अपने या प्रियजन के नाम महामृत्युंजय जाप बुक करें।</p>',
  'Mahamrityunjaya Mantra – Meaning, Vidhi & Benefits | Asthawaani',
  'The ultimate Shiva mantra for healing, protection & longevity. Learn meaning, vidhi and benefits. Book jaap with Asthawaani.',
  'published', NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ---------- 3. Assign posts to categories ----------
INSERT INTO post_categories (post_id, category_id)
SELECT p.id, c.id
FROM (VALUES
  ('morning-meditation-benefits',      'spiritual-practices'),
  ('gayatri-mantra-meaning-power',     'mantras-and-stotras'),
  ('tulsi-plant-spiritual-significance','spiritual-practices'),
  ('ekadashi-vrat-significance',       'festivals-and-vrat'),
  ('govardhan-parikrama-guide',        'braj-and-pilgrimage'),
  ('bhagavad-gita-life-lessons',       'devotional-wisdom'),
  ('hanuman-chalisa-benefits',         'mantras-and-stotras'),
  ('navratri-9-forms-of-durga',        'festivals-and-vrat'),
  ('vrindavan-darshan-guide',          'braj-and-pilgrimage'),
  ('shiva-mahamrityunjaya-mantra',     'mantras-and-stotras')
) AS v(post_slug, cat_slug)
JOIN posts p ON p.slug = v.post_slug
JOIN categories c ON c.slug = v.cat_slug
ON CONFLICT DO NOTHING;

-- Done. 10 new bilingual posts added to 5 categories.