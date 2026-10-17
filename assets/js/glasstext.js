/* LDT INC | glass over real type (shared by the glass moments of Layer 1).
   A transparent canvas lies over the page. It holds a copy of the words under the glass, but the copy is drawn only into the glass's
   refraction buffer, never to the screen: outside the glass the visitor sees the real text of the page, inside it the same words bent by a real lens.
   The text on the page is never replaced, hidden or restyled. Without WebGL nothing is created. */
import * as THREE from 'three';

const U=100;   /* one scene unit is 100 screen pixels */

function hasGL(){try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'))}catch(e){return false}}

/* a tall slab whose section is a superellipse: curved faces, so light runs across it and type bends at its edges */
function slabGeo(w,h,d,p){
  const a=w/2,b=d/2,N=160,pts=[];
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

/* studio light for the reflections: a dark room with soft boxes and thin strips, so the edges of the glass catch light */
function studio(renderer){
  const pm=new THREE.PMREMGenerator(renderer),s=new THREE.Scene();s.background=new THREE.Color(0x030303);
  const box=(w,h,x,y,z,k)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(k,k,k),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);s.add(m)};
  box(1.3,11,-5.2,0,3.6,1.3);box(1.2,11,5.6,0,2.4,3.2);box(12,3,0,6.5,2,4);box(.5,10,4.5,0,-6,14);box(.5,10,-4.5,0,-6,8);box(5,5,-1.5,3.5,9,.3);
  const t=pm.fromScene(s,.03).texture;pm.dispose();return t;
}

/* options: words() returns the elements to mirror under the glass; pane {w,h,d,p,thick} in screen pixels. Returns null without WebGL. */
export function glassText(opts){
  if(!hasGL())return null;
  const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');canvas.className='glass-over';Object.assign(canvas.style,{position:'fixed',left:'0',top:'0',width:'100vw',height:'100vh',pointerEvents:'none',zIndex:'50',display:'none'});
  document.body.appendChild(canvas);
  let renderer;try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true})}catch(e){canvas.remove();return null}
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;renderer.setClearColor(0x000000,0);
  const scene=new THREE.Scene();scene.environment=studio(renderer);
  const cam=new THREE.PerspectiveCamera(26,1,.1,400);
  const key=new THREE.DirectionalLight(0xffffff,.9);key.position.set(-4,6,8);scene.add(key);
  /* the copy lives only in the refraction buffer: it is drawn when the renderer targets that buffer, never to the screen */
  const hidden=(mesh)=>{mesh.onBeforeRender=(r)=>{mesh.material.colorWrite=r.getRenderTarget()!==null}};
  const back=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({color:0x000000,toneMapped:false}));hidden(back);scene.add(back);
  const glassM=new THREE.MeshPhysicalMaterial({color:0xffffff,transmission:1,thickness:.5,ior:1.45,roughness:.02,metalness:0,clearcoat:1,clearcoatRoughness:.04,
    attenuationColor:new THREE.Color(0xdddddd),attenuationDistance:6,envMapIntensity:1.8,specularIntensity:1});
  const P=Object.assign({w:150,h:240,d:56,p:3.4,thick:.55},opts.pane||{});
  const pane=new THREE.Mesh(slabGeo(P.w/U,P.h/U,P.d/U,P.p),glassM);glassM.thickness=P.thick;if(P.ior)glassM.ior=P.ior;scene.add(pane);
  let W=0,H=0,Dz=10,dpr=1;const cache=new Map();
  const ZW=-.6;   /* depth of the copy behind the glass */

  function size(){
    W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,2);
    renderer.setPixelRatio(dpr);renderer.setSize(W,H,false);
    cam.aspect=W/H;Dz=(H/U/2)/Math.tan(cam.fov*Math.PI/360);cam.position.set(0,0,Dz);cam.lookAt(0,0,0);cam.updateProjectionMatrix();
    const s=(Dz+1.6)/Dz;back.scale.set(W/U*s*1.1,H/U*s*1.1,1);back.position.z=-1.6;
    cache.forEach(c=>{c.tex.dispose();c.mesh.geometry.dispose();c.mesh.material.dispose();scene.remove(c.mesh)});cache.clear();
  }
  /* a word as it is typeset on the page: same font, size, letter spacing and case, white on black */
  function wordTex(el,k,pad){
    const cs=getComputedStyle(el),w=el.offsetWidth+2*pad,h=el.offsetHeight+2*pad,c=document.createElement('canvas');
    c.width=Math.max(2,Math.ceil(w*k*dpr));c.height=Math.max(2,Math.ceil(h*k*dpr));
    const g=c.getContext('2d');g.scale(k*dpr,k*dpr);g.fillStyle='#000';g.fillRect(0,0,w,h);g.fillStyle='#fff';
    g.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;if('letterSpacing' in g)g.letterSpacing=cs.letterSpacing;g.textBaseline='alphabetic';
    const t=cs.textTransform==='uppercase'?el.textContent.toUpperCase():el.textContent,fa=g.measureText(t).fontBoundingBoxAscent||el.offsetHeight*.8;
    g.fillText(t,pad,pad+fa);
    const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;return tex;
  }
  const opacityOf=el=>{let o=1;for(let n=el;n&&n!==document.body;n=n.parentElement){o*=+getComputedStyle(n).opacity;if(o<.01)return 0}return o};

  function sync(words){
    const seen=new Set();let l=1e9,t=1e9,r=-1e9,b=-1e9;
    words.forEach(el=>{
      const rc=el.getBoundingClientRect();if(!rc.width||!el.offsetWidth)return;
      const k=rc.width/el.offsetWidth,pad=4,key=el.textContent+'|'+Math.round(k*100)+'|'+getComputedStyle(el).fontSize;
      let c=cache.get(el);
      if(!c||c.key!==key){if(c){c.tex.dispose();c.mesh.geometry.dispose();c.mesh.material.dispose();scene.remove(c.mesh)}
        const tex=wordTex(el,k,pad),mesh=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:tex,toneMapped:false}));hidden(mesh);scene.add(mesh);
        c={key,tex,mesh,pad,k};cache.set(el,c)}
      seen.add(el);
      const s=(Dz-ZW)/Dz,cx=(rc.left+rc.width/2-W/2)*s/U,cy=(H/2-(rc.top+rc.height/2))*s/U;
      c.mesh.scale.set((rc.width+2*c.pad*k)*s/U,(rc.height+2*c.pad*k)*s/U,1);c.mesh.position.set(cx,cy,ZW);
      const o=opacityOf(el);c.mesh.material.color.setScalar(o);
      l=Math.min(l,rc.left);t=Math.min(t,rc.top);r=Math.max(r,rc.right);b=Math.max(b,rc.bottom);
    });
    cache.forEach((c,el)=>{if(!seen.has(el)){c.tex.dispose();c.mesh.geometry.dispose();c.mesh.material.dispose();scene.remove(c.mesh);cache.delete(el)}});
    return seen.size?{l,t,r,b,w:r-l,h:b-t}:null;
  }

  size();
  let rsz=0;addEventListener('resize',()=>{clearTimeout(rsz);rsz=setTimeout(size,120)},{passive:true});

  return {
    canvas,
    /* on: whether the glass is shown. state(box) returns {x, y (centre of the pane, px), grow 0..1, rot, tilt, scale} from the box of the words. */
    frame(on,state,time){
      canvas.style.display=on?'block':'none';if(!on)return null;
      const words=opts.words();const box=sync(words);if(!box)return null;
      const st=state(box);const s=Math.max(.001,st.grow);
      pane.visible=st.grow>.01;
      pane.position.set((st.x-W/2)/U,(H/2-st.y)/U,0);
      pane.rotation.set(st.tilt||0,(st.rot===undefined?.3:st.rot)+Math.sin(time*.4)*.05,0);
      pane.scale.set(s*(st.scale||1),(st.scale||1),(st.scale||1));
      key.position.x=-4+Math.sin(time*.45)*5;
      renderer.render(scene,cam);return box;
    },
    box(){return sync(opts.words())},
    dispose(){canvas.remove();renderer.dispose()}
  };
}
