const fs = require('fs');
const path = require('path');

const dir = 'd:/website_media';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace <a href="about.html" class="nav__link">Câu Chuyện</a>
  // We want to replace href="about.html" with href="index.html" only for the nav item that has data-i18n="nav.story" or contains "Câu Chuyện"
  // It appears in both <div class="nav__list"> and <div class="mobile-nav__list"> (in index.html)
  
  content = content.replace(
    /<a href="about.html"([^>]*)data-i18n="nav.story">Câu Chuyện<\/a>/g,
    '<a href="index.html"$1data-i18n="nav.story">Trang Chủ</a>'
  );
  
  // Replace in case there is no data-i18n, but inside nav__link
  content = content.replace(
    /<a href="about.html" class="nav__link(.*?)">Câu Chuyện<\/a>/g,
    '<a href="index.html" class="nav__link$1">Trang Chủ</a>'
  );

  fs.writeFileSync(filePath, content);
  console.log('Updated nav in ' + file);
}

// Update i18n.js
const i18nPath = path.join(dir, 'js', 'i18n.js');
let i18nContent = fs.readFileSync(i18nPath, 'utf8');
i18nContent = i18nContent.replace(/'nav\.story':\s*'Câu Chuyện',/g, "'nav.story': 'Trang Chủ',");
i18nContent = i18nContent.replace(/'nav\.story':\s*'Story',/g, "'nav.story': 'Home',");
fs.writeFileSync(i18nPath, i18nContent);
console.log('Updated i18n.js');
