"""Procedural hand-painted majolica artwork primitives for La Piccola Gelateria.

Everything here emits SVG strings. A feTurbulence displacement + pigment-mottle filter gives
shapes the slightly wobbly edges and uneven glaze of hand-painted tiles. Final art is rendered
to WebP by render.mjs, so the heavy filters never run in the visitor's browser.
"""
import math
import random

NAVY = '#123B66'
DEEP = '#1B4D8C'
COB = '#155CA2'
MID = '#3F7DBE'
SOFT = '#84AAD4'
PALE = '#C3D8EC'
GREYB = '#7C98B3'
LEMON = '#FFD84D'
LEMON_D = '#E8A800'
LEMON_L = '#FFF1A8'
LEAF = '#577A50'
GLAZE = '#FFFBF0'
GLAZE2 = '#F4E8CE'


def n(x):
    s = f'{x:.1f}'
    return s[:-2] if s.endswith('.0') else s


def defs(seed=3, wobble=4.0, mottle=0.2):
    """Shared gradients and the painterly filters."""
    return f'''<defs>
  <radialGradient id="lg" cx="0.36" cy="0.32" r="0.8">
    <stop offset="0" stop-color="{LEMON_L}"/><stop offset="0.32" stop-color="{LEMON}"/>
    <stop offset="1" stop-color="{LEMON_D}"/>
  </radialGradient>
  <linearGradient id="bp" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0" stop-color="{DEEP}"/><stop offset="0.55" stop-color="{COB}"/>
    <stop offset="1" stop-color="{MID}"/>
  </linearGradient>
  <linearGradient id="bd" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="{COB}"/><stop offset="1" stop-color="{NAVY}"/>
  </linearGradient>
  <linearGradient id="lb" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#4F7E94"/><stop offset="1" stop-color="#86AEBD"/>
  </linearGradient>
  <linearGradient id="lgreen" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#4C6E47"/><stop offset="1" stop-color="#8FB07C"/>
  </linearGradient>
  <radialGradient id="glaze" cx="0.5" cy="0.45" r="0.75">
    <stop offset="0" stop-color="{GLAZE}"/><stop offset="0.7" stop-color="{GLAZE}"/>
    <stop offset="1" stop-color="{GLAZE2}"/>
  </radialGradient>
  <filter id="paint" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" seed="{seed}" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="{wobble}" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.014 0.022" numOctaves="4" seed="{seed + 5}" result="n1"/>
    <feColorMatrix in="n1" type="matrix" values="{mottle} 0 0 0 {1 - mottle}  {mottle} 0 0 0 {1 - mottle}  {mottle} 0 0 0 {1 - mottle}  0 0 0 0 1" result="tint"/>
    <feBlend in="d" in2="tint" mode="multiply" result="mix"/>
    <feComposite in="mix" in2="d" operator="in"/>
  </filter>
  <filter id="edge" x="-3%" y="-3%" width="106%" height="106%">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="{seed + 11}" result="w"/>
    <feDisplacementMap in="SourceGraphic" in2="w" scale="7" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="soft"><feGaussianBlur stdDeviation="1.4"/></filter>
  <filter id="shadow" x="-10%" y="-10%" width="125%" height="125%">
    <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="{NAVY}" flood-opacity="0.28"/>
  </filter>
</defs>'''


def svg(w, h, body, seed=3, wobble=4.0, mottle=0.2):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'{defs(seed, wobble, mottle)}{body}</svg>')


# ------------------------------------------------------------------ geometry helpers
def ribbon(points, w0, w1):
    """Closed polygon path around a centre line, tapering from width w0 to w1."""
    left, right = [], []
    m = len(points)
    for i, (x, y) in enumerate(points):
        if i == 0:
            dx, dy = points[1][0] - x, points[1][1] - y
        elif i == m - 1:
            dx, dy = x - points[i - 1][0], y - points[i - 1][1]
        else:
            dx, dy = points[i + 1][0] - points[i - 1][0], points[i + 1][1] - points[i - 1][1]
        ln = math.hypot(dx, dy) or 1
        nx, ny = -dy / ln, dx / ln
        t = i / (m - 1)
        w = (w0 * (1 - t) + w1 * t) / 2
        left.append((x + nx * w, y + ny * w))
        right.append((x - nx * w, y - ny * w))
    pts = left + right[::-1]
    return 'M' + ' L'.join(f'{n(x)} {n(y)}' for x, y in pts) + ' Z'


def bezier(p0, p1, p2, p3, steps=28):
    out = []
    for i in range(steps + 1):
        t = i / steps
        a, b, c, d = (1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t ** 2, t ** 3
        out.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
                    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return out


def spiral(end, theta0, r0, turns, dirn=1, shrink=0.72, steps=70):
    """Logarithmic curl starting at `end` and winding inward."""
    cx, cy = end[0] - r0 * math.cos(theta0), end[1] - r0 * math.sin(theta0)
    pts = []
    for i in range(steps + 1):
        t = i / steps
        th = theta0 + dirn * t * turns * 2 * math.pi
        r = r0 * (shrink ** (t * turns))
        pts.append((cx + r * math.cos(th), cy + r * math.sin(th)))
    return pts


def curl(p0, end, theta0, r0, turns=1.15, dirn=1, w0=15, w1=2.5, bend=0.45, fill='url(#bd)'):
    """A calligraphic stem that sweeps from p0 and finishes in an inward curl."""
    tx, ty = -math.sin(theta0) * dirn, math.cos(theta0) * dirn
    dist = math.hypot(end[0] - p0[0], end[1] - p0[1])
    p2 = (end[0] - tx * dist * bend, end[1] - ty * dist * bend)
    px, py = (end[0] - p0[0]), (end[1] - p0[1])
    p1 = (p0[0] + px * 0.35 - py * 0.25 * dirn, p0[1] + py * 0.35 + px * 0.25 * dirn)
    stem = bezier(p0, p1, p2, end)
    sp = spiral(end, theta0, r0, turns, dirn)[1:]
    pts = stem + sp
    return f'<path d="{ribbon(pts, w0, w1)}" fill="{fill}"/>', pts


def leaf(x, y, length=80, angle=0, width=0.34, fill='url(#lb)', vein='#E6F0F5', veins=True, flip=False):
    w = length * width
    s = -1 if flip else 1
    d = (f'M0 0 C{n(length * .18)} {n(-w * 1.15 * s)} {n(length * .68)} {n(-w * s)} {n(length)} 0 '
         f'C{n(length * .68)} {n(w * s)} {n(length * .18)} {n(w * 1.15 * s)} 0 0 Z')
    g = f'<g transform="translate({n(x)} {n(y)}) rotate({n(angle)})">'
    g += f'<path d="{d}" fill="{fill}"/>'
    g += (f'<path d="M0 0 C{n(length * .3)} {n(w * .1 * s)} {n(length * .7)} {n(w * .5 * s)} {n(length)} 0 '
          f'C{n(length * .68)} {n(w * s)} {n(length * .18)} {n(w * 1.15 * s)} 0 0 Z" fill="#0E2F55" opacity=".16"/>')
    if veins:
        g += (f'<path d="M{n(length * .04)} 0 L{n(length * .9)} 0" stroke="{vein}" stroke-width="{n(max(1.2, length * .022))}" '
              f'stroke-linecap="round" opacity=".85"/>')
        for t in (.28, .46, .64):
            for sd in (-1, 1):
                g += (f'<path d="M{n(length * t)} 0 L{n(length * (t + .14))} {n(sd * w * .55)}" stroke="{vein}" '
                      f'stroke-width="{n(max(.9, length * .014))}" stroke-linecap="round" opacity=".6"/>')
    return g + '</g>'


def lemon(x, y, s=1.0, a=0, tip=True):
    body = ('M-1 0.04 C-1.02 -0.6 -0.5 -0.8 0.02 -0.8 C0.55 -0.8 0.88 -0.5 1.1 -0.14 '
            'C1.22 -0.06 1.22 0.08 1.1 0.14 C0.88 0.5 0.55 0.8 0.02 0.8 C-0.5 0.8 -1.02 0.64 -1 0.04 Z')
    g = f'<g transform="translate({n(x)} {n(y)}) rotate({n(a)}) scale({n(s)})">'
    g += f'<path d="{body}" transform="scale(60)" fill="url(#lg)" stroke="#C98A00" stroke-width=".035" stroke-opacity=".55"/>'
    g += '<path d="M-0.92 0.34 C-0.62 0.8 0.55 0.92 1.06 0.2 C0.7 0.66 0.05 0.8 -0.45 0.66 Z" transform="scale(60)" fill="#B87800" opacity=".26"/>'
    g += '<ellipse cx="-20" cy="-22" rx="22" ry="8.5" transform="rotate(-24 -20 -22)" fill="#fff" opacity=".62" filter="url(#soft)"/>'
    g += '<ellipse cx="-4" cy="-30" rx="9" ry="3" transform="rotate(-8 -4 -30)" fill="#fff" opacity=".55"/>'
    # pore dots
    r = random.Random(int(abs(x * 7 + y * 13)))
    for _ in range(9):
        px, py = r.uniform(-48, 48), r.uniform(-30, 34)
        g += f'<circle cx="{n(px)}" cy="{n(py)}" r="{n(r.uniform(.6, 1.1))}" fill="#C98A00" opacity=".35"/>'
    return g + '</g>'


def rosette(x, y, r=60, petals=8, rot=0, deep=False):
    fill = 'url(#bd)' if deep else 'url(#bp)'
    p = (f'M0 {n(-r * .16)} C{n(r * .34)} {n(-r * .3)} {n(r * .3)} {n(-r * .84)} 0 {n(-r)} '
         f'C{n(-r * .3)} {n(-r * .84)} {n(-r * .34)} {n(-r * .3)} 0 {n(-r * .16)} Z')
    inner = (f'M0 {n(-r * .3)} C{n(r * .17)} {n(-r * .42)} {n(r * .15)} {n(-r * .7)} 0 {n(-r * .82)} '
             f'C{n(-r * .15)} {n(-r * .7)} {n(-r * .17)} {n(-r * .42)} 0 {n(-r * .3)} Z')
    g = f'<g transform="translate({n(x)} {n(y)}) rotate({n(rot)})">'
    for i in range(petals):
        ang = i * 360 / petals
        g += (f'<g transform="rotate({n(ang)})"><path d="{p}" fill="{fill}"/>'
              f'<path d="{inner}" fill="{PALE}" opacity=".78"/></g>')
    g += f'<circle r="{n(r * .22)}" fill="#FFFBF0"/><circle r="{n(r * .15)}" fill="{NAVY}"/>'
    g += f'<circle r="{n(r * .07)}" fill="{LEMON}"/>'
    return g + '</g>'


def fleur(x, y, s=1.0, a=0, deep=False):
    fill = 'url(#bd)' if deep else 'url(#bp)'
    g = f'<g transform="translate({n(x)} {n(y)}) rotate({n(a)}) scale({n(s)})">'
    g += f'<path d="M0 -104 C22 -72 26 -32 0 0 C-26 -32 -22 -72 0 -104 Z" fill="{fill}"/>'
    g += f'<path d="M0 -92 C10 -70 11 -42 0 -22 C-11 -42 -10 -70 0 -92 Z" fill="{PALE}" opacity=".75"/>'
    for sd in (-1, 1):
        g += (f'<path d="M{n(sd * 6)} -22 C{n(sd * 46)} -62 {n(sd * 78)} -42 {n(sd * 66)} -6 '
              f'C{n(sd * 58)} 16 {n(sd * 24)} 14 {n(sd * 8)} -2 Z" fill="{fill}"/>')
        g += (f'<path d="M{n(sd * 16)} -18 C{n(sd * 42)} -46 {n(sd * 60)} -34 {n(sd * 54)} -10" fill="none" '
              f'stroke="{PALE}" stroke-width="3.5" stroke-linecap="round" opacity=".8"/>')
    g += f'<rect x="-26" y="-4" width="52" height="13" rx="5" fill="{NAVY}"/>'
    g += f'<rect x="-20" y="-1" width="40" height="3" rx="1.5" fill="{PALE}" opacity=".7"/>'
    g += f'<path d="M-8 9 C-4 26 -14 34 -20 44 M8 9 C4 26 14 34 20 44" fill="none" stroke="{COB}" stroke-width="6" stroke-linecap="round"/>'
    return g + '</g>'


def dots(points, r=3.2, fill=COB, opacity=1.0):
    return ''.join(f'<circle cx="{n(x)}" cy="{n(y)}" r="{n(r)}" fill="{fill}" opacity="{opacity}"/>' for x, y in points)


def sprig(x, y, L=70, a=0, count=3, fill='url(#lb)'):
    """A small stem with alternating leaves."""
    g = f'<g transform="translate({n(x)} {n(y)}) rotate({n(a)})">'
    g += f'<path d="M0 0 L{n(L)} 0" stroke="{COB}" stroke-width="3.2" stroke-linecap="round"/>'
    for i in range(count):
        t = (i + 1) / (count + 1)
        g += leaf(L * t, 0, L * .45, -42 if i % 2 else 42, fill=fill, veins=False)
    g += leaf(L, 0, L * .5, 0, fill=fill, veins=False)
    return g + '</g>'


def painted(body, f='paint', extra=''):
    return f'<g filter="url(#{f})" {extra}>{body}</g>'


def tile_base(size=400, inset=14, radius=9, edge=True):
    """Glazed square tile ground with a hand-cut, slightly irregular edge."""
    x, y, w = inset, inset, size - inset * 2
    g = f'<g filter="url(#shadow)"><g filter="url(#edge)">'
    g += f'<rect x="{x}" y="{y}" width="{w}" height="{w}" rx="{radius}" fill="url(#glaze)"/>'
    if edge:
        g += (f'<rect x="{x + 1.5}" y="{y + 1.5}" width="{w - 3}" height="{w - 3}" rx="{radius}" fill="none" '
              f'stroke="{GREYB}" stroke-width="3" opacity=".32"/>')
        g += (f'<path d="M{x + 6} {y + 5} L{x + w - 8} {y + 5}" stroke="#fff" stroke-width="3" opacity=".8" stroke-linecap="round"/>')
    g += '</g></g>'
    return g


def crackle(size=400, inset=18, seed=4, count=14, opacity=0.16):
    """Fine glaze crazing."""
    r = random.Random(seed)
    g = f'<g fill="none" stroke="#7A5C2E" stroke-width=".7" opacity="{opacity}" stroke-linecap="round">'
    for _ in range(count):
        x, y = r.uniform(inset, size - inset), r.uniform(inset, size - inset)
        pts = [(x, y)]
        for _ in range(r.randint(3, 6)):
            x += r.uniform(-26, 26)
            y += r.uniform(-26, 26)
            x = min(max(x, inset), size - inset)
            y = min(max(y, inset), size - inset)
            pts.append((x, y))
        g += '<path d="M' + ' L'.join(f'{n(a)} {n(b)}' for a, b in pts) + '"/>'
    return g + '</g>'


def scroll(p0, center, r0, dirn=1, turns=1.15, w0=13, w1=2.4, fill='url(#bd)', bend=0.5):
    """A stem from p0 that finishes in a curl around `center`, joined tangentially."""
    best, best_a = None, 9
    for i in range(360):
        th = math.radians(i)
        end = (center[0] + r0 * math.cos(th), center[1] + r0 * math.sin(th))
        tx, ty = -math.sin(th) * dirn, math.cos(th) * dirn
        vx, vy = end[0] - p0[0], end[1] - p0[1]
        ln = math.hypot(vx, vy) or 1
        ang = math.acos(max(-1, min(1, (tx * vx + ty * vy) / ln)))
        # prefer end points that are not on the far side of the circle
        if ang < best_a:
            best_a, best = ang, th
    th = best
    end = (center[0] + r0 * math.cos(th), center[1] + r0 * math.sin(th))
    return curl(p0, end, th, r0, turns=turns, dirn=dirn, w0=w0, w1=w1, fill=fill, bend=bend)


def burst(x, y, r=40, a=0):
    """Small acanthus-like cluster of blue leaves for filling corners and gaps."""
    g = ''
    for i, off in enumerate((-48, 0, 48)):
        g += leaf(x, y, r * (1.0 if i == 1 else .8), a + off, fill='url(#bp)', vein=PALE, veins=False)
    return g
