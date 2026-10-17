/* LDT INC | the moments of Layer 1 where the glass appears (one shared material, see glasstext.js).
   Moment 1: Connect. On the black stage a pane of glass passes over "Multiple realities, read as one connected business system."
   and bends the words it crosses. It is driven by the scroll position, grows out of a thin line (the thread) and leaves the same way.
   The page text is never touched. Reduced motion, no WebGL, or a phone without room: nothing is created. */
import {glassText} from './glasstext.js';

const LDT=window.LDT;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const seg=(x,a,b)=>clamp((x-a)/(b-a));
const ease=t=>t*t*(3-2*t);
const MOB=()=>innerWidth<=760;

if(LDT&&LDT.HOME&&!LDT.RM&&typeof LDT.jat==='function'&&window.gsap){
  /* Moment 1: Connect */
  const connect=glassText({
    words:()=>[...document.querySelectorAll('#journey .j-connect .rw')].filter(s=>!s.querySelector('.rw')),
    pane:{w:130,h:250,d:44,p:4.2,thick:.2,ior:1.38}
  });
  if(connect){
    let n=0;
    const tick=()=>{
      const p=LDT.jp,a0=LDT.jat(.475)+.03,a1=LDT.jat(.505);   /* the sentence has arrived ... it starts to leave */
      const on=typeof p==='number'&&p>a0-.03&&p<a1+.02&&!LDT.open;
      if(!on){connect.frame(false);return}
      if(++n&1&&p===tick.lp){return}    /* standing still: half the frame rate */
      tick.lp=p;
      connect.frame(true,box=>{
        const u=seg(p,a0,a1),sc=clamp(box.h*1.22/250,.5,1.6);
        const grow=ease(seg(u,0,.1))*(1-ease(seg(u,.9,1)));
        return{x:box.l-box.w*.12+u*box.w*1.24,y:box.t+box.h/2,grow,scale:sc,rot:.3}
      },performance.now()/1000);
    };
    window.gsap.ticker.add(tick);
  }
}
