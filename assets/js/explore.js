/* The Operating System as one drawing in three places (rebuild 02.10.2026): Layer 1 chapter 04, the Explore page, the footer of every Layer 2 page.
   One form of fine lines with four swellings (Proposition, Expansion, Operations, Commercial Architecture) and two pinches where the lines meet
   (Positioning, Delivery), above an index table whose columns lie under the swellings. Black and white only.
   Hover or focus brings a part and what it connects forward; "You are here" marks the page the visitor is on. Reduced motion draws the form once, still. */
(function(){
const NS='http://www.w3.org/2000/svg',RMq=matchMedia('(prefers-reduced-motion: reduce)'),L='ABCD';
let D=null,uid=0;
const model=()=>{const {DIMS,REAL,SYS,DL,RI,ADDR}=D;
  const dims=[0,1,2,3].map(i=>{const g=SYS.find(x=>x.d===i);return{i,l:DL[i],n:DIMS[i].n,ap:DIMS[i].ap,areas:g.a.map(n=>({n,r:RI(n),a:ADDR('real',RI(n))}))}});
  const con=[['Positioning',0,1],['Delivery',2,3]].map(([n,a,b],k)=>({k,n,r:RI(n),a:ADDR('real',RI(n)),from:dims[a],to:dims[b]}));
  return{dims,con}};
const head=d=>`<button type="button" class="sy-h" data-ddim="${d.i}" data-act aria-haspopup="dialog"><span class="sy-l" aria-hidden="true">${L[d.i]}</span><span class="n">${d.n}</span><span class="plus" aria-hidden="true">+</span></button>`;
const area=a=>`<li><button type="button" data-dreal="${a.r}" data-act aria-haspopup="dialog"><b class="ad">${a.a}</b><span>${a.n}</span><i aria-hidden="true">+</i></button></li>`;
const conn=c=>`<button type="button" class="sy-k" data-dreal="${c.r}" data-act aria-haspopup="dialog" aria-label="${c.n}, connects ${c.from.n} and ${c.to.n}"><span class="ab" aria-hidden="true">${c.a}</span><span class="n">${c.n}</span></button>`;

/* the form: lines run along the page, wind around a centre line (a twisting ribbon) and meet where the swellings pinch */
function build(root,mode){
  const {dims,con}=model(),id='syc'+(++uid);
  root.classList.add('sy','sy-'+mode);
  const cols=[dims[0],con[0],dims[1],dims[2],con[1],dims[3]];
  root.innerHTML=`<div class="sy-form"><svg class="sy-svg" aria-hidden="true" focusable="false"><defs><clipPath id="${id}"><rect class="sy-clip" x="0" y="0" width="0" height="4000"/></clipPath></defs><g class="sy-base"></g><g class="sy-hl" clip-path="url(#${id})"></g></svg></div>
  <div class="sy-tab">${cols.map(c=>c.areas?`<div class="sy-c sy-d" data-d="${c.i}">${head(c)}${mode==='ex'?`<p class="sy-ap">${c.ap}</p>`:''}<ul>${c.areas.map(area).join('')}</ul></div>`:`<div class="sy-c sy-x" data-k="${c.k}">${conn(c)}</div>`).join('')}</div>`;
  const svg=root.querySelector('.sy-svg'),tab=root.querySelector('.sy-tab'),base=svg.querySelector('.sy-base'),hl=svg.querySelector('.sy-hl'),clip=svg.querySelector('.sy-clip'),cEls=[...tab.children];
  const M=mode==='ft'?9:15,N=M*2,P1=[],P2=[];
  for(let i=0;i<N;i++){const a=document.createElementNS(NS,'path'),b=document.createElementNS(NS,'path');[a,b].forEach(p=>{p.setAttribute('pathLength','1');p.style.setProperty('--i',i)});a.setAttribute('class','sy-ln');b.setAttribute('class','sy-lh');base.appendChild(a);hl.appendChild(b);P1.push(a);P2.push(b)}
  let W=0,H=0,rng=[],pts=[],T=0,here=null;
  const mobile=()=>innerWidth<=760;
  const layout=()=>{W=svg.clientWidth;H=svg.clientHeight;if(!W||!H)return;svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const f=svg.getBoundingClientRect(),sc=f.width/W||1;
    rng=cEls.map(c=>{const b=c.getBoundingClientRect();return[(b.left-f.left)/sc,(b.right-f.left)/sc]});
    if(mobile()){pts=[[0,.2],[.125,1],[.25,.03],[.375,.95],[.5,.4],[.625,.95],[.75,.03],[.875,1],[1,.2]].map(([u,e])=>[u*W,e]);rng=cEls.map((c,i)=>[W*i/6,W*(i+1)/6])}
    else{const c=rng.map(r=>(r[0]+r[1])/2);pts=[[0,.2],[c[0],1],[c[1],.03],[c[2],.95],[(rng[2][1]+rng[3][0])/2,.4],[c[3],.95],[c[4],.03],[c[5],1],[W,.2]]}
    draw(T);if(here)zone(here)};
  const wt=[0,0,0,0,0,0],tw=[0,0,0,0,0,0];
  const env=x=>{let i=0;while(i<pts.length-2&&x>pts[i+1][0])i++;const a=pts[i],b=pts[i+1],t=Math.min(1,Math.max(0,(x-a[0])/((b[0]-a[0])||1))),s=(1-Math.cos(t*Math.PI))/2;let e=a[1]+(b[1]-a[1])*s,m=1,ad=0;
    for(let k=0;k<6;k++){if(wt[k]<.002)continue;const c=(rng[k][0]+rng[k][1])/2,sg=(rng[k][1]-rng[k][0])*.6,g=Math.exp(-((x-c)/sg)*((x-c)/sg));if(k===1||k===4)ad+=.09*wt[k]*g;else m+=.13*wt[k]*g}
    return e*m+ad};
  function draw(t){if(!W||!pts.length)return;const step=W>900?7:6,amp=H*.5,cy=H/2,xs=[];for(let x=0;x<W+step;x+=step)xs.push(Math.min(x,W));
    const E=xs.map(env),WB=xs.map(x=>H*.04*Math.sin(x/W*Math.PI*3.1+t*.22));
    for(let j=0;j<M;j++){const f=j/(M-1),r=.5+.5*Math.pow(f,1.1);let dt='',db='';
      for(let k=0;k<xs.length;k++){const x=xs[k],sw=1+.07*Math.sin(x*.016+j*.55+t*.45),y0=cy+WB[k]*E[k],h=amp*E[k]*r*sw;dt+=(k?'L':'M')+x.toFixed(1)+' '+(y0-h).toFixed(1);db+=(k?'L':'M')+x.toFixed(1)+' '+(y0+h).toFixed(1)}
      P1[j].setAttribute('d',dt);P2[j].setAttribute('d',dt);P1[M+j].setAttribute('d',db);P2[M+j].setAttribute('d',db)}}
  /* hover and focus: a dimension brings forward itself and its connector, a connector both of its dimensions */
  const zone=ix=>{if(!rng.length)return;const l=Math.min(...ix.map(i=>rng[i][0])),r=Math.max(...ix.map(i=>rng[i][1]));clip.setAttribute('x',l);clip.setAttribute('width',r-l)};
  const show=ix=>{for(let k=0;k<6;k++)tw[k]=ix&&ix.includes(k)?1:0;root.classList.toggle('f',!!ix);cEls.forEach((c,i)=>c.classList.toggle('on',!!ix&&ix.includes(i)));if(ix)zone(ix)};
  const rest=()=>{if(here){root.classList.add('hold');zone(here)}else root.classList.remove('hold')};
  const grp=i=>({0:[0,1],1:[0,1,2],2:[1,2],3:[3,4],4:[3,4,5],5:[4,5]}[i]);
  let tm=[];const stopSweep=()=>{tm.forEach(clearTimeout);tm=[]};
  cEls.forEach((c,i)=>{['mouseenter','focusin'].forEach(e=>c.addEventListener(e,()=>{stopSweep();show(grp(i))}));['mouseleave','focusout'].forEach(e=>c.addEventListener(e,()=>{show(null);rest()}))});
  /* the first time the drawing is on screen: its parts announce themselves one after the other */
  const sweep=()=>{stopSweep();if(RMq.matches||mode==='ft')return;root.classList.add('hold');[0,1,2,3,4,5].forEach(i=>tm.push(setTimeout(()=>show([i]),2400+i*600)));tm.push(setTimeout(()=>{show(null);rest()},2400+6*600+300))};
  /* when the drawing counts as visible */
  const host=root.closest('.stage'),ov=root.closest('.ov');
  const isGo=()=>host?host.classList.contains('sysOn'):ov?ov.classList.contains('play'):true;
  let go=false;const upd=()=>{const g=isGo();if(g===go)return;go=g;root.classList.toggle('go',g);root.classList.remove('done');stopSweep();if(g){layout();setTimeout(()=>{if(go)root.classList.add('done')},4300);sweep()}else{show(null);rest()}};
  const mo=new MutationObserver(upd);if(host||ov)mo.observe(host||ov,{attributes:true,attributeFilter:['class']});
  new ResizeObserver(layout).observe(root);addEventListener('load',layout);
  /* slow breathing; paused when hidden, still with reduced motion */
  let last=0;const tick=ts=>{requestAnimationFrame(tick);if(RMq.matches||!go||ts-last<33)return;if(getComputedStyle(root).visibility==='hidden'||!root.getClientRects().length)return;last=ts;T=ts/1000;for(let k=0;k<6;k++)wt[k]+=(tw[k]-wt[k])*.16;draw(T)};requestAnimationFrame(tick);
  root._sy={cols:cEls,setHere:ix=>{here=ix;rest()},layout};
  layout();upd();
  if(!host&&!ov)root.classList.add('go','done');
}

/* ---- Explore ---- */
function explore(m){build(m,'ex')}
/* ---- Layer 1 chapter 04: the drawing and the table inside the pinned stage ---- */
function landing(el){build(el,'l1')}
/* ---- footer ---- */
function footer(f){
  const {dims}=model();
  f.innerHTML=`<div class="df-head"><h2 class="df-t">Navigation</h2><p class="df-s">One operating system</p></div><div class="df-sy"></div>
  <nav class="df-nav" aria-label="Layer 2"><button type="button" data-open="index" data-act aria-haspopup="dialog">Index</button>${dims.map(d=>`<button type="button" data-ddim="${d.i}" data-act aria-haspopup="dialog">${d.n}</button>`).join('')}<button type="button" data-go="7" data-act>Contact</button></nav>`;
  build(f.querySelector('.df-sy'),'ft');
}
/* the page the visitor is on: its column carries "You are here" */
function mark(type,i){
  document.querySelectorAll('.sy .here,.sy .yh').forEach(e=>{e.classList.remove('here');if(e.classList.contains('yh'))e.remove()});
  document.querySelectorAll('.sy [aria-current]').forEach(e=>e.removeAttribute('aria-current'));
  const dm=type==='dim'?[i]:D.REAL[i].d;
  document.querySelectorAll('#deepFoot .df-nav [data-ddim]').forEach(n=>n.classList.toggle('cur',dm.includes(+n.dataset.ddim)));
  document.querySelectorAll('.sy').forEach(root=>{
    if(!root._sy)return;let col,btn;
    if(type==='dim'){col=root.querySelector(`.sy-d[data-d="${i}"]`);btn=col&&col.querySelector('.sy-h')}
    else{btn=root.querySelector(`[data-dreal="${i}"]`);col=btn&&btn.closest('.sy-c')}
    if(!col){root._sy.setHere(null);return}
    col.classList.add('here');btn.setAttribute('aria-current','page');
    col.insertAdjacentHTML('afterbegin','<em class="yh">You are here</em>');
    root._sy.setHere([root._sy.cols.indexOf(col)]);
  });
}
window.LDT_XI={build(m,data){D=data;explore(m)},landing:(el,st)=>{if(D)landing(el,st)},footer:el=>{if(D)footer(el)},mark};
})();
