// 全球连接时代(1500-1800) · 人物数据
const CLASSICAL_PEOPLE=[
  // ── 大航海 · 伊比利亚 (iberia) ──
  {id:"henry_nav",n:"恩里克王子",e:"Henry the Navigator",c:"iberia",r:"ruler",d:"1394—1460",b:"葡萄牙王子，设航海学校、系统资助西非探索，大航海时代的组织者。",rel:[{i:"diaz",t:"探索事业奠基"},{i:"gama",t:"开路先驱"}]},
  {id:"diaz",n:"迪亚士",e:"Bartolomeu Dias",c:"iberia",r:"other",d:"1450—1500",b:"1488年绕过非洲南端好望角，证明绕非洲到亚洲可行。",rel:[{i:"gama",t:"为其铺路"}]},
  {id:"gama",n:"达伽马",e:"Vasco da Gama",c:"iberia",r:"other",d:"1460—1524",b:"1498年开辟绕好望角到印度的海上航线，香料利润达成本60倍。",rel:[{i:"henry_nav",t:"事业继承"},{i:"albuquerque",t:"葡属印度"}]},
  {id:"columbus",n:"哥伦布",e:"Christopher Columbus",c:"iberia",r:"other",d:"1451—1506",b:"1492年西航抵美洲，至死以为到了亚洲；开启欧洲对美洲的殖民。",rel:[{i:"isabella1",t:"受其资助"},{i:"vespucci",t:"新大陆之争"}]},
  {id:"vespucci",n:"韦斯普奇",e:"Amerigo Vespucci",c:"iberia",r:"other",d:"1454—1512",b:"最早明确宣称这是'新大陆'，'美洲'以其名命名。",rel:[{i:"columbus",t:"同探美洲"}]},
  {id:"magellan",n:"麦哲伦",e:"Ferdinand Magellan",c:"iberia",r:"other",d:"1480—1521",b:"率队首次环球航行，途中在菲律宾战死。",rel:[{i:"elcano",t:"由其完成环球"}]},
  {id:"elcano",n:"埃尔卡诺",e:"J.S. Elcano",c:"iberia",r:"other",d:"1486—1526",b:"麦哲伦死后接任，1522年完成人类首次环球航行。",rel:[{i:"magellan",t:"继其指挥"}]},
  {id:"albuquerque",n:"阿尔布克尔克",e:"Afonso de Albuquerque",c:"iberia",r:"general",d:"1453—1515",b:"'葡属印度的恺撒'，夺果阿/马六甲/霍尔木兹，控制印度洋香料命脉。",rel:[{i:"gama",t:"承其航线"}]},
  {id:"cortes",n:"科尔特斯",e:"Hernán Cortés",c:"iberia",r:"general",d:"1485—1547",b:"1521年灭阿兹特克帝国，西班牙美洲帝国的开端。",rel:[{i:"pizarro",t:"征服者同侪"}]},
  {id:"pizarro",n:"皮萨罗",e:"Francisco Pizarro",c:"iberia",r:"general",d:"1471—1541",b:"1533年以少量人马灭印加帝国，夺取黄金白银。",rel:[{i:"cortes",t:"征服者同侪"}]},
  {id:"isabella1",n:"伊莎贝拉一世",e:"Isabella I",c:"iberia",r:"ruler",d:"1451—1504",b:"卡斯蒂利亚女王，'天主教双王'之一，1492年统一西班牙、资助哥伦布。",rel:[{i:"columbus",t:"资助航海"},{i:"charles5",t:"外祖母"}]},
  {id:"charles5",n:"查理五世",e:"Charles V",c:"iberia",r:"ruler",d:"1500—1558",b:"西班牙国王兼神圣罗马皇帝，领土横跨欧美，对抗路德宗教改革。",rel:[{i:"luther",t:"宣其为异端"},{i:"philip2",t:"传位其子"}]},
  {id:"philip2",n:"菲利普二世",e:"Philip II",c:"iberia",r:"ruler",d:"1527—1598",b:"西班牙帝国鼎盛之主，美洲白银滚滚；1588年无敌舰队败于英国。",rel:[{i:"charles5",t:"继位"},{i:"elizabeth1",t:"宿敌"},{i:"william_orange",t:"镇压荷兰"}]},
  {id:"las_casas",n:"拉斯卡萨斯",e:"Bartolomé de las Casas",c:"iberia",r:"religious",d:"1484—1566",b:"多明我会修士，《印第安人的毁灭》揭露殖民暴行，为土著辩护。",rel:[{i:"cortes",t:"批判其征服"}]},
  {id:"xavier",n:"沙勿略",e:"Francis Xavier",c:"iberia",r:"religious",d:"1506—1552",b:"耶稣会创始成员，'东方使徒'，最早赴日本传教。",rel:[{i:"loyola",t:"共创耶稣会"},{i:"ricci",t:"东方传教先驱"}]},
  // ── 荷兰 (dutch) ──
  {id:"william_orange",n:"沉默者威廉",e:"William the Silent",c:"dutch",r:"ruler",d:"1533—1584",b:"荷兰独立战争之父，领导反抗西班牙，1584年遇刺。",rel:[{i:"philip2",t:"反抗其统治"}]},
  {id:"coen",n:"科恩",e:"J.P. Coen",c:"dutch",r:"general",d:"1587—1629",b:"VOC总督，建巴达维亚(雅加达)，班达群岛屠杀垄断肉豆蔻。",rel:[{i:"tasman",t:"VOC同僚"}]},
  {id:"tasman",n:"塔斯曼",e:"Abel Tasman",c:"dutch",r:"other",d:"1603—1659",b:"VOC航海家，发现新西兰、塔斯马尼亚，证明澳大利亚是独立大陆。",rel:[{i:"coen",t:"VOC同僚"}]},
  {id:"de_ruyter",n:"德鲁伊特",e:"M. de Ruyter",c:"dutch",r:"general",d:"1607—1676",b:"荷兰最伟大的海军将领，多次击败英法海军。",rel:[]},
  // ── 英国 (britain) ──
  {id:"henry8",n:"亨利八世",e:"Henry VIII",c:"britain",r:"ruler",d:"1491—1547",b:"六次婚姻，1534年与罗马决裂、创立英国国教。",rel:[{i:"elizabeth1",t:"其女"}]},
  {id:"elizabeth1",n:"伊丽莎白一世",e:"Elizabeth I",c:"britain",r:"ruler",d:"1533—1603",b:"'童贞女王'，击败无敌舰队，开创英国文艺复兴黄金时代。",rel:[{i:"henry8",t:"其父"},{i:"drake",t:"重用"},{i:"philip2",t:"宿敌"}]},
  {id:"drake",n:"德雷克",e:"Francis Drake",c:"britain",r:"general",d:"1540—1596",b:"私掠船长，第二次环球航行，1588年助败无敌舰队。",rel:[{i:"elizabeth1",t:"效力"}]},
  {id:"raleigh",n:"罗利",e:"Walter Raleigh",c:"britain",r:"other",d:"1552—1618",b:"伊丽莎白宠臣，殖民北美、寻黄金城，后以叛国罪斩首。",rel:[{i:"elizabeth1",t:"宠臣"}]},
  {id:"charles1_eng",n:"查理一世",e:"Charles I",c:"britain",r:"ruler",d:"1600—1649",b:"与议会对抗引发内战，1649年被公开处决——首位被'合法'处决的君主。",rel:[{i:"cromwell",t:"内战对手"}]},
  {id:"cromwell",n:"克伦威尔",e:"Oliver Cromwell",c:"britain",r:"general",d:"1599—1658",b:"内战领袖，建新模范军，处决查理一世，任'护国主'。",rel:[{i:"charles1_eng",t:"击败处决"}]},
  // ── 法国 (france) ──
  {id:"louis14",n:"路易十四",e:"Louis XIV",c:"france",r:"ruler",d:"1638—1715",b:"'太阳王'，'朕即国家'，建凡尔赛宫，绝对君主制的化身。",rel:[{i:"colbert",t:"重用"}]},
  {id:"colbert",n:"柯尔贝",e:"J.-B. Colbert",c:"france",r:"thinker",d:"1619—1683",b:"路易十四财政大臣，重商主义实践者。",rel:[{i:"louis14",t:"效力"}]},
  {id:"champlain",n:"尚普兰",e:"S. de Champlain",c:"france",r:"other",d:"1567—1635",b:"'新法兰西之父'，1608年建魁北克城。",rel:[]},
  // ── 宗教改革 (reform) ──
  {id:"luther",n:"马丁·路德",e:"Martin Luther",c:"reform",r:"religious",d:"1483—1546",b:"1517年《九十五条论纲》，'因信称义'，开启新教改革。",rel:[{i:"charles5",t:"被其定罪"},{i:"calvin",t:"新教同道"}]},
  {id:"calvin",n:"加尔文",e:"John Calvin",c:"reform",r:"religious",d:"1509—1564",b:"预定论与天职观，日内瓦神权政治，影响清教徒与资本主义精神。",rel:[{i:"luther",t:"新教同道"}]},
  {id:"loyola",n:"罗耀拉",e:"Ignatius of Loyola",c:"reform",r:"religious",d:"1491—1556",b:"耶稣会创始人，反宗教改革主力，办学校、向东方传教。",rel:[{i:"xavier",t:"共创耶稣会"}]},
  {id:"gustavus",n:"古斯塔夫·阿道夫",e:"Gustavus Adolphus",c:"reform",r:"general",d:"1594—1632",b:"'北方雄狮'，瑞典国王，三十年战争新教方主将，吕岑战役阵亡。",rel:[]},
  // ── 科学革命 (science) ──
  {id:"copernicus",n:"哥白尼",e:"Copernicus",c:"science",r:"thinker",d:"1473—1543",b:"提出日心说，挑战地心说，开启'哥白尼革命'。",rel:[{i:"galileo",t:"日心说后继"},{i:"kepler",t:"理论继承"}]},
  {id:"tycho",n:"第谷",e:"Tycho Brahe",c:"science",r:"thinker",d:"1546—1601",b:"望远镜前最精确的天文观测者，数据为开普勒所用。",rel:[{i:"kepler",t:"其助手"}]},
  {id:"kepler",n:"开普勒",e:"Johannes Kepler",c:"science",r:"thinker",d:"1571—1630",b:"行星运动三定律，揭示轨道为椭圆，为牛顿铺路。",rel:[{i:"tycho",t:"用其数据"},{i:"newton",t:"启发引力"}]},
  {id:"galileo",n:"伽利略",e:"Galileo Galilei",c:"science",r:"thinker",d:"1564—1642",b:"用望远镜观天证日心说，奠定实验物理，遭宗教裁判所审判。",rel:[{i:"copernicus",t:"捍卫其说"},{i:"newton",t:"物理先驱"}]},
  {id:"bacon",n:"培根",e:"Francis Bacon",c:"science",r:"thinker",d:"1561—1626",b:"'科学方法之父'，归纳法，'知识就是力量'。",rel:[]},
  {id:"descartes",n:"笛卡尔",e:"René Descartes",c:"science",r:"thinker",d:"1596—1650",b:"'我思故我在'，解析几何，机械论宇宙观。",rel:[{i:"newton",t:"近代科学奠基"}]},
  {id:"newton",n:"牛顿",e:"Isaac Newton",c:"science",r:"thinker",d:"1643—1727",b:"万有引力与三大运动定律，《自然哲学的数学原理》集科学革命之大成。",rel:[{i:"kepler",t:"解释其定律"},{i:"galileo",t:"承其物理"},{i:"descartes",t:"科学奠基"}]},
  {id:"harvey",n:"哈维",e:"William Harvey",c:"science",r:"thinker",d:"1578—1657",b:"发现血液循环，推翻盖伦旧说，现代生理学之始。",rel:[]},
  {id:"lavoisier",n:"拉瓦锡",e:"Antoine Lavoisier",c:"science",r:"thinker",d:"1743—1794",b:"'现代化学之父'，氧化理论、质量守恒，大革命中被送上断头台。",rel:[]},
  // ── 奥斯曼 (ottoman) ──
  {id:"suleiman",n:"苏莱曼一世",e:"Suleiman I",c:"ottoman",r:"ruler",d:"1494—1566",b:"'立法者/壮丽者'，奥斯曼鼎盛之主，围维也纳、立法典。",rel:[{i:"hurrem",t:"宠妃"},{i:"sinan",t:"任为首席建筑师"},{i:"selim1",t:"其父"}]},
  {id:"selim1",n:"塞利姆一世",e:"Selim I",c:"ottoman",r:"ruler",d:"1470—1520",b:"'冷酷者'，征服叙利亚埃及，取得哈里发称号。",rel:[{i:"suleiman",t:"其子"}]},
  {id:"hurrem",n:"许蕾姆苏丹",e:"Hürrem Sultan",c:"ottoman",r:"other",d:"1502—1558",b:"奴隶出身成苏莱曼正妻，'后宫政治'的著名代表。",rel:[{i:"suleiman",t:"其妻"}]},
  {id:"sinan",n:"希南",e:"Mimar Sinan",c:"ottoman",r:"thinker",d:"1489—1588",b:"奥斯曼建筑大师，苏莱曼清真寺、塞利米耶清真寺。",rel:[{i:"suleiman",t:"为其建造"}]},
  {id:"sobieski",n:"扬·索别斯基",e:"Jan Sobieski",c:"ottoman",r:"general",d:"1629—1696",b:"波兰国王，1683年解维也纳之围，终止奥斯曼西扩。",rel:[]},
  // ── 明清中国 (china) ──
  {id:"zhenghe",n:"郑和",e:"Zheng He",c:"china",r:"other",d:"1371—1433",b:"明代宦官，七下西洋，率世界最大船队远达东非。",rel:[]},
  {id:"zhangjuzheng",n:"张居正",e:"Zhang Juzheng",c:"china",r:"thinker",d:"1525—1582",b:"万历首辅，推一条鞭法、考成法，明代最重要的改革家。",rel:[{i:"wanli",t:"辅政"}]},
  {id:"wanli",n:"万历皇帝",e:"Wanli Emperor",c:"china",r:"ruler",d:"1563—1620",b:"在位48年而长期怠政，明朝由盛转衰的标志。",rel:[{i:"zhangjuzheng",t:"早期辅政"}]},
  {id:"ricci",n:"利玛窦",e:"Matteo Ricci",c:"china",r:"religious",d:"1552—1610",b:"耶稣会士，首入中国内地，穿儒服讲科学，译《几何原本》。",rel:[{i:"xuguangqi",t:"合译几何"},{i:"xavier",t:"承东方传教"}]},
  {id:"xuguangqi",n:"徐光启",e:"Xu Guangqi",c:"china",r:"thinker",d:"1562—1633",b:"明代科学家、士大夫，与利玛窦合译《几何原本》，融汇中西。",rel:[{i:"ricci",t:"合作译书"}]},
  {id:"chongzhen",n:"崇祯皇帝",e:"Chongzhen",c:"china",r:"ruler",d:"1611—1644",b:"明末帝，勤政而时运不济，1644年北京陷落自缢，明亡。",rel:[{i:"lizicheng",t:"被其攻灭"},{i:"wusangui",t:"麾下守将"}]},
  {id:"lizicheng",n:"李自成",e:"Li Zicheng",c:"china",r:"general",d:"1606—1645",b:"农民起义领袖，1644年攻入北京，建大顺，明朝灭亡。",rel:[{i:"chongzhen",t:"攻灭明朝"}]},
  {id:"wusangui",n:"吴三桂",e:"Wu Sangui",c:"china",r:"general",d:"1612—1678",b:"山海关守将，降清引清军入关，改变了中国历史。",rel:[{i:"chongzhen",t:"叛主降清"}]},
  {id:"nurhaci",n:"努尔哈赤",e:"Nurhaci",c:"china",r:"ruler",d:"1559—1626",b:"后金创建者，统一女真、建八旗、创满文。",rel:[{i:"kangxi",t:"清朝奠基"}]},
  {id:"kangxi",n:"康熙皇帝",e:"Kangxi",c:"china",r:"ruler",d:"1654—1722",b:"在位61年，平三藩、收台湾、签尼布楚条约，清朝盛世奠基。",rel:[{i:"yongzheng",t:"其子"},{i:"nurhaci",t:"先祖基业"}]},
  {id:"yongzheng",n:"雍正皇帝",e:"Yongzheng",c:"china",r:"ruler",d:"1678—1735",b:"设军机处、摊丁入亩，勤政集权，承上启下。",rel:[{i:"kangxi",t:"其父"},{i:"qianlong",t:"其子"}]},
  {id:"qianlong",n:"乾隆皇帝",e:"Qianlong",c:"china",r:"ruler",d:"1711—1799",b:"版图达极盛、编《四库全书》；1793年拒马戛尔尼通商，错失变局。",rel:[{i:"yongzheng",t:"其父"},{i:"heshen",t:"宠信"}]},
  {id:"heshen",n:"和珅",e:"Heshen",c:"china",r:"other",d:"1750—1799",b:"乾隆宠臣，中国历史最大贪官，家产抵清廷多年财政。",rel:[{i:"qianlong",t:"受宠"}]},
  // ── 日本 (japan) ──
  {id:"nobunaga",n:"织田信长",e:"Oda Nobunaga",c:"japan",r:"ruler",d:"1534—1582",b:"战国革新者，率先大规模用火枪，本能寺之变被叛身亡。",rel:[{i:"hideyoshi",t:"部将继业"}]},
  {id:"hideyoshi",n:"丰臣秀吉",e:"T. Hideyoshi",c:"japan",r:"ruler",d:"1537—1598",b:"农民出身统一日本，刀狩检地，两度侵朝失败。",rel:[{i:"nobunaga",t:"继其业"},{i:"ieyasu",t:"身后被取代"},{i:"yi_sunsin",t:"侵朝受挫于其"}]},
  {id:"ieyasu",n:"德川家康",e:"T. Ieyasu",c:"japan",r:"ruler",d:"1543—1616",b:"关原之战获胜，1603年建德川幕府，开启260年和平。",rel:[{i:"hideyoshi",t:"取而代之"}]},
  {id:"yi_sunsin",n:"李舜臣",e:"Yi Sun-sin",c:"japan",r:"general",d:"1545—1598",b:"朝鲜名将，以龟船屡败日本水军，挫败丰臣秀吉侵朝。",rel:[{i:"hideyoshi",t:"抗击其军"}]},
];
const CLASSICAL_ICON = {
  henry_nav:'🧭',diaz:'⛵',gama:'⛵',columbus:'🌊',vespucci:'🗺️',magellan:'🌐',elcano:'🌐',albuquerque:'⚔️',cortes:'⚔️',pizarro:'⚔️',isabella1:'👑',charles5:'👑',philip2:'👑',las_casas:'🕊️',xavier:'✝️',
  william_orange:'🦁',coen:'⚓',tasman:'🧭',de_ruyter:'⚓',
  henry8:'👑',elizabeth1:'👑',drake:'🏴‍☠️',raleigh:'🚬',charles1_eng:'👑',cromwell:'🗡️',
  louis14:'☀️',colbert:'💰',champlain:'⚜️',
  luther:'📜',calvin:'📕',loyola:'✝️',gustavus:'🦁',
  copernicus:'🌞',tycho:'🔭',kepler:'🪐',galileo:'🔭',bacon:'📖',descartes:'🧠',newton:'🍎',harvey:'❤️',lavoisier:'⚗️',
  suleiman:'☪️',selim1:'⚔️',hurrem:'👑',sinan:'🕌',sobieski:'🛡️',
  zhenghe:'⛵',zhangjuzheng:'📜',wanli:'👑',ricci:'✝️',xuguangqi:'📐',chongzhen:'👑',lizicheng:'⚔️',wusangui:'🗡️',nurhaci:'🏹',kangxi:'👑',yongzheng:'👑',qianlong:'👑',heshen:'💰',
  nobunaga:'🔥',hideyoshi:'🐒',ieyasu:'🏯',yi_sunsin:'🐢',
};
const ROLE_ICON_FALLBACK = {ruler:'👑',general:'⚔️',thinker:'📜',religious:'✝️',other:'🔹'};
function personIconOf(p){ if(!p) return '👤'; const id=typeof p==='string'?p:p.id; if(CLASSICAL_ICON[id])return CLASSICAL_ICON[id]; const role=typeof p==='object'?p.r:null; return ROLE_ICON_FALLBACK[role]||'👤'; }
if(typeof window!=='undefined'){window.CLASSICAL_ICON=CLASSICAL_ICON;window.personIconOf=personIconOf;}
