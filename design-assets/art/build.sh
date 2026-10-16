#!/bin/sh
# Regenerate all artwork: SVG -> PNG (headless Chrome) -> WebP into public/art and src/assets/art
set -e
cd "$(dirname "$0")"
ROOT=../..
python3 generate.py > /dev/null
mkdir -p png "$ROOT/public/art" "$ROOT/src/assets/art"
SCALE=1.25 node render.mjs svg png tile-lemons tile-rosette tile-fleur medallion-round medallion-square > /dev/null
SCALE=1.5  node render.mjs svg png band > /dev/null
SCALE=1    node render.mjs svg png branch-a branch-b wreath plate-rim frame plaster > /dev/null
# Template images live in public/art (plain URLs); CSS images live in src/assets/art (bundled).
rm -f "$ROOT"/public/art/* "$ROOT"/src/assets/art/*
for n in tile-lemons tile-rosette tile-fleur medallion-round medallion-square branch-a branch-b; do
  cwebp -quiet -q 84 -alpha_q 92 -m 6 "png/$n.png" -o "$ROOT/public/art/$n.webp"
done
for n in band frame plate-rim; do
  cwebp -quiet -q 84 -alpha_q 92 -m 6 "png/$n.png" -o "$ROOT/src/assets/art/$n.webp"
done
cwebp -quiet -q 60 -alpha_q 70 -m 6 png/plaster.png -o "$ROOT/src/assets/art/plaster.webp"
ls -la "$ROOT/public/art" "$ROOT/src/assets/art"
