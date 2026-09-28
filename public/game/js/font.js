// 3x5 pixel font and text/panel drawing helpers.
const FONT={A:'25755',B:'65656',C:'34443',D:'65556',E:'74647',F:'74644',G:'34553',H:'55755',I:'72227',J:'11152',K:'55655',L:'44447',M:'57755',N:'65555',O:'25552',P:'65644',Q:'25573',R:'65655',S:'34216',T:'72222',U:'55557',V:'55552',W:'55775',X:'55255',Y:'55222',Z:'71247',
'0':'75557','1':'26227','2':'61247','3':'61216','4':'55711','5':'74616','6':'34757','7':'71222','8':'75757','9':'75711',
' ':'00000','!':'22202','&':'25253',':':'02020','.':'00002',',':'00024','-':'00700','%':'51245','?':'61202','/':'11244','+':'02720',"'":'22000','"':'55000','>':'42124','<':'12421','(':'12221',')':'42224','*':'05250','=':'07070','#':'57575'};
function txt(ctx,s,x,y,col,sc=1){ctx.fillStyle=col;s=String(s).toUpperCase();
  for(const ch of s){const f=FONT[ch];if(f)for(let r=0;r<5;r++){const b=+f[r];for(let k=0;k<3;k++)if(b&(4>>k))ctx.fillRect(x+k*sc,y+r*sc,sc,sc);}x+=4*sc;}}
const tw=(s,sc=1)=>(String(s).length*4-1)*sc;
const stxt=(s,x,y,c,sc=1)=>{txt(g,s,x+sc,y+sc,'#000',sc);txt(g,s,x,y,c,sc);};
const ctxt=(s,y,c,sc=1)=>stxt(s,((W-tw(s,sc))/2)|0,y,c,sc);
function panel(x,y,w,h){g.fillStyle='#0d0d10';g.fillRect(x,y,w,h);g.fillStyle='#a9c2e0';g.fillRect(x,y,w,1);g.fillRect(x,y+h-1,w,1);g.fillRect(x,y,1,h);g.fillRect(x+w-1,y,1,h);}
