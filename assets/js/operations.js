/* Operations (visual rebuild 01.10.2026). Work moves through the business: a score of lanes, hand-overs that stall between parts,
   a rhythm whose change is the signal, intervention once or every week, a structure that carries the load, three operating realities.
   Uses assets/js/l2.js. Reduced motion shows final states and no running loops. */
(function(){
const {mk,canvas,rng,narrow,clamp,lerp,seg,init,timed,ss}=window.LDT_L2,RM=matchMedia('(prefers-reduced-motion: reduce)');
const OP_L=[['Customers',5,31],['People',7,44],['Orders',3,26],['Stock',9,52],['Suppliers',11,60],['Schedules',7,38],['Production',13,70],['Information',2,22],['Cash',14,48],['Contracts',21,90],['Service',4,30],['Authorities',28,110],['Quality',6,56]];
const OP_W=[.5,.72,.8,.76,.86,.44,.18],OP_D=[i=>i<17?0:.022*(i-16),i=>i===22||i===23?.42:i>23?.14:0,i=>i<15?0:.016*(i-14),i=>i<14?0:i<21?.1:.2];
const OP_X=[['Move capacity to the line that is selling.','Check stock by hand before every confirmation.'],['Renegotiate the terms that no longer pay.','Chase the same late payments every week.'],['Decide once who approves what.','Wait for the one person who approves everything.']];
const ST={p:0,x:0,v:50};
const C='currentColor',cc=(g,a)=>mk('circle',Object.assign({fill:'none',stroke:C},a),g),dot=(g,a)=>mk('circle',Object.assign({fill:C},a),g),ln=(g,a)=>mk('line',Object.assign({stroke:C,'stroke-linecap':'round'},a),g);
const trel=(el,b)=>{const q=document.createRange();q.selectNodeContents(b);const a=el.getBoundingClientRect(),r=q.getBoundingClientRect();return{l:r.left-a.left,r:r.right-a.left,t:r.top-a.top,b:r.bottom-a.top,cx:(r.left+r.right)/2-a.left,cy:(r.top+r.bottom)/2-a.top}};
const rel=(el,b)=>{const a=el.getBoundingClientRect(),r=b.getBoundingClientRect();return{l:r.left-a.left,r:r.right-a.left,t:r.top-a.top,b:r.bottom-a.top,cx:(r.left+r.right)/2-a.left,cy:(r.top+r.bottom)/2-a.top}};
/* a loop that only runs while its element is on screen */
function live(el,step){cancelAnimationFrame(el.__lr);if(el.__io)el.__io.disconnect();
  if(RM.matches){step(0,true);return}
  let on=false;const f=t=>{step(t,false);if(on)el.__lr=requestAnimationFrame(f)};
  el.__io=new IntersectionObserver(es=>{const v=es.some(e=>e.isIntersecting);if(v&&!on){on=true;el.__lr=requestAnimationFrame(f)}else if(!v){on=false;cancelAnimationFrame(el.__lr)}});el.__io.observe(el)}

/* 1 the score: thirteen parts of the business, each moving at its own rhythm; marks that cross Today get heavier */
function score(el,w,h){
  const g=canvas(el,w,h),n=OP_L.length,rh=h/n,nm=narrow()?96:128,tw=w-nm,tx=nm+tw*.72,r=rng(11),lanes=[];
  const fig=el.closest('.ox-score'),nowEl=fig.querySelector('.ox-now span');if(nowEl)nowEl.style.left=tx+'px';
  const cp=mk('clipPath',{id:'oxc'+Math.round(Math.random()*1e6)},mk('defs',{},g));mk('rect',{x:nm,y:0,width:tw,height:h},cp);
  OP_L.forEach(([name,gap,dur],k)=>{const y=rh*(k+.5),t=mk('text',{x:0,y:y+4.5,fill:C,'font-size':13,'font-weight':600,'letter-spacing':'.12em'},g);t.textContent=name.toUpperCase();
    const ms=[];let x=r()*gap;while(x<96){const wd=2+r()*(k%3===0?9:5);ms.push([x/100*tw,wd/100*tw*.55]);x+=wd+gap*(.4+r()*1.1)}
    const gg=mk('g',{'clip-path':`url(#${cp.id})`},g),L=ms.map(([x,wd])=>[0,tw].map(o=>ln(gg,{'stroke-width':3,y1:y,y2:y})).map((e,i)=>({e,x:x+i*tw,wd})));
    lanes.push({y,dur,L:[].concat(...L)})});
  ln(g,{x1:tx,x2:tx,y1:0,y2:h,'stroke-width':1.4});
  const step=(t,fin)=>{lanes.forEach(({y,dur,L})=>{const off=fin?0:((t/1000)/dur%1)*tw;L.forEach(m=>{let x=m.x-off;if(x<-tw*.3)x+=2*tw;if(x>tw*1.7)x-=2*tw;
      const X=nm+x,near=clamp(1-Math.abs(X+m.wd/2-tx)/60);m.e.setAttribute('x1',X);m.e.setAttribute('x2',X+m.wd);m.e.setAttribute('stroke-width',(2.4+near*5).toFixed(1));m.e.setAttribute('stroke-opacity',(.34+.66*clamp(1-Math.abs(X+m.wd/2-tx)/(tw*.2))).toFixed(2))})})};
  live(el,step);
}
/* 2 hand-overs: items leave one part; many stall between the parts (rings), few arrive at the next (dots) */
function gap(el,w,h){
  const g=canvas(el,w,h),rows=[...el.parentNode.querySelectorAll('.ox-rows li')],N=9,STALL=[2,4,5,7,8];
  const R=rows.map(li=>{const a=trel(el,li.querySelector('.a')),m=rel(el,li.querySelector('.m')),b=trel(el,li.querySelector('.b')),y=rel(el,li).b-3,
    its=[...Array(N)].map((_,i)=>{const st=STALL.indexOf(i);return{st,e:cc(g,{'stroke-width':2.2}),f:dot(g,{}),x0:a.r+14,x1:st>=0?lerp(m.l+10,m.r-10,(st+.5)/STALL.length):b.l-14-(i-(st<0?0:0))*0,d:i*.07}});
    let k=0;its.forEach(it=>{if(it.st<0){it.x1=b.l-14-k*16;k++}});return{y,its,b}});
  const upd=p=>R.forEach(({y,its})=>its.forEach(it=>{const q=ss(it.d,it.d+.55,p),x=lerp(it.x0,it.x1,q),stalled=it.st>=0,hollow=stalled?ss(.55,.8,p):0,op=ss(0,.05,p)*(it.d<=p+.02?1:0);
    it.f.setAttribute('cx',x);it.f.setAttribute('cy',y);it.f.setAttribute('r',5);it.f.setAttribute('opacity',op*(1-hollow));
    it.e.setAttribute('cx',x);it.e.setAttribute('cy',y);it.e.setAttribute('r',6.5);it.e.setAttribute('opacity',op*hollow)}));
  timed(el,5200,upd);
}
/* 3 the rhythm: 28 bars; one promise changes it in the last weeks and the change is the signal */
function wave(el,w,h){
  const g=canvas(el,w,h),N=28,bw=Math.min(9,w/N*.42),x=i=>bw+(i+.5)*(w-2*bw)/N,top=10,base=h-6,H=base-top,tgt=p=>[...Array(N)].map((_,i)=>{const d=OP_D[p](i);return Math.min(100,(OP_W[i%7]+d)*74)/100});
  const env=ln(g,{x1:0,x2:w,'stroke-width':1.2,'stroke-dasharray':'2 7'}),bars=[...Array(N)].map(()=>ln(g,{'stroke-width':bw}));
  let cur=tgt(ST.p),raf;const draw=()=>{bars.forEach((b,i)=>{b.setAttribute('x1',x(i));b.setAttribute('x2',x(i));b.setAttribute('y1',base);b.setAttribute('y2',base-cur[i]*H);const sg=OP_D[ST.p](i)>0;b.setAttribute('stroke-width',sg?bw*1.7:bw*.7)});
    const ey=base-.64*H;env.setAttribute('y1',ey);env.setAttribute('y2',ey);
    const cap=el.parentNode.querySelector('.ox-wc'),first=[...Array(N)].findIndex((_,i)=>OP_D[ST.p](i)>0),c=cap.querySelector('[data-l=c]'),nn=cap.querySelector('[data-l=n]');if(!narrow()){c.style.left=x(first)+'px';nn.style.left=x(2)+'px'}};
  el.__set=()=>{cancelAnimationFrame(raf);const from=cur.slice(),to=tgt(ST.p),t0=performance.now();if(RM.matches){cur=to;draw();return}const f=t=>{const q=ss(0,1,(t-t0)/700);cur=from.map((v,i)=>lerp(v,to[i],q));draw();if(q<1)raf=requestAnimationFrame(f)};raf=requestAnimationFrame(f)};
  cur=tgt(ST.p);draw();
}
/* 4 intervention: judgement once changes the track after it; compensation piles up the same way every week */
function iv(el,w,h){
  const g=canvas(el,w,h),root=el.closest('.ox-stk'),J=rel(el,root.querySelector('.ox-j')),Cm=rel(el,root.querySelector('.ox-c')),W=8,nar=w<500,Jb=rel(el,root.querySelector('.ox-j b')),Cb=rel(el,root.querySelector('.ox-c b')),x0=nar?Math.max(w*.42,Jb.r+18,Cb.r+18):w*.42,x1=w-24,xs=i=>lerp(x0,x1,(i+.5)/W),yj=nar?Jb.cy:J.cy,yc=nar?Cb.cy:Cm.cy+14,K=[3,4,5];
  ln(g,{x1:x0-10,x2:x1+10,y1:yj,y2:yj,'stroke-width':1});ln(g,{x1:x0-10,x2:x1+10,y1:yc,y2:yc,'stroke-width':1});
  const jd=[...Array(W)].map(()=>dot(g,{r:4})),node=dot(g,{}),ring=cc(g,{'stroke-width':1.6}),halo=cc(g,{'stroke-width':1.2}),st=[...Array(W)].map(()=>[...Array(6)].map(()=>dot(g,{r:5}))),lens=cc(g,{'stroke-width':1.8});
  const rd=Math.min(20,(x1-x0)/W*.42);
  el.__ex=()=>{};
  const upd=p=>{const k=K[ST.x];jd.forEach((d,i)=>{const t=ss(.04+i*.05,.14+i*.05,p),after=i>2;d.setAttribute('cx',xs(i));d.setAttribute('cy',yj);d.setAttribute('r',after?2.6:4);d.setAttribute('opacity',t*(i===2?0:1))});
    const nt=ss(.2,.4,p);node.setAttribute('cx',xs(2));node.setAttribute('cy',yj);node.setAttribute('r',rd*.42*nt);ring.setAttribute('cx',xs(2));ring.setAttribute('cy',yj);ring.setAttribute('r',rd*nt);
    const hp=ss(.35,.7,p);halo.setAttribute('cx',xs(2));halo.setAttribute('cy',yj);halo.setAttribute('r',rd*(1+hp*1.4));halo.setAttribute('opacity',(1-hp)*.9);
    st.forEach((col,i)=>col.forEach((d,j)=>{const on=j<k,t=ss(.06+i*.07+j*.015,.16+i*.07+j*.015,p);d.setAttribute('cx',xs(i));d.setAttribute('cy',yc-j*Math.min(13,(Cm.cy-Cm.t+8)/3.4));d.setAttribute('opacity',on?t:0)}));
    const lp=ss(.72,.92,p),li=lerp(1,5,ss(.62,.9,p));lens.setAttribute('cx',xs(li));lens.setAttribute('cy',yc-Math.min(13,(Cm.cy-Cm.t+8)/3.4)*(k-1)/2);lens.setAttribute('r',(rd+k*6)*lp);lens.setAttribute('opacity',lp)};
  timed(el,5600,upd);el.__redo=()=>upd(el.__p==null?1:el.__p);
}
/* 5 structure: the load is carried by supports. Too little and it bends, too much and nothing moves */
function beam(el,w,h){
  const svg=mk('svg',{viewBox:'0 0 600 300',preserveAspectRatio:'xMidYMid meet','aria-hidden':'true'});el.textContent='';el.appendChild(svg);
  const fig=el.closest('.ox-beam'),zr=[...el.closest('.l2-f').querySelectorAll('.ox-zr p')],ends=[...el.closest('.l2-f').querySelectorAll('.ox-ends span')],rg=document.getElementById('opRange');
  const Z=['Fragility','Right-sized','Bureaucracy'];let ph=.12;
  const draw=()=>{const v=ST.v,z=v<34?0:v>66?2:1,sag=Math.max(0,(38-v)/38),n=Math.round(v<=50?2+v/50*3:5+Math.pow((v-50)/50,1.3)*23),th=14+Math.max(0,v-66)*.5,Y=x=>112+sag*70*(1-Math.pow((x-300)/260,2));
    let s=`<line x1="0" y1="287" x2="600" y2="287" stroke="currentColor" stroke-width="1.5"/>`;
    for(let k=0;k<n;k++){const x=n===1?300:60+k*480/(n-1);s+=`<line x1="${x.toFixed(1)}" y1="${(Y(x)+th/2).toFixed(1)}" x2="${x.toFixed(1)}" y2="286" stroke="currentColor" stroke-width="${z===2?2.4:3.4}" stroke-linecap="round"/>`}
    if(v>66){const rows=Math.round((v-66)/8);for(let r=1;r<=rows;r++){const y=112+th/2+r*(174-th/2)/(rows+1);s+=`<line x1="56" y1="${y.toFixed(1)}" x2="544" y2="${y.toFixed(1)}" stroke="currentColor" stroke-width="1.6"/>`}}
    s+=`<path d="M40 ${Y(40)} Q300 ${112+sag*140} 560 ${Y(560)}" fill="none" stroke="currentColor" stroke-width="${th}" stroke-linecap="round"/>`;
    const sp=z===2?Math.max(0,1-(v-66)/20):1;
    for(let k=0;k<5;k++){const f=((ph*sp+k/5)%1);let x=60+f*480;if(z===0)x=300+(x-300)*(1-sag*.85);s+=`<circle cx="${x.toFixed(1)}" cy="${(Y(x)-th/2-13).toFixed(1)}" r="9" fill="${z===1?'#fff':'none'}" stroke="currentColor" stroke-width="2.2"/>`}
    svg.innerHTML=s;fig.dataset.z=z;zr.forEach(p=>p.classList.toggle('off',+p.dataset.z!==z));ends.forEach(e=>e.classList.toggle('on',+e.dataset.z===z));if(rg)rg.setAttribute('aria-valuetext',Z[z])};
  el.__draw=draw;draw();live(el,(t,fin)=>{ph=fin?.12:(t/9000)%1;draw()});
}
/* 6 running it: one operation overseeing eight formats */
function hub(el,w,h){if(narrow())return;
  const g=canvas(el,w,h),lis=[...el.parentNode.querySelectorAll('.ox-plan li')],cx=w/2,cy=h/2,A=lis.map(li=>rel(el,li)),RL=Math.hypot(A[0].cx-cx,A[0].cy-cy),R=RL*.7;
  cc(g,{cx,cy,r:R,'stroke-width':1.2,'stroke-dasharray':'2 7'});
  const sp=A.map(a=>{const d=Math.hypot(a.cx-cx,a.cy-cy),ux=(a.cx-cx)/d,uy=(a.cy-cy)/d;return{x1:cx+ux*22,y1:cy+uy*22,x2:cx+ux*(R-9),y2:cy+uy*(R-9),l:ln(g,{'stroke-width':1.4}),d:dot(g,{r:4}),n:dot(g,{r:5})}});
  const core=dot(g,{cx,cy,r:14});
  timed(el,6000,p=>{sp.forEach((s,i)=>{const t=ss(.05+i*.07,.2+i*.07,p),q=ss(.05+i*.07,.4+i*.07,p);s.l.setAttribute('x1',s.x1);s.l.setAttribute('y1',s.y1);s.l.setAttribute('x2',lerp(s.x1,s.x2,t));s.l.setAttribute('y2',lerp(s.y1,s.y2,t));
    s.d.setAttribute('cx',lerp(s.x1,s.x2,q));s.d.setAttribute('cy',lerp(s.y1,s.y2,q));s.d.setAttribute('opacity',(1-ss(.85,1,q))*ss(0,.1,q)*(q<1?1:0));s.n.setAttribute('cx',s.x2);s.n.setAttribute('cy',s.y2);s.n.setAttribute('r',5*t)});core.setAttribute('r',14*ss(0,.1,p))});
}
/* 7 moving it: an order travels the chain and comes back as a reorder */
function trv(el,w,h){if(narrow())return;
  const g=canvas(el,w,h),lis=[...el.parentNode.querySelectorAll('.ox-trv li')].map(li=>rel(el,li)),y=h*.66,xs=lis.map(l=>l.cx),r=h*.35,x0=xs[0],x1=xs[xs.length-1];
  const path=mk('path',{d:`M${x0} ${y} L${x1} ${y} C${x1+r*1.1} ${y} ${x1+r*1.1} ${y-r*1.6} ${x1} ${y-r*1.6} L${x0} ${y-r*1.6} C${x0-r*1.1} ${y-r*1.6} ${x0-r*1.1} ${y} ${x0} ${y}`,fill:'none',stroke:C,'stroke-width':1.2},g),L=path.getTotalLength();path.setAttribute('stroke-dasharray',L);
  const st=xs.map(x=>dot(g,{cx:x,cy:y,r:5})),o=cc(g,{r:9,'stroke-width':2.4,fill:'#000'}),oc=dot(g,{r:4});
  timed(el,7000,p=>{path.setAttribute('stroke-dashoffset',L*(1-ss(0,.25,p)));st.forEach((s,i)=>s.setAttribute('r',5*ss(.02+i*.02,.1+i*.02,p)));const q=ss(.15,.95,p)*1.0,pt=path.getPointAtLength(((q*1.0)%1)*L*.999);
    o.setAttribute('cx',pt.x);o.setAttribute('cy',pt.y);oc.setAttribute('cx',pt.x);oc.setAttribute('cy',pt.y);o.setAttribute('opacity',ss(.12,.2,p));oc.setAttribute('opacity',ss(.12,.2,p))});
}
/* 8 making it operational: an idea becomes something the team carries */
function bld(el,w,h){if(narrow())return;
  const g=canvas(el,w,h),li0=[...el.parentNode.querySelectorAll('.ox-bld li')];li0.forEach((li,i)=>{li.style.bottom='auto';li.style.top=(h*(.78-i*.095)+14+(i===6&&!narrow()?18:0))+'px'});
  const lis=li0.map(li=>rel(el,li)),P=lis.map((l,i)=>[l.l+4,h*(.78-i*.095)]);
  const path=mk('path',{d:'M'+P.map(q=>q.join(' ')).join(' L'),fill:'none',stroke:C,'stroke-width':1.2},g),L=path.getTotalLength();path.setAttribute('stroke-dasharray',L);
  const st=P.map(q=>dot(g,{cx:q[0],cy:q[1],r:5})),idea=cc(g,{'stroke-width':2.4,r:10,fill:'#fff'}),done=dot(g,{r:5}),halo=cc(g,{'stroke-width':1.4});
  timed(el,6000,p=>{const q=ss(.05,.8,p);path.setAttribute('stroke-dashoffset',L*(1-q));const pt=path.getPointAtLength(L*q*.999);st.forEach((s,i)=>s.setAttribute('r',5*ss(i/7*.75,i/7*.75+.08,p)));
    idea.setAttribute('cx',pt.x);idea.setAttribute('cy',pt.y);idea.setAttribute('opacity',1-ss(.8,.88,p));
    const e=P[P.length-1],f=ss(.82,.95,p);done.setAttribute('cx',e[0]);done.setAttribute('cy',e[1]);done.setAttribute('r',13*f);halo.setAttribute('cx',e[0]);halo.setAttribute('cy',e[1]);halo.setAttribute('r',13+16*f);halo.setAttribute('opacity',f*(1-ss(.95,1,p)*.0))});
}
window.LDT_OX={init:root=>{
  if(!root.__oxn){root.__oxn=1;const q=s=>[...root.querySelectorAll(s)];
    const wv=()=>root.querySelector('[data-draw=wave]'),ivE=()=>root.querySelector('[data-draw=iv]'),bm=()=>root.querySelector('[data-draw=beam]');
    q('.ox-p').forEach(b=>b.addEventListener('click',()=>{ST.p=+b.dataset.p;sync();const e=wv();if(e&&e.__set)e.__set()}));
    q('.ox-x').forEach(b=>b.addEventListener('click',()=>{ST.x=+b.dataset.x;sync();const e=ivE();if(e&&e.__redo){e.__redo()}}));
    const rg=document.getElementById('opRange');if(rg)rg.addEventListener('input',()=>{ST.v=+rg.value;const e=bm();if(e&&e.__draw)e.__draw()});
    var sync=()=>{q('.ox-p').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.p===ST.p));q('.ox-rs dl').forEach(d=>d.classList.toggle('off',+d.dataset.p!==ST.p));
      q('.ox-x').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.x===ST.x));const s=q('.ox-slip');if(s[0]){s[0].textContent=OP_X[ST.x][0];s[1].textContent=OP_X[ST.x][1]}};
    root.__oxsync=sync;
  }
  ST.p=0;ST.x=0;ST.v=50;const rg=document.getElementById('opRange');if(rg)rg.value=50;root.__oxsync();
  return init(root,{draw:{score,gap,wave,iv,beam,hub,trv,bld}});
}};
})();
