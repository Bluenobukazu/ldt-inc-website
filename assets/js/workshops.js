/* LDT INC | the workshop layer on /workshops */
(()=>{
const {RM,$,$$}=LDT;
gsap.registerPlugin(ScrollTrigger);

/* the workshop question, built word by word (one of the two places for this motion) */
const kq=$('#kq');const q=kq.textContent;
kq.innerHTML=`<span class="sr">${q}</span>`+q.split(' ').map(w=>`<span class="w${/^(function|differentiate|perform)/i.test(w)?' key':''}" aria-hidden="true">${w}</span>`).join('');
const words=$$('#kq .w');

(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{
  if(RM){gsap.set(words,{opacity:1});return}
  gsap.from(['.w-hero .subbar','.w-hero .kick'],{opacity:0,y:20,duration:1.1,stagger:.08,ease:'expo.out',delay:.25});
  gsap.fromTo('.w-cut',{scaleY:0,transformOrigin:'50% 0%'},{scaleY:1,duration:1.2,ease:'expo.inOut'});
  gsap.fromTo('.w-cut .shine',{left:-260},{left:()=>$('.w-cut').offsetWidth+260,duration:1.4,delay:1,ease:'power2.inOut'});
  gsap.to(words,{opacity:1,stagger:.07,duration:.4,delay:.8});

  const up=(sel,trig,st)=>gsap.from(sel,{opacity:0,y:36,stagger:st||0,duration:.95,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:trig,start:'top 82%'}});
  up('.premise','.w-bridge');
  up('.src-yr,.src-kw','.src-top',.12);
  up('.src-led div,.src-why','.src-led',.08);
  up('.fwr','.fw',.08);
  up('.way','.ways',.12);
  up('.flex,.fm-go','.flex',.1);
  up('.env li','.env',.07);
  gsap.from('.w-close .row',{opacity:0,y:40,duration:1,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'.w-close',start:'top 65%'}});
});

/* direct addresses on /workshops (30.09.2026): #practice, #frameworks, #formats, #environments and #talk scroll to their section;
   #fwp1 to #fwp5 open that framework in place. The address is followed on Back and Forward; the fixed header never covers the target */
const SEC=['practice','frameworks','formats','environments','talk'];
function routeW(now){let h='';try{h=decodeURIComponent(location.hash.slice(1))}catch(e){}
  let el=null,pad=0;
  if(SEC.includes(h))el=$('#'+h);
  else if(/^fwp[1-5]$/.test(h)){const p=$('#'+h),r=p&&p.closest('.fwr');
    if(r){r.classList.add('open');const b=$('.fw-t',r);b&&b.setAttribute('aria-expanded','true');el=r;pad=110}}
  if(!el)return;
  LDT.go(el.getBoundingClientRect().top+scrollY-pad,now)}
if(location.hash){
  /* the browser may still apply its own anchor jump after load: confirm the target until the visitor moves */
  let moved=false;['wheel','touchstart','keydown','pointerdown'].forEach(ev=>addEventListener(ev,()=>{moved=true},{once:true,passive:true}));
  const again=()=>{if(!moved)routeW(true)};
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>requestAnimationFrame(again));
  addEventListener('load',()=>setTimeout(again,60),{once:true});setTimeout(again,500);setTimeout(again,1400)}
addEventListener('hashchange',()=>routeW(false));

/* from the offer straight to the conversation at the end of the page */
$('.fm-go').addEventListener('click',e=>{e.preventDefault();LDT.go($('#talk').getBoundingClientRect().top+scrollY)});

/* frameworks open in place: what each one works through */
$$('.fw-t').forEach(b=>{
  $$('.fw-d:not(.on)',b).forEach(d=>d.setAttribute('aria-hidden','true'));
  b.addEventListener('click',()=>{const r=b.closest('.fwr'),o=!r.classList.contains('open');r.classList.toggle('open',o);b.setAttribute('aria-expanded',o)});
});
})();
