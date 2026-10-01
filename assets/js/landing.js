/* Landing refinements (visual, 01.10.2026): the existing journey and choreography stay. Added: one thread through all chapters,
   twenty marks for the two decades in Proof, rings that reach out in Contact. */
(function(){
const RMq=matchMedia('(prefers-reduced-motion: reduce)'),d=document;
/* 1 the thread: a hairline down the left edge with a mark for each chapter and a point that travels with the page */
const th=d.createElement('div');th.id='thread';th.className='chrome';th.setAttribute('aria-hidden','true');
th.innerHTML='<i class="ln"></i>'+[...Array(8)].map(()=>'<i class="tk"></i>').join('')+'<i class="pt"></i>';d.body.appendChild(th);
const tks=[...th.querySelectorAll('.tk')],pt=th.querySelector('.pt');
const span=()=>Math.max(1,d.documentElement.scrollHeight-innerHeight);
const place=()=>{const J=d.getElementById('journey'),S=span(),y=id=>{const e=d.getElementById(id);return e?e.getBoundingClientRect().top+scrollY:0},jt=J?J.getBoundingClientRect().top+scrollY:0,jh=J?J.offsetHeight-innerHeight:0;
  const pos=[jt,jt+jh*.2,jt+jh*.42,jt+jh*.62,y('proof'),y('transformation'),y('ways'),y('contact')];
  tks.forEach((t,i)=>{t.style.top=Math.min(1,Math.max(0,pos[i]/S))*100+'%'})};
let raf=0;const upd=()=>{raf=0;const S=span();pt.style.top=Math.min(1,scrollY/S)*100+'%';th.classList.toggle('on',scrollY>innerHeight*.25)};
addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(upd)},{passive:true});addEventListener('resize',()=>{place();upd()});addEventListener('load',()=>{place();upd()});
if('ResizeObserver' in window)new ResizeObserver(()=>{place();upd()}).observe(d.body);place();upd();
/* 2 and 3: drawn once when they come into view */
const once=(el,cls)=>{if(!el)return;if(RMq.matches||!('IntersectionObserver' in window)){el.classList.add(cls);return}const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){el.classList.add(cls);io.disconnect()}},{threshold:.35});io.observe(el)};
const grid=d.querySelector('#proof .grid');
if(grid&&!d.querySelector('.lx-years')){const y=d.createElement('div');y.className='lx-years';y.setAttribute('aria-hidden','true');y.innerHTML=[...Array(20)].map((_,i)=>`<i style="--k:${i}"></i>`).join('');grid.insertAdjacentElement('afterend',y);once(y,'go')}
const ci=d.querySelector('#contact .c-in');
if(ci&&!d.querySelector('.lx-rings')){const r=d.createElement('div');r.className='lx-rings';r.setAttribute('aria-hidden','true');r.innerHTML='<svg viewBox="0 0 400 400" focusable="false">'+[...Array(5)].map((_,i)=>`<circle cx="200" cy="200" r="${30+i*36}" style="--k:${i}"/>`).join('')+'<circle class="c" cx="200" cy="200" r="6"/></svg>';ci.appendChild(r);once(r,'go')}
})();
