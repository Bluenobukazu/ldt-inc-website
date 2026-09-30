/* LDT INC | the experience on / (from prototype V5) */
(()=>{
const {RM,MOB,$,$$,go}=LDT;
gsap.registerPlugin(ScrollTrigger);
/* the landing monolith (monolith.js) reports here once three.js is ready; heroS.s is its scroll state, 0 to 1 */
const monoReady=new Promise(res=>{LDT.monoReady=res});
LDT.heroS={s:0};
/* the monolith's line is complete at s .85 (prototype); from there the cut takes over, without a still phase */
LDT.heroEnd=.86;
if('scrollRestoration' in history)history.scrollRestoration='manual';
if(RM)document.documentElement.classList.add('rm');

/* ---------- content: Master Handover and Lena's decisions ---------- */
const CH=['Arrive','Complexity','Connect','System','Proof','Transformation','Ways to Work','Contact'];
const HASH=['arrive','complexity','connect','system','proof','transformation','ways','contact'];
/* Operating dimensions: how Lena organises a business. k = primary message, ap = Approach line, detail = Master Handover wording */
const DIMS=[
 {n:'Proposition',slug:'proposition',k:'An offer is only as strong as the business built to keep it.',
  ap:'What the business can actually sell, deliver and sustain, and whether offer, organisation and economics line up.',s:['Offer','Organisation','Economics']},
 {n:'Expansion',slug:'expansion',k:'How a business enters and grows in new markets: expansion structured around real market conditions, adapted positioning and partner structures that can actually be operated.',
  ap:'Expansion routes and partner structures shaped around real market conditions, growth logic and local relevance.',
  fig:['37','Markets'],list:['Europe','Middle East','Asia'],detail:'International market positioning, expansion and partnership development.',s:['Europe','Middle East','Asia']},
 {n:'Operations',slug:'operations',k:'The operating structure that connects strategy to execution, so positioning, experience, production, delivery and market execution work as one.',
  ap:'Operating structures that align teams, delivery, execution and decision-making.',
  fig:['10 to 25%','Cost reduction'],list:['Operating models','Structural clarity','Execution'],detail:'Resolution of structural inefficiencies impacting performance, execution and scalable growth.',s:['Operating models','Structural clarity','Execution']},
 {n:'Commercial Architecture',slug:'commercial-architecture',k:'The commercial system behind growth: pricing, margin logic, partnerships and revenue architecture built into one structure that works.',
  ap:'Pricing, margin logic and revenue structures that make the business commercially viable and scalable.',
  fig:['+5 to 15 pts','Margin improvement'],list:['Pricing strategy and price architecture','Pricing and margin logic','Cost structure','Licensing and partnerships','Revenue architecture'],detail:'Design of licensing, partnership and collaboration structures as integrated revenue drivers.',s:['Pricing','Margin logic','Partnerships','Revenue architecture']}
];
/* Areas of the One Operating System (canonical taxonomy, Lena 27.09.2026). d = the dimensions an area belongs to (0 Proposition, 1 Expansion, 2 Operations, 3 Commercial Architecture);
   two dimensions = a connecting area. The first eight keep their order, because the Complexity chapter places one block per area in this order. Areas without content yet are shells (no k) */
const REAL=[
 {n:'Markets',slug:'markets',d:[1],k:'The real market environment a business operates in. Lena reads market conditions, adapts positioning and builds the partner and execution structures to act on them.',
  fig:['37','Markets'],list:['Europe','Middle East','Asia'],detail:'International expansion and market positioning across Europe, Middle East and Asia.',rel:'Markets is the environment. Expansion is how Lena works with it.'},
 {n:'Advantage',slug:'advantage',d:[0],rel:'Advantage belongs to Proposition.'},
 {n:'Technology',slug:'technology',d:[2],k:'Technology and AI give the business operating leverage: faster research, better decisions, cleaner workflows and quality control, with people making the calls.',
  groups:[['Better decisions',['Research','Analysis','Human decision gates']],['Stronger knowledge',['Knowledge management','Single source of truth governance']],['Cleaner execution',['Workflow design','QA','Automation','Multi-system orchestration']]],
  detail:'A practical operating and decision-support layer within strategic operations, operating models and transformation. Not a separate specialism.',rel:'Technology works through Operations.'},
 {n:'Delivery',slug:'delivery',d:[2,3],k:'Getting from plan to delivery: production, distribution and supply chain aligned with commercial objectives and growth.',
  list:['Production','Delivery','Distribution','Supply chain','Execution'],detail:'Operations designs the structure. Production is where it has to deliver.',rel:'Delivery connects Operations to Commercial Architecture.'},
 {n:'Positioning',slug:'positioning',d:[0,1],k:'Where a business stands in its market and why it is chosen. Lena sharpens positioning and differentiation so proposition and expansion pull in the same direction.',
  list:['Positioning','Differentiation','Market positioning'],rel:'Positioning connects Proposition to Expansion.'},
 {n:'Customers',slug:'customers',d:[3],k:'The customers a business needs to win and keep. Lena connects positioning, experience, pricing and conversion to the people the business serves.',
  list:['Conversion','Pricing','Experience','Partnerships','Collaborations'],rel:'Customers belong to Commercial Architecture.'},
 {n:'Revenue',slug:'revenue',d:[3],k:'The commercial reality every decision has to hold up against: pricing, margins and revenue models.',
  fig:['€1M to €15M+','Budget environments'],list:['Pricing','Margins','Cost structure','Revenue models','Revenue streams'],rel:'Revenue belongs to Commercial Architecture.'},
 {n:'People',slug:'people',d:[2],k:'Organisations only change when people can carry the change. Lena structures teams, clarifies responsibilities and strengthens leadership so execution and transformation hold.',
  fig:['10 to 80+','Teams'],list:['Team structure','Responsibilities','Leadership','Execution','Transformation'],rel:'People belong to Operations.'},
 {n:'Decisions',slug:'decisions',d:[2],rel:'Decisions belong to Operations.'},
 {n:'Partnerships',slug:'partnerships',d:[3],rel:'Partnerships belong to Commercial Architecture.'}
];
const RI=n=>REAL.findIndex(r=>r.n===n);
/* the system in reading order, as the Connected System navigation shows it: each dimension with its areas, the connecting areas between */
const SYS=[{d:0,a:['Advantage']},{c:'Positioning'},{d:1,a:['Markets']},{d:2,a:['People','Technology','Decisions']},{c:'Delivery'},{d:3,a:['Revenue','Customers','Partnerships']}];
const ORDER=SYS.flatMap(g=>g.c?[g.c]:g.a);
/* addresses (Lena, 28.09.2026): numbers belong to the website (chapters 01 to 08, layers 04.1 ...), letters to the operating system.
   A to D are the dimensions, A.1 or C.2 their areas in reading order, A + B and C + D the two connecting areas. A later layer continues as B.1.1 */
const DL='ABCD';
const ADDR=(type,i)=>{if(type!=='real')return DL[i];const o=REAL[i];if(o.d.length>1)return o.d.map(k=>DL[k]).join(' + ');const k=o.d[0];return DL[k]+'.'+(SYS.find(x=>x.d===k).a.indexOf(o.n)+1)};
/* earlier names still lead to the right area */
const ALIAS={brand:'proposition','market-expansion':'expansion',culture:'advantage',production:'delivery',commercial:'revenue',clients:'customers'};
/* organisations as evidence markers, grouped by operating context */
const OG=[['hospitality / destinations',['Schloss Elmau','Orania Berlin']],['large-scale cultural operations',['MaHalla']],['media / music / culture',['Viacom / MTV','Purple Fashion Magazine']],['retail / commercial',['American Apparel']],['luxury / fashion / brand',['Rick Owens','Chloé','Nina Ricci / Puig Group','Reebok']]];
const FIGS=[['Years','20+'],['Markets','37'],['Budget environments','€1M to €15M+'],['Teams','10 to 80+']];
const PLATES=['Concept','Positioning','Experience','Operations','Production','Market','Commercial Application'];
const CTX=['brand / fashion','media / culture','hospitality / destinations','retail / commercial','international markets','independent businesses','large-scale cultural environments','emerging ventures'];
const STATES=[
 ['Early-stage concept','A strong idea exists, but the operating model, commercial logic and route to market still need to be built.',[[10,34,22,40]]],
 ['Established organisation','The business is running, but brand, operations, commercial priorities and decision structures are no longer working together cleanly.',[[6,20,8,64],[20,20,8,64],[34,20,8,64],[48,20,8,64]]],
 ['Fragmented growth','Growth has created complexity across markets, teams, partners or revenue structures and the organisation needs a system that can hold it together.',[[4,22,16,24],[26,56,10,18],[42,16,18,26],[62,46,12,22],[30,34,7,10]]]];
const CORE='Turning complex creative and commercial environments into',CORE_IT='structured, scalable systems.';
const SYS_LINE='I connect proposition, expansion, operations and commercial architecture so the business can operate as one system.';
const JT={1:['02','Complexity','',''],2:['03','Connect','',''],3:['04','System','One operating',SYS_LINE]};
/* System (Lena, 27.09.2026): "One operating" in the serif stands above the title, so the heading reads One operating System without repeating the word */

/* ---------- geometry: desktop canvas 1440x900, mobile canvas 430x860 ---------- */
/* blocks (Complexity): the first eight areas, Markets, Advantage, Technology, Delivery, Positioning, Customers, Revenue, People, as [x,y,w,h,rotation] */
const GD={W:1440,H:900,m:48,
 caps:[48,27],rule:[48,112],wmW:1300,wmB:330,desc:{right:92,top:618,fs:38},hint:{right:48,bottom:32},core:[48,300,820,58],barAfter:[1010,118],
 jt:[48,122],jtS:60,serifW:1370,serifB:70,
 blocks:[[520,140,290,185,-2],[260,300,200,150,2.5],[890,170,220,120,3],[660,390,250,120,-1.5],[920,340,230,120,1.5],[690,555,180,110,3],[360,500,270,150,-2],[930,520,190,120,-2.5]],
 connect:[270,372,900,44],
 C0:[[640,290],[1060,290],[640,660],[1060,660]],r0:150,
 C1:[[804,286],[1054,286],[804,660],[1054,660]],r1:176,
 divider:[520,92]
};
const GM={W:430,H:860,m:22,
 caps:[22,21],rule:[22,96],wmW:386,wmB:330,desc:{left:22,top:586,fs:24},hint:{right:22,bottom:26},core:[22,250,340,30],barAfter:[372,36],
 jt:[22,100],jtS:40,serifW:386,serifB:112,
 blocks:[[150,200,200,130,-2],[22,250,120,100,2.5],[252,350,150,80,3],[40,380,170,84,-1.5],[230,450,170,80,1.5],[222,550,142,74,3],[22,490,180,100,-2],[60,612,130,72,-2.5]],
 connect:[22,300,386,27],
 C0:[[118,520],[312,520],[118,730],[312,730]],r0:84,
 C1:[[136,462],[294,462],[136,692],[294,692]],r1:110,
 divider:[-10,0]
};
const G=()=>MOB()?GM:GD;
/* reading holds (Lena, scroll QA 26.09.2026): the proposition and the Connect sentence stand a little longer, the finished System a little shorter.
   at() maps the original V5 timeline positions onto the adjusted timeline */
const HOLDS=[[.19,.05],[.51,.05]],SYS_HOLD=.07;
const at=x=>HOLDS.reduce((v,[t,a])=>x>=t?v+a:v,x);
const SEG=[at(.2),at(.42),at(.62),1];
/* reduced motion: the finished state of each chapter on the journey timeline */
const STILL=[0,at(.4),at(.505),9];
let S=1;
function fitCanvas(cv,W,H){cv.style.width=W+'px';cv.style.height=H+'px';S=Math.min(innerWidth/W,innerHeight/H);gsap.set(cv,{xPercent:-50,yPercent:-50,scale:S})}
const P=(el,x,y,w,h)=>gsap.set(el,Object.assign({left:x,top:y},w!=null?{width:w}:{},h!=null?{height:h}:{}));

/* ---------- chapter rail: quiet on the landing, present once the visitor moves ---------- */
if(!RM){const jt=$('#journey .j-title');jt.setAttribute('aria-hidden','true');jt.insertAdjacentHTML('beforebegin',[1,2,3].map(i=>`<h2 class="sr">${JT[i][2]?JT[i][2]+' ':''}${JT[i][1]}</h2>`).join('')+`<p class="sr">${SYS_LINE}</p>`)}
CH.forEach((c,i)=>{const b=document.createElement('button');b.type='button';b.dataset.go=i;b.dataset.act='';b.innerHTML=`<span>0${i+1} ${c}</span><i></i>`;$('#rail').appendChild(b)});
/* header safe band: a pinned scene gets the band of its end state only once it scrolls away; while it stands, nothing covers it */
const bandAfter=(el,c)=>self=>{if(self.progress>=1)el.dataset.band=c;else delete el.dataset.band;LDT.syncBand()};
const hero=on=>{document.body.classList.toggle('hero',on);
  /* reduced motion: identity and LDT INC swap without movement; otherwise monolith.js crossfades them with the scroll */
  if(RM){const w=$('#hdr .who'),b=$('#hdr .brand');if(w&&b){w.style.visibility=on?'':'hidden';w.style.opacity=on?1:0;b.style.visibility=on?'hidden':'visible';b.style.opacity=on?0:1}}};
let active=-1;
/* desktop only: the rail steps back after a few seconds without movement, scrolling or keys, and returns on any of them (Lena, 27.09.2026). It stays clickable and focusable throughout */
(()=>{if(!matchMedia('(hover:hover) and (min-width:761px)').matches)return;
  const rail=$('#rail'),B=document.body;let t=0,inside=false;
  const wake=()=>{B.classList.remove('rail-idle');clearTimeout(t);if(!inside&&!rail.contains(document.activeElement))t=setTimeout(()=>B.classList.add('rail-idle'),2600)};
  ['mousemove','wheel','scroll','keydown','pointerdown'].forEach(e=>addEventListener(e,wake,{passive:true}));
  rail.addEventListener('mouseenter',()=>{inside=true;wake()});rail.addEventListener('mouseleave',()=>{inside=false;wake()});
  rail.addEventListener('focusin',wake);rail.addEventListener('focusout',()=>setTimeout(wake,0));
  wake()})();
function setActive(i){if(i===active)return;active=i;LDT.chapterNow=i;$$('#rail button').forEach((b,j)=>{b.classList.toggle('on',j===i);if(j===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});$('#railM').innerHTML=`<span class="pill">0${i+1}</span><span class="dcur">${CH[i]}</span>`;document.body.classList.toggle('at-end',i===7)}
function railRect(i){const b=$$('#rail button')[i];return b&&b.offsetParent?b.querySelector('span').getBoundingClientRect():null}
function emerge(el,i,scale=1){
  if(RM){gsap.set(el,{opacity:1,x:0,y:0,scale:1});return}
  const src=railRect(i);gsap.set(el,{x:0,y:0,scale:1});const tr=el.getBoundingClientRect();
  if(!src||MOB()){gsap.fromTo(el,{opacity:0,y:30/scale},{opacity:1,y:0,duration:.9,ease:'expo.out'});return}
  const sc=Math.max(.05,src.height/tr.height*1.15);
  gsap.fromTo(el,{x:(src.left-tr.left)/scale,y:(src.top-tr.top)/scale,scale:sc,opacity:0,transformOrigin:'0 0'},{x:0,y:0,scale:1,opacity:1,duration:1.05,ease:'expo.inOut'});
}
function retreat(el,i,scale,cb){
  const src=railRect(i);if(RM||!src||MOB()){gsap.to(el,{opacity:0,duration:.25,onComplete:cb});return}
  const tr=el.getBoundingClientRect();const sc=src.height/tr.height*1.15;
  gsap.to(el,{x:(src.left-tr.left)/scale,y:(src.top-tr.top)/scale,scale:sc,opacity:0,transformOrigin:'0 0',duration:.55,ease:'expo.in',onComplete:cb});
}

/* ---------- journey (chapters 01 to 04), one instance per stage ---------- */
const tpl=$('#journey .jstage');
const stages=RM?[tpl,...[1,2,3].map(()=>{const c=tpl.cloneNode(true);const m=c.querySelector('.mono');if(m)m.remove();$('#journey').appendChild(c);return c})]:[tpl];
stages.forEach((st,i)=>{st.id=RM?HASH[i]:'jStage'});
if(RM)stages.slice(1).forEach(st=>{const h=st.querySelector('h1');if(!h)return;const x=document.createElement('p');x.className=h.className;x.innerHTML=h.innerHTML;x.setAttribute('aria-hidden','true');h.replaceWith(x)});

function Journey(st,inst){
  const q=s=>st.querySelector(s),cv=q('.cv');
  const core=q('.j-core');
  core.innerHTML=`<span class="sr">${CORE} ${CORE_IT}</span>`+CORE.split(' ').map(w=>`<span aria-hidden="true">${w}</span>`).join('')+'<br>'+CORE_IT.split(' ').map(w=>`<span class="it" aria-hidden="true">${w}</span>`).join('');
  const words=$$('span:not(.sr)',core);
  /* the realities of the complexity field: not links, they react to the cursor and settle */
  const blocks=REAL.slice(0,8).map((r,i)=>{const b=document.createElement('div');b.className='blk';b.setAttribute('aria-hidden','true');q('.j-blocks').appendChild(b);const l=document.createElement('div');l.className='blab';l.textContent=r.n;q('.j-blocks').appendChild(l);return{b,l}});
  const sys=q('.j-sys'),id=k=>`${k}${inst}`;
  sys.innerHTML=`<defs>${[0,1,2,3].map(i=>`<clipPath id="${id('cl'+i)}"><circle class="clc${i}" cx="0" cy="0" r="1"/></clipPath>`).join('')}</defs>`+
   [0,1,2,3].map(i=>`<circle class="fillc f${i}" cx="0" cy="0" r="1"/>`).join('')+
   `<circle class="lens lensA" clip-path="url(#${id('cl1')})" cx="0" cy="0" r="1"/><circle class="lens lensB" clip-path="url(#${id('cl3')})" cx="0" cy="0" r="1"/>`+
   [0,1,2,3].map(i=>`<circle class="ring c${i}" cx="0" cy="0" r="1" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`).join('')+
   '<g class="cross" opacity="0"></g>';
  const sl=q('.j-labels');
  const mk=(tag,cls,html,attrs)=>{const e=document.createElement(tag);e.className=cls;e.innerHTML=html;Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(tag==='button')e.type='button';sl.appendChild(e);return e};
  const dimEls=DIMS.map((d,i)=>mk('button','dimn',`<span class="dn">${d.n}</span>`,{'data-dim':i,'data-act':'','aria-haspopup':'dialog'}));
  const tickEls={};['Advantage','Markets','People','Technology','Decisions','Revenue','Customers','Partnerships'].forEach(n=>{tickEls[n]=mk('button','tick',`<i></i><span>${n}</span>`,{'data-real':RI(n),'data-act':'','aria-haspopup':'dialog'})});
  const vA=mk('button','vlab','Positioning',{'data-real':RI('Positioning'),'data-act':'','aria-haspopup':'dialog'});
  /* orientation: the diagram opens the deeper system (Lena, 27.09.2026) */
  /* the cue opens the overview of the whole system (Approach 04.1), not a single dimension (Lena, 27.09.2026) */
  const cue=mk('button','j-cue','<span class="ci" aria-hidden="true">+</span><span class="ct">Explore the system</span><span class="cl" aria-hidden="true"></span>',{'data-open':'approach','data-act':'','aria-haspopup':'dialog'});
  /* the + at the centre of each circle opens its dimension: on this site + always means open (Lena, 27.09.2026) */
  const cEls=DIMS.map((d,i)=>mk('button','cplus','<i></i>',{'data-dim':i,'data-act':'','aria-haspopup':'dialog','aria-label':`Open ${d.n}`}));
  const vB=mk('button','vlab','Delivery',{'data-real':RI('Delivery'),'data-act':'','aria-haspopup':'dialog'});
  let tl=null,master=null,trig=null,jState=-1,G0=G();

  function fitText(el,w){el.style.fontSize='100px';const r=el.getBoundingClientRect().width/S;el.style.fontSize=(100*w/r)+'px'}
  /* the thread: the cut starts exactly on the line the monolith contracts into, between LDT and INC */
  function monoCut(g){const m=LDT.mono,l=m&&inst===0?m.line():{left:innerWidth/2-2,width:4};const offX=(innerWidth-g.W*S)/2;return{x:(l.left-offX)/S,w:l.width/S}}
  function jTitle(i){if(i===jState)return;const prev=jState;jState=i;const el=q('.j-title');gsap.killTweensOf(el);
    const show=()=>{if(!JT[jState]){gsap.set(el,{opacity:0});return}const [n,t,s,x]=JT[jState];el.querySelector('.pill').textContent=n;el.querySelector('.t').textContent=t;el.querySelector('.s').innerHTML=s;el.querySelector('.s').style.display=s?'':'none';el.querySelector('.x').textContent=x;el.querySelector('.x').style.display=x?'':'none';
      /* System is the anchor of the site: its title stands larger than Complexity and Connect */
      const big=jState===3,M=MOB();gsap.set(el.querySelector('.t'),{fontSize:big?(M?56:104):G0.jtS});gsap.set(el.querySelector('.s'),{fontSize:big?(M?32:60):(M?26:40)});gsap.set(el.querySelector('.x'),{fontSize:big?(M?15:21):(M?14:19),width:big?(M?380:440):(M?370:410)});
      emerge(el,jState,S)};
    if(JT[prev])retreat(el,prev,S,show);else show()}

  function build(){
    if(trig){trig.kill();trig=null}if(master){master.kill();master=null}if(tl){tl.kill()}
    const g=G(),M=MOB();G0=g;fitCanvas(cv,g.W,g.H);gsap.set(cv,{visibility:'visible'});
    /* arrive: the monolith layer (monolith.js) carries the landing; the cut waits on its final line */
    if(inst===0&&LDT.mono)LDT.mono.layout();
    const c=monoCut(g),bar={x:c.x,w:c.w};
    gsap.set(q('.j-bar'),{left:bar.x,width:bar.w,top:-2000,height:5000,opacity:0,scaleY:1,autoRound:false});
    gsap.set(q('.j-barshine'),{left:bar.x,width:bar.w,top:-2000,height:M?5000:2000+g.H-90,opacity:0,scaleY:1,autoRound:false});
    gsap.set(q('.j-barshine .shine'),{left:-260,top:M?-100:1900,height:M?g.H+200:1400});
    gsap.set(core,{left:g.core[0],top:g.core[1],width:g.core[2],fontSize:g.core[3],opacity:0});gsap.set(words,{opacity:.08});
    /* complexity */
    const serif=q('.j-serif');gsap.set(serif,{left:g.m-12,bottom:g.serifB,top:'auto',opacity:0,y:40});fitText(serif,g.serifW);
    blocks.forEach(({b,l})=>{gsap.set([b,l],{left:bar.x,top:0,width:bar.w,height:g.H,rotation:0,y:0,opacity:0,transformOrigin:'50% 50%'});gsap.set(l,{fontSize:M?14.5:17,letterSpacing:M?'.05em':'.08em',padding:M?'11px 11px':'16px 18px'})});
    /* connect */
    gsap.set(q('.j-black'),{opacity:0});gsap.set(q('.j-zoom'),{opacity:0});
    gsap.set(q('.j-connect'),{left:g.connect[0],top:g.connect[1],width:g.connect[2],fontSize:g.connect[3],opacity:0,y:20,textAlign:M?'left':'center'});
    /* system */
    P(q('.j-divider'),g.divider[0],g.divider[1],1,g.H);gsap.set(q('.j-divider'),{opacity:0,display:M?'none':''});
    gsap.set(sys,{attr:{width:g.W,height:g.H,viewBox:`0 0 ${g.W} ${g.H}`}});
    const C=i=>q('.c'+i),F=i=>q('.f'+i),CL=i=>q('.clc'+i);
    [0,1,2,3].forEach(i=>{const [x,y]=g.C0[i];gsap.set([C(i),F(i),CL(i)],{attr:{cx:x,cy:y,r:g.r0}});gsap.set(C(i),{attr:{'stroke-dashoffset':1},visibility:'hidden'});gsap.set(F(i),{opacity:0})});
    gsap.set(q('.lensA'),{attr:{cx:g.C1[0][0],cy:g.C1[0][1],r:g.r1},opacity:0});gsap.set(q('.lensB'),{attr:{cx:g.C1[2][0],cy:g.C1[2][1],r:g.r1},opacity:0});
    /* construction crosses at centres and intersections */
    const cross=q('.cross');cross.innerHTML='';const pts=[];
    /* the centres carry the open controls; the drawn crosses stay only where the circles meet */
    cEls.forEach((e,i)=>{const [cx,cy]=g.C1[i];gsap.set(e,{left:cx-20,top:cy-20,opacity:0})});const dx=(g.C1[1][0]-g.C1[0][0])/2,hh=Math.sqrt(g.r1*g.r1-dx*dx);
    [[g.C1[0][0]+dx,g.C1[0][1]-hh],[g.C1[0][0]+dx,g.C1[0][1]+hh],[g.C1[2][0]+dx,g.C1[2][1]-hh],[g.C1[2][0]+dx,g.C1[2][1]+hh]].forEach(p=>pts.push(p));
    pts.forEach(([x,y])=>cross.insertAdjacentHTML('beforeend',`<line class="cross" x1="${x-6}" y1="${y}" x2="${x+6}" y2="${y}"/><line class="cross" x1="${x}" y1="${y-6}" x2="${x}" y2="${y+6}"/>`));
    gsap.set(cross,{opacity:0});
    /* labels */
    const fs=M?9.4:14;/* two-word labels as two lines, one word each (a <br> was ignored by Safari on iPhone) */
    dimEls[3].querySelector('.dn').innerHTML='<span class="ln">Commercial</span><span class="ln">Architecture</span>';
    dimEls.forEach((e,i)=>{const [cx,cy]=g.C1[i];const left=i%2===0?cx-g.r1*(M?.62:.59):cx-g.r1*.3;gsap.set(e,{left,top:cy-g.r1*(M?.5:.55),fontSize:M?fs:17,opacity:0,letterSpacing:M?'.04em':'.06em'})});
    const tpos={Advantage:[0,0],Markets:[1,0],People:[2,0],Technology:[2,1],Decisions:[2,2],Revenue:[3,0],Customers:[3,1],Partnerships:[3,2]};
    Object.entries(tickEls).forEach(([n,e])=>{const [ci,row]=tpos[n];const [cx,cy]=g.C1[ci];const left=ci%2===0?cx-g.r1*(M?.62:.59):cx-g.r1*.3;gsap.set(e,{left,top:cy+(M?26:30)+row*(M?21:38),fontSize:M?10:fs,opacity:0,letterSpacing:M?'.05em':'.08em'})});
    /* the cue is an entry into the system (it opens Proposition, the first dimension): on desktop it sits in the left column on the axis of the lower circles and draws a line towards them; on mobile beneath the circles */
    gsap.set(cue,M?{left:g.m,top:g.C1[2][1]+g.r1+20,width:g.W-2*g.m,opacity:0}:{left:g.m,top:g.C1[2][1]-15,width:g.divider[0]-g.m-28,opacity:0});
    [[vA,0],[vB,2]].forEach(([e,ci])=>{const [cx,cy]=g.C1[ci];const lx=cx+(g.C1[ci+1][0]-cx)/2;gsap.set(e,{left:lx-110,top:cy-10,width:220,fontSize:M?9.4:15,opacity:0})});
    /* mobile: the dimensions sit inside their circles, as on the laptop (Lena, 26.09.2026) */
    if(M){dimEls.forEach(e=>gsap.set(e,{fontSize:12.5,letterSpacing:'.04em'}));
      gsap.set([vA,vB],{fontSize:14,letterSpacing:'.07em'})}
    /* the areas stay visible on the phone too: every one of the fourteen entries is reachable from the system (Lena, 27.09.2026) */
    Object.values(tickEls).forEach(e=>gsap.set(e,{display:''}));
    const jt=q('.j-title');gsap.set(jt,{left:g.jt[0],top:g.jt[1],opacity:0});gsap.set(jt.querySelector('.t'),{fontSize:g.jtS});gsap.set(jt.querySelector('.s'),{fontSize:M?26:40,marginTop:M?2:4,marginBottom:M?0:2,width:'auto',whiteSpace:'nowrap'});gsap.set(jt.querySelector('.x'),{fontSize:M?14:19,marginTop:M?18:34,width:M?370:410});
    jState=-1;

    tl=gsap.timeline({defaults:{ease:'none'},paused:RM});
    const B=[q('.j-bar'),q('.j-barshine')];
    /* 01 Arrive: the line from the monolith widens into the cut and moves, proposition word by word */
    tl.to(B,Object.assign({left:g.barAfter[0],width:g.barAfter[1],duration:.04,ease:'power3.inOut',autoRound:false},M?{top:120,height:g.H-150}:{}),.085)
      .set(core,{opacity:1},at(.125))
      .to(words,{opacity:1,stagger:.0045,duration:.01},at(.125));
    /* 02 Complexity: the cut breaks into a composed field of realities */
    tl.to(core,{opacity:0,duration:.02},at(.2));
    blocks.forEach(({b,l},i)=>{const [x,y,w,h,r]=g.blocks[i];tl.set(b,{opacity:1},at(.225)).to(l,{opacity:1,duration:.012},at(.225+i*.007+.07)).to([b,l],{left:x,top:y,width:w,height:h,rotation:r,duration:.08,ease:'power3.out'},at(.225+i*.007))});
    tl.to(B,{opacity:0,duration:.01},at(.23));
    tl.to(serif,{opacity:1,y:0,duration:.04,ease:'power2.out'},at(.31));
    /* 03 Connect: enter the first reality */
    const Z=q('.j-zoom');
    tl.set(Z,{opacity:1,left:g.blocks[0][0],top:g.blocks[0][1],width:g.blocks[0][2],height:g.blocks[0][3],rotation:g.blocks[0][4]},at(.42))
      .to(Z,{left:-200,top:-200,width:g.W+400,height:g.H+400,rotation:0,duration:.045,ease:'power2.in'},at(.42))
      .set(q('.j-black'),{opacity:1},at(.465)).set(Z,{opacity:0},at(.466))
      .set([...blocks.map(o=>o.b),...blocks.map(o=>o.l),serif],{opacity:0},at(.466))
      .to(q('.j-connect'),{opacity:1,y:0,duration:.03},at(.475))
      .to(q('.j-connect'),{opacity:0,y:-20,duration:.02},at(.53));
    /* an undrawn ring still leaves a faint dot at its dash start: it stays hidden until its line begins */
    [0,1,2,3].forEach(i=>tl.set(C(i),{visibility:'visible'},at(.55+i*.01)).to(C(i),{attr:{'stroke-dashoffset':0},duration:.05,ease:'power2.inOut'},at(.55+i*.01)));
    /* 04 System: light returns, circles move into each other, shared realities appear */
    tl.to(q('.j-black'),{opacity:0,duration:.001},at(.62));
    [0,1,2,3].forEach(i=>{const [x,y]=g.C1[i];tl.to([C(i),F(i),CL(i)],{attr:{cx:x,cy:y,r:g.r1},duration:.08,ease:'power3.inOut'},at(.635))});
    tl.to([q('.lensA'),q('.lensB')],{opacity:1,duration:.02},at(.72)).to([vA,vB],{opacity:1,duration:.02},at(.735))
      .to(dimEls,{opacity:1,duration:.02,stagger:.005},at(.745)).to(Object.values(tickEls),{opacity:1,duration:.02,stagger:.004},at(.76))
      .to([cross,...cEls],{opacity:1,duration:.02},at(.78)).to(cue,{opacity:1,duration:.02},at(.785)).to(q('.j-divider'),{opacity:1,duration:.02},at(.78))
      .to({},{duration:SYS_HOLD},at(.8));

    if(RM){
      const p=STILL[inst];tl.time(Math.min(p,tl.duration()));
      st.classList.toggle('cxOn',inst===1);st.classList.toggle('sysOn',inst===3);
      if(JT[inst]){const [n,t,s,x]=JT[inst];jt.querySelector('.pill').textContent=n;jt.querySelector('.t').textContent=t;jt.querySelector('.s').innerHTML=s;jt.querySelector('.s').style.display=s?'':'none';jt.querySelector('.x').textContent=x;jt.querySelector('.x').style.display=x?'':'none';gsap.set(jt,{opacity:1})}
      else gsap.set(jt,{opacity:0});
      /* hide what is not visible in this still, from assistive technology and the keyboard */
      [...cv.children,...q('.j-blocks').children,...sl.children].forEach(e=>{const o=+gsap.getProperty(e,'opacity');if(o<.05){e.setAttribute('aria-hidden','true');if(e.tagName==='BUTTON')e.tabIndex=-1}});
      /* reduced motion: each still carries the band of its own background */
      st.dataset.band=inst===2?'black':'white';
      if(!st.dataset.rail){st.dataset.rail='1';ScrollTrigger.create({trigger:st,start:'top 55%',end:'bottom 45%',onToggle:self=>{if(self.isActive)setActive(inst)}})}
      return;
    }
    /* the landing comes first: one screen of scroll in which the monolith contracts into its line (motion as in the prototype, faster),
       the cut takes over on that line the moment it is complete and widens at once; the chapters follow with their lengths */
    const base=M?4.8:5.4,END=LDT.heroEnd,H0=1/base,T0=H0-.082,TL=tl.duration();LDT.heroT=[H0,T0,TL];
    const hs=LDT.heroS;hs.s=0;
    master=gsap.timeline({defaults:{ease:'none'}});
    /* the cut appears a moment before the canvas steps back, on identical geometry, so the thread is never missing */
    tl.set(B,{opacity:1},H0*(END-.005)/END-T0);
    master.fromTo(hs,{s:0},{s:END,duration:H0},0).add(tl,T0);
    const jBand=bandAfter($('#journey'),'white');
    trig=ScrollTrigger.create({trigger:'#journey',start:'top top',onRefresh:jBand,onToggle:jBand,end:()=>'+='+innerHeight*base*(T0+TL),pin:st,refreshPriority:2,scrub:.6,animation:master,invalidateOnRefresh:true,
      onUpdate:self=>{const p=self.progress*(T0+TL)-T0,hp=Math.min(1,self.progress*(T0+TL)/H0)*END;const s=p<SEG[0]?0:p<SEG[1]?1:p<SEG[2]?2:3;setActive(s);jTitle(s===0?-1:s);hero(hp<.72);
        st.classList.toggle('sysOn',p>at(.72));st.classList.toggle('cxOn',p>at(.3)&&p<at(.42));jBand(self)}});
  }
  /* complexity: a touched reality settles into place, the others stay in tension */
  blocks.forEach(({b,l},i)=>{
    b.addEventListener('pointerenter',()=>{if(st.classList.contains('cxOn'))gsap.to([b,l],{rotation:0,y:-8,duration:.6,ease:'expo.out',overwrite:'auto'})});
    b.addEventListener('pointerleave',()=>{if(st.classList.contains('cxOn'))gsap.to([b,l],{rotation:G0.blocks[i][4],y:0,duration:.8,ease:'expo.out',overwrite:'auto'})});
  });
  /* influence: touching a reality inverts the circles it acts on */
  function influence(ds){[0,1,2,3].forEach(i=>gsap.to(q('.f'+i),{opacity:ds.includes(i)?1:0,duration:.4,ease:'power2.out'}))}
  const on=e=>{const t=e.target.closest('[data-real],[data-dim]');if(!t||!st.classList.contains('sysOn'))return;influence(t.dataset.real!=null?REAL[+t.dataset.real].d:[+t.dataset.dim])};
  const off=e=>{const n=e.relatedTarget;if(!n||!n.closest||!n.closest('.j-labels'))influence([])};
  sl.addEventListener('pointerover',on);sl.addEventListener('pointerout',off);sl.addEventListener('focusin',on);sl.addEventListener('focusout',off);
  return{st,build,get trig(){return trig},intro(skip){if(inst===0&&LDT.mono&&!RM)LDT.mono.start(skip)}};
}
const J=stages.map((st,i)=>Journey(st,i));

/* ---------- transformation ---------- */
const bars=PLATES.map(p=>{const b=document.createElement('div');b.className='bar7';$('#tTrack').appendChild(b);const l=document.createElement('div');l.className='bar7lab';l.textContent=p;$('#tTrack').appendChild(l);return{b,l}});
let tST=null,tTL=null,tScale=1,tRail=0,ttShown=false;
/* the words are the layers: large type, each carried by a fine line of its own length */
function T(){return MOB()?{W:430,H:860,ws:[150,190,176,190,180,120,290],bh:46,x0:110,dx:170,y0:236,sy:74,align:[22,196,386,44,7],anchor:[22,618],prog:[22,800,386],pf:11.5,lf:23,lfEnd:20}:{W:1440,H:900,ws:[300,370,350,370,350,250,560],bh:70,x0:560,dx:250,y0:246,sy:104,align:[640,170,540,56,14],anchor:[48,400],prog:[48,808,1150],pf:16,lf:44,lfEnd:32}}
function clipLabels(){const cr=$('#tTrack').getBoundingClientRect(),m=MOB()?4:40*tScale;bars.forEach(({b,l})=>{const r=l.getBoundingClientRect();l.style.visibility=(r.left>=cr.left+m&&r.right<=cr.right+1)?'visible':'hidden'})}
function buildTransform(){
  if(tST){tST.kill();tST=null}if(tTL)tTL.kill();
  const cv=$('#tcv'),t=T();cv.style.width=t.W+'px';cv.style.height=t.H+'px';tScale=Math.min(innerWidth/t.W,innerHeight/t.H);gsap.set(cv,{xPercent:-50,yPercent:-50,scale:tScale});
  gsap.set('#tt',{left:MOB()?22:48,top:MOB()?100:122});gsap.set('#tt .t',{fontSize:MOB()?36:60,opacity:RM||ttShown?1:0,x:0,y:0,scale:1});
  const pos=i=>({x:t.x0+i*t.dx,y:t.y0+((i*37)%5)*t.sy});
  bars.forEach(({b,l},i)=>{const p=pos(i);gsap.set([b,l],{left:p.x,top:p.y,width:t.ws[i],height:t.bh,opacity:1})});
  gsap.set(bars.map(o=>o.l),{fontSize:t.lf,paddingLeft:0,borderBottomWidth:1});gsap.set(bars.map(o=>o.b),{display:'',opacity:0});
  gsap.set('#tTrack',{left:0,top:0,width:MOB()?t.W:1200,height:t.H,overflow:'hidden'});gsap.set(bars.flatMap(o=>[o.b,o.l]),{x:0});gsap.set('#tWipe',{top:3000});
  const last=pos(PLATES.length-1);const shift=Math.max(0,last.x+t.ws[PLATES.length-1]-(t.W-(MOB()?22:260)));
  const [ax,ay,aw,ah,ag]=t.align;
  gsap.set('#tAxis',{left:ax-18,top:ay-40,width:1,height:PLATES.length*(ah+ag)+80,scaleY:0,transformOrigin:'50% 0%'});
  gsap.set('#tAnchor',{left:t.anchor[0],top:t.anchor[1],opacity:0,y:20});gsap.set('#tAnchor .it',{fontSize:MOB()?28:64,width:MOB()?380:520});gsap.set('#tAnchor .when',{fontSize:MOB()?13.5:19,width:MOB()?380:470,marginTop:MOB()?12:28});gsap.set('#tAnchor .act',{marginTop:MOB()?20:36});
  gsap.set('#tProg',{left:t.prog[0],top:t.prog[1],width:t.prog[2],opacity:1});gsap.set('#tProg span',{fontSize:MOB()?19:32,letterSpacing:'.01em'});
  const tl=gsap.timeline({defaults:{ease:'none'},paused:RM});tTL=tl;
  tl.to(bars.flatMap(o=>[o.b,o.l]),{x:-shift,duration:.5},0);
  $$('#tProg span').forEach((sp,i)=>tl.call(()=>$$('#tProg span').forEach((x,j)=>x.classList.toggle('on',j<=i)),null,.02+i*.1));
  tl.to('#tWipe',{top:-3000,duration:.08,ease:'power2.inOut'},.54).to('#tProg',{opacity:0,duration:.03},.54);
  /* each word dims only while it travels, so words never cross each other legibly and the screen is never empty */
  bars.forEach(({b,l},i)=>{const st=.6+i*.018,to={left:ax+shift,top:ay+i*(ah+ag),width:aw,height:ah};
    tl.to(l,Object.assign({fontSize:t.lfEnd,paddingLeft:MOB()?14:22,borderBottomWidth:0,duration:.12,ease:'power3.inOut'},to),st).to(l,{opacity:0,duration:.015},st+.01).to(l,{opacity:1,duration:.025},st+.095)
      /* in the white end state each word lands on its own black block */
      .set(b,to,st+.09).to(b,{opacity:1,duration:.03},st+.09)});
  tl.to('#tAxis',{scaleY:1,duration:.06},.76).to('#tAnchor',{opacity:1,y:0,duration:.05},.8).to({},{duration:.15},.85);
  tl.eventCallback('onUpdate',clipLabels);
  if(RM){$('#transformation').dataset.band='white';tl.progress(1);clipLabels();if(!tRail&&(tRail=1))ScrollTrigger.create({trigger:'#transformation',start:'top 55%',end:'bottom 45%',onToggle:self=>{if(self.isActive)setActive(5)}});return}
  const tBand=bandAfter($('#transformation'),'white');
  tST=ScrollTrigger.create({trigger:'#transformation',start:'top top',end:()=>'+='+innerHeight*2.6,pin:'#tStage',refreshPriority:1,scrub:.6,animation:tl,invalidateOnRefresh:true,onToggle:self=>{if(self.isActive)setActive(5);tBand(self)},onUpdate:tBand,onRefresh:tBand});
}

/* ---------- proof, layers ---------- */
const orgHTML=()=>{let oi=0;return OG.map(([c,ns])=>`<div class="og"><h3>${c}</h3><ul>${ns.map(n=>`<li><span class="${(oi++)%2?'it':'g'}">${n}</span></li>`).join('')}</ul></div>`).join('')};
$('#orgList').innerHTML=orgHTML();
/* Explore the system: the map follows the diagram. Four dimensions with their areas, Positioning and Delivery between the pairs */
{const dim=i=>{const g=SYS.find(x=>x.d===i);return `<div class="xd" style="grid-area:d${i}"><button type="button" class="xdn" data-ddim="${i}" data-act aria-haspopup="dialog"><span class="pill" aria-hidden="true">${DL[i]}</span><span class="n">${DIMS[i].n}</span><span class="plus" aria-hidden="true">+</span></button><p>${DIMS[i].ap}</p><ul>${g.a.map(n=>`<li><button type="button" data-dreal="${RI(n)}" data-act aria-haspopup="dialog"><i></i><b class="ad">${ADDR('real',RI(n))}</b><span>${n}</span></button></li>`).join('')}</ul></div>`};
 const lens=(n,a,b,k)=>`<button type="button" class="xl" style="grid-area:l${k}" data-dreal="${RI(n)}" data-act aria-haspopup="dialog" aria-label="${n}, connects ${a} and ${b}"><b class="ad">${ADDR('real',RI(n))}</b><span class="n">${n}</span><span class="c" aria-hidden="true">Connects ${a} and ${b}</span></button>`;
 $('#xMap').innerHTML=dim(0)+lens('Positioning','Proposition','Expansion',0)+dim(1)+dim(2)+lens('Delivery','Operations','Commercial Architecture',1)+dim(3);}
$('#states').innerHTML=STATES.map(([l,t,rs])=>`<div class="st"><div class="g" aria-hidden="true">${rs.map(r=>`<i style="left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%"></i>`).join('')}</div><h3 class="l">${l}</h3><p>${t}</p></div>`).join('');

function buildFlow(){
  addEventListener('scroll',()=>{if(RM||!J[0].trig)hero(scrollY<innerHeight*.4)},{passive:true});
  if(!RM){
    ScrollTrigger.create({start:0,end:'max',onUpdate:resolveChapter,onRefresh:resolveChapter});
    /* the organisations stay still and readable; the cut is a fixed spine, only its light edge travels */
    gsap.fromTo('#orgShine .shine',{left:-160},{left:()=>$('#orgShine').offsetWidth+160,ease:'none',scrollTrigger:{trigger:'#orgs',start:'top 85%',end:'bottom 15%',scrub:.8,invalidateOnRefresh:true}});
  }
  [['#proof',4],['#ways',6],['#contact',7]].forEach(([s,i])=>{
    ScrollTrigger.create({trigger:s,start:'top 55%',end:'bottom 45%',onToggle:self=>{if(self.isActive)setActive(i)}});
    const t=$(s+' [data-emerge]');if(RM)return;gsap.set(t,{opacity:0});ScrollTrigger.create({trigger:s,start:'top 70%',once:true,onEnter:()=>emerge(t,i,1)})});
  if(!RM){
    ScrollTrigger.create({trigger:'#transformation',start:'top 55%',once:true,onEnter:()=>{ttShown=true;gsap.set('#tt .t',{opacity:1});emerge($('#tt .t'),5,tScale)}});
    gsap.from('#proof .grid > *',{opacity:0,y:40,stagger:.12,duration:1,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'#proof .grid',start:'top 80%'}});
    gsap.from('#proof .fig',{opacity:0,y:30,stagger:.1,duration:.9,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'.figs',start:'top 85%'}});
    gsap.from('#markets li',{opacity:0,y:30,stagger:.1,duration:.9,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'#markets',start:'top 85%'}});
    gsap.from('#proof .og',{opacity:0,y:30,stagger:.08,duration:.9,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'#orgs',start:'top 80%'}});
    gsap.from('#ways .row',{opacity:0,y:40,stagger:.1,duration:.9,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'#ways',start:'top 70%'}});
    gsap.from('#contact .open',{opacity:0,y:40,duration:1,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'#contact',start:'top 60%'}});
  }
}
function resolveChapter(){const jt=J[0].trig;if(!jt||!tST)return;const y=scrollY;if(y<jt.end)return;const mid=y+innerHeight*.5;
  const top=id=>$(id).getBoundingClientRect().top+scrollY;let i=top('#proof')<=mid?4:3;if(y>=tST.start-innerHeight*.45)i=5;if(top('#ways')<=mid)i=6;if(top('#contact')<=mid)i=7;setActive(i)}

/* ---------- navigation targets ---------- */
const topOf=el=>el.getBoundingClientRect().top+scrollY;
function yFor(i){
  if(RM){if(i<=3)return topOf(stages[i]);return topOf($(['#proof','#transformation','#ways','#contact'][i-4]))}
  const jt=J[0].trig;
  if(i===0&&jt)return jt.start;
  if(i<=3&&jt){const p=[0,at(.36),at(.505)+.005,at(.8)+.01][i],[,T0,TL]=LDT.heroT;return jt.start+(jt.end-jt.start)*(T0+p)/(T0+TL)}
  if(i===4)return topOf($('#proof'));
  if(i===5)return tST.start+(tST.end-tST.start)*.3;
  if(i===6)return topOf($('#ways'));
  return topOf($('#contact'));
}
LDT.goChapter=(i,now)=>go(yFor(i),now);

/* ---------- deep dives: the system stays live; every field leads on to the next ---------- */
function mini(on,cur){
  const c=[[34,34],[66,34],[34,70],[66,70]],r=21;
  let s=`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="m1"><circle cx="66" cy="34" r="${r}"/></clipPath><clipPath id="m3"><circle cx="66" cy="70" r="${r}"/></clipPath></defs>`;
  c.forEach((p,i)=>s+=`<circle data-ddim="${i}" cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${on.includes(i)?'#000':'#fff'}" fill-opacity="${on.includes(i)?1:0}"/>`);
  s+=`<circle data-dreal="${RI('Positioning')}" cx="34" cy="34" r="${r}" fill="#000" clip-path="url(#m1)" style="cursor:pointer"/><circle data-dreal="${RI('Delivery')}" cx="34" cy="70" r="${r}" fill="#000" clip-path="url(#m3)" style="cursor:pointer"/>`;
  c.forEach(p=>s+=`<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="none" stroke="#000" stroke-width=".25" pointer-events="none"/>`);s+='</svg>';
  const pos=[[13,4],[45,4],[13,96],[45,96]];
  s+=DIMS.map((d,i)=>`<button type="button" class="lbl2${on.includes(i)?' on':''}" data-ddim="${i}" data-act style="left:${pos[i][0]}%;top:${pos[i][1]}%;transform:translateY(${i<2?'-100%':'0'})"${cur===i?' aria-current="true"':''}>${d.n}</button>`).join('');
  if(!MOB())s+=`<button type="button" class="lens2" data-dreal="${RI('Positioning')}" data-act style="left:50%;top:34%">Positioning</button><button type="button" class="lens2" data-dreal="${RI('Delivery')}" data-act style="left:50%;top:70%">Delivery</button>`;
  $('#deepG').innerHTML=s;
}
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const flow=a=>`<ul class="dflow">${a.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`;
/* pages that have their own composition (Deep Dive contract, page by page); all others use the shared template */
const PAGE_INIT={proposition:ppInit,advantage:avInit,positioning:psInit,expansion:exInit,markets:mkInit,operations:opInit,people:peInit,technology:tcInit,decisions:dcInit,delivery:dlInit,'commercial-architecture':caInit,revenue:rvInit,customers:cuInit,partnerships:paInit};
/* Advantage: a sieve of twelve differences. Each stage shows what still counts (filled), what stops here (outline)
   and what stopped earlier (faint); four stages leave one difference that is an advantage */
const AV_DROP=[[2,5,8,11],[1,4,9,10],[0,7],[3]];
let avReset=null;
function avInit(root){
  if(avReset)return avReset();
  const cols=$$('.av-c',root);
  cols.forEach(c=>{$('.av-dots',c).innerHTML='<i></i>'.repeat(12)});
  const paint=(k,final)=>{const c=cols[k],gone=AV_DROP.slice(0,k).flat(),now=AV_DROP[k];
    [...$('.av-dots',c).children].forEach((d,j)=>{d.className=final?(gone.includes(j)?'g':now.includes(j)?'o':''):(gone.includes(j)?'g':'')})};
  let io,io2;const flow=$('.av-flow',root);
  avReset=()=>{
    /* the path through the operation draws itself once, when it comes into view */
    if(io2)io2.disconnect();
    if(RM){flow.classList.add('go')}else{flow.classList.remove('go');io2=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io2.disconnect();flow.classList.add('go')}},{threshold:.35});io2.observe(flow)}
    if(RM){cols.forEach((c,k)=>paint(k,true));return}
    cols.forEach((c,k)=>paint(k,false));
    if(io)io.disconnect();
    /* when the sieve comes into view, the stages resolve one after another */
    io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();cols.forEach((c,k)=>setTimeout(()=>paint(k,true),250+k*380))}},{threshold:.3});
    io.observe($('.av-cols',root));
  };
  avReset();
}
/* Positioning. One rule for the page: the black square is the business. Grey squares are the company it is seen in.
   The hero shows the same square in two companies; the bridge repeats it for a change of context.
   The decisions: six choices of a premium ambition. Two keep the business where it was meant to be, four move it; the produced square follows */
const PS_DEC=[['Communication','Campaign in the premium register',92],['Product','Materials and finish as designed',88],['Price','Launch discount to open accounts',66],
  ['Channel','Marketplace listing for volume',14],['Distribution','More doors to reach the target',30],['Service','Customer care outsourced to save cost',42]];
const PS_I=92;
/* the same square in two companies: large neighbours make it look smaller, small ones larger */
function psEb(el){const big=el.dataset.eb==="a",n=big?6:8,r=big?.38:.2,sz=big?.28:.06;
  let h='<i class="c"></i>';for(let k=0;k<n;k++){const a=k/n*Math.PI*2-Math.PI/2;h+=`<i class="o" style="left:${50+Math.cos(a)*r*100}%;top:${50+Math.sin(a)*r*100}%;width:${sz*100}%;height:${sz*100}%;--d:${k*60}ms"></i>`}
  el.innerHTML=h}
let psReset=null;
function psInit(root){
  if(psReset)return relBackNow?undefined:psReset();
  $$('.eg',root).forEach(psEb);
  const hero=$('.ps-hero',root),inst=$('.ps-inst',root),tg=$$('.ps-t',root);
  const pick=f=>{inst.dataset.f=f;tg.forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===f))};
  tg.forEach(b=>b.addEventListener('click',()=>pick(b.dataset.f)));
  const sc=$('.ps-sc',root),inU=$('.inc ul',sc),pdU=$('.pdc ul',sc);
  const li=d=>`<li><b>${d[0]}</b><span>${d[1]}</span></li>`;
  inU.innerHTML=PS_DEC.map(li).join('');pdU.innerHTML=PS_DEC.filter(d=>d[2]<80).map(li).join('');
  const movers=PS_DEC.map((d,k)=>d[2]<80?k:-1).filter(k=>k>=0),inL=[...inU.children],pdL=[...pdU.children];
  const fin=PS_DEC.reduce((a,d)=>a+d[2],0)/PS_DEC.length;
  sc.style.setProperty('--fin',fin.toFixed(2));
  let timers=[],io;
  /* the first n movers have been decided; the others still sit where the business meant to be */
  const set=n=>{let s=0;PS_DEC.forEach((d,k)=>{const j=movers.indexOf(k),moved=j>=0&&j<n;s+=j<0?d[2]:moved?d[2]:PS_I;if(j>=0){inL[k].classList.toggle('left',moved);pdL[j].classList.toggle('on',moved)}});
    sc.style.setProperty('--avg',(s/PS_DEC.length).toFixed(2));sc.classList.toggle('done',n>=movers.length)};
  psReset=()=>{
    pick('a');timers.forEach(clearTimeout);timers=[];if(io)io.disconnect();
    if(RM){hero.classList.add('go');set(movers.length);return}
    hero.classList.remove('go');requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('go')));
    set(0);
    /* when the decisions come into view, they are made one after another */
    /* on a phone the section is long: the decisions start only when the line itself stands in the upper part of the screen (it then stays in view, sticky) */
    const mob=matchMedia('(max-width:760px)').matches;
    io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();movers.forEach((m,j)=>timers.push(setTimeout(()=>set(j+1),700+j*900)))}},mob?{threshold:1,rootMargin:'0px 0px -35% 0px'}:{threshold:.45});io.observe(mob?$('.ps-ln',sc):sc);
  };
  psReset();
}
/* Expansion: one business system, drawn once and driven by the scroll. A core, its parts, and one person every part runs through.
   Stretch (f): distance and volume grow, the parts multiply and move out, the lines to the one person strain.
   Restructure (g): a system layer forms between core and parts, the person's knowledge moves into it, the lines hold again. */
let exReset=null;
function exInit(root){
  if(exReset)return relBackNow?undefined:exReset();
  const ov=$('#deep'),seq=$('.ex-seq',root),stage=$('.ex-stage',root),svg=$('.ex-plane svg',root),plane=$('.ex-plane',root);
  const sts=$$('.ex-st',root),steps=$$('.ex-steps button',root);
  const C=300,N=12,R0=96,R1=238,RS=150,ns='http://www.w3.org/2000/svg';
  const el=(t,a)=>{const e=document.createElementNS(ns,t);for(const k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e};
  const ang=i=>(i*30-90)*Math.PI/180;
  /* layers, back to front: dependency lines, spokes, system ring and its links, nodes */
  const dep=[...Array(N)].map(()=>el('line',{class:'dp'})),spk=[...Array(N)].map(()=>el('line',{class:'sp'})),
    rad=[...Array(N)].map(()=>el('line',{class:'rd'})),hub=[0,1,2,3].map(()=>el('line',{class:'hb'})),
    ring=el('circle',{class:'rg',cx:C,cy:C,r:RS}),nod=[...Array(N)].map(()=>el('circle',{class:'nd',r:6})),
    one=el('circle',{class:'on',r:8}),core=el('circle',{class:'co',cx:C,cy:C,r:11});
  /* the copy (state 1): the same configuration set up elsewhere. It arrives without the one person, its links only dashed */
  const CX=C+125,CY=C+115,cS=[...Array(6)].map(()=>el('line',{class:'cs'})),cN=[...Array(6)].map(()=>el('circle',{class:'cn',r:6})),cC=el('circle',{class:'co',cx:CX,cy:CY,r:11});
  const RL=2*Math.PI*RS;ring.style.strokeDasharray=RL;
  const cl=x=>Math.max(0,Math.min(1,x)),mix=(a,b,t)=>a+(b-a)*t,ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  const lb=k=>$('.lb-'+k,plane),place=(e,x,y)=>{e.style.left=x/6+'%';e.style.top=y/6+'%'};
  const P1=[C+40,C-30],P2=[C+RS*Math.cos(ang(1.4)),C+RS*Math.sin(ang(1.4))];
  let cur=-1;
  const draw=p=>{
    const rp=ease(cl((p-.55)/.45))*(1-ease(cl((p-1.25)/.3))),f=ease(cl((p-1.45)/.7)),g=ease(cl((p-2.3)/.55));
    const ox=-125*rp,oy=-115*rp,K=[C+ox,C+oy];
    core.setAttribute('cx',K[0]);core.setAttribute('cy',K[1]);
    const op=[mix(P1[0],P2[0],g)+ox,mix(P1[1],P2[1],g)+oy];
    one.setAttribute('cx',op[0]);one.setAttribute('cy',op[1]);one.style.opacity=1-g;
    for(let i=0;i<N;i++){
      const even=i%2===0,a=even?ang(i):mix(ang(i-1),ang(i),f),r=mix(R0,R1,f),x=K[0]+r*Math.cos(a),y=K[1]+r*Math.sin(a),vis=even?1:f;
      nod[i].setAttribute('cx',x);nod[i].setAttribute('cy',y);nod[i].style.opacity=vis;
      /* the one person: every part still reaches it; the further out, the more the line strains */
      const d=dep[i];d.setAttribute('x1',op[0]);d.setAttribute('y1',op[1]);d.setAttribute('x2',x);d.setAttribute('y2',y);
      d.style.opacity=vis*(1-g)*(.9-.35*f);d.style.strokeDasharray=f>.35?`${mix(8,2,f)} ${mix(0,5,f)}`:'none';
      const sp=spk[i];sp.setAttribute('x1',K[0]);sp.setAttribute('y1',K[1]);sp.setAttribute('x2',x);sp.setAttribute('y2',y);sp.style.opacity=vis*(1-g)*.28;
      const rx=C+RS*Math.cos(a),ry=C+RS*Math.sin(a),rl=rad[i];
      rl.setAttribute('x1',rx);rl.setAttribute('y1',ry);rl.setAttribute('x2',x);rl.setAttribute('y2',y);rl.style.opacity=vis*g;
    }
    cN.forEach((n,k)=>{const a=ang(k*2),x=CX+R0*Math.cos(a),y=CY+R0*Math.sin(a);n.setAttribute('cx',x);n.setAttribute('cy',y);n.style.opacity=rp;
      const l=cS[k];l.setAttribute('x1',CX);l.setAttribute('y1',CY);l.setAttribute('x2',x);l.setAttribute('y2',y);l.style.opacity=rp});
    cC.style.opacity=rp;
    place(lb('orig'),K[0],K[1]-R0-22);lb('orig').style.opacity=rp;
    place(lb('copy'),CX,CY+R0+22);lb('copy').style.opacity=rp;
    hub.forEach((h,k)=>{const a=(k*90+45)*Math.PI/180;h.setAttribute('x1',C);h.setAttribute('y1',C);h.setAttribute('x2',C+RS*Math.cos(a));h.setAttribute('y2',C+RS*Math.sin(a));h.style.opacity=g});
    ring.style.strokeDashoffset=RL*(1-g);ring.style.opacity=g?1:0;
    place(lb('one'),op[0],op[1]);lb('one').style.opacity=cl((f-.35)/.3)*(1-cl(g*3));
    place(lb('core'),C,C);lb('core').style.opacity=g;
    place(lb('sys'),C+RS*Math.cos(ang(10.5)),C+RS*Math.sin(ang(10.5)));lb('sys').style.opacity=g;
    place(lb('ctx'),C+R1*Math.cos(ang(4)),C+R1*Math.sin(ang(4)));lb('ctx').style.opacity=g;
    /* one statement at a time: the entry, then the three states */
    const s=p<.55?0:p<1.45?1:p<2.3?2:3;
    if(s!==cur){cur=s;sts.forEach(e=>e.classList.toggle('on',+e.dataset.s===s));steps.forEach(b=>{const on=+b.dataset.goS===s;b.classList.toggle('on',on);b.setAttribute('aria-current',on?'step':'false')});stage.dataset.s=s}
  };
  /* the sequence is driven by the layer's own scroll: the stage stays while the section passes */
  const top=()=>parseFloat(getComputedStyle(stage).top)||0;
  const prog=()=>{const r=seq.getBoundingClientRect(),o=ov.getBoundingClientRect().top,span=seq.offsetHeight-stage.offsetHeight;return span>0?cl((o+top()-r.top)/span)*3:0};
  let raf=0;const onScroll=()=>{if(raf||root.hidden)return;raf=requestAnimationFrame(()=>{raf=0;draw(prog())})};
  ov.addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
  /* the three states can also be chosen directly: the layer scrolls to the state */
  const target=[0,1.05,1.95,2.95];
  steps.forEach(b=>b.addEventListener('click',()=>{const span=seq.offsetHeight-stage.offsetHeight,y=ov.scrollTop+seq.getBoundingClientRect().top-ov.getBoundingClientRect().top-top()+span*target[+b.dataset.goS]/3;ov.scrollTo({top:y,behavior:RM?'auto':'smooth'})}));
  exReset=()=>{cur=-1;draw(prog())};
  exReset();
}
/* Markets: distance to a customer is made of conditions. The entry draws seven panes in perspective between the business (front, bottom left)
   and its customer (behind the last pane); each pane is a condition and takes a little clarity away. A context re-weights the same seven words
   (the heavy ones follow the Strategy Gate's weighting by type of business). A route decides whose panes the business looks through */
const MK_W={fa:['ch','pr','lo'],wh:['ch','de','tr'],ho:['ru','pr','de'],cu:['ru','ch','lo']};
const MK_C=['Rules','Channels','Delivery','Price','Competition','Local codes','Trust'];
let mkReset=null;
function mkInit(root){
  if(mkReset)return relBackNow?undefined:mkReset();
  const hero=$('.mk-hero',root),tun=$('.mk-tun',root),wf=$('.mk-wf',root),tc=$$('.mk-t',root),rd=$$('.mk-rd p',root),vw=$('.mk-view',root),ts=$$('.mk-s',root),rc=$$('.mk-rc p',root);
  /* perspective: pane i sits at depth scale s; front pane from (8,12) to (72,80) per cent, vanishing point (90,24) */
  const VP=[90,24],F=[8,12,72,80];let pn='';
  MK_C.forEach((c,i)=>{const s=1-i*.1,l=VP[0]+(F[0]-VP[0])*s,t=VP[1]+(F[1]-VP[1])*s,r=VP[0]+(F[2]-VP[0])*s,b=VP[1]+(F[3]-VP[1])*s;
    pn+=`<div class="mk-pn" style="--i:${i};left:${l}%;top:${t}%;width:${r-l}%;height:${b-t}%;z-index:${10-i}"></div>`;
    tun.insertAdjacentHTML('beforeend',`<span class="mk-pl" aria-hidden="true" style="--i:${i};left:${l}%;top:${b}%"><i>${String(i+1).padStart(2,'0')}</i>${c}</span>`)});
  $('.mk-pns',tun).innerHTML=pn;
  /* the customers, as a field of points: fixed, so every visit shows the same picture */
  let seed=7,rnd=()=>(seed=(seed*16807)%2147483647)/2147483647,cr='';
  for(let k=0;k<52;k++){const a=rnd()*Math.PI*2,d=Math.sqrt(rnd()),x=200+Math.cos(a)*d*190,y=150+Math.sin(a)*d*135;cr+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2+rnd()*5.5).toFixed(1)}"/>`}
  $('.mk-crowd',root).innerHTML=cr;
  const weigh=c=>{wf.dataset.c=c;$$('span',wf).forEach(w=>w.classList.toggle('hv',MK_W[c].includes(w.dataset.k)));
    tc.forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===c));rd.forEach(p=>p.classList.toggle('off',p.dataset.c!==c))};
  const route=k=>{vw.dataset.r=k;ts.forEach(b=>b.setAttribute('aria-pressed',b.dataset.r===k));rc.forEach(p=>p.classList.toggle('off',p.dataset.r!==k))};
  tc.forEach(b=>b.addEventListener('click',()=>weigh(b.dataset.c)));
  ts.forEach(b=>b.addEventListener('click',()=>route(b.dataset.r)));
  mkReset=()=>{
    weigh('fa');route('0');
    if(RM){hero.classList.add('go');return}
    hero.classList.remove('go');requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('go')));
  };
  mkReset();
}
/* Proposition: every business exists three times. One rule for the picture: the dashed column is the idea, the white blocks are where
   the offer, the organisation and the economics actually are. Inside the column in all three rows, the business holds.
   A segment is [left %, width %]; the column runs from 34 to 66 %. State 0 holds, 1 to 5 are the drifts */
const PP=[
 [[[34,32]],[[34,32]],[[34,32]]],
 [[[34,32],[3,10],[18,10],[72,10],[87,10]],[[34,32],[18,10],[72,10]],[[34,32]]],
 [[[8,84]],[[41,18]],[[34,32]]],
 [[[48,48]],[[52,44]],[[56,40]]],
 [[[34,32]],[[34,32]],[[34,12]]],
 [[[6,30]],[[35,30]],[[64,30]]]
];
let ppReset=null;
function ppInit(root){
  /* the page is built once; a new visit starts again from the business that holds */
  if(ppReset)return relBackNow?undefined:ppReset();
  const tracks=$$('.pp-track',root),tabs=$$('.pp-tab',root),outs=$$('.pp-o',root),rails=$('.pp-rails',root);
  const seg=x=>`<i class="${x[2]==='h'?'h':''}" style="left:${x[0]}%;width:${x[1]}%"></i>`;
  tracks.forEach(t=>{t.innerHTML='<i></i>'.repeat(6)});
  /* every choice carries its own small picture of the three versions, so the pattern reads before it is opened */
  tabs.forEach(b=>{$('.gl',b).innerHTML=PP[+b.dataset.s].map(g=>`<span>${g.map(seg).join('')}</span>`).join('')+'<em></em>'});
  $$('[data-area]',root).forEach(b=>b.dataset.dreal=RI(b.dataset.area));
  /* on a phone the reading opens under the chosen line (one source text; the desktop reading place is not shown there) */
  tabs.forEach(b=>{b.nextElementSibling.innerHTML=`<div>${outs.find(o=>o.dataset.s===b.dataset.s).innerHTML}</div>`});
  let sel=0,io;
  const show=s=>{
    rails.dataset.state=s;
    tracks.forEach((t,r)=>{const g=PP[s][r];[...t.children].forEach((el,k)=>{const x=g[Math.min(k,g.length-1)];el.style.left=x[0]+'%';el.style.width=x[1]+'%';el.classList.toggle('h',x[2]==='h')})});
  };
  const select=s=>{sel=s;
    tabs.forEach(b=>{const on=+b.dataset.s===s;b.classList.toggle('on',on);b.parentNode.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
    outs.forEach(o=>o.classList.toggle('on',+o.dataset.s===s));show(s)};
  /* a second press on a drift returns to the business that holds */
  tabs.forEach(b=>b.addEventListener('click',()=>select(+b.dataset.s===sel?0:+b.dataset.s)));
  /* the three versions arrive as one business: from the idea line outwards, when the rails come into view */
  /* the entry is one landing: it ends where the dark field begins, measured from where the page starts in the layer */
  const hero=$('.pp-hero',root),fit=()=>root.style.setProperty('--h0',Math.max(0,hero.getBoundingClientRect().top-$('#deep').getBoundingClientRect().top+$('#deep').scrollTop)+'px');
  addEventListener('resize',fit);
  ppReset=()=>{
    fit();select(0);
    if(RM)return;
    tracks.forEach(t=>[...t.children].forEach(el=>{el.style.transition='none';el.style.left='50%';el.style.width='0%';el.classList.remove('h')}));
    rails.getBoundingClientRect();tracks.forEach(t=>[...t.children].forEach(el=>{el.style.transition=''}));
    if(io)io.disconnect();
    io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();show(sel)}},{threshold:.35});io.observe(rails);
  };
  ppReset();
}
/* Operations: the business in motion. One material for the page, the running week: every part of the business is a lane with its own rhythm.
   The entry shows the lanes all at once; a signal is a change in the rhythm; structure is what carries the load while work keeps moving */
const OP_L=[['Customers',5,31],['People',7,44],['Orders',3,26],['Stock',9,52],['Suppliers',11,60],['Schedules',7,38],['Production',13,70],['Information',2,22],['Cash',14,48],['Contracts',21,90],['Service',4,30],['Authorities',28,110],['Quality',6,56]];
/* a promise from the market and the rhythm it shows: the normal week (seven days, four weeks), then where it changes. d = the change per bar from bar 18 */
const OP_W=[0.5,0.72,0.8,0.76,0.86,0.44,0.18];
const OP_D=[i=>i<17?0:.022*(i-16),i=>i===22||i===23?.42:i>23?.14:0,i=>i<15?0:.016*(i-14),i=>i<14?0:i<21?.1:.2];
const OP_X=[['Move capacity to the line that is selling.','Check stock by hand before every confirmation.'],
 ['Renegotiate the terms that no longer pay.','Chase the same late payments every week.'],
 ['Decide once who approves what.','Wait for the one person who approves everything.']];
let opReset=null;
function opInit(root){
  if(opReset)return relBackNow?undefined:opReset();
  const hero=$('.op-hero',root);
  /* the lanes: each part of the business, its marks at its own rhythm (fixed, so every visit shows the same score) */
  let seed=11;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  $('.op-lanes',root).innerHTML=OP_L.map(([n,gap,dur],k)=>{const m=[];let x=rnd()*gap;while(x<96){const w=2+rnd()*(k%3===0?9:5);m.push([x,w]);x+=w+gap*(.4+rnd()*1.1)}
    /* drawn twice side by side, so the lane can run without a seam */
    const t=[0,100].map(o=>m.map(([x,w])=>`<i style="left:${((x+o)/2).toFixed(2)}%;width:${(w/2).toFixed(2)}%"></i>`).join('')).join('');
    return `<div class="op-ln" style="--d:${dur}s;--k:${k}"><span>${n}</span><div class="op-tk"><div>${t}</div></div></div>`}).join('');
  /* the rhythm: 28 bars, the normal week and where a promise starts to change it */
  const bars=$('.op-bars',root);bars.innerHTML='<i></i>'.repeat(28);const bi=[...bars.children];
  const ps=$$('.op-p',root),rs=$$('.op-rs dl',root);
  const promise=p=>{ps.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.p===p));rs.forEach(d=>d.classList.toggle('off',+d.dataset.p!==p));
    bi.forEach((b,i)=>{const d=OP_D[p](i);b.style.height=Math.min(100,(OP_W[i%7]+d)*74)+'%';b.classList.toggle('sg',d>0)})};
  ps.forEach(b=>b.addEventListener('click',()=>promise(+b.dataset.p)));
  /* intervention: judgement once, compensation stacked week after week */
  const xs=$$('.op-x',root),sl=$$('.op-slip',root);
  const example=x=>{xs.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.x===x));sl[0].textContent=OP_X[x][0];sl[1].textContent=OP_X[x][1]};
  xs.forEach(b=>b.addEventListener('click',()=>example(+b.dataset.x)));
  /* right-sized: the business is a load, the structure carries it. Too little and it bends, too much and nothing moves */
  const beam=$('.op-beam',root),rg=$('#opRange',root),zr=$$('.op-zr p',root),ends=$$('.op-ends span',root),ns='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 600 300');svg.setAttribute('aria-hidden','true');$('.op-bm',beam).replaceWith(svg);
  let v=50,run=0,ph=0,raf=0,io;
  const Z=['Fragility','Right-sized','Bureaucracy'];
  const draw=()=>{
    const z=v<34?0:v>66?2:1,sag=Math.max(0,(38-v)/38),n=Math.round(v<=50?2+v/50*3:5+Math.pow((v-50)/50,1.3)*23),th=16+Math.max(0,v-66)*.55;
    const Y=x=>112+sag*70*(1-Math.pow((x-300)/260,2));
    let s=`<rect x="0" y="286" width="600" height="2" fill="#000"/>`;
    for(let k=0;k<n;k++){const x=n===1?300:60+k*480/(n-1);s+=`<rect x="${(x-4).toFixed(1)}" y="${(Y(x)+th/2).toFixed(1)}" width="8" height="${(286-Y(x)-th/2).toFixed(1)}" fill="#000"/>`}
    if(v>66){const rows=Math.round((v-66)/8);for(let r=1;r<=rows;r++){const y=112+th/2+r*(174-th/2)/(rows+1);s+=`<rect x="56" y="${y.toFixed(1)}" width="488" height="3" fill="#000"/>`}}
    s+=`<path d="M40 ${Y(40)} Q300 ${112+sag*140} 560 ${Y(560)}" fill="none" stroke="#000" stroke-width="${th}"/>`;
    /* the work on top: it moves freely when the structure is right, gathers in the dip when it is not enough, stands still when it is too much */
    const sp=z===2?Math.max(0,1-(v-66)/20):1;
    for(let k=0;k<4;k++){let x;const f=((ph*sp+k/4)%1);x=60+f*480;if(z===0)x=300+(x-300)*(1-sag*.85);s+=`<rect class="w" x="${(x-9).toFixed(1)}" y="${(Y(x)-th/2-20).toFixed(1)}" width="18" height="18"/>`}
    svg.innerHTML=s;beam.dataset.z=z;
    zr.forEach(p=>p.classList.toggle('off',+p.dataset.z!==z));ends.forEach(e=>e.classList.toggle('on',+e.dataset.z===z));rg.setAttribute('aria-valuetext',Z[z])};
  const tick=t=>{raf=0;if(!run||root.hidden)return;ph=(t/9000)%1;draw();raf=requestAnimationFrame(tick)};
  rg.addEventListener('input',()=>{v=+rg.value;draw()});
  opReset=()=>{
    promise(0);example(0);v=50;rg.value=50;ph=.12;draw();
    if(RM){hero.classList.add('go');return}
    hero.classList.remove('go');requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('go')));
    if(io)io.disconnect();
    io=new IntersectionObserver(es=>{run=es.some(e=>e.isIntersecting);if(run&&!raf)raf=requestAnimationFrame(tick)});io.observe(beam);
  };
  opReset();
}
/* People: people carry the operation. One material for the page, a halftone field: every dot is a person, its size is how much of the
   operation they carry. The role fills as the person gets what they need; a group sends the work to one person, a team lets it move;
   knowledge held by one spreads without the holder shrinking; headcount is not what a team carries together */
const PE_NS='http://www.w3.org/2000/svg';
const peC=(svg,a)=>{const e=document.createElementNS(PE_NS,a.t||'circle');delete a.t;for(const k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e};
const peR=(c,r)=>{c.setAttribute('r',Math.max(0,r).toFixed(2));c.style.r=Math.max(0,r).toFixed(2)+'px'};
const PE_NEED=['context','clarity','capability','confidence','access','the outcome'];
const PE_HOLD=[[7,3],[11,2],[4,5],[9,6],[2,2],[12,5]];
let peReset=null;
function peInit(root){
  if(peReset)return relBackNow?undefined:peReset();
  let seed=5;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  /* 1 the entry: a business as a field, a few people carry most of it */
  const hs=$('.pe-f0 svg',root),heavy={'5,4':44,'13,6':34,'9,2':22,'16,3':15,'3,8':10,'11,9':9,'7,7':8,'18,8':8};
  const h0=[];for(let r=0;r<11;r++)for(let c=0;c<20;c++){const k=c+','+r,e=peC(hs,{cx:17.5+c*35,cy:17.5+r*35,r:0});e.style.setProperty('--d',((Math.abs(c-8)+Math.abs(r-5))*28)+'ms');h0.push([e,heavy[k]||2+rnd()*3.2,c,r])}
  Object.keys(heavy).forEach(k=>{const [hc,hr]=k.split(',').map(Number),R=heavy[k];h0.forEach(d=>{if(!heavy[d[2]+','+d[3]]&&Math.hypot((d[2]-hc)*35,(d[3]-hr)*35)<R+4)d[1]=0})});
  /* 2 the role: an outline that fills with what the person needs; what is missing comes back to the same few */
  const rs=$('.pe-rsvg',root);
  peC(rs,{cx:150,cy:160,r:96,fill:'none',stroke:'#000','stroke-width':1.5});
  const inner=peC(rs,{cx:150,cy:160,r:0,class:'in'}),few=peC(rs,{cx:455,cy:160,r:40,class:'few'});
  const back=[...Array(6)].map(()=>peC(rs,{t:'rect',width:16,height:16,class:'bk'}));
  const nb=$$('.pe-n',root),nr=$('.pe-nr',root);
  const role=()=>{const on=nb.filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>+b.dataset.n),m=6-on.length;
    peR(inner,96*Math.sqrt(on.length/6));peR(few,34+m*9);
    back.forEach((q,k)=>{const vis=k<m;q.setAttribute('x',(few.cx.baseVal.value-(34+m*9)-26-(k%2)*20).toFixed(1));q.setAttribute('y',(118+Math.floor(k/2)*24).toFixed(1));q.style.opacity=vis?1:0});
    const miss=PE_NEED.filter((_,k)=>!on.includes(k));
    nr.textContent=m?`Still missing: ${miss.join(', ').replace(/, ([^,]*)$/,' and $1')}. So the questions and exceptions travel back.`:'Now the outcome stays where the role is.'};
  nb.forEach(b=>b.addEventListener('click',()=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');role()}));
  /* 3 the team: the same seven people. In a group the work sits with the one in the middle; in a team it moves */
  const P7=[[200,150],...[0,1,2,3,4,5].map(k=>[200+105*Math.cos((k*60-90)*Math.PI/180),150+105*Math.sin((k*60-90)*Math.PI/180)])];
  const tw=$('.pe-tw',root),prs=$$('.pe-pr',root),teams=$$('.pe-tsvg',root).map(svg=>{
    const g=svg.dataset.m==='g',dots=P7.map((p,k)=>peC(svg,{cx:p[0],cy:p[1],r:g?(k?13:30):19})),work=[...Array(26)].map(()=>peC(svg,{t:'rect',width:9,height:9,class:'wk'}));return {g,work}});
  const team=()=>{const p=tw.dataset.p==='1',n=p?26:12;
    teams.forEach(({g,work})=>{const at=[0,0,0,0,0,0,0];
      work.forEach((w,i)=>{if(i>=n){w.style.opacity=0;return}
        const k=g?(i<(p?23:10)?0:1+(i%6)):i%7;const j=at[k]++;
        const R=(g?(k?13:30):19)+10+Math.floor(j/10)*13,a=(j%10)*36+(Math.floor(j/10)*18)-90,x=P7[k][0]+R*Math.cos(a*Math.PI/180)-4.5,y=P7[k][1]+R*Math.sin(a*Math.PI/180)-4.5;
        w.setAttribute('x',x.toFixed(1));w.setAttribute('y',y.toFixed(1));w.style.opacity=1})})};
  /* two switches on a phone (above and below the pictures), one state */
  const press=on=>{tw.dataset.p=on?'1':'0';prs.forEach(b=>{b.setAttribute('aria-pressed',on);$('span',b).textContent=on?'Take pressure off':'Add pressure'});team()};
  prs.forEach(b=>b.addEventListener('click',()=>press(tw.dataset.p!=='1')));
  /* 4 capability: held by one, or travelling. The holder never shrinks */
  const cs=$('.pe-csvg',root),cf=$('.pe-cfig',root),cd=[];
  for(let r=0;r<8;r++)for(let c=0;c<15;c++)cd.push([peC(cs,{cx:20+c*40,cy:30+r*40,r:2}),c,r]);
  const hb=$$('.pe-h1',root),sb=$$('.pe-s',root);let hold=0,trav=0;
  const cap=()=>{const [hc,hr]=PE_HOLD[hold];cf.dataset.s=trav;
    cd.forEach(([e,c,r])=>{const d=Math.hypot(c-hc,r-hr);peR(e,d===0?18:trav?Math.max(2.4,15.5*Math.exp(-d/3.2)):2.4)});
    hb.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.h===hold));sb.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.s===trav))};
  hb.forEach(b=>b.addEventListener('click',()=>{hold=+b.dataset.h;cap()}));
  sb.forEach(b=>b.addEventListener('click',()=>{trav=+b.dataset.s;cap()}));
  /* 5 capacity: two teams and what each carries together, drawn as one dot of the same ink */
  $$('.pe-ysvg',root).forEach(svg=>{const y=+svg.dataset.y;let s='';
    if(!y){for(let k=0;k<8;k++)s+=`<circle cx="${70+(k%4)*60}" cy="${50+Math.floor(k/4)*62}" r="17"/>`}
    else{for(let k=0;k<24;k++){const big=k===8||k===15;s+=`<circle cx="${40+(k%6)*48}" cy="${34+Math.floor(k/6)*34}" r="${big?15:5.5}"/>`}}
    s+=`<circle class="ag" cx="160" cy="${y?286:268}" r="${y?58:84}"/>`;svg.innerHTML=s});
  /* 6 context: the same field, arranged as each type of business is. Outline = outside the business */
  const xs=$('.pe-xsvg',root),xd=[];
  for(let r=0;r<8;r++)for(let c=0;c<16;c++)xd.push([peC(xs,{cx:30+c*36,cy:39+r*36,r:3}),c,r]);
  const xb=$$('.pe-b',root),xr=$$('.pe-xr p',root),xf=$('.pe-xfig',root);
  const XS=[
    (c,r)=>c===7&&r===3?[17,1]:Math.hypot(c-7,r-3)<2?[5,1]:[3,1],
    (c,r)=>(c===3&&r===3)||(c===8&&r===5)||(c===12&&r===2)?[13,1]:[3.6,1],
    (c,r)=>c<5?[11-c*1.5-(r%3),1]:[3.4,1],
    (c,r)=>c===5||c===10||r===4?[0,1]:[4+((c*7+r*3)%5),1],
    (c,r)=>c>=5&&c<=10&&r>=2&&r<=5?[7.5,1]:(c*5+r*7)%3?[6,0]:[0,1],
    (c,r)=>(c<=3&&r<=4)||(c>=6&&c<=9&&r>=3)||(c>=12&&r<=5&&r>=1)?[6.5,1]:[0,1]];
  const ctx=b=>{xd.forEach(([e,c,r])=>{const [rad,f]=XS[b](c,r);peR(e,rad);e.classList.toggle('o',!f)});xf.dataset.b=b;
    xb.forEach(x=>x.setAttribute('aria-pressed',+x.dataset.b===b));xr.forEach(p=>p.classList.toggle('off',+p.dataset.b!==b))};
  xb.forEach(x=>x.addEventListener('click',()=>ctx(+x.dataset.b)));
  const hero=$('.pe-hero',root);
  peReset=()=>{
    nb.forEach(b=>b.setAttribute('aria-pressed',b.dataset.n==='1'||b.dataset.n==='4'));role();
    press(false);
    hold=0;trav=0;cap();ctx(0);
    if(RM){h0.forEach(([e,r])=>peR(e,r));return}
    hero.classList.remove('go');h0.forEach(([e])=>peR(e,0));
    requestAnimationFrame(()=>requestAnimationFrame(()=>{hero.classList.add('go');h0.forEach(([e,r])=>peR(e,r))}));
  };
  peReset();
}
/* Technology: one object for the page, the black monolith (system capability). Every mechanism is a still; the entry lets the stable
   work arrive at the monolith once, then rests */
let tcReset=null;
function tcInit(root){
  if(tcReset)return relBackNow?undefined:tcReset();
  const hero=$('.tc-hero',root);
  tcReset=()=>{
    if(RM){hero.classList.add('go');return}
    hero.classList.remove('go');requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('go')));
  };
  tcReset();
}
/* Decisions: every frame is a resolved still; nothing to start, the page reads the same with or without motion */
function dcInit(){}
/* Delivery: one order followed through resolved stills; nothing to start, the argument is complete without motion */
function dlInit(){}
/* Commercial Architecture. One drawing carries the page: an offer (a solid block) and the decisions around it (plates), in isometric
   projection. It closes around the offer, slips out of line, collides on one piece of ground, piles over the edge of an agreement, is read
   against one account and finally re-set; then the whole structure opens into three questions. Each state is a business state */
const CA_PL=[
  {n:'What is included',e:'grew with every request',x:-60,y:-196,w:120,d:128,l:[0,-176],S:[-30,-90,110,-20],H:[-8,-30,22,-5]},
  {n:'Who sells it',e:'changed when a partner came in',x:-196,y:-60,w:128,d:120,l:[-176,0],S:[-110,30,40,14],H:[-20,10,36,3]},
  {n:'How it is bought',e:'set years ago, to enter the market',x:68,y:-60,w:128,d:120,l:[176,0],S:[110,-20,70,16],H:[30,6,-2,4]},
  {n:'What is agreed',e:'given to one large customer, then to everyone',x:-60,y:68,w:120,d:128,l:[0,176],S:[30,100,90,-15],H:[6,34,10,-7]}];
const CA_BASE={n:'What it earns',e:'reviewed once a year',x:-214,y:-214,w:428,d:428,z0:-16,t:8,l:[150,150],S:[0,0,-70,6],H:[16,-8,-12,2.5]};
/* a small isometric kit: plates with a top, two visible sides and an optional tilt; boxes; HTML labels pinned onto the drawing */
function caKit(svg,vb){
  const ns='http://www.w3.org/2000/svg',C30=Math.cos(Math.PI/6);
  const P=(x,y,z)=>[(x-y)*C30,(x+y)*.5-z],pts=a=>a.map(q=>q.map(v=>v.toFixed(1)).join(',')).join(' ');
  const mk=(t,c,par)=>{const e=document.createElementNS(ns,t);if(c)e.setAttribute('class',c);(par||svg).appendChild(e);return e};
  const plate=(cls,par)=>{const g=mk('g',cls,par);return {g,b:mk('polygon','fb',g),s1:mk('polygon','fs',g),s2:mk('polygon','fs r',g),t:mk('polygon','ft',g)}};
  /* o: x,y,w,d,(z0,t); s: dx,dy,dz,rot,tilt (tilt lifts the plate's first edge) */
  const geo=(o,s)=>{const [dx,dy,dz,r,tl]=[s[0]||0,s[1]||0,s[2]||0,s[3]||0,s[4]||0],z=(o.z0||0)+dz,t=o.t||9,cx=o.x+o.w/2,cy=o.y+o.d/2,rot=r*Math.PI/180,co=Math.cos(rot),si=Math.sin(rot);
    const tp=(x,y)=>[cx+(x-cx)*co-(y-cy)*si+dx,cy+(x-cx)*si+(y-cy)*co+dy];
    const c=[[o.x,o.y,1],[o.x+o.w,o.y,0],[o.x+o.w,o.y+o.d,0],[o.x,o.y+o.d,1]].map(([x,y,u])=>[...tp(x,y),z+tl*u]);
    return {c,t,at:(x,y,h)=>{const q=tp(x,y);return P(q[0],q[1],z+(h==null?t:h))}}};
  const face=(e,a,b,t)=>e.setAttribute('points',pts([P(...a),P(...b),P(b[0],b[1],b[2]+t),P(a[0],a[1],a[2]+t)]));
  const set=(p,G)=>{p.b.setAttribute('points',pts(G.c.map(([x,y,z])=>P(x,y,z))));face(p.s1,G.c[3],G.c[2],G.t);face(p.s2,G.c[1],G.c[2],G.t);p.t.setAttribute('points',pts(G.c.map(([x,y,z])=>P(x,y,z+G.t))))};
  const box=(x,y,w,d,h,cls,par)=>{const g=mk('g',cls,par);[[[x,y+d,0],[x+w,y+d,0],[x+w,y+d,h],[x,y+d,h]],[[x+w,y,0],[x+w,y+d,0],[x+w,y+d,h],[x+w,y,h]],[[x,y,h],[x+w,y,h],[x+w,y+d,h],[x,y+d,h]]].forEach(f=>mk('polygon','f',g).setAttribute('points',pts(f.map(v=>P(...v)))));return g};
  const put=(e,[X,Y])=>{e.style.left=(X-vb[0])/vb[2]*100+'%';e.style.top=(Y-vb[1])/vb[3]*100+'%'};
  return {P,pts,mk,plate,geo,set,box,put};
}
let caReset=null;
function caInit(root){
  if(caReset)return caReset();
  const ov=$('#deep'),cl=x=>Math.max(0,Math.min(1,x)),mix=(a,b,t)=>a+(b-a)*t,ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  let ios=[],timers=[];
  const once=(el,fn,th)=>{const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();fn()}},{threshold:th});io.observe(el);ios.push(io)};
  const tween=(ms,fn)=>{if(RM){fn(1);return}let t0=0;const st=ts=>{if(!t0)t0=ts;const t=cl((ts-t0)/ms);fn(t);if(t<1)requestAnimationFrame(st)};requestAnimationFrame(st)};
  const lead=(l,a,b)=>{l.setAttribute('x1',a[0]);l.setAttribute('y1',a[1]);l.setAttribute('x2',b[0]);l.setAttribute('y2',b[1])};
  const sq=o=>[[o.x,o.y],[o.x+o.w,o.y],[o.x+o.w,o.y+o.d],[o.x,o.y+o.d]];

  /* ---- 1 + 2: the opening stage ---- */
  const seq=$('.ca-seq',root),stage=$('.ca-stage',root),dw=$('.ca-dw',root),sts=$$('.ca-st1',root),K=caKit($('svg',dw),[-400,-300,800,600]);
  $('svg',dw).innerHTML='';$$('.ca-lb',dw).forEach(e=>e.remove());
  const base=K.plate('bs'),sh=CA_PL.map(()=>K.mk('polygon','sh'));
  const back=[K.plate('pl'),K.plate('pl')];K.box(-60,-60,120,120,64,'cf');const front=[K.plate('pl'),K.plate('pl')],plates=[...back,...front];
  const lab=(n,e,cls)=>{const d=document.createElement('p');d.className='ca-lb'+(cls?' '+cls:'');d.setAttribute('aria-hidden','true');d.innerHTML=`<b>${n}</b>${e?`<em>${e}</em>`:''}`;dw.appendChild(d);return d};
  const lbs=[...CA_PL.map(o=>lab(o.n,o.e)),lab(CA_BASE.n,CA_BASE.e,'base')],lcore=lab('The offer','','core');K.put(lcore,K.P(0,0,64));
  const st=(o,a,b)=>[0,1,2,3].map(i=>mix(mix(o.S[i],0,a),o.H[i],b));
  /* when the drawing is small, the names stand further out, clear of the offer */
  const la=(G,o)=>{const w=dw.clientWidth,f=o===CA_BASE?(w<700?1.85:1):w<360?1.22:w<700?1.4:1;return G.at(o.l[0]*f,o.l[1]*f)};
  let intro=RM?1:0,hist=-1;
  const draw=(a,b)=>{const G=K.geo(CA_BASE,st(CA_BASE,a,b));K.set(base,G);K.put(lbs[4],la(G,CA_BASE));
    CA_PL.forEach((o,k)=>{const g=K.geo(o,st(o,a,b));K.set(plates[k],g);K.put(lbs[k],la(g,o));
      const s=sh[k],z=g.c[0][2];s.setAttribute('points',K.pts(g.c.map(([x,y])=>K.P(x,y,0))));s.style.opacity=cl(z/40)})};
  const top=()=>parseFloat(getComputedStyle(stage).top)||0;
  const prog=()=>{const R=seq.getBoundingClientRect(),o=ov.getBoundingClientRect().top,span=seq.offsetHeight-stage.offsetHeight;return span>0?cl((o+top()-R.top)/span):0};
  const frame=()=>{const p=prog();draw(ease(intro),ease(cl((p-.3)/.42)));const h=p>.45?1:0;if(h!==hist){hist=h;dw.classList.toggle('hist',!!h);sts.forEach(e=>e.classList.toggle('on',+e.dataset.s===h))}};
  let raf=0;const onScroll=()=>{if(raf||root.hidden)return;raf=requestAnimationFrame(()=>{raf=0;frame()})};
  ov.addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);

  /* ---- frame 3: two good decisions on one piece of ground. The region: direct sales slide in over the partner's plate, and where
     they overlap the ground is hatched. The scope: extra requests pile up on the agreed scope until the stack leans over its edge.
     The words stand beside the drawing: the filled name belongs to the solid plate, the outlined name to the plate drawn in outline ---- */
  const cf=$('.ca-cf',root),cx=$('.ca-cx',root),K2=caKit($('svg',cx),[-330,-280,660,480]),cb=$$('.ca-cf .ca-t',root);
  $('svg',cx).innerHTML='<defs><pattern id="caHatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="10" height="10" fill="#000"/><line x1="0" y1="0" x2="0" y2="10" stroke="#fff" stroke-width="3"/></pattern></defs>';
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
    /* the contested ground: where the new route lies over the partner's plate */
    const x0=Math.max(PA.x,PB.x+dx),x1=Math.min(PA.x+PA.w,PB.x+PB.w+dx),y0=Math.max(PA.y,PB.y+dy),y1=Math.min(PA.y+PA.d,PB.y+PB.d+dy),on=cl((t-.6)/.4);
    ht.setAttribute('points',x1>x0&&y1>y0?K2.pts([[x0,y0],[x1,y0],[x1,y1],[x0,y1]].map(([x,y])=>K2.P(x,y,PA.t))):'');ht.style.opacity=on};
  const sit1=t=>{const ga=K2.geo(SA,[0,0,0,0,0]);K2.set(A1,ga);eg.setAttribute('points',K2.pts(ga.c.map(([x,y,z])=>K2.P(x,y,z+SA.t))));
    E.forEach((p,i)=>{const d=cl((t-i*.12)/.36),e=ease(d);K2.set(p,K2.geo(SE,[EP[i][0],EP[i][1],mix(300,EP[i][2],e),EP[i][3],0]));p.g.style.opacity=d>0?1:0})};
  const showSit=(k,anim)=>{cf.dataset.s=k;cb.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.s===k)));$$('.sr[data-s]',cx).forEach(p=>{p.hidden=p.dataset.s!==k});
    const f=k==='0'?sit0:sit1;if(anim)tween(1600,f);else f(1)};
  cb.forEach(b=>b.addEventListener('click',()=>showSit(b.dataset.s,true)));

  /* ---- frame 4: one year read from left to right. A special price in March (a small black plate), dots that grow on their way,
     and in December the loudest thing in the frame; a thin line runs back to March ---- */
  const yr=$('.ca-yr',root),ysv=$('svg',yr),mos=$$('.ca-mo',yr),yback=$('.ca-back',yr);
  ysv.innerHTML='';
  const K3=caKit(ysv,[0,0,1200,420]),yg=K3.mk('g','');yg.setAttribute('transform','translate(150 188) scale(.62)');
  const mp=K3.plate('pk',yg);K3.set(mp,K3.geo({x:-80,y:-80,w:160,d:160,t:22},[0,0,0,0,0]));
  const YS=[250,200],YC=[470,292],YE=[780,190],N3=30;
  const qz=t=>{const u=1-t;return [u*u*YS[0]+2*u*t*YC[0]+t*t*YE[0],u*u*YS[1]+2*u*t*YC[1]+t*t*YE[1]]};
  const dts=[...Array(N3)].map(()=>K3.mk('circle','yd'));
  const bl=K3.mk('path','yb');bl.setAttribute('d','M1180 404 L 120 404');const bh=K3.mk('polygon','yh');bh.setAttribute('points','108,404 126,396 126,412');
  bl.style.strokeDasharray='1000';
  const MP=[[150,262],[qz(.28)[0],qz(.28)[1]-10],[qz(.74)[0],qz(.74)[1]-18],[1200,196]];
  mos.forEach((m,i)=>{m.style.left=MP[i][0]/12+'%';m.style.top=MP[i][1]/4.2+'%'});
  /* on a phone the year is cropped to the path itself; the words follow below as a list */
  const yfit=()=>ysv.setAttribute('viewBox',MOB()?'90 140 790 190':'0 0 1200 420');yfit();addEventListener('resize',yfit);
  const year=t=>{dts.forEach((d,i)=>{const u=i/(N3-1),q=qz(u);d.setAttribute('cx',q[0]);d.setAttribute('cy',q[1]);d.setAttribute('r',mix(2.6,19,u*u));d.style.opacity=t>=u*.9?1:0});
    mos.forEach((m,i)=>{m.style.opacity=t>=[0,.26,.7,.92][i]?1:0});const r=cl((t-1)/.4);bl.style.strokeDashoffset=1000*(1-r);bh.style.opacity=r>.95?1:0;yback.style.opacity=r>.6?1:0};

  /* ---- frame 5: one account. What it brings in stands as one tall solid column. Read together with everything agreed around the
     price, the column stays only as an outline, the volume it appears to have; what stays solid is what it keeps. The conditions are
     named beside it, each with what it does, so the drawing never suggests a sum ---- */
  const ac=$('.ca-ac',root),ax=$('.ca-ax',root),K4=caKit($('svg',ax),[-280,-340,800,520]),vb=$$('.ca-ac .ca-t',root),vs=$$('.ca-vs',ax);
  $('svg',ax).innerHTML='';
  const GRD={x:-150,y:-150,w:300,d:300,z0:-10,t:10},COL={x:-78,y:-78,w:156,d:156},HI=236,LO=58;
  const gp=K4.plate('gr');K4.set(gp,K4.geo(GRD,[0,0,0,0,0]));
  const core=K4.plate('sw'),ghost=K4.plate('cg');
  const akAll=$('.ca-ak[data-k="all"]',ax),akK=$('.ca-ak[data-k="keep"]',ax),lA=K4.mk('line','ld'),lK=K4.mk('line','ld');
  const acc=r=>{const e=ease(r),h=mix(HI,LO,e);
    K4.set(core,K4.geo({...COL,t:h},[0,0,0,0,0]));K4.set(ghost,K4.geo({...COL,t:HI},[0,0,0,0,0]));ghost.g.style.opacity=e;
    const tA=K4.P(78,-78,HI),tK=K4.P(78,-78,h);
    K4.put(akAll,[172,tA[1]]);lead(lA,[164,tA[1]],[tA[0]+6,tA[1]]);
    K4.put(akK,[172,tK[1]+34]);lead(lK,[164,tK[1]+34],[tA[0]+6,tK[1]+34]);lK.style.opacity=e;
    ac.classList.toggle('kept',e>.5)};
  let auto=[];const stopAuto=()=>{auto.forEach(clearTimeout);auto=[]};
  const showView=(k,anim)=>{ac.dataset.v=k;vb.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===k)));vs.forEach(p=>{p.hidden=p.dataset.v!==k});
    const from=k==='1'?0:1,to=k==='1'?1:0;if(anim)tween(1500,t=>acc(mix(from,to,t)));else acc(to)};
  vb.forEach(b=>b.addEventListener('click',()=>{stopAuto();showView(b.dataset.v,true);if(MOB()){const t=ax.getBoundingClientRect().top-ov.getBoundingClientRect().top;if(t<0)ov.scrollTo({top:ov.scrollTop+t-90,behavior:RM?'auto':'smooth'})}}));

  /* ---- frame 6: the structure re-set. Everything level and flush with the offer; the base smaller by choice, its former size traced ---- */
  const rz=$('.ca-rz',root),K5=caKit($('svg',rz),[-520,-270,1040,560]);
  $('svg',rz).innerHTML='';
  const was=K5.mk('polygon','sh');was.setAttribute('points',K5.pts(sq({x:-250,y:-250,w:500,d:500}).map(([x,y])=>K5.P(x,y,-8))));
  const R5={in:{x:-60,y:-196,w:120,d:136},se:{x:-196,y:-60,w:136,d:120},bu:{x:60,y:-60,w:136,d:120},ag:{x:-60,y:60,w:120,d:136}};
  const b5=K5.plate('bs');K5.set(b5,K5.geo({x:-196,y:-196,w:392,d:392,z0:-16,t:16},[0,0,0,0,0]));
  const q5={};['in','se'].forEach(k=>{q5[k]=K5.plate('pl');K5.set(q5[k],K5.geo({...R5[k],t:16},[0,0,0,0,0]))});
  K5.box(-60,-60,120,120,80,'cf');
  ['bu','ag'].forEach(k=>{q5[k]=K5.plate('pl');K5.set(q5[k],K5.geo({...R5[k],t:16},[0,0,0,0,0]))});
  const at5=k=>K5.geo({...R5[k],t:16},[0,0,0,0,0]).at(R5[k].x+R5[k].w/2,R5[k].y+R5[k].d/2);
  const RL={se:[[-330,-150],at5('se')],in:[[330,-200],at5('in')],ag:[[-330,170],at5('ag')],bu:[[360,20],at5('bu')],ea:[[330,230],K5.P(150,196,0)]};
  Object.entries(RL).forEach(([k,[t,a]])=>{const e=$(`.ca-rl[data-k="${k}"]`,rz);K5.put(e,t);e.classList.toggle('l',t[0]<0);lead(K5.mk('line','ld'),[t[0]+(t[0]<0?12:-12),t[1]],a)});

  /* ---- frame 7: the handoff. A small offer block branches into the three questions; the chosen branch comes forward ---- */
  const brw=$('.ca-brw',root),bs=$('.ca-brs',root),nx=$$('.ca-nx',root);let bls=[];
  const branch=()=>{if(MOB()||root.hidden)return;const R=brw.getBoundingClientRect(),W=R.width,H=R.height;if(!W)return;
    bs.style.width=W+'px';bs.style.height=H+'px';bs.setAttribute('viewBox',`0 0 ${W} ${H}`);bs.innerHTML='';
    const K6=caKit(bs,[0,0,W,H]),g=K6.mk('g','');const ox=W*.12,oy=H*.78;g.setAttribute('transform',`translate(${ox} ${oy}) scale(.55)`);K6.box(-60,-60,120,120,64,'cw',g);
    bls=nx.map(b=>{const r=$('.n',b).getBoundingClientRect(),x=r.left-R.left-14,y=r.top-R.top+r.height/2,p=K6.mk('path','bl');
      p.setAttribute('d',`M${ox+40} ${oy-20} C ${ox+W*.22} ${oy-20}, ${x-W*.18} ${y}, ${x} ${y}`);return p});
    nx.forEach((b,i)=>bls[i].classList.toggle('on',b.matches(':hover,:focus-visible')))};
  nx.forEach((b,i)=>['mouseenter','mouseleave','focus','blur'].forEach(ev=>b.addEventListener(ev,()=>{if(bls[i])nx.forEach((c,j)=>bls[j]&&bls[j].classList.toggle('on',c.matches(':hover,:focus-visible')))})));
  addEventListener('resize',()=>{clearTimeout(branch.t);branch.t=setTimeout(branch,120)});

  caReset=()=>{
    ios.forEach(i=>i.disconnect());ios=[];stopAuto();hist=-1;
    showSit('0',false);showView(RM?'1':'0',false);year(1.4);
    intro=RM?1:0;frame();tween(1750,t=>{intro=cl((t*1750-250)/1500);frame()});
    requestAnimationFrame(()=>setTimeout(branch,60));
    if(RM)return;
    sit0(0);year(0);
    once(cx,()=>tween(1600,sit0),.45);
    once(yr,()=>tween(3000,t=>year(t*1.4)),.4);
    /* the account is read once by itself, so the point never hides behind a click */
    once(ax,()=>{stopAuto();auto=[setTimeout(()=>showView('1',true),1400)]},.45);
    once($('.ca-br2',root),branch,.1);
  };
  caReset();
}
/* ---------- Deep Dive D.1 Revenue (refinement pass, 29.09.2026). Words, rules, bands and a stack, each where its meaning needs it.
   Sizes and band widths say more or less, never an exact share: there are no amounts and no percentages behind them ---------- */
let rvReset=null;
const RV_NARROW=matchMedia('(max-width:760px),(min-width:761px) and (max-width:1100px) and (orientation:portrait)');
function rvInit(root){
  if(rvReset)return rvReset();
  const NS='http://www.w3.org/2000/svg';
  const mk=(p,tag,a)=>{const e=document.createElementNS(NS,tag);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e};
  const stage=(fig,W,H)=>{const s=$('svg',fig);s.setAttribute('viewBox',`0 0 ${W} ${H}`);s.innerHTML='';fig.style.setProperty('--ar',W/H);return s};
  /* on a phone the words that follow a drawing sit below it, so a word placed in the drawing is measured from the drawing */
  const put=(el,x,y,W,H)=>{el.style.left=(x/W*100)+'%';const f=el.closest('figure');
    el.style.top=RV_NARROW.matches&&f?(y*f.clientWidth/W)+'px':(y/H*100)+'%'};
  const hatch=(s,id,w)=>{const d=$('defs',s)||mk(s,'defs',{}),p=mk(d,'pattern',{id,width:9,height:9,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'});
    mk(p,'rect',{width:9,height:9,fill:'#fff'});mk(p,'rect',{width:w,height:9,fill:'#000'})};

  /* ---- 01: the title is the total. Its capitals are measured so the four layers sit exactly inside them; each layer is named at its end ---- */
  /* measure the capitals of a word set in the page face, so layers can sit exactly inside them */
  const capBox=(fs)=>{const c=document.createElement('canvas').getContext('2d');c.font='800 100px "Mona Sans"';if('letterSpacing' in c)c.letterSpacing='-4.5px';
    const m=c.measureText('REVENUE'),k=fs/100,base=(fs-(m.fontBoundingBoxAscent+m.fontBoundingBoxDescent)*k)/2+m.fontBoundingBoxAscent*k;
    return {w:m.width,cap:m.actualBoundingBoxAscent,top:base-m.actualBoundingBoxAscent*k,h:m.actualBoundingBoxAscent*k}};
  /* layers top to bottom: [key or null for a gap, weight, colour]; returns the gradient and the centre of each keyed layer */
  const layers=(fs,L)=>{const b=capBox(fs),tot=L.reduce((a,l)=>a+l[1],0);let y=b.top;const st=[`transparent 0 ${y}px`],mid={};
    L.forEach(([id,v,col])=>{const h=v/tot*b.h;st.push(`${id!=null?col:'transparent'} ${y}px ${y+h}px`);if(id!=null)mid[id]=y+h/2;y+=h});
    st.push(`transparent ${y}px 100%`);return {g:`linear-gradient(180deg,${st.join(',')})`,mid}};
  const hw=$('.rv-word',root),wd=$('.rv-wd',root),parts=$$('.rv-parts li',root);
  const drawWord=()=>{const cw=hw.clientWidth;if(!cw)return;const b=capBox(100);
    const n=RV_NARROW.matches,fs=n?cw*.99*100/b.w:Math.min(cw*.76*100/b.w,innerHeight*.3*100/b.cap);wd.style.setProperty('--wf',fs+'px');
    const r=layers(fs,[['3',12,'#000'],[null,4],['2',19,'#000'],[null,4],['1',25,'#000'],[null,4],['0',36,'#000']]);
    wd.style.setProperty('--bands',r.g);
    /* on a phone the names follow the word in the order of its layers */
    if(n){parts.forEach(li=>{li.style.top=''});hw.style.height='';return}
    parts.forEach(li=>{li.style.top=r.mid[li.dataset.k]+'px'});
    hw.style.setProperty('--px',(b.w*fs/100+Math.max(14,fs*.08))+'px');hw.style.height=fs+'px'};
  /* ---- 02: one, many, three on one shared rule. The three words share one size, fitted together to the full width and the free height ---- */
  const om=$('.rv-om',root),oc=$('.rv-oc',root),ow=$$('.rv-om p',root),os=$$('.rv-om span',root);
  const fitOne=()=>{const sec=om.parentElement,cs=getComputedStyle(sec);
    /* on a phone the words stand one above the other, sized so the widest fills the line */
    if(RV_NARROW.matches){om.style.gridTemplateColumns=oc.style.gridTemplateColumns='';const w=sec.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)-24;if(w<=0)return;
      let lo=20,hi=200;for(let i=0;i<14;i++){const m=(lo+hi)/2;om.style.setProperty('--of',m+'px');if(Math.max(...os.map(e=>e.offsetWidth))<=w)lo=m;else hi=m}
      om.style.setProperty('--of',Math.min(lo,120)+'px');return}
    const W=om.clientWidth;if(!W)return;
    om.style.setProperty('--of','20px');om.style.gridTemplateColumns='auto auto auto';
    const avail=sec.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-[...sec.children].reduce((a,e)=>a+(e===om?0:e.offsetHeight+parseFloat(getComputedStyle(e).marginTop)),0)-24;
    const gap=Math.max(36,W*.05);om.style.setProperty('--og',gap+'px');oc.style.setProperty('--og',gap+'px');
    let lo=20,hi=900;for(let i=0;i<18;i++){const m=(lo+hi)/2;om.style.setProperty('--of',m+'px');
      const ws=os.reduce((a,e)=>a+e.offsetWidth,0);if(ws+2*gap<=W&&ow[0].offsetHeight<=avail)lo=m;else hi=m}
    om.style.setProperty('--of',lo+'px');const ws=os.map(e=>e.offsetWidth),x=(W-ws.reduce((a,b)=>a+b)-2*gap)/3,t=ws.map(w=>(w+x)+'px').join(' ');
    om.style.gridTemplateColumns=oc.style.gridTemplateColumns=t};

  /* ---- 04: last year to this year. Grey and level for the sources that held, white and crossing for the two that moved ---- */
  const sl=$('.rv-slp',root);
  const drawSlope=()=>{const W=sl.clientWidth,H=sl.clientHeight;if(!W||!H)return;const s=$('svg',sl);s.setAttribute('viewBox',`0 0 ${W} ${H}`);s.innerHTML='';
    $$('p',sl).forEach(e=>e.remove());
    const T=(c,x,y,h)=>{const e=document.createElement('p');e.className=c;e.setAttribute('aria-hidden','true');e.style.left=x+'px';e.style.top=y+'px';e.innerHTML=h;sl.appendChild(e)};
    const tw=['sg','sm'].map(c=>{const e=document.createElement('p');e.className=c;e.textContent=c==='sg'?'Seasonal sales':'Repeat business';e.style.visibility='hidden';sl.appendChild(e);const w=e.offsetWidth;e.remove();return w});
    /* on a phone the lines run the full width and each name sits just above its end */
    const n=RV_NARROW.matches,L=n?' up':' sl',Rr=n?' up r':'';
    const lx=n?7:Math.max(Math.max(...tw)+13,W*.2),rx=n?W-7:W-Math.max(158,W*.26),y0=n?116:80,y1=H-(n?34:18),row=i=>y0+(y1-y0)*i/5,GR='#3a3a3a',MG='#7a7a7a';
    const ox=n?-7:-13,rox=n?7:15;
    T('sy',n?0:lx,0,'Last year');T('sy'+(n?' r':''),n?W:rx,0,'This year');
    mk(s,'line',{x1:lx,x2:rx,y1:37,y2:37,stroke:GR,'stroke-width':1});T('stt',(lx+rx)/2,37,'<b>Total</b><i>nearly unchanged</i>');
    [lx,rx].forEach(x=>mk(s,'line',{x1:x,x2:x,y1:22,y2:H,stroke:GR,'stroke-width':1}));
    [[0,'Major account'],[5,'Seasonal sales']].forEach(([r,nm])=>{mk(s,'line',{x1:lx,x2:rx,y1:row(r),y2:row(r),stroke:MG,'stroke-width':1.5});
      [lx,rx].forEach(x=>mk(s,'circle',{cx:x,cy:row(r),r:3.5,fill:MG}));T('sg'+(n&&r?' dn':L),lx+ox,row(r),nm);T('sg'+(n?(r?' dn r':Rr):Rr),rx+rox,row(r),nm)});
    [[1,3.4,'Repeat business','Less'],[4,1.6,'New business','Far more']].forEach(([a,b,nm,t])=>{
      mk(s,'line',{x1:lx,x2:rx,y1:row(a),y2:row(b),stroke:'#fff','stroke-width':4.5,'stroke-linecap':'round'});
      mk(s,'circle',{cx:lx,cy:row(a),r:6,fill:'#fff'});mk(s,'circle',{cx:rx,cy:row(b),r:7,fill:'#fff'});
      /* on a phone each name goes on the side of its point that the line leaves free */
      T('sm'+(n?(b>a?' up':' dn'):L),lx+ox,row(a),nm);T('se'+(n?(a>b?' up r':' dn r'):''),rx+rox,row(b),nm+'<small>'+t+'</small>')})};
  /* the hypothesis selector: tabs, one question at a time; arrows, Home and End move between them */
  const hts=$$('.rv-tabs [role="tab"]',root),hps=$$('.rv-hyq',root);
  const pickH=(i,f)=>{hts.forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1});hps.forEach((p,j)=>{p.hidden=i!==j});if(f)hts[i].focus()};
  hts.forEach((b,i)=>{b.addEventListener('click',()=>pickH(i));b.addEventListener('keydown',e=>{const n=hts.length,k=e.key;
    const j=k==='ArrowRight'?(i+1)%n:k==='ArrowLeft'?(i+n-1)%n:k==='Home'?0:k==='End'?n-1:-1;if(j<0)return;e.preventDefault();pickH(j,true)})});

  /* ---- 03 + 08: one year, four sources. The same state is drawn once large and three times as a re-reading ---- */
  const YR=[[26,26,27,27,28,28,28,29,29,29,30,30],[18,20,22,20,21,23,22,21,22,20,21,24],[4,6,16,22,8,4,4,6,18,24,10,4],[2,5,1,3,6,2,8,9,5,11,7,12]];
  const TD=700,cum=[Array(12).fill(0)];YR.forEach((v,j)=>cum.push(v.map((a,i)=>cum[j][i]+a)));
  const X=i=>50+100*i;
  const year=(y0,k)=>{const Y=v=>y0-v*k;
    const curve=(vals,back)=>{const P=[[0,vals[0]],...vals.map((v,i)=>[X(i),v]),[1200,vals[11]]].map(([x,v])=>[x,Y(v)]);if(back)P.reverse();
      let d='';P.forEach((p,i)=>{if(!i){d+=`${p[0]} ${p[1]}`;return}const a=P[Math.max(0,i-2)],b=P[i-1],c=P[Math.min(P.length-1,i+1)];
        d+=` C ${[b[0]+(p[0]-a[0])/6,b[1]+(p[1]-a[1])/6]} ${[p[0]-(c[0]-b[0])/6,p[1]-(c[1]-b[1])/6]} ${p}`});return d};
    return {Y,band:j=>`M ${curve(cum[j+1])} L ${curve(cum[j],1)} Z`,mid:(j,i)=>Y((cum[j][i]+cum[j+1][i])/2)}};
  /* how each source looks ahead of today: agreed, likely, likely, hoped for */
  const FUT=[{fill:'url(#H)',stroke:'#000','stroke-width':1.6},{fill:'#fff',stroke:'#000','stroke-width':2.2},{fill:'#fff',stroke:'#000','stroke-width':2.2},{fill:'#fff',stroke:'#000','stroke-width':2,'stroke-dasharray':'2 6','stroke-linecap':'round'}];
  const drawBands=(s,g,id,on,W,H)=>{hatch(s,id+'H',2);const d=$('defs',s);
    [[id+'P',0,TD],[id+'N',TD,1200]].forEach(([c,a,b])=>{const cp=mk(d,'clipPath',{id:c});mk(cp,'rect',{x:a,y:0,width:b-a,height:H})});
    const past=mk(s,'g',{'clip-path':`url(#${id}P)`}),next=mk(s,'g',{'clip-path':`url(#${id}N)`});
    [0,1,2,3].forEach(j=>{const hp=on.past.includes(j),hf=on.next.includes(j);
      mk(past,'path',{d:g.band(j),fill:hp?'#000':'#e3e3e0',stroke:'#fff','stroke-width':4.5,'stroke-linejoin':'round'});
      const f={...FUT[j]};if(f.fill==='url(#H)')f.fill=`url(#${id}H)`;
      mk(next,'path',hf?{d:g.band(j),...f,'stroke-linejoin':'round'}:{d:g.band(j),fill:'#fff',stroke:'#d2d2cf','stroke-width':1.6,'stroke-linejoin':'round'})});
    mk(s,'line',{x1:TD,y1:g.Y(cum[4].reduce((a,b)=>Math.max(a,b)))-30,x2:TD,y2:g.Y(0),stroke:'#000','stroke-width':2});
    mk(s,'line',{x1:0,y1:g.Y(0)+1,x2:1200,y2:g.Y(0)+1,stroke:'#000','stroke-width':1.5})};

  const yf=$('.rv-yf',root);
  const drawYear=()=>{
    const n=RV_NARROW.matches,W=n?1200:1600,H=n?780:500,y0=H-8,k=n?7.6:4.3,s=stage(yf,W,H),g=year(y0,k);
    drawBands(s,g,'rvY',{past:[0,1,2,3],next:[0,1,2,3]},W,H);
    const lb=$$('.rv-lb',yf);lb.forEach(e=>e.className='rv-lb');
    put(lb[0],18,g.mid(0,0),W,H);put(lb[1],18,g.mid(1,0),W,H);
    lb[2].classList.add('c');put(lb[2],X(3)-10,g.mid(2,3)+(n?8:0),W,H);
    lb[3].classList.add('o');if(n){lb[3].classList.add('l');put(lb[3],TD-12*W/(yf.clientWidth||W),g.Y(Math.max(...cum[4].slice(0,7)))-12,W,H)}else put(lb[3],X(4)+32,g.Y(cum[4][6])-16,W,H);
    /* EARNED and TODAY meet at the line: behind it what has come in, ahead of it each source in its own state */
    /* on a phone new business is named where EARNED stands on a wide screen, and EARNED and TODAY move one line up */
    const top=g.Y(Math.max(...cum[4].slice(0,7)))-20,up=n?26*W/(yf.clientWidth||W):0;
    put($('.rv-st[data-k="in"]',yf),TD,top-up,W,H);put($('.rv-today',yf),TD,top-up,W,H);
    const fx=(TD+1200)/2;
    put($('.rv-st[data-k="0"]',yf),fx,g.mid(0,9),W,H);
    put($('.rv-st[data-k="1"]',yf),fx,g.mid(1,9),W,H);
    if(n)put($('.rv-st[data-k="3"]',yf),1192,g.mid(3,11),W,H);else put($('.rv-st[data-k="3"]',yf),X(10)+6,g.Y(cum[4][10])-14,W,H);
    const mo=$('.rv-mo',yf);mo.style.width=(1200/W*100)+'%';mo.style.top=n?'':(y0/H*100)+'%';
    if(n)return;
    /* Lena's question sits over what is still to come; the fact is tied to the confirmed part it describes */
    const ny=g.mid(0,11);mk(s,'line',{x1:1206,y1:ny,x2:1234,y2:ny,stroke:'#000','stroke-width':2});
    put($('.rv-note',yf),1246,ny,W,H);put($('.rv-fq',yf),1246,g.mid(1,11)+10,W,H);
  };
  const READ=[{past:[0,1,2,3],next:[0]},{past:[3],next:[3]},{past:[0,3],next:[0,3]}];
  const drawRe=()=>$$('.rv-rq',root).forEach(f=>{const q=+f.dataset.q,W=1200,H=560,s=stage(f,W,H);drawBands(s,year(H-8,6),'rvR'+q,READ[q],W,H)});

  /* ---- 04: last year as a grey trace behind each word, this year in white over it ---- */

  /* ---- 07: the stack. This year's sources rest on one word; last year's line sits below the top, the top without it below last year ---- */
  const dp=$('.rv-dep',root),sg=$('.rv-stage',dp),st=$('.rv-stack',dp),base=$('.rv-base',dp),tb=$$('.rv-t',dp),vs=$$('.rv-vs',dp);
  const gauge=$('.rv-gauge',dp),tk={};$$('.rv-tk',dp).forEach(e=>{tk[e.dataset.k]=e});
  let nh=0,full=0;
  /* the scale beside the stack: this year at its top, last year below it, the base alone lower still */
  const layoutDep=()=>{if(root.hidden||!sg.clientWidth)return;const off=dp.dataset.v==='1';
    /* the height is kept by the scale itself, so the drawing keeps its size when the win is taken away */
    if(!off){nh=base.offsetHeight;full=st.offsetHeight;gauge.style.minHeight=full+'px'}
    const rest=full-nh;
    tk.top.style.bottom=full+'px';tk.ly.style.bottom=(rest+nh*.42)+'px';tk.wo.style.bottom=rest+'px';
    /* without the win the stack is no longer this year: its mark leaves with it, and Without it names what remains */
    tk.top.style.opacity=off?0:1};
  const showDep=k=>{dp.dataset.v=k;tb.forEach(b=>b.setAttribute('aria-pressed',String(k==='1')));vs.forEach(p=>{p.hidden=p.dataset.v!==k});layoutDep()};
  tb.forEach(b=>b.addEventListener('click',()=>showDep(dp.dataset.v==='1'?'0':'1')));

  const drawAll=()=>{if(root.hidden)return;drawWord();fitOne();drawSlope();drawYear();drawRe();layoutDep()};
  let rz=0;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(drawAll,140)});
  /* measure again whenever the page actually gets its width (it can be drawn while still hidden) and whenever the stack changes height,
     so the scale beside it never keeps the positions of a moment when nothing was measurable */
  if('ResizeObserver' in window){let lw=0;new ResizeObserver(()=>{const w=root.clientWidth;if(w&&w!==lw){lw=w;drawAll()}}).observe(root);
    new ResizeObserver(()=>layoutDep()).observe(st)}
  RV_NARROW.addEventListener&&RV_NARROW.addEventListener('change',drawAll);
  document.fonts&&document.fonts.ready.then(drawAll);

  rvReset=()=>{showDep('0');pickH(0);drawAll();requestAnimationFrame(()=>setTimeout(drawAll,80))};
  rvReset();
}
/* ---- D.2 Customers: five composed frames (S01 to S04, S07). The page is static first; when script runs, the parts of each frame arrive once
   as it enters the view, and again after the page is reopened. Nothing is scroll-jacked, nothing is hidden without script. ---- */
let cuReset=null;
function cuInit(root){
  if(cuReset)return cuReset();
  const frs=$$('.cu-fr, .cu-br',root),still=matchMedia('(prefers-reduced-motion: reduce)');
  const on=()=>root.classList.toggle('cu-anim',!still.matches);
  const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-in')}),{root:$('#deep'),threshold:.08}):null;
  cuReset=()=>{frs.forEach(f=>f.classList.remove('is-in'));on();if(io){io.disconnect();frs.forEach(f=>io.observe(f))}else frs.forEach(f=>f.classList.add('is-in'))};
  cuReset();
}
/* ---------- Deep Dive D.3 Partnerships (30.09.2026). One page like a book: the stage is drawn at 970 x 5700 and scaled to the window (one frame never taller than the window).
   The frames come in as the visitor reaches them; the ribbon in the pressure frame and the line from the operating model to the closing dot are drawn by the scroll itself. ---------- */
let paReset=null;
function paInit(root){
  if(paReset)return paReset();
  const deep=$('#deep'),wrap=$('.pa-w',root),st=$('.pa-s',root),pm=$('.pa-m',root),still=matchMedia('(prefers-reduced-motion: reduce)'),isM=()=>RV_NARROW.matches;
  const SEC=[0,510,1020,1530,2040,2550,3060,3570,4080,4590,5100],cn=$('.pa-cn',root),cs=cn.ownerSVGElement,SY=+cs.dataset.sy,END=+cs.dataset.end,RC=+cs.dataset.rc;
  const rb=$$('.pa-rbp',root),cnr=[$('.pa-cnr0',root),$('.pa-cnr1',root)],br=$('.pa-br',root),fired=new Set(),cl=x=>Math.max(0,Math.min(1,x)),ss=x=>x*x*(3-2*x);
  const L1=946-(RC+8),L2=END-SY,L3=946-(RC+19),LT=L1+L2+L3;
  let k=1,raf=0,G=null,io=null;
  const size=()=>{if(root.hidden||isM())return;const w=wrap.clientWidth,bar=parseFloat(getComputedStyle(root).getPropertyValue('--bar'))||74;
    k=Math.max(.25,Math.min(w/970,(deep.clientHeight-bar)/510));root.style.setProperty('--k',k);st.style.setProperty('--x',((w-970*k)/2)+'px')};
  const fire=b=>{if(fired.has(b))return;fired.add(b);$$(`[data-b="${b}"]`,root).forEach(e=>e.classList.add('is-in'))};
  /* phone: real-size type fitted to the column, the ribbon and the thread measured from the page as it is laid out */
  const NS='http://www.w3.org/2000/svg';
  const layM=()=>{if(root.hidden||!isM())return;const W=pm.clientWidth;if(!W)return;
    $$('[data-fit]',pm).forEach(el=>{const fw=$('.fw',el);if(!fw)return;el.style.fontSize='100px';const w=fw.getBoundingClientRect().width;if(w)el.style.fontSize=(100*(W-40)*(parseFloat(el.dataset.fit)||1)/w)+'px'});
    const jl=$('.pm-jl',pm),jm=$('.pm-jm',pm);if(jl&&jm){const f=parseFloat(jl.style.fontSize);if(f){jl.style.fontSize=f*.98+'px';jm.style.fontSize=f*.98+'px'}}
    const rp=pm.getBoundingClientRect(),H=pm.offsetHeight,at=e=>{const r=e.getBoundingClientRect();return{x:r.left-rp.left,y:r.top-rp.top,w:r.width,h:r.height}};
    const d=at($('#pmDot',pm)),e=at($('#pmEnd',pm)),sx=d.x+d.w/2,sy=d.y+d.h*.8,xr=W-9,ex=e.x,ey=e.y;
    const c=$('.pm-cn',pm);c.setAttribute('viewBox',`0 0 ${W} ${H}`);const p=$('.pm-cnp',c);p.setAttribute('d',`M${sx+7} ${sy} H ${xr} V ${ey} H ${ex+19}`);p.setAttribute('pathLength',1);
    const q=$$('rect',c);q[0].setAttribute('x',xr-3.5);q[0].setAttribute('y',sy-3.5);q[1].setAttribute('x',xr-3.5);q[1].setAttribute('y',ey-3.5);
    /* ribbon: light grey in the white frame, full white at the edge to the black */
    const s6=$('.pm-s6',pm),r6=s6.getBoundingClientRect(),sg=at($('.pm-sgs',pm)),ln=at($('.pm-lena',pm)),edge=$('.pm-s6b',pm).offsetTop,y0=sg.y-(r6.top-rp.top)-6,y1=ln.y-(r6.top-rp.top)+ln.h/2,W6=s6.clientWidth,H6=s6.offsetHeight;
    const svg=$('.pm-rib',pm);svg.setAttribute('viewBox',`0 0 ${W6} ${H6}`);
    let s=`<defs><linearGradient id="pmg" gradientUnits="userSpaceOnUse" x1="0" y1="${edge-26}" x2="0" y2="${edge+6}"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#fff"/></linearGradient><mask id="pmm" maskUnits="userSpaceOnUse" x="0" y="0" width="${W6}" height="${H6}"><rect width="${W6}" height="${H6}" fill="url(#pmg)"/></mask></defs><g mask="url(#pmm)">`;
    for(let i=0;i<26;i++){let dd='';for(let y=y0;y<=y1;y+=6){const t=cl((y-y0)/(y1-y0)),xc=W6*(.78+.06*ss(t)),sp=(30-9*ss(t))/12.5*(i-12.5),am=10*(1-ss(cl((t-.3)/.5)));
      dd+=(dd?'L':'M')+(xc+sp+am*Math.sin(y*.03+i*.3)+am*.35*Math.sin(y*.07+i*.8)).toFixed(1)+' '+y.toFixed(1)+' '}
      s+=`<path class="pm-rp" d="${dd}" fill="none" stroke="#fff" stroke-width="1" opacity="${(.4+.6*Math.sin(Math.PI*i/25)).toFixed(2)}" pathLength="1"/>`}
    svg.innerHTML=s+'</g>';G={sx,sy,xr,ex,ey,L1:xr-(sx+7),L2:ey-sy,L3:xr-(ex+19),y0,y1,s6top:r6.top-rp.top,rp};
    $$('.pm-rp',svg).forEach(x=>{if(!still.matches)x.style.strokeDasharray=1});
    ask()};
  const tick=()=>{raf=0;if(root.hidden)return;
    const vb=deep.getBoundingClientRect(),line=vb.top+vb.height*.74;
    if(isM()){if(!G)return;const ln=line-pm.getBoundingClientRect().top,LT2=G.L1+G.L2+G.L3;
      const rps=$$('.pm-rp',pm),p=cl((ln-G.s6top-G.y0)/(G.y1-G.y0));rps.forEach((e,i)=>e.style.strokeDashoffset=still.matches?0:1-cl(p*1.35-i*.0135));
      const cp=$('.pm-cnp',pm);let q;if(ln<G.sy)q=cl((ln-(G.sy-90))/90)*G.L1;else if(ln<G.ey)q=G.L1+(ln-G.sy);else q=G.L1+G.L2+cl((ln-G.ey)/60)*G.L3;
      cp.style.strokeDasharray=1;cp.style.strokeDashoffset=still.matches?0:1-q/LT2;const rr=$$('.pm-cn rect',pm);rr[0].style.opacity=still.matches||ln>=G.sy-6?1:0;rr[1].style.opacity=still.matches||ln>=G.ey-6?1:0;return}
    const r=wrap.getBoundingClientRect(),y=(line-r.top)/k;
    SEC.forEach((s,i)=>{if(y>=s+30)fire(i)});
    if(br.getBoundingClientRect().top<vb.bottom-vb.height*.15)fire('br');
    /* the ribbon of the pressure frame is drawn as the visitor scrolls into it */
    const p=cl((y-4150)/700);rb.forEach((e,i)=>e.style.strokeDashoffset=1-cl(p*1.35-i*.0135));
    /* the line from the operating model to the closing dot: right, down the margin, back in */
    let q;if(y<SY)q=cl((y-(SY-110))/110)*L1;else if(y<END)q=L1+(y-SY)/L2*L2;else q=L1+L2+cl((y-END)/90)*L3;
    cn.style.strokeDashoffset=1-q/LT;cnr[0].style.opacity=y>=SY-6?1:0;cnr[1].style.opacity=y>=END-6?1:0};
  const ask=()=>{if(!raf)raf=requestAnimationFrame(tick)};
  const arm=()=>{fired.clear();$$('.m',root).forEach(e=>e.classList.remove('is-in'));root.classList.toggle('pa-anim',!still.matches);
    if(io)io.disconnect();io=null;
    if(isM()){if(still.matches){$$('.m',root).forEach(e=>e.classList.add('is-in'))}else{io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}),{root:deep,rootMargin:'0px 0px -6% 0px',threshold:.01});$$('.pa-m .m, .pa-br .m',root).forEach(e=>io.observe(e))}
      layM();return}
    if(still.matches){rb.forEach(e=>e.style.strokeDashoffset=0);cn.style.strokeDashoffset=0;cnr.forEach(e=>e.style.opacity=1);return}
    size();tick()};
  deep.addEventListener('scroll',ask,{passive:true});addEventListener('resize',()=>{size();layM();ask()});RV_NARROW.addEventListener('change',()=>{if(!root.hidden)paReset()});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{layM()});
  paReset=()=>{size();arm();requestAnimationFrame(()=>{size();layM();ask()})};
  paReset();
}
function fillDeep(type,i){
  const real=type==='real',o=real?REAL[i]:DIMS[i];
  LDT.fills.deep=()=>fillDeep(type,i);
  const own=PAGE_INIT[o.slug]?o.slug:null;
  $$('#deep .dpage').forEach(p=>{p.hidden=p.dataset.page!==own});$('#deep').classList.toggle('pa-on',own==='partnerships');$('#deep .dd').hidden=!!own;
  $('#deep').setAttribute('aria-labelledby',own?$(`#deep .dpage[data-page="${own}"] h2`).id:'deepT');
  if(own){const pg=$(`#deep .dpage[data-page="${own}"]`);
    /* relationship controls name their page; dimensions and areas resolve to the right deep dive */
    $$('[data-area]',pg).forEach(b=>{const j=RI(b.dataset.area);if(j>=0)b.dataset.dreal=j;else b.dataset.ddim=DIMS.findIndex(x=>x.n===b.dataset.area)});
    PAGE_INIT[own](pg)}
  deepNow={type,i};relStrip(o);crumb(real,i);
  const par=real?o.d.map(j=>DIMS[j].n):[],conn=real&&o.d.length>1;
  /* where the visitor is: one place only, top right. The pill carries the dimension (or the dimensions an area belongs to), as the chapter pills do in Layer 1 */
  /* where you are, top right: the address in the bubble, what the page belongs to in Boska, the page itself in wide capitals (Lena, 28.09.2026) */
  const ctx=real?par.join(' + '):'Operating dimension';
  $('#deepCat').classList.toggle('multi',conn);
  $('#deepCat').innerHTML=`<span class="pill">${ADDR(type,i)}</span><span class="dctx">${ctx}</span><span class="dcur">${o.n}</span>`;
  $('#deepT').textContent=o.n;$('#deepK').textContent=o.k||'';$('#deepK').style.display=o.k?'':'none';
  /* the strongest proof first, then only what adds understanding */
  let pr='';
  if(o.fig)pr+=`<div class="dfig"><b>${o.fig[0]}</b><span>${o.fig[1]}</span></div>`;
  if(o.list)pr+=flow(o.list);
  if(o.groups)pr+=`<div class="dgrp">${o.groups.map(([t,a])=>`<div><h3>${t}</h3>${flow(a)}</div>`).join('')}</div>`;
  $('#deepProof').innerHTML=pr;
  $('#deepDetail').textContent=o.detail||'';$('#deepDetail').style.display=o.detail?'':'none';
  mini(real?o.d:[i],real?-1:i);
  /* connected system: the whole system in one row, each dimension with its areas and the connecting areas between */
  const linked=real?[]:ORDER.map(RI).filter(j=>REAL[j].d.includes(i));
  $('#deepRel').textContent=real?o.rel:`${o.n} brings together ${linked.map(j=>REAL[j].n).join(', ').replace(/, ([^,]*)$/,' and $1')}.`;
  const btn=(attr,n,state,cls)=>`<li><button type="button" ${attr} data-act class="${cls||''} ${state}"${state==='cur'?' aria-current="true"':''}>${n}</button></li>`;
  const aState=n=>{const j=RI(n);return real&&j===i?'cur':linked.includes(j)?'rel':''};
  $('#deepNav').innerHTML=SYS.map(g=>g.c
    ?`<div class="sg sc"><h4>Connects</h4><ul>${btn(`data-dreal="${RI(g.c)}"`,g.c,aState(g.c))}</ul></div>`
    :`<div class="sg"><ul>${btn(`data-ddim="${g.d}"`,DIMS[g.d].n,!real&&g.d===i?'cur':real&&o.d.includes(g.d)?'rel':'','dim')}${g.a.map(n=>btn(`data-dreal="${RI(n)}"`,n,aState(n))).join('')}</ul></div>`).join('');
}
/* ---------- where you are, in one line (Lena, 28.09.2026): beneath the top bar of a deep dive, it slides in when the visitor scrolls
   back up (looking for orientation), leaves when they read on, and rests after a few seconds. Nothing is placed over the page itself ---------- */
function crumb(real,i){const bar=$('#deep .bar');if(!bar)return;let c=$('#dCrumb');
  if(!c){c=document.createElement('nav');c.id='dCrumb';c.className='dcr';c.setAttribute('aria-label','Where you are');bar.appendChild(c)}
  const dim=k=>`<button type="button" data-ddim="${k}" data-rel data-act><em>${DL[k]}</em>${DIMS[k].n}</button>`;
  const par=real?REAL[i].d.map(dim).join('<span class="pl">+</span>'):'';
  c.innerHTML=`<button type="button" class="dexp" data-open="approach" data-act aria-haspopup="dialog">System</button><span class="sl">/</span>`+
    (real?`${par}<span class="sl">/</span><b aria-current="page"><em>${ADDR('real',i)}</em>${REAL[i].n}</b>`:`<b aria-current="page"><em>${DL[i]}</em>${DIMS[i].n}</b>`);
  c.classList.remove('on')}
/* the trail shows briefly when scrolling back up; a finger on a touch screen does not count as resting on it */
{let cY=0,cT=0;const HOV=matchMedia('(hover:hover)'),held=c=>(HOV.matches&&c.matches(':hover'))||c.contains(document.activeElement);
 const hide=()=>{const c=$('#dCrumb');if(c&&!held(c))c.classList.remove('on')};
 const show=()=>{const c=$('#dCrumb');if(!c)return;c.classList.add('on');clearTimeout(cT);const rest=()=>{cT=setTimeout(()=>{const c=$('#dCrumb');if(c&&held(c))rest();else hide()},1200)};rest()};
 document.addEventListener('scroll',e=>{const ov=e.target;if(!ov||ov.id!=='deep')return;const y=ov.scrollTop;
   if(y<innerHeight*.5){clearTimeout(cT);hide()}else if(y<cY-4)show();else if(y>cY+4){clearTimeout(cT);hide()}cY=y},{passive:true,capture:true});
 document.addEventListener('focusin',e=>{if(e.target.closest&&e.target.closest('#dCrumb'))show()});}
/* Explore from inside a deep dive: the map marks where the visitor was */
let hereFrom=null;
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#deep .dexp'))hereFrom=deepNow&&{...deepNow}},true);
LDT.fills.approach=()=>{const m=$('#xMap');if(!m)return;
  $$('.here',m).forEach(b=>{b.classList.remove('here');b.removeAttribute('aria-current');const y=$('.yh',b);y&&y.remove()});
  const f=hereFrom;hereFrom=null;if(!f)return;
  const b=$(f.type==='real'?`[data-dreal="${f.i}"]`:`[data-ddim="${f.i}"]`,m);if(!b)return;
  b.classList.add('here');b.setAttribute('aria-current','page');
  (b.querySelector('.n')||b.querySelector('span')||b).insertAdjacentHTML('afterend','<em class="yh">You are here</em>')};
/* direct routes: #system/<area> opens that deep dive over the System chapter (earlier names are forwarded) */
function routeDeep(h){if(!h.startsWith('system/'))return false;let sl=h.slice(7);sl=ALIAS[sl]||sl;
  const di=DIMS.findIndex(d=>d.slug===sl),ri=REAL.findIndex(r=>r.slug===sl);if(di<0&&ri<0)return false;
  LDT.goChapter(3,true);showDeep(di>=0?'dim':'real',di>=0?di:ri);
  /* the address settles on the System chapter, so Back and a reload return there */
  history.replaceState(null,'','#system');return true}
function showDeep(type,i,trigger,after){
  if(LDT.open===$('#deep')){
    const ov=$('#deep'),parts=()=>$$('#deepRet:not([hidden]), .dd:not([hidden]) .ddl > *, .dd:not([hidden]) .ddr > *, .dpage:not([hidden]) > *, .dconn',ov);
    const done=()=>{ov.scrollTop=0;if(after)after();else $('#deep [data-close]').focus({preventScroll:true})};
    if(RM){fillDeep(type,i);done();return}
    gsap.to(parts(),{opacity:0,duration:.18,onComplete:()=>{fillDeep(type,i);done();gsap.fromTo(parts(),{opacity:0,y:16},{opacity:1,y:0,stagger:.03,duration:.6,ease:'expo.out',clearProps:'transform,opacity'})}});
    return;
  }
  LDT.openLayer('deep',()=>fillDeep(type,i),trigger);
}
/* ---------- Layer 2 relationships (Lena, 27.09.2026): a deep dive opened through another one's relationship control (+)
   keeps that origin. Its − returns there, to the same place; the site Back leaves the layer; the browser Back follows the same history ---------- */
let deepNow=null,relBackNow=false,relSkip=0;const REL=[];
function relStrip(o){const el=$('#deepRet'),top=REL[REL.length-1];
  if(!top){el.hidden=true;el.innerHTML='';return}
  el.hidden=false;
  el.innerHTML=`<p class="xh">Opened from ${top.from}</p><button type="button" class="dret-b" data-act aria-label="Close ${o.n} and return to ${top.from}"><span class="n">${o.n}</span><span class="q">${top.q}</span><span class="ret"><span class="mi" aria-hidden="true"><i></i></span><span class="rt">Return to ${top.from}</span></span></button>`;
}
function relOpen(t,type,i){
  const o=deepNow.type==='real'?REAL[deepNow.i]:DIMS[deepNow.i];
  REL.push({type:deepNow.type,i:deepNow.i,from:o.n,scroll:$('#deep').scrollTop,key:t.dataset.area||'',q:t.querySelector('.q')?t.querySelector('.q').textContent:''});
  history.pushState({rel:REL.length},'',location.href);
  showDeep(type,i,t);
}
function relReturn(){const r=REL.pop();if(!r)return;relBackNow=true;
  showDeep(r.type,r.i,null,()=>{relBackNow=false;const ov=$('#deep');ov.scrollTop=r.scroll;
    const b=r.key&&$(`#deep .dpage:not([hidden]) [data-rel][data-area="${r.key}"]`);(b||$('#deep [data-close]')).focus({preventScroll:true})})}
/* − uses the browser history, so the browser Back and the − always agree */
function relBack(){if(history.state&&history.state.rel===REL.length)history.back();else relReturn()}
/* leaving the relationship another way (site Back, Escape, the system map) forgets it and removes its history steps */
function relClear(){const n=REL.length;if(!n)return;REL.length=0;relSkip++;history.go(-n);relStrip({})}
addEventListener('popstate',e=>{if(relSkip){relSkip--;return}
  const n=(e.state&&e.state.rel)||0;if(!REL.length||n>=REL.length||LDT.open!==$('#deep'))return;
  while(REL.length>n+1)REL.pop();relReturn()});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#deep .dret-b');if(t){e.preventDefault();relBack()}});
document.addEventListener('click',e=>{if(!REL.length)return;
  if(e.target.closest&&e.target.closest('#deep [data-close]'))relClear()},true);
addEventListener('keydown',e=>{if(e.key==='Escape'&&REL.length&&LDT.open===$('#deep'))relClear()},true);
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('#journey [data-real],#journey [data-dim],#deep [data-dreal],#deep [data-ddim],#approach [data-ddim],#approach [data-dreal]');if(!t)return;
  if(e.detail===0)LDT.keyX(t);
  /* every link inside a deep dive (its relationship controls, the connected system, the small map) keeps the way back (Lena, 27.09.2026) */
  if((t.hasAttribute('data-rel')||t.closest('#deep .dconn, #deep .mini'))&&deepNow&&LDT.open===$('#deep')){
    const ty=t.dataset.dreal!=null?'real':'dim',ix=t.dataset.dreal!=null?+t.dataset.dreal:+t.dataset.ddim;
    if(ty===deepNow.type&&ix===deepNow.i)return;
    relOpen(t,ty,ix);return}
  if(t.dataset.real!=null)showDeep('real',+t.dataset.real,t);
  else if(t.dataset.dim!=null)showDeep('dim',+t.dataset.dim,t);
  else if(t.dataset.dreal!=null)showDeep('real',+t.dataset.dreal,t);
  else if(t.dataset.ddim!=null)showDeep('dim',+t.dataset.ddim,t);
});
/* keyboard: a focused reality or dimension brings the system into view */
if(!RM)$('#journey').addEventListener('focusin',e=>{const t=e.target;const st=J[0].st;
  if(t.closest('.j-labels')&&!st.classList.contains('sysOn'))go(yFor(3),true)});

/* ---------- init ---------- */
let flowBuilt=false,first=true;
function init(){
  J.forEach(j=>j.build());buildTransform();
  if(!flowBuilt){buildFlow();flowBuilt=true}
  ScrollTrigger.sort();ScrollTrigger.refresh();
  if(first){first=false;setActive(0);hero(true);
    /* back from another page: the visitor returns to the same place, with the layers that were open */
    const ret=LDT.ret;
    if(ret){if(LDT.lenis&&LDT.lenis.resize)LDT.lenis.resize();scrollTo(0,ret.y);go(ret.y,true);ScrollTrigger.update();resolveChapter();if(ret.y>30)hero(false);
      J[0].intro(ret.y>30);ret.layers.forEach(id=>LDT.openLayer(id,LDT.fills[id],null,true));LDT.reveal();return}
    const h=decodeURIComponent(location.hash.slice(1));const ci=HASH.indexOf(h);
    if(ci>0){LDT.goChapter(ci,true);ScrollTrigger.update();hero(false);
      /* the browser may still apply its own anchor jump after load: confirm the target until the visitor moves */
      let moved=false;const stop=()=>{moved=true};['wheel','touchstart','keydown','pointerdown'].forEach(ev=>addEventListener(ev,stop,{once:true,passive:true}));
      const again=()=>{if(!moved&&!LDT.open){ScrollTrigger.refresh();LDT.goChapter(ci,true);ScrollTrigger.update()}};
      addEventListener('load',()=>setTimeout(again,60),{once:true});setTimeout(again,500);setTimeout(again,1400)}
    if(['experience','approach','engage','lead'].includes(h)){LDT.openLayer(h);LDT.arrivedInLayer()}
    else if(routeDeep(h))LDT.arrivedInLayer();
    J[0].intro(ci>0);
    LDT.reveal();
  }
}
/* fonts first (the wordmark is measured), then the monolith; if three.js cannot load at all the page still starts */
Promise.all([document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve(),Promise.race([monoReady,new Promise(r=>setTimeout(r,4000))])]).then(()=>requestAnimationFrame(init));
addEventListener('hashchange',()=>{const h=location.hash.slice(1),ci=HASH.indexOf(h);if(ci>=0){if(LDT.open)LDT.closeLayer(true);LDT.goChapter(ci)}else if(['experience','approach','engage','lead'].includes(h))LDT.openLayer(h);else routeDeep(h)});
/* on a size change (window, phone rotation) the page keeps its place: chapter and distance into it are restored after the rebuild */
let rt,lw=innerWidth,lh=innerHeight,keep=null;
addEventListener('resize',()=>{if(MOB()&&innerWidth===lw)return;lw=innerWidth;
  if(!keep&&active>=0&&!LDT.open)keep={i:active,d:(scrollY-yFor(active))/lh};
  clearTimeout(rt);rt=setTimeout(()=>{init();lh=innerHeight;if(keep){const k=keep;keep=null;ScrollTrigger.refresh();go(yFor(k.i)+k.d*innerHeight,true);ScrollTrigger.update();resolveChapter()}},250)});
})();
