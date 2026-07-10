// CivLab · 实验室氛围音(生成式,无音频文件、无版权)——随"年代"演变的历史配乐。
// 拖时间轴/走进不同时代 → 和声、音色、节奏随之变化:上古苍茫 → 帝国雄浑 → 大航海开阔 → 工业激越 → 当代明亮。
// 默认关闭(浏览器禁自动播放),左侧浮 🔈 开关,首次点击才起声;音量低、缓入缓出。
(function(){
  if(window.CivMusic) return;
  var ctx, master, filter, lfo, lfoGain, voices=[], shimmer, driftTimer, on=false, step=0, eraIdx=0, pendingEra=0;

  // 每个时代一套调色板:name·和弦进行(4声部频率)·滤波亮度cutoff·波形·漂移间隔ms·音量
  var ERAS = [
    { name:'上古苍茫', cut:520, wave:'sine', drift:30000, gain:0.11, ch:[   // 空五度、无三度,低沉旷远
      [55.00, 82.41,110.00,164.81],[49.00,73.42, 98.00,146.83],[65.41,98.00,130.81,196.00] ]},
    { name:'古典·诸子', cut:660, wave:'sine', drift:26000, gain:0.12, ch:[  // 多利安,沉静思辨
      [110.00,130.81,164.81,220.00],[98.00,146.83,196.00,246.94],[87.31,130.81,174.61,220.00],[82.41,123.47,164.81,196.00] ]},
    { name:'帝国雄浑', cut:920, wave:'triangle', drift:22000, gain:0.13, ch:[ // 大调、加八度,庄严有力
      [65.41,130.81,196.00,261.63],[87.31,174.61,220.00,349.23],[98.00,196.00,246.94,392.00],[110.00,164.81,220.00,329.63] ]},
    { name:'中世纪·多中心', cut:620, wave:'sine', drift:24000, gain:0.115, ch:[ // 教会调式、空五度悬置
      [73.42,110.00,146.83,220.00],[65.41, 98.00,130.81,196.00],[82.41,123.47,164.81,246.94],[87.31,130.81,174.61,261.63] ]},
    { name:'大航海开阔', cut:1120, wave:'triangle', drift:20000, gain:0.125, ch:[ // 明亮大调,扬起、远航
      [73.42,146.83,220.00,369.99],[98.00,196.00,293.66,392.00],[110.00,220.00,277.18,329.63],[82.41,164.81,246.94,329.63] ]},
    { name:'工业激越', cut:1000, wave:'triangle', drift:16000, gain:0.12, ch:[ // 小调+属和弦张力,推进加快
      [110.00,130.81,164.81,220.00],[73.42,110.00,146.83,174.61],[98.00,116.54,146.83,196.00],[82.41,103.83,123.47,164.81] ]},
    { name:'当代明亮', cut:1320, wave:'sine', drift:22000, gain:0.12, ch:[ // sus2/大七,开阔悬而未决
      [65.41,146.83,196.00,293.66],[98.00,146.83,220.00,293.66],[87.31,164.81,220.00,329.63],[73.42,164.81,220.00,277.18] ]}
  ];
  // 年份 → 时代序号(阈值与地图 eraName 对齐)
  function yearToEra(y){ y=+y; if(isNaN(y))return eraIdx;
    if(y<-1000)return 0; if(y<-200)return 1; if(y<500)return 2; if(y<1500)return 3; if(y<1760)return 4; if(y<1945)return 5; return 6; }

  function build(){
    ctx = new (window.AudioContext||window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    filter = ctx.createBiquadFilter(); filter.type='lowpass'; filter.Q.value=0.6; filter.frequency.value=ERAS[pendingEra].cut; filter.connect(master);
    lfo = ctx.createOscillator(); lfo.type='sine'; lfo.frequency.value=0.05;
    lfoGain = ctx.createGain(); lfoGain.gain.value=240; lfo.connect(lfoGain); lfoGain.connect(filter.frequency); lfo.start();
    var chord = ERAS[pendingEra].ch[0], wv = ERAS[pendingEra].wave;
    for(var i=0;i<4;i++){
      var o=ctx.createOscillator(); o.type = i===0?'triangle':wv;
      o.frequency.value = chord[i]; o.detune.value=(i-1.5)*4;
      var g=ctx.createGain(); g.gain.value = i===0?0.9:0.55;
      o.connect(g); g.connect(filter); o.start();
      voices.push({o:o,g:g});
    }
    shimmer = ctx.createOscillator(); shimmer.type='sine'; shimmer.frequency.value=chord[2]*2;
    var sg=ctx.createGain(); sg.gain.value=0.055; shimmer.connect(sg); sg.connect(filter); shimmer.start();
  }

  function glide(chord, dur){
    var t=ctx.currentTime; dur=dur||6;
    voices.forEach(function(v,i){ v.o.frequency.cancelScheduledValues(t); v.o.frequency.setValueAtTime(v.o.frequency.value,t); v.o.frequency.linearRampToValueAtTime(chord[i], t+dur); });
    shimmer.frequency.cancelScheduledValues(t); shimmer.frequency.setValueAtTime(shimmer.frequency.value,t); shimmer.frequency.linearRampToValueAtTime(chord[2]*2, t+dur);
  }
  function drift(){ var e=ERAS[eraIdx]; step=(step+1)%e.ch.length; glide(e.ch[step], 8); }

  function applyEra(idx, dur){
    var e=ERAS[idx]; step=0;
    if(voices.length){ voices.forEach(function(v){ v.o.type = v===voices[0]?'triangle':e.wave; }); glide(e.ch[0], dur||5); }
    if(filter){ var t=ctx.currentTime; filter.frequency.cancelScheduledValues(t); filter.frequency.setValueAtTime(filter.frequency.value,t); filter.frequency.linearRampToValueAtTime(e.cut, t+(dur||5)); }
    if(master && on){ var t2=ctx.currentTime; master.gain.cancelScheduledValues(t2); master.gain.setValueAtTime(master.gain.value,t2); master.gain.linearRampToValueAtTime(e.gain, t2+3); }
    if(on){ clearInterval(driftTimer); driftTimer=setInterval(drift, e.drift); }
  }

  // 外部调用:传年份,自动切时代
  function setEra(year){ var idx=yearToEra(year); if(idx===eraIdx && ctx) return; eraIdx=idx; pendingEra=idx; if(on && ctx) applyEra(idx,6); }

  function start(){
    if(on) return; on=true;
    if(!ctx){ eraIdx=pendingEra; build(); }
    if(ctx.state==='suspended') ctx.resume();
    var t=ctx.currentTime;
    master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value,t);
    master.gain.linearRampToValueAtTime(ERAS[eraIdx].gain, t+3);
    applyEra(eraIdx, 4);
    setBtn();
  }
  function stop(){
    if(!on) return; on=false; clearInterval(driftTimer);
    if(master){ var t=ctx.currentTime; master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value,t); master.gain.linearRampToValueAtTime(0, t+2); }
    setBtn();
  }
  function toggle(){ on?stop():start(); }

  var btn;
  function setBtn(){ if(!btn)return; btn.innerHTML = on?'🔊':'🔈'; btn.style.background = on?'linear-gradient(135deg,#c86820,#b83018)':'rgba(30,24,40,.55)'; btn.title = on?('氛围音·'+ERAS[eraIdx].name+'(点击关闭)'):'开启历史氛围音'; }
  function mount(){
    btn=document.createElement('button');
    btn.setAttribute('aria-label','氛围音乐开关');
    btn.style.cssText='position:fixed;right:12px;top:calc(88px + env(safe-area-inset-top));z-index:60;width:42px;height:42px;border:none;border-radius:50%;font-size:18px;cursor:pointer;color:#fff;background:rgba(30,24,40,.55);box-shadow:0 4px 14px rgba(0,0,0,.28);backdrop-filter:blur(6px)';
    btn.onclick=toggle; setBtn(); document.body.appendChild(btn);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();

  window.CivMusic={start:start,stop:stop,toggle:toggle,setEra:setEra,get on(){return on;},get era(){return ERAS[eraIdx].name;}};
})();
