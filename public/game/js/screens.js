// Title screen and end credits.
function drawTitle(){
  g.fillStyle='#000';g.fillRect(0,0,W,H);
  if(LOGO.complete)g.drawImage(LOGO,14,3);
  txt(g,'P  O  S  T',61,33,'#cfcfd4');
  ctxt('THE FINAL MIX',41,'#a9c2e0');
  ['thom','jesse'].forEach((k,i)=>{const x=i?92:22,chosen=sel===i;
    if(chosen){g.fillStyle=tick%40<28?'#a9c2e0':'#4f5d70';g.fillRect(x-3,49,54,56);g.fillStyle='#0d0d10';g.fillRect(x-2,50,52,54);}
    g.drawImage(SH[k][0][chosen?[0,1,0,2][(tick>>3)&3]:0],x+1,51,48,48);
    const nm=i?'JESSE':'THOM';stxt(nm,x+24-(tw(nm)/2|0),108,chosen?'#fff':'#6a6a74');
    const pk=i?'DIALOG+FOLEY':'DESIGN+VO';txt(g,pk,x+24-(tw(pk)/2|0),116,chosen?'#3ddc6a':'#3a3a44');});
  if(tick%50<34)ctxt('< > CHOOSE   A START',129,'#e8e8ec');
}
function updTitle(){if(jp('l')||jp('r')){sel^=1;SFX.sel();}if(jp('a')){SFX.item();newGame();}}
const CREDITS=['NIGHT BUS','FINAL MIX PRINTED 5:59 PM','','A SAFE & SOUND POST PRODUCTION','TORONTO','','CO-OWNERS','RE-RECORDING MIXERS','SOUND SUPERVISORS','','THOM O\'NEIL','JESSE LAWRENCE','','LEAD SOUND DESIGNER','MICHAEL GRAINGER','','LEAD FOLEY ARTIST & EDITOR','CHRIS MA','','SOUND DESIGN / DIALOGUE EDITING','VANESSA HANNAH','','COMPOSER','KYLE BLASEG','','BUSINESS DEVELOPMENT','KANCHAN MAHADIK','','SPECIAL THANKS','PAUL PERSIC','DEVON CODRINGTON','JADE YURICH','LETTER50 FILMS','','SUPPORTING CREATIVITY','EMPOWERING FILMMAKERS','ALWAYS LOOKING FORWARD','','THANKS FOR PLAYING!'];
function drawEnd(){g.fillStyle='#000';g.fillRect(0,0,W,H);endT++;
  const y0=H-endT*0.35;const ly=Math.max(50,(y0+CREDITS.length*10+8)|0);if(LOGO.complete)g.drawImage(LOGO,14,ly);CREDITS.forEach((l,i)=>{const y=y0+i*10;if(y>-6&&y<H)ctxt(l,y|0,i===0?'#f0b030':l.match(/THOM|JESSE/)?'#fff':'#a9c2e0');});
  g.drawImage(SH.thom[0][[0,1,0,2][(tick>>3)&3]],56,H-20);g.drawImage(SH.jesse[0][[0,2,0,1][(tick>>3)&3]],88,H-20);
  if(ly===50&&tick%50<34)ctxt("PRESS A",96,'#fff');}
function updEnd(){if(endT>60&&jp('a'))toTitle();}
function toTitle(){state='title';musRestart();}
