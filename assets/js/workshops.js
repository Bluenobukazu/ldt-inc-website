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

/* from the offer straight to the conversation at the end of the page */
$('.fm-go').addEventListener('click',e=>{e.preventDefault();LDT.go($('#talk').getBoundingClientRect().top+scrollY)});

/* frameworks open in place: what each one works through */
$$('.fw-t').forEach(b=>{
  $$('.fw-d:not(.on)',b).forEach(d=>d.setAttribute('aria-hidden','true'));
  b.addEventListener('click',()=>{const r=b.closest('.fwr'),o=!r.classList.contains('open');r.classList.toggle('open',o);b.setAttribute('aria-expanded',o)});
});
})();
