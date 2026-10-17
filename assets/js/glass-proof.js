/* LDT INC | glass test (not part of the site). One material, two intensities:
   the monolith as dark glass on the white landing, and a clear lens with a thin pane over real type on black.
   The type sits inside the 3D scene, so the glass really refracts it. */
import * as THREE from 'three';

/* a tall slab whose section is a superellipse: the surfaces are gently curved, so light runs across the face
   and the type behind bends at the edges. p sets how square the section is. */
function slabGeo(w,h,d,p){
  const a=w/2,b=d/2,N=180,pts=[];
  for(let i=0;i<N;i++){const th=i/N*Math.PI*2,c=Math.cos(th),s=Math.sin(th);
    pts.push(new THREE.Vector2(a*Math.sign(c)*Math.pow(Math.abs(c),2/p),b*Math.sign(s)*Math.pow(Math.abs(s),2/p)))}
  const g=new THREE.ExtrudeGeometry(new THREE.Shape(pts),{depth:h,bevelEnabled:false,steps:1});
  g.rotateX(-Math.PI/2);g.translate(0,-h/2,0);g.computeVertexNormals();
  const pos=g.attributes.position,nor=g.attributes.normal,acc=new Map();
  for(let i=0;i<pos.count;i++){if(Math.abs(nor.getY(i))>.9)continue;
    const k=pos.getX(i).toFixed(4)+'|'+pos.getZ(i).toFixed(4),v=acc.get(k)||[0,0];v[0]+=nor.getX(i);v[1]+=nor.getZ(i);acc.set(k,v)}
  for(let i=0;i<pos.count;i++){if(Math.abs(nor.getY(i))>.9)continue;
    const v=acc.get(pos.getX(i).toFixed(4)+'|'+pos.getZ(i).toFixed(4)),l=Math.hypot(v[0],v[1])||1;nor.setXYZ(i,v[0]/l,0,v[1]/l)}
  return g;
}

const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;

function hasGL(){try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'))}catch(e){return false}}

/* a soft box: bright at the top, fading down, soft at the sides. Reflected in a flat face it gives the face a gradient,
   which is what makes dark glass look deep instead of painted */
function gradTex(){
  const W=128,H=256,c=document.createElement('canvas');c.width=W;c.height=H;
  const g=c.getContext('2d'),id=g.createImageData(W,H);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    const v=Math.pow(1-y/(H-1),2.1),u=Math.pow(Math.sin(Math.PI*x/(W-1)),.7),k=Math.round(255*v*u);
    id.data.set([k,k,k,255],(y*W+x)*4)}
  g.putImageData(id,0,0);return new THREE.CanvasTexture(c);
}

/* studio light for the reflections. mode 'soft': a large gradient soft box where the face looks, plus thin strips for precise edge light. */
function envTexture(renderer,mode){
  const pm=new THREE.PMREMGenerator(renderer),s=new THREE.Scene();
  s.background=new THREE.Color(0x030303);
  const strip=(w,h,x,y,z,k,map)=>{
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(k,k,k),map:map||null,side:THREE.DoubleSide}));
    m.position.set(x,y,z);m.lookAt(0,0,0);s.add(m)};
  if(mode==='soft'){
    const gt=gradTex();
    strip(6.5,4.6,-5.4,0,4.5,1.15,gt);  /* soft box, left front: sized to what the face can see, so it reads as one slow top to bottom gradient */
    strip(2.6,14,5.7,.5,3.6,.9,gt);    /* quieter soft box, right front */
    strip(.35,12,3.1,0,5.6,12);        /* thin strip: one precise line of light on the right edge */
    strip(12,3,0,6.5,2,3);             /* top soft box, catches the top surface */
    strip(.5,10,4.5,0,-6,12);          /* rim from behind, right */
    strip(.5,10,-4.5,0,-6,7);          /* rim from behind, left */
  }else{
    strip(1.3,11,-5.2,0,3.6,3.2);
    strip(1.2,11,5.6,0,2.4,10);
    strip(12,3,0,6.5,2,4);
    strip(.5,10,4.5,0,-6,14);
    strip(.5,10,-4.5,0,-6,8);
    strip(5,5,-1.5,3.5,9,.3);
  }
  const t=pm.fromScene(s,.03).texture;pm.dispose();return t;
}

/* the typography behind the glass, painted at device resolution */
function paint(w,h,dpr,bg,draw){
  const k=Math.min(dpr,4096/Math.max(w,h)),c=document.createElement('canvas');
  c.width=Math.round(w*k);c.height=Math.round(h*k);
  const g=c.getContext('2d');g.scale(k,k);g.fillStyle=bg;g.fillRect(0,0,w,h);draw(g,w,h);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;
}
function fit(g,font,text,size,maxW){g.font=font.replace('{s}',size+'px');const w=g.measureText(text).width;return w>maxW?size*maxW/w:size}

/* the landing: the wordmark stands on the floor line, the monolith sits in the word space */
const WM={gap:.5,floor:.742};
const drawWordmark=(g,w,h)=>{
  const r=g.createRadialGradient(w/2,h*.45,0,w/2,h*.45,Math.max(w,h)*.72);
  r.addColorStop(0,'#ffffff');r.addColorStop(1,'#eeeeee');g.fillStyle=r;g.fillRect(0,0,w,h);
  g.fillStyle='#000';g.textAlign='left';g.textBaseline='alphabetic';
  const f='800 {s} "Mona Sans"',s=fit(g,f,'LDT INC',400,w*.9);g.font=f.replace('{s}',s+'px');
  const full=g.measureText('LDT INC').width,a=g.measureText('LDT').width,b=g.measureText('INC').width,x0=(w-full)/2;
  WM.gap=(x0+a+(full-a-b)/2)/w;
  g.fillText('LDT INC',x0,h*WM.floor);
};
const drawStatement=(g,w,h)=>{
  g.fillStyle='#fff';g.textAlign='left';g.textBaseline='alphabetic';
  const sans='700 {s} "Mona Sans"',serif='italic 400 {s} "Libre Baskerville"',L=['Multiple realities,','read as one connected'],I='business system.';
  const maxW=w*.86;
  let s=Math.min(w*.078,h*.13);
  s=Math.min(s,fit(g,sans,L[1],s,maxW),fit(g,serif,I,s,maxW));
  const x=w*.07,lh=s*1.16,y0=h/2-lh*.5;
  g.font=sans.replace('{s}',s+'px');g.fillText(L[0],x,y0);g.fillText(L[1],x,y0+lh);
  g.font=serif.replace('{s}',s*.94+'px');g.fillText(I,x,y0+lh*2);
};

async function stage(el,cfg){
  if(!hasGL()){el.classList.add('nogl');return}
  const canvas=el.querySelector('canvas');
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,antialias:true})}catch(e){el.classList.add('nogl');return}
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;
  const scene=new THREE.Scene();scene.background=new THREE.Color(cfg.bg);
  scene.environment=envTexture(renderer,cfg.env);
  const cam=new THREE.PerspectiveCamera(cfg.fov,1,.1,80);
  const back=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({toneMapped:false}));
  back.position.z=-cfg.back;scene.add(back);
  const key=new THREE.DirectionalLight(0xffffff,cfg.key);key.position.set(-4,6,8);scene.add(key);
  const things=cfg.make(THREE,scene);
  let W=0,H=0,vw=1,vh=1,tex=null;
  const pt={x:0,y:0,sx:0,sy:0};
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();pt.x=(e.clientX-r.left)/r.width-.5;pt.y=(e.clientY-r.top)/r.height-.5},{passive:true});

  function layout(){
    W=el.clientWidth;H=el.clientHeight;if(!W||!H)return;
    const dpr=Math.min(devicePixelRatio||1,2);
    renderer.setPixelRatio(dpr);renderer.setSize(W,H,false);
    cam.aspect=W/H;cam.position.set(0,0,cfg.camZ);cam.lookAt(0,0,0);cam.updateProjectionMatrix();
    const tn=Math.tan(cam.fov*Math.PI/360);
    vh=2*tn*cfg.camZ;vw=vh*cam.aspect;
    const dist=cfg.camZ+cfg.back;
    back.scale.set(2*tn*dist*cam.aspect,2*tn*dist,1);
    if(tex)tex.dispose();
    tex=paint(W,H,dpr,cfg.bgCss,cfg.draw);back.material.map=tex;back.material.needsUpdate=true;
    cfg.place&&cfg.place(things,{W,H,vw,vh,camZ:cfg.camZ,mob:W<=760});
  }
  function frame(t){
    pt.sx+=(pt.x-pt.sx)*.04;pt.sy+=(pt.y-pt.sy)*.04;
    cfg.tick(things,RM?0:t/1000,pt,{vw,vh,camZ:cfg.camZ,mob:W<=760});
    key.position.x=-4+(RM?0:Math.sin(t/2600)*6);
    renderer.render(scene,cam);
  }
  await document.fonts.load('800 100px "Mona Sans"');await document.fonts.load('700 100px "Mona Sans"');await document.fonts.load('italic 400 100px "Libre Baskerville"');
  layout();frame(0);
  new ResizeObserver(()=>{layout();frame(0)}).observe(el);
  if(RM)return;
  let vis=true,raf=0;
  const loop=t=>{if(!vis){raf=0;return}frame(t);raf=requestAnimationFrame(loop)};
  new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(loop)}).observe(el);
  raf=requestAnimationFrame(loop);
}

/* one glass, tuned per use */
const glass=(o)=>new THREE.MeshPhysicalMaterial(Object.assign({transmission:1,ior:1.5,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.04,envMapIntensity:1.6,specularIntensity:1},o));

const canvasTex=(w,h,paintFn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;paintFn(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t};
/* the floor: a white veil that lets the mirror image fade away, and a soft contact shadow under the foot */
const FADE=canvasTex(2,256,(g,w,h)=>{const r=g.createLinearGradient(0,0,0,h);r.addColorStop(0,'rgba(255,255,255,.4)');r.addColorStop(.5,'rgba(255,255,255,.86)');r.addColorStop(1,'rgba(255,255,255,1)');g.fillStyle=r;g.fillRect(0,0,w,h)});
const SHADOW=canvasTex(256,256,(g)=>{const r=g.createRadialGradient(128,128,0,128,128,128);r.addColorStop(0,'rgba(0,0,0,.55)');r.addColorStop(.4,'rgba(0,0,0,.2)');r.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=r;g.fillRect(0,0,256,256)});

/* A: the monolith as dark glass. You see into it: a back surface behind the front one, light that runs top to bottom, a thin precise edge,
   the foot meeting a glossy floor. Silhouette and wordmark as on the landing. */
const BASE=-1.05,MH=2.95;
stage(document.getElementById('sa'),{
  bg:0xffffff,bgCss:'#fff',env:'soft',fov:26,camZ:9.4,back:3.2,key:.8,draw:drawWordmark,
  make:(T,scene)=>{
    const m=glass({color:0x121212,thickness:1.7,ior:1.52,roughness:.02,side:THREE.DoubleSide,attenuationColor:new T.Color(0x000000),attenuationDistance:1.2,envMapIntensity:1.5});
    const geo=slabGeo(.74,MH,.34,4.2),mono=new THREE.Mesh(geo,m),refl=new THREE.Mesh(geo,m);
    scene.add(mono,refl);
    const veil=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:FADE,transparent:true,depthWrite:false,toneMapped:false}));
    veil.position.z=1.4;veil.renderOrder=2;scene.add(veil);
    const shadow=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1),new THREE.MeshBasicMaterial({map:SHADOW,transparent:true,depthWrite:false,toneMapped:false}));
    shadow.rotation.x=-Math.PI/2;shadow.position.set(0,BASE+.004,.35);shadow.renderOrder=3;scene.add(shadow);
    return{mono,refl,veil,shadow};
  },
  place:({mono,veil,shadow},v)=>{
    const k=v.mob?.62:1;mono.scale.set(k,k*(v.mob?1.18:1),k);
    mono.userData.x=(WM.gap-.5)*v.vw;
    const z=1.4,sc=(v.camZ-z)/v.camZ,fy=BASE*sc,bottom=-v.vh/2*sc;
    veil.scale.set(v.vw*2,fy-bottom,1);veil.position.y=(fy+bottom)/2;
    shadow.scale.set(k,1,1);
  },
  /* motion is restrained: the glass turns a few hundredths of a radian, so the light slides slowly across it */
  tick:({mono,refl,shadow},t,p)=>{
    const h=mono.scale.y*MH/2,x=mono.userData.x||0;
    mono.position.set(x,BASE+h,0);
    mono.rotation.set(p.sy*.02,-.42+Math.sin(t*.22)*.04+p.sx*.08,0);
    refl.scale.set(mono.scale.x,-mono.scale.y,mono.scale.z);refl.position.set(x,BASE-h,0);refl.rotation.copy(mono.rotation);
    shadow.position.x=x+.18;
  }
});

/* B: clear lens and a thin pane over real type on black */
stage(document.getElementById('sb'),{
  bg:0x000000,bgCss:'#000',env:'studio',fov:26,camZ:9.4,back:2.6,key:1,draw:drawStatement,
  make:(T,scene)=>{
    /* a lens bends the type, it must not destroy it: the words stay readable and shift at the edges */
    const lensM=glass({color:0xffffff,thickness:.9,ior:1.45,roughness:.02,attenuationColor:new T.Color(0xdddddd),attenuationDistance:6,envMapIntensity:1.8});
    const lens=new THREE.Mesh(slabGeo(1.5,2.7,.4,3.4),lensM);scene.add(lens);
    const paneM=glass({color:0xf2f2f2,thickness:.8,ior:1.5,roughness:.03,envMapIntensity:2.4});
    const pane=new THREE.Mesh(slabGeo(.09,3.3,.5,3),paneM);scene.add(pane);
    return{lens,pane};
  },
  place:({lens,pane},v)=>{
    if(v.mob){lens.scale.setScalar(.5);lens.position.set(v.vw*.04,0,0);pane.scale.setScalar(.55);pane.position.set(v.vw*.38,0,0)}
    else{lens.scale.setScalar(1);lens.position.set(v.vw*.04,0,0);pane.scale.setScalar(1);pane.position.set(v.vw*.3,0,0)}
  },
  tick:({lens,pane},t,p)=>{
    lens.rotation.y=.3+p.sx*.5+Math.sin(t*.4)*.12;lens.rotation.x=p.sy*.08;
    pane.rotation.y=.18+p.sx*.7+Math.sin(t*.3+1)*.1;
  }
});
