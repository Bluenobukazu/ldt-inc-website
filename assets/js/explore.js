/* The Operating System as one drawing in three places (rebuild 02.10.2026): Layer 1 chapter 04, the Explore page, the footer of every Layer 2 page.
   One form of fine lines with four swellings (Proposition, Expansion, Operations, Commercial Architecture) and two pinches where the lines meet
   (Positioning, Delivery), above an index table whose columns lie under the swellings. Black and white only.
   Hover or focus brings a part and what it connects forward; "You are here" marks the page the visitor is on. Reduced motion draws the form once, still. */
(function(){
const NS='http://www.w3.org/2000/svg',RMq=matchMedia('(prefers-reduced-motion: reduce)'),L='ABCD';
let D=null,uid=0,lastMark=null;
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
  const M=mode==='ft'?8:mode==='ex'?13:15,N=M*2,P1=[],P2=[];
  for(let i=0;i<N;i++){const a=document.createElementNS(NS,'path'),b=document.createElementNS(NS,'path');[a,b].forEach(p=>{p.setAttribute('pathLength','1');p.style.setProperty('--i',i)});a.setAttribute('class','sy-ln');b.setAttribute('class','sy-lh');base.appendChild(a);hl.appendChild(b);P1.push(a);P2.push(b)}
  let W=0,H=0,rng=[],pts=[],T=0,here=null;
  const mobile=()=>innerWidth<=760;
  const layout=()=>{W=svg.clientWidth;H=svg.clientHeight;if(!W||!H)return;svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const f=svg.getBoundingClientRect(),sc=f.width/W||1;
    rng=cEls.map(c=>{const b=c.getBoundingClientRect();return[(b.left-f.left)/sc,(b.right-f.left)/sc]});
    if(mobile()){pts=[[0,.2],[.125,1],[.25,.03],[.375,.95],[.5,.4],[.625,.95],[.75,.03],[.875,1],[1,.2]].map(([u,e])=>[u*W,e]);rng=cEls.map((c,i)=>[W*i/6,W*(i+1)/6])}
    else{const c=rng.map(r=>(r[0]+r[1])/2),V=mode==='ft'?[.16,.78,.03,.6,.3,.74,.03,.88,.14]:mode==='ex'?[.14,.96,.03,.72,.32,.9,.03,1,.13]:[.2,1,.03,.95,.4,.95,.03,1,.2];
      pts=[[0,V[0]],[c[0],V[1]],[c[1],V[2]],[c[2],V[3]],[(rng[2][1]+rng[3][0])/2,V[4]],[c[3],V[5]],[c[4],V[6]],[c[5],V[7]],[W,V[8]]];
      root.style.setProperty('--neckx',((rng[2][1]+rng[3][0])/2)+'px')}
    draw(T);if(here)zone(here)};
  const wt=[0,0,0,0,0,0],tw=[0,0,0,0,0,0];
  const env=x=>{let i=0;while(i<pts.length-2&&x>pts[i+1][0])i++;const a=pts[i],b=pts[i+1],t=Math.min(1,Math.max(0,(x-a[0])/((b[0]-a[0])||1))),s=(1-Math.cos(t*Math.PI))/2;let e=a[1]+(b[1]-a[1])*s,m=1,ad=0;
    for(let k=0;k<6;k++){if(wt[k]<.002)continue;const c=(rng[k][0]+rng[k][1])/2,sg=(rng[k][1]-rng[k][0])*.6,g=Math.exp(-((x-c)/sg)*((x-c)/sg));if(k===1||k===4)ad+=.09*wt[k]*g;else m+=.13*wt[k]*g}
    return e*m+ad};
  function draw(t){if(!W||!pts.length)return;const step=W>900?7:6,amp=H*.5,cy=H/2,xs=[];for(let x=0;x<W+step;x+=step)xs.push(Math.min(x,W));
    const E=xs.map(env),WB=xs.map(x=>H*.05*Math.sin(x/W*Math.PI*3.1+1.3));
    for(let j=0;j<M;j++){const f=j/(M-1),r=(mode==='ft'?.62:.46)+(mode==='ft'?.38:.54)*Math.pow(f,1.15);let dt='',db='';
      for(let k=0;k<xs.length;k++){const x=xs[k],u=x/W,dr=(f-.5)*E[k]*H*.07*Math.sin(u*17+j*.3),sk=1+.15*Math.sin(u*9+1.1),sb=1-.12*Math.sin(u*11+.4),sw=1+.07*Math.sin(u*47+j*.55),y0=cy+WB[k]*E[k];
        dt+=(k?'L':'M')+x.toFixed(1)+' '+(y0-amp*E[k]*r*sk*sw+dr).toFixed(1);db+=(k?'L':'M')+x.toFixed(1)+' '+(y0+amp*E[k]*r*sb*sw+dr).toFixed(1)}
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
  /* still unless a part is hovered: the swell moves, then everything rests */
  let last=0;const tick=ts=>{requestAnimationFrame(tick);if(RMq.matches||!go||ts-last<24)return;let mv=false;for(let k=0;k<6;k++){const d=tw[k]-wt[k];if(Math.abs(d)>.004){wt[k]+=d*.2;mv=true}else if(wt[k]!==tw[k]){wt[k]=tw[k];mv=true}}if(!mv)return;last=ts;draw(T)};requestAnimationFrame(tick);
  root._sy={cols:cEls,setHere:ix=>{here=ix;rest()},layout};
  layout();upd();
  if(!host&&!ov)root.classList.add('go','done');
}


/* ---- Layer 1 chapter 04, desktop: one composition on the whole stage (1440 x 900). The scroll builds it: lines grow out of the black chapter,
   names, deep dives and connectors appear where the lines have reached them. Drawn in white, the stage blends it (difference): white on black, then black on white. ---- */
function compose(root){
  const {dims,con}=model(),NSV=NS;
  const K=[[-700,505,80,.58],[-40,495,100,.58],[270,470,155,.6],[505,415,5,.2],[668,398,150,.58],[818,372,52,.82],[960,345,140,.62],[1088,312,5,.2],[1225,300,160,.8],[1384,282,0,.2]];
  const LB=[{d:0,x:270,cy:470,A:155},{d:1,x:668,cy:398,A:150},{d:2,x:960,cy:345,A:140},{d:3,x:1225,cy:300,A:160}];
  const PN=[{k:0,x:505,y:415},{k:1,x:1088,y:312}];
  const dyn=root.querySelector('.cm-dyn');
  const lobeHtml=LB.map((b,i)=>{const d=dims[b.d],bottom=b.cy+b.A*.97;return`<div class="cm-a cm-lb" data-d="${d.i}" data-e="${[0,2,3,5][i]}" style="left:${b.x-130}px;top:${b.cy-34}px;width:260px"><button type="button" class="sy-h cm-h" data-ddim="${d.i}" data-act aria-haspopup="dialog"><span class="sy-l" aria-hidden="true">${L[d.i]}</span><span class="n">${d.n}</span><span class="plus" aria-hidden="true">+</span></button></div><ul class="cm-a cm-ls" data-d="${d.i}" data-e="${[0,2,3,5][i]}" style="left:${b.x-100}px;top:${bottom+18}px;width:210px">${d.areas.map(area).join('')}</ul>`}).join('');
  const pinHtml=PN.map(p=>{const c=con[p.k];return`<div class="cm-a cm-pn" data-k="${p.k}" data-e="${p.k?4:1}" style="left:${p.x-16}px;top:${p.y-62}px"><button type="button" class="cm-k" data-dreal="${c.r}" data-act aria-haspopup="dialog" aria-label="${c.n}, connects ${c.from.n} and ${c.to.n}"><span class="cm-pl" aria-hidden="true">+</span><span class="n">${c.n}</span></button></div>`}).join('');
  dyn.innerHTML=`<svg class="cm-svg" viewBox="0 0 1440 900" aria-hidden="true" focusable="false"><defs><clipPath id="cmf"><rect class="cm-front" x="-700" y="-100" width="0" height="1100"/></clipPath><clipPath id="cmz"><rect class="cm-zone" x="0" y="0" width="0" height="900"/></clipPath></defs><g clip-path="url(#cmf)"><g class="cm-base"></g><g class="cm-hl" clip-path="url(#cmz)"></g></g></svg>`+lobeHtml+pinHtml;
  const svg=dyn.querySelector('.cm-svg'),base=svg.querySelector('.cm-base'),hl=svg.querySelector('.cm-hl'),front=svg.querySelector('.cm-front'),zone=svg.querySelector('.cm-zone');
  const M=19,P1=[],P2=[];
  for(let i=0;i<M*2;i++){const a=document.createElementNS(NSV,'path'),b=document.createElementNS(NSV,'path');a.setAttribute('class','cm-ln');b.setAttribute('class','cm-lh');base.appendChild(a);hl.appendChild(b);P1.push(a);P2.push(b)}
  const itp=(x,ix)=>{let i=0;while(i<K.length-2&&x>K[i+1][0])i++;const a=K[i],b=K[i+1],t=Math.min(1,Math.max(0,(x-a[0])/((b[0]-a[0])||1))),s=(1-Math.cos(t*Math.PI))/2;return a[ix]+(b[ix]-a[ix])*s};
  const ZN={0:[-700,540],1:[420,590],2:[440,860],3:[780,1130],4:[1030,1160],5:[1050,1400]};
  const wt=[0,0,0,0,0,0],tw=[0,0,0,0,0,0],CE=[270,505,668,960,1088,1225];
  let T=0,front0=0,vis=false;
  const lbE=[...dyn.querySelectorAll('.cm-lb')],lsE=[...dyn.querySelectorAll('.cm-ls')];
  function draw(t){const xs=[];for(let x=-700;x<=1365;x+=7)xs.push(x);
    const cy=xs.map(x=>itp(x,1)),A=xs.map((x,k)=>{let a=itp(x,2),m=1;for(let e=0;e<6;e++){if(wt[e]<.002)continue;const g=Math.exp(-Math.pow((x-CE[e])/90,2));if(e===1||e===4)a+=9*wt[e]*g;else m+=.14*wt[e]*g}return a*m}),H=xs.map(x=>itp(x,3));
    const top0=[],bot0=[],botO=[];
    for(let j=0;j<M;j++){const f=j/(M-1);let dt='',db='';
      for(let k=0;k<xs.length;k++){const x=xs[k],h=H[k],r=h+(1-h)*Math.pow(f,1.25),dr=(f-.5)*A[k]*.16*Math.sin(x*.0062+t*.18+j*.2),sk=1+.13*Math.sin(x*.0043+1.2),sb=1-.11*Math.sin(x*.0051+.4),sw=1+.08*Math.sin(x*.015+j*.55+t*.4),yy=cy[k]+14*Math.sin(x*.004+t*.16),yt=yy-A[k]*r*sk*sw+dr,yb=yy+A[k]*r*sb*sw+dr;
        dt+=(k?'L':'M')+x+' '+yt.toFixed(1);db+=(k?'L':'M')+x+' '+yb.toFixed(1);if(j===0){top0[k]=yt;bot0[k]=yb}if(j===M-1)botO[k]=yb}
      P1[j].setAttribute('d',dt);P2[j].setAttribute('d',dt);P1[M+j].setAttribute('d',db);P2[M+j].setAttribute('d',db)}
    /* names sit in the middle of their opening, deep dives hang from the lower edge of their body */
    LB.forEach((b,i)=>{const k=Math.round((b.x-xs[0])/7),c=(top0[k]+bot0[k])/2;if(lbE[i])lbE[i].style.top=(c-34)+'px';if(lsE[i])lsE[i].style.top=(botO[k]+20)+'px'})}
  const ss=v=>{v=Math.min(1,Math.max(0,v));return v*v*(3-2*v)};
  /* p: 0 to 1, how far the drawing has grown from left to right */
  function setP(p){const fx=-700+p*2140;front0=fx;front.setAttribute('width',Math.max(0,fx+700));vis=p>0;
    dyn.querySelectorAll('.cm-lb').forEach((e,i)=>{const o=ss((fx-(LB[i].x-60))/260);e.style.opacity=o;e.style.transform=`translateY(${(1-o)*14}px)`});
    dyn.querySelectorAll('.cm-ls').forEach((e,i)=>{[...e.children].forEach((li,r)=>{const o=ss((fx-(LB[i].x+30+r*36))/200);li.style.opacity=o;li.style.transform=`translateY(${(1-o)*10}px)`})});
    dyn.querySelectorAll('.cm-pn').forEach((e,i)=>{const o=ss((fx-(PN[i].x+20))/160);e.style.opacity=o;e.style.transform=`translateY(${(1-o)*10}px)`});
    if(!vis||RMq.matches)draw(T)}
  /* hover and focus: a part brings forward itself and what it connects */
  const show=ix=>{for(let k=0;k<6;k++)tw[k]=ix&&ix.includes(k)?1:0;root.classList.toggle('f',!!ix);root.querySelectorAll('[data-e]').forEach(e=>e.classList.toggle('on',!!ix&&ix.includes(+e.dataset.e)));if(ix){const l=Math.min(...ix.map(i=>ZN[i][0])),r=Math.max(...ix.map(i=>ZN[i][1]));zone.setAttribute('x',l);zone.setAttribute('width',r-l)}};
  const grp=e=>({0:[0,1],1:[0,1,2],2:[1,2,3],3:[3,4],4:[3,4,5],5:[4,5]}[e]);
  root.querySelectorAll('[data-e]').forEach(el=>{const e=+el.dataset.e;['mouseenter','focusin'].forEach(ev=>el.addEventListener(ev,()=>show(grp(e))));['mouseleave','focusout'].forEach(ev=>el.addEventListener(ev,()=>show(null)))});
  draw(0);setP(0);
  let last=0;const tick=ts=>{requestAnimationFrame(tick);if(RMq.matches||!vis||ts-last<33)return;if(!root.getClientRects().length||getComputedStyle(root).visibility==='hidden')return;last=ts;T=ts/1000;for(let k=0;k<6;k++)wt[k]+=(tw[k]-wt[k])*.16;draw(T)};requestAnimationFrame(tick);
  root._cm={setP,show};if(root.dataset.rm==='1')setP(1);
}

/* ---- Explore ---- */
function explore(m){build(m,'ex');if(lastMark)mark(lastMark[0],lastMark[1]);const q=document.querySelector('#approach .aentry'),f=m.querySelector('.sy-form');if(q&&f&&innerWidth>760){if(!q.dataset.qm){q.innerHTML='\u201c'+q.innerHTML+'\u201d';q.dataset.qm='1'}f.appendChild(q)}}
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
  lastMark=[type,i];
  document.querySelectorAll('.sy .here,.sy .yh').forEach(e=>{e.classList.remove('here','here-dim');if(e.classList.contains('yh'))e.remove()});
  document.querySelectorAll('.sy [aria-current]').forEach(e=>e.removeAttribute('aria-current'));
  const dm=type==='dim'?[i]:D.REAL[i].d;
  document.querySelectorAll('#deepFoot .df-nav [data-ddim]').forEach(n=>n.classList.toggle('cur',dm.includes(+n.dataset.ddim)));
  document.querySelectorAll('.sy').forEach(root=>{
    if(!root._sy)return;let col,btn;
    if(type==='dim'){col=root.querySelector(`.sy-d[data-d="${i}"]`);btn=col&&col.querySelector('.sy-h')}
    else{btn=root.querySelector(`[data-dreal="${i}"]`);col=btn&&btn.closest('.sy-c')}
    if(!col){root._sy.setHere(null);return}
    col.classList.add('here');btn.setAttribute('aria-current','page');
    const y='<em class="yh">You are here</em>',n=btn.querySelector('.n');
    if(type==='dim'){col.classList.add('here-dim');col.insertAdjacentHTML('afterbegin',y)}
    else if(n)n.insertAdjacentHTML('afterend',y);else{const ic=btn.querySelector('i');if(ic)ic.insertAdjacentHTML('beforebegin',y);else btn.insertAdjacentHTML('beforeend',y)}
    root._sy.setHere([root._sy.cols.indexOf(col)]);
  });
}
function clear(root){root.querySelectorAll('.here,.yh').forEach(e=>{e.classList.remove('here','here-dim');if(e.classList.contains('yh'))e.remove()});root.querySelectorAll('[aria-current]').forEach(e=>e.removeAttribute('aria-current'));const sy=root.classList.contains('sy')?root:root.querySelector('.sy');if(sy&&sy._sy)sy._sy.setHere(null)}
window.LDT_XI={clear,compose:el=>{if(D)compose(el)},build(m,data){D=data;explore(m)},landing:(el,st)=>{if(D)landing(el,st)},footer:el=>{if(D)footer(el)},mark};
})();
