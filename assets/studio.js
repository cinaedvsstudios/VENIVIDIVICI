'use strict';
/* VENIVIDIVICI Production Studio — reusable prompts, no external API required. */
document.addEventListener('DOMContentLoaded',async function(){
 if(document.body.dataset.page!=='prompts')return;
 const root=document.getElementById('main');
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let data;
 try{const resp=await fetch('data/templates.json',{cache:'no-store'});if(!resp.ok)throw Error('Unable to load templates');data=await resp.json();}
 catch(err){root.innerHTML='<section class="section"><div class="wrap"><h2>Production templates unavailable</h2><p>Open this website through a web server so its data files can load.</p></div></section>';return;}
 const templates=data.templates;
 const groups=['Plan','Write','Review','Visuals','Publish'];
 let selected='narration';
 let values={emperor:'Nerva',year:'AD 97',section:'Section 4 — A Son for Rome',length:'Approximately 11–13 minutes',focus:'Nerva chooses a successor able to secure the allegiance of the army',continuity:'The preceding section ends: “It was to choose a successor strong enough to keep it together.”'};
 try{const saved=JSON.parse(localStorage.getItem('vvv-studio-values')||'null');if(saved&&typeof saved==='object')values={...values,...saved};}catch(_){}
 let output='';
 function current(){return templates.find(t=>t.id===selected)||templates[0];}
 function groupsUI(){return groups.map(g=>'<button type="button" class="studio-tab'+(current().group===g?' selected':'')+'" data-group="'+escape(g)+'">'+escape(g)+'</button>').join('')}
 function templateUI(){return templates.filter(t=>t.group===current().group).map(t=>'<button type="button" class="studio-template'+(t.id===selected?' selected':'')+'" data-template="'+escape(t.id)+'"><strong>'+escape(t.title)+'</strong><span>'+escape(t.description)+'</span></button>').join('')}
 function fieldUI(k){const f=data.fields[k];const v=values[k]||'';const long=['continuity','sources','extra','focus','visual'].includes(k);
 return '<label class="studio-field'+(long?' studio-field-wide':'')+'"><span>'+escape(f.label)+'</span>'+(long?'<textarea rows="2" data-field="'+escape(k)+'" placeholder="'+escape(f.hint)+'">'+escape(v)+'</textarea>':'<input type="text" data-field="'+escape(k)+'" value="'+escape(v)+'" placeholder="'+escape(f.hint)+'">')+'</label>';}
 function render(){root.innerHTML='<section class="page-hero studio-hero"><div class="wrap"><div class="breadcrumbs"><a href="index.html">Production dashboard</a> / Studio</div><div class="eyebrow">VENIVIDIVICI • Production tools</div><h1>Make the next <em>episode.</em></h1><p>Choose a production step, fill in a few details, and generate a complete reusable prompt ready to copy into ChatGPT or your image tool.</p><div class="studio-quick"><button class="studio-quick-action" type="button" data-quick="nerva"><span class="quick-dot"></span><span><strong>Continue Episode 2 — Nerva</strong><small>Write Section 4, A Son for Rome</small></span><span>↗</span></button><button class="studio-quick-action" type="button" data-quick="trajan"><span class="quick-dot"></span><span><strong>Prepare Episode 3 — Trajan</strong><small>Research and outline the next story</small></span><span>↗</span></button></div></div></section>'+
 '<section class="section studio-body"><div class="wrap"><div class="studio-workspace"><div class="eyebrow">01 / Choose a production task</div><h2>What are we <em>creating?</em></h2><div class="studio-tabs" id="studio-tabs">'+groupsUI()+'</div><div class="studio-templates" id="studio-templates">'+templateUI()+'</div><div class="thin-rule" style="margin:30px 0"></div><div class="eyebrow">02 / Fill in the details</div><h2 class="studio-minititle">Tell the wizard <em>about the scene.</em></h2><p class="muted">Only fields relevant to your selected task are shown. Leave anything blank and the output will include an <code>[insert ...]</code> placeholder you can edit later.</p><form id="studio-form"><div class="studio-fields" id="studio-fields">'+current().fields.map(fieldUI).join('')+'</div><div class="studio-actions"><button class="button" type="submit">Generate prompt <span>✦</span></button><button class="button outline" type="button" id="studio-reset">Clear details</button></div></form></div>'+
 '<div class="studio-output-panel" id="studio-output-panel"><div class="studio-output-head"><div><div class="eyebrow">03 / Your finished prompt</div><h2 class="studio-minititle">Ready to <em>copy.</em></h2></div><button class="button small" type="button" id="studio-copy" disabled>Copy prompt</button></div><div class="studio-help" id="studio-hint">Choose a task, enter your names and dates, then select <strong>Generate prompt</strong>. The full prompt will appear here.</div><textarea class="studio-prompt-result" id="studio-result" aria-label="Generated prompt" spellcheck="true" hidden></textarea><p class="studio-output-note">This wizard prepares the instructions — it does not claim to generate the episode or images automatically. You can edit the result before copying it.</p></div></div></div></section>';
 bind();
 }
 function save(){try{localStorage.setItem('vvv-studio-values',JSON.stringify(values))}catch(_){}}
 function updateFields(){document.getElementById('studio-fields').innerHTML=current().fields.map(fieldUI).join('');document.getElementById('studio-templates').innerHTML=templateUI();document.getElementById('studio-tabs').innerHTML=groupsUI();}
 function buildPrompt(){const t=current();return t.body.replace(/\{\{([a-z]+)\}\}/g,(m,k)=>String(values[k]||'').trim()||data.fields[k]?.placeholder||'[insert '+k+']');}
 function generate(scroll=true){output=buildPrompt();const text=document.getElementById('studio-result');text.value=output;text.hidden=false;document.getElementById('studio-copy').disabled=false;document.getElementById('studio-hint').hidden=true;if(scroll)document.getElementById('studio-output-panel').scrollIntoView({behavior:'smooth',block:'nearest'});}
 function setQuick(which,scroll=true){
  if(which==='nerva'){selected='narration';values={...values,emperor:'Nerva',year:'AD 97',section:'Section 4 — A Son for Rome',length:'Approximately 11–13 minutes',location:'Imperial Rome, following the Praetorian Guard crisis',focus:'Nerva must choose and publicly establish a successor strong enough to hold the empire together',people:'Nerva and Trajan; senators and frontier commanders where supported by the evidence',continuity:'Section 3 ends: “It was to choose a successor strong enough to keep it together.”',sources:'Use the approved Nerva research dossier and primary-source evidence; distinguish disputed reports and reconstruction.'};}
  else{selected='develop';values={...values,emperor:'Trajan',year:'AD 98 onward',section:'Episode 3 — planning',length:'Approximately one hour, divided into recording sections',location:'The Roman frontier and the imperial administration',focus:'Trajan takes over the empire after Nerva; establish the strongest evidence-led human story',people:'Trajan, Nerva and people established by the surviving sources',continuity:'Continue organically from Nerva choosing Trajan as successor.',sources:'Identify relevant primary sources and modern scholarship, with precise citations only when verified.'};}
  save();updateFields();if(scroll)document.getElementById('studio-tabs').scrollIntoView({behavior:'smooth',block:'nearest'});
 }
 function bind(){
  const root=document.getElementById('main');
  root.addEventListener('click',e=>{
   const q=e.target.closest('[data-quick]');if(q){setQuick(q.dataset.quick);return;}
   const group=e.target.closest('[data-group]');if(group){const first=templates.find(t=>t.group===group.dataset.group);if(first){selected=first.id;updateFields();}return;}
   const card=e.target.closest('[data-template]');if(card){selected=card.dataset.template;updateFields();return;}
  });
  document.getElementById('studio-form').addEventListener('input',e=>{const field=e.target.closest('[data-field]');if(!field)return;values[field.dataset.field]=field.value;save();});
  document.getElementById('studio-form').addEventListener('submit',e=>{e.preventDefault();generate();});
  document.getElementById('studio-reset').addEventListener('click',()=>{for(const f of current().fields)values[f]='';save();updateFields();});
  document.getElementById('studio-copy').addEventListener('click',async e=>{
   const el=e.currentTarget;const prompt=document.getElementById('studio-result').value;
   try{await navigator.clipboard.writeText(prompt);el.textContent='Copied ✓';}
   catch(_){const textarea=document.getElementById('studio-result');textarea.focus();textarea.select();try{document.execCommand('copy');el.textContent='Copied ✓';}catch(__){el.textContent='Select text to copy';}}
   setTimeout(()=>{if(el.isConnected)el.textContent='Copy prompt'},2000);
  });
 }
 render();
 const preset=new URLSearchParams(location.search).get('quick');
 if(preset==='nerva'||preset==='trajan'){setQuick(preset,false);generate(false);}
});