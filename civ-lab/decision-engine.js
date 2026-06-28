/* CivLab 抉择页 · 共享引擎(原内联于每个 decision-*.html,已抽出)
   每个抉择页只需提供数据对象 window.DECISION:
     { key, DOSSIER, beats, reactions:{A,B,C}, confirmLabel }
   页面里仍保留 window.__aiCtx、DOSSIER、beats(因 beats 闭包引用本页 DOSSIER)。 */
(function(){
  var pick=null, opened=new Set(), cur=0;

  function D(){ return window.DECISION||{beats:[],DOSSIER:[],reactions:{}}; }

  function render(){
    var d=D();
    document.getElementById('beat').innerHTML=d.beats[cur]();
    document.getElementById('prog').innerHTML=d.beats.map(function(_,i){return '<i class="'+(i<=cur?'on':'')+'"></i>';}).join('');
    if(cur===1){ refreshGate(); }
    if(cur===7){
      var m=document.getElementById('myPick'); if(m)m.textContent=pick||'?';
      var n=document.getElementById('myNote'); if(n)n.value=localStorage.getItem('decision_'+d.key)||'';
    }
    window.scrollTo({top:0,behavior:'instant'});
    if(window.Track) Track.log('抉择时刻');
  }
  function go(n){ cur=n; render(); }
  function flip(i){
    var card=document.querySelector('.dcard[data-i="'+i+'"]');
    var body=document.getElementById('db'+i);
    var isOpen=card.classList.toggle('open');
    body.style.maxHeight=isOpen?(body.scrollHeight+'px'):'0';
    if(isOpen){ opened.add(i); refreshGate(); }
  }
  function refreshGate(){
    var d=D();
    var c=document.getElementById('dcount'); if(c)c.textContent='已了解 '+opened.size+' / '+d.DOSSIER.length;
    var btn=document.getElementById('toChoice'); var gate=document.getElementById('gate');
    if(opened.size>=d.DOSSIER.length){ if(btn)btn.disabled=false; if(gate)gate.textContent='✅ 你已看清整盘棋,可以决定了'; }
  }
  function choose(k){
    var d=D();
    pick=k;
    document.querySelectorAll('.choice').forEach(function(c){c.classList.toggle('picked',c.dataset.k===k);c.onclick=null;});
    var react=(d.reactions||{})[k];
    var r=document.getElementById('reaction');
    r.innerHTML=react+'<div class="btnrow" style="margin-top:14px"><button class="nextbtn" onclick="go(3)">'+(d.confirmLabel||'看真实的选择')+'</button></div>';
    r.classList.add('show');
  }
  function saveNote(e){
    var d=D();
    var n=document.getElementById('myNote');
    if(n){ localStorage.setItem('decision_'+d.key,n.value); var b=e.target; b.textContent='✅ 已记下!'; setTimeout(function(){b.textContent='💾 记下我的收获';},1500); }
  }
  function restart(){ pick=null; opened=new Set(); go(0); }

  // 暴露给内联 onclick 调用
  window.go=go; window.flip=flip; window.choose=choose; window.saveNote=saveNote; window.restart=restart;

  function boot(){ if(window.DECISION) render(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
