/* Revenue (visual rebuild 01.10.2026). Revenue has an origin and a quality: the word is built of its four sources, one total is three different businesses,
   one year drawn as sources that are earned, confirmed, expected or only hoped for, last year against this year, a signal and what it can justify,
   a win read for what it adds and for what happens without it. No amounts, no percentages: size and weight say more or less.
   Uses assets/js/l2.js. Reduced motion shows final states. */
(function(){
const {mk:smk,canvas,rng,clamp,lerp,seg,init,timed,ss}=window.LDT_L2,RM=matchMedia('(prefers-reduced-motion: reduce)');
const NS='http://www.w3.org/2000/svg',NARROW=matchMedia('(max-width:760px),(min-width:761px) and (max-width:1100px) and (orientation:portrait)');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const mk=(p,tag,a)=>{const e=document.createElementNS(NS,tag);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e};
const stage=(fig,W,H)=>{const s=$('svg',fig);s.setAttribute('viewBox',`0 0 ${W} ${H}`);s.innerHTML='';fig.style.setProperty('--ar',W/H);return s};
const put=(el,x,y,W,H)=>{el.style.left=(x/W*100)+'%';const f=el.closest('figure');el.style.top=NARROW.matches&&f?(y*f.clientWidth/W)+'px':(y/H*100)+'%'};
const hatch=(s,id,w,fg,bg)=>{const d=$('defs',s)||mk(s,'defs',{}),p=mk(d,'pattern',{id,width:9,height:9,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'});mk(p,'rect',{width:9,height:9,fill:bg});mk(p,'rect',{width:w,height:9,fill:fg})};
/* the capitals of a word set in the page face, so layers sit exactly inside them */
const capBox=fs=>{const c=document.createElement('canvas').getContext('2d');c.font='800 100px "Mona Sans"';if('letterSpacing' in c)c.letterSpacing='-4.5px';
  const m=c.measureText('REVENUE'),k=fs/100,base=(fs-(m.fontBoundingBoxAscent+m.fontBoundingBoxDescent)*k)/2+m.fontBoundingBoxAscent*k;
  return{w:m.width,cap:m.actualBoundingBoxAscent,top:base-m.actualBoundingBoxAscent*k,h:m.actualBoundingBoxAscent*k}};
const layers=(fs,L)=>{const b=capBox(fs),tot=L.reduce((a,l)=>a+l[1],0);let y=b.top;const st=[`transparent 0 ${y}px`],mid={};
  L.forEach(([id,v,col])=>{const h=v/tot*b.h;st.push(`${id!=null?col:'transparent'} ${y}px ${y+h}px`);if(id!=null)mid[id]=y+h/2;y+=h});
  st.push(`transparent ${y}px 100%`);return{g:`linear-gradient(180deg,${st.join(',')})`,mid}};
/* one year, four sources */
const YR=[[26,26,27,27,28,28,28,29,29,29,30,30],[18,20,22,20,21,23,22,21,22,20,21,24],[4,6,16,22,8,4,4,6,18,24,10,4],[2,5,1,3,6,2,8,9,5,11,7,12]];
const TD=700,cum=[Array(12).fill(0)];YR.forEach((v,j)=>cum.push(v.map((a,i)=>cum[j][i]+a)));const X=i=>50+100*i;
const year=(y0,k)=>{const Y=v=>y0-v*k;
  const curve=(vals,back)=>{const P=[[0,vals[0]],...vals.map((v,i)=>[X(i),v]),[1200,vals[11]]].map(([x,v])=>[x,Y(v)]);if(back)P.reverse();
    let d='';P.forEach((p,i)=>{if(!i){d+=`${p[0]} ${p[1]}`;return}const a=P[Math.max(0,i-2)],b=P[i-1],c=P[Math.min(P.length-1,i+1)];
      d+=` C ${[b[0]+(p[0]-a[0])/6,b[1]+(p[1]-a[1])/6]} ${[p[0]-(c[0]-b[0])/6,p[1]-(c[1]-b[1])/6]} ${p}`});return d};
  return{Y,band:j=>`M ${curve(cum[j+1])} L ${curve(cum[j],1)} Z`,mid:(j,i)=>Y((cum[j][i]+cum[j+1][i])/2)}};
/* each source ahead of today: agreed (hatched), likely (outline), likely (outline), hoped for (dotted) */
function drawBands(s,g,id,on,W,H,inv){
  const fg=inv?'#fff':'#000',bg=inv?'#000':'#fff';hatch(s,id+'H',2,fg,bg);const d=$('defs',s);
  const cp=mk(d,'clipPath',{id:id+'R'}),rect=mk(cp,'rect',{x:0,y:0,width:1200,height:H});
  const root=mk(s,'g',{'clip-path':`url(#${id}R)`});
  [[id+'P',0,TD],[id+'N',TD,1200]].forEach(([c,a,b])=>{const q=mk(d,'clipPath',{id:c});mk(q,'rect',{x:a,y:0,width:b-a,height:H})});
  const past=mk(root,'g',{'clip-path':`url(#${id}P)`}),next=mk(root,'g',{'clip-path':`url(#${id}N)`});
  const FUT=[{fill:`url(#${id}H)`,stroke:fg,'stroke-width':1.6},{fill:bg,stroke:fg,'stroke-width':2.2},{fill:bg,stroke:fg,'stroke-width':2.2},{fill:bg,stroke:fg,'stroke-width':2,'stroke-dasharray':'2 6','stroke-linecap':'round'}];
  [0,1,2,3].forEach(j=>{const hp=on.past.includes(j),hf=on.next.includes(j);
    mk(past,'path',{d:g.band(j),fill:hp?fg:bg,stroke:hp?bg:fg,'stroke-width':hp?4.5:1.2,'stroke-linejoin':'round'});
    mk(next,'path',hf?{d:g.band(j),...FUT[j],'stroke-linejoin':'round'}:{d:g.band(j),fill:bg,stroke:fg,'stroke-width':1,'stroke-dasharray':'1 5','stroke-linejoin':'round'})});
  const tl=mk(root,'line',{x1:TD,y1:g.Y(cum[4].reduce((a,b)=>Math.max(a,b)))-30,x2:TD,y2:g.Y(0),stroke:fg,'stroke-width':2});
  mk(root,'line',{x1:0,y1:g.Y(0)+1,x2:1200,y2:g.Y(0)+1,stroke:fg,'stroke-width':1.5});
  return p=>rect.setAttribute('width',1200*p+2);
}
/* once per element: run a 0..1 reveal when its frame comes in; a redraw re-applies the current state */
function reveal(el,dur,apply){el.__ap=apply;if(!el.__rv){el.__rv=1;timed(el,dur,p=>el.__ap&&el.__ap(p))}else el.__ap(el.__p==null?1:el.__p)}

function build(root){
  const hw=$('.rvx-word',root),wd=$('.rvx-wd',root),parts=$$('.rvx-parts li',root);
  const drawWord=()=>{const cw=hw.clientWidth;if(!cw)return;const b=capBox(100),n=NARROW.matches,fs=n?cw*.99*100/b.w:Math.min(cw*.76*100/b.w,innerHeight*.3*100/b.cap);wd.style.setProperty('--wf',fs+'px');
    const r=layers(fs,[['3',12,'#000'],[null,4],['2',19,'#000'],[null,4],['1',25,'#000'],[null,4],['0',36,'#000']]);wd.style.setProperty('--bands',r.g);
    if(n){parts.forEach(li=>{li.style.top=''});hw.style.height='';return}
    parts.forEach(li=>{li.style.top=r.mid[li.dataset.k]+'px'});hw.style.setProperty('--px',(b.w*fs/100+Math.max(14,fs*.08))+'px');hw.style.height=fs+'px'};
  /* the same total three ways: equal circle area, one carrying most, many, three */
  const OT={ot1:(g,w,h)=>{const A=Math.min(w,h)*Math.min(w,h)*.5,r=Math.sqrt(A*.74/Math.PI),cx=w*.42,cy=h*.46,c=[];c.push([cx,cy,r]);const sm=[[.84,.2],[.92,.62],[.76,.8],[.14,.8],[.1,.2],[.64,.9]],rs=Math.sqrt(A*.26/6/Math.PI);sm.forEach(([a,b])=>c.push([w*a,h*b,rs]));return c},
    ot2:(g,w,h)=>{const N=20,A=Math.min(w,h)*Math.min(w,h)*.5,rs=Math.sqrt(A/N/Math.PI),c=[];const cols=5,rows=4;for(let i=0;i<N;i++)c.push([w*(.12+.76*(i%cols)/(cols-1)),h*(.16+.68*Math.floor(i/cols)/(rows-1)),rs]);return c},
    ot3:(g,w,h)=>{const A=Math.min(w,h)*Math.min(w,h)*.5,r=Math.sqrt(A/3/Math.PI),c=[[w*.2,h*.3,r],[w*.62,h*.68,r],[w*.84,h*.26,r]];return c}};
  const draws={};['ot1','ot2','ot3'].forEach((k,idx)=>{draws[k]=(el,w,h)=>{const g=canvas(el,w,h),cs=OT[k](g,w,h),els=cs.map(([x,y,r])=>mk(g,'circle',{cx:x,cy:y,r:0,fill:'#fff'}));
    mk(g,'line',{x1:0,x2:w,y1:h-1,y2:h-1,stroke:'#fff','stroke-width':1.4});
    timed(el,2600,p=>els.forEach((e,i)=>e.setAttribute('r',cs[i][2]*ss(i*.03+idx*.05,i*.03+.35+idx*.05,p))))}});
  /* signal and what it can justify */
  draws.fan=(el,w,h)=>{const g=canvas(el,w,h),f=el.parentNode,sg=$('.rvx-sgw',f).getBoundingClientRect(),b=el.getBoundingClientRect(),lis=$$('.rvx-opt li',f).map(l=>l.getBoundingClientRect());
    if(NARROW.matches){el.textContent='';return}
    const q=document.createRange();q.selectNodeContents($('b',$('.rvx-sgw',f)));const tr=q.getBoundingClientRect(),nx=tr.right-b.left+18,ny=tr.top+tr.height/2-b.top;
    const paths=lis.map(l=>{const ty=l.top+22-b.top,tx=l.left-b.left-14;return mk(g,'path',{d:`M${nx} ${ny} C ${nx+(tx-nx)*.55} ${ny}, ${nx+(tx-nx)*.45} ${ty}, ${tx} ${ty}`,fill:'none',stroke:'#000','stroke-width':1.6})});
    const ends=lis.map(l=>mk(g,'circle',{cx:l.left-b.left-14,cy:l.top+22-b.top,r:4,fill:'#000'})),node=mk(g,'circle',{cx:nx,cy:ny,r:8,fill:'#000'}),sl={setAttribute(){}};
    const L=paths.map(p=>p.getTotalLength());paths.forEach((p,i)=>p.setAttribute('stroke-dasharray',L[i]));
    timed(el,3200,p=>{node.setAttribute('r',8*ss(0,.1,p));sl.setAttribute('opacity',ss(0,.1,p));paths.forEach((q,i)=>{q.setAttribute('stroke-dashoffset',L[i]*(1-ss(.1+i*.07,.5+i*.07,p)));ends[i].setAttribute('r',4*ss(.45+i*.07,.55+i*.07,p))})})};
  /* this season's result becomes next season's range: some styles intensified, some reduced */
  draws.sea=(el,w,h)=>{const g=canvas(el,w,h),N=9,W0=[4,11,6,4,12,6,4,11,6],W1=[15,3,6,14,3,6,16,2.5,6],cp=mk(mk(g,'defs',{}),'clipPath',{id:'rvSeaC'}),rc=mk(cp,'rect',{x:0,y:0,width:0,height:h});
    const gg=mk(g,'g',{'clip-path':'url(#rvSeaC)'});
    for(let i=0;i<N;i++){const y0=h*(.1+.8*i/(N-1)),y1=h*(.1+.8*[0,3,6,1,4,7,2,5,8][i]/(N-1)),pts=[],pts2=[];
      for(let t=0;t<=1.0001;t+=.05){const e=t*t*(3-2*t),y=lerp(y0,y1,e),th=lerp(W0[i],W1[i],t)/2;pts.push([t*w,y-th]);pts2.push([t*w,y+th])}
      mk(gg,'polygon',{points:pts.concat(pts2.reverse()).map(q=>q.map(v=>v.toFixed(1)).join(',')).join(' '),fill:'#fff'})}
    timed(el,3600,p=>rc.setAttribute('width',w*ss(0,.85,p)+2))};
  /* the slope: last year to this year, level for the sources that held, crossing for the two that moved */
  const sl=$('.rvx-slp',root);
  const drawSlope=()=>{const W=sl.clientWidth,H=sl.clientHeight;if(!W||!H)return;const s=$('svg',sl);s.setAttribute('viewBox',`0 0 ${W} ${H}`);s.innerHTML='';$$('p',sl).forEach(e=>e.remove());
    const T=(c,x,y,h)=>{const e=document.createElement('p');e.className=c;e.setAttribute('aria-hidden','true');e.style.left=x+'px';e.style.top=y+'px';e.innerHTML=h;sl.appendChild(e)};
    const tw=['sg','sm'].map(c=>{const e=document.createElement('p');e.className=c;e.textContent=c==='sg'?'Seasonal sales':'Repeat business';e.style.visibility='hidden';sl.appendChild(e);const w=e.offsetWidth;e.remove();return w});
    const n=NARROW.matches,L=n?' up':' sl',Rr=n?' up r':'';
    const lx=n?7:Math.max(Math.max(...tw)+13,W*.2),rx=n?W-7:W-Math.max(158,W*.26),y0=n?116:80,y1=H-(n?34:18),row=i=>y0+(y1-y0)*i/5,ox=n?-7:-13,rox=n?7:15;
    T('sy',n?0:lx,0,'Last year');T('sy'+(n?' r':''),n?W:rx,0,'This year');
    const tot=mk(s,'line',{x1:lx,x2:rx,y1:37,y2:37,stroke:'#fff','stroke-width':1,'stroke-dasharray':'2 6'});T('stt',(lx+rx)/2,37,'<b>Total</b><i>nearly unchanged</i>');
    [lx,rx].forEach(x=>mk(s,'line',{x1:x,x2:x,y1:22,y2:H,stroke:'#fff','stroke-width':1}));
    const held=[[0,'Major account'],[5,'Seasonal sales']].map(([r,nm])=>{const l=mk(s,'line',{x1:lx,x2:rx,y1:row(r),y2:row(r),stroke:'#fff','stroke-width':1.6,'stroke-dasharray':'4 6'});
      [lx,rx].forEach(x=>mk(s,'circle',{cx:x,cy:row(r),r:3.5,fill:'#fff'}));T('sg'+(n&&r?' dn':L),lx+ox,row(r),nm);T('sg'+(n?(r?' dn r':Rr):Rr),rx+rox,row(r),nm);return l});
    const mv=[[1,3.4,'Repeat business','Less'],[4,1.6,'New business','Far more']].map(([a,b,nm,t])=>{
      const l=mk(s,'line',{x1:lx,x2:rx,y1:row(a),y2:row(b),stroke:'#fff','stroke-width':4.5,'stroke-linecap':'round'});
      const c1=mk(s,'circle',{cx:lx,cy:row(a),r:6,fill:'#fff'}),c2=mk(s,'circle',{cx:rx,cy:row(b),r:7,fill:'#fff'});
      T('sm'+(n?(b>a?' up':' dn'):L),lx+ox,row(a),nm);T('se'+(n?(a>b?' up r':' dn r'):''),rx+rox,row(b),nm+'<small>'+t+'</small>');return{l,c1,c2,a,b}});
    reveal(sl,3200,p=>{const t=ss(0,.35,p),m=ss(.3,.9,p);held.forEach(l=>l.setAttribute('opacity',t));mv.forEach(({l,c1,c2,a,b})=>{const yb=lerp(row(a),row(b),m);l.setAttribute('y2',yb);c2.setAttribute('cy',yb);c2.setAttribute('r',7*ss(.25,.4,p));c1.setAttribute('r',6*ss(0,.2,p))});$$('.se',sl).forEach(e=>e.style.opacity=ss(.7,.95,p))})};
  /* tabs */
  const hts=$$('.rvx-tabs [role="tab"]',root),hps=$$('.rvx-hyq',root);
  const pickH=(i,f)=>{hts.forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1});hps.forEach((p,j)=>{p.hidden=i!==j});if(f)hts[i].focus()};
  if(!root.__rvt){root.__rvt=1;hts.forEach((b,i)=>{b.addEventListener('click',()=>pickH(i));b.addEventListener('keydown',e=>{const n=hts.length,k=e.key;
    const j=k==='ArrowRight'?(i+1)%n:k==='ArrowLeft'?(i+n-1)%n:k==='Home'?0:k==='End'?n-1:-1;if(j<0)return;e.preventDefault();pickH(j,true)})})}
  /* the year: drawn once large (earned, confirmed, expected, potential), and again as three readings */
  const yf=$('.rvx-yf',root);
  const drawYear=()=>{const n=NARROW.matches,W=n?1200:1600,H=n?780:500,y0=H-8,k=n?7.6:4.3,s=stage(yf,W,H),g=year(y0,k);
    const ap=drawBands(s,g,'rvY',{past:[0,1,2,3],next:[0,1,2,3]},W,H,false);
    const lb=$$('.rvx-lb',yf);lb.forEach(e=>e.className='rvx-lb');
    put(lb[0],18,g.mid(0,0),W,H);put(lb[1],18,g.mid(1,0),W,H);lb[2].classList.add('c');put(lb[2],X(3)-10,g.mid(2,3)+(n?8:0),W,H);
    lb[3].classList.add('o');if(n){lb[3].classList.add('l');put(lb[3],TD-12*W/(yf.clientWidth||W),g.Y(Math.max(...cum[4].slice(0,7)))-12,W,H)}else put(lb[3],X(4)+32,g.Y(cum[4][6])-16,W,H);
    const top=g.Y(Math.max(...cum[4].slice(0,7)))-20,up=n?26*W/(yf.clientWidth||W):0;
    put($('.rvx-st[data-k="in"]',yf),TD,top-up,W,H);put($('.rvx-today',yf),TD,top-up,W,H);const fx=(TD+1200)/2;
    put($('.rvx-st[data-k="0"]',yf),fx,g.mid(0,9),W,H);put($('.rvx-st[data-k="1"]',yf),fx,g.mid(1,9),W,H);
    if(n)put($('.rvx-st[data-k="3"]',yf),1192,g.mid(3,11),W,H);else put($('.rvx-st[data-k="3"]',yf),X(10)+6,g.Y(cum[4][10])-14,W,H);
    const mo=$('.rvx-mo',yf);mo.style.width=(1200/W*100)+'%';mo.style.top=n?'':(y0/H*100)+'%';
    let ny=0;if(!n){ny=g.mid(0,11);mk(s,'line',{x1:1206,y1:ny,x2:1234,y2:ny,stroke:'#000','stroke-width':2});put($('.rvx-note',yf),1246,ny,W,H);put($('.rvx-fq',yf),1246,g.mid(1,11)-16,W,H)}
    reveal(yf,3600,p=>{ap(ss(0,.8,p));$$('.rvx-lb,.rvx-mo',yf).forEach(e=>e.style.opacity=ss(0,.3,p));$$('.rvx-st,.rvx-note,.rvx-fq',yf).forEach(e=>e.style.opacity=ss(.7,.95,p))})};
  const READ=[{past:[0,1,2,3],next:[0]},{past:[3],next:[3]},{past:[0,3],next:[0,3]}];
  const drawRe=()=>$$('.rvx-rq',root).forEach(f=>{const q=+f.dataset.q,W=1200,H=560,s=stage(f,W,H),ap=drawBands(s,year(H-8,6),'rvR'+q,READ[q],W,H,true);reveal(f,2800,p=>ap(ss(0,.85,p)))});
  /* the stack: this year's sources rest on one word; last year sits below the top, the top without it below last year */
  const dp=$('.rvx-dep',root),sg=$('.rvx-stage',dp),st=$('.rvx-stack',dp),base=$('.rvx-base',dp),tb=$$('.rvx-t',dp),vs=$$('.rvx-vs',dp),gauge=$('.rvx-gauge',dp),tk={};$$('.rvx-tk',dp).forEach(e=>{tk[e.dataset.k]=e});
  let nh=0,full=0;
  const layoutDep=()=>{if(root.hidden||!sg.clientWidth)return;const off=dp.dataset.v==='1';if(!off){nh=base.offsetHeight;full=st.offsetHeight;gauge.style.minHeight=full+'px'}
    const rest=full-nh,GAP=18,lyB=rest+Math.max(nh*.42,GAP),topB=Math.max(full,lyB+GAP);/* the three scale labels keep at least one line of room between them on short screens */tk.top.style.bottom=topB+'px';tk.ly.style.bottom=lyB+'px';tk.wo.style.bottom=rest+'px';tk.top.style.opacity=off?0:1;if(!off)gauge.style.minHeight=Math.max(full,topB)+'px'};
  const showDep=k=>{dp.dataset.v=k;tb.forEach(b=>b.setAttribute('aria-pressed',String(k==='1')));vs.forEach(p=>{p.hidden=p.dataset.v!==k});layoutDep()};
  if(!root.__rvd){root.__rvd=1;tb.forEach(b=>b.addEventListener('click',()=>showDep(dp.dataset.v==='1'?'0':'1')));if('ResizeObserver' in window)new ResizeObserver(()=>layoutDep()).observe(st)}
  draws.all=()=>{drawWord();drawSlope();drawYear();drawRe();layoutDep()};
  return{draws,reset:()=>{showDep('0');pickH(0)},layoutDep};
}
window.LDT_RV={init:root=>{
  const b=build(root);b.reset();
  const base=init(root,{draw:b.draws});document.fonts&&document.fonts.ready.then(()=>b.draws.all());
  return()=>{b.reset();base();setTimeout(()=>b.draws.all(),80)};
}};
})();
