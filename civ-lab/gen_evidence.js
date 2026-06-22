// 生成 evidence_data.js —— 证据侦探(六章全覆盖)
global.window={};const fs=require('fs');
const WORLD_CIVS=new Function(fs.readFileSync('meanwhile_data.js','utf8')+'\nreturn WORLD_CIVS;')();
const W={}; WORLD_CIVS.forEach(c=>W[c.id]={name:c.name,region:c.region});
function load(file){try{let pre='';try{pre=fs.readFileSync(file.replace('_deep','_people'),'utf8')+'\n';}catch(e){}
  return new Function('window',pre+fs.readFileSync(file,'utf8')+'\nreturn {EVENT_DEEP:typeof EVENT_DEEP!=="undefined"?EVENT_DEEP:{},CIV_EVENTS:typeof CIV_EVENTS!=="undefined"?CIV_EVENTS:{},CIV_META:typeof CIV_META!=="undefined"?CIV_META:[]};')({});
}catch(e){console.error(file,e.message);return{EVENT_DEEP:{},CIV_EVENTS:{},CIV_META:[]};}}
function invert(ce){const m={};for(const c in ce)(ce[c]||[]).forEach(e=>{if(!m[e])m[e]=c;});return m;}
const chSrc=fs.readFileSync('chapters_data.js','utf8');
const earlyMap={}; {const re=/id:\s*'([a-z_]+)'[\s\S]*?L3_events:\s*\[([^\]]*)\]/g;let m;while(m=re.exec(chSrc)){const c=m[1];(m[2].match(/'([^']+)'/g)||[]).forEach(x=>{const id=x.replace(/'/g,'');if(!earlyMap[id])earlyMap[id]=c;});}}
const CHAPTERS=[
  ['early_civ_deep.js','early','早期文明',earlyMap],
  ['classical_deep.js','classical','古典',null],
  ['medieval_deep.js','medieval','中世纪',null],
  ['global_deep.js','global','近代·全球',null],
  ['modern_deep.js','modern','工业·现代',null],
  ['contemporary_deep.js','contemporary','当代',null],
];
const EV=[];
CHAPTERS.forEach(([file,chap,label,emap])=>{
  const {EVENT_DEEP,CIV_EVENTS,CIV_META}=load(file);
  const e2c = emap || invert(CIV_EVENTS);
  const civName={}; CIV_META.forEach(c=>civName[c.id]=c.name);
  for(const eid in EVENT_DEEP){
    const e=EVENT_DEEP[eid]; if(!e.evidence||!e.evidence.length) continue;
    const civ=e2c[eid]; if(!civ) continue;
    const name=(W[civ]&&W[civ].name)||civName[civ]||civ;
    const region=(W[civ]&&W[civ].region)||label;
    e.evidence.forEach(ev=>{ if(!ev.artifact||!ev.what) return;
      EV.push({artifact:ev.artifact,what:ev.what,held:ev.held||'',civ,civName:name,region,chapter:chap,eventId:eid,eventTitle:e.full_title||eid});
    });
  }
});
fs.writeFileSync('evidence_data.js',`// 自动生成(gen_evidence.js) —— 证据侦探(六章)\nconst EVIDENCE=${JSON.stringify(EV)};\n`);
const byChap={}; EV.forEach(e=>byChap[e.chapter]=(byChap[e.chapter]||0)+1);
console.log('证据条目',EV.length,JSON.stringify(byChap));
