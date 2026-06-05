// ════════════════════════════════════════════════════════════════
// 🏛 早期文明深度知识库 · Early Civilizations (前 3000 – 前 1000)
// 10 节点 E1–E10，从两河流域到青铜崩溃
// Schema 与 prehistoric_kb.js 完全一致 (11 字段 + A 级来源)
// ════════════════════════════════════════════════════════════════

const EARLY_CIV_KB = [

// ════════════════════════════════════════════════════════════════
// E1 · 苏美尔 · 第一个文明 (~3500-2350 BCE)
// ════════════════════════════════════════════════════════════════
{
  node_id: "E01_sumer_first_civilization",
  title: "苏美尔 · 文明的发明者",
  time_range: "约 4500–2350 BCE (核心 3500–2350)",
  core_question: "为什么文明先在两河流域出现？苏美尔人到底发明了什么改变了人类？",

  fact_base: [
    {
      fact: "苏美尔城市 Uruk 在约公元前 3200 年人口达 4-5 万，是当时世界最大的人居聚落，比同期任何地方大 10 倍。",
      source_tier: "A",
      source: "Liverani, M. (2006). Uruk: The First City. Equinox; British Museum · Mesopotamia"
    },
    {
      fact: "楔形文字 (cuneiform) 约公元前 3300 年在 Uruk 出现，是世界最早的文字系统。最初用于记录大麦、绵羊、奴隶数量。",
      source_tier: "A",
      source: "Schmandt-Besserat, D. (1992). Before Writing. University of Texas Press."
    },
    {
      fact: "苏美尔人发明了车轮 (约 3500 BCE)、阴历 (12 月)、60 进制 (1 小时 60 分钟、圆 360 度)、灌溉农业、双层青铜冶炼。",
      source_tier: "A",
      source: "Kramer, S.N. (1963). The Sumerians: Their History, Culture, and Character. University of Chicago Press."
    },
    {
      fact: "Eridu 被苏美尔传统认为是世界第一座城市 (约 5400 BCE)，神 Enki 创造。考古发现该地连续 7 层神庙叠建。",
      source_tier: "A",
      source: "Crawford, H. (2004). Sumer and the Sumerians. Cambridge University Press."
    },
    {
      fact: "Ur 第一王朝 (~2600 BCE) 出土的'乌尔王陵' (Royal Cemetery) 含 16 座王陵，陪葬包括女王 Puabi 的精美金器和殉葬人。",
      source_tier: "A",
      source: "Woolley, L. (1934). Ur Excavations Vol II: The Royal Cemetery. British Museum & University of Pennsylvania."
    },
    {
      fact: "《吉尔伽美什史诗》(Epic of Gilgamesh) 是世界已知最古老的文学作品，最早版本约 2100 BCE，讲述乌鲁克国王寻求永生的故事，含'大洪水'桥段早于圣经 1000 年。",
      source_tier: "A",
      source: "George, A.R. (2003). The Babylonian Gilgamesh Epic. Oxford University Press."
    },
    {
      fact: "苏美尔人将神庙建在阶梯金字塔 (ziggurat) 顶部，最有名是 Ur 月神 Nanna 的金字塔 (约 2100 BCE)，残高 21 米。",
      source_tier: "A",
      source: "Roaf, M. (1990). Cultural Atlas of Mesopotamia. Facts on File."
    },
    {
      fact: "苏美尔法律最早成文：《Ur-Nammu 法典》约 2100 BCE，比汉谟拉比法典早 300 年，是已知最早法典。",
      source_tier: "A",
      source: "Roth, M.T. (1995). Law Collections from Mesopotamia and Asia Minor. Society of Biblical Literature."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "5500 年前，在今天的伊拉克南部，住着一群叫'苏美尔'的人。他们做了很多'第一次'：第一个城市、第一种文字、第一辆车轮、第一部法律、第一个学校、第一个国王。你现在用的'1小时60分钟'就是他们 5000 年前定的！",
      tier: "B",
      ref: "DK 'The Ancient World' · British Museum Kids"
    },
    {
      lang: "zh",
      text: "他们为什么这么厉害？因为两河流域（底格里斯河 + 幼发拉底河）每年泛滥带来肥沃的泥，粮食特别多。粮食多到吃不完，就有人不用种地了——他们当祭司、工匠、士兵、官员。城市就这么出现了。",
      tier: "B",
      ref: "NatGeo Kids 'Mesopotamia'"
    },
    {
      lang: "zh",
      text: "他们的文字一开始只是为了记账：'某某仓库里有 5 袋大麦'。后来才用来写故事、写信、写诗。世界上第一个故事《吉尔伽美什》就是苏美尔人写的，讲一个国王想长生不老。",
      tier: "B",
      ref: "DK 'The Story of Writing'"
    }
  ],

  map_points: [
    { id: "uruk", name: "Uruk (乌鲁克)", country: "伊拉克", coords: [31.32, 45.64], significance: "第一座大城市，楔形文字诞生地", source_tier: "A" },
    { id: "eridu", name: "Eridu", country: "伊拉克", coords: [30.82, 45.99], significance: "苏美尔传说中的第一座城市", source_tier: "A" },
    { id: "ur", name: "Ur (乌尔)", country: "伊拉克", coords: [30.96, 46.10], significance: "亚伯拉罕故乡，乌尔王陵所在", source_tier: "A" },
    { id: "nippur", name: "Nippur", country: "伊拉克", coords: [32.13, 45.23], significance: "苏美尔宗教中心，神 Enlil 圣城", source_tier: "A" },
    { id: "lagash", name: "Lagash", country: "伊拉克", coords: [31.42, 46.42], significance: "最早详细记录的城邦", source_tier: "A" },
    { id: "kish", name: "Kish", country: "伊拉克", coords: [32.54, 44.61], significance: "苏美尔王表中洪水后第一王朝所在", source_tier: "A" },
  ],

  evidence_objects: [
    {
      name: "Warka Vase (乌鲁克瓶)",
      held_at: "原伊拉克国家博物馆 (2003 被盗后归还)",
      date: "约 3200-3000 BCE",
      tells_us: "3 层雕刻：底层农产品+动物，中层裸体祭司，顶层向女神 Inanna 献祭。最早完整叙事艺术。",
      source_tier: "A",
      source: "Roaf 1990; Liverani 2006"
    },
    {
      name: "Standard of Ur (乌尔军旗)",
      held_at: "British Museum",
      date: "约 2600 BCE",
      tells_us: "两面木盒贝壳镶嵌：一面'战争'(战车、俘虏)、一面'和平'(宴会、贡品)。展示阶级社会结构。",
      source_tier: "A",
      source: "British Museum Catalog · BM 121201"
    },
    {
      name: "Cuneiform 行政泥板 (Uruk IV 层)",
      held_at: "British Museum / 卢浮宫",
      date: "约 3300 BCE",
      tells_us: "最早成体系文字，记录大麦配额、土地、奴隶。约 5000 块出土。",
      source_tier: "A",
      source: "Schmandt-Besserat 1992"
    },
    {
      name: "Puabi 女王头饰 (乌尔王陵)",
      held_at: "University of Pennsylvania Museum",
      date: "约 2600 BCE",
      tells_us: "黄金、青金石、玛瑙制成，证明苏美尔贸易远达阿富汗 (青金石产地)。",
      source_tier: "A",
      source: "Woolley 1934"
    },
    {
      name: "《吉尔伽美什史诗》泥板 XI (大洪水)",
      held_at: "British Museum (Nineveh 出土)",
      date: "约 700 BCE (抄自更早原本)",
      tells_us: "最早大洪水故事，神警告 Utnapishtim 造船救动物，比诺亚方舟早千年。",
      source_tier: "A",
      source: "George 2003"
    }
  ],

  key_events: [
    { time: "约 5400 BCE", event: "Eridu 建立，可能是世界第一座城市", source_tier: "A" },
    { time: "约 4500 BCE", event: "Uruk 时期开始，城市化加速", source_tier: "A" },
    { time: "约 3500 BCE", event: "车轮、犁、帆船在苏美尔出现", source_tier: "A" },
    { time: "约 3300 BCE", event: "楔形文字诞生 (Uruk IV 层)", source_tier: "A" },
    { time: "约 3200 BCE", event: "Uruk 人口达 4-5 万，世界最大城市", source_tier: "A" },
    { time: "约 2900 BCE", event: "苏美尔早王朝时期开始，多城邦并立", source_tier: "A" },
    { time: "约 2600 BCE", event: "Ur 第一王朝，王陵 + 殉葬，《吉尔伽美什》原型国王", source_tier: "A" },
    { time: "约 2350 BCE", event: "Sargon 大帝征服苏美尔，建立阿卡德帝国 (E04)", source_tier: "A" },
    { time: "约 2100 BCE", event: "苏美尔复兴 (Ur III)，Ur-Nammu 法典，Ur 大金字塔", source_tier: "A" },
    { time: "约 2004 BCE", event: "Ur 第三王朝灭亡，苏美尔语逐渐消亡 (但作为宗教语言保留 1500 年)", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Gilgamesh (吉尔伽美什)",
      role: "Uruk 第五王 (约 2700 BCE)",
      contribution: "历史上真有其人 (苏美尔王表记载)，后被神话成寻求永生的英雄。",
      source_tier: "A"
    },
    {
      name: "Enheduanna (恩赫杜安娜)",
      role: "祭司、诗人 (约 2285 BCE)",
      contribution: "Sargon 之女，月神 Nanna 大祭司。世界已知第一位有名字的作家，写过 42 首神庙赞美诗。",
      source_tier: "A"
    },
    {
      name: "Ur-Nammu",
      role: "Ur III 国王 (约 2112-2095 BCE)",
      contribution: "颁布最早法典；建造 Ur 大金字塔；恢复灌溉系统。",
      source_tier: "A"
    },
    {
      name: "Puabi (普阿比) 女王",
      role: "Ur 王后 (约 2600 BCE)",
      contribution: "乌尔王陵最豪华陪葬主人；陪葬 52 人；展示苏美尔王权与宗教联结。",
      source_tier: "A"
    },
    {
      name: "Leonard Woolley",
      role: "英国考古学家 (1880-1960)",
      contribution: "1922-34 年发掘 Ur，发现王陵、洪水沉积层、亚伯拉罕家乡证据。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "苏美尔是'文明操作系统'的发明者：城市 + 文字 + 法律 + 阶层 + 宗教组织 + 长距离贸易，后世所有文明都建立在这套基础上。",
      reasoning: "在他们之前没有先例。他们之后的所有 Mesopotamia 文明 (阿卡德、巴比伦、亚述) 都继承苏美尔语作为'拉丁文式'的文化语言。",
      source_tier: "A",
      source: "Kramer 1963; Liverani 2006"
    },
    {
      claim: "60 进制 (sexagesimal) 是苏美尔留给现代的最持久遗产：今天每小时 60 分钟、圆 360 度、罗盘 360 度，都是 5000 年前苏美尔会计员的发明。",
      reasoning: "60 能被 2,3,4,5,6,10,12,15,20,30 整除，适合古代分配大麦和土地。",
      source_tier: "A",
      source: "Robson, E. (2008). Mathematics in Ancient Iraq. Princeton."
    }
  ],

  common_misconceptions: [
    {
      wrong: "'文明从埃及开始'",
      right: "苏美尔早于古埃及约 300-500 年。两河流域 Uruk 已是 4 万人城市时，尼罗河沿岸还是分散的村庄。",
      source_tier: "A",
      source: "British Museum"
    },
    {
      wrong: "'楔形文字是字母'",
      right: "楔形文字是 '形音义混合' 系统：早期是图画，后简化为楔形线条组合，约 600 个符号。字母直到 1500 BCE 才在 Levant 出现。",
      source_tier: "A",
      source: "Schmandt-Besserat 1992"
    },
    {
      wrong: "'苏美尔人是闪族 (Semitic) 人'",
      right: "苏美尔语是孤立语，与已知任何语系无关。阿卡德人才是闪族 (与希伯来语/阿拉伯语同源)。",
      source_tier: "A",
      source: "Kramer 1963"
    }
  ],

  ai_tasks: [
    {
      task_id: "E01_Q1",
      prompt: "你是 5000 年前 Uruk 的一个小孩。爸爸是泥板抄写员 (scribe)，邻居是陶工。描述你的一天 — 要符合考古证据 (有泥砖房、神庙、运河、车轮、楔形文字，但没有金属货币、没有铁器)。",
      type: "creative_writing_with_facts",
      grading_criteria: ["泥砖建筑", "灌溉/运河", "楔形文字记账", "无铁/无货币", "祭司主导社会"]
    },
    {
      task_id: "E01_Q2",
      prompt: "为什么文明先在两河流域出现，而不是中国、欧洲或美洲？想想气候、河流、植物、动物。",
      type: "concept_check",
      grading_criteria: ["河流泛滥肥沃", "可驯化作物 (大麦小麦)", "可驯化动物 (绵羊山羊)", "地理位置交通便利"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说苏美尔人'被外星人帮助' — 这是阴谋论，无证据。",
    "❌ 不要把 Gilgamesh 神话情节当历史事实。",
    "❌ 不要说 '苏美尔人发明所有东西' — 农业、陶器在他们之前已存在。",
    "✅ 用 'Uruk 是已知最早的大城市' 而非 '第一座城市' (Eridu 可能更早)。",
    "✅ 强调苏美尔语是孤立语，文化与闪族阿卡德人有区别。"
  ],

  sources: [
    { tier: "A", citation: "Liverani (2006). Uruk: The First City. Equinox." },
    { tier: "A", citation: "Kramer (1963). The Sumerians. University of Chicago Press." },
    { tier: "A", citation: "Crawford (2004). Sumer and the Sumerians. Cambridge University Press." },
    { tier: "A", citation: "British Museum · Mesopotamia", url: "https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-mesopotamia" },
    { tier: "A", citation: "George (2003). The Babylonian Gilgamesh Epic. Oxford." },
    { tier: "A", citation: "Roaf (1990). Cultural Atlas of Mesopotamia. Facts on File." },
    { tier: "B", citation: "DK 'The Ancient World'" }
  ]
},

// ════════════════════════════════════════════════════════════════
// E2 · 古埃及·古王国 · 金字塔时代 (~3100-2200 BCE)
// ════════════════════════════════════════════════════════════════
{
  node_id: "E02_egypt_old_kingdom",
  title: "古埃及 · 金字塔时代",
  time_range: "约 3100–2181 BCE (Narmer 统一 → 古王国结束)",
  core_question: "埃及人是怎么建造金字塔的？法老为什么这么有权力？",

  fact_base: [
    {
      fact: "Narmer Palette (约 3100 BCE) 是埃及统一的最早证据，刻有 Narmer 王戴上下埃及王冠征服敌人的场景。",
      source_tier: "A",
      source: "Wilkinson, T. (1999). Early Dynastic Egypt. Routledge; Egyptian Museum Cairo · JE 32169"
    },
    {
      fact: "Djoser 阶梯金字塔 (约 2670 BCE，建造者 Imhotep) 是世界最早大型石造建筑之一，60 米高，6 层阶梯。",
      source_tier: "A",
      source: "Lehner, M. (2008). The Complete Pyramids. Thames & Hudson."
    },
    {
      fact: "Khufu (胡夫/Cheops) 大金字塔 (约 2560 BCE) 原高 146.5 米，是 4000 年间世界最高建筑，由约 230 万块石块构成。",
      source_tier: "A",
      source: "Verner, M. (2001). The Pyramids: The Mystery, Culture, and Science. Grove Press."
    },
    {
      fact: "金字塔由有偿工人 (不是奴隶) 建造。Wadi el-Jarf 出土的莎草纸 (约 2560 BCE) 记录了运送 Khufu 金字塔石块的工人 Merer 队长的日记。",
      source_tier: "A",
      source: "Tallet, P. (2017). Les papyrus de la Mer Rouge. IFAO; Lehner 2008"
    },
    {
      fact: "象形文字 (hieroglyphs) 约公元前 3200 年出现，与苏美尔楔形文字几乎同时，但发展独立。约 700 个符号。",
      source_tier: "A",
      source: "Dreyer, G. (1998). Umm el-Qaab I: Das prädynastische Königsgrab U-j. von Zabern"
    },
    {
      fact: "法老被认为是神在人间的化身 (Horus 的活体)，死后变成 Osiris 主宰冥界。这套神学支撑了 3000 年的法老制度。",
      source_tier: "A",
      source: "Assmann, J. (2003). The Mind of Egypt. Harvard University Press."
    },
    {
      fact: "尼罗河每年 7-10 月泛滥，留下肥沃黑泥。埃及人称自己国家为 Kemet (黑土地)，称沙漠为 Deshret (红土地)。",
      source_tier: "A",
      source: "Said, R. (1993). The River Nile: Geology, Hydrology and Utilization. Pergamon"
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "古埃及人住在尼罗河两岸，每年河水会准时泛滥，带来又肥沃又黑的泥巴。他们什么都不用做，撒种子就能长出很多粮食。这就是为什么埃及文明能存在 3000 年——河水太可靠了。",
      tier: "B",
      ref: "DK 'Ancient Egypt' · British Museum Kids"
    },
    {
      lang: "zh",
      text: "他们最有名的就是金字塔！最大那个 (胡夫金字塔) 用了 230 万块巨石，每块重 2-15 吨。当时没有起重机也没有铁器，他们怎么搬的？现在已经知道是用泥道滑、用水让石头浮、上千个工人合作 20 年。",
      tier: "B",
      ref: "NatGeo Kids 'Pyramids of Giza'"
    },
    {
      lang: "zh",
      text: "建金字塔的不是奴隶 — 是有工资的工人！他们有名字、有住的地方、生病了能看医生，死了还能有自己的小坟墓。考古学家找到了他们的工棚和墓地。",
      tier: "B",
      ref: "Smithsonian · Pyramid Workers Cemetery"
    }
  ],

  map_points: [
    { id: "memphis", name: "Memphis (孟菲斯)", country: "埃及", coords: [29.85, 31.25], significance: "古王国首都", source_tier: "A" },
    { id: "saqqara", name: "Saqqara (萨卡拉)", country: "埃及", coords: [29.87, 31.22], significance: "Djoser 阶梯金字塔所在", source_tier: "A" },
    { id: "giza", name: "Giza (吉萨)", country: "埃及", coords: [29.98, 31.13], significance: "三大金字塔 + 狮身人面像", source_tier: "A" },
    { id: "abydos", name: "Abydos (阿拜多斯)", country: "埃及", coords: [26.18, 31.92], significance: "Narmer Palette 出土地、Osiris 神圣城", source_tier: "A" },
    { id: "hierakonpolis", name: "Hierakonpolis (Nekhen)", country: "埃及", coords: [25.10, 32.78], significance: "前王朝最大聚落，Horus 圣城", source_tier: "A" },
    { id: "wadi_jarf", name: "Wadi el-Jarf", country: "埃及", coords: [28.89, 32.66], significance: "Merer 日记出土地 (建造金字塔的实证)", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Narmer Palette (那尔迈调色板)",
      held_at: "Egyptian Museum Cairo · JE 32169",
      date: "约 3100 BCE",
      tells_us: "Narmer 戴上下埃及王冠统一全境，背面是真实战争。最早法老形象。",
      source_tier: "A",
      source: "Wilkinson 1999"
    },
    {
      name: "Khufu 大金字塔",
      held_at: "原址 Giza",
      date: "约 2560 BCE",
      tells_us: "230 万巨石，原高 146.5 米，4000 年世界最高。建造过程留有 Merer 日记记载。",
      source_tier: "A",
      source: "Lehner 2008; Tallet 2017"
    },
    {
      name: "Great Sphinx (吉萨狮身人面像)",
      held_at: "原址 Giza",
      date: "约 2500 BCE",
      tells_us: "73 米长石灰岩雕，可能是 Khafre 法老的面相。守护吉萨墓区。",
      source_tier: "A",
      source: "Lehner 2008"
    },
    {
      name: "Merer 日记 (Wadi el-Jarf 莎草纸)",
      held_at: "Egyptian Museum",
      date: "约 2560 BCE",
      tells_us: "工人 Merer 队长记录用船把图拉 (Tura) 石灰石运到 Giza 的航程。证明建造系统化。",
      source_tier: "A",
      source: "Tallet 2017"
    },
    {
      name: "Imhotep 阶梯金字塔 + 神庙群",
      held_at: "Saqqara",
      date: "约 2670 BCE",
      tells_us: "世界第一座大型石造建筑，建筑师 Imhotep 后被神化。",
      source_tier: "A",
      source: "Lehner 2008"
    }
  ],

  key_events: [
    { time: "约 3100 BCE", event: "Narmer 统一上下埃及，第一王朝建立", source_tier: "A" },
    { time: "约 3000 BCE", event: "象形文字成熟，首都迁 Memphis", source_tier: "A" },
    { time: "约 2670 BCE", event: "Djoser + Imhotep 建造阶梯金字塔 (第三王朝)", source_tier: "A" },
    { time: "约 2560 BCE", event: "Khufu 大金字塔完工 (第四王朝)", source_tier: "A" },
    { time: "约 2500 BCE", event: "Khafre 建造第二大金字塔 + 狮身人面像", source_tier: "A" },
    { time: "约 2350 BCE", event: "Unas 法老 — 最早的 '金字塔文本' (Pyramid Texts)，宗教经文刻金字塔内壁", source_tier: "A" },
    { time: "约 2200 BCE", event: "干旱 + 中央政权崩溃 → 第一中间期 (First Intermediate Period)", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Narmer (那尔迈)",
      role: "第一位法老 (约 3100 BCE)",
      contribution: "统一上下埃及，建立第一王朝。",
      source_tier: "A"
    },
    {
      name: "Imhotep (伊姆霍特普)",
      role: "建筑师、宰相 (约 2670 BCE)",
      contribution: "设计 Djoser 阶梯金字塔，被誉为'医学之父'，2000 年后被神化为治疗之神。",
      source_tier: "A"
    },
    {
      name: "Khufu (胡夫/Cheops)",
      role: "第四王朝法老 (约 2589-2566 BCE)",
      contribution: "建造大金字塔，集权达顶峰。",
      source_tier: "A"
    },
    {
      name: "Khufu 的工人队",
      role: "约 20000 个有偿工匠",
      contribution: "在 Giza 工人村出土的骨骸显示他们吃肉、有医疗、被尊重埋葬 — 颠覆 '奴隶建金字塔' 神话。",
      source_tier: "A",
      source: "Hawass, Z. (1997). Egyptian Archaeology"
    },
    {
      name: "Howard Carter (后世发现者)",
      role: "英国考古学家",
      contribution: "1922 年发现 Tutankhamun 墓 (新王国时期，E06 主题)，让世界重新认识古埃及。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "金字塔是 '动员能力' 的纪念碑 — 证明古埃及已能调动数万人、跨数十年完成一个项目。这种 '国家能力' 是文明的核心。",
      reasoning: "建造一座大金字塔需要采石、运输、农业供给、神学合法性。任何一环弱了都做不成。古王国就是这种能力的巅峰。",
      source_tier: "A",
      source: "Lehner 2008; Wilkinson 1999"
    },
    {
      claim: "古王国崩溃 (约 2200 BCE) 是历史上第一次记录的 '气候导致国家崩溃' — 尼罗河连续多年泛滥不足。这预示后来 (E10) 的青铜崩溃。",
      reasoning: "湖泊沉积物显示约 2200 BCE 北非干旱，尼罗河水位下降，粮食歉收，地方诸侯做大，中央失控。",
      source_tier: "A",
      source: "Stanley et al. (2003). Geoarchaeology 18(3); Bell 1971"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'金字塔是奴隶建的'",
      right: "是有偿工人。考古证据 (工棚、墓地、骨骸、Merer 日记) 全部证明这一点。希罗多德 (公元前 5 世纪) 的奴隶说法是误传。",
      source_tier: "A",
      source: "Lehner 2008; Hawass 1997"
    },
    {
      wrong: "'金字塔是外星人造的'",
      right: "我们已找到采石场、运输路线、工人村、建造日记。所有技术都在古埃及人能力范围内。",
      source_tier: "A",
      source: "Smithsonian Magazine"
    },
    {
      wrong: "'埃及艳后 (Cleopatra) 是古埃及人'",
      right: "Cleopatra 是希腊托勒密王朝最后一位，距金字塔时代已 2500 年 — 比她到我们 (2000 年) 更远。",
      source_tier: "A",
      source: "Britannica"
    }
  ],

  ai_tasks: [
    {
      task_id: "E02_Q1",
      prompt: "你是 4500 年前在 Giza 工作的搬石工。每天的工作流程是什么？你吃什么、住哪里、能赚多少？要符合考古证据。",
      type: "creative_writing_with_facts",
      grading_criteria: ["有偿(非奴隶)", "船+泥道运石", "面包+啤酒+牛肉饮食", "工棚集体居住"]
    },
    {
      task_id: "E02_Q2",
      prompt: "为什么尼罗河'每年泛滥'对埃及文明这么重要？想想：如果河水改成每 3 年泛滥一次，会发生什么？",
      type: "counterfactual",
      grading_criteria: ["可预测性", "肥沃黑泥", "支撑农业剩余 → 法老/祭司/工匠"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要把所有埃及法老混为一谈 — Khufu (古王国 2500 BCE) ≠ Tutankhamun (新王国 1320 BCE) ≠ Cleopatra (托勒密 50 BCE)",
    "❌ 不要说 '所有金字塔在 Giza' — 埃及有 100+ 座金字塔",
    "❌ 不要说 '木乃伊是古王国发明' — 系统化 mummification 是中王国后期才完善",
    "✅ 区分古王国 (2700-2200) / 中王国 (2050-1650) / 新王国 (1550-1070)"
  ],

  sources: [
    { tier: "A", citation: "Lehner (2008). The Complete Pyramids. Thames & Hudson." },
    { tier: "A", citation: "Wilkinson (1999). Early Dynastic Egypt. Routledge." },
    { tier: "A", citation: "Tallet (2017). Les papyrus de la Mer Rouge. IFAO." },
    { tier: "A", citation: "British Museum · Ancient Egypt", url: "https://www.britishmuseum.org/" },
    { tier: "A", citation: "Smithsonian · Ancient Egypt", url: "https://si.edu/" },
    { tier: "B", citation: "DK 'Ancient Egypt'" }
  ]
},

// ════════════════════════════════════════════════════════════════
// E3 · 印度河文明 (~2600-1900 BCE)
// ════════════════════════════════════════════════════════════════
{
  node_id: "E03_indus_valley",
  title: "印度河文明 · 失落的城市文明",
  time_range: "约 2600–1900 BCE (Mature Harappan 阶段)",
  core_question: "为什么 4000 年前的印度河城市有标准化下水道，但他们的文字到今天都没解开？",

  fact_base: [
    {
      fact: "Mohenjo-daro (摩亨佐达罗) 和 Harappa 是世界已知最早有系统化下水道的城市 (约 2500 BCE)，每户都有连接主下水管的浴室和厕所。",
      source_tier: "A",
      source: "Kenoyer, J.M. (1998). Ancient Cities of the Indus Valley Civilization. Oxford University Press."
    },
    {
      fact: "印度河文明覆盖范围达 125 万平方公里 (大于古埃及 + 美索不达米亚总和)，含 1500 多个聚落，估计人口 500 万。",
      source_tier: "A",
      source: "Possehl, G.L. (2002). The Indus Civilization: A Contemporary Perspective. AltaMira."
    },
    {
      fact: "印度河城市使用标准化烧砖 (尺寸比例严格 1:2:4)，全文明范围统一。这种标准化在其他文明中极为罕见。",
      source_tier: "A",
      source: "Wright, R.P. (2010). The Ancient Indus: Urbanism, Economy, and Society. Cambridge University Press."
    },
    {
      fact: "印度河文字 (Indus script) 约 400-700 个符号，至今未破译 (与 Mohenjo-daro 印章上的文字相同)。可能是行政记账系统，也可能是某种语言。",
      source_tier: "A",
      source: "Parpola, A. (1994). Deciphering the Indus Script. Cambridge University Press."
    },
    {
      fact: "Mohenjo-daro 大浴池 (Great Bath) 12×7 米深 2.4 米，砖砌防水。可能是宗教仪式用 (后世印度教沐浴仪式可能起源于此)。",
      source_tier: "A",
      source: "Marshall, J. (1931). Mohenjo-Daro and the Indus Civilization. Probsthain."
    },
    {
      fact: "印度河文明没有发现宫殿、王陵或大型纪念碑 — 与同期苏美尔/埃及差异显著。可能是 '权力分散' 的城市联盟。",
      source_tier: "A",
      source: "Kenoyer 1998; Possehl 2002"
    },
    {
      fact: "印度河文明约 1900-1700 BCE 衰落，原因复杂：Saraswati 河干涸 + 季风变化 + 印度河改道 + 贸易网络中断。不是 '雅利安人入侵' (此说已被推翻)。",
      source_tier: "A",
      source: "Giosan et al. (2012). Fluvial landscapes of the Harappan civilization. PNAS 109(26)."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "4500 年前在今天的巴基斯坦和印度西北，有一个超级先进的文明。他们的城市有笔直的街道、标准化的砖头、每家都有厕所和下水道 — 这种水准 1800 年前的罗马都还达不到！",
      tier: "B",
      ref: "DK 'Lost Cities' · British Museum"
    },
    {
      lang: "zh",
      text: "最神奇的是：他们的文字到现在都没有人能读懂。世界上最聪明的学者花 100 多年都没解开。所以我们只能从他们留下的房子、玩具、印章猜他们的生活。",
      tier: "B",
      ref: "NatGeo Kids 'The Mystery of the Indus'"
    },
    {
      lang: "zh",
      text: "他们没有国王，没有大宫殿，没有大墓，但每个城市规划得一模一样 — 像有人统一设计过。这是历史上的大谜团。",
      tier: "B",
      ref: "Smithsonian Asian Art"
    }
  ],

  map_points: [
    { id: "mohenjo_daro", name: "Mohenjo-daro (摩亨佐达罗)", country: "巴基斯坦", coords: [27.32, 68.14], significance: "印度河文明最大城市，大浴池所在", source_tier: "A" },
    { id: "harappa", name: "Harappa (哈拉帕)", country: "巴基斯坦", coords: [30.63, 72.86], significance: "文明因此命名，最早发现地", source_tier: "A" },
    { id: "dholavira", name: "Dholavira", country: "印度古吉拉特", coords: [23.89, 70.21], significance: "三层城规划 + 蓄水系统，UNESCO 世界遗产", source_tier: "A" },
    { id: "lothal", name: "Lothal", country: "印度古吉拉特", coords: [22.52, 72.25], significance: "最早人工码头 (约 2400 BCE)", source_tier: "A" },
    { id: "mehrgarh", name: "Mehrgarh", country: "巴基斯坦", coords: [29.39, 67.62], significance: "印度河文明前身村落 (约 7000 BCE)", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Great Bath (Mohenjo-daro 大浴池)",
      held_at: "原址",
      date: "约 2500 BCE",
      tells_us: "12×7 米水池，防水砖砌。可能宗教/仪式用，后世印度教沐浴礼之源。",
      source_tier: "A",
      source: "Marshall 1931"
    },
    {
      name: "Priest-King 像",
      held_at: "Karachi National Museum",
      date: "约 2000 BCE",
      tells_us: "17.5cm 雕像，可能是祭司或商人 (身份未定)，但展示印度河艺术风格。",
      source_tier: "A",
      source: "Kenoyer 1998"
    },
    {
      name: "Dancing Girl (跳舞女孩)",
      held_at: "Indian National Museum, Delhi",
      date: "约 2300 BCE",
      tells_us: "10.5cm 青铜失蜡铸造，证明高超冶金技术。",
      source_tier: "A",
      source: "Marshall 1931"
    },
    {
      name: "Indus 印章 (Pashupati Seal 等 3500+ 件)",
      held_at: "多国博物馆",
      date: "约 2600-1900 BCE",
      tells_us: "刻有动物 (牛、犀牛、独角兽)、几何图案和文字。用于商业认证。",
      source_tier: "A",
      source: "Parpola 1994"
    }
  ],

  key_events: [
    { time: "约 7000 BCE", event: "Mehrgarh 村落 - 印度河文明前身", source_tier: "A" },
    { time: "约 3300 BCE", event: "Early Harappan 阶段开始 - 城市雏形", source_tier: "A" },
    { time: "约 2600 BCE", event: "Mature Harappan 阶段 - 大型城市出现", source_tier: "A" },
    { time: "约 2500 BCE", event: "Mohenjo-daro 大浴池建成", source_tier: "A" },
    { time: "约 2400 BCE", event: "Lothal 港口建成，与苏美尔贸易兴盛", source_tier: "A" },
    { time: "约 1900 BCE", event: "城市开始被遗弃 - 气候 + 河流改道", source_tier: "A" },
    { time: "约 1300 BCE", event: "文明完全消亡，文化转向 Vedic 时期", source_tier: "A" },
    { time: "1921 年", event: "John Marshall 团队发现 Harappa，文明被'重新发现'", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Harappans (印度河人)",
      role: "未知民族",
      contribution: "建造世界最先进的早期城市。可能是后来的达罗毗荼人 (Dravidians) 祖先。",
      source_tier: "A"
    },
    {
      name: "John Marshall",
      role: "英国考古学家",
      contribution: "1921 年开始发掘 Harappa 和 Mohenjo-daro，重新发现了消失 3500 年的文明。",
      source_tier: "A"
    },
    {
      name: "Jonathan Mark Kenoyer",
      role: "美国考古学家",
      contribution: "现代印度河文明最权威研究者，重新解读手工艺、贸易、社会结构。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "印度河文明展示文明的'另一条路'：不靠中央王权、巨型纪念碑、阶级悬殊，靠标准化和分布式治理也能维持百万人口数百年。",
      reasoning: "他们没有宫殿、没有王陵、没有壁画显示战争。但有最好的下水道、最一致的度量衡。挑战'文明=帝国'的标准叙事。",
      source_tier: "A",
      source: "Kenoyer 1998; Scott 2017"
    },
    {
      claim: "它的消失提醒我们：文明依赖气候，气候改变文明可能整体消失。Saraswati 干涸、季风变化让 500 万人的城市文明在 200 年内被遗弃。",
      reasoning: "现代气候研究 (Giosan 2012) 证明印度河衰落与同时期 4.2 ka 干旱事件相关，影响了埃及古王国、美索不达米亚 Akkad 帝国。",
      source_tier: "A",
      source: "Giosan 2012; Weiss 1993"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'印度河文明被雅利安人入侵摧毁'",
      right: "这是 19 世纪殖民时期的错误推论。现代考古和基因证据显示：文明因气候衰落，'雅利安' 是后来文化融合，非武力征服。",
      source_tier: "A",
      source: "Witzel, M. (2001); Reich 2018"
    },
    {
      wrong: "'印度河文字内容是某某宗教/语言'",
      right: "至今未破译。任何 '已破译' 说法都未获学界认可。",
      source_tier: "A",
      source: "Parpola 1994"
    }
  ],

  ai_tasks: [
    {
      task_id: "E03_Q1",
      prompt: "你是 4000 年前 Mohenjo-daro 的商人，要去 200 公里外的 Lothal 港口。描述路上看到的东西 — 要符合考古证据 (有车、骡、印章、青铜工具，但没有铁、马、文字记录)。",
      type: "creative_writing_with_facts",
      grading_criteria: ["牛车/骡", "印章身份证明", "无马(马要 1500 BCE 后才传入)", "城市规划整齐"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要为印度河文字编造翻译",
    "❌ 不要说 '印度河人崇拜湿婆/毗湿奴' — 这些是 1500 年后印度教神，与印度河时期无直接证据连接",
    "❌ 不要把 '雅利安入侵' 当作文明衰落原因",
    "✅ 强调 '我们不知道他们的语言和宗教'"
  ],

  sources: [
    { tier: "A", citation: "Kenoyer (1998). Ancient Cities of the Indus Valley. Oxford." },
    { tier: "A", citation: "Possehl (2002). The Indus Civilization. AltaMira." },
    { tier: "A", citation: "Wright (2010). The Ancient Indus. Cambridge." },
    { tier: "A", citation: "Giosan et al. (2012). PNAS 109(26)." },
    { tier: "A", citation: "UNESCO · Dholavira", url: "https://whc.unesco.org/en/list/1645/" }
  ]
},

// ════════════════════════════════════════════════════════════════
// E4 · 阿卡德帝国 · 第一个真正的帝国 (~2334-2154 BCE)
// ════════════════════════════════════════════════════════════════
{
  node_id: "E04_akkadian_empire",
  title: "阿卡德 · 第一个帝国",
  time_range: "约 2334–2154 BCE (Sargon → Naram-Sin → 崩溃)",
  core_question: "什么叫'帝国'？为什么 Sargon 大帝是历史上第一个'帝国皇帝'？",

  fact_base: [
    {
      fact: "Sargon 大帝 (Sharrukin '真正的国王') 约 2334 BCE 征服苏美尔所有城邦，建立世界第一个跨民族多语言帝国，疆域从波斯湾到地中海。",
      source_tier: "A",
      source: "Liverani, M. (1993). Akkad, the First World Empire. Sargon."
    },
    {
      fact: "Sargon 出身传奇：被母亲放进沥青篮子顺幼发拉底河漂下，被园丁救起 — 与摩西、罗慕路斯出生神话同型。",
      source_tier: "A",
      source: "Lewis, B. (1980). The Sargon Legend. ASOR"
    },
    {
      fact: "阿卡德语 (Akkadian) 是闪族语 (与希伯来语、阿拉伯语同源)，逐渐取代苏美尔语成为美索不达米亚通用语，使用 2000 年。",
      source_tier: "A",
      source: "Huehnergard, J. (2005). A Grammar of Akkadian. Eisenbrauns"
    },
    {
      fact: "Sargon 之孙 Naram-Sin (纳拉姆-辛) 是第一个自称 '神' 的人间君主 (约 2254 BCE)，名字前加神决定符 (Dingir)。",
      source_tier: "A",
      source: "Westenholz, A. (1999). The Old Akkadian Period. OBO"
    },
    {
      fact: "阿卡德帝国约 2200 BCE 突然崩溃，原因主要是 4.2 ka 干旱事件 — 同时影响埃及古王国和印度河。",
      source_tier: "A",
      source: "Weiss, H. (1993). The Genesis and Collapse of Third Millennium North Mesopotamian Civilization. Science 261."
    },
    {
      fact: "阿卡德首都 Akkad (Agade) 至今未被发现 — 是考古学最大谜团之一，可能在巴格达附近。",
      source_tier: "A",
      source: "Foster, B. (2016). The Age of Agade. Routledge"
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "Sargon 大帝是历史上第一个 '帝国皇帝'。他出生很穷，但靠打仗一步步征服了所有的苏美尔城邦，建立了第一个跨民族的大帝国。从他开始，'征服别人 + 让别人交税' 这种模式持续了 4000 年。",
      tier: "B",
      ref: "DK 'The Ancient World' · British Museum Kids"
    },
    {
      lang: "zh",
      text: "他的孙子 Naram-Sin 更夸张 — 自称是 '神'。这是历史上第一次有国王说自己不是人是神。",
      tier: "B",
      ref: "NatGeo Kids"
    }
  ],

  map_points: [
    { id: "akkad", name: "Akkad (Agade)", country: "伊拉克 (位置未定)", coords: [33.0, 44.0], significance: "帝国首都，至今未被找到", source_tier: "A" },
    { id: "tell_brak", name: "Tell Brak", country: "叙利亚", coords: [36.67, 41.06], significance: "阿卡德帝国北部要塞", source_tier: "A" },
    { id: "susa", name: "Susa (苏萨)", country: "伊朗", coords: [32.19, 48.26], significance: "Naram-Sin 胜利碑出土地", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Naram-Sin 胜利碑 (Stele of Naram-Sin)",
      held_at: "Louvre Museum, Paris",
      date: "约 2254 BCE",
      tells_us: "高 2 米石碑，Naram-Sin 戴神帽踩在敌人尸体上，最早突破 '装饰带' 构图的艺术品。",
      source_tier: "A",
      source: "Louvre · Sb 4"
    },
    {
      name: "Sargon 头像 (Akkadian Bronze Head, 又称 Sargon 头)",
      held_at: "原伊拉克国家博物馆 (2003 被盗，目前下落不明)",
      date: "约 2300 BCE",
      tells_us: "失蜡法青铜铸造，证明阿卡德高超冶金。是 Sargon 还是 Naram-Sin 仍有争议。",
      source_tier: "A",
      source: "Foster 2016"
    }
  ],

  key_events: [
    { time: "约 2334 BCE", event: "Sargon 征服 Kish + Uruk，建立阿卡德帝国", source_tier: "A" },
    { time: "约 2300 BCE", event: "Sargon 征服 Ebla (叙利亚)、Mari、Elam，疆域至地中海", source_tier: "A" },
    { time: "约 2284 BCE", event: "Sargon 去世，传位儿子 Rimush", source_tier: "A" },
    { time: "约 2254 BCE", event: "Naram-Sin 即位，扩张到顶峰，自称 '神'", source_tier: "A" },
    { time: "约 2200 BCE", event: "4.2 ka 干旱事件开始", source_tier: "A" },
    { time: "约 2154 BCE", event: "帝国崩溃，Gutian 山地部族入侵", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Sargon of Akkad (萨尔贡)",
      role: "第一个皇帝 (约 2334-2284 BCE)",
      contribution: "首创帝国模式：跨民族、跨语言、中央集权、专业军队、官僚体系。",
      source_tier: "A"
    },
    {
      name: "Enheduanna (恩赫杜安娜)",
      role: "Sargon 之女、月神大祭司、诗人",
      contribution: "世界第一位有名字的作家。她的政教合一作用帮助 Sargon 整合多神教。",
      source_tier: "A"
    },
    {
      name: "Naram-Sin (纳拉姆-辛)",
      role: "阿卡德第四王 (约 2254-2218 BCE)",
      contribution: "第一个自称神的人间君主；扩张到帝国顶峰；建立 'divine kingship' 传统。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "Sargon 发明了 '帝国' 这个概念：把多个不同的民族用一套政治+军事+语言强行统一。后来的波斯、罗马、唐、蒙古、大英帝国都沿这个模式。",
      reasoning: "在他之前只有 '城邦' (city-state)，一个城+周边农田。Sargon 第一次把多个城邦+多个民族强制纳入单一政权。",
      source_tier: "A",
      source: "Liverani 1993; Foster 2016"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'Sargon = Sargon II of Assyria'",
      right: "有两个 Sargon。Sargon I 是阿卡德 (2334 BCE)，Sargon II 是亚述帝国 (722 BCE)。隔了 1600 年。",
      source_tier: "A",
      source: "Britannica"
    }
  ],

  ai_tasks: [
    {
      task_id: "E04_Q1",
      prompt: "你是 Sargon 帝国的一个使者。从首都 Akkad 出发，要把信件送到 1500 公里外的 Susa。一路上会遇到什么？要符合 2300 BCE 的现实。",
      type: "creative_writing_with_facts",
      grading_criteria: ["驴(无马)", "刻字泥板", "山路/沙漠/河流", "驻军关卡"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要把阿卡德 (Akkadian) 与亚述 (Assyrian) 混淆",
    "❌ 不要说 Sargon 出生信息是 '可证实的史实' — 出生神话很可能是后世添加",
    "✅ 强调 '第一个跨民族多语言帝国' 概念"
  ],

  sources: [
    { tier: "A", citation: "Liverani (1993). Akkad, the First World Empire." },
    { tier: "A", citation: "Foster (2016). The Age of Agade. Routledge." },
    { tier: "A", citation: "Weiss (1993). Science 261." }
  ]
},

// ════════════════════════════════════════════════════════════════
// E5 · 古巴比伦 · 汉谟拉比法典 (~1894-1595 BCE)
// ════════════════════════════════════════════════════════════════
{
  node_id: "E05_old_babylonian_hammurabi",
  title: "古巴比伦 · 汉谟拉比与法律之始",
  time_range: "约 1894–1595 BCE (Hammurabi 1792-1750)",
  core_question: "为什么'以眼还眼，以牙还牙'这条法律 3800 年还在影响我们？",

  fact_base: [
    {
      fact: "Hammurabi (汉谟拉比) 法典 (约 1754 BCE) 刻在 2.25 米高玄武岩石碑上，包含 282 条法律，是已知最完整的早期成文法典 (但不是最早 — Ur-Nammu 法典早 350 年)。",
      source_tier: "A",
      source: "Roth, M.T. (1997). Law Collections from Mesopotamia. Scholars Press."
    },
    {
      fact: "汉谟拉比石碑顶部刻有他从太阳神 Shamash 接受法律的浮雕 — 法律来自神授，国王只是传达者。",
      source_tier: "A",
      source: "Louvre · Sb 8"
    },
    {
      fact: "法典核心原则 'Lex Talionis' (以眼还眼，以牙还牙) 但只适用于平等阶级之间。贵族打贵族 = 还击；贵族打平民 = 罚款。",
      source_tier: "A",
      source: "Westbrook, R. (2003). A History of Ancient Near Eastern Law. Brill."
    },
    {
      fact: "Hammurabi 通过外交联盟逐个击破强敌 (Mari, Larsa, Elam, Assyria)，约 1763 BCE 统一两河流域。",
      source_tier: "A",
      source: "Charpin, D. (2012). Hammurabi of Babylon. I.B. Tauris"
    },
    {
      fact: "古巴比伦数学高度发达：Plimpton 322 泥板 (约 1800 BCE) 列出 15 组毕达哥拉斯三元组 — 比毕达哥拉斯早 1200 年。",
      source_tier: "A",
      source: "Mansfield, D.F. & Wildberger, N.J. (2017). Plimpton 322 is Babylonian exact sexagesimal trigonometry. Historia Mathematica 44(4)."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "汉谟拉比是 3800 年前巴比伦的国王。他做了一件很重要的事：把所有法律写在大石头上，立在城市中央，让每个人都能看到。这样大家都知道犯什么罪受什么罚，不会被官员随便冤枉。",
      tier: "B",
      ref: "DK 'The Ancient World'"
    },
    {
      lang: "zh",
      text: "他最有名的一句话是 '以眼还眼，以牙还牙' — 你打了我的眼睛，我就打回你的眼睛。听起来很狠，但其实是在限制 '过度报复' — 不能因为别人打你一下，你就杀了人家全家。",
      tier: "B",
      ref: "NatGeo Kids"
    }
  ],

  map_points: [
    { id: "babylon", name: "Babylon (巴比伦)", country: "伊拉克", coords: [32.54, 44.42], significance: "古巴比伦帝国首都", source_tier: "A" },
    { id: "mari", name: "Mari", country: "叙利亚", coords: [34.55, 40.89], significance: "Hammurabi 击败的对手，皇家档案出土", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "汉谟拉比法典石碑",
      held_at: "Louvre Museum · Sb 8",
      date: "约 1754 BCE",
      tells_us: "2.25 米玄武岩，282 条法律 + 神授图像。1901 在 Susa 出土 (古代被 Elamite 抢走的战利品)。",
      source_tier: "A",
      source: "Roth 1997"
    },
    {
      name: "Plimpton 322 泥板",
      held_at: "Columbia University",
      date: "约 1800 BCE",
      tells_us: "毕达哥拉斯三元组列表，证明古巴比伦数学远超同期文明。",
      source_tier: "A",
      source: "Mansfield 2017"
    },
    {
      name: "Mari 皇家档案 (25000+ 泥板)",
      held_at: "Louvre + Damascus",
      date: "约 1810-1760 BCE",
      tells_us: "外交、商业、宗教记录，让我们看到 Hammurabi 时期日常生活。",
      source_tier: "A",
      source: "Charpin 2012"
    }
  ],

  key_events: [
    { time: "约 1894 BCE", event: "Amorite 王朝建立巴比伦城", source_tier: "A" },
    { time: "约 1792 BCE", event: "Hammurabi 即位", source_tier: "A" },
    { time: "约 1763 BCE", event: "Hammurabi 统一两河流域", source_tier: "A" },
    { time: "约 1754 BCE", event: "汉谟拉比法典颁布", source_tier: "A" },
    { time: "约 1750 BCE", event: "Hammurabi 去世", source_tier: "A" },
    { time: "约 1595 BCE", event: "Hittites 洗劫巴比伦，古巴比伦王朝结束", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Hammurabi (汉谟拉比)",
      role: "巴比伦第六王 (1792-1750 BCE)",
      contribution: "颁布最早完整法典；用外交+军事统一美索不达米亚；建立'国王=法律执行者+神授'模式。",
      source_tier: "A"
    },
    {
      name: "Amorites (亚摩利人)",
      role: "闪族游牧族",
      contribution: "约 2000 BCE 进入美索不达米亚，建立巴比伦、Mari、Assyria 等王朝。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "汉谟拉比法典开创 '成文法+公开发布' 传统 — 后来犹太教十诫、罗马十二铜表法、现代宪法都沿这个传统。'法律之前人人平等' (虽然他法典里还有阶级差) 的种子在此种下。",
      reasoning: "之前法律是 '国王说什么算什么' 的口头传统。汉谟拉比把法律刻在公开石碑上，国王自己也必须遵守 — 这是 'rule of law' 的雏形。",
      source_tier: "A",
      source: "Westbrook 2003"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'汉谟拉比法典是世界最早法典'",
      right: "Ur-Nammu 法典 (~2100 BCE) 早 350 年，Lipit-Ishtar 法典 (~1934 BCE) 也更早。汉谟拉比的是最完整保存的。",
      source_tier: "A",
      source: "Roth 1997"
    },
    {
      wrong: "'以眼还眼是野蛮'",
      right: "在当时是 '限制报复' 的进步：之前血亲复仇可以无限升级 (杀对方一人，对方杀你家三人)。'以眼还眼' 实际是 '不能超过对方对你做的'。",
      source_tier: "A",
      source: "Westbrook 2003"
    }
  ],

  ai_tasks: [
    {
      task_id: "E05_Q1",
      prompt: "你是巴比伦的法官。一个商人指控他的伙伴偷了他的银子。汉谟拉比法典里怎么判？告诉我你需要哪些证据、怎么审理。",
      type: "role_play",
      grading_criteria: ["证人/证据要求", "宣誓制度", "阶级影响判决"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 Hammurabi 是 '第一个写法律的人'",
    "❌ 不要把巴比伦 (古巴比伦 1894-1595) 与新巴比伦 (Nebuchadnezzar 605 BCE) 混淆",
    "✅ 'lex talionis' 是阶级内适用，跨阶级是罚款"
  ],

  sources: [
    { tier: "A", citation: "Roth (1997). Law Collections from Mesopotamia." },
    { tier: "A", citation: "Charpin (2012). Hammurabi of Babylon." },
    { tier: "A", citation: "Louvre · Code de Hammurabi", url: "https://collections.louvre.fr/" }
  ]
},

// ════════════════════════════════════════════════════════════════
// E6 · 古埃及·新王国 · 法老黄金时代 (~1550-1070 BCE)
// ════════════════════════════════════════════════════════════════
{
  node_id: "E06_egypt_new_kingdom",
  title: "古埃及 · 新王国 (法老们的黄金时代)",
  time_range: "约 1550–1070 BCE",
  core_question: "为什么 Hatshepsut、Akhenaten、Tutankhamun、Ramesses 这些法老 3000 年后还有名？",

  fact_base: [
    {
      fact: "Hatshepsut (哈特谢普苏特，约 1479-1458 BCE) 是埃及最成功的女法老。她戴假胡子，自称男性。她派出 Punt (可能是今索马里) 远征队，建造 Deir el-Bahari 神庙。",
      source_tier: "A",
      source: "Tyldesley, J. (1996). Hatchepsut: The Female Pharaoh. Penguin"
    },
    {
      fact: "Akhenaten (阿肯那顿，约 1353-1336 BCE) 推行历史上第一次 '一神教改革'：废除所有神，只崇拜太阳神 Aten。他迁都到 Amarna。这场宗教革命在他死后立即被反转。",
      source_tier: "A",
      source: "Hornung, E. (1999). Akhenaten and the Religion of Light. Cornell"
    },
    {
      fact: "Tutankhamun (图坦卡蒙) 9 岁登基，19 岁死亡 (约 1323 BCE)。他本身在历史上不重要，但 1922 年 Howard Carter 发现他未被盗的墓 — 含 5000+ 件文物，包括 11 公斤纯金面具。",
      source_tier: "A",
      source: "Reeves, N. (1990). The Complete Tutankhamun. Thames & Hudson"
    },
    {
      fact: "Ramesses II (拉美西斯二世，约 1279-1213 BCE) 在位 66 年，活到 90 岁，有 100+ 个孩子。建造 Abu Simbel、Karnak 扩建，与 Hittites 签订世界最早和平条约 (约 1259 BCE)。",
      source_tier: "A",
      source: "Kitchen, K.A. (1982). Pharaoh Triumphant: The Life and Times of Ramesses II. Aris & Phillips"
    },
    {
      fact: "Kadesh 战役 (约 1274 BCE) 是 Ramesses II vs Hittite 帝国，可能是历史上第一次有详细记录的大规模战车战 (双方各 5000+ 战车)，结果是平局。",
      source_tier: "A",
      source: "Gardiner, A.H. (1960). The Kadesh Inscriptions of Ramesses II. Griffith Institute"
    },
    {
      fact: "Hittite-Egyptian 和平条约 (约 1259 BCE) 是世界已知最早的国际和平条约 — 双语版 (阿卡德语+象形文字) 保存至今。联合国 1970 年在总部展出复制品。",
      source_tier: "A",
      source: "Edel, E. (1997). Der Vertrag zwischen Ramses II. und Hattusili III. Mann"
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "新王国时期是埃及最辉煌的 500 年，出过很多有名的法老：女法老 Hatshepsut、宗教革命的 Akhenaten、9 岁当王的 Tutankhamun、活到 90 岁的 Ramesses 二世。",
      tier: "B",
      ref: "DK 'Ancient Egypt'"
    },
    {
      lang: "zh",
      text: "Tutankhamun 本身并不重要 — 他 9 岁当王，19 岁就死了。但他的墓被埋在沙子下 3200 年没被挖到。1922 年终于被发现，里面有 5000 件宝物，包括纯金面具。这是世界考古史上最大的发现。",
      tier: "B",
      ref: "NatGeo Kids 'Tutankhamun'"
    }
  ],

  map_points: [
    { id: "thebes", name: "Thebes (底比斯)", country: "埃及 Luxor", coords: [25.70, 32.65], significance: "新王国首都，Karnak 神庙所在", source_tier: "A" },
    { id: "valley_of_kings", name: "Valley of the Kings (帝王谷)", country: "埃及", coords: [25.74, 32.60], significance: "新王国法老陵墓区，Tutankhamun 墓地", source_tier: "A" },
    { id: "amarna", name: "Amarna (阿玛尔纳)", country: "埃及", coords: [27.65, 30.90], significance: "Akhenaten 新都 (短命)", source_tier: "A" },
    { id: "abu_simbel", name: "Abu Simbel", country: "埃及", coords: [22.34, 31.63], significance: "Ramesses II 巨像神庙", source_tier: "A" },
    { id: "kadesh", name: "Kadesh", country: "叙利亚", coords: [34.57, 36.52], significance: "Ramesses II vs Hittite 战役地", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Tutankhamun 黄金面具",
      held_at: "Egyptian Museum Cairo · JE 60672",
      date: "约 1323 BCE",
      tells_us: "11 公斤纯金 + 青金石 + 玛瑙。最有名的古埃及艺术品。",
      source_tier: "A",
      source: "Reeves 1990"
    },
    {
      name: "Hatshepsut 神庙 (Deir el-Bahari)",
      held_at: "原址 Luxor",
      date: "约 1470 BCE",
      tells_us: "三层柱廊神庙，建筑师 Senenmut 设计。Punt 远征浮雕。",
      source_tier: "A",
      source: "Tyldesley 1996"
    },
    {
      name: "Nefertiti (奈费尔提蒂) 半身像",
      held_at: "Neues Museum, Berlin",
      date: "约 1345 BCE",
      tells_us: "Akhenaten 王后，最美古埃及艺术之一。Amarna 时期写实风格。",
      source_tier: "A",
      source: "Berlin · ÄM 21300"
    },
    {
      name: "Hittite-Egyptian 和平条约",
      held_at: "Istanbul Archaeology Museum",
      date: "约 1259 BCE",
      tells_us: "世界最早和平条约。银版双语版本。",
      source_tier: "A",
      source: "Edel 1997"
    }
  ],

  key_events: [
    { time: "约 1550 BCE", event: "Ahmose I 驱逐 Hyksos，建立第十八王朝/新王国", source_tier: "A" },
    { time: "约 1479 BCE", event: "Hatshepsut 即位 (女法老)", source_tier: "A" },
    { time: "约 1457 BCE", event: "Thutmose III 击败 Megiddo 联军，埃及扩张至顶峰", source_tier: "A" },
    { time: "约 1353 BCE", event: "Akhenaten 推行 Aten 一神教，迁都 Amarna", source_tier: "A" },
    { time: "约 1336 BCE", event: "Akhenaten 死，宗教改革被反转", source_tier: "A" },
    { time: "约 1332 BCE", event: "Tutankhamun 即位 (9 岁)", source_tier: "A" },
    { time: "约 1279 BCE", event: "Ramesses II 即位 (66 年在位)", source_tier: "A" },
    { time: "约 1274 BCE", event: "Kadesh 战役 (vs Hittites)", source_tier: "A" },
    { time: "约 1259 BCE", event: "Hittite-Egyptian 和平条约", source_tier: "A" },
    { time: "约 1177 BCE", event: "Sea Peoples 入侵 (青铜崩溃，见 E10)", source_tier: "A" },
    { time: "约 1070 BCE", event: "新王国结束，进入第三中间期", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Hatshepsut",
      role: "女法老 (1479-1458 BCE)",
      contribution: "埃及最成功女统治者，22 年和平繁荣。Punt 远征建立海上贸易。",
      source_tier: "A"
    },
    {
      name: "Akhenaten",
      role: "法老 (1353-1336 BCE)",
      contribution: "推行历史上第一次一神教改革。死后被官方抹除，'异端国王'。",
      source_tier: "A"
    },
    {
      name: "Tutankhamun",
      role: "法老 (1332-1323 BCE, 9-19 岁)",
      contribution: "在位时不重要，但 1922 年完整未盗的墓被发现，让世界重新认识古埃及。",
      source_tier: "A"
    },
    {
      name: "Ramesses II",
      role: "法老 (1279-1213 BCE)",
      contribution: "'大帝' — 66 年在位，活到 90 岁，签世界最早和平条约，建 Abu Simbel。",
      source_tier: "A"
    },
    {
      name: "Howard Carter",
      role: "英国考古学家",
      contribution: "1922 年 11 月 4 日发现 Tutankhamun 墓 (Valley of the Kings KV62)。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "Akhenaten 的一神教改革虽然短命，但可能影响了后来犹太教 (摩西出埃及就在这个时期附近)。一神教 → 基督教 → 伊斯兰教都可追溯到这个思想种子。",
      reasoning: "Akhenaten 的 'Hymn to Aten' 与圣经 Psalm 104 文字结构高度相似。Freud 'Moses and Monotheism' 提出这个连接 (有争议但启发性)。",
      source_tier: "A",
      source: "Hornung 1999; Assmann 1997"
    },
    {
      claim: "Hittite-Egyptian 和平条约是 '国际关系' 的开端 — 两大强国意识到打不动了，签字和平共处。这是现代外交的雏形。",
      reasoning: "联合国总部展出复制品就是因为这点。3200 年前的智慧 — '战不胜，则和'。",
      source_tier: "A",
      source: "Edel 1997; UN.org"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'Cleopatra 和 Tutankhamun 是同时代'",
      right: "Cleopatra (51 BCE) 距离 Tutankhamun (1323 BCE) 有 1270 年 — 比她到我们 (2076 年) 还远。",
      source_tier: "A",
      source: "Britannica"
    },
    {
      wrong: "'Akhenaten 是 Tutankhamun 父亲'",
      right: "DNA 研究 (2010) 确认两者父子关系，但 Akhenaten 还有其他子女 (如 Smenkhkare)。",
      source_tier: "A",
      source: "Hawass et al. (2010). JAMA 303"
    }
  ],

  ai_tasks: [
    {
      task_id: "E06_Q1",
      prompt: "你是 Tutankhamun 时期的工匠，在帝王谷给法老挖墓。描述你的工作 — 要符合考古证据。",
      type: "creative_writing_with_facts",
      grading_criteria: ["铜凿子(无铁器)", "油灯照明", "Deir el-Medina 工人村", "罢工记录"]
    },
    {
      task_id: "E06_Q2",
      prompt: "如果你是 Ramesses II 的外交官，要去 Hattusa 跟 Hittite 谈判和平。你怎么开始？语言怎么沟通？",
      type: "role_play",
      grading_criteria: ["阿卡德语作为外交通用语", "礼物外交", "联姻"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要把不同时期法老混为一谈",
    "❌ 不要说 Akhenaten = 摩西 (这是争议性 Freud 假说)",
    "❌ Tutankhamun 墓的咒语 '法老的诅咒' 是 1920 年代媒体炒作",
    "✅ 区分 18 王朝 / 19 王朝 / 20 王朝"
  ],

  sources: [
    { tier: "A", citation: "Tyldesley (1996). Hatchepsut. Penguin." },
    { tier: "A", citation: "Hornung (1999). Akhenaten. Cornell." },
    { tier: "A", citation: "Reeves (1990). The Complete Tutankhamun. Thames & Hudson." },
    { tier: "A", citation: "Kitchen (1982). Pharaoh Triumphant. Aris & Phillips." }
  ]
},

// ════════════════════════════════════════════════════════════════
// E7 · 商朝 · 中国青铜文明 (~1600-1046 BCE)
// ════════════════════════════════════════════════════════════════
{
  node_id: "E07_shang_dynasty_china",
  title: "商朝 · 中国青铜文明 + 甲骨文",
  time_range: "约 1600–1046 BCE",
  core_question: "为什么中国的字 (汉字) 到今天还在用？甲骨文是怎么写的？",

  fact_base: [
    {
      fact: "甲骨文 (Oracle Bone Script) 约 1300 BCE 出现，刻在牛肩胛骨和龟甲上，用于占卜。已知约 5000 个字，约 1500 个被破译，是汉字直系祖先。",
      source_tier: "A",
      source: "Keightley, D.N. (1978). Sources of Shang History: The Oracle-Bone Inscriptions of Bronze Age China. UC Press."
    },
    {
      fact: "商代青铜器是中国艺术的巅峰。最大件 '后母戊鼎' (司母戊鼎，约 1200 BCE) 重 832.84 公斤，是现存最大商代青铜器。",
      source_tier: "A",
      source: "Bagley, R.W. (1987). Shang Ritual Bronzes in the Arthur M. Sackler Collections. Harvard"
    },
    {
      fact: "商朝最后首都殷墟 (Yinxu，今河南安阳) 1899 年被偶然发现，1928 年起系统发掘，至今出土 15 万片甲骨。UNESCO 世界遗产。",
      source_tier: "A",
      source: "Chang, K.C. (1980). Shang Civilization. Yale University Press."
    },
    {
      fact: "妇好 (Fu Hao) 是商王武丁 (Wu Ding) 王后，是有记载的中国最早女将军，曾率 13000 人征羌方。她的墓 1976 年完整出土，含 1928 件青铜+玉+骨器。",
      source_tier: "A",
      source: "Yang, X. (Ed.) (1999). Reflections of Early China: Decor, Pictographs, and Pictorial Inscriptions. Seattle Art Museum."
    },
    {
      fact: "商朝有大规模人殉 (human sacrifice)。殷墟王陵区出土 1200+ 殉葬人，多是战俘 (羌人)。这是青铜时代东亚普遍现象。",
      source_tier: "A",
      source: "Campbell, R.B. (2014). Archaeology of the Chinese Bronze Age. Cotsen"
    },
    {
      fact: "商朝由 '盘庚迁殷' (约 1300 BCE) 后稳定在殷地 200 多年，直到约 1046 BCE 被周武王 (Zhou) 在牧野之战击败。",
      source_tier: "A",
      source: "Li, F. (2013). Early China: A Social and Cultural History. Cambridge."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "3500 年前的中国，商朝人在用青铜做各种东西 — 鼎、爵、戈、剑。他们把字刻在牛骨头和龟壳上，用来问神 '今天打仗能赢吗?' '明年丰收吗?' 这就是甲骨文 — 中国汉字的爷爷。",
      tier: "B",
      ref: "国家博物馆 · 中国通史"
    },
    {
      lang: "zh",
      text: "你现在写的 '日' '月' '人' '王' 这些字，3300 年前的商朝人就在用了。其他古文明的字 (埃及象形文字、楔形文字、玛雅文字) 都死了，只有汉字一直传到今天。",
      tier: "B",
      ref: "DK 'Ancient China'"
    },
    {
      lang: "zh",
      text: "商朝有个超级厉害的女将军叫妇好，她带 13000 个兵打过仗。她的墓 1976 年被找到，里面有 200 件兵器和 700 件玉器。中国最早的女英雄。",
      tier: "B",
      ref: "Smithsonian"
    }
  ],

  map_points: [
    { id: "yinxu", name: "Yinxu 殷墟 (Anyang)", country: "中国河南", coords: [36.13, 114.30], significance: "商代晚期都城，甲骨文出土地", source_tier: "A" },
    { id: "erligang", name: "Erligang 二里岗 (Zhengzhou)", country: "中国河南", coords: [34.75, 113.66], significance: "商早期都城遗址", source_tier: "A" },
    { id: "erlitou", name: "Erlitou 二里头", country: "中国河南", coords: [34.71, 112.69], significance: "夏代/早商，最早 '中国' 雏形", source_tier: "A" },
    { id: "sanxingdui", name: "Sanxingdui 三星堆", country: "中国四川", coords: [31.00, 104.15], significance: "同期非商文化，独特青铜面具", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "后母戊鼎 (司母戊鼎)",
      held_at: "中国国家博物馆",
      date: "约 1200 BCE",
      tells_us: "832.84 公斤，世界最大青铜礼器。为商王祖庚祭母而铸。",
      source_tier: "A",
      source: "中国国家博物馆"
    },
    {
      name: "妇好墓出土物",
      held_at: "中国国家博物馆 + 河南博物院",
      date: "约 1200 BCE",
      tells_us: "1928 件随葬品，含青铜礼器 200+、玉器 750+、骨器、贝币 6900+。",
      source_tier: "A",
      source: "Yang 1999"
    },
    {
      name: "甲骨文片 (15 万片)",
      held_at: "中国国家图书馆、各大博物馆",
      date: "约 1250-1050 BCE",
      tells_us: "占卜记录 + 战争 + 天象 + 农作 + 王室谱系。最早系统化汉字。",
      source_tier: "A",
      source: "Keightley 1978"
    },
    {
      name: "三星堆青铜大立人 + 黄金面具",
      held_at: "三星堆博物馆",
      date: "约 1200 BCE",
      tells_us: "与中原商朝同期但风格完全不同，证明中国上古非单一文化。",
      source_tier: "A",
      source: "Bagley 2001"
    }
  ],

  key_events: [
    { time: "约 1900 BCE", event: "二里头文化 (可能是夏)", source_tier: "A" },
    { time: "约 1600 BCE", event: "商汤灭夏，商朝建立", source_tier: "A" },
    { time: "约 1300 BCE", event: "盘庚迁殷 (今安阳)", source_tier: "A" },
    { time: "约 1250 BCE", event: "武丁 + 妇好时期 (商朝鼎盛)", source_tier: "A" },
    { time: "约 1200 BCE", event: "甲骨文系统化使用", source_tier: "A" },
    { time: "约 1046 BCE", event: "牧野之战，周武王灭商", source_tier: "A" },
    { time: "1899 年 CE", event: "王懿荣发现甲骨文 (从中药 '龙骨' 上认出)", source_tier: "A" },
    { time: "1928 年 CE", event: "中央研究院开始系统发掘殷墟", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "武丁 (Wu Ding)",
      role: "商朝第 23 王 (约 1250-1192 BCE)",
      contribution: "商朝鼎盛时期君主，征讨四方，60+ 年在位。",
      source_tier: "A"
    },
    {
      name: "妇好 (Fu Hao)",
      role: "武丁王后、女将军 (约 1250 BCE)",
      contribution: "率军征羌方、土方等。中国最早有记载的女将军。",
      source_tier: "A"
    },
    {
      name: "纣王 (帝辛)",
      role: "商末代王 (约 1075-1046 BCE)",
      contribution: "传统上被描绘为暴君，但考古证据混合。被周武王在牧野之战击败。",
      source_tier: "A"
    },
    {
      name: "王懿荣",
      role: "清末学者 (1845-1900)",
      contribution: "1899 年偶然在中药 '龙骨' 上发现甲骨文，开启商代研究。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "汉字是世界上唯一从青铜时代延续至今 (3300+ 年) 的文字系统。甲骨文 → 金文 → 篆 → 隶 → 楷，一脉相承。",
      reasoning: "对比：埃及象形文字、楔形文字、玛雅文字都已死亡 (虽然被破译)。汉字让中国文化保持 3000 年的'同一书写传统'。",
      source_tier: "A",
      source: "Keightley 1978; Li 2013"
    },
    {
      claim: "中国 (商) 与西亚 (Hittite/Egypt) 同时期但独立发展。证明 '文明' 是人类多次独立发明，不是单一起源。",
      reasoning: "商代独立发明青铜礼器、汉字、车战 (但战马可能从西方传入)。三星堆显示中国内部也是多源。",
      source_tier: "A",
      source: "Bagley 2001; Chang 1980"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'夏朝是确证存在的'",
      right: "二里头文化与传说中的夏在时间地点上吻合，但没有同期文字证据。学界尚未一致认定。",
      source_tier: "A",
      source: "Liu, L. & Chen, X. (2012). Archaeology of China. Cambridge."
    },
    {
      wrong: "'商朝甲骨文是中国最早文字'",
      right: "可能还有更早 (二里头的刻符)，但成体系的最早是甲骨文。陶文符号 (约 4000 BCE) 是否是文字仍有争议。",
      source_tier: "A",
      source: "Keightley 1978"
    }
  ],

  ai_tasks: [
    {
      task_id: "E07_Q1",
      prompt: "你是 3200 年前殷墟的卜官 (占卜师)。商王要问 '明天打仗能不能赢'。你怎么做？描述整个流程。",
      type: "role_play",
      grading_criteria: ["龟甲/牛骨", "刻问题", "火烧", "看裂纹", "记结果"]
    },
    {
      task_id: "E07_Q2",
      prompt: "为什么汉字能传 3000 年不死，而其他古文字 (埃及象形文字、楔形文字) 都死了？",
      type: "concept_check",
      grading_criteria: ["表意 vs 表音", "文化连续性", "官方文书统一"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要把夏当 '已证实历史'",
    "❌ 不要说 '甲骨文是 4000 年前的' — 是 3300 年前",
    "❌ 不要把商和周混为一谈 — 周武王灭商在 1046 BCE",
    "✅ 区分商早期 (二里岗) / 商晚期 (殷墟)"
  ],

  sources: [
    { tier: "A", citation: "Keightley (1978). Sources of Shang History. UC Press." },
    { tier: "A", citation: "Chang (1980). Shang Civilization. Yale." },
    { tier: "A", citation: "Li (2013). Early China. Cambridge." },
    { tier: "A", citation: "Bagley (1987). Shang Ritual Bronzes. Harvard." },
    { tier: "A", citation: "中国国家博物馆", url: "http://www.chnmuseum.cn/" }
  ]
},

// ════════════════════════════════════════════════════════════════
// E8 · 米诺斯 + 迈锡尼 · 爱琴海文明 (~2000-1100 BCE)
// ════════════════════════════════════════════════════════════════
{
  node_id: "E08_minoan_mycenaean",
  title: "米诺斯 + 迈锡尼 · 爱琴海双子文明",
  time_range: "约 2000–1100 BCE",
  core_question: "为什么希腊神话里有 '迷宫和牛头怪'？荷马的《伊利亚特》是真的吗？",

  fact_base: [
    {
      fact: "米诺斯 (Minoan) 文明 (约 2000-1450 BCE) 在 Crete 岛繁荣，是欧洲第一个先进文明。Knossos 宫殿 (约 1700 BCE) 占地 1.4 万平方米，超 1300 间房。",
      source_tier: "A",
      source: "Castleden, R. (2002). Minoans: Life in Bronze Age Crete. Routledge"
    },
    {
      fact: "米诺斯壁画展示斗牛、海豚、女性祭司、采花女孩 — 看不到大规模战争场景，与同期 Hittite/Egypt 形成对比。可能是相对和平的海上贸易文明。",
      source_tier: "A",
      source: "Sherratt, S. (1994). The Aegean Bronze Age. Annual Review of Anthropology"
    },
    {
      fact: "约 1628 BCE Thera (Santorini) 火山大爆发 (VEI 7)，是人类历史第二大火山事件。火山灰沉积层证据从北极到中国都能找到。直接重创米诺斯文明。",
      source_tier: "A",
      source: "Friedrich et al. (2006). Santorini Eruption Radiocarbon Dated to 1627-1600 BC. Science 312."
    },
    {
      fact: "迈锡尼 (Mycenaean) 文明 (约 1600-1100 BCE) 是希腊本土青铜文明。Mycenae 城以 '狮门' 闻名。1876 年 Heinrich Schliemann 发掘出 '阿伽门农面具' (实际比阿伽门农早 300 年)。",
      source_tier: "A",
      source: "Schofield, L. (2007). The Mycenaeans. British Museum Press"
    },
    {
      fact: "Linear B 文字 (约 1450 BCE) 是迈锡尼希腊语的最早形式 — 1952 年 Michael Ventris 破译后证明这是希腊语祖先，比荷马早 700 年。",
      source_tier: "A",
      source: "Chadwick, J. (1958). The Decipherment of Linear B. Cambridge."
    },
    {
      fact: "Linear A (米诺斯文字) 至今未破译。我们不知道米诺斯人说什么语言。",
      source_tier: "A",
      source: "Younger, J. (2003). The Aegean Bronze Age Scripts. Aegean.net"
    },
    {
      fact: "特洛伊战争 (约 1200 BCE) 可能是真实事件 — Hisarlik (土耳其) 第 7 层考古显示城市被破坏后焚烧。但具体细节 (海伦、阿喀琉斯) 是后世神话化。",
      source_tier: "A",
      source: "Korfmann, M. (2004). Was There a Trojan War? Archaeology Magazine"
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "希腊神话里有个故事：克里特岛上有个迷宫，里面住着半人半牛的米诺陶。这不是完全瞎编的 — 4000 年前真的有 '米诺斯人' 住在克里特岛，他们的 Knossos 宫殿有 1300 多个房间，走进去真的会迷路！",
      tier: "B",
      ref: "DK 'Greek Myths'"
    },
    {
      lang: "zh",
      text: "他们和后来的希腊人不一样 — 喜欢画海豚、采花、跳过牛背。考古学家发现他们的画里没有大规模战争。可能是一个比较和平的航海民族。",
      tier: "B",
      ref: "British Museum Kids · Minoan"
    },
    {
      lang: "zh",
      text: "3600 年前桑托里尼火山大爆发，几乎毁了米诺斯文明。这可能是 '亚特兰蒂斯' 传说的真实原型 — 一个发达的岛屿文明在一夜之间消失。",
      tier: "B",
      ref: "NatGeo Kids 'Atlantis'"
    }
  ],

  map_points: [
    { id: "knossos", name: "Knossos", country: "希腊 Crete", coords: [35.30, 25.16], significance: "米诺斯最大宫殿，'迷宫' 原型", source_tier: "A" },
    { id: "akrotiri", name: "Akrotiri (Santorini)", country: "希腊", coords: [36.35, 25.40], significance: "米诺斯庞贝 — 火山灰下保存完整", source_tier: "A" },
    { id: "mycenae", name: "Mycenae", country: "希腊", coords: [37.73, 22.75], significance: "迈锡尼文明中心，狮门所在", source_tier: "A" },
    { id: "troy", name: "Troy (Hisarlik)", country: "土耳其", coords: [39.96, 26.24], significance: "特洛伊战争遗址", source_tier: "A" },
    { id: "pylos", name: "Pylos", country: "希腊", coords: [36.91, 21.69], significance: "Nestor 宫殿，Linear B 泥板出土", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Knossos '跳牛' 壁画 (Bull-Leaping Fresco)",
      held_at: "Heraklion Archaeological Museum",
      date: "约 1500 BCE",
      tells_us: "三个青年跳过冲来的公牛，可能是仪式/运动。展示米诺斯艺术活力。",
      source_tier: "A",
      source: "Castleden 2002"
    },
    {
      name: "Mask of Agamemnon",
      held_at: "Athens National Archaeological Museum",
      date: "约 1550 BCE",
      tells_us: "黄金死亡面具，迈锡尼王陵出土。Schliemann 误以为是阿伽门农 — 实际早 350 年。",
      source_tier: "A",
      source: "Schofield 2007"
    },
    {
      name: "Lion Gate (狮门)",
      held_at: "Mycenae 原址",
      date: "约 1250 BCE",
      tells_us: "迈锡尼城门，两只对立狮子 — 欧洲最早大型石雕建筑装饰之一。",
      source_tier: "A",
      source: "Schofield 2007"
    },
    {
      name: "Linear B 泥板 (Pylos 出土)",
      held_at: "希腊各大博物馆",
      date: "约 1200 BCE",
      tells_us: "希腊语最早记录。多是宫廷库存清单 — 油、羊、青铜、奴隶。",
      source_tier: "A",
      source: "Chadwick 1958"
    }
  ],

  key_events: [
    { time: "约 2000 BCE", event: "Crete 米诺斯文明开始 (Old Palace 期)", source_tier: "A" },
    { time: "约 1700 BCE", event: "Old Palace 被地震毁，重建为 New Palace (Knossos 鼎盛)", source_tier: "A" },
    { time: "约 1628 BCE", event: "Thera/Santorini 火山大爆发", source_tier: "A" },
    { time: "约 1600 BCE", event: "迈锡尼希腊本土兴起 (Mycenae 竖井墓)", source_tier: "A" },
    { time: "约 1450 BCE", event: "Knossos 被迈锡尼希腊人占领，Linear B 开始使用", source_tier: "A" },
    { time: "约 1200 BCE", event: "特洛伊战争 (Troy VII 层被毁)", source_tier: "A" },
    { time: "约 1100 BCE", event: "迈锡尼文明崩溃，希腊进入 '黑暗时代' (Greek Dark Ages)", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Minoans (米诺斯人)",
      role: "Crete 海上文明",
      contribution: "欧洲第一个先进文明，海上贸易、艺术、宫殿建筑。",
      source_tier: "A"
    },
    {
      name: "Mycenaeans (迈锡尼人)",
      role: "希腊本土青铜文明",
      contribution: "希腊语祖先，'希腊神话英雄时代' 历史原型。",
      source_tier: "A"
    },
    {
      name: "Heinrich Schliemann",
      role: "德国考古学家 (1822-1890)",
      contribution: "发掘 Troy 和 Mycenae，证明荷马史诗有历史依据。方法学差但发现重大。",
      source_tier: "A"
    },
    {
      name: "Arthur Evans",
      role: "英国考古学家 (1851-1941)",
      contribution: "发掘 Knossos，命名 '米诺斯' (来自 Minos 王神话)，重建 (有争议) 宫殿。",
      source_tier: "A"
    },
    {
      name: "Michael Ventris",
      role: "英国建筑师 (1922-1956)",
      contribution: "1952 年破译 Linear B，证明是希腊语。29 岁解开学界 50 年悬案。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "希腊神话不是凭空编的 — 米诺斯迷宫、阿伽门农、特洛伊都有真实历史原型。神话是 '半记忆+半艺术' 的传承。",
      reasoning: "Schliemann 用《伊利亚特》当地图找到 Troy；Knossos 1300+ 房间确实像迷宫。神话保存了 1000 年的集体记忆。",
      source_tier: "A",
      source: "Korfmann 2004"
    },
    {
      claim: "迈锡尼崩溃 + 希腊黑暗时代 (1100-800 BCE) 让希腊文字、艺术、贸易全部退化。之后才进入古典希腊 (柏拉图、亚里士多德的时代)。",
      reasoning: "这告诉我们文明可以倒退 — 不是一直进步的。崩溃后重建出来的可以完全不同。",
      source_tier: "A",
      source: "Cline, E.H. (2014). 1177 B.C.: The Year Civilization Collapsed. Princeton."
    }
  ],

  common_misconceptions: [
    {
      wrong: "'米诺斯人是希腊人的祖先'",
      right: "米诺斯人语言未解，可能不是希腊语。希腊语祖先是迈锡尼人 — 后期才占领 Crete。",
      source_tier: "A",
      source: "Chadwick 1958"
    },
    {
      wrong: "'阿伽门农面具真是阿伽门农的'",
      right: "Schliemann 找到时认为是，但实际比特洛伊战争早 350 年。是更早的迈锡尼王。",
      source_tier: "A",
      source: "Schofield 2007"
    }
  ],

  ai_tasks: [
    {
      task_id: "E08_Q1",
      prompt: "你是 3600 年前 Akrotiri (Santorini) 的居民。火山开始震动，你怎么办？要符合考古证据 — 这个岛上的人确实在火山爆发前撤退了。",
      type: "role_play",
      grading_criteria: ["提前撤退", "船只", "财物如何取舍", "无人骨遗留"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要把米诺斯和迈锡尼混为一谈",
    "❌ Linear A 至今未破译，不要编造翻译",
    "❌ 不要说 '亚特兰蒂斯就是米诺斯' — 这只是学界猜想之一",
    "✅ 区分时间：米诺斯 (2000-1450) → 迈锡尼 (1600-1100) → 黑暗时代 → 古典希腊"
  ],

  sources: [
    { tier: "A", citation: "Castleden (2002). Minoans. Routledge." },
    { tier: "A", citation: "Schofield (2007). The Mycenaeans. British Museum." },
    { tier: "A", citation: "Chadwick (1958). The Decipherment of Linear B. Cambridge." },
    { tier: "A", citation: "Cline (2014). 1177 B.C. Princeton." }
  ]
},

// ════════════════════════════════════════════════════════════════
// E9 · 赫梯帝国 · 铁器先驱 (~1600-1180 BCE)
// ════════════════════════════════════════════════════════════════
{
  node_id: "E09_hittite_empire",
  title: "赫梯 · 铁器与战车之国",
  time_range: "约 1600–1180 BCE",
  core_question: "为什么我们小时候不知道 Hittite？但他们是青铜时代第二强大的帝国",

  fact_base: [
    {
      fact: "Hittite 帝国 (今土耳其中部) 是青铜时代后期 (约 1400-1200 BCE) 唯一能与埃及抗衡的力量。Hattusa 首都 (约 1400 BCE) 占地 1.8 平方公里。",
      source_tier: "A",
      source: "Bryce, T. (2005). The Kingdom of the Hittites. Oxford University Press."
    },
    {
      fact: "Hittite 是已知最早系统化使用铁器的文明 (约 1400 BCE)，但还是稀有奢侈品 — 不是大规模武器化。真正的铁器时代是青铜崩溃 (1200 BCE) 之后。",
      source_tier: "A",
      source: "Yalçın, Ü. (1999). Early Iron Metallurgy in Anatolia. Anatolian Studies 49"
    },
    {
      fact: "Hittite 战车是青铜时代最先进的：三人战车 (驾驭+射箭+持盾)，比埃及战车 (两人) 重，但不如埃及的灵活。Kadesh 战役双方都用上千辆。",
      source_tier: "A",
      source: "Drews, R. (1993). The End of the Bronze Age. Princeton."
    },
    {
      fact: "Hittite 语 (Hittite) 是已知最早的印欧语系语言 — 与梵语、希腊语、拉丁语、英语同源。1915 年 Bedřich Hrozný 破译。",
      source_tier: "A",
      source: "Hoffner, H.A. & Melchert, H.C. (2008). A Grammar of the Hittite Language. Eisenbrauns"
    },
    {
      fact: "Hittite 法律比汉谟拉比法典更人道 — 用罚款代替肉刑，对奴隶有保护条款。约 200 条法律保存下来。",
      source_tier: "A",
      source: "Hoffner, H.A. (1997). The Laws of the Hittites. Brill"
    },
    {
      fact: "Hittite 帝国约 1180 BCE 突然崩溃 — Hattusa 被烧毁，可能是 Sea Peoples (海上民族) + 内乱 + 气候。从此 Hittite 文明从历史上彻底消失，直到 1834 年才被重新发现。",
      source_tier: "A",
      source: "Bryce 2005; Cline 2014"
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "Hittite (赫梯) 是 3500 年前住在土耳其中部的一个超级强大帝国。他们能跟埃及法老打平手 — 历史上第一次 '两个超级大国签和平条约' 就是埃及和赫梯之间。",
      tier: "B",
      ref: "DK 'Ancient World'"
    },
    {
      lang: "zh",
      text: "他们是最早会做铁器的人。但当时铁还很贵，只有国王能用。直到他们的帝国消失后，铁器才传到全世界 — 这就是 '铁器时代' 的开始。",
      tier: "B",
      ref: "NatGeo Kids"
    },
    {
      lang: "zh",
      text: "赫梯人后来突然消失了 — 整个帝国只用了几十年就完全没了。考古学家直到 200 年前才在土耳其找到他们的遗迹，重新认识这个被遗忘的强国。",
      tier: "B",
      ref: "British Museum"
    }
  ],

  map_points: [
    { id: "hattusa", name: "Hattusa", country: "土耳其", coords: [40.02, 34.62], significance: "赫梯首都，狮门 + 国王门", source_tier: "A" },
    { id: "kadesh2", name: "Kadesh", country: "叙利亚", coords: [34.57, 36.52], significance: "Hittite vs Egypt 战役 (1274 BCE)", source_tier: "A" },
    { id: "yazilikaya", name: "Yazılıkaya", country: "土耳其", coords: [40.02, 34.63], significance: "赫梯露天神庙，神祇浮雕", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Hittite 国王门 (King's Gate) 浮雕",
      held_at: "Hattusa 原址 + Ankara 博物馆",
      date: "约 1400 BCE",
      tells_us: "战神/国王浮雕，戴尖头盔持斧。展示赫梯战争艺术。",
      source_tier: "A",
      source: "Bryce 2005"
    },
    {
      name: "Hittite 法律泥板",
      held_at: "Istanbul Archaeology Museum",
      date: "约 1500-1200 BCE",
      tells_us: "约 200 条法律，比汉谟拉比法典更注重赔偿而非报复。",
      source_tier: "A",
      source: "Hoffner 1997"
    },
    {
      name: "Yazılıkaya 神庙浮雕",
      held_at: "原址",
      date: "约 1230 BCE",
      tells_us: "天然岩石神庙，刻 64 个赫梯神祇游行 — 整个赫梯万神殿全家福。",
      source_tier: "A",
      source: "Seeher, J. (2011). Gods Carved in Stone. Ege Yayınları"
    },
    {
      name: "Kadesh 和平条约 (银版)",
      held_at: "Istanbul Archaeology Museum",
      date: "约 1259 BCE",
      tells_us: "Hittite 版本，与埃及版本互证。最早外交条约。",
      source_tier: "A",
      source: "Edel 1997"
    }
  ],

  key_events: [
    { time: "约 1650 BCE", event: "Hattusili I 建立 Old Hittite 王国", source_tier: "A" },
    { time: "约 1595 BCE", event: "Hittite 国王 Mursili I 洗劫巴比伦", source_tier: "A" },
    { time: "约 1400 BCE", event: "New Kingdom (Hittite 帝国时期) 开始", source_tier: "A" },
    { time: "约 1274 BCE", event: "Kadesh 战役 (vs Egypt)", source_tier: "A" },
    { time: "约 1259 BCE", event: "Hittite-Egypt 和平条约", source_tier: "A" },
    { time: "约 1180 BCE", event: "Hattusa 被烧毁，Hittite 帝国突然崩溃", source_tier: "A" },
    { time: "1834 年 CE", event: "Charles Texier 发现 Hattusa 遗迹", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Hattusili I",
      role: "Old Hittite 创建者 (约 1650 BCE)",
      contribution: "建立 Hattusa 首都，奠定 Hittite 帝国基础。",
      source_tier: "A"
    },
    {
      name: "Suppiluliuma I",
      role: "Hittite 大王 (约 1344-1322 BCE)",
      contribution: "扩张 Hittite 到帝国规模，他的儿子 Zannanza 差点娶 Tutankhamun 寡妻成为埃及法老 (途中被杀)。",
      source_tier: "A"
    },
    {
      name: "Muwatalli II",
      role: "Hittite 王 (Kadesh 战役统帅)",
      contribution: "约 1274 BCE 与 Ramesses II 打平。",
      source_tier: "A"
    },
    {
      name: "Hattusili III + Puduhepa 王后",
      role: "Hittite 王/后 (约 1267-1237 BCE)",
      contribution: "签 Egypt 和平条约。Puduhepa 是有大量书信留下的强势女政治家。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "Hittite 是 '被遗忘的超级大国' 的典型 — 提醒我们历史叙事被胜利者塑造。古希腊罗马不写他们，圣经只提一两句，所以 3000 年没人知道。",
      reasoning: "如果不是 1834 年的偶然发现 + 1915 年破译，我们到今天还以为青铜时代只有埃及/巴比伦。",
      source_tier: "C",
      ref: "课程设计"
    },
    {
      claim: "Hittite 印欧语是欧洲所有现代语言的'最早可考亲戚'。英语 '兄弟 brother'、Hittite 'b r a t e r'、梵语 'bhrātṛ' 同源。",
      reasoning: "证明史前有一个 'Proto-Indo-European' 母语族群，约 6000 年前从某地扩散，到达欧洲、伊朗、印度、安纳托利亚。",
      source_tier: "A",
      source: "Anthony, D.W. (2007). The Horse, the Wheel, and Language. Princeton."
    }
  ],

  common_misconceptions: [
    {
      wrong: "'Hittite 是希腊神话里的赫梯人'",
      right: "圣经里的 Hittites 可能与这个青铜帝国不是同一群人 (晚千年的 Levantine 居民)。学术上仍有争议。",
      source_tier: "A",
      source: "Bryce 2005"
    }
  ],

  ai_tasks: [
    {
      task_id: "E09_Q1",
      prompt: "你是 3300 年前 Hittite 战车上的射手。Kadesh 战场上你看到 5000 辆埃及战车冲过来。描述你的感受和战斗过程。",
      type: "creative_writing_with_facts",
      grading_criteria: ["三人战车", "青铜弓箭", "战场地形 (Orontes 河)", "战车阵型"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 Hittite 是 '铁器时代的国家' — 他们是青铜时代末期，铁还是稀有",
    "❌ 不要把 Hittite 和 Hattians (前居民) 混淆",
    "✅ 区分 Old Kingdom (1650-1500) / Middle (1500-1400) / New Kingdom (1400-1180)"
  ],

  sources: [
    { tier: "A", citation: "Bryce (2005). The Kingdom of the Hittites. Oxford." },
    { tier: "A", citation: "Hoffner & Melchert (2008). A Grammar of Hittite. Eisenbrauns." },
    { tier: "A", citation: "Anthony (2007). The Horse, the Wheel, and Language. Princeton." }
  ]
},

// ════════════════════════════════════════════════════════════════
// E10 · 青铜崩溃 · 1177 BCE · 第一次世界大崩溃
// ════════════════════════════════════════════════════════════════
{
  node_id: "E10_bronze_age_collapse",
  title: "青铜崩溃 · 1177 BCE · 文明的一次大死亡",
  time_range: "约 1200–1150 BCE",
  core_question: "为什么 50 年内 8 个大文明同时崩溃？这是人类历史上第一次 '全球化崩盘'？",

  fact_base: [
    {
      fact: "约 1200-1150 BCE，地中海东部 8 个主要文明在 50 年内同时崩溃或重创：Hittite 帝国消失、埃及新王国衰落、迈锡尼希腊崩溃、Ugarit + Hazor + Megiddo 被毁、巴比伦 Kassite 王朝灭亡、Elamite 衰退、Cyprus 被烧。",
      source_tier: "A",
      source: "Cline, E.H. (2014). 1177 B.C.: The Year Civilization Collapsed. Princeton University Press."
    },
    {
      fact: "Sea Peoples (海上民族) 是这场崩溃的最有名 '凶手'，但他们可能更多是 '气候难民' 而非有组织的入侵者。Ramesses III (约 1177 BCE) 击退他们的 Medinet Habu 神庙浮雕是主要证据。",
      source_tier: "A",
      source: "Knapp, A.B. & Manning, S.W. (2016). Crisis in Context: The End of the Late Bronze Age. AJA 120(1)"
    },
    {
      fact: "气候证据：花粉和湖泊沉积显示约 1250-1100 BCE 地中海东部出现 150 年大旱。Hittite 给埃及写信 '我们没有粮食，请送'。",
      source_tier: "A",
      source: "Kaniewski et al. (2013). Environmental Roots of the Late Bronze Age Crisis. PLOS ONE 8(8)"
    },
    {
      fact: "崩溃后 '黑暗时代' 持续 300-500 年。希腊在迈锡尼崩溃后丢失文字 (Linear B)，到约 800 BCE 才用腓尼基字母重新学会写字。",
      source_tier: "A",
      source: "Cline 2014; Snodgrass, A. (1971). The Dark Age of Greece. Edinburgh"
    },
    {
      fact: "Ugarit (今叙利亚) 是被毁的最完整文明 — 出土最后一刻泥板：'船来了！敌人放火烧我们的城！' 写到一半就被中断。",
      source_tier: "A",
      source: "Yon, M. (2006). The City of Ugarit at Tell Ras Shamra. Eisenbrauns"
    },
    {
      fact: "唯一幸存的青铜大国是埃及 — 但严重衰落。其他文明完全重建或被新民族取代 (希腊 → 多利安人；Levant → 腓尼基人/以色列人；Anatolia → 弗里吉亚人)。",
      source_tier: "A",
      source: "Cline 2014; Drews 1993"
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "3200 年前发生了人类历史上第一次 '世界大崩溃'。短短 50 年里，地中海周围 8 个大文明同时灭亡 — Hittite 没了，迈锡尼没了，埃及差点没了。",
      tier: "B",
      ref: "DK 'The Ancient World'"
    },
    {
      lang: "zh",
      text: "为什么会这样？现在科学家认为是 '完美风暴' — 几件事一起发生：连续 100 多年大旱、地震多、瘟疫、Sea Peoples 难民四处掠夺、贸易系统崩盘。一个文明出问题就传染给其他文明。",
      tier: "B",
      ref: "NatGeo Kids 'Bronze Age Collapse'"
    },
    {
      lang: "zh",
      text: "之后地中海进入 '黑暗时代' 300-500 年 — 文字消失、艺术倒退、人口大减。希腊人到 2800 年前才重新学会写字 (从腓尼基人那里学的)。",
      tier: "B",
      ref: "British Museum"
    }
  ],

  map_points: [
    { id: "ugarit", name: "Ugarit (Ras Shamra)", country: "叙利亚", coords: [35.60, 35.78], significance: "崩溃中被毁的最完整城市，最后泥板出土", source_tier: "A" },
    { id: "medinet_habu", name: "Medinet Habu", country: "埃及", coords: [25.72, 32.60], significance: "Ramesses III 击退 Sea Peoples 浮雕", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Medinet Habu Sea Peoples 浮雕",
      held_at: "Luxor 原址",
      date: "约 1175 BCE",
      tells_us: "Ramesses III 神庙墙上刻 '尼罗河三角洲海战'，敌人有 Peleset, Tjeker, Shekelesh, Denyen 五族。",
      source_tier: "A",
      source: "Sandars, N.K. (1985). The Sea Peoples. Thames & Hudson"
    },
    {
      name: "Ugarit 最后泥板 '紧急求救信'",
      held_at: "Louvre + Damascus",
      date: "约 1190 BCE",
      tells_us: "'敌船 7 艘来了，烧我城...' 写到一半被中断 (没烧完的窑里)。",
      source_tier: "A",
      source: "Yon 2006"
    },
    {
      name: "Hittite-Ugarit 求粮书信",
      held_at: "Louvre",
      date: "约 1200 BCE",
      tells_us: "Hittite 王给 Ugarit 写 '我国饥荒，速送粮食，否则我国亡'。气候危机第一手证据。",
      source_tier: "A",
      source: "Cline 2014"
    }
  ],

  key_events: [
    { time: "约 1250 BCE", event: "干旱开始，Hittite 求粮", source_tier: "A" },
    { time: "约 1207 BCE", event: "Merneptah 法老击退第一波 Sea Peoples + Libyans", source_tier: "A" },
    { time: "约 1200 BCE", event: "迈锡尼 + Hattusa 第一波被毁", source_tier: "A" },
    { time: "约 1190 BCE", event: "Ugarit 被毁，泥板中断", source_tier: "A" },
    { time: "约 1180 BCE", event: "Hittite 帝国彻底瓦解", source_tier: "A" },
    { time: "约 1177 BCE", event: "Ramesses III 击退第二波 Sea Peoples (E. Cline 的书名)", source_tier: "A" },
    { time: "约 1100 BCE", event: "迈锡尼最后一座宫殿被毁，希腊黑暗时代开始", source_tier: "A" },
    { time: "约 1070 BCE", event: "埃及新王国结束", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Ramesses III",
      role: "埃及法老 (约 1186-1155 BCE)",
      contribution: "最后一位 '伟大' 法老。击退 Sea Peoples 两次，但帝国从此衰落。",
      source_tier: "A"
    },
    {
      name: "Sea Peoples (海上民族)",
      role: "多族群难民/掠夺者",
      contribution: "包括 Peleset (后来 Philistines / 巴勒斯坦地名来源)、Tjeker、Shekelesh、Denyen、Weshesh。",
      source_tier: "A"
    },
    {
      name: "Eric H. Cline",
      role: "美国考古学家 (现代)",
      contribution: "《1177 B.C.: The Year Civilization Collapsed》(2014) 提出 '系统性崩溃' 理论 — 不是单一原因。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "青铜崩溃是 '系统性崩溃' (systems collapse) 的最早案例 — 各文明相互依赖太深，一个倒了就连锁倒。这预示了现代全球化的脆弱。",
      reasoning: "青铜需要从 Cyprus 进铜、Afghanistan 进锡。任何一段贸易断了，所有军队失去武器。气候+战争+贸易断+难民潮，相互放大。",
      source_tier: "A",
      source: "Cline 2014"
    },
    {
      claim: "崩溃催生了新事物：腓尼基字母 (彻底简化的拼音文字) 在崩溃后兴起，让 '识字' 不再是少数贵族的特权。这是民主和大众文化的基础。",
      reasoning: "之前楔形文字、象形文字都要学几百到上千符号，只有专业抄写员能学会。22 个字母的腓尼基字母让普通商人都能学。希腊字母、拉丁字母、希伯来字母、阿拉伯字母全部源自此。",
      source_tier: "A",
      source: "Naveh, J. (1982). Early History of the Alphabet. Magnes"
    },
    {
      claim: "铁器时代是崩溃的副产品 — 青铜的国际贸易断了 (没了锡)，人们被迫用本地铁矿。铁比青铜便宜得多，让普通农民也能有铁犁、铁刀。",
      reasoning: "青铜需要稀有的锡 (Afghanistan、康沃尔)。铁矿到处都是。铁器时代实际让 '工具民主化'。",
      source_tier: "A",
      source: "Drews 1993; Snodgrass 1971"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'Sea Peoples 单独造成了青铜崩溃'",
      right: "Sea Peoples 更像是症状不是原因。气候干旱 + 内部不稳 + 贸易中断综合作用。",
      source_tier: "A",
      source: "Cline 2014"
    },
    {
      wrong: "'青铜崩溃是人类历史上唯一一次大崩溃'",
      right: "罗马崩溃 (5 世纪)、玛雅崩溃 (9 世纪) 都是类似的系统性崩溃。",
      source_tier: "A",
      source: "Tainter, J. (1988). The Collapse of Complex Societies. Cambridge"
    }
  ],

  ai_tasks: [
    {
      task_id: "E10_Q1",
      prompt: "你是 3200 年前 Ugarit 的国王。你收到求救信：'敌船 7 艘从海上来了'。你只有 200 个士兵。其他大国 (Hittite, Egypt) 都自顾不暇。你怎么办？",
      type: "decision_simulation",
      grading_criteria: ["疏散平民", "防守 vs 撤退", "外交求援", "面对系统性崩溃的无力感"]
    },
    {
      task_id: "E10_Q2",
      prompt: "青铜崩溃和今天的 '全球化' 有什么相似的地方？想想：如果世界突然 '断电' 100 年，会发生什么？",
      type: "concept_check",
      grading_criteria: ["系统脆弱性", "互相依赖", "气候因素", "技术倒退"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要把 Sea Peoples 当单一族群",
    "❌ 不要说 Ramesses III '完全击败' Sea Peoples — 他赢了战役但帝国还是衰落",
    "❌ 不要把所有崩溃归因单一原因 (气候、战争、瘟疫)",
    "✅ 强调 '系统性崩溃' (systems collapse) 概念"
  ],

  sources: [
    { tier: "A", citation: "Cline (2014). 1177 B.C. Princeton." },
    { tier: "A", citation: "Drews (1993). The End of the Bronze Age. Princeton." },
    { tier: "A", citation: "Kaniewski et al. (2013). PLOS ONE 8(8)." },
    { tier: "A", citation: "Tainter (1988). The Collapse of Complex Societies. Cambridge." },
    { tier: "B", citation: "DK 'The Ancient World'" }
  ]
}

]; // EARLY_CIV_KB 结束

// ════════════════════════════════════════════════════════════════
// 注册到全局
// ════════════════════════════════════════════════════════════════
if (typeof window !== 'undefined') {
  window.EARLY_CIV_KB = EARLY_CIV_KB;
}

// 索引化 (与 prehistoric_kb.js 同样的索引结构)
const EARLY_CIV_KB_INDEX = (() => {
  const idx = [];
  EARLY_CIV_KB.forEach(node => {
    idx.push({
      type: 'node', node_id: node.node_id, era_hint: node.node_id,
      title: node.title, body: node.core_question,
      keywords: [node.title, node.time_range, node.core_question]
    });
    (node.fact_base || []).forEach((f, i) => {
      idx.push({
        type: 'fact', node_id: node.node_id, era_hint: node.node_id,
        title: `${node.title} · 事实 ${i+1}`,
        body: f.fact, source_tier: f.source_tier, source: f.source,
        keywords: [f.fact]
      });
    });
    (node.map_points || []).forEach(m => {
      idx.push({
        type: 'map_point', node_id: node.node_id, era_hint: node.node_id,
        title: m.name, body: `${m.country} · ${m.significance}`,
        coords: m.coords, keywords: [m.name, m.country, m.significance]
      });
    });
    (node.evidence_objects || []).forEach(ev => {
      idx.push({
        type: 'evidence', node_id: node.node_id, era_hint: node.node_id,
        title: ev.name, body: `${ev.date} · ${ev.tells_us}`,
        source: ev.source, source_tier: ev.source_tier,
        keywords: [ev.name, ev.held_at, ev.tells_us]
      });
    });
    (node.key_events || []).forEach(ev => {
      idx.push({
        type: 'event', node_id: node.node_id, era_hint: node.node_id,
        title: `${ev.time} · ${ev.event}`, body: ev.event,
        keywords: [ev.time, ev.event]
      });
    });
    (node.common_misconceptions || []).forEach(m => {
      idx.push({
        type: 'misconception', node_id: node.node_id, era_hint: node.node_id,
        title: `误解：${m.wrong}`, body: m.right,
        source: m.source, source_tier: m.source_tier,
        keywords: [m.wrong, m.right]
      });
    });
  });
  return idx;
})();

if (typeof window !== 'undefined') {
  window.EARLY_CIV_KB_INDEX = EARLY_CIV_KB_INDEX;
  console.log('[EARLY_CIV_KB] loaded', EARLY_CIV_KB.length, 'nodes,', EARLY_CIV_KB_INDEX.length, 'index entries');
}
