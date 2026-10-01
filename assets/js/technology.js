/* Technology (visual rebuild 30.09.2026). Rows, tabular figures, one caret; dates that disagree slide to the one that owns them. Uses assets/js/l2.js. */
(function(){
const {init}=window.LDT_L2;
window.LDT_TE={init:root=>{
  /* in the "before" block the dates sit where each place says; after reveal the "after" block slides in from those places */
  root.querySelectorAll('.te-sb .te-lane b').forEach((b,i)=>{const from=[58,16,76,90][i];b.style.left=from+'%'});
  const base=init(root,{});
  const settle=()=>root.querySelectorAll('.te-sb .te-lane b').forEach(b=>b.style.left='');
  const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))settle()},{threshold:.5});const sb=root.querySelector('.te-sb');if(sb)io.observe(sb);
  return()=>{base();root.querySelectorAll('.te-sb .te-lane b').forEach((b,i)=>{b.style.left=[58,16,76,90][i]+'%'});if(matchMedia('(prefers-reduced-motion: reduce)').matches)settle()};
}};
})();
