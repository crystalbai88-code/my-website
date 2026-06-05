// ════════════════════════════════════════════════════════════════
// 古典思想与帝国 · 深度数据层 (前600–公元400)
// 复用早期文明深度页引擎(civ-deep.html)的数据契约：
// CIV_DEEP / PERSON_DEEP / EVENT_DEEP / CIV_MAP / CIV_MYTHS /
// CHAPTERS / FINAL_OVERVIEW / EARLY_CIV_EXPLORER
// 人物数据来自共享 classical_people.js (CLASSICAL_PEOPLE)
// ════════════════════════════════════════════════════════════════

// ───────── 1. 文明深度条目 (14) ─────────
const CIV_DEEP = {
  chunqiu:{pronunciation:'春秋 · Chūnqiū · Spring and Autumn',capital_at_peak:'列国分立 (洛邑为名义王都)',territory_max:'黄河中下游诸侯国',population_peak:'—',language:'上古汉语',writing:'金文 → 籀文(大篆)',religion:'天命 + 祖先崇拜 + 礼乐',economy:'井田制农业 + 青铜 + 早期铁器',
    opening_narrative:`春秋是周王室衰微、诸侯争霸的乱世——"礼崩乐坏"。但正是这乱世逼出了中国最早的思想突破：**孔子**周游列国十四年，传"仁"与"礼"，整理六经；**老子**写《道德经》言"道法自然、无为而治"。这是中国轴心时代的开端。\n\n政治上，齐桓、晋文等"春秋五霸"相继称霸，"尊王攘夷"。子产在郑国铸刑书于铜鼎，是中国最早公布的成文法。`,
    nine_inventions:[{name:'儒家创立',year:'~前551',body:'孔子提出仁、礼、君子、有教无类，影响东亚两千年。'},{name:'道家创立',year:'~前571',body:'老子《道德经》，"道法自然""无为"，中国哲学的另一极。'},{name:'成文法公布',year:'~前536',body:'子产铸刑书——中国最早向民众公布的成文法律。'},{name:'《孙子兵法》',year:'~前512',body:'孙武十三篇，世界最早的系统军事理论。'},{name:'霸主体制',year:'~前679',body:'齐桓公"九合诸侯、尊王攘夷"，开霸政先河。'}],
    collapse_chain:['~前476 · 三家分晋前夜，礼乐秩序彻底瓦解','~前453 · 晋被韩赵魏瓜分','~前403 · 周威烈王承认三晋，正式进入战国']},
  zhanguo:{pronunciation:'战国 · Zhànguó · Warring States',capital_at_peak:'七雄各都 (秦·咸阳等)',territory_max:'黄河长江流域',population_peak:'—',language:'上古汉语',writing:'六国文字(后被秦统一)',religion:'天命 + 诸子思想多元',economy:'铁犁牛耕 + 变法授田 + 商业城市',
    opening_narrative:`战国是七雄(齐楚燕韩赵魏秦)并立、兼并惨烈的时代，也是"**百家争鸣**"的思想黄金期：儒(孟子/荀子)、墨(墨子)、道(庄子)、法(韩非)、名、纵横，空前自由。\n\n各国变法图强，**商鞅变法**以军功爵、郡县、连坐重塑秦国，使其后来居上。纵横家苏秦、张仪以合纵连横搅动天下。`,
    nine_inventions:[{name:'百家争鸣',year:'前475–221',body:'儒墨道法名纵横同台辩论，人类思想史罕见的自由时代。'},{name:'商鞅变法',year:'~前356',body:'军功爵、郡县制、连坐法，奠定秦统一的制度基础。'},{name:'孟子性善·民本',year:'~前320',body:'"民为贵，社稷次之，君为轻"。'},{name:'荀子性恶·礼法',year:'~前250',body:'弟子韩非、李斯将其发展为法家。'},{name:'《韩非子》法术势',year:'~前240',body:'法家集大成，中央集权理论的顶峰。'}],
    collapse_chain:['~前230 · 秦开始灭六国','~前221 · 韩赵魏楚燕齐尽灭，战国终结','→ 秦统一，进入帝国时代']},
  qin:{pronunciation:'秦朝 · Qín · Qin Dynasty',capital_at_peak:'咸阳',territory_max:'约 340 万 km²',population_peak:'约 2000 万',language:'上古汉语',writing:'小篆(书同文)',religion:'法家政治 + 五德终始',economy:'统一度量衡货币 + 重农抑商',
    opening_narrative:`秦始皇灭六国，建立中国**第一个中央集权帝国**。书同文、车同轨、统一货币与度量衡；废分封、行郡县——奠定此后两千年中国政治格局。修长城、驰道、骊山陵(兵马俑)。\n\n但严刑峻法 + 大兴土木耗尽民力，秦始皇死后仅四年，陈胜吴广起义点燃天下，二世而亡。`,
    nine_inventions:[{name:'皇帝制度',year:'前221',body:'嬴政自称"始皇帝"，开创延续两千年的帝制。'},{name:'郡县制',year:'前221',body:'废分封、设郡县，中央直辖——中国政治的根本框架。'},{name:'书同文',year:'前221',body:'统一为小篆，奠定汉字统一与文化认同。'},{name:'车同轨·统一度量衡货币',year:'前221',body:'统一标准，打通全国经济。'},{name:'万里长城·兵马俑',year:'~前214',body:'连接北方长城御匈奴；骊山陵兵马俑为世界奇迹。'}],
    collapse_chain:['前210 · 秦始皇病逝沙丘，赵高李斯矫诏','前209 · 陈胜吴广大泽乡起义','前207 · 赵高弑二世','前206 · 刘邦入咸阳，子婴降，秦亡','前206–202 · 楚汉相争']},
  xihan:{pronunciation:'西汉 · Xīhàn · Western Han',capital_at_peak:'长安',territory_max:'约 600 万 km²',population_peak:'约 6000 万',language:'上古/中古汉语',writing:'隶书',religion:'黄老→独尊儒术 + 天人感应',economy:'休养生息 + 盐铁专卖 + 丝路贸易',
    opening_narrative:`刘邦战胜项羽建立汉朝。**文景之治**以黄老"无为"休养生息；**汉武帝**"独尊儒术"，确立儒家两千年正统地位，又盐铁专卖、推恩削藩。\n\n卫青、霍去病北击匈奴；**张骞**两次出使西域，开通丝绸之路。司马迁忍宫刑著《史记》，中国第一部纪传体通史。`,
    nine_inventions:[{name:'独尊儒术',year:'~前134',body:'董仲舒建议，儒家成为国家意识形态，影响两千年。'},{name:'丝绸之路开通',year:'~前130',body:'张骞通西域，欧亚大陆东西首次大规模连接。'},{name:'《史记》',year:'~前91',body:'司马迁纪传体通史，"史家之绝唱"。'},{name:'推恩令·察举制',year:'~前127',body:'削藩集权 + 选官制度雏形。'},{name:'反击匈奴',year:'前129–119',body:'卫青霍去病收河套、扫漠北，奠定汉疆。'}],
    collapse_chain:['~前1世纪末 · 外戚专权，土地兼并加剧','公元8 · 王莽篡汉建"新"','公元23 · 绿林赤眉起义，新莽亡','公元25 · 刘秀复汉(东汉)']},
  donghan:{pronunciation:'东汉 · Dōnghàn · Eastern Han',capital_at_peak:'洛阳',territory_max:'约 580 万 km²',population_peak:'约 6500 万',language:'中古汉语早期',writing:'隶书→楷书雏形',religion:'儒家 + 谶纬 + 佛教传入',economy:'庄园经济 + 丝路 + 造纸',
    opening_narrative:`光武帝刘秀中兴汉室，定都洛阳。**班超**以三十六人纵横西域三十年，重通丝路，并派甘英出使大秦(罗马)。**蔡伦**改进造纸术，深远影响世界文明。佛教经丝路传入中国。\n\n后期外戚与宦官交替专权，党锢之祸 + 黄巾起义，帝国走向三国分裂。`,
    nine_inventions:[{name:'蔡伦改进造纸术',year:'~105',body:'廉价书写材料，是人类信息史的里程碑。'},{name:'班超经营西域',year:'73–102',body:'重通丝路，派甘英抵波斯湾、远窥罗马。'},{name:'佛教传入中国',year:'~1世纪',body:'白马寺，佛教东渐的起点。'},{name:'张衡地动仪·浑天仪',year:'~132',body:'世界最早的地震仪与天文仪器之一。'}],
    collapse_chain:['~184 · 黄巾起义，"苍天已死"','~189 · 董卓乱政，群雄并起','~196 · 曹操挟天子','220 · 曹丕代汉，三国开端']},
  achaemenid:{pronunciation:'阿契美尼德波斯 · Achaemenid Persia',capital_at_peak:'波斯波利斯 / 苏萨',territory_max:'约 800 万 km² (古代最大)',population_peak:'约 5000 万',language:'古波斯语 + 阿拉米语(行政)',writing:'楔形文字 + 阿拉米字母',religion:'琐罗亚斯德教(善恶二元)',economy:'王道驿道 + 金币 + 朝贡',
    opening_narrative:`居鲁士大帝缔造人类第一个跨洲"世界帝国"，以**宽容**著称——居鲁士圆柱释放被囚民族，犹太人称他为"弥赛亚"。**大流士一世**建立行省(萨特拉普)制、2700公里"王道"、新都波斯波利斯。\n\n国教**琐罗亚斯德教**主张善恶二元、末日审判、天堂地狱，深刻影响了犹太教与基督教。希波战争中败于希腊，最终前330年被亚历山大灭亡。`,
    nine_inventions:[{name:'第一个世界帝国',year:'~前550',body:'居鲁士跨民族、跨大洲的多元帝国，后世帝国的范本之一。'},{name:'行省(萨特拉普)制',year:'~前518',body:'大流士分省而治，"王之眼"监察，高效管理百族。'},{name:'王道驿道',year:'~前500',body:'2700公里快递干线，"风雨无阻"的古代邮政。'},{name:'宽容治国',year:'~前539',body:'居鲁士圆柱——被誉为最早的"人权宣言"之一。'},{name:'琐罗亚斯德教',year:'—',body:'善恶二元、末日审判，影响犹太教/基督教/伊斯兰教。'}],
    collapse_chain:['前490 · 马拉松战役败于雅典','前480 · 萨拉米斯海战惨败','前334–330 · 三战皆败于亚历山大','前330 · 大流士三世被部将刺杀，波斯亡']},
  magadha:{pronunciation:'摩揭陀 · Magadha · 早期佛教',capital_at_peak:'王舍城 / 华氏城',territory_max:'恒河中下游',population_peak:'—',language:'古印度语(摩揭陀俗语/巴利语)',writing:'婆罗米文(后期)',religion:'佛教 · 耆那教 · 婆罗门教',economy:'恒河农业 + 城市与商路',
    opening_narrative:`恒河流域"十六大国"争雄，摩揭陀崛起。这里诞生了印度的**轴心时代**：**悉达多·乔达摩(佛陀)**四门出游、菩提树下开悟，传四圣谛八正道，弘法四十五年；同时代的**大雄**集大成耆那教，极端不杀生。\n\n频婆娑罗王、阿阇世王是重要护法。佛陀涅槃后，弟子阿难、摩诃迦叶主持第一次结集，整理经典。`,
    nine_inventions:[{name:'佛教创立',year:'~前528',body:'四圣谛、八正道、缘起无我——影响半个亚洲的宗教哲学。'},{name:'耆那教集大成',year:'~前527',body:'大雄的极端非暴力(ahimsa)，印度最古老的活宗教之一。'},{name:'第一次结集',year:'~前483',body:'阿难诵经、摩诃迦叶主持，佛典口传体系成形。'},{name:'沙门思潮',year:'前6世纪',body:'反婆罗门祭祀垄断的自由思想运动。'}],
    collapse_chain:['前4世纪 · 难陀王朝兴衰','前321 · 旃陀罗笈多取代难陀，建孔雀王朝','→ 摩揭陀核心并入孔雀帝国']},
  maurya:{pronunciation:'孔雀王朝 · Maurya Empire',capital_at_peak:'华氏城 (Pataliputra)',territory_max:'印度次大陆大部',population_peak:'约 3000–5000 万',language:'俗语 + 梵语',writing:'婆罗米文 + 佉卢文',religion:'佛教(阿育王后) + 多元',economy:'《政事论》国家管制经济 + 商路',
    opening_narrative:`**旃陀罗笈多**在谋臣**考底利耶**(《政事论》——印度版《君主论》)辅佐下，统一印度次大陆大部，并与塞琉古联姻通好。\n\n其孙**阿育王**在惨烈的羯陵伽之战后皈依佛教，"放下屠刀"，立石柱法敕、派传教团远至希腊化世界与斯里兰卡——使佛教从地方信仰变为**世界性宗教**。`,
    nine_inventions:[{name:'统一印度次大陆',year:'~前320',body:'旃陀罗笈多建立印度史上第一个大帝国。'},{name:'《政事论》',year:'~前300',body:'考底利耶的治国与权谋经典，现实主义政治学。'},{name:'阿育王法敕',year:'~前260',body:'石柱/摩崖法敕，"以法(Dharma)治国"，最早的德治宣言。'},{name:'佛教世界化',year:'~前250',body:'派传教团至斯里兰卡、希腊化诸国，佛教走向世界。'},{name:'龙树中观哲学',year:'~150 CE',body:'后世大乘"诸法皆空"，奠定大乘理论。'}],
    collapse_chain:['前232 · 阿育王去世后帝国衰落','前185 · 末王被将领巽伽所弑','→ 印度重归列国分立']},
  greece_classical:{pronunciation:'古典希腊 · Classical Greece',capital_at_peak:'雅典 / 斯巴达',territory_max:'希腊城邦 + 爱琴海',population_peak:'—',language:'古希腊语',writing:'希腊字母',religion:'奥林匹斯多神教',economy:'海洋贸易 + 奴隶制 + 城邦经济',
    opening_narrative:`雅典**克莱斯提尼**建立民主制(前508)，**伯里克利**时代达到黄金顶峰：帕特农神庙、悲剧、哲学。**苏格拉底→柏拉图→亚里士多德**三代师承，奠定整个西方哲学。\n\n希波战争(马拉松、温泉关、萨拉米斯)中希腊以弱胜强。但雅典与斯巴达的**伯罗奔尼撒战争**(前431–404)两败俱伤，古典希腊由盛转衰。`,
    nine_inventions:[{name:'雅典民主制',year:'前508',body:'克莱斯提尼建公民直接参政，西方民主的源头。'},{name:'哲学三代',year:'前470–322',body:'苏格拉底(诘问法)→柏拉图(理念论/理想国)→亚里士多德(逻辑学)。'},{name:'希腊悲剧',year:'前5世纪',body:'埃斯库罗斯/索福克勒斯/欧里庇得斯，西方戏剧的源头。'},{name:'历史学诞生',year:'~前440',body:'希罗多德《历史》、修昔底德批判性史学。'},{name:'形式逻辑',year:'~前350',body:'亚里士多德三段论，西方科学推理的基石。'}],
    collapse_chain:['前431–404 · 伯罗奔尼撒战争，雅典战败','前4世纪 · 城邦内斗不止','前338 · 喀罗尼亚战役败于马其顿腓力二世','→ 希腊城邦自由终结，进入马其顿/希腊化时代']},
  macedon:{pronunciation:'马其顿 · 亚历山大 · Macedon',capital_at_peak:'佩拉 / 巴比伦',territory_max:'希腊到印度河 (古代最大之一)',population_peak:'—',language:'希腊语',writing:'希腊字母',religion:'希腊多神教',economy:'征服掠夺 + 希腊化城市',
    opening_narrative:`**腓力二世**以**马其顿方阵**(5.5米长矛)征服全希腊。其子**亚历山大大帝**(亚里士多德的学生)十三年间灭波斯、入埃及、直抵印度河，建立古代最大帝国之一。\n\n他在征途上建立数十座"亚历山大里亚"城，把希腊文化播向东方，开启了**希腊化时代**。32岁病逝于巴比伦，帝国被部将瓜分。`,
    nine_inventions:[{name:'马其顿方阵',year:'~前358',body:'腓力二世的长矛密集阵，几乎无法正面突破。'},{name:'灭亡波斯帝国',year:'前331',body:'高加米拉决战，终结二百年波斯帝国。'},{name:'希腊化的开端',year:'前334–323',body:'东征把希腊语言、艺术、城市带到中东与中亚。'},{name:'亚历山大里亚城',year:'前331',body:'埃及的亚历山大里亚成为后世地中海学术中心。'}],
    collapse_chain:['前323 · 亚历山大32岁病逝巴比伦','前323起 · "继业者战争"瓜分帝国','→ 托勒密/塞琉古/安提柯三大王朝，进入希腊化世界']},
  hellenistic:{pronunciation:'希腊化世界 · Hellenistic World',capital_at_peak:'亚历山大里亚 / 安条克',territory_max:'地中海东部到中亚',population_peak:'—',language:'通用希腊语(Koine)',writing:'希腊字母',religion:'希腊多神 + 东方融合 + 神秘宗教',economy:'国际贸易 + 大都市 + 学术机构',
    opening_narrative:`亚历山大死后帝国三分：**托勒密**(埃及)、**塞琉古**(波斯-中东)、安提柯(马其顿)。希腊文化与东方深度融合，**亚历山大里亚图书馆**成为古代最大学术中心。\n\n科学达到古代巅峰：**阿基米德**、欧几里得、埃拉托色尼；哲学上斯多葛与伊壁鸠鲁兴起。这些王国最终被罗马逐一吞并，前30年埃及最后陷落。`,
    nine_inventions:[{name:'亚历山大里亚图书馆',year:'~前290',body:'藏书数十万卷，古代世界的学术中枢。'},{name:'古代科学巅峰',year:'前3世纪',body:'阿基米德(浮力/杠杆)、欧几里得(几何)、埃拉托色尼(测地球周长)。'},{name:'斯多葛/伊壁鸠鲁哲学',year:'~前300',body:'关注个人如何在大世界中获得心灵安宁，影响罗马。'},{name:'通用希腊语(Koine)',year:'—',body:'东地中海的国际语言，后来成为新约圣经的语言。'}],
    collapse_chain:['前2世纪 · 罗马东扩，逐一吞并希腊化王国','前168 · 马其顿亡于罗马','前64 · 塞琉古亡','前30 · 克利奥帕特拉自杀，托勒密埃及并入罗马']},
  roman_republic:{pronunciation:'罗马共和国 · Roman Republic',capital_at_peak:'罗马',territory_max:'地中海全域',population_peak:'—',language:'拉丁语 + 希腊语',writing:'拉丁字母',religion:'罗马多神教',economy:'农业 + 奴隶制 + 行省税收 + 地中海贸易',
    opening_narrative:`罗马人驱逐国王、建立共和国，以**元老院 + 执政官 + 保民官**分权制衡，平民历经两百年争取到权利。**布匿战争**中西庇阿在扎马击败汉尼拔，罗马称霸地中海。\n\n但扩张带来贫富剧烈分化：格拉古兄弟改革被血腥镇压，马略与苏拉内战，最终**恺撒**跨过卢比孔河、被布鲁图斯等人刺杀——共和国走向终结。`,
    nine_inventions:[{name:'共和制度',year:'前509',body:'元老院/执政官/保民官分权，影响近代宪政设计。'},{name:'罗马法雏形',year:'~前450',body:'《十二铜表法》——成文法公开，公民法的起点。'},{name:'布匿战争称霸',year:'前264–146',body:'三次战胜迦太基，西庇阿扎马破汉尼拔，独霸地中海。'},{name:'公民兵→职业军',year:'~前107',body:'马略军改，军队职业化(也埋下军阀内战祸根)。'}],
    collapse_chain:['前133 · 格拉古改革引发暴力政治','前1世纪 · 马略-苏拉、恺撒-庞培内战不断','前44 · 恺撒遇刺','前31 · 屋大维亚克兴海战胜安东尼','前27 · 屋大维受封"奥古斯都"，共和国变帝国']},
  roman_empire:{pronunciation:'罗马帝国 · Roman Empire',capital_at_peak:'罗马 → 君士坦丁堡',territory_max:'约 500 万 km²',population_peak:'约 7000 万',language:'拉丁语 + 希腊语',writing:'拉丁字母',religion:'多神教 → 基督教(4世纪)',economy:'地中海贸易 + 行省税 + 大道网',
    opening_narrative:`屋大维(**奥古斯都**)建立元首制，开启约两百年的"**罗马和平**"(Pax Romana)。**五贤帝**时代疆域最大、最繁荣——图拉真、哈德良长城、哲学家皇帝**马可·奥勒留**。\n\n罗马法、混凝土工程、引水渠、拉丁文学影响深远。但**三世纪危机**(五十年约五十帝)后，戴克里先四帝共治、君士坦丁改革并迁都，公元395年帝国东西分裂。`,
    nine_inventions:[{name:'元首制·罗马和平',year:'前27',body:'奥古斯都设计的帝制，带来约200年和平繁荣。'},{name:'罗马法体系',year:'1–3世纪',body:'万民法、法理学——大陆法系的源头。'},{name:'工程奇迹',year:'1–2世纪',body:'万神殿、斗兽场、引水渠、罗马大道("条条大路通罗马")。'},{name:'公民权普及',year:'212',body:'卡拉卡拉敕令赋予全帝国自由民公民权。'},{name:'基督教国教化',year:'380',body:'从受迫害到成为帝国国教，重塑西方文明。'}],
    collapse_chain:['235–284 · 三世纪危机，约50年50帝','284 · 戴克里先四帝共治','330 · 君士坦丁迁都君士坦丁堡','395 · 帝国正式东西分裂','476 · 西罗马灭亡(东罗马延续至1453)']},
  christianity:{pronunciation:'基督教兴起 · Rise of Christianity',capital_at_peak:'耶路撒冷 → 罗马',territory_max:'罗马帝国全域',population_peak:'—',language:'阿拉米语 + 通用希腊语',writing:'希腊文(新约)',religion:'基督教(一神)',economy:'依附罗马城市与会堂网络',
    opening_narrative:`**耶稣**在罗马治下的犹太行省传道——登山宝训、爱人如己——被钉十字架。门徒**保罗**将信仰传向外邦、写下书信，提出"**因信称义**"。\n\n在罗马和平、通用希腊语、犹太会堂网络与平等主义的条件下，基督教迅速传播。历经三百年间歇迫害，313年君士坦丁《**米兰敕令**》宽容，325年尼西亚会议定三位一体，终成罗马国教。`,
    nine_inventions:[{name:'登山宝训·爱的伦理',year:'~30',body:'耶稣的道德教导，影响西方伦理两千年。'},{name:'因信称义',year:'~50',body:'保罗神学：靠信仰而非律法得救，与犹太教分野。'},{name:'新约圣经',year:'1世纪',body:'用通用希腊语写成，得以在地中海广泛传播。'},{name:'《米兰敕令》',year:'313',body:'君士坦丁宣布宗教自由，结束三百年迫害。'},{name:'三位一体教义',year:'325',body:'尼西亚大公会议确立正统，奠定基督教神学。'}],
    collapse_chain:['(基督教并未"崩溃"，而是延续) ','64 · 尼禄迫害(彼得保罗殉道)','303 · 戴克里先大迫害','313 · 米兰敕令转折','380 · 成为罗马国教 → 中世纪欧洲精神支柱']},
};

// ───────── 2. 关键事件深度 (核心事件) ─────────
const EVENT_DEEP = {
  evt_confucius:{full_title:'孔子周游列国',one_liner:'前497–484年，孔子率弟子周游十四年推行仁政，虽不得用，却奠定儒家。',narrative:'孔子在鲁国政治失意后，带着弟子周游卫、宋、陈、蔡等国十四年，希望找到愿意推行"仁政""德治"的君主。一路困于陈蔡、险些饿死，却始终不改其志。最终返鲁，专心整理《诗》《书》《礼》《易》《春秋》、教授弟子三千。他生前是个"失败的求职者"，身后却成为influence东亚两千年的"至圣先师"。',context_before:'春秋末年礼崩乐坏，孔子主张恢复周礼、以仁德治国。',what_happened:['前497 · 离鲁适卫，开始周游','前489 · 困于陈蔡之间，绝粮','前484 · 返回鲁国，专心教学与整理典籍','前479 · 孔子去世，弟子守丧'],significance:'儒家思想成形，"仁""礼""有教无类"影响中国/东亚两千余年，孔子被尊为万世师表。',evidence:[{artifact:'《论语》',what:'孔子弟子记录的言行集，儒家第一经典。',held:'传世文献'}],leads_to:'孔门弟子→孟子荀子→汉代独尊儒术→东亚儒家文化圈',source:'《论语》《史记·孔子世家》',related_people:['kongzi']},
  evt_hundred_schools:{full_title:'百家争鸣',one_liner:'战国时期儒墨道法名纵横诸子并起，中国思想史最自由的时代。',narrative:'战国乱世，旧秩序崩塌、新秩序未立，各国争相招贤养士。于是出现了人类思想史上罕见的盛况："百家争鸣"——儒家(孟子/荀子)讲仁义礼法，墨家(墨子)讲兼爱非攻，道家(庄子)讲逍遥齐物，法家(韩非)讲法术势，名家辩名实，纵横家(苏秦张仪)纵横捭阖。各家互相辩难、彼此吸收，奠定了此后两千年中国思想的基本格局。',context_before:'周王室名存实亡，士阶层崛起，"养士"之风盛行。',what_happened:['儒家：孟子性善民本、荀子性恶礼法','道家：庄子逍遥、齐物、相对','墨家：兼爱、非攻、尚贤、节用','法家：商鞅(法)申不害(术)韩非(集大成)','名家/纵横家：白马非马 / 合纵连横'],significance:'中国思想的"轴心突破"，确立了儒道法墨等基本思想范式，深刻塑造中华文明。',evidence:[{artifact:'《孟子》《庄子》《墨子》《韩非子》',what:'诸子典籍传世。',held:'传世文献'}],leads_to:'秦用法家统一→汉武独尊儒术→儒道互补的中国思想结构',source:'《史记》《汉书·艺文志》',related_people:['mencius','zhuangzi','mozi','xunzi','hanfeizi']},
  evt_qin_unify:{full_title:'秦统一六国',one_liner:'前230–221年，秦王嬴政十年灭六国，建立中国第一个中央集权帝国。',narrative:'秦凭借商鞅变法积累的国力与制度优势，自前230年起，用十年时间依次灭韩、赵、魏、楚、燕、齐。前221年，嬴政完成统一，自认"功过三皇五帝"，创"皇帝"称号，是为秦始皇。随即推行书同文、车同轨、统一度量衡货币，废分封、行郡县，把一个分裂数百年的天下，铸成一个中央集权的帝国。',context_before:'战国七雄兼并，秦经商鞅变法后最强。',what_happened:['前230 · 灭韩','前228–222 · 灭赵魏楚燕','前221 · 灭齐，统一完成','前221 · 称"始皇帝"，行郡县、书同文'],significance:'中国第一个统一的中央集权帝国，确立的帝制与郡县制延续两千年。',evidence:[{artifact:'秦始皇陵兵马俑',what:'1974年发现，逾八千陶俑，秦帝国军事与工艺的实证。',held:'陕西西安'},{artifact:'里耶秦简',what:'秦代郡县行政文书，印证郡县制运作。',held:'湖南里耶'}],leads_to:'秦制→汉承秦制→两千年中华帝制',source:'《史记·秦始皇本纪》',related_people:['qin_shihuang','lisi']},
  evt_duzun_ruxue:{full_title:'独尊儒术',one_liner:'约前134年，汉武帝采董仲舒议"罢黜百家、独尊儒术"，儒家成国家正统。',narrative:'汉初奉行黄老"无为"。到汉武帝时，国力强盛、需要统一思想以巩固集权。大儒董仲舒提出"罢黜百家，独尊儒术"，并将儒家与阴阳五行结合，提出"天人感应""君权神授"。汉武帝采纳，设五经博士、立太学。从此儒家成为中国两千年的官方意识形态与选官标准。',context_before:'汉初黄老无为，诸侯与豪强坐大，需思想统一。',what_happened:['董仲舒对策："罢黜百家，独尊儒术"','设五经博士、立太学培养官员','儒学与阴阳五行结合，"天人感应"'],significance:'儒家从诸子之一上升为国家正统，奠定此后两千年中国政治文化的底色。',evidence:[{artifact:'《春秋繁露》',what:'董仲舒著作，天人感应思想的核心文本。',held:'传世文献'}],leads_to:'太学→察举→科举→儒家士大夫治国传统',source:'《汉书·董仲舒传》',related_people:['dongzhongshu','wudi_han']},
  evt_zhangqian:{full_title:'张骞通西域 · 丝绸之路',one_liner:'前138/119年，张骞两次出使西域，开通连接东西方的丝绸之路。',narrative:'汉武帝为联合大月氏夹击匈奴，派张骞出使西域。张骞被匈奴扣留十年仍持节不失，辗转抵达大月氏、大宛。虽未达成军事联盟，却第一次为中国带回西域的详细信息("凿空")。此后汉朝商队与使节络绎西行，丝绸、漆器东出，葡萄、苜蓿、佛教西来——欧亚大陆东西两端首次大规模连接。',context_before:'汉武帝反击匈奴，欲联络西域。',what_happened:['前138 · 张骞首次出使，被匈奴扣10年','前126 · 历经磨难返汉，带回西域情报','前119 · 第二次出使，使团遍访西域诸国','此后 · 丝路商贸与文化交流繁盛'],significance:'丝绸之路开通，欧亚文明大动脉形成，影响此后一千多年的东西交流。',evidence:[{artifact:'《史记·大宛列传》',what:'记录张骞西使见闻，"凿空"一词出处。',held:'传世文献'}],leads_to:'丝路贸易→佛教东传→中西物种与技术交流',source:'《史记·大宛列传》',related_people:['zhangqian','wudi_han']},
  evt_buddha:{full_title:'佛陀菩提树下开悟',one_liner:'约前528年，悉达多在菩提树下悟道成佛，创立佛教。',narrative:'迦毗罗卫国王子悉达多·乔达摩，因"四门出游"目睹老、病、死与修行者，舍弃王位出家。历经六年极端苦行无果后，他在菩提伽耶的菩提树下静坐冥想，最终大彻大悟，明了"苦的起源与熄灭"——四圣谛、八正道、缘起无我。此后他被尊为"佛陀"(觉者)，弘法四十五年，建立僧团。',context_before:'古印度婆罗门祭祀垄断，沙门思潮兴起追问解脱。',what_happened:['四门出游，目睹生老病死','出家修苦行六年无果','菩提树下悟道：四圣谛、八正道','初转法轮(鹿野苑)，建立僧团弘法45年'],significance:'佛教诞生，成为影响半个亚洲的宗教与哲学体系。',evidence:[{artifact:'菩提伽耶大塔',what:'佛陀悟道处，佛教第一圣地。',held:'印度比哈尔邦'},{artifact:'阿育王石柱',what:'标记佛陀生平圣地，最早的实物佐证。',held:'印度'}],leads_to:'佛教→阿育王世界化→经丝路传入中国/东亚',source:'巴利三藏；《佛本行集经》',related_people:['buddha','ananda','mahakassapa']},
  evt_ashoka:{full_title:'阿育王皈依佛教 · 弘法',one_liner:'约前260年，阿育王在羯陵伽血战后皈依佛教，立法敕、派传教团。',narrative:'孔雀王朝阿育王在征服羯陵伽的战争中目睹尸横遍野(死伤数十万)，深感悔恨，转而皈依佛教，奉行"以法(Dharma)治国"。他在帝国各地竖立石柱与摩崖法敕，倡导不杀生、宽容、行善，并派遣传教团远至斯里兰卡、希腊化诸国——使佛教第一次从地方信仰变为世界性宗教。',context_before:'旃陀罗笈多建孔雀帝国，阿育王扩张至羯陵伽。',what_happened:['约前261 · 羯陵伽之战，死伤惨重','战后悔悟，皈依佛教','立石柱/摩崖法敕，"以法治国"','派传教团至斯里兰卡、希腊化世界'],significance:'佛教世界化的关键推手；"以法治国"是最早的仁政/德治宣言之一。',evidence:[{artifact:'阿育王石柱',what:'狮子柱头(今印度国徽)，法敕铭文遍布次大陆。',held:'印度鹿野苑等'}],leads_to:'佛教传斯里兰卡/东南亚/中亚→丝路东传中国',source:'阿育王法敕铭文；《阿育王传》',related_people:['ashoka','chandragupta']},
  evt_marathon:{full_title:'希波战争 · 马拉松与萨拉米斯',one_liner:'前490/480年，希腊城邦以弱胜强击退波斯两次入侵，保住西方文明火种。',narrative:'波斯帝国两次大举入侵希腊。前490年马拉松战役，雅典重装步兵以两翼包围战术大败波斯——传令兵跑回雅典报捷后力竭而死("马拉松"由此而来)。前480年，斯巴达王列奥尼达率三百勇士在温泉关死战殿后；随后地米斯托克利在萨拉米斯狭窄海道以少胜多，全歼波斯舰队。希腊的胜利保住了刚刚萌芽的民主与哲学。',context_before:'波斯帝国扩张，欲征服爱琴海希腊城邦。',what_happened:['前490 · 马拉松战役，雅典大胜','前480 · 温泉关，列奥尼达三百壮士殉国','前480 · 萨拉米斯海战，希腊海军全歼波斯舰队','前479 · 普拉提亚战役，波斯陆军败退'],significance:'希腊文明得以延续并迎来黄金时代；"东西方对抗"的历史叙事由此发端。',evidence:[{artifact:'希罗多德《历史》',what:'记录希波战争，西方史学奠基之作。',held:'传世文献'}],leads_to:'雅典黄金时代→伯里克利→哲学三代',source:'希罗多德《历史》',related_people:['miltiades','leonidas','themistocles','darius1','xerxes']},
  evt_alexander:{full_title:'亚历山大东征',one_liner:'前334–323年，亚历山大十三年征服波斯到印度河，开启希腊化时代。',narrative:'马其顿王亚历山大率军东征，在格拉尼库斯、伊苏斯、高加米拉三次决战中击溃波斯大军，灭亡阿契美尼德帝国；又入埃及(被尊为法老)、东进直抵印度河，因士兵思乡才止步。他建立数十座"亚历山大里亚"城，把希腊语言、艺术、城市制度播撒到中东与中亚。32岁时病逝于巴比伦，留下一个无人能继承的庞大帝国。',context_before:'腓力二世统一希腊后遇刺，亚历山大继位。',what_happened:['前334 · 渡海东征，格拉尼库斯战役','前333 · 伊苏斯战役败大流士三世','前331 · 高加米拉决战，灭波斯','前327 · 进抵印度河，士兵拒进而东返','前323 · 病逝巴比伦，年32'],significance:'希腊化时代开端——东西方文化空前融合，影响地中海与亚洲数百年。',evidence:[{artifact:'亚历山大马赛克',what:'庞贝出土，描绘伊苏斯战役。',held:'那不勒斯国家考古博物馆'}],leads_to:'希腊化三大王朝→犍陀罗艺术→希腊文化东渐',source:'阿里安《亚历山大远征记》',related_people:['alexander','philip2','darius3']},
  evt_punic:{full_title:'布匿战争',one_liner:'前264–146年，罗马三次战胜迦太基，称霸地中海。',narrative:'罗马与北非强国迦太基为争夺地中海霸权，进行了三次"布匿战争"。第二次最惊心动魄：迦太基名将**汉尼拔**翻越阿尔卑斯山奇袭意大利，在坎尼战役以少胜多歼灭七万罗马军；但罗马坚韧不屈，**西庇阿**最终在北非扎马战役击败汉尼拔。第三次战争中罗马彻底摧毁迦太基城。从此罗马成为地中海无可争议的霸主。',context_before:'罗马统一意大利后与迦太基争夺西西里。',what_happened:['前264–241 · 第一次布匿战争，罗马夺西西里','前218 · 汉尼拔翻越阿尔卑斯入侵意大利','前216 · 坎尼战役，罗马惨败','前202 · 扎马战役，西庇阿败汉尼拔','前146 · 迦太基城被夷平'],significance:'罗马由地区强国跃升为地中海霸主，为帝国奠基。',evidence:[{artifact:'波利比乌斯《历史》',what:'记录布匿战争与罗马崛起。',held:'传世文献'}],leads_to:'罗马称霸→行省制→共和国扩张危机',source:'波利比乌斯/李维',related_people:['hannibal','scipio']},
  evt_caesar:{full_title:'恺撒跨过卢比孔河',one_liner:'前49年，恺撒率军渡卢比孔河，引爆内战，终结罗马共和国。',narrative:'恺撒征服高卢、声望大涨，元老院与庞培忌惮，命他解散军队。前49年，恺撒说"骰子已掷下"，率军渡过意大利边界卢比孔河——这是公然违法的宣战之举。他击败庞培、成为终身独裁官，推行历法(儒略历)与改革。前44年3月15日，他在元老院被布鲁图斯等23人刺杀("你也有份吗，布鲁图？")。共和国的崩溃已不可逆。',context_before:'前三头瓦解，恺撒与庞培决裂。',what_happened:['前58–50 · 高卢战争，恺撒征服高卢','前49 · 渡卢比孔河，内战爆发','前48 · 法萨卢斯击败庞培','前44 · 三月十五被刺杀'],significance:'共和国名存实亡，为屋大维建立帝制铺路；"跨过卢比孔"成为不可逆抉择的代名词。',evidence:[{artifact:'恺撒《高卢战记》',what:'恺撒亲撰战记，拉丁散文典范。',held:'传世文献'}],leads_to:'屋大维→元首制→罗马帝国',source:'《高卢战记》；苏维托尼乌斯',related_people:['caesar','pompey','brutus','octavian']},
  evt_pax_romana:{full_title:'奥古斯都 · 罗马和平',one_liner:'前27年，屋大维建元首制，开启约两百年的"罗马和平"。',narrative:'恺撒养子屋大维在亚克兴海战击败安东尼与克利奥帕特拉后，结束了百年内战。前27年元老院授予他"奥古斯都"(神圣的)尊号。他精明地保留共和国的外壳(自称"第一公民")，实则集军政大权于一身，建立"元首制"。此后约两百年(至前180年)，地中海世界享受了相对的和平与繁荣——"罗马和平"(Pax Romana)。',context_before:'恺撒遇刺后，屋大维与安东尼争夺继承权。',what_happened:['前31 · 亚克兴海战胜安东尼','前27 · 受封"奥古斯都"，建元首制','整顿行省、军队、财政、道路','开启约200年罗马和平'],significance:'罗马从共和走向帝国，迎来鼎盛；元首制成为帝国政治模板。',evidence:[{artifact:'奥古斯都《功业录》',what:'奥古斯都自述功业的铭文。',held:'安卡拉等地'},{artifact:'第一门奥古斯都像',what:'梵蒂冈藏，帝国宣传艺术的代表。',held:'梵蒂冈博物馆'}],leads_to:'五贤帝→帝国鼎盛→三世纪危机',source:'《功业录》；塔西佗',related_people:['octavian','mark_antony','cleopatra']},
  evt_milan:{full_title:'《米兰敕令》· 基督教合法化',one_liner:'313年，君士坦丁颁布《米兰敕令》，结束对基督教三百年的迫害。',narrative:'基督教兴起后三百年间，屡遭罗马帝国迫害(尼禄、戴克里先大迫害)。312年，君士坦丁在米尔维安大桥战役前据说见"十字架异象"得胜。313年，他与李锡尼联合颁布《米兰敕令》，宣布宗教信仰自由、归还教会财产。325年他又召开尼西亚大公会议确立三位一体。基督教从受迫害的边缘信仰，走向罗马帝国的中心，并在380年成为国教。',context_before:'戴克里先303年发动对基督徒的最大迫害。',what_happened:['303 · 戴克里先大迫害','312 · 米尔维安大桥战役，君士坦丁获胜','313 · 《米兰敕令》宗教自由','325 · 尼西亚会议定三位一体','380 · 基督教成为罗马国教'],significance:'基督教合法化并国教化，决定了此后欧洲一千多年的精神格局。',evidence:[{artifact:'君士坦丁凯旋门',what:'罗马，纪念米尔维安大桥之胜。',held:'意大利罗马'}],leads_to:'基督教国教化→中世纪基督教欧洲',source:'拉克坦提乌斯；优西比乌',related_people:['constantine','jesus','paul_apos']},
};

// ───────── 3. 遗址地图坐标 ─────────
const CIV_MAP = {
  chunqiu:[{name:'曲阜(鲁·孔子故里)',coords:[35.596,116.991],note:'孔子故乡与讲学地，孔庙孔林所在。'},{name:'临淄(齐都)',coords:[36.846,118.309],note:'齐国都城，管仲改革、稷下学宫所在。'}],
  zhanguo:[{name:'咸阳(秦)',coords:[34.333,108.709],note:'商鞅变法后的秦都。'},{name:'稷下学宫(临淄)',coords:[36.846,118.309],note:'战国百家争鸣的学术中心。'},{name:'邯郸(赵)',coords:[36.625,114.539],note:'赵国都城，"胡服骑射"。'}],
  qin:[{name:'咸阳(秦都)',coords:[34.333,108.709],note:'秦帝国首都。'},{name:'秦始皇陵·兵马俑',coords:[34.384,109.279],note:'骊山陵与兵马俑坑，世界遗产。'},{name:'长城(临洮—辽东)',coords:[40.677,117.232],note:'连接战国长城以御匈奴。'}],
  xihan:[{name:'长安(西汉都)',coords:[34.331,108.879],note:'汉长安城，丝路东端起点。'},{name:'河西走廊',coords:[39.0,99.0],note:'张骞通西域、汉军逐匈奴的通道。'}],
  donghan:[{name:'洛阳(东汉都)',coords:[34.631,112.454],note:'东汉首都，白马寺佛教东传起点。'},{name:'敦煌',coords:[40.142,94.662],note:'丝路重镇，东西文化交汇。'}],
  achaemenid:[{name:'波斯波利斯',coords:[29.935,52.891],note:'大流士所建礼仪都城，被亚历山大焚毁。'},{name:'苏萨',coords:[32.189,48.258],note:'波斯行政首都，王道终点。'},{name:'帕萨尔加德',coords:[30.206,53.179],note:'居鲁士大帝陵所在。'}],
  magadha:[{name:'菩提伽耶',coords:[24.696,84.991],note:'佛陀悟道处，佛教第一圣地。'},{name:'王舍城(摩揭陀旧都)',coords:[25.030,85.420],note:'频婆娑罗王都，竹林精舍。'},{name:'鹿野苑',coords:[25.381,83.024],note:'佛陀初转法轮处。'}],
  maurya:[{name:'华氏城(Pataliputra)',coords:[25.611,85.144],note:'孔雀帝国首都(今巴特那)。'},{name:'桑奇大塔',coords:[23.479,77.739],note:'阿育王所建佛塔，佛教艺术瑰宝。'},{name:'鹿野苑阿育王柱',coords:[25.381,83.024],note:'狮子柱头成为印度国徽。'}],
  greece_classical:[{name:'雅典·卫城',coords:[37.971,23.726],note:'帕特农神庙，民主与哲学的中心。'},{name:'斯巴达',coords:[37.075,22.430],note:'尚武城邦，温泉关三百勇士的祖国。'},{name:'德尔斐',coords:[38.482,22.501],note:'阿波罗神谕，泛希腊圣地。'}],
  macedon:[{name:'佩拉(马其顿都)',coords:[40.760,22.520],note:'亚历山大的出生地与王都。'},{name:'高加米拉战场',coords:[36.36,43.25],note:'前331年灭波斯的决战地(今伊拉克)。'},{name:'巴比伦',coords:[32.542,44.421],note:'亚历山大病逝处。'}],
  hellenistic:[{name:'亚历山大里亚',coords:[31.200,29.918],note:'托勒密王朝都城，大图书馆与灯塔所在。'},{name:'安条克',coords:[36.202,36.160],note:'塞琉古王朝西部都城。'},{name:'帕加马',coords:[39.132,27.184],note:'希腊化文化与医学中心。'}],
  roman_republic:[{name:'罗马·广场',coords:[41.892,12.485],note:'共和国政治心脏，元老院所在。'},{name:'迦太基',coords:[36.852,10.323],note:'布匿战争的对手，前146年被夷平。'},{name:'扎马战场',coords:[36.0,9.5],note:'前202年西庇阿败汉尼拔(今突尼斯)。'}],
  roman_empire:[{name:'罗马·斗兽场',coords:[41.890,12.492],note:'弗拉维圆形剧场，帝国象征。'},{name:'君士坦丁堡',coords:[41.008,28.978],note:'君士坦丁330年新都，东罗马中心。'},{name:'哈德良长城',coords:[55.024,-2.291],note:'帝国不列颠北疆防线。'}],
  christianity:[{name:'耶路撒冷',coords:[31.778,35.235],note:'耶稣传道、受难、复活之地。'},{name:'罗马·圣彼得',coords:[41.902,12.454],note:'彼得殉道处，后建圣彼得大教堂。'},{name:'尼西亚',coords:[40.430,29.720],note:'325年大公会议，确立三位一体。'}],
};

// ───────── 4. 常见误解 (反幻觉) ─────────
const CIV_MYTHS = {
  qin:[{myth:'"秦始皇焚书坑儒烧光了所有书"',truth:'焚的主要是民间私藏的《诗》《书》和六国史书，医药卜筮农书及官方藏书保留；"坑儒"实为坑术士约四百余人。',why:'后世儒家叙事的强化与简化。'}],
  greece_classical:[{myth:'"雅典民主是全民民主"',truth:'只有成年男性公民有权，妇女、奴隶、外邦人(约占人口多数)被排除在外。',why:'用现代标准想象古代"民主"。'}],
  roman_empire:[{myth:'"罗马是被一次蛮族入侵灭亡的"',truth:'西罗马是经济、军事、政治长期衰退 + 多波日耳曼迁徙的累积结果；东罗马(拜占庭)还延续了近千年。',why:'"476年灭亡"被当成单一突发事件。'}],
  christianity:[{myth:'"君士坦丁把基督教定为国教"',truth:'君士坦丁313年只是"宽容"基督教；真正定为国教是380年狄奥多西的《萨洛尼卡敕令》。',why:'两件事常被混为一谈。'}],
  achaemenid:[{myth:'"波斯是希腊电影里的野蛮暴君帝国"',truth:'波斯以宽容多元著称，居鲁士圆柱被视为最早的人权宣言之一；"野蛮"形象多来自希腊单方叙事。',why:'胜利者(希腊)书写的历史。'}],
};
const SITE_MODERN = {};

// ───────── 5. 由人物数据自动生成 PERSON_DEEP ─────────
const PERSON_DEEP = {};
const ROLE_CN = {ruler:'统治者',general:'将领',thinker:'思想家',religious:'宗教人物',other:'其他人物'};
(typeof CLASSICAL_PEOPLE!=='undefined'?CLASSICAL_PEOPLE:[]).forEach(p=>{
  PERSON_DEEP[p.id]={
    full_name:p.n+' · '+p.e,
    pronunciation:p.e,
    lifespan_real:p.d,
    historical_or_mythic:'**'+(ROLE_CN[p.r]||'人物')+'**',
    biography:p.b,
    achievements_detail:[],
    legacy:'',
    sources:[],
    related:(p.rel||[]).map(r=>({id:r.i,relation:r.t,note:''})),
    _civ:p.c,_role:p.r
  };
});

// ───────── 6. 文明→人物 / 文明→事件 映射 (代表人物·关键事件) ─────────
const CIV_PEOPLE_NAMES = {
  chunqiu:['孔子','老子','管仲','齐桓公','孙武','越王勾践'],
  zhanguo:['孟子','庄子','墨子','荀子','韩非子','商鞅','苏秦','张仪'],
  qin:['秦始皇','李斯','赵高','项羽','刘邦'],
  xihan:['刘邦','汉武帝','董仲舒','卫青','霍去病','张骞','司马迁','韩信'],
  donghan:['班超'],
  achaemenid:['居鲁士大帝','大流士一世','薛西斯一世','琐罗亚斯德'],
  magadha:['悉达多（佛陀）','大雄（筏驮摩那）','阿难','摩诃迦叶','频婆娑罗王','阿阇世王'],
  maurya:['旃陀罗笈多','考底利耶','阿育王','龙树'],
  greece_classical:['苏格拉底','柏拉图','亚里士多德','伯里克利','列奥尼达一世','希罗多德'],
  macedon:['亚历山大大帝','腓力二世','大流士三世','第欧根尼'],
  hellenistic:['托勒密一世','塞琉古一世','阿基米德','伊壁鸠鲁','斯多葛芝诺'],
  roman_republic:['尤利乌斯·恺撒','西塞罗','庞培','汉尼拔','西庇阿','斯巴达克斯'],
  roman_empire:['奥古斯都','图拉真','哈德良','马可·奥勒留','塞内卡','尼禄'],
  christianity:['耶稣基督','保罗','彼得','君士坦丁一世','奥古斯丁'],
};
const CIV_EVENTS = {
  chunqiu:['evt_confucius'],
  zhanguo:['evt_hundred_schools'],
  qin:['evt_qin_unify'],
  xihan:['evt_duzun_ruxue','evt_zhangqian'],
  donghan:[],
  achaemenid:['evt_marathon'],
  magadha:['evt_buddha'],
  maurya:['evt_ashoka'],
  greece_classical:['evt_marathon'],
  macedon:['evt_alexander'],
  hellenistic:[],
  roman_republic:['evt_punic','evt_caesar'],
  roman_empire:['evt_pax_romana'],
  christianity:['evt_milan'],
};

// 名字→id 映射
const NAME2ID = {};
(typeof CLASSICAL_PEOPLE!=='undefined'?CLASSICAL_PEOPLE:[]).forEach(p=>{NAME2ID[p.n]=p.id;});
function namesToIds(names){return (names||[]).map(n=>NAME2ID[n]).filter(Boolean);}

// ───────── 7. 文明元信息 (名称/颜色/图标) + 对比矩阵 ─────────
const CIV_META = [
  {id:'chunqiu',name:'春秋',color:'#b07840',icon:'📜',start:-770,end:-476,lane:1},
  {id:'zhanguo',name:'战国',color:'#c89030',icon:'⚖️',start:-475,end:-221,lane:1},
  {id:'qin',name:'秦',color:'#a02020',icon:'🐉',start:-221,end:-206,lane:1},
  {id:'xihan',name:'西汉',color:'#c83838',icon:'🏯',start:-202,end:8,lane:1},
  {id:'donghan',name:'东汉',color:'#d06848',icon:'📃',start:25,end:220,lane:1},
  {id:'achaemenid',name:'阿契美尼德波斯',color:'#3a8868',icon:'🔥',start:-550,end:-330,lane:2},
  {id:'magadha',name:'摩揭陀·佛陀',color:'#8957e5',icon:'☸',start:-600,end:-321,lane:3},
  {id:'maurya',name:'孔雀王朝',color:'#a878e0',icon:'🦁',start:-321,end:-185,lane:3},
  {id:'greece_classical',name:'古典希腊',color:'#2080b8',icon:'🏛',start:-508,end:-338,lane:4},
  {id:'macedon',name:'马其顿·亚历山大',color:'#1f6feb',icon:'⚔️',start:-359,end:-323,lane:4},
  {id:'hellenistic',name:'希腊化世界',color:'#4aa6d8',icon:'🏺',start:-323,end:-30,lane:4},
  {id:'roman_republic',name:'罗马共和国',color:'#b05028',icon:'🦅',start:-509,end:-27,lane:5},
  {id:'roman_empire',name:'罗马帝国',color:'#da3633',icon:'👑',start:-27,end:395,lane:5},
  {id:'christianity',name:'基督教兴起',color:'#d0a040',icon:'✝️',start:30,end:400,lane:5},
];
// 给每个文明深度条目写入"自己的"年代 (深度页副标题优先用 time_range)
function _yr(y){return y<0?'前 '+(-y):(y===0?'公元元年':'公元 '+y);}
CIV_META.forEach(c=>{ if(CIV_DEEP[c.id]) CIV_DEEP[c.id].time_range = _yr(c.start)+' – '+_yr(c.end); });

const EARLY_CIV_EXPLORER = {
  civilizations: CIV_META.map(c=>({...c})),
  comparison_dimensions: [
    {id:'era',name:'⏳ 年代',values:{achaemenid:'前550–330',greece_classical:'前508–338',magadha:'前600–321',roman_republic:'前509–前27',qin:'前221–206',xihan:'前202–公元8',roman_empire:'前27–公元395'}},
    {id:'gov',name:'👑 政体',values:{achaemenid:'宽容帝国·行省制',greece_classical:'城邦民主/寡头',magadha:'君主国(列国)',qin:'中央集权·郡县',xihan:'郡国并行·儒法',roman_republic:'共和·元老院',roman_empire:'元首制帝国'}},
    {id:'thought',name:'🧠 核心思想',values:{achaemenid:'琐罗亚斯德·善恶二元',greece_classical:'希腊哲学·理性',magadha:'佛教·缘起无我',qin:'法家·法术势',xihan:'独尊儒术',roman_republic:'罗马法·共和德性',roman_empire:'斯多葛+后期基督教'}},
    {id:'legacy',name:'🌍 留给今天',values:{achaemenid:'行省制·宗教二元论',greece_classical:'民主·哲学·逻辑·戏剧',magadha:'佛教·非暴力',qin:'大一统·郡县·书同文',xihan:'儒家正统·丝路·史记',roman_republic:'共和分权·成文法',roman_empire:'罗马法·拉丁语·基督教'}},
  ],
};

// ───────── 8. 章节 (供深度页聚合人物/事件) + 总览 ─────────
const CHAPTERS = [{
  id:'classical', no:'02', range:'前 600 – 公元 400', title:'古典思想与帝国',
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
    {what:'儒家',from:'孔子(前551)',why:'仁礼君子，东亚两千年伦理与政治的底色'},
    {what:'佛教',from:'佛陀(前528)',why:'缘起无我、慈悲非暴力，影响半个亚洲'},
    {what:'希腊哲学与民主',from:'雅典(前508)',why:'理性、逻辑、民主——西方文明的源头'},
    {what:'大一统与郡县制',from:'秦(前221)',why:'书同文、中央集权，塑造中华两千年'},
    {what:'罗马法',from:'罗马(前450起)',why:'成文法、公民权，大陆法系的祖先'},
    {what:'基督教',from:'罗马帝国(1–4世纪)',why:'重塑欧洲精神世界与道德传统'},
    {what:'丝绸之路',from:'张骞(前130)',why:'欧亚大陆东西交流的大动脉'},
  ],
};

if (typeof module !== 'undefined') module.exports = { CIV_DEEP, EVENT_DEEP, PERSON_DEEP, CIV_MAP, CIV_MYTHS, CHAPTERS, FINAL_OVERVIEW, EARLY_CIV_EXPLORER };
