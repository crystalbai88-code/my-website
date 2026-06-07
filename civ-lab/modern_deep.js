// 工业与现代世界(1750-1945) · 深度数据
const CIV_DEEP = {}, EVENT_DEEP = {}, PERSON_DEEP = {};

Object.assign(CIV_DEEP, {
  industrial:{pronunciation:'工业革命',capital_at_peak:'曼彻斯特 / 伯明翰',territory_max:'英国→欧美日',population_peak:'城市化75%(英1900)',language:'—',writing:'专利·机器图纸',religion:'—',economy:'机器工厂·煤铁·资本',
    opening_narrative:`18世纪中叶的英国,蒸汽机、纺纱机与铁路把人类从农业社会推入工业社会。瓦特改良的蒸汽机驱动工厂与火车,阿克赖特开创工厂制度,斯蒂芬森铺开铁路网。\n\n第二次工业革命(电力、内燃机、化工)由法拉第、爱迪生、特斯拉、福特接力。工业化创造了空前财富与城市,也带来童工、贫民窟与阶级矛盾——催生了亚当·斯密的自由市场与马克思的社会主义两种回应。`,
    nine_inventions:[{name:'蒸汽动力与工厂',year:'1769',body:'瓦特蒸汽机+阿克赖特工厂制,机器大生产时代。'},{name:'铁路与电力',year:'1830',body:'铁路网统一市场;电力照亮城市、远距输电。'},{name:'流水线生产',year:'1908',body:'福特T型车流水线,现代大规模制造。'}],
    collapse_chain:['贫富分化与工人运动','→ 帝国主义与世界大战']},
  french_rev:{pronunciation:'法国大革命与拿破仑',capital_at_peak:'巴黎',territory_max:'拿破仑帝国遍及欧洲',population_peak:'—',language:'法语',writing:'《人权宣言》《拿破仑法典》',religion:'世俗化',economy:'—',
    opening_narrative:`1789年,财政危机与启蒙思想(伏尔泰、卢梭、孟德斯鸠)交织,法国第三等级攻占巴士底狱,发布《人权宣言》:"人生而自由平等"。革命经君主立宪、处决路易十六、罗伯斯庇尔的恐怖统治,最终被拿破仑收束。\n\n拿破仑横扫欧洲、颁《拿破仑法典》,虽于1815年滑铁卢落幕,却把自由、平等、民族主义的火种撒遍欧洲——旧制度从此再也回不去了。`,
    nine_inventions:[{name:'《人权宣言》',year:'1789',body:'"人生而自由平等",现代人权与公民权的奠基。'},{name:'《拿破仑法典》',year:'1804',body:'现代民法典基础,影响欧洲、拉美、日本。'},{name:'民族主义觉醒',year:'',body:'革命与拿破仑激发各国民族意识。'}],
    collapse_chain:['1815 滑铁卢','维也纳体系复辟','但革命精灵已出瓶']},
  imperialism:{pronunciation:'帝国主义时代',capital_at_peak:'伦敦(日不落)',territory_max:'1914列强控制全球84%土地',population_peak:'—',language:'—',writing:'—',religion:'"文明使命"',economy:'殖民原料·市场',
    opening_narrative:`凭借工业的枪炮、蒸汽船、电报与奎宁,19世纪欧洲列强把全球大半收入囊中:1884年柏林会议在地图上瓜分非洲,鸦片战争撬开中国,印度成为"英国王冠上的明珠"。\n\n社会达尔文主义与"白人的负担"为掠夺辩护;利奥波德二世的刚果、布尔战争的集中营则暴露其残酷。被压迫民族的反抗(太平天国、印度起义、义和团)与觉醒,埋下20世纪去殖民化的种子。`,
    nine_inventions:[{name:'全球殖民体系',year:'',body:'列强直接/间接控制全球84%土地。'},{name:'(反思)殖民掠夺',year:'',body:'刚果暴行、鸦片战争、集中营。'},{name:'被压迫民族的觉醒',year:'',body:'反抗与民族主义,后来的去殖民化之源。'}],
    collapse_chain:['大国争夺殖民地','→ 第一次世界大战','二战后去殖民化']},
  unification:{pronunciation:'民族国家统一',capital_at_peak:'柏林 / 罗马',territory_max:'统一的德国与意大利',population_peak:'—',language:'—',writing:'—',religion:'—',economy:'—',
    opening_narrative:`法国大革命点燃的民族主义,在19世纪后半叶重塑欧洲版图。意大利在马志尼("灵魂")、加里波第("剑")、加富尔("脑")推动下走向统一。\n\n德意志则由"铁血宰相"俾斯麦以三次王朝战争完成统一,1871年在凡尔赛镜厅宣布德意志帝国成立(刻意羞辱法国)。一个强大的统一德国,深刻改变了欧洲均势,为一战埋下伏笔。`,
    nine_inventions:[{name:'德意志统一',year:'1871',body:'俾斯麦铁血政策,欧洲格局剧变。'},{name:'意大利统一',year:'1861',body:'加里波第、加富尔合力。'},{name:'现代民族国家',year:'',body:'民族=国家的近代政治形态确立。'}],
    collapse_chain:['强大德国打破均势','→ 联盟体系与一战']},
  meiji:{pronunciation:'明治维新',capital_at_peak:'东京',territory_max:'日本+朝鲜台湾',population_peak:'—',language:'日语',writing:'明治宪法',religion:'神道·天皇',economy:'殖产兴业·财阀',
    opening_narrative:`1853年美国佩里"黑船"逼日本开国。倒幕志士拥立明治天皇,1868年明治维新:废藩置县、征兵、立宪、殖产兴业,"文明开化"全面学习西方。\n\n短短数十年,日本从封建幕府变为亚洲唯一的工业化强国:甲午战胜清朝、日俄战胜俄国(对马海战),成为亚洲首个击败欧洲列强的国家——也走上了对外扩张的军国主义之路。`,
    nine_inventions:[{name:'明治维新',year:'1868',body:'亚洲唯一主动现代化成功、避免被殖民的国家。'},{name:'亚洲第一部近代宪法',year:'1889',body:'以普鲁士为蓝本的明治宪法。'},{name:'日俄战争取胜',year:'1905',body:'亚洲国家首次在近代战争击败欧洲大国,鼓舞亚非。'}],
    collapse_chain:['军国主义膨胀','→ 侵华与太平洋战争(二战)']},
  ww1:{pronunciation:'第一次世界大战',capital_at_peak:'欧洲战场',territory_max:'全球卷入',population_peak:'死亡约1700万',language:'—',writing:'凡尔赛条约',religion:'—',economy:'总体战',
    opening_narrative:`军国主义、联盟体系、帝国主义、民族主义("MAIN")把欧洲变成火药桶。1914年萨拉热窝一声枪响(斐迪南遇刺),五周内列强全部卷入。\n\n西线陷入惨烈的堑壕战——凡尔登、索姆河成为"绞肉机";毒气、坦克、飞机登场。1917年俄国革命退出、美国参战。1918年德国崩溃。四大帝国(德、奥匈、奥斯曼、俄)瓦解,而苛刻的《凡尔赛条约》又埋下二战的种子。`,
    nine_inventions:[{name:'总体战与现代战争',year:'1914',body:'堑壕战、机枪、毒气、坦克、飞机,工业化杀戮。'},{name:'四大帝国崩溃',year:'1918',body:'德/奥匈/奥斯曼/俄罗斯帝国瓦解,世界格局重塑。'},{name:'(隐患)凡尔赛条约',year:'1919',body:'对德苛刻,德国复仇心理→希特勒崛起。'}],
    collapse_chain:['凡尔赛屈辱+大萧条','→ 法西斯崛起与二战']},
  ww2:{pronunciation:'第二次世界大战',capital_at_peak:'全球战场',territory_max:'人类史上最大战争',population_peak:'死亡约7000-8500万',language:'—',writing:'联合国宪章',religion:'—',economy:'战时经济',
    opening_narrative:`大萧条与凡尔赛的屈辱催生法西斯:希特勒、墨索里尼、日本军国主义。绥靖政策助长其野心,1939年德国闪击波兰,二战爆发。\n\n这是人类史上最惨烈的战争:闪电战、不列颠空战、斯大林格勒的转折、诺曼底登陆、太平洋跳岛、奥斯维辛的大屠杀(约600万犹太人)、广岛长崎的原子弹。约8000万人死亡。战后诞生联合国、核武时代与美苏冷战格局。`,
    nine_inventions:[{name:'(浩劫)大屠杀',year:'1941',body:'纳粹系统性灭绝约600万犹太人,人类最大种族灭绝。'},{name:'核武器时代',year:'1945',body:'曼哈顿计划与广岛长崎,人类进入核时代。'},{name:'联合国与战后秩序',year:'1945',body:'吸取两战教训建立的国际体系。'}],
    collapse_chain:['→ 联合国·冷战·核时代(下一章)']},
});

Object.assign(EVENT_DEEP, {
  evt_spinning_factory:{full_title:'纺织机械与工厂制度',one_liner:'1760年代起珍妮机、水力纺纱机+工厂制,工业革命的引擎。',narrative:`工业革命始于纺织业:1764年珍妮纺纱机、1769年阿克赖特水力纺纱机让一人产出数十倍纱线。阿克赖特1771年建起世界第一座水力纺纱厂,数百工人轮班、按章作业——现代工厂制度由此诞生。\n\n机器把生产从家庭作坊搬进工厂,催生了工业城市曼彻斯特("棉都"),也带来了童工与贫民窟。`,context_before:'圈地运动提供劳动力,英国煤铁丰富。',what_happened:['1764 珍妮纺纱机','1769 阿克赖特水力纺纱机','1771 第一座纺纱工厂','工厂制度诞生'],significance:'工厂制度的开端;从农业社会迈向工业社会。',evidence:[{artifact:'克罗姆福德工厂',what:'阿克赖特水力纺纱厂,世界遗产。',held:'英国德比郡'}],leads_to:'蒸汽动力;城市化',source:'工业革命史',related_people:['arkwright','watt']},
  evt_watt_steam:{full_title:'瓦特蒸汽机',one_liner:'1769年瓦特改良蒸汽机,效率倍增,驱动整个工业革命。',narrative:`瓦特发现纽科门蒸汽机反复加热冷却气缸浪费大量能量,1765年灵感突现:加一个分离式冷凝器,让气缸始终保持高温。1769年获专利,效率提高三四倍。\n\n他与企业家博尔顿合伙,把蒸汽机卖向全国。"我销售的是全世界都渴望的东西——动力。"蒸汽机驱动工厂、火车、轮船,成为工业革命的心脏;功率单位"瓦特"以他命名。`,context_before:'纽科门蒸汽机效率低下。',what_happened:['1765 构思分离冷凝器','1769 获专利','与博尔顿合伙量产','驱动工厂与交通'],significance:'真正实用的动力机器;工业革命的引擎。',evidence:[{artifact:'博尔顿-瓦特蒸汽机',what:'现存实物。',held:'英国科学博物馆'}],leads_to:'铁路;蒸汽轮船;全球工业化',source:'技术史',related_people:['watt']},
  evt_railway:{full_title:'铁路时代的开启',one_liner:'1825/1830年斯蒂芬森开公共铁路,"火箭号"领跑现代铁路。',narrative:`1825年斯托克顿-达灵顿铁路、1830年利物浦-曼彻斯特铁路开通,斯蒂芬森的"火箭号"机车以约时速47公里夺冠。\n\n铁路把货物与人快速、廉价地运往各地,统一了市场、催生了标准时间,深刻改变了经济与生活节奏。斯蒂芬森确定的标准轨距(1435毫米)沿用至今。`,context_before:'蒸汽机+铁轨结合。',what_happened:['1825 第一条公共铁路','1829 火箭号竞赛获胜','1830 利物浦-曼彻斯特线','确立标准轨距'],significance:'交通革命;统一市场与时间标准化。',evidence:[{artifact:'"火箭号"机车',what:'斯蒂芬森名作。',held:'英国科学博物馆'}],leads_to:'全球铁路网;工业扩散',source:'技术史',related_people:['stephenson','brunel']},
  evt_electricity:{full_title:'电力时代',one_liner:'法拉第到爱迪生、特斯拉,电力照亮世界、远距输电。',narrative:`1831年法拉第发现电磁感应,奠定发电机与电动机的原理。1879年爱迪生造出实用电灯、1882年建公共发电站。\n\n爱迪生(直流)与特斯拉/威斯汀豪斯(交流)展开"电流之战",最终交流电因可远距输电而胜出——现代电力系统的基础。第二次工业革命就此点亮。`,context_before:'第一次工业革命后电学突破。',what_happened:['1831 电磁感应','1879 实用电灯','1882 公共发电站','交流电赢得电流之战'],significance:'第二次工业革命;电力成为现代文明的基础设施。',evidence:[{artifact:'爱迪生电灯',what:'早期白炽灯。',held:'多家博物馆'}],leads_to:'电气化;现代通信',source:'技术史',related_people:['faraday','edison','tesla']},
  evt_darwin:{full_title:'达尔文进化论',one_liner:'1859年《物种起源》提出自然选择,重塑人类对生命与自身的认识。',narrative:`1859年达尔文出版《物种起源》,提出物种通过"自然选择"演化——适应环境者繁衍。这一理论挑战了神创论,把人类放回自然界。\n\n它深刻影响了生物学、哲学与社会思想(也被歪曲为"社会达尔文主义"为帝国主义辩护)。`,context_before:'19世纪博物学与地质学积累。',what_happened:['环球考察(小猎犬号)','1859 《物种起源》','提出自然选择','引发科学与宗教震动'],significance:'现代生物学的基石;改变人类自我认知。',evidence:[{artifact:'《物种起源》',what:'1859年初版。',held:'多家图书馆'}],leads_to:'现代生物学;(被滥用的)社会达尔文主义',source:'科学史',related_people:['darwin']},
  evt_communist_manifesto:{full_title:'马克思主义诞生',one_liner:'1848《共产党宣言》、1867《资本论》,工业革命催生社会主义。',narrative:`面对工业革命下工人的悲惨处境,马克思与恩格斯1848年发表《共产党宣言》、马克思1867年出版《资本论》,提出阶级斗争与对资本主义的批判。\n\n这套思想成为20世纪社会主义运动、俄国革命与冷战一方的理论基础,深刻塑造了现代世界。`,context_before:'工业革命造成尖锐的劳资矛盾。',what_happened:['恩格斯观察曼彻斯特工人','1848 《共产党宣言》','1867 《资本论》','影响20世纪世界'],significance:'工业革命的社会回应;影响俄国革命与冷战。',evidence:[{artifact:'《资本论》',what:'马克思著。',held:'传世'}],leads_to:'俄国革命;社会主义运动;冷战',source:'思想史',related_people:['marx','engels','smith']},
  evt_second_industrial:{full_title:'第二次工业革命',one_liner:'1870-1914电力、内燃机、化工、汽车与飞机,科技加速。',narrative:`19世纪末,电力、内燃机、化学工业把工业革命推向新阶段:本茨造汽车、福特用流水线让汽车进入大众、莱特兄弟飞上天、贝尔发明电话、诺贝尔造炸药、居里夫人发现放射性。\n\n科技与工业空前融合,生产力暴增,也为即将到来的世界大战提供了更可怕的武器。`,context_before:'电力与化学突破。',what_happened:['1885 汽车','1903 飞机','1908 福特流水线','电话/化工/放射性'],significance:'科技-工业深度融合;现代生活方式成形。',evidence:[{artifact:'福特T型车',what:'流水线量产的国民车。',held:'多家博物馆'}],leads_to:'消费社会;世界大战的武器',source:'技术史',related_people:['ford','benz','wright','bell','curie','nobel']},
  evt_bastille:{full_title:'攻占巴士底狱',one_liner:'1789.7.14巴黎民众攻占巴士底狱,法国大革命爆发。',narrative:`财政危机、等级不公与启蒙思想交织。1789年7月14日,愤怒的巴黎民众攻占象征王权专制的巴士底狱——法国大革命爆发(这天成为法国国庆)。\n\n随后《人权宣言》宣告"人生而自由平等",废除封建特权。旧制度的根基开始崩塌。`,context_before:'财政危机+1788歉收+三等级不公。',what_happened:['1789.5 三级会议','6 国民议会·网球场宣誓','7.14 攻占巴士底狱','8 《人权宣言》'],significance:'法国大革命开端;现代人权与公民政治的里程碑。',evidence:[{artifact:'《人权与公民权宣言》',what:'1789年。',held:'法国'}],leads_to:'君主立宪→恐怖统治→拿破仑',source:'法国大革命史',related_people:['louis16','rousseau','robespierre']},
  evt_terror:{full_title:'恐怖统治',one_liner:'1793-94罗伯斯庇尔的恐怖统治,数万人上断头台。',narrative:`1793年路易十六被处死,内忧外患下雅各宾派掌权。罗伯斯庇尔以"美德与恐怖"清洗政敌,约一两万到四万人被送上断头台,连战友丹东也未能幸免。\n\n1794年热月政变,罗伯斯庇尔自己被处死,恐怖统治终结。革命吞噬了它自己的孩子。`,context_before:'革命战争+王党叛乱+内部分裂。',what_happened:['1793 路易十六被处死','雅各宾派恐怖统治','丹东等被处决','1794 热月政变'],significance:'革命极端化的警示;后世极权主义的先例之一。',evidence:[{artifact:'《马拉之死》',what:'大卫名画。',held:'布鲁塞尔'}],leads_to:'督政府→拿破仑',source:'法国大革命史',related_people:['robespierre','danton','marat','louis16']},
  evt_napoleon_empire:{full_title:'拿破仑帝国',one_liner:'1804拿破仑称帝,横扫欧洲,颁《拿破仑法典》。',narrative:`拿破仑在革命战争中崛起,1799年雾月政变掌权,1804年加冕称帝。他在奥斯特里茨等战役中以少胜多、横扫欧洲,解散神圣罗马帝国。\n\n他颁布的《拿破仑法典》成为现代民法典的基础,把革命的法律平等带到所到之处——封建制度在法军到达的地方被废除。`,context_before:'督政府腐败,拿破仑军功显赫。',what_happened:['1799 雾月政变','1804 加冕称帝','1805 奥斯特里茨三皇会战','颁《拿破仑法典》'],significance:'传播革命法律与民族主义;重塑欧洲。',evidence:[{artifact:'《拿破仑加冕》',what:'大卫巨画。',held:'卢浮宫'}],leads_to:'入侵俄国→衰落→滑铁卢',source:'拿破仑史',related_people:['napoleon','nelson']},
  evt_waterloo:{full_title:'滑铁卢与维也纳会议',one_liner:'1815滑铁卢拿破仑终败;维也纳会议重建欧洲保守秩序。',narrative:`1812年入侵俄国惨败后,拿破仑帝国崩塌。1815年百日王朝复辟,6月18日在滑铁卢被威灵顿与布吕歇尔联军击败,流放圣赫勒拿岛。\n\n战后梅特涅主持维也纳会议,以"正统""均势"原则恢复欧洲旧秩序,维持了约40年的和平——但革命点燃的自由与民族主义已无法熄灭。`,context_before:'1812征俄惨败,反法同盟反攻。',what_happened:['1812 征俄惨败','1814 退位流放厄尔巴','1815 滑铁卢终败','维也纳会议重建秩序'],significance:'拿破仑时代终结;维也纳体系与欧洲均势。',evidence:[{artifact:'滑铁卢战场',what:'比利时,纪念狮丘。',held:'比利时'}],leads_to:'维也纳体系;1848革命;意德统一',source:'拿破仑史',related_people:['napoleon','wellington','metternich']},
  evt_opium_war:{full_title:'鸦片战争',one_liner:'1839-1842英国以炮舰打开中国,《南京条约》割香港。',narrative:`林则徐1839年虎门销烟,英国以此为由发动鸦片战争。工业化的英国海军轻易击败清军,1842年《南京条约》割让香港、开五口通商、赔款——中国近代屈辱的开端。\n\n此后太平天国、第二次鸦片战争、甲午战败、义和团接踵而至,古老帝国在西方与日本的冲击下风雨飘摇。`,context_before:'清朝闭关,英国扭转对华贸易逆差贩鸦片。',what_happened:['1839 虎门销烟','1840 鸦片战争','1842 《南京条约》割香港','开五口通商'],significance:'中国近代史开端;"天朝"被强行卷入近代世界。',evidence:[{artifact:'《南京条约》',what:'中国第一个不平等条约。',held:'两岸档案'}],leads_to:'太平天国;甲午;辛亥革命',source:'近代史',related_people:['linzexu','cixi','lihongzhang']},
  evt_scramble_africa:{full_title:'瓜分非洲',one_liner:'1884柏林会议,欧洲列强在地图上瓜分非洲,无一非洲人在场。',narrative:`1884-85年俾斯麦主持柏林会议,欧洲列强按"有效占领"原则在地图上瓜分非洲——没有一位非洲人在场。1870年欧洲仅控制非洲约10%,到1914年达约90%。\n\n利奥波德二世的刚果"自由邦"以人道之名行极端剥削,约千万人死亡,成为殖民暴行的极端象征(《黑暗之心》)。`,context_before:'工业列强争夺殖民地与原料。',what_happened:['1884 柏林会议','"有效占领"原则','1914 控制非洲约90%','刚果暴行'],significance:'非洲被殖民瓜分;影响延续至今的边界与冲突。',evidence:[{artifact:'柏林会议地图',what:'瓜分非洲的划界。',held:'欧洲档案'}],leads_to:'去殖民化(下一章);现代非洲边界',source:'帝国主义史',related_people:['bismarck','leopold2','rhodes']},
  evt_taiping:{full_title:'太平天国',one_liner:'1850-1864洪秀全领导,19世纪最血腥战争,约2000万人死。',narrative:`洪秀全自称耶稣之弟,1851年发动太平天国起义,一度占据半个中国、定都南京。这场持续14年的内战与清朝、列强角力,导致约2000万至3000万人死亡——19世纪最血腥的战争。\n\n它重创清朝,也催生了曾国藩、李鸿章等汉族地方势力与洋务运动的兴起。`,context_before:'鸦片战争后清朝衰败、民不聊生。',what_happened:['1851 金田起义','定都南京(天京)','与清军/列强混战','1864 天京陷落'],significance:'重创清朝;催生洋务运动与地方势力。',evidence:[{artifact:'太平天国文献',what:'起义史料。',held:'传世'}],leads_to:'洋务运动;清朝衰亡',source:'近代史',related_people:['hongxiuquan','lihongzhang']},
  evt_italian_unif:{full_title:'意大利统一',one_liner:'1861加里波第、加富尔合力,意大利走向统一。',narrative:`分裂数百年的意大利,在马志尼的理想、加里波第的"红衫军"千人远征、加富尔的外交合谋下走向统一。1861年意大利王国成立,1870年并入罗马。\n\n"灵魂""剑""脑"的合作,把民族主义变成现实——一个统一的意大利在欧洲登场。`,context_before:'拿破仑后民族主义高涨。',what_happened:['马志尼倡导统一','1860 加里波第千人远征','加富尔外交','1861 意大利王国'],significance:'民族国家统一的范例;改变欧洲格局。',evidence:[{artifact:'加里波第纪念',what:'意大利各地。',held:'意大利'}],leads_to:'欧洲民族国家格局',source:'近代史',related_people:['garibaldi','cavour']},
  evt_german_unif:{full_title:'德意志统一',one_liner:'1871俾斯麦以铁血政策统一德国,于凡尔赛镜厅建帝国。',narrative:`俾斯麦"当代问题要靠铁与血解决",以丹麦、普奥、普法三次王朝战争统一德意志。1871年1月18日,在普法战争击败法国后,他在凡尔赛镜厅宣布德意志帝国成立(刻意羞辱法国)。\n\n一个强大、统一、工业化的德国突然出现在欧洲中心,彻底打破了维也纳体系的均势,为一战埋下伏笔。`,context_before:'德意志邦联分裂,普鲁士崛起。',what_happened:['1864 丹麦战争','1866 普奥战争','1870-71 普法战争','1871 凡尔赛建德意志帝国'],significance:'欧洲均势剧变;一战的远因。',evidence:[{artifact:'凡尔赛镜厅',what:'德意志帝国宣告地。',held:'法国凡尔赛'}],leads_to:'联盟体系;第一次世界大战',source:'近代史',related_people:['bismarck','wilhelm1','wilhelm2']},
  evt_black_ships:{full_title:'黑船来航',one_liner:'1853美国佩里"黑船"逼日本开国,结束两百年锁国。',narrative:`1853年美国准将佩里率四艘"黑船"驶入浦贺,以武力威胁。1854年日本被迫签《神奈川条约》开国,两百余年锁国终结。\n\n面对与中国相同的殖民危机,日本没有沉沦——反而催生了倒幕维新的力量,走上主动现代化的道路。`,context_before:'日本锁国两百余年。',what_happened:['1853 佩里黑船来航','1854 《神奈川条约》','被迫开国','倒幕力量兴起'],significance:'日本被迫开国;倒幕维新的导火索。',evidence:[{artifact:'黑船图绘',what:'幕末浮世绘。',held:'日本'}],leads_to:'明治维新',source:'日本史',related_people:['saigo','sakamoto']},
  evt_meiji_restoration:{full_title:'明治维新',one_liner:'1868日本王政复古、全面西化,亚洲唯一主动现代化成功的国家。',narrative:`1868年倒幕成功,明治天皇即位、迁都东京。新政府废藩置县、征兵、地税改革、立宪(1889明治宪法)、殖产兴业、文明开化——短短数十年把封建日本变为工业化强国。\n\n岩仓使团赴欧美考察,福泽谕吉倡导启蒙,涩泽荣一办企业,伊藤博文学普鲁士立宪。日本成为亚洲唯一主动学习西方、避免被殖民的国家。`,context_before:'黑船开国,幕府失势。',what_happened:['1868 王政复古','1871 废藩置县','1889 明治宪法','殖产兴业·文明开化'],significance:'亚洲现代化的成功范例;改变东亚格局。',evidence:[{artifact:'明治宪法',what:'亚洲第一部近代宪法。',held:'日本'}],leads_to:'甲午/日俄战争;军国主义',source:'日本史',related_people:['meiji_emp','ito','fukuzawa','okubo']},
  evt_russo_japanese:{full_title:'日俄战争',one_liner:'1904-05日本击败俄国,亚洲首次在近代战争战胜欧洲大国。',narrative:`为争夺中国东北与朝鲜,日俄1904年开战。东乡平八郎在对马海战全歼俄国波罗的海舰队,日本陆海皆胜。\n\n这是亚洲国家第一次在近代战争中击败欧洲列强,震动世界、鼓舞了亚非民族运动,也让日本跻身大国、进一步走向扩张。`,context_before:'日俄争夺东北亚。',what_happened:['1904 开战','旅顺/奉天会战','1905 对马海战全歼俄舰队','日本获胜'],significance:'亚洲首胜欧洲列强;鼓舞亚非、助长日本扩张。',evidence:[{artifact:'对马海战记录',what:'1905年。',held:'日本'}],leads_to:'吞并朝鲜;军国主义',source:'日本史',related_people:['togo','meiji_emp']},
  evt_sarajevo:{full_title:'萨拉热窝事件与一战爆发',one_liner:'1914.6.28斐迪南遇刺,五周内列强全部卷入一战。',narrative:`1914年6月28日,奥匈皇储斐迪南夫妇在萨拉热窝被塞尔维亚青年普林西普刺杀。在联盟体系的连锁反应下,奥匈对塞宣战→俄德法相继动员→德国入侵比利时→英国参战,五周内欧洲列强全部卷入。\n\n一场地区刺杀,因军国主义、联盟、帝国主义、民族主义的"火药桶"而升级为人类第一次世界大战。`,context_before:'巴尔干火药桶+联盟体系+军备竞赛。',what_happened:['1914.6.28 萨拉热窝刺杀','七月危机','联盟连锁反应','五周内全面开战'],significance:'第一次世界大战的导火索;说明体系性风险。',evidence:[{artifact:'刺杀现场记录',what:'萨拉热窝。',held:'档案'}],leads_to:'堑壕战;四帝国崩溃',source:'一战史',related_people:['franz_ferd','princip','wilhelm2']},
  evt_trench_war:{full_title:'堑壕战 · 凡尔登与索姆河',one_liner:'1916凡尔登与索姆河"绞肉机",工业化战争的惨烈。',narrative:`西线很快陷入从瑞士到英吉利海峡的堑壕僵局。1916年凡尔登战役("他们不会通过")与索姆河战役成为"绞肉机":索姆河首日英军伤亡约5.7万,是英国历史上最血腥的一天;坦克首次投入战场。\n\n机枪、铁丝网、大炮把进攻变成屠杀,数十万人为推进几公里而死——这是工业化杀戮的恐怖。`,context_before:'施里芬计划失败,西线僵持。',what_happened:['堑壕战僵持','1916 凡尔登战役','1916 索姆河战役','坦克首次登场'],significance:'工业化战争的惨烈;一代欧洲青年的浩劫。',evidence:[{artifact:'凡尔登纪念馆',what:'埋葬约13万无名遗骸。',held:'法国'}],leads_to:'美国参战;德国崩溃',source:'一战史',related_people:['clemenceau']},
  evt_russian_rev:{full_title:'俄国革命',one_liner:'1917二月革命推翻沙皇,十月革命布尔什维克掌权。',narrative:`一战的惨重伤亡与饥荒,使俄国1917年爆发二月革命,沙皇尼古拉二世退位。同年十月,列宁领导的布尔什维克夺取政权,建立世界第一个社会主义国家,并退出一战(布列斯特条约)。\n\n1922年苏联成立——这一事件深刻改变了20世纪,埋下冷战的种子。`,context_before:'一战重创俄国,民怨沸腾。',what_happened:['1917.3 二月革命,沙皇退位','1917.11 十月革命','布尔什维克掌权','1918 退出一战'],significance:'世界第一个社会主义国家;冷战的源头。',evidence:[{artifact:'阿芙乐尔号巡洋舰',what:'十月革命象征。',held:'圣彼得堡'}],leads_to:'苏联成立;冷战',source:'一战/俄国史',related_people:['nicholas2']},
  evt_versailles:{full_title:'凡尔赛条约',one_liner:'1919对德苛刻的和约,埋下二战的种子。',narrative:`1919年巴黎和会上,克列孟梭主导对德苛刻条款:德国失13%领土、全部殖民地,军队限10万,赔款1320亿金马克,并背负"战争罪"。威尔逊倡导的国际联盟成立,但美国国会拒绝加入。\n\n屈辱与经济重负点燃了德国的民族主义复仇心理——希特勒崛起的温床。"在战争与耻辱间选择了耻辱,最终两者都得到。"`,context_before:'一战结束,战胜国分赃。',what_happened:['1919 巴黎和会','《凡尔赛条约》苛待德国','成立国际联盟','美国拒绝加入'],significance:'埋下二战祸根;失败的国际秩序尝试。',evidence:[{artifact:'《凡尔赛条约》',what:'1919年。',held:'法国'}],leads_to:'纳粹崛起;二战',source:'一战史',related_people:['wilson','clemenceau']},
  evt_ww2_outbreak:{full_title:'二战爆发 · 闪击波兰',one_liner:'1939.9.1德国闪击波兰,二战欧洲战场开始。',narrative:`大萧条与凡尔赛屈辱催生纳粹。希特勒吞并奥地利、捷克后,1939年8月与苏联签互不侵犯条约秘密瓜分波兰,9月1日闪击波兰,英法对德宣战——二战爆发。\n\n德军以"闪电战"6周灭法国;不列颠空战中英国凭皇家空军挡住德国。绥靖政策的破产震惊世界。`,context_before:'大萧条+绥靖+法西斯扩张。',what_happened:['1938 吞并奥地利/苏台德','1939.8 苏德互不侵犯条约','1939.9.1 闪击波兰','英法宣战'],significance:'二战欧洲战场开端;闪电战登场。',evidence:[{artifact:'波兰战役记录',what:'1939年。',held:'档案'}],leads_to:'法国沦陷;不列颠空战;巴巴罗萨',source:'二战史',related_people:['hitler','churchill']},
  evt_pearl_harbor:{full_title:'偷袭珍珠港',one_liner:'1941.12.7日本偷袭珍珠港,美国参战,太平洋战争爆发。',narrative:`为夺取东南亚资源,日本1941年12月7日偷袭美国太平洋舰队基地珍珠港。山本五十六策划了这次奇袭,却预言"我担心只是唤醒了一个沉睡的巨人"。\n\n次日美国对日宣战,二战成为真正的全球战争。美国庞大的工业产能开始转向战争——成为决定胜负的关键。`,context_before:'日本扩张与美国禁运对立。',what_happened:['1941.12.7 偷袭珍珠港','美国对日宣战','太平洋战争爆发','美国工业转向战时'],significance:'美国全面参战;战争天平开始转向同盟国。',evidence:[{artifact:'亚利桑那号纪念馆',what:'珍珠港。',held:'美国夏威夷'}],leads_to:'中途岛;太平洋反攻',source:'二战史',related_people:['yamamoto','tojo','roosevelt']},
  evt_stalingrad:{full_title:'斯大林格勒战役',one_liner:'1942-43苏军歼灭德国第六集团军,二战欧洲转折点。',narrative:`1941年德国发动巴巴罗萨入侵苏联。1942-43年的斯大林格勒战役中,苏军在惨烈巷战后合围并歼灭德国第六集团军(约25万人)。\n\n这是二战欧洲战场的转折点——从此德军在东线全面转入防御,苏联开始向柏林反攻。朱可夫等将领指挥了这场惊人的逆转。`,context_before:'1941巴巴罗萨,德军深入苏联。',what_happened:['1941 巴巴罗萨入侵苏联','1942-43 斯大林格勒巷战','苏军合围德第六集团军','德军东线转入防御'],significance:'欧洲战场转折点;苏联开始反攻。',evidence:[{artifact:'马马耶夫岗纪念',what:'斯大林格勒(伏尔加格勒)。',held:'俄罗斯'}],leads_to:'苏军反攻柏林',source:'二战史',related_people:['stalin','zhukov','hitler']},
  evt_dday:{full_title:'诺曼底登陆',one_liner:'1944.6.6人类史上最大两栖登陆,开辟欧洲第二战场。',narrative:`1944年6月6日(D-Day),约15.6万盟军在艾森豪威尔指挥下横渡英吉利海峡,在诺曼底登陆——人类历史上最大规模的两栖作战。\n\n第二战场的开辟使德国陷入东西两线夹击。此后盟军解放巴黎、突入德国;1945年4月希特勒自杀,5月8日欧洲胜利日。`,context_before:'东线苏军反攻,盟军需开辟西线。',what_happened:['1944.6.6 诺曼底登陆','解放巴黎','东西夹击德国','1945.4 希特勒自杀'],significance:'欧洲战场决定性转折;通向纳粹覆灭。',evidence:[{artifact:'诺曼底美军公墓',what:'纪念阵亡将士。',held:'法国'}],leads_to:'德国投降;欧洲胜利日',source:'二战史',related_people:['eisenhower','churchill','hitler']},
  evt_holocaust:{full_title:'大屠杀',one_liner:'纳粹系统性灭绝约600万犹太人,人类历史最大的种族灭绝。',narrative:`纳粹以种族主义意识形态,系统性地迫害与屠杀犹太人:从纽伦堡法到隔离区,再到奥斯维辛等灭绝营的工业化杀戮,约600万犹太人(及罗姆人、残疾人等)被害。\n\n安妮·弗兰克的日记、辛德勒的名单留下了人性的记录。战后纽伦堡审判确立"反人类罪",汉娜·阿伦特提出"平庸之恶"——警示人类永不重演。`,context_before:'纳粹种族主义意识形态。',what_happened:['1935 纽伦堡反犹法','隔离区与灭绝营','奥斯维辛工业化屠杀','约600万犹太人遇害'],significance:'人类最大种族灭绝;"反人类罪"与人权觉醒的警钟。',evidence:[{artifact:'奥斯维辛集中营',what:'世界遗产,警示后人。',held:'波兰'},{artifact:'《安妮日记》',what:'大屠杀最著名的个人记录。',held:'阿姆斯特丹'}],leads_to:'纽伦堡审判;以色列建国;人权宣言',source:'二战史',related_people:['hitler','anne_frank']},
  evt_hiroshima:{full_title:'广岛长崎原子弹',one_liner:'1945.8美国投下原子弹,日本投降,人类进入核时代。',narrative:`1945年,曼哈顿计划(奥本海默主持)造出原子弹。8月6日广岛、9日长崎遭原子弹轰炸,加上苏联对日宣战,日本于8月15日宣布投降,二战结束。\n\n原子弹的蘑菇云宣告了核武器时代的到来——"我成了死神,世界的毁灭者"。人类从此拥有了毁灭自身的能力。`,context_before:'太平洋战争,日本拒不投降。',what_happened:['曼哈顿计划造原子弹','1945.8.6 广岛','1945.8.9 长崎+苏联对日宣战','8.15 日本投降'],significance:'二战结束;核武器时代开启,深刻笼罩冷战。',evidence:[{artifact:'广岛和平纪念馆(原爆圆顶)',what:'世界遗产。',held:'日本广岛'}],leads_to:'核时代;冷战(下一章)',source:'二战史',related_people:['oppenheimer','einstein','truman']},
});

const CIV_MAP = {};
const CIV_MYTHS = {};
const SITE_MODERN = {};
function siteModern(name){ return SITE_MODERN[name] || ''; }
const ROLE_CN = {ruler:'统治者',general:'将领',thinker:'思想家',religious:'宗教人物',other:'其他人物'};
(typeof CLASSICAL_PEOPLE!=='undefined'?CLASSICAL_PEOPLE:[]).forEach(p=>{
  PERSON_DEEP[p.id]={
    full_name:p.n+' · '+p.e, pronunciation:p.e, lifespan_real:p.d,
    historical_or_mythic:'**'+(ROLE_CN[p.r]||'人物')+'**', biography:p.b,
    achievements_detail:[], legacy:'', sources:[],
    related:(p.rel||[]).map(r=>({id:r.i,relation:r.t,note:''})), _civ:p.c,_role:p.r
  };
});

const CIV_PEOPLE_NAMES = {
  industrial:['瓦特','阿克赖特','斯蒂芬森','布鲁内尔','法拉第','爱迪生','特斯拉','贝尔','卡尔·本茨','亨利·福特','莱特兄弟','达尔文','亚当·斯密','马克思','恩格斯','巴斯德','诺贝尔','居里夫人'],
  french_rev:['伏尔泰','卢梭','孟德斯鸠','路易十六','玛丽·安托瓦内特','罗伯斯庇尔','丹东','马拉','拿破仑','威灵顿公爵','纳尔逊','梅特涅'],
  imperialism:['维多利亚女王','利奥波德二世','塞西尔·罗德斯','利文斯通','林则徐','慈禧太后','李鸿章','洪秀全'],
  unification:['俾斯麦','加里波第','加富尔','威廉一世'],
  meiji:['明治天皇','西乡隆盛','大久保利通','坂本龙马','伊藤博文','福泽谕吉','东乡平八郎'],
  ww1:['弗朗茨·斐迪南','普林西普','威廉二世','威尔逊','克列孟梭','凯末尔','尼古拉二世'],
  ww2:['希特勒','墨索里尼','东条英机','丘吉尔','罗斯福','斯大林','戴高乐','蒋介石','毛泽东','杜鲁门','艾森豪威尔','朱可夫','隆美尔','山本五十六','奥本海默','爱因斯坦','安妮·弗兰克'],
};
const CIV_EVENTS = {
  industrial:['evt_spinning_factory','evt_watt_steam','evt_railway','evt_electricity','evt_darwin','evt_communist_manifesto','evt_second_industrial'],
  french_rev:['evt_bastille','evt_terror','evt_napoleon_empire','evt_waterloo'],
  imperialism:['evt_opium_war','evt_scramble_africa','evt_taiping'],
  unification:['evt_italian_unif','evt_german_unif'],
  meiji:['evt_black_ships','evt_meiji_restoration','evt_russo_japanese'],
  ww1:['evt_sarajevo','evt_trench_war','evt_russian_rev','evt_versailles'],
  ww2:['evt_ww2_outbreak','evt_pearl_harbor','evt_stalingrad','evt_dday','evt_holocaust','evt_hiroshima'],
};

const NAME2ID = {};
(typeof CLASSICAL_PEOPLE!=='undefined'?CLASSICAL_PEOPLE:[]).forEach(p=>{NAME2ID[p.n]=p.id;});
function namesToIds(names){return (names||[]).map(n=>NAME2ID[n]).filter(Boolean);}

const CIV_META = [
  {id:'industrial',name:'工业革命',color:'#7a5a30',icon:'⚙️',start:1760,end:1914,lane:1},
  {id:'french_rev',name:'法国大革命·拿破仑',color:'#2a4a9a',icon:'🎩',start:1789,end:1815,lane:2},
  {id:'unification',name:'民族国家统一',color:'#5a6a30',icon:'🏴',start:1848,end:1871,lane:2},
  {id:'imperialism',name:'帝国主义时代',color:'#9a3030',icon:'🌍',start:1800,end:1914,lane:3},
  {id:'meiji',name:'明治日本',color:'#c83838',icon:'🌅',start:1853,end:1912,lane:4},
  {id:'ww1',name:'第一次世界大战',color:'#5a5a5a',icon:'💣',start:1914,end:1918,lane:5},
  {id:'ww2',name:'第二次世界大战',color:'#3a3a3a',icon:'⚔️',start:1939,end:1945,lane:5},
];
function _yr(y){return y<0?'前 '+(-y):(y===0?'公元元年':'公元 '+y);}
CIV_META.forEach(c=>{ if(CIV_DEEP[c.id]) CIV_DEEP[c.id].time_range = _yr(c.start)+' – '+_yr(c.end); });

const EARLY_CIV_EXPLORER = { civilizations: CIV_META.map(c=>({...c})), comparison_dimensions: [] };

const CHAPTERS = [{
  id:'modern', no:'05', range:'公元 1750 – 1945', title:'工业与现代世界',
  active_civs: CIV_META.map(c=>({
    id:c.id,
    state:(CIV_DEEP[c.id]&&CIV_DEEP[c.id].pronunciation)||c.name,
    L1:'',
    L3_events: CIV_EVENTS[c.id]||[],
    L4_people: namesToIds(CIV_PEOPLE_NAMES[c.id]),
    L5_full:'CIV_DEEP.'+c.id
  })),
  key_events:[], key_people:[], world_context:''
}];

const FINAL_OVERVIEW = {
  civs: CIV_META.map(c=>({id:c.id,name:c.name,color:c.color,spans:[],legacy:(CIV_DEEP[c.id]&&CIV_DEEP[c.id].nine_inventions&&CIV_DEEP[c.id].nine_inventions[0]?CIV_DEEP[c.id].nine_inventions[0].name:'')})),
  today_legacy: [
    {what:'机器大生产与工厂',from:'工业革命(18-19世纪)',why:'现代制造业与城市生活方式的起点'},
    {what:'电力·汽车·飞机·电话',from:'第二次工业革命',why:'今日基础设施与交通通信的基石'},
    {what:'人权与公民政治',from:'法国大革命(1789)',why:'自由平等、《人权宣言》塑造现代民主'},
    {what:'民族国家',from:'意德统一(19世纪)',why:'今日世界国家体系的主流形态'},
    {what:'现代民法典',from:'《拿破仑法典》(1804)',why:'影响欧洲、拉美、日本的法律体系'},
    {what:'联合国与人权觉醒',from:'两次世界大战的教训',why:'反人类罪、人权宣言、国际秩序'},
    {what:'核能与核武器',from:'曼哈顿计划(1945)',why:'核时代深刻影响此后的世界格局'},
  ],
};

if (typeof module !== 'undefined') module.exports = { CIV_DEEP, EVENT_DEEP, PERSON_DEEP, CIV_MAP, CIV_MYTHS, SITE_MODERN, CHAPTERS, FINAL_OVERVIEW, EARLY_CIV_EXPLORER };
