#!/usr/bin/env python3
"""Generate the La Piccola Gelateria painterly majolica SVG art into ./svg.

    python3 generate.py [name ...]
    node render.mjs svg png [name ...]      # then convert PNG to WebP with cwebp
"""
import math
import os
import sys

from lib import *  # noqa: F401,F403

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'svg')
os.makedirs(OUT, exist_ok=True)
PI = math.pi


def mirror(body, sx, sy, size):
    return f'<g transform="translate({size if sx < 0 else 0} {size if sy < 0 else 0}) scale({sx} {sy})">{body}</g>'


def corner_ornament():
    """Top-left corner flourish: a rosette with two inward curls and leaves."""
    b = ''
    b += curl((52, 52), (128, 38), -PI / 2, 20, turns=1.25, dirn=1, w0=13, w1=2.5)[0]
    b += curl((52, 52), (38, 128), PI, 20, turns=1.25, dirn=-1, w0=13, w1=2.5)[0]
    b += leaf(72, 62, 44, 22, fill='url(#lb)', veins=False)
    b += leaf(62, 72, 44, 68, fill='url(#lb)', veins=False)
    b += burst(60, 60, 34, 45)
    b += rosette(52, 52, 28, petals=8, rot=22)
    b += dots([(96, 96), (110, 88), (88, 110), (150, 62), (62, 150)], r=3.0)
    return b


def edge_fleurs(s=400):
    """Small fleurs at the middle of each edge, pointing inwards."""
    g = ''
    g += fleur(s / 2, 74, .36, 0)
    g += fleur(s / 2, s - 74, .36, 180)
    g += fleur(74, s / 2, .36, -90)
    g += fleur(s - 74, s / 2, .36, 90)
    return g


def tile_lemons():
    s = 400
    b = tile_base(s)
    art = ''
    for sx, sy in ((1, 1), (-1, 1), (1, -1), (-1, -1)):
        art += mirror(corner_ornament(), sx, sy, s)
    # large background foliage and tendrils
    for (x, y, L, ang, flip) in [(200, 300, 90, -100, False), (200, 300, 90, -80, True), (200, 100, 84, 100, False),
                                 (200, 100, 84, 80, True), (86, 200, 70, 0, False), (314, 200, 70, 180, False)]:
        art += leaf(x, y, L, ang, fill='url(#bp)', vein=PALE, flip=flip)
    for p0, c, r, d in [((200, 138), (236, 100), 17, 1), ((196, 214), (234, 266), 18, -1), ((60, 214), (86, 252), 17, 1),
                        ((340, 160), (322, 116), 16, -1), ((226, 346), (292, 328), 18, 1), ((106, 96), (152, 88), 14, -1),
                        ((334, 252), (338, 298), 16, 1), ((70, 150), (70, 102), 14, -1), ((170, 56), (126, 66), 13, 1),
                        ((236, 346), (172, 338), 14, -1), ((345, 205), (330, 205), 12, 1)]:
        art += scroll(p0, c, r, dirn=d, w0=11, w1=2.2)[0]
    art += edge_fleurs(s)
    # blue-grey leaves clustered round the lemons
    for (x, y, L, ang, flip) in [(110, 120, 70, -150, False), (160, 98, 62, -60, True), (292, 170, 64, -30, False),
                                 (300, 236, 62, 40, True), (118, 262, 64, 160, False), (170, 322, 62, 80, True),
                                 (232, 128, 54, -90, False), (210, 268, 56, 110, True), (260, 150, 50, -120, True),
                                 (96, 188, 50, 150, True), (128, 200, 40, 20, False), (240, 190, 40, 200, True)]:
        art += leaf(x, y, L, ang, fill='url(#lb)', flip=flip)
    art += burst(206, 196, 40, 20) + burst(98, 222, 32, 170) + burst(300, 150, 32, -35)
    art += lemon(140, 150, 0.82, -18)
    art += lemon(262, 206, 0.9, 24)
    art += lemon(150, 290, 0.68, -34)
    art += dots([(64, 200), (336, 200), (206, 214), (232, 330), (170, 78), (240, 70), (352, 80), (46, 320)], r=3.6, fill=COB)
    art += dots([(120, 340), (284, 66), (340, 280)], r=4.4, fill=LEMON, opacity=1)
    b += painted(art)
    b += crackle(s)
    return svg(s, s, b, seed=4)


def tile_rosette():
    s = 400
    b = tile_base(s)
    art = ''
    for sx, sy in ((1, 1), (-1, 1), (1, -1), (-1, -1)):
        art += mirror(corner_ornament(), sx, sy, s)
    # four curls radiating from the centre
    for ang in (0, 90, 180, 270):
        art += (f'<g transform="rotate({ang} 200 200)">'
                + curl((200, 150), (200, 86), PI * 1.5 + 0.15, 20, turns=1.25, dirn=1, w0=13, w1=2.5)[0]
                + leaf(190, 126, 40, -118, fill='url(#lb)', veins=False)
                + fleur(200, 108, .34, 0)
                + '</g>')
    art += rosette(200, 200, 78, petals=12, rot=15, deep=False)
    art += f'<circle cx="200" cy="200" r="86" fill="none" stroke="{COB}" stroke-width="3" stroke-dasharray="1 7" stroke-linecap="round"/>'
    art += rosette(200, 200, 36, petals=8, rot=0, deep=True)
    b += painted(art)
    b += crackle(s, seed=9)
    return svg(s, s, b, seed=7)


def tile_fleur():
    s = 400
    b = tile_base(s)
    art = ''
    for sx, sy in ((1, 1), (-1, 1), (1, -1), (-1, -1)):
        art += mirror(corner_ornament(), sx, sy, s)
    art += fleur(200, 196, 1.5, 0, deep=False)
    art += fleur(200, 204, 1.5, 180, deep=False)
    for sd in (-1, 1):
        a, _ = curl((200, 200), (200 + sd * 96, 150), PI * (0.15 if sd > 0 else 0.85), 22, turns=1.2, dirn=-sd, w0=13, w1=2.5)
        art += a
        a, _ = curl((200, 200), (200 + sd * 96, 250), PI * (-0.15 if sd > 0 else 1.15), 22, turns=1.2, dirn=sd, w0=13, w1=2.5)
        art += a
    art += rosette(200, 200, 24, petals=8, rot=22, deep=True)
    b += painted(art)
    b += crackle(s, seed=12)
    return svg(s, s, b, seed=11)


def medallion_round():
    """Round geometric medallion (blue, white and yellow), like a painted plate or party cut-out."""
    s = 400
    c = 200
    b = ''
    g = f'<circle cx="{c}" cy="{c}" r="180" fill="{COB}"/>'
    g += f'<circle cx="{c}" cy="{c}" r="168" fill="none" stroke="#FFFBF0" stroke-width="5"/>'
    g += f'<circle cx="{c}" cy="{c}" r="156" fill="#FFFBF0"/>'
    for i in range(24):
        ang = i * 15
        g += f'<g transform="rotate({ang} {c} {c})"><circle cx="{c}" cy="{c - 165}" r="4" fill="{COB}"/></g>'
    g += f'<circle cx="{c}" cy="{c}" r="142" fill="none" stroke="{COB}" stroke-width="3"/>'
    # petal ring
    for i in range(8):
        ang = i * 45 + 22.5
        g += (f'<g transform="rotate({ang} {c} {c})"><path d="M{c} {c - 52} C{c + 34} {c - 78} {c + 30} {c - 128} {c} {c - 136} '
              f'C{c - 30} {c - 128} {c - 34} {c - 78} {c} {c - 52} Z" fill="url(#bp)"/>'
              f'<path d="M{c} {c - 70} C{c + 15} {c - 86} {c + 13} {c - 112} {c} {c - 120} C{c - 13} {c - 112} {c - 15} {c - 86} {c} {c - 70} Z" fill="{PALE}" opacity=".8"/></g>')
    # diamond
    g += f'<path d="M{c} {c - 62} L{c + 62} {c} L{c} {c + 62} L{c - 62} {c} Z" fill="{LEMON}" stroke="{NAVY}" stroke-width="4"/>'
    g += f'<path d="M{c} {c - 42} L{c + 42} {c} L{c} {c + 42} L{c - 42} {c} Z" fill="none" stroke="{COB}" stroke-width="3"/>'
    g += rosette(c, c, 26, petals=8, rot=22, deep=True)
    for ang in (0, 90, 180, 270):
        g += f'<g transform="rotate({ang} {c} {c})"><circle cx="{c}" cy="{c - 98}" r="7" fill="{LEMON}" stroke="{NAVY}" stroke-width="2"/></g>'
    b += f'<g filter="url(#shadow)">{painted(g)}</g>'
    return svg(s, s, b, seed=21)


def medallion_square():
    s = 400
    c = 200
    g = f'<rect x="20" y="20" width="360" height="360" rx="12" fill="{COB}"/>'
    g += '<rect x="36" y="36" width="328" height="328" rx="8" fill="#FFFBF0"/>'
    g += f'<rect x="52" y="52" width="296" height="296" rx="6" fill="none" stroke="{COB}" stroke-width="4"/>'
    # four-fold star
    for ang in (0, 90, 180, 270):
        g += (f'<g transform="rotate({ang} {c} {c})"><path d="M{c} {c - 20} C{c + 38} {c - 56} {c + 40} {c - 116} {c} {c - 150} '
              f'C{c - 40} {c - 116} {c - 38} {c - 56} {c} {c - 20} Z" fill="url(#bp)"/>'
              f'<path d="M{c} {c - 50} C{c + 15} {c - 70} {c + 14} {c - 104} {c} {c - 124} C{c - 14} {c - 104} {c - 15} {c - 70} {c} {c - 50} Z" fill="{PALE}" opacity=".8"/></g>')
    for ang in (45, 135, 225, 315):
        g += (f'<g transform="rotate({ang} {c} {c})"><path d="M{c} {c - 30} L{c + 20} {c - 78} L{c} {c - 120} L{c - 20} {c - 78} Z" '
              f'fill="{LEMON}" stroke="{NAVY}" stroke-width="3"/></g>')
    g += f'<circle cx="{c}" cy="{c}" r="40" fill="#FFFBF0" stroke="{COB}" stroke-width="5"/>'
    g += rosette(c, c, 30, petals=8, rot=0, deep=True)
    for (x, y) in ((74, 74), (326, 74), (74, 326), (326, 326)):
        g += f'<circle cx="{x}" cy="{y}" r="11" fill="{LEMON}" stroke="{NAVY}" stroke-width="3"/>'
    b = f'<g filter="url(#shadow)">{painted(g)}</g>'
    return svg(s, s, b, seed=25)


def blossom(x, y, r=14, a=0):
    g = f'<g transform="translate({n(x)} {n(y)}) rotate({n(a)})">'
    for i in range(5):
        g += (f'<ellipse cx="0" cy="{n(-r * .8)}" rx="{n(r * .5)}" ry="{n(r * .82)}" transform="rotate({i * 72})" '
              f'fill="#FFFDF5" stroke="#C9B58A" stroke-width=".8"/>')
    g += f'<circle r="{n(r * .3)}" fill="{LEMON}"/><circle r="{n(r * .13)}" fill="#C98A00"/>'
    return g + '</g>'


def branch(flip=False, hang=3, seed=0):
    """A lemon branch with leaves, hanging lemons and blossoms, on transparent ground."""
    import random as _r
    r = _r.Random(seed)
    W, H = 900, 480
    body = ''
    stem = bezier((24, 70), (260, 40), (560, 150), (870, 380), steps=50)
    leaves = ''
    for i in range(3, 50, 3):
        x, y = stem[i]
        nx, ny = stem[i + 1]
        ang = math.degrees(math.atan2(ny - y, nx - x))
        side = -1 if (i // 3) % 2 else 1
        L = 120 - abs(i - 24) * .8 + r.uniform(-8, 8)
        leaves += leaf(x, y, L, ang + side * r.uniform(38, 58), fill='url(#lgreen)' if (i // 3) % 3 else 'url(#lb)',
                       vein='#EAF3E2', flip=(side < 0))
    lems = ''
    spots = [14, 28, 41][:hang]
    for k, idx in enumerate(spots):
        x, y = stem[idx]
        lems += f'<path d="M{n(x)} {n(y)} q 10 30 4 60" stroke="#2C4E78" stroke-width="5" fill="none" stroke-linecap="round"/>'
        lems += lemon(x + 6, y + 108 + (k % 2) * 12, 1.18 - k * .08, 78 + r.uniform(-12, 12))
    blossoms = ''.join(blossom(*stem[i], r=16, a=i * 9) for i in (8, 21, 34, 46))
    body += f'<path d="{ribbon(stem, 10, 3)}" fill="#2C4E78"/>'
    body += leaves + lems + blossoms
    g = painted(body)
    if flip:
        g = f'<g transform="translate({W} 0) scale(-1 1)">{g}</g>'
    return svg(W, H, f'<g filter="url(#shadow)">{g}</g>', seed=31 + seed, wobble=3.2)


def wreath():
    W = 700
    c = W / 2
    body = ''
    R = 250
    for i in range(24):
        th = i * 2 * PI / 24
        x, y = c + R * math.cos(th), c + R * math.sin(th)
        ang = math.degrees(th) + 90
        body += leaf(x, y, 66, ang - 50, fill='url(#lgreen)' if i % 2 else 'url(#lb)', veins=False)
        body += leaf(x, y, 58, ang + 130, fill='url(#lb)' if i % 2 else 'url(#lgreen)', veins=False)
    ring = [(c + R * math.cos(t / 60 * 2 * PI), c + R * math.sin(t / 60 * 2 * PI)) for t in range(61)]
    body = f'<path d="{ribbon(ring, 7, 7)}" fill="#2C4E78"/>' + body
    for i in range(8):
        th = i * 2 * PI / 8 + .2
        x, y = c + R * math.cos(th), c + R * math.sin(th)
        body += lemon(x, y, .56, math.degrees(th) + 90)
    for i in range(8):
        th = i * 2 * PI / 8 + .2 + PI / 8
        x, y = c + R * math.cos(th), c + R * math.sin(th)
        body += blossom(x, y, 12, math.degrees(th))
    return svg(W, W, f'<g filter="url(#shadow)">{painted(body)}</g>', seed=41, wobble=3)


def band():
    """Seamless 800x200 border strip (repeat-x): framed lines with lemons, rosettes and scrolls."""
    W, H = 800, 200
    body = f'<rect x="0" y="22" width="{W}" height="9" fill="{NAVY}"/><rect x="0" y="{H - 31}" width="{W}" height="9" fill="{NAVY}"/>'
    body += f'<rect x="0" y="38" width="{W}" height="3.5" fill="{COB}"/><rect x="0" y="{H - 41.5}" width="{W}" height="3.5" fill="{COB}"/>'
    cy = H / 2
    for i in range(4):
        x0 = i * 200
        # cell: rosette | curls | lemon on leaves | dots
        body += rosette(x0 + 34, cy, 27, petals=8, rot=22 * i)
        a, _ = curl((x0 + 64, cy + 3), (x0 + 92, cy - 20), -PI / 2, 11, turns=1.2, dirn=1, w0=8, w1=2)
        body += a
        a, _ = curl((x0 + 64, cy - 3), (x0 + 92, cy + 20), PI / 2, 11, turns=1.2, dirn=-1, w0=8, w1=2)
        body += a
        body += leaf(x0 + 112, cy, 34, -32, fill='url(#lb)', veins=False)
        body += leaf(x0 + 112, cy, 34, 32, fill='url(#lb)', veins=False, flip=True)
        body += lemon(x0 + 142, cy + 1, .56, -20 + (i % 2) * 40)
        body += dots([(x0 + 186, cy - 30), (x0 + 186, cy), (x0 + 186, cy + 30)], r=4, fill=COB)
    return svg(W, H, painted(body), seed=51, wobble=2.6, mottle=0.12)


def plate_rim():
    """Painted plate rim: a ring of scrollwork round a transparent centre."""
    W = 600
    c = W / 2
    body = f'<circle cx="{c}" cy="{c}" r="294" fill="{NAVY}"/>'
    body += f'<circle cx="{c}" cy="{c}" r="286" fill="#FFFBF0"/>'
    body += f'<circle cx="{c}" cy="{c}" r="276" fill="none" stroke="{COB}" stroke-width="4"/>'
    body += f'<circle cx="{c}" cy="{c}" r="232" fill="{NAVY}"/>'
    body += f'<circle cx="{c}" cy="{c}" r="238" fill="none" stroke="{COB}" stroke-width="5"/>'
    mid = 257
    for i in range(16):
        th = i * 2 * PI / 16
        x, y = c + mid * math.cos(th), c + mid * math.sin(th)
        a = math.degrees(th)
        body += f'<g transform="translate({n(x)} {n(y)}) rotate({n(a + 90)})">'
        body += f'<path d="M0 14 C9 6 9 -8 0 -16 C-9 -8 -9 6 0 14 Z" fill="url(#bp)"/>'
        body += f'<path d="M0 8 C4 3 4 -4 0 -9 C-4 -4 -4 3 0 8 Z" fill="{PALE}" opacity=".8"/></g>'
        th2 = th + PI / 16
        x2, y2 = c + mid * math.cos(th2), c + mid * math.sin(th2)
        body += f'<circle cx="{n(x2)}" cy="{n(y2)}" r="4.5" fill="{LEMON}" stroke="{NAVY}" stroke-width="1.6"/>'
    # cut the centre
    out = (f'<mask id="hole"><rect width="{W}" height="{W}" fill="#fff"/><circle cx="{c}" cy="{c}" r="231" fill="#000"/></mask>'
           f'<g filter="url(#shadow)"><g mask="url(#hole)">{painted(body)}</g></g>')
    return svg(W, W, out, seed=61, wobble=2.6)


def frame():
    """9-slice photo frame (slice 100): glazed tile border with transparent centre."""
    W = 500
    body = (f'<mask id="hole"><rect width="{W}" height="{W}" fill="#fff"/>'
            f'<rect x="88" y="88" width="{W - 176}" height="{W - 176}" fill="#000"/></mask>')
    body += f'<g filter="url(#shadow)"><g mask="url(#hole)"><g filter="url(#edge)">'
    body += f'<rect x="12" y="12" width="{W - 24}" height="{W - 24}" rx="10" fill="url(#glaze)"/></g></g></g>'
    ring = f'<rect x="12" y="12" width="{W - 24}" height="{W - 24}" rx="10" fill="none" stroke="{NAVY}" stroke-width="7"/>'
    ring += f'<rect x="26" y="26" width="{W - 52}" height="{W - 52}" rx="5" fill="none" stroke="{COB}" stroke-width="3"/>'
    ring += f'<rect x="88" y="88" width="{W - 176}" height="{W - 176}" rx="2" fill="none" stroke="{NAVY}" stroke-width="5"/>'
    ring += f'<rect x="78" y="78" width="{W - 156}" height="{W - 156}" rx="3" fill="none" stroke="{COB}" stroke-width="2.5"/>'
    # edge motif: alternating leaf-buds and dots along each side (period 50)
    motif = ''
    for k in range(0, 8):
        x = 100 + k * 50
        if x > W - 100:
            break
        motif += f'<path d="M{x} 57 C{x + 11} 49 {x + 11} 36 {x} 28 C{x - 11} 36 {x - 11} 49 {x} 57 Z" fill="url(#bp)"/>'
        motif += f'<circle cx="{x + 25}" cy="43" r="4.5" fill="{LEMON}" stroke="{NAVY}" stroke-width="1.5"/>'
    sides = ''
    for ang in (0, 90, 180, 270):
        sides += f'<g transform="rotate({ang} {W / 2} {W / 2})">{motif}</g>'
    corners = ''
    for (x, y) in ((50, 50), (W - 50, 50), (50, W - 50), (W - 50, W - 50)):
        corners += rosette(x, y, 30, petals=8, rot=22)
        corners += dots([(x + 40 * (1 if x < 100 else -1), y), (x, y + 40 * (1 if y < 100 else -1))], r=3.4)
    return svg(W, W, body + painted(ring + sides + corners), seed=71, wobble=2.4)


def plaster():
    """Seamless whitewashed-plaster grain, designed to sit over a flat cream ground."""
    W = 512
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{W}" viewBox="0 0 {W} {W}">'
            '<defs>'
            '<filter id="g1" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="2" stitchTiles="stitch"/>'
            '<feColorMatrix type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.22  0 0 0 1.5 -0.62"/></filter>'
            '<filter id="g2" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="4" seed="9" stitchTiles="stitch"/>'
            '<feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 0.98  0 0 0 0 0.94  0 0 0 1.4 -0.52"/></filter>'
            '<filter id="g3" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.014" numOctaves="3" seed="14" stitchTiles="stitch"/>'
            '<feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.45  0 0 0 0 0.3  0 0 0 1.2 -0.5"/></filter>'
            '</defs>'
            f'<rect width="{W}" height="{W}" filter="url(#g3)" opacity=".34"/>'
            f'<rect width="{W}" height="{W}" filter="url(#g2)" opacity=".55"/>'
            f'<rect width="{W}" height="{W}" filter="url(#g1)" opacity=".42"/>'
            '</svg>')


ART = {
    'tile-lemons': tile_lemons,
    'tile-rosette': tile_rosette,
    'tile-fleur': tile_fleur,
    'medallion-round': medallion_round,
    'medallion-square': medallion_square,
    'branch-a': lambda: branch(False, 3, 1),
    'branch-b': lambda: branch(True, 2, 2),
    'wreath': wreath,
    'band': band,
    'plate-rim': plate_rim,
    'frame': frame,
    'plaster': plaster,
}

if __name__ == '__main__':
    names = sys.argv[1:] or list(ART)
    for name in names:
        with open(os.path.join(OUT, f'{name}.svg'), 'w') as f:
            f.write(ART[name]())
        print('wrote', name)
