/* The Operating System as one drawing in three places (rebuild 02.10.2026): Layer 1 chapter 04, the Explore page, the footer of every Layer 2 page.
   One form of fine lines with four swellings (Proposition, Expansion, Operations, Commercial Architecture) and two pinches where the lines meet
   (Positioning, Delivery), above an index table whose columns lie under the swellings. Black and white only.
   Hover or focus brings a part and what it connects forward; "You are here" marks the page the visitor is on. Reduced motion draws the form once, still. */
(function(){
const NS='http://www.w3.org/2000/svg',RMq=matchMedia('(prefers-reduced-motion: reduce)'),L='ABCD';
let D=null,uid=0,lastMark=null;
const model=()=>{const {DIMS,REAL,SYS,DL,RI,ADDR}=D;
  const dims=[0,1,2,3].map(i=>{const g=SYS.find(x=>x.d===i);return{i,l:DL[i],n:DIMS[i].n,ap:DIMS[i].ap,areas:g.a.map(n=>({n,r:RI(n),a:ADDR('real',RI(n))}))}});
  const con=[['Positioning',0,1],['Delivery',2,3]].map(([n,a,b],k)=>({k,n,r:RI(n),a:ADDR('real',RI(n)),ap:REAL[RI(n)].k||'',from:dims[a],to:dims[b]}));
  return{dims,con}};
const head=d=>`<button type="button" class="sy-h" data-ddim="${d.i}" data-act aria-haspopup="dialog"><span class="sy-l" aria-hidden="true">${L[d.i]}</span><span class="n">${d.n}</span><span class="plus" aria-hidden="true">+</span></button>`;
const area=a=>`<li><button type="button" data-dreal="${a.r}" data-act aria-haspopup="dialog"><b class="ad">${a.a}</b><span>${a.n}</span><i aria-hidden="true">+</i></button></li>`;
const conn=c=>`<button type="button" class="sy-k" data-dreal="${c.r}" data-act aria-haspopup="dialog" aria-label="${c.n}, connects ${c.from.n} and ${c.to.n}"><span class="ab" aria-hidden="true">${c.a}</span><span class="n">${c.n}</span><span class="plus" aria-hidden="true">+</span></button>`;

/* the form: lines run along the page, wind around a centre line (a twisting ribbon) and meet where the swellings pinch */
function build(root,mode){
  const {dims,con}=model(),id='syc'+(++uid);
  root.classList.add('sy','sy-'+mode);
  const cols=[dims[0],con[0],dims[1],dims[2],con[1],dims[3]];
  root.innerHTML=`<div class="sy-form"><svg class="sy-svg" aria-hidden="true" focusable="false"><defs><clipPath id="${id}"><rect class="sy-clip" x="0" y="0" width="0" height="4000"/></clipPath></defs><g class="sy-base"></g><g class="sy-hl" clip-path="url(#${id})"></g></svg></div>
  <div class="sy-tab">${cols.map(c=>c.areas?`<div class="sy-c sy-d" data-d="${c.i}">${mode!=='l1'?`<p class="sy-dh" aria-hidden="true"><span class="sy-l">${L[c.i]}</span><b>${c.n}</b></p>`:''}${head(c)}${mode==='ex'?`<p class="sy-ap">${c.ap}</p>`:''}<ul>${c.areas.map(area).join('')}</ul></div>`:`<div class="sy-c sy-x" data-k="${c.k}">${conn(c)}${mode==='ex'?`<p class="sy-ap">${c.ap}</p>`:''}</div>`).join('')}</div>`;
  const svg=root.querySelector('.sy-svg'),tab=root.querySelector('.sy-tab'),base=svg.querySelector('.sy-base'),hl=svg.querySelector('.sy-hl'),clip=svg.querySelector('.sy-clip'),cEls=[...tab.children];
  const M=mode==='ft'?8:mode==='ex'?13:15,N=M*2,P1=[],P2=[];
  for(let i=0;i<N;i++){const a=document.createElementNS(NS,'path'),b=document.createElementNS(NS,'path');[a,b].forEach(p=>{p.setAttribute('pathLength','1');p.style.setProperty('--i',i)});a.setAttribute('class','sy-ln');b.setAttribute('class','sy-lh');base.appendChild(a);hl.appendChild(b);P1.push(a);P2.push(b)}
  let W=0,H=0,rng=[],pts=[],T=0,here=null,pick=null;
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
  function draw(t){if(!W||!pts.length)return;
    if(mode==='ex'){
      const C=P1.length,ST=180,cx=W/2,cy=H*.5;
      for(let j=0;j<C;j++){const f=(j-(C-1)/2)/((C-1)/2);let d='';
        for(let k=0;k<=ST;k++){const q=k/ST*Math.PI*2,ang=q+f*(.25*Math.sin(q*2-.3)+.1*Math.sin(q*5+.6)),fan=f*(W*.06+W*.075*Math.sin(q*3-.7)),rx=W*.38*(1+.14*Math.sin(q*3+.3))+fan,ry=H*.3*(1+.16*Math.cos(q*4-.5))+f*H*.065*Math.cos(q*3+.5),x=cx+rx*Math.cos(ang)+f*W*.035*Math.sin(q*2),y=cy+ry*Math.sin(ang)+f*H*.045*Math.sin(q*3+.8);d+=(k?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}
        d+='Z';P1[j].setAttribute('d',d);P2[j].setAttribute('d',d)}return}
    const step=W>900?7:6,amp=H*.5,cy=H/2,xs=[];for(let x=0;x<W+step;x+=step)xs.push(Math.min(x,W));
    const E=xs.map(env),WB=xs.map(x=>H*.05*Math.sin(x/W*Math.PI*3.1+1.3));
    for(let j=0;j<M;j++){const f=j/(M-1),r=(mode==='ft'?.62:.46)+(mode==='ft'?.38:.54)*Math.pow(f,1.15);let dt='',db='';
      for(let k=0;k<xs.length;k++){const x=xs[k],u=x/W,dr=(f-.5)*E[k]*H*.07*Math.sin(u*17+j*.3),sk=1+.15*Math.sin(u*9+1.1),sb=1-.12*Math.sin(u*11+.4),sw=1+.07*Math.sin(u*47+j*.55),y0=cy+WB[k]*E[k];
        dt+=(k?'L':'M')+x.toFixed(1)+' '+(y0-amp*E[k]*r*sk*sw+dr).toFixed(1);db+=(k?'L':'M')+x.toFixed(1)+' '+(y0+amp*E[k]*r*sb*sw+dr).toFixed(1)}
      P1[j].setAttribute('d',dt);P2[j].setAttribute('d',dt);P1[M+j].setAttribute('d',db);P2[M+j].setAttribute('d',db)}}
  /* hover and focus: a dimension brings forward itself and its connector, a connector both of its dimensions */
  const zone=ix=>{if(!rng.length)return;if(mode==='ex'){const left=ix.some(i=>i<3),right=ix.some(i=>i>2);clip.setAttribute('x',left&&!right?0:right&&!left?W*.45:0);clip.setAttribute('width',left&&right?W:W*.55);return}const l=Math.min(...ix.map(i=>rng[i][0])),r=Math.max(...ix.map(i=>rng[i][1]));clip.setAttribute('x',l);clip.setAttribute('width',r-l)};
  const show=ix=>{for(let k=0;k<6;k++)tw[k]=ix&&ix.includes(k)?1:0;root.classList.toggle('f',!!ix);cEls.forEach((c,i)=>c.classList.toggle('on',!!ix&&ix.includes(i)));if(ix)zone(ix)};
  const rest=()=>{const active=here||pick;if(active){root.classList.add('hold');zone(active)}else root.classList.remove('hold')};
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
  root._sy={cols:cEls,setHere:ix=>{here=ix;rest()},setPick:ix=>{pick=ix;rest()},layout};
  layout();upd();
  if(!host&&!ov)root.classList.add('go','done');
}


/* ---- Layer 1 chapter 04, desktop: one composition on the whole stage (1440 x 900). The scroll builds it: lines grow out of the black chapter,
   names, deep dives and connectors appear where the lines have reached them. Drawn in white, the stage blends it (difference): white on black, then black on white. ---- */
function compose(root){
  /* One continuous field of closed contour lines. The six controls sit outside
     the line field; semantic relationships are expressed only by interaction. */
  const {dims,con}=model(),dyn=root.querySelector('.cm-dyn');
  const targets=[
    {e:0,code:'A',name:dims[0].n,kind:'dim',i:dims[0].i,x:48,y:164,w:330},
    {e:1,code:'A + B',name:con[0].n,kind:'real',i:con[0].r,x:48,y:410,w:330},
    {e:2,code:'B',name:dims[1].n,kind:'dim',i:dims[1].i,x:48,y:656,w:330},
    {e:3,code:'C',name:dims[2].n,kind:'dim',i:dims[2].i,x:1062,y:164,w:330},
    {e:4,code:'C + D',name:con[1].n,kind:'real',i:con[1].r,x:1062,y:410,w:330},
    {e:5,code:'D',name:dims[3].n,kind:'dim',i:dims[3].i,x:1062,y:656,w:330}
  ];
  dyn.innerHTML=`<svg class="cm-svg" viewBox="0 0 1440 900" aria-hidden="true" focusable="false"><defs><clipPath id="cmf"><rect class="cm-front" x="0" y="0" width="0" height="900"/></clipPath><clipPath id="cmz"><rect class="cm-zone" x="0" y="0" width="0" height="0"/></clipPath></defs><g clip-path="url(#cmf)"><g class="cm-base"></g><g class="cm-hl" clip-path="url(#cmz)"></g></g></svg>`+
    targets.map(t=>`<button type="button" class="cm-a cm-target" data-e="${t.e}" data-open="approach" data-system-kind="${t.kind}" data-system-index="${t.i}" data-act aria-haspopup="dialog" style="left:${t.x}px;top:${t.y}px;width:${t.w}px"><span class="cm-code">${t.code}</span><span class="n">${t.name}</span><span class="cm-pl" aria-hidden="true">+</span></button>`).join('');
  const svg=dyn.querySelector('.cm-svg'),base=svg.querySelector('.cm-base'),hl=svg.querySelector('.cm-hl'),front=svg.querySelector('.cm-front'),zone=svg.querySelector('.cm-zone');
  const paths=[],hi=[],COUNT=42,STEPS=240;
  for(let j=0;j<COUNT;j++){
    const f=(j-(COUNT-1)/2)/((COUNT-1)/2),a=document.createElementNS(NS,'path'),b=document.createElementNS(NS,'path');
    let d='';
    for(let k=0;k<=STEPS;k++){
      const q=k/STEPS*Math.PI*2,
        twist=f*(.3*Math.sin(q*2-.4)+.13*Math.sin(q*5+.7)),ang=q+twist,
        lobe=1+.16*Math.sin(q*3+.25)+.08*Math.sin(q*5-1.15),
        fan=f*(92+118*Math.sin(q*3-.7)+46*Math.cos(q*6+.35)),
        clear=112*Math.pow(Math.max(0,Math.sin(q)),8),
        rx=470*lobe+fan,ry=286*(1+.17*Math.cos(q*4-.5))+f*(72+88*Math.cos(q*3+.5))+clear,
        fold=f*(72*Math.sin(q*2+.6)+34*Math.sin(q*7-.2)),
        x=720+rx*Math.cos(ang)+fold*Math.sin(q),
        y=465+ry*Math.sin(ang)+f*58*Math.sin(q*3+.85)+20*Math.cos(q*2.2);
      d+=(k?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)
    }
    d+='Z';
    for(const el of [a,b]){el.setAttribute('d',d);el.setAttribute('pathLength','1')}
    a.setAttribute('class','cm-ln');b.setAttribute('class','cm-lh');base.appendChild(a);hl.appendChild(b);paths.push(a);hi.push(b)
  }
  const boxes=[[120,70,520,330],[80,310,440,270],[100,550,540,320],[800,70,520,330],[920,310,440,270],[800,550,540,320]];
  const grp=e=>({0:[0,1],1:[0,1,2],2:[1,2],3:[3,4],4:[3,4,5],5:[4,5]}[e]);
  const show=ix=>{root.classList.toggle('f',!!ix);dyn.querySelectorAll('[data-e]').forEach(el=>el.classList.toggle('on',!!ix&&ix.includes(+el.dataset.e)));if(ix){const q=ix.map(i=>boxes[i]),x=Math.min(...q.map(v=>v[0])),y=Math.min(...q.map(v=>v[1])),r=Math.max(...q.map(v=>v[0]+v[2])),bt=Math.max(...q.map(v=>v[1]+v[3]));zone.setAttribute('x',x);zone.setAttribute('y',y);zone.setAttribute('width',r-x);zone.setAttribute('height',bt-y)}};
  dyn.querySelectorAll('[data-e]').forEach(el=>{const ix=grp(+el.dataset.e);['mouseenter','focusin'].forEach(ev=>el.addEventListener(ev,()=>show(ix)));['mouseleave','focusout'].forEach(ev=>el.addEventListener(ev,()=>show(null)))});
  function setP(p){front.setAttribute('width',Math.max(0,Math.min(1,p))*1440);dyn.querySelectorAll('.cm-target').forEach((el,i)=>{const o=Math.max(0,Math.min(1,(p-(.2+i*.055))/.16));el.style.opacity=o;el.style.transform=`translateY(${(1-o)*10}px)`})}
  setP(0);root._cm={setP,show};if(root.dataset.rm==='1'||RMq.matches)setP(1)
}

/* ---- Explore ---- */
function explore(m){build(m,'ex');if(lastMark)mark(lastMark[0],lastMark[1]);const q=document.querySelector('#approach .aentry'),f=m.querySelector('.sy-form');if(q&&f&&innerWidth>760){if(!q.dataset.qm){q.innerHTML='\u201c'+q.innerHTML+'\u201d';q.dataset.qm='1'}f.parentNode.insertBefore(q,f);q.classList.add('ax-top')}}
/* ---- Layer 1 chapter 04: the drawing and the table inside the pinned stage ---- */
function landing(el){build(el,'l1')}
/* ---- footer ---- */
function footer(f){
  const {dims}=model();
  f.innerHTML=`<div class="df-head"><h2 class="df-t">Navigation</h2><p class="df-s">One operating system</p></div><div class="df-sy"></div>
  <nav class="df-nav" aria-label="Layer 2"><button type="button" data-open="index" data-act aria-haspopup="dialog">Index</button>${dims.map(d=>`<button type="button" data-ddim="${d.i}" data-act aria-haspopup="dialog">${d.n}</button>`).join('')}<button type="button" data-go="7" data-act>Contact</button></nav>`;
  build(f.querySelector('.df-sy'),'ft');
}
/* A Layer 1 plate opens Explore with a temporary visual selection. This is not
   a location marker: only a page that was actually opened receives aria-current. */
function preselect(kind,i){
  const root=document.querySelector('#xMap');if(!root||!root._sy)return;
  root.querySelectorAll('.sy-c.picked').forEach(n=>n.classList.remove('picked'));
  const btn=kind==='dim'?root.querySelector(`.sy-d[data-d="${i}"] .sy-h`):root.querySelector(`[data-dreal="${i}"]`);
  const col=btn&&btn.closest('.sy-c');if(!col){root._sy.setPick(null);return}
  col.classList.add('picked');const ci=root._sy.cols.indexOf(col),groups={0:[0,1],1:[0,1,2],2:[1,2],3:[3,4],4:[3,4,5],5:[4,5]};root._sy.setPick(groups[ci]||[ci]);
  const reveal=()=>{const r=col.getBoundingClientRect();if(r.top<82||r.bottom>innerHeight-24)col.scrollIntoView({block:'center',behavior:RMq.matches?'auto':'smooth'})};
  requestAnimationFrame(reveal);setTimeout(reveal,650)
}
function clearPreselect(){const root=document.querySelector('#xMap');if(!root||!root._sy)return;root.querySelectorAll('.sy-c.picked').forEach(n=>n.classList.remove('picked'));root._sy.setPick(null)}
document.addEventListener('click',e=>{const open=e.target.closest&&e.target.closest('[data-open="approach"]');if(!open)return;if(open.dataset.systemKind)preselect(open.dataset.systemKind,+open.dataset.systemIndex);else clearPreselect()});
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
    if(type==='dim'){col.classList.add('here-dim');btn.insertAdjacentHTML('afterend',y)}
    else if(n)n.insertAdjacentHTML('afterend',y);else{const ic=btn.querySelector('i');if(ic)ic.insertAdjacentHTML('beforebegin',y);else btn.insertAdjacentHTML('beforeend',y)}
    root._sy.setHere([root._sy.cols.indexOf(col)]);
  });
}
function clear(root){root.querySelectorAll('.here,.yh').forEach(e=>{e.classList.remove('here','here-dim');if(e.classList.contains('yh'))e.remove()});root.querySelectorAll('[aria-current]').forEach(e=>e.removeAttribute('aria-current'));const sy=root.classList.contains('sy')?root:root.querySelector('.sy');if(sy&&sy._sy)sy._sy.setHere(null)}
window.LDT_XI={clear,compose:el=>{if(D)compose(el)},build(m,data){D=data;explore(m)},landing:(el,st)=>{if(D)landing(el,st)},footer:el=>{if(D)footer(el)},mark};
})();
