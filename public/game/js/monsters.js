// Enemy sprites drawn from 12x12 string maps.
const MPAL={v:'#8a4fd0',w:'#f4f4f4',k:'#141414',y:'#f0c040',r:'#d23c3c',p:'#e8e2f0',q:'#9aa4b4'};
function mk(rows,pal){const c=document.createElement('canvas');c.width=rows[0].length;c.height=rows.length;const x=c.getContext('2d');
  rows.forEach((row,j)=>[...row].forEach((ch,i)=>{if(ch!=='.'){x.fillStyle=pal[ch];x.fillRect(i,j,1,1);}}));return c;}
const MON={
 hum:mk(["....vvvv....","..vvvvvvvv..",".vvvvvvvvvv.",".vwwvvvvwwv.","vvwkvvvvkwvv","vvvvvvvvvvvv","vvvvvvvvvvvv","vvkvvvkvvvkv","vkvkvkvkvkvv",".vvvvvvvvvv.","..vv.vv.vv..","............"],MPAL),
 clip:mk([".....y......","..y..yy..y..","...yyyyyyy..",".yyyrrrrryy.","..yrkyyykry.","yyyryyyyyryy","..yrrkkkrry.",".yyyrrrrryy.","...yyyyyyy..","..y..yy..y..",".....y......","............"],MPAL),
 ghost:mk(["...pppppp...","..pppppppp..",".pppppppppp.",".ppkkppkkpp.",".ppkkppkkpp.",".pppppppppp.",".ppppqqpppp.",".pppppppppp.",".pppppppppp.",".pppppppppp.",".pp.pp.pp.p.",".p..p..p..p."],MPAL),
 dead:mk(["..rr....rr..",".rrrrrrrrrr.",".rwwwwwwwwr.","rwwwwkwwwwwr","rwwwwkwwwwwr","rwwwwkwwwwwr","rwwwwkkkkwwr","rwwwwwwwwwwr","rwwwwwwwwwwr",".rwwwwwwwwr.",".rrrrrrrrrr.",".r........r."],MPAL)};
