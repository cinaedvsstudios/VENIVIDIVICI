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
 {key:'characters',label:'Characters',href:'index.html?view=characters'},
 {key:'context',label:'Context',href:'index.html?view=context'},
 {key:'wizard',label:'Prompt Wizard',href:'prompts.html'},
 {key:'resources',label:'Resources',href:'index.html?view=resources'},
 {key:'about',label:'About',href:'index.html?view=about'}
];
const R=['','I','II','III','IV','V','VI','VII'];
const roman=n=>R[n]||String(n);
const originalImage=ep=>ep.id==='01'?'assets/images/domitian-thumb.webp':ep.id==='02'?'assets/images/nerva-portrait.webp':'assets/images/logo-columns.webp';
const imgClass=ep=>ep.id==='03'?'logo-image':'';
function shell(){
 $('app-header').innerHTML='<div class="dome-shell"><img class="dome-image" src="assets/images/pantheon-approved.webp" alt="" aria-hidden="true"><a class="dome-title-home" href="index.html" aria-label="VENIVIDIVICI home"><span class="visually-hidden">VENIVIDIVICI home</span></a><nav class="dome-nav" aria-label="Main site navigation">'+navItems.map(v=>'<a class="dome-hit'+(view===v.key?' is-current':'')+'" data-key="'+v.key+'" href="'+v.href+'" title="'+v.label+'" aria-label="'+v.label+'"'+(view===v.key?' aria-current="page"':'')+'><span class="visually-hidden">'+v.label+'</span></a>').join('')+'</nav></div><div class="mobile-dome"><a href="index.html" aria-label="VENIVIDIVICI home"><img class="mobile-brand" src="assets/images/logo-small.webp" alt="VENI VIDI VICI — Voices History Left Behind"></a><nav aria-label="Mobile site navigation">'+navItems.map(v=>'<a href="'+v.href+'"'+(view===v.key?' class="active" aria-current="page"':'')+'>'+v.label+'</a>').join('')+'</nav></div>';
 $('app-footer').innerHTML='VENIVIDIVICI · VOICES HISTORY LEFT BEHIND · <a class="footer-link" href="'+VVV.repository+'" target="_blank" rel="noopener noreferrer">PROJECT FILES</a>';
}
const header=(sup,title,subtitle,description='')=>'<div class="page-overline">'+sup+'</div><h1 class="page-title">'+title+'</h1><div class="page-subtitle">'+subtitle+'</div>'+(description?'<p class="page-description">'+description+'</p>':'')+'<div class="page-underline"></div>';
const pill=(label,href,alternate=false)=>'<a class="'+(alternate?'secondary-cta':'primary-cta')+'" href="'+href+'">'+label+'<span aria-hidden="true" class="arrow">→</span></a>';
function ribbon(episodes,active='02'){
 return '<nav class="episode-ribbon" aria-label="Episode timeline"><span class="ribbon-line"></span><span class="ribbon-text">EPISODES</span>'+episodes.map(ep=>'<a class="episode-point'+(ep.id===active?' is-current':'')+'" href="episode.html?id='+ep.id+'" aria-label="Episode '+ep.number+': '+esc(ep.title)+'"><span class="episode-seal">'+roman(ep.number)+'</span><span class="episode-point-title">'+esc(ep.title)+'</span><span class="episode-point-status">'+(ep.id==='01'?'Written':ep.id==='02'?'3 of 4 drafted':'Proposed')+'</span></a>').join('')+'<span class="ribbon-trail">❧</span></nav>';
}
function renderHome(data){
 document.title='VENIVIDIVICI — Production dashboard';
 $('app-main').innerHTML='<section class="portal-landing"><div class="landing-copy"><div class="overline">CURRENT TASK</div><h1 class="landing-title">SCRIPT DRAFT</h1><div class="landing-subtitle">Episode II — Nerva</div><p class="landing-description">Section IV — <em>A Son for Rome.</em><br>Complete the final narration section, continuing from the end of Section III.</p><div class="landing-meta">3 OF 4 SECTIONS DRAFTED · EPISODE NOT YET COMPLETE</div>'+pill('CONTINUE WRITING','prompts.html?quick=nerva')+'<div class="landing-links"><a href="episode.html?id=02">Read the existing Nerva script</a><a href="index.html?view=episodes">Browse episodes</a></div></div>'+ribbon(data.episodes,'02')+'</section>';
}
function renderEpisodes(data){
 let id=qs.get('id')||'02';const ep=data.episodes.find(p=>p.id===id)||data.episodes[1];
 document.title='Episode archive — VENIVIDIVICI';
 $('app-main').innerHTML='<section class="page-content">'+header('THE SERIES','EPISODE ARCHIVE','Stories Rome left behind','Select an emperor to view their episode dossier, original narration and production progress.')+'<nav class="select-episodes" aria-label="Select episode">'+data.episodes.map(e=>'<a class="ep-select-link'+(ep.id===e.id?' selected':'')+'" href="index.html?view=episodes&id='+e.id+'"><span class="ep-select-mark">'+roman(e.number)+'</span>'+esc(e.title)+'</a>').join('')+'</nav><div class="feature-story"><div class="portrait-arch"><img class="'+imgClass(ep)+'" src="'+originalImage(ep)+'" alt="'+esc(ep.title)+' original project artwork"></div><div class="feature-copy"><div class="page-overline">EPISODE '+roman(ep.number)+' · '+esc(ep.period)+'</div><h2>'+esc(ep.title)+'</h2><div class="page-subtitle">'+esc(ep.subtitle)+'</div><p>'+esc(ep.summary)+'</p><div class="feature-status">'+esc(ep.status)+'</div><div style="margin-top:23px">'+pill('OPEN EPISODE DOSSIER','episode.html?id='+ep.id)+'</div></div></div></section>';
}
function renderCharacters(data){
 document.title='Characters — VENIVIDIVICI';
 const ep=data.episodes;
 $('app-main').innerHTML='<section class="page-content">'+header('THE PEOPLE','CHARACTERS','History through those who lived it','Explore the central historical figures and the original visual material already approved for this project.')+'<div class="arts-row">'+ep.map(e=>'<a class="art-display" href="episode.html?id='+e.id+'"><figure><img src="'+originalImage(e)+'" alt="'+esc(e.title)+' project artwork"><figcaption>EPISODE '+roman(e.number)+' — '+esc(e.title)+'</figcaption></figure></a>').join('')+'</div><p class="page-context-note">Trajan’s image is not yet established in the available original character artwork, so the series logo is displayed rather than an invented portrait.</p></section>';
}
function renderContext(){
 document.title='Historical context — VENIVIDIVICI';
 $('app-main').innerHTML='<section class="page-content">'+header('THE HISTORICAL THREAD','ROME IN TRANSITION','From Domitian to Trajan','A concise production chronology connecting the first three episode subjects.')+'<div class="historical-timeline"><article class="historical-item"><div class="historical-date">18 SEPTEMBER · AD 96</div><h3>Domitian dies</h3><p>Domitian is assassinated in the imperial palace. His death closes the Flavian dynasty and begins the transition to Nerva.</p><a class="source-link" href="episode.html?id=01">Episode I — Domitian ↗</a></article><article class="historical-item"><div class="historical-date">AD 96–98</div><h3>Nerva faces the empire</h3><p>His government must navigate the Senate, the Praetorian Guard, and the pressing question of succession. The fourth narration section remains to be written.</p><a class="source-link" href="episode.html?id=02">Episode II — Nerva ↗</a></article><article class="historical-item"><div class="historical-date">AFTER NERVA · AD 98 ONWARD</div><h3>Trajan follows</h3><p>Trajan is the next planned subject, to be developed from the surviving historical evidence rather than a fixed calendar of topics.</p><a class="source-link" href="episode.html?id=03">Episode III — Trajan ↗</a></article></div></section>';
}
function renderResources(){
 document.title='Production resources — VENIVIDIVICI';
 const images=[['Three-column series emblem','assets/images/logo-columns.webp'],['Horizontal series mark','assets/images/logo-small.webp'],['Domitian episode artwork','assets/images/domitian-thumb.webp'],['Nerva portrait','assets/images/nerva-portrait.webp']];
 $('app-main').innerHTML='<section class="page-content">'+header('SERIES MATERIAL','RESOURCES','Original artwork & source material','Only approved project imagery is shown here; new character illustrations are not substituted.')+'<div class="arts-row">'+images.map(i=>'<div class="art-display"><figure><img src="'+i[1]+'" alt="'+i[0]+'"><figcaption>'+i[0]+'</figcaption></figure></div>').join('')+'</div><div class="source-links"><a class="source-link" href="'+VVV.doc2+'" target="_blank" rel="noopener noreferrer">Episode 2 working narration ↗</a><a class="source-link" href="'+VVV.repository+'" target="_blank" rel="noopener noreferrer">Project GitHub repository ↗</a><a class="source-link" href="'+VVV.channel+'" target="_blank" rel="noopener noreferrer">YouTube channel ↗</a></div></section>';
}
function renderAbout(){
 document.title='About the series — VENIVIDIVICI';
 $('app-main').innerHTML='<section class="page-content">'+header('THE SERIES','VENIVIDIVICI','Voices History Left Behind','An immersive, historically researched series about ancient Rome, told through people experiencing it.')+'<p class="editorial-paragraph">The episodes follow people through the events that shaped Rome, beginning in the final period of Domitian’s reign and continuing into the transition from Nerva to Trajan.</p><p class="editorial-paragraph">The storytelling is continuous, warm and character-led. Historical evidence governs the major events; plausible atmosphere and minor-character perspectives help bring the surroundings to life without being misrepresented as recorded testimony.</p><p class="editorial-paragraph">The project is prepared as long-form narrated videos with restrained painterly historical imagery, while research, approved scripts, visual instructions and publication materials remain separate.</p><div class="source-links"><a class="source-link" href="index.html?view=episodes">Explore the episodes</a><a class="source-link" href="prompts.html">Use the production wizard</a></div></section>';
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
 document.title='Prompt Wizard — VENIVIDIVICI';
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
 $('app-main').innerHTML='<section class="page-content wizard-content"><div class="page-overline">VENIVIDIVICI PRODUCTION</div><h1 class="page-title">PROMPT WIZARD</h1><div class="page-subtitle">Create the next Roman story.</div><div class="page-underline"></div><div class="wizard-groups" id="wizard-groups">'+renderCategories()+'</div><div class="wizard-layout"><div class="wizard-editor"><div class="page-overline" style="text-align:left">I · CHOOSE A TASK</div><div class="wizard-templates" id="wizard-templates">'+renderTemplates()+'</div><p class="wizard-tool-description" id="wizard-description">'+esc(current().description)+'</p><form id="wizard-form"><div class="page-overline" style="text-align:left">II · ENTER THE DETAILS</div><div class="wizard-fields" id="wizard-fields">'+renderFields()+'</div><div class="wizard-form-actions"><button class="primary-cta" type="submit">GENERATE PROMPT <span class="arrow">→</span></button><button class="secondary-cta" type="button" id="wizard-clear">CLEAR FIELDS</button></div></form></div><div class="wizard-result"><div class="output-heading"><h2>III · YOUR PROMPT</h2><button class="secondary-cta" type="button" id="wizard-copy" disabled>COPY</button></div><textarea id="wizard-output" aria-label="Editable generated prompt" spellcheck="true" placeholder="Choose a task, enter the details and generate a reusable prompt…"></textarea><p class="wizard-result-note">Edit the result before copying. Blank fields remain as [insert …] placeholders.</p></div></div></section>';
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
  else if(view==='characters')renderCharacters(data);
  else if(view==='context')renderContext();
  else if(view==='resources')renderResources();
  else if(view==='about')renderAbout();
  else renderHome(data);
 }catch(err){console.error('VENIVIDIVICI load failed:',err);$('app-main').innerHTML='<section class="page-content"><h1>Could not load project data.</h1><p>Please check that the site is hosted over HTTPS and that the original project data files are available.</p></section>';}
}
document.addEventListener('DOMContentLoaded',boot);