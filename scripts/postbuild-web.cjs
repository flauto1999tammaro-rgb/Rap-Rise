const fs = require('fs');
const path = require('path');

const root = process.cwd();
const distDir = path.join(root, 'dist');
const indexPath = path.join(distDir, 'index.html');

const preferredIcon = path.join(root, 'assets', 'home-cover.png');
const fallbackIcon = path.join(root, 'assets', 'icon.png');
const sourceIcon = fs.existsSync(preferredIcon) ? preferredIcon : fallbackIcon;
const targetIcon = path.join(distDir, 'apple-touch-icon.png');

if (!fs.existsSync(distDir)) {
  throw new Error('dist directory not found. Run expo export first.');
}

if (!fs.existsSync(sourceIcon)) {
  throw new Error(`Source icon not found: ${sourceIcon}`);
}

fs.copyFileSync(sourceIcon, targetIcon);

if (!fs.existsSync(indexPath)) {
  throw new Error('dist/index.html not found.');
}

let html = fs.readFileSync(indexPath, 'utf8');

const appleTags = [
  '<meta name="apple-mobile-web-app-capable" content="yes" />',
  '<meta name="apple-mobile-web-app-status-bar-style" content="default" />',
  '<meta name="apple-mobile-web-app-title" content="Napoli Transit" />',
  '<meta name="theme-color" content="#0E7B86" />',
  '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />',
].join('\n    ');

if (!html.includes('apple-touch-icon')) {
  html = html.replace('</head>', `    ${appleTags}\n  </head>`);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('[postbuild-web] Apple touch icon configured.');
