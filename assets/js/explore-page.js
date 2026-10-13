/* LDT INC | /explore/: the map of the operating system as its own page. The drawing is the one of the Explore view; its parts lead to the Layer 2 pages */
(()=>{
const m=document.getElementById('xMap'),X=window.LDT_XI,S=window.LDT_SYSDATA;
if(!m||!X||!S)return;
X.build(m,Object.assign({nav:true},S));
m.addEventListener('click',e=>{
  const b=e.target.closest&&e.target.closest('[data-ddim],[data-dreal]');if(!b)return;
  if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
  e.preventDefault();
  const slug=b.dataset.ddim!=null?S.DIMS[+b.dataset.ddim].slug:S.REAL[+b.dataset.dreal].slug;
  LDT.cutTo(LDT.ROOT+'#'+slug)});
})();
