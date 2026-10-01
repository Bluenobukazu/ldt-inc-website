/* Decisions (visual rebuild 30.09.2026). Every frame is a resolved still; motion only reveals what is already there.
   One mechanic in the last black frame: many open directions, a check, fewer options, one commitment. Uses assets/js/l2.js. */
(function(){
const {mk,canvas,rng,narrow,clamp,lerp,seg,init}=window.LDT_L2,RM=matchMedia('(prefers-reduced-motion: reduce)');
const ss=(a,b,v)=>{const t=seg(v,a,b);return t*t*(3-2*t)};
/* the mechanic: 14 open directions (short strokes) -> a check sweeps across -> 3 remain -> a second check -> 1 is committed and runs on */
function dcm(el,w,h){
  const g=canvas(el,w,h),box=el.getBoundingClientRect(),fr=el.closest('.l2-f'),n=narrow(),r=rng(7);
  const tx=s=>{const t=el.parentNode.querySelector(s),q=document.createRange();q.selectNodeContents(t);const a=q.getBoundingClientRect(),b=t.getBoundingClientRect();return{r:a.right-box.left,c:(b.top+b.bottom)/2-box.top,h:b.height}};
  const a=tx('.w0'),b=tx('.w1'),c=tx('.w2'),L=Math.max(n?16:22,w*.024),gap=w*.045,band=Math.max(a.h*.8,22);
  const x0=a.r+gap*1.4,x1=w-w*.04,cols=7,N=14,SV=[2,8,11],LAST=8;
  const O=[];for(let i=0;i<N;i++){const col=i%cols,row=Math.floor(i/cols),x=x0+(col+.25+r()*.5)*(x1-x0)/cols,y=a.c+(row?1:-1)*band*(.25+r()*.55);
    O.push({x,y,a:(r()*360)|0,e:mk('line',{stroke:'#fff','stroke-width':2.4,'stroke-linecap':'round'},g)})}
  const s2={2:[b.r+gap*1.2,b.c,-26],8:[b.r+gap*1.2+w*.07,b.c,0],11:[b.r+gap*1.2+w*.14,b.c,24]},fx=c.r+gap*.8,fy=c.c;
  const ring=mk('line',{stroke:'#fff','stroke-width':1.4},g),ring2=mk('line',{stroke:'#fff','stroke-width':1.4},g),gh=band*1.25;
  const pos=(o,x,y,ang,len,op,sw)=>{const d=ang*Math.PI/180,dx=Math.cos(d)*len/2,dy=Math.sin(d)*len/2;
    o.e.setAttribute('x1',(x-dx).toFixed(1));o.e.setAttribute('y1',(y-dy).toFixed(1));o.e.setAttribute('x2',(x+dx).toFixed(1));o.e.setAttribute('y2',(y+dy).toFixed(1));o.e.setAttribute('stroke-opacity',op.toFixed(3));if(sw)o.e.setAttribute('stroke-width',sw)};
  const R1=(x1-x0)+w*.05;
  el.__upd=p=>{
    const rad=ss(.10,.46,p)*R1,m2=ss(.52,.66,p),t4=ss(.80,.92,p),t5=ss(.90,1,p);
    O.forEach((o,i)=>{const d=o.x-x0,sv=SV.indexOf(i)>=0;let op=clamp(ss(0,.08,p)),x=o.x,y=o.y,ang=o.a,len=L,sw=2.4;
      if(!sv){op*=1-clamp((rad-d)/(w*.04))}
      else{const t=s2[i];x=lerp(o.x,t[0],m2);y=lerp(o.y,t[1],m2);ang=lerp(o.a%360>180?o.a-360:o.a,t[2],m2);
        if(i===2)op*=1-ss(.68,.74,p);if(i===11)op*=1-ss(.72,.78,p);
        if(i===LAST){x=lerp(x,fx,t4);y=lerp(y,fy,t4);ang=lerp(ang,0,t4);len=L+(w-fx-w*.04-L)*t5;x+=(len-L)/2;sw=lerp(2.4,4.2,t5)}}
      pos(o,x,y,ang,len,op,sw)});
    const gx=x0+rad-2;ring.setAttribute('x1',gx);ring.setAttribute('x2',gx);ring.setAttribute('y1',a.c-gh);ring.setAttribute('y2',a.c+gh);ring.setAttribute('stroke-opacity',(ss(.10,.14,p)*(1-ss(.44,.52,p))*.9).toFixed(3));
    const pr=ss(.66,.78,p);const g2=lerp(s2[2][0]-gap*.5,s2[11][0]+gap*.5,pr);ring2.setAttribute('x1',g2);ring2.setAttribute('x2',g2);ring2.setAttribute('y1',b.c-gh*.7);ring2.setAttribute('y2',b.c+gh*.7);ring2.setAttribute('stroke-opacity',(pr*(1-ss(.76,.80,p))*.9).toFixed(3));
    fr.dataset.st=p>=.80?2:p>=.50?1:0};
  const upd=el.__upd,start=()=>{cancelAnimationFrame(el.__raf);if(RM.matches){el.__p=1;upd(1);return}const t0=performance.now();
    const f=t=>{el.__p=clamp((t-t0)/7000);el.__upd(el.__p);if(el.__p<1)el.__raf=requestAnimationFrame(f)};el.__raf=requestAnimationFrame(f)};
  if(!el.__mo){el.__mo=new MutationObserver(()=>{const on=fr.classList.contains('in');
      if(on&&!el.__run){el.__run=1;start()}else if(!on){el.__run=0;cancelAnimationFrame(el.__raf);el.__p=0;el.__upd(0)}});
    el.__mo.observe(fr,{attributes:true,attributeFilter:['class']})}
  if(RM.matches){el.__p=1;upd(1)}else if(fr.classList.contains('in')&&!el.__run){el.__run=1;upd(0);start()}else upd(el.__p||0);
}
window.LDT_DE={init:root=>init(root,{draw:{dcm}})};
})();
