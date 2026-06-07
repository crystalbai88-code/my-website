// 全球连接时代(1500-1800) · 深度数据 (引擎同 medieval_deep.js)
const CIV_DEEP = {}, EVENT_DEEP = {}, PERSON_DEEP = {};

Object.assign(CIV_DEEP, {
  exploration:{pronunciation:'大航海时代',capital_at_peak:'里斯本 / 塞维利亚',territory_max:'环球航线',population_peak:'—',language:'葡/西语',writing:'海图·航海日志',religion:'天主教传播',economy:'香料·黄金·白银',
    opening_narrative:`1453年奥斯曼阻断陆上香料路，欧洲被迫向海上找新路。葡萄牙凭罗盘、星盘、卡拉维尔帆船率先沿非洲南下：迪亚士绕过好望角，达伽马1498年抵达印度，香料利润达成本的60倍。\n\n西班牙则向西：1492年哥伦布意外撞上美洲，1522年麦哲伦船队完成首次环球航行。地球第一次被人类的航线连成一体——"全球化"由此开端，但也开启了殖民与掠夺。`,
    nine_inventions:[{name:'绕非洲到亚洲航线',year:'1498',body:'达伽马打通欧亚海上直航，绕开奥斯曼与威尼斯。'},{name:'首次环球航行',year:'1522',body:'麦哲伦-埃尔卡诺证明地球是连通的整体。'},{name:'托尔德西利亚斯条约',year:'1494',body:'西葡私分世界，殖民主义合法化的早期样板。'}],
    collapse_chain:['航海重心转向荷英','西葡贸易帝国渐衰']},
  spain:{pronunciation:'西班牙帝国',capital_at_peak:'马德里 / 墨西哥城 / 利马',territory_max:'美洲 + 菲律宾 + 部分欧洲',population_peak:'—',language:'西班牙语',writing:'—',religion:'天主教·宗教裁判所',economy:'美洲白银(波托西)',
    opening_narrative:`哥伦布之后，科尔特斯灭阿兹特克、皮萨罗灭印加，西班牙建立起"太阳永不落下"的美洲帝国。1545年波托西银矿被发现，海量白银经马尼拉帆船流向中国，也引发欧洲"价格革命"。\n\n查理五世、菲利普二世时帝国达到顶峰，却也埋下隐患：1588年无敌舰队败于英国，荷兰独立战争旷日持久，掠夺式经济与连年战争最终拖垮了帝国。`,
    nine_inventions:[{name:'美洲白银—全球货币网',year:'1545',body:'波托西银经马尼拉流入中国，第一个真正的全球贸易循环。'},{name:'总督区殖民体制',year:'1535',body:'新西班牙/秘鲁总督区，跨洋治理模式。'},{name:'(反思)殖民剥削',year:'',body:'恩科米恩达、米塔劳役致数百万印第安人死亡。'}],
    collapse_chain:['1588 无敌舰队覆没','荷兰独立','白银减少→财政危机','渐失霸权']},
  dutch:{pronunciation:'荷兰黄金时代',capital_at_peak:'阿姆斯特丹',territory_max:'东印度群岛 + 贸易站',population_peak:'—',language:'荷兰语',writing:'股票·期货合约',religion:'加尔文宗',economy:'股份公司·全球贸易',
    opening_narrative:`从西班牙独立后，弹丸之地荷兰却成了17世纪的世界商业中心。1602年成立的荷兰东印度公司(VOC)是人类第一家发行股票的股份公司，建立了阿姆斯特丹证券交易所，市值折合今约8万亿美元。\n\n荷兰人垄断香料、称霸海运，绘画(伦勃朗、维米尔)与科学(显微镜)灿烂一时。但垄断也伴随暴行——VOC在班达群岛屠杀土著以独占肉豆蔻。`,
    nine_inventions:[{name:'股份公司与股票市场',year:'1602',body:'VOC首发股票，阿姆斯特丹交易所，现代金融资本主义之始。'},{name:'全球海运霸权',year:'17世纪',body:'峰值拥有上千商船，连接亚非美。'},{name:'金融工具(期货/期权)',year:'17世纪',body:'最早的期货与期权合约。'}],
    collapse_chain:['英荷战争','被英法挤压','VOC 1799解散']},
  britain:{pronunciation:'英国的崛起',capital_at_peak:'伦敦',territory_max:'北美 + 印度贸易站',population_peak:'—',language:'英语',writing:'《钦定圣经》·议会文献',religion:'英国国教(新教)',economy:'贸易·东印度公司',
    opening_narrative:`亨利八世为离婚与罗马决裂、创立英国国教；伊丽莎白一世击败西班牙无敌舰队(1588)，英国崛起为海上强权，迎来莎士比亚的黄金时代。\n\n17世纪英国走上独特的政治道路：内战处决了查理一世(1649)，1688年"光荣革命"以《权利法案》确立君主立宪——议会主权成为现代民主的重要里程碑。`,
    nine_inventions:[{name:'英国国教',year:'1534',body:'亨利八世与罗马决裂，王权高于教权。'},{name:'君主立宪·权利法案',year:'1689',body:'光荣革命确立议会主权，现代宪政的里程碑。'},{name:'皇家学会',year:'1660',body:'近代科学的制度化组织。'}],
    collapse_chain:['→ 走向工业革命与日不落帝国(下一章)']},
  france:{pronunciation:'法国绝对君主制',capital_at_peak:'巴黎 / 凡尔赛',territory_max:'西欧强国 + 新法兰西',population_peak:'—',language:'法语',writing:'—',religion:'天主教',economy:'重商主义',
    opening_narrative:`路易十四"太阳王"在位72年，以"朕即国家"把绝对君主制推向顶峰。他建凡尔赛宫，用奢华宫廷生活驯服贵族；财政大臣柯尔贝推行重商主义。\n\n但废除《南特赦令》驱逐胡格诺工匠、连年战争耗尽国力，给后来的法国大革命埋下伏笔。法国也在北美建立"新法兰西"(魁北克)。`,
    nine_inventions:[{name:'绝对君主制范式',year:'1682',body:'凡尔赛宫廷制度，"朕即国家"。'},{name:'重商主义国策',year:'',body:'柯尔贝建国营工厂、扶植海外公司。'},{name:'新法兰西',year:'1608',body:'尚普兰建魁北克，法国北美殖民。'}],
    collapse_chain:['连年战争+债务','埋下大革命伏笔']},
  reform:{pronunciation:'宗教改革',capital_at_peak:'维滕贝格 / 日内瓦',territory_max:'欧洲分裂为新旧教',population_peak:'—',language:'各民族语圣经',writing:'印刷的小册子',religion:'新教 vs 天主教',economy:'—',
    opening_narrative:`1517年路德贴出《九十五条论纲》，抨击赎罪券、主张"因信称义"与"圣经唯一权威"。借助古腾堡印刷术，改革思想席卷德意志。加尔文在日内瓦建立更系统的新教，影响清教徒与资本主义精神。\n\n天主教以特伦托会议与耶稣会反击。宗教对立最终酿成惨烈的三十年战争，1648年《威斯特伐利亚和约》确立"国家主权"，奠定现代国际体系。`,
    nine_inventions:[{name:'新教与因信称义',year:'1517',body:'路德打破教会对信仰的垄断。'},{name:'民族语圣经',year:'1522',body:'路德德语圣经奠定现代德语，知识走向大众。'},{name:'国家主权(威斯特伐利亚)',year:'1648',body:'现代国际关系体系的起点。'}],
    collapse_chain:['三十年战争德意志人口减1/3','宗教让位于国家利益']},
  science:{pronunciation:'科学革命',capital_at_peak:'欧洲各地',territory_max:'思想的革命',population_peak:'—',language:'拉丁语→各国语',writing:'实验·数学',religion:'理性挑战教会宇宙观',economy:'—',
    opening_narrative:`哥白尼提出日心说，伽利略用望远镜证实、却遭宗教裁判所审判；开普勒揭示行星椭圆轨道，培根倡导实验归纳，笛卡尔奠定理性哲学。\n\n1687年牛顿《自然哲学的数学原理》以万有引力统一天地的运动，集科学革命之大成。从此人类相信：宇宙遵循可被发现的数学规律——这成为启蒙运动与工业革命的思想引擎。`,
    nine_inventions:[{name:'日心说',year:'1543',body:'哥白尼把地球从宇宙中心移开。'},{name:'科学方法',year:'1620',body:'培根归纳法+伽利略实验，近代科学的方法论。'},{name:'万有引力与经典力学',year:'1687',body:'牛顿《原理》统治科学200年。'}],
    collapse_chain:['→ 催生启蒙运动与工业革命']},
  ottoman:{pronunciation:'奥斯曼帝国',capital_at_peak:'伊斯坦布尔',territory_max:'三洲之交·东地中海',population_peak:'—',language:'奥斯曼土耳其语',writing:'苏莱曼法典',religion:'逊尼派伊斯兰',economy:'东西贸易枢纽',
    opening_narrative:`1453年攻陷君士坦丁堡后，奥斯曼成为横跨亚非欧的伊斯兰强权。苏莱曼一世"立法者"时达到鼎盛：围维也纳、控东地中海、立法典，建筑大师希南留下壮丽清真寺。\n\n米利特制度让多宗教多民族共存。但1571年勒班陀海战、1683年维也纳之败标志扩张终结，帝国逐渐成为"欧洲病夫"。`,
    nine_inventions:[{name:'多元共治(米利特制)',year:'',body:'各宗教社区自治，统治多元人口的制度。'},{name:'苏莱曼法典',year:'',body:'系统化的世俗法律体系。'},{name:'奥斯曼建筑(希南)',year:'1557',body:'苏莱曼清真寺等，伊斯兰建筑巅峰。'}],
    collapse_chain:['1571 勒班陀海战败','1683 维也纳之败','转入守势·欧洲病夫']},
  china:{pronunciation:'明清中国',capital_at_peak:'北京',territory_max:'东亚最大帝国(乾隆约1300万km²)',population_peak:'约3亿(清中期)',language:'汉语',writing:'《四库全书》',religion:'儒释道',economy:'白银经济·世界工厂',
    opening_narrative:`明初郑和七下西洋，船队远超后来的哥伦布，却因保守国策戛然而止——中国主动退出了海洋时代。明中后期大量美洲白银流入，张居正一条鞭法以银纳税，利玛窦带来西方科学。\n\n1644年明亡清兴，康熙、雍正、乾隆三朝盛世，版图达到极盛。但1793年乾隆拒绝马戛尔尼通商("天朝无所不有")，与正在工业化的西方擦肩而过。`,
    nine_inventions:[{name:'郑和下西洋',year:'1405',body:'世界最大船队远达东非，却未持续。'},{name:'白银货币化(一条鞭法)',year:'1581',body:'中国深度接入全球白银贸易。'},{name:'中西交流(利玛窦)',year:'1601',body:'《几何原本》等西学东渐。'}],
    collapse_chain:['1793 拒马戛尔尼','闭关自守','与工业化西方拉开差距']},
  japan:{pronunciation:'德川日本',capital_at_peak:'江户(东京)',territory_max:'日本列岛',population_peak:'约3000万',language:'日语',writing:'—',religion:'神道·佛教(禁基督教)',economy:'锁国下的内部繁荣',
    opening_narrative:`织田信长、丰臣秀吉、德川家康"三英杰"结束战国乱世。1600年关原之战后，德川家康1603年建立幕府，开启260年和平。\n\n幕府以"参勤交代"控制大名，推行严格的士农工商身份制，并在1630年代厉行"锁国"——只留长崎与荷兰、中国通商。封闭中японный商业、町人文化(浮世绘、歌舞伎)与教育却悄然繁荣，为明治维新积蓄了底力。`,
    nine_inventions:[{name:'德川幕府260年和平',year:'1603',body:'关原之战后长期稳定的武家统治。'},{name:'参勤交代',year:'1635',body:'以人质与往返制度控制大名。'},{name:'锁国体制',year:'1639',body:'限制对外交往，仅留长崎口岸。'}],
    collapse_chain:['→ 黑船来航与明治维新(下一章)']},
});

Object.assign(EVENT_DEEP, {
  evt_gama_route:{full_title:'达伽马开辟印度航线',one_liner:'1498年达伽马绕好望角抵达印度，欧亚海上直航打通。',narrative:`葡萄牙人沿非洲西岸摸索数十年。1498年，达伽马绕过好望角、横越印度洋，抵达印度卡利卡特，带回的香料价值是航行成本的60倍。\n\n这条航线绕开了奥斯曼与威尼斯的中间盘剥，开启了葡萄牙的印度洋帝国，也拉开了欧洲直通亚洲、进而主导全球贸易的序幕。`,context_before:'奥斯曼阻断陆上香料路，香料价格暴涨。',what_happened:['1488 迪亚士绕过好望角','1498 达伽马抵印度卡利卡特','香料利润达成本60倍','葡建印度洋贸易站网'],significance:'打通欧亚海上直航，全球海洋贸易时代开端。',evidence:[{artifact:'《航海日志》',what:'记录达伽马首航。',held:'葡萄牙档案'}],leads_to:'葡属印度帝国;阿尔布克尔克夺要港',source:'大航海史',related_people:['gama','diaz']},
  evt_columbus:{full_title:'哥伦布抵达美洲',one_liner:'1492年哥伦布西航撞上美洲，旧大陆与新大陆从此相连。',narrative:`哥伦布坚信向西可达亚洲(却严重低估地球周长)，在西班牙女王资助下西行。1492年10月12日抵达巴哈马，他至死以为到了"印度"，把当地人称作"印第安人"。\n\n这次航行连接了隔绝上万年的两个半球，引发"哥伦布大交换"——作物、动物、人群与疾病的洲际流动；也开启了对美洲原住民的殖民与浩劫。`,context_before:'奥斯曼阻路，西班牙寻西向新航线。',what_happened:['1492 抵巴哈马','四次航行探加勒比与南美','以为到达亚洲','开启美洲殖民'],significance:'两个半球相连，"哥伦布大交换"重塑全球生态与人口。',evidence:[{artifact:'哥伦布航海日记',what:'首航记录。',held:'传世'}],leads_to:'西班牙征服美洲;美洲命名(韦斯普奇)',source:'大航海史',related_people:['columbus','isabella1','vespucci']},
  evt_magellan:{full_title:'麦哲伦-埃尔卡诺首次环球',one_liner:'1519–1522年人类首次环球航行，实证地球是连通的圆球。',narrative:`麦哲伦率5船270人西行，穿越南美南端的麦哲伦海峡进入太平洋，1521年抵菲律宾，他本人在马克坦岛战死。埃尔卡诺接手，1522年率仅存的"维多利亚号"18人返回西班牙。\n\n这是人类首次环球航行，实证了地球的形状与太平洋的浩瀚，也开启了西班牙对菲律宾的殖民与跨太平洋贸易。`,context_before:'寻找向西到香料群岛的航路。',what_happened:['1519 5船出发','1520 穿越麦哲伦海峡','1521 麦哲伦战死菲律宾','1522 埃尔卡诺完成环球'],significance:'实证地球连通，确立跨太平洋航路。',evidence:[{artifact:'维多利亚号航线图',what:'首次环球记录。',held:'西班牙'}],leads_to:'马尼拉帆船贸易;西属菲律宾',source:'大航海史',related_people:['magellan','elcano']},
  evt_tordesillas:{full_title:'托尔德西利亚斯条约',one_liner:'1494年西葡在教皇调停下，一线瓜分世界。',narrative:`1494年，西班牙与葡萄牙在教皇调停下签约，以一条子午线瓜分世界：线西归西班牙，线东归葡萄牙。这就是为何巴西说葡语、其余拉美说西语。\n\n这是两国无视所有其他民族、私分地球的秘密协议，是殖民主义"合法化"的早期典型。`,context_before:'西葡海外扩张产生冲突。',what_happened:['1494 划定分界子午线','线西→西班牙','线东→葡萄牙(含巴西)','无视当地民族'],significance:'殖民世界被两国私分的早期范例。',evidence:[{artifact:'条约原件',what:'西葡分界协议。',held:'里斯本/塞维利亚'}],leads_to:'巴西归葡;拉美归西',source:'外交史',related_people:[]},
  evt_aztec_conquest:{full_title:'西班牙征服美洲',one_liner:'科尔特斯灭阿兹特克、皮萨罗灭印加，西班牙美洲帝国建立。',narrative:`1521年科尔特斯凭借火器、马匹、内应与天花，灭亡阿兹特克帝国；1533年皮萨罗以少量人马俘杀印加皇帝、灭印加。\n\n两大美洲文明骤然崩塌，背后是欧洲带来的传染病造成的人口大灭绝。西班牙在废墟上建立总督区，开采金银，奴役土著。`,context_before:'哥伦布之后西班牙人涌入美洲。',what_happened:['1521 科尔特斯灭阿兹特克','1533 皮萨罗灭印加','天花致人口大灭绝','建总督区与殖民体制'],significance:'美洲古文明终结;西班牙帝国奠基。',evidence:[{artifact:'征服者编年',what:'记录征服过程。',held:'西班牙档案'}],leads_to:'波托西银矿;恩科米恩达劳役',source:'美洲殖民史',related_people:['cortes','pizarro','las_casas']},
  evt_potosi:{full_title:'波托西银矿与全球白银',one_liner:'1545年波托西银矿，海量白银经马尼拉流向中国，第一个全球贸易循环。',narrative:`1545年玻利维亚波托西发现世界最大银矿，16-17世纪产银约十万吨。白银经马尼拉帆船横跨太平洋流入中国，换取丝绸瓷器，也流入欧洲引发"价格革命"。\n\n白银把美洲、欧洲、亚洲第一次绑进同一个贸易循环——真正意义的全球化经济。代价是米塔强制劳役下数百万矿工的死亡。`,context_before:'西班牙征服美洲后开采矿产。',what_happened:['1545 发现波托西银矿','产银约十万吨','马尼拉帆船运银入华','引发欧洲价格革命'],significance:'第一个真正的全球贸易循环;白银重塑世界经济。',evidence:[{artifact:'波托西银矿遗址',what:'世界遗产。',held:'玻利维亚'}],leads_to:'中国白银经济;欧洲通胀',source:'全球经济史',related_people:['philip2']},
  evt_armada1588:{full_title:'无敌舰队覆没',one_liner:'1588年西班牙无敌舰队败于英国与风暴，海上霸权开始转移。',narrative:`1588年，菲利普二世派遣"无敌舰队"远征英格兰，意图推翻伊丽莎白一世。英国海军(德雷克等)以灵活战术加上恶劣风暴，重创西班牙舰队。\n\n这一败标志西班牙海上霸权的顶点与转折，也提振了新教英国的国运——海权天平开始向英荷倾斜。`,context_before:'英西宗教与海上对抗。',what_happened:['1588 无敌舰队出征','英军火船+风暴重创','西班牙惨败','海权天平转移'],significance:'西班牙海上霸权由盛转衰;英国崛起。',evidence:[{artifact:'舰队沉船',what:'爱尔兰海岸出水。',held:'多家博物馆'}],leads_to:'英荷海上崛起',source:'海战史',related_people:['philip2','elizabeth1','drake']},
  evt_voc:{full_title:'荷兰东印度公司(VOC)成立',one_liner:'1602年成立，人类第一家发行股票的股份公司。',narrative:`1602年荷兰成立东印度公司(VOC)，首次向公众发行股票，并建立阿姆斯特丹证券交易所。它拥有商船、军队与铸币、缔约之权，几乎是一个"公司国家"。\n\nVOC垄断香料贸易，把荷兰推上17世纪世界商业之巅——现代股份公司、证券市场与金融资本主义的源头。`,context_before:'荷兰独立后商业勃兴。',what_happened:['1602 VOC成立、发行股票','建阿姆斯特丹交易所','垄断香料贸易','成"公司国家"'],significance:'现代股份公司与股票市场的诞生。',evidence:[{artifact:'VOC股票(1606)',what:'已知最早的股票之一。',held:'荷兰档案'}],leads_to:'荷兰黄金时代;殖民东印度',source:'金融史',related_people:['coen']},
  evt_dutch_independence:{full_title:'荷兰独立(八十年战争)',one_liner:'荷兰反抗西班牙，1648年独立获承认，建立共和国。',narrative:`从1568年起，尼德兰新教各省反抗西班牙菲利普二世的统治与宗教压迫，"沉默者威廉"成为独立的精神领袖。\n\n经过八十年战争，1648年《威斯特伐利亚和约》正式承认荷兰共和国独立。这个由商人主导的共和国随即迎来黄金时代。`,context_before:'西班牙在尼德兰征税与宗教迫害。',what_happened:['1568 起义爆发','沉默者威廉领导','1648 独立获承认','建七省共和国'],significance:'诞生商业共和国;西班牙帝国受重创。',evidence:[{artifact:'《威廉颂》',what:'世界最古老国歌歌词。',held:'荷兰'}],leads_to:'荷兰黄金时代',source:'欧洲史',related_people:['william_orange','philip2']},
  evt_banda:{full_title:'班达群岛屠杀',one_liner:'1621年VOC为垄断肉豆蔻，几乎屠尽班达土著。',narrative:`肉豆蔻当时只产于印尼班达群岛。1621年，VOC总督科恩为彻底垄断，对班达居民进行屠杀与驱逐，约1.5万人被杀或饿死。\n\n这是殖民商业暴行的极端例子——香料的甜香背后是血腥的垄断。`,context_before:'VOC追求香料垄断。',what_happened:['1621 科恩进攻班达','屠杀/驱逐约1.5万人','垄断肉豆蔻','建种植园奴役劳工'],significance:'殖民垄断暴行的典型;全球贸易的阴暗面。',evidence:[{artifact:'VOC档案',what:'记录班达事件。',held:'荷兰国家档案馆'}],leads_to:'VOC香料垄断',source:'殖民史',related_people:['coen']},
  evt_anglican:{full_title:'英国国教的创立',one_liner:'1534年亨利八世与罗马决裂，自任英格兰教会最高元首。',narrative:`亨利八世因教皇拒绝批准其离婚，1534年颁布《最高权威法案》，宣布英王为英格兰教会最高元首，与罗马彻底决裂，创立英国国教(圣公会)。\n\n这既是宗教改革的一部分，也是王权战胜教权的政治事件，没收的教会财产壮大了王室与新贵族。`,context_before:'亨利八世求离婚被教皇拒绝。',what_happened:['1534 《最高权威法案》','英王为教会元首','没收修道院财产','创英国国教'],significance:'英国脱离罗马;王权高于教权。',evidence:[{artifact:'《钦定圣经》(1611)',what:'英语文学的奠基文本。',held:'传世'}],leads_to:'英国宗教与王权格局',source:'英国史',related_people:['henry8','elizabeth1']},
  evt_english_civil_war:{full_title:'英国内战与查理一世被处决',one_liner:'1649年查理一世被公开处决，欧洲首位被"合法"处决的君主。',narrative:`查理一世坚持君权神授、与议会长期对抗，1642年内战爆发。克伦威尔率新模范军击败保王党。\n\n1649年1月30日，查理一世被公开斩首——这是欧洲历史上第一次以"叛国"之名审判并处决在位君主，震动整个欧洲，宣告"国王也要对法律和人民负责"。`,context_before:'国王与议会争夺权力。',what_happened:['1642 内战爆发','克伦威尔新模范军获胜','1649 查理一世被处决','建共和国(护国主)'],significance:'君权神授被打破;议会与王权关系剧变。',evidence:[{artifact:'审判记录',what:'查理一世受审文献。',held:'英国国家档案馆'}],leads_to:'克伦威尔共和→王政复辟→光荣革命',source:'英国史',related_people:['charles1_eng','cromwell']},
  evt_glorious_rev:{full_title:'光荣革命与《权利法案》',one_liner:'1688年不流血政变，1689年《权利法案》确立君主立宪。',narrative:`1688年，议会邀请荷兰执政威廉入主英国，天主教国王詹姆斯二世出逃，史称"光荣革命"(几乎不流血)。\n\n1689年颁布《权利法案》：国王不得擅自征税、立法、维持常备军，须经议会同意——议会主权制度化。这是现代君主立宪与代议民主的重要里程碑。`,context_before:'天主教国王与新教议会冲突。',what_happened:['1688 威廉受邀入主','詹姆斯二世出逃','1689 《权利法案》','确立君主立宪'],significance:'现代宪政与议会主权的里程碑。',evidence:[{artifact:'《权利法案》原件',what:'1689年。',held:'英国议会档案'}],leads_to:'英国稳定→工业革命温床',source:'宪政史',related_people:[]},
  evt_versailles:{full_title:'凡尔赛宫与绝对君主制',one_liner:'路易十四建凡尔赛宫，"朕即国家"，绝对君主制登峰造极。',narrative:`路易十四1682年把宫廷迁入凡尔赛宫，用奢华的宫廷礼仪把贵族"圈养"在身边、剥夺其地方权力。"太阳王"以"朕即国家"自况，集权于一身。\n\n凡尔赛成为全欧君主效仿的样板，但连年战争与穷奢极欲也透支了法国国力。`,context_before:'法国王权强化、压制贵族。',what_happened:['1682 迁宫凡尔赛','宫廷化驯服贵族','重商主义(柯尔贝)','连年对外战争'],significance:'绝对君主制的顶峰范式;埋下大革命伏笔。',evidence:[{artifact:'凡尔赛宫',what:'世界遗产。',held:'法国'}],leads_to:'财政枯竭→法国大革命(下一章)',source:'法国史',related_people:['louis14','colbert']},
  evt_nantes_revoke:{full_title:'废除南特赦令',one_liner:'1685年路易十四废除宗教宽容令，逐走数十万新教工匠。',narrative:`1598年的《南特赦令》曾给予法国新教徒(胡格诺派)宗教宽容。1685年路易十四将其废除，迫害新教徒。\n\n约40万胡格诺派——其中许多是熟练工匠与商人——逃往荷兰、英国、普鲁士，反而增强了法国对手的实力。这是宗教不宽容的经济代价。`,context_before:'路易十四追求"一个国王、一种信仰"。',what_happened:['1685 废除南特赦令','迫害新教徒','约40万人外逃','削弱法国、壮大对手'],significance:'宗教不宽容的反噬;人才外流的典型。',evidence:[{artifact:'废除诏书',what:'枫丹白露敕令。',held:'法国档案'}],leads_to:'法国手工业受损',source:'法国史',related_people:['louis14']},
  evt_95theses:{full_title:'马丁·路德《九十五条论纲》',one_liner:'1517年路德抨击赎罪券，引爆新教改革。',narrative:`1517年10月31日，路德把《九十五条论纲》贴上(据传)维滕贝格教堂门，抨击赎罪券、质疑教皇赦罪权，主张"因信称义""圣经唯一权威"。\n\n借助印刷术，论纲数周内传遍德意志。基督教世界就此分裂为新教与天主教，欧洲进入百年宗教动荡。`,context_before:'教会贩卖赎罪券、腐败丛生。',what_happened:['1517 张贴九十五条论纲','印刷术助其传播','1521 沃尔姆斯议会抗辩','译德语圣经'],significance:'新教诞生;基督教世界分裂。',evidence:[{artifact:'路德德语圣经',what:'奠定现代德语。',held:'传世'}],leads_to:'加尔文宗;三十年战争',source:'宗教改革史',related_people:['luther','charles5']},
  evt_calvin_geneva:{full_title:'加尔文与日内瓦',one_liner:'加尔文建立系统化新教，预定论与天职观影响深远。',narrative:`法国神学家加尔文在日内瓦建立神权政治，提出"预定论"与"天职观"——把世俗工作视为上帝的召唤，成功是蒙恩的证明。\n\n加尔文主义影响了荷兰、苏格兰、英格兰清教徒与北美新英格兰，韦伯认为它是资本主义精神的重要源头。`,context_before:'路德改革后新教各派兴起。',what_happened:['加尔文在日内瓦建神权政治','提出预定论','天职观(工作即召唤)','影响清教徒与北美'],significance:'塑造资本主义伦理;影响北美建国精神。',evidence:[{artifact:'《基督教要义》',what:'加尔文神学体系。',held:'传世'}],leads_to:'清教徒移民北美',source:'宗教改革史',related_people:['calvin']},
  evt_thirty_years:{full_title:'三十年战争',one_liner:'1618–1648欧洲最惨烈宗教战争，德意志人口减约三分之一。',narrative:`1618年布拉格抛窗事件点燃三十年战争。新旧教诸侯混战，瑞典"北方雄狮"古斯塔夫·阿道夫参战(战死吕岑)，连天主教的法国也为国家利益站到新教一边。\n\n战争把德意志变成废墟——人口减少约三分之一，部分地区村庄毁去九成。它最终从宗教战争演变为赤裸裸的国家权力斗争。`,context_before:'新旧教对立+诸侯争权。',what_happened:['1618 布拉格抛窗事件','瑞典/法国相继介入','德意志沦为战场','1648 威斯特伐利亚和约'],significance:'宗教战争的终极惨剧;催生现代主权国家体系。',evidence:[{artifact:'战争废墟记录',what:'人口锐减的史料。',held:'欧洲档案'}],leads_to:'威斯特伐利亚和约',source:'欧洲史',related_people:['gustavus']},
  evt_westphalia:{full_title:'威斯特伐利亚和约',one_liner:'1648年确立"国家主权"，现代国际体系的起点。',narrative:`1648年《威斯特伐利亚和约》结束三十年战争：承认新教各派合法，确立"国家主权"原则——每个国家自主决定内政、不受外国宗教干涉。\n\n它被视为现代主权国家体系的开端，荷兰独立获正式承认，神圣罗马帝国名存实亡。`,context_before:'三十年战争各方精疲力竭。',what_happened:['1648 签订和约','确立国家主权原则','承认新教合法','荷兰瑞士独立'],significance:'现代国际关系(主权国家)体系的起点。',evidence:[{artifact:'和约文本',what:'1648年。',held:'欧洲档案'}],leads_to:'近代国族国家体系',source:'国际关系史',related_people:[]},
  evt_heliocentrism:{full_title:'哥白尼日心说',one_liner:'1543年《天球运行论》把太阳放回宇宙中心。',narrative:`1543年，哥白尼临终出版《天球运行论》，提出太阳(而非地球)是宇宙中心。这直接挑战了统治千年的地心说与教会宇宙观。\n\n其数学的精确使它无法被简单否定，"哥白尼革命"成为一切颠覆性思维转变的代名词，揭开科学革命的序幕。`,context_before:'亚里士多德-托勒密地心说统治千年。',what_happened:['1543 出版《天球运行论》','提出日心说','挑战教会宇宙观','开启科学革命'],significance:'科学革命的开端;人类宇宙观的根本转变。',evidence:[{artifact:'《天球运行论》',what:'1543年初版。',held:'多家图书馆'}],leads_to:'伽利略/开普勒/牛顿',source:'科学史',related_people:['copernicus','kepler']},
  evt_galileo_trial:{full_title:'伽利略与宗教裁判所',one_liner:'1633年伽利略因支持日心说受审，被迫认罪软禁。',narrative:`伽利略用望远镜发现木星卫星、金星相位，有力支持日心说。1633年他因此被罗马宗教裁判所审判，被迫公开放弃主张，软禁至死。\n\n传说他低声说"但地球确实在转"。这场审判成为科学与教条冲突的象征；1992年教廷正式为他平反。`,context_before:'日心说挑战教会权威。',what_happened:['1609 望远镜观天','发现木星卫星、金星相位','1633 受审被迫认罪','软禁至死'],significance:'科学与教条冲突的象征;实验科学的奠基者。',evidence:[{artifact:'审判记录',what:'宗教裁判所档案。',held:'梵蒂冈'}],leads_to:'科学方法确立',source:'科学史',related_people:['galileo','copernicus']},
  evt_newton_principia:{full_title:'牛顿《自然哲学的数学原理》',one_liner:'1687年牛顿以万有引力统一天地运动，集科学革命大成。',narrative:`1687年牛顿出版《原理》，提出万有引力与三大运动定律，用同一套数学规律解释了苹果落地与行星运转，统一了天与地的物理。\n\n这部书统治科学约200年，确立了"宇宙遵循可发现的数学规律"的信念，成为启蒙运动与工业革命的思想引擎。`,context_before:'哥白尼/开普勒/伽利略奠基。',what_happened:['1666 奇迹年顿悟引力','发明微积分','1687 出版《原理》','统一天地物理'],significance:'经典力学体系建立;近代科学的巅峰。',evidence:[{artifact:'《原理》初版',what:'1687年。',held:'多家图书馆'}],leads_to:'启蒙运动;工业革命',source:'科学史',related_people:['newton','kepler','galileo']},
  evt_suleiman_peak:{full_title:'苏莱曼一世的鼎盛',one_liner:'16世纪奥斯曼达到顶峰：围维也纳、控地中海、立法典。',narrative:`苏莱曼一世"立法者"在位时，奥斯曼帝国国势达到顶峰：攻贝尔格莱德、占罗德岛、败匈牙利，1529年第一次围攻维也纳(虽未克)，控制东地中海。\n\n他编纂法典、任用建筑大师希南，以米利特制度统治多宗教多民族的庞大帝国，伊斯坦布尔成为三洲交汇的世界都会。`,context_before:'奥斯曼1453年克君士坦丁堡后扩张。',what_happened:['1526 摩哈赤败匈牙利','1529 一围维也纳','立苏莱曼法典','希南建大清真寺'],significance:'伊斯兰强权鼎盛;多元帝国治理典范。',evidence:[{artifact:'苏莱曼清真寺',what:'希南名作。',held:'伊斯坦布尔'}],leads_to:'勒班陀;维也纳之败',source:'奥斯曼史',related_people:['suleiman','hurrem','sinan']},
  evt_lepanto:{full_title:'勒班陀海战',one_liner:'1571年神圣同盟击败奥斯曼海军，奥斯曼海上首次重大失利。',narrative:`1571年，西班牙、威尼斯、教皇组成的"神圣同盟"舰队在勒班陀海战中击败奥斯曼海军——这是奥斯曼海上力量第一次重大失败，提振了基督教欧洲的士气。\n\n虽然奥斯曼迅速重建舰队、影响有限，但它象征着地中海力量平衡的微妙转变。`,context_before:'奥斯曼扩张威胁地中海。',what_happened:['1571 勒班陀海战','神圣同盟获胜','奥斯曼海军大损','欧洲士气大振'],significance:'奥斯曼海上扩张受挫;地中海力量转变。',evidence:[{artifact:'勒班陀战役画作',what:'多幅传世名画。',held:'欧洲博物馆'}],leads_to:'地中海力量平衡',source:'海战史',related_people:['selim1']},
  evt_vienna1683:{full_title:'1683年维也纳之围',one_liner:'奥斯曼最后一次西扩失败，转入守势成"欧洲病夫"。',narrative:`1683年，奥斯曼大军最后一次大举围攻维也纳。波兰国王扬·索别斯基率联军驰援，在卡伦贝格山大败奥斯曼军。\n\n这是奥斯曼在欧洲扩张的终点。1699年《卡尔洛维茨条约》首次割地求和，帝国由扩张转入守势，开始漫长的衰落。`,context_before:'奥斯曼再图西进。',what_happened:['1683 围攻维也纳','索别斯基联军驰援','奥斯曼大败','1699 卡尔洛维茨割地'],significance:'奥斯曼西扩终结;由盛转衰的转折。',evidence:[{artifact:'卡伦贝格战役记载',what:'1683年。',held:'欧洲档案'}],leads_to:'奥斯曼衰落',source:'奥斯曼史',related_people:['sobieski']},
  evt_zhenghe_voyages:{full_title:'郑和下西洋',one_liner:'1405–1433年明朝七下西洋，世界最大船队远达东非。',narrative:`明成祖派郑和七下西洋，最大一次船队约62艘宝船(最大船长约125米，是哥伦布船的数倍)、两万余人，远达印度、阿拉伯与东非。\n\n其规模与技术远超数十年后的欧洲航海，但目的在宣扬国威、建立朝贡，而非贸易获利。宣德之后保守官僚叫停远航、销毁档案——中国主动退出了即将到来的海洋时代。`,context_before:'明初国力强盛、永乐图威。',what_happened:['1405 首下西洋','七次远航达东非','带回长颈鹿("麒麟")','1433后叫停、禁造大船'],significance:'中国错失海洋时代的著名转折;中西大分流的关键问题。',evidence:[{artifact:'《郑和航海图》',what:'明代航海图。',held:'传世'}],leads_to:'中国转向内向;欧洲接棒大航海',source:'明史',related_people:['zhenghe']},
  evt_ricci_china:{full_title:'利玛窦与西学东渐',one_liner:'1601年利玛窦入京，西方科学与中国士大夫相遇。',narrative:`耶稣会士利玛窦穿儒服、学汉语、讲科学，1601年获准入京，向万历帝献自鸣钟与世界地图。他与徐光启合译《几何原本》，开西学东渐之先。\n\n但"中国礼仪之争"——能否容许信徒祭孔祭祖——最终使教皇与康熙交恶，传教受挫。这是中西文明深度相遇又错过的缩影。`,context_before:'大航海带来欧洲传教士东来。',what_happened:['1583 入华、适应儒家','1601 入京献钟与地图','1607 合译《几何原本》','礼仪之争致传教受挫'],significance:'中西科学文化首次深度交流。',evidence:[{artifact:'《坤舆万国全图》',what:'利玛窦世界地图。',held:'多家藏'}],leads_to:'康熙礼仪之争驱传教士',source:'中西交流史',related_people:['ricci','xuguangqi']},
  evt_ming_fall:{full_title:'明朝灭亡与清军入关',one_liner:'1644年李自成破北京、崇祯自缢，吴三桂引清军入关。',narrative:`财政枯竭、天灾与民变交织，1644年李自成农民军攻入北京，崇祯帝在煤山自缢，明朝灭亡。\n\n镇守山海关的吴三桂随后降清、引清军入关，击败李自成。满洲建立的清朝入主中原，开始近三百年的统治。`,context_before:'明末财政崩溃、灾荒民变。',what_happened:['1644 李自成破北京','崇祯自缢、明亡','吴三桂引清入关','清朝入主中原'],significance:'王朝更替;满洲入主、清朝奠基。',evidence:[{artifact:'《明史》',what:'记明亡。',held:'传世'}],leads_to:'清初康雍乾盛世',source:'明清史',related_people:['chongzhen','lizicheng','wusangui','nurhaci']},
  evt_kangxi:{full_title:'康雍乾盛世',one_liner:'康熙雍正乾隆三朝,清朝国力与版图达到极盛。',narrative:`康熙平三藩、收台湾、签《尼布楚条约》、亲征噶尔丹，奠定盛世;雍正设军机处、摊丁入亩、集权改革;乾隆完成新疆征服,版图约1300万平方公里,人口达约3亿。\n\n这是中华帝国最后的辉煌,也潜伏着闭关、文字狱与官僚腐败(和珅)的危机。`,context_before:'清初统一与稳定。',what_happened:['康熙平三藩收台湾','1689 尼布楚条约','雍正设军机处','乾隆版图极盛'],significance:'传统帝国的最后鼎盛;也是停滞的开始。',evidence:[{artifact:'《四库全书》',what:'乾隆编,世界最大丛书之一。',held:'中国'}],leads_to:'拒马戛尔尼;与西方分流',source:'清史',related_people:['kangxi','yongzheng','qianlong','heshen']},
  evt_macartney:{full_title:'马戛尔尼使团的错失',one_liner:'1793年乾隆拒绝英国通商,"天朝无所不有",中西擦肩而过。',narrative:`1793年英国派马戛尔尼使团访华,寻求通商与建交。乾隆以"天朝物产丰盈、无所不有,原不藉外夷货物"回绝,只视之为朝贡。\n\n此时英国正走向工业革命。这次傲慢的错失,成为中西文明力量逆转前夜的象征——半世纪后便是鸦片战争。`,context_before:'英国工业化、寻求中国市场。',what_happened:['1793 马戛尔尼访华','寻求通商建交','乾隆以朝贡视之、回绝','中西错失交流'],significance:'中西大分流的象征性时刻。',evidence:[{artifact:'乾隆致英王敕谕',what:'1793年。',held:'故宫/大英'}],leads_to:'鸦片战争(下一章)',source:'清史',related_people:['qianlong']},
  evt_sekigahara:{full_title:'关原之战与德川幕府',one_liner:'1600年德川家康获胜,1603年开幕府,日本进入260年和平。',narrative:`丰臣秀吉死后,1600年德川家康在关原之战击败反对派联军,1603年受封征夷大将军,在江户(东京)建立德川幕府。\n\n他以参勤交代等制度牢牢控制大名,开启了长达260年的"德川和平"。`,context_before:'织田、丰臣相继统一日本。',what_happened:['1600 关原之战获胜','1603 建德川幕府','参勤交代控大名','士农工商身份制'],significance:'结束战国;开启260年稳定统治。',evidence:[{artifact:'江户城',what:'幕府中心。',held:'东京'}],leads_to:'锁国;町人文化',source:'日本史',related_people:['ieyasu','hideyoshi','nobunaga']},
  evt_sakoku:{full_title:'德川锁国',one_liner:'1630年代日本厉行锁国,仅留长崎对荷、中通商。',narrative:`为防范基督教与外部干预,德川幕府在1630年代颁布一系列锁国令:禁止日本人出海、驱逐传教士、限制对外贸易,仅在长崎出岛留一扇通向荷兰与中国的窗口。\n\n封闭中,日本却在内部积累:商业繁荣、町人文化(浮世绘、歌舞伎)兴盛、识字率上升——为日后明治维新的快速现代化埋下底力。`,context_before:'基督教传播引发幕府警惕。',what_happened:['1630s 颁锁国令','禁出海、驱传教士','仅留长崎出岛','町人文化繁荣'],significance:'两百年相对孤立;却积蓄了现代化底力。',evidence:[{artifact:'长崎出岛',what:'锁国时期对外窗口。',held:'日本长崎'}],leads_to:'黑船来航打破锁国(下一章)',source:'日本史',related_people:['ieyasu']},
  evt_hideyoshi_korea:{full_title:'丰臣秀吉侵朝与李舜臣',one_liner:'1592–1598两度侵朝失败,朝鲜李舜臣以龟船屡败日军。',narrative:`统一日本后,丰臣秀吉两度大举入侵朝鲜(壬辰倭乱),企图进而图明。朝鲜名将李舜臣以世界最早的装甲战船"龟船",多次击败日本水军,切断其补给。\n\n在朝鲜军民、李舜臣与明朝援军的合力下,日本最终失败撤退。这是16世纪东亚最大规模的国际战争。`,context_before:'丰臣秀吉统一日本后图谋大陆。',what_happened:['1592 首次侵朝','李舜臣龟船败日水军','明朝出兵援朝','1598 日本撤退'],significance:'东亚国际大战;李舜臣成朝鲜民族英雄。',evidence:[{artifact:'龟船(复原)',what:'世界最早装甲战船之一。',held:'韩国'}],leads_to:'丰臣氏衰、德川崛起',source:'东亚史',related_people:['hideyoshi','yi_sunsin']},
});

// 辅助(精简)
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
  exploration:['恩里克王子','迪亚士','达伽马','哥伦布','韦斯普奇','麦哲伦','埃尔卡诺','阿尔布克尔克'],
  spain:['伊莎贝拉一世','查理五世','菲利普二世','科尔特斯','皮萨罗','拉斯卡萨斯','沙勿略'],
  dutch:['沉默者威廉','科恩','塔斯曼','德鲁伊特'],
  britain:['亨利八世','伊丽莎白一世','德雷克','罗利','查理一世','克伦威尔'],
  france:['路易十四','柯尔贝','尚普兰'],
  reform:['马丁·路德','加尔文','罗耀拉','古斯塔夫·阿道夫'],
  science:['哥白尼','第谷','开普勒','伽利略','培根','笛卡尔','牛顿','哈维','拉瓦锡'],
  ottoman:['苏莱曼一世','塞利姆一世','许蕾姆苏丹','希南','扬·索别斯基'],
  china:['郑和','张居正','万历皇帝','利玛窦','徐光启','崇祯皇帝','李自成','吴三桂','努尔哈赤','康熙皇帝','雍正皇帝','乾隆皇帝','和珅'],
  japan:['织田信长','丰臣秀吉','德川家康','李舜臣'],
};
const CIV_EVENTS = {
  exploration:['evt_gama_route','evt_columbus','evt_magellan','evt_tordesillas'],
  spain:['evt_aztec_conquest','evt_potosi','evt_armada1588'],
  dutch:['evt_voc','evt_dutch_independence','evt_banda'],
  britain:['evt_anglican','evt_english_civil_war','evt_glorious_rev'],
  france:['evt_versailles','evt_nantes_revoke'],
  reform:['evt_95theses','evt_calvin_geneva','evt_thirty_years','evt_westphalia'],
  science:['evt_heliocentrism','evt_galileo_trial','evt_newton_principia'],
  ottoman:['evt_suleiman_peak','evt_lepanto','evt_vienna1683'],
  china:['evt_zhenghe_voyages','evt_ricci_china','evt_ming_fall','evt_kangxi','evt_macartney'],
  japan:['evt_sekigahara','evt_sakoku','evt_hideyoshi_korea'],
};

const NAME2ID = {};
(typeof CLASSICAL_PEOPLE!=='undefined'?CLASSICAL_PEOPLE:[]).forEach(p=>{NAME2ID[p.n]=p.id;});
function namesToIds(names){return (names||[]).map(n=>NAME2ID[n]).filter(Boolean);}

const CIV_META = [
  {id:'exploration',name:'大航海时代',color:'#2a7a9a',icon:'⛵',start:1415,end:1600,lane:1},
  {id:'spain',name:'西班牙帝国',color:'#c8a020',icon:'👑',start:1492,end:1700,lane:1},
  {id:'dutch',name:'荷兰黄金时代',color:'#d4683a',icon:'⚓',start:1581,end:1700,lane:2},
  {id:'britain',name:'英国崛起',color:'#9a3030',icon:'🦁',start:1485,end:1707,lane:2},
  {id:'france',name:'法国绝对君主制',color:'#3a5aa0',icon:'☀️',start:1589,end:1789,lane:3},
  {id:'reform',name:'宗教改革',color:'#7a4a90',icon:'📜',start:1517,end:1648,lane:4},
  {id:'science',name:'科学革命',color:'#2a8a6a',icon:'🔭',start:1543,end:1727,lane:4},
  {id:'ottoman',name:'奥斯曼帝国',color:'#1f8a5a',icon:'☪️',start:1453,end:1700,lane:5},
  {id:'china',name:'明清中国',color:'#c83838',icon:'🏯',start:1500,end:1800,lane:6},
  {id:'japan',name:'德川日本',color:'#8a3a4a',icon:'🏯',start:1500,end:1800,lane:7},
];
function _yr(y){return y<0?'前 '+(-y):(y===0?'公元元年':'公元 '+y);}
CIV_META.forEach(c=>{ if(CIV_DEEP[c.id]) CIV_DEEP[c.id].time_range = _yr(c.start)+' – '+_yr(c.end); });

const EARLY_CIV_EXPLORER = { civilizations: CIV_META.map(c=>({...c})), comparison_dimensions: [] };

const CHAPTERS = [{
  id:'global', no:'04', range:'公元 1500 – 1800', title:'全球连接时代',
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
    {what:'全球贸易网络',from:'大航海(15-16世纪)',why:'美洲白银连起亚欧美,世界第一次成为一个经济整体'},
    {what:'股份公司与股票市场',from:'荷兰VOC(1602)',why:'现代资本主义金融的源头'},
    {what:'君主立宪与议会主权',from:'英国光荣革命(1689)',why:'现代代议民主的里程碑'},
    {what:'国家主权体系',from:'威斯特伐利亚和约(1648)',why:'现代国际关系的基本框架'},
    {what:'近代科学',from:'科学革命(哥白尼-牛顿)',why:'"宇宙遵循数学规律",启蒙与工业革命的引擎'},
    {what:'新教伦理',from:'宗教改革(路德/加尔文)',why:'影响资本主义精神与北美建国'},
    {what:'土豆/玉米/番茄等作物',from:'哥伦布大交换',why:'美洲作物传遍世界,深刻改变全球饮食与人口'},
  ],
};

if (typeof module !== 'undefined') module.exports = { CIV_DEEP, EVENT_DEEP, PERSON_DEEP, CIV_MAP, CIV_MYTHS, SITE_MODERN, CHAPTERS, FINAL_OVERVIEW, EARLY_CIV_EXPLORER };
