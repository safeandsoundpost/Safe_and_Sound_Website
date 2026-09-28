// Typewriter dialog box system.
// Pixel portraits (Thom's art, 52x72, from tools/make-portraits.py). A line starting "NAME:" shows NAME's portrait.
const PORTRAIT={};['thom','jesse','michael','chris','vanessa','kyle','kanchan'].forEach(k=>{const i=new Image();i.src='assets/portraits/'+k+'.png';PORTRAIT[k.toUpperCase()]=i;});
const speaker=s=>{const m=s.toUpperCase().match(/^([A-Z]+):/);return m&&PORTRAIT[m[1]]?m[1]:null;};
function wrap(s,n=37){const out=[];let cur='';for(const w of s.toUpperCase().split(' ')){const t=cur?cur+' '+w:w;if(t.length>n){out.push(cur);cur=w;}else cur=t;}if(cur)out.push(cur);return out;}
function say(t,cb){const pages=[],sp=[];(Array.isArray(t)?t:[t]).forEach(s=>{const L=wrap(s),who=speaker(s);for(let i=0;i<L.length;i+=3){pages.push(L.slice(i,i+3));sp.push(who);}});dlg={pages,sp,i:0,n:0,cb};}
function updDlg(){const p=dlg.pages[dlg.i],tot=p.join('').length;
  if(dlg.n<tot){dlg.n+=2;if(tick%4===0)SFX.blip();if(jp('a'))dlg.n=tot;}
  else if(jp('a')||jp('b')){dlg.i++;dlg.n=0;if(dlg.i>=dlg.pages.length){const cb=dlg.cb;dlg=null;cb&&cb();}}}
function drawText(lines,n,y0){let rem=n;lines.forEach((l,j)=>{txt(g,l.slice(0,Math.max(0,rem)),6,y0+j*9,'#e8e8ec');rem-=l.length;});}
function drawDlg(){const who=dlg.sp[dlg.i],pic=who&&PORTRAIT[who];
  if(pic&&pic.complete&&pic.naturalWidth)g.drawImage(pic,W-pic.width,101-pic.height); // flush right, standing on the box
  panel(1,101,158,42);const p=dlg.pages[dlg.i];drawText(p,dlg.n,107);
  if(dlg.n>=p.join('').length&&tick%40<26){g.fillStyle='#a9c2e0';g.fillRect(150,136,5,1);g.fillRect(151,137,3,1);g.fillRect(152,138,1,1);}}
