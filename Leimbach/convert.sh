#!/bin/bash
# Elexons — Convert Leimbach images for web
SRC="$HOME/Desktop/Leimbach"
DST="$HOME/Desktop/Leimbach/web"
mkdir -p "$DST"
echo "Converting Leimbach images..."
for f in "$SRC"/*.HEIC "$SRC"/*.heic; do
  [ -f "$f" ] || continue
  name=$(basename "$f" .HEIC); name=$(basename "$name" .heic)
  sips -s format jpeg -s formatOptions 88 "$f" --out "$DST/${name}.jpg" --resampleWidth 1600 2>/dev/null
  echo "  ✓ ${name}.jpg"
done
for f in "$SRC"/*.JPG "$SRC"/*.jpg; do
  [ -f "$f" ] || continue
  name=$(basename "$f" .JPG); name=$(basename "$name" .jpg)
  sips -s format jpeg -s formatOptions 88 "$f" --out "$DST/${name}.jpg" --resampleWidth 1600 2>/dev/null
  echo "  ✓ ${name}.jpg"
done
echo ""
echo "Done! $(ls "$DST"/*.jpg 2>/dev/null | wc -l | tr -d ' ') images ready in Leimbach/web/"
