// 历史因果链 · 策划数据 —— 训练"因果观"
// 每条链:节点按因果先后排列(数组顺序=正确顺序,用于"重建模式")
// kind: 环境 / 制度 / 技术 / 人物 / 事件 / 影响
// link: 可选,跳到对应深度页
const CAUSAL_CHAINS = [
  {
    id:'agri_city', title:'农业革命 → 第一座城市', emoji:'🌾', theme:'文明如何开始',
    nodes:[
      {label:'两河流域气候湿润、土壤肥沃', kind:'环境', year:'~前5000', desc:'美索不达米亚南部冲积平原,洪水带来肥沃淤泥。'},
      {label:'人们修渠灌溉、发展农业', kind:'技术', year:'~前4500', desc:'集体修建灌溉系统,粮食产量翻几倍。'},
      {label:'粮食出现大量剩余', kind:'影响', year:'', desc:'吃不完的粮食,养得起不种地的人。'},
      {label:'出现专业分工(祭司/工匠/士兵)', kind:'制度', year:'', desc:'有人专门做手艺、管理、打仗,社会分层。'},
      {label:'乌鲁克成长为数万人的超级城市', kind:'事件', year:'~前3500', desc:'人类第一次大量陌生人长期共处。', link:{page:'civ-deep.html',hash:'/civ/sumer'}},
      {label:'文字与王权随之诞生', kind:'影响', year:'~前3300', desc:'管理大城市必须记账(→文字)、维持秩序(→国王)。', link:{page:'civ-deep.html',hash:'/event/evt_cuneiform_invented'}},
    ]
  },
  {
    id:'writing', title:'为什么人类发明了文字', emoji:'✍️', theme:'技术为何出现',
    nodes:[
      {label:'神庙要管理大量粮食与货物', kind:'制度', year:'~前3400', desc:'城市太大,光靠记忆管不过来。'},
      {label:'在泥板上画图形记账', kind:'技术', year:'~前3300', desc:'画一头牛、几道划痕代表数量。'},
      {label:'图形简化成楔形文字', kind:'技术', year:'~前3200', desc:'用芦苇笔压出三角痕,书写更快。', link:{page:'civ-deep.html',hash:'/event/evt_cuneiform_invented'}},
      {label:'法律、文学、历史得以被记录', kind:'影响', year:'', desc:'文字从"记账工具"变成承载文明记忆的载体。'},
    ]
  },
  {
    id:'bronze_collapse', title:'青铜时代为何大崩溃', emoji:'💥', theme:'文明为何衰亡',
    nodes:[
      {label:'东地中海遭遇长期大干旱', kind:'环境', year:'~前1200', desc:'古气候证据显示严重干旱。'},
      {label:'饥荒引发"海上民族"大迁徙袭击', kind:'事件', year:'~前1190', desc:'来源不明的人群沿海劫掠。'},
      {label:'长途贸易网络断裂', kind:'影响', year:'', desc:'青铜时代高度依赖远程贸易。'},
      {label:'造青铜的锡严重短缺', kind:'影响', year:'', desc:'铜+锡都靠进口,断供则武器农具难造。'},
      {label:'赫梯、迈锡尼等帝国连锁崩溃', kind:'事件', year:'~前1180', desc:'一个倒下引发邻近多米诺式崩塌。', link:{page:'civ-deep.html',hash:'/event/evt_bronze_collapse'}},
      {label:'希腊进入黑暗时代,铁器时代来临', kind:'影响', year:'~前1100', desc:'文字失传、人口锐减;但更易得的铁取代青铜。'},
    ]
  },
  {
    id:'rome', title:'罗马如何崛起又如何衰亡', emoji:'🦅', theme:'帝国的一生',
    nodes:[
      {label:'台伯河畔的城邦罗马', kind:'制度', year:'~前753', desc:'从小城邦起步,建立共和制。', link:{page:'classical-deep.html',hash:'/event/evt_roman_founded'}},
      {label:'三次布匿战争击败迦太基', kind:'事件', year:'~前201', desc:'夺取地中海西部霸权。', link:{page:'classical-deep.html',hash:'/event/evt_punic'}},
      {label:'称霸整个地中海', kind:'影响', year:'~前146', desc:'财富与奴隶涌入,但贫富分化加剧。'},
      {label:'共和危机 → 恺撒 → 帝制', kind:'人物', year:'~前27', desc:'内战不断,最终元首制(帝国)取代共和。', link:{page:'classical-deep.html',hash:'/event/evt_caesar'}},
      {label:'疆域过大 + 蛮族压力 + 分裂', kind:'事件', year:'~395', desc:'帝国一分为二,边防与财政难以为继。'},
      {label:'西罗马帝国灭亡(476)', kind:'影响', year:'476', desc:'西欧进入中世纪;东罗马(拜占庭)续存千年。'},
    ]
  },
  {
    id:'islam', title:'伊斯兰如何兴起并连接世界', emoji:'☪️', theme:'宗教与帝国',
    nodes:[
      {label:'阿拉伯半岛部落分裂、商路兴盛', kind:'环境', year:'~600', desc:'部落林立,麦加是商贸与信仰中心。'},
      {label:'穆罕默德传教,统一阿拉伯', kind:'人物', year:'622', desc:'以一神信仰把部落凝聚成共同体。', link:{page:'medieval-deep.html',hash:'/event/evt_hijra'}},
      {label:'阿拉伯大征服', kind:'事件', year:'~640', desc:'数十年内击败拜占庭与波斯。', link:{page:'medieval-deep.html',hash:'/event/evt_arab_conquest'}},
      {label:'横跨亚非欧的伊斯兰帝国', kind:'影响', year:'~750', desc:'连接地中海、波斯、印度与中亚。'},
      {label:'巴格达智慧宫·翻译运动', kind:'影响', year:'~800', desc:'把希腊、印度、波斯的知识译成阿拉伯文并发展。', link:{page:'medieval-deep.html',hash:'/event/evt_house_wisdom'}},
      {label:'古典知识经西班牙回流欧洲', kind:'影响', year:'~1100', desc:'保存的亚里士多德等学问,点燃欧洲文艺复兴。'},
    ]
  },
  {
    id:'mongol', title:'草原如何改变了整个欧亚', emoji:'🐎', theme:'连接与交流',
    nodes:[
      {label:'蒙古草原的游牧环境', kind:'环境', year:'', desc:'逐水草而居,擅长骑射,部落分散。'},
      {label:'为生存与争夺结成部落联盟', kind:'制度', year:'~1200', desc:'草原资源有限,联合才能强大。'},
      {label:'成吉思汗统一蒙古各部', kind:'人物', year:'1206', desc:'以军事组织与法典统一草原。', link:{page:'medieval-deep.html',hash:'/event/evt_genghis_unify'}},
      {label:'蒙古大规模西征', kind:'事件', year:'~1240', desc:'建立横跨欧亚的庞大帝国。', link:{page:'medieval-deep.html',hash:'/event/evt_mongol_conquest'}},
      {label:'欧亚驿路畅通(蒙古和平)', kind:'影响', year:'~1280', desc:'商人、使节可安全穿越大陆(马可·波罗即此时来华)。'},
      {label:'商品、技术、疾病跨洲传播', kind:'影响', year:'~1340', desc:'火药指南针西传;黑死病也沿商路传向欧洲。'},
    ]
  },
  {
    id:'blackdeath', title:'黑死病引发了哪些连锁变化', emoji:'☠️', theme:'灾难的连锁',
    nodes:[
      {label:'蒙古商路连通欧亚', kind:'环境', year:'~1300', desc:'大陆畅通,人与货物(和病菌)快速流动。'},
      {label:'鼠疫沿商路向西传播', kind:'事件', year:'~1346', desc:'从中亚经黑海传入欧洲。'},
      {label:'欧洲人口锐减约三分之一', kind:'影响', year:'1347', desc:'数年内数千万人死亡。', link:{page:'medieval-deep.html',hash:'/event/evt_black_death'}},
      {label:'劳动力短缺,工资上涨', kind:'影响', year:'~1360', desc:'活下来的农民、工匠更值钱。'},
      {label:'农奴制松动,教会权威动摇', kind:'影响', year:'', desc:'旧秩序被冲击,人们开始质疑。'},
      {label:'通往文艺复兴与近代变革', kind:'影响', year:'~1400', desc:'劳动观念、人本思想酝酿。'},
    ]
  },
  {
    id:'inventions', title:'中国三大发明如何改变世界', emoji:'🧭', theme:'技术的旅行',
    nodes:[
      {label:'中国发明火药、印刷术、指南针', kind:'技术', year:'~1000', desc:'宋代三大发明趋于成熟。', link:{page:'medieval-deep.html',hash:'/civ/song'}},
      {label:'蒙古帝国与阿拉伯商人作中介', kind:'影响', year:'~1250', desc:'欧亚畅通,技术随商路与战争流动。'},
      {label:'经丝路与十字军传入欧洲', kind:'事件', year:'~1300', desc:'技术在不同文明间被吸收、改良。'},
      {label:'火药→军事革命;指南针→大航海;印刷→知识普及', kind:'影响', year:'~1450', desc:'三大发明深刻重塑了近代欧洲与世界。'},
    ]
  },
];
