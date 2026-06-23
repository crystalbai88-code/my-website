// 早期文明(前3500–前1000) · 人物关系数据 —— 供 early-network.html 使用
// 群组 c: meso(两河) / egypt(埃及) / anatolia(赫梯) / aegean(爱琴海) / china(华夏)
const CLASSICAL_PEOPLE=[
  // ── 两河流域 (meso) ──
  {id:"gilgamesh",n:"吉尔伽美什",e:"Gilgamesh",c:"meso",r:"ruler",d:"约前2700",b:"乌鲁克国王,后被神化为半神英雄,《吉尔伽美什史诗》主角,寻找永生。",rel:[{i:"enkidu",t:"挚友"}]},
  {id:"enkidu",n:"恩奇都",e:"Enkidu",c:"meso",r:"other",d:"传说",b:"野人出身,与吉尔伽美什从对手变挚友,其死促使吉尔伽美什追寻永生。",rel:[{i:"gilgamesh",t:"挚友"}]},
  {id:"sargon",n:"萨尔贡",e:"Sargon of Akkad",c:"meso",r:"ruler",d:"约前2334—前2279",b:"出身低微,统一两河、建立阿卡德帝国——人类第一个帝国。",rel:[{i:"lugalzagesi",t:"击败俘虏"},{i:"enheduanna",t:"其女"},{i:"naramsin",t:"其孙"}]},
  {id:"lugalzagesi",n:"卢伽尔扎克西",e:"Lugalzagesi",c:"meso",r:"ruler",d:"约前2358—前2334",b:"乌玛之王,一度统一苏美尔,后被萨尔贡击败示众。",rel:[{i:"sargon",t:"败于其手"}]},
  {id:"enheduanna",n:"恩赫杜安娜",e:"Enheduanna",c:"meso",r:"religious",d:"约前2285",b:"萨尔贡之女、乌尔最高女祭司;人类历史上第一个留下名字的作者。",rel:[{i:"sargon",t:"其父"}]},
  {id:"naramsin",n:"纳拉姆辛",e:"Naram-Sin",c:"meso",r:"ruler",d:"约前2254—前2218",b:"萨尔贡之孙,阿卡德最盛之主,首个自称'四方之王'与'神'的国王。",rel:[{i:"sargon",t:"其祖"}]},
  {id:"urnammu",n:"乌尔纳木",e:"Ur-Nammu",c:"meso",r:"ruler",d:"约前2112—前2095",b:"乌尔第三王朝建立者,颁布已知最早的成文法典,建乌尔大塔庙。",rel:[]},
  {id:"hammurabi",n:"汉谟拉比",e:"Hammurabi",c:"meso",r:"ruler",d:"约前1792—前1750",b:"古巴比伦之主,统一两河,《汉谟拉比法典》'以眼还眼'。",rel:[{i:"mursili1",t:"其朝为赫梯所灭"}]},
  // ── 古埃及 (egypt) ──
  {id:"narmer",n:"纳尔迈",e:"Narmer",c:"egypt",r:"ruler",d:"约前3100",b:"统一上下埃及的第一位法老,《纳尔迈调色板》记其功业。",rel:[]},
  {id:"djoser",n:"乔赛尔",e:"Djoser",c:"egypt",r:"ruler",d:"约前2667",b:"古王国开国之君,建萨卡拉阶梯金字塔。",rel:[{i:"imhotep",t:"任用"}]},
  {id:"imhotep",n:"伊姆霍特普",e:"Imhotep",c:"egypt",r:"thinker",d:"约前2650",b:"阶梯金字塔的设计者,后被神化为智慧与医学之神。",rel:[{i:"djoser",t:"效力"}]},
  {id:"sneferu",n:"斯尼弗鲁",e:"Sneferu",c:"egypt",r:"ruler",d:"约前2613—前2589",b:"第四王朝开创者,造三座金字塔逐步完善技术。",rel:[{i:"khufu",t:"其子"}]},
  {id:"khufu",n:"胡夫",e:"Khufu",c:"egypt",r:"ruler",d:"约前2589—前2566",b:"建吉萨大金字塔——古代七大奇迹中唯一现存者。",rel:[{i:"sneferu",t:"其父"},{i:"khafre",t:"其子"}]},
  {id:"khafre",n:"哈夫拉",e:"Khafre",c:"egypt",r:"ruler",d:"约前2558—前2532",b:"建吉萨第二金字塔与狮身人面像(面据信即其本人)。",rel:[{i:"khufu",t:"其父"}]},
  {id:"hatshepsut",n:"哈特谢普苏特",e:"Hatshepsut",c:"egypt",r:"ruler",d:"约前1473—前1458",b:"埃及女法老,戴假胡须、重商不重战,远征蓬特。",rel:[{i:"thutmose3",t:"继子"}]},
  {id:"thutmose3",n:"图特摩斯三世",e:"Thutmose III",c:"egypt",r:"general",d:"约前1479—前1425",b:"'古代的拿破仑',17次远征建立埃及最大版图;米吉多之战。",rel:[{i:"hatshepsut",t:"继母/摄政"}]},
  {id:"akhenaten",n:"阿肯那顿",e:"Akhenaten",c:"egypt",r:"ruler",d:"约前1353—前1336在位",b:"原名阿蒙霍特普四世。发动埃及第一次'一神教'革命:废众神、独尊太阳神阿顿,迁都阿玛尔纳,削夺阿蒙祭司之权。死后改革被全面推翻、新都废弃,他的名字更被后世从王表中抹去。",rel:[{i:"nefertiti",t:"王后"},{i:"tutankhamun",t:"其子"}]},
  {id:"nefertiti",n:"奈费尔提提",e:"Nefertiti",c:"egypt",r:"other",d:"约前1340",b:"阿肯纳顿王后,美艳半身像闻名,或有很大政治影响力。",rel:[{i:"akhenaten",t:"其夫"}]},
  {id:"tutankhamun",n:"图坦卡蒙",e:"Tutankhamun",c:"egypt",r:"ruler",d:"约前1332—前1323",b:"少年法老,恢复多神教;1922年其黄金陵墓完好出土。",rel:[{i:"akhenaten",t:"其父"}]},
  {id:"ramesses2",n:"拉美西斯二世",e:"Ramesses II",c:"egypt",r:"ruler",d:"约前1279—前1213",b:"'大帝',在位约66年,卡叠什之战后签人类最早国际和约,建阿布辛贝。",rel:[{i:"muwatalli2",t:"卡叠什之战对手"},{i:"hattusili3",t:"签订和约"}]},
  // ── 赫梯/安纳托利亚 (anatolia) ──
  {id:"hattusili1",n:"哈图西里一世",e:"Hattusili I",c:"anatolia",r:"ruler",d:"约前1650—前1620",b:"赫梯王国实际创建者,迁都哈图沙、远征叙利亚。",rel:[{i:"mursili1",t:"其孙(养子)"}]},
  {id:"mursili1",n:"穆尔西里一世",e:"Mursili I",c:"anatolia",r:"ruler",d:"约前1620—前1590",b:"约前1595年远征洗劫巴比伦,终结汉谟拉比王朝。",rel:[{i:"hattusili1",t:"其祖"},{i:"hammurabi",t:"灭其王朝"}]},
  {id:"telepinu",n:"帖利平努",e:"Telepinu",c:"anatolia",r:"ruler",d:"约前1525",b:"颁《帖利平努法令》规定王位继承,被视为早期宪政雏形。",rel:[]},
  {id:"suppiluliuma1",n:"苏庇路里乌玛一世",e:"Suppiluliuma I",c:"anatolia",r:"ruler",d:"约前1350—前1322",b:"赫梯最伟大之主,灭米坦尼,使赫梯与埃及平起平坐。",rel:[{i:"muwatalli2",t:"先王"}]},
  {id:"muwatalli2",n:"穆瓦塔里二世",e:"Muwatalli II",c:"anatolia",r:"ruler",d:"约前1295—前1272",b:"与拉美西斯二世在卡叠什爆发大战车会战。",rel:[{i:"ramesses2",t:"卡叠什之战对手"}]},
  {id:"hattusili3",n:"哈图西里三世",e:"Hattusili III",c:"anatolia",r:"ruler",d:"约前1267—前1237",b:"与拉美西斯二世签《卡叠什和约》——人类最早的国际条约。",rel:[{i:"ramesses2",t:"签订和约"}]},
  // ── 爱琴海 (aegean) ──
  {id:"minos",n:"米诺斯王",e:"King Minos",c:"aegean",r:"ruler",d:"传说",b:"克里特传说之王,迷宫与弥诺陶洛斯神话的主角,米诺斯文明因之得名。",rel:[]},
  {id:"agamemnon",n:"阿伽门农",e:"Agamemnon",c:"aegean",r:"ruler",d:"传说(约前1250)",b:"迈锡尼王、特洛伊战争希腊联军统帅;'阿伽门农黄金面具'闻名。",rel:[{i:"nestor",t:"麾下谋臣"}]},
  {id:"nestor",n:"涅斯托尔",e:"Nestor",c:"aegean",r:"other",d:"传说",b:"皮洛斯老王,特洛伊战争中的智慧顾问;皮洛斯宫殿出土大量线形文字B。",rel:[{i:"agamemnon",t:"同盟"}]},
  // ── 华夏 (china) ──
  // 史记批次4 · 上古五帝(《史记·五帝本纪》)
  {id:"huangdi",n:"黄帝",e:"Yellow Emperor",c:"china",r:"ruler",d:"约前2700(传说)",b:"传说中的华夏人文初祖。阪泉之战收服炎帝、涿鹿之战擒杀蚩尤,统一华夏诸部;后世华人自称'炎黄子孙'。",rel:[{i:"yandi",t:"阪泉之战"},{i:"chiyou",t:"涿鹿擒之"}]},
  {id:"yandi",n:"炎帝",e:"Yan Emperor",c:"china",r:"ruler",d:"约前2700(传说)",b:"即神农氏,传说尝百草、教民耕种。与黄帝阪泉之战后融合,合称'炎黄'。",rel:[{i:"huangdi",t:"阪泉而后合"}]},
  {id:"chiyou",n:"蚩尤",e:"Chiyou",c:"china",r:"general",d:"上古(传说)",b:"九黎部落首领,骁勇善战、传说能呼风唤雨;涿鹿之战败于黄帝,后世尊为'战神'。",rel:[{i:"huangdi",t:"涿鹿败亡"}]},
  {id:"yao",n:"尧",e:"Yao",c:"china",r:"ruler",d:"约前2300(传说)",b:"五帝之一,定历法、敬授民时,以仁德治天下;不传子而'禅让'于舜,'尧天舜日'是太平象征。",rel:[{i:"shun",t:"禅让于舜"}]},
  {id:"shun",n:"舜",e:"Shun",c:"china",r:"ruler",d:"约前2200(传说)",b:"五帝之一,以孝感动天下,受尧禅让;任用大禹治水,又禅位于禹——'禅让'传统的典范。",rel:[{i:"yao",t:"受尧禅让"},{i:"dayu",t:"禅让于禹"}]},
  {id:"dayu",n:"大禹",e:"Yu the Great",c:"china",r:"ruler",d:"约前2070",b:"治水英雄,三过家门而不入;其子启开创世袭王朝(夏)。",rel:[{i:"qi",t:"其子"}]},
  {id:"qi",n:"启",e:"Qi",c:"china",r:"ruler",d:"约前2070",b:"禹之子,继位打破禅让、开创'家天下'的夏王朝。",rel:[{i:"dayu",t:"其父"}]},
  {id:"jie",n:"夏桀",e:"Jie",c:"china",r:"ruler",d:"夏末",b:"夏朝末代暴君,荒淫无道,被商汤推翻。",rel:[{i:"tang",t:"被其推翻"}]},
  {id:"tang",n:"商汤",e:"Tang of Shang",c:"china",r:"ruler",d:"约前1600",b:"以'天命'推翻夏桀、建立商朝;'汤武革命'之始。",rel:[{i:"jie",t:"推翻"},{i:"yiyin",t:"任用为相"}]},
  {id:"yiyin",n:"伊尹",e:"Yi Yin",c:"china",r:"thinker",d:"约前1600",b:"商汤的辅相,厨师出身的政治天才,'调和五味'喻治国;曾放逐太甲。",rel:[{i:"tang",t:"辅佐"},{i:"taijia",t:"放逐又迎回"}]},
  {id:"taijia",n:"太甲",e:"Tai Jia",c:"china",r:"ruler",d:"约前1580",b:"成汤之孙,早年暴虐被伊尹放逐桐宫,改过后成贤君。",rel:[{i:"yiyin",t:"被其放逐"}]},
  {id:"wuding",n:"武丁",e:"Wu Ding",c:"china",r:"ruler",d:"约前1250—前1192",b:"晚商最强之主,大举征伐、商朝鼎盛。",rel:[{i:"fuhao",t:"王后"}]},
  {id:"fuhao",n:"妇好",e:"Fu Hao",c:"china",r:"general",d:"约前1200",b:"武丁王后,中国最早有文字记录的女将军,统兵上万并主持祭祀。",rel:[{i:"wuding",t:"其夫"}]},
  {id:"dixin",n:"帝辛(纣王)",e:"Di Xin",c:"china",r:"ruler",d:"约前1075—前1046",b:"商朝末代君主,史书中的暴君;牧野之战兵败自焚,商亡。",rel:[{i:"bigan",t:"剖其心"}]},
  {id:"bigan",n:"比干",e:"Bigan",c:"china",r:"other",d:"商末",b:"纣王叔父,因直谏被剖心而死,后世'忠臣'象征。",rel:[{i:"dixin",t:"进谏被杀"}]},
];
const CLASSICAL_ICON={
  gilgamesh:'👑',enkidu:'🌿',sargon:'⚔️',lugalzagesi:'🏺',enheduanna:'📜',naramsin:'👑',urnammu:'⚖️',hammurabi:'⚖️',
  narmer:'👑',djoser:'🔺',imhotep:'📐',sneferu:'🔺',khufu:'🔺',khafre:'🦁',hatshepsut:'👑',thutmose3:'⚔️',akhenaten:'☀️',nefertiti:'👑',tutankhamun:'⚱️',ramesses2:'🏛️',
  hattusili1:'🛡️',mursili1:'⚔️',telepinu:'📜',suppiluliuma1:'🛡️',muwatalli2:'🏹',hattusili3:'🕊️',
  minos:'🐂',agamemnon:'🎭',nestor:'🗣️',
  dayu:'🌊',qi:'👑',jie:'🔥',tang:'👑',yiyin:'🍲',taijia:'👑',wuding:'🐉',fuhao:'🏹',dixin:'🔥',bigan:'💔',
};
const ROLE_ICON_FALLBACK={ruler:'👑',general:'⚔️',thinker:'📜',religious:'✝️',other:'🔹'};
function personIconOf(p){ if(!p)return'👤'; const id=typeof p==='string'?p:p.id; if(CLASSICAL_ICON[id])return CLASSICAL_ICON[id]; const role=typeof p==='object'?p.r:null; return ROLE_ICON_FALLBACK[role]||'👤'; }
if(typeof window!=='undefined'){window.CLASSICAL_ICON=CLASSICAL_ICON;window.personIconOf=personIconOf;}
