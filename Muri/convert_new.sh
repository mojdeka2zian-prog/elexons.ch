#!/bin/bash
# Elexons — Convert NEW Muri images for web (adds missing files to web/)
SRC="$HOME/Desktop/Muri"
DST="$HOME/Desktop/Muri/web"
mkdir -p "$DST"
echo "Converting new Muri images..."
for f in "$SRC"/*.HEIC "$SRC"/*.heic; do
  [ -f "$f" ] || continue
  name=$(basename "$f" .HEIC); name=$(basename "$name" .heic)
  # Skip if already converted
  [ -f "$DST/${name}.jpg" ] && echo "  — skipping ${name}.jpg (exists)" && continue
  sips -s format jpeg -s formatOptions 88 "$f" --out "$DST/${name}.jpg" --resampleWidth 1600 2>/dev/null
  echo "  ✓ ${name}.jpg"
done
for f in "$SRC"/*.JPG "$SRC"/*.jpg; do
  [ -f "$f" ] || continue
  name=$(basename "$f" .JPG); name=$(basename "$name" .jpg)
  [ -f "$DST/${name}.jpg" ] && echo "  — skipping ${name}.jpg (exists)" && continue
  sips -s format jpeg -s formatOptions 88 "$f" --out "$DST/${name}.jpg" --resampleWidth 1600 2>/dev/null
  echo "  ✓ ${name}.jpg"
done
echo ""
echo "Done! Total: $(ls "$DST"/*.jpg 2>/dev/null | wc -l | tr -d ' ') images in Muri/web/"
