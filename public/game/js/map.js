// Office tile map layout and tile art (pre-rendered once).
const M=[...Array(MH)].map(()=>Array(MW).fill('#'));
const set=(x,y,c)=>{M[y][x]=c;};
const fill=(x0,y0,x1,y1,c)=>{for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)M[y][x]=c;};
fill(1,1,11,7,',');fill(17,1,28,7,',');fill(13,1,15,18,'.');fill(1,9,11,18,'.');fill(17,9,28,18,'.');
set(12,4,'_');set(16,4,'_');set(12,13,'_');set(16,13,'_');
// mix stage
for(let x=3;x<=8;x++){set(x,0,'V');set(x,4,'C');}
set(1,0,'P');set(10,0,'P');set(2,1,'S');set(9,1,'S');for(let x=4;x<=7;x++)set(x,7,'o');set(1,7,'p');set(11,1,'p');
// ADR room
for(let y=1;y<=7;y++)set(22,y,'w');set(22,6,'_');
set(18,2,'A');set(19,2,'A');set(20,2,'A');set(18,0,'P');set(20,0,'P');set(26,2,'M');set(28,7,'p');
// hallway
set(13,0,'K');set(14,0,'F');
// lobby
set(1,9,'p');set(11,9,'p');set(2,10,'T');set(3,10,'T');set(4,10,'T');set(11,15,'R');set(11,16,'R');
fill(4,13,8,16,'L');set(1,17,'o');set(2,17,'o');set(3,17,'o');set(3,8,'P');set(9,8,'P');set(6,19,'X');
// foley + kitchen
fill(18,10,22,13,'g');set(24,9,'b');set(25,9,'b');set(26,9,'b');set(27,10,'D');set(28,15,'E');
set(19,16,'t');set(20,16,'t');set(28,18,'p');set(20,8,'P');set(26,8,'P');set(23,9,'H');
// lobby awards shelf
set(6,8,'Y');
const WALK='.,Lg_';
const carpetAt=(x,y)=>(x>=1&&x<=11&&y>=1&&y<=7)||(x>=17&&x<=28&&y>=1&&y<=7);
function hash(a,b){let n=(a*374761393+b*668265263)|0;n=Math.imul(n^(n>>>13),1274126177);return (n^(n>>>16))>>>0;}
const POSTER=['#c43c3c','#f0b030','#3d7a5a','#2c3e75','#9aa8c8','#8a4fd0'];
const mapCv=document.createElement('canvas');mapCv.width=MW*T;mapCv.height=MH*T;
(()=>{const x=mapCv.getContext('2d');
  for(let ty=0;ty<MH;ty++)for(let tx=0;tx<MW;tx++){
    const ch=M[ty][tx],X=tx*T,Y=ty*T,h=hash(tx,ty);
    const r=(a,b,w,hh,c)=>{x.fillStyle=c;x.fillRect(X+a,Y+b,w,hh);};
    if('#PVKFXY'.includes(ch)){ // brick
      r(0,0,16,16,'#cdbfb2');
      for(let b=0;b<4;b++)for(let k=0;k<3;k++){const bx=(b%2?-4:0)+k*8,x0=Math.max(0,bx),x1=Math.min(16,bx+7);
        if(x1>x0)r(x0,b*4,x1-x0,3,['#9c4a34','#a8553c','#8e412e','#b0624a'][(h>>(b*3+k))&3]);}
      for(let i=0;i<3;i++){const p=hash(h,i);r(p%16,(p>>4)%16,1+(p>>8)%2,1,'#e6dcd2');}
    }else if(ch==='g'){r(0,0,16,16,'#8a8a7e');for(let i=0;i<14;i++){const p=hash(h,i);r(p%16,(p>>4)%16,1,1,i%2?'#6a6a60':'#b0b0a4');}}
    else if(ch==='L'){r(0,0,16,16,'#101012');}
    else if(carpetAt(tx,ty)){r(0,0,16,16,'#2e2a3e');for(let i=0;i<5;i++){const p=hash(h,i);r(p%16,(p>>4)%16,1,1,'#3a3450');}}
    else{r(0,0,16,16,'#7a4e2e');for(let b=0;b<4;b++){r(0,b*4+3,16,1,'#5f3b22');r(((h>>(b*4))%13)+1,b*4,1,3,'#5f3b22');}}
    switch(ch){
      case'P':r(3,2,10,12,'#1a1a1a');r(4,3,8,10,POSTER[h%6]);r(5,9,6,1,'#f4f4f4');r(5,11,4,1,'#f4f4f4');r(6,4,4,4,POSTER[(h>>3)%6]);break;
      case'K':r(0,10,16,6,'#6a6a70');r(4,1,8,10,'#222');r(5,2,6,3,'#444');r(10,6,1,1,'#ff4040');r(6,7,3,3,'#f4f4f4');break;
      case'F':r(2,0,12,16,'#d8dde2');r(2,6,12,1,'#a0a6ac');r(11,2,1,3,'#777');r(11,8,1,5,'#777');break;
      case'X':r(3,0,10,16,'#3a2a1a');r(4,1,8,6,'#8fc3e0');r(5,2,2,3,'#c8e6f4');r(11,9,1,2,'#e0c040');r(4,13,8,3,'#2a1a0e');break;
      case'S':r(3,1,10,14,'#1c1c22');r(4,2,8,12,'#2a2a32');r(6,3,4,3,'#0a0a0c');r(5,7,6,6,'#0a0a0c');r(7,9,2,2,'#555');break;
      case'C':r(0,2,16,11,'#555566');r(0,12,16,3,'#333340');for(let i=0;i<4;i++){r(1+i*4,4,1,7,'#22222a');r(0+i*4,5+((h>>i)%5),3,2,['#e8e8e8','#f0b030','#9aa8c8'][i%3]);}r(3,3,1,1,'#3ddc6a');r(11,3,1,1,'#ff5050');break;
      case'A':r(0,4,16,9,'#4a4a58');r(2,1,12,7,'#111');r(3,2,10,5,'#1e3050');for(let i=0;i<5;i++)r(4+i*2,3+((h>>i)%3),1,2,'#9aa8c8');r(0,12,16,2,'#2a2a33');break;
      case'o':r(1,2,14,4,'#2f4a3b');r(1,5,14,8,'#3d5a4a');r(1,5,1,8,'#2f4a3b');r(14,5,1,8,'#2f4a3b');r(7,6,1,6,'#2f4a3b');break;
      case'M':r(7,6,1,8,'#999');r(5,14,5,1,'#777');r(6,1,3,6,'#222');r(6,2,3,2,'#888');break;
      case'w':r(6,0,4,16,'#555');r(7,0,2,16,'#8fc3e0');r(7,(h%10),1,4,'#d8f0fa');break;
      case'b':r(1,3,14,11,'#b08a50');r(7,3,2,11,'#d8c090');r(3,6,3,2,'#6a4a20');break;
      case'D':r(2,0,12,15,'#5a3a1a');r(3,1,10,13,'#8a5a2a');r(4,2,8,5,'#7a4e22');r(4,8,8,5,'#7a4e22');r(10,7,2,2,'#e0c040');break;
      case'R':r(1,6,14,9,'#a07040');r(1,6,14,1,'#c89060');[2,4,6,8,10,12].forEach((xx,i)=>r(xx,2+(i%2),2,5,POSTER[(h+i)%6]));break;
      case'p':r(5,11,6,4,'#b5543c');r(4,10,8,2,'#c8664a');r(7,3,2,8,'#2e7a3e');r(4,4,3,3,'#3d9b5a');r(9,3,3,4,'#3d9b5a');r(5,7,3,3,'#2e7a3e');r(8,6,3,3,'#4ab86a');break;
      case'T':r(0,4,16,9,'#1e1e22');r(0,4,16,2,'#3a3a40');if(tx===3){r(5,1,6,4,'#111');r(6,2,4,2,'#9aa8c8');}break;
      case't':r(0,4,16,8,'#c8a878');r(0,11,16,2,'#8a6a40');if(tx===19){r(4,5,3,3,'#f4f4f4');r(10,6,4,2,'#e0a040');}break;
      case'H':r(1,3,14,12,'#5a2a18');r(2,4,12,10,'#7a3a22');r(1,14,14,1,'#3a1a0e');[3,6,9].forEach((xx,i)=>r(xx,1+i,2,8-i,'#d8b050'));r(12,5,1,6,'#b0b0b8');r(11,10,3,3,'#2a2a30');break;
      case'Y':r(1,6,14,2,'#5a3a22');r(1,13,14,2,'#5a3a22');r(3,1,3,5,'#f0b030');r(4,2,1,3,'#fff0a0');r(8,2,5,4,'#e8e8e8');r(9,3,3,2,'#f0b030');r(3,9,4,4,'#f0b030');r(9,8,3,5,'#c0c0c8');r(10,9,1,2,'#fff');break;
      case'E':r(0,8,16,7,'#5a3a22');r(2,1,12,8,'#111');r(3,2,10,6,'#0d2418');for(let i=0;i<9;i++)r(4+i,5-((h>>i)%3),1,1+((h>>i)%3)*2,'#3ddc6a');break;
    }
  }
  // big screen
  x.fillStyle='#0a0a0a';x.fillRect(3*T,1,6*T,15);x.fillStyle='#1b2a44';x.fillRect(3*T+2,3,6*T-4,11);
  x.fillStyle='#e8e0a0';x.fillRect(3*T+74,4,3,3);x.fillStyle='#0d1422';x.fillRect(3*T+2,11,6*T-4,3);
  x.fillStyle='#c9a227';x.fillRect(3*T+20,7,26,5);x.fillStyle='#fff6c0';for(let i=0;i<5;i++)x.fillRect(3*T+22+i*5,8,3,2);
  x.fillStyle='#111';x.fillRect(3*T+23,12,3,2);x.fillRect(3*T+40,12,3,2);
  // lobby rug logo
  x.fillStyle='#6a6a6e';x.fillRect(4*T+2,13*T+2,5*T-4,1);x.fillRect(4*T+2,17*T-3,5*T-4,1);x.fillRect(4*T+2,13*T+2,1,4*T-4);x.fillRect(9*T-3,13*T+2,1,4*T-4);
  const rug=()=>{x.drawImage(LOGO_S,4*T+8,13*T+20);txt(x,'P O S T',4*T+26,13*T+38,'#a9c2e0');};
  if(LOGO_S.complete)rug();else LOGO_S.onload=rug;
})();
function roomAt(x,y){if(x>=1&&x<=11&&y>=1&&y<=7)return'MIX STAGE';if(x>=17&&x<=28&&y>=1&&y<=7)return x>=23?'ADR BOOTH':'ADR CONTROL';
  if(x>=1&&x<=11&&y>=9)return'LOBBY';if(x>=17&&y>=9)return'FOLEY PIT';return'HALLWAY';}
