/* Layer 2 shared helpers (30.09.2026): SVG helpers, frame reveal, redraw on size, scroll progress per section.
   A page passes draw(root) for its illustrations and scroll = {name:(p,el)=>{}} for scroll-linked states; reduced motion gets p = 1 and all frames revealed. */
(function(){
const NS='http://www.w3.org/2000/svg',RMq=matchMedia('(prefers-reduced-motion: reduce)');
const mk=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const canvas=(el,w,h)=>{el.textContent='';return el.appendChild(mk('svg',{viewBox:`0 0 ${w} ${h}`,width:w,height:h,'aria-hidden':'true',focusable:'false'}))};
const rng=seed=>{let q=seed;return()=>((q=(q*9301+49297)%233280)/233280)};
const narrow=()=>matchMedia('(max-width:760px)').matches;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const seg=(p,a,b)=>clamp((p-a)/(b-a));
function init(root,o={}){
  const frames=[...root.querySelectorAll('.l2-f')],scr=document.getElementById('deep');let io,rz,raf;
  const go=el=>el.classList.add('in');
  const draw=()=>{root.querySelectorAll('[data-draw]').forEach(el=>{const w=el.clientWidth,h=el.clientHeight,f=o.draw&&o.draw[el.dataset.draw];if(f&&w>12&&h>12)f(el,Math.round(w),Math.round(h))});tick()};
  const redraw=()=>{cancelAnimationFrame(rz);rz=requestAnimationFrame(draw)};
  const tick=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const sc=o.scroll||{};root.querySelectorAll('[data-sp]').forEach(el=>{const f=sc[el.dataset.sp];if(!f)return;
    let p=1;if(!RMq.matches){const r=el.getBoundingClientRect(),vh=innerHeight;p=clamp((vh*.82-r.top)/(r.height+vh*.3))}
    f(p,el)})})};
  if(window.ResizeObserver)new ResizeObserver(redraw).observe(root);
  addEventListener('resize',redraw);if(scr)scr.addEventListener('scroll',tick,{passive:true});
  const reset=()=>{
    redraw();
    if(io)io.disconnect();
    frames.forEach(f=>f.classList.remove('in'));
    if(RMq.matches){frames.forEach(go);return}
    root.getBoundingClientRect();
    io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){go(e.target);io.unobserve(e.target)}}),{threshold:.3});
    frames.forEach(f=>io.observe(f));
    requestAnimationFrame(()=>go(frames[0]));
  };
  reset();return reset;
}
/* time driven run of one frame: upd(p) with p 0..1 once the frame is in view; reduced motion and reset give the final and first state */
function timed(el,dur,upd){
  const fr=el.closest('.l2-f');el.__upd=upd;
  const start=()=>{cancelAnimationFrame(el.__raf);if(RMq.matches){el.__p=1;el.__upd(1);return}const t0=performance.now();
    const f=t=>{el.__p=clamp((t-t0)/dur);el.__upd(el.__p);if(el.__p<1)el.__raf=requestAnimationFrame(f)};el.__raf=requestAnimationFrame(f)};
  if(!el.__mo){el.__mo=new MutationObserver(()=>{const on=fr.classList.contains('in');
    if(on&&!el.__run){el.__run=1;start()}else if(!on){el.__run=0;cancelAnimationFrame(el.__raf);el.__p=0;el.__upd(0)}});
    el.__mo.observe(fr,{attributes:true,attributeFilter:['class']})}
  if(RMq.matches){el.__p=1;upd(1)}else if(fr.classList.contains('in')&&!el.__run){el.__run=1;upd(0);start()}else upd(el.__p||0);
}
const ss=(a,b,v)=>{const t=seg(v,a,b);return t*t*(3-2*t)};
window.LDT_L2={mk,canvas,rng,narrow,clamp,lerp,seg,init,timed,ss};
})();
