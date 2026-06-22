// 抉择时刻数据 · 世界地图钉子 + 文明时间轴 共用。新增抉择只改这一处。
// 用 IIFE 只挂到 window.DECISIONS,避免与 map.html 内的 const DECISIONS 重复声明。
(function(){
  var DECISIONS=[
    {id:'shangyang', person:'商鞅', icon:'⚖️', culture:'china', lng:108.9, lat:34.3, year:-356, from:-410, to:-211,
     tip:'太子犯了你的新法,罚,还是不罚?', url:'./decision-shangyang.html'},
    {id:'socrates', person:'苏格拉底', icon:'🏛️', culture:'greece', lng:23.7, lat:38.0, year:-399, from:-430, to:-360,
     tip:'门开着,你逃,还是留下赴死?', url:'./decision-socrates.html'},
    {id:'hanwudi', person:'汉武帝', icon:'👑', culture:'china', lng:108.9, lat:34.3, year:-133, from:-140, to:-87,
     tip:'打,还是不打匈奴?用整个国家去赌。', url:'./decision-hanwudi.html'},
    {id:'suiyangdi', person:'隋炀帝', icon:'👷', culture:'china', lng:112.4, lat:34.7, year:605, from:600, to:625,
     tip:'要不要倾举国之力,开凿大运河?', url:'./decision-suiyangdi.html'},
    {id:'hanxin', person:'韩信', icon:'⚔️', culture:'china', lng:118.3, lat:36.8, year:-203, from:-210, to:-196,
     tip:'三分天下自立,还是报恩忠于刘邦?', url:'./decision-hanxin.html'},
    {id:'wuqi', person:'吴起', icon:'🗡️', culture:'china', lng:112.2, lat:30.3, year:-381, from:-388, to:-372,
     tip:'楚王把改革的刀交给你,要不要硬削贵族特权?', url:'./decision-wuqi.html'},
    {id:'more', person:'托马斯·莫尔', icon:'📜', culture:'europe', lng:-0.1, lat:51.5, year:1534, from:1529, to:1540,
     tip:'国王要你签字违背良心,签,还是不签?', url:'./decision-more.html'},
    {id:'hongmenyan', person:'鸿门宴', icon:'🍷', culture:'china', lng:109.2, lat:34.4, year:-206, from:-207, to:-202,
     tip:'席间杀机:杀掉刘邦,还是放他一马?', url:'./decision-hongmenyan.html'},
    {id:'leonidas', person:'列奥尼达 · 温泉关', icon:'🛡️', culture:'greece', lng:22.5, lat:38.8, year:-480, from:-485, to:-475,
     tip:'三百人挡百万大军,死守,还是撤退?', url:'./decision-leonidas.html'},
    {id:'jingke', person:'荆轲刺秦', icon:'🗡️', culture:'china', lng:115.5, lat:39.3, year:-227, from:-230, to:-222,
     tip:'明知一去不还,你上路刺秦吗?', url:'./decision-jingke.html'},
    {id:'lishimin', person:'李世民 · 玄武门', icon:'🏯', culture:'china', lng:108.9, lat:34.3, year:626, from:622, to:635,
     tip:'兄弟要害你,先下手杀兄夺位,还是隐忍?', url:'./decision-lishimin.html'},
    {id:'caesar', person:'凯撒过卢比孔', icon:'🦅', culture:'rome', lng:12.4, lat:44.1, year:-49, from:-52, to:-44,
     tip:'过河就是内战,回头就是受审——你过不过?', url:'./decision-caesar.html'},
    {id:'julu', person:'项羽破釜沉舟', icon:'🔥', culture:'china', lng:115.0, lat:37.2, year:-207, from:-208, to:-206,
     tip:'几万人拼四十万,要不要砸锅沉船断退路?', url:'./decision-julu.html'},
    {id:'gilgamesh', person:'吉尔伽美什', icon:'🦁', culture:'mesopotamia', lng:45.6, lat:31.3, year:-2700, from:-2800, to:-2500,
     tip:'挚友死了,你要去寻找永生吗?', url:'./decision-gilgamesh.html'},
    {id:'qinshihuang', person:'秦始皇求仙', icon:'⚗️', culture:'china', lng:119.5, lat:35.6, year:-215, from:-219, to:-210,
     tip:'拥有一切,要不要倾国之力追求长生不老?', url:'./decision-qinshihuang.html'},
    {id:'arjuna', person:'阿周那的两难', icon:'🏹', culture:'india', lng:76.8, lat:29.9, year:-1000, from:-1100, to:-900,
     tip:'对面是亲人,这一仗,打还是不打?', url:'./decision-arjuna.html'},
  ];
  if(typeof window!=='undefined') window.DECISIONS=DECISIONS;
})();
