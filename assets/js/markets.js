/* Markets (visual rebuild 30.09.2026). One device: clarity. Conditions and route owners blur the phrase "The customer". Uses assets/js/l2.js. */
(function(){
const {init}=window.LDT_L2;
const W={fa:['ch','pr','lo'],wh:['ch','de','tr'],ho:['ru','pr','de'],cu:['ru','ch','lo']};
function ui(root){
  const wf=root.querySelector('.mr-wf'),tc=[...root.querySelectorAll('.mr-t')],rd=[...root.querySelectorAll('.mr-rd p')],rt=root.querySelector('.mr-rt'),ts=[...root.querySelectorAll('.mr-s')],rc=[...root.querySelectorAll('.mr-rc p')];
  root.querySelectorAll('.mr-pl li').forEach((l,i)=>l.style.setProperty('--n',i));
  const weigh=c=>{wf.dataset.c=c;[...wf.querySelectorAll('span')].forEach(w=>w.classList.toggle('hv',W[c].includes(w.dataset.k)));tc.forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===c));rd.forEach(p=>p.classList.toggle('off',p.dataset.c!==c))};
  const route=k=>{rt.dataset.r=k;ts.forEach(b=>b.setAttribute('aria-pressed',b.dataset.r===k));rc.forEach(p=>p.classList.toggle('off',p.dataset.r!==k))};
  tc.forEach(b=>b.addEventListener('click',()=>weigh(b.dataset.c)));ts.forEach(b=>b.addEventListener('click',()=>route(b.dataset.r)));
  return()=>{weigh('fa');route('0')};
}
window.LDT_MR={init:root=>{const base=init(root,{}),u=ui(root);u();return()=>{base();u()}}};
})();
