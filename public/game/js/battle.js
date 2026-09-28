// Turn-based battle system.
function startBattle(id,onWin){
  const E=ENEMY[id];battle={id,E,hp:E.hp,max:E.hp,onWin,boss:!!E.boss,q:[],msg:null,n:0,cur:0,stun:0,es:0,ps:0,flash:20};
  state='battle';mstep=0;
  battle.q=[()=>(E.boss?'IT\'S ':'A WILD ')+E.name+' APPEARED!'];next();
}
function next(){const B=battle;
  while(B.q.length){const s=B.q.shift()();if(state!=='battle')return;if(s){B.msg=wrap(s);B.n=0;return;}}
  B.msg=null;
  if(B.over==='win'){state='world';const cb=B.onWin;battle=null;cb&&cb();}
  else if(B.over==='lose'){state='world';battle=null;P.hp=P.maxhp;P.foc=P.maxfoc;P.tx=2;P.ty=16;P.px=2*T;P.py=16*T;P.dir=1;roomName='LOBBY';
    say(['YOU WAKE UP ON THE LOBBY COUCH.','A GOOD NAP AND A COFFEE FIX EVERYTHING. HP AND FOCUS RESTORED.']);}
}
function choose(m){const B=battle,N=P.name;
  if(m.c&&P.foc<m.c){B.q=[()=>'NOT ENOUGH FOCUS! GRAB A COFFEE.'];return next();}
  if(m.item&&P.coffee<=0){B.q=[()=>'OUT OF COFFEE!'];return next();}
  B.q=[()=>{
    if(m.c)P.foc-=m.c;
    if(m.item){P.coffee--;const h=Math.min(12,P.maxhp-P.hp);P.hp+=h;P.foc=Math.min(P.maxfoc,P.foc+4);SFX.heal();return N+' DRINKS A COFFEE. +'+h+' HP, +4 FOC.';}
    if(m.heal){const h=Math.min(m.heal,P.maxhp-P.hp);P.hp+=h;SFX.heal();return N+' USED '+m.n+'! A RARE PRESSING CALMS THE NERVES. +'+h+' HP.';}
    if(m.stun){B.stun=m.stun;SFX.sel();return N+' USED '+m.n+'! THE '+B.E.name+' IS SPELLBOUND BY THE PERFORMANCE.';}
    const dmg=ri(m.d[0],m.d[1])+(P.lvl-1)*2;B.hp=Math.max(0,B.hp-dmg);B.es=12;SFX.hit();return N+' USED '+m.n+'! '+dmg+' DAMAGE.';
  },()=>{
    if(B.hp<=0){B.q.unshift(()=>{SFX.win();return B.E.name+' WAS DEFEATED!';},()=>{P.xp+=B.E.xp;return 'GAINED '+B.E.xp+' XP.';},
      ()=>{if(P.xp>=P.lvl*20){P.xp-=P.lvl*20;P.lvl++;P.maxhp+=6;P.maxfoc+=2;P.hp=P.maxhp;P.foc=P.maxfoc;SFX.item();return N+' GREW TO LV '+P.lvl+'! HP AND FOCUS UP.';}return null;},
      ()=>{B.over='win';return null;});return null;}
    if(B.stun>0){B.stun--;return B.E.name+' IS STILL SPELLBOUND...';}
    const dmg=ri(B.E.atk[0],B.E.atk[1]);P.hp=Math.max(0,P.hp-dmg);B.ps=12;SFX.hit();
    return B.E.name+' USED '+B.E.moves[ri(0,B.E.moves.length-1)]+'! -'+dmg+' HP.';
  },()=>{if(P.hp<=0&&!B.over){B.q.unshift(()=>{SFX.lose();return N+' IS TOO BURNT OUT TO CONTINUE...';},()=>{B.over='lose';return null;});}return null;}];
  next();
}
function updBattle(){const B=battle;if(B.flash)B.flash--;if(B.es)B.es--;if(B.ps)B.ps--;
  if(B.msg){const tot=B.msg.join('').length;if(B.n<tot){B.n+=2;if(jp('a'))B.n=tot;}else if(jp('a'))next();return;}
  const mv=MOVES[P.look];
  if(jp('l')||jp('r')){B.cur^=1;SFX.blip();}if(jp('u')||jp('d')){B.cur^=2;SFX.blip();}
  if(jp('a')){SFX.sel();choose(mv[B.cur]);}
}
function bar(x,y,w,v,max,col){g.fillStyle='#2a2a33';g.fillRect(x,y,w,3);g.fillStyle=v/max<.25?'#d23c3c':col;g.fillRect(x,y,Math.round(w*v/max),3);}
function drawBattle(){const B=battle;
  g.fillStyle=B.boss?'#1e0e12':'#14121c';g.fillRect(0,0,W,H);
  for(let y=0;y<100;y+=8)for(let x=(y/8)%2?-8:0;x<W;x+=16){g.fillStyle=B.boss?'#241014':'#191624';g.fillRect(x,y,15,7);}
  if(B.flash&&B.flash%6<3){g.fillStyle='#fff';g.fillRect(0,0,W,H);return;}
  g.fillStyle='#2e2a3e';g.fillRect(90,58,64,6);g.fillRect(6,92,64,6);
  if(B.hp>0||B.msg){const sx=B.es?ri(-3,3):0,bob=Math.round(Math.sin(tick/10)*2);if(!(B.es&&B.es%4<2))g.drawImage(MON[B.id],98+sx,12+bob,48,48);}
  if(!(B.ps&&B.ps%4<2))g.drawImage(SH[P.look][1][0],16+(B.ps?ri(-2,2):0),47,48,48);
  panel(4,6,86,24);txt(g,B.E.name,8,10,'#fff');txt(g,'HP',8,19,'#f0b030');bar(18,20,66,B.hp,B.max,'#3ddc6a');
  panel(74,66,82,32);txt(g,P.name+' LV'+P.lvl,78,70,'#fff');txt(g,'HP',78,79,'#f0b030');bar(90,80,40,P.hp,P.maxhp,'#3ddc6a');txt(g,P.hp+'',134,79,'#e8e8ec');
  txt(g,'FOC',78,88,'#a9c2e0');bar(90,89,40,P.foc,P.maxfoc,'#a9c2e0');txt(g,P.foc+'',134,88,'#e8e8ec');
  panel(1,101,158,42);
  if(B.msg){drawText(B.msg,B.n,107);return;}
  const mv=MOVES[P.look];
  mv.forEach((m,i)=>{const x=i%2?84:12,y=i<2?108:120;txt(g,(B.cur===i?'>':' ')+m.n,x-4,y,B.cur===i?'#fff':'#9a9aa4');});
  const m=mv[B.cur];txt(g,m.item?'COFFEE LEFT: '+P.coffee:m.c?'COSTS '+m.c+' FOCUS':'FREE ATTACK',8,133,'#6a6a74');
}
