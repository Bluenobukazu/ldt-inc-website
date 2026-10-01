/* People (visual rebuild 30.09.2026). A person is a dot whose size is what they carry. Few dots, flat, counted; capability spreads outward from its source, which keeps what it has.
   Figures keep fixed view boxes, so nothing is redrawn on resize. Uses assets/js/l2.js. */
(function(){
const {mk,init}=window.LDT_L2;
const NEED=['context','clarity','capability','confidence','access','the outcome'];
const R=(c,r)=>{const v=Math.max(0,r).toFixed(2);c.setAttribute('r',v);c.style.r=v+'px'};
const C=(svg,a)=>mk(a.t||'circle',(delete a.t,a),svg);
function build(root){
  const q=s=>root.querySelector(s),qa=s=>[...root.querySelectorAll(s)];
  /* 1 the entry: eleven people, a few carry most of it */
  const hs=q('.pl-f0 svg'),rad=[9,7,68,8,12,6,56,8,10,6,8],gap=26;let tot=rad.reduce((a,r)=>a+2*r,0)+gap*(rad.length-1),x=(1000-tot)/2;
  rad.forEach((r,i)=>{x+=r;const c=C(hs,{cx:x.toFixed(1),cy:85,r,class:'pl-dt',style:`--d:${(i*.09).toFixed(2)}s`});x+=r+gap});
  /* 2 the role: an outline that fills with what the person needs; what is missing comes back to the same few */
  const rs=q('.pl-rfig svg');C(rs,{cx:250,cy:150,r:124,class:'oc'});
  const inner=C(rs,{cx:250,cy:150,r:0}),few=C(rs,{cx:760,cy:150,r:50,class:'few'}),back=[...Array(6)].map(()=>C(rs,{r:9,class:'bk'}));
  const nb=qa('.pl-n'),nr=q('.pl-nr');
  const role=()=>{const on=nb.filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>+b.dataset.n),m=6-on.length;
    R(inner,124*Math.sqrt(on.length/6));R(few,50+m*11);
    back.forEach((e,k)=>{e.setAttribute('cx',(760-(50+m*11)-46-(k%2)*34).toFixed(1));e.setAttribute('cy',(100+Math.floor(k/2)*50).toFixed(1));e.style.opacity=k<m?1:0});
    const miss=NEED.filter((_,k)=>!on.includes(k));
    nr.textContent=m?`Still missing: ${miss.join(', ').replace(/, ([^,]*)$/,' and $1')}. So the questions and exceptions travel back.`:'Now the outcome stays where the role is.'};
  nb.forEach(b=>b.addEventListener('click',()=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');role()}));
  /* 3 the team: the same seven people. In a group the work sits with the one in the middle; in a team it moves */
  const P7=[[200,150],...[0,1,2,3,4,5].map(k=>[200+105*Math.cos((k*60-90)*Math.PI/180),150+105*Math.sin((k*60-90)*Math.PI/180)])];
  const tw=q('.pl-tw'),prs=qa('.pl-pr'),teams=qa('.pl-tf svg').map(svg=>{const g=svg.dataset.m==='g';
    P7.forEach((p,k)=>C(svg,{cx:p[0],cy:p[1],r:g?(k?13:30):19}));return{g,work:[...Array(26)].map(()=>C(svg,{t:'rect',width:9,height:9,class:'wk'}))}});
  const team=()=>{const p=tw.dataset.p==='1',n=p?26:12;
    teams.forEach(({g,work})=>{const at=[0,0,0,0,0,0,0];work.forEach((w,i)=>{if(i>=n){w.style.opacity=0;return}
      const k=g?(i<(p?23:10)?0:1+(i%6)):i%7,j=at[k]++,RR=(g?(k?13:30):19)+10+Math.floor(j/10)*13,a=(j%10)*36+Math.floor(j/10)*18-90;
      w.setAttribute('x',(P7[k][0]+RR*Math.cos(a*Math.PI/180)-4.5).toFixed(1));w.setAttribute('y',(P7[k][1]+RR*Math.sin(a*Math.PI/180)-4.5).toFixed(1));w.style.opacity=1})})};
  const press=on=>{tw.dataset.p=on?'1':'0';prs.forEach(b=>{b.setAttribute('aria-pressed',on);b.querySelector('span').textContent=on?'Take pressure off':'Add pressure'});team()};
  prs.forEach(b=>b.addEventListener('click',()=>press(tw.dataset.p!=='1')));
  /* 4 capability: held by one, or travelling. The holder never shrinks */
  const cs=q('.pl-cfig svg'),cf=q('.pl-cfig'),cd=[...Array(11)].map((_,i)=>C(cs,{cx:55+i*89,cy:110,r:7})),IDX=[5,1,9,3,8,6];[0,1].forEach(k=>C(cs,{class:'pr',cx:55+5*89,cy:110,r:46,style:`--d:${k*1.3}s`}));
  const hb=qa('.pl-h1'),sb=qa('.pl-s');let hold=0,trav=0;
  const cap=()=>{const h=IDX[hold];cf.dataset.s=trav;cs.querySelectorAll('.pr').forEach(e=>e.setAttribute('cx',55+h*89));cd.forEach((e,i)=>{const d=Math.abs(i-h);e.style.transitionDelay=trav&&d?(d*.28).toFixed(2)+'s':'0s';R(e,d===0?46:trav?12+26*Math.exp(-d/4):7)});
    hb.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.h===hold));sb.forEach(b=>b.setAttribute('aria-pressed',+b.dataset.s===trav))};
  hb.forEach(b=>b.addEventListener('click',()=>{hold=+b.dataset.h;cap()}));sb.forEach(b=>b.addEventListener('click',()=>{trav=+b.dataset.s;cap()}));
  /* 5 capacity: two teams and what each carries together */
  qa('.pl-cyf svg').forEach(svg=>{const y=+svg.dataset.y;
    if(!y){for(let k=0;k<8;k++)C(svg,{cx:70+(k%4)*60,cy:50+Math.floor(k/4)*62,r:17})}
    else{for(let k=0;k<24;k++){const big=k===8||k===15;C(svg,{cx:40+(k%6)*48,cy:34+Math.floor(k/6)*34,r:big?15:5.5})}}
    C(svg,{class:'ag',cx:160,cy:y?286:268,r:y?58:84,fill:'none'})});
  /* 6 context: the same people, arranged as each type of business is. Outline = outside the business */
  const xs=q('.pl-xfig svg'),xd=[];for(let r=0;r<4;r++)for(let c=0;c<9;c++)xd.push([C(xs,{cx:48+c*63,cy:30+r*60,r:4}),c,r]);
  const XS=[(c,r)=>c===4&&r===1?[32,1]:Math.hypot(c-4,r-1)<2?[9,1]:[4,1],(c,r)=>(c===1&&r===1)||(c===4&&r===2)||(c===7&&r===1)?[24,1]:[5,1],(c,r)=>c<3?[26-c*6,1]:[5,1],
    (c,r)=>c===2||c===5?[0,1]:[9-((c+r)%3)*1.5,1],(c,r)=>c>=3&&c<=5&&r>=1&&r<=2?[14,1]:(c*3+r*5)%3?[10,0]:[0,1],
    (c,r)=>[[1,1],[4,2],[7,1]].some(([a,b])=>Math.hypot(c-a,r-b)<1.6)?[11,1]:[0,1]];
  const xb=qa('.pl-b'),xr=qa('.pl-xr p');
  const ctx=b=>{xd.forEach(([e,c,r])=>{const [rad,f]=XS[b](c,r);R(e,rad);e.classList.toggle('o',!f)});xb.forEach(x=>x.setAttribute('aria-pressed',+x.dataset.b===b));xr.forEach(p=>p.classList.toggle('off',+p.dataset.b!==b))};
  xb.forEach(x=>x.addEventListener('click',()=>ctx(+x.dataset.b)));
  return()=>{nb.forEach(b=>b.setAttribute('aria-pressed',b.dataset.n==='1'||b.dataset.n==='4'));role();press(false);hold=0;trav=0;cap();ctx(0)};
}
window.LDT_PL={init:root=>{const ui=build(root),base=init(root,{});ui();return()=>{base();ui()}}};
})();
