/* LDT INC | the workshop layer on /workshops */
(()=>{
const {RM,$,$$}=LDT;
gsap.registerPlugin(ScrollTrigger);

/* the opening sentence stays whole and readable from the first moment; it only settles in softly */
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{
  if(RM)return;
  gsap.from(['.w-hero .subbar','.w-hero .kick'],{opacity:0,y:20,duration:1.1,stagger:.08,ease:'expo.out',delay:.25});
  gsap.from('#kq,.w-sub,.w-offer,.w-cta',{opacity:0,y:24,stagger:.12,duration:.9,delay:.5,ease:'expo.out',clearProps:'transform,opacity'});

  const up=(sel,trig,st)=>gsap.from(sel,{opacity:0,y:36,stagger:st||0,duration:.95,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:trig,start:'top 82%'}});
  $$('.w-tp').forEach(t=>{up(t.querySelectorAll('.tp-head,.tp-q,.tp-d,.tp-fpd'),t,.1);up(t.querySelector('.tp-g'),t)});
  up('.src-yr,.src-kw','.src-top',.12);
  up('.src-led div,.src-why','.src-led',.08);
  up('.way','.ways',.12);
  up('.flex,.fm-go','.flex',.1);
  up('.env li','.env',.07);
  up('.ix li','.ix',.07);
  gsap.from('.w-close .row',{opacity:0,y:40,duration:1,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'.w-close',start:'top 65%'}});
});

/* direct addresses on /workshops (30.09.2026): #practice, #frameworks, #formats, #environments and #talk scroll to their section;
   #fwp1 to #fwp5 open that framework in place. The address is followed on Back and Forward; the fixed header never covers the target */
const SEC=['practice','frameworks','formats','environments','talk'];
function routeW(now){let h='';try{h=decodeURIComponent(location.hash.slice(1))}catch(e){}
  let el=null,pad=0;
  if(SEC.includes(h))el=$('#'+h);
  else if(/^fwp[1-5]$/.test(h)){const p=$('#'+h),r=p&&p.closest('.w-tp');
    if(r){el=r;pad=0}}
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
$$('.fm-go,.w-cta').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();LDT.go($('#talk').getBoundingClientRect().top+scrollY)}));

})();
