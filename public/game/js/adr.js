// ADR three-beep timing minigame.
function startADR(){adr={t:0,res:null,rt:0};state='adr';}
function updADR(){const A=adr;
  if(A.res){if(--A.rt<=0){if(A.res==='ok'){state='world';adr=null;F.adr=1;SFX.item();say(['ACTOR: "I NEVER WANTED TO GET OFF THIS BUS."','PERFECT SYNC. GOT: ADR LINE.']);}else{adr={t:0,res:null,rt:0,take:(A.take||0)+1};}}return;}
  A.t++;if(A.t===30||A.t===60||A.t===90)SFX.beep();
  if(jp('a')){const d=Math.abs(A.t-120);A.res=d<=10?'ok':'bad';A.msg=d<=4?'PERFECT SYNC!':d<=10?'GOOD TAKE!':A.t<120?'TOO EARLY! GOING AGAIN.':'TOO LATE! GOING AGAIN.';A.rt=80;if(A.res==='ok')SFX.win();else SFX.bump();}
  else if(A.t>150){A.res='bad';A.msg='MISSED THE CUE! GOING AGAIN.';A.rt=80;SFX.bump();}
}
function drawADR(){const A=adr;g.fillStyle='#000';g.fillRect(0,0,W,H);
  ctxt('ADR: SCENE 42, TAKE '+(1+(A.take||0)),6,'#a9c2e0');
  g.fillStyle='#1b2a44';g.fillRect(10,18,140,78);g.fillStyle='#c9a227';g.fillRect(20,60,90,26);g.fillStyle='#fff6c0';for(let i=0;i<6;i++)g.fillRect(24+i*14,64,10,8);
  g.drawImage(SH.actor[0][0],60,58,16,16);
  g.fillStyle='#111';g.fillRect(28,86,10,6);g.fillRect(90,86,10,6);
  if(!A.res&&A.t>=30&&A.t<=120){const x=10+Math.round((A.t-30)/90*140);g.fillStyle='#f4f4f4';g.fillRect(x-1,18,3,78);}
  [30,60,90].forEach((b,i)=>{g.fillStyle=A.t>=b?'#f0b030':'#3a3a44';g.fillRect(58+i*14,101,8,8);});
  g.fillStyle='#3a3a44';g.fillRect(100,101,8,8);
  if(A.t>=112&&A.t<=128&&!A.res){g.fillStyle='#3ddc6a';g.fillRect(100,101,8,8);}
  if(A.res)ctxt(A.msg,118,A.res==='ok'?'#3ddc6a':'#ff6060');
  else ctxt('PRESS A ON THE 4TH BEEP',118,'#e8e8ec');
  ctxt('WATCH THE STREAMER. BEEP BEEP BEEP...',130,'#6a6a74');
}
