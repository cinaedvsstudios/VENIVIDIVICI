'use strict';
const CHANNEL='https://www.youtube.com/@VoicesHistoryLeftBehind';
const REPO='https://github.com/cinaedvsstudios/VENIVIDIVICI';
const esc=(v)=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const elem=id=>document.getElementById(id);
const load=async path=>{const r=await fetch(path);if(!r.ok)throw Error(path+' not found');return r.json()};
const roman=n=>['','I','II','III','IV','V','VI'][n]||String(n);
function shell(){
 const pg=document.body.dataset.page;
 const view=new URLSearchParams(location.search).get('view')||'overview';
 const episodeId=new URLSearchParams(location.search).get('id')||'01';
 const active=pg==='prompts'?'studio':pg==='episode'?'episode-'+episodeId:view;
 const item=(name,href,title,sub)=>{
   const on=active===name;
   return '<a class="side-button'+(on?' is-active':'')+'" href="'+href+'"'+(on?' aria-current="page"':'')+'><span class="side-label">'+title+'</span><span class="side-hint">'+sub+'</span></a>';
 };
 elem('header').innerHTML='<header class="header"><div class="topbar"><a class="top-logo-box" href="index.html?view=overview" aria-label="VENIVIDIVICI home"><img class="top-logo" src="assets/images/logo-small.webp" alt="VENI VIDI VICI — Voices History Left Behind"></a><div class="topbar-heading"><span class="topbar-overline">VENIVIDIVICI / PRODUCTION</span><strong>'+(pg==='prompts'?'Prompt wizard':pg==='episode'?'Episode dossier':view==='episodes'?'Episode library':view==='roadmap'?'Upcoming work':'Dashboard overview')+'</strong></div><div class="topbar-actions"><a class="topbar-mini" href="episode.html?id=02">Nerva · 3/4</a><a class="topbar-primary" href="prompts.html?quick=nerva">Create prompt <span aria-hidden="true">↗</span></a></div></div></header>';
 const nav=[
 item('overview','index.html?view=overview','Overview','Production dashboard'),
 item('episodes','index.html?view=episodes','Episodes','Browse the archive'),
 item('roadmap','index.html?view=roadmap','Upcoming work','Next steps & plans'),
 item('studio','prompts.html','Prompt wizard','Create new content')
 ].join('');
 const dossiers=[
 item('episode-01','episode.html?id=01','01 / Domitian','Narration completed'),
 item('episode-02','episode.html?id=02','02 / Nerva','Three of four drafted'),
 item('episode-03','episode.html?id=03','03 / Trajan','Proposed next')
 ].join('');
 elem('sidebar').innerHTML='<nav class="sidebar-nav" aria-label="Production navigation"><div class="sidebar-group"><div class="sidebar-caption">WORKSPACE</div>'+nav+'</div><div class="sidebar-group"><div class="sidebar-caption">EPISODE DOSSIERS</div>'+dossiers+'</div><div class="sidebar-group sidebar-external"><a class="side-button" href="'+CHANNEL+'" target="_blank" rel="noopener noreferrer"><span class="side-label">YouTube channel ↗</span><span class="side-hint">Published videos</span></a></div><div class="sidebar-bottom">VENIVIDIVICI<br>VOICES HISTORY LEFT BEHIND</div></nav>';
 elem('footer').innerHTML='<footer class="footer"><div class="wrap footer-inner"><span>© 2026 VENIVIDIVICI · CINAEDVS Studios</span><span><a href="'+REPO+'" target="_blank" rel="noopener noreferrer">GitHub repository ↗</a></span></div></footer>';
}
function home(data){
 const view=new URLSearchParams(location.search).get('view')||'overview';
 const episodes=data.episodes;
 const image=ep=>ep.id==='01'?'assets/images/domitian-thumb.webp':ep.id==='02'?'assets/images/nerva-portrait.webp':'assets/images/logo-columns.webp';
 const current=episodes.find(e=>e.id==='02');
 const drafts=current.sections.filter(s=>s.file&&s.status.toLowerCase().includes('draft')).length;
 const summary=(ep)=>'<a class="library-episode" href="episode.html?id='+esc(ep.id)+'"><div class="library-visual"><img src="'+image(ep)+'" alt="'+(ep.id==='01'?'Original Domitian title artwork':ep.id==='02'?'Original Nerva portrait':'Original VENIVIDIVICI columns logo')+'"></div><div class="library-details"><div class="eyebrow">EPISODE '+String(ep.number).padStart(2,'0')+'</div><h3>'+esc(ep.title)+'</h3><div class="library-subtitle">'+esc(ep.subtitle)+' · '+esc(ep.period)+'</div><p>'+esc(ep.summary)+'</p><span class="library-open">Open dossier ↗</span></div></a>';
 const link=(href,label,cls='')=>'<a class="button '+cls+'" href="'+href+'">'+label+'</a>';
 const heading=(eyebrow,title,description)=>'<div class="view-heading"><div><div class="eyebrow">'+eyebrow+'</div><h1>'+title+'</h1><p>'+description+'</p></div></div>';
 let content='';
 if(view==='episodes'){
  document.title='Episode Library — VENIVIDIVICI';
  content=heading('Your episodes','Episode <em>library.</em>','Original artwork, production status and narrated scripts in individual episode dossiers.')+
    '<div class="library-grid">'+episodes.map(summary).join('')+'</div>';
 }else if(view==='roadmap'){
  document.title='Upcoming Work — VENIVIDIVICI';
  content=heading('What comes next','Upcoming <em>work.</em>','The next production tasks, in the order the series is currently developing.')+
   '<div class="roadmap-grid"><div class="roadmap-primary"><span class="eyebrow">01 / CURRENT PRIORITY</span><h2>Finish Nerva</h2><p>Section 4 — <em>A Son for Rome</em> — is still unwritten. The first three original narration drafts are available in the Episode 2 dossier.</p><div class="roadmap-actions">'+link('prompts.html?quick=nerva','Generate Section 4 prompt')+link('episode.html?id=02','Read existing draft','outline')+'</div><div class="roadmap-progress"><span>3 of 4 sections drafted</span><strong>75%</strong></div><div class="progress-track"><span style="width:75%"></span></div></div><div class="roadmap-next"><span class="eyebrow">02 / NEXT EPISODE</span><h2>Trajan</h2><p>Research the next character-led episode after Nerva, confirm the historical story spine, then prepare a fresh outline.</p>'+link('prompts.html?quick=trajan','Research Trajan')+'</div></div>'+
   '<div class="roadmap-future"><div><div class="eyebrow">Further research possibilities</div><h3>Stories on the horizon</h3></div><div class="roadmap-future-items">'+(data.ideas||[]).map(i=>'<article><strong>'+esc(i.title)+'</strong><small>'+esc(i.sub)+'</small><p>'+esc(i.description)+'</p></article>').join('')+'</div></div>';
 }else{
  document.title='Production Dashboard — VENIVIDIVICI';
  content='<div class="dashboard-top"><div class="dashboard-intro"><div class="eyebrow">PRODUCTION CONTROL</div><h1>Welcome to<br><em>VENIVIDIVICI.</em></h1><p>What you have written. What is unfinished. And the next thing to create.</p><div class="dashboard-actions">'+link('prompts.html?quick=nerva','Continue Episode 2')+link('index.html?view=episodes','View episodes','outline')+'</div></div><div class="dashboard-hero-art"><img src="assets/images/logo-columns.webp" alt="Original VENIVIDIVICI three stone columns and gold engraved title"></div></div>'+
   '<div class="dashboard-sectionhead"><span class="eyebrow">CURRENT SERIES STATUS</span><a href="index.html?view=episodes">All episodes ↗</a></div>'+
   '<div class="dash-stats"><a class="dash-stat" href="episode.html?id=01"><span class="eyebrow">EPISODE 01 / DOMITIAN</span><strong>Written</strong><span class="stat-value">4 / 4 sections</span><span class="stat-desc">Narration completed. Text still to import.</span><div class="progress-track"><span style="width:100%"></span></div></a><a class="dash-stat is-current" href="episode.html?id=02"><span class="eyebrow">EPISODE 02 / NERVA</span><strong>In progress</strong><span class="stat-value">'+drafts+' / 4 sections</span><span class="stat-desc">Three full drafts are available to read.</span><div class="progress-track"><span style="width:'+(drafts*25)+'%"></span></div></a><a class="dash-stat" href="episode.html?id=03"><span class="eyebrow">EPISODE 03 / TRAJAN</span><strong>Next</strong><span class="stat-value">Planning</span><span class="stat-desc">Working proposal, not yet scripted.</span><div class="progress-track"><span style="width:0%"></span></div></a></div>'+
   '<div class="dashboard-bottom"><div class="dashboard-priority"><div class="eyebrow">NEXT ACTION</div><h2>Write <em>A Son for Rome.</em></h2><p>Continue Nerva from the conclusion of Section 3, then review the historical evidence.</p>'+link('prompts.html?quick=nerva','Open section 4 wizard')+'</div><a class="dashboard-episode-image" href="episode.html?id=02"><img src="assets/images/nerva-portrait.webp" alt="Original image of Nerva in Roman clothing"><span>EPISODE 02 · VIEW THE DRAFT ↗</span></a></div>';
 }
 elem('main').innerHTML='<div class="app-view app-view-'+esc(view)+'"><div class="app-view-inner">'+content+'</div></div>';
}
function episode(data){
 const id=new URLSearchParams(location.search).get('id')||'01';
 const ep=data.episodes.find(x=>x.id===id);
 if(!ep){elem('main').innerHTML='<section class="section"><div class="wrap"><h2>Episode not found</h2><a href="index.html">Back to index</a></div></section>';return;}
 document.title=ep.title+' — VENIVIDIVICI';
 const section=(s,i)=>'<details class="script-accordion" data-script="'+esc(s.file||'')+'"><summary><div><div class="eyebrow">Section '+String(i+1).padStart(2,'0')+'</div><strong>'+esc(s.title)+'</strong><div class="muted" style="font-size:11px">'+esc(s.status)+(s.words?' · '+s.words.toLocaleString('en-GB')+' words':'')+'</div></div><span class="arrow">＋</span></summary><div class="script-body"><p>Checking for the approved narration…</p></div></details>';
 const block=(label,title,body)=>'<div class="detail-section"><div class="eyebrow">'+label+'</div><h2>'+title+'</h2>'+body+'</div>';
 const info=block('About this episode','The story','<p>'+esc(ep.summary)+'</p><div class="eyebrow" style="margin-top:26px">Historical focus</div><ul>'+ep.context.map(v=>'<li>'+esc(v)+'</li>').join('')+'</ul>');
 const scripts=block('Narration archive','Script & <em>dialogue.</em>','<p>The original approved narration is displayed here when its text files are imported into the repository. No invented dialogue has been substituted for missing source material.</p>'+(ep.sourceDocumentUrl?'<p><a class="button small outline" href="'+esc(ep.sourceDocumentUrl)+'" target="_blank" rel="noopener noreferrer">Open original Google Doc ↗</a></p>':'')+(ep.sections.length?ep.sections.map(section).join(''):'<div class="note">No narration has been written for this proposed episode.</div>'));
 const youtube=block('YouTube','Watch the <em>episode.</em>',ep.videoUrl?'<a class="button" href="'+esc(ep.videoUrl)+'" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>':'<div class="note">No individual video URL has yet been verified for this episode. <a style="color:var(--gold2);text-decoration:underline" href="'+CHANNEL+'" target="_blank" rel="noopener noreferrer">Visit the official channel ↗</a></div>');
 const rows=[['Status',ep.status],['Period',ep.period],['Sections',ep.sections.length],['Source',ep.source],['Production note',ep.statusDetail]].map(x=>'<div class="side-line"><div class="s-label">'+esc(x[0])+'</div><div>'+esc(x[1])+'</div></div>').join('');
 const heroArt=ep.id==='01'?'assets/images/domitian-thumb.webp':ep.id==='02'?'assets/images/nerva-portrait.webp':'assets/images/logo-columns.webp';
 const heroAlt=ep.id==='01'?'Original Domitian cover artwork':ep.id==='02'?'Original Nerva portrait artwork':'VENIVIDIVICI column logo';
 elem('main').innerHTML='<section class="page-hero"><div class="wrap"><img class="detail-hero-art'+(ep.id==='03'?' detail-logo-art':'')+'" src="'+heroArt+'" alt="'+heroAlt+'"><div class="breadcrumbs"><a href="index.html">Episodes</a> / '+esc(ep.title)+'</div><div class="eyebrow">Episode '+String(ep.number).padStart(2,'0')+' · '+esc(ep.period)+'</div><h1>'+esc(ep.title)+'<br><em>'+esc(ep.subtitle)+'</em></h1><p>'+esc(ep.summary)+'</p></div></section><section class="section"><div class="wrap detail-layout"><div>'+info+scripts+youtube+'<div class="button-row"><a class="button outline" href="index.html">← All episodes</a><a class="button outline" href="prompts.html">Open production studio ↗</a></div></div><aside class="sidebar"><div class="eyebrow">Production dossier</div>'+rows+'</aside></div></section>';
 document.querySelectorAll('[data-script]').forEach(details=>details.addEventListener('toggle',async()=>{
  if(!details.open||details.dataset.loaded)return;details.dataset.loaded='1';
  const path=details.dataset.script,body=details.querySelector('.script-body');
  if(!path){body.innerHTML='<div class="note" style="margin-top:18px">Narration not yet written.</div>';return;}
  try{const res=await fetch(path);if(!res.ok)throw Error('missing');const text=await res.text();if(!text.trim())throw Error('empty');const div=document.createElement('div');div.className='narration';div.textContent=text;body.replaceChildren(div);}
  catch{body.innerHTML='<div class="note" style="margin-top:18px"><strong>Original script not yet imported.</strong> The writing was recorded in the original conversation, but the complete text file is not in the repository. Add the approved original at <code>'+esc(path)+'</code>, and this section will display automatically.</div>';}
 }));
}
function prompts(data){
 const entries=data.entries||[],categories=['All','Images','Narration','Research & planning','Art direction'];
 elem('main').innerHTML='<section class="page-hero"><div class="wrap"><div class="breadcrumbs"><a href="index.html">Home</a> / Prompts</div><div class="eyebrow">The production archive</div><h1>Prompt <em>library.</em></h1><p>Search actual recovered visual prompts, the project art direction and reusable production templates. Every entry identifies its provenance.</p></div></section><section class="section"><div class="wrap"><div class="note" style="margin-bottom:29px"><strong>Source integrity:</strong> “Original image prompt” comes verbatim from an archived generation set. “Original user request” quotes earlier production messages. “Recovered summary” paraphrases a prior direction and is NOT verbatim. “Style guide” is from development notes; “Template” was assembled later and is NOT an earlier prompt.</div><div class="prompts-layout"><aside class="filters" id="filter-sidebar"></aside><div><div class="search-row"><label class="sr-only" for="prompt-search">Search prompts</label><input type="search" id="prompt-search" placeholder="Search scenes, names, subjects or prompt text…"><span class="counter" id="prompt-count"></span></div><div id="prompt-results" aria-live="polite"></div></div></div></div></section>';
 let category='All',query='';
 function filters(){elem('filter-sidebar').innerHTML='<h3>Explore the archive</h3>'+categories.map(c=>'<button type="button" data-filter="'+esc(c)+'" class="filter-button'+(c===category?' active':'')+'">'+esc(c)+(c==='All'?'':' ('+entries.filter(p=>p.category===c).length+')')+'</button>').join('');}
 function render(){
  const list=entries.filter(p=>(category==='All'||p.category===category)&&[p.title,p.text,p.batch,p.source].join(' ').toLowerCase().includes(query.toLowerCase()));
  elem('prompt-count').textContent=list.length+' / '+entries.length;
  elem('prompt-results').innerHTML=list.length?list.map(p=>'<article class="prompt-card"><div class="prompt-head"><div><div class="eyebrow">'+esc(p.category)+' · '+esc(p.batch)+'</div><h3 class="prompt-title">'+esc(p.title)+'</h3><div class="source">'+esc(p.source)+'</div></div><span class="kind">'+(p.kind==='original'?'Original image prompt':p.kind==='original-user-message'?'Original user request':p.kind==='recovered-summary'?'Recovered summary':p.kind==='source-guide'?'Style guide':'Template')+'</span></div><div class="prompt-content"><div class="prompt-toolbar"><button type="button" class="prompt-toggle" data-toggle="'+esc(p.id)+'">Show full prompt ＋</button><button type="button" class="button small outline" data-copy="'+esc(p.id)+'">Copy prompt</button></div><div class="prompt-text" hidden>'+esc(p.text)+'</div></div></article>').join(''):'<div class="empty">No prompts found for that search.</div>';
 }
 filters();render();
 elem('filter-sidebar').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;category=b.dataset.filter;filters();render();});
 elem('prompt-search').addEventListener('input',e=>{query=e.target.value;render();});
 elem('prompt-results').addEventListener('click',async e=>{
  const toggle=e.target.closest('[data-toggle]');
  if(toggle){const body=toggle.closest('.prompt-card').querySelector('.prompt-text');body.hidden=!body.hidden;toggle.textContent=body.hidden?'Show full prompt ＋':'Hide full prompt −';return;}
  const copy=e.target.closest('[data-copy]');if(!copy)return;const prompt=entries.find(p=>p.id===copy.dataset.copy);if(!prompt)return;
  try{await navigator.clipboard.writeText(prompt.text);copy.textContent='Copied ✓';setTimeout(()=>{if(copy.isConnected)copy.textContent='Copy prompt'},1700);}catch{copy.textContent='Copy unavailable';}
 });
}
document.addEventListener('DOMContentLoaded',async()=>{
 shell();
 try{if(document.body.dataset.page==='prompts')return; // assets/studio.js runs the production wizard
 else{const data=await load('data/episodes.json');if(document.body.dataset.page==='episode')episode(data);else home(data);}}
 catch(err){console.error(err);elem('main').innerHTML='<section class="section"><div class="wrap"><h2>Could not load the archive.</h2><p class="muted">This website must be served over HTTP(S) to load the files in its data directory.</p></div></section>';}
});
