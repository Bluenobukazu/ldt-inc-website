/* Deep Dive A Proposition (continuity build, 30.09.2026). The page is drawn once per size from the approved concept:
   real text, SVG illustrations drawn to their container, one dot material that changes state across the page.
   Motion only explains a state change (alignment, drift, opening, editing, rebuilding, resolution); reduced motion shows the final states. */
(function(){
const NS='http://www.w3.org/2000/svg',RMq=matchMedia('(prefers-reduced-motion: reduce)');
const mk=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const CW={a:'#000',b:'#8a8a8a',r:'#ececec',s:'#8c8c8c',f:'#fff'},CK={a:'#fff',b:'#9a9a9a',r:'#262626',s:'#a9a9a9',f:'#000'};
const canvas=(el,w,h)=>{el.textContent='';return el.appendChild(mk('svg',{viewBox:`0 0 ${w} ${h}`,width:w,height:h,'aria-hidden':'true',focusable:'false'}))};
const P=(g,d,col,w=1.8,x={})=>mk('path',Object.assign({d,fill:'none',stroke:col,'stroke-width':w,'stroke-linecap':'round',pathLength:1,class:'pz-p'},x),g);
const pts=(p,n,a=0,b=1)=>{const L=p.getTotalLength();return Array.from({length:n},(_,i)=>p.getPointAtLength(L*(a+(b-a)*(n>1?i/(n-1):0))))};
const dots=(g,p,n,r0,r1,fill,a=0,b=1)=>pts(p,n,a,b).forEach((q,i)=>mk('circle',{cx:q.x,cy:q.y,r:r0+(r1-r0)*(n>1?i/(n-1):0),fill,class:'pz-dt',style:`--i:${i}`},g));
const T=(g,x,y,s,col,anchor,sz=14)=>{const t=mk('text',{x,y,fill:col,'font-size':sz,'font-weight':700,'letter-spacing':'.14em','text-anchor':anchor||'start',class:'pz-tx',style:'text-transform:uppercase'},g);t.textContent=s;return t};
const rng=seed=>{let q=seed;return()=>((q=(q*9301+49297)%233280)/233280)};
const narrow=()=>matchMedia('(max-width:760px)').matches;

/* ---- the one dot material: a field that loses its order from state 1 to 5 and is fully loosened when the business has grown (state 6) ---- */
function field(fr){
  const st=+fr.dataset.st,w=fr.clientWidth,h=fr.clientHeight;if(!w||!h)return;
  let host=fr.querySelector(':scope>.pz-fd');if(!host){host=fr.insertBefore(document.createElement('div'),fr.firstChild);host.className='pz-fd'}
  const g=canvas(host,w,h),r=rng(st*97+3),sp=narrow()?44:39,cols=Math.ceil(w/sp)+1,rows=Math.ceil(h/sp)+1,fill=st===6?'#3c3c3c':(fr.dataset.fill||'#2b2b2b');
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
    let dx=0,dy=0,s=1,o=1;
    if(st===2)dx=j*2.2;
    if(st===3){if(i>cols/2)dx=26;if(j>rows/2)dy=-18}
    if(st===4){if(r()<.38)o=0;if(j>rows/2)dy=12}
    if(st===5){dx=(r()-.5)*34;dy=(r()-.5)*34;s=.7+r()*1.5}
    if(st===6){dx=(r()-.5)*70;dy=(r()-.5)*70;s=.8+r()*2.6}
    mk('circle',{cx:6+i*sp,cy:6+j*sp,r:2.3,fill,style:`--dx:${dx.toFixed(1)}px;--dy:${dy.toFixed(1)}px;--s:${s.toFixed(2)};--o:${o};--d:${((i+j)%9)*.04}s`},g);
  }
}

/* ---- illustrations ---- */
const DRAW={
  /* It holds: three strands meet at one idea */
  f0(el,w,h){const g=canvas(el,w,h),c=CW,K=[w*.74,h*.5],m=narrow();
    mk('circle',{cx:K[0],cy:K[1],r:Math.min(w,h)*.17,fill:'none',stroke:c.r,'stroke-width':Math.min(w,h)*.07},g);
    const S=[[[w*.02,h*.18],c.a,14,2.6,3],[[w*.0,h*.52],c.b,10,3.6,4.2],[[w*.04,h*.88],c.a,7,6,6.6]];
    S.forEach((s,i)=>{const p=P(g,`M${s[0][0]} ${s[0][1]} C${w*.3} ${s[0][1]} ${w*.42} ${K[1]+(i-1)*h*.05} ${K[0]} ${K[1]}`,s[1]);dots(g,p,s[2],s[3],s[4],s[1],0,.96)});
    mk('circle',{cx:K[0],cy:K[1],r:16,fill:c.a,class:'pz-kn'},g);
    [['Offer',w*.02,h*.18-18],['Organization',w*.0,h*.52-18],['Economics',w*.04,h*.88+30]].forEach(a=>T(g,Math.max(2,a[1]),a[2],a[0],c.a));
    T(g,K[0],K[1]+Math.min(w,h)*.17+38,'The idea',c.s,'middle');},
  /* 01 the offer keeps growing around the idea */
  d1(el,w,h){const g=canvas(el,w,h),c=CK,cx=w/2,cy=h/2,R=Math.min(w/1.6,h/.72)/2*.98;
    mk('circle',{cx,cy,r:Math.min(w,h)*.1,fill:'#000',stroke:c.a,'stroke-width':5},g);mk('circle',{cx,cy,r:13,fill:c.a},g);
    for(let j=1;j<=5;j++){const n=8+j*6,rr=(j/5)*R;for(let i=0;i<n;i++){const an=i/n*6.283+j*.5;
      mk('circle',{cx:cx+Math.cos(an)*rr*1.6,cy:cy+Math.sin(an)*rr*.72,r:2.5+j*1.6+(i%3),fill:(i+j)%4?'#4a4a4a':'#fff',class:'pz-ring',style:`--j:${j}`},g)}}
    T(g,cx,cy+Math.min(w,h)*.1+34,'The idea',c.s,'middle')},
  /* 02 the offer is far ahead, organisation and economics stay with the idea */
  d2(el,w,h){const g=canvas(el,w,h),c=CK,K=[w*.3,h*.62],r=Math.min(w,h)*.13;
    mk('circle',{cx:K[0],cy:K[1],r,fill:'none',stroke:c.r,'stroke-width':r*.34},g);
    mk('circle',{cx:K[0]-r*.3,cy:K[1]+r*.14,r:14,fill:c.a},g);mk('circle',{cx:K[0]+r*.3,cy:K[1]-r*.1,r:9,fill:c.b},g);
    const n=14;for(let i=0;i<n;i++)mk('circle',{cx:w*.42+i*(w*.5/n),cy:K[1]-h*.3-i*4,r:3+i*.8,fill:c.a,class:'pz-dt',style:`--i:${i};--o:${(.35+i*.045).toFixed(2)}`},g);
    mk('circle',{cx:w*.97,cy:K[1]-h*.3-n*4-6,r:Math.min(46,w*.05),fill:c.a,class:'pz-far',style:`--fx:${K[0]-w*.97}px;--fy:${K[1]-(K[1]-h*.3-n*4-6)}px`},g);
    T(g,w*.86,K[1]-h*.3+Math.min(46,w*.05)+26,'Offer',c.a);
    T(g,K[0]-r-10,K[1]+r+36,'Organization',c.a,'middle');T(g,K[0]+r+10,K[1]+r+60,'Economics',c.a,'middle');
    T(g,K[0],K[1]-r-18,'The idea',c.s,'middle')},
  /* 03 growth has moved the centre: only distance */
  d3(el,w,h){const g=canvas(el,w,h),c=CK,K=[w*.14,h*.5],B=[w*.72,h*.52],r=Math.min(w,h)*.14;
    mk('circle',{cx:K[0],cy:K[1],r,fill:'none',stroke:c.r,'stroke-width':r*.34},g);mk('circle',{cx:K[0],cy:K[1],r:11,fill:'none',stroke:c.a,'stroke-width':2.4},g);
    T(g,K[0],K[1]+r+36,'The idea',c.s,'middle');
    const p=P(g,`M${K[0]+r+10} ${K[1]} C${w*.35} ${K[1]+12} ${w*.5} ${K[1]+8} ${B[0]} ${B[1]}`,c.a,1.4,{'stroke-dasharray':'2 9',pathLength:''});p.removeAttribute('pathLength');
    const q=rng(5);for(let i=0;i<34;i++){const an=q()*6.283,rr=(60+q()*190)*Math.min(1,w/900);mk('circle',{cx:B[0]+Math.cos(an)*rr*1.3,cy:B[1]+Math.sin(an)*rr*.8,r:2+rr/40,fill:'#555',class:'pz-pop',style:`--j:${1+(i%4)}`},g)}
    mk('circle',{cx:B[0],cy:B[1],r:Math.min(44,w*.05),fill:c.a,class:'pz-far',style:`--fx:${K[0]-B[0]}px;--fy:${K[1]-B[1]}px`},g)},
  /* 05 three versions: three stations with no common meeting point */
  d5(el,w,h){const g=canvas(el,w,h),c=CK,r=Math.min(w*.07,54),m=narrow();
    const S=m?[[w*.26,h*.22,[0,h*.08,w*.12,h*.2]],[w*.74,h*.5,[w,h*.3,w*.9,h*.46]],[w*.3,h*.8,[0,h*.95,w*.15,h*.84]]]
             :[[w*.2,h*.66,[0,h*.54,w*.16,h*.66]],[w*.5,h*.32,[w*.3,h*.08,w*.46,h*.26]],[w*.8,h*.72,[w,h*.96,w*.86,h*.78]]];
    S.forEach((s,i)=>{mk('circle',{cx:s[0],cy:s[1],r,fill:'none',stroke:c.r,'stroke-width':r*.37},g);
      const p=P(g,`M${s[2][0]} ${s[2][1]} C${s[2][0]+(s[0]-s[2][0])*.4} ${s[2][1]} ${s[2][2]} ${s[2][3]} ${s[0]} ${s[1]}`,i==1?c.b:c.a);dots(g,p,12+i*2,2.8,4.4,i==1?c.b:c.a,0,.88);
      mk('circle',{cx:s[0],cy:s[1],r:14,fill:c.a,class:'pz-kn'},g)})},
  /* what changes: the idea inside the grown business */
  lead(el,w,h){const g=canvas(el,w,h),r=Math.min(w,h)*.3;
    mk('circle',{cx:w/2,cy:h/2,r:r*1.2,fill:'#000'},g);mk('circle',{cx:w/2,cy:h/2,r,fill:'none',stroke:'#fff','stroke-width':6},g);mk('circle',{cx:w/2,cy:h/2,r:r*.22,fill:'#fff',class:'pz-kn'},g)},
  /* look underneath: a lens over the grown business; each finding is joined to its line */
  lens(el,w,h){const g=canvas(el,w,h),R=Math.min(w,h)/2*.94,cx=w/2,cy=h/2,id='pzl'+Math.random().toString(36).slice(2,7);
    const cp=mk('clipPath',{id},g);mk('circle',{cx,cy,r:R},cp);
    const dim=mk('g',{},g),lit=mk('g',{'clip-path':`url(#${id})`,class:'pz-lit'},g),q=rng(11);
    for(let i=0;i<Math.round(w*h/2200);i++){const x=q()*w,y=q()*h,r=2+q()*8;mk('circle',{cx:x,cy:y,r,fill:'#2e2e2e'},dim);mk('circle',{cx:x,cy:y,r,fill:'#6a6a6a'},lit)}
    mk('circle',{cx,cy,r:R,fill:'none',stroke:'#fff','stroke-width':2.4},lit);
    const rows=[...el.closest('.pz-f').querySelectorAll('.pz-rows li')],fr=el.getBoundingClientRect(),m=narrow();
    const y=[cy-R*.3,cy,cy+R*.3];
    mk('circle',{cx:cx+R*.3,cy:y[0],r:Math.max(12,R*.08),fill:'#fff',class:'pz-pr'},lit);
    for(let i=0;i<7;i++)mk('circle',{cx:cx-R*.25+i*R*.12,cy:y[1],r:Math.max(4,R*.024),fill:'#fff',class:'pz-pr'},lit);
    [0,1,2,3].forEach(i=>mk('circle',{cx:cx-R*.2+i*R*.17,cy:y[2]+R*.03,r:Math.max(9,R*.058),fill:i<2?'#fff':'#000',stroke:'#fff','stroke-width':3,class:'pz-pr'},lit));
    if(!m&&rows.length===3)rows.forEach((li,i)=>{const b=li.querySelector('svg').getBoundingClientRect(),ty=b.top+b.height/2-fr.top,x0=[cx+R*.3+R*.08+8,cx+R*.3-R*.1,cx+R*.3-R*.05][i];
      mk('line',{x1:x0,y1:y[i]+(i===2?R*.03:0),x2:Math.max(w,b.left-fr.left-10),y2:ty,stroke:'#fff','stroke-width':1.2,'stroke-dasharray':'2 6',class:'pz-cn'},g)});
    [['a',14],['r',20],['f',8]].forEach((k,i)=>{const x=w*.6+i*58,yy=h-10;if(m)return;})},
  /* build it to hold: three strands braided, bound, one line */
  hold(el,w,h){const g=canvas(el,w,h),c=CW,y=h*.5,am=h*.3,n=narrow();
    ['#000','#8a8a8a','#000'].forEach((col,i)=>{const o=(i-1)*am*.5;
      const d=`M${-20} ${y+o*2.4} C${w*.2} ${y-o*2} ${w*.3} ${y+o} ${w*.5} ${y-o*.9} S${w*.7} ${y+o*.6} ${w*.78} ${y} L${w*.86} ${y}`;
      const p=P(g,d,col);dots(g,p,[16,12,8][i],[2.6,3.6,6][i],[3,4.2,6.6][i],col,0,.88)});
    const lnx=w*.78,lx2=w*.94;mk('line',{x1:lnx,y1:y,x2:lx2,y2:y,stroke:'#000','stroke-width':12,class:'pz-ln'},g);
    mk('circle',{cx:lx2,cy:y,r:Math.min(60,w*.045),fill:'none',stroke:c.r,'stroke-width':14},g);mk('circle',{cx:lx2,cy:y,r:Math.min(30,w*.024),fill:'#000',class:'pz-kn'},g);
    [0.8,0.85,0.9].forEach((f,i)=>{const x=w*f;mk('circle',{cx:x,cy:y,r:15,fill:'#fff',stroke:'#000','stroke-width':3,class:'pz-pin',style:`--i:${i}`},g);mk('circle',{cx:x,cy:y,r:5,fill:'#000',class:'pz-pin',style:`--i:${i}`},g)})},
  /* MaHalla: five parts merge into one business, in the same ring as the idea */
  mh(el,w,h){const g=canvas(el,w,h),m=narrow(),words=['Concept','Programming','Operations','Partnerships','Revenue-generating formats'];
    const n=5,step=(w*(m?.82:.66))/n,r0=Math.min(step*.32,50,h*.25),cy=h/2+(m?0:4),GAP=16;
    words.forEach((t,i)=>{const x=w*.06+r0+i*step,r=r0+i*(m?2:Math.min(5,h*.03)),y=cy+(i%2?-1:1)*(4-i)*(m?3:Math.min(7,h*.04));
      mk('circle',{cx:x,cy:y,r,fill:'none',stroke:'#000','stroke-width':2.2,class:'pz-mc',style:`--i:${i}`},g);
      /* same clear gap from every circle edge: labels above sit GAP over the edge, labels below sit GAP under it (cap height ~10) */
      if(!m){const up=i%2===1,lbl=T(g,x,up?y-r-GAP:y+r+GAP+10,t,'#000','middle',13);lbl.classList.add('pz-ml')}});
    const R=Math.min(w*(m?.11:.072),92,h*.4);mk('circle',{cx:w-R-14,cy,r:R*1.36,fill:'none',stroke:CW.r,'stroke-width':R*.3},g);mk('circle',{cx:w-R-14,cy,r:R,fill:'#000',class:'pz-mf'},g)},
  /* ending: every earlier state sits registered around one idea */
  end(el,w,h){const g=canvas(el,w,h),c=CK,cx=w*.5,cy=h*.5,R=Math.min(w,h)/2*.96;
    for(let i=0;i<54;i++){const a=i/54*6.283;mk('circle',{cx:cx+Math.cos(a)*R,cy:cy+Math.sin(a)*R,r:3.2,fill:'#6a6a6a',class:'pz-l1'},g)}
    mk('circle',{cx,cy,r:R*.75,fill:'none',stroke:'#fff','stroke-width':1.6,class:'pz-l2'},g);
    mk('circle',{cx,cy,r:R*.5,fill:'none',stroke:'#fff','stroke-width':14,class:'pz-l3'},g);
    mk('circle',{cx,cy,r:R*.27,fill:'none',stroke:'#3a3a3a','stroke-width':22,class:'pz-l4'},g);mk('circle',{cx,cy,r:22,fill:'#fff',class:'pz-l5'},g)}
};

function drawAll(root){
  root.querySelectorAll('[data-draw]').forEach(el=>{const w=el.clientWidth,h=el.clientHeight;if(w>20&&h>20)DRAW[el.dataset.draw](el,Math.round(w),Math.round(h))});
  root.querySelectorAll('.pz-f[data-st]').forEach(field);
}

function init(root){
  const frames=[...root.querySelectorAll('.pz-f')];let io,rz,drawn=false;
  const go=el=>el.classList.add('in');
  const redraw=()=>{cancelAnimationFrame(rz);rz=requestAnimationFrame(()=>drawAll(root))};
  if(window.ResizeObserver)new ResizeObserver(redraw).observe(root);
  addEventListener('resize',redraw);
  const reset=()=>{
    redraw();
    if(io)io.disconnect();
    frames.forEach(f=>f.classList.remove('in'));
    if(RMq.matches){frames.forEach(go);return}
    root.getBoundingClientRect();
    io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){go(e.target);io.unobserve(e.target)}}),{threshold:.3});
    frames.forEach(f=>io.observe(f));
    requestAnimationFrame(()=>go(frames[0]));
  };
  reset();return reset;
}
window.LDT_PP={init};
})();
