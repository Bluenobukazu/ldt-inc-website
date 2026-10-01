/* The Operating System as one drawing in three places (visual rebuild 01.10.2026): the Layer 1 section, the Explore page, the footer of every Layer 2 page.
   Four operating areas and two connectors: Positioning joins Proposition and Expansion, Delivery joins Operations and Commercial Architecture.
   Black and white lines only. Hovering or focusing a part brings it and what it connects forward; "You are here" marks the page the visitor is on. */
(function(){
const NS='http://www.w3.org/2000/svg',RMq=matchMedia('(prefers-reduced-motion: reduce)');
let D=null;
const model=()=>{const {DIMS,REAL,SYS,DL,RI,ADDR}=D;
  const dims=[0,1,2,3].map(i=>{const g=SYS.find(x=>x.d===i);return{i,l:DL[i],n:DIMS[i].n,ap:DIMS[i].ap,areas:g.a.map(n=>({n,r:RI(n),a:ADDR('real',RI(n))}))}});
  const con=[['Positioning',0,1],['Delivery',2,3]].map(([n,a,b],k)=>({k,n,r:RI(n),a:ADDR('real',RI(n)),from:dims[a],to:dims[b]}));
  return{dims,con}};
const polys=(g,list)=>list.map(pts=>{const p=document.createElementNS(NS,'polygon');p.setAttribute('points',pts);g.appendChild(p);return p});
const btnD=d=>`<button type="button" class="xdn" data-ddim="${d.i}" data-act aria-haspopup="dialog"><span class="pill" aria-hidden="true">${d.l}</span><span class="n">${d.n}</span><span class="plus" aria-hidden="true">+</span></button>`;
const btnA=a=>`<li><button type="button" data-dreal="${a.r}" data-act aria-haspopup="dialog"><i></i><b class="ad">${a.a}</b><span>${a.n}</span></button></li>`;
const btnC=c=>`<button type="button" class="xi-l" data-dreal="${c.r}" data-act aria-haspopup="dialog" aria-label="${c.n}, connects ${c.from.n} and ${c.to.n}"><b class="ad">${c.a}</b><span class="n">${c.n}</span><span class="c" aria-hidden="true">Connects ${c.from.n} and ${c.to.n}</span></button>`;
const reveal=(el,cls)=>{if(!el)return;if(RMq.matches||!('IntersectionObserver' in window)){el.classList.add(cls);return}const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){el.classList.add(cls);io.disconnect()}},{threshold:.3});io.observe(el)};
/* hover and focus: a dimension brings forward itself and its connector; a connector both of its dimensions */
function wire(root){const cs=[...root.querySelectorAll('[data-d]')],ls=[...root.querySelectorAll('[data-k]')];
  const set=(ds,ks)=>{root.classList.toggle('f',!!ds);cs.forEach(c=>c.classList.toggle('on',!!ds&&ds.includes(+c.dataset.d)));ls.forEach(l=>l.classList.toggle('on',!!ks&&ks.includes(+l.dataset.k)))};
  cs.forEach(c=>{const d=+c.dataset.d,k=d<2?0:1;['mouseenter','focusin'].forEach(e=>c.addEventListener(e,()=>set([d],[k])));['mouseleave','focusout'].forEach(e=>c.addEventListener(e,()=>set(null,null)))});
  ls.forEach(l=>{const k=+l.dataset.k,ds=k?[2,3]:[0,1];['mouseenter','focusin'].forEach(e=>l.addEventListener(e,()=>set(ds,[k])));['mouseleave','focusout'].forEach(e=>l.addEventListener(e,()=>set(null,null)))})}

/* ---- Explore: six cells in reading order ---- */
function explore(m){
  const {dims,con}=model(),L='ABCD',other=(d,k)=>(k?[dims[2],dims[3]]:[dims[0],dims[1]]).find(x=>x.i!==d.i).n;
  const cell=(d,k)=>`<article class="xi-cell xi-d" data-d="${d.i}" style="grid-area:${L[d.i].toLowerCase()}"><span class="xi-big" aria-hidden="true">${L[d.i]}</span>${btnD(d)}<ul>${d.areas.map(btnA).join('')}</ul><p class="xi-ap">${d.ap}</p><p class="sr">Connected through ${con[k].n} to ${other(d,k)}</p></article>`;
  const lens='<svg class="xi-lens" viewBox="0 0 120 70" aria-hidden="true" focusable="false"><defs><clipPath id="xlc{k}"><circle cx="75" cy="35" r="28"/></clipPath></defs><circle cx="45" cy="35" r="28" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="75" cy="35" r="28" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="45" cy="35" r="28" fill="currentColor" clip-path="url(#xlc{k})"/></svg>';
  const x=c=>`<article class="xi-cell xi-x" data-k="${c.k}" style="grid-area:x${c.k}">${lens.replace(/\{k\}/g,c.k)}${btnC(c)}<p class="xi-cn"><span>${c.from.n}</span><i aria-hidden="true">+</i><span>${c.to.n}</span></p></article>`;
  m.innerHTML=`<div class="xi-grid">${cell(dims[0],0)}${x(con[0])}${cell(dims[1],0)}${cell(dims[2],1)}${x(con[1])}${cell(dims[3],1)}</div>`;
  wire(m);
}
/* ---- Layer 1 chapter 04: the system as one wide drawing, four planes around two black connectors ---- */
function landing(el,st){
  const {dims,con}=model(),L='ABCD';
  const PX=['0,0 372,30 372,180 0,192','628,30 1000,0 1000,192 628,180','0,208 372,218 372,388 0,400','628,218 1000,208 1000,400 628,388'];
  const BOX=[[36,8,300,176],[656,8,300,176],[36,226,300,164],[656,226,300,164]];
  const HX=['425,0 575,0 608,28 608,164 575,192 425,192 392,164 392,28','425,208 575,208 608,236 608,372 575,400 425,400 392,372 392,236'];
  const pc=(b)=>`left:${b[0]/10}%;top:${b[1]/4}%;width:${b[2]/10}%;height:${b[3]/4}%`;
  const pl=d=>`<div class="os-c os-d" data-d="${d.i}" style="${pc(BOX[d.i])};--i:${d.i}"><span class="os-big" aria-hidden="true">${L[d.i]}</span><div class="os-in">${btnD(d)}<ul>${d.areas.map(btnA).join('')}</ul></div></div>`;
  const pil=c=>`<div class="os-c os-x" data-k="${c.k}" style="left:39.2%;top:${c.k?52:0}%;width:21.6%;height:48%;--i:${c.k?4:1}">${btnC(c)}</div>`;
  const order=[0,2,1,3];
  el.innerHTML=`<svg class="os-svg" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true" focusable="false"><g class="pls">${PX.map((p,i)=>`<polygon class="pl" style="--i:${i}" pathLength="1" data-d="${i}" points="${p}"/>`).join('')}</g><line class="axis" x1="500" y1="192" x2="500" y2="208"/><g class="pil">${HX.map((p,k)=>`<polygon class="pk" data-k="${k}" points="${p}"/>`).join('')}</g></svg>`+dims.map(pl).join('')+con.map(pil).join('');
  wire(el);
  const svg=el.querySelector('.os-svg');svg.querySelectorAll('.pl').forEach(p=>{const d=+p.dataset.d,c=el.querySelector(`.os-d[data-d="${d}"]`);if(c){['mouseenter','focusin'].forEach(e=>c.addEventListener(e,()=>p.classList.add('on')));['mouseleave','focusout'].forEach(e=>c.addEventListener(e,()=>p.classList.remove('on')))}});
  svg.querySelectorAll('.pk').forEach(p=>{const k=+p.dataset.k,c=el.querySelector(`.os-x[data-k="${k}"]`);if(c){['mouseenter','focusin'].forEach(e=>c.addEventListener(e,()=>p.classList.add('on')));['mouseleave','focusout'].forEach(e=>c.addEventListener(e,()=>p.classList.remove('on')))}});
  if(st){const sync=()=>el.classList.toggle('go',st.classList.contains('sysOn'));new MutationObserver(sync).observe(st,{attributes:true,attributeFilter:['class']});sync();if(RMq.matches)el.classList.add('go')}else reveal(el,'go');
}
/* ---- the footer: the whole system as one strip; the current page is marked ---- */
function footer(f){
  const {dims,con}=model(),W=[17.6,12.2,17.6,2.8,17.6,12.2,17.6],X=W.reduce((a,w,i)=>(a.push((a[i-1]||0)+(i?W[i-1]:0)),a),[]);
  const at=(i)=>`left:${X[i]}%;width:${W[i]}%`;
  const dimEl=(d,slot)=>`<div class="df-c df-d" data-d="${d.i}" style="${at(slot)}"><div class="df-in">${btnD(d)}<ul>${d.areas.map(btnA).join('')}</ul></div></div>`;
  const conEl=(c,slot)=>`<div class="df-c df-x" data-k="${c.k}" style="${at(slot)}">${btnC(c)}</div>`;
  f.innerHTML=`<div class="df-head"><h2 class="df-t">Navigation</h2><p class="df-s">One operating system</p></div><div class="df-strip"><svg class="df-svg" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true" focusable="false"></svg>${dimEl(dims[0],0)}${conEl(con[0],1)}${dimEl(dims[1],2)}${dimEl(dims[2],4)}${conEl(con[1],5)}${dimEl(dims[3],6)}</div>
  <nav class="df-nav" aria-label="Layer 2"><button type="button" data-open="index" data-act aria-haspopup="dialog">Index</button>${dims.map(d=>`<button type="button" data-ddim="${d.i}" data-act aria-haspopup="dialog">${d.n}</button>`).join('')}<button type="button" data-go="7" data-act>Contact</button></nav>`;
  const svg=f.querySelector('.df-svg'),R=(i)=>[X[i]*10,(X[i]+W[i])*10];
  const sh=(slot,side)=>{const[a,b]=R(slot);return side==='L'?`${a},6 ${b},46 ${b},154 ${a},194`:`${a},46 ${b},6 ${b},194 ${a},154`}; /* narrows toward its connector */
  const hex=slot=>{const[a,b]=R(slot),m=(a+b)/2;return`${a+8},30 ${m},6 ${b-8},30 ${b-8},170 ${m},194 ${a+8},170`};
  const out=[['d',0,sh(0,'L')],['k',1,hex(1)],['d',1,sh(2,'R')],['d',2,sh(4,'L')],['k',3,hex(5)],['d',3,sh(6,'R')]];
  svg.innerHTML=out.map(([t,i,p])=>`<polygon class="${t==='k'?'pk':'pl'}" data-${t==='k'?'k':'d'}="${i===3&&t==='k'?1:i}" points="${p}"/>`).join('');
  svg.querySelectorAll('polygon.pk').forEach((p,i)=>p.dataset.k=i);
  wire(f);
  const sync=()=>{svg.querySelectorAll('[data-d]').forEach(p=>{const c=f.querySelector(`.df-d[data-d="${p.dataset.d}"]`);p.classList.toggle('on',c.classList.contains('on'));p.classList.toggle('here',c.classList.contains('here'))});svg.querySelectorAll('[data-k]').forEach(p=>{const c=f.querySelector(`.df-x[data-k="${p.dataset.k}"]`);p.classList.toggle('on',c.classList.contains('on'));p.classList.toggle('here',c.classList.contains('here'))})};
  new MutationObserver(sync).observe(f,{subtree:true,attributes:true,attributeFilter:['class']});
}
/* the page the visitor is on: its part of the footer carries "You are here" */
function mark(type,i){
  document.querySelectorAll('#deepFoot .here,#deepFoot .yh').forEach(e=>{e.classList.remove('here');if(e.classList.contains('yh'))e.remove()});
  const f=document.getElementById('deepFoot');if(!f)return;
  let c,b;
  if(type==='dim'){c=f.querySelector(`.df-d[data-d="${i}"]`);b=c&&c.querySelector('.xdn')}
  else{const r=D.REAL[i];const a=f.querySelector(`.df-d [data-dreal="${i}"]`);if(a){c=a.closest('.df-d');b=a}else{b=f.querySelector(`.df-x [data-dreal="${i}"]`);c=b&&b.closest('.df-x')}}
  const dm=type==='dim'?[i]:D.REAL[i].d;f.querySelectorAll('.df-nav [data-ddim]').forEach(n=>n.classList.toggle('cur',dm.includes(+n.dataset.ddim)));
  if(!c)return;c.classList.add('here');b.setAttribute('aria-current','page');
  const t=b.querySelector('.n')||b.querySelector('span:last-child')||b;t.insertAdjacentHTML('afterend','<em class="yh">You are here</em>');
}
window.LDT_XI={build(m,data){D=data;explore(m)},landing:(el,st)=>{if(D)landing(el,st)},footer:el=>{if(D)footer(el)},mark};
})();
