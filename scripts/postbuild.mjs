// Post-build steps for GitHub Pages.
// 1. Serve the prerendered 404 page for unknown URLs (Pages looks for /404.html).
// 2. Disable Jekyll so files and folders starting with "_" are served untouched.
// 3. Write a CNAME file when a custom domain is set (CUSTOM_DOMAIN=example.com).
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const out = join(process.cwd(), 'dist', 'la-piccola-gelateria', 'browser');

const notFound = join(out, '404', 'index.html');
if (existsSync(notFound)) {
  copyFileSync(notFound, join(out, '404.html'));
  console.log('postbuild: wrote 404.html');
} else {
  console.warn('postbuild: 404/index.html not found, 404.html skipped');
}

writeFileSync(join(out, '.nojekyll'), '');

if (process.env.CUSTOM_DOMAIN) {
  writeFileSync(join(out, 'CNAME'), `${process.env.CUSTOM_DOMAIN}\n`);
  console.log(`postbuild: wrote CNAME for ${process.env.CUSTOM_DOMAIN}`);
}
