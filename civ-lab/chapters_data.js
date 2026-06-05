// ════════════════════════════════════════════════════════════════
// 5 章节按 500 年分段 · 早期文明 (前 3500 → 前 1000)
// 5 层深度：L1 一句话 → L2 此期状态 → L3 事件 → L4 人物 → L5 完整叙事
// ════════════════════════════════════════════════════════════════

const CHAPTERS = [
  {
    id: 'ch1',
    no: '01',
    range: '前 3500 – 前 3000',
    range_y: [-3500, -3000],
    title: '城市的黎明',
    subtitle: 'The Dawn of the City',
    hero_question: '为什么人类突然从分散的村庄，挤进了一座有 4 万人的城市？',
    hero_mood: '#5a7aff', // 黎明蓝
    mood_grad: 'linear-gradient(180deg, #2a3a6a 0%, #5a7aff 60%, #f0d488 100%)',
    icon: '🌅',
    one_line: '世界第一座超级城市 Uruk 诞生，文字、车轮、灌溉同步出现。',

    // 这一段时期出现/活跃的文明
    active_civs: [
      {
        id: 'sumer',
        state: '崛起', // 崛起 / 巅峰 / 衰落
        in_period_summary: '苏美尔人在两河流域南部聚集成 Uruk、Eridu、Ur 等城邦。Uruk 在前 3200 年人口达 4-5 万，是当时世界最大聚落（比同期任何地方大 10 倍）。',
        // 5 层（递进展开）
        L1: '"文明的发明者"——做了几乎所有"人类第一次"。',
        L2: `此期（前 3500-3000）苏美尔正在经历"城市化奇点"。一群临河村庄突然合并成 Uruk 这样的超大城。神庙变成经济中心，养着不种地的祭司、抄写员、工匠。这种"多余人口"催生了所有现代社会的基础设施。`,
        L3_events: ['evt_eridu_first', 'evt_uruk_period', 'evt_cuneiform_invented'],
        L4_people: [], // 此期还没有有名字的历史人物
        L5_full: 'CIV_DEEP.sumer', // 引用深度叙事
      },
      {
        id: 'egypt_predynastic',
        state: '萌芽→统一',
        in_period_summary: '尼罗河沿岸"前王朝"小聚落 (Naqada 文化) 到约前 3100 年 Narmer 统一上下埃及，开创第一王朝。',
        L1: '前王朝末期 → Narmer 统一上下埃及，开创法老 3000 年。',
        L2: `比苏美尔晚 300-500 年。这段时期上下埃及从分散小村，到前 3100 年 Narmer 击败下埃及完成统一。"那尔迈调色板"是这次统一的证据。法老王朝从此开始，延续到前 30 年 Cleopatra VII 死。`,
        L3_events: ['evt_egypt_unification'],
        L4_people: ['narmer'],
        L5_full: null,
      },
    ],

    // 时期关键事件 (按时间)
    key_events: ['evt_uruk_period', 'evt_cuneiform_invented'],
    key_people: [],

    // 这一期世界正在发生
    world_context: `这是新石器革命后约 7000 年。除了两河南部，世界其它地方都还是村庄农业（中国仰韶、欧洲彩陶、印度河前期、美洲游牧）。两河流域有个特殊条件：必须人工灌溉才能种地——这逼出了复杂社会组织。`,
  },

  {
    id: 'ch2',
    no: '02',
    range: '前 3000 – 前 2500',
    range_y: [-3000, -2500],
    title: '文字与王权',
    subtitle: 'Writing & Kingship',
    hero_question: '当人们学会写字，权力的形状如何彻底改变？',
    hero_mood: '#d4a858',
    mood_grad: 'linear-gradient(180deg, #4a3a2a 0%, #d4a858 70%, #f5e8c8 100%)',
    icon: '📜',
    one_line: '埃及金字塔时代开始，苏美尔王陵盛极一时，印度河早期城市出现。',

    active_civs: [
      {
        id: 'sumer',
        state: '巅峰',
        in_period_summary: 'Ur 第一王朝（约前 2600）出现"王陵"——女王 Puabi 带 52 个殉葬下葬。陪葬青金石来自阿富汗、红玉髓来自印度——苏美尔已建立跨大陆贸易网。',
        L1: '苏美尔进入"早王朝"，多城邦并立，王陵展示极致王权。',
        L2: `Ur、Lagash、Kish 等城邦各有国王。最有名的是 Uruk 第五王吉尔伽美什（真实历史人物 + 后世神化）。这一期诞生了世界第一部完整文学作品的雏形——《吉尔伽美什史诗》。`,
        L3_events: ['evt_royal_tombs_ur', 'evt_lagash_umma_war'],
        L4_people: ['gilgamesh', 'enkidu', 'puabi', 'eannatum'],
        L5_full: 'CIV_DEEP.sumer',
      },
      {
        id: 'egypt_old',
        state: '崛起→巅峰',
        in_period_summary: '前 2670 年 Djoser 阶梯金字塔（Imhotep 设计）。前 2560 年 Khufu 大金字塔（146 米高，3800 年世界最高）。古王国巅峰。',
        L1: '法老王朝建立，金字塔时代开启。',
        L2: `古王国 (Old Kingdom) 的核心是"法老 = 活神"概念。整个国家被组织起来为法老建造永恒的安息之所。Khufu 大金字塔用了 230 万块石头，每块平均 2.5 吨，工程持续 20 年，是人类工程史奇迹。Imhotep（医生+建筑师+宰相）是关键人物。`,
        L3_events: ['evt_great_pyramid', 'evt_giza_complex'],
        L4_people: ['djoser', 'imhotep', 'khufu', 'khafre'],
        L5_full: 'CIV_DEEP.egypt_old',
      },
      {
        id: 'indus_early',
        state: '萌芽',
        in_period_summary: '印度河流域开始出现规划过的早期城镇（Harappa 早期层位）。还没到巅峰。',
        L1: '印度河早期 Harappan 文化出现。',
        L2: '在今巴基斯坦旁遮普地区，开始出现有街道规划、排水系统的早期定居点。但成熟期要等到下一章。',
        L3_events: [],
        L4_people: [],
        L5_full: null,
      },
    ],

    key_events: ['evt_royal_tombs_ur'],
    key_people: ['gilgamesh', 'enkidu'],
    world_context: `两河流域 + 尼罗河流域同时进入复杂社会。埃及"垂直王权"（一个法老统所有）与苏美尔"水平王权"（多个城邦各有王）形成两种文明模型，影响后世所有国家结构。`,
  },

  {
    id: 'ch3',
    no: '03',
    range: '前 2500 – 前 2000',
    range_y: [-2500, -2000],
    title: '第一个帝国',
    subtitle: 'The First Empire',
    hero_question: '一个人如何征服并管理几十个独立城市？"帝国"的概念怎么诞生？',
    hero_mood: '#c84820',
    mood_grad: 'linear-gradient(180deg, #3a1a0a 0%, #c84820 60%, #f0c068 100%)',
    icon: '👑',
    one_line: 'Akkad 的 Sargon 征服苏美尔，建立人类第一个多民族帝国。印度河文明进入成熟期。',

    active_civs: [
      { id: 'sumer', state: '被征服后复兴',
        in_period_summary: '约前 2350 年被 Sargon 征服。但约前 2100 年 Ur 第三王朝复兴，颁布《Ur-Nammu 法典》（已知最早成文法典，比汉谟拉比早 300 年），建造 Ur 大金字塔。',
        L1: '失去政治独立，但 Ur III 短暂复兴。',
        L2: 'Sargon 征服后苏美尔语言+文化延续，被阿卡德继承。Ur-Nammu 重建灌溉系统、颁布法典、建造金字塔，是苏美尔最后辉煌。约前 2004 年被 Elam 灭。',
        L3_events: ['evt_urnammu_law'], L4_people: ['gudea', 'urnammu', 'enheduanna'], L5_full: 'CIV_DEEP.sumer' },
      { id: 'akkad', state: '崛起→巅峰→崩溃',
        in_period_summary: 'Sargon (~前 2334) 从倒酒侍童成为征服两河流域的皇帝。女儿 Enheduanna 成为世界第一位有名作家。约前 2154 年因干旱+Gutian 入侵崩溃。',
        L1: '人类第一个"帝国"——多民族被同一统治者管理。',
        L2: 'Sargon 是历史上第一个有详细记录的征服者。他征服了 30 多个城邦，统一货币、度量、税收，建立人类第一个跨民族帝国。这个"帝国"模式后被波斯、罗马、汉朝继承。他女儿 Enheduanna 是世界第一位署名作家。',
        L3_events: ['evt_sargon_conquest', 'evt_naramsin_empire'], L4_people: ['sargon', 'enheduanna', 'naramsin'], L5_full: 'CIV_DEEP.akkad' },
      { id: 'egypt_old', state: '巅峰→衰落',
        in_period_summary: '古王国前 2500-2200 年继续建金字塔。约前 2200 年因尼罗河水位异常+中央权力衰退，进入"第一中间期"混乱。',
        L1: '古王国达到顶峰后崩溃。', L2: '约前 2200 年的"4.2 千年事件"全球大干旱影响了埃及+阿卡德+印度河，多个早期帝国/王国同时陷入危机。',
        L3_events: [], L4_people: [], L5_full: null },
      { id: 'indus', state: '巅峰',
        in_period_summary: 'Harappa、Mohenjo-Daro 进入成熟期。城市有标准化砖块（27.94×13.97×6.99 cm，全境一致）、地下排水、公共澡堂。',
        L1: '印度河文明进入巅峰，城市规划领先世界。',
        L2: 'Mohenjo-Daro 人口约 4 万，有 9 米宽主街、4 米宽支街、家家有冲水厕所连地下排水。这种城市规划水平直到罗马帝国才被超越。但印度河文字至今未被破译。',
        L3_events: ['evt_indus_peak'], L4_people: [], L5_full: 'CIV_DEEP.indus' },
    ],
    key_events: [], key_people: ['sargon', 'enheduanna', 'ur_nammu'],
    world_context: '约前 2200 年全球进入"4.2 千年事件"——大干旱影响北非到中亚，多个早期文明同时崩溃。这是人类第一次见证"气候→政权崩溃"链条。',
  },

  {
    id: 'ch4',
    no: '04',
    range: '前 2000 – 前 1500',
    range_y: [-2000, -1500],
    title: '法律与海洋',
    subtitle: 'Law & The Sea',
    hero_question: '当人口翻倍、贸易跨海，社会需要什么新的"操作系统"？',
    hero_mood: '#2a7a90',
    mood_grad: 'linear-gradient(180deg, #0a2a3a 0%, #2a7a90 60%, #a8d0e0 100%)',
    icon: '⚖️',
    one_line: '汉谟拉比颁布282条法典，米诺斯人在克里特岛掌控地中海贸易，商朝在中国黄河流域兴起。',

    active_civs: [
      { id: 'babylon', state: '崛起→巅峰',
        in_period_summary: 'Hammurabi (~前 1792-1750) 统一两河流域，颁布 282 条法典——刻在 2.25 米玄武岩柱上，今藏卢浮宫。"以眼还眼"原则源此。',
        L1: '巴比伦取代苏美尔成为两河中心，汉谟拉比法典刻在石柱上。',
        L2: '这部法典不是最早（Ur-Nammu 早 350 年）但最完整、保存最好。282 条覆盖商业、家庭、奴隶、医疗赔偿。"以眼还眼，以牙还牙"原文出自第 196 条。',
        L3_events: ['evt_hammurabi_code', 'evt_hittite_sack_babylon'], L4_people: ['hammurabi'], L5_full: 'CIV_DEEP.babylon' },
      { id: 'indus', state: '衰落',
        in_period_summary: '约前 1900 年开始衰落。Mohenjo-Daro 被遗弃，人口南迁。原因不明：可能是河流改道、气候变化、外族入侵的组合。',
        L1: '印度河文明神秘衰落，原因至今不明。',
        L2: '一个有 4 万人口、完美城市规划的文明，在 100 年内被遗弃。考古学家发现 Mohenjo-Daro 最后几层没有暴力痕迹——人们好像是"决定走了"。',
        L3_events: ['evt_indus_decline'], L4_people: [], L5_full: 'CIV_DEEP.indus' },
      { id: 'minoan', state: '崛起→巅峰→被火山击垮',
        in_period_summary: '克里特岛 Knossos 宫殿巅峰，米诺斯人垄断爱琴海贸易。约前 1600 年 Thera 火山喷发摧毁前哨城 Akrotiri。',
        L1: '欧洲第一个文明在克里特岛崛起，掌控地中海贸易，被 Thera 火山击垮。',
        L2: 'Knossos 宫殿有上千间房、室内冲水管道、彩色壁画，是欧洲第一个高级文明。约前 1600 年爱琴海上 Thera 岛（今 Santorini）发生人类有记录最大火山喷发之一，可能是"亚特兰蒂斯"传说原型。100 年后米诺斯被希腊大陆迈锡尼人征服。',
        L3_events: ['evt_knossos_palace', 'evt_thera_eruption'], L4_people: ['minos'], L5_full: 'CIV_DEEP.minoan' },
      { id: 'shang', state: '崛起',
        in_period_summary: '中国黄河流域。约前 1600 年商汤灭夏建商。约前 1300 年盘庚迁殷，进入稳定期。青铜礼器、甲骨占卜雏形成型。',
        L1: '中国进入商朝，从游牧式王朝走向定居农耕王朝。',
        L2: '本期发生 2 件大事：① 商汤+伊尹联手灭夏建商（前 1600）；② 盘庚迁殷（前 1300），商朝从此稳定 273 年，所有最重要的商朝文物都来自殷墟。',
        L3_events: ['evt_shang_founding', 'evt_pangeng_relocate'],
        L4_people: ['shangtang', 'yiyin'],
        L5_full: 'CIV_DEEP.shang' },
    ],
    key_events: [], key_people: [],
    world_context: '城邦时代结束，区域强权（巴比伦、米诺斯、商）出现。海洋贸易首次成为大国关键（米诺斯）。',
  },

  {
    id: 'ch5',
    no: '05',
    range: '前 1500 – 前 1000',
    range_y: [-1500, -1000],
    title: '青铜的崩溃',
    subtitle: 'The Bronze Age Collapse',
    hero_question: '为什么 8 个强大文明在 100 年内同时崩溃？文明真的会"集体死亡"吗？',
    hero_mood: '#7a4040',
    mood_grad: 'linear-gradient(180deg, #1a0a0a 0%, #7a4040 60%, #d4a858 100%)',
    icon: '⚔️',
    one_line: '埃及新王国 + 赫梯 + 迈锡尼 + 商朝同时巅峰，然后在前 1177 年集体崩溃。',

    active_civs: [
      { id: 'egypt_new', state: '巅峰',
        in_period_summary: '新王国（前 1550-1069）。Hatshepsut 女法老、Akhenaten 一神教尝试、Tutankhamun 少年法老、Ramesses II 大帝。卡迭石战役 + 第一份国际和约。',
        L1: '埃及新王国——法老的黄金时代。',
        L2: 'Hatshepsut 是历史最成功女法老（22 年）。Akhenaten 尝试一神教（人类第一次，失败）。Tutankhamun 少年法老（19 岁死，1922 年金面具墓被发现震惊世界）。Ramesses II 在位 66 年，与赫梯打卡迭石战役，签第一份国际和约。',
        L3_events: ['evt_hyksos_expulsion', 'evt_akhenaten_reform', 'evt_kadesh'],
        L4_people: ['ahmose', 'hatshepsut', 'thutmose3', 'akhenaten', 'nefertiti', 'tutankhamun', 'ramesses2'],
        L5_full: 'CIV_DEEP.egypt_new' },
      { id: 'hittite', state: '崛起→巅峰→崩溃',
        in_period_summary: '小亚细亚赫梯帝国。Suppiluliuma I 奠基。与埃及打卡迭石战役（前 1274）+ 签世界最早国际和约（前 1259）。约前 1180 年崩溃。',
        L1: '赫梯——青铜时代末期的小亚细亚超级强权。',
        L2: '赫梯首先大规模冶炼铁，但守住技术 300 年。Suppiluliuma I 奠基帝国。与埃及卡迭石战役（5000-6000 战车）是古代最大坦克战，结果平手。两国签了人类已知最早国际和约。前 1180 年因 Sea Peoples + 干旱崩溃。',
        L3_events: ['evt_kadesh'], L4_people: ['suppiluliuma', 'muwatalli', 'hattusili'], L5_full: 'CIV_DEEP.hittite' },
      { id: 'mycenaean', state: '崛起→崩溃',
        in_period_summary: '希腊大陆的迈锡尼人取代米诺斯，掌控爱琴海。可能是特洛伊战争的真实背景。约前 1180 年崩溃，希腊进入 400 年"黑暗时代"。',
        L1: '希腊迈锡尼文明——荷马史诗的真实历史背景。',
        L2: '迈锡尼人写线性文字 B（已破译，是希腊语早期形式）。约前 1180 年宫殿被烧、人口骤减。希腊进入文字消失的"黑暗时代"，直到约前 800 年荷马开始口传史诗。',
        L3_events: ['evt_trojan_war'], L4_people: ['agamemnon'], L5_full: 'CIV_DEEP.mycenaean' },
      { id: 'shang', state: '巅峰→崩溃',
        in_period_summary: '商朝晚期（殷墟时期，前 1300-1046）。武丁中兴（前 1250-1192）达到巅峰，王后妇好成为中国第一女将军。前 1046 年被周武王在牧野之战击败。',
        L1: '中国商朝从巅峰（武丁中兴）走向灭亡（牧野之战）。',
        L2: '本期发生 2 件大事：① 武丁中兴（约前 1250-1192），妇好领兵 60+ 战役，傅说从奴隶变宰相，甲骨文系统化成 4500 字；② 牧野之战（前 1046 年 1 月 26 日），周武王灭商纣王，商朝结束。',
        L3_events: ['evt_wuding_peak', 'evt_battle_muye'],
        L4_people: ['wuding', 'fuhao', 'fushuo', 'dixin', 'zhou_wu'],
        L5_full: 'CIV_DEEP.shang' },
      { id: 'collapse', state: '集体崩溃',
        in_period_summary: '约前 1177 年"青铜时代大崩溃"。Sea Peoples 入侵 + 干旱 + 地震链 + 贸易瓦解。8 个文明 50 年内同时崩溃，唯一幸存的大国是埃及（但元气大伤）。',
        L1: '人类第一次有记录的"全球系统性崩溃"。',
        L2: '青铜需要铜（塞浦路斯）+ 锡（阿富汗），任何贸易中断都让整个青铜文明瘫痪。前 1200 年的干旱 + Sea Peoples 入侵 + 地震链让所有连接同时断。8 个文明同年化为废墟。希腊从此进入 400 年"黑暗时代"。',
        L3_events: ['evt_sea_peoples', 'evt_bronze_collapse'], L4_people: [], L5_full: 'CIV_DEEP.collapse' },
    ],
    key_events: [], key_people: [],
    world_context: '人类历史第一次"全球化崩溃"——多个互相依赖的强权同时倒下。提醒我们：高度复杂的文明可能突然崩溃。',
  },
];

// ════════════════════════════════════════════════════════════════
// 总汇表 · 学完所有章节后的全景
// ════════════════════════════════════════════════════════════════
const FINAL_OVERVIEW = {
  // 按文明 → 各时期状态 (颜色块强度)
  civs: [
    { id: 'sumer',         name: '苏美尔',           color: '#e8a070', spans: [[1,'rise'],[2,'peak'],[3,'fade']], legacy: '60 进制 (1小时60分钟) · 文字 · 法律 · 学校 · 城市' },
    { id: 'egypt_old',     name: '古埃及·古王国',     color: '#d4b870', spans: [[2,'rise'],[3,'peak'],[4,'collapse']], legacy: '金字塔 · 历法 · 象形文字 · "永恒来世"信仰' },
    { id: 'indus',         name: '印度河',           color: '#a070d4', spans: [[2,'rise'],[3,'peak'],[4,'fade']], legacy: '城市规划标准 · 标准化砖块 · 排水系统' },
    { id: 'akkad',         name: '阿卡德',           color: '#c84820', spans: [[3,'peak_collapse']], legacy: '"帝国"概念 · 多民族统一治理' },
    { id: 'babylon',       name: '古巴比伦',         color: '#7060a0', spans: [[4,'peak']], legacy: '汉谟拉比法典 · "以眼还眼" · 数学 (二次方程)' },
    { id: 'egypt_new',     name: '古埃及·新王国',     color: '#f0c068', spans: [[5,'peak']], legacy: '一神教萌芽 · 国际外交 · 大型神庙' },
    { id: 'shang',         name: '商朝',             color: '#a0b890', spans: [[4,'rise'],[5,'peak']], legacy: '汉字 · 甲骨占卜 · 青铜礼器' },
    { id: 'minoan',        name: '米诺斯',           color: '#5aa0c0', spans: [[4,'peak']], legacy: '欧洲文明源头 · 海洋贸易模型' },
    { id: 'mycenaean',     name: '迈锡尼',           color: '#7080b0', spans: [[5,'peak_collapse']], legacy: '希腊语起源 · 荷马史诗背景' },
    { id: 'hittite',       name: '赫梯',             color: '#b88060', spans: [[5,'peak_collapse']], legacy: '铁器技术 · 第一份国际和约' },
    { id: 'collapse',      name: '青铜时代崩溃',     color: '#404040', spans: [[5,'collapse']], legacy: '警示：复杂文明可能突然崩溃' },
  ],
  // 今天我们保留了什么 (按主题)
  today_legacy: [
    { what: '1 小时 60 分钟', from: '苏美尔 60 进制 (前 3000)', why: '60 能整除 2/3/4/5/6/10/12/15/20/30，方便古代分配粮食和土地' },
    { what: '圆 360 度',     from: '苏美尔天文学 (前 2500)',   why: '一年约 360 天，把圆分成 360 度方便观测星象' },
    { what: '字母',          from: '腓尼基 (前 1500，源自楔形文字简化)', why: '从 600 个楔形符号简化到 22 个字母，启发希腊/拉丁/阿拉伯字母' },
    { what: '"以眼还眼"',   from: '汉谟拉比法典 (前 1750)',   why: '"等价报复"原则被《圣经》《古兰经》继承' },
    { what: '法典 / 成文法', from: 'Ur-Nammu (前 2100)',       why: '"法律必须写下来公开"的原则' },
    { what: '学校',          from: '苏美尔 é-dub-ba (前 2500)',  why: '"专门场所培训抄写员"模式，今天所有学校的祖先' },
    { what: '城市规划',      from: '印度河 Mohenjo-Daro (前 2500)', why: '街道分级 + 地下排水 + 公共设施' },
    { what: '一神教萌芽',    from: '埃及 Akhenaten (前 1350)',  why: '法老 Akhenaten 短暂尝试只崇拜太阳神 Aten，启发后世犹太教' },
    { what: '汉字',          from: '商朝甲骨文 (前 1300)',     why: '今天 14 亿人使用的文字系统的直系祖先' },
    { what: '历法 (365 天)', from: '古埃及 (前 2700)',         why: '观测天狼星偕日升确定一年长度' },
    { what: '国际外交',      from: '埃及-赫梯和约 (前 1259)',  why: '已知最早国家间和平条约，规定不开战 + 互相引渡逃犯' },
    { what: '"史诗英雄"',   from: '吉尔伽美什 (前 2100)',     why: '所有"英雄成长→挫折→接受死亡"故事的祖先' },
  ],
};

if (typeof module !== 'undefined') module.exports = { CHAPTERS, FINAL_OVERVIEW };
