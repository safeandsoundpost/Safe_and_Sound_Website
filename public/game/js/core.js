// Canvas setup, screen size constants and random helpers.
const W=160,H=144,T=16,MW=30,MH=20;
const cv=document.getElementById('c'),g=cv.getContext('2d');g.imageSmoothingEnabled=false;
const rnd=(a,b)=>a+Math.random()*(b-a),ri=(a,b)=>Math.floor(rnd(a,b+1));
