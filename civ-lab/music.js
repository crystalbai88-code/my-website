// CivLab · 实验室背景音乐(真实录制曲目,非合成)
// 曲目:Gymnopédie No.1(Erik Satie 作曲,公共领域)— 录音 Kevin MacLeod (incompetech.com),Creative Commons BY 4.0(需署名,已在页面标注)。
// 舒缓唯美的钢琴独奏。默认「打开即播」:进页面尝试自动播;浏览器拦截自动播时,在用户首次点/滑/拖时无感接上。
// 右上 🔈 开关可随时手动关;手动关后记住偏好(localStorage),之后不再自动响。
(function(){
  if(window.CivMusic) return;
  var SRC='./audio/gymnopedie.mp3', VOL=0.55, PREF='civlab_music', audio, fadeT, on=false, armed=false;

  function pref(){ try{ return localStorage.getItem(PREF); }catch(e){ return null; } }
  function save(v){ try{ localStorage.setItem(PREF, v); }catch(e){} }

  function ensure(){ if(audio) return; audio=new Audio(); audio.src=SRC; audio.loop=true; audio.preload='auto'; audio.volume=0; }
  function fadeTo(target, ms){
    clearInterval(fadeT);
    var steps=24, i=0, from=audio.volume, dt=Math.max(16, ms/steps);
    fadeT=setInterval(function(){ i++; audio.volume=Math.max(0,Math.min(1, from+(target-from)*i/steps));
      if(i>=steps){ clearInterval(fadeT); if(target===0){ try{audio.pause();}catch(e){} } } }, dt);
  }

  // 尝试播放;被浏览器拦截则挂一个"首次用户手势"监听,手势一来就接上
  function tryPlay(){
    if(!on) return; ensure();
    var p=audio.play();
    if(p&&p.then){ p.then(function(){ fadeTo(VOL,2500); }).catch(function(){ armGesture(); }); }
    else { fadeTo(VOL,2500); }
  }
  function armGesture(){
    if(armed) return; armed=true;
    var EVTS=['pointerdown','mousedown','touchstart','click','keydown'];
    var h=function(){ EVTS.forEach(function(t){ document.removeEventListener(t,h,true); }); armed=false; tryPlay(); };
    EVTS.forEach(function(t){ document.addEventListener(t,h,true); });
  }

  function turnOn(){ on=true; setBtn(); tryPlay(); }
  function turnOff(){ on=false; setBtn(); if(audio) fadeTo(0,1800); }
  function toggle(){ on?turnOff():turnOn(); save(on?'on':'off'); }   // 手动切换才记偏好
  function setEra(){ /* 单曲循环,暂不随年代切换(留接口) */ }

  var btn, credit;
  function setBtn(){ if(!btn)return; btn.innerHTML = on?'🔊':'🔈';
    btn.style.background = on?'linear-gradient(135deg,#c86820,#b83018)':'rgba(30,24,40,.55)';
    btn.title = on?'关闭背景音乐':'开启背景音乐';
    if(credit) credit.style.opacity = on?'0.6':'0'; }
  function mount(){
    btn=document.createElement('button');
    btn.setAttribute('aria-label','背景音乐开关');
    btn.style.cssText='position:fixed;right:12px;top:calc(88px + env(safe-area-inset-top));z-index:60;width:42px;height:42px;border:none;border-radius:50%;font-size:18px;cursor:pointer;color:#fff;background:rgba(30,24,40,.55);box-shadow:0 4px 14px rgba(0,0,0,.28);backdrop-filter:blur(6px)';
    btn.onclick=toggle; document.body.appendChild(btn);
    credit=document.createElement('div');
    credit.textContent='♪ Gymnopédie No.1 (Satie) — Kevin MacLeod · CC BY';
    credit.style.cssText='position:fixed;right:10px;top:calc(136px + env(safe-area-inset-top));z-index:60;max-width:160px;text-align:right;font-family:system-ui,sans-serif;font-size:10px;line-height:1.4;color:rgba(60,45,30,.9);text-shadow:0 1px 2px rgba(255,255,255,.5);opacity:0;transition:opacity .4s;pointer-events:none';
    document.body.appendChild(credit);
    setBtn();
    // 打开即播:除非用户之前手动关过
    if(pref()!=='off') turnOn();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();

  window.CivMusic={start:turnOn,stop:turnOff,toggle:toggle,setEra:setEra,get on(){return on;}};
})();
