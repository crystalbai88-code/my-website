// 中世纪多中心 (STAGE_03) 人物数据 · 共享 (关系网 + 深度页 共用)
// 保持与古典范本相同的全局名 CLASSICAL_PEOPLE / CLASSICAL_ICON / personIconOf
// 地区 c: china/japan/steppe/islam/india/sea/byzantine/europe/africa/americas
// 角色 r: ruler/general/thinker/religious/other
const CLASSICAL_PEOPLE=[
// ═══ 中国 · 唐 ═══
{id:"taizong",n:"唐太宗",e:"Emperor Taizong",c:"china",r:"ruler",d:"598—649",b:"李世民，玄武门之变后即位，开创'贞观之治'。虚心纳谏(魏征)、轻徭薄赋、完善科举与三省六部，被尊为'天可汗'，唐朝盛世的奠基者。",rel:[{i:"wuzetian",t:"其子之妃"},{i:"xuanzang",t:"同时代"}]},
{id:"wuzetian",n:"武则天",e:"Wu Zetian",c:"china",r:"ruler",d:"624—705",b:"中国历史上唯一的女皇帝。从才人到皇后再到称帝建'周'，重用酷吏也广开科举、提拔寒门，政启开元。晚年还政李唐，立无字碑任后人评说。",rel:[{i:"taizong",t:"先帝之妃"},{i:"xuanzong",t:"祖母"}]},
{id:"xuanzong",n:"唐玄宗",e:"Emperor Xuanzong",c:"china",r:"ruler",d:"685—762",b:"李隆基，前期'开元盛世'国力达顶峰，后期宠杨贵妃、怠政，引发'安史之乱'(755),唐朝由盛转衰。",rel:[{i:"anlushan",t:"叛将"},{i:"libai",t:"宫廷诗人"},{i:"wuzetian",t:"祖母"}]},
{id:"libai",n:"李白",e:"Li Bai",c:"china",r:"thinker",d:"701—762",b:"'诗仙'，盛唐浪漫主义诗歌的巅峰，'飞流直下三千尺''天生我材必有用'，豪放飘逸、嗜酒求仙，中国最著名的诗人之一。",rel:[{i:"dufu",t:"挚友"},{i:"xuanzong",t:"曾供奉翰林"}]},
{id:"dufu",n:"杜甫",e:"Du Fu",c:"china",r:"thinker",d:"712—770",b:"'诗圣'，以沉郁顿挫记录安史之乱中的民间疾苦，'三吏''三别''朱门酒肉臭，路有冻死骨'，中国现实主义诗歌的高峰。",rel:[{i:"libai",t:"挚友"}]},
{id:"xuanzang",n:"玄奘",e:"Xuanzang",c:"china",r:"religious",d:"602—664",b:"唐代高僧，西行印度十七年取经，于那烂陀寺求学，归国译经千卷、著《大唐西域记》，是中印文化交流的丰碑(《西游记》原型)。",rel:[{i:"taizong",t:"受其礼遇"}]},
{id:"anlushan",n:"安禄山",e:"An Lushan",c:"china",r:"general",d:"703—757",b:"粟特裔节度使，755年发动'安史之乱'，攻陷长安，使唐朝由盛转衰、人口锐减，中国历史的重大转折点。",rel:[{i:"xuanzong",t:"反叛"}]},
// ═══ 中国 · 宋 ═══
{id:"zhao_kuangyin",n:"宋太祖",e:"Emperor Taizu of Song",c:"china",r:"ruler",d:"927—976",b:"赵匡胤，'陈桥兵变'黄袍加身建立宋朝，'杯酒释兵权'解除武将威胁，确立重文抑武国策，结束五代乱世。",rel:[{i:"wang_anshi",t:"后世变法"}]},
{id:"wang_anshi",n:"王安石",e:"Wang Anshi",c:"china",r:"thinker",d:"1021—1086",b:"北宋政治家、文学家。神宗时主持'熙宁变法'(青苗法、募役法等)富国强兵，触动既得利益、争议巨大，与司马光对立，最终失败。",rel:[{i:"sima_guang",t:"政敌"},{i:"sushi",t:"政见不合"}]},
{id:"sima_guang",n:"司马光",e:"Sima Guang",c:"china",r:"thinker",d:"1019—1086",b:"北宋史学家、保守派领袖，反对王安石变法。主编编年体巨著《资治通鉴》,'鉴于往事，有资于治道'。儿时'砸缸救友'家喻户晓。",rel:[{i:"wang_anshi",t:"政敌"}]},
{id:"sushi",n:"苏轼",e:"Su Shi",c:"china",r:"thinker",d:"1037—1101",b:"苏东坡，宋代文坛全才——诗词文书画俱绝。'大江东去''但愿人长久'，旷达豁然，屡遭贬谪仍乐观，'东坡肉'亦传为美谈。",rel:[{i:"wang_anshi",t:"政见不合"}]},
{id:"yuefei",n:"岳飞",e:"Yue Fei",c:"china",r:"general",d:"1103—1142",b:"南宋抗金名将，'精忠报国'，大破金军，却被秦桧以'莫须有'罪名害死于风波亭，成为中华忠义的象征。",rel:[{i:"zhao_kuangyin",t:"宋室"}]},
{id:"zhuxi",n:"朱熹",e:"Zhu Xi",c:"china",r:"thinker",d:"1130—1200",b:"南宋理学集大成者，融合儒释道建立'程朱理学'(存天理灭人欲),注《四书》成为此后科举标准，影响东亚思想七百年。",rel:[{i:"sima_guang",t:"承儒统"}]},
{id:"shen_kuo",n:"沈括",e:"Shen Kuo",c:"china",r:"thinker",d:"1031—1095",b:"北宋科学家，著《梦溪笔谈》,记录活字印刷、指南针、石油等，是中国古代科技的百科全书式人物。",rel:[]},
// ═══ 日本 ═══
{id:"murasaki",n:"紫式部",e:"Murasaki Shikibu",c:"japan",r:"thinker",d:"约973—1014",b:"平安时代宫廷女官，著《源氏物语》——世界最早的长篇小说之一，日本古典文学的巅峰，展现平安贵族的'物哀'美学。",rel:[]},
{id:"yoritomo",n:"源赖朝",e:"Minamoto no Yoritomo",c:"japan",r:"ruler",d:"1147—1199",b:"源平合战胜利者，1185年建立镰仓幕府、自任征夷大将军，开启日本近七百年的武士(幕府)统治时代。",rel:[{i:"hojo",t:"外戚继承"}]},
{id:"hojo",n:"北条时宗",e:"Hojo Tokimune",c:"japan",r:"ruler",d:"1251—1284",b:"镰仓幕府执权，两次(1274/1281)抵御忽必烈的蒙古大军入侵，台风('神风')助日本击退元军，'神风'传说由此而来。",rel:[{i:"yoritomo",t:"承幕府"},{i:"kublai",t:"抵御其入侵"}]},
{id:"ashikaga",n:"足利义满",e:"Ashikaga Yoshimitsu",c:"japan",r:"ruler",d:"1358—1408",b:"室町幕府第三代将军，统一南北朝、建金阁寺、与明朝勘合贸易，室町文化的鼎盛期。",rel:[{i:"yoritomo",t:"幕府传统"}]},
// ═══ 草原 · 蒙古 ═══
{id:"genghis",n:"成吉思汗",e:"Genghis Khan",c:"steppe",r:"ruler",d:"约1162—1227",b:"铁木真，统一蒙古各部，建立人类历史上最大的连续陆地帝国。军事天才与组织家，颁《大札撒》、建驿站，征服横跨欧亚，深刻改变世界格局。",rel:[{i:"ogedei",t:"子"},{i:"kublai",t:"孙"}]},
{id:"ogedei",n:"窝阔台",e:"Ögedei Khan",c:"steppe",r:"ruler",d:"约1186—1241",b:"成吉思汗三子、第二代大汗。灭金、西征欧洲(拔都)直抵匈牙利，建哈拉和林为都，其暴卒使蒙古止步于欧洲。",rel:[{i:"genghis",t:"父"}]},
{id:"kublai",n:"忽必烈",e:"Kublai Khan",c:"steppe",r:"ruler",d:"1215—1294",b:"成吉思汗之孙，灭南宋、1271年建元朝、定都大都(北京),成为中国皇帝。接见马可·波罗，两征日本失败，融合草原与中原统治。",rel:[{i:"genghis",t:"祖父"},{i:"marco_polo",t:"接见"},{i:"hojo",t:"征日受阻"}]},
// ═══ 伊斯兰世界 ═══
{id:"muhammad",n:"穆罕默德",e:"Muhammad",c:"islam",r:"religious",d:"约570—632",b:"伊斯兰教先知。610年得'启示'传播一神信仰，622年'希吉拉'迁麦地那(伊斯兰纪元元年),统一阿拉伯半岛，《古兰经》与其言行(圣训)成为伊斯兰文明的根基。",rel:[{i:"abu_bakr",t:"继承者"},{i:"ali",t:"女婿/堂弟"},{i:"umar",t:"继任哈里发"}]},
{id:"abu_bakr",n:"阿布·伯克尔",e:"Abu Bakr",c:"islam",r:"ruler",d:"约573—634",b:"第一任正统哈里发，穆罕默德挚友与岳父。平定叛乱、统一阿拉伯、开始向外扩张，下令汇集《古兰经》。",rel:[{i:"muhammad",t:"继承"},{i:"umar",t:"继任者"}]},
{id:"umar",n:"欧麦尔",e:"Umar",c:"islam",r:"ruler",d:"约584—644",b:"第二任正统哈里发，伊斯兰大征服的统帅——夺取叙利亚、埃及、波斯，奠定阿拉伯帝国版图，建立行政与历法制度。",rel:[{i:"abu_bakr",t:"继承"},{i:"ali",t:"后继哈里发"}]},
{id:"ali",n:"阿里",e:"Ali ibn Abi Talib",c:"islam",r:"ruler",d:"约601—661",b:"穆罕默德堂弟兼女婿，第四任正统哈里发。其继承之争导致伊斯兰分裂为逊尼派与什叶派(什叶派尊其为首位伊玛目)。",rel:[{i:"muhammad",t:"堂弟/女婿"},{i:"umar",t:"前任"}]},
{id:"harun",n:"哈伦·拉希德",e:"Harun al-Rashid",c:"islam",r:"ruler",d:"763—809",b:"阿拔斯王朝鼎盛期哈里发，巴格达成为世界中心，扶持智慧宫。《一千零一夜》中传奇君主的原型，与查理曼互遣使节。",rel:[{i:"al_khwarizmi",t:"扶持学术"},{i:"charlemagne",t:"互遣使节"}]},
{id:"al_khwarizmi",n:"花拉子米",e:"Al-Khwarizmi",c:"islam",r:"thinker",d:"约780—850",b:"巴格达智慧宫数学家。著《代数学》创立代数(algebra一词源于其书),系统引入印度数字与'零'传向欧洲。'算法'(algorithm)即源自其名。",rel:[{i:"harun",t:"受其王朝扶持"},{i:"avicenna",t:"伊斯兰科学传承"}]},
{id:"avicenna",n:"阿维森纳(伊本·西拿)",e:"Avicenna",c:"islam",r:"thinker",d:"980—1037",b:"波斯博学家，《医典》统治欧洲医学教育六百年，融合亚里士多德哲学与伊斯兰思想，中世纪最伟大的学者之一。",rel:[{i:"al_khwarizmi",t:"承伊斯兰科学"},{i:"averroes",t:"哲学传承"}]},
{id:"averroes",n:"阿威罗伊(伊本·路世德)",e:"Averroes",c:"islam",r:"thinker",d:"1126—1198",b:"安达卢斯(西班牙)哲学家，亚里士多德最伟大的注释者，其著作传入欧洲点燃经院哲学与理性之争，影响阿奎那。",rel:[{i:"avicenna",t:"哲学传承"},{i:"aquinas",t:"影响"}]},
{id:"ibn_battuta",n:"伊本·白图泰",e:"Ibn Battuta",c:"islam",r:"other",d:"1304—1369",b:"摩洛哥大旅行家，30年游历从西非到中国约12万公里，《游记》是中世纪伊斯兰世界最详尽的见闻录，堪比马可·波罗。",rel:[{i:"mansa_musa",t:"记录其帝国"},{i:"marco_polo",t:"东西方旅行家"}]},
// ═══ 印度 ═══
{id:"harsha",n:"戒日王",e:"Harsha",c:"india",r:"ruler",d:"约590—647",b:"后笈多时代统一北印度的君主，崇佛护文、广行布施，玄奘曾访其朝廷并参加曲女城辩经大会。其死后北印度再度分裂。",rel:[{i:"xuanzang",t:"接待玄奘"}]},
{id:"rajaraja",n:"罗茶罗乍一世",e:"Rajaraja Chola I",c:"india",r:"ruler",d:"约947—1014",b:"朱罗帝国最伟大君主，建强大海军征服斯里兰卡与马尔代夫、远征东南亚，兴建坦贾武尔大神庙(世界遗产),南印度的黄金时代。",rel:[]},
{id:"ramanuja",n:"罗摩奴阇",e:"Ramanuja",c:"india",r:"religious",d:"约1017—1137",b:"印度教虔信(Bhakti)运动的核心哲学家，倡导对神(毗湿奴)的虔诚之爱可超越种姓，深刻影响印度宗教。",rel:[]},
// ═══ 东南亚 ═══
{id:"suryavarman2",n:"苏耶跋摩二世",e:"Suryavarman II",c:"sea",r:"ruler",d:"约1113—1150在位",b:"高棉帝国君主，兴建吴哥窟(Angkor Wat)——世界最大的宗教建筑，供奉毗湿奴，高棉文明的巅峰象征。",rel:[{i:"jayavarman7",t:"后继名王"}]},
{id:"jayavarman7",n:"阇耶跋摩七世",e:"Jayavarman VII",c:"sea",r:"ruler",d:"约1122—1218",b:"高棉最伟大的国王，击退占婆、建吴哥城(Angkor Thom)与巴戎寺(四面佛塔),广修医院驿道，笃信大乘佛教。",rel:[{i:"suryavarman2",t:"承高棉盛世"}]},
// ═══ 拜占庭 / 东欧 ═══
{id:"justinian",n:"查士丁尼",e:"Justinian I",c:"byzantine",r:"ruler",d:"482—565",b:"拜占庭皇帝，编纂《查士丁尼法典》(罗马法集大成,影响欧洲法律),建圣索菲亚大教堂，一度收复地中海故土，是罗马帝国最后的辉煌。",rel:[{i:"theodora",t:"皇后"}]},
{id:"theodora",n:"狄奥多拉",e:"Theodora",c:"byzantine",r:"ruler",d:"约500—548",b:"查士丁尼皇后，出身卑微却极具政治智慧。尼卡暴动中力劝皇帝坚守'紫袍是最好的寿衣',稳住帝位，推动女权法律。",rel:[{i:"justinian",t:"夫"}]},
{id:"basil2",n:"巴西尔二世",e:"Basil II",c:"byzantine",r:"ruler",d:"958—1025",b:"拜占庭中兴雄主，'保加利亚人屠夫',将帝国疆域与国力推至中期顶峰，使巴尔干重归拜占庭。",rel:[{i:"justinian",t:"承拜占庭"}]},
{id:"vladimir",n:"弗拉基米尔大公",e:"Vladimir the Great",c:"byzantine",r:"ruler",d:"约958—1015",b:"基辅罗斯大公，988年皈依东正教并使罗斯受洗，奠定俄罗斯、乌克兰东正教文明的根基。",rel:[{i:"basil2",t:"联姻拜占庭"},{i:"rurik",t:"留里克后裔"}]},
{id:"rurik",n:"留里克",e:"Rurik",c:"byzantine",r:"ruler",d:"？—约879",b:"瓦良格(维京)首领，传说应邀治理诺夫哥罗德，建立留里克王朝，是基辅罗斯与俄罗斯王朝的传说始祖。",rel:[{i:"vladimir",t:"后裔"}]},
{id:"leif_erikson",n:"莱夫·埃里克松",e:"Leif Erikson",c:"byzantine",r:"other",d:"约970—1020",b:"维京探险家，约1000年抵达北美'文兰'(纽芬兰),比哥伦布早约五百年到达美洲。",rel:[{i:"rurik",t:"同维京时代"}]},
// ═══ 西欧 ═══
{id:"charlemagne",n:"查理曼",e:"Charlemagne",c:"europe",r:"ruler",d:"742—814",b:"法兰克国王，征服大半西欧，800年被教皇加冕为'罗马人的皇帝',推动'加洛林文艺复兴',被誉为'欧洲之父'。",rel:[{i:"harun",t:"互遣使节"},{i:"urban2",t:"后世教权"}]},
{id:"urban2",n:"乌尔班二世",e:"Pope Urban II",c:"europe",r:"religious",d:"约1035—1099",b:"罗马教皇，1095年克莱蒙会议号召第一次十字军东征('上帝的旨意'),开启近两百年的十字军运动。",rel:[{i:"charlemagne",t:"承教权传统"},{i:"aquinas",t:"教会传统"}]},
{id:"aquinas",n:"托马斯·阿奎那",e:"Thomas Aquinas",c:"europe",r:"thinker",d:"1225—1274",b:"经院哲学集大成者，著《神学大全》,融合亚里士多德理性与基督教信仰('信仰与理性可调和'),影响天主教神学至今。",rel:[{i:"averroes",t:"回应其哲学"},{i:"urban2",t:"教会传统"}]},
{id:"dante",n:"但丁",e:"Dante Alighieri",c:"europe",r:"thinker",d:"1265—1321",b:"意大利诗人，《神曲》用俗语(意大利语)写成，游历地狱炼狱天堂，被誉为'中世纪的总结、文艺复兴的先声'。",rel:[{i:"aquinas",t:"受其神学影响"}]},
// ═══ 非洲 ═══
{id:"sundiata",n:"松迪亚塔",e:"Sundiata Keita",c:"africa",r:"ruler",d:"约1217—1255",b:"马里帝国开国君主('狮子王'),击败索索王统一曼丁戈,颁《库鲁坎富加宪章》(早期人权宪章),史诗世代传唱。",rel:[{i:"mansa_musa",t:"后世名君"}]},
{id:"mansa_musa",n:"曼萨·穆萨",e:"Mansa Musa",c:"africa",r:"ruler",d:"约1280—1337",b:"马里帝国君主，史上最富有的人之一。1324年携巨量黄金朝觐麦加，沿途撒金致埃及金价暴跌，使马里与廷巴克图闻名世界。",rel:[{i:"sundiata",t:"承马里"},{i:"ibn_battuta",t:"被其记录"}]},
// ═══ 美洲 ═══
{id:"pakal",n:"帕卡尔大帝",e:"K'inich Janaab' Pakal",c:"americas",r:"ruler",d:"603—683",b:"玛雅帕伦克城邦最伟大的国王，在位68年大兴土木，其铭文神庙与精雕石棺(著名的'宇航员'浮雕)是玛雅文明的瑰宝。",rel:[]},
{id:"montezuma2",n:"蒙特祖马二世",e:"Moctezuma II",c:"americas",r:"ruler",d:"约1466—1520",b:"阿兹特克帝国末代雄主，帝国鼎盛却在1519年迎来西班牙人科尔特斯，被俘身死，阿兹特克随之灭亡。",rel:[{i:"pachacuti",t:"同期美洲帝国"}]},
{id:"pachacuti",n:"帕查库特克",e:"Pachacuti",c:"americas",r:"ruler",d:"约1418—1472",b:"印加帝国奠基者，把库斯科小国扩张为安第斯大帝国，重建库斯科、兴建马丘比丘，创立印加的行政与道路体系。",rel:[{i:"montezuma2",t:"同期美洲帝国"}]},
// ═══ 跨文明 ═══
{id:"marco_polo",n:"马可·波罗",e:"Marco Polo",c:"europe",r:"other",d:"1254—1324",b:"威尼斯商人，17年游历元朝中国，《马可·波罗游记》向欧洲展现东方的繁华，激发了后世的大航海与探索热情。",rel:[{i:"kublai",t:"觐见忽必烈"},{i:"ibn_battuta",t:"东西方旅行家"}]},
];
if(typeof window!=='undefined')window.CLASSICAL_PEOPLE=CLASSICAL_PEOPLE;

// ── 人物代表图标 (头像，按身份/文化) ──
const CLASSICAL_ICON = {
  taizong:'👑',wuzetian:'👑',xuanzong:'👑',libai:'🍷',dufu:'📜',xuanzang:'🧎',anlushan:'⚔️',
  zhao_kuangyin:'👑',wang_anshi:'📜',sima_guang:'📖',sushi:'🖌️',yuefei:'🗡️',zhuxi:'📜',shen_kuo:'🧭',
  murasaki:'📕',yoritomo:'🏹',hojo:'🌀',ashikaga:'🏯',
  genghis:'🏹',ogedei:'👑',kublai:'👑',
  muhammad:'☪️',abu_bakr:'📗',umar:'⚔️',ali:'🗡️',harun:'🏛️',al_khwarizmi:'🔢',avicenna:'⚕️',averroes:'📚',ibn_battuta:'🧭',
  harsha:'👑',rajaraja:'🛕',ramanuja:'🪷',
  suryavarman2:'🛕',jayavarman7:'🗿',
  justinian:'⚖️',theodora:'👸',basil2:'🛡️',vladimir:'✝️',rurik:'⚓',leif_erikson:'⛵',
  charlemagne:'👑',urban2:'✝️',aquinas:'📚',dante:'📜',
  sundiata:'🦁',mansa_musa:'💰',
  pakal:'🗿',montezuma2:'🦅',pachacuti:'🏔️',
  marco_polo:'🧭',
};
const ROLE_ICON_FALLBACK = {ruler:'👑',general:'⚔️',thinker:'📜',religious:'🕊️',other:'🔹'};
function personIconOf(p){ if(!p) return '👤'; const id=typeof p==='string'?p:p.id; if(CLASSICAL_ICON[id])return CLASSICAL_ICON[id]; const role=typeof p==='object'?p.r:null; return ROLE_ICON_FALLBACK[role]||'👤'; }
if(typeof window!=='undefined'){window.CLASSICAL_ICON=CLASSICAL_ICON;window.personIconOf=personIconOf;}
