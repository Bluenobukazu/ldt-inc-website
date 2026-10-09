/* LDT INC | the workshop layer on /workshops */
(()=>{
const {RM,$,$$}=LDT;
gsap.registerPlugin(ScrollTrigger);

/* the title, the statement and the request settle in softly; every text is readable from the first moment */
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{
  if(RM)return;
  gsap.from('.w-hero .kick',{opacity:0,y:20,duration:1.1,ease:'expo.out',delay:.2,clearProps:'transform,opacity'});
  gsap.from('.w-sub',{opacity:0,y:20,duration:.9,delay:.5,ease:'expo.out',clearProps:'transform,opacity'});
  gsap.from('.w-pans .pan',{opacity:0,y:40,stagger:.14,duration:1,delay:.7,ease:'expo.out',clearProps:'transform,opacity'});
  gsap.from('.w-cta,.w-aud',{opacity:0,y:20,stagger:.12,duration:.9,delay:1,ease:'expo.out',clearProps:'transform,opacity'});

  const up=(sel,trig,st)=>gsap.from(sel,{opacity:0,y:36,stagger:st||0,duration:.95,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:trig,start:'top 82%'}});
  up('.way','.ways',.12);
  up('.flex','.flex');
  up('.tq li','.tq',.08);
  up('.env li','.env',.07);
  $$('.w-tp').forEach(t=>{up(t.querySelectorAll('.tp-head,.tp-q,.tp-d,.tp-fpd'),t,.1);up(t.querySelector('.tp-g'),t)});
  up('.src-yr,.src-kw','.src-top',.12);
  up('.src-led div,.src-why','.src-led',.08);
  gsap.from('.w-close .row',{opacity:0,y:40,duration:1,ease:'expo.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'.w-close',start:'top 65%'}});
});

/* direct addresses on /workshops: #practice, #frameworks, #formats, #environments and #talk scroll to their section;
   #fwp1 to #fwp5 open that topic in place. The address is followed on Back and Forward */
const SEC=['practice','frameworks','formats','environments','talk'];
function routeW(now){let h='';try{h=decodeURIComponent(location.hash.slice(1))}catch(e){}
  let el=null;
  if(SEC.includes(h))el=$('#'+h);
  else if(/^fwp[1-5]$/.test(h)){const p=$('#'+h),r=p&&p.closest('.w-tp');if(r)el=r}
  if(!el)return;
  LDT.go(el.getBoundingClientRect().top+scrollY,now)}
if(location.hash){
  let moved=false;['wheel','touchstart','keydown','pointerdown'].forEach(ev=>addEventListener(ev,()=>{moved=true},{once:true,passive:true}));
  const again=()=>{if(!moved)routeW(true)};
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>requestAnimationFrame(again));
  addEventListener('load',()=>setTimeout(again,60),{once:true});setTimeout(again,500);setTimeout(again,1400)}
addEventListener('hashchange',()=>routeW(false));

/* links inside the page: the hero request and the audience links scroll smoothly to their target */
$$('.w-cta').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();LDT.go($('#talk').getBoundingClientRect().top+scrollY)}));
})();
