const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const rootFiles = ['index.html', 'style.css', '_headers'];
const rootDirs = ['js', 'image'];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

ensureDir(dist);

function safeRemove(target) {
  try {
    fs.rmSync(target, { recursive: true, force: true });
  } catch (error) {
    console.warn(`Skip removing ${target}: ${error.code || error.message}`);
  }
}

for (const file of rootFiles) {
  const src = path.join(root, file);
  if (fs.existsSync(src)) {
    safeRemove(path.join(dist, file));
    copyFile(src, path.join(dist, file));
  }
}

for (const dir of rootDirs) {
  const src = path.join(root, dir);
  if (fs.existsSync(src)) {
    safeRemove(path.join(dist, dir));
    copyDir(src, path.join(dist, dir));
  }
}

// GitHub Pages 友好：禁用 Jekyll
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

// 静态单页兜底：直接访问不存在路径时回退到首页
copyFile(path.join(root, 'index.html'), path.join(dist, '404.html'));

console.log('Static site built to dist/');
