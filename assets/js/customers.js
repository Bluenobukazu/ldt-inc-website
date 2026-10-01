/* Customers (visual rebuild 01.10.2026). A relationship is a rhythm over time: who starts the conversation, how the other side answers, what changed.
   Rings are the material (a request leaves, a reply comes back, an expectation sits ahead); the contact point is a small figure. Uses assets/js/l2.js. */
(function(){
const {mk,canvas,rng,narrow,clamp,lerp,seg,init,timed,ss}=window.LDT_L2;
const C='currentColor',cc=(g,a)=>mk('circle',Object.assign({fill:'none',stroke:C},a),g),dot=(g,a)=>mk('circle',Object.assign({fill:C},a),g),ln=(g,a)=>mk('line',Object.assign({stroke:C,'stroke-linecap':'round'},a),g),pt=(g,a)=>mk('path',Object.assign({fill:'none',stroke:C},a),g);
/* the contact point: a ring and a small figure; set(x,y,s,mode) mode 1 solid, 0 faint dashed outline */
function person(g,bg){const ring=cc(g,{'stroke-width':1.8}),head=mk('circle',{fill:C},g),body=mk('path',{fill:C},g);
  return(x,y,s,o,ghost)=>{ring.setAttribute('cx',x);ring.setAttribute('cy',y);ring.setAttribute('r',s*1.7);ring.setAttribute('opacity',o);ring.setAttribute('stroke-dasharray',ghost?'3 6':'none');
    head.setAttribute('cx',x);head.setAttribute('cy',y-s*.4);head.setAttribute('r',s*.42);body.setAttribute('d',`M${x-s*.75} ${y+s*.75} Q${x-s*.75} ${y+s*.1} ${x} ${y+s*.1} Q${x+s*.75} ${y+s*.1} ${x+s*.75} ${y+s*.75} Z`);
    [head,body].forEach(e=>{e.setAttribute('opacity',ghost?0:o)});
    if(ghost){head.setAttribute('opacity',o*.0)}}}
const L=(el,name,x,y,anchor)=>{const s=el.parentNode.querySelector('[data-l="'+name+'"]');if(!s)return;s.style.left=x+'px';s.style.top=y+'px';if(anchor)s.style.transform=anchor};
const arcPath=(x,y,r)=>`M${x-r} ${y} A ${r} ${r} 0 0 1 ${x+r} ${y}`;
const draws={};
/* 1 one word, seven rhythms: each name has its own pulse of rings */
draws.rg=(el,w,h)=>{const g=canvas(el,w,h),i=+el.dataset.i,P=[[8,9],[3,30],[1,36],[6,13],[4,22],[2,42],[1,22]][i],cx=w/2,cy=h/2,base=12,mx=base+P[0]*P[1],k=Math.min(1,(Math.min(w,h)/2-3)/mx),rs=[...Array(P[0])].map((_,j)=>(base+(j+1)*P[1])*k);
  dot(g,{cx,cy,r:4});const cs=rs.map(r=>cc(g,{cx,cy,r:0,'stroke-width':1.4}));timed(el,2600,p=>cs.forEach((c,j)=>c.setAttribute('r',rs[j]*ss(j*.08+i*.03,j*.08+.35+i*.03,p))))};
/* 2 same label, different expectation: solid rings are what is there, wider dashed rings what the relationship expects */
draws.exp=(el,w,h)=>{const g=canvas(el,w,h),cx=narrow()?w/2:w*.4,cy=h/2,k=Math.min(narrow()?w/2:w*.4,h/2)/315,S=[46,68,90,112,134],D=[86,160,234,308];
  const sc=S.map(r=>cc(g,{cx,cy,r:0,'stroke-width':1.8})),dc=D.map(r=>cc(g,{cx,cy,r:0,'stroke-width':1.4,'stroke-dasharray':'3 8'}));
  const a=-.5,b=.6,ax=cx+Math.cos(a)*S[3]*k,ay=cy+Math.sin(a)*S[3]*k,bx=cx+Math.cos(b)*D[2]*k,by=cy+Math.sin(b)*D[2]*k;
  const nr=narrow();L(el,'c',cx,cy,'translate(-50%,-50%)');if(!nr){L(el,'a',ax+34,ay-40,'translate(0,-50%)');L(el,'b',bx+30,by+36,'translate(0,-50%)')}
  const l1=ln(g,{x1:ax,y1:ay,x2:ax+30,y2:ay-40,'stroke-width':1,display:nr?'none':'inline'}),l2=ln(g,{x1:bx,y1:by,x2:bx+26,y2:by+36,'stroke-width':1,display:nr?'none':'inline'});
  timed(el,3600,p=>{sc.forEach((c,j)=>c.setAttribute('r',S[j]*k*ss(j*.05,j*.05+.25,p)));dc.forEach((c,j)=>c.setAttribute('r',D[j]*k*ss(.3+j*.1,.55+j*.1,p)));const o=ss(.8,.95,p);l1.setAttribute('opacity',o);l2.setAttribute('opacity',o);el.parentNode.querySelectorAll('.cux-lb').forEach(s=>s.style.opacity=o)})};
/* 3 expectation becomes experience: the reply is expected here and comes much later, heavier */
function timeline(el,w,h,steady){
  const g=canvas(el,w,h),y=h*.55,k=Math.min(1,h/260),px=w*.2,ex=w*(steady?.34:.5),ax=w*.82,r=40*k,pf=person(g);
  const N=6,xs=[...Array(N)].map((_,i)=>w*.03+i*(px-r*1.7-w*.06)/(N-1));
  const rq=xs.map((x,i)=>dot(g,{cx:x,cy:y,r:0})),ghost=cc(g,{cx:ex,cy:y,r:r,'stroke-width':1.4,'stroke-dasharray':'3 6'});
  const rep=[];if(steady){for(let i=0;i<5;i++)rep.push(dot(g,{cx:px+r*2.6+i*(w*.1),cy:y,r:0}))}
  const act=cc(g,{cx:ax,cy:y,r:r,'stroke-width':5}),ray=ln(g,{y1:y,y2:y,'stroke-width':1.2,'stroke-dasharray':'2 6'}),ping=dot(g,{cy:y,r:5});
  return{g,y,px,ex,ax,r,k,upd:p=>{rq.forEach((d,i)=>d.setAttribute('r',(2+i*1.3)*k*ss(i*.04,i*.04+.12,p)));pf(px,y,16*k,ss(.1,.25,p));
    ghost.setAttribute('opacity',ss(.25,.4,p));ghost.setAttribute('r',r);
    if(steady){rep.forEach((d,i)=>{d.setAttribute('cx',px+r*2.6+i*(w*.1));d.setAttribute('r',3.4*k*ss(.35+i*.06,.45+i*.06,p))});ghost.setAttribute('cx',w*.9);ghost.setAttribute('r',r*(.8+ss(.8,1,p)*.2));ghost.setAttribute('opacity',ss(.75,.95,p));act.setAttribute('r',0);ray.setAttribute('opacity',0);ping.setAttribute('r',0);return}
    const t=ss(.4,.8,p),x=lerp(px+r*1.7,ax-r,t);ray.setAttribute('x1',px+r*1.7);ray.setAttribute('x2',x);ray.setAttribute('opacity',ss(.4,.5,p));ping.setAttribute('cx',x);ping.setAttribute('r',5*ss(.4,.45,p)*(1-ss(.78,.82,p)));
    act.setAttribute('r',r*ss(.78,.9,p))}}}
draws.tl3=(el,w,h)=>{const T=timeline(el,w,h,false);L(el,'e',T.ex,T.y-T.r-26,'translate(-50%,-50%)');L(el,'x',T.ax,T.y-T.r-26,'translate(-50%,-50%)');const sp=el.parentNode.querySelectorAll('.cux-lb');
  timed(el,5200,p=>{T.upd(p);sp[0].style.opacity=ss(.3,.42,p);sp[1].style.opacity=ss(.85,.95,p);const q=el.closest('.l2-f').querySelector('.cux-c3b');if(q)q.style.opacity=ss(.82,.95,p)})};
draws.next=(el,w,h)=>{const T=timeline(el,w,h,true);timed(el,4800,T.upd)};
/* 4 the customer stopped starting conversations; the business still reaches out and the customer still replies */
draws.lanes=(el,w,h)=>{const nr=narrow(),g=canvas(el,w,h),yc=h*.18,yb=h*.82,x0=nr?w*.16:w*.12,xs=w*.58,r2=rng(4),pf=person(g),pb=person(g);
  const top=[...Array(5)].map((_,i)=>{const xe=xs*(.5+.1*i)+x0*.2,pa=pt(g,{d:`M${x0+26} ${yc} C ${x0+(xe-x0)*.3} ${yc-h*.1-i*3}, ${x0+(xe-x0)*.7} ${yc+h*.12+i*4}, ${xe} ${yc+h*.04+i*h*.03}`,'stroke-width':1.6}),e=dot(g,{cx:xe,cy:yc+h*.04+i*h*.03,r:3.2});return{pa,e,L:0}});
  const dsh=ln(g,{x1:xs+w*.04,x2:xs+w*.04,y1:yc-h*.1,y2:yc+h*.28,'stroke-width':1.4,'stroke-dasharray':'3 6'});
  const loops=[.4,.62,.84].map(f=>{const x=w*f;return{ring:cc(g,{cx:x,cy:yb,r:0,'stroke-width':1.8}),out:pt(g,{d:`M${x0+26} ${yb} Q ${(x0+x)/2} ${yb-h*.3} ${x-20} ${yb}`,'stroke-width':1.2,'stroke-dasharray':'2 6'}),back:pt(g,{d:`M${x-20} ${yb} Q ${(x0+x)/2} ${yb+h*.16} ${x0+26} ${yb}`,'stroke-width':3}),x}});
  if(nr){L(el,'cu',x0,yc-36,'translate(-50%,-50%)');L(el,'bu',x0,yb-36,'translate(-50%,-50%)')}else{L(el,'cu',x0-50,yc,'translate(-100%,-50%)');L(el,'bu',x0-50,yb,'translate(-100%,-50%)')}L(el,'ui',x0+w*.12,yc-h*.17,'translate(0,-50%)');L(el,'ns',xs+w*.04,yc-h*.17,'translate(-50%,-50%)');
  const sp=el.parentNode.querySelectorAll('.cux-lb'),Ls=[top.map(t=>t.pa.getTotalLength()),loops.map(l=>[l.out.getTotalLength(),l.back.getTotalLength()])];
  top.forEach((t,i)=>t.pa.setAttribute('stroke-dasharray',Ls[0][i]));loops.forEach((l,i)=>{l.back.setAttribute('stroke-dasharray',Ls[1][i][1])});
  timed(el,5600,p=>{pf(x0,yc,14,ss(0,.1,p));pb(x0,yb,14,ss(.45,.55,p));top.forEach((t,i)=>{const q=ss(.05+i*.06,.3+i*.06,p);t.pa.setAttribute('stroke-dashoffset',Ls[0][i]*(1-q));t.e.setAttribute('r',3.2*ss(.28+i*.06,.34+i*.06,p))});
    dsh.setAttribute('opacity',ss(.5,.62,p));loops.forEach((l,i)=>{const q=ss(.55+i*.1,.75+i*.1,p);l.out.setAttribute('opacity',q);l.ring.setAttribute('r',16*q);l.back.setAttribute('stroke-dashoffset',Ls[1][i][1]*(1-ss(.65+i*.1,.9+i*.1,p)))});
    sp.forEach((s,i)=>s.style.opacity=i<2?ss(0,.1,p):i===2?ss(.1,.25,p):ss(.55,.7,p));const fb=el.parentNode.parentNode.querySelector('.cux-t4b');if(fb)fb.style.opacity=ss(.5,.7,p);const mm=el.parentNode.parentNode.querySelector('.cux-mid');if(mm)mm.style.opacity=ss(.4,.55,p)})};
/* 5 what is really happening: the rhythm of one customer's initiation over time, the missed request, the stretch, the history */
draws.rhy=(el,w,h)=>{const g=canvas(el,w,h),y=h*.55,x0=w*.06,sp=w*.052,ar=Math.min(h*.3,w*.034),pos=[];let x=x0;for(let i=0;i<9;i++){pos.push(x);x+=sp}const ghostX=x;x+=sp*1.5;[1.7,2.4,3.2].forEach(m=>{pos.push(x);x+=sp*m});pos.push(x);
  const sc=(w*.88-x0)/(pos[pos.length-1]-x0);const GX=ghostX*0+0;for(let i=0;i<pos.length;i++)pos[i]=x0+(pos[i]-x0)*sc;const ghostS=x0+(ghostX-x0)*sc;const last=pos[pos.length-1];ln(g,{x1:x0-10,x2:w*.97,y1:y,y2:y,'stroke-width':1});
  const arcs=pos.map((px,i)=>pt(g,{d:arcPath(px,y,ar),'stroke-width':i<9?2.2:2.2})),gh=pt(g,{d:arcPath(ghostS,y,ar),'stroke-width':1.6,'stroke-dasharray':'3 6'}),fade=pt(g,{d:`M${last+sp*1.2} ${y} L ${w*.96} ${y}`,'stroke-width':1.6,'stroke-dasharray':'2 8'});
  const hy=y+ar*.9,his=pt(g,{d:`M${last} ${hy} L ${x0} ${hy}`,'stroke-width':1.3}),ah=pt(g,{d:`M${x0+9} ${hy-6} L ${x0} ${hy} L ${x0+9} ${hy+6}`,'stroke-width':1.3});
  const lens=arcs.map(a=>a.getTotalLength());arcs.forEach((a,i)=>a.setAttribute('stroke-dasharray',lens[i]));const hl=his.getTotalLength();his.setAttribute('stroke-dasharray',hl);
  const stl=[...el.parentNode.querySelectorAll('.cux-st li')],cx=[x0+(ghostS-x0)*.5,ghostS,(pos[9]+pos[10])/2,(pos[11]+pos[12])/2,Math.min(w*.9,last+sp*3)];
  stl.forEach((li,i)=>{li.style.left=cx[i]+'px'});L(el,'ci',x0-10,y-ar-26,'translate(0,-50%)');L(el,'own',x0+sp*4,y-ar-24,'translate(-50%,-50%)');L(el,'his',(last+x0)/2,hy+22,'translate(-50%,-50%)');
  const sp2=el.parentNode.querySelectorAll('.cux-lb');
  timed(el,6400,p=>{arcs.forEach((a,i)=>{const q=ss(.02+i*.045,.1+i*.045,p);a.setAttribute('stroke-dashoffset',lens[i]*(1-q))});gh.setAttribute('opacity',ss(.48,.56,p));fade.setAttribute('opacity',ss(.8,.88,p));
    his.setAttribute('stroke-dashoffset',hl*(1-ss(.84,1,p)));ah.setAttribute('opacity',ss(.97,1,p));sp2[0].style.opacity=ss(0,.1,p);sp2[1].style.opacity=ss(.3,.4,p);sp2[2].style.opacity=ss(.9,1,p);
    stl.forEach((li,i)=>li.style.opacity=ss([.1,.5,.62,.72,.82][i],[.18,.58,.7,.8,.9][i],p));const f=el.closest('.l2-f').querySelector('.cux-fin');if(f)f.style.opacity=ss(.9,1,p)})};
/* 6 the record and its two narrow openings: lens shaped slits in the wall */
draws.slit=(el,w,h)=>{const g=canvas(el,w,h),W=Math.min(w*.2,46),cx=W+4,d=`M${cx} 2 C ${cx+W} ${h*.2}, ${cx+W} ${h*.8}, ${cx} ${h-2} C ${cx-W} ${h*.8}, ${cx-W} ${h*.2}, ${cx} 2 Z`;
  const sl=mk('path',{d,fill:'none',stroke:'#fff','stroke-width':1.5},g),fill=mk('path',{d,fill:'#fff'},g);timed(el,2400,p=>{sl.setAttribute('opacity',ss(0,.3,p));fill.setAttribute('opacity',.0+ss(.3,1,p)*.0)})};
/* 7 the signal and what it can mean: requests keep travelling to a contact point that has gone and stop at its edge */
draws.gone=(el,w,h)=>{const g=canvas(el,w,h),px=w*.78,py=h*.5,s=Math.min(w,h)*.12,N=7,pf=person(g);
  const rays=[...Array(N)].map((_,i)=>{const a=(i-(N-1)/2)*.2,len=w*.5,x1=px-s*1.9-Math.cos(a)*len,y1=py-Math.sin(a)*len*.55;return{l:ln(g,{'stroke-width':1.6,'stroke-dasharray':'2 7'}),x1,y1,x2:px-s*1.9-s*.25,y2:py-Math.sin(a)*s*.7,d:dot(g,{r:3.5})}});
  L(el,'un',px-s*3.6,py+s*2.6,'translate(-50%,-50%)');L(el,'mo',px,py+s*2.6,'translate(-50%,-50%)');const sp=el.parentNode.querySelectorAll('.cux-lb');
  timed(el,5000,p=>{pf(px,py,s,ss(0,.2,p),true);rays.forEach((r,i)=>{const t=ss(.15+i*.04,.65+i*.04,p);r.l.setAttribute('x1',r.x1);r.l.setAttribute('y1',r.y1);r.l.setAttribute('x2',lerp(r.x1,r.x2,t));r.l.setAttribute('y2',lerp(r.y1,r.y2,t));r.d.setAttribute('cx',lerp(r.x1,r.x2,t));r.d.setAttribute('cy',lerp(r.y1,r.y2,t));r.d.setAttribute('opacity',ss(.15+i*.04,.2+i*.04,p))});
    sp[0].style.opacity=ss(.7,.8,p);sp[1].style.opacity=ss(.8,.9,p);const tw=el.closest('.l2-f').querySelector('.cux-two');if(tw)tw.style.opacity=ss(.55,.75,p)})};
/* 8 five possible responses: four are faint and stop short, one solid path arrives */
draws.resp=(el,w,h)=>{const g=canvas(el,w,h),lis=[...el.parentNode.querySelectorAll('.cux-opts li')].map(li=>{const r=li.getBoundingClientRect(),b=el.getBoundingClientRect();return{x:r.right-b.left+14,y:r.top+r.height/2-b.top}}),px=w*.9,py=h*.5,s=Math.min(w,h)*.07,pf=person(g);
  const stop=[.52,.62,.45,.7,.58];
  const pa=lis.map((l,i)=>{const d=`M${l.x} ${l.y} C ${l.x+(px-l.x)*.4} ${l.y}, ${l.x+(px-l.x)*.5} ${py}, ${l.x+(px-l.x-s*2)*stop[i]} ${lerp(l.y,py,stop[i])}`;return pt(g,{d,'stroke-width':1.4,'stroke-dasharray':'3 7'})});
  const sol=pt(g,{d:`M${w*.5} ${py+h*.07} C ${w*.62} ${py+h*.07}, ${w*.7} ${py}, ${px-s*1.9} ${py}`,'stroke-width':4}),sl=sol.getTotalLength();sol.setAttribute('stroke-dasharray',sl);
  const lens=pa.map(p=>p.getTotalLength());
  timed(el,4600,p=>{pf(px,py,s,ss(0,.15,p));pa.forEach((q,i)=>{q.setAttribute('opacity',ss(.1+i*.07,.3+i*.07,p));});sol.setAttribute('stroke-dashoffset',sl*(1-ss(.55,.9,p)));const c=el.closest('.l2-f').querySelector('.cux-call');if(c)c.style.opacity=ss(.8,.95,p);
    el.parentNode.querySelectorAll('.cux-opts li').forEach((li,i)=>li.style.opacity=ss(i*.07,.2+i*.07,p))})};
draws.brg=(el,w,h)=>{const g=canvas(el,w,h),y=h*.5,s=Math.min(h*.2,22),pf=person(g),N=6,x1=w*.14,x2=w*.68,gh=cc(g,{cy:y,r:s*1.7,'stroke-width':1.5,'stroke-dasharray':'3 6'}),ds=[...Array(N)].map(()=>dot(g,{cy:y,r:0})),l=ln(g,{y1:y,y2:y,'stroke-width':1.2});
  gh.setAttribute('cx',w*.84);timed(el,3600,p=>{pf(w*.1,y,s,ss(0,.15,p));l.setAttribute('x1',x1);l.setAttribute('x2',lerp(x1,x2+w*.04,ss(.1,.6,p)));ds.forEach((d,i)=>{d.setAttribute('cx',lerp(x1+10,x2,i/(N-1)));d.setAttribute('r',(2+i*.5)*ss(.2+i*.07,.3+i*.07,p))});gh.setAttribute('opacity',ss(.65,.9,p))})};
window.LDT_CU={init:root=>init(root,{draw:{rg:draws.rg,exp:draws.exp,tl3:draws.tl3,lanes:draws.lanes,rhy:draws.rhy,slit:draws.slit,gone:draws.gone,resp:draws.resp,next:draws.next,brg:draws.brg}})};
})();
