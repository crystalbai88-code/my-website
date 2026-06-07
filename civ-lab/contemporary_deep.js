// 当代与未来文明(1945-至今) · 深度数据
const CIV_DEEP = {}, EVENT_DEEP = {}, PERSON_DEEP = {};

Object.assign(CIV_DEEP, {
  un:{pronunciation:'联合国与战后秩序',capital_at_peak:'纽约 / 布雷顿森林',territory_max:'193成员国',population_peak:'—',language:'—',writing:'《联合国宪章》《世界人权宣言》',religion:'—',economy:'IMF·世界银行·GATT',
    opening_narrative:`二战的浩劫之后,战胜国试图建立防止世界大战重演的国际体系:1945年成立联合国,布雷顿森林体系(IMF/世界银行)稳定金融,关贸总协定推动自由贸易。\n\n1948年《世界人权宣言》宣告"所有人生而自由平等"。纽伦堡审判确立"反人类罪"。与此同时,去殖民化浪潮席卷亚非——甘地的印度、恩克鲁玛的加纳、曼德拉的南非相继获得自由与平等。`,
    nine_inventions:[{name:'联合国',year:'1945',body:'防止世界大战、保护人权、促进发展的国际组织。'},{name:'《世界人权宣言》',year:'1948',body:'现代人权的全球基准。'},{name:'去殖民化',year:'1945-',body:'亚非拉摆脱殖民,数十个新国家诞生。'}],
    collapse_chain:['仍在演进:全球治理的挑战']},
  coldwar:{pronunciation:'冷战',capital_at_peak:'华盛顿 vs 莫斯科',territory_max:'两极阵营+第三世界',population_peak:'核弹头峰值约7万枚',language:'—',writing:'—',religion:'资本主义 vs 共产主义',economy:'市场 vs 计划',
    opening_narrative:`二战刚结束,美苏两个超级大国便陷入长达约44年的全球对抗——意识形态、核军备、太空、代理人战争的全面较量。"冷"是因为两国从未直接交战,却把世界推到核战争边缘。\n\n从丘吉尔的"铁幕"、柏林封锁、朝鲜与越南战争,到古巴导弹危机(人类离核战最近的13天),再到柏林墙倒塌、1991年苏联解体——冷战塑造了半个世纪的世界格局。`,
    nine_inventions:[{name:'核威慑与"恐怖平衡"',year:'',body:'美苏核竞赛,相互确保摧毁(MAD)。'},{name:'两极世界秩序',year:'',body:'北约vs华约,深刻影响全球政治。'},{name:'冷战终结',year:'1991',body:'柏林墙倒塌与苏联解体,和平结束对抗。'}],
    collapse_chain:['1989 柏林墙倒','1991 苏联解体','→ 全球化加速']},
  globalization:{pronunciation:'全球化',capital_at_peak:'全球',territory_max:'资本商品信息无国界',population_peak:'约2.8亿国际移民',language:'—',writing:'WTO规则',religion:'—',economy:'跨国公司·全球供应链',
    opening_narrative:`冷战终结、信息技术革命与新自由主义政策共同推动了现代全球化:资本、商品、信息和人员加速跨国流动。邓小平改革开放让十几亿人融入世界经济,撒切尔与里根掀起私有化浪潮,1995年WTO成立、2001年中国入世,世界成为一个"地球村"。\n\n但全球化也有阴影:1997亚洲金融危机、2008全球金融危机、9/11恐怖袭击、反全球化民粹兴起、新冠暴露供应链脆弱——"逆全球化"的讨论随之而来。`,
    nine_inventions:[{name:'全球供应链',year:'',body:'跨国生产分工,"世界工厂"与"地球村"。'},{name:'WTO自由贸易体系',year:'1995',body:'全球贸易规则制度化。'},{name:'(挑战)金融危机与民粹',year:'2008',body:'全球化的不平等与脆弱性显现。'}],
    collapse_chain:['2008金融危机','民粹与逆全球化','疫情冲击供应链']},
  internet:{pronunciation:'互联网与信息革命',capital_at_peak:'硅谷 / 全球',territory_max:'连接全球数十亿人',population_peak:'—',language:'TCP/IP·HTML',writing:'代码',religion:'—',economy:'数字经济·平台',
    opening_narrative:`互联网起源于冷战:ARPANET 是为抵抗核打击设计的分布式网络。1969年首次连接,1989年伯纳斯-李在CERN发明万维网(并免费开放给全人类)。\n\n此后浏览器、谷歌、社交媒体、智能手机接连登场,把全人类连进同一张网。乔布斯的iPhone开启移动互联网,信息无国界流动——它既带来知识普及与连接,也带来假新闻、数据操纵与隐私之忧。`,
    nine_inventions:[{name:'万维网(WWW)',year:'1989',body:'伯纳斯-李发明,免费开放,信息时代的基础。'},{name:'智能手机/移动互联网',year:'2007',body:'iPhone把网络装进每个人口袋。'},{name:'社交媒体与平台经济',year:'',body:'重塑信息、商业与社会连接方式。'}],
    collapse_chain:['→ 大数据+算力催生AI']},
  ai:{pronunciation:'AI 时代',capital_at_peak:'全球',territory_max:'渗透各行各业',population_peak:'ChatGPT两月破亿用户',language:'—',writing:'神经网络·Transformer',religion:'—',economy:'算力·数据·模型',
    opening_narrative:`从图灵1936年的计算理论、1956年达特茅斯会议提出"人工智能",到深度学习的突破:1997深蓝胜国际象棋、2016 AlphaGo胜围棋、2017 Transformer架构、2022 ChatGPT两月破亿用户——AI迎来爆发。\n\n辛顿、李飞飞、哈萨比斯等推动技术,奥特曼等引爆产业。AI能写作、绘图、做科学发现(AlphaFold解蛋白质折叠),也带来就业、深伪、对齐与治理的全新挑战。`,
    nine_inventions:[{name:'深度学习',year:'2006-2012',body:'辛顿等人的突破,现代AI的引擎。'},{name:'AlphaGo与生成式AI',year:'2016-2022',body:'AlphaGo胜围棋、ChatGPT引爆大模型时代。'},{name:'AI for Science',year:'',body:'AlphaFold解蛋白质折叠等科学发现。'}],
    collapse_chain:['仍在快速演进:能力与风险并存']},
  climate:{pronunciation:'气候变化',capital_at_peak:'全球',territory_max:'全人类共同挑战',population_peak:'CO₂超420ppm',language:'—',writing:'IPCC报告',religion:'—',economy:'能源转型',
    opening_narrative:`早在1896年阿伦尼乌斯就量化了CO₂与气温的关系;1958年基林开始持续测量,"基林曲线"证实CO₂持续上升;1988年汉森国会作证让气候变化进入公众视野。\n\n《京都议定书》(1997)、《巴黎协定》(2015)是全球应对的尝试;戈尔的纪录片、通贝里的青年运动唤起意识。工业化前CO₂约280ppm,今已超420ppm,全球较工业化前升温约1.2°C——这是全人类共同的未来考题。`,
    nine_inventions:[{name:'气候科学(基林曲线)',year:'1958',body:'持续监测证实CO₂与变暖。'},{name:'《巴黎协定》',year:'2015',body:'195国同意控温在2°C以内(力争1.5°C)。'},{name:'全球青年气候运动',year:'2018',body:'通贝里"周五为未来",公众觉醒。'}],
    collapse_chain:['仍在进行:能否及时转型?']},
  space:{pronunciation:'太空探索',capital_at_peak:'全球',territory_max:'地球轨道→月球→火星',population_peak:'—',language:'—',writing:'—',religion:'—',economy:'国家航天+商业航天',
    opening_narrative:`太空时代由冷战军备竞赛点燃:1957年苏联斯普特尼克卫星震惊世界,1961年加加林首次飞天,1969年阿波罗11号阿姆斯特朗登月——"个人的一小步,人类的一大步"。\n\n此后哈勃望远镜、国际空间站、火星车不断拓展边界。今天马斯克的SpaceX可回收火箭大幅降低成本,中国天宫空间站、阿尔忒弥斯重返月球计划,把人类的目光投向更深远的宇宙乃至火星。`,
    nine_inventions:[{name:'人造卫星与登月',year:'1957-1969',body:'斯普特尼克→加加林→阿波罗登月。'},{name:'空间站与望远镜',year:'',body:'国际空间站、哈勃/韦伯望远镜拓展认知。'},{name:'商业航天(可回收火箭)',year:'2015-',body:'SpaceX大幅降低发射成本,太空走向商业化。'}],
    collapse_chain:['→ 重返月球与火星']},
});

Object.assign(EVENT_DEEP, {
  evt_un_founding:{full_title:'联合国成立',one_liner:'1945年50国签署《联合国宪章》,建立战后国际秩序。',narrative:`吸取两次世界大战的惨痛教训,1945年6月50国在旧金山签署《联合国宪章》:"欲免后世再遭今代人类两度身历惨不堪言之战祸"。10月联合国正式成立,总部设纽约。\n\n安理会五常任理事国拥否决权;布雷顿森林体系(IMF/世界银行)与关贸总协定共同构成战后政治、金融、贸易三大支柱。`,context_before:'二战结束,世界亟需防止战争重演。',what_happened:['1944 布雷顿森林会议','1945.6 签署联合国宪章','1945.10 联合国成立','安理会五常+否决权'],significance:'现代国际秩序的核心框架。',evidence:[{artifact:'《联合国宪章》',what:'1945年旧金山。',held:'联合国'}],leads_to:'人权宣言;去殖民化',source:'战后秩序史',related_people:['eleanor','keynes','hammarskjold']},
  evt_human_rights:{full_title:'《世界人权宣言》',one_liner:'1948年通过,"所有人生而自由平等",现代人权的全球基准。',narrative:`1948年12月10日,联合国通过《世界人权宣言》,主要起草者是富兰克林·罗斯福的遗孀埃莉诺·罗斯福。它宣告:"所有人生而自由,在尊严和权利上一律平等"。\n\n虽无强制力,却成为此后无数宪法、公约与人权运动的道德与法律基石。`,context_before:'二战暴行(大屠杀)震惊世界。',what_happened:['纽伦堡审判确立反人类罪','1948.12.10 通过人权宣言','埃莉诺·罗斯福主持起草','成为全球人权基准'],significance:'人类共同的人权基准。',evidence:[{artifact:'《世界人权宣言》',what:'1948年。',held:'联合国'}],leads_to:'各国人权立法;民权运动',source:'人权史',related_people:['eleanor','annan']},
  evt_decolonization:{full_title:'去殖民化浪潮',one_liner:'1947-1960s亚非数十国独立,殖民帝国终结。',narrative:`二战削弱了欧洲殖民帝国。1947年印巴分治、甘地与尼赫鲁领导印度独立;1957年恩克鲁玛的加纳独立;1960年"非洲年"17国独立。\n\n殖民地纷纷获得自由,数十个新国家加入联合国,第三世界与不结盟运动登上舞台——世界政治版图被彻底改写。`,context_before:'二战削弱宗主国,民族主义高涨。',what_happened:['1947 印巴分治独立','1957 加纳独立','1960 非洲年17国独立','第三世界兴起'],significance:'殖民时代终结;全球南方崛起。',evidence:[{artifact:'印度独立纪念',what:'1947年。',held:'印度'}],leads_to:'不结盟运动;南北关系',source:'去殖民化史',related_people:['gandhi','nehru','nkrumah']},
  evt_mandela_free:{full_title:'曼德拉与种族隔离的终结',one_liner:'1994年曼德拉当选南非首位黑人总统,种族隔离落幕。',narrative:`南非的种族隔离制度(Apartheid)将黑人多数置于白人少数统治之下。曼德拉为反抗被囚27年,却以宽恕与和解著称。\n\n1994年南非首次全民选举,曼德拉当选首位黑人总统,种族隔离正式终结——成为20世纪和解与人权的伟大象征。`,context_before:'南非长期种族隔离。',what_happened:['曼德拉被囚27年','反种族隔离斗争','1994 全民选举','曼德拉当选总统'],significance:'种族平等与和解的丰碑。',evidence:[{artifact:'罗本岛监狱',what:'曼德拉囚禁地,世界遗产。',held:'南非'}],leads_to:'南非民主转型',source:'人权史',related_people:['mandela','gandhi']},
  evt_iron_curtain:{full_title:'铁幕演说与冷战开始',one_liner:'1946丘吉尔"铁幕"演说,1947杜鲁门主义,冷战开端。',narrative:`1946年丘吉尔在美国富尔顿发表"铁幕"演说:"从波罗的海到亚得里亚海,一道铁幕已降临欧洲大陆"。1947年杜鲁门主义宣布美国将遏制共产主义扩张,马歇尔计划以130亿美元重建西欧。\n\n美苏冷战的遏制格局就此确立,世界分裂为两大阵营。`,context_before:'二战后美苏矛盾凸显。',what_happened:['1946 丘吉尔铁幕演说','1947 杜鲁门主义','1947 马歇尔计划','遏制政策确立'],significance:'冷战正式开始;两极格局形成。',evidence:[{artifact:'富尔顿演说记录',what:'1946年。',held:'档案'}],leads_to:'北约/华约;柏林危机',source:'冷战史',related_people:['truman','stalin_c']},
  evt_berlin_airlift:{full_title:'柏林封锁与空运',one_liner:'1948-49苏联封锁西柏林,美英以史上最大空运破局。',narrative:`1948年苏联封锁西柏林的陆路,企图迫使西方撤离。美英发动史上最大规模空运,近28万架次飞行,把粮食燃料运进西柏林。\n\n苏联最终撤回封锁。这是冷战第一次重大对抗,随后1949年北约成立、苏联引爆首颗原子弹、新中国成立——冷战全面铺开。`,context_before:'德国分裂,美苏争夺柏林。',what_happened:['1948 苏联封锁西柏林','美英大空运','1949 苏联撤封锁','北约成立·苏联核试'],significance:'冷战首次重大对抗;阵营对立固化。',evidence:[{artifact:'柏林空运纪念',what:'1948-49。',held:'德国柏林'}],leads_to:'北约vs华约;核竞赛',source:'冷战史',related_people:['truman','stalin_c']},
  evt_korea_war:{full_title:'朝鲜战争',one_liner:'1950-53冷战首场热战,约250万人死,半岛分裂至今。',narrative:`1950年朝鲜战争爆发,朝鲜(苏中支持)与韩国(美国/联合国军支持)激战。麦克阿瑟因主张对中国动用核武被杜鲁门解职。\n\n战争以停战告终,半岛沿三八线分裂至今,约250万人死亡——这是冷战第一场大规模"热战",代理人战争的典型。`,context_before:'冷战阵营在亚洲对峙。',what_happened:['1950 战争爆发','联合国军参战','中国志愿军参战','1953 停战,半岛分裂'],significance:'冷战首场热战;代理人战争模式。',evidence:[{artifact:'板门店',what:'停战谈判地。',held:'朝韩边界'}],leads_to:'冷战亚洲战线',source:'冷战史',related_people:['truman','mao']},
  evt_cuban_missile:{full_title:'古巴导弹危机',one_liner:'1962年人类离核战最近的13天,最终化解。',narrative:`1962年苏联在古巴部署核导弹,肯尼迪下令海上封锁。人类经历了离全面核战争最近的13天。\n\n经紧张博弈,赫鲁晓夫最终撤回导弹,美国承诺不入侵古巴并撤土耳其导弹。危机促成了美苏热线与军控对话——核威慑下的克制成为冷战的"恐怖平衡"。`,context_before:'古巴革命后倒向苏联。',what_happened:['1962 苏联部署古巴导弹','肯尼迪海上封锁','13天核对峙','赫鲁晓夫撤回导弹'],significance:'冷战最危险时刻;催生军控对话。',evidence:[{artifact:'U-2侦察照片',what:'古巴导弹基地。',held:'美国档案'}],leads_to:'美苏热线;军控谈判;缓和',source:'冷战史',related_people:['kennedy','khrushchev','castro']},
  evt_vietnam_war:{full_title:'越南战争',one_liner:'1955-75越战,美国深陷,约300万越南人+5.8万美军死。',narrative:`越南战争中美军直接参战(1965-73),却陷入丛林游击的泥潭。胡志明领导的北越坚持抗战,反战运动席卷美国本土。\n\n1975年西贡陷落,越南统一。这场战争重创了美国的国力与信心,也是冷战代理人战争的惨痛一页。`,context_before:'越南独立与冷战阵营对抗。',what_happened:['1965 美军大规模参战','丛林游击战','美国反战运动','1975 西贡陷落、越南统一'],significance:'美国冷战的重大挫败;反战与社会变革。',evidence:[{artifact:'越战纪念墙',what:'华盛顿。',held:'美国'}],leads_to:'美国战略收缩;缓和',source:'冷战史',related_people:['hochiminh','nixon']},
  evt_berlin_wall:{full_title:'柏林墙倒塌',one_liner:'1989.11.9柏林墙倒,冷战结束的标志性时刻。',narrative:`1961年东德修筑柏林墙阻止公民逃往西柏林,它成为冷战最具象征意义的建筑。1989年,在戈尔巴乔夫改革与东欧剧变的浪潮中,11月9日东德开放边境,数十万人涌入西柏林,人们爬上、凿开柏林墙。\n\n这一夜成为冷战结束、欧洲重新统一的象征。次年东西德统一。`,context_before:'戈尔巴乔夫改革,东欧剧变。',what_happened:['1961 修筑柏林墙','1989 东欧剧变','1989.11.9 柏林墙倒塌','1990 两德统一'],significance:'冷战结束的标志;欧洲重新统一。',evidence:[{artifact:'柏林墙残段',what:'东边画廊。',held:'德国柏林'}],leads_to:'苏联解体;全球化',source:'冷战史',related_people:['gorbachev','reagan']},
  evt_soviet_collapse:{full_title:'苏联解体',one_liner:'1991.12.25苏联解体,冷战正式结束。',narrative:`戈尔巴乔夫的"改革"与"开放"无意中松动了苏联体制。1991年,各加盟共和国纷纷独立,12月25日戈尔巴乔夫辞职,苏联国旗从克里姆林宫降下,叶利钦领导的俄罗斯联邦接续。\n\n持续44年的冷战正式结束,美国成为唯一超级大国,世界进入全球化加速的时代。`,context_before:'改革失控,经济困境,民族独立。',what_happened:['1989 东欧剧变','1991 各共和国独立','1991.12.25 戈尔巴乔夫辞职','苏联解体'],significance:'冷战终结;单极世界与全球化时代。',evidence:[{artifact:'克里姆林宫降旗',what:'1991.12.25。',held:'历史影像'}],leads_to:'全球化;俄罗斯转型',source:'冷战史',related_people:['gorbachev','yeltsin','reagan']},
  evt_reform_opening:{full_title:'中国改革开放',one_liner:'1978年邓小平改革开放,十几亿人融入世界经济。',narrative:`1978年,邓小平推动改革开放:农村联产承包、设经济特区、引进外资、市场化改革。"不管黑猫白猫,抓住老鼠就是好猫"。\n\n中国从计划经济转向市场,成为"世界工厂",数亿人脱贫,成为全球化最重要的推动力之一,深刻重塑了世界经济格局。`,context_before:'文革后中国寻求发展道路。',what_happened:['1978 改革开放','设经济特区','市场化改革','成为世界工厂'],significance:'重塑全球经济;全球化关键推力。',evidence:[{artifact:'深圳经济特区',what:'改革开放窗口。',held:'中国深圳'}],leads_to:'中国入世;全球供应链',source:'全球化史',related_people:['deng']},
  evt_wto_china:{full_title:'中国加入WTO',one_liner:'2001年中国入世,成为"世界工厂",全球制造业格局剧变。',narrative:`1995年WTO成立,使全球贸易规则制度化。2001年中国加入WTO,凭借庞大的劳动力与制造能力迅速成为"世界工厂"。\n\n全球供应链深度重组:商品更便宜、贸易更繁荣,但也带来发达国家产业转移与贸易摩擦——全球化的红利与张力并存。`,context_before:'冷战后自由贸易扩张。',what_happened:['1995 WTO成立','2001 中国入世','成为世界工厂','全球供应链重组'],significance:'全球制造业格局根本改变。',evidence:[{artifact:'WTO总部',what:'日内瓦。',held:'瑞士'}],leads_to:'全球供应链;贸易摩擦',source:'全球化史',related_people:['clinton','deng']},
  evt_911:{full_title:'9·11恐怖袭击',one_liner:'2001年9月11日,改变21世纪走向的恐怖袭击。',narrative:`2001年9月11日,基地组织劫持客机撞击纽约世贸中心双塔与五角大楼,近3000人遇难。这是全球化时代非对称威胁的标志性事件。\n\n美国随后发动反恐战争(阿富汗、伊拉克),深刻影响了21世纪的国际政治、安全格局与全球化进程。`,context_before:'全球化时代的极端主义。',what_happened:['2001.9.11 袭击双塔','近3000人遇难','美国发动反恐战争','重塑21世纪安全格局'],significance:'21世纪的转折点;反恐时代开始。',evidence:[{artifact:'9·11纪念馆',what:'纽约世贸遗址。',held:'美国'}],leads_to:'反恐战争;安全与自由之辩',source:'当代史',related_people:['binladen']},
  evt_2008_crisis:{full_title:'2008全球金融危机',one_liner:'雷曼破产引爆全球衰退,对全球化的最大冲击。',narrative:`2008年,美国次贷危机引爆全球金融危机,雷曼兄弟破产,全球经济陷入大衰退。各国大规模救市。\n\n危机暴露了金融全球化的风险与新自由主义的弊端,加剧了贫富分化与对全球化的反思,反全球化与民粹主义随之兴起。`,context_before:'金融自由化与房地产泡沫。',what_happened:['2007 次贷危机','2008 雷曼破产','全球大衰退','各国救市'],significance:'全球化的最大冲击;民粹兴起的催化。',evidence:[{artifact:'雷曼兄弟',what:'破产标志。',held:'历史影像'}],leads_to:'民粹主义;逆全球化讨论',source:'当代经济史',related_people:['clinton']},
  evt_arpanet:{full_title:'ARPANET 与互联网诞生',one_liner:'1969年首次联网,冷战催生的互联网起点。',narrative:`互联网起源于冷战:美国国防部为抵抗核打击设计分布式通讯网络ARPANET。1969年10月,UCLA与斯坦福首次连接(第一个词"LOGIN"只发出"LO"就崩溃了)。\n\n1973年瑟夫等人提出TCP/IP协议,1983年ARPANET切换到TCP/IP——现代互联网的技术基础就此奠定。`,context_before:'冷战军备竞赛+计算机发展。',what_happened:['1969 ARPANET首次连接','1971 第一封电子邮件','1973 TCP/IP概念','1983 现代互联网基础'],significance:'互联网的起点;信息革命的根基。',evidence:[{artifact:'ARPANET节点图',what:'早期网络。',held:'档案'}],leads_to:'万维网;数字时代',source:'信息史',related_people:['cerf']},
  evt_www:{full_title:'万维网的发明',one_liner:'1989年伯纳斯-李发明WWW,且免费开放给全人类。',narrative:`1989年,蒂姆·伯纳斯-李在欧洲核子研究中心(CERN)发明万维网(WWW),创造了HTML、HTTP、URL。1991年第一个网站上线。\n\n关键的是:他没有为此申请专利,而是免费开放给全人类。万维网把互联网从专业网络变成人人可用的信息空间,引爆了信息时代。`,context_before:'互联网技术成熟,需易用的信息系统。',what_happened:['1989 发明WWW','1991 第一个网站','免费开放、不申专利','1993 图形浏览器普及'],significance:'信息时代的真正开端;知识民主化。',evidence:[{artifact:'第一个网站(info.cern.ch)',what:'1991年。',held:'CERN'}],leads_to:'搜索引擎;社交媒体;电商',source:'信息史',related_people:['berners_lee','cerf']},
  evt_iphone:{full_title:'iPhone与移动互联网',one_liner:'2007年iPhone发布,把互联网装进每个人的口袋。',narrative:`2007年乔布斯发布iPhone,把电话、相机、互联网与触摸屏融为一体,开启智能手机革命。移动互联网让数十亿人随时在线。\n\n它催生了移动支付、社交媒体、共享经济、短视频等全新形态,深刻改变了人类的工作、社交与生活方式。`,context_before:'万维网普及,手机功能化。',what_happened:['2007 iPhone发布','智能手机革命','移动互联网普及','重塑生活方式'],significance:'移动互联网时代的开启。',evidence:[{artifact:'初代iPhone',what:'2007年。',held:'多家博物馆'}],leads_to:'平台经济;社交媒体;AI入口',source:'信息史',related_people:['jobs','musk','zuckerberg']},
  evt_socialmedia:{full_title:'社交媒体的崛起',one_liner:'Facebook等社交平台连接数十亿人,也带来假新闻之忧。',narrative:`2004年Facebook成立,随后社交媒体席卷全球,把数十亿人连进同一张社交网络。它在阿拉伯之春等事件中显示了动员力量。\n\n但它也有阴暗面:假新闻、数据操纵(剑桥分析丑闻)、信息茧房与隐私问题——技术如何向善成为时代之问。`,context_before:'移动互联网普及。',what_happened:['2004 Facebook成立','2010s 社交媒体爆发','阿拉伯之春的力量','假新闻与数据操纵'],significance:'重塑信息传播与社会连接,也带来新风险。',evidence:[{artifact:'剑桥分析丑闻',what:'数据操纵案例。',held:'历史事件'}],leads_to:'信息治理;AI内容时代',source:'信息史',related_people:['zuckerberg','page']},
  evt_dartmouth:{full_title:'达特茅斯会议 · AI诞生',one_liner:'1956年首次提出"人工智能",AI学科由此起步。',narrative:`1936年图灵提出可计算性理论,二战中破解Enigma密码、并提出"图灵测试"。1956年,麦卡锡在达特茅斯会议上首次提出"人工智能(AI)"一词,AI作为一门学科正式诞生。\n\n此后AI经历起落("AI冬天"),直到深度学习带来转机。`,context_before:'计算机诞生,模拟智能成为目标。',what_happened:['1936 图灵机理论','二战破解Enigma','1956 达特茅斯会议提"AI"','AI学科诞生'],significance:'人工智能学科的起点。',evidence:[{artifact:'图灵测试',what:'判断机器是否有智能。',held:'思想史'}],leads_to:'深度学习;大模型',source:'AI史',related_people:['turing','mccarthy']},
  evt_deepblue:{full_title:'深蓝击败卡斯帕罗夫',one_liner:'1997年IBM深蓝击败国际象棋世界冠军,机器首胜人类智力。',narrative:`1997年,IBM的"深蓝"击败国际象棋世界冠军卡斯帕罗夫——机器首次在智力竞赛中战胜人类顶尖高手。\n\n这一里程碑展示了计算力的潜能,也引发了关于机器智能边界的广泛讨论,为后来的AI复兴埋下伏笔。`,context_before:'计算力提升,博弈AI发展。',what_happened:['1997 深蓝对战卡斯帕罗夫','机器获胜','机器首胜人类智力竞赛','引发AI讨论'],significance:'机器智能的标志性时刻。',evidence:[{artifact:'深蓝计算机',what:'IBM超级计算机。',held:'美国'}],leads_to:'AlphaGo;深度学习复兴',source:'AI史',related_people:['hinton']},
  evt_alphago:{full_title:'AlphaGo 击败李世石',one_liner:'2016年AlphaGo胜围棋冠军,深度学习的里程碑。',narrative:`围棋因变化浩瀚被认为是AI最难攻克的棋类。2016年,DeepMind的AlphaGo以4:1击败世界冠军李世石,震惊世界。\n\n它结合深度学习与强化学习,展示了AI的惊人潜能。哈萨比斯团队随后用AlphaFold解决了蛋白质折叠这一生物学难题,获2024诺贝尔化学奖。`,context_before:'深度学习突破。',what_happened:['2016 AlphaGo胜李世石','深度+强化学习','AlphaFold解蛋白质折叠','2024 诺贝尔化学奖'],significance:'深度学习里程碑;AI for Science。',evidence:[{artifact:'AlphaGo对局',what:'2016年。',held:'历史影像'}],leads_to:'生成式AI;科学发现',source:'AI史',related_people:['hassabis','hinton']},
  evt_chatgpt:{full_title:'ChatGPT与生成式AI爆发',one_liner:'2022年ChatGPT两月破亿用户,引爆全球AI热潮。',narrative:`2017年谷歌提出Transformer架构,成为现代大语言模型的基础。2022年11月,OpenAI发布ChatGPT,两个月内用户破亿——史上增长最快的消费应用。\n\n生成式AI能对话、写作、编程、绘图,引发全球AI军备竞赛(GPT/Gemini/Claude等)与关于就业、教育、治理、AI对齐的深刻讨论。人类站在新技术革命的门口。`,context_before:'深度学习+Transformer+海量数据。',what_happened:['2017 Transformer架构','2020 GPT-3','2022.11 ChatGPT破亿用户','全球AI竞赛'],significance:'生成式AI时代开启;新技术革命。',evidence:[{artifact:'ChatGPT',what:'2022年发布。',held:'OpenAI'}],leads_to:'AI治理;通用人工智能之路',source:'AI史',related_people:['altman','hinton','hassabis']},
  evt_keeling_curve:{full_title:'基林曲线 · 气候科学的警钟',one_liner:'1958年起持续测量CO₂,证实其逐年攀升。',narrative:`1896年阿伦尼乌斯已量化CO₂与气温的关系。1958年,基林在夏威夷开始持续测量大气CO₂浓度,绘出逐年上升的"基林曲线"——气候变化最有力的证据。\n\n1988年汉森在美国国会作证,气候变化首次进入公众视野;同年IPCC成立,人类开始正视这场缓慢而深远的危机。`,context_before:'工业化以来碳排放剧增。',what_happened:['1896 阿伦尼乌斯量化温室效应','1958 基林曲线开始','1988 汉森国会作证','1988 IPCC成立'],significance:'气候变化的科学确证与公众觉醒。',evidence:[{artifact:'基林曲线',what:'夏威夷莫纳罗亚观测。',held:'科学数据'}],leads_to:'京都议定书;巴黎协定',source:'气候史',related_people:['arrhenius','keeling','hansen']},
  evt_paris_climate:{full_title:'《巴黎协定》',one_liner:'2015年195国同意控温在2°C以内,全人类的共同承诺。',narrative:`继《京都议定书》(1997)之后,2015年《巴黎协定》达成:195国同意将全球升温控制在工业化前2°C以内(力争1.5°C)。\n\n戈尔的纪录片提升了意识,通贝里的青年运动施加了压力。但工业化前CO₂约280ppm今已超420ppm、升温已约1.2°C——能否及时转型,关乎人类共同的未来。`,context_before:'升温加剧,全球需协同减排。',what_happened:['1997 京都议定书','2015 巴黎协定(195国)','2018 通贝里青年运动','CO₂超420ppm'],significance:'全人类应对气候变化的共同框架。',evidence:[{artifact:'巴黎协定',what:'2015年。',held:'联合国'}],leads_to:'能源转型;碳中和',source:'气候史',related_people:['gore','thunberg','hansen']},
  evt_sputnik:{full_title:'斯普特尼克与太空时代',one_liner:'1957年苏联首颗人造卫星上天,太空竞赛开始。',narrative:`1957年10月4日,苏联发射人类首颗人造卫星斯普特尼克1号,科罗廖夫(身份长期保密)是幕后总设计师。美国为之震惊("斯普特尼克时刻"),次年成立NASA。\n\n冷战的军备竞赛延伸到太空,人类的太空时代由此开启。`,context_before:'冷战军备竞赛+火箭技术(戈达德/冯·布劳恩)。',what_happened:['1957 斯普特尼克1号','美国震惊','1958 NASA成立','太空竞赛开始'],significance:'太空时代的开端。',evidence:[{artifact:'斯普特尼克1号',what:'人类首颗卫星。',held:'俄罗斯'}],leads_to:'加加林;登月',source:'太空史',related_people:['korolev','vonbraun','goddard']},
  evt_gagarin:{full_title:'加加林首次太空飞行',one_liner:'1961年加加林成为首位进入太空的人,"地球是蓝色的"。',narrative:`1961年4月12日,苏联宇航员加加林乘东方一号绕地球飞行108分钟,成为人类首位进入太空的人。"地球是蓝色的……多么美丽啊。"\n\n这再次震动美国,肯尼迪随即宣布登月目标:"我们选择去月球,不是因为它容易,而是因为它困难。"`,context_before:'斯普特尼克后美苏太空竞赛白热化。',what_happened:['1961.4.12 加加林飞天','绕地球108分钟','肯尼迪宣布登月目标','1963 首位女性太空飞行'],significance:'人类首次进入太空;激励登月。',evidence:[{artifact:'东方一号',what:'加加林飞船。',held:'俄罗斯'}],leads_to:'阿波罗登月',source:'太空史',related_people:['gagarin','korolev','tereshkova']},
  evt_moon_landing:{full_title:'阿波罗11号登月',one_liner:'1969年阿姆斯特朗登月,"人类的一大步"。',narrative:`1969年7月20日,阿波罗11号的阿姆斯特朗踏上月球:"这是个人的一小步,人类的一大步"。奥尔德林同行,柯林斯留守指挥舱。\n\n冯·布劳恩设计的土星五号火箭把人类送上了另一个天体。这是冷战太空竞赛的巅峰,也是人类探索精神的丰碑。`,context_before:'肯尼迪登月承诺+举国动员。',what_happened:['1961 肯尼迪登月宣言','阿波罗计划','1969.7.20 首次登月','阿姆斯特朗的一大步'],significance:'人类首次登上另一天体;探索精神的象征。',evidence:[{artifact:'阿波罗11号登月舱',what:'1969年。',held:'美国'}],leads_to:'空间站;火星探索',source:'太空史',related_people:['armstrong','vonbraun']},
  evt_spacex:{full_title:'商业航天与可回收火箭',one_liner:'2015年起SpaceX可回收火箭大幅降低成本,太空走向商业化。',narrative:`长期以来太空发射昂贵且一次性。2015年起,马斯克的SpaceX实现一级火箭回收着陆,大幅降低发射成本,把航天带入商业时代。\n\n商业载人飞船、星链卫星、星舰计划,加上中国天宫空间站、阿尔忒弥斯重返月球——人类正把目光投向月球基地乃至火星。`,context_before:'航天成本高、依赖国家。',what_happened:['2015 一级火箭回收','商业载人航天','星链/星舰','重返月球与火星计划'],significance:'太空商业化;新太空时代。',evidence:[{artifact:'猎鹰9号回收',what:'SpaceX。',held:'历史影像'}],leads_to:'月球基地;火星探索',source:'太空史',related_people:['musk','yangliwei']},
});

const CIV_MAP = {};
const CIV_MYTHS = {};
const SITE_MODERN = {};
function siteModern(name){ return SITE_MODERN[name] || ''; }
const ROLE_CN = {ruler:'领导者',general:'将领',thinker:'思想家/科学家',religious:'宗教人物',other:'其他人物'};
(typeof CLASSICAL_PEOPLE!=='undefined'?CLASSICAL_PEOPLE:[]).forEach(p=>{
  PERSON_DEEP[p.id]={
    full_name:p.n+' · '+p.e, pronunciation:p.e, lifespan_real:p.d,
    historical_or_mythic:'**'+(ROLE_CN[p.r]||'人物')+'**', biography:p.b,
    achievements_detail:[], legacy:'', sources:[],
    related:(p.rel||[]).map(r=>({id:r.i,relation:r.t,note:''})), _civ:p.c,_role:p.r
  };
});

const CIV_PEOPLE_NAMES = {
  un:['埃莉诺·罗斯福','凯恩斯','哈马舍尔德','科菲·安南','甘地','尼赫鲁','曼德拉','恩克鲁玛'],
  coldwar:['杜鲁门','斯大林','赫鲁晓夫','肯尼迪','卡斯特罗','切·格瓦拉','胡志明','勃列日涅夫','尼克松','毛泽东','邓小平','里根','戈尔巴乔夫','叶利钦'],
  globalization:['邓小平','撒切尔','克林顿','托马斯·弗里德曼','本·拉登'],
  internet:['蒂姆·伯纳斯-李','文顿·瑟夫','比尔·盖茨','史蒂夫·乔布斯','杰夫·贝索斯','埃隆·马斯克','扎克伯格','拉里·佩奇','马云','林纳斯·托瓦兹'],
  ai:['图灵','麦卡锡','杰弗里·辛顿','李飞飞','哈萨比斯','萨姆·奥特曼'],
  climate:['阿伦尼乌斯','基林','詹姆斯·汉森','阿尔·戈尔','格蕾塔·通贝里'],
  space:['戈达德','冯·布劳恩','科罗廖夫','加加林','阿姆斯特朗','捷列什科娃','杨利伟'],
};
const CIV_EVENTS = {
  un:['evt_un_founding','evt_human_rights','evt_decolonization','evt_mandela_free'],
  coldwar:['evt_iron_curtain','evt_berlin_airlift','evt_korea_war','evt_cuban_missile','evt_vietnam_war','evt_berlin_wall','evt_soviet_collapse'],
  globalization:['evt_reform_opening','evt_wto_china','evt_911','evt_2008_crisis'],
  internet:['evt_arpanet','evt_www','evt_iphone','evt_socialmedia'],
  ai:['evt_dartmouth','evt_deepblue','evt_alphago','evt_chatgpt'],
  climate:['evt_keeling_curve','evt_paris_climate'],
  space:['evt_sputnik','evt_gagarin','evt_moon_landing','evt_spacex'],
};

const NAME2ID = {};
(typeof CLASSICAL_PEOPLE!=='undefined'?CLASSICAL_PEOPLE:[]).forEach(p=>{NAME2ID[p.n]=p.id;});
function namesToIds(names){return (names||[]).map(n=>NAME2ID[n]).filter(Boolean);}

const CIV_META = [
  {id:'un',name:'联合国与战后秩序',color:'#3a78b0',icon:'🕊️',start:1945,end:2025,lane:1},
  {id:'coldwar',name:'冷战',color:'#7a3a3a',icon:'❄️',start:1947,end:1991,lane:2},
  {id:'globalization',name:'全球化',color:'#2a8a6a',icon:'🌐',start:1980,end:2025,lane:3},
  {id:'internet',name:'互联网革命',color:'#3a5ac8',icon:'🕸️',start:1969,end:2025,lane:4},
  {id:'ai',name:'AI 时代',color:'#8a4ac0',icon:'🤖',start:1956,end:2025,lane:5},
  {id:'climate',name:'气候变化',color:'#2a9a4a',icon:'🌡️',start:1958,end:2025,lane:6},
  {id:'space',name:'太空探索',color:'#1a2a6a',icon:'🚀',start:1957,end:2025,lane:7},
];
function _yr(y){return y<0?'前 '+(-y):(y===0?'公元元年':'公元 '+y);}
CIV_META.forEach(c=>{ if(CIV_DEEP[c.id]) CIV_DEEP[c.id].time_range = _yr(c.start)+' – 至今'; });

const EARLY_CIV_EXPLORER = { civilizations: CIV_META.map(c=>({...c})), comparison_dimensions: [] };

const CHAPTERS = [{
  id:'contemporary', no:'06', range:'1945 – 至今', title:'当代与未来文明',
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
    {what:'联合国与人权',from:'战后秩序(1945)',why:'维护和平、人权与国际合作的全球框架'},
    {what:'去殖民化与平等',from:'战后(1947-)',why:'数十个新国家、民族平等与全球南方崛起'},
    {what:'核威慑下的和平',from:'冷战(1947-91)',why:'两极对抗的教训与军控,塑造当代地缘政治'},
    {what:'全球化经济',from:'1980年代起',why:'全球供应链与"地球村",也带来不平等与张力'},
    {what:'互联网与万维网',from:'1969/1989',why:'信息无国界,连接全人类的数字文明'},
    {what:'人工智能',from:'2010s-',why:'新一轮技术革命,机遇与风险并存'},
    {what:'气候行动',from:'巴黎协定(2015)',why:'全人类共同应对的未来考题'},
    {what:'太空探索',from:'1957-',why:'从登月到火星,人类把家园拓向星辰'},
  ],
};

if (typeof module !== 'undefined') module.exports = { CIV_DEEP, EVENT_DEEP, PERSON_DEEP, CIV_MAP, CIV_MYTHS, SITE_MODERN, CHAPTERS, FINAL_OVERVIEW, EARLY_CIV_EXPLORER };
