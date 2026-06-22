// 生成 meanwhile_data.js —— 从三章现有数据按"年份+区域"归一化
global.window = {};
const fs = require('fs');

// ── 1. 权威文明时间带(三章合并)+ 区域 ──
const REGIONS = ['东亚','南亚','西亚·中东','欧洲','非洲','美洲','东南亚','全球'];
const WORLD_CIVS = [
  // 东亚
  {id:'shang',name:'商朝',s:-1600,e:-1046,region:'东亚',icon:'⚱️',chapter:'early'},
  {id:'xizhou',name:'西周',s:-1046,e:-771,region:'东亚',icon:'🏯',chapter:'classical'},
  {id:'chunqiu',name:'春秋',s:-770,e:-476,region:'东亚',icon:'📜',chapter:'classical'},
  {id:'zhanguo',name:'战国',s:-475,e:-221,region:'东亚',icon:'⚔️',chapter:'classical'},
  {id:'qin',name:'秦朝',s:-221,e:-206,region:'东亚',icon:'🐉',chapter:'classical'},
  {id:'xihan',name:'西汉',s:-202,e:8,region:'东亚',icon:'🐎',chapter:'classical'},
  {id:'donghan',name:'东汉',s:25,e:220,region:'东亚',icon:'📃',chapter:'classical'},
  {id:'tang',name:'唐朝',s:618,e:907,region:'东亚',icon:'🏯',chapter:'medieval'},
  {id:'song',name:'宋朝',s:960,e:1279,region:'东亚',icon:'🧭',chapter:'medieval'},
  {id:'mongol',name:'蒙古帝国·元',s:1206,e:1368,region:'东亚',icon:'🐎',chapter:'medieval'},
  {id:'heian',name:'平安日本',s:794,e:1185,region:'东亚',icon:'🌸',chapter:'medieval'},
  {id:'shogunate',name:'幕府日本',s:1185,e:1573,region:'东亚',icon:'🏯',chapter:'medieval'},
  // 南亚
  {id:'indus',name:'印度河文明',s:-2600,e:-1900,region:'南亚',icon:'🧱',chapter:'early'},
  {id:'magadha',name:'摩揭陀·佛陀',s:-600,e:-321,region:'南亚',icon:'☸️',chapter:'classical'},
  {id:'maurya',name:'孔雀王朝',s:-321,e:-185,region:'南亚',icon:'🦁',chapter:'classical'},
  {id:'gupta',name:'笈多王朝',s:320,e:550,region:'南亚',icon:'🕉️',chapter:'classical'},
  {id:'chola',name:'朱罗帝国',s:850,e:1279,region:'南亚',icon:'🛕',chapter:'medieval'},
  {id:'delhi_sultanate',name:'德里苏丹国',s:1206,e:1526,region:'南亚',icon:'🕌',chapter:'medieval'},
  // 西亚·中东
  {id:'sumer',name:'苏美尔',s:-3500,e:-2004,region:'西亚·中东',icon:'📜',chapter:'early'},
  {id:'akkad',name:'阿卡德帝国',s:-2334,e:-2154,region:'西亚·中东',icon:'👑',chapter:'early'},
  {id:'babylon',name:'古巴比伦',s:-1894,e:-1595,region:'西亚·中东',icon:'⚖️',chapter:'early'},
  {id:'hittite',name:'赫梯帝国',s:-1600,e:-1180,region:'西亚·中东',icon:'🛡️',chapter:'early'},
  {id:'assyria',name:'新亚述',s:-911,e:-609,region:'西亚·中东',icon:'🏹',chapter:'classical'},
  {id:'neobabylon',name:'新巴比伦',s:-626,e:-539,region:'西亚·中东',icon:'🦁',chapter:'classical'},
  {id:'achaemenid',name:'波斯帝国',s:-550,e:-330,region:'西亚·中东',icon:'👑',chapter:'classical'},
  {id:'phoenicia',name:'腓尼基',s:-1000,e:-539,region:'西亚·中东',icon:'⚓',chapter:'classical'},
  {id:'israel',name:'以色列·犹大',s:-1020,e:-586,region:'西亚·中东',icon:'✡️',chapter:'classical'},
  {id:'islam_rise',name:'伊斯兰·早期哈里发',s:610,e:750,region:'西亚·中东',icon:'☪️',chapter:'medieval'},
  {id:'abbasid',name:'阿拔斯·巴格达',s:750,e:1258,region:'西亚·中东',icon:'📖',chapter:'medieval'},
  // 欧洲
  {id:'minoan',name:'米诺斯',s:-2000,e:-1450,region:'欧洲',icon:'🐂',chapter:'early'},
  {id:'mycenae',name:'迈锡尼',s:-1600,e:-1100,region:'欧洲',icon:'🦁',chapter:'early'},
  {id:'greece_archaic',name:'古风希腊',s:-800,e:-508,region:'欧洲',icon:'🏺',chapter:'classical'},
  {id:'greece_classical',name:'古典希腊',s:-508,e:-338,region:'欧洲',icon:'🏛️',chapter:'classical'},
  {id:'macedon',name:'马其顿·亚历山大',s:-359,e:-323,region:'欧洲',icon:'🐎',chapter:'classical'},
  {id:'hellenistic',name:'希腊化世界',s:-323,e:-30,region:'欧洲',icon:'📐',chapter:'classical'},
  {id:'roman_republic',name:'罗马共和国',s:-509,e:-27,region:'欧洲',icon:'🦅',chapter:'classical'},
  {id:'roman_empire',name:'罗马帝国',s:-27,e:395,region:'欧洲',icon:'🏛️',chapter:'classical'},
  {id:'christianity',name:'基督教兴起',s:30,e:400,region:'欧洲',icon:'✝️',chapter:'classical'},
  {id:'byzantine',name:'拜占庭',s:330,e:1453,region:'欧洲',icon:'⛪',chapter:'medieval'},
  {id:'kievan_rus',name:'基辅罗斯',s:882,e:1240,region:'欧洲',icon:'🏰',chapter:'medieval'},
  {id:'vikings',name:'维京',s:793,e:1066,region:'欧洲',icon:'🪓',chapter:'medieval'},
  {id:'franks',name:'法兰克·加洛林',s:481,e:887,region:'欧洲',icon:'👑',chapter:'medieval'},
  {id:'medieval_europe',name:'中世纪欧洲',s:500,e:1500,region:'欧洲',icon:'🏰',chapter:'medieval'},
  {id:'crusades',name:'十字军',s:1096,e:1291,region:'欧洲',icon:'✝️',chapter:'medieval'},
  // 非洲
  {id:'egypt_old',name:'古埃及·古王国',s:-2686,e:-2181,region:'非洲',icon:'🔺',chapter:'early'},
  {id:'egypt_mid',name:'古埃及·中王国',s:-2055,e:-1650,region:'非洲',icon:'🌅',chapter:'early'},
  {id:'egypt_new',name:'古埃及·新王国',s:-1550,e:-1070,region:'非洲',icon:'👁️',chapter:'early'},
  {id:'mali',name:'马里帝国',s:1235,e:1540,region:'非洲',icon:'💰',chapter:'medieval'},
  {id:'great_zimbabwe',name:'大津巴布韦',s:1100,e:1450,region:'非洲',icon:'🪨',chapter:'medieval'},
  // 美洲
  {id:'maya',name:'玛雅',s:250,e:900,region:'美洲',icon:'🗿',chapter:'medieval'},
  {id:'aztec',name:'阿兹特克',s:1428,e:1521,region:'美洲',icon:'🌽',chapter:'medieval'},
  {id:'inca',name:'印加',s:1438,e:1533,region:'美洲',icon:'🏔️',chapter:'medieval'},
  // 东南亚
  {id:'khmer',name:'高棉·吴哥',s:802,e:1431,region:'东南亚',icon:'🛕',chapter:'medieval'},
  {id:'srivijaya',name:'室利佛逝',s:650,e:1377,region:'东南亚',icon:'⛵',chapter:'medieval'},
];
const CIV_REGION = {}; const CIV_NAME = {};
WORLD_CIVS.forEach(c=>{CIV_REGION[c.id]=c.region;CIV_NAME[c.id]=c.name;});
// 早期文明事件/人物用的细分文明也归并
Object.assign(CIV_REGION,{egypt_predynastic:'非洲',collapse:'欧洲'});
// ── 新三章(全球/工业现代/当代): civ时间带 + region ──
[['global_deep.js','global',{exploration:'欧洲',spain:'欧洲',dutch:'欧洲',britain:'欧洲',france:'欧洲',reform:'欧洲',science:'欧洲',ottoman:'西亚·中东',china:'东亚',japan:'东亚'}],
 ['modern_deep.js','modern',{industrial:'欧洲',french_rev:'欧洲',unification:'欧洲',imperialism:'欧洲',meiji:'东亚',ww1:'欧洲',ww2:'全球'}],
 ['contemporary_deep.js','contemporary',{un:'全球',coldwar:'全球',globalization:'全球',internet:'全球',ai:'全球',climate:'全球',space:'全球'}]
].forEach(([file,chap,reg])=>{ const m=loadDeep(file); (m.CIV_META||[]).forEach(c=>{ const region=reg[c.id]||'全球'; WORLD_CIVS.push({id:c.id,name:c.name,s:c.start,e:c.end,region,icon:c.icon||'•',chapter:chap}); CIV_REGION[c.id]=region; CIV_NAME[c.id]=c.name; }); });

// 人物 c 代码 → 区域
const PC_REGION = {china:'东亚',japan:'东亚',steppe:'东亚',korea:'东亚',
  india:'南亚',
  islam:'西亚·中东',near_east:'西亚·中东',levant:'西亚·中东',persia:'西亚·中东',mesopotamia:'西亚·中东',anatolia:'西亚·中东',
  greece:'欧洲',rome:'欧洲',byzantine:'欧洲',europe:'欧洲',aegean:'欧洲',
  egypt:'非洲',africa:'非洲',
  americas:'美洲',
  sea:'东南亚',
  iberia:'欧洲',dutch:'欧洲',britain:'欧洲',france:'欧洲',reform:'欧洲',science:'欧洲',ottoman:'西亚·中东',
  industrial:'欧洲',french:'欧洲',empire:'欧洲',unify:'欧洲',meiji:'东亚',ww1:'欧洲',ww2:'全球',
  un:'全球',coldwar:'全球',globalization:'全球',internet:'全球',ai:'全球',climate:'全球',space:'全球'};

// ── 年份解析 ──
function parseYear(str){
  if(!str) return null;
  let m=String(str).match(/前\s*(\d+)/); if(m) return -parseInt(m[1]);
  m=String(str).match(/~?\s*(\d+)\s*BCE/i); if(m) return -parseInt(m[1]);
  m=String(str).match(/公元\s*(\d+)/); if(m) return parseInt(m[1]);
  m=String(str).match(/(\d{3,4})/); if(m) return parseInt(m[1]);
  return null;
}

// ── 提取事件 ──
const WORLD_EVENTS = [];
function extractEvents(deepSrc, eventCivMapSrc){
  const scope={};
  eval(deepSrc.replace(/^const /gm,'scope.').replace(/scope\.(\w+)\s*=/,(m,n)=>{scope.__first=n;return 'scope.'+n+'=';}));
  // 重新用更简单方式:在隔离作用域内 eval, 收集 EVENT_DEEP / CIV_EVENTS
}

// 用 Function 隔离执行各 deep, 取出 EVENT_DEEP/PERSON_DEEP/CIV_EVENTS
function loadDeep(file){
  const src=fs.readFileSync(file,'utf8');
  const grab=`return {EVENT_DEEP:typeof EVENT_DEEP!=='undefined'?EVENT_DEEP:{}, PERSON_DEEP:typeof PERSON_DEEP!=='undefined'?PERSON_DEEP:{}, CIV_EVENTS:typeof CIV_EVENTS!=='undefined'?CIV_EVENTS:{}, CIV_META:typeof CIV_META!=='undefined'?CIV_META:[], CLASSICAL_PEOPLE:typeof CLASSICAL_PEOPLE!=='undefined'?CLASSICAL_PEOPLE:null};`;
  try{ return new Function('window',src+'\n'+grab)({}); }
  catch(e){ console.error('load fail',file,e.message); return {EVENT_DEEP:{},PERSON_DEEP:{},CIV_EVENTS:{}}; }
}

function eventYearOf(e){
  if(e.what_happened&&e.what_happened.length){const y=parseYear(e.what_happened[0]);if(y!=null)return y;}
  if(e.one_liner){const y=parseYear(e.one_liner);if(y!=null)return y;}
  if(e.narrative){const y=parseYear(e.narrative);if(y!=null)return y;}
  return null;
}

function addEventsFrom(deep, eventToCiv){
  for(const eid in deep.EVENT_DEEP){
    const e=deep.EVENT_DEEP[eid];
    const y=eventYearOf(e); if(y==null) continue;
    const civ=eventToCiv[eid]||null;
    const region=civ?CIV_REGION[civ]:null;
    if(!region) continue;
    if(WORLD_EVENTS.find(x=>x.id===eid)) continue;
    WORLD_EVENTS.push({id:eid,year:y,region,civ,civName:CIV_NAME[civ]||civ,title:(e.full_title||eid),one:(e.one_liner||'')});
  }
}

// 反转 CIV_EVENTS: eventId->civ
function invert(civEvents){const m={};for(const civ in civEvents)(civEvents[civ]||[]).forEach(eid=>{if(!m[eid])m[eid]=civ;});return m;}

// 古典 + 中世纪
const cls=loadDeep('classical_deep.js');
const med=loadDeep('medieval_deep.js');
addEventsFrom(cls, invert(cls.CIV_EVENTS));
addEventsFrom(med, invert(med.CIV_EVENTS));
// 早期: 事件->civ 来自 chapters_data.js L3_events
const chSrc=fs.readFileSync('chapters_data.js','utf8');
const earlyEventToCiv={};
{ const re=/id:\s*'([a-z_]+)'[\s\S]*?L3_events:\s*\[([^\]]*)\]/g; let m;
  while(m=re.exec(chSrc)){ const civ=m[1]; (m[2].match(/'([^']+)'/g)||[]).forEach(x=>{const id=x.replace(/'/g,'');if(!earlyEventToCiv[id])earlyEventToCiv[id]=civ;}); } }
const early=loadDeep('early_civ_deep.js');
addEventsFrom(early, earlyEventToCiv);
// 新三章事件
['global_deep.js','modern_deep.js','contemporary_deep.js'].forEach(f=>{ const m=loadDeep(f); addEventsFrom(m, invert(m.CIV_EVENTS)); });

// ── 提取人物 ──
const WORLD_PEOPLE=[];
function addPeopleClassical(arr,ch){
  if(!arr) return;
  arr.forEach(p=>{
    const region=PC_REGION[p.c]; if(!region) return;
    const y=parseYear(p.d); if(y==null) return;
    WORLD_PEOPLE.push({id:p.id,name:p.n,year:y,region,role:p.r||'',civc:p.c});
  });
}
function loadPeople(file){
  try{ const src=fs.readFileSync(file,'utf8'); return new Function('window',src+'\nreturn typeof CLASSICAL_PEOPLE!=="undefined"?CLASSICAL_PEOPLE:[];')({}); }
  catch(e){ console.error('people load fail',file,e.message); return []; }
}
addPeopleClassical(loadPeople('classical_people.js'),'classical');
addPeopleClassical(loadPeople('medieval_people.js'),'medieval');
addPeopleClassical(loadPeople('global_people.js'),'global');
addPeopleClassical(loadPeople('modern_people.js'),'modern');
addPeopleClassical(loadPeople('contemporary_people.js'),'contemporary');
// 早期人物: PERSON_DEEP lifespan + chapters L4_people->civ
const earlyPersonToCiv={};
{ const re=/id:\s*'([a-z_]+)'[\s\S]*?L4_people:\s*\[([^\]]*)\]/g; let m;
  while(m=re.exec(chSrc)){ const civ=m[1]; (m[2].match(/'([^']+)'/g)||[]).forEach(x=>{const id=x.replace(/'/g,'');if(!earlyPersonToCiv[id])earlyPersonToCiv[id]=civ;}); } }
for(const pid in early.PERSON_DEEP){
  const civ=earlyPersonToCiv[pid]; const region=civ?CIV_REGION[civ]:null; if(!region) continue;
  const p=early.PERSON_DEEP[pid];
  const y=parseYear(p.lifespan_real)||parseYear(p.lifespan_mythic); if(y==null) continue;
  const nm=(p.full_name||pid).split(/[·\s]/)[0];
  WORLD_PEOPLE.push({id:pid,name:nm,year:y,region,role:'',civc:civ});
}

WORLD_EVENTS.sort((a,b)=>a.year-b.year);
WORLD_PEOPLE.sort((a,b)=>a.year-b.year);

const out=`// 自动生成 (gen_meanwhile.js) —— 「此时世界」归一化数据层
// 三章合并: 文明时间带 + 事件 + 人物, 按 年份+区域 索引
const REGIONS=${JSON.stringify(REGIONS)};
const WORLD_CIVS=${JSON.stringify(WORLD_CIVS)};
const WORLD_EVENTS=${JSON.stringify(WORLD_EVENTS)};
const WORLD_PEOPLE=${JSON.stringify(WORLD_PEOPLE)};
`;
fs.writeFileSync('meanwhile_data.js',out);
console.log('文明',WORLD_CIVS.length,'事件',WORLD_EVENTS.length,'人物',WORLD_PEOPLE.length);
console.log('事件区域分布:',REGIONS.map(r=>r+':'+WORLD_EVENTS.filter(e=>e.region===r).length).join(' '));
console.log('人物区域分布:',REGIONS.map(r=>r+':'+WORLD_PEOPLE.filter(e=>e.region===r).length).join(' '));
