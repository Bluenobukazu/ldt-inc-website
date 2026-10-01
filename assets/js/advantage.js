/* Advantage (visual rebuild 30.09.2026). Type leads; one device: a circle passes four tests (scroll linked) and ends with an edge over its copy.
   Uses assets/js/l2.js. Reduced motion shows the final state (p = 1). */
(function(){
const {mk,canvas,rng,narrow,clamp,lerp,seg,init}=window.LDT_L2;
const ss=(a,b,v)=>{const t=seg(v,a,b);return t*t*(3-2*t)};

/* the type specimen: a field of one letter, one of which is noticed */
function fld(el,w,h){
  const g=canvas(el,w,h),n=narrow(),cell=Math.max(n?26:34,Math.round(h/(n?6:5.6))),cols=Math.floor(w/cell),rows=Math.floor(h/cell),ox=(w-cols*cell)/2,r=rng(11);
  const hc=Math.round(cols*.62),hr=Math.floor(rows/2);
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
    const hv=(i===hc&&j===hr),d=Math.abs(i-hc)+Math.abs(j-hr);
    const t=mk('text',{x:ox+i*cell+cell/2,y:j*cell+cell*.76,'text-anchor':'middle','font-size':hv?cell*2.4:cell*.8,class:'ad-gl'+(hv?' ad-hv':''),style:`--d:${(d*.035+r()*.12).toFixed(2)}s`},g);
    t.textContent='a';
  }
}
/* the device over the three black frames: five outlines fall; two vanish unnoticed, one is noticed but not chosen, one is chosen and holds, one loses its light */
function dev(el,w,h){
  if(narrow()){el.textContent='';el.__upd=null;return}
  const g=canvas(el,w,h),R=Math.min(w*.034,h/3*.07);
  const C=[{x:.90,y0:.10,y1:.47,k:'a'},{x:.96,y0:.17,y1:.50,k:'b'},{x:.81,y0:.21,y1:.66,k:'c'},{x:.87,y0:.13,y1:.92,k:'s'},{x:.945,y0:.26,y1:.84,k:'e'}];
  const els=C.map(c=>{const gg=mk('g',{},g);
    const fill=mk('circle',{r:R,fill:'#fff','fill-opacity':0},gg),ring=mk('circle',{r:R,fill:'none',stroke:'#fff','stroke-width':2},gg);
    let halo=null,copy=null;
    if(c.k==='s'){halo=mk('circle',{r:R*1.5,fill:'none',stroke:'#fff','stroke-width':1.4,'stroke-opacity':0},gg);copy=mk('circle',{r:R,fill:'none',stroke:'#fff','stroke-width':1.6,'stroke-opacity':0},gg)}
    return{c,gg,fill,ring,halo,copy}});
  el.__upd=p=>{
    els.forEach(({c,gg,fill,ring,halo,copy})=>{
      const y=lerp(c.y0,c.y1,p),cx=c.x*w,cy=y*h;let op=1,fo=0;
      if(c.k==='a')op=1-ss(.40,.46,y);
      if(c.k==='b')op=1-ss(.42,.49,y);
      if(c.k==='c')op=1-ss(.56,.64,y);
      if(c.k==='s')fo=ss(.50,.58,y);
      if(c.k==='e'){fo=ss(.50,.58,y)*(1-ss(.72,.80,y));op=1-ss(.80,.86,y)*.75}
      gg.setAttribute('opacity',op.toFixed(3));
      [fill,ring].forEach(e=>{e.setAttribute('cx',cx);e.setAttribute('cy',cy)});fill.setAttribute('fill-opacity',fo.toFixed(3));
      if(halo){halo.setAttribute('cx',cx);halo.setAttribute('cy',cy);halo.setAttribute('stroke-opacity',ss(.74,.80,y).toFixed(3));
        const ca=ss(.88,.92,y);copy.setAttribute('cx',cx+R*.5);copy.setAttribute('cy',cy+R*.08);copy.setAttribute('stroke-opacity',ca.toFixed(3))}
    })
  };
  el.__upd(0);
}
/* the edge: a circle minus its slightly offset copy, the sliver that is left */
function cr(el,w,h){
  const g=canvas(el,w,h),R=Math.min(w,h)*.42,cx=w/2,cy=h/2,id='crm'+Math.round(Math.random()*1e6),m=mk('mask',{id},mk('defs',{},g));
  mk('rect',{x:0,y:0,width:w,height:h,fill:'#000'},m);mk('circle',{cx,cy,r:R,fill:'#fff'},m);mk('circle',{cx:cx+R*.42,cy:cy-R*.08,r:R,fill:'#000'},m);
  mk('circle',{cx,cy,r:R,fill:'#fff',mask:`url(#${id})`},g);mk('circle',{cx:cx+R*.42,cy:cy-R*.08,r:R,fill:'none',stroke:'#fff','stroke-width':1.4,'stroke-opacity':.6},g);
}
/* the reason for choice passes five parts of the operation, one after another */
function trk(el,w,h){
  const g=canvas(el,w,h),lis=[...el.closest('.ad-op').querySelectorAll('.ad-o2 li')];if(!lis.length)return;
  const top=el.getBoundingClientRect().top,ys=lis.map(l=>{const b=l.getBoundingClientRect();return b.top+b.height*.55-top}),x=w*.5,r=Math.min(8,w*.2);
  ys.forEach((y,i)=>{mk('circle',{cx:x,cy:y,r,fill:'none',stroke:'#000','stroke-width':1.6},g);mk('circle',{cx:x,cy:y,r,fill:'#000',class:'ad-tf',style:`--d:${(.6+i*.72).toFixed(2)}s`},g)});
  mk('circle',{cx:x,cy:ys[0],r:r*1.9,fill:'#000',class:'ad-mv',style:`--dy:${(ys[ys.length-1]-ys[0]).toFixed(0)}px`},g);
}
const scroll={ad1:(p,el)=>{const d=el.querySelector('[data-draw=dev]');if(d&&d.__upd)d.__upd(p)}};
window.LDT_AD={init:root=>init(root,{draw:{fld,dev,cr,trk},scroll})};
})();
