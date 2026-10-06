/* Commercial Architecture (visual rebuild 01.10.2026). The approved drawings (offer and five decisions as plates, two good decisions,
   one year, one account, the structure re-set) kept as the logic, staged as frames. Axonometric plates on one ground.
   Uses assets/js/l2.js. Reduced motion shows final states. */
(function(){
const {mk:smk,clamp:cl,lerp:mix,seg,init,timed,ss}=window.LDT_L2,RM=matchMedia('(prefers-reduced-motion: reduce)'),narrow=()=>matchMedia('(max-width:760px)').matches;
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const CA_PL=[
  {n:'What is included',e:'grew with every request',x:-60,y:-196,w:120,d:128,l:[0,-176],S:[-30,-90,110,-20],H:[-8,-30,22,-5]},
  {n:'Who sells it',e:'changed when a partner came in',x:-196,y:-60,w:128,d:120,l:[-176,0],S:[-110,30,40,14],H:[-20,10,36,3]},
  {n:'How it is bought',e:'set years ago, to enter the market',x:68,y:-60,w:128,d:120,l:[176,0],S:[110,-20,70,16],H:[30,6,-2,4]},
  {n:'What is agreed',e:'given to one large customer, then to everyone',x:-60,y:68,w:120,d:128,l:[0,176],S:[30,100,90,-15],H:[6,34,10,-7]}];
const CA_BASE={n:'What it earns',e:'reviewed once a year',x:-214,y:-214,w:428,d:428,z0:-16,t:8,l:[150,150],S:[0,0,-70,6],H:[16,-8,-12,2.5]};
function caKit(svg,vb){
  const ns='http://www.w3.org/2000/svg',C30=Math.cos(Math.PI/6);
  const P=(x,y,z)=>[(x-y)*C30,(x+y)*.5-z],pts=a=>a.map(q=>q.map(v=>v.toFixed(1)).join(',')).join(' ');
  const mk=(t,c,par)=>{const e=document.createElementNS(ns,t);if(c)e.setAttribute('class',c);(par||svg).appendChild(e);return e};
  const plate=(cls,par)=>{const g=mk('g',cls,par);return {g,b:mk('polygon','fb',g),s1:mk('polygon','fs',g),s2:mk('polygon','fs r',g),t:mk('polygon','ft',g)}};
  const geo=(o,s)=>{const [dx,dy,dz,r,tl]=[s[0]||0,s[1]||0,s[2]||0,s[3]||0,s[4]||0],z=(o.z0||0)+dz,t=o.t||9,cx=o.x+o.w/2,cy=o.y+o.d/2,rot=r*Math.PI/180,co=Math.cos(rot),si=Math.sin(rot);
    const tp=(x,y)=>[cx+(x-cx)*co-(y-cy)*si+dx,cy+(x-cx)*si+(y-cy)*co+dy];
    const c=[[o.x,o.y,1],[o.x+o.w,o.y,0],[o.x+o.w,o.y+o.d,0],[o.x,o.y+o.d,1]].map(([x,y,u])=>[...tp(x,y),z+tl*u]);
    return {c,t,at:(x,y,h)=>{const q=tp(x,y);return P(q[0],q[1],z+(h==null?t:h))}}};
  const face=(e,a,b,t)=>e.setAttribute('points',pts([P(...a),P(...b),P(b[0],b[1],b[2]+t),P(a[0],a[1],a[2]+t)]));
  const set=(p,G)=>{p.b.setAttribute('points',pts(G.c.map(([x,y,z])=>P(x,y,z))));face(p.s1,G.c[3],G.c[2],G.t);face(p.s2,G.c[1],G.c[2],G.t);p.t.setAttribute('points',pts(G.c.map(([x,y,z])=>P(x,y,z+G.t))))};
  const box=(x,y,w,d,h,cls,par)=>{const g=mk('g',cls,par);[[[x,y+d,0],[x+w,y+d,0],[x+w,y+d,h],[x,y+d,h]],[[x+w,y,0],[x+w,y+d,0],[x+w,y+d,h],[x+w,y,h]],[[x,y,h],[x+w,y,h],[x+w,y+d,h],[x,y+d,h]]].forEach(f=>mk('polygon','f',g).setAttribute('points',pts(f.map(v=>P(...v)))));return g};
  const put=(e,[X,Y])=>{e.style.left=(X-vb[0])/vb[2]*100+'%';e.style.top=(Y-vb[1])/vb[3]*100+'%'};
  const defs=h=>{const d=document.createElementNS(ns,'defs');d.innerHTML=h;svg.appendChild(d)};
  return {P,pts,mk,plate,geo,set,box,put,defs};
}
const sq=o=>[[o.x,o.y],[o.x+o.w,o.y],[o.x+o.w,o.y+o.d],[o.x,o.y+o.d]];
const lead=(l,a,b)=>{l.setAttribute('x1',a[0]);l.setAttribute('y1',a[1]);l.setAttribute('x2',b[0]);l.setAttribute('y2',b[1])};
const HAT='<pattern id="caBs%" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="9" height="9" fill="#fff"/><line x1="0" y1="0" x2="0" y2="9" stroke="#000" stroke-width="1.3"/></pattern>';
const tw=(el,ms,fn)=>{cancelAnimationFrame(el.__tw);if(RM.matches){fn(1);return}let t0=0;const st=ts=>{if(!t0)t0=ts;const t=cl((ts-t0)/ms);fn(t);if(t<1)el.__tw=requestAnimationFrame(st)};el.__tw=requestAnimationFrame(st)};

/* the offer and its decisions: a = how far they have come together, b = how far each has drifted with its history */
function opening(fig,uid){
  const svg=fig.querySelector('svg'),K=caKit(svg,[-400,-300,800,600]);svg.innerHTML='';fig.querySelectorAll('.cax-lb').forEach(e=>e.remove());
  K.defs(HAT.replace(/%/g,uid));
  const base=K.plate('bs'),sh=CA_PL.map(()=>K.mk('polygon','sh'));base.t.style.fill=`url(#caBs${uid})`;
  const back=[K.plate('pl'),K.plate('pl')];K.box(-60,-60,120,120,64,'cf');const front=[K.plate('pl'),K.plate('pl')],plates=[...back,...front];
  const lab=(n,e,cls)=>{const d=document.createElement('p');d.className='cax-lb'+(cls?' '+cls:'');d.setAttribute('aria-hidden','true');d.innerHTML=`<b>${n}</b>${e?`<em>${e}</em>`:''}`;fig.appendChild(d);return d};
  const lbs=[...CA_PL.map(o=>lab(o.n,o.e)),lab(CA_BASE.n,CA_BASE.e,'base')],lcore=lab('The offer','','core');K.put(lcore,K.P(0,0,64));
  const st=(o,a,b)=>[0,1,2,3].map(i=>mix(mix(o.S[i],0,a),o.H[i],b));
  const la=(G,o)=>{const w=fig.clientWidth,f=o===CA_BASE?(w<700?1.85:1):w<500?1.7:w<700?1.4:1.24;const q=G.at(o.l[0]*f,o.l[1]*f);if(w<500&&o!==CA_BASE){const dy=o.n==='What is agreed'||o.n==='How it is bought'?46:o.n==='What is included'?-24:0;return [q[0],q[1]+dy]}return q};
  return(a,b)=>{const G=K.geo(CA_BASE,st(CA_BASE,a,b));K.set(base,G);K.put(lbs[4],la(G,CA_BASE));
    CA_PL.forEach((o,k)=>{const g=K.geo(o,st(o,a,b));K.set(plates[k],g);K.put(lbs[k],la(g,o));
      const s=sh[k],z=g.c[0][2];s.setAttribute('points',K.pts(g.c.map(([x,y])=>K.P(x,y,0))));s.style.opacity=cl(z/40)});
    fig.classList.toggle('hist',b>.5)};
}
/* two good decisions on one piece of ground: the region, then the scope */
function fit(cx,sec){
  const svg=cx.querySelector('svg'),K2=caKit(svg,[-330,-280,660,480]),cb=[...sec.querySelectorAll('.cax-sg .cax-t')];
  svg.innerHTML='';K2.defs('<pattern id="caHatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="10" height="10" fill="#000"/><line x1="0" y1="0" x2="0" y2="10" stroke="#fff" stroke-width="3"/></pattern>');
  const g0=K2.mk('g','s0'),g1=K2.mk('g','s1');
  const REG={x:-130,y:-130,w:260,d:260},PA={x:-118,y:-118,w:236,d:236,t:18},PB={x:-118,y:-118,w:236,d:236,t:18};
  const gr0=K2.mk('polygon','gd',g0),A0=K2.plate('pw',g0),ht=K2.mk('polygon','ht',g0),B0=K2.plate('po',g0);
  gr0.setAttribute('points',K2.pts(sq(REG).map(([x,y])=>K2.P(x,y,0))));
  const SA={x:-175,y:-125,w:350,d:250,t:20},SE={x:-58,y:-42,w:116,d:84,t:15};
  const gr1=K2.mk('polygon','gd',g1),A1=K2.plate('pw',g1),eg=K2.mk('polygon','eg',g1),E=[0,1,2,3,4,5].map(()=>K2.plate('po',g1));
  gr1.setAttribute('points',K2.pts(sq({x:-190,y:-140,w:380,d:280}).map(([x,y])=>K2.P(x,y,0))));
  const EP=[...Array(6)].map((_,i)=>[60+i*22,-10+i*6,20+i*40,i%2?6:-5]);
  const sit0=t=>{const e=ease(t),ga=K2.geo(PA,[0,0,0,0,0]);K2.set(A0,ga);
    const dx=mix(300,100,e),dy=mix(-40,-60,e),gb=K2.geo(PB,[dx,dy,0,mix(12,-6,e),mix(0,44,cl((t-.5)/.5))]);K2.set(B0,gb);B0.g.style.opacity=cl(t/.25);
    const x0=Math.max(PA.x,PB.x+dx),x1=Math.min(PA.x+PA.w,PB.x+PB.w+dx),y0=Math.max(PA.y,PB.y+dy),y1=Math.min(PA.y+PA.d,PB.y+PB.d+dy),on=cl((t-.6)/.4);
    ht.setAttribute('points',x1>x0&&y1>y0?K2.pts([[x0,y0],[x1,y0],[x1,y1],[x0,y1]].map(([x,y])=>K2.P(x,y,PA.t))):'');ht.style.opacity=on};
  const sit1=t=>{const ga=K2.geo(SA,[0,0,0,0,0]);K2.set(A1,ga);eg.setAttribute('points',K2.pts(ga.c.map(([x,y,z])=>K2.P(x,y,z+SA.t))));
    E.forEach((p,i)=>{const d=cl((t-i*.12)/.36),e=ease(d);K2.set(p,K2.geo(SE,[EP[i][0],EP[i][1],mix(300,EP[i][2],e),EP[i][3],0]));p.g.style.opacity=d>0?1:0})};
  const run=p=>(cx.__k==='1'?sit1:sit0)(p);
  const show=(k,anim)=>{cx.__k=k;sec.dataset.s=k;cb.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.s===k)));cx.querySelectorAll('.sr[data-s]').forEach(p=>{p.hidden=p.dataset.s!==k});
    sec.querySelectorAll('.cax-dc,.cax-out').forEach(e=>{e.hidden=e.dataset.s!==k});if(anim)tw(cx,1600,run);else run(1)};
  if(!cx.__bound){cx.__bound=1;cb.forEach(b=>b.addEventListener('click',()=>{cancelAnimationFrame(cx.__raf);show(b.dataset.s,true)}))}
  cx.__show=show;show('0',false);
  timed(cx,1800,p=>{cx.__k=cx.__k||'0';run(p)});
}
/* one year: a special price in March, dots that grow, and in December the loudest thing in the frame */
function year(yr){
  const ysv=yr.querySelector('svg'),mos=[...yr.querySelectorAll('.cax-mo')],yback=yr.querySelector('.cax-back');ysv.innerHTML='';
  const K3=caKit(ysv,[0,0,1200,420]),yg=K3.mk('g','');yg.setAttribute('transform','translate(150 188) scale(.62)');
  const mp=K3.plate('pk',yg);K3.set(mp,K3.geo({x:-80,y:-80,w:160,d:160,t:22},[0,0,0,0,0]));
  const YS=[250,200],YC=[470,292],YE=[780,190],N3=30;
  const qz=t=>{const u=1-t;return [u*u*YS[0]+2*u*t*YC[0]+t*t*YE[0],u*u*YS[1]+2*u*t*YC[1]+t*t*YE[1]]};
  const dts=[...Array(N3)].map(()=>K3.mk('circle','yd'));
  const bl=K3.mk('path','yb');bl.setAttribute('d','M1180 404 L 120 404');const bh=K3.mk('polygon','yh');bh.setAttribute('points','108,404 126,396 126,412');bl.style.strokeDasharray='1000';
  const MP=[[150,262],[qz(.28)[0],qz(.28)[1]-10],[qz(.74)[0],qz(.74)[1]-18],[1200,196]];
  const nr=narrow();ysv.setAttribute('viewBox',nr?'90 140 790 190':'0 0 1200 420');
  mos.forEach((m,i)=>{m.style.left=MP[i][0]/12+'%';m.style.top=MP[i][1]/4.2+'%'});
  return t=>{dts.forEach((d,i)=>{const u=i/(N3-1),q=qz(u);d.setAttribute('cx',q[0]);d.setAttribute('cy',q[1]);d.setAttribute('r',mix(2.6,19,u*u));d.style.opacity=t>=u*.9?1:0});
    mos.forEach((m,i)=>{m.style.opacity=t>=[0,.26,.7,.92][i]?1:0});const r=cl((t-1)/.4);bl.style.strokeDashoffset=1000*(1-r);bh.style.opacity=r>.95?1:0;yback.style.opacity=r>.6?1:0};
}
/* one account: what it brings in stands tall; read with everything agreed around the price only an outline of it is left */
function account(ax,sec){
  const svg=ax.querySelector('svg'),K4=caKit(svg,[-280,-340,800,520]),vb=[...sec.querySelectorAll('.cax-sg .cax-t')],vs=[...ax.querySelectorAll('.cax-vs')];svg.innerHTML='';
  const GRD={x:-150,y:-150,w:300,d:300,z0:-10,t:10},COL={x:-78,y:-78,w:156,d:156},HI=236,LO=58;
  K4.defs('<pattern id="caSd" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="8" height="8" fill="#fff"/><line x1="0" y1="0" x2="0" y2="8" stroke="#000" stroke-width="1.6"/></pattern>');
  const gp=K4.plate('gr');K4.set(gp,K4.geo(GRD,[0,0,0,0,0]));
  const core=K4.plate('sw'),ghost=K4.plate('cg');
  const akAll=ax.querySelector('.cax-ak[data-k="all"]'),akK=ax.querySelector('.cax-ak[data-k="keep"]'),lA=K4.mk('line','ld'),lK=K4.mk('line','ld');
  const acc=r=>{const e=ease(r),h=mix(HI,LO,e);
    K4.set(core,K4.geo({...COL,t:h},[0,0,0,0,0]));K4.set(ghost,K4.geo({...COL,t:HI},[0,0,0,0,0]));ghost.g.style.opacity=e;
    const tA=K4.P(78,-78,HI),tK=K4.P(78,-78,h);
    K4.put(akAll,[236,tA[1]]);lead(lA,[228,tA[1]],[tA[0]+6,tA[1]]);
    K4.put(akK,[236,tK[1]+34]);lead(lK,[228,tK[1]+34],[tA[0]+6,tK[1]+34]);lK.style.opacity=e;
    sec.classList.toggle('kept',e>.5)};
  const view=(k,anim)=>{sec.dataset.v=k;vb.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===k)));vs.forEach(p=>{p.hidden=p.dataset.v!==k});
    const from=k==='1'?0:1,to=k==='1'?1:0;if(anim)tw(ax,1500,t=>acc(mix(from,to,t)));else acc(to)};
  if(!ax.__bound){ax.__bound=1;vb.forEach(b=>b.addEventListener('click',()=>{ax.__manual=1;view(b.dataset.v,true)}))}
  ax.__manual=0;view('0',false);
  timed(ax,3000,p=>{if(ax.__manual)return;const r=ss(.45,1,p);acc(r);const k=r>.5?'1':'0';if(sec.dataset.v!==k){sec.dataset.v=k;vb.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===k)));vs.forEach(q=>{q.hidden=q.dataset.v!==k})}});
}
/* the structure re-set: every plate level and flush with the offer, each carrying a choice; the base smaller by choice */
function reset(rz,uid){
  const svg=rz.querySelector('svg'),K5=caKit(svg,[-520,-270,1040,560]);svg.innerHTML='';
  const was=K5.mk('polygon','sh');was.setAttribute('points',K5.pts(sq({x:-250,y:-250,w:500,d:500}).map(([x,y])=>K5.P(x,y,-8))));
  const R5={in:{x:-60,y:-196,w:120,d:136},se:{x:-196,y:-60,w:136,d:120},bu:{x:60,y:-60,w:136,d:120},ag:{x:-60,y:60,w:120,d:136}},KS=['in','se','bu','ag'];
  const b5=K5.plate('bs');const q5={};['in','se'].forEach(k=>{q5[k]=K5.plate('pl')});K5.box(-60,-60,120,120,80,'cf');['bu','ag'].forEach(k=>{q5[k]=K5.plate('pl')});
  const O={in:CA_PL[0],se:CA_PL[1],bu:CA_PL[2],ag:CA_PL[3]};
  const at5=k=>K5.geo({...R5[k],t:16},[0,0,0,0,0]).at(R5[k].x+R5[k].w/2,R5[k].y+R5[k].d/2);
  const RL={se:[[-330,-150],at5('se')],in:[[330,-200],at5('in')],ag:[[-330,170],at5('ag')],bu:[[360,20],at5('bu')],ea:[[330,230],K5.P(150,196,0)]},LL={};
  Object.entries(RL).forEach(([k,[t,a]])=>{const e=rz.querySelector(`.cax-rl[data-k="${k}"]`);K5.put(e,t);e.classList.toggle('l',t[0]<0);const l=K5.mk('line','ld');lead(l,[t[0]+(t[0]<0?12:-12),t[1]],a);LL[k]=[e,l]});
  const BF={x:-196,y:-196,w:392,d:392,z0:-16,t:16};
  return p=>{const e=ease(p),k0=1-e;
    KS.forEach(k=>{const o=O[k],s=[mix(0,o.H[0],k0),mix(0,o.H[1],k0),mix(0,o.H[2],k0),mix(0,o.H[3],k0),mix(0,o.H[3]*0,k0)];K5.set(q5[k],K5.geo({...R5[k],t:16},s))});
    const bo={x:mix(CA_BASE.x,BF.x,e),y:mix(CA_BASE.y,BF.y,e),w:mix(CA_BASE.w,BF.w,e),d:mix(CA_BASE.d,BF.d,e),z0:mix(CA_BASE.z0,BF.z0,e),t:mix(CA_BASE.t,BF.t,e)};
    K5.set(b5,K5.geo(bo,[0,0,0,0,0]));was.style.opacity=ss(.5,.9,p);
    Object.values(LL).forEach(([a,l],i)=>{const o=ss(.55+i*.06,.75+i*.06,p);a.style.opacity=o;l.style.opacity=o})};
}
/* the handoff: the offer branches into the three questions; the hovered branch comes forward */
function branch(sec){
  if(narrow())return;const brw=sec.querySelector('.cax-brw'),bs=sec.querySelector('.cax-brs'),nx=[...sec.querySelectorAll('.cax-nx')];
  const R=brw.getBoundingClientRect(),W=R.width,H=R.height;if(!W)return;
  bs.setAttribute('width',W);bs.setAttribute('height',H);bs.setAttribute('viewBox',`0 0 ${W} ${H}`);bs.textContent='';
  const K6=caKit(bs,[0,0,W,H]),g=K6.mk('g','');const ox=W*.14,oy=H*.5;g.setAttribute('transform',`translate(${ox} ${oy}) scale(.7)`);K6.box(-60,-60,120,120,64,'cw',g);
  const bls=nx.map(b=>{const r=b.querySelector('.n').getBoundingClientRect(),x=r.left-R.left-16,y=r.top-R.top+r.height/2,p=K6.mk('path','bl');
    p.setAttribute('d',`M${ox+50} ${oy-20} C ${ox+W*.2} ${oy-20}, ${x-W*.14} ${y}, ${x} ${y}`);return p});
  const up=()=>nx.forEach((c,j)=>bls[j]&&bls[j].classList.toggle('on',c.matches(':hover,:focus-visible')));
  if(!sec.__bb){sec.__bb=1;nx.forEach(b=>['mouseenter','mouseleave','focus','blur'].forEach(ev=>b.addEventListener(ev,up)))}
}
window.LDT_CA={init:root=>{
  const q=s=>root.querySelector(s);
  const d0=q('.cax-d0'),d1=q('.cax-d1'),f0=opening(d0,'a'),f1=opening(d1,'b');
  timed(d0,2800,p=>f0(ease(p),0));timed(d1,3000,p=>f1(1,ease(seg(p,.15,1))));
  fit(q('.cax-cx'),q('.cax-cf'));
  const yr=q('.cax-yr'),yf=year(yr);timed(yr,3800,p=>yf(p*1.4));
  account(q('.cax-ax'),q('.cax-ac'));
  const rz=q('.cax-rz'),rf=reset(rz,'c');timed(rz,3200,rf);
  const br=q('.cax-br');branch(br);
  const rs=()=>{clearTimeout(br.__t);br.__t=setTimeout(()=>branch(br),120)};if(!root.__car){root.__car=1;addEventListener('resize',rs)}
  const base=init(root,{});return()=>{base();setTimeout(()=>branch(br),60)};
}};
})();
