const fs = require('fs');
const path = require('path');

const dir = 'd:/website_media';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove desktop nav link
  content = content.replace(/<a href="resources\.html" class="nav__link"[^>]*>.*?<\/a>\s*/gi, '');
  
  // Remove mobile nav link
  content = content.replace(/<a href="resources\.html" class="mobile-nav__link"[^>]*>.*?<\/a>\s*/gi, '');
  
  // Remove any footer or list link
  content = content.replace(/<li><a href="resources\.html"[^>]*>.*?<\/a><\/li>\s*/gi, '');

  fs.writeFileSync(filePath, content);
  console.log('Processed', file);
}

// Remove resources.html file if exists
const resPath = path.join(dir, 'resources.html');
if (fs.existsSync(resPath)) {
  fs.unlinkSync(resPath);
  console.log('Deleted resources.html');
}
