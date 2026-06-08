/* ════════════════════════════════════════════════════════════════
   一键自动导览 (Auto Tour) — 人物关系网"懒人友好"交互
   点一下,镜头自动在人物之间飞行,逐个高亮+旁白讲故事,用户只需看。
   依赖宿主页面提供 window.__net 适配器:
     nodes()    -> 当前可见节点数组 [{id,x,y,data}]
     edges()    -> 当前可见关系数组 [{a,b,t,cat}]
     byId(id)   -> 人物数据
     viewport() -> {W,H}
     getCamera()-> {panX,panY,scale}
     setCamera(panX,panY,scale)
     select(id) -> 高亮该人物(通常调用 showDetail)
     deselect() -> 取消选中
     freeze()   -> 停止力导向漂移(alpha=0)
   ════════════════════════════════════════════════════════════════ */
(function(){
  if(!window.__net){ console.warn('[tour] window.__net 适配器缺失,导览未启用'); return; }
  const NET=window.__net;

  // ── 关系文字 → 自然旁白动词 ──
  function relPhrase(t){
    t=t||'';
    if(/师|徒|弟子|学生|门生|授业|衣钵|传法|传承|私淑|启发|影响|译/.test(t)) return '把思想传给了';
    if(/父|子|母|女|祖|孙|兄|弟/.test(t))           return '的至亲';
    if(/妻|夫|嫁|联姻|后/.test(t))                   return '与之联姻';
    if(/敌|战|征|攻|杀|刺|灭|宿敌|对抗|入侵|起义|镇压/.test(t)) return '的对手';
    if(/臣|辅|效力|重用|提拔|进谏|麾下|部下|继位|册封|拥立|摄政/.test(t)) return '的得力之人';
    if(/盟|友|挚友|结盟|支持|同盟|共事|同朝|同时代/.test(t))     return '的盟友';
    return '关联着';
  }

  // ── 根据当前关系网,排出一条"故事路径"(贪心走图,尽量连成一条线) ──
  function buildSequence(){
    const ns=NET.nodes(); const es=NET.edges();
    if(!ns.length) return [];
    const adj={}; ns.forEach(n=>adj[n.id]=[]);
    es.forEach(e=>{ if(adj[e.a]&&adj[e.b]){ adj[e.a].push({to:e.b,t:e.t}); adj[e.b].push({to:e.a,t:e.t}); } });
    const deg=id=>(adj[id]||[]).length;
    const order=ns.slice().sort((a,b)=>deg(b.id)-deg(a.id)); // 度数高的先
    const seen=new Set(); const seq=[];
    function walk(startId){
      let cur=startId, relIn=null;
      while(cur && !seen.has(cur)){
        seen.add(cur);
        seq.push({id:cur, rel:relIn});
        // 选一个"还没去过、度数最高"的邻居,让故事尽量延续
        const nbrs=(adj[cur]||[]).filter(x=>!seen.has(x.to));
        if(!nbrs.length){ cur=null; break; }
        nbrs.sort((a,b)=>deg(b.to)-deg(a.to));
        relIn=nbrs[0].t; cur=nbrs[0].to;
      }
    }
    order.forEach(n=>{ if(!seen.has(n.id)) walk(n.id); });
    return seq;
  }

  // ── 注入 UI ──
  const css=`
  #tourFab{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:60;
    font-family:var(--sans,system-ui);font-weight:800;font-size:15px;color:#fff;
    background:linear-gradient(90deg,#c86820,#b83018);border:none;border-radius:999px;
    padding:13px 26px;cursor:pointer;box-shadow:0 6px 22px #0006;display:flex;align-items:center;gap:9px;
    transition:transform .15s,box-shadow .15s}
  #tourFab:hover{transform:translateX(-50%) translateY(-2px);box-shadow:0 9px 28px #0007}
  #tourFab .pulse{display:inline-block;width:9px;height:9px;border-radius:50%;background:#ffe;animation:tpulse 1.4s infinite}
  @keyframes tpulse{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.25)}}
  #tourCard{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:61;
    width:min(560px,calc(100vw - 28px));display:none;
    background:var(--panel-bg,rgba(20,24,38,.92));border:1px solid var(--panel-line,#3a3f55);
    border-radius:18px;backdrop-filter:blur(14px);box-shadow:0 10px 40px #0007;overflow:hidden}
  #tourCard.show{display:block;animation:tcin .3s ease}
  @keyframes tcin{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  #tourCard .tprog{height:3px;background:rgba(255,255,255,.12)}
  #tourCard .tprog i{display:block;height:100%;background:linear-gradient(90deg,#d4a858,#c86820);width:0;transition:width .25s}
  #tourCard .tbody{padding:13px 17px 6px}
  #tourCard .trel{font-family:var(--sans,system-ui);font-size:12px;color:var(--gold,#d4a858);
    font-weight:700;margin-bottom:5px;line-height:1.5;min-height:16px}
  #tourCard .thead{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap}
  #tourCard .tname{font-family:var(--serif,serif);font-size:21px;font-weight:900;color:var(--ink,#eee);line-height:1.2}
  #tourCard .trole{font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:999px}
  #tourCard .tdate{font-family:var(--mono,monospace);font-size:11px;color:var(--ink3,#888)}
  #tourCard .tbio{font-size:13px;color:var(--ink,#ddd);line-height:1.68;margin:7px 0 2px}
  #tourCard .tctrl{display:flex;align-items:center;gap:6px;padding:8px 14px 12px}
  #tourCard .tctrl .tcount{font-family:var(--mono,monospace);font-size:11px;color:var(--ink3,#888);margin-right:auto}
  #tourCard .tbtn{font-family:var(--sans,system-ui);font-size:13px;font-weight:700;color:var(--ink2,#bbb);
    background:rgba(255,255,255,.06);border:1px solid var(--panel-line,#3a3f55);border-radius:999px;
    padding:7px 13px;cursor:pointer;transition:all .12s}
  #tourCard .tbtn:hover{color:var(--gold,#d4a858);border-color:var(--gold,#d4a858)}
  #tourCard .tbtn.play{color:#fff;background:linear-gradient(90deg,#c86820,#b83018);border:none;min-width:74px}
  #tourCard .tbtn.x{color:var(--ink3,#888)}
  `;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  const fab=document.createElement('button'); fab.id='tourFab';
  fab.innerHTML='<span class="pulse"></span>▶ 一键导览 · 自动讲解';
  document.body.appendChild(fab);

  const card=document.createElement('div'); card.id='tourCard';
  card.innerHTML=`<div class="tprog"><i id="tProgBar"></i></div>
    <div class="tbody">
      <div class="trel" id="tRel"></div>
      <div class="thead"><span class="tname" id="tName"></span>
        <span class="trole" id="tRole"></span><span class="tdate" id="tDate"></span></div>
      <div class="tbio" id="tBio"></div>
    </div>
    <div class="tctrl">
      <span class="tcount" id="tCount"></span>
      <button class="tbtn" id="tPrev">⏮ 上一位</button>
      <button class="tbtn play" id="tPlay">⏸ 暂停</button>
      <button class="tbtn" id="tNext">下一位 ⏭</button>
      <button class="tbtn x" id="tClose">✕</button>
    </div>`;
  document.body.appendChild(card);

  const ROLE_NAMES={ruler:'统治者',general:'将领',thinker:'思想家',religious:'宗教人物',
    scientist:'科学家',artist:'艺术家',explorer:'探险家',reformer:'改革者',other:'其他'};
  const ROLE_COLOR={ruler:'#d4a858',general:'#c84830',thinker:'#5aa0c8',religious:'#8a7ad0',
    scientist:'#5ab87a',artist:'#d4708a',explorer:'#48a0c8',reformer:'#c89030',other:'#999'};

  // ── 状态 ──
  let seq=[], idx=0, playing=false, dwellTimer=null, tweening=false;
  const DWELL=4200; // 每位停留毫秒

  // 相机平滑移动到某节点
  function flyTo(node, cb){
    const {W,H}=NET.viewport();
    const targetScale=1.45;
    const tpx=W/2 - node.x*targetScale;
    const tpy=H/2 - node.y*targetScale;
    const cam=NET.getCamera();
    const sx=cam.panX, sy=cam.panY, ss=cam.scale;
    const dur=620; const t0=performance.now(); tweening=true;
    function ease(p){ return p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2; }
    function step(now){
      let p=Math.min(1,(now-t0)/dur); const e=ease(p);
      NET.setCamera(sx+(tpx-sx)*e, sy+(tpy-sy)*e, ss+(targetScale-ss)*e);
      if(p<1) requestAnimationFrame(step); else { tweening=false; cb&&cb(); }
    }
    requestAnimationFrame(step);
  }

  function renderStep(){
    if(!seq.length) return;
    const s=seq[idx]; const p=NET.byId(s.id); if(!p) return;
    const node=NET.nodes().find(n=>n.id===s.id);
    // 旁白:与上一位的关系
    const relEl=document.getElementById('tRel');
    if(s.rel && idx>0){
      const prev=NET.byId(seq[idx-1].id);
      relEl.innerHTML=`↳ ${prev?prev.n:''} ${relPhrase(s.rel)} <b>${p.n}</b> &nbsp;·&nbsp; <span style="color:var(--ink2)">${s.rel}</span>`;
    } else {
      relEl.innerHTML=idx===0?'🌟 故事开始 · 关系网中最关键的人物':'— 新的线索 —';
    }
    document.getElementById('tName').textContent=p.n;
    const roleEl=document.getElementById('tRole');
    const rc=ROLE_COLOR[p.r]||'#999';
    roleEl.textContent=ROLE_NAMES[p.r]||p.r||'';
    roleEl.style.background=rc+'26'; roleEl.style.color=rc;
    document.getElementById('tDate').textContent=p.d||'';
    let bio=(p.b||'').replace(/\*\*/g,'');
    if(bio.length>96) bio=bio.slice(0,94)+'…';
    document.getElementById('tBio').textContent=bio;
    document.getElementById('tCount').textContent=(idx+1)+' / '+seq.length;
    document.getElementById('tProgBar').style.width=((idx+1)/seq.length*100)+'%';
    if(node) flyTo(node, ()=>NET.select(s.id)); else NET.select(s.id);
  }

  function scheduleNext(){
    clearTimeout(dwellTimer);
    if(!playing) return;
    dwellTimer=setTimeout(()=>{
      if(idx<seq.length-1){ idx++; renderStep(); scheduleNext(); }
      else { setPlaying(false); } // 到底自动暂停
    }, DWELL);
  }

  function setPlaying(v){
    playing=v;
    document.getElementById('tPlay').textContent=v?'⏸ 暂停':'▶ 播放';
    if(v) scheduleNext(); else clearTimeout(dwellTimer);
  }

  function startTour(){
    seq=buildSequence();
    if(!seq.length){ alert('当前关系网暂无人物'); return; }
    NET.freeze && NET.freeze();
    idx=0;
    fab.style.display='none';
    card.classList.add('show');
    renderStep();
    setPlaying(true);
  }
  function stopTour(){
    clearTimeout(dwellTimer); playing=false;
    card.classList.remove('show');
    fab.style.display='flex';
    NET.deselect && NET.deselect();
  }

  fab.onclick=startTour;
  document.getElementById('tClose').onclick=stopTour;
  document.getElementById('tPlay').onclick=()=>setPlaying(!playing);
  document.getElementById('tPrev').onclick=()=>{ setPlaying(false); if(idx>0){idx--;renderStep();} };
  document.getElementById('tNext').onclick=()=>{ setPlaying(false); if(idx<seq.length-1){idx++;renderStep();} };

  // 切换国度/关系类型时结束导览(布局会重建)
  document.addEventListener('click',e=>{
    if(e.target.closest && e.target.closest('.civ-pill,.rel-pill')){ if(card.classList.contains('show')) stopTour(); }
  });
  document.addEventListener('keydown',e=>{
    if(!card.classList.contains('show')) return;
    if(e.key==='Escape') stopTour();
    else if(e.key===' '){ e.preventDefault(); setPlaying(!playing); }
    else if(e.key==='ArrowRight'){ setPlaying(false); if(idx<seq.length-1){idx++;renderStep();} }
    else if(e.key==='ArrowLeft'){ setPlaying(false); if(idx>0){idx--;renderStep();} }
  });
})();
