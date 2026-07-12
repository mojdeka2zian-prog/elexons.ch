#!/bin/bash
SRC="$HOME/Desktop/murii"
DST="$HOME/Desktop/murii/web"
mkdir -p "$DST"
echo "Converting images..."
for f in "$SRC"/*.HEIC "$SRC"/*.heic; do
  [ -f "$f" ] || continue
  name=$(basename "${f%.*}")
  sips -s format jpeg -s formatOptions 88 "$f" --out "$DST/${name}.jpg" --resampleWidth 1600 2>/dev/null
  echo "  ✓ ${name}.jpg"
done
for f in "$SRC"/*.JPG "$SRC"/*.jpg; do
  [ -f "$f" ] || continue
  name=$(basename "${f%.*}")
  sips -s format jpeg -s formatOptions 88 "$f" --out "$DST/${name}.jpg" --resampleWidth 1600 2>/dev/null
  echo "  ✓ ${name}.jpg"
done
echo ""
echo "Done! $(ls "$DST"/*.jpg 2>/dev/null | wc -l | tr -d ' ') images ready in murii/web/"
