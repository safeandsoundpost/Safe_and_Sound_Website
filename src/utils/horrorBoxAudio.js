// Sound for the Horror Box hotspots.
//
// Playback goes through HTMLAudioElement rather than the Web Audio API on
// purpose: iOS mutes Web Audio when the ringer switch is off, but lets media
// elements through. The whole point of the page is hearing the instrument, and
// most phones live on silent, so media elements win despite being the blunter
// tool. The synths below remain as a fallback for any id with no recording.
//
// TO ADD OR SWAP RECORDINGS: drop files into src/assets/audio/horror-box named
// <hotspotId>-<n>.mp3 (e.g. chamber-4.mp3). They are picked up automatically,
// hashed by Vite, and fetched only when a ring is clicked. Several takes for
// one id are chosen from at random so repeated clicks are not identical.
const sampleUrls = import.meta.glob("../assets/audio/horror-box/*.mp3", { eager: true, query: "?url" });

export const SAMPLES = {};
Object.keys(sampleUrls)
    .sort()
    .forEach((path) => {
        const id = path
            .split("/")
            .pop()
            .replace(/-\d+\.mp3$/, "");
        (SAMPLES[id] = SAMPLES[id] || []).push(sampleUrls[path].default);
    });

// One reusable element per take, so a repeat tap does not refetch and the
// browser keeps the decoded audio.
const elements = {};
const lastPlayed = {};
const playing = new Set();

function element(url) {
    if (!elements[url]) {
        const el = new Audio(url);
        el.preload = "none";
        el.addEventListener("ended", () => playing.delete(el));
        elements[url] = el;
    }
    return elements[url];
}

// Avoid replaying the same take twice in a row when an element has several.
function pickSample(id) {
    const list = SAMPLES[id];
    if (!list || !list.length) return null;
    if (list.length === 1) return list[0];
    let url = list[Math.floor(Math.random() * list.length)];
    if (url === lastPlayed[id]) url = list[(list.indexOf(url) + 1) % list.length];
    lastPlayed[id] = url;
    return url;
}

// Panic button. Ramps each sounding take down over ~60ms and then stops it,
// rather than cutting hard, which clicks.
//
// The countdown drives the loop, NOT a read-back of el.volume: iOS makes volume
// read-only on media elements, so the writes below are silently ignored there
// and waiting for the value to fall would never stop anything. On iOS this is
// simply a hard stop after 60ms, which is the behaviour that matters.
export function stopAll() {
    playing.forEach((el) => {
        let steps = 6;
        const step = el.volume / steps;
        const fade = setInterval(() => {
            steps -= 1;
            el.volume = Math.max(0, el.volume - step);
            if (steps <= 0) {
                clearInterval(fade);
                el.pause();
                el.currentTime = 0;
                el.volume = 1;
            }
        }, 10);
    });
    playing.clear();
    stopSynths();
}

const voices = new Set();
let ctx = null;
let master = null;

// Web Audio is now only used by the synth fallbacks below, for any hotspot
// that has no recording yet. Recordings go through media elements instead.
function initAudio() {
    if (ctx) {
        if (ctx.state !== "running") ctx.resume();
        return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();

    // Wrap the source factories so every synth voice is reachable by stopAll().
    const makeOsc = ctx.createOscillator.bind(ctx);
    ctx.createOscillator = () => hold(makeOsc());
    const makeBuf = ctx.createBufferSource.bind(ctx);
    ctx.createBufferSource = () => hold(makeBuf());

    ctx.resume();

    master = ctx.createGain();
    master.gain.value = 0.85;
    master.connect(ctx.destination);

    // A short synthetic plate so the synth fallbacks sit in a room rather than
    // right on top of the listener.
    const verb = ctx.createConvolver();
    verb.buffer = impulse(2.6, 2.6);
    const wet = ctx.createGain();
    wet.gain.value = 0.3;
    master.connect(verb);
    verb.connect(wet);
    wet.connect(ctx.destination);
}

// Every live synth voice, so the panic button can silence them too.
function hold(node) {
    voices.add(node);
    node.addEventListener("ended", () => voices.delete(node));
    return node;
}

function stopSynths() {
    if (!ctx) return;
    const t = ctx.currentTime;
    voices.forEach((v) => {
        try {
            v.stop(t + 0.07);
        } catch {
            // already stopped or never started; nothing to do
        }
    });
    voices.clear();
}

function impulse(seconds, decay) {
    const n = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
        const d = buf.getChannelData(c);
        for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, decay);
    }
    return buf;
}

function noise(seconds) {
    const n = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return buf;
}

// Struck metal: sine partials at inharmonic ratios, fast decay. The three
// brass rods are the same model at different pitches and ring times, which is
// what actually separates a thin rod from a thick one.
function struck(t, base, ring, level = 0.42) {
    [1, 2.76, 5.4, 8.93].forEach((r, i) => {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = base * r * (1 + (Math.random() - 0.5) * 0.006);
        const g = ctx.createGain();
        const amp = level / (i + 1.4);
        const dur = ring / (i * 0.7 + 1);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(amp, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(master);
        o.start(t);
        o.stop(t + dur + 0.1);
    });
    return ring + 0.1;
}

const SYNTH = {
    // Thin rod: highest and shortest of the three.
    rodThin: (t) => struck(t, 660, 1.7, 0.36),

    rodMedium: (t) => struck(t, 494, 2.1),

    // Thick rod: lowest, and it hangs around longest.
    rodThick: (t) => struck(t, 370, 3.1, 0.46),

    // Long thin steel, struck: bright, sparse partials, very long tail.
    skewer(t) {
        [1, 3.9, 7.24].forEach((r, i) => {
            const o = ctx.createOscillator();
            o.type = "sine";
            o.frequency.value = 1180 * r * (1 + (Math.random() - 0.5) * 0.004);
            const g = ctx.createGain();
            const amp = 0.3 / (i + 1.6);
            const dur = 3.4 / (i * 0.8 + 1);
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(amp, t + 0.003);
            g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
            o.connect(g).connect(master);
            o.start(t);
            o.stop(t + dur + 0.1);
        });
        return 3.5;
    },

    // The doorstop boing: pitch dives while a fast vibrato decays with it.
    doorstop(t) {
        const o = ctx.createOscillator();
        o.type = "sawtooth";
        o.frequency.setValueAtTime(430, t);
        o.frequency.exponentialRampToValueAtTime(70, t + 1.4);

        const vib = ctx.createOscillator();
        vib.frequency.value = 26;
        const vg = ctx.createGain();
        vg.gain.setValueAtTime(190, t);
        vg.gain.exponentialRampToValueAtTime(2, t + 1.4);
        vib.connect(vg).connect(o.frequency);

        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 1900;
        lp.Q.value = 5;

        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.45, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);

        o.connect(lp).connect(g).connect(master);
        o.start(t);
        o.stop(t + 1.7);
        vib.start(t);
        vib.stop(t + 1.7);
        return 1.6;
    },

    // Rust: a bandpass sweep over noise, chopped by a fast LFO so it grinds
    // rather than hisses.
    rustyCoil(t) {
        const src = ctx.createBufferSource();
        src.buffer = noise(1.7);

        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.Q.value = 8;
        bp.frequency.setValueAtTime(650, t);
        bp.frequency.linearRampToValueAtTime(2700, t + 1.2);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.42, t + 0.06);
        g.gain.setValueAtTime(0.42, t + 1.1);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);

        // Judder on top of the envelope gives it the catching-on-rust texture.
        const grind = ctx.createOscillator();
        grind.type = "square";
        grind.frequency.value = 34;
        const gg = ctx.createGain();
        gg.gain.value = 0.16;
        grind.connect(gg).connect(g.gain);

        src.connect(bp).connect(g).connect(master);
        src.start(t);
        src.stop(t + 1.7);
        grind.start(t);
        grind.stop(t + 1.7);
        return 1.6;
    },

    // The case played as a drum: a click transient over a low hollow thud.
    body(t) {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.setValueAtTime(165, t);
        o.frequency.exponentialRampToValueAtTime(68, t + 0.2);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.6, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
        o.connect(g).connect(master);
        o.start(t);
        o.stop(t + 0.45);

        const src = ctx.createBufferSource();
        src.buffer = noise(0.08);
        const hp = ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.value = 900;
        const ng = ctx.createGain();
        ng.gain.setValueAtTime(0.3, t);
        ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
        src.connect(hp).connect(ng).connect(master);
        src.start(t);
        src.stop(t + 0.1);
        return 0.45;
    },

    // Resonant bandpass on noise, swept by a slow LFO.
    coil(t) {
        const src = ctx.createBufferSource();
        src.buffer = noise(3.4);
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.Q.value = 19;
        bp.frequency.value = 1500;

        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.5;
        const lg = ctx.createGain();
        lg.gain.value = 750;
        lfo.connect(lg).connect(bp.frequency);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.55, t + 0.4);
        g.gain.setValueAtTime(0.55, t + 2.3);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 3.3);

        src.connect(bp).connect(g).connect(master);
        src.start(t);
        src.stop(t + 3.4);
        lfo.start(t);
        lfo.stop(t + 3.4);
        return 3.4;
    },

    // Detuned saws through a moving lowpass. Slow attack.
    chamber(t) {
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.3, t + 0.95);
        g.gain.setValueAtTime(0.3, t + 2.1);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);

        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.Q.value = 7;
        lp.frequency.setValueAtTime(200, t);
        lp.frequency.linearRampToValueAtTime(780, t + 1.7);
        lp.frequency.linearRampToValueAtTime(280, t + 3.4);

        lp.connect(g).connect(master);

        [
            [55, -9],
            [55, 8],
            [82.5, 4],
        ].forEach(([freq, detune]) => {
            const o = ctx.createOscillator();
            o.type = "sawtooth";
            o.frequency.value = freq;
            o.detune.value = detune;
            o.connect(lp);
            o.start(t);
            o.stop(t + 3.5);
        });
        return 3.4;
    },

    // Twang with a pitch wobble that dies faster than the note.
    ruler(t) {
        const o = ctx.createOscillator();
        o.type = "triangle";
        o.frequency.setValueAtTime(330, t);
        o.frequency.exponentialRampToValueAtTime(110, t + 0.55);

        const wob = ctx.createOscillator();
        wob.frequency.value = 19;
        const wg = ctx.createGain();
        wg.gain.setValueAtTime(95, t);
        wg.gain.exponentialRampToValueAtTime(0.5, t + 0.5);
        wob.connect(wg).connect(o.frequency);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.5, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1);

        o.connect(g).connect(master);
        o.start(t);
        o.stop(t + 1.1);
        wob.start(t);
        wob.stop(t + 1.1);
        return 1;
    },

    // Dry clack: filtered noise burst with a little wooden body under it.
    tongs(t) {
        const src = ctx.createBufferSource();
        src.buffer = noise(0.2);
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = 2200;
        bp.Q.value = 3;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.75, t + 0.003);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
        src.connect(bp).connect(g).connect(master);
        src.start(t);
        src.stop(t + 0.25);

        const body = ctx.createOscillator();
        body.type = "sine";
        body.frequency.setValueAtTime(320, t);
        body.frequency.exponentialRampToValueAtTime(150, t + 0.1);
        const bg = ctx.createGain();
        bg.gain.setValueAtTime(0.3, t);
        bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
        body.connect(bg).connect(master);
        body.start(t);
        body.stop(t + 0.2);
        return 0.3;
    },

    // Metallic whip: a fast rise and fall with an inharmonic partial riding it.
    loop(t) {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.setValueAtTime(170, t);
        o.frequency.exponentialRampToValueAtTime(820, t + 0.16);
        o.frequency.exponentialRampToValueAtTime(130, t + 0.95);

        const p = ctx.createOscillator();
        p.type = "triangle";
        p.frequency.setValueAtTime(170 * 3.7, t);
        p.frequency.exponentialRampToValueAtTime(820 * 3.7, t + 0.16);
        p.frequency.exponentialRampToValueAtTime(130 * 3.7, t + 0.95);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.42, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);

        const pg = ctx.createGain();
        pg.gain.setValueAtTime(0, t);
        pg.gain.linearRampToValueAtTime(0.1, t + 0.02);
        pg.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

        o.connect(g).connect(master);
        p.connect(pg).connect(master);
        o.start(t);
        o.stop(t + 1.2);
        p.start(t);
        p.stop(t + 1.2);
        return 1.1;
    },
};

// True when an id will actually make a noise, via a recording or a synth.
// The page's pick mode uses this to flag newly added circles as silent.
export function hasSound(id) {
    return Boolean(SYNTH[id] || (SAMPLES[id] && SAMPLES[id].length));
}

// The one switch every hotspot goes through. Resolves with the sound's
// duration in seconds so the caller can time the ring's active state.
export function playSound(id) {
    const url = pickSample(id);

    if (url) {
        const el = element(url);
        // Restart rather than ignore a rapid second tap on the same take.
        el.pause();
        el.currentTime = 0;
        el.volume = 1;
        playing.add(el);
        const started = el.play();
        if (started && started.catch) started.catch(() => {});
        // duration is unknown until metadata loads; fall back to a sane guess
        // so the ring highlight still clears.
        return Promise.resolve(isFinite(el.duration) && el.duration ? el.duration : 4);
    }

    // No recording for this id: fall back to the synth, which needs Web Audio.
    initAudio();
    if (!ctx) return Promise.resolve(0);
    return Promise.resolve(SYNTH[id] ? SYNTH[id](ctx.currentTime) : 0);
}
