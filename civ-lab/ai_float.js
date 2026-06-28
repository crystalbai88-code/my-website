/* ════════════════════════════════════════════════════════════════
   AI 历史助手 · 浮动模块 (独立, 不依赖 app.js)
   - injectFloatingAI() 注入悬浮按钮+面板+样式
   - toggleAIFloat() 开/关
   - 上下文: 宿主页面可设 window.__aiCtx = "用户正在看……" 字符串
   - 模型: 通义千问(DashScope, sk- 开头) 或 Claude(sk-ant- 开头), 流式
   状态存 localStorage: civlab_ai_key / civlab_ai_provider / civlab_ai_model
   ════════════════════════════════════════════════════════════════ */
(function(){
  const LS={key:'civlab_ai_key',prov:'civlab_ai_provider',model:'civlab_ai_model'};
  const ai={ get key(){return localStorage.getItem(LS.key)||''},
    get prov(){return localStorage.getItem(LS.prov)||'qwen'},
    get model(){return localStorage.getItem(LS.model)||'qwen-turbo'} };
  function saveKey(k){
    k=(k||'').trim(); localStorage.setItem(LS.key,k);
    localStorage.setItem(LS.prov, k.startsWith('sk-ant')?'claude':'qwen');
  }
  const esc=s=>String(s==null?'':s).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));

  // ── 样式 ──
  const css=`
  #aiFab{position:fixed;right:16px;bottom:calc(124px + env(safe-area-inset-bottom));z-index:70;
    width:54px;height:54px;border-radius:50%;border:none;cursor:pointer;font-size:25px;
    background:linear-gradient(135deg,#6a8cff,#8a5ad0);color:#fff;box-shadow:0 6px 22px #0006;
    display:flex;align-items:center;justify-content:center;transition:transform .15s}
  #aiFab:hover{transform:scale(1.08)}
  #aiFab .dot{position:absolute;top:6px;right:8px;width:8px;height:8px;border-radius:50%;background:#ffd24a;animation:aipulse 1.4s infinite}
  @keyframes aipulse{0%,100%{opacity:.4}50%{opacity:1}}
  #aiPanel{position:fixed;right:16px;bottom:calc(124px + env(safe-area-inset-bottom));z-index:71;
    width:min(360px,calc(100vw - 24px));height:min(540px,70vh);display:none;flex-direction:column;
    background:var(--panel-bg,rgba(18,22,34,.97));border:1px solid var(--panel-line,#3a3f55);
    border-radius:18px;backdrop-filter:blur(18px);box-shadow:0 12px 50px #0008;overflow:hidden}
  #aiPanel.show{display:flex;animation:aiin .25s ease}
  @keyframes aiin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  #aiPanel .aih{display:flex;align-items:center;gap:9px;padding:12px 14px;border-bottom:1px solid var(--panel-line);cursor:move}
  #aiPanel .aih .av{font-size:22px}
  #aiPanel .aih .tt{font-family:var(--serif,serif);font-weight:900;font-size:15px;color:var(--ink,#eee)}
  #aiPanel .aih .st{font-family:var(--mono,monospace);font-size:10px;color:var(--ink3,#8a90a6)}
  #aiPanel .aih .sp{margin-left:auto;display:flex;gap:4px}
  #aiPanel .aih button{background:none;border:none;color:var(--ink3,#888);font-size:15px;cursor:pointer;padding:4px 7px;border-radius:7px}
  #aiPanel .aih button:hover{background:rgba(255,255,255,.08);color:var(--ink,#eee)}
  #aiMsgs{flex:1;overflow-y:auto;padding:13px 14px;display:flex;flex-direction:column;gap:11px;-webkit-overflow-scrolling:touch}
  .aim{display:flex;gap:8px;align-items:flex-start}
  .aim .ab{font-size:18px;flex:0 0 auto;margin-top:1px}
  .aim .bb{font-size:13.5px;line-height:1.65;color:var(--ink,#e8e8ee);background:rgba(255,255,255,.05);
    border:1px solid var(--panel-line,#333);border-radius:12px;padding:9px 12px;max-width:84%}
  .aim.user{flex-direction:row-reverse}
  .aim.user .bb{background:linear-gradient(135deg,#6a8cff33,#8a5ad033);border-color:#6a8cff55}
  .aim .bb p{margin:0 0 6px}.aim .bb p:last-child{margin:0}
  .aisug{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 8px}
  .aisug button{font-family:var(--sans,system-ui);font-size:11.5px;color:var(--ink2,#bcc);background:rgba(255,255,255,.05);
    border:1px solid var(--panel-line,#333);border-radius:999px;padding:5px 11px;cursor:pointer}
  .aisug button:hover{border-color:#6a8cff;color:#8ab}
  #aiInputRow{display:flex;gap:7px;padding:10px 12px;border-top:1px solid var(--panel-line)}
  #aiInput{flex:1;resize:none;font-family:var(--sans,system-ui);font-size:13.5px;color:var(--ink,#eee);
    background:rgba(255,255,255,.05);border:1px solid var(--panel-line,#333);border-radius:10px;padding:9px 11px;outline:none;max-height:90px}
  #aiSend{flex:0 0 auto;border:none;border-radius:10px;padding:0 15px;font-weight:800;font-size:13px;color:#fff;
    background:linear-gradient(135deg,#6a8cff,#8a5ad0);cursor:pointer}
  .aikey{padding:16px;font-size:13px;color:var(--ink2,#ccc);line-height:1.7}
  .aikey input{width:100%;box-sizing:border-box;margin:9px 0;font-family:var(--mono,monospace);font-size:12px;
    color:var(--ink,#eee);background:rgba(255,255,255,.06);border:1px solid var(--panel-line,#333);border-radius:9px;padding:9px 11px}
  .aikey .b{display:inline-block;font-weight:800;color:#fff;background:linear-gradient(135deg,#6a8cff,#8a5ad0);
    border:none;border-radius:999px;padding:8px 18px;cursor:pointer;font-size:13px}
  .aikey a{color:#8ab}`;

  function ensureStyle(){ if(document.getElementById('aiFloatStyle'))return;
    const s=document.createElement('style'); s.id='aiFloatStyle'; s.textContent=css; document.head.appendChild(s); }

  function statusText(){
    if(!ai.key) return '⚠ 未连接 · 点 ⚙ 接入';
    return (ai.prov==='claude'?'🟢 Claude':'🟢 通义千问')+' 已连接';
  }

  window.injectFloatingAI=function(){
    if(document.getElementById('aiFab')) return;
    ensureStyle();
    const fab=document.createElement('button'); fab.id='aiFab'; fab.title='问 AI 历史助手';
    fab.innerHTML='🤖<span class="dot"></span>'; fab.onclick=()=>window.toggleAIFloat();
    document.body.appendChild(fab);
    const panel=document.createElement('div'); panel.id='aiPanel';
    panel.innerHTML=`
      <div class="aih" id="aiHead"><span class="av">🤖</span>
        <div><div class="tt">AI 历史助手</div><div class="st" id="aiStatus"></div></div>
        <div class="sp"><button id="aiCfg" title="接入/切换 AI">⚙</button><button id="aiMin" title="收起">－</button></div>
      </div>
      <div id="aiMsgs"></div>
      <div class="aisug" id="aiSug"></div>
      <div style="padding:0 14px 5px;font-size:10.5px;line-height:1.5;color:var(--ink3,#9aa)">🔒 聊天会直接发给你连接的 AI,别写真实姓名、住址、电话哦</div>
      <div id="aiInputRow"><textarea id="aiInput" rows="1" placeholder="问任何历史问题…"></textarea><button id="aiSend">发送</button></div>`;
    document.body.appendChild(panel);
    document.getElementById('aiSend').onclick=send;
    document.getElementById('aiCfg').onclick=window.showAIKeySetup;
    document.getElementById('aiMin').onclick=window.toggleAIFloat;
    const inp=document.getElementById('aiInput');
    inp.onkeydown=e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} };
    dragHead(panel,document.getElementById('aiHead'));
  };

  window.toggleAIFloat=function(){
    const p=document.getElementById('aiPanel'); if(!p){window.injectFloatingAI();return window.toggleAIFloat();}
    const open=!p.classList.contains('show'); p.classList.toggle('show',open);
    if(open){ document.getElementById('aiStatus').textContent=statusText();
      const msgs=document.getElementById('aiMsgs');
      if(!msgs.dataset.init){ msgs.dataset.init='1';
        addMsg('ai','你好 🌍 我是 AI 历史助手。你正在看的内容我都知道,问我任何关于这个文明、人物、事件的问题吧!');
      }
      renderSug();
      setTimeout(()=>document.getElementById('aiInput').focus(),150);
    }
  };

  function renderSug(){
    const sug=document.getElementById('aiSug');
    const ctx=(typeof window.__aiCtx==='function'?window.__aiCtx():window.__aiCtx)||'';
    let qs=['这个文明为什么会衰落?','给我讲个有意思的故事','它对今天有什么影响?'];
    if(/抉择时刻|换作是你|代入|母题|找规律/.test(ctx)){
      // 抉择页:引导孩子思考,而不是直接给答案
      qs=['他为什么会这么选?','如果换个选择,会怎样?','换作是我,该怎么选?','这件事和今天有什么关系?'];
    } else {
      const m=/(?:文明|人物)[:：]\s*([^,，。(（]+)/.exec(ctx);
      if(m){ const n=m[1].trim(); qs=[`${n}最重要的事是什么?`,`${n}为什么重要?`,`讲个${n}的小故事`]; }
    }
    sug.innerHTML=qs.map(q=>`<button>${esc(q)}</button>`).join('');
    sug.querySelectorAll('button').forEach(b=>b.onclick=()=>{document.getElementById('aiInput').value=b.textContent;send();});
  }

  function addMsg(role,html){
    const msgs=document.getElementById('aiMsgs');
    const d=document.createElement('div'); d.className='aim '+role;
    d.innerHTML=`<span class="ab">${role==='ai'?'🤖':'🧑'}</span><div class="bb">${html}</div>`;
    msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight; return d;
  }

  window.showAIKeySetup=function(){
    const msgs=document.getElementById('aiMsgs'); document.getElementById('aiSug').innerHTML='';
    msgs.innerHTML=`<div class="aikey">
      <b style="color:var(--ink)">接入 AI(一次设置,长期有效)</b><br>
      推荐用<b>通义千问</b>(阿里云,有免费额度):到 <a href="https://bailian.console.aliyun.com/" target="_blank" rel="noopener">阿里云百炼</a> 申请 API Key(<code>sk-</code> 开头)。<br>
      也支持 Claude(<code>sk-ant-</code> 开头)。Key 只存在你自己的浏览器里。
      <input id="aiKeyInput" type="password" placeholder="粘贴 API Key(sk-… 或 sk-ant-…)" value="${esc(ai.key)}">
      <button class="b" id="aiKeySave">保存并开始</button>
    </div>`;
    document.getElementById('aiKeySave').onclick=()=>{
      saveKey(document.getElementById('aiKeyInput').value);
      document.getElementById('aiStatus').textContent=statusText();
      msgs.dataset.init=''; msgs.innerHTML='';
      addMsg('ai', ai.key?'✅ 接入成功!现在问我任何历史问题吧。':'还没填 Key 哦。没有 Key 也能用,但我回答会比较有限。');
      renderSug();
    };
  };

  async function send(){
    const inp=document.getElementById('aiInput'); const text=(inp.value||'').trim(); if(!text)return;
    inp.value=''; document.getElementById('aiSug').innerHTML='';
    addMsg('user',esc(text));
    if(!ai.key){ addMsg('ai','要回答得更好,请先点右上角 ⚙ 接入 AI(通义千问有免费额度)。'); window.showAIKeySetup(); return; }
    const tip=addMsg('ai','<em>⏳ 思考中…</em>'); const bubble=tip.querySelector('.bb');
    const ctx=(typeof window.__aiCtx==='function'?window.__aiCtx():window.__aiCtx)||'(用户在浏览世界历史)';
    const sys=`你是"CivLab 世界文明实验室"的 AI 历史助手,正在和一个 10–12 岁的孩子聊历史。
要求:
- 用第一人称"我",语气亲切;用孩子能懂的中文,多用比喻和小故事,少用术语。
- 回答控制在 120–220 字,简洁、准确、不啰嗦,紧扣孩子问的问题。
- 只讲真实可靠的历史;不确定就说"我不太确定",绝不编造。
- 可以联系孩子正在看的内容来回答。
- 【安全红线】绝不向孩子索要真实姓名、住址、学校、电话等任何个人信息;只聊历史。如果孩子主动透露了这类信息,温和提醒他"这些不要在网上告诉别人哦",然后把话题拉回历史。

【孩子正在看的内容】
${ctx}`;
    try{
      if(ai.prov==='claude'){
        const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',
          headers:{'Content-Type':'application/json','x-api-key':ai.key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
          body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:600,system:sys,messages:[{role:'user',content:text}]})});
        if(!res.ok) throw new Error('Claude '+res.status);
        const data=await res.json();
        bubble.innerHTML='<p>'+fmt(data.content[0].text)+'</p>';
      } else {
        const res=await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',{method:'POST',
          headers:{'Content-Type':'application/json','Authorization':'Bearer '+ai.key},
          body:JSON.stringify({model:ai.model,max_tokens:500,stream:true,messages:[{role:'system',content:sys},{role:'user',content:text}]})});
        if(!res.ok) throw new Error('通义千问 '+res.status+' · '+(await res.text()).slice(0,120));
        const reader=res.body.getReader(), dec=new TextDecoder(); let raw='',buf='';
        while(true){ const {value,done}=await reader.read(); if(done)break;
          buf+=dec.decode(value,{stream:true}); let nl;
          while((nl=buf.indexOf('\n'))>=0){ const line=buf.slice(0,nl).trim(); buf=buf.slice(nl+1);
            if(!line.startsWith('data:'))continue; const pl=line.slice(5).trim(); if(pl==='[DONE]')break;
            try{ const j=JSON.parse(pl); const d=j.choices?.[0]?.delta?.content||''; if(d){raw+=d; bubble.innerHTML='<p>'+fmt(raw)+'</p>'; document.getElementById('aiMsgs').scrollTop=1e9;} }catch{}
          }
        }
        if(!raw) bubble.innerHTML='(没有收到回复,请重试)';
      }
    }catch(e){ bubble.innerHTML='⚠ 出错:'+esc(e.message)+'<br><span style="font-size:11px;color:var(--ink3)">可点 ⚙ 检查 API Key</span>'; }
    document.getElementById('aiMsgs').scrollTop=1e9;
  }
  function fmt(t){ return esc(t).replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>').replace(/\*\*([^*]+?)\*\*/g,'<b>$1</b>'); }

  function dragHead(panel,handle){
    let sx,sy,ox,oy,drag=false;
    handle.addEventListener('mousedown',e=>{ if(e.target.closest('button'))return; drag=true; sx=e.clientX;sy=e.clientY;
      const r=panel.getBoundingClientRect(); ox=r.left;oy=r.top; panel.style.transition='none'; document.body.style.userSelect='none'; });
    document.addEventListener('mousemove',e=>{ if(!drag)return; panel.style.left=(ox+e.clientX-sx)+'px'; panel.style.top=(oy+e.clientY-sy)+'px'; panel.style.right='auto'; panel.style.bottom='auto'; });
    document.addEventListener('mouseup',()=>{ drag=false; panel.style.transition=''; document.body.style.userSelect=''; });
  }

  // 自动注入(宿主页面引入本脚本即可)
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',window.injectFloatingAI);
  else window.injectFloatingAI();
})();
