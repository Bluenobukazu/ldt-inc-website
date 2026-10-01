/* Positioning (visual rebuild 30.09.2026). Type leads: the same word changes weight and size with its neighbours. Uses assets/js/l2.js.
   The two squares of the first frame stay only as the evidence for the sentence that names them. */
(function(){
const {mk,canvas,clamp,init}=window.LDT_L2;
const DEC=[['Communication','Campaign in the premium register',92],['Product','Materials and finish as designed',88],['Price','Launch discount to open accounts',66],
  ['Channel','Marketplace listing for volume',14],['Distribution','More doors to reach the target',30],['Service','Customer care outsourced to save cost',42]];
const I=92,RMq=matchMedia('(prefers-reduced-motion: reduce)');
/* the same black square in two companies: large neighbours make it look smaller, small ones larger */
function eb(el,w,h){
  const g=canvas(el,w,h),s=Math.min(h*.17,w*.06),cy=h/2;
  [[w*.25,6,1.5,2.0],[w*.75,9,.3,.95]].forEach(([cx,n,k,r])=>{
    for(let i=0;i<n;i++){const a=i/n*Math.PI*2-Math.PI/2,sz=s*k,x=cx+Math.cos(a)*s*r-sz/2,y=cy+Math.sin(a)*s*r-sz/2;
      mk('rect',{x,y,width:sz,height:sz,fill:'none',stroke:'#000','stroke-width':1.4},g)}
    mk('rect',{x:cx-s/2,y:cy-s/2,width:s,height:s,fill:'#000'},g)});
}
function scen(root){
  const sc=root.querySelector('.po-dr'),inU=sc.querySelector('.inc ul'),pdU=sc.querySelector('.pdc ul'),pos=sc.querySelector('.po-pos');
  const li=d=>`<li><b>${d[0]}</b><span>${d[1]}</span></li>`;
  inU.innerHTML=DEC.map(li).join('');pdU.innerHTML=DEC.filter(d=>d[2]<80).map(li).join('');
  const movers=DEC.map((d,k)=>d[2]<80?k:-1).filter(k=>k>=0),inL=[...inU.children],pdL=[...pdU.children],fin=DEC.reduce((a,d)=>a+d[2],0)/DEC.length;
  let timers=[],io;
  const set=n=>{let s=0;DEC.forEach((d,k)=>{const j=movers.indexOf(k),moved=j>=0&&j<n;s+=j<0?d[2]:moved?d[2]:I;if(j>=0){inL[k].classList.toggle('left',moved);pdL[j].classList.toggle('on',moved)}});
    pos.style.setProperty('--pw',clamp((s/DEC.length-fin)/(I-fin)).toFixed(3))};
  return()=>{
    timers.forEach(clearTimeout);timers=[];if(io)io.disconnect();
    if(RMq.matches){set(movers.length);return}
    set(0);
    io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();movers.forEach((m,j)=>timers.push(setTimeout(()=>set(j+1),700+j*900)))}},{threshold:.45});io.observe(sc);
  };
}
function toggles(root){
  const inst=root.querySelector('.po-inst'),tg=[...root.querySelectorAll('.po-t')];
  const pick=f=>{inst.dataset.f=f;tg.forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===f))};
  tg.forEach(b=>b.addEventListener('click',()=>pick(b.dataset.f)));return()=>pick('a');
}
window.LDT_PO={init:root=>{const base=init(root,{draw:{eb}}),s=scen(root),t=toggles(root);s();return()=>{base();t();s()}}};
})();
