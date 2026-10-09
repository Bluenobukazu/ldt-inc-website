/* LDT INC | Sitemap: the preview opens the whole map in a full-screen dialog; without scripts the preview is a plain link to the map file */
(()=>{
const link=document.querySelector('[data-map]'),dlg=document.getElementById('smapDlg'),host=document.getElementById('smapHost');
if(!link||!dlg||!host||typeof dlg.showModal!=='function')return;
const body=dlg.querySelector('.sm-dbody'),zoom=dlg.querySelector('[data-zoom]');let loaded=false;
async function load(){
  if(loaded)return true;
  try{const r=await fetch(link.getAttribute('href'),{credentials:'same-origin'});if(!r.ok)throw 0;
    host.innerHTML=await r.text();loaded=true;
    const s=host.querySelector('svg');if(s){s.removeAttribute('width');s.removeAttribute('height');s.setAttribute('focusable','false')}
    host.querySelectorAll('a').forEach(a=>a.setAttribute('data-act',''));
    return true}catch(e){return false}}
link.addEventListener('click',async e=>{
  if(e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
  e.preventDefault();
  if(!(await load())){window.open(link.href,'_blank','noopener');return}
  dlg.showModal();body.scrollTop=0;body.scrollLeft=0;body.focus({preventScroll:true})});
dlg.querySelector('[data-close-map]').addEventListener('click',()=>dlg.close());
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
zoom.addEventListener('click',()=>{const fit=dlg.classList.toggle('sm-fit');zoom.textContent=fit?'Enlarge':'Fit to screen';zoom.setAttribute('aria-pressed',String(fit))});
zoom.textContent='Fit to screen';
})();
