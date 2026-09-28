// Keyboard, touch button and canvas tap input.
const input={u:0,d:0,l:0,r:0,a:0,b:0};let prev={...input};const jp=k=>input[k]&&!prev[k];
const KEYS={ArrowUp:'u',KeyW:'u',ArrowDown:'d',KeyS:'d',ArrowLeft:'l',KeyA:'l',ArrowRight:'r',KeyD:'r',KeyZ:'a',Space:'a',Enter:'a',KeyX:'b',Escape:'b',ShiftLeft:'b',KeyM:'b'};
addEventListener('keydown',e=>{initAudio();const k=KEYS[e.code];if(k){input[k]=1;e.preventDefault();}});
addEventListener('keyup',e=>{const k=KEYS[e.code];if(k)input[k]=0;});
document.addEventListener('pointerdown',initAudio,true);
document.querySelectorAll('[data-k]').forEach(el=>{const k=el.dataset.k;
  el.addEventListener('pointerdown',e=>{e.preventDefault();input[k]=1;el.classList.add('on');try{el.setPointerCapture(e.pointerId);}catch(_){}});
  ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>el.addEventListener(ev,()=>{input[k]=0;el.classList.remove('on');}));
  el.addEventListener('contextmenu',e=>e.preventDefault());});
cv.addEventListener('pointerdown',e=>{e.preventDefault();input.a=1;});
['pointerup','pointercancel','pointerleave'].forEach(ev=>cv.addEventListener(ev,()=>{input.a=0;}));
document.addEventListener('gesturestart',e=>e.preventDefault());
