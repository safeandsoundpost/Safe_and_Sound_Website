// Overworld movement, camera, drawing and the B-button to-do menu.
function updWorld(){
  if(menuOpen){if(jp('a')||jp('b'))menuOpen=false;return;}
  if(roomT)roomT--;
  if(P.moving){
    P.px+=DX[P.dir]*2;P.py+=DY[P.dir]*2;P.anim++;
    if(P.px===P.tx*T&&P.py===P.ty*T){P.moving=0;arrive();}
    return;}
  if(jp('b')){menuOpen=true;SFX.sel();return;}
  if(jp('a')){interact();return;}
  let d=-1;if(input.u)d=1;else if(input.d)d=0;else if(input.l)d=2;else if(input.r)d=3;
  if(d<0){P.anim=0;return;}
  P.dir=d;const nx=P.tx+DX[d],ny=P.ty+DY[d];
  if(nx<0||ny<0||nx>=MW||ny>=MH||!WALK.includes(M[ny][nx])||entAt(nx,ny)){if(tick%16===0)SFX.bump();return;}
  P.tx=nx;P.ty=ny;P.moving=1;
}
function arrive(){
  const rn=roomAt(P.tx,P.ty);if(rn!==roomName){roomName=rn;roomT=80;}
  if(M[P.ty][P.tx]==='g'&&!F.feet){F.steps=(F.steps||0)+1;SFX.step();
    if(F.steps>=12){F.feet=1;SFX.item();say('CRUNCH CRUNCH. FOOTSTEPS RECORDED! GOT: FOOTSTEP FOLEY.');}
    else{roomName='STEPS '+F.steps+'/12';roomT=40;}}
}
function drawWorld(){
  const cx=Math.max(0,Math.min(MW*T-W,P.px+8-W/2))|0,cy=Math.max(0,Math.min(MH*T-H,P.py+8-H/2))|0;
  g.drawImage(mapCv,-cx,-cy);
  const list=ents.filter(e=>!e.gone).map(e=>({y:e.y*T,e})).concat([{y:P.py,p:1}]).sort((a,b)=>a.y-b.y);
  for(const o of list){
    if(o.p){const fr=P.moving?[1,0,2,0][(P.anim>>2)&3]:0;g.drawImage(SH[P.look][P.dir][fr],P.px-cx,P.py-cy);}
    else{const e=o.e;
      if(e.look)g.drawImage(SH[e.look][e.dir][0],e.x*T-cx,e.y*T-cy);
      else{const bob=Math.round(Math.sin(tick/9+e.x)*1.5);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(e.x*T-cx+4,e.y*T-cy+14,8,2);g.drawImage(MON[e.mon],e.x*T-cx+2,e.y*T-cy+1+bob);}}
  }
  if(roomT){const s=roomName;panel(2,2,tw(s)+8,11);txt(g,s,6,5,'#a9c2e0');}
  if(menuOpen)drawMenu();
}
function drawMenu(){
  panel(6,6,148,132);
  stxt(P.name,12,12,'#fff');txt(g,'LV '+P.lvl,120,12,'#a9c2e0');
  txt(g,'CO-OWNER / RE-RECORDING MIXER',12,20,'#a9c2e0');
  txt(g,'HP  '+P.hp+'/'+P.maxhp,12,31,'#e8e8ec');txt(g,'FOC '+P.foc+'/'+P.maxfoc,80,31,'#e8e8ec');
  txt(g,'COFFEE '+P.coffee+'/3',12,40,'#e8e8ec');txt(g,'XP '+P.xp+'/'+P.lvl*20,80,40,'#e8e8ec');
  g.fillStyle='#3a3a44';g.fillRect(12,50,136,1);
  txt(g,'TO DO: NIGHT BUS FINAL MIX',12,55,'#f0b030');
  const rows=[['TALK TO THE DIRECTOR',F.brief],['CLEAN DIALOG STEMS',F.stems],['RECORD THE ADR LINE',F.adr],['FOOTSTEPS '+(F.feet?12:(F.steps||0))+'/12',F.feet],['DOOR SLAM FOLEY',F.door],['SCORE STEMS FROM KYLE',F.score],['FINAL MIX',F.mixed]];
  rows.forEach(([t,d],i)=>{txt(g,(d?'* ':'- ')+t,14,66+i*9,d?'#3ddc6a':'#e8e8ec');});
  if(tick%50<34)txt(g,'B TO CLOSE',104,128,'#6a6a74');
}
