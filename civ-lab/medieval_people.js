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
{id:"shen_kuo",n:"沈括",e:"Shen Kuo",c:"china",r:"thinker",d:"1031—1095",b:"北宋科学家，著《梦溪笔谈》,记录活字印刷、指南针、石油等，是中国古代科技的百科全书式人物。",rel:[{i:"wang_anshi",t:"同朝推行新法"},{i:"sushi",t:"同时代士大夫"}]},
// ═══ 日本 ═══
{id:"murasaki",n:"紫式部",e:"Murasaki Shikibu",c:"japan",r:"thinker",d:"约973—1014",b:"平安时代宫廷女官，著《源氏物语》——世界最早的长篇小说之一，日本古典文学的巅峰，展现平安贵族的'物哀'美学。",rel:[{i:"yoritomo",t:"其笔下贵族世界的终结者"}]},
{id:"yoritomo",n:"源赖朝",e:"Minamoto no Yoritomo",c:"japan",r:"ruler",d:"1147—1199",b:"源平合战胜利者，1185年建立镰仓幕府、自任征夷大将军，开启日本近七百年的武士(幕府)统治时代。",rel:[{i:"hojo",t:"外戚继承"}]},
{id:"hojo",n:"北条时宗",e:"Hojo Tokimune",c:"japan",r:"ruler",d:"1251—1284",b:"镰仓幕府执权，两次(1274/1281)抵御忽必烈的蒙古大军入侵，台风('神风')助日本击退元军，'神风'传说由此而来。",rel:[{i:"yoritomo",t:"承幕府"},{i:"kublai",t:"抵御其入侵"}]},
{id:"ashikaga",n:"足利义满",e:"Ashikaga Yoshimitsu",c:"japan",r:"ruler",d:"1358—1408",b:"室町幕府第三代将军，统一南北朝、建金阁寺、与明朝勘合贸易，室町文化的鼎盛期。",rel:[{i:"yoritomo",t:"幕府传统"}]},
// ═══ 草原 · 蒙古 ═══
{id:"genghis",n:"成吉思汗",e:"Genghis Khan",c:"steppe",r:"ruler",d:"约1162—1227",b:"铁木真，统一蒙古各部，建立人类历史上最大的连续陆地帝国。军事天才与组织家，颁《大札撒》、建驿站，征服横跨欧亚，深刻改变世界格局。",rel:[{i:"ogedei",t:"子"},{i:"kublai",t:"孙"}]},
{id:"ogedei",n:"窝阔台",e:"Ögedei Khan",c:"steppe",r:"ruler",d:"约1186—1241",b:"成吉思汗三子、第二代大汗。灭金、西征欧洲(拔都)直抵匈牙利，建哈拉和林为都，其暴卒使蒙古止步于欧洲。",rel:[{i:"genghis",t:"父"}]},
{id:"kublai",n:"忽必烈",e:"Kublai Khan",c:"steppe",r:"ruler",d:"1215—1294",b:"成吉思汗之孙，灭南宋、1271年建元朝、定都大都(北京),成为中国皇帝。接见马可·波罗，两征日本失败，融合草原与中原统治。",rel:[{i:"genghis",t:"祖父"},{i:"marco_polo",t:"接见"},{i:"hojo",t:"征日受阻"}]},
{id:"saladin",n:"萨拉丁",e:"Saladin",c:"islam",r:"ruler",d:"1137/38—1193",b:"埃及与叙利亚的苏丹,阿尤布王朝创立者。哈丁战役大败十字军后,1187年收复耶路撒冷,却宽待战败居民、不行屠城,以仁慈与骑士风度被敌我双方共同传颂。",rel:[]},
{id:"shotoku",n:"圣德太子",e:"Prince Shōtoku",c:"japan",r:"ruler",d:"574—622",b:"日本推古朝摄政。主动向中国(隋)学习:推行冠位十二阶、颁十七条宪法、弘扬佛教,607年遣小野妹子使隋,国书自称'日出处天子',开启日本千年'善学强者'的传统。",rel:[]},
{id:"zhenghe",n:"郑和",e:"Zheng He",c:"china",r:"other",d:"1371—1433/35",b:"明代航海家、宦官。奉永乐帝命七下西洋(1405—1433),率当时世界最大舰队远抵东南亚、印度、阿拉伯乃至东非,比欧洲大航海早数十年;其后明朝停航转向内向。",rel:[]},
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
{id:"rajaraja",n:"罗茶罗乍一世",e:"Rajaraja Chola I",c:"india",r:"ruler",d:"约947—1014",b:"朱罗帝国最伟大君主，建强大海军征服斯里兰卡与马尔代夫、远征东南亚，兴建坦贾武尔大神庙(世界遗产),南印度的黄金时代。",rel:[{i:"ramanuja",t:"同属南印度泰米尔"},{i:"harsha",t:"印度王权"}]},
{id:"ramanuja",n:"罗摩奴阇",e:"Ramanuja",c:"india",r:"religious",d:"约1017—1137",b:"印度教虔信(Bhakti)运动的核心哲学家，倡导对神(毗湿奴)的虔诚之爱可超越种姓，深刻影响印度宗教。",rel:[{i:"rajaraja",t:"南印度同乡君主"}]},
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
{id:"pakal",n:"帕卡尔大帝",e:"K'inich Janaab' Pakal",c:"americas",r:"ruler",d:"603—683",b:"玛雅帕伦克城邦最伟大的国王，在位68年大兴土木，其铭文神庙与精雕石棺(著名的'宇航员'浮雕)是玛雅文明的瑰宝。",rel:[{i:"montezuma2",t:"同属美洲古文明"},{i:"pachacuti",t:"美洲文明"}]},
{id:"montezuma2",n:"蒙特祖马二世",e:"Moctezuma II",c:"americas",r:"ruler",d:"约1466—1520",b:"阿兹特克帝国末代雄主，帝国鼎盛却在1519年迎来西班牙人科尔特斯，被俘身死，阿兹特克随之灭亡。",rel:[{i:"pachacuti",t:"同期美洲帝国"}]},
{id:"pachacuti",n:"帕查库特克",e:"Pachacuti",c:"americas",r:"ruler",d:"约1418—1472",b:"印加帝国奠基者，把库斯科小国扩张为安第斯大帝国，重建库斯科、兴建马丘比丘，创立印加的行政与道路体系。",rel:[{i:"montezuma2",t:"同期美洲帝国"},{i:"atahualpa",t:"印加后裔"}]},
{id:"atahualpa",n:"阿塔瓦尔帕",e:"Atahualpa",c:"americas",r:"ruler",d:"约1502—1533",b:"印加帝国末代皇帝。刚在内战中击败兄长统一帝国，1532年在卡哈马卡轻装会见仅180人的西班牙皮萨罗，遭伏击被俘；用一屋黄金两屋白银赎身仍于1533年被处死，印加随之崩溃。",rel:[{i:"pachacuti",t:"印加先祖"},{i:"montezuma2",t:"同遭欧洲征服"}]},
// ═══ 跨文明 ═══
{id:"marco_polo",n:"马可·波罗",e:"Marco Polo",c:"europe",r:"other",d:"1254—1324",b:"威尼斯商人，17年游历元朝中国，《马可·波罗游记》向欧洲展现东方的繁华，激发了后世的大航海与探索热情。",rel:[{i:"kublai",t:"觐见忽必烈"},{i:"ibn_battuta",t:"东西方旅行家"}]},
// ═══ 补充 · 唐(500-1000) ═══
{id:"weizheng",n:"魏征",e:"Wei Zheng",c:"china",r:"other",d:"580—643",b:"太宗最著名的谏臣，直言进谏约200余事。太宗叹'以人为镜可以明得失，魏征没，朕失一镜矣'。",rel:[{i:"taizong",t:"君臣·谏诤"}]},
{id:"lijing",n:"李靖",e:"Li Jing",c:"china",r:"general",d:"571—649",b:"唐初第一名将，630年灭东突厥活捉颉利可汗，635年远征吐谷浑，后世尊为'军神'。",rel:[{i:"taizong",t:"效力"}]},
{id:"direnjie",n:"狄仁杰",e:"Di Renjie",c:"china",r:"other",d:"630—700",b:"武则天时代最受信任的宰相，断案如神('东方福尔摩斯'原型),力劝武则天还政李唐。",rel:[{i:"wuzetian",t:"君臣·信任"}]},
{id:"yangguifei",n:"杨贵妃",e:"Yang Guifei",c:"china",r:"other",d:"719—756",b:"玄宗宠妃，'回眸一笑百媚生'。安史之乱中马嵬驿兵变被赐死，白居易《长恨歌》咏其事。",rel:[{i:"xuanzong",t:"宠妃"},{i:"anlushan",t:"乱世悲剧"}]},
{id:"guoziyi",n:"郭子仪",e:"Guo Ziyi",c:"china",r:"general",d:"697—781",b:"平定安史之乱的第一功臣，'再造唐室'。功高震主却从不自傲、得以善终，中国史上最成功的将领之一。",rel:[{i:"anlushan",t:"讨平叛乱"},{i:"xuanzong",t:"勤王"},{i:"shisiming",t:"对阵叛军"}]},
{id:"shisiming",n:"史思明",e:"Shi Siming",c:"china",r:"general",d:"约703—761",b:"安禄山部将，叛军后期领袖，'安史之乱'之'史'。",rel:[{i:"anlushan",t:"同盟·继任"},{i:"guoziyi",t:"被其讨"}]},
{id:"baijuyi",n:"白居易",e:"Bai Juyi",c:"china",r:"thinker",d:"772—846",b:"通俗诗人，《长恨歌》(咏杨贵妃)《琵琶行》传诵千年，诗风平易、对日本文学影响极深。",rel:[{i:"yangguifei",t:"咏其事"}]},
{id:"wangwei",n:"王维",e:"Wang Wei",c:"china",r:"thinker",d:"约701—761",b:"'诗佛'，诗画双绝——苏轼评'诗中有画，画中有诗'。",rel:[{i:"libai",t:"同时代诗人"}]},
{id:"hanyu",n:"韩愈",e:"Han Yu",c:"china",r:"thinker",d:"768—824",b:"'文起八代之衰'，唐宋古文运动领袖，力排佛老、倡儒学复兴。",rel:[{i:"liuzongyuan",t:"挚友·古文运动"}]},
{id:"liuzongyuan",n:"柳宗元",e:"Liu Zongyuan",c:"china",r:"thinker",d:"773—819",b:"韩愈挚友，古文运动共同领袖，《永州八记》开创中国山水散文。",rel:[{i:"hanyu",t:"挚友·古文运动"}]},
{id:"jianzhen",n:"鉴真",e:"Jianzhen",c:"china",r:"religious",d:"688—763",b:"六次东渡日本(五次失败、双目失明),754年抵日传戒律、建唐招提寺，中日交流的象征。",rel:[{i:"xuanzang",t:"同代高僧"}]},
{id:"huangchao",n:"黄巢",e:"Huang Chao",c:"china",r:"general",d:"835—884",b:"盐商出身，875年起义，880年攻入长安称帝，虽被镇压，唐朝从此名存实亡。",rel:[{i:"zhuwen",t:"降将后自立"}]},
{id:"zhuwen",n:"朱温(朱全忠)",e:"Zhu Wen",c:"china",r:"ruler",d:"852—912",b:"黄巢降将，后控制朝政、907年废唐建后梁，唐朝的终结者、五代之始。",rel:[{i:"huangchao",t:"旧主"}]},
// ═══ 补充 · 伊斯兰(500-1000) ═══
{id:"khadijah",n:"赫蒂彻",e:"Khadijah",c:"islam",r:"other",d:"约555—619",b:"穆罕默德第一任妻子、富商寡妇，历史上第一位皈依伊斯兰的人。",rel:[{i:"muhammad",t:"妻·首位穆斯林"}]},
{id:"uthman",n:"乌斯曼",e:"Uthman",c:"islam",r:"ruler",d:"约576—656",b:"第三任正统哈里发，最大贡献是标准化《古兰经》文本；任用亲族引发不满，656年被叛军杀害，触发第一次内战。",rel:[{i:"muhammad",t:"女婿"},{i:"ali",t:"继任者"}]},
{id:"fatima",n:"法蒂玛",e:"Fatima",c:"islam",r:"other",d:"约605—632",b:"穆罕默德之女、阿里之妻，什叶派最尊崇的女性，法蒂玛王朝以其命名。",rel:[{i:"muhammad",t:"父亲"},{i:"ali",t:"丈夫"},{i:"husayn",t:"儿子"}]},
{id:"khalid",n:"哈立德·伊本·瓦利德",e:"Khalid ibn al-Walid",c:"islam",r:"general",d:"约585—642",b:"'真主之剑'——伊斯兰史上最伟大的军事天才，叛教战争与叙利亚伊拉克征服中从未败绩，636年雅穆克破拜占庭。",rel:[{i:"abu_bakr",t:"效力"},{i:"umar",t:"统帅"}]},
{id:"husayn",n:"侯赛因",e:"Husayn ibn Ali",c:"islam",r:"religious",d:"约626—680",b:"阿里次子、穆罕默德外孙。680年卡尔巴拉惨案中被倭马亚军杀害——什叶派最核心的殉道事件(阿舒拉节)。",rel:[{i:"ali",t:"父亲"},{i:"fatima",t:"母亲"},{i:"muawiya",t:"对立"}]},
{id:"muawiya",n:"穆阿维叶一世",e:"Muawiya I",c:"islam",r:"ruler",d:"602—680",b:"倭马亚王朝创建者，迁都大马士革，建立世袭哈里发制——伊斯兰从'公议'走向王朝。",rel:[{i:"ali",t:"政敌·内战"},{i:"husayn",t:"其子杀侯赛因"}]},
{id:"abdmalik",n:"阿卜杜勒·马利克",e:"Abd al-Malik",c:"islam",r:"ruler",d:"685—705",b:"倭马亚中兴之主，定阿拉伯语为官方语言、改革货币，691年建耶路撒冷圆顶清真寺。",rel:[{i:"tariq",t:"开疆同朝"}]},
{id:"tariq",n:"塔利格·伊本·齐亚德",e:"Tariq ibn Ziyad",c:"islam",r:"general",d:"约670—720",b:"711年率军渡过直布罗陀海峡(Jabal Tariq=塔利格之山)征服西班牙西哥特王国。",rel:[{i:"abdmalik",t:"倭马亚开疆"}]},
{id:"abumuslim",n:"阿布·穆斯林",e:"Abu Muslim",c:"islam",r:"general",d:"约718—755",b:"阿拔斯革命的实际军事领袖，举黑旗推翻倭马亚——功成后被哈里发曼苏尔以'功高盖主'处死。",rel:[{i:"mansur",t:"被其处死"}]},
{id:"mansur",n:"曼苏尔",e:"al-Mansur",c:"islam",r:"ruler",d:"754—775在位",b:"阿拔斯王朝奠基者，762年建巴格达'和平之城',奠定五百年帝都；处死功臣阿布·穆斯林。",rel:[{i:"abumuslim",t:"处死功臣"},{i:"harun",t:"曾孙"}]},
{id:"mamun",n:"马蒙",e:"al-Ma'mun",c:"islam",r:"ruler",d:"813—833在位",b:"哈伦之子，巴格达'智慧宫'的创建者，大规模翻译希腊典籍、资助科学，把伊斯兰科学推向巅峰。",rel:[{i:"harun",t:"父子"},{i:"al_khwarizmi",t:"资助"}]},
{id:"abdrahman1",n:"阿卜杜拉赫曼一世",e:"Abd al-Rahman I",c:"islam",r:"ruler",d:"731—788",b:"'入安达卢斯者'——唯一逃脱阿拔斯屠杀的倭马亚王子，756年在科尔多瓦建立后倭马亚，开启西班牙伊斯兰文明。",rel:[{i:"mansur",t:"宿敌(逃其追杀)"}]},
{id:"razi",n:"拉齐(拉泽斯)",e:"al-Razi",c:"islam",r:"thinker",d:"约854—925",b:"波斯医学家，首次区分天花与麻疹，《医学集成》是中世纪最全面的医学百科。",rel:[{i:"avicenna",t:"医学先驱"}]},
// ═══ 补充 · 拜占庭(500-1000) ═══
{id:"belisarius",n:"贝利萨留",e:"Belisarius",c:"byzantine",r:"general",d:"约500—565",b:"查士丁尼首席名将，533年灭汪达尔、535—554征服意大利，常以寡胜众，晚年遭皇帝猜忌。",rel:[{i:"justinian",t:"效力"},{i:"narses",t:"同僚"}]},
{id:"narses",n:"纳尔西斯",e:"Narses",c:"byzantine",r:"general",d:"约478—573",b:"宦官将领，在意大利完成贝利萨留未竟之功，552年塔吉纳战役击灭东哥特人。",rel:[{i:"justinian",t:"效力"},{i:"belisarius",t:"同僚"}]},
{id:"heraclius",n:"赫拉克利乌斯",e:"Heraclius",c:"byzantine",r:"ruler",d:"610—641在位",b:"627年尼尼微之战大破萨珊波斯、收复真十字架；却眼睁睁看阿拉伯人夺走叙利亚与埃及。把官方语言改为希腊语。",rel:[{i:"justinian",t:"后继帝业"}]},
{id:"leo3",n:"利奥三世",e:"Leo III",c:"byzantine",r:"ruler",d:"717—741在位",b:"717—718年以希腊火击退阿拉伯人对君士坦丁堡的第二次大围攻；726年发起'圣像破坏运动'。",rel:[{i:"johndamascus",t:"神学对手"}]},
{id:"johndamascus",n:"大马士革的约翰",e:"John of Damascus",c:"byzantine",r:"religious",d:"约675—749",b:"最后一位东方教父，反对圣像破坏运动的理论奠基人。",rel:[{i:"leo3",t:"神学对手"}]},
{id:"nikephoros2",n:"尼基弗鲁斯·福卡斯",e:"Nikephoros II",c:"byzantine",r:"ruler",d:"912—969",b:"军人皇帝，961年收复克里特、969年收复安条克，拜占庭军事复兴的核心，后被政变刺杀。",rel:[{i:"basil2",t:"军事复兴前驱"}]},
{id:"cyrilmeth",n:"西里尔与美多迪乌斯",e:"Cyril & Methodius",c:"byzantine",r:"religious",d:"约827—885",b:"兄弟传教士，创造格拉哥里字母(斯拉夫文字前身),把基督教与文字带给斯拉夫人——'斯拉夫人的使徒'。",rel:[{i:"photios",t:"受牧首派遣"},{i:"vladimir",t:"斯拉夫基督教化"}]},
{id:"photios",n:"弗提乌斯",e:"Photios I",c:"byzantine",r:"religious",d:"约810—893",b:"拜占庭最博学的牧首，'弗提乌斯分裂'加深东西教会裂痕，推动斯拉夫传教。",rel:[{i:"cyrilmeth",t:"派遣传教"}]},
// ═══ 补充 · 罗斯/维京(东欧, 归 byzantine 组) ═══
{id:"oleg",n:"先知奥列格",e:"Oleg of Novgorod",c:"byzantine",r:"ruler",d:"约845—912",b:"瓦良格首领，882年迁都基辅、统一诺夫哥罗德与基辅，奠定基辅罗斯；曾远征君士坦丁堡。",rel:[{i:"rurik",t:"继承"},{i:"igor",t:"摄政辅佐"}]},
{id:"igor",n:"伊戈尔",e:"Igor of Kiev",c:"byzantine",r:"ruler",d:"约878—945",b:"基辅大公、留里克之子；945年因重复征贡被德列夫利安人杀害。",rel:[{i:"oleg",t:"受其辅佐"},{i:"olga",t:"妻子"}]},
{id:"olga",n:"圣奥尔加",e:"Olga of Kiev",c:"byzantine",r:"ruler",d:"约890—969",b:"基辅女摄政，为夫'四次复仇'德列夫利安人(残酷智计);约957年皈依基督教，是罗斯王室首位基督徒。",rel:[{i:"igor",t:"丈夫"},{i:"sviatoslav",t:"儿子"}]},
{id:"sviatoslav",n:"斯维亚托斯拉夫",e:"Sviatoslav I",c:"byzantine",r:"general",d:"约943—972",b:"最后的异教大公、纯粹武人，灭可萨汗国、征保加利亚，名言'我来找你了',战死途中。",rel:[{i:"olga",t:"母亲"},{i:"vladimir",t:"儿子"}]},
{id:"yaroslav",n:"智者雅罗斯拉夫",e:"Yaroslav the Wise",c:"byzantine",r:"ruler",d:"978—1054",b:"基辅罗斯文化巅峰，编《罗斯法典》、建索菲亚大教堂，把女儿嫁给法/挪/匈国王，被称'欧洲的岳父'。",rel:[{i:"vladimir",t:"父亲"}]},
// ═══ 补充 · 法兰克/加洛林(西欧) ═══
{id:"clovis",n:"克洛维一世",e:"Clovis I",c:"europe",r:"ruler",d:"约466—511",b:"墨洛温王朝奠基者，统一高卢法兰克人；约496年皈依天主教(而非阿里乌派),为法兰克与罗马教会同盟埋下种子。",rel:[{i:"charlesmartel",t:"后世法兰克"}]},
{id:"charlesmartel",n:"查理·马特",e:"Charles Martel",c:"europe",r:"general",d:"约688—741",b:"'铁锤查理',法兰克宫相。732年普瓦捷/图尔之战击退伊斯兰军队北进，被誉为'拯救基督教欧洲'。",rel:[{i:"pepinshort",t:"父子"},{i:"charlemagne",t:"祖孙"}]},
{id:"pepinshort",n:"矮子丕平",e:"Pepin the Short",c:"europe",r:"ruler",d:"约714—768",b:"751年废墨洛温末王、建立加洛林王朝；754年与教皇结盟、'丕平献土'——教皇国的起源。",rel:[{i:"charlesmartel",t:"父子"},{i:"charlemagne",t:"父子"}]},
{id:"alcuin",n:"阿尔昆",e:"Alcuin of York",c:"europe",r:"thinker",d:"约735—804",b:"英格兰学者，受查理曼之邀主持宫廷学校，发展加洛林小写体(现代小写字母之源),加洛林文艺复兴的灵魂。",rel:[{i:"charlemagne",t:"宫廷导师"}]},
{id:"einhard",n:"艾因哈德",e:"Einhard",c:"europe",r:"thinker",d:"约775—840",b:"查理曼的传记作者，《查理大帝传》是中世纪最重要的传记之一。",rel:[{i:"charlemagne",t:"为其立传"}]},
{id:"louispious",n:"虔诚者路易",e:"Louis the Pious",c:"europe",r:"ruler",d:"778—840",b:"查理曼之子，继承帝国但诸子争位，843年凡尔登条约后帝国三分(法/德/中间王国雏形)。",rel:[{i:"charlemagne",t:"父子"}]},
{id:"alfred",n:"阿尔弗雷德大帝",e:"Alfred the Great",c:"europe",r:"ruler",d:"849—899",b:"威塞克斯国王，878年埃丁顿之战击败维京'大异教徒军队',保住英格兰、推动文教，唯一被称'大帝'的英王。",rel:[{i:"charlemagne",t:"同期西欧基督教君主"},{i:"cnut",t:"征服英格兰的丹麦王"}]},
{id:"cnut",n:"克努特大帝",e:"Cnut the Great",c:"europe",r:"ruler",d:"约994—1035",b:"'北海帝国'之主，同时统治英格兰、丹麦与挪威；'命令潮水后退'传说讽喻王权的有限。",rel:[{i:"alfred",t:"后世英格兰王"}]},
];
if(typeof window!=='undefined')window.CLASSICAL_PEOPLE=CLASSICAL_PEOPLE;

// ── 人物代表图标 (头像，按身份/文化) ──
const CLASSICAL_ICON = {
  taizong:'👑',wuzetian:'👑',xuanzong:'👑',libai:'🍷',dufu:'📜',xuanzang:'🧎',anlushan:'⚔️',
  zhao_kuangyin:'👑',wang_anshi:'📜',sima_guang:'📖',sushi:'🖌️',yuefei:'🗡️',zhuxi:'📜',shen_kuo:'🧭',
  murasaki:'📕',yoritomo:'🏹',hojo:'🌀',ashikaga:'🏯',
  genghis:'🏹',ogedei:'👑',kublai:'👑',saladin:'🕌',shotoku:'🎌',zhenghe:'⛵',
  muhammad:'☪️',abu_bakr:'📗',umar:'⚔️',ali:'🗡️',harun:'🏛️',al_khwarizmi:'🔢',avicenna:'⚕️',averroes:'📚',ibn_battuta:'🧭',
  harsha:'👑',rajaraja:'🛕',ramanuja:'🪷',
  suryavarman2:'🛕',jayavarman7:'🗿',
  justinian:'⚖️',theodora:'👸',basil2:'🛡️',vladimir:'✝️',rurik:'⚓',leif_erikson:'⛵',
  charlemagne:'👑',urban2:'✝️',aquinas:'📚',dante:'📜',
  sundiata:'🦁',mansa_musa:'💰',
  pakal:'🗿',montezuma2:'🦅',pachacuti:'🏔️',atahualpa:'🌄',
  marco_polo:'🧭',
  // 补充 500-1000
  weizheng:'📜',lijing:'⚔️',direnjie:'⚖️',yangguifei:'👤',guoziyi:'⚔️',shisiming:'⚔️',baijuyi:'📜',wangwei:'🖼️',hanyu:'📜',liuzongyuan:'📜',jianzhen:'☸️',huangchao:'⚔️',zhuwen:'👑',
  khadijah:'👤',uthman:'📖',fatima:'👤',khalid:'🗡️',husayn:'🕌',muawiya:'👑',abdmalik:'🕌',tariq:'⚔️',abumuslim:'⚔️',mansur:'🏛️',mamun:'📚',abdrahman1:'👑',razi:'⚕️',
  belisarius:'⚔️',narses:'⚔️',heraclius:'👑',leo3:'🛡️',johndamascus:'📜',nikephoros2:'⚔️',cyrilmeth:'🔤',photios:'📜',
  oleg:'🛡️',igor:'👑',olga:'✝️',sviatoslav:'⚔️',yaroslav:'📜',
  clovis:'👑',charlesmartel:'🔨',pepinshort:'👑',alcuin:'📚',einhard:'📜',louispious:'👑',alfred:'👑',cnut:'👑',
};
const ROLE_ICON_FALLBACK = {ruler:'👑',general:'⚔️',thinker:'📜',religious:'🕊️',other:'🔹'};
function personIconOf(p){ if(!p) return '👤'; const id=typeof p==='string'?p:p.id; if(CLASSICAL_ICON[id])return CLASSICAL_ICON[id]; const role=typeof p==='object'?p.r:null; return ROLE_ICON_FALLBACK[role]||'👤'; }
if(typeof window!=='undefined'){window.CLASSICAL_ICON=CLASSICAL_ICON;window.personIconOf=personIconOf;}
