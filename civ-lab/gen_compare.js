// 生成 compare_data.js —— 文明对比工作台(六章全覆盖)
global.window={};const fs=require('fs');
const WORLD_CIVS=new Function(fs.readFileSync('meanwhile_data.js','utf8')+'\nreturn WORLD_CIVS;')();
const REGION_OF={}; WORLD_CIVS.forEach(c=>REGION_OF[c.id]=c.region);
function load(file){try{
  let pre=''; try{ pre=fs.readFileSync(file.replace('_deep','_people'),'utf8')+'\n'; }catch(e){}
  return new Function('window',pre+fs.readFileSync(file,'utf8')+'\nreturn {CIV_DEEP:typeof CIV_DEEP!=="undefined"?CIV_DEEP:{},CIV_META:typeof CIV_META!=="undefined"?CIV_META:[]};')({});
}catch(e){console.error(file,e.message);return{CIV_DEEP:{},CIV_META:[]};}}
const CHAPTERS=[
  ['early_civ_deep.js','early','早期文明'],
  ['classical_deep.js','classical','古典'],
  ['medieval_deep.js','medieval','中世纪'],
  ['global_deep.js','global','近代·全球'],
  ['modern_deep.js','modern','工业·现代'],
  ['contemporary_deep.js','contemporary','当代'],
];
const COMPARE_CIVS=[];
CHAPTERS.forEach(([file,chap,label])=>{
  const {CIV_DEEP,CIV_META}=load(file);
  // 早期文明无 CIV_META,从 WORLD_CIVS 取(含 name/icon/region)
  const meta = (CIV_META&&CIV_META.length) ? CIV_META : WORLD_CIVS.filter(c=>c.chapter==='early').map(c=>({id:c.id,name:c.name,icon:c.icon,start:c.s,end:c.e}));
  meta.forEach(c=>{
    const d=CIV_DEEP[c.id]; if(!d) return;
    const inv=(d.nine_inventions||[]).slice(0,4).map(x=>x.name||x).filter(Boolean);
    COMPARE_CIVS.push({
      id:c.id,name:c.name,region:REGION_OF[c.id]||label,chapter:chap,icon:c.icon||'•',s:c.start,e:c.end,
      capital:d.capital_at_peak||'—',territory:d.territory_max||'—',population:d.population_peak||'—',
      language:d.language||'—',writing:d.writing||'—',religion:d.religion||'—',economy:d.economy||'—',
      inventions:inv,collapse:(d.collapse_chain&&d.collapse_chain.length?d.collapse_chain[d.collapse_chain.length-1]:'—')
    });
  });
});
fs.writeFileSync('compare_data.js',`// 自动生成(gen_compare.js) —— 文明对比(六章)\nconst COMPARE_CIVS=${JSON.stringify(COMPARE_CIVS)};\n`);
const byChap={}; COMPARE_CIVS.forEach(c=>byChap[c.chapter]=(byChap[c.chapter]||0)+1);
console.log('可对比文明',COMPARE_CIVS.length,JSON.stringify(byChap));
