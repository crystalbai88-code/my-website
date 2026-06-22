// 下载各关系网人物的维基真实画像到本地 portraits/(用 curl,绕过 Node fetch 限制)
const fs=require('fs'), path=require('path'), {execSync}=require('child_process');
const UA='CivLab/1.0 (educational history app; contact@ai00.tech)';
const OUT='portraits'; if(!fs.existsSync(OUT)) fs.mkdirSync(OUT);
function loadVars(file,names){ let s=fs.readFileSync(file,'utf8').replace(/if ?\(typeof window[\s\S]*/,'');
  return (new Function(s+'\n;return {'+names.map(n=>`${n}:(typeof ${n}!=="undefined"?${n}:undefined)`).join(',')+'};'))(); }
function extractWiki(html){ const m=/const WIKI_TITLE=(\{[\s\S]*?\});/.exec(fs.readFileSync(html,'utf8')); if(!m)return{}; try{return (new Function('return '+m[1]))();}catch(e){return{};} }
function curlJSON(url){ const out=execSync(`curl -s -m 30 -H ${JSON.stringify('User-Agent: '+UA)} ${JSON.stringify(url)}`,{maxBuffer:1e8}).toString(); return JSON.parse(out); }
function curlSave(url,file){ execSync(`curl -s -m 40 -H ${JSON.stringify('User-Agent: '+UA)} -o ${JSON.stringify(file)} ${JSON.stringify(url)}`); return fs.existsSync(file)&&fs.statSync(file).size>500; }

const chapters=['early','classical','medieval','global','modern','contemporary'];
const PEOPLE={};
for(const ch of chapters){ let cp; try{ cp=loadVars(ch+'_people.js',['CLASSICAL_PEOPLE']).CLASSICAL_PEOPLE; }catch(e){ continue; }
  const wiki=extractWiki(ch+'-network.html');
  cp.forEach(p=>{ if(PEOPLE[p.id])return; const t=wiki[p.id]||(p.n||'').replace(/[（(].*?[)）]/g,'').trim(); if(t)PEOPLE[p.id]=t; }); }
const ids=Object.keys(PEOPLE); console.log('总人物:',ids.length);

const manifest={}; let got=0,fail=0;
for(let i=0;i<ids.length;i+=40){
  const chunk=ids.slice(i,i+40);
  const titleToId={}; chunk.forEach(id=>titleToId[PEOPLE[id]]=id);
  const url='https://zh.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=240&titles='+encodeURIComponent(chunk.map(id=>PEOPLE[id]).join('|'));
  let j; try{ j=curlJSON(url); }catch(e){ console.error('batch',i,'fail',e.message.slice(0,60)); continue; }
  const q=j.query||{}; const back={};
  (q.normalized||[]).forEach(n=>back[n.to]=n.from);
  (q.redirects||[]).forEach(rr=>back[rr.to]=back[rr.from]||rr.from);
  const resolve=t=>{ let cur=t,g=0; while(g++<5){ if(titleToId[cur])return titleToId[cur]; if(back[cur]){cur=back[cur];continue;} break;} return titleToId[cur]||null; };
  for(const pg of Object.values(q.pages||{})){
    const id=resolve(pg.title); if(!id)continue;
    if(pg.thumbnail&&pg.thumbnail.source){
      const src=pg.thumbnail.source; const ext=(src.match(/\.(jpg|jpeg|png|gif)/i)||['','jpg'])[1].toLowerCase().replace('jpeg','jpg');
      const fname=id+'.'+ext;
      try{ if(curlSave(src,path.join(OUT,fname))){ manifest[id]=fname; got++; } else fail++; }catch(e){ fail++; }
    }
  }
  process.stdout.write(`\r批次 ${Math.floor(i/40)+1}: 已下载 ${got}, 失败 ${fail}   `);
}
fs.writeFileSync(path.join(OUT,'manifest.js'),'// 本地画像清单 id->文件名(自动生成)\nconst PORTRAITS='+JSON.stringify(manifest)+';\nif(typeof window!=="undefined")window.PORTRAITS=PORTRAITS;\n');
console.log('\n完成: 下载',got,'失败',fail,'清单',Object.keys(manifest).length);
