'use strict';
/* VENIVIDIVICI Pantheon production studio. The seven menu targets are working links. */
const VVV={channel:'https://www.youtube.com/@VoicesHistoryLeftBehind',repository:'https://github.com/cinaedvsstudios/VENIVIDIVICI',doc2:'https://docs.google.com/document/d/1kuhTBvZMVaO4BUOJiKJyO9TkjjDuD-hn937Faff6xmA/edit?usp=sharing'};
const $=id=>document.getElementById(id);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const getJSON=async path=>{const r=await fetch(path,{cache:'no-store'});if(!r.ok)throw new Error('Could not read '+path);return r.json()};
const qs=new URLSearchParams(location.search);
const page=document.body.dataset.page;
const view=page==='wizard'?'wizard':page==='episode'?'episodes':qs.get('view')||'home';
const navItems=[
 {key:'home',label:'Home',href:'index.html'},
 {key:'episodes',label:'Episodes',href:'index.html?view=episodes'},
 {key:'videos',label:'Videos',href:'index.html?view=videos'},
 {key:'wizard',label:'Prompts',href:'prompts.html'},
 {key:'links',label:'Links',href:'index.html?view=links'}
];
const iconPaths={
 home:'<path d="M4 9a9 9 0 0 0 16 0"/><path d="m4 10-2-3m2 6-3-1m5 4-2 1m16-7 2-3m-2 6 3-1m-5 4 2 1"/><path d="M12 5v12"/>',
 episodes:'<path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Z"/><path d="M12 6v14"/>',
 videos:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/>',
 wizard:'<path d="m4 20 12-12"/><path d="m14 4 1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/><path d="M19 13v4m-2-2h4M5 5v4M3 7h4"/>',
 links:'<path d="m9 14 6-6"/><path d="M10 7 8 7a4 4 0 0 0 0 8h2"/><path d="M14 17h2a4 4 0 0 0 0-8h-2"/>'
};
const navIcon=key=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(iconPaths[key]||iconPaths.home)+'</svg>';
const R=['','I','II','III','IV','V','VI','VII'];
const roman=n=>R[n]||String(n);
const originalImage=ep=>ep.id==='01'?'assets/images/domitian-thumb.webp':ep.id==='02'?'assets/images/nerva-portrait.webp':'assets/images/logo-columns.webp';
const imgClass=ep=>ep.id==='03'?'logo-image':'';
function shell(){
 const headerLinks=navItems.map(v=>'<td class="dome-nav-cell"><a class="dome-hit'+(view===v.key?' is-current':'')+'" data-key="'+v.key+'" href="'+v.href+'" aria-label="'+v.label+'"'+(view===v.key?' aria-current="page"':'')+'><img class="dome-medallion" src="assets/images/nav-'+(v.key==='wizard'?'prompts':v.key)+'.png" alt="" aria-hidden="true"><strong class="nav-label">'+v.label+'</strong></a></td>').join('');
 $('app-header').innerHTML='<div class="dome-shell"><img class="dome-image" src="assets/images/pantheon-user-lossless.webp" alt="" aria-hidden="true"><a class="dome-title-home" href="index.html" aria-label="VENIVIDIVICI home"><img class="dome-title-image" src="assets/images/logo-small.webp" alt="VENI VIDI VICI — Voices History Left Behind"></a><nav class="dome-nav" aria-label="Main site navigation"><table class="dome-nav-table" role="presentation"><tbody><tr>'+headerLinks+'</tr></tbody></table></nav></div><div class="mobile-dome"><a href="index.html" aria-label="VENIVIDIVICI home"><img class="mobile-brand" src="assets/images/logo-small.webp" alt="VENI VIDI VICI — Voices History Left Behind"></a><nav aria-label="Mobile navigation">'+navItems.map(v=>'<a href="'+v.href+'"'+(view===v.key?' class="active" aria-current="page"':'')+'>'+v.label+'</a>').join('')+'</nav></div>';
 $('app-footer').innerHTML='';
}
const header=(sup,title,subtitle,description='')=>'<div class="page-overline">'+sup+'</div><h1 class="page-title">'+title+'</h1><div class="page-subtitle">'+subtitle+'</div>'+(description?'<p class="page-description">'+description+'</p>':'')+'<div class="page-underline"></div>';
const pill=(label,href,alternate=false)=>'<a class="'+(alternate?'secondary-cta':'primary-cta')+'" href="'+href+'">'+label+'<span aria-hidden="true" class="arrow">→</span></a>';
function ribbon(episodes,active='02'){
 return '<nav class="episode-ribbon" aria-label="Episode timeline"><span class="ribbon-line"></span><span class="ribbon-text">EPISODES</span>'+episodes.map(ep=>'<a class="episode-point'+(ep.id===active?' is-current':'')+'" href="episode.html?id='+ep.id+'" aria-label="Episode '+ep.number+': '+esc(ep.title)+'"><span class="episode-seal">'+roman(ep.number)+'</span><span class="episode-point-title">'+esc(ep.title)+'</span><span class="episode-point-status">'+(ep.id==='01'?'Written':ep.id==='02'?'3 of 4 drafted':'Proposed')+'</span></a>').join('')+'<span class="ribbon-trail">❧</span></nav>';
}
function renderHome(data){
 document.title='VENIVIDIVICI — Dashboard';
 $('app-main').innerHTML='<section class="portal-landing"><div class="landing-copy"><div class="overline">NEXT TASK</div><h1 class="landing-title">A SON FOR ROME</h1><div class="landing-subtitle">Nerva · Episode II · Section IV</div><div class="landing-meta">3 / 4 NARRATION SECTIONS DRAFTED</div>'+pill('CONTINUE WRITING','prompts.html?quick=nerva')+'<div class="landing-links"><a href="episode.html?id=02">Original Nerva scripts</a></div></div>'+ribbon(data.episodes,'02')+'</section>';
}
function renderEpisodes(data){
 let id=qs.get('id')||'02';const ep=data.episodes.find(p=>p.id===id)||data.episodes[1];
 document.title='Episodes — VENIVIDIVICI';
 $('app-main').innerHTML='<section class="page-content utility-content"><h1 class="utility-title">EPISODES</h1><nav class="select-episodes" aria-label="Select episode">'+data.episodes.map(e=>'<a class="ep-select-link'+(ep.id===e.id?' selected':'')+'" href="index.html?view=episodes&id='+e.id+'"><span class="ep-select-mark">'+roman(e.number)+'</span>'+esc(e.title)+'</a>').join('')+'</nav><div class="feature-story"><div class="portrait-arch"><img class="'+imgClass(ep)+'" src="'+originalImage(ep)+'" alt="'+esc(ep.title)+' original project artwork"></div><div class="feature-copy"><div class="page-overline">EPISODE '+roman(ep.number)+' · '+esc(ep.period)+'</div><h2>'+esc(ep.title)+'</h2><div class="page-subtitle">'+esc(ep.subtitle)+'</div><p>'+esc(ep.summary)+'</p><div class="feature-status">'+esc(ep.status)+'</div><div class="utility-action">'+pill('OPEN DOSSIER','episode.html?id='+ep.id)+'</div></div></div></section>';
}
function renderVideos(data){
 document.title='Videos — VENIVIDIVICI';
 $('app-main').innerHTML='<section class="page-content utility-content"><h1 class="utility-title">VIDEOS</h1><div class="video-list">'+data.episodes.map(ep=>'<div class="video-row"><img src="'+originalImage(ep)+'" alt="" class="video-thumb '+imgClass(ep)+'"><div class="video-info"><div class="page-overline">EPISODE '+roman(ep.number)+'</div><h2>'+esc(ep.title)+'</h2><p>'+esc(ep.subtitle)+'</p><div class="video-state">'+(ep.videoUrl?'Published':'Not published')+'</div></div>'+(ep.videoUrl?'<a class="secondary-cta" href="'+esc(ep.videoUrl)+'" target="_blank" rel="noopener noreferrer">WATCH ON YOUTUBE ↗</a>':'<a class="source-link" href="episode.html?id='+ep.id+'">OPEN DOSSIER ↗</a>')+'</div>').join('')+'</div><div class="source-links"><a class="secondary-cta" href="'+VVV.channel+'" target="_blank" rel="noopener noreferrer">YOUTUBE CHANNEL ↗</a></div></section>';
}
function renderLinks(){
 document.title='Links — VENIVIDIVICI';
 const links=[['YouTube channel',VVV.channel],['Episode 2 working script',VVV.doc2],['GitHub repository',VVV.repository]];
 $('app-main').innerHTML='<section class="page-content utility-content"><h1 class="utility-title">LINKS</h1><div class="useful-links">'+links.map(([name,url])=>'<a class="useful-link" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer"><span>'+esc(name)+'</span><span aria-hidden="true">↗</span></a>').join('')+'</div></section>';
}
function renderEpisode(data){
 const id=qs.get('id')||'02',ep=data.episodes.find(x=>x.id===id);
 if(!ep){$('app-main').innerHTML='<section class="page-content"><h1>Episode not found</h1><a href="index.html?view=episodes">Return to episodes</a></section>';return;}
 document.title=ep.title+' — VENIVIDIVICI';
 const sections=(ep.sections||[]).map((s,i)=>'<details class="script-item" data-script="'+esc(s.file||'')+'"><summary><span class="section-numeral">'+roman(i+1)+'</span><span style="flex:1"><strong>'+esc(s.title)+'</strong><br><span class="section-meta">'+esc(s.status)+(s.words?' · '+Number(s.words).toLocaleString('en-GB')+' words':'')+'</span></span><span class="expand-icon" aria-hidden="true">+</span></summary><div class="script-body"><p class="placeholder">Open to load the original narration.</p></div></details>').join('');
 $('app-main').innerHTML='<section class="page-content"><div class="dossier-heading"><div class="dossier-avatar"><img class="'+imgClass(ep)+'" src="'+originalImage(ep)+'" alt="Original '+esc(ep.title)+' artwork"></div><div class="dossier-heading-text"><div class="page-overline">EPISODE '+roman(ep.number)+' · '+esc(ep.period)+'</div><h1 class="page-title">'+esc(ep.title).toUpperCase()+'</h1><div class="page-subtitle">'+esc(ep.subtitle)+'</div><div class="dossier-facts">'+esc(ep.status)+'</div></div></div><p class="page-description">'+esc(ep.summary)+'</p><div class="page-underline"></div><div class="page-overline">NARRATION SECTIONS</div><div class="script-list">'+(sections||'<p class="page-context-note">This episode has not been written. Its research and outline are the next development step.</p>')+'</div><div class="dossier-action-row">'+(ep.sourceDocumentUrl?'<a class="secondary-cta" href="'+esc(ep.sourceDocumentUrl)+'" target="_blank" rel="noopener noreferrer">Original Google Doc ↗</a>':'')+(ep.id==='02'?pill('WRITE SECTION IV','prompts.html?quick=nerva'):ep.id==='03'?pill('RESEARCH TRAJAN','prompts.html?quick=trajan'):'')+'<a class="secondary-cta" href="index.html?view=episodes">Browse all episodes ↗</a></div><p class="page-context-note">'+(ep.videoUrl?'<a class="source-link" href="'+esc(ep.videoUrl)+'" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>':'There is no verified published episode video link yet.')+'</p></section>';
 document.querySelectorAll('.script-item').forEach(d=>d.addEventListener('toggle',async()=>{
  if(!d.open||d.dataset.loaded)return;d.dataset.loaded='1';const path=d.dataset.script,body=d.querySelector('.script-body');
  if(!path){body.innerHTML='<p class="placeholder">This narration section has not yet been written.</p>';return;}
  try{const r=await fetch(path,{cache:'no-store'});if(!r.ok)throw Error('missing');const t=(await r.text()).trim();if(!t)throw Error('empty');const div=document.createElement('div');div.className='narration';div.textContent=t;body.replaceChildren(div);}
  catch{body.innerHTML='<p class="placeholder">The original script text has not yet been imported into the repository. No substitute narration is displayed.</p>';}
 }));
}
async function renderWizard(){
 document.title='Prompts — VENIVIDIVICI';
 const data=await getJSON('data/templates.json');
 const groups=['Plan','Write','Review','Visuals','Publish'];
 let chosen='narration';
 let values={emperor:'Nerva',year:'AD 97',section:'Section 4 — A Son for Rome',length:'Approximately 11–13 minutes',focus:'Nerva chooses a successor able to secure allegiance of the army',continuity:'Section 3 ends: “It was to choose a successor strong enough to keep it together.”'};
 try{const saved=JSON.parse(localStorage.getItem('venividivici-wizard')||'null');if(saved&&typeof saved==='object')values={...values,...saved}}catch(_){}
 const preset=qs.get('quick');
 if(preset==='nerva'){
  chosen='narration';values={...values,emperor:'Nerva',year:'AD 97',section:'Section 4 — A Son for Rome',length:'Approximately 11–13 minutes',location:'Rome and the imperial administration following the Praetorian crisis',focus:'Nerva chooses and establishes a credible successor who can secure the empire',people:'Nerva, Trajan and only historically evidenced participants',continuity:'Section 3 ends: “It was to choose a successor strong enough to keep it together.”',sources:'Use the project research and verify surviving ancient reports; do not invent political or military incidents.'};
 }else if(preset==='trajan'){
  chosen='develop';values={...values,emperor:'Trajan',year:'AD 98 onward',section:'Episode 3 — planning',length:'Approximately one-hour narration',location:'Imperial administration and Roman frontier, as evidence supports',focus:'Identify a strong, character-led narrative for Trajan becoming emperor after Nerva',people:'Trajan, Nerva and historical people established by sources',continuity:'Follow on naturally from the close of Nerva’s reign',sources:'Use surviving primary sources and reputable modern scholarship; flag disputes clearly.'};
 }
 const current=()=>data.templates.find(t=>t.id===chosen)||data.templates[0];
 const store=()=>{try{localStorage.setItem('venividivici-wizard',JSON.stringify(values))}catch(_){}};
 const fillTemplate=()=>current().body.replace(/\{\{([a-z]+)\}\}/g,(whole,k)=>String(values[k]||'').trim()||data.fields[k]?.placeholder||'[insert '+k+']');
 const renderCategories=()=>groups.map(g=>'<button type="button" class="wizard-group'+(current().group===g?' active':'')+'" data-group="'+g+'">'+g+'</button>').join('');
 const renderTemplates=()=>data.templates.filter(t=>t.group===current().group).map(t=>'<button type="button" class="wizard-template'+(current().id===t.id?' active':'')+'" data-template="'+esc(t.id)+'">'+esc(t.title)+'</button>').join('');
 const renderFields=()=>current().fields.map(k=>{const f=data.fields[k];const wide=['continuity','sources','extra','focus','visual'].includes(k);return '<label class="wizard-field'+(wide?' wide':'')+'"><span class="field-label">'+esc(f.label)+'</span>'+(wide?'<textarea data-field="'+k+'" rows="2" placeholder="'+esc(f.hint)+'">'+esc(values[k]||'')+'</textarea>':'<input data-field="'+k+'" type="text" placeholder="'+esc(f.hint)+'" value="'+esc(values[k]||'')+'">')+'</label>'}).join('');
 $('app-main').innerHTML='<section class="page-content wizard-content"><h1 class="utility-title">PROMPTS</h1><div class="wizard-groups" id="wizard-groups">'+renderCategories()+'</div><div class="wizard-layout"><div class="wizard-editor"><div class="page-overline" style="text-align:left">I · CHOOSE A TASK</div><div class="wizard-templates" id="wizard-templates">'+renderTemplates()+'</div><p class="wizard-tool-description" id="wizard-description">'+esc(current().description)+'</p><form id="wizard-form"><div class="page-overline" style="text-align:left">II · ENTER THE DETAILS</div><div class="wizard-fields" id="wizard-fields">'+renderFields()+'</div><div class="wizard-form-actions"><button class="primary-cta" type="submit">GENERATE PROMPT <span class="arrow">→</span></button><button class="secondary-cta" type="button" id="wizard-clear">CLEAR FIELDS</button></div></form></div><div class="wizard-result"><div class="output-heading"><h2>III · YOUR PROMPT</h2><button class="secondary-cta" type="button" id="wizard-copy" disabled>COPY</button></div><textarea id="wizard-output" aria-label="Editable generated prompt" spellcheck="true" placeholder="Choose a task, enter the details and generate a reusable prompt…"></textarea></div></div></section>';
 const redraw=()=>{$('wizard-groups').innerHTML=renderCategories();$('wizard-templates').innerHTML=renderTemplates();$('wizard-description').textContent=current().description;$('wizard-fields').innerHTML=renderFields()};
 const generate=()=>{$('wizard-output').value=fillTemplate();$('wizard-copy').disabled=false;store()};
 $('wizard-groups').addEventListener('click',e=>{const b=e.target.closest('[data-group]');if(!b)return;const t=data.templates.find(x=>x.group===b.dataset.group);if(t){chosen=t.id;redraw()}});
 $('wizard-templates').addEventListener('click',e=>{const b=e.target.closest('[data-template]');if(!b)return;chosen=b.dataset.template;redraw()});
 $('wizard-form').addEventListener('input',e=>{const field=e.target.closest('[data-field]');if(!field)return;values[field.dataset.field]=field.value;store()});
 $('wizard-form').addEventListener('submit',e=>{e.preventDefault();generate();if(window.innerWidth<1000)$('wizard-output').scrollIntoView({behavior:'smooth',block:'center'})});
 $('wizard-clear').addEventListener('click',()=>{for(const f of current().fields)values[f]='';store();redraw()});
 $('wizard-copy').addEventListener('click',async e=>{const button=e.currentTarget,txt=$('wizard-output').value;try{await navigator.clipboard.writeText(txt);button.textContent='COPIED ✓';}catch(_){const el=$('wizard-output');el.focus();el.select();try{document.execCommand('copy');button.textContent='COPIED ✓';}catch(__){button.textContent='SELECT TEXT'}}setTimeout(()=>{if(button.isConnected)button.textContent='COPY'},1600)});
 if(preset==='nerva'||preset==='trajan'){store();generate()}
}
async function boot(){
 shell();
 try{
  if(page==='wizard'){await renderWizard();return;}
  const data=await getJSON('data/episodes.json');
  if(page==='episode'){renderEpisode(data);return;}
  if(view==='episodes')renderEpisodes(data);
  else if(view==='videos')renderVideos(data);
  else if(view==='links')renderLinks();
  else renderHome(data);
 }catch(err){console.error('VENIVIDIVICI load failed:',err);$('app-main').innerHTML='<section class="page-content"><h1>Could not load project data.</h1><p>Please check that the site is hosted over HTTPS and that the original project data files are available.</p></section>';}
}
document.addEventListener('DOMContentLoaded',boot);