/* LDT INC | shared on every page: header, index layer, cursor, the black cut between pages, layers, smooth scroll */
(()=>{
const d=document,html=d.documentElement;
const ROOT=html.dataset.root||'';
const PAGE=html.dataset.page||'home';
const HOME=PAGE==='home';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=d)=>r.querySelector(s),$$=(s,r=d)=>[...r.querySelectorAll(s)];
const MOB=()=>innerWidth<=760;

/* ---------- header, identical on every page ---------- */
const hdr=d.createElement('header');hdr.id='hdr';hdr.className='chrome';
hdr.innerHTML=(HOME
  /* landing: identity top left, LDT INC takes its place once the landing is left (home.js, monolith.js) */
  ?'<div class="hdrL"><p class="who"><span class="nm">Lena Daniela Thomas</span><span class="rl">Strategic Operating Partner</span></p><button class="brand" type="button" data-go="0" data-act aria-label="LDT INC, back to start" style="opacity:0;visibility:hidden">LDT<span>INC</span></button></div>'
  :`<a class="brand" href="${ROOT||'./'}" data-cut data-act aria-label="LDT INC, back to start">LDT<span>INC</span></a>`)+
 '<nav aria-label="Main"><button type="button" data-open="index" data-act aria-haspopup="dialog">Index</button></nav>';
d.body.prepend(hdr);

/* the map of the site: the journey (01 to 08) as one line, and where each view opens off it. Hovering an entry brings its part forward. Numbers only, as the site numbers them */
function ixMap(){
  const Y=i=>50+i*88,ring=(x,y,r,k,dly)=>`<circle class="rg k-${k}" style="--d:${dly}s" cx="${x}" cy="${y}" r="${r}"/>`,dt=(x,y,r,k,dly)=>`<circle class="dt k-${k}" style="--d:${dly}s" cx="${x}" cy="${y}" r="${r}"/>`,tx=(x,y,t,k,dly,a)=>`<text class="nm k-${k}" style="--d:${dly}s" x="${x}" y="${y}"${a?` text-anchor="${a}"`:''}>${t}</text>`;
  let h='<svg viewBox="0 0 500 720" focusable="false"><path class="ax" d="M70 50V666" pathLength="1"/>';
  for(let i=0;i<8;i++)h+=dt(70,Y(i),i===7?10:5,i===3?'explore':i===4?'experience':i===6?'workshops':i===7?'contact':'j',.2+i*.12)+tx(92,Y(i)+6,'0'+(i+1),i===3?'explore':i===4?'experience':i===6?'workshops':i===7?'contact':'j',.25+i*.12);
  /* 04.1 Explore: the operating system as two pairs of overlapping circles, fourteen points in reading order */
  const cy=Y(3);h+=`<path class="br k-explore" d="M128 ${cy}H196" pathLength="1"/>`+tx(130,cy-14,'04.1','explore',1.1);
  [[250,0],[392,1]].forEach(([x,g])=>{h+=ring(x,cy,40,'explore',1.2+g*.15)+ring(x+54,cy,40,'explore',1.3+g*.15)});
  const P=[[232,cy-8,3.4],[232,cy+10,3],[276,cy,3.4],[326,cy-8,3.4],[326,cy+10,3],[374,cy-14,3.4],[374,cy+2,3],[374,cy+18,3],[420,cy,3.4],[446,cy-14,3.4],[446,cy+2,3],[446,cy+18,3],[464,cy,3],[424,cy+30,3]];
  P.forEach(([x,y,r],i)=>{h+=dt(x,y,r,'explore',1.5+i*.04)});
  /* 05.1 Experience */
  h+=`<path class="br k-experience" d="M128 ${Y(4)}H164" pathLength="1"/>`+ring(190,Y(4),22,'experience',1.4)+dt(190,Y(4),4,'experience',1.5)+tx(222,Y(4)+6,'05.1','experience',1.55);
  /* 06.1 and 07.1: the other two views off their chapters */
  h+=`<path class="br k-j" d="M128 ${Y(5)}H164" pathLength="1"/>`+ring(190,Y(5),16,'j',1.6)+tx(222,Y(5)+6,'06.1','j',1.65)+`<path class="br k-j" d="M128 ${Y(6)-14}H140L156 ${Y(6)-40}" pathLength="1"/>`+ring(172,Y(6)-52,16,'j',1.7)+tx(204,Y(6)-46,'07.1','j',1.75);
  /* 07.2 Workshops: a page of its own, five frameworks */
  const wy=Y(6)+30;h+=`<path class="br k-workshops" d="M128 ${wy-30}H142L156 ${wy+10}H262" pathLength="1"/>`+ring(330,wy+10,66,'workshops',1.8).replace('class="rg','class="rg ds')+tx(330,wy-76,'07.2','workshops',2,'middle');
  [0,1,2,3,4].forEach(i=>{h+=dt(288+i*21,wy+10,3.6,'workshops',2+i*.05)});
  return h+'</svg>';
}
/* ---------- index layer: numbers follow the chapters they belong to ---------- */
const IX=[
 ['04.1','System','Explore',HOME?'data-open="approach"':`href="${ROOT}#explore" data-cut`],
 ['05.1','Evidence','Experience',HOME?'data-open="experience"':`href="${ROOT}#experience" data-cut`],
 ['07.2','Knowledge','Workshops',PAGE==='workshops'?'data-close':`href="${ROOT}workshops/" data-cut`],
 ['08','Direct','Contact',HOME?'data-go="7"':`href="${ROOT}#contact" data-cut`]
];
const ix=d.createElement('div');ix.className='ov';ix.id='index';ix.setAttribute('role','dialog');ix.setAttribute('aria-modal','true');ix.setAttribute('aria-label','Index');ix.dataset.lenisPrevent='';
ix.innerHTML='<div class="bar"><button class="back" type="button" data-close data-act><i></i>Close</button><span class="lbl" aria-hidden="true">Index</span></div>'+
 '<div class="inner"><ol>'+IX.map(([n,lg,en,a])=>{const tag=a.startsWith('href')?'a':'button';return `<li><${tag} class="ix" ${tag==='button'?'type="button" ':''}${a} data-act><span class="n">${n}</span><span class="lg">${lg}</span><span class="en">${en}</span><i class="sweep"></i></${tag}></li>`}).join('')+
 '</ol><div class="ixm" aria-hidden="true">'+ixMap()+'</div></div>';
d.body.appendChild(ix);
{const m=ix.querySelector('.ixm'),K=['explore','experience','workshops','contact'];
 ix.querySelectorAll('.ix').forEach((a,i)=>{const on=()=>m.dataset.f=K[i],off=()=>delete m.dataset.f;['mouseenter','focus'].forEach(e=>a.addEventListener(e,on));['mouseleave','blur'].forEach(e=>a.addEventListener(e,off))})}

/* ---------- every layer carries the same header as the pages (Lena, 27.09.2026): LDT INC and Index on top,
   Back with the location beneath it, as on /workshops. In the Index itself Close takes the place of Index ---------- */
const brandHTML=()=>HOME
  ?'<button class="brand" type="button" data-go="0" data-act aria-label="LDT INC, back to start">LDT<span>INC</span></button>'
  :`<a class="brand" href="${ROOT||'./'}" data-cut data-act aria-label="LDT INC, back to start">LDT<span>INC</span></a>`;
function frameLayer(ov){
  const bar=$('.bar',ov);if(!bar||bar.dataset.framed)return;bar.dataset.framed='1';
  const isIndex=ov.id==='index',close=$('[data-close]',bar);
  const sub=d.createElement('div');sub.className='ovsub';
  if(isIndex){close.remove();bar.innerHTML=''}else{while(bar.firstChild)sub.appendChild(bar.firstChild);bar.after(sub)}
  bar.innerHTML='<div class="ovtop">'+brandHTML()+'<span class="ovr"></span></div>';
  const r=$('.ovr',bar);
  /* inside the operating system (Layer 2) the way out is the map of the system with the visitor's place marked; the Index stays one step further (Lena, 28.09.2026) */
  if(isIndex)r.appendChild(close);
  else if(ov.id==='deep')r.innerHTML='<button type="button" class="dexp" data-open="approach" data-act aria-haspopup="dialog">Explore</button>';
  else r.innerHTML='<button type="button" data-open="index" data-act aria-haspopup="dialog">Index</button>';
}
$$('.ov').forEach(frameLayer);
/* the ring on Back, which receives focus when a layer opens, shows only for keyboard use (no frame after a tap on a phone) */
addEventListener('keydown',e=>{if(e.key==='Tab'||e.key==='Enter'||e.key===' '||e.key.startsWith('Arrow'))html.classList.add('kbd')},true);
addEventListener('pointerdown',()=>html.classList.remove('kbd'),true);

/* ---------- cursor and opener ---------- */
d.body.insertAdjacentHTML('beforeend','<div class="opener" id="opener" aria-hidden="true"></div><div id="cur" aria-hidden="true"></div><div id="ring" aria-hidden="true"><b>+</b></div>');
const op=$('#opener'),cur=$('#cur'),ring=$('#ring');
let mx=-100,my=-100,rx=-100,ry=-100;
/* the pointer marks only while it moves: at rest it fades, so it never sits on top of text (Lena, 27.09.2026) */
let restT;const rest=()=>{clearTimeout(restT);d.body.classList.remove('ptr-rest');restT=setTimeout(()=>d.body.classList.add('ptr-rest'),1400)};
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;gsap.set(cur,{x:mx,y:my});ring.classList.toggle('on2',!!(e.target.closest&&e.target.closest('[data-act],a,button')));rest()},{passive:true});
d.documentElement.addEventListener('pointerleave',()=>{clearTimeout(restT);d.body.classList.add('ptr-rest')});
gsap.ticker.add(()=>{rx+=(mx-rx)*.18;ry+=(my-ry)*.18;gsap.set(ring,{x:rx,y:ry})});

/* ---------- smooth scroll ---------- */
let lenis=null;
if(!RM&&window.Lenis){lenis=new Lenis({lerp:.09});if(window.ScrollTrigger)lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
const go=(y,now)=>lenis?lenis.scrollTo(y,{immediate:!!now,force:true,duration:1.4,easing:t=>1-Math.pow(1-t,4)}):window.scrollTo({top:y,behavior:now||RM?'auto':'smooth'});

/* ---------- back to top, everywhere (Lena, 28.09.2026): once the visitor is more than a screen down, the arrow appears whenever they move
   (scrolling in either direction, the pointer) and leaves again when they rest. On the landing page "top" is the first chapter ---------- */
d.body.insertAdjacentHTML('beforeend','<button type="button" id="totop" class="chrome" data-act aria-label="Back to top"><i></i></button>');
const totop=$('#totop');
function away(){
  if(openOv){const h=openOv.clientHeight;return openOv.scrollHeight>h*1.6&&openOv.scrollTop>h*.9}
  if(HOME)return (window.LDT&&window.LDT.chapterNow||0)>0;
  const h=innerHeight;return d.scrollingElement.scrollHeight>h*1.6&&scrollY>h*.9}
let topT;
function syncTop(e){
  if(!e||!away()){clearTimeout(topT);if(!totop.matches(':focus-visible'))totop.classList.remove('on');return}
  totop.classList.add('on');clearTimeout(topT);
  topT=setTimeout(()=>{if(!totop.matches(':hover,:focus-visible'))totop.classList.remove('on')},2400)}
totop.addEventListener('mouseleave',()=>{clearTimeout(topT);topT=setTimeout(()=>totop.classList.remove('on'),1600)});
totop.addEventListener('focusout',()=>totop.classList.remove('on'));
d.addEventListener('scroll',syncTop,{passive:true,capture:true});addEventListener('resize',()=>syncTop());if(lenis)lenis.on('scroll',()=>syncTop({type:'scroll'}));
let pmT=0;addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const n=Date.now();if(n-pmT<200)return;pmT=n;syncTop(e)},{passive:true});
totop.addEventListener('click',()=>{
  if(openOv){openOv.scrollTo({top:0,behavior:RM?'auto':'smooth'});const f=$('[data-close]',openOv);f&&f.focus({preventScroll:true})}
  else if(HOME){window.LDT.goChapter&&window.LDT.goChapter(0)}else go(0);
  clearTimeout(topT);topT=setTimeout(()=>totop.classList.remove('on'),900)});

/* ---------- layers: the black cut opens from the click position across the screen ---------- */
let openOv=null,lastX=innerWidth/2,returnFocus=null;
/* layers remember where they came from: Back and Escape go one step back (Approach to Index, Deep Dive to Approach), the first layer closes to the page */
let stack=[],fromPage=false;
/* between pages the visitor keeps a trail: where they were (page, scroll position, open layers).
   Back on a page returns there; LDT INC starts fresh at the landing */
const TRAIL='ldt-trail',RET='ldt-return';
const readS=k=>{try{return JSON.parse(sessionStorage.getItem(k)||'null')}catch(e){return null}};
const writeS=(k,v)=>{try{v==null?sessionStorage.removeItem(k):sessionStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const hereUrl=()=>location.pathname+location.search;
const here=()=>({url:hereUrl(),y:Math.round(scrollY),layers:[...stack.map(x=>x.ov.id),openOv&&openOv.id].filter(id=>id&&id!=='deep')});
function pageBack(){const tr=readS(TRAIL)||[];const prev=tr.pop();if(!prev||prev.url===hereUrl())return false;writeS(TRAIL,tr);writeS(RET,prev);cutTo(prev.url);return true}
let ret=readS(RET);writeS(RET,null);if(ret&&ret.url!==hereUrl())ret=null;
addEventListener('pointerdown',e=>{lastX=e.clientX},true);
const keyX=el=>{const r=el.getBoundingClientRect();lastX=r.left+r.width/2};
/* the open layer is always released: when one layer leads straight into another (Index to Approach), the new one was still locked from before */
function setInert(on,keep){$$('body > *').forEach(e=>{if(e===keep){e.inert=false;return}if(e===op||e===cur||e===ring||e===totop||e.tagName==='SCRIPT')return;e.inert=on})}
function focusables(r){return $$('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',r).filter(e=>e.offsetParent!==null||e.getClientRects().length)}
/* pages that keep an address for an open layer (the deep dives) listen for this */
const layersChanged=()=>{d.dispatchEvent(new CustomEvent('ldt:layers'));d.querySelectorAll('.ov').forEach(o=>o.classList.toggle('play',openOv===o))};
function openLayer(id,fill,trigger,now,fresh){
  const ov=d.getElementById(id);if(!ov)return;
  if(openOv&&openOv!==ov){stack.push({ov:openOv,from:trigger||d.activeElement,scroll:openOv.scrollTop});closeLayer(true,true);if(fresh)stack=[]}else if(!openOv){returnFocus=trigger||d.activeElement;stack=[]}
  if(fill)fill();
  gsap.killTweensOf(ov);openOv=ov;lenis&&lenis.stop();html.style.overflow='hidden';ov.scrollTop=0;setInert(true,ov);
  const focusIn=()=>{const f=$('[data-close]',ov);f&&f.focus({preventScroll:true})};
  d.dispatchEvent(new CustomEvent('ldt:open',{detail:id}));layersChanged();syncTop();
  if(RM||now){gsap.set(ov,{visibility:'visible',opacity:1});focusIn();return}
  gsap.timeline().set(op,{left:lastX,width:0,opacity:1}).to(op,{left:0,width:innerWidth,duration:.55,ease:'expo.inOut'})
    .set(ov,{visibility:'visible',opacity:1}).call(focusIn).to(op,{opacity:0,duration:.35,ease:'power2.out'})
    .fromTo($$('.inner > *, .inner .dd > div > *',ov),{opacity:0,y:30},{opacity:1,y:0,stagger:.05,duration:.8,ease:'expo.out',clearProps:'transform,opacity'},'-=.3');
}
function closeLayer(instant,switching){
  if(!openOv)return;const ov=openOv;openOv=null;
  if(instant||RM)gsap.set(ov,{visibility:'hidden'});else gsap.to(ov,{opacity:0,duration:.35,ease:'power2.in',onComplete:()=>gsap.set(ov,{visibility:'hidden',opacity:1})});
  if(switching)return;
  stack=[];fromPage=false;setInert(false);syncTop();html.style.overflow='';lenis&&lenis.start();
  if(returnFocus&&returnFocus.focus&&d.contains(returnFocus))returnFocus.focus({preventScroll:true});returnFocus=null;
  layersChanged();
}
function back(){
  if(!openOv)return;const prev=stack.pop();if(!prev){if(fromPage&&pageBack())return;closeLayer();return}
  const cur=openOv;openOv=prev.ov;
  gsap.killTweensOf(prev.ov);gsap.set(prev.ov,{visibility:'visible',opacity:1});prev.ov.scrollTop=prev.scroll;setInert(true,prev.ov);
  if(RM)gsap.set(cur,{visibility:'hidden'});else gsap.to(cur,{opacity:0,duration:.35,ease:'power2.in',onComplete:()=>gsap.set(cur,{visibility:'hidden',opacity:1})});
  const f=prev.from&&prev.ov.contains(prev.from)?prev.from:$('[data-close]',prev.ov);f&&f.focus({preventScroll:true});syncTop();layersChanged();
}
addEventListener('keydown',e=>{
  if(!openOv)return;
  if(e.key==='Escape'){back();return}
  if(e.key==='Tab'){const f=focusables(openOv);if(!f.length)return;const a=f[0],z=f[f.length-1];
    if(e.shiftKey&&d.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus()}}
});

/* ---------- between pages: the same cut, then the next page loads ---------- */
function cutTo(href){
  /* the address keeps its query parameters across pages (a preview share key, for example) */
  try{const u=new URL(href,location.href);if(u.origin===location.origin){if(!u.search)u.search=location.search;href=u.pathname+u.search+u.hash}}catch(e){}
  if(RM){location.href=href;return}
  try{sessionStorage.setItem('ldt-cut','1')}catch(e){}
  lenis&&lenis.stop();
  gsap.timeline().set(op,{left:lastX,width:0,opacity:1}).to(op,{left:0,width:innerWidth,duration:.55,ease:'expo.inOut',onComplete:()=>{location.href=href}});
}
function reveal(){
  if(!html.classList.contains('cut-in'))return;
  gsap.set(op,{left:0,width:innerWidth,opacity:1});html.classList.remove('cut-in');
  gsap.to(op,{opacity:0,duration:.5,delay:.05,ease:'power2.out',onComplete:()=>gsap.set(op,{width:0})});
}
addEventListener('pageshow',e=>{if(e.persisted){gsap.killTweensOf(op);gsap.set(op,{width:0,opacity:0});html.classList.remove('cut-in');lenis&&lenis.start()}});

/* ---------- one click handler for every page ---------- */
const LDT={ROOT,PAGE,HOME,RM,MOB,$,$$,lenis,go,openLayer,closeLayer,cutTo,reveal,fills:{},goChapter:null,get open(){return openOv},get layers(){return [...stack.map(x=>x.ov.id),openOv&&openOv.id].filter(Boolean)},keyX,ret,
  /* a layer opened because the visitor arrived from another page (for example Index on /workshops to Approach): its Back returns to that page */
  arrivedInLayer(){const tr=readS(TRAIL)||[];fromPage=!!(tr.length&&tr[tr.length-1].url!==hereUrl())}};
d.addEventListener('click',e=>{
  const t=e.target.closest?e.target:null;if(!t)return;
  const cut=t.closest('a[data-cut]');
  if(cut){if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();if(e.detail===0)keyX(cut);
    if(cut.matches('.subbar .back')&&pageBack())return;
    if(cut.classList.contains('brand'))writeS(TRAIL,null);
    else if(!cut.matches('.subbar .back')){const tr=readS(TRAIL)||[];tr.push(here());writeS(TRAIL,tr.slice(-10))}
    cutTo(cut.getAttribute('href'));return}
  const o=t.closest('[data-open]');
  if(o){e.preventDefault();if(e.detail===0)keyX(o);openLayer(o.dataset.open,LDT.fills[o.dataset.open],o,false,false);return}
  const g=t.closest('[data-go]');
  if(g&&LDT.goChapter){e.preventDefault();if(openOv)closeLayer(true);LDT.goChapter(+g.dataset.go);return}
  if(t.closest('[data-close]')){e.preventDefault();back();return}
});

/* header safe zone: a quiet band in the colour of the section below keeps the header clear of content */
const band=d.createElement('div');band.id='band';band.setAttribute('aria-hidden','true');d.body.appendChild(band);
let bandC='';
function syncBand(){const zones=$$('[data-band]');let c='';if(scrollY>30)for(const z of zones){const r=z.getBoundingClientRect();if(r.top<=10&&r.bottom>60){c=z.dataset.band;break}}
  if(c!==bandC){bandC=c;band.className=c}}
addEventListener('scroll',syncBand,{passive:true});addEventListener('resize',syncBand);if(lenis)lenis.on('scroll',syncBand);
LDT.syncBand=syncBand;setTimeout(syncBand,50);

window.LDT=LDT;
if(ret&&!HOME)(d.fonts&&d.fonts.ready?d.fonts.ready:Promise.resolve()).then(()=>requestAnimationFrame(()=>{if(lenis&&lenis.resize)lenis.resize();scrollTo(0,ret.y);go(ret.y,true);ret.layers.forEach(id=>openLayer(id,LDT.fills[id],null,true))}));
if(!html.dataset.deferReveal)(d.fonts&&d.fonts.ready?d.fonts.ready:Promise.resolve()).then(reveal);
})();
