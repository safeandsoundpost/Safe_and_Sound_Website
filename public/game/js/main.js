// Main step/draw dispatch and the 60fps game loop.
function step(){tick++;
  if(state==='title')updTitle();
  else if(state==='world'){if(dlg)updDlg();else updWorld();}
  else if(state==='battle')updBattle();
  else if(state==='adr')updADR();
  else if(state==='end')updEnd();
  prev={...input};}
function draw(){
  if(state==='title')drawTitle();
  else if(state==='world'){drawWorld();if(dlg)drawDlg();}
  else if(state==='battle')drawBattle();
  else if(state==='adr')drawADR();
  else if(state==='end')drawEnd();}
let last=performance.now(),acc=0;
function frame(t){acc+=Math.min(100,t-last);last=t;while(acc>=1000/60){step();acc-=1000/60;}draw();requestAnimationFrame(frame);}
requestAnimationFrame(frame);
