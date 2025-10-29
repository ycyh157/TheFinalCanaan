// --- Portal with typing effect (driven by content/portal.json) ---
async function renderPortal(container){
  document.body.classList.add('dark','portal-mode');
  const portalData = await fetch('content/portal.json?_=' + Date.now()).then(r=>r.json()).catch(()=> ({
    title:"“？？？……”",
    subtitle:"灰蓝迷蒙的门扉在你面前缓缓开启。",
    lines:[
      "你正在被注视。",
      "请保持沉默。",
      "当钟声落下，你将看见砂。",
      "当风声起处，你将听见时。"
    ],
    entrances:[
      {"href":"#room","label":"进入 · ？？？的房间","note":"嘘——不要说话。"},
      {"href":"#apoc","label":"进入 · ████的启示录","note":"那联通万千梦境的光辉之页。"}
    ],
    linkToLibrary: {"href":"#intro","label":"或直接进入《摇篮的书库》目录"}
  }));

  container.innerHTML = `
    <link rel="stylesheet" href="assets/css/portal-typing.css">
    <div class="portal-wrap">
      <div class="portal-mist"></div><div class="portal-stars"></div>
      <div class="portal-card">
        <div class="portal-sigil">
          <svg width="64" height="64" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 6 L58 50 L50 94 L42 50 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="50" r="8" fill="currentColor"/></svg>
        </div>
        <div class="kicker">“你正在被注视。保持沉默——”</div>
        <h1 class="portal-title"></h1>
        <div class="portal-sub"></div>
        <div class="portal-typing" id="typingBox"></div>
        <div class="portal-controls">
          <button class="portal-skip" id="skipBtn" title="跳过动画并显示全部">跳过</button>
        </div>
        <div class="portal-actions" id="portalActions" style="display:none"></div>
        <div class="portal-note" id="portalNote" style="display:none"></div>
      </div>
    </div>`;

  const titleEl = container.querySelector('.portal-title');
  const subEl   = container.querySelector('.portal-sub');
  const box     = container.querySelector('#typingBox');
  titleEl.textContent = portalData.title || "“？？？……”";
  subEl.textContent   = portalData.subtitle || "";
  const caret = document.createElement('span'); caret.className = 'portal-caret'; caret.textContent = ' ';
  let lineIdx = 0, charIdx = 0, activeP = null, skipping = false;
  const speedChar = (portalData.speedChar || 34);    // 每个字符毫秒
  const speedLine = (portalData.speedLine || 600);   // 换行停顿
  function ensureActiveP(){ 
    if(!activeP){ activeP = document.createElement('div'); activeP.className = 'portal-line'; box.appendChild(activeP); }
  }
  function doneAll(){
    const act = container.querySelector('#portalActions');
    const nt  = container.querySelector('#portalNote');
    act.innerHTML = '';
    (portalData.entrances || []).forEach(e=>{
      const a = document.createElement('a'); a.className='portal-btn'; a.href=e.href; a.innerHTML = `<strong>${e.label}</strong><div class="portal-note">${e.note||''}</div>`;
      act.appendChild(a);
    });
    if(portalData.linkToLibrary){
      nt.innerHTML = `<a href="${portalData.linkToLibrary.href}">${portalData.linkToLibrary.label}</a>`;
    }
    act.style.display='grid'; nt.style.display='block';
  }
  function revealAll(){
    box.innerHTML = '';
    (portalData.lines||[]).forEach(line=>{
      const p = document.createElement('div'); p.className='portal-line'; p.textContent = line; box.appendChild(p);
    });
    doneAll();
  }
  container.querySelector('#skipBtn').addEventListener('click', ()=>{ skipping=true; revealAll(); });

  function typeNext(){
    if(skipping) return;
    if(lineIdx >= (portalData.lines || []).length){ 
      caret.remove(); doneAll(); return; 
    }
    const line = String(portalData.lines[lineIdx]||'');
    ensureActiveP();
    if(charIdx < line.length){
      activeP.textContent = line.slice(0, charIdx+1);
      if(!caret.isConnected){ activeP.appendChild(caret); }
      charIdx++;
      setTimeout(typeNext, speedChar);
    } else {
      if(caret.isConnected) caret.remove();
      activeP = null; charIdx = 0; lineIdx++;
      setTimeout(typeNext, speedLine);
    }
  }
  typeNext();
}