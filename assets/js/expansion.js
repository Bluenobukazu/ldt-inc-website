/* Expansion (visual rebuild 01.10.2026). A system expands into new conditions: Here, copied elsewhere, stretched by distance and volume,
   held again by a system layer; then the chain that carries the orders. Uses assets/js/l2.js. Reduced motion shows the final state. */
(function(){
const {mk,canvas,rng,narrow,clamp,lerp,seg,init,timed,ss}=window.LDT_L2;
const RAD=a=>a*Math.PI/180,ring=(n,a0=-90)=>[...Array(n)].map((_,i)=>RAD(a0+i*360/n));
const cc=(g,a)=>mk('circle',Object.assign({fill:'none',stroke:'currentColor'},a),g),dot=(g,a)=>mk('circle',Object.assign({fill:'currentColor'},a),g),ln=(g,a)=>mk('line',Object.assign({stroke:'currentColor'},a),g);
/* a label with a hairline leader: the span is placed in px next to the feature it names */
const tag=(el,g,name,tx,ty,lx,ly)=>{const s=el.parentNode.querySelector('[data-l="'+name+'"]');if(!s)return;s.style.left=lx+'px';s.style.top=ly+'px';
  const dy=ty>ly?10:-10;if(Math.hypot(tx-lx,ty-ly)>20)ln(g,{x1:tx,y1:ty,x2:lx,y2:ly+dy,'stroke-width':1});};
/* a clean leader: from the feature out along a gap between the spokes, then level to the label */
const tag2=(el,g,name,tx,ty,cx,cy,ang,rOut,side)=>{const sp=el.parentNode.querySelector('[data-l="'+name+'"]');if(!sp)return;const ex=cx+Math.cos(ang)*rOut,ey=cy+Math.sin(ang)*rOut,hx=ex+(narrow()?0:side*38);
  mk('polyline',{points:`${tx},${ty} ${ex},${ey} ${hx},${ey}`,fill:'none',stroke:'currentColor','stroke-width':1.2,'stroke-linejoin':'round'},g);if(narrow()){const W=el.clientWidth,hw=sp.offsetWidth/2+4;sp.style.left=Math.min(W-hw,Math.max(hw,ex))+'px';sp.style.top=ey+'px';sp.style.transform='translate(-50%,-50%)';return}
  sp.style.left=(hx+side*10)+'px';sp.style.top=ey+'px';sp.style.transform=side>0?'translate(0,-50%)':'translate(-100%,-50%)'};
const setL=(l,x1,y1,x2,y2,w,o)=>{l.setAttribute('x1',x1);l.setAttribute('y1',y1);l.setAttribute('x2',x2);l.setAttribute('y2',y2);l.setAttribute('stroke-width',w);l.setAttribute('stroke-opacity',o)};
const setC=(c,x,y,r,o)=>{c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',Math.max(r,0));c.setAttribute('opacity',o)};
/* one system: core inside one person's ring, parts around, every part linked to the person */
function mkSys(g,n){return{ls:[...Array(n)].map(()=>ln(g,{})),core:dot(g,{}),pr:cc(g,{}),ps:[...Array(n)].map(()=>dot(g,{}))}}
function putSys(S,cx,cy,k,A,R,r,o){ /* A angles, R radii, r part radii, o opacities; person ring 52k */
  const pr=52*k;S.core.setAttribute('cx',cx);S.core.setAttribute('cy',cy);S.core.setAttribute('r',30*k);
  S.ps.forEach((c,i)=>{const x=cx+Math.cos(A[i])*R[i],y=cy+Math.sin(A[i])*R[i];setC(c,x,y,r[i],o[i]);
    setL(S.ls[i],cx+Math.cos(A[i])*pr,cy+Math.sin(A[i])*pr,x-Math.cos(A[i])*r[i],y-Math.sin(A[i])*r[i],S.lw,o[i])})}
function x0(el,w,h){
  const g=canvas(el,w,h),k=Math.min(w,h)/560,cx=w/2,cy=h*.47,A=ring(8),S=mkSys(g,8);S.lw=2.2;S.pr.setAttribute('stroke-width',2.6);
  {const ap=RAD(-67.5),ac=RAD(157.5);tag2(el,g,'person',cx+Math.cos(ap)*52*k,cy+Math.sin(ap)*52*k,cx,cy,ap,235*k,1);tag2(el,g,'core',cx+Math.cos(ac)*30*k,cy+Math.sin(ac)*30*k,cx,cy,ac,235*k,-1);tag(el,g,'here',cx,cy+190*k+40*k,cx,cy+190*k+58*k)}
  timed(el,3200,p=>{const R=A.map(()=>190*k),r=A.map((_,i)=>13*k*ss(.12+i*.06,.3+i*.06,p)),o=A.map((_,i)=>ss(.1+i*.06,.22+i*.06,p));
    putSys(S,cx,cy,k,A,R,r,o);S.pr.setAttribute('cx',cx);S.pr.setAttribute('cy',cy);S.pr.setAttribute('r',52*k*ss(0,.15,p));S.core.setAttribute('r',30*k*ss(0,.12,p))});
}
/* 01: the system is copied; the copy arrives without the person and with weaker links */
function x1(el,w,h){
  const g=canvas(el,w,h),k=Math.min(w/900,h/470),xl=w*.26,xr=w*.75,cy=h*.5,A=ring(8),r2=rng(5),J=A.map(()=>(r2()-.5)*.7),RJ=A.map(()=>.78+r2()*.5);
  const L=mkSys(g,8),C=mkSys(g,8);L.lw=2.2;C.lw=1.2;L.pr.setAttribute('stroke-width',2.6);C.pr.setAttribute('stroke-width',1.6);C.pr.setAttribute('stroke-dasharray','2 7');C.pr.setAttribute('stroke-linecap','round');
  C.ls.forEach(l=>l.setAttribute('stroke-dasharray','2 7'));
  tag2(el,g,'person',xl+Math.cos(RAD(-112.5))*52*k,cy+Math.sin(RAD(-112.5))*52*k,xl,cy,RAD(-112.5),170*k,-1);tag(el,g,'here',xl,cy+190*k*.72+20*k,xl,cy+190*k*.72+40*k);tag(el,g,'copy',xr,cy+190*k*.72+20*k,xr,cy+190*k*.72+40*k);
  timed(el,4200,p=>{const a=ss(0,.2,p),t=ss(.36,.8,p);
    L.pr.setAttribute('cx',xl);L.pr.setAttribute('cy',cy);L.pr.setAttribute('r',52*k);L.pr.setAttribute('opacity',a);
    putSys(L,xl,cy,k,A,A.map(()=>190*k*.72),A.map(()=>11*k),A.map(()=>a));
    const x=lerp(xl,xr,t),Ac=A.map((q,i)=>q+J[i]*t),Rc=A.map((_,i)=>190*k*.72*lerp(1,RJ[i],t));
    putSys(C,x,cy,k,Ac,Rc,A.map((_,i)=>lerp(11,8.5+J[i]*5,t)*k),A.map(()=>a*ss(.2,.4,p)));
    C.pr.setAttribute('cx',x);C.pr.setAttribute('cy',cy);C.pr.setAttribute('r',52*k);C.pr.setAttribute('opacity',ss(.2,.4,p)*(1-t*.0));C.pr.setAttribute('stroke-dasharray',t>.5?'2 7':'none');
    C.ls.forEach((l,i)=>{l.setAttribute('stroke-dasharray',t>.3?'2 7':'none')});
    L.core.setAttribute('r',30*k*a);C.core.setAttribute('r',30*k*a*ss(.2,.4,p))});
}
/* 02: distance and volume; the parts multiply and move apart, the lines stretch, three of them carry the most */
function x2(el,w,h){
  const g=canvas(el,w,h),k=Math.min(w/900,h/560),cx=w/2,cy=h/2,N=22,r2=rng(9),ang=[...Array(N)].map((_,i)=>RAD(-90+i*360/8*(i<8?1:0))) ,A=[],R0=[],R1=[],RR=[];
  for(let i=0;i<N;i++){A.push(i<8?RAD(-90+i*45):RAD(-90+22.5+(i-8)*(360/14)+r2()*10));R0.push(i<8?130:135);R1.push(i<8?250+r2()*40:170+r2()*140);RR.push(i<8?13:8+r2()*4)}
  const S=mkSys(g,N),halo=cc(g,{'stroke-opacity':.9}),dep=[1,5].map(()=>cc(g,{'stroke-width':2.4}));S.lw=2.2;
  tag2(el,g,'person',cx+Math.cos(RAD(-67.5))*60*k,cy+Math.sin(RAD(-67.5))*60*k,cx,cy,RAD(-67.5),Math.min(h*.5,300*k),1);
  timed(el,4200,p=>{const t=ss(.05,.85,p),vis=A.map((_,i)=>i<8?ss(0,.1,p):ss(.15+(i-8)*.03,.3+(i-8)*.03,p));
    const R=A.map((_,i)=>lerp(R0[i]*k,R1[i]*k,t)),r=A.map((_,i)=>RR[i]*k*vis[i]);
    putSys(S,cx,cy,k,A,R,r,vis.map(v=>v));
    S.ls.forEach((l,i)=>{const heavy=i===1||i===5;l.setAttribute('stroke-width',lerp(2.2,heavy?3.4:.9,t));});
    const pr=lerp(52,66,t)*k;S.pr.setAttribute('cx',cx);S.pr.setAttribute('cy',cy);S.pr.setAttribute('r',pr);S.pr.setAttribute('stroke-width',lerp(2.6,7,t));
    halo.setAttribute('cx',cx);halo.setAttribute('cy',cy);halo.setAttribute('r',pr+14*k);halo.setAttribute('stroke-width',1.3);halo.setAttribute('opacity',ss(.4,.8,p));
    dep.forEach((d,j)=>{const i=j?5:1,x=cx+Math.cos(A[i])*R[i],y=cy+Math.sin(A[i])*R[i];setC(d,x,y,r[i]+9*k,ss(.6,.9,p));
      /* the two other dependencies are named beside their rings, as the text names them */
      const sp=el.parentNode.querySelector('[data-l="'+(j?'distributor':'account')+'"]');if(sp){const hw=sp.offsetWidth/2,o=r[i]+9*k+14,ca=Math.cos(A[i]),sa=Math.sin(A[i]);
        /* the account is named to the right of its ring, below it where the canvas ends; the distributor sits lower left, so its name goes beside the ring */
        let lx=x+ca*(o+hw),ly=y+sa*(o+10);if(!j){lx=x+o+hw;ly=y;if(lx+hw>w-6){lx=w-hw-6;ly=y+r[i]+9*k+22}}
        sp.style.left=Math.max(hw+6,Math.min(w-hw-6,lx))+'px';sp.style.top=Math.max(14,Math.min(h-14,ly))+'px';sp.style.opacity=ss(.7,.95,p)}})});
}
/* 03: a system layer forms between core and parts; the core stays, the outer parts change with their conditions */
function x3(el,w,h){
  const g=canvas(el,w,h),k=Math.min(w/900,h/560),cx=w/2,cy=h*.52,N=12,r2=rng(9);
  const A0=[...Array(N)].map((_,i)=>RAD(-90+i*30+(r2()-.5)*40)),R0=[...Array(N)].map(()=>(170+r2()*110)*k),A1=ring(N),R1=A1.map((_,i)=>(i%2?215:232)*k);
  const SR=128*k,circ=2*Math.PI*SR,S=mkSys(g,N),sys=cc(g,{'stroke-width':8*Math.max(k,.6),'stroke-dasharray':circ,transform:`rotate(-90 ${cx} ${cy})`}),inner=cc(g,{'stroke-width':1.4});S.lw=1.6;
  tag2(el,g,'core',cx+Math.cos(RAD(165))*34*k,cy+Math.sin(RAD(165))*34*k,cx,cy,RAD(165),Math.min(h*.52,262*k),-1);tag2(el,g,'system',cx+Math.cos(RAD(105))*SR,cy+Math.sin(RAD(105))*SR,cx,cy,RAD(105),Math.min(h*.52,262*k),-1);tag2(el,g,'context',cx+Math.cos(RAD(-60))*(215*k+8),cy+Math.sin(RAD(-60))*(215*k+8),cx,cy,RAD(-60),Math.min(h*.52,262*k),1);
  timed(el,4600,p=>{const a=ss(.1,.55,p),f=ss(.25,.6,p),t=ss(.5,.95,p);
    const A=A0.map((q,i)=>lerp(q,A1[i],t)),R=R0.map((q,i)=>lerp(q,R1[i],t)),r=A0.map((_,i)=>lerp(8,i%2?10:15,t)*k);
    putSys(S,cx,cy,k,A,R,r,A0.map(()=>1));
    S.core.setAttribute('r',34*k);
    S.ls.forEach((l,i)=>{const x=cx+Math.cos(A[i])*R[i],y=cy+Math.sin(A[i])*R[i],tx=lerp(cx+Math.cos(A[i])*52*k,cx+Math.cos(A[i])*SR,ss(.4,.7,p)),ty=lerp(cy+Math.sin(A[i])*52*k,cy+Math.sin(A[i])*SR,ss(.4,.7,p));
      setL(l,tx,ty,x-Math.cos(A[i])*r[i],y-Math.sin(A[i])*r[i],lerp(.9,2.2,t),1)});
    S.pr.setAttribute('cx',cx);S.pr.setAttribute('cy',cy);S.pr.setAttribute('r',lerp(52,0,a)*k);S.pr.setAttribute('opacity',1-a);
    sys.setAttribute('cx',cx);sys.setAttribute('cy',cy);sys.setAttribute('r',SR);sys.setAttribute('stroke-dashoffset',circ*(1-f));
    inner.setAttribute('cx',cx);inner.setAttribute('cy',cy);inner.setAttribute('r',SR-14*k);inner.setAttribute('opacity',ss(.55,.75,p))});
}
/* evidence: orders travel round the chain; every station takes its turn under load */
function x4(el,w,h){
  const g=canvas(el,w,h),li=el.parentNode.querySelector('.xp-ring li'),bx=el.getBoundingClientRect(),lb=li.getBoundingClientRect(),R=narrow()?Math.min(w,h)*.36:Math.abs(h/2-(lb.top-bx.top)),cx=w/2,cy=h/2,A=ring(6),ST=A.map(a=>dot(g,{}));
  const rg=cc(g,{'stroke-width':1.6,r:R,cx,cy}),ord=[0,1,2].map(()=>dot(g,{}));
  timed(el,9000,p=>{A.forEach((a,i)=>{const d=((a+Math.PI/2)/(2*Math.PI)+1)%1;let hit=0;ord.forEach((_,j)=>{const q=((p*2.4+j*.11)%1),e=Math.abs(q-d);hit=Math.max(hit,1-clamp(Math.min(e,1-e)/.06))});
      setC(ST[i],cx+Math.cos(a)*R,cy+Math.sin(a)*R,(9+hit*6)*(w>500?1:.7),1)});
    ord.forEach((o,j)=>{const a=-Math.PI/2+((p*2.4+j*.11)%1)*2*Math.PI;setC(o,cx+Math.cos(a)*R,cy+Math.sin(a)*R,4*(w>500?1:.7),ss(0,.04,p)*(1-ss(.94,1,p)))});
    rg.setAttribute('stroke-dasharray',`${2*Math.PI*R*ss(0,.12,p)} 9999`)});
}
/* bridge: the ring opens and one order leaves it towards the next page */
function x5(el,w,h){
  const g=canvas(el,w,h),R=Math.min(w*.2,h*.36),cx=w*.78,cy=h*.46,c=2*Math.PI*R,gap=.18;
  const arc=cc(g,{'stroke-width':1.6,cx,cy,r:R,transform:`rotate(${gap*180} ${cx} ${cy})`,'stroke-dasharray':`${c*(1-gap)} ${c}`}),o=dot(g,{r:5});
  timed(el,3200,p=>{const t=ss(.1,.7,p),u=ss(.6,1,p);arc.setAttribute('stroke-dashoffset',c*(1-gap)*(1-t));
    setC(o,lerp(cx+R-.0,w*.97,u),cy+0*u,5,ss(.5,.65,p)*(1-ss(.96,1,p)))});
}
window.LDT_XP={init:root=>{const fr=[...root.querySelectorAll('.l2-f')],sc=document.getElementById('deep');
  if(!root.__xpn){root.__xpn=1;root.querySelectorAll('.xp-steps [data-xgo]').forEach(b=>b.addEventListener('click',()=>{const f=fr[+b.dataset.xgo];if(f&&sc)sc.scrollTo({top:f.getBoundingClientRect().top-sc.getBoundingClientRect().top+sc.scrollTop-104,behavior:'smooth'})}))}
  return init(root,{draw:{x0,x1,x2,x3,x4,x5}})}};
})();
