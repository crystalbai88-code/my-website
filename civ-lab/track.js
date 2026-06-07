// 历史思维画像 · 共享行为记录(localStorage,本地,不上传)
window.Track=(function(){
  const KEY='civlab_track_v1';
  function read(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return{};}}
  function write(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}}
  const d=read();
  d.visits=d.visits||{}; d.features=d.features||{}; d.tags=d.tags||{}; d.regions=d.regions||{}; d.firstSeen=d.firstSeen||Date.now();
  const page=(location.pathname.split('/').pop()||'index').replace('.html','')||'index';
  d.visits[page]=(d.visits[page]||0)+1; d.lastSeen=Date.now();
  write(d);
  return {
    log(cat){const x=read();x.features=x.features||{};x.features[cat]=(x.features[cat]||0)+1;write(x);},
    tag(t){const x=read();x.tags=x.tags||{};x.tags[t]=(x.tags[t]||0)+1;write(x);},
    region(r){if(!r)return;const x=read();x.regions=x.regions||{};x.regions[r]=(x.regions[r]||0)+1;write(x);},
    all(){return read();},
    reset(){localStorage.removeItem(KEY);}
  };
})();
