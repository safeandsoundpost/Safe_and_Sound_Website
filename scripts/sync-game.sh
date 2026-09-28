#!/usr/bin/env bash
# Copies the Safe & Sound RPG into public/game so it ships with the site.
# Run again whenever the game changes:  npm run sync-game [path/to/safe-and-sound-rpg]
#
# The soundtrack WAVs are converted to FLAC on the way in. FLAC is lossless, so
# the audio is bit-identical and the loops stay sample-exact, but intro.wav and
# credits.wav are over Cloudflare's 25 MiB per-file limit as WAVs.
set -euo pipefail

SITE="$(cd "$(dirname "$0")/.." && pwd)"
GAME="${1:-$SITE/../../_SAFE&SOUND RPG/safe-and-sound-rpg}"
OUT="$SITE/public/game"

[ -f "$GAME/index.html" ] || { echo "Game not found at $GAME" >&2; exit 1; }
command -v ffmpeg >/dev/null || { echo "ffmpeg is needed for the music (brew install ffmpeg)" >&2; exit 1; }

rm -rf "$OUT"
mkdir -p "$OUT/assets/music"
cp -R "$GAME/index.html" "$GAME/css" "$GAME/js" "$OUT/"
for d in "$GAME"/assets/*; do
    [ "$(basename "$d")" = music ] || cp -R "$d" "$OUT/assets/"
done

for f in "$GAME"/assets/music/*.wav; do
    ffmpeg -loglevel error -y -i "$f" -c:a flac -compression_level 8 "$OUT/assets/music/$(basename "${f%.wav}").flac"
done
sed -i '' "s/+k+'\.wav'/+k+'.flac'/g" "$OUT/js/audio.js"
grep -q "\.wav'" "$OUT/js/audio.js" && { echo "audio.js still points at a .wav, check it" >&2; exit 1; }

find "$OUT" -name .DS_Store -delete
echo "Game synced to public/game ($(du -sh "$OUT" | cut -f1))"
