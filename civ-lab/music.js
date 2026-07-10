// CivLab · 实验室氛围音(生成式,无音频文件、无版权)
// 一层缓缓流动的和声,像"时间在走"——低沉持续音 + 每隔约24秒漂移一次和弦。
// 默认关闭(浏览器禁止自动播放),右下方浮一个 🔊 开关;首次点击才创建 AudioContext。
(function(){
  if(window.CivMusic) return;
  var ctx, master, filter, lfo, lfoGain, voices=[], shimmer, chordTimer, on=false, curChord=0;
  // A小调史诗级缓慢进行:Am → F → G → Dm(i–VI–VII–iv),循环
  var CHORDS = [
    [110.00, 164.81, 220.00, 261.63], // Am : A2 E3 A3 C4
    [ 87.31, 130.81, 174.61, 220.00], // F  : F2 C3 F3 A3
    [ 98.00, 146.83, 196.00, 246.94], // G  : G2 D3 G3 B3
    [ 73.42, 110.00, 146.83, 220.00]  // Dm : D2 A2 D3 A3
  ];

  function build(){
    ctx = new (window.AudioContext||window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    filter = ctx.createBiquadFilter(); filter.type='lowpass'; filter.frequency.value=650; filter.Q.value=0.6; filter.connect(master);
    // 缓慢开合的滤波(呼吸感)
    lfo = ctx.createOscillator(); lfo.type='sine'; lfo.frequency.value=0.05;
    lfoGain = ctx.createGain(); lfoGain.gain.value=260; lfo.connect(lfoGain); lfoGain.connect(filter.frequency); lfo.start();
    // 4 个声部(持续振荡器,换和弦时平滑滑到新音)
    var chord = CHORDS[0];
    for(var i=0;i<4;i++){
      var o=ctx.createOscillator(); o.type = i===0?'triangle':'sine';
      o.frequency.value = chord[i]; o.detune.value = (i-1.5)*4;
      var g=ctx.createGain(); g.gain.value = i===0?0.9:0.55;
      o.connect(g); g.connect(filter); o.start();
      voices.push({o:o,g:g});
    }
    // 高处极轻的微光(泛音层)
    shimmer = ctx.createOscillator(); shimmer.type='sine'; shimmer.frequency.value=chord[2]*2;
    var sg=ctx.createGain(); sg.gain.value=0.06; shimmer.connect(sg); sg.connect(filter); shimmer.start(); shimmer._g=sg;
  }

  function setChord(idx, glide){
    curChord = ((idx%CHORDS.length)+CHORDS.length)%CHORDS.length;
    var c = CHORDS[curChord], t = ctx.currentTime, dur = glide||6;
    voices.forEach(function(v,i){ v.o.frequency.cancelScheduledValues(t); v.o.frequency.linearRampToValueAtTime(c[i], t+dur); });
    shimmer.frequency.linearRampToValueAtTime(c[2]*2, t+dur);
  }
  function drift(){ setChord(curChord+1, 8); }

  function start(){
    if(on) return; on=true;
    if(!ctx) build();
    if(ctx.state==='suspended') ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.13, ctx.currentTime+3); // 缓入,音量低
    chordTimer = setInterval(drift, 24000);
    setBtn();
  }
  function stop(){
    if(!on) return; on=false;
    clearInterval(chordTimer);
    if(master){ master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime+2); }
    setBtn();
  }
  function toggle(){ on?stop():start(); }

  // 浮动开关
  var btn;
  function setBtn(){ if(btn){ btn.innerHTML = on?'🔊':'🔈'; btn.style.background = on?'linear-gradient(135deg,#c86820,#b83018)':'rgba(30,24,40,.6)'; btn.title = on?'关闭氛围音':'开启氛围音'; } }
  function mount(){
    btn=document.createElement('button');
    btn.setAttribute('aria-label','氛围音乐开关');
    btn.style.cssText='position:fixed;left:12px;top:50%;transform:translateY(-50%);z-index:60;width:42px;height:42px;border:none;border-radius:50%;font-size:18px;cursor:pointer;color:#fff;background:rgba(30,24,40,.55);box-shadow:0 4px 14px rgba(0,0,0,.28);backdrop-filter:blur(6px)';
    btn.onclick=toggle; setBtn(); document.body.appendChild(btn);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();

  window.CivMusic={start:start,stop:stop,toggle:toggle,setChord:setChord,get on(){return on;}};
})();
