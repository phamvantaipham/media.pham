const fs = require('fs');
const path = require('path');

const cssDir = 'd:/website_media/css';
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

// Color mapping: old -> new
const replacements = [
  // Hardcoded hex primary blue
  ['#1E5AFA', '#124798'],
  ['#1e5afa', '#124798'],
  
  // Hardcoded hex accent gold
  ['#F5B700', '#a87f24'],
  ['#f5b700', '#a87f24'],
  ['#FFD166', '#c49d4a'],
  ['#ffd166', '#c49d4a'],
  
  // Footer bg / text
  ['#fdfaf6', '#ebe9e2'],
  ['#7b633b', '#5e5b55'],
  ['#b58d3d', '#a87f24'],
  ['#8c734b', '#7a5b19'],
  ['#9e8761', '#8f6b1e'],
  ['#d8caba', '#d6d4cd'],
  
  // Zalo button
  ['#0068FF', '#124798'],
  
  // rgba(30, 90, 250 -> rgba(18, 71, 152
  ['rgba(30, 90, 250,', 'rgba(18, 71, 152,'],
  ['rgba(30, 90, 250, ', 'rgba(18, 71, 152, '],
  
  // rgba(245, 183, 0 -> rgba(168, 127, 36
  ['rgba(245, 183, 0,', 'rgba(168, 127, 36,'],
  ['rgba(245, 183, 0, ', 'rgba(168, 127, 36, '],
];

for (const file of files) {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const [oldVal, newVal] of replacements) {
    // Use split/join instead of regex for simplicity
    while (content.includes(oldVal)) {
      content = content.replace(oldVal, newVal);
    }
  }
  
  fs.writeFileSync(filePath, content);
  console.log('Updated', file);
}

console.log('Done! All CSS colors updated.');
