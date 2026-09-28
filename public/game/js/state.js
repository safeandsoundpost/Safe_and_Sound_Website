// Game state, move sets, enemy stats and newGame().
let state='title',tick=0,sel=0,menuOpen=false,dlg=null,battle=null,adr=null,endT=0,roomName='',roomT=0;
const DX=[0,0,-1,1],DY=[1,-1,0,0];
let P,F,ents;
const MOVES={
  thom:[{n:'EQ SWEEP',d:[6,9]},{n:'SOUND DESIGN',d:[11,15],c:5},{n:'VO DIRECT',stun:2,c:4},{n:'COFFEE',item:1}],
  jesse:[{n:'DIALOG EDIT',d:[6,9]},{n:'FOLEY FURY',d:[11,15],c:5},{n:'CRATE DIG',heal:14,c:4},{n:'COFFEE',item:1}]};
const ENEMY={
  hum:{name:'60HZ HUM',hp:22,atk:[3,5],xp:12,moves:['BUZZ','DRONE']},
  clip:{name:'CLIPS & POPS',hp:28,atk:[4,6],xp:16,moves:['DISTORT','CRACKLE']},
  ghost:{name:'ROOM TONE GHOST',hp:34,atk:[4,7],xp:20,moves:['ECHO','REVERB TAIL']},
  dead:{name:'THE DEADLINE',hp:64,atk:[4,8],xp:50,moves:['CLIENT NOTES','TIME CRUNCH','"ONE MORE PASS"'],boss:1}};

function newGame(){
  const me=sel?'jesse':'thom',pal=sel?'thom':'jesse';
  P={look:me,name:me.toUpperCase(),partner:pal.toUpperCase(),tx:6,ty:18,px:6*T,py:18*T,dir:1,moving:0,anim:0,
     lvl:1,xp:0,hp:30,maxhp:30,foc:12,maxfoc:12,coffee:3};
  F={brief:0,stems:0,adr:0,feet:0,door:0,score:0,mixed:0,ghost:0,hum:0,pl:0,rv:0,hb:0,sl:{}};
  ents=[
    {id:'director',look:'director',x:7,y:11,dir:0},
    {id:'partner',look:pal,x:14,y:3,dir:0},
    {id:'actor',look:'actor',x:26,y:3,dir:0},
    {id:'kanchan',look:'kanchan',x:3,y:11,dir:0},
    {id:'michael',look:'michael',x:2,y:5,dir:0},
    {id:'chris',look:'chris',x:23,y:12,dir:2},
    {id:'vanessa',look:'vanessa',x:26,y:16,dir:3},
    {id:'kyle',look:'kyle',x:18,y:17,dir:1},
    {id:'paul',look:'paul',x:9,y:13,dir:3},
    {id:'devon',look:'devon',x:10,y:13,dir:2},
    {id:'jade',look:'jade',x:4,y:17,dir:0},
    {id:'ghost',mon:'ghost',x:24,y:5},
    {id:'hum',mon:'hum',x:13,y:11}];
  state='world';roomName='LOBBY';roomT=90;
  say(['SAFE & SOUND POST. TORONTO. 9:00 AM.','THE INDIE FEATURE "NIGHT BUS" NEEDS ITS FINAL MIX BY 6 PM TODAY.','THE DIRECTOR IS WAITING IN THE LOBBY. PRESS A TO TALK. PRESS B FOR YOUR TO-DO LIST.']);
}
const missing=()=>{const m=[];if(!F.stems)m.push('DIALOG STEMS (EDIT BAY)');if(!F.adr)m.push('ADR LINE (BOOTH)');if(!F.feet)m.push('FOOTSTEPS (GRAVEL PIT)');if(!F.door)m.push('DOOR SLAM (FOLEY)');if(!F.score)m.push('SCORE STEMS (KYLE, KITCHEN)');return m;};
const entAt=(x,y)=>ents.find(e=>!e.gone&&e.x===x&&e.y===y);
