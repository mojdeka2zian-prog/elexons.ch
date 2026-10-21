#!/usr/bin/env python3
"""
Elexons.ch Sitemap Generator
Scans all HTML files, extracts canonical URLs, and writes sitemap.xml.

Rules:
- Canonical domain: https://elexons.ch (no www)
- Skips: noindex pages, templates, redirect stubs, duplicate URLs, legal pages
- Preserves lastmod dates for existing URLs; uses today's date for new ones
- Run from the repo root (same directory as sitemap.xml)
"""

import os
import re
import sys
from datetime import date
from xml.etree import ElementTree as ET

# ─── Configuration ────────────────────────────────────────────────────────────

DOMAIN = "https://elexons.ch"
SITEMAP_PATH = "sitemap.xml"
SITE_ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

# Files to always exclude (basenames without path)
EXCLUDE_FILES = {
    "blog.html",               # redirect stub → /magazin/
    "blog_redirect_head.html", # redirect helper
    "datenschutz.html",        # legal page
    "impressum.html",          # legal page
    "projekt-TEMPLATE.html",   # template with placeholder canonical
}

# Priority + changefreq rules — checked in order, first match wins
PRIORITY_RULES = [
    (r"^/$",                   "1.0", "weekly"),
    (r"^/(leistungen|sanierung-zuerich|umbau-zuerich)$", "0.9", "monthly"),
    (r"^/(badsanierung|kuechensanierung|smart-home|altbausanierung|"
     r"fliesenleger|trockenbau|gipser|parkett|deckenbeleuchtung|"
     r"generalunternehmer)-zuerich$",
                               "0.8", "monthly"),
    (r"^/kontakt$",            "0.8", "monthly"),
    (r"^/projekte$",           "0.8", "weekly"),
    (r"^/magazin/?$",          "0.8", "weekly"),
    (r"^/magazin/",            "0.7", "monthly"),
    (r"^/(ueber-uns|umbau-kosten-zuerich)$", "0.7", "monthly"),
    (r"^/projekt-",            "0.7", "monthly"),
]

# Section labels for sitemap comments, keyed by sort bucket
SECTIONS = {
    0: "MAIN PAGES",
    1: "SERVICE PAGES",
    2: "PROJECT PAGES",
    3: "MAGAZIN",
}

# ─── Helpers ──────────────────────────────────────────────────────────────────

def get_priority(path):
    for pattern, priority, changefreq in PRIORITY_RULES:
        if re.match(pattern, path):
            return priority, changefreq
    return "0.6", "monthly"


def extract_canonical(html):
    m = re.search(
        r'<link\s[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']',
        html, re.IGNORECASE
    ) or re.search(
        r'<link\s[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']',
        html, re.IGNORECASE
    )
    return m.group(1) if m else None


def has_noindex(html):
    return bool(re.search(
        r'<meta\s[^>]*name=["\']robots["\'][^>]*content=["\'][^"\']*noindex',
        html, re.IGNORECASE
    ))


def normalise_url(url):
    """Strip trailing slash except for bare root /."""
    # Keep https://elexons.ch/ as-is; strip trailing slash from everything else
    stripped = url.rstrip("/")
    if stripped == DOMAIN:
        return DOMAIN + "/"
    return stripped


def load_existing_lastmods(sitemap_path):
    """Read existing sitemap.xml → {normalised_url: lastmod}."""
    lastmods = {}
    if not os.path.exists(sitemap_path):
        return lastmods
    try:
        tree = ET.parse(sitemap_path)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        for url_el in tree.getroot().findall("sm:url", ns):
            loc = url_el.find("sm:loc", ns)
            lm  = url_el.find("sm:lastmod", ns)
            if loc is not None and lm is not None:
                # Store both forms so lookup works regardless of trailing slash
                key = normalise_url(loc.text)
                lastmods[key] = lm.text
    except Exception as e:
        print(f"  Warning: could not parse existing sitemap: {e}")
    return lastmods


def scan_html_files(root):
    """Yield (canonical_url, html_content) for every relevant HTML file."""
    # Root-level HTML files (alphabetical for reproducibility)
    for fname in sorted(os.listdir(root)):
        if not fname.endswith(".html"):
            continue
        if fname in EXCLUDE_FILES:
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, encoding="utf-8", errors="ignore") as f:
            html = f.read()
        canonical = extract_canonical(html)
        if canonical:
            yield canonical, html

    # magazin/ subdirectory
    mag_dir = os.path.join(root, "magazin")
    if os.path.isdir(mag_dir):
        for fname in sorted(os.listdir(mag_dir)):
            if not fname.endswith(".html"):
                continue
            fpath = os.path.join(mag_dir, fname)
            with open(fpath, encoding="utf-8", errors="ignore") as f:
                html = f.read()
            canonical = extract_canonical(html)
            if canonical:
                yield canonical, html


def sort_bucket(loc):
    """Return numeric bucket for section ordering."""
    path = loc[len(DOMAIN):]
    if not path or path == "/":
        return 0
    if re.match(r"^/magazin/?$", path):
        return 3
    if "/magazin/" in path:
        return 3
    if re.match(r"^/projekt", path) or path == "/projekte":
        return 2
    return 1


# ─── Main ─────────────────────────────────────────────────────────────────────

def generate():
    sitemap_path = os.path.join(SITE_ROOT, SITEMAP_PATH)
    today = date.today().isoformat()

    print(f"Sitemap generator — domain: {DOMAIN}")
    print(f"Site root: {SITE_ROOT}")
    print()

    existing = load_existing_lastmods(sitemap_path)
    print(f"Loaded {len(existing)} existing lastmod entries.")
    print()

    entries = []
    seen   = set()   # stores normalised URLs for dedup
    skipped = []

    for canonical, html in scan_html_files(SITE_ROOT):
        # Must use our non-www domain
        if not canonical.startswith(DOMAIN):
            skipped.append(f"  SKIP (wrong domain — {canonical[:60]})")
            continue

        # Reject template placeholders
        if "[" in canonical or "]" in canonical:
            skipped.append(f"  SKIP (template placeholder): {canonical}")
            continue

        # Reject noindex
        if has_noindex(html):
            skipped.append(f"  SKIP (noindex): {canonical}")
            continue

        # Normalise for dedup; keep original for sitemap <loc>
        norm = normalise_url(canonical)
        if norm in seen:
            skipped.append(f"  SKIP (duplicate): {canonical}")
            continue
        seen.add(norm)

        # Path for priority lookup (use normalised, no trailing slash)
        path = norm[len(DOMAIN):]
        if not path:
            path = "/"

        priority, changefreq = get_priority(path)

        # Preserve existing lastmod; use today for new pages
        lastmod = existing.get(norm) or today

        entries.append({
            "loc":        canonical,   # use canonical exactly as written in HTML
            "lastmod":    lastmod,
            "changefreq": changefreq,
            "priority":   priority,
            "bucket":     sort_bucket(norm),
        })

    # Sort: by bucket, then main/service/project alphabetically,
    # then magazin index first, then articles newest-first
    def sort_key(e):
        b = e["bucket"]
        if b == 3:
            # /magazin/ index always first in section
            if re.match(r"^https://elexons\.ch/magazin/?$", e["loc"]):
                return (3, "0000")
            # Articles: newest lastmod first (inverted), then alpha
            return (3, "9999-" + e["lastmod"] + e["loc"])  # newer = smaller after invert
        return (b, e["loc"])

    # For magazines we want newest first so invert lastmod
    def final_sort_key(e):
        b = e["bucket"]
        if b == 3:
            if re.match(r"^https://elexons\.ch/magazin/?$", e["loc"]):
                return (3, "0000", "")
            # Negate lastmod by replacing digits with (9-d) for string sort
            inv = "".join(str(9 - int(c)) if c.isdigit() else c for c in e["lastmod"])
            return (3, "9999", inv + e["loc"])
        return (b, e["loc"], "")

    entries.sort(key=final_sort_key)

    # Report skipped
    if skipped:
        print("Skipped pages:")
        for s in skipped:
            print(s)
        print()

    # Write sitemap XML
    lines = ['<?xml version="1.0" encoding="UTF-8"?>']
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
    lines.append('        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"')
    lines.append('        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9')
    lines.append('        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">')
    lines.append("")

    prev_bucket = None
    for e in entries:
        b = e["bucket"]
        if b != prev_bucket and b in SECTIONS:
            lines.append(f"  <!-- ==================== {SECTIONS[b]} ==================== -->")
            lines.append("")
            prev_bucket = b

        lines.append("  <url>")
        lines.append(f"    <loc>{e['loc']}</loc>")
        lines.append(f"    <lastmod>{e['lastmod']}</lastmod>")
        lines.append(f"    <changefreq>{e['changefreq']}</changefreq>")
        lines.append(f"    <priority>{e['priority']}</priority>")
        lines.append("  </url>")
        lines.append("")

    lines.append("</urlset>")

    output = "\n".join(lines) + "\n"
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(output)

    # Validate XML
    try:
        tree = ET.parse(sitemap_path)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        xml_count = len(tree.getroot().findall("sm:url", ns))
        assert xml_count == len(entries)
    except Exception as ex:
        print(f"✗ XML validation failed: {ex}")
        sys.exit(1)

    print(f"✓ sitemap.xml written — {len(entries)} URLs")
    print(f"✓ XML valid — {xml_count} <url> elements")
    return len(entries)


if __name__ == "__main__":
    generate()
