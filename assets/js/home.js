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
/* addresses of Layer 1 (30.09.2026): every chapter is #<chapter> (no hash on the landing). The four secondary views (#experience, #explore, #engage, #lead)
   open over the chapter they belong to. Choosing a chapter adds a history step; scrolling only keeps the address in step with the chapter in view */
const LAYER_AT={experience:4,approach:3,engage:5,lead:6};
/* the address of each secondary view: Explore is #explore (the overlay itself keeps its id "approach"); an earlier #approach still opens it and is renamed in place */
const LAYER_HASH={approach:'explore',experience:'experience',engage:'engage',lead:'lead'};
const HASH_LAYER={explore:'approach',approach:'approach',experience:'experience',engage:'engage',lead:'lead'};
const chHash=i=>i>0?HASH[i]:'';
/* quiet: a history step back is under way; pend: what has to be written once it has arrived; navBusy: the address is driving the page, not the other way round */
let urlT=0,quiet=false,quietT=0,navBusy=false,replaceSession=false,pend=null;
const isView=h=>!!(deepOf(h)||HASH_LAYER[h]);
const stOf=()=>history.state||{};
let pendGo=null;
function afterStep(fn,gt){if(quiet){pend=fn;pendGo=gt===undefined?null:gt}else fn()}
function flush(){const f=pend;pend=null;if(f)f()}
/* a step back makes the browser jump to the element named by the address it lands on: the place the visitor was reading is put back once it has arrived */
let keepY=null;
function hold(fn){fn();requestAnimationFrame(fn);setTimeout(fn,120);setTimeout(fn,400)}
function arrived(){quiet=false;clearTimeout(quietT);const y=keepY,gt=pendGo;keepY=null;pendGo=null;flush();
  if(gt!==null)hold(()=>LDT.goChapter(gt,true));
  else if(y!==null)hold(()=>{if(Math.abs(scrollY-y)>2)go(y,true)})}
function stepBack(n){keepY=Math.round(scrollY);quiet=true;clearTimeout(quietT);quietT=setTimeout(arrived,600);history.go(-n)}
/* the chapter in view; with reduced motion no scene reports it, so it is read from where the chapters stand on the page */
function curChapter(){if(!RM)return active;
  const ys=[0,1,2,3].map(i=>topOf(stages[i])).concat(['#proof','#transformation','#ways','#contact'].map(id=>topOf($(id))));
  let c=0;ys.forEach((y,i)=>{if(y<=scrollY+innerHeight*.4)c=i});return c}
function syncChapterUrl(){
  if(quiet||navBusy||LDT.layers.length||active<0)return;
  const h=location.hash.slice(1);
  if(isView(h))return;
  const c=curChapter(),want=chHash(c);
  if(h===want||(c===0&&h==='arrive'))return;
  history.replaceState(history.state,'',urlFor(want))}
function applyNav(want){const h=location.hash.slice(1);
  if(h===want||(want===''&&h==='arrive'))return;
  history.pushState(null,'',urlFor(want))}
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
 divider:[520,92],os:[48,330,1190,540]
};
const GM={W:430,H:860,m:22,
 caps:[22,21],rule:[22,96],wmW:386,wmB:330,desc:{left:22,top:586,fs:24},hint:{right:22,bottom:26},core:[22,250,340,30],barAfter:[372,36],
 jt:[22,100],jtS:40,serifW:386,serifB:112,
 blocks:[[150,200,200,130,-2],[22,250,120,100,2.5],[252,350,150,80,3],[40,380,170,84,-1.5],[230,450,170,80,1.5],[222,550,142,74,3],[22,490,180,100,-2],[60,612,130,72,-2.5]],
 connect:[22,300,386,27],
 C0:[[118,520],[312,520],[118,730],[312,730]],r0:84,
 C1:[[136,462],[294,462],[136,692],[294,692]],r1:110,
 divider:[-10,0],os:[22,326,386,530]
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
if(RM)addEventListener('scroll',()=>{clearTimeout(urlT);urlT=setTimeout(syncChapterUrl,350)},{passive:true});
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
function setActive(i){if(i===active)return;active=i;LDT.chapterNow=i;clearTimeout(urlT);urlT=setTimeout(syncChapterUrl,350);$$('#rail button').forEach((b,j)=>{b.classList.toggle('on',j===i);if(j===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});$('#railM').innerHTML=`<span class="pill">0${i+1}</span><span class="dcur">${CH[i]}</span>`;document.body.classList.toggle('at-end',i===7)}
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
  /* the Venn is replaced by the Operating System drawing (rebuild 02.10.2026): the circles hand over to it */
  const osEl=document.createElement('div');osEl.className='j-os';osEl.innerHTML=`<p class="os-lead">${SYS_LINE}</p><div class="sy-host"></div><div class="os-cta"><p class="os-cl">Every part of the system opens its own page.</p><button class="os-ex" type="button" data-open="approach" data-act aria-haspopup="dialog"><span>Explore the system</span><b aria-hidden="true">+</b></button></div>`;sl.appendChild(osEl);
  /* desktop: the whole stage is one composition that the scroll builds (explore.js, compose) */
  const cmEl=document.createElement('div');cmEl.className='j-cm sy';
  cmEl.innerHTML=`<div class="cm-dyn"></div><span class="pill cm-a cm-pill" aria-hidden="true">04</span>${RM?'<h2 class="sr">One operating System</h2>':''}<blockquote class="cm-a cm-quote"><p>\u201cThis is often where I enter: when growth, execution or commercial performance begin to outpace the structure holding the business together.\u201d</p></blockquote><p class="cm-a cm-lock" aria-hidden="true"><em>One operating</em><b>System</b></p><button class="cm-a cm-go" type="button" data-open="approach" data-act aria-haspopup="dialog"><span class="cm-gq">Every part of the system opens its own page.</span><span class="cm-gl">Explore the system<b aria-hidden="true">+</b></span></button>`;
  sl.appendChild(cmEl);sys.style.display='none';const cp={p:0},cmq=s=>cmEl.querySelector(s);
  [...dimEls,...Object.values(tickEls),vA,vB,...cEls,cue].forEach(e=>e.remove());
  let tl=null,master=null,trig=null,jState=-1,G0=G();

  function fitText(el,w){el.style.fontSize='100px';const r=el.getBoundingClientRect().width/S;el.style.fontSize=(100*w/r)+'px'}
  /* the thread: the cut starts exactly on the line the monolith contracts into, between LDT and INC */
  function monoCut(g){const m=LDT.mono,l=m&&inst===0?m.line():{left:innerWidth/2-2,width:4};const offX=(innerWidth-g.W*S)/2;return{x:(l.left-offX)/S,w:l.width/S}}
  function jTitle(i){if(i===jState)return;const prev=jState;jState=i;const el=q('.j-title');gsap.killTweensOf(el);
    const show=()=>{if(!JT[jState]||(jState===3&&!MOB())){gsap.set(el,{opacity:0});return}let [n,t,s,x]=JT[jState];if(jState===3&&!MOB())x='';el.querySelector('.pill').textContent=n;el.querySelector('.t').textContent=t;el.querySelector('.s').innerHTML=s;el.querySelector('.s').style.display=s?'':'none';el.querySelector('.x').textContent=x;el.querySelector('.x').style.display=x?'':'none';
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
    gsap.set(sys,{opacity:1});gsap.set(osEl,{left:g.os[0],top:g.os[1],width:g.os[2],opacity:0});osEl.style.height=g.os[3]+'px';
    cp.p=0;if(cmEl._cm)cmEl._cm.setP(0);
    /* on narrower screens the chapter rail would run into the right end of the drawing: the composition is scaled to the room that is left */
    gsap.set(cmEl,{transformOrigin:'0% 100%',scale:M?1:Math.min(1,Math.max(.7,(innerWidth-190-(innerWidth-g.W*S)/2)/(1372*S)))});
    gsap.set([cmq('.cm-pill'),cmq('.cm-quote')],{opacity:0,y:16});gsap.set(cmq('.cm-lock'),{opacity:0,y:60});gsap.set(cmq('.cm-go'),{opacity:0,y:40});
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
    if(M)tl.to(osEl,{opacity:1,duration:.035},at(.735));
    else{
      tl.to(cp,{p:1,duration:.15,ease:'none',onUpdate:()=>{if(cmEl._cm)cmEl._cm.setP(cp.p)}},at(.545))
        .to(cmq('.cm-pill'),{opacity:1,y:0,duration:.03},at(.625))
        .to(cmq('.cm-lock'),{opacity:1,y:0,duration:.07,ease:'power3.out'},at(.635))
        .to(cmq('.cm-quote'),{opacity:1,y:0,duration:.04},at(.7))
        .to(cmq('.cm-go'),{opacity:1,y:0,duration:.05,ease:'power3.out'},at(.735));
    }
    tl.to({},{duration:SYS_HOLD},at(.8));

    if(RM){
      const p=STILL[inst];tl.time(Math.min(p,tl.duration()));if(inst===3){cmEl.dataset.rm='1';if(cmEl._cm)cmEl._cm.setP(1)}
      st.classList.toggle('cxOn',inst===1);st.classList.toggle('sysOn',inst===3);
      if(JT[inst]&&!(inst===3&&!MOB())){let [n,t,s,x]=JT[inst];if(inst===3&&!MOB())x='';jt.querySelector('.pill').textContent=n;jt.querySelector('.t').textContent=t;jt.querySelector('.s').innerHTML=s;jt.querySelector('.s').style.display=s?'':'none';jt.querySelector('.x').textContent=x;jt.querySelector('.x').style.display=x?'':'none';gsap.set(jt,{opacity:1})}
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
window.LDT_XI.build($('#xMap'),{DIMS,REAL,SYS,DL,RI,ADDR});window.LDT_XI.footer($('#deepFoot'));$$('.j-os .sy-host').forEach(h=>window.LDT_XI.landing(h));$$('.j-cm').forEach(h=>window.LDT_XI.compose(h));
if($('#states'))$('#states').innerHTML=STATES.map(([l,t,rs])=>`<div class="st"><div class="g" aria-hidden="true">${rs.map(r=>`<i style="left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%"></i>`).join('')}</div><h3 class="l">${l}</h3><p>${t}</p></div>`).join('');

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
    gsap.from('#mk-regions li',{opacity:0,y:30,stagger:.1,duration:.9,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'#mk-regions',start:'top 85%'}});
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
/* Advantage: drawn by assets/js/advantage.js; a new visit replays the states from the field of letters */
let avReset=null;
function avInit(root){
  if(avReset)return relBackNow?undefined:avReset();
  avReset=window.LDT_AD.init(root);
}
/* Positioning: drawn by assets/js/positioning.js; a new visit replays the scenario from the premium ambition */
let psReset=null;
function psInit(root){
  if(psReset)return relBackNow?undefined:psReset();
  psReset=window.LDT_PO.init(root);
}
/* Expansion: see assets/js/expansion.js */
let exReset=null;
function exInit(root){
  if(exReset)return relBackNow?undefined:exReset();
  exReset=window.LDT_XP.init(root);
}
/* Markets: drawn by assets/js/markets.js; a new visit replays the clarity from the first pane */
let mkReset=null;
function mkInit(root){
  if(mkReset)return relBackNow?undefined:mkReset();
  mkReset=window.LDT_MR.init(root);
}
let ppReset=null;
function ppInit(root){
  /* Proposition is drawn by assets/js/proposition.js; a new visit replays its states from the business that holds */
  if(ppReset)return relBackNow?undefined:ppReset();
  ppReset=window.LDT_PP.init(root);
  $$('[data-area]',root).forEach(b=>b.dataset.dreal=RI(b.dataset.area));
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
/* Operations: see assets/js/operations.js */
let opReset=null;
function opInit(root){
  if(opReset)return relBackNow?undefined:opReset();
  opReset=window.LDT_OX.init(root);
}
/* People: drawn by assets/js/people.js; a new visit replays the people from the entry */
let peReset=null;
function peInit(root){
  if(peReset)return relBackNow?undefined:peReset();
  peReset=window.LDT_PL.init(root);
}
/* Technology: rows and one caret, see assets/js/technology.js */
let tcReset=null;
function tcInit(root){
  if(tcReset)return relBackNow?undefined:tcReset();
  tcReset=window.LDT_TE.init(root);
}
/* Decisions: see assets/js/decisions.js */
let dcReset=null;
function dcInit(root){
  if(dcReset)return relBackNow?undefined:dcReset();
  dcReset=window.LDT_DE.init(root);
}
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
/* Commercial Architecture: see assets/js/commercial.js */
let caReset=null;
function caInit(root){
  if(caReset)return relBackNow?undefined:caReset();
  caReset=window.LDT_CA.init(root);
}
/* Revenue: see assets/js/revenue.js */
let rvReset=null;
const RV_NARROW=matchMedia('(max-width:760px),(min-width:761px) and (max-width:1100px) and (orientation:portrait)');
function rvInit(root){
  if(rvReset)return relBackNow?undefined:rvReset();
  rvReset=window.LDT_RV.init(root);
}
/* Customers: see assets/js/customers.js */
let cuReset=null;
function cuInit(root){
  if(cuReset)return relBackNow?undefined:cuReset();
  cuReset=window.LDT_CU.init(root);
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
  deepNow={type,i};relStrip(o);crumb(real,i);window.LDT_XI&&LDT_XI.mark(type,i);
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
/* direct links (30.09.2026): every deep dive has its own address, #<slug> (for example #markets or #commercial-architecture).
   Earlier names (#system/<area>, #brand, #commercial ...) are forwarded to it. Opening or reloading the address opens that deep dive at its start;
   moving between deep dives updates the address, and the browser Back and Forward follow it. Anything else in the address is left alone */
const deepOf=h=>{try{h=decodeURIComponent(h||'')}catch(e){return null}
  if(h.startsWith('system/'))h=h.slice(7);h=ALIAS[h]||h;
  const di=DIMS.findIndex(d=>d.slug===h),ri=REAL.findIndex(r=>r.slug===h);
  return di>=0?{type:'dim',i:di,slug:h}:ri>=0?{type:'real',i:ri,slug:h}:null};
const slugOf=(type,i)=>(type==='real'?REAL:DIMS)[i].slug;
/* the address keeps the path and every query parameter (a preview share key, for example): only the hash changes */
const urlFor=s=>location.pathname+location.search+(s?'#'+s:'');
/* each history entry made for a deep dive carries ddn (how many entries the visitor has stepped through since the page below it) and direct (the visitor arrived on a deep dive address) */
/* every history entry made for a view (a deep dive or a secondary view) carries ddn (steps since the page below it), direct (the visitor arrived on a view address) and prev (the address one step below) */
function pushView(hash,extra){const cur=location.hash.slice(1);if(cur===hash)return;
  const st=stOf(),inView=isView(cur);
  history.pushState(Object.assign({ddn:inView?(st.ddn||0)+1:1,direct:inView?!!st.direct:false,prev:cur},extra||{}),'',urlFor(hash))}
function routeDeep(h){const dv=deepOf(h);if(!dv)return false;
  const st=history.state,ov=$('#deep');
  history.replaceState(st&&st.ddn!=null?st:{ddn:0,direct:true},'',urlFor(dv.slug));
  if(LDT.open===ov&&deepNow&&deepNow.type===dv.type&&deepNow.i===dv.i)return true;
  /* stepping back to where a relationship control came from: the same as its return control */
  const k=REL.reduce((a,r,ix)=>r.type===dv.type&&r.i===dv.i?ix:a,-1);
  if(k>=0&&LDT.open===ov){REL.length=k+1;relReturn();return true}
  if(REL.length){REL.length=0;relStrip({})}
  if(LDT.open&&LDT.open!==ov)LDT.closeLayer(true);
  if(!LDT.open&&!(st&&st.ddn>0&&!st.direct))LDT.goChapter(3,true);
  showDeep(dv.type,dv.i);return true}
/* a secondary view named in the address (#explore, #experience, #engage, #lead): whatever else is open closes first, the view opens over its chapter */
function routeLayer(h){const id=HASH_LAYER[h],st=history.state;
  history.replaceState(st&&st.ddn!=null?st:{ddn:0,direct:true},'',urlFor(LAYER_HASH[id]));
  if(LDT.layers.length===1&&LDT.open===$('#'+id))return true;
  if(REL.length){REL.length=0;relStrip({})}
  if(LDT.layers.length)LDT.closeLayer(true);
  /* an address the visitor typed or arrived on opens over its own chapter; a step in the history opens over the place the visitor was at */
  if(!(st&&st.ddn>0&&!st.direct)&&LDT.chapterNow!==LAYER_AT[id])LDT.goChapter(LAYER_AT[id],true);
  LDT.openLayer(id,LDT.fills[id]);return true}
/* the address follows the deep dive that is shown */
function deepUrl(type,i){const s=slugOf(type,i),cur=location.hash.slice(1);
  if(cur===s)return;
  if(isView(cur)&&relBackNow)history.replaceState(stOf(),'',urlFor(s));
  else afterStep(()=>pushView(s))}
/* the view that is on top: a deep dive, or a secondary view. The Index has no address of its own, so it never counts */
function expectedView(){const L=LDT.layers;
  for(let k=L.length-1;k>=0;k--){const id=L[k];if(id==='index')continue;
    if(id==='deep')return deepNow?slugOf(deepNow.type,deepNow.i):null;
    if(LAYER_HASH[id])return LAYER_HASH[id]}
  return null}
/* leaving the views for good (site Back, Escape, Start, browser Back): the address goes back to the page below them, without a stale view address */
function leaveViews(){const st=stOf();
  if(st.ddn>0&&!st.direct)stepBack(st.ddn);
  else history.replaceState(null,'',urlFor(chHash(curChapter())))}
document.addEventListener('ldt:open',e=>{const h=LAYER_HASH[e.detail];if(!h||navBusy)return;
  if(replaceSession){replaceSession=false;history.replaceState({ddn:0,direct:true},'',urlFor(h));return}
  afterStep(()=>pushView(h))});
document.addEventListener('ldt:layers',()=>{
  if(quiet||navBusy)return;
  const E=expectedView(),cur=location.hash.slice(1);
  if(E===null){
    if(REL.length){REL.length=0;relStrip({})}
    if(isView(cur))leaveViews();
    else if(!LDT.layers.length){clearTimeout(urlT);urlT=setTimeout(syncChapterUrl,350)}
    return}
  if(E===cur)return;
  /* a view closed and another one is shown again: one step back when the entry below is that view, otherwise the address is corrected in place */
  const st=stOf();
  if(isView(cur)&&st.ddn>0&&st.prev===E)stepBack(1);
  else history.replaceState(isView(cur)?st:{ddn:0,direct:true},'',urlFor(E))});
/* choosing a target in the Index replaces the views that were open: the history goes back to the page below them first, the target is written after it.
   On a view address the visitor arrived on, that address is replaced instead */
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#index [data-open]');if(!t)return;
  if(REL.length){REL.length=0;relStrip({})}
  const cur=location.hash.slice(1);if(!isView(cur))return;
  const st=stOf();
  if(st.ddn>0&&!st.direct)stepBack(st.ddn);else replaceSession=true},true);
/* choosing a chapter (rail, Index, Start, the buttons that lead to Contact) adds one history step */
document.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('[data-go]');if(!g||!LDT.goChapter)return;
  const i=+g.dataset.go,want=chHash(i);afterStep(()=>applyNav(want),i)});
function showDeep(type,i,trigger,after){
  deepUrl(type,i);
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
let deepNow=null,relBackNow=false;const REL=[];
function relStrip(o){const el=$('#deepRet'),top=REL[REL.length-1];
  /* the site Back says where it goes: back to the page the visitor came from, at the place they clicked */
  $$('#deep [data-close]').forEach(b=>{const t=[...b.childNodes].reverse().find(n=>n.nodeType===3);if(t)t.textContent=top?`Back to ${top.from}`:'Back'});
  if(!top){el.hidden=true;el.innerHTML='';return}
  el.hidden=false;
  el.innerHTML=`<p class="xh">Opened from ${top.from}</p><button type="button" class="dret-b" data-act aria-label="Close ${o.n} and return to ${top.from}"><span class="n">${o.n}</span><span class="q">${top.q}</span><span class="ret"><span class="mi" aria-hidden="true"><i></i></span><span class="rt">Return to ${top.from}</span></span></button>`;
}
function relOpen(t,type,i){
  const o=deepNow.type==='real'?REAL[deepNow.i]:DIMS[deepNow.i];
  REL.push({type:deepNow.type,i:deepNow.i,from:o.n,scroll:$('#deep').scrollTop,key:t.dataset.area||'',q:t.querySelector('.q')?t.querySelector('.q').textContent:''});
  pushView(slugOf(type,i),{rel:REL.length});
  showDeep(type,i,t);
}
function relReturn(){const r=REL.pop();if(!r)return;relBackNow=true;
  showDeep(r.type,r.i,null,()=>{relBackNow=false;const ov=$('#deep');ov.scrollTop=r.scroll;
    const b=r.key&&$(`#deep .dpage:not([hidden]) [data-rel][data-area="${r.key}"]`);(b||$('#deep [data-close]')).focus({preventScroll:true})})}
/* − uses the browser history, so the browser Back and the − always agree */
function relBack(){if(history.state&&history.state.rel===REL.length)history.back();else relReturn()}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#deep [data-close]');if(b&&REL.length){e.preventDefault();e.stopImmediatePropagation();relBack()}},true);
/* leaving the relationship another way (site Back, Escape, the system map) forgets it; its history steps go with the deep dive address */
function relClear(){if(!REL.length)return;REL.length=0;relStrip({})}
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
    const ret=LDT.ret,h0=location.hash.slice(1);
    if(ret){if(LDT.lenis&&LDT.lenis.resize)LDT.lenis.resize();scrollTo(0,ret.y);go(ret.y,true);ScrollTrigger.update();resolveChapter();if(ret.y>30)hero(false);
      J[0].intro(ret.y>30);navBusy=true;ret.layers.forEach(id=>LDT.openLayer(id,LDT.fills[id],null,true));navBusy=false;
      const rl=[...ret.layers].reverse().find(id=>LAYER_HASH[id]);if(rl)history.replaceState({ddn:0,direct:true},'',urlFor(LAYER_HASH[rl]));
      /* back from another page to a deep dive address: the deep dive returns with it */
      const rd=deepOf(h0);if(rd){history.replaceState(history.state&&history.state.ddn!=null?history.state:{ddn:0,direct:true},'',urlFor(rd.slug));showDeep(rd.type,rd.i,null)}
      LDT.reveal();return}
    let h='';try{h=decodeURIComponent(location.hash.slice(1))}catch(e){}const ci=HASH.indexOf(h)>=0?HASH.indexOf(h):(LAYER_AT[HASH_LAYER[h]]||-1);
    if(ci>0){LDT.goChapter(ci,true);ScrollTrigger.update();hero(false);
      /* the browser may still apply its own anchor jump after load: confirm the target until the visitor moves */
      let moved=false;const stop=()=>{moved=true};['wheel','touchstart','keydown','pointerdown'].forEach(ev=>addEventListener(ev,stop,{once:true,passive:true}));
      /* a secondary view (#experience ...) opens over its chapter: the chapter is confirmed underneath it as well */
      const under=!!HASH_LAYER[h];
      const again=()=>{if(!moved&&(!LDT.open||under)){ScrollTrigger.refresh();LDT.goChapter(ci,true);ScrollTrigger.update()}};
      addEventListener('load',()=>setTimeout(again,60),{once:true});setTimeout(again,500);setTimeout(again,1400)}
    if(HASH_LAYER[h]){routeLayer(h);LDT.arrivedInLayer()}
    else if(routeDeep(h))LDT.arrivedInLayer();
    J[0].intro(ci>0);
    LDT.reveal();
  }
}
/* fonts first (the wordmark is measured), then the monolith; if three.js cannot load at all the page still starts */
Promise.all([document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve(),Promise.race([monoReady,new Promise(r=>setTimeout(r,4000))])]).then(()=>requestAnimationFrame(init));
addEventListener('hashchange',()=>{if(quiet){arrived();return}
  const h=location.hash.slice(1),ci=h===''?0:HASH.indexOf(h);
  navBusy=true;
  try{
    /* an address that is no longer a view (browser Back to the page below): the views close with it */
    if(!isView(h)&&ci<0){if(LDT.layers.length&&(LDT.layers.includes('deep')||LDT.layers.some(id=>LAYER_HASH[id]))){if(REL.length){REL.length=0;relStrip({})}LDT.closeLayer(true)}return}
    if(ci>=0){if(REL.length){REL.length=0;relStrip({})}if(LDT.open)LDT.closeLayer(true);LDT.goChapter(ci)}
    else if(HASH_LAYER[h])routeLayer(h);
    else routeDeep(h)}
  finally{navBusy=false}});
/* on a size change (window, phone rotation) the page keeps its place: chapter and distance into it are restored after the rebuild */
let rt,lw=innerWidth,lh=innerHeight,keep=null;
addEventListener('resize',()=>{if(MOB()&&innerWidth===lw)return;lw=innerWidth;
  if(!keep&&active>=0&&!LDT.open)keep={i:active,d:(scrollY-yFor(active))/lh};
  clearTimeout(rt);rt=setTimeout(()=>{init();lh=innerHeight;if(keep){const k=keep;keep=null;ScrollTrigger.refresh();go(yFor(k.i)+k.d*innerHeight,true);ScrollTrigger.update();resolveChapter()}},250)});
})();
