// 当代与未来文明(1945-至今) · 人物数据
const CLASSICAL_PEOPLE=[
  // 联合国与战后秩序 (un)
  {id:"eleanor",n:"埃莉诺·罗斯福",e:"Eleanor Roosevelt",c:"un",r:"thinker",d:"1884—1962",b:"《世界人权宣言》主要起草者,'所有人生而自由平等'。",rel:[{i:"annan",t:"联合国理想"}]},
  {id:"keynes",n:"凯恩斯",e:"J.M. Keynes",c:"un",r:"thinker",d:"1883—1946",b:"经济学家,布雷顿森林体系设计者之一,现代宏观经济学奠基。",rel:[]},
  {id:"hammarskjold",n:"哈马舍尔德",e:"Dag Hammarskjöld",c:"un",r:"ruler",d:"1905—1961",b:"联合国第二任秘书长,刚果危机中殉职,最受尊敬的秘书长。",rel:[{i:"annan",t:"秘书长传承"}]},
  {id:"annan",n:"科菲·安南",e:"Kofi Annan",c:"un",r:"ruler",d:"1938—2018",b:"联合国秘书长,改革联合国,2001年诺贝尔和平奖。",rel:[{i:"eleanor",t:"人权理想"},{i:"hammarskjold",t:"秘书长传承"}]},
  {id:"gandhi",n:"甘地",e:"Mahatma Gandhi",c:"un",r:"thinker",d:"1869—1948",b:"非暴力不合作,领导印度独立,影响全球民权运动。",rel:[{i:"nehru",t:"印度独立"},{i:"mandela",t:"启发非暴力"}]},
  {id:"nehru",n:"尼赫鲁",e:"Jawaharlal Nehru",c:"un",r:"ruler",d:"1889—1964",b:"印度首任总理,不结盟运动领袖。",rel:[{i:"gandhi",t:"印度独立"}]},
  {id:"mandela",n:"曼德拉",e:"Nelson Mandela",c:"un",r:"ruler",d:"1918—2013",b:"反种族隔离斗士,囚27年,1994年成南非首位黑人总统。",rel:[{i:"gandhi",t:"承非暴力精神"}]},
  {id:"nkrumah",n:"恩克鲁玛",e:"Kwame Nkrumah",c:"un",r:"ruler",d:"1909—1972",b:"加纳独立(1957),泛非主义领袖,非洲去殖民化先锋。",rel:[]},
  // 冷战 (coldwar)
  {id:"truman",n:"杜鲁门",e:"Harry Truman",c:"coldwar",r:"ruler",d:"1884—1972",b:"提出杜鲁门主义与马歇尔计划,冷战遏制政策开端。",rel:[{i:"stalin_c",t:"冷战对手"}]},
  {id:"stalin_c",n:"斯大林",e:"Joseph Stalin",c:"coldwar",r:"ruler",d:"1878—1953",b:"苏联领导人,战后扩张东欧,'铁幕'另一侧。",rel:[{i:"truman",t:"冷战对手"}]},
  {id:"khrushchev",n:"赫鲁晓夫",e:"Nikita Khrushchev",c:"coldwar",r:"ruler",d:"1894—1971",b:"批判斯大林,古巴导弹危机中与肯尼迪对峙又退让。",rel:[{i:"kennedy",t:"古巴导弹危机"}]},
  {id:"kennedy",n:"肯尼迪",e:"John F. Kennedy",c:"coldwar",r:"ruler",d:"1917—1963",b:"美国总统,古巴导弹危机、登月宣言,1963年遇刺。",rel:[{i:"khrushchev",t:"古巴导弹危机"}]},
  {id:"castro",n:"卡斯特罗",e:"Fidel Castro",c:"coldwar",r:"ruler",d:"1926—2016",b:"古巴革命领袖,把古巴变成冷战前沿。",rel:[{i:"guevara",t:"革命战友"}]},
  {id:"guevara",n:"切·格瓦拉",e:"Che Guevara",c:"coldwar",r:"general",d:"1928—1967",b:"古巴革命英雄,全球左翼偶像。",rel:[{i:"castro",t:"革命战友"}]},
  {id:"hochiminh",n:"胡志明",e:"Ho Chi Minh",c:"coldwar",r:"ruler",d:"1890—1969",b:"北越领袖,领导越南独立与抗法抗美。",rel:[]},
  {id:"brezhnev",n:"勃列日涅夫",e:"Leonid Brezhnev",c:"coldwar",r:"ruler",d:"1906—1982",b:"苏联领导人,'停滞时期',入侵阿富汗。",rel:[{i:"nixon",t:"缓和"}]},
  {id:"nixon",n:"尼克松",e:"Richard Nixon",c:"coldwar",r:"ruler",d:"1913—1994",b:"1972年访华,冷战格局从两极变三角;缓和。",rel:[{i:"mao",t:"破冰会面"},{i:"brezhnev",t:"缓和"}]},
  {id:"mao",n:"毛泽东",e:"Mao Zedong",c:"coldwar",r:"ruler",d:"1893—1976",b:"1949年建立新中国,'中国人民从此站起来了'。",rel:[{i:"nixon",t:"破冰会面"},{i:"deng",t:"后继者"}]},
  {id:"deng",n:"邓小平",e:"Deng Xiaoping",c:"coldwar",r:"ruler",d:"1904—1997",b:"1978年改革开放,'不管黑猫白猫',让十几亿人融入世界经济。",rel:[{i:"mao",t:"继其后改革"}]},
  {id:"reagan",n:"里根",e:"Ronald Reagan",c:"coldwar",r:"ruler",d:"1911—2004",b:"以大规模军备拖垮苏联,与戈尔巴乔夫推动冷战终结。",rel:[{i:"gorbachev",t:"终结冷战"},{i:"thatcher",t:"新自由主义盟友"}]},
  {id:"gorbachev",n:"戈尔巴乔夫",e:"Mikhail Gorbachev",c:"coldwar",r:"ruler",d:"1931—2022",b:"'改革'与'开放',无意中加速苏联解体、终结冷战。",rel:[{i:"reagan",t:"终结冷战"},{i:"yeltsin",t:"权力交接"}]},
  {id:"yeltsin",n:"叶利钦",e:"Boris Yeltsin",c:"coldwar",r:"ruler",d:"1931—2007",b:"苏联解体后领导俄罗斯联邦。",rel:[{i:"gorbachev",t:"权力交接"}]},
  // 全球化 (globalization)
  {id:"thatcher",n:"撒切尔",e:"Margaret Thatcher",c:"globalization",r:"ruler",d:"1925—2013",b:"英国首相,私有化、去管制,新自由主义旗手。",rel:[{i:"reagan",t:"新自由主义盟友"}]},
  {id:"clinton",n:"克林顿",e:"Bill Clinton",c:"globalization",r:"ruler",d:"1946—",b:"美国总统,推动NAFTA/WTO/中国入世。",rel:[]},
  {id:"friedman_t",n:"托马斯·弗里德曼",e:"Thomas Friedman",c:"globalization",r:"thinker",d:"1953—",b:"《世界是平的》,全球化乐观主义代表。",rel:[]},
  {id:"binladen",n:"本·拉登",e:"Osama bin Laden",c:"globalization",r:"other",d:"1957—2011",b:"9/11恐怖袭击主谋,全球化时代的非对称威胁。",rel:[]},
  // 互联网 (internet)
  {id:"berners_lee",n:"蒂姆·伯纳斯-李",e:"Tim Berners-Lee",c:"internet",r:"thinker",d:"1955—",b:"发明万维网(WWW),且不申请专利、免费开放给全人类。",rel:[{i:"cerf",t:"互联网先驱"}]},
  {id:"cerf",n:"文顿·瑟夫",e:"Vint Cerf",c:"internet",r:"thinker",d:"1943—",b:"TCP/IP 协议共同发明者,'互联网之父'。",rel:[{i:"berners_lee",t:"互联网先驱"}]},
  {id:"gates",n:"比尔·盖茨",e:"Bill Gates",c:"internet",r:"other",d:"1955—",b:"微软,个人电脑革命;后成全球最大慈善家之一。",rel:[{i:"jobs",t:"PC时代对手"}]},
  {id:"jobs",n:"史蒂夫·乔布斯",e:"Steve Jobs",c:"internet",r:"other",d:"1955—2011",b:"苹果,Mac/iPhone,'科技与人文的交叉点',开启移动互联网。",rel:[{i:"gates",t:"PC时代对手"}]},
  {id:"bezos",n:"杰夫·贝索斯",e:"Jeff Bezos",c:"internet",r:"other",d:"1964—",b:"亚马逊,全球电商与云计算;蓝色起源太空公司。",rel:[]},
  {id:"musk",n:"埃隆·马斯克",e:"Elon Musk",c:"internet",r:"other",d:"1971—",b:"特斯拉/SpaceX/X/xAI,横跨电动车、太空、AI,当代最具争议的企业家。",rel:[{i:"bezos",t:"商业太空竞争"}]},
  {id:"zuckerberg",n:"扎克伯格",e:"Mark Zuckerberg",c:"internet",r:"other",d:"1984—",b:"Facebook/Meta,社交媒体时代,元宇宙。",rel:[]},
  {id:"page",n:"拉里·佩奇",e:"Larry Page",c:"internet",r:"other",d:"1973—",b:"谷歌联合创始人,把全世界的信息组织起来。",rel:[]},
  {id:"jackma",n:"马云",e:"Jack Ma",c:"internet",r:"other",d:"1964—",b:"阿里巴巴,中国电商革命。",rel:[]},
  {id:"torvalds",n:"林纳斯·托瓦兹",e:"Linus Torvalds",c:"internet",r:"thinker",d:"1969—",b:"Linux 创建者,开源运动的象征。",rel:[]},
  // AI 时代 (ai)
  {id:"turing",n:"图灵",e:"Alan Turing",c:"ai",r:"thinker",d:"1912—1954",b:"计算与AI的理论奠基,二战破解Enigma,'图灵测试';因迫害自杀。",rel:[{i:"mccarthy",t:"AI先驱"}]},
  {id:"mccarthy",n:"麦卡锡",e:"John McCarthy",c:"ai",r:"thinker",d:"1927—2011",b:"1956年达特茅斯会议首提'人工智能'一词。",rel:[{i:"turing",t:"承计算理论"},{i:"hinton",t:"AI接力"}]},
  {id:"hinton",n:"杰弗里·辛顿",e:"Geoffrey Hinton",c:"ai",r:"thinker",d:"1947—",b:"'AI教父',深度学习先驱,2024诺贝尔物理奖;后离谷歌警示AI风险。",rel:[{i:"hassabis",t:"深度学习"},{i:"lifeili",t:"深度学习"}]},
  {id:"lifeili",n:"李飞飞",e:"Fei-Fei Li",c:"ai",r:"thinker",d:"1976—",b:"创建ImageNet数据集,推动计算机视觉革命。",rel:[{i:"hinton",t:"深度学习"}]},
  {id:"hassabis",n:"哈萨比斯",e:"Demis Hassabis",c:"ai",r:"thinker",d:"1976—",b:"DeepMind创始人,AlphaGo/AlphaFold,2024诺贝尔化学奖。",rel:[{i:"hinton",t:"深度学习"},{i:"altman",t:"AI竞赛"}]},
  {id:"altman",n:"萨姆·奥特曼",e:"Sam Altman",c:"ai",r:"other",d:"1985—",b:"OpenAI CEO,ChatGPT推动者,引爆生成式AI热潮。",rel:[{i:"hassabis",t:"AI竞赛"}]},
  // 气候变化 (climate)
  {id:"arrhenius",n:"阿伦尼乌斯",e:"Svante Arrhenius",c:"climate",r:"thinker",d:"1859—1927",b:"1896年首次量化CO₂与气温关系,温室效应的科学先声。",rel:[{i:"keeling",t:"气候科学传承"}]},
  {id:"keeling",n:"基林",e:"Charles Keeling",c:"climate",r:"thinker",d:"1928—2005",b:"'基林曲线',持续测量大气CO₂,证实其持续上升。",rel:[{i:"arrhenius",t:"气候科学传承"},{i:"hansen",t:"气候警示"}]},
  {id:"hansen",n:"詹姆斯·汉森",e:"James Hansen",c:"climate",r:"thinker",d:"1941—",b:"1988年国会作证,气候变化首次进入公众视野。",rel:[{i:"keeling",t:"承气候数据"},{i:"gore",t:"气候倡导"}]},
  {id:"gore",n:"阿尔·戈尔",e:"Al Gore",c:"climate",r:"ruler",d:"1948—",b:"《难以忽视的真相》,提升公众气候意识,2007诺贝尔和平奖。",rel:[{i:"hansen",t:"气候倡导"},{i:"thunberg",t:"气候运动"}]},
  {id:"thunberg",n:"格蕾塔·通贝里",e:"Greta Thunberg",c:"climate",r:"other",d:"2003—",b:"'周五为未来'罢课,掀起全球青年气候运动。",rel:[{i:"gore",t:"气候运动"}]},
  // 太空探索 (space)
  {id:"goddard",n:"戈达德",e:"Robert Goddard",c:"space",r:"thinker",d:"1882—1945",b:"'现代火箭之父',首枚液体燃料火箭。",rel:[{i:"vonbraun",t:"火箭传承"}]},
  {id:"vonbraun",n:"冯·布劳恩",e:"Wernher von Braun",c:"space",r:"thinker",d:"1912—1977",b:"V-2火箭→阿波罗计划总设计师,把人类送上月球。",rel:[{i:"goddard",t:"承火箭技术"},{i:"korolev",t:"太空竞赛对手"}]},
  {id:"korolev",n:"科罗廖夫",e:"Sergei Korolev",c:"space",r:"thinker",d:"1907—1966",b:"苏联航天之父(身份长期保密),斯普特尼克与加加林背后的人。",rel:[{i:"vonbraun",t:"太空竞赛对手"},{i:"gagarin",t:"送其上太空"}]},
  {id:"gagarin",n:"加加林",e:"Yuri Gagarin",c:"space",r:"other",d:"1934—1968",b:"1961年人类首次太空飞行,'地球是蓝色的'。",rel:[{i:"korolev",t:"其总设计师"},{i:"armstrong",t:"航天先驱"}]},
  {id:"armstrong",n:"阿姆斯特朗",e:"Neil Armstrong",c:"space",r:"other",d:"1930—2012",b:"1969年阿波罗11号首次登月,'个人一小步,人类一大步'。",rel:[{i:"gagarin",t:"航天先驱"}]},
  {id:"tereshkova",n:"捷列什科娃",e:"V. Tereshkova",c:"space",r:"other",d:"1937—",b:"1963年首位进入太空的女性。",rel:[]},
  {id:"yangliwei",n:"杨利伟",e:"Yang Liwei",c:"space",r:"other",d:"1965—",b:"2003年神舟五号,中国首次载人航天。",rel:[]},
];
const CLASSICAL_ICON = {
  eleanor:'🕊️',keynes:'💷',hammarskjold:'🇺🇳',annan:'🇺🇳',gandhi:'🧘',nehru:'🇮🇳',mandela:'✊',nkrumah:'🌍',
  truman:'🛡️',stalin_c:'⭐',khrushchev:'👞',kennedy:'🚀',castro:'🚬',guevara:'⭐',hochiminh:'🌾',brezhnev:'🎖️',nixon:'🤝',mao:'⭐',deng:'🐱',reagan:'🎬',gorbachev:'🕊️',yeltsin:'🇷🇺',
  thatcher:'⚙️',clinton:'🎷',friedman_t:'🌐',binladen:'💥',
  berners_lee:'🕸️',cerf:'🌐',gates:'🪟',jobs:'🍎',bezos:'📦',musk:'🚀',zuckerberg:'👤',page:'🔍',jackma:'🛒',torvalds:'🐧',
  turing:'💻',mccarthy:'🤖',hinton:'🧠',lifeili:'👁️',hassabis:'♟️',altman:'💬',
  arrhenius:'🌡️',keeling:'📈',hansen:'⚠️',gore:'🌍',thunberg:'🪧',
  goddard:'🚀',vonbraun:'🌙',korolev:'🛰️',gagarin:'👨‍🚀',armstrong:'🌕',tereshkova:'👩‍🚀',yangliwei:'🇨🇳',
};
const ROLE_ICON_FALLBACK = {ruler:'🏛️',general:'⚔️',thinker:'🔬',religious:'✝️',other:'🔹'};
function personIconOf(p){ if(!p) return '👤'; const id=typeof p==='string'?p:p.id; if(CLASSICAL_ICON[id])return CLASSICAL_ICON[id]; const role=typeof p==='object'?p.r:null; return ROLE_ICON_FALLBACK[role]||'👤'; }
if(typeof window!=='undefined'){window.CLASSICAL_ICON=CLASSICAL_ICON;window.personIconOf=personIconOf;}
