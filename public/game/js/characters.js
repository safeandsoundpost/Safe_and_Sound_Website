// Character looks (Thom, Jesse, NPCs) and procedural 16x16 sprite drawing.
const LOOKS={
  thom:{skin:'#e3ab86',hair:'#3a2618',style:'short',beard:'full',bc:'#2e1d12',shirt:'#4a4a50',pants:'#2c3548'},
  jesse:{skin:'#f0c4a2',hair:'#6b4226',style:'long',beard:'stubble',bc:'#c79a7a',shirt:'#1f2744',pants:'#34343c',neck:'#d9822b',smile:true},
  director:{skin:'#c68a5e',hair:'#161616',style:'short',shirt:'#8a2b3a',pants:'#2a2a33',glasses:true},
  actor:{skin:'#f2c9a0',hair:'#d9b24a',style:'short',shirt:'#3d7a5a',pants:'#3a3a55'},
  chris:{skin:'#f0cfb4',hair:'#141414',style:'short',shirt:'#d6d2cc',pants:'#2c3548',glasses:true},
  michael:{skin:'#f0c8a8',hair:'#8a5a34',style:'short',beard:'stubble',bc:'#b07a50',shirt:'#1e1e24',pants:'#2a2a33',glasses:true,hat:'#101012'},
  kyle:{skin:'#eebc9c',hair:'#3e2616',style:'short',beard:'full',bc:'#3e2616',shirt:'#b0343a',plaid:'#5a1a20',pants:'#2c3548',glasses:true,smile:true},
  vanessa:{skin:'#a8694a',hair:'#171212',style:'long',shirt:'#1c2440',pants:'#2a2a33',glasses:true,smile:true},
  kanchan:{skin:'#9a5e3e',hair:'#0e0e10',style:'long',shirt:'#3a8ad8',pants:'#24242c'},
  paul:{skin:'#e2b48e',hair:'#1e1410',style:'short',shirt:'#1a1a1e',pants:'#1a1a1e',smile:true},
  devon:{skin:'#5a3620',hair:'#2a1e14',style:'long',beard:'full',bc:'#1a120c',shirt:'#18181c',pants:'#26262c',neck:'#e0b040',smile:true},
  jade:{skin:'#f0c4a4',hair:'#6a4428',style:'short',beard:'stubble',bc:'#a07050',shirt:'#ececec',vest:['#d02828','#18181c'],pants:'#9a7a4a',smile:true}};
function drawChar(c,L,dir,fr){
  const r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h);};
  const long=L.style==='long',S=L.shirt,K='#1a1a1a';
  if(dir<2){
    if(long&&dir===0)r(3,2,10,8,L.hair);
    // legs
    const lL=fr===1,rL=fr===2;
    r(5,13,2,lL?1:2,L.pants);r(9,13,2,rL?1:2,L.pants);
    r(5,lL?14:15,2,1,K);r(9,rL?14:15,2,1,K);
    r(4,8,8,5,S);r(3,9,1,3,S);r(12,9,1,3,S);r(3,12,1,1,L.skin);r(12,12,1,1,L.skin);
    if(L.vest){r(4,8,8,2,L.vest[0]);r(4,10,8,3,L.vest[1]);if(dir===0)r(7,8,2,5,S);}
    if(dir===0){
      r(4,2,8,6,L.skin);r(7,8,2,1,L.skin);
      r(4,1,8,2,L.hair);
      if(long){r(3,2,2,8,L.hair);r(11,2,2,8,L.hair);r(5,2,2,1,L.hair);}else{r(4,3,1,1,L.hair);r(11,3,1,1,L.hair);}
      r(6,4,1,1,K);r(9,4,1,1,K);
      if(L.glasses){r(5,4,3,1,K);r(8,4,3,1,K);}
      if(L.beard==='full'){r(4,5,1,2,L.bc);r(11,5,1,2,L.bc);r(5,6,6,2,L.bc);r(7,6,2,1,'#6a3526');}
      else if(L.beard==='stubble'){r(5,7,6,1,L.bc);}
      if(L.smile){r(6,6,4,1,'#f4f4f4');r(6,6,1,1,'#b0604a');r(9,6,1,1,'#b0604a');}
      else if(!L.beard)r(7,6,2,1,'#a05a44');
      if(L.neck){r(7,9,2,1,'#c9a060');r(8,10,1,1,L.neck);}
    }else{
      r(4,2,8,6,L.hair);r(4,1,8,1,L.hair);
      if(long)r(3,2,10,9,L.hair);else{r(3,4,1,2,L.skin);r(12,4,1,2,L.skin);}
    }
    if(L.plaid){r(4,10,8,1,L.plaid);r(6,8,1,5,L.plaid);r(9,8,1,5,L.plaid);}
    if(L.hat){r(4,0,8,3,L.hat);r(4,2,8,1,'#3a3a44');}
  }else{ // left-facing
    const f=fr;
    if(f===0){r(6,13,4,2,L.pants);r(5,15,4,1,K);}
    else if(f===1){r(5,13,2,2,L.pants);r(9,13,2,1,L.pants);r(4,15,3,1,K);r(9,14,2,1,K);}
    else{r(5,13,2,1,L.pants);r(8,13,2,2,L.pants);r(5,14,2,1,K);r(8,15,3,1,K);}
    r(5,8,6,5,S);
    if(L.vest){r(5,8,6,2,L.vest[0]);r(5,10,6,3,L.vest[1]);}
    const ax=f===1?6:f===2?8:7;r(ax,9,2,3,S);r(ax,12,2,1,L.skin);
    r(4,2,7,6,L.skin);r(3,5,1,1,L.skin);
    r(5,1,7,2,L.hair);r(9,2,3,4,L.hair);
    if(long)r(8,2,4,9,L.hair);
    r(5,4,1,1,K);
    if(L.glasses)r(4,4,3,1,K);
    if(L.beard==='full'){r(4,5,5,3,L.bc);r(8,4,1,2,L.bc);}
    else if(L.beard==='stubble')r(4,7,4,1,L.bc);
    if(L.smile)r(4,6,2,1,'#f4f4f4');
    if(L.plaid){r(5,10,6,1,L.plaid);r(ax,10,2,1,L.plaid);}
    if(L.hat){r(5,0,7,3,L.hat);r(5,2,7,1,'#3a3a44');}
  }
}
function mkChar(L){
  const out=[];
  for(let d=0;d<4;d++){out[d]=[];for(let f=0;f<3;f++){
    const c=document.createElement('canvas');c.width=c.height=16;const x=c.getContext('2d');
    if(d===3){x.translate(16,0);x.scale(-1,1);x.drawImage(out[2][f],0,0);}
    else drawChar(x,L,d,f);
    out[d][f]=c;}}
  return out;}
const SH={};for(const k in LOOKS)SH[k]=mkChar(LOOKS[k]);
