// AI世界文明实验室 · 课程数据

const TIMELINE = [
  { id: "L01", time: "公元前3000年", title: "文明从哪里开始？", badge: "早期文明探索者", status: "active" },
  { id: "L02", time: "公元前2500年", title: "金字塔、神庙与城市国家", badge: "权力中心建筑师", status: "active" },
  { id: "L03", time: "公元前1600年", title: "青铜、战车与早期王国", badge: "青铜时代工匠", status: "active" },
  { id: "L04", time: "公元前1200年", title: "青铜时代的崩溃", badge: "文明重启顾问", status: "active" },
  { id: "L05", time: "公元前500年", title: "思想大爆发时代", badge: "思想时代观察员", status: "active" },
  { id: "L06", time: "公元前221年", title: "统一时代：帝国如何诞生？", badge: "帝国设计师", status: "active" },
  { id: "L07", time: "公元1年", title: "丝绸之路与帝国网络", badge: "丝路旅行者", status: "active" },
  { id: "L08", time: "公元300年", title: "帝国危机与文明转型", badge: "文明转型观察者", status: "active" },
  { id: "L09", time: "公元600年", title: "宗教、迁徙与新文明秩序", badge: "信仰迁徙者", status: "active" },
  { id: "L10", time: "公元800年", title: "黄金时代：知识、贸易与大城市", badge: "知识黄金时代", status: "active" },
  { id: "L11", time: "公元1000年", title: "中世纪世界：新的全球格局", badge: "全球格局观察员", status: "active" },
  { id: "L12", time: "综合展示", title: "文明博览会：我的原创古代文明", badge: "文明创造者", status: "active" },
];

const LESSONS_DATA = {
  L01: {
    id: "L01", time: "公元前3000年", title: "文明从哪里开始？",
    question: "为什么人类会从村落走向城市？",
    takeaway: "文明不是突然出现的，而是从河流、农业、粮食剩余、分工、城市和管理中逐渐形成的。",
    snapshot: "大约公元前3000年前后，世界大多数人仍生活在村落、部落、早期农业或狩猎采集社会中，但在一些大河流域，复杂社会正在出现：城市、王权、文字、神庙、灌溉、贸易开始成为文明的新特征。",
    chain: ["河流资源","农业定居","粮食剩余","人口增长","分工出现","公共工程","管理和记录","城市与文明"],
    concepts: [
      { name: "大河流域", text: "河流带来水、肥沃土地和交通，也带来洪水、边界变化和管理压力。" },
      { name: "农业剩余", text: "粮食超过当天需要后，人们可以储存、交换，并支持工匠、记录员、祭司和管理者。" },
      { name: "城市化", text: "城市不是房子变多，而是人口、职业、资源、规则和公共建筑共同变复杂。" },
      { name: "文字记录", text: "早期文字常常和记录物资、劳动、土地、贡品和权力有关。" },
      { name: "社会分层", text: "墓葬、建筑、物品和职责差异，可能说明社会内部地位开始不同。" },
    ],
    mapPoints: [
      { id: "mesopotamia_3000", name: "两河流域", x: 51, y: 44, type: "文明核心区", status: "exploring", child: "两条河之间，城市、神庙和早期文字正在发展。", fact: "苏美尔城市、灌溉农业、神庙和早期文字系统逐渐发展。", confidence: "confirmed", keywords: ["苏美尔","乌鲁克","灌溉","神庙","楔形文字"], material: ["泥砖城市","神庙平台","水渠","泥板记录员","粮仓"] },
      { id: "egypt_3000", name: "埃及尼罗河流域", x: 49, y: 53, type: "文明核心区", status: "exploring", child: "尼罗河带来农业、秩序和早期王权。", fact: "早王朝时期，尼罗河农业、行政和王权发展。", confidence: "confirmed", keywords: ["尼罗河","早王朝","王权","农业节奏"], material: ["尼罗河农田","粮仓","书记员","早期王权仪式"] },
      { id: "indus_3000", name: "印度河流域", x: 62, y: 51, type: "早期发展区", status: "exploring", child: "一个正在走向成熟城市的文明区域。", fact: "早期哈拉帕阶段，成熟城市高峰稍后出现。", confidence: "cautious", keywords: ["早期哈拉帕","聚落","城市规划","贸易"], material: ["早期聚落","陶器","手工业作坊","河边农田"] },
      { id: "china_yellow_3000", name: "黄河流域", x: 72, y: 43, type: "早期文化区", status: "exploring", child: "农业村落和陶器文化发展。", fact: "中国新石器晚期多区域文化发展的一部分。", confidence: "cautious", keywords: ["仰韶","龙山","陶器","农业村落"], material: ["彩陶","黑陶","粟作农田","聚落"] },
      { id: "china_yangtze_3000", name: "长江流域", x: 73.5, y: 50, type: "早期文化区", status: "exploring", child: "稻作农业和区域文化发展。", fact: "长江流域存在重要新石器文化和复杂化趋势。", confidence: "cautious", keywords: ["良渚","稻作","玉器","礼仪"], material: ["稻田","玉器","礼仪中心","水边聚落"] },
      { id: "europe_3000", name: "欧洲巨石区域", x: 42, y: 34, type: "同步观察点", status: "visited", child: "巨石建筑和农业村落显示集体组织能力。", fact: "欧洲部分地区有新石器晚期巨石建筑和农业社会。", confidence: "cautious", keywords: ["巨石","农业村落","礼仪"], material: ["巨石纪念物","村落","集体劳动"] },
      { id: "americas_3000", name: "安第斯沿海区域", x: 25, y: 70, type: "同步观察点", status: "visited", child: "美洲早期复杂社会正在积累。", fact: "安第斯区域后续出现早期复杂社会，需谨慎表达。", confidence: "cautious", keywords: ["安第斯","海洋资源","早期复杂社会"], material: ["海岸聚落","渔网","公共平台"] },
    ],
    regions: [
      { id: "mesopotamia", name: "两河流域", title: "两条河之间的城市", summary: "两河流域是观察城市如何出现的重要地区。人们在底格里斯河和幼发拉底河之间修水渠、种粮食、建城市，用泥板记录物资。城市里有神庙、市场、工匠、商人和管理者。", facts: ["乌鲁克等城市代表了这一地区城市化的重要发展。", "早期文字和泥板记录常与物资、劳动、牲畜和粮食管理有关。", "神庙可能同时承担信仰、储藏、分配和组织劳动的功能。"], avoid: ["不要说成现代国家。", "不要把苏美尔城邦讲成一个统一帝国。"] },
      { id: "egypt", name: "埃及", title: "尼罗河边的秩序", summary: "古埃及最重要的自然力量是尼罗河。尼罗河带来水、肥沃土地和农业节奏。公元前3000年前后，埃及进入早王朝时期，早期王权、行政和宗教秩序逐渐发展。", facts: ["埃及统一传统通常放在约公元前3100年前后。", "这一课重点是早期王权和尼罗河秩序，不是金字塔高峰。", "金字塔的著名建设高峰主要属于稍后的古王国时期。"], avoid: ["不要把金字塔时代作为本课核心。", "不要把埃及讲成现代意义国家。"] },
      { id: "indus", name: "印度河流域", title: "正在走向规划城市的文明", summary: "印度河流域在公元前3000年前后处于早期哈拉帕阶段。成熟城市如哈拉帕、摩亨佐-达罗的高峰主要在稍后出现，因此要用「正在发展、逐渐形成」的表达。", facts: ["早期哈拉帕阶段通常约公元前3300-2600年。", "成熟哈拉帕阶段通常在约公元前2600年后。", "后来印度河城市以规划、排水和手工业闻名。"], avoid: ["不要把成熟城市全部特征提前。", "不要把政治结构说得过于确定。"] },
      { id: "china", name: "中国早期文化", title: "中国文明正在长大", summary: "公元前3000年前后的中国不是秦朝、汉朝或商朝，而是新石器晚期多区域文化发展阶段。黄河、长江等区域的人们发展农业、陶器、聚落、礼仪和社会复杂化。", facts: ["仰韶文化大致在公元前5000-3000年。", "龙山文化大致从公元前3000年后发展。", "良渚、红山等区域文化说明早期中国不是单一线性发展。"], avoid: ["不要说成成熟统一王朝。", "不要把商朝青铜文明提前到本课。"] },
    ],
    changes: [
      { time: "约公元前3300年", text: "两河和埃及文字记录发展，记录逐渐服务于管理、物资和权力表达。" },
      { time: "约公元前3100年", text: "埃及统一和早王朝传统形成，尼罗河流域的王权秩序增强。" },
      { time: "约公元前3000年", text: "两河城市化、印度河早期哈拉帕、中国新石器晚期复杂化成为重要观察点。" },
      { time: "约公元前2600年后", text: "印度河成熟哈拉帕城市高峰、埃及古王国金字塔高峰陆续出现。" },
    ],
    sources: [
      { label: "British Museum: Sumer", url: "https://www.britishmuseum.org/learn/schools/ages-7-11/middle-east-and-asia/classroom-resource-sumer" },
      { label: "British Museum: Ancient Egypt", url: "https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-egypt" },
      { label: "Britannica: Indus civilization", url: "https://www.britannica.com/topic/Indus-civilization" },
      { label: "The Met: Neolithic China", url: "https://www.metmuseum.org/toah/hd/cneo/hd_cneo.htm" },
    ],
    aiTask: {
      title: "设计一座人类第一城",
      background: "你生活在大约公元前3000年，在一片大河旁边，你决定建立一座城市。这座城市必须能养活很多人，让不同职业的人合作，抵御危险，并且留下记录。",
      mustInclude: ["河流", "农田", "粮仓", "住宅", "市场", "神庙或公共中心", "水渠或道路", "一个危险（洪水、粮食不足、外敌等）"],
      forbidden: ["汽车", "电灯", "火药", "铁轨", "现代国旗", "玻璃高楼", "机器人"],
      commonErrors: ["把中国说成成熟王朝国家", "把所有文明说成同一时间完全成熟", "图像中出现现代道路、电线、玻璃建筑"],
      systemPrompt: "你是AI世界文明实验室助手，帮助10-12岁学生学习公元前3000年前后的早期文明。知识框架：两河流域（苏美尔城市、楔形文字）、埃及（早王朝、尼罗河）、印度河（早期哈拉帕）、中国（新石器晚期）。核心因果链：河流→农业→粮食剩余→分工→城市→管理→文明。不要出现汽车、电灯、火药等现代事物。说话方式简洁有启发性。",
      fields: [
        { name: "cityName", label: "城市名字", placeholder: "给你的城市起个名字..." },
        { name: "river", label: "靠近哪条河流", placeholder: "在哪条河边建城..." },
        { name: "food", label: "主要食物来源", placeholder: "城市靠什么养活大家..." },
        { name: "jobs", label: "城市里有哪些职业", placeholder: "农民、陶工、记录员、商人..." },
        { name: "building", label: "最重要的公共建筑", placeholder: "神庙、粮仓、市场..." },
        { name: "risk", label: "城市面临的最大危险", placeholder: "洪水、干旱、外敌..." },
        { name: "style", label: "文明风格", placeholder: "两河流域风格 / 埃及风格 / 自创风格", type: "select", options: ["自创风格", "两河流域风格", "埃及风格", "印度河风格", "东亚大河风格"] },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">${data.style || "文明创作"} · 公元前3000年</p>
          <h4>${data.cityName || "未命名河流城"}</h4>
          <p><strong>城市设定：</strong>${data.cityName || "这座城市"}建在${data.river || "一条大河"}旁边，依靠${data.food || "谷物和鱼"}维持生计。城市里有${data.jobs || "农民、陶工、记录员和商人"}，人们合作修水渠、储存粮食、管理市场。</p>
          <p><strong>核心建筑：</strong>${data.building || "神庙和粮仓"}是城市的中心，在这里人们祭祀、交换和管理城市资源。</p>
          <p><strong>最大危险：</strong>${data.risk || "洪水"}。解决方案：建立公共粮仓、安排水渠维护者，并让记录员记录粮食分配。</p>
          <p><strong>为什么能成为文明：</strong>它不只是村落，而是拥有农业剩余、职业分工、公共建筑、管理规则和共同信仰的复杂聚落。</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>大河、农业、粮食储存、分工和管理是早期文明形成的重要条件。</span></div>
            <div><strong>我的创造</strong><span>${data.cityName || "这座城市"}的名字、具体规则和城市故事由我设计。</span></div>
          </div>
        </div>`,
    },
  },
  L02: {
    id: "L02", time: "公元前2500年", title: "金字塔、神庙与城市国家",
    question: "为什么早期文明会建造巨大建筑？",
    takeaway: "巨大建筑不仅是建筑技术的成果，也显示一个文明组织人力、资源、信仰和权力的能力。",
    snapshot: "公元前2500年前后，埃及古王国进入金字塔建设高峰，两河流域的城市国家和神庙经济活跃，印度河流域城市文明逐渐成熟，中国新石器晚期社会复杂化继续发展。",
    chain: ["粮食剩余","人力动员","公共工程","技术发展","权力中心","信仰系统","文明认同"],
    concepts: [
      { name: "大型工程", text: "需要很多人合作、长期计划和资源管理的建筑或工程。" },
      { name: "王权", text: "统治者管理土地、粮食、人民和工程的权力。" },
      { name: "神权", text: "宗教和信仰对社会秩序的影响力。" },
      { name: "城市国家", text: "一个城市和周围地区组成的政治共同体。" },
      { name: "社会等级", text: "社会中不同人拥有不同职责、资源和地位。" },
    ],
    mapPoints: [
      { id: "egypt_pyramid_2500", name: "埃及古王国", x: 49, y: 51, type: "文明核心区", status: "exploring", child: "法老组织大量人力建设金字塔，显示王权和信仰力量。", fact: "古王国时期，金字塔建设代表强大王权和组织能力。", confidence: "confirmed", keywords: ["金字塔","法老","古王国","王权","建设"], material: ["金字塔","神庙","祭司","法老宫殿","工人营地"] },
      { id: "mesopotamia_2500", name: "苏美尔城邦", x: 51, y: 44, type: "文明核心区", status: "exploring", child: "城市围绕神庙和市场运转，城邦之间也会竞争。", fact: "苏美尔城邦发展，神庙和城市经济活跃。", confidence: "confirmed", keywords: ["苏美尔","城邦","神庙","乌尔","基什"], material: ["塔庙","城墙","市场","神庙仓库","文字泥板"] },
      { id: "indus_mature_2500", name: "印度河文明", x: 62, y: 50, type: "文明核心区", status: "exploring", child: "一些城市开始呈现规划、排水和贸易特征。", fact: "哈拉帕、摩亨佐-达罗等城市文明逐渐繁荣。", confidence: "cautious", keywords: ["哈拉帕","摩亨佐-达罗","排水系统","城市规划"], material: ["规划街道","大浴场","粮仓","工匠作坊"] },
      { id: "china_longshan_2500", name: "龙山文化区", x: 73, y: 44, type: "早期文化区", status: "exploring", child: "村落和城址变得更复杂，社会分层和礼仪活动增强。", fact: "龙山等新石器晚期文化发展，城墙和社会复杂化增强。", confidence: "cautious", keywords: ["龙山","城墙","礼仪","社会分层"], material: ["黑陶","城墙聚落","礼仪器物","分层墓葬"] },
    ],
    regions: [
      { id: "egypt_ok", name: "埃及", title: "金字塔背后的组织力", summary: "建造金字塔不只是技术问题，更是组织问题。需要数万人长年劳动，需要粮食供给、住所安排、技术专家和管理系统。金字塔代表法老的权力、对来世的信仰，以及这个文明的组织能力。", facts: ["古王国金字塔建设高峰约公元前2600-2400年。", "金字塔建造者可能是有组织的工人而非纯粹奴隶。", "胡夫金字塔约建于公元前2560年前后。"], avoid: ["不要把所有金字塔都归为同一时期。", "不要说建造者只有奴隶，证据更复杂。"] },
      { id: "sumer_cities", name: "两河流域", title: "城邦竞争与神庙经济", summary: "两河流域的苏美尔城邦各自拥有守护神庙，神庙是宗教、经济和管理的中心。城邦之间既有贸易合作，也有战争竞争。乌尔、乌鲁克、基什等城市是这一时期的重要中心。", facts: ["苏美尔城邦有各自的神和神庙。", "神庙经济可能控制大量土地和劳动力。", "楔形文字记录持续发展。"], avoid: ["不要把苏美尔城邦讲成统一国家。", "不要混淆不同城邦的历史。"] },
      { id: "indus_cities", name: "印度河流域", title: "有规划的城市", summary: "印度河文明的城市以精密的城市规划著称：整齐的街道、先进的排水系统、统一的砖块尺寸。这说明背后有强大的组织和标准化能力，但统治结构至今仍不完全清楚。", facts: ["摩亨佐-达罗和哈拉帕是最著名的印度河城市。", "印度河文字至今未完全破解。", "城市特征包括大浴场、粮仓和规划街道。"], avoid: ["不要把政治结构说得过于确定。", "不要把文字说成完全破解。"] },
    ],
    changes: [
      { time: "约公元前2600年", text: "埃及古王国进入金字塔建设高峰，王权与信仰表达达到新高度。" },
      { time: "约公元前2500年", text: "印度河文明达到城市发展高峰，苏美尔城邦竞争活跃。" },
      { time: "约公元前2350年", text: "阿卡德帝国兴起，两河流域出现更大范围的政治整合尝试。" },
    ],
    sources: [
      { label: "British Museum: Ancient Egypt", url: "https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-egypt" },
      { label: "Britannica: Indus civilization", url: "https://www.britannica.com/topic/Indus-civilization" },
      { label: "Britannica: Sumer", url: "https://www.britannica.com/place/Sumer" },
    ],
    aiTask: {
      title: "设计文明权力中心",
      background: "你是公元前2500年前后一个文明的建筑师和规划者。你要为这个文明设计最重要的公共建筑——它代表权力、信仰，也组织城市生活。",
      mustInclude: ["中心建筑（金字塔、神庙、广场等）", "它代表的权力或信仰", "建造需要的人和资源", "周围的城市功能", "它给普通人的好处和压力"],
      forbidden: ["现代吊车", "水泥高楼", "钢筋玻璃", "现代电力照明"],
      commonErrors: ["把所有文明的权力中心都画成埃及金字塔", "把中国早期礼仪中心画成后世宫殿", "图像中出现现代施工设备"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元前2500年前后的文明。知识框架：埃及古王国（金字塔、法老）、苏美尔城邦（神庙经济）、印度河文明（城市规划）、中国龙山文化。核心问题：为什么早期文明会建造巨大建筑？不要出现现代机械、玻璃高楼、电灯。",
      fields: [
        { name: "buildingName", label: "建筑名称", placeholder: "这座权力中心叫什么..." },
        { name: "civilization", label: "属于哪个文明", placeholder: "埃及 / 苏美尔 / 印度河 / 自创..." },
        { name: "purpose", label: "它代表什么", placeholder: "王权、神权、贸易中心..." },
        { name: "builders", label: "谁来建造", placeholder: "工人、祭司、记录员..." },
        { name: "benefit", label: "对普通人的好处", placeholder: "提供工作、祭祀保护、粮食分配..." },
        { name: "cost", label: "对普通人的代价", placeholder: "劳役、税收、时间..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">${data.civilization || "古代文明"} · 公元前2500年</p>
          <h4>${data.buildingName || "文明权力中心"}</h4>
          <p><strong>代表意义：</strong>${data.buildingName || "这座建筑"}代表${data.purpose || "王权与信仰"}，是${data.civilization || "这个文明"}的核心象征。</p>
          <p><strong>建造力量：</strong>由${data.builders || "祭司、工匠和劳动者"}共同完成，需要大量粮食供给、材料运输和技术管理。</p>
          <p><strong>好处与代价：</strong>好处——${data.benefit || "提供就业和信仰认同"}；代价——${data.cost || "需要大量劳役和税收"}。</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>大型公共建筑在埃及、两河、印度河都有，代表各文明组织能力。</span></div>
            <div><strong>我的创造</strong><span>${data.buildingName || "这座建筑"}的设计和故事由我设计。</span></div>
          </div>
        </div>`,
    },
  },

  L03: {
    id: "L03", time: "公元前1600年", title: "青铜、战车与早期王国",
    question: "技术为什么会改变文明的力量？",
    takeaway: "青铜、战车和文字记录让早期王国拥有更强的战争、祭祀、管理和象征能力。",
    snapshot: "公元前1600年前后，青铜技术在多个文明中发挥重要作用。中国商朝兴起并发展出高度成熟的青铜礼器和甲骨文；埃及新王国扩张；西亚多国竞争，战车和青铜武器影响军事力量。",
    chain: ["金属冶炼","青铜武器","战车技术","军事优势","王国扩张","祭祀礼器","文字记录","权力稳固"],
    concepts: [
      { name: "青铜技术", text: "把铜和锡等材料结合，制造更坚硬的工具、武器和礼器。" },
      { name: "战车", text: "由马拉动的车辆，可用于战争和贵族展示。" },
      { name: "王国", text: "比村落和城邦更大的政治组织，有统治者、军队和管理体系。" },
      { name: "祭祀", text: "通过仪式和信仰与神灵、祖先或权力秩序建立联系。" },
      { name: "甲骨文", text: "商朝用于占卜的文字，刻在动物骨头和龟甲上。" },
    ],
    mapPoints: [
      { id: "shang_china_1600", name: "商朝中国", x: 73, y: 44, type: "文明核心区", status: "exploring", child: "商朝用青铜器、祭祀和文字记录来显示王权。", fact: "商朝兴起，青铜器、甲骨文、王权与祭祀发展。", confidence: "confirmed", keywords: ["商朝","青铜器","甲骨文","王权","祭祀"], material: ["青铜鼎","甲骨","王宫","祭祀场所","战车"] },
      { id: "egypt_new_1600", name: "埃及新王国", x: 49, y: 51, type: "文明核心区", status: "exploring", child: "埃及新王国更重视军事扩张和神庙建设。", fact: "新王国时期，军事和王权力量增强。", confidence: "confirmed", keywords: ["新王国","法老","军事扩张","卡纳克神庙"], material: ["战车","神庙","法老雕像","努比亚贸易路线"] },
      { id: "hittite_1600", name: "赫梯王国", x: 52, y: 40, type: "文明核心区", status: "exploring", child: "赫梯人使用铁器技术和战车，成为西亚重要强权。", fact: "赫梯王国在西亚发展，以战车和军事实力著称。", confidence: "confirmed", keywords: ["赫梯","战车","西亚"], material: ["战车","城墙","王室档案","贸易商品"] },
    ],
    regions: [
      { id: "shang", name: "商朝中国", title: "青铜与文字的王权", summary: "商朝是中国有文字记录的第一个王朝。商王用青铜器进行祭祀，用甲骨文向祖先和神灵卜问未来。青铜不只是材料，更是权力、礼仪和身份的象征。", facts: ["商朝存在通常认为约公元前1600-1046年。", "甲骨文是中国最早成熟文字之一，用于占卜。", "商朝青铜器以精美铸造工艺著称。"], avoid: ["不要把商朝和周朝、秦朝混为一谈。", "不要把甲骨文画成现代汉字书法。"] },
      { id: "egypt_new", name: "埃及新王国", title: "扩张的帝国", summary: "新王国时期的埃及更加积极地向外扩张，军事力量增强，神庙建设规模扩大。卡纳克神庙是这一时期的代表建筑。", facts: ["新王国通常约公元前1550-1070年。", "拉美西斯二世与赫梯的卡迭石战役约公元前1274年。", "阿马尔纳时期是宗教改革的特殊阶段。"], avoid: ["不要把不同时期的埃及法老混为一谈。"] },
      { id: "bronze_age_west", name: "西亚多国竞争", title: "青铜时代的多极世界", summary: "公元前1600年前后的西亚是多个强权并立的世界：赫梯、埃及、米坦尼、巴比伦等国通过战争、外交和贸易互动。青铜武器和战车是这一时期军事力量的核心。", facts: ["赫梯以战车技术著称。", "东地中海贸易网络连接多个文明。", "楔形文字是多国外交的通用语言之一。"], avoid: ["不要把所有国家讲成单一力量。"] },
    ],
    changes: [
      { time: "约公元前1600年", text: "商朝兴起，中国进入有文字记录的文明阶段。" },
      { time: "约公元前1550年", text: "埃及新王国开始，驱逐喜克索斯人后军事扩张。" },
      { time: "约公元前1274年", text: "埃及与赫梯卡迭石战役，著名青铜时代大战之一。" },
    ],
    sources: [
      { label: "Britannica: Shang dynasty", url: "https://www.britannica.com/topic/Shang-dynasty" },
      { label: "Britannica: Hittites", url: "https://www.britannica.com/topic/Hittite" },
      { label: "The Met: Egypt New Kingdom", url: "https://www.metmuseum.org/toah/hd/nking/hd_nking.htm" },
    ],
    aiTask: {
      title: "设计青铜时代文明神器",
      background: "你是公元前1600年前后某个文明的工匠大师，被要求制作一件代表这个时代的文明神器。它可以是战争武器、祭祀礼器、管理工具或象征权力的物品。",
      mustInclude: ["神器名称", "所属文明", "材料（青铜为主）", "用途（战争/祭祀/管理/贸易/象征）", "谁能使用它", "它如何改变文明力量"],
      forbidden: ["铁剑", "火药武器", "纸质印刷书", "现代机械"],
      commonErrors: ["把青铜时代和铁器时代混淆", "让商朝出现火药、纸张、印刷术", "把甲骨文画成现代汉字书法"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元前1600年前后的青铜时代。知识框架：商朝（青铜器、甲骨文）、埃及新王国（战车、神庙）、赫梯（战车）、巴比伦（法典）。这是青铜时代，不是铁器时代或火药时代。不要出现铁剑、火药、印刷术、现代机械。",
      fields: [
        { name: "artifactName", label: "神器名称", placeholder: "给这件神器起个名字..." },
        { name: "civilization", label: "所属文明", placeholder: "商朝 / 埃及 / 赫梯 / 自创..." },
        { name: "material", label: "主要材料", placeholder: "青铜、玉石、象牙..." },
        { name: "purpose", label: "主要用途", placeholder: "战争 / 祭祀 / 管理 / 象征权力..." },
        { name: "user", label: "谁能使用", placeholder: "王室、祭司、将军、贵族..." },
        { name: "power", label: "如何改变文明力量", placeholder: "增强军事、加强信仰、稳固王权..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">${data.civilization || "青铜时代文明"} · 公元前1600年</p>
          <h4>${data.artifactName || "青铜神器"}</h4>
          <p><strong>神器档案：</strong>${data.artifactName || "这件神器"}由${data.material || "青铜"}铸造，属于${data.civilization || "这个文明"}。</p>
          <p><strong>用途：</strong>主要用于${data.purpose || "祭祀和权力展示"}，只有${data.user || "王室和祭司"}才能使用或拥有。</p>
          <p><strong>文明力量：</strong>它通过${data.power || "增强祭祀权威和象征王权"}改变了文明的组织方式。</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>青铜技术在公元前1600年前后被多个文明用于战争、祭祀和管理。</span></div>
            <div><strong>我的创造</strong><span>${data.artifactName || "这件神器"}的设计、名称和故事由我创作。</span></div>
          </div>
        </div>`,
    },
  },

  L04: {
    id: "L04", time: "公元前1200年", title: "青铜时代的崩溃",
    question: "为什么强大的文明也会衰落？",
    takeaway: "文明崩溃通常不是一个原因造成的，而是战争、气候、迁徙、贸易断裂和内部问题共同作用。",
    snapshot: "公元前1200年前后，东地中海和西亚多个青铜时代文明遭遇严重动荡，一些王国衰落或崩溃。埃及受到冲击但延续下来；赫梯帝国崩溃；迈锡尼文明衰落；贸易网络受损。中国商朝仍在发展晚期阶段，周人逐渐崛起。",
    chain: ["气候压力","粮食短缺","贸易断裂","迁徙冲击","战争动荡","城市衰退","旧秩序崩溃","新秩序萌芽"],
    concepts: [
      { name: "文明崩溃", text: "一个复杂社会的城市、贸易、统治或记录系统严重衰退。" },
      { name: "贸易断裂", text: "原来交换金属、粮食、商品的路线中断，城市很难继续运转。" },
      { name: "迁徙", text: "人群因为战争、气候或资源问题移动到新的地区。" },
      { name: "气候压力", text: "干旱、粮食减产等自然变化给社会带来压力。" },
      { name: "复杂系统脆弱性", text: "联系越紧密的系统，一旦某个环节断裂，影响越大。" },
    ],
    mapPoints: [
      { id: "mediterranean_1200", name: "东地中海动荡带", x: 48, y: 42, type: "崩溃区域", status: "exploring", child: "一些城市和王国遭遇战争、破坏和衰落。", fact: "迈锡尼文明衰落，东地中海多个贸易城市受到冲击。", confidence: "confirmed", keywords: ["迈锡尼","东地中海","动荡","贸易中断","海上民族"], material: ["废弃宫殿","战争痕迹","逃离文书","断绝的贸易路线"] },
      { id: "hittite_collapse_1200", name: "赫梯帝国崩溃区", x: 52, y: 40, type: "崩溃区域", status: "exploring", child: "强大的赫梯帝国崩溃，贸易和政治秩序受损。", fact: "赫梯帝国约公元前1200年前后崩溃，首都哈图沙被毁。", confidence: "confirmed", keywords: ["赫梯","哈图沙","崩溃","帝国终结"], material: ["废弃城市","最后的泥板文书","逃离证据"] },
      { id: "egypt_late_1200", name: "埃及新王国晚期", x: 49, y: 52, type: "受冲击区域", status: "exploring", child: "埃及受到外部冲击，国力下降，但没有立刻消失。", fact: "新王国后期遭遇压力并逐渐衰落。", confidence: "cautious", keywords: ["新王国晚期","海上民族","边境压力","衰落"], material: ["防御工事","边境战争","拉美西斯三世记录"] },
      { id: "china_shang_late_1200", name: "商朝晚期中国", x: 73, y: 44, type: "独立发展区", status: "exploring", child: "商朝晚期，周人逐渐崛起，东亚没有经历同样的崩溃。", fact: "商朝晚期至周兴起前夜，与东地中海动荡基本无关。", confidence: "cautious", keywords: ["商朝晚期","周人","东亚独立发展"], material: ["甲骨文记录","青铜器","周人早期活动"] },
    ],
    regions: [
      { id: "bronze_collapse", name: "东地中海", title: "多因崩溃：不是一个原因", summary: "约公元前1200年前后，东地中海和西亚出现大规模文明动荡。学者们讨论的原因包括：气候变化（干旱）、粮食短缺、贸易网络断裂、迁徙人群（海上民族）冲击、内部社会压力等。这是多因叠加，而非单一原因。", facts: ["赫梯帝国约公元前1200年崩溃，首都哈图沙被毁。", "迈锡尼希腊宫殿文化衰落。", "东地中海多个沿海城市遭到破坏或废弃。"], avoid: ["不要用单一原因解释一切。", "不要说所有文明都同时完全消失。"] },
      { id: "survivors", name: "延续的文明", title: "崩溃中的延续", summary: "青铜时代崩溃并非全部文明的终结。埃及虽受冲击但延续；腓尼基城市继续贸易；中国商朝直到约公元前1046年才被周朝取代，东亚基本未经历同样冲击。崩溃是选择性的，也带来了新的变化。", facts: ["埃及新王国在拉美西斯三世时期抵御了多次冲击。", "腓尼基城市如比布鲁斯、西顿继续繁荣。", "铁器技术在崩溃后的混乱中逐渐传播。"], avoid: ["不要把所有文明都说成完全消亡。"] },
    ],
    changes: [
      { time: "约公元前1200年", text: "东地中海和西亚多个青铜时代文明遭遇动荡，赫梯帝国崩溃。" },
      { time: "约公元前1175年", text: "埃及在拉美西斯三世时期抵御海上民族冲击。" },
      { time: "约公元前1046年", text: "中国商朝被周朝取代，与东地中海动荡基本独立发展。" },
    ],
    sources: [
      { label: "Britannica: Bronze Age collapse", url: "https://www.britannica.com/event/Bronze-Age-collapse" },
      { label: "Britannica: Sea Peoples", url: "https://www.britannica.com/topic/Sea-Peoples" },
      { label: "Britannica: Shang dynasty", url: "https://www.britannica.com/topic/Shang-dynasty" },
    ],
    aiTask: {
      title: "文明重启计划",
      background: "你是公元前1200年前后的文明顾问。旧王国刚刚经历了战争、贸易断裂、气候压力和迁徙冲击。你需要设计一个文明重启计划，帮助人们在废墟上建立新的秩序。",
      mustInclude: ["旧文明遇到的3个危机", "新城市的位置选择", "粮食系统恢复", "防御与安全方案", "贸易恢复方案", "3条新的文明规则"],
      forbidden: ["把所有文明写成完全消失", "单一原因解释一切", "现代救援科技", "火药武器"],
      commonErrors: ["把青铜时代崩溃解释成单一原因", "把所有地区都说成同时完全崩溃", "使用现代国家、现代军队或现代救援系统"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元前1200年前后的青铜时代崩溃。知识框架：崩溃特点（多因叠加）、崩溃区域（东地中海、西亚）、延续文明（埃及、腓尼基、中国商朝）、崩溃后铁器时代开始。核心问题：为什么强大的文明也会衰落？不要用单一原因解释崩溃，不要把所有文明说成完全消亡。",
      fields: [
        { name: "civilization", label: "你代表的文明", placeholder: "哪个文明的幸存者..." },
        { name: "crisis1", label: "危机1", placeholder: "贸易断裂 / 气候干旱 / 战争..." },
        { name: "crisis2", label: "危机2", placeholder: "另一个危机..." },
        { name: "crisis3", label: "危机3", placeholder: "第三个问题..." },
        { name: "newLocation", label: "新城市位置", placeholder: "在哪里重建，为什么..." },
        { name: "foodPlan", label: "粮食恢复方案", placeholder: "如何重建粮食系统..." },
        { name: "rule1", label: "新文明规则1", placeholder: "最重要的新规则..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">${data.civilization || "文明幸存者"} · 公元前1200年</p>
          <h4>文明重启计划</h4>
          <p><strong>三大危机：</strong>① ${data.crisis1 || "贸易断裂"} ② ${data.crisis2 || "气候干旱"} ③ ${data.crisis3 || "战争冲击"}</p>
          <p><strong>重建位置：</strong>${data.newLocation || "在内陆有水源的地方重建，避开海岸冲击带"}。</p>
          <p><strong>粮食方案：</strong>${data.foodPlan || "建立分散粮仓，发展本地农业，减少对远程贸易的依赖"}。</p>
          <p><strong>新文明规则：</strong>${data.rule1 || "不依赖单一来源，分散风险"}——这是从崩溃中学到的最重要教训。</p>
          <p><strong>历史启示：</strong>崩溃不是终点，而是转型。铁器时代、腓尼基商业、希腊城邦都从青铜时代的灰烬中生长出来。</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>青铜时代崩溃是多因叠加，赫梯崩溃、迈锡尼衰落，但埃及延续，中国独立发展。</span></div>
            <div><strong>我的创造</strong><span>文明重启计划的具体内容由我设计。</span></div>
          </div>
        </div>`,
    },
  },
  L05: {
    id: "L05", time: "公元前500年", title: "思想大爆发时代",
    question: "为什么世界不同地方几乎同时开始思考人生、国家与宇宙？",
    takeaway: "公元前500年前后，中国、印度、希腊、波斯同时出现深刻思想变革，这被称为「轴心时代」，思想改变了文明的走向。",
    snapshot: "公元前500年前后，世界多个地区几乎同时出现了思想大爆发：中国有孔子、老子，印度有佛陀，希腊有苏格拉底和哲学家，波斯有祆教思想发展。这不是巧合，而是城市化、商业发展、帝国竞争共同带来的思想土壤。",
    chain: ["城市化成熟","商业阶层兴起","战争与竞争","旧秩序质疑","哲学思辨","制度创新","思想传播","文明转型"],
    concepts: [
      { name: "轴心时代", text: "约公元前800-200年，多地同时出现深刻思想变革的时代。" },
      { name: "哲学", text: "对宇宙、人生、知识和道德的理性思考，希腊是其代表。" },
      { name: "礼与道", text: "孔子强调礼（社会秩序规范），老子强调道（自然无为之道）。" },
      { name: "民主", text: "希腊城邦雅典发展出公民参与的政治制度，是早期民主的代表。" },
      { name: "城邦", text: "以一座城市为中心，拥有独立政治的政治单位，古希腊的基本政治形式。" },
    ],
    mapPoints: [
      { id: "china_zhou_500", name: "中国春秋战国", x: 73, y: 44, type: "思想中心", status: "exploring", child: "百家争鸣：孔子、老子、墨子、孙子等思想家出现。", fact: "春秋战国时期各诸侯国竞争，诸子百家思想繁荣。", confidence: "confirmed", keywords: ["孔子","老子","百家争鸣","春秋","战国"], material: ["竹简","私学课堂","诸侯宫廷","辩论场所"] },
      { id: "greece_500", name: "希腊城邦", x: 46, y: 40, type: "思想中心", status: "exploring", child: "哲学、民主与理性思辨在雅典等城邦兴起。", fact: "雅典民主制度与哲学思想同步发展。", confidence: "confirmed", keywords: ["苏格拉底","雅典","民主","哲学","城邦"], material: ["露天剧场","广场辩论","神庙","民主公民大会"] },
      { id: "india_500", name: "印度次大陆", x: 63, y: 52, type: "思想中心", status: "exploring", child: "佛陀和耆那教创始人出现，宗教与哲学深度发展。", fact: "悉达多·乔达摩（佛陀）约公元前563-483年。", confidence: "confirmed", keywords: ["佛陀","佛教","耆那教","轴心时代","印度"], material: ["菩提树下","寺院","哲学辩论会","朝圣路线"] },
      { id: "persia_500", name: "波斯帝国", x: 55, y: 44, type: "帝国中心", status: "exploring", child: "波斯帝国连接东西方，也是重要的思想和行政交汇点。", fact: "阿契美尼德波斯帝国约公元前550-330年，连接多文明。", confidence: "confirmed", keywords: ["波斯","帝国","祆教","阿契美尼德"], material: ["波斯波利斯宫殿","驿道","多语言铭文","祭火台"] },
    ],
    regions: [
      { id: "china_thought", name: "中国", title: "百家争鸣的时代", summary: "春秋战国时期，周朝礼制崩溃，诸侯竞争激烈。各诸侯国都需要能人治国，思想家走访各地，提出不同的治国理念。孔子主张礼与仁，老子主张道与无为，墨子主张兼爱，法家主张法治，兵家研究战争。", facts: ["孔子（约公元前551-479年）是儒家创始人。", "老子是道家代表，《道德经》对后世影响深远。", "战国时期有七雄：齐、楚、燕、韩、赵、魏、秦。"], avoid: ["不要把孔子和苏格拉底说成直接认识或同年代。", "不要说春秋战国已经有现代意义的民主制度。"] },
      { id: "greece_thought", name: "希腊", title: "理性与民主的实验场", summary: "希腊城邦以小规模城市国家为单位，不同城邦有不同制度。雅典发展出民主政治，公民可以在广场辩论和投票。苏格拉底、柏拉图、亚里士多德建立了西方哲学传统。", facts: ["雅典民主约从公元前508年克利斯提尼改革开始。", "苏格拉底（约公元前470-399年）以对话法闻名。", "波斯战争（公元前490-479年）是重要的历史节点。"], avoid: ["不要把雅典民主说成现代民主。", "不要忽略斯巴达等非民主城邦。"] },
      { id: "india_thought", name: "印度", title: "宗教哲学的深度探索", summary: "公元前500年前后，印度出现了多位深刻的思想家。佛陀反思人生苦难，提出解脱之道；耆那教强调非暴力。印度的思想传统与婆罗门教的宇宙观和社会秩序深度交织。", facts: ["佛陀（悉达多·乔达摩）约公元前563-483年。", "佛教后来传播到亚洲各地，影响极为深远。", "耆那教同时期出现，强调非暴力和苦行。"], avoid: ["不要把佛教与印度教混淆。", "不要把印度思想家说成现代科学家。"] },
    ],
    changes: [
      { time: "约公元前551年", text: "孔子诞生，儒家思想开始发展，深刻影响中国及东亚文明。" },
      { time: "约公元前508年", text: "雅典民主改革，希腊城邦政治进入新阶段。" },
      { time: "约公元前490年", text: "马拉松战役，希腊城邦抵御波斯帝国，影响西方文明走向。" },
    ],
    sources: [
      { label: "Britannica: Axial Age", url: "https://www.britannica.com/topic/Axial-Age" },
      { label: "Britannica: Confucius", url: "https://www.britannica.com/biography/Confucius" },
      { label: "Britannica: Socrates", url: "https://www.britannica.com/biography/Socrates" },
    ],
    aiTask: {
      title: "创造一位未来哲学家",
      background: "你生活在公元前500年前后的一个文明中。这个时代充满战争、竞争和对旧秩序的质疑。你的任务是创造一位属于这个时代的思想家——他/她会提出什么问题？给出什么答案？",
      mustInclude: ["思想家的名字", "来自哪个文明", "他/她提出的核心问题", "对这个问题的回答（思想主张）", "给未来人类的三条建议"],
      forbidden: ["现代科技知识（互联网、手机）", "超越时代的科学知识", "把思想家说成无所不知"],
      commonErrors: ["把孔子、老子、佛陀、苏格拉底说成完全同年", "把希腊民主说成现代普选民主"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元前500年前后的轴心时代。知识框架：中国（春秋战国，孔子/老子/百家争鸣）、希腊（城邦、民主、哲学）、印度（佛陀、耆那教）、波斯（祆教、帝国）。核心概念：轴心时代、哲学、民主、礼、道、佛教。不要出现现代科技，不要超越时代的知识。",
      fields: [
        { name: "thinkerName", label: "思想家名字", placeholder: "给这位思想家起个名字..." },
        { name: "civilization", label: "来自哪个文明", placeholder: "中国 / 希腊 / 印度 / 波斯 / 自创..." },
        { name: "coreQuestion", label: "他/她提出的核心问题", placeholder: "人为什么要活着？国家如何才公平？..." },
        { name: "answer", label: "他/她的思想主张", placeholder: "他/她认为答案是什么..." },
        { name: "advice1", label: "给未来的建议1", placeholder: "第一条建议..." },
        { name: "advice2", label: "给未来的建议2", placeholder: "第二条建议..." },
        { name: "advice3", label: "给未来的建议3", placeholder: "第三条建议..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">${data.civilization || "轴心时代"} · 公元前500年</p>
          <h4>${data.thinkerName || "未知思想家"}</h4>
          <p><strong>核心问题：</strong>${data.coreQuestion || "人类应该如何生活？"}</p>
          <p><strong>思想主张：</strong>${data.answer || "通过学习和反思，人可以找到正确的生活方式。"}</p>
          <p><strong>给未来的三条建议：</strong></p>
          <ol style="padding-left:16px;color:var(--text2);font-size:13px;line-height:1.8">
            <li>${data.advice1 || "保持对知识的好奇。"}</li>
            <li>${data.advice2 || "不要只相信权力，要相信道理。"}</li>
            <li>${data.advice3 || "思考比行动更需要勇气。"}</li>
          </ol>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>公元前500年前后，中国、印度、希腊出现深刻思想变革，被称为轴心时代。</span></div>
            <div><strong>我的创造</strong><span>${data.thinkerName || "这位思想家"}的名字、问题和主张由我设计。</span></div>
          </div>
        </div>`,
    },
  },

  L06: {
    id: "L06", time: "公元前221年", title: "统一时代：帝国如何诞生？",
    question: "为什么有些文明会从分裂走向统一？",
    takeaway: "帝国的诞生需要军事力量、行政系统、道路交通和统一的法律与文字——秦始皇和罗马共和国展示了两种不同的统一方式。",
    snapshot: "公元前221年，秦始皇统一六国，建立中国第一个中央集权帝国。同一时代，罗马共和国正在地中海扩张，孔雀帝国在印度达到强盛。这是人类历史上「从分裂走向统一」的关键时代。",
    chain: ["军事力量","战争整合","统一文字法律","道路网络","行政系统","中央集权","帝国形成","文明传播"],
    concepts: [
      { name: "帝国", text: "比城邦或王国更大的政治组织，通过征服或联合管理多个地区。" },
      { name: "中央集权", text: "所有权力集中在中央政府，地方服从中央。秦朝是典型代表。" },
      { name: "行政系统", text: "帝国管理大量土地和人口，需要官员、法律、档案和通信系统。" },
      { name: "道路网络", text: "秦朝修驰道，罗马修条条大路，道路是帝国控制和连接的关键工具。" },
      { name: "文字统一", text: "秦始皇统一文字，使帝国各地可以用同一套符号交流，是中央集权的重要基础。" },
    ],
    mapPoints: [
      { id: "qin_empire_221", name: "秦帝国", x: 73, y: 44, type: "帝国核心", status: "exploring", child: "秦始皇统一六国，建立第一个中央集权帝国。", fact: "秦帝国约公元前221-206年，短暂但影响深远。", confidence: "confirmed", keywords: ["秦始皇","统一","中央集权","驰道","郡县制","长城"], material: ["兵马俑","驰道","统一货币","书同文","长城"] },
      { id: "rome_republic_221", name: "罗马共和国", x: 44, y: 40, type: "扩张势力", status: "exploring", child: "罗马共和国正在地中海扩张，即将成为最强帝国。", fact: "罗马共和国约公元前509-27年，后期扩张迅速。", confidence: "confirmed", keywords: ["罗马","共和国","元老院","军团","地中海"], material: ["军团阵列","元老院","条条大路","神庙","公民大会"] },
      { id: "maurya_india_221", name: "孔雀帝国（印度）", x: 63, y: 52, type: "帝国核心", status: "exploring", child: "阿育王时期帝国最强，传播佛教。", fact: "孔雀帝国约公元前322-185年，阿育王是最著名统治者。", confidence: "confirmed", keywords: ["孔雀帝国","阿育王","佛教","印度","统一"], material: ["阿育王柱","佛教寺院","贸易网络","石刻法令"] },
    ],
    regions: [
      { id: "qin", name: "秦帝国", title: "中国的第一次大统一", summary: "秦始皇用了约10年时间统一了七个战国，建立了中国历史上第一个中央集权帝国。他统一了文字、货币、度量衡，修建了驰道和长城，建立了郡县制行政系统。秦朝虽然只存在15年，但它奠定了中国两千年帝制的基础。", facts: ["秦始皇（赢政）于公元前221年完成统一。", "秦朝设36郡，由中央任命郡守管理。", "秦朝统一货币（圆形方孔钱）、文字（小篆）、度量衡。"], avoid: ["不要把秦始皇说成一开始就很强大。", "不要把秦朝的统一和后来汉朝的繁荣混为一谈。"] },
      { id: "rome", name: "罗马", title: "从城邦走向地中海霸主", summary: "罗马共和国从一座城市逐渐扩张，到公元前221年前后已控制意大利并开始征服地中海。罗马的扩张依靠高效的军队、灵活的外交和完整的法律制度。罗马的共和制度与秦朝的中央集权形成有趣的对比。", facts: ["罗马共和国有元老院、执政官等分权机构。", "公元前264-146年，罗马与迦太基进行布匿战争。", "罗马军团是那个时代最有效率的军队之一。"], avoid: ["不要把罗马共和国说成罗马帝国。", "不要把罗马民主说成现代民主。"] },
    ],
    changes: [
      { time: "公元前221年", text: "秦始皇统一六国，建立秦帝国，中国进入帝制时代。" },
      { time: "公元前206年", text: "秦朝灭亡，汉朝建立，继承并发展了中央集权制度。" },
      { time: "约公元前200年", text: "罗马在地中海扩张，孔雀帝国逐渐衰落，各地帝国格局重组。" },
    ],
    sources: [
      { label: "Britannica: Qin dynasty", url: "https://www.britannica.com/topic/Qin-dynasty" },
      { label: "Britannica: Roman Republic", url: "https://www.britannica.com/place/Roman-Republic" },
      { label: "Britannica: Maurya Empire", url: "https://www.britannica.com/topic/Maurya-empire" },
    ],
    aiTask: {
      title: "设计一个未来超级帝国",
      background: "你是公元前221年的帝国设计师。你要把几个相互争斗的地区统一成一个超级帝国。你需要解决：如何统一、如何管理、如何避免崩溃。",
      mustInclude: ["如何统一不同地区（战争/外交/联姻）", "如何管理交通（道路/驿站）", "如何制定法律", "如何避免帝国崩溃", "首都的设计"],
      forbidden: ["现代武器（火枪、坦克、导弹）", "现代通信（电话、互联网）"],
      commonErrors: ["把罗马共和国说成罗马帝国", "让秦军使用火药", "把秦朝说成持续几百年"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元前221年前后的帝国时代。知识框架：秦帝国（统一六国、中央集权、书同文、车同轨）、罗马共和国（元老院、军团、法律）、孔雀帝国（阿育王、佛教传播）。不要出现火药武器、现代通信、现代行政技术。",
      fields: [
        { name: "empireName", label: "帝国名称", placeholder: "你的帝国叫什么..." },
        { name: "regions", label: "统一了哪些地区", placeholder: "原来分裂的几个区域..." },
        { name: "unifyMethod", label: "统一方式", placeholder: "战争征服 / 外交联盟 / 联姻..." },
        { name: "roads", label: "道路和交通系统", placeholder: "如何连接帝国各地..." },
        { name: "law", label: "法律和管理", placeholder: "用什么法律管理全帝国..." },
        { name: "capital", label: "首都描述", placeholder: "首都在哪里，有什么特征..." },
        { name: "weakPoint", label: "帝国最大弱点", placeholder: "什么可能导致帝国崩溃..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">帝国设计 · 公元前221年</p>
          <h4>${data.empireName || "未命名帝国"}</h4>
          <p><strong>统一版图：</strong>将${data.regions || "多个分裂地区"}统一，采用${data.unifyMethod || "战争与外交"}方式。</p>
          <p><strong>交通系统：</strong>${data.roads || "修建驰道连接各地，设立驿站传递命令"}。</p>
          <p><strong>法律与管理：</strong>${data.law || "统一法律文字，由中央任命官员管理各地"}。</p>
          <p><strong>首都：</strong>${data.capital || "首都是帝国的权力与文化中心"}。</p>
          <p><strong>潜在风险：</strong>${data.weakPoint || "帝国规模过大，边境压力和内部矛盾都是隐患"}。</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>秦始皇用统一文字、货币、道路和郡县制来管理帝国；罗马用法律和军团扩张。</span></div>
            <div><strong>我的创造</strong><span>${data.empireName || "这个帝国"}的设计和制度由我设计。</span></div>
          </div>
        </div>`,
    },
  },

  L07: {
    id: "L07", time: "公元1年", title: "丝绸之路与帝国网络",
    question: "世界什么时候开始被贸易连接起来？",
    takeaway: "公元1年前后，汉朝与罗马帝国同时繁盛，丝绸之路把东西方连接起来——不只是货物，还有思想、宗教、技术和物种。",
    snapshot: "公元1年前后，汉朝强盛，丝绸之路繁荣；罗马帝国控制地中海；印度是印度洋贸易的中枢；中亚绿洲城市是东西方的中转站。这是人类历史上第一次真正意义上全球连接的雏形。",
    chain: ["帝国稳定","商人兴起","绿洲城市","货物流通","文化传播","货币经济","贸易网络","文明融合"],
    concepts: [
      { name: "丝绸之路", text: "连接中国、中亚、西亚和罗马的贸易路线网络，传递丝绸、香料、玻璃、思想和宗教。" },
      { name: "贸易网络", text: "多条路线相互连接，没有单一直线，而是由商队、中介和城市节点构成的网络。" },
      { name: "中介商人", text: "帕提亚、粟特商人等中亚商人是丝绸之路上最重要的中介，连接汉朝和罗马。" },
      { name: "印度洋贸易", text: "海上贸易路线，连接印度、东非、阿拉伯半岛和东南亚，与陆路丝路并行。" },
      { name: "文化传播", text: "贸易路线不只传递货物，还传播佛教、基督教、技术和物种。" },
    ],
    mapPoints: [
      { id: "han_china_1ce", name: "汉朝中国", x: 73, y: 44, type: "帝国核心", status: "exploring", child: "汉朝繁盛，长安是丝绸之路的东端起点。", fact: "汉武帝时期派张骞出使西域，开拓丝绸之路。", confidence: "confirmed", keywords: ["汉朝","丝绸之路","张骞","长安","汉武帝"], material: ["丝绸","长安市场","驼队","汉朝使节"] },
      { id: "rome_empire_1ce", name: "罗马帝国", x: 44, y: 38, type: "帝国核心", status: "exploring", child: "罗马帝国进入强盛时期，是丝绸之路西端的重要消费市场。", fact: "奥古斯都时代（公元前27-公元14年）是罗马鼎盛期。", confidence: "confirmed", keywords: ["罗马帝国","奥古斯都","地中海","丝绸消费"], material: ["罗马道路","港口","市场","玻璃工坊"] },
      { id: "central_asia_1ce", name: "中亚绿洲城市", x: 60, y: 40, type: "贸易中转点", status: "exploring", child: "撒马尔罕、布哈拉等城市是丝绸之路的中转站。", fact: "粟特商人是丝绸之路最重要的中介商人之一。", confidence: "confirmed", keywords: ["粟特","撒马尔罕","绿洲城市","中转","中亚"], material: ["驼队市场","多语言商人","货栈","绿洲水源"] },
      { id: "india_ocean_1ce", name: "印度洋贸易圈", x: 63, y: 58, type: "海上贸易区", status: "exploring", child: "印度是海上贸易的核心，连接东西方。", fact: "印度洋季风贸易在公元前后非常活跃。", confidence: "confirmed", keywords: ["印度洋","季风贸易","香料","棉布","海上丝路"], material: ["港口码头","香料仓库","季风帆船","多文化商人"] },
    ],
    regions: [
      { id: "silk_road_land", name: "陆上丝路", title: "驼队、绿洲与中介商人", summary: "陆上丝绸之路不是一条直线，而是由多条路线、驼队商队、绿洲城市和中介商人构成的网络。粟特商人是这条路线上最重要的中介，他们说多种语言，懂多种文化。货物从中国到罗马往往要经过多次转手。", facts: ["张骞出使西域约公元前138年，奠定了汉朝与中亚的联系。", "中国的丝绸、陶瓷；罗马的玻璃、黄金；印度的香料都在路上流通。", "宗教（佛教、祆教）也随贸易路线传播。"], avoid: ["不要把丝绸之路说成一条高速公路。", "不要说汉朝商人可以直接常规抵达罗马。"] },
      { id: "silk_road_sea", name: "海上丝路", title: "印度洋的季风贸易", summary: "印度洋的季风规律早被商人掌握：夏季季风吹向东北，冬季季风吹向西南，商船可以有规律地来回航行。印度是这个网络的核心，阿拉伯商人、印度商人和东非港口共同构成了海上贸易网络。", facts: ["印度洋贸易在公元前后非常活跃，比陆路更便宜。", "阿拉伯半岛是重要中转点，连接东非、印度和地中海。", "东南亚逐渐成为香料的重要产地。"], avoid: ["不要忽略海上贸易的重要性。", "不要把陆上丝路说成唯一的东西方贸易通道。"] },
    ],
    changes: [
      { time: "约公元前138年", text: "张骞出使西域，汉朝与中亚建立联系，丝绸之路逐渐成形。" },
      { time: "约公元前27年", text: "罗马帝国建立，进入奥古斯都时代，地中海贸易繁荣。" },
      { time: "约公元100年", text: "佛教沿丝绸之路传入中国，文化交流加速。" },
    ],
    sources: [
      { label: "Britannica: Silk Road", url: "https://www.britannica.com/topic/Silk-Road" },
      { label: "The Met: The Silk Road", url: "https://www.metmuseum.org/toah/hd/silk/hd_silk.htm" },
    ],
    aiTask: {
      title: "古代商队旅行日志",
      background: "你是公元1年前后一位走在丝绸之路上的商人。你从长安出发，要前往撒马尔罕或更远的地方。请写下你的旅行日志，记录路上的经历。",
      mustInclude: ["出发地和目的地", "经过的城市和地点", "遇到的风险（沙漠、盗贼、疾病、迷路）", "交易的商品", "见到的不同文明和人"],
      forbidden: ["现代交通工具", "现代通信设备", "护照和现代国境", "单次直接抵达罗马"],
      commonErrors: ["说汉朝商人可以直接常规抵达罗马", "把丝绸之路画成一条单线高速路", "忽略中亚商人的中介作用"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元1年前后的丝绸之路。知识框架：汉朝（长安、丝绸）、罗马帝国（奥古斯都、地中海）、中亚（粟特商人、撒马尔罕）、印度洋（季风贸易）。核心概念：丝绸之路、贸易网络、中介商人、文化传播。不要出现现代交通、现代通信、护照。",
      fields: [
        { name: "merchantName", label: "商人名字", placeholder: "给你的商人起个名字..." },
        { name: "origin", label: "出发地", placeholder: "长安 / 撒马尔罕 / 亚历山大港..." },
        { name: "destination", label: "目的地", placeholder: "要去哪里..." },
        { name: "goods", label: "携带的货物", placeholder: "丝绸、陶瓷、香料、玻璃..." },
        { name: "danger", label: "路上遇到的最大危险", placeholder: "沙漠、盗贼、疾病、迷路..." },
        { name: "discovery", label: "最令你惊讶的事", placeholder: "见到了什么不同的文明或物品..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">丝绸之路 · 公元1年</p>
          <h4>${data.merchantName || "古代商人"}的旅行日志</h4>
          <p><strong>路线：</strong>从${data.origin || "长安"}出发，前往${data.destination || "撒马尔罕"}，携带${data.goods || "丝绸和陶瓷"}。</p>
          <p><strong>最大危险：</strong>${data.danger || "穿越沙漠时迷路，水源几乎耗尽"}。靠着驼队经验和当地向导才脱险。</p>
          <p><strong>最大发现：</strong>${data.discovery || "在绿洲城市遇到了说十几种语言的商人，见到了从未见过的玻璃制品"}。</p>
          <p><strong>旅行启示：</strong>丝绸之路不是一条路，而是一张网；每个商人只走其中一段，靠中介城市把货物传递到遥远的地方。</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>丝绸之路连接汉朝和罗马，粟特商人是重要中介，货物经过多次转手。</span></div>
            <div><strong>我的创造</strong><span>${data.merchantName || "这位商人"}的故事和经历由我设计。</span></div>
          </div>
        </div>`,
    },
  },

  L08: {
    id: "L08", time: "公元300年", title: "帝国危机与文明转型",
    question: "帝国为什么会变弱？文明如何在危机中转型？",
    takeaway: "公元300年前后，罗马帝国和汉朝同时面临危机——不是突然崩溃，而是长期的边境压力、财政问题、内部矛盾和文化转型共同作用。",
    snapshot: "公元300年前后，罗马帝国内部政治不稳、边境压力增大；中国进入三国两晋时期，分裂与民族融合并存。这不是文明的终结，而是转型：基督教在罗马兴起，佛教在中国传播，新的文明秩序正在形成。",
    chain: ["帝国扩张过度","财政压力","边境游牧冲击","内部政治危机","文化信仰转变","分裂与融合","新秩序萌芽"],
    concepts: [
      { name: "帝国衰退", text: "帝国在长期发展中积累的内部矛盾、财政压力和边境压力逐渐超过其承受能力。" },
      { name: "边境压力", text: "游牧民族（匈奴、日耳曼等）对农耕帝国边境持续施压，是帝国危机的重要因素。" },
      { name: "民族融合", text: "帝国危机往往伴随着不同族群的迁徙、混居和文化融合。" },
      { name: "宗教转型", text: "公元300年前后，基督教在罗马扩张，佛教在中国传播，宗教成为新的社会凝聚力量。" },
      { name: "分裂与重组", text: "大帝国分裂后，往往出现新的政治格局，不是简单回到原点。" },
    ],
    mapPoints: [
      { id: "rome_crisis_300", name: "罗马帝国（危机期）", x: 44, y: 38, type: "帝国危机区", status: "exploring", child: "罗马帝国面临内部政治危机和外部边境压力。", fact: "三世纪危机（235-284年）后，罗马逐渐分裂为东西两部分。", confidence: "confirmed", keywords: ["罗马危机","基督教","东西分治","边境压力","日耳曼"], material: ["防御工事","基督教礼拜场所","边境军团","帝国分裂地图"] },
      { id: "china_3kingdoms_300", name: "三国两晋中国", x: 73, y: 44, type: "分裂区域", status: "exploring", child: "汉朝瓦解后，中国进入三国两晋时期，分裂与民族融合并存。", fact: "汉朝220年灭亡，三国（魏蜀吴）分立，后西晋短暂统一。", confidence: "confirmed", keywords: ["三国","两晋","民族融合","佛教传播","分裂"], material: ["三国地图","佛教寺院","游牧骑兵","南北迁徙路线"] },
      { id: "sassanid_300", name: "萨珊波斯", x: 55, y: 44, type: "强权帝国", status: "exploring", child: "萨珊波斯是这一时期西亚最强的帝国，连接东西方贸易。", fact: "萨珊帝国约224-651年，祆教国教，与罗马长期对峙。", confidence: "confirmed", keywords: ["萨珊","波斯","祆教","罗马对手"], material: ["波斯宫殿","祭火台","军队浮雕","丝路贸易"] },
    ],
    regions: [
      { id: "rome_300", name: "罗马帝国", title: "从危机走向转型", summary: "公元3世纪，罗马帝国经历了严重的政治危机：皇帝频繁更替，财政困难，边境压力增大。公元313年，基督教被合法化（米兰敕令）；公元380年，基督教成为国教。罗马帝国转型为基督教帝国，并在395年正式分裂为东西两部分。", facts: ["公元235-284年的三世纪危机是罗马最困难时期。", "君士坦丁大帝（306-337年）接受基督教，是重大转折。", "东罗马（拜占庭帝国）延续到1453年。"], avoid: ["不要把西罗马灭亡提前到公元300年（实际是476年）。", "不要把分裂说成文明彻底终结。"] },
      { id: "china_300", name: "中国", title: "分裂与民族融合", summary: "汉朝灭亡后，中国经历了近400年的分裂（220-589年）。这一时期虽然分裂，但也是民族融合、文化交流的重要时期。北方游牧民族建立政权，逐渐汉化；南方汉人政权保存了大量文化遗产。佛教在这一时期大规模传入中国。", facts: ["汉朝220年灭亡，三国（220-280年）随后出现。", "西晋（265-316年）短暂统一后再次分裂。", "南北朝时期（420-589年）佛教寺院大量兴建。"], avoid: ["不要把中国说成仍是统一汉帝国。", "不要把分裂等同于文明衰亡。"] },
    ],
    changes: [
      { time: "公元220年", text: "汉朝灭亡，中国进入三国时期，分裂与民族融合开始。" },
      { time: "约公元235-284年", text: "罗马三世纪危机，政治动荡、边境压力。" },
      { time: "公元313年", text: "罗马米兰敕令，基督教被合法化，文明转型加速。" },
      { time: "约公元300年", text: "佛教在中国北方广泛传播，文化融合加深。" },
    ],
    sources: [
      { label: "Britannica: Crisis of the Third Century", url: "https://www.britannica.com/event/crisis-of-the-third-century" },
      { label: "Britannica: Three Kingdoms period", url: "https://www.britannica.com/topic/Three-Kingdoms-Chinese-history" },
    ],
    aiTask: {
      title: "帝国急救报告",
      background: "你是公元300年前后一个帝国的首席顾问。这个帝国正面临多重危机：边境受到冲击、财政困难、内部分裂、旧信仰动摇。你需要写一份帝国急救报告。",
      mustInclude: ["帝国当前的三大危机", "最危险的地区", "改革建议", "如果不改革的后果", "你认为帝国最值得保留的是什么"],
      forbidden: ["现代武器和技术", "现代经济学术语", "把分裂简单说成文明灭亡"],
      commonErrors: ["把西罗马灭亡提前到公元300年", "把中国说成仍是统一汉帝国", "把分裂简单等同于文明结束"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元300年前后的帝国危机。知识框架：罗马帝国（三世纪危机、基督教兴起、东西分治）、中国（汉朝灭亡、三国、两晋、佛教传入）、萨珊波斯（西亚强权）。核心概念：帝国衰退、边境压力、宗教转型、分裂与融合。不要把分裂说成文明终结。",
      fields: [
        { name: "empire", label: "你代表哪个帝国", placeholder: "罗马帝国 / 晋朝中国 / 自创帝国..." },
        { name: "crisis1", label: "危机1：最紧迫的威胁", placeholder: "边境入侵 / 财政崩溃..." },
        { name: "crisis2", label: "危机2：内部问题", placeholder: "贵族争权 / 税收难以为继..." },
        { name: "crisis3", label: "危机3：文化信仰动摇", placeholder: "旧信仰失去号召力..." },
        { name: "reform", label: "你的改革建议", placeholder: "改变什么来让帝国存活..." },
        { name: "worth", label: "帝国最值得保留的是什么", placeholder: "法律、文字、道路、信仰..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">${data.empire || "帝国危机顾问"} · 公元300年</p>
          <h4>帝国急救报告</h4>
          <p><strong>三大危机：</strong>① ${data.crisis1 || "边境压力"} ② ${data.crisis2 || "财政崩溃"} ③ ${data.crisis3 || "信仰动摇"}</p>
          <p><strong>改革建议：</strong>${data.reform || "缩小帝国规模，加强地方自治，允许新宗教稳定社会"}。</p>
          <p><strong>最值得保留的遗产：</strong>${data.worth || "法律制度和行政经验"}——即使帝国分裂，这些也能传递给后世。</p>
          <p><strong>历史启示：</strong>帝国危机不等于文明终结，往往是转型的开始。</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>公元300年前后罗马和汉朝都面临危机，但危机带来了转型，而不只是终结。</span></div>
            <div><strong>我的创造</strong><span>急救报告的具体内容由我设计。</span></div>
          </div>
        </div>`,
    },
  },
  L09: {
    id: "L09", time: "公元600年", title: "宗教、迁徙与新文明秩序",
    question: "信仰为什么能改变文明？",
    takeaway: "公元600年前后，伊斯兰文明即将兴起，基督教整合欧洲，佛教深入东亚——宗教不只是精神信仰，更是文明的组织力量。",
    snapshot: "公元600年前后，世界文明秩序正在重组。西罗马已灭亡，基督教成为欧洲的精神支柱；中国唐朝即将建立，佛教影响深入；伊斯兰文明正在阿拉伯半岛酝酿，即将改变整个亚非世界。",
    chain: ["旧帝国衰落","信仰填补空缺","宗教组织动员","朝圣与传教","文化融合","新文明秩序"],
    concepts: [
      { name: "宗教传播", text: "宗教通过朝圣、传教、贸易和政治支持扩散到更广的地区。" },
      { name: "寺院经济", text: "中世纪寺院不只是宗教场所，也是农业、学问和社会服务的中心。" },
      { name: "帝国合法性", text: "统治者借助宗教获得统治合法性，宗教领袖也借助政治力量扩大影响。" },
      { name: "文化吸收", text: "日本吸收中国制度和佛教、欧洲保存古罗马文化，都是文化吸收的例子。" },
      { name: "朝圣路线", text: "宗教朝圣带动了长途旅行、旅馆网络和跨文化接触。" },
    ],
    mapPoints: [
      { id: "tang_china_600", name: "隋唐之际中国", x: 73, y: 44, type: "文明中心", status: "exploring", child: "隋唐之际，大一统重新出现，佛教影响深入中国文化。", fact: "唐朝618年建立，是中国历史上国际化程度最高的王朝之一。", confidence: "confirmed", keywords: ["唐朝","隋朝","佛教","玄奘","大一统"], material: ["佛教寺院","石窟造像","丝路商人","长安国际城市"] },
      { id: "europe_600", name: "基督教欧洲", x: 42, y: 36, type: "文明中心", status: "exploring", child: "西罗马之后，基督教成为欧洲文明的重要组织力量。", fact: "天主教会在欧洲承担了教育、慈善和政治协调功能。", confidence: "confirmed", keywords: ["基督教","教会","修道院","法兰克王国","欧洲"], material: ["修道院","教堂","手抄本","农业村庄"] },
      { id: "arabia_600", name: "阿拉伯半岛", x: 54, y: 52, type: "变革起点", status: "exploring", child: "伊斯兰文明即将在这里诞生，改变亚非世界的格局。", fact: "穆罕默德约570-632年，伊斯兰文明从阿拉伯半岛兴起。", confidence: "confirmed", keywords: ["伊斯兰","穆罕默德","阿拉伯","麦加","新兴文明"], material: ["麦加","商队路线","阿拉伯半岛地图","前伊斯兰贸易城市"] },
      { id: "byzantium_600", name: "拜占庭帝国", x: 48, y: 40, type: "帝国延续", status: "exploring", child: "东罗马（拜占庭）延续罗马传统，是东地中海的重要力量。", fact: "拜占庭帝国延续至1453年，保存了大量古希腊罗马文化。", confidence: "confirmed", keywords: ["拜占庭","东罗马","君士坦丁堡","东正教"], material: ["君士坦丁堡城墙","东正教教堂","希腊文典籍","地中海贸易"] },
    ],
    regions: [
      { id: "islam_rising", name: "伊斯兰文明", title: "即将改变世界的新力量", summary: "公元600年前后，伊斯兰文明尚未兴起，但阿拉伯半岛已是东西方贸易的重要节点。穆罕默德于公元610年开始传教，622年迁徙至麦地那，这是伊斯兰历元年。伊斯兰迅速扩张，到公元700年已控制从西班牙到中亚的广大区域。", facts: ["穆罕默德约570-632年，在麦加和麦地那传教。", "伊斯兰历元年是622年。", "伊斯兰文明快速吸收了波斯、希腊和印度的学问。"], avoid: ["不要把伊斯兰文明的成熟特征放到公元600年之前。", "不要把伊斯兰扩张简单说成只靠武力。"] },
      { id: "tang_culture", name: "唐朝中国", title: "盛唐的国际化", summary: "唐朝是中国历史上最开放的朝代之一。长安是那个时代全球最大的城市之一，居住着来自各地的商人、传教士、留学生和使节。佛教在唐朝达到极盛，玄奘西天取经是这一时代的标志性事件。", facts: ["玄奘（602-664年）是唐朝最著名的取经僧侣。", "长安在唐朝鼎盛时期可能有百万人口。", "唐朝对外国文化非常开放，允许多种宗教并存。"], avoid: ["不要把唐朝和宋朝的特征混淆。", "不要说佛教是唐朝唯一的宗教。"] },
    ],
    changes: [
      { time: "公元618年", text: "唐朝建立，中国重新统一，进入开放繁荣时代。" },
      { time: "公元622年", text: "穆罕默德迁徙至麦地那，伊斯兰历元年，伊斯兰文明开始扩张。" },
      { time: "公元632年后", text: "伊斯兰文明快速扩张，到公元700年控制大片地区。" },
    ],
    sources: [
      { label: "Britannica: Islam", url: "https://www.britannica.com/topic/Islam" },
      { label: "Britannica: Tang dynasty", url: "https://www.britannica.com/topic/Tang-dynasty" },
    ],
    aiTask: {
      title: "设计一座世界信仰之城",
      background: "公元600年，你是一座城市的规划者。这座城市位于丝绸之路和海上贸易的交叉点，来自不同文明的人都会经过这里。你要设计一座可以让不同信仰的人和平共处的城市。",
      mustInclude: ["学校和图书馆", "寺院或教堂或礼拜场所", "市场和商业区", "来自不同文明的居民", "不同信仰共处的规则"],
      forbidden: ["现代宗教建筑风格混搭", "把伊斯兰文明的成熟特征放到600年之前"],
      commonErrors: ["把伊斯兰文明已经成熟的内容放到公元600年之前", "把欧洲说成现代国家体系"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元600年前后的宗教与文明时代。知识框架：唐朝（618年建立、长安国际都市、佛教鼎盛）、伊斯兰（622年元年，正在兴起中）、基督教欧洲（修道院文化）、拜占庭（东罗马延续）。注意：伊斯兰在600年时尚未成熟扩张，不要把后来的内容提前。",
      fields: [
        { name: "cityName", label: "城市名称", placeholder: "给这座信仰之城起个名字..." },
        { name: "location", label: "城市位置", placeholder: "在哪条贸易路线上..." },
        { name: "faithBuildings", label: "信仰建筑", placeholder: "寺院、教堂、神庙并存..." },
        { name: "knowledge", label: "知识和教育", placeholder: "图书馆、学校、翻译场所..." },
        { name: "market", label: "市场和商业", placeholder: "来自哪些文明的商品..." },
        { name: "rule", label: "信仰共处的规则", placeholder: "怎么让不同信仰和平共存..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">信仰之城 · 公元600年</p>
          <h4>${data.cityName || "世界信仰之城"}</h4>
          <p><strong>位置：</strong>位于${data.location || "丝绸之路与海上贸易交叉点"}。</p>
          <p><strong>信仰建筑：</strong>${data.faithBuildings || "寺院、教堂和不同传统的礼拜场所并存"}。</p>
          <p><strong>知识中心：</strong>${data.knowledge || "图书馆收藏多语言典籍，学者来自各地"}。</p>
          <p><strong>市场：</strong>${data.market || "来自中国、印度、波斯和欧洲的商品汇聚"}。</p>
          <p><strong>共处规则：</strong>${data.rule || "各信仰可以传教但不得强迫，市场中所有人平等交易"}。</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>公元600年前后，唐朝长安、拜占庭君士坦丁堡都是多文化共存的国际城市。</span></div>
            <div><strong>我的创造</strong><span>${data.cityName || "这座城市"}的设计和规则由我设计。</span></div>
          </div>
        </div>`,
    },
  },

  L10: {
    id: "L10", time: "公元800年", title: "黄金时代：知识、贸易与大城市",
    question: "为什么有些时代会成为文明的黄金时代？",
    takeaway: "公元800年前后，巴格达、长安、君士坦丁堡是世界最大城市——它们的繁荣来自贸易、知识积累和开放的文化政策。",
    snapshot: "公元800年前后，阿拔斯王朝的巴格达是学术与贸易的中心；唐朝长安是国际化大都市；查理曼帝国整合了西欧；日本从中国吸收文化并发展出独特形式。这是一个知识爆炸、城市繁荣的全球黄金时代。",
    chain: ["帝国稳定","贸易繁荣","财富积累","知识赞助","翻译运动","科学突破","城市扩张","文化输出"],
    concepts: [
      { name: "黄金时代", text: "一个文明在政治稳定、经济繁荣、文化创新同时达到高峰的时期。" },
      { name: "翻译运动", text: "阿拔斯王朝将希腊、印度、波斯的知识翻译成阿拉伯语，是人类知识传承的重要事件。" },
      { name: "世界城市", text: "不只是人口多，而是吸引多种文化、语言和宗教的国际化都市。" },
      { name: "知识赞助", text: "统治者支持学者、翻译家和科学家，是黄金时代出现的关键因素。" },
      { name: "文化交流", text: "不同文明的知识在贸易路线和城市中相遇，产生创新和融合。" },
    ],
    mapPoints: [
      { id: "baghdad_800", name: "巴格达（阿拔斯王朝）", x: 55, y: 46, type: "知识中心", status: "exploring", child: "巴格达是这一时代的知识首都，智慧宫汇聚了全球学者。", fact: "阿拔斯王朝（750-1258年）在巴格达建立了世界知识中心。", confidence: "confirmed", keywords: ["巴格达","阿拔斯","智慧宫","翻译运动","数学","医学"], material: ["智慧宫图书馆","天文台","学者辩论","多语言典籍","香料市场"] },
      { id: "tang_800", name: "唐朝长安", x: 73, y: 44, type: "国际都市", status: "exploring", child: "长安是那个时代全球最大的城市之一，充满来自各地的人。", fact: "唐朝盛唐时期长安人口可能超过百万，是真正的国际都市。", confidence: "confirmed", keywords: ["长安","唐朝","国际化","丝绸之路","诗歌"], material: ["国际市场","外国使节","佛教寺院","诗人聚会","多民族居民"] },
      { id: "charlemagne_800", name: "查理曼帝国", x: 40, y: 34, type: "西欧整合", status: "exploring", child: "查理曼整合西欧，推动文化复兴，与教会合作。", fact: "查理曼（742-814年）于800年被教皇加冕为皇帝。", confidence: "confirmed", keywords: ["查理曼","法兰克王国","西欧","教会","卡洛林文艺复兴"], material: ["修道院学校","教堂建筑","查理曼宫廷","手抄本"] },
      { id: "japan_heian_800", name: "日本平安时代", x: 82, y: 43, type: "文化吸收区", status: "exploring", child: "日本在吸收唐文化的基础上，发展出独特的本土文化。", fact: "平安时代（794-1185年）是日本贵族文化的黄金时代。", confidence: "confirmed", keywords: ["平安","日本","本土化","假名文字"], material: ["京都宫廷","假名文字","和式建筑","诗歌卷轴"] },
    ],
    regions: [
      { id: "abbasid", name: "阿拔斯王朝", title: "巴格达的智慧宫", summary: "阿拔斯王朝的黄金时代以「翻译运动」著称：将希腊哲学、印度数学、波斯文学翻译成阿拉伯语，并在此基础上发展出代数学、医学、天文学等。巴格达智慧宫是那个时代最重要的知识机构。", facts: ["花拉子密（约780-850年）发展了代数学。", "伊本·西那（阿维森纳）的医学典籍影响欧亚数百年。", "智慧宫汇聚了来自各个文明的学者。"], avoid: ["不要把阿拔斯黄金时代延续到1258年后（蒙古灭巴格达）。", "不要说伊斯兰科学只是保存了希腊知识，他们有重要原创贡献。"] },
      { id: "tang_golden", name: "唐朝", title: "世界级的国际都市", summary: "唐朝盛世以李白、杜甫等诗人著称，也以开放的对外政策闻名。长安有来自中亚、波斯、阿拉伯、日本、朝鲜的商人、学生和使节。唐朝对外来宗教持开放态度。", facts: ["唐朝有科举制度，允许平民通过考试进入政府。", "玄宗时代（713-756年）是唐朝文化最鼎盛时期。", "安史之乱（755-763年）是唐朝由盛转衰的转折点。"], avoid: ["不要把宋朝特征提前到唐朝。", "不要忽视安史之乱对唐朝的影响。"] },
    ],
    changes: [
      { time: "约公元750年", text: "阿拔斯王朝建立，巴格达成为新的世界知识中心。" },
      { time: "约公元800年", text: "查理曼被教皇加冕，西欧整合；唐朝盛世进入高峰。" },
      { time: "约公元830年", text: "翻译运动达到高峰，大量希腊、印度知识被翻译为阿拉伯语。" },
    ],
    sources: [
      { label: "Britannica: Abbasid caliphate", url: "https://www.britannica.com/topic/Abbasid-caliphate" },
      { label: "Britannica: House of Wisdom", url: "https://www.britannica.com/topic/House-of-Wisdom" },
    ],
    aiTask: {
      title: "设计一座世界知识之都",
      background: "你是公元800年前后一个繁荣帝国的城市规划者和知识赞助人。你要建设一座可以吸引全球学者和商人的知识之都。",
      mustInclude: ["图书馆和翻译中心", "学院和天文台", "多语言街区", "市场和商业区", "城市口号"],
      forbidden: ["现代大学校园风格", "现代互联网和数字图书馆", "把不同时代的建筑风格随意混搭"],
      commonErrors: ["把欧洲说成文艺复兴时期", "把宋朝提前到唐朝", "把巴格达画成现代大学园区"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元800年前后的黄金时代。知识框架：阿拔斯王朝巴格达（智慧宫、翻译运动、花拉子密代数、伊本·西那医学）、唐朝长安（国际都市、科举）、查理曼帝国（卡洛林文艺复兴）、日本平安（本土化）。不要出现现代大学、互联网、数字图书馆。",
      fields: [
        { name: "cityName", label: "知识之都名称", placeholder: "你的城市叫什么..." },
        { name: "empire", label: "所属文明/帝国", placeholder: "阿拔斯 / 唐朝 / 自创..." },
        { name: "library", label: "图书馆和翻译中心", placeholder: "收藏哪些语言的典籍..." },
        { name: "academy", label: "学院和研究机构", placeholder: "研究什么学科..." },
        { name: "multiCulture", label: "多文化街区", placeholder: "来自哪些文明的人居住..." },
        { name: "motto", label: "城市口号", placeholder: "这座城市的精神是什么..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">${data.empire || "黄金时代"} · 公元800年</p>
          <h4>${data.cityName || "世界知识之都"}</h4>
          <p><strong>城市口号：</strong>"${data.motto || "知识属于全人类，智慧无国界"}"</p>
          <p><strong>图书馆与翻译：</strong>${data.library || "收藏阿拉伯语、希腊语、波斯语、梵文典籍，常驻翻译家数百人"}。</p>
          <p><strong>学术机构：</strong>${data.academy || "天文台、医学院、数学研究中心，学者来自各个文明"}。</p>
          <p><strong>多文化社区：</strong>${data.multiCulture || "有来自中国、印度、波斯、希腊传统的学者和商人"}。</p>
          <p><strong>历史意义：</strong>黄金时代不是偶然，而是稳定政治、贸易财富、知识赞助、开放态度共同创造的。</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>公元800年前后巴格达和长安是世界两大知识与贸易中心。</span></div>
            <div><strong>我的创造</strong><span>${data.cityName || "这座城市"}的设计和特色由我创作。</span></div>
          </div>
        </div>`,
    },
  },

  L11: {
    id: "L11", time: "公元1000年", title: "中世纪世界：新的全球格局",
    question: "公元1000年，世界已经变成什么样了？",
    takeaway: "公元1000年，世界是多中心的：宋朝商业繁荣、伊斯兰世界学术鼎盛、欧洲封建社会发展、美洲和非洲有独立壮大的文明——没有单一中心，而是多极并存。",
    snapshot: "公元1000年，人类文明已经走过了4000年。从公元前3000年的大河村落，到现在多极并存的世界：宋朝初期商业和科技发展；伊斯兰学术贸易网络仍然强大；欧洲封建社会逐渐成形；印度洋贸易连接非洲和亚洲；美洲玛雅和安第斯文明各自发展。",
    chain: ["多帝国并立","贸易网络扩张","农业技术改进","城市商业化","知识积累","多极文明格局","全球连接雏形"],
    concepts: [
      { name: "多极世界", text: "没有单一的全球霸权，多个文明中心并立，各自发展也相互影响。" },
      { name: "商业城市", text: "宋朝开封、伊斯兰开罗、拜占庭君士坦丁堡都是这一时期的商业大城市。" },
      { name: "封建制度", text: "欧洲中世纪的政治制度，贵族拥有土地，农民依附于贵族，骑士负责军事。" },
      { name: "海上贸易", text: "印度洋和地中海的海上贸易网络在公元1000年非常活跃。" },
      { name: "文明传承", text: "每个文明都从此前4000年的历史中积累了独特的知识、制度和文化基础。" },
    ],
    mapPoints: [
      { id: "song_china_1000", name: "宋朝中国", x: 73, y: 46, type: "商业中心", status: "exploring", child: "宋朝商业、城市和科技发展活跃，开封是世界大城市。", fact: "北宋（960-1127年）开封人口可能超过百万，商业高度发达。", confidence: "confirmed", keywords: ["宋朝","开封","商业","纸币","印刷术","指南针"], material: ["繁华街市","纸币","印刷书坊","商人船只"] },
      { id: "islamic_world_1000", name: "伊斯兰世界", x: 55, y: 48, type: "学术贸易网络", status: "exploring", child: "伊斯兰学术和贸易网络仍然是世界上最广泛的文明网络之一。", fact: "公元1000年前后，伊斯兰世界从西班牙延伸到中亚。", confidence: "confirmed", keywords: ["伊斯兰","学术","贸易网络","阿拉伯语","开罗"], material: ["清真寺学院","香料贸易","医学典籍","天文学"] },
      { id: "europe_feudal_1000", name: "欧洲封建社会", x: 42, y: 34, type: "封建区域", status: "exploring", child: "欧洲封建社会逐渐成形，城堡、教会、骑士是主要特征。", fact: "欧洲约公元1000年前后开始技术改进，农业生产力提高。", confidence: "cautious", keywords: ["封建制度","骑士","教堂","修道院","农奴"], material: ["城堡","教堂","修道院田地","骑士装备"] },
      { id: "americas_1000", name: "美洲文明", x: 20, y: 55, type: "独立文明区", status: "visited", child: "玛雅文明、安第斯地区有独立发展的文明，与欧亚无直接联系。", fact: "玛雅文明在公元1000年前后已有历法、建筑和文字体系。", confidence: "cautious", keywords: ["玛雅","安第斯","美洲","独立发展"], material: ["金字塔神庙","玛雅历法","可可豆贸易","城市中心"] },
      { id: "africa_ghana_1000", name: "西非加纳王国", x: 43, y: 60, type: "区域强权", status: "visited", child: "加纳王国控制撒哈拉黄金贸易，是西非重要文明。", fact: "加纳王国（约300-1100年）以黄金和盐贸易著称。", confidence: "cautious", keywords: ["加纳王国","西非","黄金贸易","撒哈拉"], material: ["黄金","盐矿","撒哈拉商队","土城堡"] },
    ],
    regions: [
      { id: "song_commerce", name: "宋朝", title: "商业革命的开端", summary: "北宋是中国历史上商业化程度最高的王朝之一。开封是那个时代人口最多的城市之一。宋朝发明了纸币（交子）、活字印刷术，指南针也在这一时期广泛用于航海。商人阶层崛起，城市生活丰富多彩。", facts: ["宋朝有世界上最早的纸币（交子）。", "毕昇（约990-1051年）发明了活字印刷术。", "北宋灭亡于1127年（金国南下），南宋延续到1279年。"], avoid: ["不要把宋朝的商业特征说成欧洲资本主义。", "不要忽略宋朝面临的北方军事压力。"] },
      { id: "global_1000", name: "全球视野", title: "多极并存的世界", summary: "公元1000年，世界没有单一的全球霸主。宋朝、伊斯兰世界、拜占庭、欧洲封建社会、印度王国、东南亚港口城市、非洲王国和美洲文明各自发展，通过贸易路线相互影响。", facts: ["公元1000年世界人口约2.5-3亿。", "印度洋贸易连接非洲东部、阿拉伯半岛、印度和东南亚。", "中国宋朝的经济体量在那个时代极为突出。"], avoid: ["不要说公元1000年世界已经全球化到现代程度。", "不要忽略美洲和非洲文明的独立发展。"] },
    ],
    changes: [
      { time: "公元960年", text: "宋朝建立，中国进入商业文明高峰，纸币、印刷术出现。" },
      { time: "约公元1000年", text: "欧洲开始技术改进，农业生产力提高，城市逐渐复苏。" },
      { time: "约公元1000年", text: "伊斯兰贸易网络从西班牙延伸到东南亚，是那个时代最广泛的文明网络。" },
    ],
    sources: [
      { label: "Britannica: Song dynasty", url: "https://www.britannica.com/topic/Song-dynasty" },
      { label: "Britannica: Maya civilization", url: "https://www.britannica.com/topic/Maya" },
    ],
    aiTask: {
      title: "公元1000年全球文明观察报告",
      background: "你是公元1000年的一位旅行者和观察员。你选择一个身份，用他/她的眼睛来观察这个多极世界。",
      mustInclude: ["你的身份和所属文明", "你观察到的其他文明", "最令你惊讶的事", "你认为哪个文明最强大或最有趣", "4000年文明历程的感受"],
      forbidden: ["说公元1000年世界已经现代全球化", "忽略美洲与非洲文明", "把欧洲城堡说成现代民族国家"],
      commonErrors: ["说公元1000年世界已经全球化到现代程度", "忽略美洲与非洲文明"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生学习公元1000年的中世纪世界。知识框架：宋朝（商业城市、纸币、印刷术）、伊斯兰世界（学术网络、贸易）、欧洲（封建制度、修道院、骑士）、美洲（玛雅、安第斯，与欧亚无联系）、非洲（加纳王国）。核心：多极世界，无单一霸主。",
      fields: [
        { name: "identity", label: "你的身份", type: "select", options: ["中国宋朝商人","阿拉伯学者","欧洲骑士","印度洋船长","西非黄金商人","玛雅城市建造者","自定义身份"] },
        { name: "customIdentity", label: "如果自定义，描述你的身份", placeholder: "来自哪里，做什么..." },
        { name: "observation", label: "你观察到的最有趣文明", placeholder: "哪个文明让你最惊讶..." },
        { name: "surprise", label: "最令你惊讶的事", placeholder: "你没想到的某个现象或发明..." },
        { name: "strongest", label: "你认为哪个文明最强大", placeholder: "为什么这么认为..." },
        { name: "reflection", label: "对4000年文明历程的感受", placeholder: "从公元前3000年到现在，你看到了什么变化..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">全球观察 · 公元1000年</p>
          <h4>${data.identity === "自定义身份" ? data.customIdentity : data.identity}的世界观察报告</h4>
          <p><strong>最有趣的文明：</strong>${data.observation || "宋朝的市场让我震惊，纸张可以当钱用，书可以大量印刷"}。</p>
          <p><strong>最惊讶的发现：</strong>${data.surprise || "世界上同时有这么多繁荣的文明，却彼此知之甚少"}。</p>
          <p><strong>最强大的文明：</strong>${data.strongest || "宋朝的财富令人叹为观止，但伊斯兰的知识网络连接更广"}。</p>
          <p><strong>4000年回望：</strong>${data.reflection || "从公元前3000年的河边小城，到今天拥有纸币、印刷术和环绕全球的贸易网络，人类走了多远。"}</p>
          <div class="fact-table">
            <div><strong>历史事实</strong><span>公元1000年世界多极并存，宋朝、伊斯兰世界、欧洲、美洲和非洲各自发展。</span></div>
            <div><strong>我的创造</strong><span>这份观察报告的视角和感受由我设计。</span></div>
          </div>
        </div>`,
    },
  },

  L12: {
    id: "L12", time: "综合展示", title: "文明博览会：我的原创古代文明",
    question: "如果你能创造一个从公元前3000年发展到公元1000年的文明，它会如何成长？",
    takeaway: "4000年的文明史告诉我们：没有哪个文明是孤立的，也没有哪个文明是永恒的——文明在危机、迁徙、贸易和思想中不断转型。",
    snapshot: "这是第一学期的最后一课。我们从公元前3000年的大河文明出发，经历了金字塔、青铜时代、轴心思想、帝国统一、丝绸之路、黄金时代，最终来到公元1000年的多极世界。现在，是你创造自己文明的时候了。",
    chain: ["公元前3000年城市诞生","公元前2500年大型工程","公元前1600年青铜王国","公元前1200年危机重建","公元前500年思想变革","公元前221年帝国统一","公元1年贸易网络","公元300年危机转型","公元600年宗教新秩序","公元800年黄金时代","公元1000年多极格局"],
    concepts: [
      { name: "文明设定", text: "一个完整的文明需要地理位置、城市、政治制度、技术、贸易、信仰和文化特征。" },
      { name: "文明成长", text: "文明不是静止的，而是在危机和机遇中不断变化和成长。" },
      { name: "历史事实vs创造", text: "创作历史题材时，要能区分哪些基于事实，哪些是你的创造。" },
      { name: "文明遗产", text: "文明留下的不只是建筑，还有语言、制度、知识、艺术和价值观。" },
      { name: "AI辅助创作", text: "AI可以帮助生成图像、文字和设计，但创意、判断和表达是你的。" },
    ],
    mapPoints: [
      { id: "student_civ_create", name: "你的文明诞生地", x: 55, y: 50, type: "学生创作", status: "student", child: "这里是你将要放置自己原创文明的位置。", fact: "你的文明基于4000年真实历史，但故事由你创造。", confidence: "confirmed", keywords: ["原创文明","学生创作","历史事实","创造"], material: ["你的第一城市","你的文明神器","你的历史地图"] },
    ],
    regions: [
      { id: "review_all", name: "第一学期回顾", title: "从村落到多极世界的4000年", summary: "第一学期我们走过了11个时间节点，从公元前3000年的第一座城市，到公元1000年的多极文明世界。每一节课的因果链都在延伸：城市需要管理，管理需要文字，文字传播思想，思想改变帝国，帝国崩溃重生，重生带来黄金时代。", facts: ["11节课 = 4000年文明历程。", "每节课都有一个核心因果链和创作任务。", "你的文明设定集融合了所有课程的知识和创意。"], avoid: ["不要说哪个文明是最好的或最聪明的。", "不要把文明进步说成线性的单一方向。"] },
    ],
    changes: [
      { time: "第1-3课", text: "文明诞生阶段：城市、农业、技术、王国。" },
      { time: "第4课", text: "文明危机：崩溃不是终点，而是转型的开始。" },
      { time: "第5-7课", text: "思想与帝国阶段：哲学、统一、贸易网络。" },
      { time: "第8-10课", text: "转型与黄金时代：危机、宗教、知识城市。" },
      { time: "第11-12课", text: "综合表达：用全球视角创造完整文明。" },
    ],
    sources: [
      { label: "Britannica: World History", url: "https://www.britannica.com/topic/history-of-the-world" },
    ],
    aiTask: {
      title: "我的古代文明设定集",
      background: "这是第一学期的最终作品。你要创造一个完整的原创文明，它从公元前3000年发展到公元1000年，经历了诞生、成长、危机和黄金时代。",
      mustInclude: ["文明名称和地理位置", "第一座城市（公元前3000年）", "权力中心和技术", "危机事件和重建", "贸易网络", "黄金时代", "公元1000年的文明遗产"],
      forbidden: ["把历史上真实的文明直接复制", "忘记区分历史事实和自己的创造", "只写现代设定"],
      commonErrors: ["忘记标注哪些是历史事实，哪些是自己的创造", "只做表面设计而没有历史逻辑"],
      systemPrompt: "你是AI世界文明实验室助手，帮助学生完成第一学期的最终作品——原创古代文明设定集。你了解全部11节课的内容（公元前3000年至公元1000年）。帮助学生设计有历史逻辑的原创文明，鼓励创意，但要能区分事实与创造。",
      fields: [
        { name: "civName", label: "文明名称", placeholder: "你的文明叫什么..." },
        { name: "location", label: "地理位置", placeholder: "靠河、靠海、草原、山地还是沙漠..." },
        { name: "firstCity", label: "第一座城市（公元前3000年）", placeholder: "第一座城市是什么样的..." },
        { name: "powerCenter", label: "权力中心和技术优势", placeholder: "城堡、神庙、帝国首都..." },
        { name: "crisis", label: "经历的最大危机", placeholder: "战争、崩溃、迁徙、气候..." },
        { name: "tradeNetwork", label: "贸易网络", placeholder: "和哪些文明交换什么..." },
        { name: "goldenAge", label: "黄金时代是什么样的", placeholder: "最强盛时，你的文明有什么特别的..." },
        { name: "legacy", label: "留给后世的遗产", placeholder: "你的文明最终给世界留下了什么..." },
      ],
      generateArtifact: (data) => `
        <div class="artifact-card">
          <p class="eyebrow">原创文明设定集 · 公元前3000年 — 公元1000年</p>
          <h4>${data.civName || "我的文明"}</h4>
          <p><strong>地理位置：</strong>${data.location || "位于大河流域，靠近重要贸易路线"}。</p>
          <p><strong>第一座城市（公元前3000年）：</strong>${data.firstCity || "一座靠近河流的城市，有粮仓、神庙和市场"}。</p>
          <p><strong>权力与技术：</strong>${data.powerCenter || "发展出独特的建筑技术和行政制度"}。</p>
          <p><strong>最大危机：</strong>${data.crisis || "经历了战争和贸易断裂，但在废墟中重建了更强的秩序"}。</p>
          <p><strong>贸易网络：</strong>${data.tradeNetwork || "与邻近文明交换金属、香料和知识"}。</p>
          <p><strong>黄金时代：</strong>${data.goldenAge || "在稳定时期，城市繁荣，学者辈出，贸易四通八达"}。</p>
          <p><strong>历史遗产：</strong>${data.legacy || "留下了独特的文字系统、建筑传统和哲学思想"}。</p>
          <div class="fact-table">
            <div><strong>历史事实基础</strong><span>所有设计参考了真实的大河文明、青铜时代、轴心时代和丝绸之路历史。</span></div>
            <div><strong>我的创造</strong><span>${data.civName || "这个文明"}的名字、故事和设定完全由我原创设计。</span></div>
          </div>
          <p style="margin-top:16px;padding:12px;background:var(--amber-glow);border-radius:8px;font-size:13px;color:var(--amber)">恭喜完成第一学期！你已经穿越了4000年的文明史，从公元前3000年的第一座城市，走到了公元1000年的多极世界。</p>
        </div>`,
    },
  },
};

// 全局知识库（用于跨课搜索）
const KNOWLEDGE_BASE = [
  { id: "kb_sumerian", category: "地区文明", lesson: "L01", title: "苏美尔文明", content: "两河流域最早的城市文明，约公元前4000-2000年。以城邦形式组织，拥有神庙经济、楔形文字和灌溉农业。乌鲁克、乌尔、基什是重要城市。", keywords: ["苏美尔","两河流域","楔形文字","城邦","乌鲁克","乌尔"] },
  { id: "kb_egypt_old", category: "地区文明", lesson: "L02", title: "埃及古王国", content: "约公元前2686-2181年，以金字塔建设著称。法老拥有神权和王权，古王国是中央集权的代表。胡夫、哈夫拉和门卡乌拉金字塔是代表建筑。", keywords: ["古王国","金字塔","法老","胡夫","埃及"] },
  { id: "kb_indus", category: "地区文明", lesson: "L01", title: "印度河流域文明", content: "约公元前3300-1300年。以精密城市规划著称，哈拉帕和摩亨佐-达罗是主要城市。有完整排水系统和标准砖块，但文字至今未破解。", keywords: ["印度河","哈拉帕","摩亨佐-达罗","城市规划","排水"] },
  { id: "kb_shang", category: "地区文明", lesson: "L03", title: "商朝", content: "中国有文字记录的第一个王朝，约公元前1600-1046年。以青铜器和甲骨文著称。甲骨文是向祖先占卜的文字，刻在龟甲和动物骨头上。", keywords: ["商朝","甲骨文","青铜器","王权","祭祀","中国"] },
  { id: "kb_hittite", category: "地区文明", lesson: "L03", title: "赫梯帝国", content: "约公元前1600-1180年，位于今土耳其地区。以战车技术著称，约公元前1200年崩溃。与埃及签订著名的卡迭石和约。", keywords: ["赫梯","战车","铁器","卡迭石","崩溃"] },
  { id: "kb_bronze_collapse", category: "历史事件", lesson: "L04", title: "青铜时代崩溃", content: "约公元前1200年前后，东地中海和西亚多个文明衰落。可能原因包括：气候变化、贸易断裂、海上民族迁徙、内部矛盾。赫梯崩溃，迈锡尼衰落，埃及受冲击但延续。", keywords: ["青铜时代崩溃","海上民族","迈锡尼","赫梯","东地中海","多因崩溃"] },
  { id: "kb_cuneiform", category: "核心概念", lesson: "L01", title: "楔形文字", content: "世界上最早的文字系统之一，由苏美尔人发展，用于记录物资、法律和故事。刻在泥板上，形状像楔子，是楔形名称的来源。", keywords: ["楔形文字","苏美尔","泥板","早期文字"] },
  { id: "kb_causal_chain", category: "核心概念", lesson: "L01", title: "文明形成的因果链", content: "文明形成的基本逻辑：河流→农业→粮食剩余→分工→城市→管理→文明。每一步都为下一步创造条件，没有河流就没有农业，没有剩余就没有分工。", keywords: ["因果链","文明形成","粮食剩余","分工","城市","管理"] },
  { id: "kb_bronze_tech", category: "核心概念", lesson: "L03", title: "青铜技术", content: "把铜和锡合金，制造更坚硬的工具、武器和礼器。青铜技术在约公元前3000-1000年主导了人类金属使用，之后被铁器取代。青铜代表的不只是材料，更是权力和财富。", keywords: ["青铜","铜锡合金","武器","礼器","技术"] },
  { id: "kb_axial_age", category: "核心概念", lesson: "L05", title: "轴心时代", content: "约公元前800-200年，中国、印度、希腊同时出现深刻思想变革：孔子、老子、佛陀、苏格拉底。城市化和商业发展创造了独立思想的土壤。", keywords: ["轴心时代","孔子","佛陀","苏格拉底","思想","哲学"] },
  { id: "kb_qin", category: "地区文明", lesson: "L06", title: "秦帝国", content: "公元前221-206年，中国第一个中央集权帝国。秦始皇统一文字、货币、度量衡，修建驰道和长城，建立郡县制。短暂但影响深远。", keywords: ["秦始皇","秦帝国","统一","郡县制","长城","兵马俑"] },
  { id: "kb_rome_empire", category: "地区文明", lesson: "L06", title: "罗马帝国", content: "罗马从共和制（公元前509年）到帝国（公元前27年）。奥古斯都时代繁盛，法律制度影响深远。395年分裂，476年西罗马灭亡，东罗马（拜占庭）延续至1453年。", keywords: ["罗马","帝国","共和国","奥古斯都","法律","君士坦丁"] },
  { id: "kb_silk_road", category: "历史事件", lesson: "L07", title: "丝绸之路", content: "公元前后兴起的贸易网络，连接中国、中亚、西亚和罗马。传递丝绸、香料、玻璃、佛教和其他文化。陆路与海路（印度洋）并行。粟特商人是最重要的中介。", keywords: ["丝绸之路","贸易网络","粟特","张骞","汉朝","罗马"] },
  { id: "kb_abbasid", category: "地区文明", lesson: "L10", title: "阿拔斯王朝与智慧宫", content: "750-1258年，伊斯兰黄金时代。巴格达智慧宫将希腊、印度、波斯知识翻译为阿拉伯语。花拉子密发展代数学，伊本·西那奠定医学基础。1258年蒙古军队摧毁巴格达。", keywords: ["阿拔斯","巴格达","智慧宫","翻译运动","花拉子密","代数"] },
  { id: "kb_tang", category: "地区文明", lesson: "L10", title: "唐朝", content: "618-907年，中国最开放的朝代之一。长安是国际大都市，接待来自各地的商人、传教士和使节。科举制度发展，诗歌黄金时代（李白、杜甫）。755年安史之乱是转折点。", keywords: ["唐朝","长安","李白","杜甫","科举","玄奘","国际化"] },
  { id: "kb_song", category: "地区文明", lesson: "L11", title: "宋朝", content: "960-1279年。商业高度发达，发明纸币（交子）、活字印刷术，指南针用于航海。开封是当时世界最大城市之一。", keywords: ["宋朝","开封","纸币","印刷术","指南针","商业"] },
  { id: "kb_islam", category: "核心概念", lesson: "L09", title: "伊斯兰文明兴起", content: "穆罕默德约570-632年，伊斯兰教从阿拉伯半岛兴起，622年（伊斯兰历元年）迁往麦地那。快速扩张后成为连接非洲、欧洲和亚洲的重要文明纽带。", keywords: ["伊斯兰","穆罕默德","麦加","麦地那","622年","阿拉伯"] },
];
