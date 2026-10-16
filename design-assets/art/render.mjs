// Renders SVG artwork to transparent PNG with headless Chrome (DevTools protocol).
// usage: node render.mjs <svgDir> <pngDir> [name ...]
import { spawn } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
const [,, svgDirArg, pngDirArg, ...only] = process.argv;
const svgDir = resolve(svgDirArg), pngDir = resolve(pngDirArg);
const SCALE = Number(process.env.SCALE || 2);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new','--disable-gpu','--hide-scrollbars','--remote-debugging-port=9335','--user-data-dir=/tmp/lpg-art-prof','about:blank'], {stdio:'ignore'});
const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
let targets;
for (let i=0;i<40;i++){ try{ targets = await (await fetch('http://127.0.0.1:9335/json')).json(); if(targets.length) break;}catch{} await sleep(250); }
const page = targets.find(t=>t.type==='page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);
let id=0; const pend=new Map();
ws.onmessage=(m)=>{const d=JSON.parse(m.data); if(d.id&&pend.has(d.id)){pend.get(d.id)(d); pend.delete(d.id);}};
const send=(method,params={})=>new Promise(r=>{const i=++id; pend.set(i,r); ws.send(JSON.stringify({id:i,method,params}));});
await send('Page.enable');
await send('Emulation.setDefaultBackgroundColorOverride',{color:{r:0,g:0,b:0,a:0}});
const files = readdirSync(svgDir).filter(f=>f.endsWith('.svg') && (!only.length || only.includes(f.replace('.svg',''))));
for (const f of files) {
  const svg = readFileSync(join(svgDir,f),'utf8');
  const m = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const w = Math.round(+m[1]), h = Math.round(+m[2]);
  await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:SCALE,mobile:false});
  await send('Page.navigate',{url:'file://'+join(svgDir,f)});
  await sleep(900);
  const shot = await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false,fromSurface:true});
  writeFileSync(join(pngDir,f.replace('.svg','.png')), Buffer.from(shot.result.data,'base64'));
  console.log('rendered',f,w+'x'+h,'@'+SCALE+'x');
}
ws.close(); chrome.kill(); process.exit(0);
