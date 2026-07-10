// CivLab · 实验室背景音乐(真实录制曲目,非合成)
// 曲目:Echoes of Time v2 — Kevin MacLeod (incompetech.com),Creative Commons BY 4.0(需署名,已在页面标注)。
// 默认关闭(浏览器禁自动播放),右上浮 🔈 开关;首次点击才加载并播放,循环、音量低、缓入缓出。
(function(){
  if(window.CivMusic) return;
  var SRC='./audio/echoes-of-time.mp3', VOL=0.42, audio, fadeT, on=false;

  function ensure(){
    if(audio) return;
    audio=new Audio(); audio.src=SRC; audio.loop=true; audio.preload='none'; audio.volume=0;
  }
  function fadeTo(target, ms){
    clearInterval(fadeT);
    var steps=24, i=0, from=audio.volume, dt=Math.max(16, ms/steps);
    fadeT=setInterval(function(){ i++; audio.volume=Math.max(0,Math.min(1, from+(target-from)*i/steps));
      if(i>=steps){ clearInterval(fadeT); if(target===0){ try{audio.pause();}catch(e){} } } }, dt);
  }
  function start(){
    if(on) return; on=true; ensure();
    var p=audio.play();
    if(p&&p.catch) p.catch(function(){ on=false; setBtn(); });
    fadeTo(VOL, 2500); setBtn();
  }
  function stop(){ if(!on) return; on=false; fadeTo(0, 1800); setBtn(); }
  function toggle(){ on?stop():start(); }
  function setEra(){ /* 真实曲目版:暂为单曲循环,不随年代切换(留接口,后续可接分年代曲目交叉淡入) */ }

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
    // CC BY 署名(播放时显示)
    credit=document.createElement('div');
    credit.textContent='♪ Echoes of Time — Kevin MacLeod · CC BY';
    credit.style.cssText='position:fixed;right:10px;top:calc(136px + env(safe-area-inset-top));z-index:60;max-width:160px;text-align:right;font-family:system-ui,sans-serif;font-size:10px;line-height:1.4;color:rgba(60,45,30,.9);text-shadow:0 1px 2px rgba(255,255,255,.5);opacity:0;transition:opacity .4s;pointer-events:none';
    document.body.appendChild(credit);
    setBtn();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();

  window.CivMusic={start:start,stop:stop,toggle:toggle,setEra:setEra,get on(){return on;}};
})();
