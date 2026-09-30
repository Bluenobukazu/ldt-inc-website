/* LDT INC | landing monolith (Layer 1), ported from prototype/landing-monolith-v3.html (approved by Lena, 26.09.2026)
   One isolated canvas for the landing only. It renders only while something changes and stops once its line has handed over to the cut. */
const LDT=window.LDT,d=document;
const root=d.querySelector('#journey .mono');
const $=s=>root.querySelector(s);
const RM=LDT.RM;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const ease={out:t=>1-Math.pow(1-t,4),inOut:t=>t<.5?8*t*t*t*t:1-Math.pow(-2*t+2,4)/2,expo:t=>t===1?1:1-Math.pow(2,-10*t)};
const seg=(t,a,b)=>clamp((t-a)/(b-a));

let THREE=null,RoundedBoxGeometry=null;
try{THREE=await import('three');({RoundedBoxGeometry}=await import('three/addons/geometries/RoundedBoxGeometry.js'))}catch(e){THREE=null}

let W,H,MOB,R0,r=null,gl=!!THREE,scene,cam,key,rim,floor,ao,mono,frag,cells=[],mh,mw,md,hitX,baseY,tmp;
function rnd(i){const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)} /* stable pseudo random */

function build(){
  W=innerWidth;H=innerHeight;MOB=W<=760;root.style.height=H+'px';R0=root.getBoundingClientRect();
  if(!THREE){cssOnly();return}
  if(gl&&!r){const t=d.createElement('canvas');if(!(t.getContext('webgl2')||t.getContext('webgl')))gl=false}
  if(gl&&!r){try{r=new THREE.WebGLRenderer({canvas:$('.mgl'),antialias:true,alpha:true})}catch(e){gl=false}}
  if(r){r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(W,H);r.shadowMap.enabled=true;r.shadowMap.type=THREE.VSMShadowMap;
    r.outputColorSpace=THREE.SRGBColorSpace;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.05}
  else{$('.mgl').style.display='none';$('.mfb').style.display='block'}
  if(scene)scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(o.material.map)o.material.map.dispose();o.material.dispose()}});
  tmp=new THREE.Object3D();
  scene=new THREE.Scene();
  cam=new THREE.PerspectiveCamera(MOB?38:26,W/H,.1,100);cam.position.set(0,MOB?1.3:1.25,MOB?10:9.4);cam.lookAt(0,MOB?1.9:1.35,0);
  scene.add(new THREE.HemisphereLight(0xffffff,0xd8d8d8,1.4));
  key=new THREE.DirectionalLight(0xffffff,2.1);key.position.set(-3.2,10,7);key.castShadow=true;key.shadow.mapSize.set(2048,2048);
  Object.assign(key.shadow.camera,{left:-6,right:6,top:6,bottom:-6,near:1,far:30});key.shadow.radius=14;key.shadow.blurSamples=24;key.shadow.bias=-.0006;scene.add(key);
  rim=new THREE.DirectionalLight(0xffffff,2.4);rim.position.set(6,5,-5);scene.add(rim);
  floor=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.ShadowMaterial({opacity:.12}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
  const cs=d.createElement('canvas');cs.width=cs.height=256;const g=cs.getContext('2d');
  if(g){const gr=g.createRadialGradient(128,128,0,128,128,128);gr.addColorStop(0,'rgba(0,0,0,.5)');gr.addColorStop(.35,'rgba(0,0,0,.2)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,256,256)}
  ao=new THREE.Mesh(new THREE.PlaneGeometry(2.2,.9),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cs),transparent:true,depthWrite:false}));ao.rotation.x=-Math.PI/2;ao.position.y=.002;scene.add(ao);
  mh=MOB?3.6:2.95;mw=MOB?.46:.74;md=.3;
  const mat=new THREE.MeshStandardMaterial({color:0x0b0b0b,roughness:.6,metalness:.08});
  mono=new THREE.Mesh(new RoundedBoxGeometry(mw,mh,md,4,.012),mat);mono.castShadow=true;mono.position.y=mh/2;scene.add(mono);
  /* fragments: the realities that form the body */
  const nx=1,ny=MOB?1:7,cw=mw/nx,ch=mh/ny;cells=[];
  frag=new THREE.InstancedMesh(new THREE.BoxGeometry(cw,ch*.985,md),mat,nx*ny);frag.castShadow=true;scene.add(frag);
  let k=0;for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
    const a=rnd(k*3+1),b=rnd(k*3+2),c=rnd(k*3+3);
    const side=j%2?1:-1;
    cells.push({home:new THREE.Vector3(0,ch*(j+.5),0),
      from:new THREE.Vector3(side*(.18+a*.22),ch*(j+.5)+.55+j*.16,(c-.5)*.3),
      rot:new THREE.Euler(0,side*(.25+b*.25),side*.035),
      delay:j*.09,dur:.85});k++}
  /* wordmark: baseline on the floor, monolith in the word space */
  const wm=$('.mwm');wm.style.fontSize='100px';const w100=wm.getBoundingClientRect().width;wm.style.fontSize=(100*(MOB?.9:.92)*W/w100)+'px';
  const base=toScreen(new THREE.Vector3(0,0,0));baseY=base.y;
  let mk=wm.querySelector('.bl');if(!mk){mk=d.createElement('i');mk.className='bl';mk.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';wm.querySelector('.l').appendChild(mk)}
  wm.style.top='0px';wm.style.top=(base.y-(mk.getBoundingClientRect().top-R0.top))+'px';
  const bR=wm.querySelector('.b').getBoundingClientRect(),lR=wm.querySelector('.l').getBoundingClientRect();
  const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(((bR.right+lR.left)/2-R0.left)/W*2-1,-(base.y/H*2-1)),cam);
  const hit=new THREE.Vector3();ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),hit);hitX=hit.x;
  mono.position.x=hitX;frag.position.x=hitX;ao.position.set(hitX+.2,.002,.2);
  if(MOB){$('#a1').classList.replace('l','r')}else{$('#a1').classList.replace('r','l')}
  /* as in the prototype, the wordmark and the word space above are measured before the camera takes its tilt (that is the approved composition);
     everything after uses the full camera, as the first render would */
  cam.updateMatrixWorld();
}
function toScreen(v){const p=v.clone().project(cam);return{x:(p.x+1)/2*W,y:(1-p.y)/2*H}}
/* silhouette of the body at a given height, for exact hairline contact */
function edgeAt(y,rotY,sx){const pts=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b])=>{const v=new THREE.Vector3(a*mw/2*sx,0,b*md/2*sx);v.applyAxisAngle(new THREE.Vector3(0,1,0),rotY);v.x+=hitX;v.y=y;return toScreen(v)});
  return{l:Math.min(...pts.map(p=>p.x)),r:Math.max(...pts.map(p=>p.x)),y:pts[0].y}}
/* without WebGL: a static CSS monolith on the projected outline of the same body */
function cssBox(){mono.updateMatrixWorld();const bb=mono.geometry.boundingBox||(mono.geometry.computeBoundingBox(),mono.geometry.boundingBox);
  const ps=[];for(const x of [bb.min.x,bb.max.x])for(const y of [bb.min.y,bb.max.y])for(const z of [bb.min.z,bb.max.z])ps.push(toScreen(new THREE.Vector3(x,y,z).applyMatrix4(mono.matrixWorld)));
  const l=Math.min(...ps.map(p=>p.x)),rr=Math.max(...ps.map(p=>p.x)),t=Math.max(-10,Math.min(...ps.map(p=>p.y))),b=Math.min(H+10,Math.max(...ps.map(p=>p.y)));
  Object.assign($('.mfb').style,{left:l+'px',width:(rr-l)+'px',top:t+'px',height:Math.max(0,b-t)+'px'})}

let mx=.5,lmx=.5;
if(!RM)addEventListener('pointermove',e=>{mx=e.clientX/innerWidth},{passive:true});

function frame(t,s){
  /* header: LDT INC takes the place of the identity once the landing is left (reduced motion: home.js) */
  /* same window as the prototype (.45 to .7), but one after the other: the identity has left before LDT INC arrives, so the two never overlap (Lena, 26.09.2026) */
  if(!RM){const ho=seg(s,.45,.575),hi=seg(s,.575,.7),who=d.querySelector('#hdr .who'),br=d.querySelector('#hdr .brand');
    who.style.opacity=1-ho;br.style.opacity=hi;who.style.transform=`translateY(${-ho*8}px)`;br.style.transform=`translateY(${(1-hi)*8}px)`;
    who.style.visibility=ho>=1?'hidden':'';br.style.visibility=hi>0?'visible':'hidden'}
  /* hand over: the line stands where the cut continues, the canvas stops */
  const END=LDT.heroEnd||1,gone=s>=END-.001;root.style.opacity=gone?0:'';if(gone)return;
  $('.room').style.opacity=1-seg(s,.7,END);
  if(!THREE)return;
  const F=RM||MOB?1:seg(t,0,1.75); /* formation: short, then stillness */
  lmx+=(mx-lmx)*.06;
  const rotY=-.5+(lmx-.5)*.05;
  /* scroll: the body becomes the thread */
  const S1=ease.inOut(seg(s,.18,.85));
  const sx=1-S1*(1-.022/mw*(MOB?1.4:1)),sy=1+S1*(MOB?1.6:2.4);
  const ry=rotY*(1-S1);
  const rise=MOB&&!RM?ease.inOut(seg(t,.1,1.3)):1;
  mono.rotation.y=ry;mono.scale.set(sx,sy*rise,sx);mono.position.y=mh*sy*rise/2-S1*(MOB?3.2:2.6);
  /* fragments in flight */
  const flying=F<1&&!RM&&!MOB&&!!r;
  frag.visible=flying;mono.visible=!flying;
  if(flying){cells.forEach((c,i)=>{const p=ease.inOut(clamp((t-.1-c.delay)/c.dur));
      tmp.position.lerpVectors(c.from,c.home,p);tmp.rotation.set(c.rot.x*(1-p),c.rot.y*(1-p),c.rot.z*(1-p));
      tmp.scale.set(1,1,1);tmp.position.applyAxisAngle(new THREE.Vector3(0,1,0),rotY);
      tmp.rotation.y+=rotY;tmp.updateMatrix();frag.setMatrixAt(i,tmp.matrix)});frag.instanceMatrix.needsUpdate=true;}
  /* light edge sweeps once after the body is complete */
  const L=seg(t,1.8,2.9);rim.position.set(-6+12*ease.inOut(L),5,-5);rim.intensity=2.4+(L>0&&L<1?Math.sin(L*Math.PI)*1.2:0);
  const shadowK=(RM?1:ease.out(seg(t,.5,1.9)))*(1-S1);floor.material.opacity=.12*shadowK;ao.material.opacity=shadowK;
  if(r)r.render(scene,cam);else cssBox();
  /* type */
  const intro=RM?1:ease.out(seg(t,.1,1.3));
  const out=ease.inOut(seg(s,0,.35));
  const wm=$('.mwm');wm.style.opacity=intro*(1-out);wm.style.transform=`translateX(-50%) translateY(${(1-intro)*24-out*40}px)`;
  const labIn=RM?1:ease.out(seg(t,1.9,2.8));
  [['#a1',.8],['#a2',.62]].forEach(([id,h],n)=>{const e=$(id),ed=edgeAt(mh*h,rotY,1),line=e.querySelector('i');
    const len=MOB?0:150;line.style.width=len+'px';line.style.transform=`scaleX(${labIn})`;line.style.display=MOB?'none':'';
    e.style.opacity=labIn*(1-out);
    if(MOB){e.style.left='22px';e.style.right='auto';e.style.top=(baseY+(n?150:96))+'px';}
    else if(id==='#a1'){e.style.right=(W-ed.l)+'px';e.style.left='auto';e.style.top=(ed.y-e.offsetHeight/2)+'px';}
    else{e.style.left=ed.r+'px';e.style.right='auto';e.style.top=(ed.y-e.offsetHeight/2)+'px';}});
  $('.mscroll').style.opacity=labIn*(1-out);
}
/* no three.js at all: a clean still of the same composition */
function cssOnly(){
  $('.mgl').style.display='none';const f=$('.mfb');f.style.display='block';const wm=$('.mwm');wm.style.fontSize='100px';const w100=wm.getBoundingClientRect().width;
  wm.style.fontSize=(100*(MOB?.9:.92)*W/w100)+'px';wm.style.top=(H*.52)+'px';
  const bR=wm.querySelector('.b').getBoundingClientRect(),lR=wm.querySelector('.l').getBoundingClientRect(),x0=bR.right-R0.left,gap=lR.left-bR.right;
  Object.assign(f.style,{left:(x0+gap*.2)+'px',width:(gap*.6)+'px',top:(H*.12)+'px',height:(bR.bottom-R0.top-H*.12)+'px'});
  const a1=$('#a1'),a2=$('#a2');[wm,a1,a2,$('.mscroll')].forEach(e=>e.style.opacity=1);
  if(MOB){[a1,a2].forEach((e,n)=>{e.classList.replace('l','r');e.querySelector('i').style.display='none';Object.assign(e.style,{left:'22px',right:'auto',top:(bR.bottom-R0.top+(n?150:96))+'px'})})}
  else{[a1,a2].forEach(e=>e.querySelector('i').style.width='150px');Object.assign(a1.style,{right:(W-x0-gap*.2)+'px',left:'auto',top:(H*.24)+'px'});Object.assign(a2.style,{left:(x0+gap*.8)+'px',right:'auto',top:(H*.36)+'px'})}
}

/* ---------- clock and loop: driven by the gsap ticker, after the scroll timeline has updated ---------- */
let t0=null,skip=false,ls=-1,dirty=true,built=false;
const now=()=>performance.now()/1000;
const clock=()=>RM||skip?10:t0===null?0:now()-t0;
const heroS=()=>RM?0:(LDT.heroS?LDT.heroS.s:0);
function tick(){
  if(!built)return;
  const t=clock(),s=heroS();
  const live=dirty||s!==ls||(s<(LDT.heroEnd||1)-.001&&((t<3.3&&t0!==null)||Math.abs(mx-lmx)>.0004));
  if(!live)return;
  dirty=false;ls=s;frame(t,s);
}
if(!RM)gsap.ticker.add(tick);

LDT.mono={
  /* called from home.js on every build: the scene and the wordmark follow the viewport */
  layout(){build();built=true;dirty=true;frame(clock(),heroS())},
  /* the finished thread: where the cut takes over, in stage pixels */
  line(){
    if(!THREE){const f=$('.mfb').getBoundingClientRect();return{left:f.left-R0.left+f.width/2-2,width:4}}
    const sx=.022/mw*(MOB?1.4:1),zf=md*sx/2;
    const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(0,0),cam);
    const p=new THREE.Vector3();ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,0,1),-zf),p);
    const e=edgeAt(p.y,0,sx);return{left:e.l,width:e.r-e.l};
  },
  /* entrance: once, from the first frame; skipped when the visitor arrives deeper in the page */
  start(skipIntro){skip=!!skipIntro;t0=now();dirty=true}
};
if(LDT.monoReady)LDT.monoReady(LDT.mono);
