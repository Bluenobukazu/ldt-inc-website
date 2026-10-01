/* Layer 1 views (visual rebuild 01.10.2026): Experience (05.1), When to engage (06.1), Lead (07.1).
   Each view is a few frames with one mechanism from its own content. Uses assets/js/l2.js. Replays when the view is opened. */
(function(){
const {mk,canvas,rng,narrow,clamp,lerp,seg,init,timed,ss}=window.LDT_L2;
const C='currentColor',cc=(g,a)=>mk('circle',Object.assign({fill:'none',stroke:C},a),g),dot=(g,a)=>mk('circle',Object.assign({fill:C},a),g),ln=(g,a)=>mk('line',Object.assign({stroke:C,'stroke-linecap':'round'},a),g),pt=(g,a)=>mk('path',Object.assign({fill:'none',stroke:C,'stroke-linecap':'round'},a),g);
const TAU=Math.PI*2,rel=(el,b)=>{const a=el.getBoundingClientRect(),r=b.getBoundingClientRect();return{l:r.left-a.left,r:r.right-a.left,t:r.top-a.top,b:r.bottom-a.top,cx:(r.left+r.right)/2-a.left,cy:(r.top+r.bottom)/2-a.top}};
const draws={};
/* Experience: five different contexts, the same core in each, one axis through all */
draws.ctx=(el,w,h)=>{const g=canvas(el,w,h),N=5,cy=h*.5,R=Math.min(h*.42,w/N*.42),X=i=>w*(i+.5)/N,sh=[1,.78,.92,.7,.85];
  const ax=ln(g,{x1:X(0),x2:X(N-1),y1:cy,y2:cy,'stroke-width':1.4}),rings=[];
  for(let i=0;i<N;i++){const r=R*sh[i],cx=X(i);
    if(i===0)rings.push(cc(g,{cx,cy,r,'stroke-width':1.8}));
    if(i===1){rings.push(cc(g,{cx,cy,r,'stroke-width':1.8}),cc(g,{cx,cy,r:r*.74,'stroke-width':1.8}))}
    if(i===2)rings.push(cc(g,{cx,cy,r,'stroke-width':1.8,'stroke-dasharray':'3 8'}));
    if(i===3)rings.push(pt(g,{d:`M${cx+r} ${cy} A ${r} ${r} 0 1 0 ${cx} ${cy+r}`,'stroke-width':1.8}));
    if(i===4)rings.push(cc(g,{cx,cy,r,'stroke-width':4}))}
  const dots=[...Array(N)].map((_,i)=>dot(g,{cx:X(i),cy,r:0}));
  const L=rings.map(r=>r.getTotalLength?r.getTotalLength():300);rings.forEach((r,i)=>{if(!r.getAttribute('stroke-dasharray')){r.setAttribute('stroke-dasharray',L[i]);r.__d=1}});
  timed(el,3400,p=>{ax.setAttribute('opacity',ss(.3,.6,p));rings.forEach((r,i)=>{if(r.__d)r.setAttribute('stroke-dashoffset',L[i]*(1-ss(i*.08,.4+i*.08,p)));else r.setAttribute('opacity',ss(i*.08,.3+i*.08,p))});dots.forEach((d,i)=>d.setAttribute('r',Math.min(R*.16,10)*ss(.35+i*.07,.5+i*.07,p)))})};
/* Business impact: each outcome as a span on its own scale, from its low to its high end */
draws.rng=(el,w,h)=>{const g=canvas(el,w,h),R=[[15,40,50],[5,15,20],[10,25,35]],cw=w/3,gap=Math.min(w*.03,40),y=h-14,segs=[];
  R.forEach(([a,b,m],i)=>{const x0=cw*i,x1=x0+cw-gap,sx=v=>x0+(x1-x0)*v/m;ln(g,{x1:x0,x2:x1,y1:y,y2:y,'stroke-width':1.2});
    [[a,0],[b,1]].forEach(([v])=>ln(g,{x1:sx(v),x2:sx(v),y1:y-10,y2:y+10,'stroke-width':1.6}));
    const s=ln(g,{x1:sx(a),x2:sx(b),y1:y,y2:y,'stroke-width':10});s.setAttribute('stroke-linecap','butt');segs.push([s,sx(a),sx(b)])});
  timed(el,3000,p=>segs.forEach(([s,a,b],i)=>{const q=ss(.15+i*.15,.6+i*.15,p);s.setAttribute('x1',a);s.setAttribute('x2',lerp(a,b,q));s.setAttribute('opacity',q>0?1:0)}))};
/* Across business maturity: four stages, each as its own small structure */
draws.mat=(el,w,h)=>{const g=canvas(el,w,h),cy=h*.5,cw=w/4,r=Math.min(cw*.36,h*.4),r2=rng(3);
  const a1=[cc(g,{cx:cw*.5,cy,r:r*.85,'stroke-width':1.6,'stroke-dasharray':'3 7'}),dot(g,{cx:cw*.5,cy,r:r*.22})];
  const sc=[...Array(9)].map((_,i)=>[cw*1.5+(r2()-.5)*cw*.8,cy+(r2()-.5)*h*.7]),a2=sc.map(([x,y])=>dot(g,{cx:x,cy:y,r:3.4}));
  const a3c=cc(g,{cx:cw*2.5,cy,r,'stroke-width':1.8}),a3=[0,1,2,3,4,5].map(i=>dot(g,{r:3.6,cx:cw*2.5+Math.cos(i*TAU/6)*r,cy:cy+Math.sin(i*TAU/6)*r}));
  const a4=[cc(g,{cx:cw*3.5,cy,r:r*.8,'stroke-width':1.6,'stroke-dasharray':'3 7'}),cc(g,{cx:cw*3.5,cy,r,'stroke-width':3}),pt(g,{d:`M${cw*3.5-r*1.1} ${cy} L ${cw*3.5+r*1.1} ${cy}`,'stroke-width':1.6})];
  timed(el,3400,p=>{a1.forEach((e,i)=>e.setAttribute('opacity',ss(0,.2,p)));a2.forEach((e,i)=>e.setAttribute('opacity',ss(.2+i*.02,.3+i*.02,p)));a3c.setAttribute('opacity',ss(.45,.6,p));a3.forEach((e,i)=>e.setAttribute('opacity',ss(.5+i*.02,.6+i*.02,p)));a4.forEach(e=>e.setAttribute('opacity',ss(.7,.9,p)))})};
/* Creative fluency: the idea stays as free as it was; a little structure stands under it so it can move */
draws.idea=(el,w,h)=>{const g=canvas(el,w,h),pts=[];for(let i=0;i<=40;i++){const t=i/40;pts.push([w*.04+t*w*.92,h*.4+Math.sin(t*TAU*1.25)*h*.28+Math.sin(t*TAU*3.1+1)*h*.08])}
  const d='M'+pts.map(q=>q.map(v=>v.toFixed(1)).join(' ')).join(' L'),cv=pt(g,{d,'stroke-width':3.2,'stroke-linejoin':'round'}),L=cv.getTotalLength();cv.setAttribute('stroke-dasharray',L);
  const base=ln(g,{x1:w*.04,x2:w*.96,y1:h-6,y2:h-6,'stroke-width':1.2}),sup=[.14,.36,.58,.8].map(t=>{const q=pts[Math.round(t*40)];return ln(g,{x1:q[0],x2:q[0],y1:q[1]+6,y2:h-6,'stroke-width':1.3,'stroke-dasharray':'2 6'})});
  timed(el,3600,p=>{cv.setAttribute('stroke-dashoffset',L*(1-ss(0,.6,p)));base.setAttribute('opacity',ss(.55,.7,p));sup.forEach((s,i)=>s.setAttribute('opacity',ss(.6+i*.06,.75+i*.06,p)))})};
/* When to engage: vision, operations and commercial reality grow past the structure that held them */
draws.out=(el,w,h)=>{const g=canvas(el,w,h),cx=w*.5,cy=h*.5,R=Math.min(w*.3,h*.46),st=cc(g,{cx,cy,r:R,'stroke-width':2}),ps=[[-.9,.55],[.35,.3],[1.9,.7]].map(([a,k])=>({a,k,e:dot(g,{r:0}),t:ln(g,{'stroke-width':1.4,'stroke-dasharray':'2 6'})}));
  timed(el,4200,p=>{const g1=ss(.1,.8,p);st.setAttribute('stroke-dasharray',`${2*Math.PI*R*ss(0,.15,p)} 9999`);ps.forEach(({a,k,e,t})=>{const r=lerp(R*.2,R*(1.1+k*.9),g1),x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;e.setAttribute('cx',x);e.setAttribute('cy',y);e.setAttribute('r',lerp(5,16+k*10,g1)*ss(0,.1,p));
    t.setAttribute('x1',cx);t.setAttribute('y1',cy);t.setAttribute('x2',x);t.setAttribute('y2',y);t.setAttribute('opacity',ss(.2,.4,p))})})};
/* the three situations */
draws.st=(el,w,h)=>{const i=+el.dataset.i,g=canvas(el,w,h),cx=w/2,cy=h/2,R=Math.min(w,h)*.44,r2=rng(5+i);
  if(i===0){const arc=cc(g,{cx,cy,r:R,'stroke-width':1.6,'stroke-dasharray':'3 8'}),idea=dot(g,{cx,cy,r:0}),halo=cc(g,{cx,cy,r:0,'stroke-width':1.2});
    timed(el,3000,p=>{idea.setAttribute('r',R*.16*ss(0,.25,p));halo.setAttribute('r',R*.3*ss(.2,.5,p));halo.setAttribute('opacity',1-ss(.5,.8,p)*.5);arc.setAttribute('opacity',ss(.4,.7,p))})}
  if(i===1){const four=[0,1,2,3].map(k=>({c:cc(g,{r:R*.55,'stroke-width':1.7}),d:dot(g,{r:4}),k}));
    timed(el,3600,p=>{four.forEach(({c,d,k})=>{const a=k*Math.PI/2,off=R*.38,j=Math.sin(p*5+k*1.7)*R*.12*ss(.3,.9,p),x=cx+Math.cos(a)*off+Math.cos(a+1.2)*j,y=cy+Math.sin(a)*off+Math.sin(a+1.2)*j;c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('opacity',ss(k*.08,.3+k*.08,p));
      const q=p*7+k*1.6;d.setAttribute('cx',x+Math.cos(q)*R*.55);d.setAttribute('cy',y+Math.sin(q)*R*.55);d.setAttribute('opacity',ss(.3,.5,p))})})}
  if(i===2){const P=[];for(let k=0;k<22;k++){const grp=k%3,a=grp*TAU/3+r2()*.9,rr=R*(.6+r2()*.7);P.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.9,grp])}
    const ds=P.map(([x,y])=>dot(g,{cx:x,cy:y,r:3.6})),hub=cc(g,{cx,cy,r:0,'stroke-width':2.2}),lines=P.filter((_,k)=>k%2===0).map(([x,y])=>ln(g,{x1:x,y1:y,x2:cx,y2:cy,'stroke-width':1,'stroke-dasharray':'2 6'}));
    timed(el,3800,p=>{ds.forEach((d,k)=>d.setAttribute('opacity',ss(k*.015,.15+k*.015,p)));hub.setAttribute('r',R*.22*ss(.45,.7,p));lines.forEach((l,k)=>l.setAttribute('opacity',ss(.55+k*.02,.7+k*.02,p)))})}};
/* Lead: inside the business, carrying it. Teams as rings of people, one point carrying the centre; an adviser stands outside */
draws.inside=(el,w,h)=>{const g=canvas(el,w,h),cx=w*.5,cy=h*.5,R=Math.min(w,h)*.44,rings=[[10,.3],[24,.6],[46,.92]],ds=[];
  rings.forEach(([n,f],ri)=>{for(let k=0;k<n;k++){const a=k*TAU/n+ri*.4;ds.push({e:dot(g,{cx:cx+Math.cos(a)*R*f,cy:cy+Math.sin(a)*R*f,r:3.2}),i:ds.length})}});
  const biz=cc(g,{cx,cy,r:R*1.08,'stroke-width':1.8}),me=dot(g,{cx,cy,r:0}),halo=cc(g,{cx,cy,r:0,'stroke-width':1.3}),adv=cc(g,{cx:cx+R*1.5,cy:cy-R*.9,r:9,'stroke-width':1.6}),aw=pt(g,{d:`M${cx+R*1.42} ${cy-R*.82} L ${cx+R*1.15} ${cy-R*.62}`,'stroke-width':1.4,'stroke-dasharray':'2 6'});
  timed(el,4200,p=>{biz.setAttribute('stroke-dasharray',`${2*Math.PI*R*1.08*ss(0,.15,p)} 9999`);ds.forEach(({e,i})=>e.setAttribute('opacity',ss(.12+i*.006,.2+i*.006,p)));me.setAttribute('r',R*.09*ss(.55,.75,p));halo.setAttribute('r',R*.17*ss(.65,.9,p));adv.setAttribute('opacity',ss(.8,.95,p));aw.setAttribute('opacity',ss(.85,1,p))})};
/* six responsibilities on one thread, carried from the first to the last */
draws.thread=(el,w,h)=>{const g=canvas(el,w,h),dts=[...el.parentNode.querySelectorAll('.ld-dl dt')],P=dts.map(d=>rel(el,d));if(!P.length)return;
  const x=Math.max(14,Math.min(P[0].l-26,w*.04)),y0=P[0].cy,y1=P[P.length-1].cy,ln1=ln(g,{x1:x,x2:x,y1:y0,y2:y0,'stroke-width':3}),nodes=P.map((q,i)=>dot(g,{cx:x,cy:q.cy,r:0}));
  timed(el,4200,p=>{const t=ss(.05,.9,p);ln1.setAttribute('y2',lerp(y0,y1,t));nodes.forEach((n,i)=>{const at=i/(nodes.length-1);n.setAttribute('r',(i===0?9:5.5)*ss(at*.8,at*.8+.12,p))})})};
const R=root=>init(root,{draw:draws});
window.LDT_L1={init:()=>{
  ['experience','engage','lead'].forEach(id=>{const ov=document.getElementById(id);if(!ov)return;const root=ov.querySelector('.inner.l2');if(!root)return;
    let reset=null;const run=()=>{if(!reset)reset=R(root);else reset();ov.scrollTop=0};
    if(window.LDT&&LDT.fills)LDT.fills[id]=run;run()})}};
document.readyState==='loading'?addEventListener('DOMContentLoaded',()=>window.LDT_L1.init()):window.LDT_L1.init();
})();
