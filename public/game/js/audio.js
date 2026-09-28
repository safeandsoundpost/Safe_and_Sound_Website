// Web Audio sound effects, the composed soundtrack, and chiptune battle music
// (only heard if a composed battle/boss track hasn't loaded yet).
let ac=null,master=null,muted=false;
function initAudio(){if(ac){if(ac.state==='suspended')ac.resume();return;}const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  ac=new AC();master=ac.createGain();master.gain.value=muted?0:.2;master.connect(ac.destination);
  const b=ac.createBuffer(1,1,22050),s=ac.createBufferSource();s.buffer=b;s.connect(master);s.start(0);loadMusic();}
function tone(f,d,type='square',vol=.4,slide=0,when=0){if(!ac)return;const t=ac.currentTime+when,o=ac.createOscillator(),gn=ac.createGain();
  o.type=type;o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+slide),t+d);
  gn.gain.setValueAtTime(vol,t);gn.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(gn);gn.connect(master);o.start(t);o.stop(t+d+.03);}
const SFX={blip:()=>tone(880,.03,'square',.12),sel:()=>tone(660,.05,'square',.2),bump:()=>tone(90,.08,'square',.2),
  hit:()=>{tone(180,.15,'sawtooth',.35,-120);tone(2400,.08,'square',.06,-1800);},heal:()=>[523,659,784].forEach((f,i)=>tone(f,.1,'triangle',.35,0,i*.07)),
  win:()=>[523,659,784,1047,784,1047].forEach((f,i)=>tone(f,.13,'square',.22,0,i*.11)),step:()=>tone(rnd(200,320),.04,'triangle',.25,-100),
  beep:()=>tone(1000,.08,'sine',.5),slam:()=>{tone(70,.25,'square',.5,-30);tone(200,.1,'sawtooth',.3,-150);},
  lose:()=>[392,330,262,196].forEach((f,i)=>tone(f,.28,'triangle',.4,0,i*.22)),item:()=>[784,988,1175,1568].forEach((f,i)=>tone(f,.09,'square',.2,0,i*.07))};
const midi=n=>440*Math.pow(2,(n-69)/12);
const SONG={
  battle:{bpm:160,b:[45,45,57,45,43,43,55,43,41,41,53,41,40,40,52,44],l:[69,72,76,72,67,71,74,71,65,69,72,69,68,71,76,80],lv:.06},
  boss:{bpm:176,b:[40,40,52,40,41,41,53,41,43,43,55,43,44,44,56,47],l:[76,75,76,79,77,76,77,81,79,77,79,83,80,83,86,88],lv:.06}};
let nextNote=0,mstep=0;
setInterval(()=>{if(!ac||muted)return;const k=fightTrack(),s=k&&!(mus.buf[k]||mus.fa)?SONG[k]:null;
  if(!s||menuOpen)return;const spb=60/s.bpm/2;if(nextNote<ac.currentTime)nextNote=ac.currentTime+.05;
  while(nextNote<ac.currentTime+.12){const w=nextNote-ac.currentTime;
    if(s.b[mstep])tone(midi(s.b[mstep]),spb*.9,'triangle',.28,0,w);if(s.l[mstep])tone(midi(s.l[mstep]),spb*.6,'square',s.lv,0,w);
    mstep=(mstep+1)%16;nextNote+=spb;}},25);
setInterval(musicTick,25);
const muteBtn=document.getElementById('mute');
muteBtn.addEventListener('click',()=>{muted=!muted;initAudio();if(master)master.gain.value=muted?0:.2;if(mus.gain&&mus.on)musVol(muted?0:MUSIC_VOL,.05);if(mus.a)mus.a.muted=muted;if(mus.fa)for(const a of Object.values(mus.fa))a.muted=muted;if(mus.bg)mus.bg.gain.value=muted?0:cueVol(mus.bk);muteBtn.textContent=muted?'SOUND OFF':'SOUND ON';if(muted){stopClip();duck(false);}});
// Real recordings (Horror Box). Each one fades in and out instead of hard-cutting
// (a cut mid-ring clicks) and ducks the music 10 dB until it has rung out.
const CLIP_VOL=.8,DUCK=Math.pow(10,-10/20);
const clipBuf={};let clip=null;
async function playClip(src){if(muted||!ac)return;stopClip();
  const me=clip={};
  try{const b=await(clipBuf[src]||(clipBuf[src]=fetch(src).then(r=>r.arrayBuffer()).then(a=>ac.decodeAudioData(a))));
    if(clip!==me||muted)return;const t=ac.currentTime,g=ac.createGain(),s=ac.createBufferSource();
    s.buffer=b;s.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(CLIP_VOL,t+.005);s.start(t);
    me.s=s;me.g=g;duck(true);s.onended=()=>{if(clip===me){clip=null;duck(false);}};}
  catch(e){delete clipBuf[src];if(clip!==me)return; // file:// can't fetch: plain <audio>
    const a=me.a=new Audio(src);a.volume=CLIP_VOL;a.play().catch(()=>{});duck(true);a.onended=()=>{if(clip===me){clip=null;duck(false);}};}
}
function stopClip(){const c=clip;clip=null;if(!c)return;
  if(c.s){const t=ac.currentTime;c.g.gain.cancelScheduledValues(t);c.g.gain.setValueAtTime(c.g.gain.value,t);c.g.gain.linearRampToValueAtTime(0,t+.05);c.s.stop(t+.06);}
  if(c.a){const a=c.a,f=setInterval(()=>{a.volume=Math.max(0,a.volume-.2);if(!a.volume){clearInterval(f);a.pause();}},10);}
}
function duck(on){if(!ac)return;const v=on?DUCK:1;
  if(mus.duck){const g=mus.duck.gain,t=ac.currentTime;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(v,t+(on?.15:.8));}
  if(mus.a)mus.a.volume=MUSIC_VOL*v;if(mus.fa)for(const [n,a] of Object.entries(mus.fa))a.volume=cueVol(n)*v;}
// Thom's composed soundtrack, for the title screen and the office:
// INTRO, then LOOP 8 times, then END, then back to INTRO. The original WAVs are
// queued back to back on the audio clock, so the joins are sample-accurate.
// Battles and ADR fade it out; it fades back in where it left off.
// Fights loop BATTLE (or BOSS for the Deadline) seamlessly, from the top each fight.
// The end credits play CREDITS once; when it finishes (or A skips) the game goes
// back to the title and the main cycle restarts from INTRO.
const MUSIC_VOL=.19,LOOPS=8,SR=48000; // .19 = 10 dB below the first mix level (.6)
const SEG={intro:4929778/SR,loop:2240000/SR,end:2752000/SR,battle:2817762/SR,boss:1920000/SR,credits:4768000/SR}; // exact lengths of the WAVs
const CUE_DB={credits:10}; // per-track level over MUSIC_VOL, in dB
const cueVol=k=>MUSIC_VOL*Math.pow(10,(CUE_DB[k]||0)/20);
const CYCLE=['intro',...Array(LOOPS).fill('loop'),'end'];
const mus={buf:{},duck:null,gain:null,i:0,next:0,q:[],on:false,resume:null,a:null,bg:null,bs:null,bk:null,fa:null};
async function loadMusic(){
  mus.duck=ac.createGain();mus.duck.connect(ac.destination); // Horror Box ducking, after the music faders
  mus.gain=ac.createGain();mus.gain.gain.value=0;mus.gain.connect(mus.duck);
  mus.bg=ac.createGain();mus.bg.gain.value=muted?0:MUSIC_VOL;mus.bg.connect(mus.duck);
  try{for(const k of ['intro','loop','battle','end','boss','credits']){
    const r=await fetch('assets/music/'+k+'.flac');mus.buf[k]=await ac.decodeAudioData(await r.arrayBuffer());}}
  catch(e){elPlay(0);mus.fa={};for(const k of ['battle','boss','credits']){const a=mus.fa[k]=new Audio('assets/music/'+k+'.flac');a.loop=k!=='credits';a.volume=cueVol(k);a.muted=muted;}
    mus.fa.credits.onended=()=>{if(state==='end')toTitle();};} // file:// can't fetch
}
// file:// fallback: <audio> elements. The loop file uses native looping, so its
// repeats are seamless; the section changes may have a tiny gap.
function elPlay(i){const k=CYCLE[i],a=new Audio('assets/music/'+k+'.flac');a.volume=MUSIC_VOL;a.muted=muted;mus.i=i;
  if(k==='loop'){a.loop=true;let n=0,last=0;a.ontimeupdate=()=>{if(a.currentTime<last&&++n>=LOOPS-1)a.loop=false;last=a.currentTime;};}
  a.onended=()=>elPlay(k==='loop'?CYCLE.length-1:(i+1)%CYCLE.length);mus.a=a;a.play().catch(()=>{});}
function musVol(v,d){const g=mus.gain.gain,t=ac.currentTime;g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(v,t+d);}
function queue(i,t,off){t=Math.round(t*ac.sampleRate)/ac.sampleRate; // on the sample grid, so nothing is interpolated
  const k=CYCLE[i],s=ac.createBufferSource();s.buffer=mus.buf[k];s.connect(mus.gain);
  s.start(t,off,SEG[k]-off);mus.q.push({s,i,t0:t-off,end:t+SEG[k]-off});mus.next=t+SEG[k]-off;mus.i=(i+1)%CYCLE.length;}
function musicTick(){
  if(!ac)return;const want=state==='title'||state==='world'||(state==='end'&&!creditsReady());
  battleMusic(cueTrack());
  if(mus.a){if(want&&mus.a.paused)mus.a.play().catch(()=>{});else if(!want&&!mus.a.paused)mus.a.pause();return;}
  if(!mus.gain)return;const now=ac.currentTime;
  if(!want&&mus.on){mus.on=false;const t=now+.3,cur=mus.q.find(s=>s.t0<=t&&t<s.end)||mus.q[0];
    if(cur){const off=Math.max(0,t-cur.t0);mus.resume=off<SEG[CYCLE[cur.i]]-.05?{i:cur.i,off}:{i:(cur.i+1)%CYCLE.length,off:0};}
    musVol(0,.3);mus.q.forEach(s=>s.s.stop(t));mus.q=[];return;}
  if(want&&!mus.on){const r=mus.resume;if(r&&!mus.buf[CYCLE[r.i]])return;
    mus.on=true;mus.resume=null;musVol(muted?0:MUSIC_VOL,r?.6:.05);if(r)queue(r.i,now+.05,r.off);else mus.next=now+.05;}
  if(!mus.on)return;mus.q=mus.q.filter(s=>s.end>now);
  while(mus.next<now+1&&mus.buf[CYCLE[mus.i]])queue(mus.i,Math.max(mus.next,now+.02),0);
}
const creditsReady=()=>!!(mus.buf.credits||mus.fa);
const cueTrack=()=>state==='battle'&&battle?(battle.boss?'boss':'battle'):state==='end'&&creditsReady()?'credits':null;
const fightTrack=()=>state==='battle'&&battle?(battle.boss?'boss':'battle'):null;
function battleMusic(k){
  if(mus.fa){for(const [n,a] of Object.entries(mus.fa)){if(n===k&&a.paused){a.currentTime=0;a.play().catch(()=>{});}else if(n!==k&&!a.paused)a.pause();}return;}
  if(!mus.bg)return;const t=ac.currentTime,g=mus.bg.gain;
  if(mus.bs&&mus.bk!==k){g.cancelScheduledValues(t);g.setValueAtTime(g.value,t);g.linearRampToValueAtTime(0,t+.3);mus.bs.stop(t+.3);mus.bs=mus.bk=null;}
  if(k&&!mus.bs&&mus.buf[k]){const s=ac.createBufferSource();s.buffer=mus.buf[k];s.connect(mus.bg);
    if(k==='credits')s.onended=()=>{if(mus.bs===s){mus.bs=mus.bk=null;if(state==='end')toTitle();}};
    else{s.loop=true;s.loopStart=0;s.loopEnd=SEG[k];}
    g.cancelScheduledValues(t);g.setValueAtTime(muted?0:cueVol(k),t);s.start(Math.round((t+.03)*ac.sampleRate)/ac.sampleRate);mus.bs=s;mus.bk=k;}
}
// Back to the title after the credits: the main music starts over from INTRO.
function musRestart(){mus.resume=null;mus.i=0;
  if(mus.a){mus.a.onended=null;mus.a.pause();elPlay(0);return;}
  if(mus.on&&ac){mus.on=false;musVol(0,.05);mus.q.forEach(s=>s.s.stop(ac.currentTime+.05));mus.q=[];}}
