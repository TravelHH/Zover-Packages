/* ============ Zover Package Builder — Destinations data (40) ============ */
/* City library: key: {ar, en, iata, act:[[ar,en],...]} */
const CITIES = {
  istanbul:{ar:'إسطنبول',en:'Istanbul',iata:'IST',act:[
    ['جولة في إسطنبول القديمة: آيا صوفيا والجامع الأزرق وقصر توبكابي','Old City tour: Hagia Sophia, Blue Mosque & Topkapı Palace'],
    ['رحلة بحرية في مضيق البوسفور وزيارة قصر دولمة بهجة','Bosphorus cruise & Dolmabahçe Palace'],
    ['رحلة يوم كامل إلى بورصة وجبل أولوداغ بالتلفريك','Full-day trip to Bursa & Uludağ by cable car'],
    ['رحلة إلى بحيرة سبانجا وقرية معشوقية','Sapanca Lake & Maşukiye village trip'],
    ['التسوق في البازار الكبير وسوق التوابل وشارع الاستقلال','Shopping: Grand Bazaar, Spice Bazaar & Istiklal Street'],
    ['رحلة إلى جزر الأميرات بالعبّارة','Princes’ Islands trip by ferry']]},
  trabzon:{ar:'طرابزون',en:'Trabzon',iata:'TZX',act:[
    ['رحلة إلى بحيرة أوزنجول وسط الجبال الخضراء','Uzungöl lake in the green mountains'],
    ['رحلة إلى هضبة آيدر ومزارع الشاي في ريزا','Ayder Plateau & Rize tea gardens'],
    ['رحلة إلى كهف كاراجا وهضبة زيغانا','Karaca Cave & Zigana Plateau'],
    ['زيارة هضبة حيدر نبي وإطلالات الضباب','Hıdırnebi Plateau above the clouds'],
    ['بحيرة سيرا وجولة تسوق في سوق طرابزون','Sera Lake & Trabzon bazaar']]},
  antalya:{ar:'أنطاليا',en:'Antalya',iata:'AYT',act:[
    ['جولة في البلدة القديمة كاليتشي والميناء','Kaleiçi old town & marina'],
    ['زيارة شلالات دودن وشلالات كورشونلو','Düden & Kurşunlu waterfalls'],
    ['رحلة بحرية على ساحل البحر المتوسط','Mediterranean boat trip'],
    ['التلفريك وإطلالة تونيكتيبي البانورامية','Tünektepe cable car & panoramic views'],
    ['رحلة يوم كامل إلى كيمير وجبل أوليمبوس بالتلفريك','Kemer & Olympos cable car day trip']]},
  cappadocia:{ar:'كبادوكيا',en:'Cappadocia',iata:'NAV',act:[
    ['رحلة المنطاد عند الشروق فوق الوديان (اختياري)','Sunrise hot-air balloon flight (optional)'],
    ['جولة وادي غوريمي والمدينة تحت الأرض','Göreme valleys & underground city tour'],
    ['سفاري الدفع الرباعي بين المداخن الصخرية','Jeep safari among the fairy chimneys']]},
  tbilisi:{ar:'تبليسي',en:'Tbilisi',iata:'TBS',act:[
    ['جولة في تبليسي القديمة وقلعة ناريكالا بالتلفريك','Old Tbilisi & Narikala Fortress by cable car'],
    ['رحلة إلى قودوري وكازبيجي عبر الطريق العسكري الجورجي','Gudauri & Kazbegi via the Georgian Military Road'],
    ['رحلة إلى بورجومي وحديقة المياه المعدنية','Borjomi & the mineral water park'],
    ['بحيرة بازاليتي وقلعة أنانوري','Bazaleti Lake & Ananuri Fortress'],
    ['رحلة إلى مدينة سيغناغي ووادي ألازاني','Sighnaghi & Alazani Valley']]},
  batumi:{ar:'باتومي',en:'Batumi',iata:'BUS',act:[
    ['جولة في كورنيش باتومي وبرج الأبجدية','Batumi Boulevard & Alphabet Tower'],
    ['زيارة الحديقة النباتية على البحر الأسود','Batumi Botanical Garden on the Black Sea'],
    ['شلالات ماخونتسيتي وجسر الملكة تمار','Makhuntseti waterfall & Queen Tamar Bridge'],
    ['تلفريك أرجو وإطلالة المدينة','Argo cable car & city views']]},
  baku:{ar:'باكو',en:'Baku',iata:'GYD',act:[
    ['جولة في المدينة القديمة إتشري شهر وبرج العذراء','Old City (Icherisheher) & Maiden Tower'],
    ['أبراج اللهب وحديقة المرتفعات وكورنيش باكو','Flame Towers, Highland Park & Baku Boulevard'],
    ['زيارة مركز حيدر علييف والجبل المشتعل يانار داغ','Heydar Aliyev Center & Yanar Dag'],
    ['رحلة إلى قوبا وشاهداغ وتلفريك الجبل','Guba & Shahdag mountain resort']]},
  gabala:{ar:'قبالة',en:'Gabala',iata:'GBB',act:[
    ['تلفريك توفنداغ فوق جبال القوقاز','Tufandag cable car over the Caucasus'],
    ['بحيرة نوهور وشلالات يدي جوزل (الجميلات السبع)','Nohur Lake & Yeddi Gozel waterfalls'],
    ['جولة في غابات قبالة وقرية لاهج','Gabala forests & Lahij village']]},
  almaty:{ar:'ألماتي',en:'Almaty',iata:'ALA',act:[
    ['منتجع شيمبولاك وحلبة ميديو بالتلفريك','Shymbulak resort & Medeu by cable car'],
    ['رحلة إلى بحيرة ألماتي الكبرى','Big Almaty Lake'],
    ['رحلة يوم كامل إلى وادي تشارين (الجراند كانيون)','Full-day Charyn Canyon trip'],
    ['رحلة إلى بحيرات كولساي وكايندي','Kolsai & Kaindy Lakes'],
    ['تل كوك توبي وجولة في المدينة','Kok-Tobe hill & city tour']]},
  tashkent:{ar:'طشقند',en:'Tashkent',iata:'TAS',act:[
    ['جولة في طشقند ومجمع حضرت إمام وسوق تشورسو','Tashkent, Hazrati Imam complex & Chorsu Bazaar']]},
  samarkand:{ar:'سمرقند',en:'Samarkand',iata:'SKD',act:[
    ['ساحة ريجستان ومسجد بيبي خانم','Registan Square & Bibi-Khanym Mosque'],
    ['زيارة ضريح الإمام البخاري ومجمع شاه زنده','Imam al-Bukhari complex & Shah-i-Zinda']]},
  bukhara:{ar:'بخارى',en:'Bukhara',iata:'BHK',act:[
    ['جولة في بخارى القديمة ومئذنة كاليان','Old Bukhara & Kalyan Minaret'],
    ['قلعة آرك ومجمع بهاء الدين نقشبند','Ark Fortress & Bahouddin Naqshband complex']]},
  kl:{ar:'كوالالمبور',en:'Kuala Lumpur',iata:'KUL',act:[
    ['جولة في كوالالمبور وأبراج بتروناس','Kuala Lumpur city tour & Petronas Towers'],
    ['رحلة إلى مرتفعات جنتنج بالتلفريك','Genting Highlands by cable car'],
    ['بوتراجايا والمسجد الوردي وكهوف باتو','Putrajaya, Pink Mosque & Batu Caves'],
    ['التسوق في بوكيت بينتانج ومراكز التسوق','Shopping in Bukit Bintang'],
    ['يوم في مدينة صنواي لاجون المائية','Sunway Lagoon theme park']]},
  langkawi:{ar:'لنكاوي',en:'Langkawi',iata:'LGK',act:[
    ['التلفريك والجسر المعلق في جبل ماتشينشانغ','SkyCab & Sky Bridge'],
    ['جولة الجزر بالقارب وبحيرة الحامل','Island hopping & Pregnant Maiden Lake'],
    ['جولة غابات المانغروف وتغذية النسور','Mangrove tour & eagle feeding'],
    ['شاطئ سينانج والتسوق المعفى من الضرائب','Cenang Beach & duty-free shopping']]},
  penang:{ar:'بينانج',en:'Penang',iata:'PEN',act:[
    ['جولة جورج تاون التاريخية وفن الجداريات','Historic George Town & street art'],
    ['تل بينانج بالقطار الجبلي','Penang Hill funicular'],
    ['شاطئ باتو فيرينجي والسوق الليلي','Batu Ferringhi beach & night market']]},
  bali:{ar:'بالي',en:'Bali',iata:'DPS',act:[
    ['جولة أوبود ومدرجات الأرز وغابة القرود','Ubud, rice terraces & Monkey Forest'],
    ['كنتاماني وإطلالة بركان باتور','Kintamani & Mount Batur views'],
    ['رحلة إلى جزيرة نوسا بينيدا','Nusa Penida island trip'],
    ['الأنشطة البحرية في نوسا دوا','Water sports in Nusa Dua'],
    ['أرجوحة بالي وشلالات تيغينونغان','Bali Swing & Tegenungan waterfall']]},
  jakarta:{ar:'جاكرتا',en:'Jakarta',iata:'CGK',act:[
    ['جولة في جاكرتا ومسجد الاستقلال والنصب الوطني','Jakarta, Istiqlal Mosque & Monas'],
    ['حديقة تمان ميني إندونيسيا','Taman Mini Indonesia Indah']]},
  puncak:{ar:'بونشاك',en:'Puncak',iata:'',act:[
    ['حديقة تمان سفاري','Taman Safari Indonesia'],
    ['مزارع الشاي وإطلالات بونشاك الجبلية','Puncak tea plantations & mountain views'],
    ['حدائق بوقور النباتية وشلالات قريبة','Bogor Botanical Gardens & nearby waterfalls']]},
  bandung:{ar:'باندونق',en:'Bandung',iata:'BDO',act:[
    ['بركان تانكوبان براهو وفوهة كاوه بوتيه','Tangkuban Perahu volcano & Kawah Putih crater'],
    ['التسوق في أسواق المصانع (الأوت لت)','Factory-outlet shopping']]},
  phuket:{ar:'بوكيت',en:'Phuket',iata:'HKT',act:[
    ['جولة جزر في في بالقارب السريع','Phi Phi Islands by speedboat'],
    ['جزيرة جيمس بوند وخليج فانغ نغا','James Bond Island & Phang Nga Bay'],
    ['جولة في المدينة وإطلالة كارون البانورامية','Phuket city tour & Karon viewpoint'],
    ['شاطئ باتونغ ويوم حر','Patong Beach & free time']]},
  bangkok:{ar:'بانكوك',en:'Bangkok',iata:'BKK',act:[
    ['جولة في بانكوك والقصر الكبير','Bangkok city tour & Grand Palace'],
    ['السوق العائم وسوق سكة القطار','Floating market & railway market'],
    ['يوم في سفاري ورلد','Safari World'],
    ['التسوق في سيام وبراتونام','Shopping in Siam & Pratunam']]},
  pattaya:{ar:'باتايا',en:'Pattaya',iata:'',act:[
    ['رحلة إلى جزيرة كورال بالقارب','Coral Island boat trip'],
    ['حديقة نونغ نوتش الاستوائية','Nong Nooch Tropical Garden'],
    ['منتزه كارتون نتورك أمازون المائي','Cartoon Network Amazone water park']]},
  singapore:{ar:'سنغافورة',en:'Singapore',iata:'SIN',act:[
    ['جولة في سنغافورة ومارينا باي','City tour & Marina Bay'],
    ['جزيرة سنتوسا ويونيفرسال ستوديوز','Sentosa Island & Universal Studios'],
    ['حدائق الخليج وعرض الأضواء','Gardens by the Bay & light show'],
    ['حديقة الحيوان والسفاري الليلي','Singapore Zoo & Night Safari']]},
  tokyo:{ar:'طوكيو',en:'Tokyo',iata:'HND',act:[
    ['جولة طوكيو: أساكوسا وشيبويا وبرج سكاي تري','Tokyo tour: Asakusa, Shibuya & Skytree'],
    ['رحلة يوم كامل إلى جبل فوجي وهاكوني','Full-day Mount Fuji & Hakone'],
    ['يوم في طوكيو ديزني لاند','Tokyo Disneyland'],
    ['التسوق في جينزا وأكيهابارا','Shopping in Ginza & Akihabara']]},
  kyoto:{ar:'كيوتو',en:'Kyoto',iata:'',act:[
    ['غابة الخيزران في أراشيياما والمعالم التاريخية','Arashiyama bamboo grove & historic sites'],
    ['رحلة إلى نارا وحديقة الغزلان','Nara & the deer park']]},
  seoul:{ar:'سيول',en:'Seoul',iata:'ICN',act:[
    ['قصر جيونغبوكغونغ وقرية بوكتشون','Gyeongbokgung Palace & Bukchon Village'],
    ['برج نامسان وجولة في المدينة','N Seoul Tower & city tour'],
    ['جزيرة نامي وحديقة الصباح الهادئ','Nami Island & Garden of Morning Calm'],
    ['يوم في لوتي ورلد','Lotte World'],
    ['التسوق في ميونغدونغ ودونغدايمون','Shopping in Myeongdong & Dongdaemun']]},
  maldives:{ar:'المالديف',en:'Maldives',iata:'MLE',act:[
    ['الغطس والسنوركلينغ بين الشعاب المرجانية','Snorkeling over the coral reefs'],
    ['رحلة مشاهدة الدلافين عند الغروب','Sunset dolphin cruise'],
    ['يوم استرخاء وسبا في المنتجع','Spa & relaxation day at the resort'],
    ['رحلة صيد ليلية تقليدية','Traditional night fishing trip']]},
  mauritius:{ar:'موريشيوس',en:'Mauritius',iata:'MRU',act:[
    ['جولة الجنوب: شلالات شاماريل والأرض ذات الألوان السبعة','South tour: Chamarel Falls & Seven Coloured Earth'],
    ['رحلة كاتاماران إلى جزيرة إيل أو سيرف','Catamaran cruise to Île aux Cerfs'],
    ['حديقة بامبلموس النباتية وجولة الشمال','Pamplemousses Garden & north tour'],
    ['منتزه كازيلا الطبيعي','Casela Nature Park'],
    ['يوم حر على الشاطئ','Free beach day']]},
  zanzibar:{ar:'زنجبار',en:'Zanzibar',iata:'ZNZ',act:[
    ['جولة في ستون تاون التاريخية','Historic Stone Town tour'],
    ['جزيرة السجن والسلاحف العملاقة','Prison Island & giant tortoises'],
    ['رحلة سفاري بلو بالقارب والسنوركلينغ','Safari Blue boat & snorkeling trip'],
    ['غابة جوزاني ومزرعة التوابل','Jozani Forest & spice farm']]},
  kandy:{ar:'كاندي',en:'Kandy',iata:'CMB',act:[
    ['ملجأ الفيلة في بينّاوالا','Pinnawala Elephant Orphanage'],
    ['حديقة بيرادينيا النباتية وجولة في كاندي','Peradeniya Botanical Gardens & Kandy tour']]},
  nuwara:{ar:'نوارا إليا',en:'Nuwara Eliya',iata:'',act:[
    ['مزارع ومصانع الشاي السيلاني','Ceylon tea plantations & factory'],
    ['شلالات رامبودا وبحيرة غريغوري','Ramboda Falls & Gregory Lake']]},
  bentota:{ar:'بينتوتا',en:'Bentota',iata:'',act:[
    ['رحلة نهر مادو بالقارب','Madu River boat safari'],
    ['الأنشطة البحرية ومحمية السلاحف','Water sports & turtle hatchery']]},
  cairo:{ar:'القاهرة',en:'Cairo',iata:'CAI',act:[
    ['الأهرامات وأبو الهول','Pyramids of Giza & the Sphinx'],
    ['المتحف المصري الكبير','Grand Egyptian Museum'],
    ['القاهرة الإسلامية وشارع المعز وخان الخليلي','Islamic Cairo, Al-Muizz Street & Khan el-Khalili'],
    ['قلعة صلاح الدين ومسجد محمد علي','Saladin Citadel & Muhammad Ali Mosque'],
    ['عشاء على مركب في النيل','Nile dinner cruise']]},
  sharm:{ar:'شرم الشيخ',en:'Sharm El Sheikh',iata:'SSH',act:[
    ['رحلة رأس محمد للسنوركلينغ','Ras Mohammed snorkeling trip'],
    ['رحلة بحرية إلى جزيرة تيران','Tiran Island boat trip'],
    ['سفاري الصحراء بالدبابات وعشاء بدوي','Quad desert safari & Bedouin dinner'],
    ['خليج نعمة والسوق القديم','Naama Bay & Old Market']]},
  luxor:{ar:'الأقصر',en:'Luxor',iata:'LXR',act:[
    ['معبد الكرنك ومعبد الأقصر','Karnak & Luxor Temples'],
    ['وادي الملوك ومعبد حتشبسوت','Valley of the Kings & Hatshepsut Temple'],
    ['الإبحار وزيارة معبدي إدفو وكوم أمبو','Sailing to Edfu & Kom Ombo temples']]},
  aswan:{ar:'أسوان',en:'Aswan',iata:'ASW',act:[
    ['رحلة إلى معبد أبو سمبل','Abu Simbel temples'],
    ['السد العالي ومعبد فيلة والقرية النوبية بالفلوكة','High Dam, Philae & Nubian village by felucca']]},
  dubai:{ar:'دبي',en:'Dubai',iata:'DXB',act:[
    ['جولة في دبي وبرج خليفة','Dubai city tour & Burj Khalifa'],
    ['سفاري الصحراء مع العشاء','Desert safari with dinner'],
    ['دبي مول ونافورة دبي','Dubai Mall & Dubai Fountain'],
    ['متحف المستقبل ودبي فريم','Museum of the Future & Dubai Frame'],
    ['أكوافنتشر أتلانتس أو جلوبال فيليج (موسمي)','Atlantis Aquaventure or Global Village (seasonal)']]},
  abudhabi:{ar:'أبوظبي',en:'Abu Dhabi',iata:'AUH',act:[
    ['جامع الشيخ زايد الكبير وقصر الوطن','Sheikh Zayed Grand Mosque & Qasr Al Watan'],
    ['عالم فيراري ووارنر براذرز في جزيرة ياس','Ferrari World & Warner Bros. World, Yas Island'],
    ['متحف اللوفر أبوظبي وكورنيش أبوظبي','Louvre Abu Dhabi & the Corniche']]},
  salalah:{ar:'صلالة',en:'Salalah',iata:'SLL',act:[
    ['عيون صلالة: عين رزات وعين جرزيز','Salalah springs: Ain Razat & Ain Garziz'],
    ['وادي دربات وشلالاته','Wadi Darbat & its waterfalls'],
    ['شاطئ المغسيل والنوافير البحرية','Al Mughsail beach & blowholes'],
    ['جبل إتين ومزارع الموز وسوق الحافة','Jebel Ateen, banana farms & Al Haffa Souq']]},
  amman:{ar:'عمّان',en:'Amman',iata:'AMM',act:[
    ['جولة في عمّان وجبل القلعة والمدرج الروماني','Amman Citadel & Roman Theatre'],
    ['رحلة إلى مدينة جرش الأثرية','Jerash archaeological city'],
    ['حمامات ماعين المعدنية','Ma’in hot springs']]},
  petra:{ar:'البتراء ووادي رم',en:'Petra & Wadi Rum',iata:'',act:[
    ['زيارة مدينة البتراء الوردية','Visit the Rose City of Petra'],
    ['جولة بسيارات الدفع الرباعي في وادي رم','Wadi Rum jeep tour']]},
  deadsea:{ar:'البحر الميت',en:'Dead Sea',iata:'',act:[
    ['الاسترخاء والطفو في البحر الميت','Floating & relaxing at the Dead Sea']]},
  marrakech:{ar:'مراكش',en:'Marrakech',iata:'RAK',act:[
    ['ساحة جامع الفنا والأسواق التقليدية','Jemaa el-Fnaa & the souks'],
    ['حديقة ماجوريل وقصر الباهية','Majorelle Garden & Bahia Palace'],
    ['رحلة إلى وادي أوريكا وجبال الأطلس','Ourika Valley & the Atlas Mountains'],
    ['صحراء أكفاي وركوب الجمال','Agafay desert & camel ride']]},
  casablanca:{ar:'الدار البيضاء',en:'Casablanca',iata:'CMN',act:[
    ['مسجد الحسن الثاني وكورنيش عين الذئاب','Hassan II Mosque & Ain Diab Corniche'],
    ['رحلة إلى العاصمة الرباط','Day trip to Rabat']]},
  paris:{ar:'باريس',en:'Paris',iata:'CDG',act:[
    ['جولة في باريس وبرج إيفل','Paris city tour & Eiffel Tower'],
    ['متحف اللوفر ورحلة نهر السين','Louvre Museum & Seine river cruise'],
    ['قصر فرساي وحدائقه','Palace of Versailles & gardens'],
    ['يوم في ديزني لاند باريس','Disneyland Paris'],
    ['التسوق في الشانزليزيه وغاليري لافاييت','Shopping: Champs-Élysées & Galeries Lafayette']]},
  london:{ar:'لندن',en:'London',iata:'LHR',act:[
    ['جولة لندن: قصر باكنغهام وبيغ بن','London tour: Buckingham Palace & Big Ben'],
    ['عين لندن ورحلة نهر التايمز','London Eye & Thames cruise'],
    ['المتحف البريطاني وقلعة وندسور','British Museum & Windsor Castle'],
    ['جولة استوديوهات وارنر براذرز (هاري بوتر)','Warner Bros. Studio Tour (Harry Potter)'],
    ['التسوق في هارودز وشارع أكسفورد','Shopping: Harrods & Oxford Street']]},
  lucerne:{ar:'لوزيرن',en:'Lucerne',iata:'ZRH',act:[
    ['جولة في لوزيرن وجسر الكنيسة والبحيرة','Lucerne, Chapel Bridge & the lake'],
    ['رحلة إلى جبل تيتليس والجليد الدائم','Mount Titlis glacier'],
    ['جبل بيلاتوس بأشد القطارات انحدارًا','Mount Pilatus by cogwheel railway']]},
  interlaken:{ar:'إنترلاكن',en:'Interlaken',iata:'',act:[
    ['يونغفراوخ قمة أوروبا','Jungfraujoch – Top of Europe'],
    ['قرية غريندلفالد وجبل فيرست','Grindelwald & First'],
    ['هاردر كولم ورحلة بحيرة بريينز','Harder Kulm & Lake Brienz cruise']]},
  vienna:{ar:'فيينا',en:'Vienna',iata:'VIE',act:[
    ['جولة في فيينا ودار الأوبرا','Vienna city tour & State Opera'],
    ['قصر شونبرون وحدائقه','Schönbrunn Palace & gardens'],
    ['حديقة براتر والعجلة العملاقة','Prater park & Giant Ferris Wheel']]},
  zellamsee:{ar:'زيلامسي',en:'Zell am See',iata:'',act:[
    ['بحيرة زيلامسي ورحلة بالقارب','Lake Zell & boat cruise'],
    ['قمة كابرون والجليد الدائم','Kitzsteinhorn glacier, Kaprun'],
    ['شلالات كريمل وطريق غروس غلوكنر','Krimml Falls & Grossglockner Road'],
    ['جبل شميتن بالتلفريك','Schmittenhöhe by cable car']]},
  rome:{ar:'روما',en:'Rome',iata:'FCO',act:[
    ['الكولوسيوم والمنتدى الروماني','Colosseum & Roman Forum'],
    ['نافورة تريفي وساحة نافونا والبانثيون','Trevi Fountain, Piazza Navona & Pantheon']]},
  florence:{ar:'فلورنسا',en:'Florence',iata:'',act:[
    ['جولة فلورنسا والكاتدرائية وجسر فيكيو','Florence, the Duomo & Ponte Vecchio'],
    ['رحلة إلى برج بيزا المائل','Leaning Tower of Pisa trip']]},
  venice:{ar:'البندقية',en:'Venice',iata:'VCE',act:[
    ['ركوب الجندول وساحة سان ماركو','Gondola ride & St Mark’s Square'],
    ['جزر مورانو وبورانو الملونة','Murano & colourful Burano']]},
  madrid:{ar:'مدريد',en:'Madrid',iata:'MAD',act:[
    ['جولة في مدريد والقصر الملكي وبويرتا ديل سول','Madrid tour, Royal Palace & Puerta del Sol'],
    ['رحلة إلى مدينة طليطلة التاريخية','Historic Toledo day trip'],
    ['جولة ملعب سانتياغو برنابيو','Santiago Bernabéu stadium tour']]},
  granada:{ar:'غرناطة',en:'Granada',iata:'',act:[
    ['قصر الحمراء وحدائق جنة العريف','Alhambra & Generalife gardens'],
    ['حي البيازين وإطلالة سان نيكولاس','Albaicín quarter & San Nicolás viewpoint']]},
  seville:{ar:'إشبيلية',en:'Seville',iata:'SVQ',act:[
    ['قصر إشبيلية (الكازار) وساحة إسبانيا','Royal Alcázar & Plaza de España'],
    ['رحلة إلى قرطبة ومسجدها الكبير','Córdoba & its Great Mosque']]},
  sarajevo:{ar:'سراييفو',en:'Sarajevo',iata:'SJJ',act:[
    ['جولة سراييفو القديمة وسوق باشتشارشيا','Old Sarajevo & Baščaršija'],
    ['رحلة إلى موستار والجسر القديم وشلالات كرافيتسا','Mostar Old Bridge & Kravica waterfalls'],
    ['ينابيع البوسنة (فريلو بوسني)','Vrelo Bosne springs'],
    ['تلفريك جبل تريبيفيتش','Trebević cable car'],
    ['رحلة إلى مدينة يايتسه وشلالاتها','Jajce & its waterfall']]},
  prague:{ar:'براغ',en:'Prague',iata:'PRG',act:[
    ['البلدة القديمة والساعة الفلكية','Old Town & Astronomical Clock'],
    ['قلعة براغ وجسر تشارلز','Prague Castle & Charles Bridge'],
    ['رحلة إلى منتجع كارلوفي فاري','Karlovy Vary spa town'],
    ['رحلة إلى بلدة تشيسكي كروملوف','Český Krumlov day trip']]}
};

const REGIONS = [
  {id:'all',ar:'الكل',en:'All'},
  {id:'tc',ar:'تركيا والقوقاز وآسيا الوسطى',en:'Türkiye, Caucasus & Central Asia'},
  {id:'asia',ar:'آسيا',en:'Asia'},
  {id:'arab',ar:'الدول العربية',en:'Arab countries'},
  {id:'eu',ar:'أوروبا',en:'Europe'},
  {id:'isl',ar:'الجزر والمحيط الهندي',en:'Islands & Indian Ocean'}
];

/* Destinations: cities = [cityKey, nights, via]  via: air | road | train | sea */
const DESTS = [
 {id:'ist',r:'tc',ar:'إسطنبول',en:'Istanbul',car:'تركيا',cen:'Türkiye',col:['#C8102E','#4B2D8E'],cities:[['istanbul',5]],
  hl:[['آيا صوفيا والجامع الأزرق','Hagia Sophia & Blue Mosque'],['رحلة البوسفور','Bosphorus cruise'],['بورصة وأولوداغ','Bursa & Uludağ'],['أسواق إسطنبول','Istanbul bazaars']],season:['طوال العام','All year round']},
 {id:'tzx',r:'tc',ar:'طرابزون والشمال التركي',en:'Trabzon & Black Sea',car:'تركيا',cen:'Türkiye',col:['#1E7B4F','#4B2D8E'],cities:[['trabzon',5]],
  hl:[['بحيرة أوزنجول','Uzungöl lake'],['هضبة آيدر','Ayder Plateau'],['كهف كاراجا','Karaca Cave'],['طبيعة خضراء ساحرة','Lush green nature']],season:['مايو – سبتمبر','May – September']},
 {id:'ayt',r:'tc',ar:'أنطاليا',en:'Antalya',car:'تركيا',cen:'Türkiye',col:['#0077B6','#4B2D8E'],cities:[['antalya',5]],
  hl:[['شواطئ المتوسط','Mediterranean beaches'],['البلدة القديمة كاليتشي','Kaleiçi old town'],['الشلالات','Waterfalls'],['منتجعات شاملة','All-inclusive resorts']],season:['أبريل – أكتوبر','April – October']},
 {id:'cap',r:'tc',ar:'إسطنبول وكبادوكيا',en:'Istanbul & Cappadocia',car:'تركيا',cen:'Türkiye',col:['#E76F51','#4B2D8E'],cities:[['istanbul',4],['cappadocia',2,'air']],
  hl:[['رحلة المنطاد','Hot-air balloons'],['وديان غوريمي','Göreme valleys'],['رحلة البوسفور','Bosphorus cruise'],['المدينة تحت الأرض','Underground city']],season:['طوال العام','All year round']},
 {id:'tbs',r:'tc',ar:'تبليسي',en:'Tbilisi',car:'جورجيا',cen:'Georgia',col:['#B5179E','#4B2D8E'],cities:[['tbilisi',5]],
  hl:[['قودوري وكازبيجي','Gudauri & Kazbegi'],['تلفريك ناريكالا','Narikala cable car'],['بورجومي','Borjomi'],['طبيعة جبلية','Mountain scenery']],season:['طوال العام','All year round']},
 {id:'geo',r:'tc',ar:'تبليسي وباتومي',en:'Tbilisi & Batumi',car:'جورجيا',cen:'Georgia',col:['#7209B7','#0077B6'],cities:[['tbilisi',4],['batumi',3,'air']],
  hl:[['قودوري وكازبيجي','Gudauri & Kazbegi'],['كورنيش باتومي','Batumi Boulevard'],['الحديقة النباتية','Botanical Garden'],['البحر الأسود','The Black Sea']],season:['مايو – أكتوبر','May – October']},
 {id:'gyd',r:'tc',ar:'باكو',en:'Baku',car:'أذربيجان',cen:'Azerbaijan',col:['#00A6D6','#4B2D8E'],cities:[['baku',5]],
  hl:[['المدينة القديمة','Old City'],['أبراج اللهب','Flame Towers'],['مركز حيدر علييف','Heydar Aliyev Center'],['شاهداغ','Shahdag']],season:['طوال العام','All year round']},
 {id:'aze',r:'tc',ar:'باكو وقبالة',en:'Baku & Gabala',car:'أذربيجان',cen:'Azerbaijan',col:['#2A9D8F','#4B2D8E'],cities:[['baku',4],['gabala',3,'road']],
  hl:[['تلفريك توفنداغ','Tufandag cable car'],['بحيرة نوهور','Nohur Lake'],['أبراج اللهب','Flame Towers'],['جبال القوقاز','Caucasus mountains']],season:['مايو – أكتوبر','May – October']},
 {id:'ala',r:'tc',ar:'ألماتي',en:'Almaty',car:'كازاخستان',cen:'Kazakhstan',col:['#00AFCA','#4B2D8E'],cities:[['almaty',6]],
  hl:[['منتجع شيمبولاك','Shymbulak resort'],['وادي تشارين','Charyn Canyon'],['بحيرة ألماتي الكبرى','Big Almaty Lake'],['بحيرات كولساي','Kolsai Lakes']],season:['طوال العام','All year round']},
 {id:'uzb',r:'tc',ar:'أوزبكستان: طشقند وسمرقند وبخارى',en:'Uzbekistan: Tashkent, Samarkand & Bukhara',car:'أوزبكستان',cen:'Uzbekistan',col:['#0099B5','#1E7B4F'],cities:[['tashkent',2],['samarkand',2,'train'],['bukhara',2,'train']],
  hl:[['ساحة ريجستان','Registan Square'],['ضريح الإمام البخاري','Imam al-Bukhari complex'],['بخارى القديمة','Old Bukhara'],['قطار أفراسياب السريع','Afrosiyob fast train']],season:['مارس – نوفمبر','March – November']},

 {id:'kul',r:'asia',ar:'كوالالمبور',en:'Kuala Lumpur',car:'ماليزيا',cen:'Malaysia',col:['#010066','#CC0001'],cities:[['kl',5]],
  hl:[['أبراج بتروناس','Petronas Towers'],['مرتفعات جنتنج','Genting Highlands'],['بوتراجايا','Putrajaya'],['التسوق','Shopping']],season:['طوال العام','All year round']},
 {id:'mys',r:'asia',ar:'كوالالمبور ولنكاوي',en:'Kuala Lumpur & Langkawi',car:'ماليزيا',cen:'Malaysia',col:['#0081A7','#4B2D8E'],cities:[['kl',4],['langkawi',3,'air']],
  hl:[['أبراج بتروناس','Petronas Towers'],['تلفريك لنكاوي','Langkawi SkyCab'],['جولة الجزر','Island hopping'],['مرتفعات جنتنج','Genting Highlands']],season:['نوفمبر – أبريل لنكاوي','Nov – Apr for Langkawi']},
 {id:'mys3',r:'asia',ar:'ماليزيا: كوالالمبور وبينانج ولنكاوي',en:'Malaysia: KL, Penang & Langkawi',car:'ماليزيا',cen:'Malaysia',col:['#06D6A0','#4B2D8E'],cities:[['kl',4],['penang',3,'air'],['langkawi',3,'sea']],
  hl:[['ثلاث مدن','Three destinations'],['جورج تاون','George Town'],['جزر لنكاوي','Langkawi islands'],['جنتنج','Genting']],season:['طوال العام','All year round']},
 {id:'dps',r:'asia',ar:'بالي',en:'Bali',car:'إندونيسيا',cen:'Indonesia',col:['#2D6A4F','#F97A30'],cities:[['bali',6]],
  hl:[['أوبود ومدرجات الأرز','Ubud & rice terraces'],['جزيرة نوسا بينيدا','Nusa Penida'],['فلل بمسبح خاص','Private pool villas'],['أرجوحة بالي','Bali Swing']],season:['أبريل – أكتوبر','April – October']},
 {id:'idn',r:'asia',ar:'جاكرتا وبونشاك وباندونق',en:'Jakarta, Puncak & Bandung',car:'إندونيسيا',cen:'Indonesia',col:['#CE1126','#2D6A4F'],cities:[['jakarta',2],['puncak',3,'road'],['bandung',2,'road']],
  hl:[['حديقة تمان سفاري','Taman Safari'],['مزارع الشاي','Tea plantations'],['بركان تانكوبان','Tangkuban volcano'],['أسواق الأوت لت','Outlet shopping']],season:['طوال العام','All year round']},
 {id:'hkt',r:'asia',ar:'بوكيت',en:'Phuket',car:'تايلاند',cen:'Thailand',col:['#0096C7','#4B2D8E'],cities:[['phuket',5]],
  hl:[['جزر في في','Phi Phi Islands'],['جزيرة جيمس بوند','James Bond Island'],['شاطئ باتونغ','Patong Beach'],['بحر فيروزي','Turquoise sea']],season:['نوفمبر – أبريل','November – April']},
 {id:'tha',r:'asia',ar:'بانكوك وباتايا',en:'Bangkok & Pattaya',car:'تايلاند',cen:'Thailand',col:['#A4161A','#2D3047'],cities:[['bangkok',3],['pattaya',3,'road']],
  hl:[['القصر الكبير','Grand Palace'],['السوق العائم','Floating market'],['جزيرة كورال','Coral Island'],['سفاري ورلد','Safari World']],season:['نوفمبر – أبريل','November – April']},
 {id:'sin',r:'asia',ar:'سنغافورة',en:'Singapore',car:'سنغافورة',cen:'Singapore',col:['#EF3340','#4B2D8E'],cities:[['singapore',4]],
  hl:[['مارينا باي','Marina Bay'],['جزيرة سنتوسا','Sentosa Island'],['يونيفرسال ستوديوز','Universal Studios'],['حدائق الخليج','Gardens by the Bay']],season:['طوال العام','All year round']},
 {id:'jpn',r:'asia',ar:'اليابان: طوكيو وكيوتو',en:'Japan: Tokyo & Kyoto',car:'اليابان',cen:'Japan',col:['#BC002D','#2D3047'],cities:[['tokyo',4],['kyoto',3,'train']],
  hl:[['جبل فوجي','Mount Fuji'],['قطار الشينكانسن','Shinkansen bullet train'],['غابة الخيزران','Bamboo grove'],['طوكيو الحديثة','Modern Tokyo']],season:['مارس – مايو وأكتوبر – نوفمبر','Mar – May & Oct – Nov']},
 {id:'sel',r:'asia',ar:'سيول',en:'Seoul',car:'كوريا الجنوبية',cen:'South Korea',col:['#003478','#C60C30'],cities:[['seoul',5]],
  hl:[['قصر جيونغبوكغونغ','Gyeongbokgung Palace'],['جزيرة نامي','Nami Island'],['برج نامسان','N Seoul Tower'],['لوتي ورلد','Lotte World']],season:['أبريل – يونيو وسبتمبر – نوفمبر','Apr – Jun & Sep – Nov']},

 {id:'cai',r:'arab',ar:'القاهرة',en:'Cairo',car:'مصر',cen:'Egypt',col:['#C9A227','#4B2D8E'],cities:[['cairo',4]],
  hl:[['الأهرامات وأبو الهول','Pyramids & Sphinx'],['المتحف المصري الكبير','Grand Egyptian Museum'],['خان الخليلي','Khan el-Khalili'],['عشاء نيلي','Nile dinner cruise']],season:['أكتوبر – أبريل','October – April']},
 {id:'ssh',r:'arab',ar:'شرم الشيخ',en:'Sharm El Sheikh',car:'مصر',cen:'Egypt',col:['#0096C7','#C9A227'],cities:[['sharm',5]],
  hl:[['رأس محمد','Ras Mohammed'],['جزيرة تيران','Tiran Island'],['سفاري الصحراء','Desert safari'],['منتجعات البحر الأحمر','Red Sea resorts']],season:['طوال العام','All year round']},
 {id:'nile',r:'arab',ar:'الأقصر وأسوان (رحلة نيلية)',en:'Luxor & Aswan Nile Cruise',car:'مصر',cen:'Egypt',col:['#B08968','#4B2D8E'],cities:[['luxor',3],['aswan',2,'sea']],
  hl:[['معبد الكرنك','Karnak Temple'],['وادي الملوك','Valley of the Kings'],['أبو سمبل','Abu Simbel'],['الإبحار في النيل','Sailing the Nile']],season:['أكتوبر – أبريل','October – April']},
 {id:'dxb',r:'arab',ar:'دبي',en:'Dubai',car:'الإمارات',cen:'UAE',col:['#1D3557','#C9A227'],cities:[['dubai',4]],
  hl:[['برج خليفة','Burj Khalifa'],['سفاري الصحراء','Desert safari'],['متحف المستقبل','Museum of the Future'],['دبي مول','Dubai Mall']],season:['أكتوبر – أبريل','October – April']},
 {id:'auh',r:'arab',ar:'أبوظبي',en:'Abu Dhabi',car:'الإمارات',cen:'UAE',col:['#00732F','#1D3557'],cities:[['abudhabi',3]],
  hl:[['جامع الشيخ زايد','Sheikh Zayed Mosque'],['عالم فيراري','Ferrari World'],['اللوفر أبوظبي','Louvre Abu Dhabi'],['جزيرة ياس','Yas Island']],season:['أكتوبر – أبريل','October – April']},
 {id:'sll',r:'arab',ar:'صلالة',en:'Salalah',car:'عُمان',cen:'Oman',col:['#2D6A4F','#4B2D8E'],cities:[['salalah',4]],
  hl:[['خريف صلالة','Salalah Khareef'],['وادي دربات','Wadi Darbat'],['المغسيل','Al Mughsail'],['العيون والشلالات','Springs & waterfalls']],season:['يونيو – سبتمبر (الخريف)','June – September (Khareef)']},
 {id:'jor',r:'arab',ar:'الأردن: عمّان والبتراء والبحر الميت',en:'Jordan: Amman, Petra & Dead Sea',car:'الأردن',cen:'Jordan',col:['#B5651D','#4B2D8E'],cities:[['amman',3],['petra',1,'road'],['deadsea',2,'road']],
  hl:[['البتراء','Petra'],['وادي رم','Wadi Rum'],['البحر الميت','Dead Sea'],['جرش','Jerash']],season:['مارس – مايو وسبتمبر – نوفمبر','Mar – May & Sep – Nov']},
 {id:'mar',r:'arab',ar:'المغرب: مراكش والدار البيضاء',en:'Morocco: Marrakech & Casablanca',car:'المغرب',cen:'Morocco',col:['#C1272D','#006233'],cities:[['casablanca',2],['marrakech',4,'road']],
  hl:[['ساحة جامع الفنا','Jemaa el-Fnaa'],['مسجد الحسن الثاني','Hassan II Mosque'],['جبال الأطلس','Atlas Mountains'],['حديقة ماجوريل','Majorelle Garden']],season:['مارس – مايو وسبتمبر – نوفمبر','Mar – May & Sep – Nov']},

 {id:'par',r:'eu',ar:'باريس',en:'Paris',car:'فرنسا',cen:'France',col:['#002395','#4B2D8E'],cities:[['paris',5]],
  hl:[['برج إيفل','Eiffel Tower'],['متحف اللوفر','Louvre Museum'],['قصر فرساي','Versailles'],['ديزني لاند','Disneyland']],season:['أبريل – أكتوبر','April – October']},
 {id:'lon',r:'eu',ar:'لندن',en:'London',car:'المملكة المتحدة',cen:'United Kingdom',col:['#012169','#C8102E'],cities:[['london',5]],
  hl:[['بيغ بن','Big Ben'],['عين لندن','London Eye'],['استوديوهات هاري بوتر','Harry Potter studios'],['هارودز','Harrods']],season:['مايو – سبتمبر','May – September']},
 {id:'che',r:'eu',ar:'سويسرا: لوزيرن وإنترلاكن',en:'Switzerland: Lucerne & Interlaken',car:'سويسرا',cen:'Switzerland',col:['#D52B1E','#2D3047'],cities:[['lucerne',3],['interlaken',3,'train']],
  hl:[['جبل تيتليس','Mount Titlis'],['يونغفراوخ','Jungfraujoch'],['بحيرات سويسرا','Swiss lakes'],['قطارات بانورامية','Panoramic trains']],season:['يونيو – سبتمبر','June – September']},
 {id:'aut',r:'eu',ar:'النمسا: فيينا وزيلامسي',en:'Austria: Vienna & Zell am See',car:'النمسا',cen:'Austria',col:['#ED2939','#1E7B4F'],cities:[['vienna',3],['zellamsee',4,'road']],
  hl:[['بحيرة زيلامسي','Lake Zell'],['قمة كابرون','Kaprun glacier'],['قصر شونبرون','Schönbrunn Palace'],['شلالات كريمل','Krimml Falls']],season:['يونيو – سبتمبر','June – September']},
 {id:'ita',r:'eu',ar:'إيطاليا: روما وفلورنسا والبندقية',en:'Italy: Rome, Florence & Venice',car:'إيطاليا',cen:'Italy',col:['#009246','#CE2B37'],cities:[['rome',3],['florence',2,'train'],['venice',2,'train']],
  hl:[['الكولوسيوم','Colosseum'],['برج بيزا','Leaning Tower of Pisa'],['جندول البندقية','Venice gondola'],['نافورة تريفي','Trevi Fountain']],season:['أبريل – أكتوبر','April – October']},
 {id:'esp',r:'eu',ar:'إسبانيا والأندلس: مدريد وغرناطة وإشبيلية',en:'Spain & Andalusia: Madrid, Granada & Seville',car:'إسبانيا',cen:'Spain',col:['#AA151B','#C9A227'],cities:[['madrid',3],['granada',2,'train'],['seville',2,'train']],
  hl:[['قصر الحمراء','Alhambra'],['مسجد قرطبة','Mosque of Córdoba'],['طليطلة','Toledo'],['قصر إشبيلية','Alcázar of Seville']],season:['مارس – يونيو وسبتمبر – نوفمبر','Mar – Jun & Sep – Nov']},
 {id:'bih',r:'eu',ar:'البوسنة: سراييفو وموستار',en:'Bosnia: Sarajevo & Mostar',car:'البوسنة والهرسك',cen:'Bosnia & Herzegovina',col:['#002395','#FECB00'],cities:[['sarajevo',6]],
  hl:[['جسر موستار','Mostar Old Bridge'],['شلالات كرافيتسا','Kravica waterfalls'],['باشتشارشيا','Baščaršija'],['ينابيع البوسنة','Vrelo Bosne']],season:['مايو – سبتمبر','May – September']},
 {id:'prg',r:'eu',ar:'براغ',en:'Prague',car:'التشيك',cen:'Czechia',col:['#11457E','#D7141A'],cities:[['prague',4]],
  hl:[['قلعة براغ','Prague Castle'],['جسر تشارلز','Charles Bridge'],['كارلوفي فاري','Karlovy Vary'],['الساعة الفلكية','Astronomical Clock']],season:['أبريل – أكتوبر','April – October']},

 {id:'mle',r:'isl',ar:'المالديف',en:'Maldives',car:'المالديف',cen:'Maldives',col:['#00B4D8','#0077B6'],cities:[['maldives',4]],
  hl:[['فيلا فوق الماء','Overwater villa'],['شواطئ بيضاء','White-sand beaches'],['السنوركلينغ','Snorkeling'],['رحلة الدلافين','Dolphin cruise']],season:['نوفمبر – أبريل','November – April']},
 {id:'mru',r:'isl',ar:'موريشيوس',en:'Mauritius',car:'موريشيوس',cen:'Mauritius',col:['#00A551','#1A206D'],cities:[['mauritius',6]],
  hl:[['الأرض ذات الألوان السبعة','Seven Coloured Earth'],['جزيرة إيل أو سيرف','Île aux Cerfs'],['شلالات شاماريل','Chamarel Falls'],['منتجعات فاخرة','Luxury resorts']],season:['مايو – ديسمبر','May – December']},
 {id:'znz',r:'isl',ar:'زنجبار',en:'Zanzibar',car:'تنزانيا',cen:'Tanzania',col:['#1EB53A','#00A3DD'],cities:[['zanzibar',5]],
  hl:[['ستون تاون','Stone Town'],['السلاحف العملاقة','Giant tortoises'],['سفاري بلو','Safari Blue'],['شواطئ نونغوي','Nungwi beaches']],season:['يونيو – أكتوبر وديسمبر – فبراير','Jun – Oct & Dec – Feb']},
 {id:'lka',r:'isl',ar:'سريلانكا',en:'Sri Lanka',car:'سريلانكا',cen:'Sri Lanka',col:['#8D153A','#EB7400'],cities:[['kandy',2],['nuwara',2,'road'],['bentota',3,'road']],
  hl:[['مزارع الشاي','Tea plantations'],['ملجأ الفيلة','Elephant orphanage'],['نهر مادو','Madu River'],['شواطئ بينتوتا','Bentota beaches']],season:['ديسمبر – أبريل','December – April']}
];

/* Airports (for PNR + flight display) */
const AIRPORTS = {
 RUH:['الرياض','Riyadh'],JED:['جدة','Jeddah'],DMM:['الدمام','Dammam'],MED:['المدينة المنورة','Madinah'],AHB:['أبها','Abha'],TIF:['الطائف','Taif'],ELQ:['القصيم','Qassim'],TUU:['تبوك','Tabuk'],ULH:['العلا','AlUla'],
 IST:['إسطنبول','Istanbul'],SAW:['إسطنبول صبيحة','Istanbul SAW'],TZX:['طرابزون','Trabzon'],AYT:['أنطاليا','Antalya'],NAV:['نيفشهير','Nevşehir'],ASR:['قيصري','Kayseri'],BJV:['بودروم','Bodrum'],ESB:['أنقرة','Ankara'],
 TBS:['تبليسي','Tbilisi'],BUS:['باتومي','Batumi'],KUT:['كوتايسي','Kutaisi'],GYD:['باكو','Baku'],GBB:['قبالة','Gabala'],ALA:['ألماتي','Almaty'],NQZ:['أستانا','Astana'],TAS:['طشقند','Tashkent'],SKD:['سمرقند','Samarkand'],BHK:['بخارى','Bukhara'],
 KUL:['كوالالمبور','Kuala Lumpur'],LGK:['لنكاوي','Langkawi'],PEN:['بينانج','Penang'],BKI:['كوتا كينابالو','Kota Kinabalu'],DPS:['بالي','Bali'],CGK:['جاكرتا','Jakarta'],BDO:['باندونق','Bandung'],HKT:['بوكيت','Phuket'],BKK:['بانكوك','Bangkok'],DMK:['بانكوك دون موينج','Bangkok DMK'],KBV:['كرابي','Krabi'],SIN:['سنغافورة','Singapore'],
 HND:['طوكيو هانيدا','Tokyo Haneda'],NRT:['طوكيو ناريتا','Tokyo Narita'],KIX:['أوساكا','Osaka'],ICN:['سيول','Seoul'],
 MLE:['ماليه','Malé'],MRU:['موريشيوس','Mauritius'],ZNZ:['زنجبار','Zanzibar'],CMB:['كولومبو','Colombo'],SEZ:['سيشل','Seychelles'],
 CAI:['القاهرة','Cairo'],SPX:['سفنكس','Sphinx'],SSH:['شرم الشيخ','Sharm El Sheikh'],HRG:['الغردقة','Hurghada'],LXR:['الأقصر','Luxor'],ASW:['أسوان','Aswan'],HBE:['الإسكندرية','Alexandria'],
 DXB:['دبي','Dubai'],AUH:['أبوظبي','Abu Dhabi'],SHJ:['الشارقة','Sharjah'],SLL:['صلالة','Salalah'],MCT:['مسقط','Muscat'],AMM:['عمّان','Amman'],AQJ:['العقبة','Aqaba'],RAK:['مراكش','Marrakech'],CMN:['الدار البيضاء','Casablanca'],DOH:['الدوحة','Doha'],BAH:['البحرين','Bahrain'],KWI:['الكويت','Kuwait'],BEY:['بيروت','Beirut'],
 CDG:['باريس','Paris'],ORY:['باريس أورلي','Paris Orly'],LHR:['لندن هيثرو','London Heathrow'],LGW:['لندن جاتويك','London Gatwick'],ZRH:['زيورخ','Zurich'],GVA:['جنيف','Geneva'],VIE:['فيينا','Vienna'],SZG:['سالزبورغ','Salzburg'],MUC:['ميونخ','Munich'],FRA:['فرانكفورت','Frankfurt'],
 FCO:['روما','Rome'],MXP:['ميلانو','Milan'],VCE:['البندقية','Venice'],MAD:['مدريد','Madrid'],BCN:['برشلونة','Barcelona'],AGP:['مالقة','Málaga'],SVQ:['إشبيلية','Seville'],SJJ:['سراييفو','Sarajevo'],PRG:['براغ','Prague'],AMS:['أمستردام','Amsterdam'],ATH:['أثينا','Athens'],TIA:['تيرانا','Tirana']
};
const AIRLINES = {
 SV:['الخطوط السعودية','Saudia'],XY:['طيران ناس','flynas'],F3:['طيران أديل','flyadeal'],RX:['طيران الرياض','Riyadh Air'],TK:['الخطوط التركية','Turkish Airlines'],PC:['بيغاسوس','Pegasus'],
 MS:['مصر للطيران','EgyptAir'],EK:['طيران الإمارات','Emirates'],QR:['القطرية','Qatar Airways'],EY:['الاتحاد','Etihad'],FZ:['فلاي دبي','flydubai'],G9:['العربية للطيران','Air Arabia'],GF:['طيران الخليج','Gulf Air'],WY:['الطيران العماني','Oman Air'],RJ:['الملكية الأردنية','Royal Jordanian'],AT:['الملكية المغربية','Royal Air Maroc'],KU:['الكويتية','Kuwait Airways'],J9:['طيران الجزيرة','Jazeera Airways'],
 MH:['الماليزية','Malaysia Airlines'],AK:['طيران آسيا','AirAsia'],D7:['طيران آسيا إكس','AirAsia X'],GA:['جارودا','Garuda Indonesia'],TG:['التايلاندية','Thai Airways'],SQ:['السنغافورية','Singapore Airlines'],NH:['أنا','ANA'],JL:['الخطوط اليابانية','Japan Airlines'],KE:['الكورية','Korean Air'],OZ:['آسيانا','Asiana'],UL:['السريلانكية','SriLankan'],
 J2:['أزال','AZAL'],A9:['الخطوط الجورجية','Georgian Airways'],KC:['إير أستانا','Air Astana'],HY:['الأوزبكية','Uzbekistan Airways'],FS:['فلاي آريستان','FlyArystan'],ET:['الإثيوبية','Ethiopian'],KQ:['الكينية','Kenya Airways'],
 AF:['إير فرانس','Air France'],BA:['البريطانية','British Airways'],LH:['لوفتهانزا','Lufthansa'],LX:['السويسرية','SWISS'],OS:['النمساوية','Austrian'],AZ:['إيتا','ITA Airways'],IB:['أيبيريا','Iberia'],VY:['فويلنغ','Vueling'],KL:['كيه إل إم','KLM'],W6:['ويز إير','Wizz Air'],SM:['إير كايرو','Air Cairo'],NE:['نسما','Nesma'],
 '6E':['إنديجو','IndiGo'],AI:['إير إنديا','Air India'],PK:['الباكستانية','PIA']
};

const CURRENCIES = {SAR:1,USD:3.75,EUR:4.35,GBP:5.0,AED:1.021,TRY:0.088,EGP:0.077,MYR:0.89,THB:0.115,IDR:0.00023,SGD:2.9,JPY:0.025,KRW:0.0027,CHF:4.7,GEL:1.39,AZN:2.2,KZT:0.0073,UZS:0.0003,JOD:5.29,MAD:0.41,OMR:9.74,CZK:0.18,BAM:2.22,LKR:0.0125,MUR:0.082};

const MEALS = {RO:['بدون وجبات','Room only'],BB:['إفطار','Breakfast'],HB:['إفطار وعشاء','Half board'],FB:['إقامة كاملة','Full board'],AI:['شامل كليًا','All inclusive']};
const VIA = {air:['جوًا','by air'],road:['برًا','by road'],train:['بالقطار','by train'],sea:['بحرًا','by sea']};

/* Special arrival texts */
CITIES.maldives.arr=['الوصول إلى مطار ماليه والاستقبال ثم الانتقال بالقارب السريع أو الطائرة المائية إلى المنتجع','Arrival at Malé airport, meet & assist and transfer by speedboat or seaplane to the resort'];
CITIES.kandy.arr=['الوصول إلى مطار كولومبو والاستقبال ثم التوجه برًا إلى كاندي وتسجيل الدخول في الفندق','Arrival in Colombo, meet & assist and drive to Kandy for hotel check-in'];
CITIES.luxor.arr=['الوصول إلى الأقصر والاستقبال ثم الصعود إلى الباخرة النيلية','Arrival in Luxor, meet & assist and embarkation on the Nile cruise'];
CITIES.lucerne.arr=['الوصول إلى مطار زيورخ والاستقبال ثم التوجه إلى لوزيرن وتسجيل الدخول في الفندق','Arrival at Zurich airport, meet & assist and transfer to Lucerne for hotel check-in'];
CITIES.puncak.arr=['الوصول إلى جاكرتا والاستقبال ثم التوجه إلى بونشاك','Arrival in Jakarta, meet & assist and drive to Puncak'];
CITIES.cappadocia.arr=['الوصول إلى كبادوكيا والاستقبال ثم التوجه إلى الفندق','Arrival in Cappadocia, meet & assist and transfer to the hotel'];
