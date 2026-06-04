// ════════════════════════════════════════════════════════════════
// 🧠 史前文明深度知识库 · Prehistoric Deep Knowledge Base
// 10 节点 P01–P10，按时间顺序，统一 JSON schema
// 资料来源分级:
//   A = 博物馆/大学/Britannica/UNESCO/Smithsonian/Nature/Science
//   B = DK / NatGeo Kids / 博物馆儿童教育
//   C = 课程设计/AI任务/作品集
//   D = 禁止 (短视频/营销文/AI 编造)
// ════════════════════════════════════════════════════════════════

const PREHISTORIC_KB = [

// ════════════════════════════════════════════════════════════════
{
  node_id: "P01_homo_sapiens_origin",
  title: "约30万年前：现代人类的出现",
  time_range: "约315,000–50,000 年前 (315 kya – 50 kya)",
  core_question: "什么是现代人类 (Homo sapiens) ？我们从哪里来？为什么不是从黑猩猩直接变来的？",

  fact_base: [
    {
      fact: "目前已知最早的智人化石是摩洛哥 Jebel Irhoud 出土的颅骨，距今约 315,000 年（315 ± 34 ka）。",
      source_tier: "A",
      source: "Hublin, J-J. et al. (2017). New fossils from Jebel Irhoud, Morocco and the pan-African origin of Homo sapiens. Nature 546, 289–292."
    },
    {
      fact: "智人不是从今天的黑猩猩演化而来。人类和黑猩猩拥有共同祖先，在约 600–700 万年前分开演化。",
      source_tier: "A",
      source: "Smithsonian National Museum of Natural History · Human Origins Initiative — \"Common Ancestors\""
    },
    {
      fact: "智人的解剖学特征包括：高而圆的颅骨、平坦的脸、下颌有明显的颏（下巴）、纤细的眉骨、纤细的骨骼。",
      source_tier: "A",
      source: "Natural History Museum London · Human Evolution — \"What makes Homo sapiens different\""
    },
    {
      fact: "在 Jebel Irhoud 发现智人之前，最早的智人化石被认为是埃塞俄比亚 Omo Kibish (约 195 ka) 和 Herto (约 160 ka)。",
      source_tier: "A",
      source: "McDougall, I., Brown, F.H., Fleagle, J.G. (2005). Stratigraphic placement and age of modern humans from Kibish, Ethiopia. Nature 433."
    },
    {
      fact: "智人在非洲不同区域逐渐演化，并非由单一群体演变而成。这被称为 'pan-African origin'（泛非洲起源）模型。",
      source_tier: "A",
      source: "Scerri, E. et al. (2018). Did Our Species Evolve in Subdivided Populations across Africa? Trends in Ecology & Evolution 33(8)."
    },
    {
      fact: "Mitochondrial Eve（线粒体夏娃）是所有现存人类沿母系上溯的最近共同祖先，生活在约 15-20 万年前的非洲。她不是 '夏娃'，而是统计学上的最近共同祖先。",
      source_tier: "A",
      source: "Cann, R.L., Stoneking, M., Wilson, A.C. (1987). Mitochondrial DNA and human evolution. Nature 325."
    },
    {
      fact: "智人的大脑约 1300–1400 立方厘米，与尼安德特人 (1400–1600 cc) 相当甚至略小，但脑结构 (尤其是顶叶和小脑) 不同。",
      source_tier: "A",
      source: "Bruner, E. (2018). Human Paleoneurology and the Evolution of the Parietal Cortex. Brain, Behavior and Evolution 91."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "现代人类——也就是我们——出现在 30 万年前的非洲。我们不是猴子变来的，也不是黑猩猩变来的。在很久很久以前，我们和黑猩猩有一个'共同的爷爷奶奶'，然后这家人慢慢分开，一支变成今天的黑猩猩，另一支经过几百万年慢慢变成今天的我们。",
      tier: "B",
      ref: "DK Smithsonian \"Prehistoric\" · NatGeo Kids \"Everything You Need to Know About Human Evolution\""
    },
    {
      lang: "zh",
      text: "为什么说 30 万年前？因为科学家在摩洛哥一个叫 Jebel Irhoud 的地方挖出了头骨化石，这些头骨已经长得很像现代人了。",
      tier: "B",
      ref: "Natural History Museum London — Kids Resources"
    },
    {
      lang: "zh",
      text: "我们和早期智人的区别：早期智人的眉骨更粗，脸更大，但他们的脑子已经和我们差不多大了。他们已经会用火、会做石器、会合作打猎。",
      tier: "B",
      ref: "Smithsonian Human Origins Kids"
    }
  ],

  map_points: [
    { id: "jebel_irhoud", name: "Jebel Irhoud", country: "摩洛哥", coords: [31.85, -8.87], significance: "已知最早智人化石 (~315 ka)", source_tier: "A" },
    { id: "omo_kibish", name: "Omo Kibish", country: "埃塞俄比亚", coords: [4.83, 35.97], significance: "早期智人化石 (~195–233 ka)", source_tier: "A" },
    { id: "herto", name: "Herto", country: "埃塞俄比亚", coords: [10.27, 40.55], significance: "Homo sapiens idaltu 化石 (~160 ka)", source_tier: "A" },
    { id: "florisbad", name: "Florisbad", country: "南非", coords: [-28.77, 26.07], significance: "早期智人颅骨 (~260 ka)", source_tier: "A" },
    { id: "klasies_river", name: "Klasies River Caves", country: "南非", coords: [-34.10, 24.40], significance: "早期智人遗骨 + 现代行为证据 (~120 ka)", source_tier: "A" },
    { id: "blombos", name: "Blombos Cave", country: "南非", coords: [-34.42, 21.22], significance: "最早抽象图案 (~77 ka)、贝壳串珠", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Jebel Irhoud 1 颅骨",
      held_at: "摩洛哥 Rabat 国家考古博物馆",
      date: "约 315 ka",
      tells_us: "智人在 30 万年前已存在；面部已较扁平，眉骨较纤细，但颅腔形状仍较长（不是完全圆形）。",
      source_tier: "A",
      source: "Hublin et al. 2017, Nature"
    },
    {
      name: "Omo Kibish I 颅骨",
      held_at: "埃塞俄比亚国家博物馆 (Addis Ababa)",
      date: "约 195–233 ka",
      tells_us: "颅腔形状更接近现代智人；与解剖学现代人 (AMH) 最早期标本之一。",
      source_tier: "A",
      source: "McDougall et al. 2005; Vidal et al. 2022, Nature"
    },
    {
      name: "Blombos 赭石刻线石板 (SAM-AA 8938)",
      held_at: "南非 Iziko Museum",
      date: "约 77 ka",
      tells_us: "最早的抽象几何图案之一，证明早期智人已有符号思维。",
      source_tier: "A",
      source: "Henshilwood et al. 2002, Science"
    },
    {
      name: "Nassarius 贝壳串珠",
      held_at: "多地 (Blombos, Skhul, Oued Djebbana)",
      date: "约 75–135 ka",
      tells_us: "最早的人体装饰证据，表明个体身份/群体认同已存在。",
      source_tier: "A",
      source: "d'Errico et al. 2009, PNAS"
    }
  ],

  key_events: [
    { time: "约 700–600 万年前", event: "人类祖先与黑猩猩祖先分开演化", source_tier: "A", source: "Smithsonian Human Origins" },
    { time: "约 440 万年前", event: "Ardipithecus ramidus（始祖地猿）— 已能双足直立", source_tier: "A", source: "White et al. 2009, Science Special Issue" },
    { time: "约 320 万年前", event: "Lucy (AL 288-1, Australopithecus afarensis) 在埃塞俄比亚生活", source_tier: "A", source: "Johanson & Edey 1981; Cleveland Museum of Natural History" },
    { time: "约 280 万年前", event: "最早的属于 Homo 属的化石 (LD 350-1, Ethiopia)", source_tier: "A", source: "Villmoare et al. 2015, Science" },
    { time: "约 230 万年前", event: "Homo habilis 与 Oldowan 石器", source_tier: "A", source: "British Museum · Olduvai Gorge" },
    { time: "约 190 万年前", event: "Homo erectus 出现，开始走出非洲", source_tier: "A", source: "Smithsonian Human Origins" },
    { time: "约 315 ka", event: "已知最早 Homo sapiens (Jebel Irhoud)", source_tier: "A", source: "Hublin 2017" },
    { time: "约 195 ka", event: "Omo Kibish 智人", source_tier: "A", source: "McDougall 2005" },
    { time: "约 77 ka", event: "Blombos 抽象几何图案 — 最早符号思维证据", source_tier: "A", source: "Henshilwood 2002" }
  ],

  key_people_or_groups: [
    {
      name: "Jean-Jacques Hublin",
      role: "古人类学家",
      contribution: "2017 年发表 Jebel Irhoud 研究，将智人起源推至 30 万年前。",
      source_tier: "A"
    },
    {
      name: "Donald Johanson",
      role: "古人类学家",
      contribution: "1974 年发现 Lucy 化石，改写了对早期人类的认识。",
      source_tier: "A"
    },
    {
      name: "Christopher Henshilwood",
      role: "考古学家",
      contribution: "Blombos 洞穴主持人，发现最早的抽象艺术证据。",
      source_tier: "A"
    },
    {
      name: "Mary Leakey",
      role: "古人类学家",
      contribution: "1959 在坦桑尼亚 Olduvai 发现 Zinjanthropus；1976 在 Laetoli 发现 360 万年前的双足脚印。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "现代人类的出现是文明的'必要前提'，但不是'充分条件'——智人出现后还有 30 万年人类才建立城市。",
      reasoning: "解剖学上的现代性 ≠ 行为上的现代性。智人需要语言、合作、知识传递的累积，才能走向文明。",
      source_tier: "C",
      ref: "课程设计基于 McBrearty & Brooks (2000) 'The revolution that wasn't'"
    },
    {
      claim: "智人和其他人种 (尼安德特人、丹尼索瓦人) 曾经共存数万年，并发生基因交流。",
      reasoning: "今天非非洲裔人群约 1–4% 基因来自尼安德特人；东南亚、大洋洲人群携带丹尼索瓦人基因。",
      source_tier: "A",
      source: "Green et al. 2010, Science; Reich et al. 2010, Nature"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'人类是从猴子变来的'",
      right: "人类不是从今天的猴子或黑猩猩变来的。人类、猴子、黑猩猩有共同的远古祖先，是同一棵树上的不同分支。",
      source_tier: "A",
      source: "Smithsonian Human Origins · Common Misconceptions"
    },
    {
      wrong: "'尼安德特人是'笨'的，所以被智人淘汰'",
      right: "尼安德特人脑容量比智人略大，会用火、做石器、埋葬死者、可能有语言。他们的消失原因复杂（气候、人口、混血），不是'被淘汰'。",
      source_tier: "A",
      source: "Natural History Museum London — Neanderthals"
    },
    {
      wrong: "'演化是有方向的，越变越高级'",
      right: "演化没有方向，没有目标。变化只是对环境的适应。今天的黑猩猩并不'低级'，它们也演化了 600 万年。",
      source_tier: "A",
      source: "Berkeley Understanding Evolution"
    },
    {
      wrong: "'Lucy 是最早的人'",
      right: "Lucy 是南方古猿 (Australopithecus afarensis)，不是 Homo 属。她生活在 320 万年前，但不是'第一个人'。",
      source_tier: "A",
      source: "Cleveland Museum of Natural History · Lucy Exhibit"
    },
    {
      wrong: "'线粒体夏娃 = 圣经中的夏娃'",
      right: "线粒体夏娃只是统计学上的'最近共同母系祖先'，她生活的时代有几万到几十万其他人类，她不是当时唯一的女人。",
      source_tier: "A",
      source: "Cann et al. 1987; National Geographic Genographic Project"
    }
  ],

  ai_tasks: [
    {
      task_id: "P01_Q1",
      prompt: "如果你是 30 万年前在摩洛哥 Jebel Irhoud 山洞里的智人，写一段你一天的生活，要符合考古证据 (有火、石器、合作打猎、没有农业、没有陶器)。",
      type: "creative_writing_with_facts",
      grading_criteria: ["时代符合", "无农业/陶器/城市", "有火/石器/小群体合作", "语言要儿童可读"]
    },
    {
      task_id: "P01_Q2",
      prompt: "为什么我们不是'猴子变的'？用你自己的话画一棵树或写一段话解释。",
      type: "concept_check",
      grading_criteria: ["明确说出共同祖先", "不是直接演化关系", "时间尺度 (百万年)"]
    },
    {
      task_id: "P01_Q3",
      prompt: "看 Blombos 洞穴的赭石几何图案，你觉得 7 万年前的智人画这些线条是想表达什么？",
      type: "open_thinking",
      grading_criteria: ["承认我们不能确定", "提出有依据的猜测 (符号/装饰/计数/身份)"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 '智人在 30 万年前突然出现' — 真相是逐渐演化，30 万年是目前最早化石证据的时间。",
    "❌ 不要给 Jebel Irhoud 化石起人名 (没有 'Lucy' 这样的命名)，只用编号 (Jebel Irhoud 1)。",
    "❌ 不要发明智人内心的对话或思考，无法证实。",
    "❌ 不要说 '智人和尼安德特人战争' — 没有考古证据支持大规模冲突。",
    "❌ 不要说 '智人发明了语言' — 语言起源时间未知，可能更早。",
    "✅ 可以说 '目前考古证据显示...' '科学家认为...' '我们还不知道...'",
    "✅ 区分 '解剖学现代人' (~30 万年前) 和 '行为学现代人' (~7-5 万年前 vs 逐渐累积说)"
  ],

  sources: [
    { tier: "A", citation: "Hublin et al. (2017). Nature 546:289–292.", url: "https://www.nature.com/articles/nature22336" },
    { tier: "A", citation: "Smithsonian National Museum of Natural History · Human Origins", url: "https://humanorigins.si.edu/" },
    { tier: "A", citation: "Natural History Museum London · Human Evolution", url: "https://www.nhm.ac.uk/discover/human-evolution.html" },
    { tier: "A", citation: "Britannica · Homo sapiens", url: "https://www.britannica.com/topic/Homo-sapiens" },
    { tier: "A", citation: "McDougall, Brown, Fleagle (2005). Nature 433:733–736." },
    { tier: "A", citation: "Scerri et al. (2018). Trends in Ecology & Evolution 33(8):582–594." },
    { tier: "A", citation: "Henshilwood et al. (2002). Science 295:1278–1280." },
    { tier: "B", citation: "DK Smithsonian (2019). 'Prehistoric: The Definitive Visual History of Life on Earth'." },
    { tier: "B", citation: "National Geographic Kids · 'What Is Human Evolution?'", url: "https://kids.nationalgeographic.com/" }
  ]
},

// ════════════════════════════════════════════════════════════════
{
  node_id: "P02_out_of_africa",
  title: "约7万年前：人类走出非洲",
  time_range: "约 210,000–50,000 年前 (主成功扩散 ~60–70 kya)",
  core_question: "智人为什么要走出非洲？我们是怎么知道他们走的路线？",

  fact_base: [
    {
      fact: "智人多次走出非洲：早期尝试 (~180–120 kya) 大多失败或回流；成功的全球扩散发生在约 60–70 kya。",
      source_tier: "A",
      source: "Bae, Douka, Petraglia (2017). On the origin of modern humans: Asian perspectives. Science 358."
    },
    {
      fact: "目前已知最早的智人出非洲证据：以色列 Misliya Cave 颌骨，距今约 177–194 ka。",
      source_tier: "A",
      source: "Hershkovitz et al. (2018). The earliest modern humans outside Africa. Science 359."
    },
    {
      fact: "以色列 Skhul 和 Qafzeh 洞穴出土智人化石，距今约 90–120 ka，但被认为是'失败的早期扩散'，未留下基因后代。",
      source_tier: "A",
      source: "Grün et al. (2005). U-series and ESR analyses of bones and teeth relating to the human burials from Skhul. Journal of Human Evolution 49."
    },
    {
      fact: "今天所有非非洲人的基因主要来自约 60–70 kya 的一次或数次成功扩散。",
      source_tier: "A",
      source: "Mallick et al. (2016). The Simons Genome Diversity Project. Nature 538."
    },
    {
      fact: "走出非洲的两条主要路线假说：北线 (Levant 走廊) 与南线 (Bab el-Mandeb 海峡到阿拉伯)。证据支持两者都使用过。",
      source_tier: "A",
      source: "Groucutt et al. (2015). Rethinking the dispersal of Homo sapiens out of Africa. Evolutionary Anthropology 24."
    },
    {
      fact: "智人到达澳大利亚 (Sahul) 的最早证据：Madjedbebe 遗址，约 65 kya。",
      source_tier: "A",
      source: "Clarkson et al. (2017). Human occupation of northern Australia by 65,000 years ago. Nature 547."
    },
    {
      fact: "智人到达欧洲的最早证据：希腊 Apidima 1 颅骨，约 210 kya (早期，可能失败)；保加利亚 Bacho Kiro 洞穴成功的智人，约 45 kya。",
      source_tier: "A",
      source: "Harvati et al. (2019). Apidima Cave fossils. Nature 571; Hublin et al. (2020). Initial Upper Palaeolithic Homo sapiens from Bacho Kiro Cave. Nature 581."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "你想象一下，所有人类的'老家'都在非洲。大约 7 万年前，有一小群智人离开了非洲老家，开始走向全世界。他们没有地图，没有 GPS，靠的是观察星星、跟着河流、追着动物。",
      tier: "B",
      ref: "DK 'Prehistoric Atlas' · NatGeo Kids"
    },
    {
      lang: "zh",
      text: "他们为什么要走？可能是因为食物不够、气候变化、人口变多，也可能就是好奇。每一代人多走一点点，几万年后他们的后代就到了世界各地。",
      tier: "B",
      ref: "Smithsonian Human Origins · Map of Human Migration"
    },
    {
      lang: "zh",
      text: "我们怎么知道他们走的路？两种证据：一是化石和石器（在哪里挖到的），二是 DNA（基因像家谱，能告诉我们谁是谁的后代）。",
      tier: "B",
      ref: "National Geographic Genographic Kids"
    }
  ],

  map_points: [
    { id: "misliya", name: "Misliya Cave", country: "以色列", coords: [32.74, 34.96], significance: "最早出非洲智人证据 (~180 ka)", source_tier: "A" },
    { id: "skhul", name: "Skhul Cave", country: "以色列", coords: [32.67, 34.97], significance: "早期智人化石 + 海贝串珠 (~120 ka)", source_tier: "A" },
    { id: "qafzeh", name: "Qafzeh Cave", country: "以色列", coords: [32.70, 35.31], significance: "早期智人埋葬 + 赭石 (~92 ka)", source_tier: "A" },
    { id: "apidima", name: "Apidima Cave", country: "希腊", coords: [36.61, 22.46], significance: "早期智人颅骨 (~210 ka，可能失败扩散)", source_tier: "A" },
    { id: "jwalapuram", name: "Jwalapuram", country: "印度", coords: [15.32, 78.20], significance: "智人扩散到南亚证据 (~74 ka，Toba 火山后)", source_tier: "A" },
    { id: "tianyuan", name: "Tianyuan Cave (田园洞)", country: "中国", coords: [39.71, 115.92], significance: "东亚最早现代人化石之一 (~40 ka)", source_tier: "A" },
    { id: "ust_ishim", name: "Ust'-Ishim", country: "西伯利亚", coords: [57.71, 71.16], significance: "西伯利亚最早智人 (~45 ka)", source_tier: "A" },
    { id: "madjedbebe", name: "Madjedbebe", country: "澳大利亚", coords: [-12.42, 132.79], significance: "智人到达 Sahul 最早证据 (~65 ka)", source_tier: "A" },
    { id: "bab_el_mandeb", name: "Bab el-Mandeb 海峡", country: "也门-吉布提", coords: [12.58, 43.32], significance: "南线扩散关键节点", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Misliya-1 颌骨",
      held_at: "以色列 Tel Aviv University",
      date: "约 177–194 ka",
      tells_us: "智人早在 18 万年前就到达 Levant 地区，比之前认为的早数万年。",
      source_tier: "A",
      source: "Hershkovitz et al. 2018, Science"
    },
    {
      name: "Ust'-Ishim 股骨 (Genome)",
      held_at: "Max Planck Institute, Leipzig",
      date: "约 45 ka",
      tells_us: "高质量基因组显示与现代欧亚人接近，含尼安德特人基因约 2.3%。",
      source_tier: "A",
      source: "Fu et al. 2014, Nature"
    },
    {
      name: "Madjedbebe 石器与赭石",
      held_at: "澳大利亚 Mirarr 族保管",
      date: "约 65 ka",
      tells_us: "智人 65,000 年前已渡海到达澳大利亚，需要远距离航海能力。",
      source_tier: "A",
      source: "Clarkson et al. 2017, Nature"
    }
  ],

  key_events: [
    { time: "约 210 ka", event: "Apidima 1 — 可能的早期欧洲扩散 (失败)", source_tier: "A" },
    { time: "约 180 ka", event: "Misliya — 已知最早出非洲", source_tier: "A" },
    { time: "约 120 ka", event: "Skhul/Qafzeh — Levant 智人 (基因未留存)", source_tier: "A" },
    { time: "约 74 ka", event: "Toba 火山超级喷发 — 可能影响人口", source_tier: "A", source: "Williams 2012" },
    { time: "约 65 ka", event: "智人到达 Sahul (澳大利亚)", source_tier: "A" },
    { time: "约 60–50 ka", event: "全球主扩散开始", source_tier: "A" },
    { time: "约 45 ka", event: "智人到达欧洲 (Bacho Kiro) 与西伯利亚 (Ust'-Ishim)", source_tier: "A" },
    { time: "约 15–20 ka", event: "智人通过 Beringia 进入美洲", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Spencer Wells",
      role: "遗传学家",
      contribution: "National Geographic Genographic Project 主持人，用 Y 染色体追踪人类扩散路线。",
      source_tier: "A"
    },
    {
      name: "Svante Pääbo",
      role: "古遗传学家",
      contribution: "2022 诺贝尔奖。首次测序尼安德特人基因组，证明智人与尼安德特人混血。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "走出非洲后，智人需要快速适应不同纬度、气候、食物——这种适应能力是文明可塑性的基础。",
      reasoning: "从赤道森林到北极冻原，智人没有等待身体演化，而是用文化（衣服、火、工具）适应。",
      source_tier: "C",
      ref: "课程设计基于 'cultural adaptation' 概念，参见 Boyd & Richerson (2005)"
    },
    {
      claim: "渡海到澳大利亚说明 65,000 年前智人已有计划性远征能力——这是抽象规划的早期证据。",
      reasoning: "Sahul 与 Sunda 之间最窄海峡约 70-90 公里，必须造船并组织一群人 (含女性) 一起渡过。",
      source_tier: "A",
      source: "O'Connell et al. 2018, PNAS"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'人类只走出非洲一次'",
      right: "至少有 2–3 次早期扩散（多失败），加上约 60–70 kya 的主成功扩散。",
      source_tier: "A",
      source: "Bae et al. 2017, Science"
    },
    {
      wrong: "'美洲原住民是 1492 年才被发现的'",
      right: "智人在约 15,000–20,000 年前就到达美洲，1492 是欧洲人首次接触，不是美洲'被发现'。",
      source_tier: "A",
      source: "Smithsonian Anthropology"
    },
    {
      wrong: "'走出非洲是一群人有计划地远行'",
      right: "实际上是数千年中每代人多走几公里，累积起来跨越大陆。不是远征队，是缓慢扩散。",
      source_tier: "A",
      source: "Britannica · Human migration"
    }
  ],

  ai_tasks: [
    {
      task_id: "P02_Q1",
      prompt: "你是 7 万年前一个 20 人的智人群体的领头人，决定要不要离开 Levant 地区往东走。列出三个支持走的理由，三个支持留下的理由。",
      type: "decision_simulation",
      grading_criteria: ["理由要符合时代", "考虑食物/气候/人口", "不能提到现代概念"]
    },
    {
      task_id: "P02_Q2",
      prompt: "在地图上画出'南线 (Bab el-Mandeb)'和'北线 (Levant)'两条路。你觉得哪条更难？为什么？",
      type: "map_thinking",
      grading_criteria: ["位置正确", "理由有依据 (气候/海平面/食物)"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 '智人走出非洲是因为干旱/冰期/某具体事件' — 原因复杂未定。",
    "❌ 不要给具体的'第一个走出非洲的人'命名。",
    "❌ 不要说 '智人到达美洲时间是 X 年前' — 学界争议大 (15-25 kya)。",
    "✅ 用 '约'、'大约'、'目前证据显示'。",
    "✅ 区分 '到达' 和 '基因后代留存到今天'。"
  ],

  sources: [
    { tier: "A", citation: "Bae, Douka, Petraglia (2017). Science 358:eaai9067." },
    { tier: "A", citation: "Hershkovitz et al. (2018). Science 359:456–459." },
    { tier: "A", citation: "Clarkson et al. (2017). Nature 547:306–310." },
    { tier: "A", citation: "Smithsonian Human Origins · Map of Human Migration", url: "https://humanorigins.si.edu/evidence/genetics/ancient-dna-and-neanderthals/map" },
    { tier: "A", citation: "Britannica · Out of Africa hypothesis" },
    { tier: "B", citation: "DK 'Children's Atlas of Human Evolution'" },
    { tier: "B", citation: "NatGeo Kids · 'How Humans Spread Across the Globe'" }
  ]
},

// ════════════════════════════════════════════════════════════════
{
  node_id: "P03_environmental_adaptation",
  title: "约5-3万年前：适应不同环境",
  time_range: "约 50,000–30,000 年前",
  core_question: "智人怎么从非洲草原变成住进冰天雪地、热带雨林、高原沙漠的'万能动物'？",

  fact_base: [
    {
      fact: "智人在没有显著生理进化的情况下，通过文化适应（衣服、火、住所、工具）扩散到从赤道到北极的所有大陆。",
      source_tier: "A",
      source: "Roberts & Stewart (2018). Defining the 'generalist specialist' niche for Pleistocene Homo sapiens. Nature Human Behaviour 2."
    },
    {
      fact: "最早的缝制衣服证据：俄罗斯 Tolbaga 出土的骨针，约 30 ka；中国仙人洞骨针 (>35 ka)。",
      source_tier: "A",
      source: "Gilligan (2010). The prehistoric development of clothing. Journal of Archaeological Method and Theory 17."
    },
    {
      fact: "智人在西伯利亚北极圈附近的存在证据：Yana RHS 遗址，约 31.6 kya。零下数十度环境。",
      source_tier: "A",
      source: "Pitulko et al. (2004). The Yana RHS Site: Humans in the Arctic before the Last Glacial Maximum. Science 303."
    },
    {
      fact: "海拔适应：青藏高原最早人类居住证据 Nwya Devu，约 30–40 kya，海拔 4600m。",
      source_tier: "A",
      source: "Zhang et al. (2018). The earliest human occupation of the high-altitude Tibetan Plateau 40,000 to 30,000 years ago. Science 362."
    },
    {
      fact: "智人在不同环境下身体出现一定生理适应：高纬度肤色变浅、藏族适应低氧 (EPAS1 基因来自丹尼索瓦人)、北极人群代谢能力增强。",
      source_tier: "A",
      source: "Huerta-Sánchez et al. (2014). Altitude adaptation in Tibetans caused by introgression of Denisovan-like DNA. Nature 512."
    },
    {
      fact: "用火证据普遍化：50-30 kya 期间，欧洲、亚洲、澳洲各地都有持续用火的考古证据。",
      source_tier: "A",
      source: "Roebroeks & Villa (2011). On the earliest evidence for habitual use of fire in Europe. PNAS 108."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "智人到了不同的地方后，遇到了完全不一样的问题：北方太冷、雨林太湿、沙漠没水、高原缺氧。但他们没有进化出毛茸茸的身体，也没有变成长鼻子的动物。他们靠的是'脑子'——做衣服、生火、盖房子、做不同的工具。",
      tier: "B",
      ref: "DK 'How Humans Conquered the World'"
    },
    {
      lang: "zh",
      text: "在西伯利亚 Yana 遗址，零下 40 度的地方，3 万年前已经有智人在生活。他们用猛犸象的骨头盖房子，用驯鹿皮做衣服，用火取暖。",
      tier: "B",
      ref: "Smithsonian Arctic Studies Center"
    }
  ],

  map_points: [
    { id: "yana_rhs", name: "Yana RHS", country: "俄罗斯西伯利亚", coords: [70.71, 135.44], significance: "北极圈附近最早人类居住 (~31.6 ka)", source_tier: "A" },
    { id: "nwya_devu", name: "Nwya Devu (尼阿底)", country: "中国西藏", coords: [31.31, 89.71], significance: "青藏高原最早人类 (~30-40 ka, 4600m)", source_tier: "A" },
    { id: "denisova", name: "Denisova Cave", country: "俄罗斯阿尔泰", coords: [51.40, 84.68], significance: "丹尼索瓦人 + 智人交汇 (~50 ka)", source_tier: "A" },
    { id: "niah_cave", name: "Niah Cave", country: "马来西亚婆罗洲", coords: [3.81, 113.78], significance: "热带雨林适应 (~45 ka)", source_tier: "A" },
    { id: "callao", name: "Callao Cave", country: "菲律宾", coords: [17.71, 121.81], significance: "Homo luzonensis + 智人扩散", source_tier: "A" },
    { id: "monte_verde", name: "Monte Verde", country: "智利", coords: [-41.51, -73.20], significance: "南美最早人类 (~14.5 ka)", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Yana 骨针 + 猛犸象牙小雕像",
      held_at: "俄罗斯科学院",
      date: "约 31.6 ka",
      tells_us: "北极圈智人已能缝制贴身保暖衣物，并制作艺术品。",
      source_tier: "A",
      source: "Pitulko et al. 2012"
    },
    {
      name: "Denisova 手指骨 (Denisova 3)",
      held_at: "Max Planck Institute, Leipzig",
      date: "约 76 ka",
      tells_us: "丹尼索瓦人存在；基因显示与今天巴布亚人、澳洲原住民混血。",
      source_tier: "A",
      source: "Reich et al. 2010, Nature"
    },
    {
      name: "Mal'ta Boy (MA-1) 基因组",
      held_at: "西伯利亚",
      date: "约 24 ka",
      tells_us: "古北西伯利亚人是后来美洲原住民的祖先之一。",
      source_tier: "A",
      source: "Raghavan et al. 2014, Nature"
    }
  ],

  key_events: [
    { time: "约 50 ka", event: "智人到达东南亚岛屿 (Sundaland)", source_tier: "A" },
    { time: "约 45 ka", event: "智人进入欧洲，与尼安德特人共存", source_tier: "A" },
    { time: "约 40 ka", event: "尼安德特人灭绝", source_tier: "A", source: "Higham et al. 2014, Nature" },
    { time: "约 31.6 ka", event: "Yana — 北极圈附近人类居住", source_tier: "A" },
    { time: "约 30 ka", event: "青藏高原 Nwya Devu 占据", source_tier: "A" },
    { time: "约 26 ka", event: "末次冰盛期开始 (LGM)", source_tier: "A" },
    { time: "约 15–25 ka", event: "通过 Beringia 进入美洲 (路线和时间仍有争议)", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "古北西伯利亚人 (Ancient North Siberians)",
      role: "古人群",
      contribution: "Mal'ta-Buret' 文化，是后来美洲原住民和今天东亚人的混合祖源之一。",
      source_tier: "A"
    },
    {
      name: "丹尼索瓦人",
      role: "古人种",
      contribution: "亚洲的人种，与智人混血。藏族高原适应基因 EPAS1 来自他们。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "人类成为'通才专家' (generalist specialist) — 既能广泛适应又能区域专精，这是文明多样性的种子。",
      reasoning: "不同环境催生不同技术、食物、社会组织。后来的农业、城市文明都是在这个基础上分化出来的。",
      source_tier: "A",
      source: "Roberts & Stewart 2018"
    },
    {
      claim: "5-3 万年前的智人已具备'技术包' (toolkit) 概念，根据不同环境组合不同工具，类似今天的'职业'。",
      reasoning: "考古证据显示在不同区域、不同生态位的智人留下不同工具组合，且具有传承性。",
      source_tier: "C",
      ref: "课程设计"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'尼安德特人因为不会适应所以灭绝'",
      right: "尼安德特人在欧洲适应了几十万年。灭绝原因复杂：气候、人口、智人竞争、混血同化等。",
      source_tier: "A",
      source: "Higham 2014"
    },
    {
      wrong: "'冰河时代地球到处都是冰'",
      right: "冰盖主要在北半球高纬。赤道附近变化较小。撒哈拉曾是绿色草原。",
      source_tier: "A",
      source: "Britannica · Last Glacial Period"
    }
  ],

  ai_tasks: [
    {
      task_id: "P03_Q1",
      prompt: "如果你是 3 万年前在西伯利亚 Yana 的智人小孩，描述你穿什么、住什么、吃什么。要符合考古证据。",
      type: "creative_writing_with_facts",
      grading_criteria: ["驯鹿皮/猛犸象牙/骨针", "用火", "无金属/陶器/农业"]
    },
    {
      task_id: "P03_Q2",
      prompt: "为什么藏族能在 4000 米以上生活而其他人会高原反应？这和史前哪个人种混血有关？",
      type: "concept_check",
      grading_criteria: ["EPAS1 基因", "丹尼索瓦人", "混血"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 '某某基因让人类'征服'某地区' — 适应是文化为主、生理为辅。",
    "❌ 不要把 '冰河时代' 当成所有地方都是冰。",
    "✅ 强调文化适应 vs 生理适应的区别。"
  ],

  sources: [
    { tier: "A", citation: "Roberts & Stewart (2018). Nature Human Behaviour 2." },
    { tier: "A", citation: "Pitulko et al. (2004). Science 303." },
    { tier: "A", citation: "Zhang et al. (2018). Science 362." },
    { tier: "A", citation: "Smithsonian Arctic Studies Center", url: "https://naturalhistory.si.edu/research/anthropology/programs/arctic-studies-center" },
    { tier: "B", citation: "DK 'How Humans Conquered the World'" }
  ]
},

// ════════════════════════════════════════════════════════════════
{
  node_id: "P04_language_art_imagination",
  title: "约4-3万年前：语言、艺术与想象力",
  time_range: "约 50,000–17,000 年前 (核心爆发约 40 kya)",
  core_question: "智人什么时候开始'想象'？艺术是什么时候出现的？语言是怎么演化的？",

  fact_base: [
    {
      fact: "目前已知最早的具象洞穴艺术：印度尼西亚 Sulawesi 岛 Leang Bulu' Sipong 4，描绘人形猎人与水豚，距今至少 51,200 年。",
      source_tier: "A",
      source: "Oktaviana et al. (2024). Earliest narrative cave art in Sulawesi by 51,200 years ago. Nature 631."
    },
    {
      fact: "Chauvet 洞穴 (法国) 壁画距今约 36,000-30,000 年，包括狮子、犀牛、野马等。",
      source_tier: "A",
      source: "Quiles et al. (2016). A high-precision chronological model for the decorated Upper Paleolithic cave of Chauvet-Pont d'Arc. PNAS 113."
    },
    {
      fact: "Hohlenstein-Stadel 狮人 (Löwenmensch) 是已知最早的人兽合体雕像，距今约 40,000 年，象征想象力与神话思维。",
      source_tier: "A",
      source: "Conard (2003). Palaeolithic ivory sculptures from southwestern Germany. Nature 426; Ulmer Museum, Germany."
    },
    {
      fact: "维林多夫维纳斯 (Venus of Willendorf) 约 30,000 年，已知最有名的女性雕像之一，发现于奥地利。",
      source_tier: "A",
      source: "Natural History Museum Vienna · Venus of Willendorf"
    },
    {
      fact: "最早的乐器：德国 Geißenklösterle 洞穴秃鹫骨笛，距今约 42,000-43,000 年。",
      source_tier: "A",
      source: "Higham et al. (2012). Testing models for the beginnings of the Aurignacian and the advent of figurative art and music. Journal of Human Evolution 62."
    },
    {
      fact: "FOXP2 基因变体与语言能力相关。尼安德特人也有相同变体，说明基本语言能力可能远早于智人。",
      source_tier: "A",
      source: "Krause et al. (2007). The derived FOXP2 variant of modern humans was shared with Neandertals. Current Biology 17."
    },
    {
      fact: "Lascaux 洞穴 (法国) 壁画约 17,000 年，被称为'史前西斯廷教堂'。",
      source_tier: "A",
      source: "UNESCO World Heritage · Lascaux"
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "4 万年前的智人开始做一件非常重要的事情：画画。他们走进黑漆漆的山洞，用火把照亮，在洞壁上画狮子、马、犀牛。为什么要画？我们不完全知道。可能是讲故事、可能是仪式、可能是教孩子认识动物。",
      tier: "B",
      ref: "DK 'Cave Art for Kids'"
    },
    {
      lang: "zh",
      text: "他们还做了非常奇怪的雕像——'狮人'，半人半狮的样子。世界上没有真的狮人，所以这告诉我们一件事：智人会'想象'。这是文明的种子。",
      tier: "B",
      ref: "Ulmer Museum Kids Resources"
    },
    {
      lang: "zh",
      text: "他们还做了笛子，用秃鹫的骨头。4 万年前的智人已经会唱歌、跳舞、讲故事。",
      tier: "B",
      ref: "NatGeo Kids 'First Music'"
    }
  ],

  map_points: [
    { id: "sulawesi_bulu_sipong", name: "Leang Bulu' Sipong 4", country: "印度尼西亚 Sulawesi", coords: [-4.92, 119.67], significance: "已知最早具象壁画 (~51.2 ka)", source_tier: "A" },
    { id: "chauvet", name: "Chauvet Cave", country: "法国", coords: [44.39, 4.42], significance: "早期洞穴壁画 (~36 ka)", source_tier: "A" },
    { id: "lascaux", name: "Lascaux", country: "法国", coords: [45.05, 1.17], significance: "壁画杰作 (~17 ka)", source_tier: "A" },
    { id: "altamira", name: "Altamira", country: "西班牙", coords: [43.38, -4.12], significance: "壁画 (~36-15 ka)", source_tier: "A" },
    { id: "hohle_fels", name: "Hohle Fels", country: "德国", coords: [48.38, 9.76], significance: "Venus of Hohle Fels (~40 ka) + 骨笛", source_tier: "A" },
    { id: "hohlenstein", name: "Hohlenstein-Stadel", country: "德国", coords: [48.55, 10.17], significance: "狮人雕像 (~40 ka)", source_tier: "A" },
    { id: "willendorf", name: "Willendorf", country: "奥地利", coords: [48.32, 15.40], significance: "Venus of Willendorf (~30 ka)", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Löwenmensch (狮人) 雕像",
      held_at: "Ulmer Museum, Germany",
      date: "约 40,000 年",
      tells_us: "智人能想象现实中不存在的东西——这是抽象思维和神话/宗教的起源证据。",
      source_tier: "A",
      source: "Conard 2003, Nature"
    },
    {
      name: "Venus of Willendorf",
      held_at: "Naturhistorisches Museum Wien",
      date: "约 30,000 年",
      tells_us: "夸张女性身体特征，可能与生育、丰饶、身份认同相关。具体含义不明。",
      source_tier: "A",
      source: "NHM Vienna"
    },
    {
      name: "Geißenklösterle 秃鹫骨笛",
      held_at: "Tübingen University, Germany",
      date: "约 42,000 年",
      tells_us: "智人已有音乐——精确钻孔，五音音阶可能存在。",
      source_tier: "A",
      source: "Higham 2012"
    },
    {
      name: "Chauvet 壁画 (狮群、犀牛)",
      held_at: "原址 (法国)，复制品在 Caverne du Pont-d'Arc",
      date: "约 36 ka",
      tells_us: "壁画显示对动物的精细观察、空间组合、视觉技巧（多视角同框）。",
      source_tier: "A",
      source: "Quiles 2016, PNAS; UNESCO"
    }
  ],

  key_events: [
    { time: "约 100 ka", event: "Blombos 赭石图案 (P01 提及)", source_tier: "A" },
    { time: "约 75 ka", event: "Blombos Nassarius 串珠", source_tier: "A" },
    { time: "约 51 ka", event: "Sulawesi 叙事壁画", source_tier: "A" },
    { time: "约 42 ka", event: "Geißenklösterle 骨笛", source_tier: "A" },
    { time: "约 40 ka", event: "狮人雕像、Hohle Fels Venus", source_tier: "A" },
    { time: "约 36 ka", event: "Chauvet 壁画", source_tier: "A" },
    { time: "约 30 ka", event: "Willendorf Venus", source_tier: "A" },
    { time: "约 17 ka", event: "Lascaux 壁画", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Aurignacian 文化",
      role: "考古文化",
      contribution: "欧洲早期智人文化，约 43-26 ka，包括狮人、Venus、骨笛、最早洞穴艺术。",
      source_tier: "A"
    },
    {
      name: "Magdalenian 文化",
      role: "考古文化",
      contribution: "约 17-12 ka 欧洲晚期旧石器，Lascaux 与 Altamira 主要时期。",
      source_tier: "A"
    },
    {
      name: "Maxime Aubert",
      role: "考古学家",
      contribution: "用铀-钍定年方法重新测定 Sulawesi 壁画年代，证明亚洲与欧洲艺术几乎同时出现。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "想象力 (狮人、Venus) 是宗教、神话、艺术、科学的共同源头——能想象不存在的东西，才能想象'明天'、'城市'、'神'。",
      reasoning: "Yuval Harari 'Sapiens' 称之为'认知革命'，但学界更接受'渐进累积'。重点是抽象符号思维已成熟。",
      source_tier: "C",
      ref: "课程设计基于 Harari (2014); Mithen (1996) 'The Prehistory of the Mind'"
    },
    {
      claim: "壁画位置多在洞穴深处，可能与仪式/教学/通过性体验相关——文明的'神圣空间'雏形。",
      reasoning: "Chauvet/Lascaux 壁画在洞穴深处数百米，火把可见。多人记录的脚印显示是群体行为。",
      source_tier: "A",
      source: "Clottes (2008). Cave Art. Phaidon"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'洞穴壁画是史前人随便涂鸦'",
      right: "壁画精确、有透视、多在深洞、需要光源和脚手架，是有目的的创作。",
      source_tier: "A",
      source: "UNESCO Lascaux"
    },
    {
      wrong: "'尼安德特人不会艺术'",
      right: "西班牙 Maltravieso 洞穴红色手印约 64 ka，早于智人到达欧洲，可能是尼安德特人作品。",
      source_tier: "A",
      source: "Hoffmann et al. 2018, Science"
    },
    {
      wrong: "'语言是智人发明的'",
      right: "语言起源未知。尼安德特人共享 FOXP2 基因变体、有舌骨结构、可能也有语言。",
      source_tier: "A",
      source: "Krause 2007"
    }
  ],

  ai_tasks: [
    {
      task_id: "P04_Q1",
      prompt: "你 4 万年前的智人，要画一只你打猎遇到的犀牛。在哪里画？用什么颜料？画给谁看？",
      type: "creative_writing_with_facts",
      grading_criteria: ["洞穴深处", "赭石/木炭", "群体观看/仪式/教学"]
    },
    {
      task_id: "P04_Q2",
      prompt: "'狮人'雕像告诉我们智人有什么能力？这种能力和后来的文明（城市、宗教、科学）有什么关系？",
      type: "concept_check",
      grading_criteria: ["想象力", "抽象思维", "符号", "连接到神话/宗教"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 '智人发明了艺术' — 可能尼安德特人也会，且非洲早有抽象图案。",
    "❌ 不要解读壁画的具体'含义' — 我们不知道。",
    "❌ 不要把 Venus 雕像说成是 '生育崇拜' — 学界仍有争议。",
    "✅ 用 '我们认为可能...' '一种解释是...' '我们不能确定...'"
  ],

  sources: [
    { tier: "A", citation: "Oktaviana et al. (2024). Nature 631:814–818." },
    { tier: "A", citation: "Quiles et al. (2016). PNAS 113." },
    { tier: "A", citation: "Conard (2003). Nature 426." },
    { tier: "A", citation: "UNESCO World Heritage · Lascaux", url: "https://whc.unesco.org/en/list/85/" },
    { tier: "A", citation: "Natural History Museum Vienna · Venus of Willendorf", url: "https://www.nhm-wien.ac.at/en/research/anthropology/the_venus_of_willendorf" },
    { tier: "B", citation: "DK 'Cave Art'" },
    { tier: "B", citation: "NatGeo Kids 'First Artists'" }
  ]
},

// ════════════════════════════════════════════════════════════════
{
  node_id: "P05_climate_warming",
  title: "约1.2万年前：气候变暖",
  time_range: "约 12,900–9,700 年前 (从 Younger Dryas 到 Holocene 早期)",
  core_question: "气候变暖怎么改变了人类？为什么这是文明的开始？",

  fact_base: [
    {
      fact: "末次冰盛期 (Last Glacial Maximum, LGM) 约 26-20 kya，全球温度比今天低约 6°C。",
      source_tier: "A",
      source: "Tierney et al. (2020). Glacial cooling and climate sensitivity revisited. Nature 584."
    },
    {
      fact: "Younger Dryas (新仙女木事件) 是约 12,900-11,700 年前的快速降温期，可能由北美冰湖融水进入大西洋引发。",
      source_tier: "A",
      source: "Carlson (2013). The Younger Dryas Climate Event. Encyclopedia of Quaternary Science."
    },
    {
      fact: "Holocene (全新世) 开始于约 11,700 年前，标志着相对稳定的温暖期，至今未结束。",
      source_tier: "A",
      source: "Walker et al. (2009). Formal definition and dating of the GSSP for the base of the Holocene. Journal of Quaternary Science 24."
    },
    {
      fact: "稳定温暖气候是新石器革命（农业起源）的关键前提——降水可预测、生长季稳定。",
      source_tier: "A",
      source: "Richerson, Boyd & Bettinger (2001). Was agriculture impossible during the Pleistocene but mandatory during the Holocene? American Antiquity 66."
    },
    {
      fact: "末次冰期结束伴随北半球大型动物（mammoth、mastodon、giant sloth、saber-toothed cat）大规模灭绝。原因含气候与人类狩猎（学界仍在辩论）。",
      source_tier: "A",
      source: "Stuart (2015). Late Quaternary megafaunal extinctions. Geological Journal 50."
    },
    {
      fact: "海平面在末次冰期低于今天约 120 米。Beringia 陆桥、Sundaland、Sahul 等陆地连接今已淹没。",
      source_tier: "A",
      source: "Lambeck et al. (2014). Sea level and global ice volumes from the Last Glacial Maximum to the Holocene. PNAS 111."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "1 万 2 千年前左右，地球上最冷的时期结束了。冰山慢慢融化，森林变多，动物变多，人也变多。这就像地球突然给人类'按下了开始游戏'的按钮。",
      tier: "B",
      ref: "DK 'Ice Age Earth'"
    },
    {
      lang: "zh",
      text: "气候稳定有多重要？想象一下：如果你不知道明年夏天会不会很冷，你敢种粮食吗？只有天气稳定了，人类才敢'押注'在某一块地上、某一种植物上。",
      tier: "B",
      ref: "Smithsonian Climate & Civilization"
    }
  ],

  map_points: [
    { id: "natufian_core", name: "Levant (Natufian 核心)", country: "以色列/约旦/叙利亚", coords: [32.5, 35.5], significance: "气候变暖后最早半定居人群", source_tier: "A" },
    { id: "beringia", name: "Beringia 陆桥", country: "现已淹没", coords: [65.0, -169.0], significance: "智人通过此进入美洲", source_tier: "A" },
    { id: "doggerland", name: "Doggerland", country: "现北海", coords: [54.0, 2.0], significance: "气候变暖后被淹没的陆地", source_tier: "A" },
    { id: "younger_dryas_ice", name: "Lake Agassiz", country: "北美", coords: [50.0, -97.0], significance: "Younger Dryas 触发地", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "GRIP / GISP2 冰芯",
      held_at: "格陵兰科学考察",
      date: "记录过去 12 万年气候",
      tells_us: "提供逐年气温记录，证实 Younger Dryas 突然降温与升温（10 年内升温 7°C）。",
      source_tier: "A",
      source: "Alley 2000, Quaternary Science Reviews"
    },
    {
      name: "Natufian 镰刀刃 (微石片)",
      held_at: "以色列、英国博物馆",
      date: "约 14.5-11.5 ka",
      tells_us: "Natufian 人开始收割野生谷物，但还未驯化。文明的'前奏'。",
      source_tier: "A",
      source: "Bar-Yosef 1998"
    }
  ],

  key_events: [
    { time: "约 26 ka", event: "末次冰盛期开始", source_tier: "A" },
    { time: "约 20 ka", event: "LGM 顶峰", source_tier: "A" },
    { time: "约 18 ka", event: "全球开始变暖", source_tier: "A" },
    { time: "约 14.7 ka", event: "Bølling-Allerød 暖期开始", source_tier: "A" },
    { time: "约 12.9 ka", event: "Younger Dryas 突然降温开始", source_tier: "A" },
    { time: "约 11.7 ka", event: "Younger Dryas 结束 → Holocene 开始", source_tier: "A" },
    { time: "约 11 ka", event: "Levant 农业实验开始 (PPNA)", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Natufian 文化",
      role: "考古文化",
      contribution: "约 14.5-11.5 ka 的 Levant 半定居人群，最早系统采集野生谷物，是农业革命的前奏。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "Holocene 是迄今为止人类历史上最稳定的气候期——所有文明（农业、城市、国家、工业）都在这 12,000 年里建立。",
      reasoning: "之前的冰期/间冰期循环每几千年大变。Holocene 提供了文明实验所需的'稳定地球'。",
      source_tier: "A",
      source: "Diamond 1997 'Guns, Germs, and Steel'; Richerson 2001"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'气候变暖是新石器革命的唯一原因'",
      right: "气候是前提，但不是唯一原因。人口压力、知识累积、植物分布、文化变化都重要。",
      source_tier: "A",
      source: "Bar-Yosef & Belfer-Cohen 2002"
    }
  ],

  ai_tasks: [
    {
      task_id: "P05_Q1",
      prompt: "假设地球没有进入 Holocene 温暖期，人类还能发明农业吗？为什么？",
      type: "counterfactual_thinking",
      grading_criteria: ["稳定气候的重要性", "生长季", "降水可预测性"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 'Younger Dryas 是彗星撞击造成' — 学界主流仍认为是冰湖融水。彗星说证据不足。",
    "❌ 不要把'冰河时代结束'说成单一事件——是有反复的过程。"
  ],

  sources: [
    { tier: "A", citation: "Walker et al. (2009). Journal of Quaternary Science 24." },
    { tier: "A", citation: "Tierney et al. (2020). Nature 584." },
    { tier: "A", citation: "Smithsonian · Climate Change and Human Evolution", url: "https://humanorigins.si.edu/research/climate-and-human-evolution" }
  ]
},

// ════════════════════════════════════════════════════════════════
{
  node_id: "P06_agriculture_origins",
  title: "约1.2万-1万年前：农业出现",
  time_range: "约 12,000–9,000 年前 (Levant 核心)；其他中心稍晚",
  core_question: "为什么人类要发明农业？农业带来的是更好的生活吗？",

  fact_base: [
    {
      fact: "农业至少独立起源于 7 个中心：肥沃新月 (~12-10 kya，小麦大麦)；中国黄河 (粟，~10 kya)；中国长江 (水稻，~10 kya)；中美洲 (玉米，~9 kya)；安第斯 (土豆，~7 kya)；新几内亚 (香蕉、芋头，~7 kya)；非洲萨赫勒 (高粱、珍珠粟，~5 kya)。",
      source_tier: "A",
      source: "Larson et al. (2014). Current perspectives and the future of domestication studies. PNAS 111."
    },
    {
      fact: "Levant 八大祖先作物 (founder crops)：单粒小麦、二粒小麦、大麦、亚麻、扁豆、豌豆、鹰嘴豆、苦野豌豆。",
      source_tier: "A",
      source: "Zohary, Hopf, Weiss (2012). Domestication of Plants in the Old World. Oxford."
    },
    {
      fact: "动物驯化：狗最早 (~15-30 kya，多次独立起源)；绵羊、山羊 (~10.5 kya, Levant/Zagros)；牛 (~10 kya, Levant 和印度)；猪 (~9 kya, 多地)；马 (~5.5 kya, 中亚)。",
      source_tier: "A",
      source: "Frantz et al. (2016). Genomic and archaeological evidence suggests a dual origin of domestic dogs. Science 352."
    },
    {
      fact: "PPNA (前陶新石器 A 期) 约 11.5-10.5 kya — 开始定居、试验耕种但未完全驯化；PPNB (~10.5-8.3 kya) — 驯化完成、村庄扩大。",
      source_tier: "A",
      source: "Kuijt & Goring-Morris (2002). Foraging, farming, and social complexity in the Pre-Pottery Neolithic. Journal of World Prehistory 16."
    },
    {
      fact: "农业初期人类身体变差：身高下降、骨密度下降、龋齿增加、传染病增多。农业不是'更好的生活'，而是'养更多人'。",
      source_tier: "A",
      source: "Mummert et al. (2011). Stature and robusticity during the agricultural transition. Economics & Human Biology 9."
    },
    {
      fact: "中国水稻独立驯化：长江下游上山文化 (~10 kya) 与河姆渡文化 (~7 kya) 是关键证据。",
      source_tier: "A",
      source: "Fuller et al. (2009). The domestication process and domestication rate in rice: spikelet bases from the Lower Yangtze. Science 323."
    },
    {
      fact: "玉米从墨西哥 teosinte (大刍草) 驯化而来，约 9 kya 开始，5 kya 接近现代玉米形态。",
      source_tier: "A",
      source: "Piperno et al. (2009). Starch grain and phytolith evidence for early ninth millennium B.P. maize from the Central Balsas River Valley, Mexico. PNAS 106."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "1 万多年前，住在今天叙利亚、约旦、土耳其那一带的人，做了一件改变全人类的事——他们开始'种庄稼'。以前他们要追着野生植物跑，现在他们让植物在自家门口长。",
      tier: "B",
      ref: "DK 'The Story of Farming'"
    },
    {
      lang: "zh",
      text: "你以为种地是好事吗？刚开始其实更累、更饿、更容易生病。人为什么还要做？因为'养更多孩子'。一个采集者养活 1 个孩子，一个农夫能养活 5 个。",
      tier: "B",
      ref: "NatGeo Kids 'How Farming Changed the World'"
    },
    {
      lang: "zh",
      text: "农业不是某个聪明人'发明'的。是几千年里很多人慢慢试验：哪些种子第二年还能发芽？哪些谷子穗不掉？哪些羊不跑？慢慢地，植物和动物'被改造'了。",
      tier: "B",
      ref: "Smithsonian · Origins of Agriculture"
    }
  ],

  map_points: [
    { id: "fertile_crescent", name: "肥沃新月", country: "中东", coords: [33.0, 38.0], significance: "小麦/大麦/羊/牛驯化中心", source_tier: "A" },
    { id: "gobekli_tepe", name: "Göbekli Tepe", country: "土耳其", coords: [37.22, 38.92], significance: "PPNA 巨石建筑 + 早期定居", source_tier: "A" },
    { id: "abu_hureyra", name: "Abu Hureyra", country: "叙利亚", coords: [35.87, 38.40], significance: "PPNA 早期定居 + 驯化证据", source_tier: "A" },
    { id: "jericho", name: "Jericho", country: "巴勒斯坦", coords: [31.87, 35.44], significance: "PPNA 城镇雏形 (~11 ka)", source_tier: "A" },
    { id: "shangshan", name: "上山", country: "中国浙江", coords: [29.36, 119.78], significance: "最早水稻驯化证据 (~10 ka)", source_tier: "A" },
    { id: "jiahu", name: "贾湖", country: "中国河南", coords: [33.62, 113.65], significance: "黄河流域早期农业 + 骨笛", source_tier: "A" },
    { id: "tehuacan", name: "Tehuacán Valley", country: "墨西哥", coords: [18.46, -97.39], significance: "玉米驯化证据", source_tier: "A" },
    { id: "guila_naquitz", name: "Guilá Naquitz", country: "墨西哥", coords: [16.92, -96.40], significance: "早期玉米 + 南瓜 (~9 ka)", source_tier: "A" },
    { id: "kuk_swamp", name: "Kuk Swamp", country: "巴布亚新几内亚", coords: [-5.79, 144.33], significance: "独立农业起源 (香蕉、芋头)", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Abu Hureyra 烧焦谷物种子",
      held_at: "British Museum / Aleppo Museum",
      date: "约 13-11 ka",
      tells_us: "显示从野生采集向驯化的过渡——种子大小、形状随时间变化。",
      source_tier: "A",
      source: "Hillman et al. 2001"
    },
    {
      name: "Shangshan 陶器内壁稻粒印痕",
      held_at: "浙江省考古所",
      date: "约 10 ka",
      tells_us: "中国南方最早的水稻+陶器组合。",
      source_tier: "A",
      source: "Lu et al. 2009"
    },
    {
      name: "Guilá Naquitz 玉米穗",
      held_at: "Smithsonian National Museum of the American Indian",
      date: "约 6.2 ka",
      tells_us: "早期驯化玉米——比 teosinte 大但比现代玉米小。",
      source_tier: "A",
      source: "Benz 2001, PNAS"
    },
    {
      name: "Çayönü 驯化绵羊骨",
      held_at: "土耳其文化部",
      date: "约 10.4 ka",
      tells_us: "动物驯化的最早系统证据之一。",
      source_tier: "A",
      source: "Peters et al. 2005"
    }
  ],

  key_events: [
    { time: "约 14.5 ka", event: "Natufian 文化开始 (前农业)", source_tier: "A" },
    { time: "约 12 ka", event: "气候稳定 + Natufian 开始系统收割野生谷物", source_tier: "A" },
    { time: "约 11.5 ka", event: "PPNA — Levant 农业雏形", source_tier: "A" },
    { time: "约 10.5 ka", event: "PPNB — 八大作物完全驯化", source_tier: "A" },
    { time: "约 10 ka", event: "长江上山文化 — 中国水稻驯化", source_tier: "A" },
    { time: "约 10 ka", event: "羊、山羊在 Zagros 驯化", source_tier: "A" },
    { time: "约 9 ka", event: "玉米开始驯化 (墨西哥 Balsas)", source_tier: "A" },
    { time: "约 9 ka", event: "新几内亚 Kuk Swamp 农业", source_tier: "A" },
    { time: "约 7 ka", event: "土豆 (Andes)、高粱 (非洲)", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Natufian 人",
      role: "前农业半定居人群",
      contribution: "首先在 Levant 系统化采集野生谷物，发明镰刀和磨石。",
      source_tier: "A"
    },
    {
      name: "Gordon Childe",
      role: "考古学家 (1892-1957)",
      contribution: "提出'新石器革命' (Neolithic Revolution) 概念，奠定农业起源研究框架。",
      source_tier: "A"
    },
    {
      name: "Jared Diamond",
      role: "演化生物学家",
      contribution: "在《枪炮、病菌与钢铁》中分析为何不同大陆农业发展速度不同。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "农业是文明的基石——但不是因为它让人'更好'，而是因为它让人'更多'。人口密度提高才能产生分工、阶层、城市。",
      reasoning: "采集者每平方公里养活 ~0.1 人；早期农民 ~1 人；灌溉农民 ~10 人。城市需要 100 倍密度，必须靠农业。",
      source_tier: "A",
      source: "Mazoyer & Roudart (2006). A History of World Agriculture"
    },
    {
      claim: "农业带来私有财产、储存、不平等、传染病——文明的'光与影'同时出现。",
      reasoning: "粮仓需要保护 → 防御工事；粮食可继承 → 阶层固化；动物紧密接触 → 跨物种病毒。",
      source_tier: "A",
      source: "Scott (2017). Against the Grain: A Deep History of the Earliest States"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'农业是某个聪明人发明的'",
      right: "农业是几千年里很多人群、很多次试验逐渐成型的过程，没有单一发明者。",
      source_tier: "A",
      source: "Larson 2014"
    },
    {
      wrong: "'农业让人类生活更好'",
      right: "短期内农业让人变矮、变病、变累。它的'好处'是支撑了更多人口，从而推动了文明。",
      source_tier: "A",
      source: "Mummert 2011"
    },
    {
      wrong: "'农业只起源于一个地方然后传播'",
      right: "至少 7 个独立中心，证据来自考古学、古植物学、遗传学。",
      source_tier: "A",
      source: "Larson 2014, PNAS"
    }
  ],

  ai_tasks: [
    {
      task_id: "P06_Q1",
      prompt: "你是 1 万年前 Levant 一个 30 人小村的采集者。你的村长想让大家试着种麦子。列出 3 个赞成、3 个反对的理由。",
      type: "decision_simulation",
      grading_criteria: ["符合时代", "考虑食物稳定性 vs 自由迁移", "考虑劳动量"]
    },
    {
      task_id: "P06_Q2",
      prompt: "为什么农业最早出现在'肥沃新月'而不是其他地方？想想气候、植物、动物。",
      type: "concept_check",
      grading_criteria: ["地中海气候", "可驯化植物丰富", "可驯化动物 (羊/牛/猪)"]
    },
    {
      task_id: "P06_Q3",
      prompt: "如果你只能选一样：(a) 采集者的自由健康 (b) 农民的稳定但更累。你选什么？为什么？",
      type: "open_thinking",
      grading_criteria: ["理解 trade-off", "理由要有依据"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 '农业是因为人类变聪明了'",
    "❌ 不要把农业起源归功于单个'发明者'。",
    "❌ 不要说 '中国农业是从中东传过来的' — 是独立起源。",
    "✅ 强调'独立多中心起源'、'慢慢成型'、'有代价'。"
  ],

  sources: [
    { tier: "A", citation: "Larson et al. (2014). PNAS 111." },
    { tier: "A", citation: "Zohary, Hopf, Weiss (2012). Oxford University Press." },
    { tier: "A", citation: "Smithsonian · The Development of Agriculture", url: "https://humanorigins.si.edu/" },
    { tier: "A", citation: "Britannica · Origins of agriculture" },
    { tier: "A", citation: "Scott (2017). Against the Grain. Yale University Press." },
    { tier: "B", citation: "DK 'The Story of Farming'" }
  ]
},

// ════════════════════════════════════════════════════════════════
{
  node_id: "P07_settled_villages",
  title: "约1万-7千年前：定居村落",
  time_range: "约 11,500–7,000 年前",
  core_question: "人类为什么从流浪变成定居？村落和洞穴有什么不一样？",

  fact_base: [
    {
      fact: "Jericho 是已知最早的持续定居点之一，PPNA 时期 (~11.5 ka) 已有围墙、塔（直径 8.5m, 高 8.5m），人口估计 200-300。",
      source_tier: "A",
      source: "Kenyon (1957). Digging Up Jericho. British Museum."
    },
    {
      fact: "Çatalhöyük (土耳其) 约 9,400-7,500 年前，是已知最大新石器村落之一，人口达 5,000-8,000，房屋紧密相连，从屋顶进出。",
      source_tier: "A",
      source: "Hodder (2006). The Leopard's Tale: Revealing the Mysteries of Çatalhöyük. Thames & Hudson."
    },
    {
      fact: "Aşıklı Höyük (土耳其) 约 10.4-8.4 ka，是 PPNB 早期重要村落，显示从狩猎采集到牧业的过渡。",
      source_tier: "A",
      source: "Özbaşaran et al. (2018). The Beginnings of Farming in Anatolia. Archaeopress."
    },
    {
      fact: "定居初期人口骨骸显示新的健康挑战：传染病增加、儿童死亡率上升、营养不良（依赖单一谷物）。",
      source_tier: "A",
      source: "Larsen (2014). The Bioarchaeology of Çatalhöyük. American Anthropologist 116."
    },
    {
      fact: "Çatalhöyük 房屋下埋葬死者，墙上有抽象图案、动物头骨、女性塑像。可能是最早的'家祖崇拜'雏形。",
      source_tier: "A",
      source: "Hodder & Cessford (2004). Daily practice and social memory at Çatalhöyük. American Antiquity 69."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "想象一下：你以前住在山洞里，每隔几个月就要搬家。现在你的爷爷奶奶、爸爸妈妈、你、你的孩子，都住在同一个地方。这个地方有泥巴砌的房子、有粮仓、有羊圈、有公用的广场。这就是村落。",
      tier: "B",
      ref: "DK 'The First Villages'"
    },
    {
      lang: "zh",
      text: "Çatalhöyük 这个村子特别奇怪——房子贴着房子，没有街道。人从屋顶上进出。死人埋在自己家床下面。墙上画着牛头、豹子、女人。",
      tier: "B",
      ref: "Çatalhöyük Research Project · Education Materials"
    }
  ],

  map_points: [
    { id: "jericho2", name: "Jericho", country: "巴勒斯坦", coords: [31.87, 35.44], significance: "最早带围墙的定居点 (~11.5 ka)", source_tier: "A" },
    { id: "catalhoyuk", name: "Çatalhöyük", country: "土耳其", coords: [37.67, 32.83], significance: "大型新石器村落 (~9.4 ka)", source_tier: "A" },
    { id: "asikli", name: "Aşıklı Höyük", country: "土耳其", coords: [38.34, 34.21], significance: "PPNB 早期定居", source_tier: "A" },
    { id: "ain_ghazal", name: "'Ain Ghazal", country: "约旦", coords: [31.99, 35.97], significance: "大型 PPNB 村落 + 石灰人像", source_tier: "A" },
    { id: "mehrgarh", name: "Mehrgarh", country: "巴基斯坦", coords: [29.39, 67.62], significance: "南亚最早新石器村落 (~9 ka)", source_tier: "A" },
    { id: "banpo", name: "半坡", country: "中国西安", coords: [34.27, 109.04], significance: "黄河流域新石器村落 (~6.7 ka)", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Jericho 塔",
      held_at: "原址",
      date: "约 11 ka",
      tells_us: "最早的大型公共建筑——证明已能集体动员劳动力。",
      source_tier: "A",
      source: "Kenyon 1957"
    },
    {
      name: "Çatalhöyük 牛角祭坛 + 女性塑像 (\"Seated Woman\")",
      held_at: "Museum of Anatolian Civilizations, Ankara",
      date: "约 7.5 ka",
      tells_us: "宗教仪式 + 女性形象重要性 + 动物象征。",
      source_tier: "A",
      source: "Mellaart 1967"
    },
    {
      name: "'Ain Ghazal 石灰人像",
      held_at: "Jordan Museum + British Museum",
      date: "约 9 ka",
      tells_us: "已知最早的大型人形石灰雕像（约 1m 高），可能是祖先或神。",
      source_tier: "A",
      source: "Schmandt-Besserat 1998"
    }
  ],

  key_events: [
    { time: "约 11.5 ka", event: "Jericho 围墙建造", source_tier: "A" },
    { time: "约 10.5 ka", event: "PPNB 大型村落兴起", source_tier: "A" },
    { time: "约 9.4 ka", event: "Çatalhöyük 兴建", source_tier: "A" },
    { time: "约 9 ka", event: "Mehrgarh 南亚定居", source_tier: "A" },
    { time: "约 8.2 ka", event: "8.2 ka 气候事件 — Levant 农业短期中断", source_tier: "A" },
    { time: "约 7.5 ka", event: "Çatalhöyük 衰落", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Kathleen Kenyon",
      role: "英国考古学家 (1906-1978)",
      contribution: "1950 年代发掘 Jericho，建立新石器年代学。",
      source_tier: "A"
    },
    {
      name: "James Mellaart",
      role: "考古学家",
      contribution: "1958 发现 Çatalhöyük，掀起新石器革命研究热潮。",
      source_tier: "A"
    },
    {
      name: "Ian Hodder",
      role: "考古学家",
      contribution: "1990s-2010s 主持 Çatalhöyük 重新发掘，提出'物质纠缠'理论。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "村落是文明的'细胞'——所有后来的城市、国家、帝国都是村落的放大与连接。",
      reasoning: "村落首次让数百人长期共存，催生了规则、礼节、宗教、公共建筑、不平等的早期形式。",
      source_tier: "C",
      ref: "课程设计基于 Childe 1936 'Man Makes Himself'"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'人类先有定居才有农业'",
      right: "顺序复杂：Natufian 有半定居但未农业；有些地方先农业后定居。两者互相促进。",
      source_tier: "A",
      source: "Bar-Yosef 1998"
    },
    {
      wrong: "'村落比游牧更先进'",
      right: "游牧 (后来的) 是高度专业化的策略，不是'落后'。两种生活方式至今并存。",
      source_tier: "A",
      source: "Britannica · Pastoralism"
    }
  ],

  ai_tasks: [
    {
      task_id: "P07_Q1",
      prompt: "你是 9 千年前 Çatalhöyük 的孩子。描述你家的房子、你家旁边邻居的房子、你怎么从屋顶进家、你家床下面是谁。",
      type: "creative_writing_with_facts",
      grading_criteria: ["屋顶进出", "贴墙建筑", "祖先埋葬"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要给 Çatalhöyük 个人命名 — 没有书写记录。",
    "❌ 不要把 Jericho 塔说成是 '防御外敌' — 学界仍辩论 (可能是防洪、宗教、社会标志)。",
    "✅ 用 '我们认为可能...' 描述功能。"
  ],

  sources: [
    { tier: "A", citation: "Hodder (2006). The Leopard's Tale. Thames & Hudson." },
    { tier: "A", citation: "Çatalhöyük Research Project", url: "http://www.catalhoyuk.com/" },
    { tier: "A", citation: "British Museum · Jericho collection", url: "https://www.britishmuseum.org/" },
    { tier: "B", citation: "DK 'The First Villages'" }
  ]
},

// ════════════════════════════════════════════════════════════════
{
  node_id: "P08_pottery_storage",
  title: "约2万-6千年前：陶器与粮食储存",
  time_range: "约 20,000–6,000 年前 (东亚陶器早于农业)",
  core_question: "为什么人类发明陶器？储存粮食为什么改变了一切？",

  fact_base: [
    {
      fact: "最早的陶器：中国江西仙人洞陶器，约 20,000-19,000 年前——早于农业近 1 万年。",
      source_tier: "A",
      source: "Wu et al. (2012). Early pottery at 20,000 years ago in Xianrendong Cave, China. Science 336."
    },
    {
      fact: "日本绳文 (Jōmon) 陶器约 16,500-14,000 年前，是世界上最早成系列的陶器文化，且产生于狩猎采集而非农业社会。",
      source_tier: "A",
      source: "Habu (2004). Ancient Jomon of Japan. Cambridge University Press."
    },
    {
      fact: "Levant 陶器较晚 (~8,500 年前)，称为'前陶新石器' (Pre-Pottery Neolithic) 时期没有陶器。说明陶器与农业起源无必然关系。",
      source_tier: "A",
      source: "Kuijt & Goring-Morris 2002"
    },
    {
      fact: "陶器最初用途多样：煮食 (尤其鱼类/坚果)、储存液体、宗教仪式、葬礼器具。",
      source_tier: "A",
      source: "Craig et al. (2013). Earliest evidence for the use of pottery. Nature 496."
    },
    {
      fact: "粮食储存改变了社会：粮仓可被偷/抢/继承，催生'财产'与'阶级'。Natufian 已有早期储藏坑 (~13 ka)。",
      source_tier: "A",
      source: "Kuijt (2008). Demography and storage systems during the southern Levantine Neolithic. PNAS 105."
    },
    {
      fact: "陶器制作技术：盘条法 (coiling) → 慢轮 (~5.5 ka) → 快轮 (~3 ka, Levant/中国)。",
      source_tier: "A",
      source: "Roux (2019). Ceramics and Society. Springer."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "陶器是'人造石头'。把湿泥土捏成形，再用火烧，泥土就变硬变防水了。这是人类第一次'改变物质'的化学。",
      tier: "B",
      ref: "DK 'How Things Are Made: Pottery'"
    },
    {
      lang: "zh",
      text: "你知道吗？中国人和日本人在还没有农业的时候就开始做陶罐了！他们用陶罐煮鱼、煮坚果。陶器让食物能煮熟、能保存、能搬运。",
      tier: "B",
      ref: "Tokyo National Museum · Jōmon Kids"
    }
  ],

  map_points: [
    { id: "xianrendong", name: "仙人洞", country: "中国江西", coords: [28.73, 116.92], significance: "最早陶器 (~20 ka)", source_tier: "A" },
    { id: "yuchanyan", name: "玉蟾岩", country: "中国湖南", coords: [25.41, 111.51], significance: "早期陶器 (~18 ka)", source_tier: "A" },
    { id: "amur_basin", name: "黑龙江流域", country: "俄罗斯远东", coords: [49.6, 130.0], significance: "远东早期陶器 (~16 ka)", source_tier: "A" },
    { id: "jomon", name: "Jōmon 遗址 (Odai Yamamoto)", country: "日本青森", coords: [40.83, 140.85], significance: "绳文陶器 (~16.5 ka)", source_tier: "A" },
    { id: "kuk_pottery", name: "Sahara 陶器", country: "马里 Ounjougou", coords: [14.4, -3.5], significance: "非洲早期陶器 (~11.5 ka)", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "仙人洞陶罐残片",
      held_at: "中国国家博物馆",
      date: "约 20 ka",
      tells_us: "世界最早陶器之一，由狩猎采集者制造。",
      source_tier: "A",
      source: "Wu 2012, Science"
    },
    {
      name: "Jōmon 火焰陶器 (Kaen doki)",
      held_at: "Tokyo National Museum",
      date: "约 5 ka",
      tells_us: "绳文中期独特陶器，火焰状装饰，可能是祭祀用。",
      source_tier: "A",
      source: "Tokyo National Museum"
    },
    {
      name: "Natufian 储藏坑",
      held_at: "考古遗址",
      date: "约 13 ka",
      tells_us: "粮食储藏最早证据之一，先于陶器。",
      source_tier: "A",
      source: "Kuijt 2008"
    }
  ],

  key_events: [
    { time: "约 20 ka", event: "仙人洞陶器", source_tier: "A" },
    { time: "约 16.5 ka", event: "Jōmon 陶器开始", source_tier: "A" },
    { time: "约 13 ka", event: "Natufian 储藏坑", source_tier: "A" },
    { time: "约 11.5 ka", event: "非洲萨哈拉陶器", source_tier: "A" },
    { time: "约 8.5 ka", event: "Levant 出现陶器 (PPN 结束)", source_tier: "A" },
    { time: "约 5.5 ka", event: "陶轮发明", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Jōmon 人",
      role: "日本狩猎采集陶器制造者",
      contribution: "世界上最长的陶器传统 (1.5 万年)，证明陶器不依赖农业。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "粮食储存创造了'剩余' (surplus) ——剩余是不平等、阶级、税收、国家的根源。",
      reasoning: "没有剩余，所有人都必须干活；有剩余，就有人可以专职做祭司、士兵、工匠。",
      source_tier: "A",
      source: "Childe 1936; Scott 2017"
    },
    {
      claim: "陶器让人类首次'掌控物质变化' (土→陶) ——化学的史前萌芽，也是冶金的前身。",
      reasoning: "陶窑温度可达 800-1000°C，后来的青铜冶炼需要的温度技术由此而来。",
      source_tier: "C",
      ref: "课程设计"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'有了农业才有陶器'",
      right: "中国与日本陶器早于农业近 1 万年，由狩猎采集者发明。",
      source_tier: "A",
      source: "Wu 2012, Science"
    }
  ],

  ai_tasks: [
    {
      task_id: "P08_Q1",
      prompt: "如果你 2 万年前在中国南方山洞里发明了陶器，第一件你会做什么？煮鱼、储水、装坚果，还是别的？",
      type: "creative_thinking",
      grading_criteria: ["符合史前环境", "理解陶器多用途"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 '陶器是为了农业储粮发明的' — 顺序错了。",
    "❌ 不要把陶器起源归功于单一文化。"
  ],

  sources: [
    { tier: "A", citation: "Wu et al. (2012). Science 336." },
    { tier: "A", citation: "Craig et al. (2013). Nature 496." },
    { tier: "A", citation: "Tokyo National Museum · Jōmon Pottery", url: "https://www.tnm.jp/" }
  ]
},

// ════════════════════════════════════════════════════════════════
{
  node_id: "P09_specialization_trade_religion",
  title: "约1.1万-5千年前：分工、贸易、信仰",
  time_range: "约 11,500–5,000 年前",
  core_question: "什么时候有人不种地了？最早的'专家'做什么？神庙和市场怎么出现？",

  fact_base: [
    {
      fact: "Göbekli Tepe (土耳其) 约 11,500-9,500 年前，是已知最早的大型宗教建筑遗址。T 形巨石柱重达 10-16 吨，由狩猎采集者建造——早于农业。",
      source_tier: "A",
      source: "Schmidt (2010). Göbekli Tepe – the Stone Age Sanctuaries. Documenta Praehistorica 37; UNESCO World Heritage."
    },
    {
      fact: "黑曜石贸易：Çatalhöyük 使用的黑曜石来自 200 公里外的 Cappadocia 火山；Çayönü 黑曜石走 400 公里。证明早期长距离贸易网络。",
      source_tier: "A",
      source: "Carter et al. (2008). Obsidian sourcing at Çatalhöyük. Journal of Archaeological Science 35."
    },
    {
      fact: "玉与海贝贸易：中国新石器晚期红山、良渚文化已用千里之外的玉与海贝。",
      source_tier: "A",
      source: "Jing et al. (2014). The Origins of Jade in China"
    },
    {
      fact: "分工证据：'Ain Ghazal、Çatalhöyük 出现专门的石器制作区、陶器作坊、宗教仪式区。说明部分人不再从事食物生产。",
      source_tier: "A",
      source: "Hodder 2006; Rollefson 2000"
    },
    {
      fact: "最早的金属：约 9,000 年前 Çayönü、Aşıklı 已有冷锻铜；炼铜约 7,000 年前 (Vinča 文化, 巴尔干)。",
      source_tier: "A",
      source: "Roberts et al. (2009). Development of metallurgy in Eurasia. Antiquity 83."
    },
    {
      fact: "Stonehenge (英国) 约 5,000-4,000 年前，巨石阵显示天文知识、远距离运输 (蓝石来自 250 公里外的威尔士) 和大型集体仪式。",
      source_tier: "A",
      source: "Parker Pearson (2012). Stonehenge: Exploring the Greatest Stone Age Mystery. Simon & Schuster."
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "11,500 年前，在土耳其的山顶上，一群还在打猎的人做了一件不可思议的事：他们搬来 10 吨重的石柱，雕上狮子、蛇、蝎子，立成圈。这是 Göbekli Tepe。为什么打猎的人要修神庙？没人确定。",
      tier: "B",
      ref: "DK 'Lost Worlds'"
    },
    {
      lang: "zh",
      text: "村子大了，慢慢有人不种地了——有人专门做陶罐、有人专门做石刀、有人专门跟神说话（祭司）。这就是'分工'。",
      tier: "B",
      ref: "Smithsonian · Origins of Civilization"
    },
    {
      lang: "zh",
      text: "村子之间也开始'交换'。我有黑色火山玻璃（黑曜石），你有海贝壳，我们换。这就是最早的贸易。",
      tier: "B",
      ref: "British Museum · Trade in the Ancient World"
    }
  ],

  map_points: [
    { id: "gobekli", name: "Göbekli Tepe", country: "土耳其", coords: [37.22, 38.92], significance: "最早巨石神庙 (~11.5 ka)", source_tier: "A" },
    { id: "karahantepe", name: "Karahan Tepe", country: "土耳其", coords: [37.10, 38.95], significance: "同时期巨石遗址", source_tier: "A" },
    { id: "stonehenge", name: "Stonehenge", country: "英国", coords: [51.18, -1.83], significance: "巨石天文仪式 (~5 ka)", source_tier: "A" },
    { id: "varna", name: "Varna 墓地", country: "保加利亚", coords: [43.21, 27.92], significance: "最早金器陪葬 + 阶层分化 (~6.5 ka)", source_tier: "A" },
    { id: "vinca", name: "Vinča-Belo Brdo", country: "塞尔维亚", coords: [44.75, 20.61], significance: "最早炼铜 + 原始文字符号", source_tier: "A" },
    { id: "liangzhu", name: "良渚", country: "中国浙江", coords: [30.39, 120.05], significance: "玉器礼制 + 早期国家 (~5 ka)", source_tier: "A" },
    { id: "hongshan", name: "红山", country: "中国辽宁", coords: [41.86, 119.05], significance: "玉龙 + 女神庙 (~5.5 ka)", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Göbekli Tepe T 形石柱 (Pillar 18, 33)",
      held_at: "Şanlıurfa Museum, Turkey",
      date: "约 11 ka",
      tells_us: "狮、狐、蛇、蝎雕刻；可能是祖先化身或神灵；建造需要数百人协作。",
      source_tier: "A",
      source: "Schmidt 2010"
    },
    {
      name: "Varna 黄金陪葬 (Tomb 43)",
      held_at: "Varna Archaeological Museum",
      date: "约 6.5 ka",
      tells_us: "1.5 公斤黄金陪葬一人，显示已有显著阶层差异。",
      source_tier: "A",
      source: "Renfrew 1986"
    },
    {
      name: "良渚玉琮",
      held_at: "故宫博物院 / 良渚博物院",
      date: "约 5 ka",
      tells_us: "复杂玉器礼制，需要专业工匠，反映等级社会与神权。",
      source_tier: "A",
      source: "Liu & Chen 2012"
    },
    {
      name: "Stonehenge 蓝石",
      held_at: "原址",
      date: "约 5 ka",
      tells_us: "蓝石来自 240 公里外的 Preseli Hills；冬至日出日落对齐——天文知识 + 长距离协调。",
      source_tier: "A",
      source: "Parker Pearson 2012"
    }
  ],

  key_events: [
    { time: "约 11.5 ka", event: "Göbekli Tepe 兴建", source_tier: "A" },
    { time: "约 9 ka", event: "Çayönü 冷锻铜", source_tier: "A" },
    { time: "约 7 ka", event: "Vinča 炼铜", source_tier: "A" },
    { time: "约 6.5 ka", event: "Varna 金器墓 — 最早阶层", source_tier: "A" },
    { time: "约 5.5 ka", event: "红山玉龙", source_tier: "A" },
    { time: "约 5 ka", event: "良渚玉礼制 / Stonehenge 主体完成", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Klaus Schmidt",
      role: "德国考古学家 (1953-2014)",
      contribution: "1994 发现 Göbekli Tepe；提出'神庙先于城市'颠覆性观点。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "Göbekli Tepe 颠覆了传统观点：可能是'宗教先于农业'，而非'农业先于宗教'。集体仪式可能催生了定居和耕种。",
      reasoning: "建造神庙需要长期聚集大量人手，需要食物供给，可能反推动了周边农业试验。",
      source_tier: "A",
      source: "Schmidt 2010; Dietrich 2012"
    },
    {
      claim: "分工 + 贸易 + 信仰 = 复杂社会的三大支柱。城市与国家是这三者结合后的必然产物。",
      reasoning: "工匠需要被'喂养'→ 剩余分配 → 谁分配？→ 祭司或首领 → 权力。贸易需要标准 → 度量衡 → 早期数学。",
      source_tier: "C",
      ref: "课程设计基于 Childe / Renfrew"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'最早的神庙是为农神祈祷的'",
      right: "Göbekli Tepe 建于农业之前；动物雕刻多为野生动物 (狮、蛇)，非农作物。",
      source_tier: "A",
      source: "Schmidt 2010"
    },
    {
      wrong: "'贸易要等到金钱发明后'",
      right: "金钱很晚 (~3 ka)，但以物易物的长距离贸易在 1 万年前就有 (黑曜石、贝壳、玉、琥珀)。",
      source_tier: "A",
      source: "Renfrew 1969 'Trade and Culture Process'"
    }
  ],

  ai_tasks: [
    {
      task_id: "P09_Q1",
      prompt: "你是 1 万 1 千年前一个 50 人狩猎群体的领头。村长说要去 Göbekli Tepe 一起搬石头。你的人要去 3 个月。你怎么决定？",
      type: "decision_simulation",
      grading_criteria: ["食物组织", "群体协作", "宗教 vs 实用考量"]
    },
    {
      task_id: "P09_Q2",
      prompt: "如果分工出现 = 有人不种地。这群'专家'是谁来养活的？想想这意味着什么。",
      type: "concept_check",
      grading_criteria: ["剩余概念", "权力", "不平等萌芽"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 Göbekli Tepe 是 '外星人造的' — 这是 D 级谣言。",
    "❌ 不要给史前贸易商赋予 '商人' 现代身份。",
    "✅ 区分 '宗教功能' (推测) 与 '建筑事实' (可证)。"
  ],

  sources: [
    { tier: "A", citation: "Schmidt (2010). Documenta Praehistorica 37." },
    { tier: "A", citation: "Parker Pearson (2012). Stonehenge. Simon & Schuster." },
    { tier: "A", citation: "UNESCO · Göbekli Tepe", url: "https://whc.unesco.org/en/list/1572/" },
    { tier: "A", citation: "British Museum · Prehistory of Trade" },
    { tier: "B", citation: "DK 'Lost Worlds'" }
  ]
},

// ════════════════════════════════════════════════════════════════
{
  node_id: "P10_complex_settlements_to_cities",
  title: "约6千-5千年前：复杂聚落到城市",
  time_range: "约 6,500–5,000 年前",
  core_question: "村落怎么变成城市？什么时候人类不再是'人类'，而是'公民'？",

  fact_base: [
    {
      fact: "Uruk (乌鲁克, 今伊拉克) 约 4,000 BCE 兴起，5,000 BCE 已有数万居民，被认为是世界上第一座城市。",
      source_tier: "A",
      source: "Liverani (2006). Uruk: The First City. Equinox; British Museum · Mesopotamia"
    },
    {
      fact: "Uruk 出现了世界上最早的文字（楔形文字前身），约 3,300 BCE，用于记录粮食、牲畜、劳动力分配。",
      source_tier: "A",
      source: "Schmandt-Besserat (1992). Before Writing. University of Texas Press."
    },
    {
      fact: "Uruk 时期出现了：神庙建筑 (Eanna 区)、行政系统、专业工匠、印章管理、长距离贸易（青金石来自阿富汗）。",
      source_tier: "A",
      source: "Algaze (2008). Ancient Mesopotamia at the Dawn of Civilization. University of Chicago Press."
    },
    {
      fact: "Mohenjo-daro 和 Harappa (印度河谷文明) 约 2,600-1,900 BCE，城市规模 (4-8 万人)，有规划街道、下水道、标准化砖块、未解读文字。",
      source_tier: "A",
      source: "Kenoyer (1998). Ancient Cities of the Indus Valley Civilization. Oxford University Press."
    },
    {
      fact: "中国黄河流域：陶寺 (~4.3-3.9 ka)，城墙、宫殿、观象台、最早可能的文字符号。",
      source_tier: "A",
      source: "Liu & Chen (2012). The Archaeology of China. Cambridge University Press."
    },
    {
      fact: "长江下游：良渚古城 (~5.3-4.3 ka)，面积 6.3 平方公里，有宫殿、水利系统 (世界最早大型水利之一)，UNESCO 世界遗产。",
      source_tier: "A",
      source: "UNESCO · Archaeological Ruins of Liangzhu City; Renfrew & Liu 2018"
    }
  ],

  child_explanation: [
    {
      lang: "zh",
      text: "城市和村子不一样——城市里大部分人不种地。城市需要农民'养'。城市有专门的祭司、士兵、工匠、商人、记账员。城市有围墙、神庙、市场、街道。",
      tier: "B",
      ref: "DK 'The First Cities'"
    },
    {
      lang: "zh",
      text: "世界第一座城市叫乌鲁克，5000 多年前在今天的伊拉克。住了几万人。他们发明了泥板上的小符号（楔形文字）来记账：'某某欠某某 3 头羊'。",
      tier: "B",
      ref: "British Museum Kids · Mesopotamia"
    },
    {
      lang: "zh",
      text: "城市里第一次有了'陌生人'。在村子里你认识每个人。在城市里，你身边的人可能你一辈子都不会认识。这就需要'规则'——法律就这样出现了。",
      tier: "B",
      ref: "Smithsonian · Origins of Cities"
    }
  ],

  map_points: [
    { id: "uruk", name: "Uruk (乌鲁克)", country: "伊拉克", coords: [31.32, 45.64], significance: "第一座城市 (~4 ka BCE)", source_tier: "A" },
    { id: "eridu", name: "Eridu", country: "伊拉克", coords: [30.82, 45.99], significance: "苏美尔最早城市之一", source_tier: "A" },
    { id: "tepe_yahya", name: "Tepe Yahya", country: "伊朗", coords: [28.06, 57.04], significance: "Uruk 贸易网络扩张", source_tier: "A" },
    { id: "mohenjo_daro", name: "Mohenjo-daro", country: "巴基斯坦", coords: [27.32, 68.14], significance: "印度河文明大都会", source_tier: "A" },
    { id: "harappa", name: "Harappa", country: "巴基斯坦", coords: [30.63, 72.86], significance: "印度河文明大都会", source_tier: "A" },
    { id: "liangzhu", name: "良渚古城", country: "中国浙江", coords: [30.39, 120.05], significance: "长江下游早期城市 (~5 ka)", source_tier: "A" },
    { id: "taosi", name: "陶寺", country: "中国山西", coords: [35.86, 111.50], significance: "黄河流域早期城市 + 观象台", source_tier: "A" },
    { id: "hierakonpolis", name: "Hierakonpolis (Nekhen)", country: "埃及", coords: [25.10, 32.78], significance: "前王朝埃及最大聚落", source_tier: "A" }
  ],

  evidence_objects: [
    {
      name: "Uruk Vase (Warka Vase)",
      held_at: "伊拉克国家博物馆",
      date: "约 3,200-3,000 BCE",
      tells_us: "雕刻三层场景——农产品、动物、祭司向 Inanna 女神献祭。最早叙事艺术之一。",
      source_tier: "A",
      source: "British Museum"
    },
    {
      name: "Cuneiform 楔形泥板 (最早记账)",
      held_at: "大英博物馆 / 卢浮宫 / Iraq Museum",
      date: "约 3,300 BCE",
      tells_us: "记录大麦、牲畜、劳动力，世界最早文字记录。",
      source_tier: "A",
      source: "Schmandt-Besserat 1992"
    },
    {
      name: "Mohenjo-daro 'Priest-King' 像",
      held_at: "Karachi National Museum",
      date: "约 2,200 BCE",
      tells_us: "印度河文明最著名雕像——身份未定（可能不是国王）。",
      source_tier: "A",
      source: "Kenoyer 1998"
    },
    {
      name: "良渚玉琮王",
      held_at: "浙江省博物馆",
      date: "约 5 ka",
      tells_us: "8.8 cm 高玉琮，神人兽面纹，神权与王权象征。",
      source_tier: "A",
      source: "Renfrew & Liu 2018"
    },
    {
      name: "陶寺铜铃",
      held_at: "中国社会科学院",
      date: "约 4 ka",
      tells_us: "中国最早合范铸造铜器之一，技术与组织复杂。",
      source_tier: "A",
      source: "Liu & Chen 2012"
    }
  ],

  key_events: [
    { time: "约 5.3 ka", event: "良渚古城建成", source_tier: "A" },
    { time: "约 5 ka", event: "Uruk 兴起", source_tier: "A" },
    { time: "约 4.3 ka", event: "陶寺兴起", source_tier: "A" },
    { time: "约 3.3 ka BCE", event: "楔形文字出现 (Uruk IV 层)", source_tier: "A" },
    { time: "约 3.1 ka BCE", event: "埃及统一 (Narmer Palette)", source_tier: "A" },
    { time: "约 2.6 ka BCE", event: "Mohenjo-daro / Harappa 鼎盛", source_tier: "A" }
  ],

  key_people_or_groups: [
    {
      name: "Sumerians (苏美尔人)",
      role: "美索不达米亚人群",
      contribution: "建立 Uruk、Eridu、Ur 等城市；发明楔形文字、车轮、灌溉系统。",
      source_tier: "A"
    },
    {
      name: "Harappans (印度河人)",
      role: "南亚城市文明",
      contribution: "建立全球已知最先进的史前城市规划，文字未破译。",
      source_tier: "A"
    },
    {
      name: "良渚人",
      role: "长江下游早期国家",
      contribution: "建造大型水利、玉器礼制、可能的早期王权。",
      source_tier: "A"
    }
  ],

  civilization_connection: [
    {
      claim: "城市是史前文明的终点，也是 '历史' 的起点。文字、法律、阶级、官僚、税收都在这里出现。",
      reasoning: "Uruk 之后，人类不再仅依赖考古学，而开始有'文献'。'史前'与'历史'的边界。",
      source_tier: "A",
      source: "Childe 1950 'The Urban Revolution'"
    },
    {
      claim: "城市同时带来：知识爆炸 (天文/数学/建筑) 与 不平等加剧 (奴隶/阶级/性别压迫)。",
      reasoning: "考古证据：Uruk 神庙记录显示奴隶交易；良渚墓葬陪葬差异巨大。文明从一开始就有'光与影'。",
      source_tier: "A",
      source: "Scott 2017"
    }
  ],

  common_misconceptions: [
    {
      wrong: "'最早的城市是 Ur 或 Babylon'",
      right: "Uruk 比 Ur 更早；Babylon 是数千年后的。Uruk 是目前考古证据中的'第一城'。",
      source_tier: "A",
      source: "British Museum"
    },
    {
      wrong: "'文字是埃及人发明的'",
      right: "最早文字 (楔形) 在 Sumer (~3,300 BCE)，埃及象形文字 (~3,200 BCE) 几乎同时。两者独立。",
      source_tier: "A",
      source: "Britannica · Writing systems"
    },
    {
      wrong: "'城市出现 = 一切变好'",
      right: "城市同时带来阶级、瘟疫、奴役、战争。文明是'光与影'同时。",
      source_tier: "A",
      source: "Scott 2017"
    }
  ],

  ai_tasks: [
    {
      task_id: "P10_Q1",
      prompt: "你是 5,000 年前 Uruk 的小孩。爸爸是陶工，邻居是祭司，街对面是商人。描述你的一天。要符合考古证据 (有泥砖房、有神庙、有运河、有泥板)。",
      type: "creative_writing_with_facts",
      grading_criteria: ["分工社会", "无金属货币（用大麦/银计量）", "有文字但不普及", "灌溉农业"]
    },
    {
      task_id: "P10_Q2",
      prompt: "为什么城市需要文字？想想：村子里不需要文字，因为大家都认识。城市里有几万人不认识，记账靠什么？",
      type: "concept_check",
      grading_criteria: ["匿名性", "记账", "传递信息", "权力管理"]
    },
    {
      task_id: "P10_Q3",
      prompt: "如果你能回到 5,000 年前，你会选择留在 100 人的村子里，还是搬到 5 万人的 Uruk？你的理由是什么？",
      type: "open_thinking",
      grading_criteria: ["权衡利弊", "理解城乡差异", "无现代偏见"]
    }
  ],

  anti_hallucination_rules: [
    "❌ 不要说 '苏美尔人是黑人/白人/某族' — 缺乏证据，避免现代族群投射。",
    "❌ 不要说 '印度河文字内容是 X' — 至今未破译。",
    "❌ 不要把 Uruk 描绘成中世纪欧洲城市 (城堡/骑士) ——它是泥砖城。",
    "✅ 用 '我们目前认为...' 描述社会结构推断。"
  ],

  sources: [
    { tier: "A", citation: "Liverani (2006). Uruk: The First City. Equinox." },
    { tier: "A", citation: "Algaze (2008). Ancient Mesopotamia at the Dawn of Civilization. Chicago." },
    { tier: "A", citation: "British Museum · Mesopotamia", url: "https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-mesopotamia" },
    { tier: "A", citation: "UNESCO · Liangzhu", url: "https://whc.unesco.org/en/list/1592/" },
    { tier: "A", citation: "Kenoyer (1998). Ancient Cities of the Indus Valley. Oxford." },
    { tier: "A", citation: "Smithsonian · Origins of Civilization" },
    { tier: "B", citation: "DK 'The First Cities'" }
  ]
}

];

// ════════════════════════════════════════════════════════════════
// 注册到全局
// ════════════════════════════════════════════════════════════════
if (typeof window !== 'undefined') {
  window.PREHISTORIC_KB = PREHISTORIC_KB;
}

// 提供检索 helper
const PREHISTORIC_KB_INDEX = (() => {
  const idx = [];
  PREHISTORIC_KB.forEach(node => {
    // 主节点
    idx.push({
      type: 'node', node_id: node.node_id, era_hint: node.node_id,
      title: node.title, body: node.core_question,
      keywords: [node.title, node.time_range, node.core_question]
    });
    // 事实
    (node.fact_base || []).forEach((f, i) => {
      idx.push({
        type: 'fact', node_id: node.node_id, era_hint: node.node_id,
        title: `${node.title} · 事实 ${i+1}`,
        body: f.fact, source_tier: f.source_tier, source: f.source,
        keywords: [f.fact]
      });
    });
    // 地图点
    (node.map_points || []).forEach(m => {
      idx.push({
        type: 'map_point', node_id: node.node_id, era_hint: node.node_id,
        title: m.name, body: `${m.country} · ${m.significance}`,
        coords: m.coords, keywords: [m.name, m.country, m.significance]
      });
    });
    // 证据物
    (node.evidence_objects || []).forEach(ev => {
      idx.push({
        type: 'evidence', node_id: node.node_id, era_hint: node.node_id,
        title: ev.name, body: `${ev.date} · ${ev.tells_us}`,
        source: ev.source, source_tier: ev.source_tier,
        keywords: [ev.name, ev.held_at, ev.tells_us]
      });
    });
    // 事件
    (node.key_events || []).forEach(ev => {
      idx.push({
        type: 'event', node_id: node.node_id, era_hint: node.node_id,
        title: `${ev.time} · ${ev.event}`, body: ev.event,
        keywords: [ev.time, ev.event]
      });
    });
    // 误解
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
  window.PREHISTORIC_KB_INDEX = PREHISTORIC_KB_INDEX;
  console.log('[PREHISTORIC_KB] loaded', PREHISTORIC_KB.length, 'nodes,', PREHISTORIC_KB_INDEX.length, 'index entries');
}
