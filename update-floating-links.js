const fs = require('fs');
const path = require('path');

const dir = 'd:/website_media';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const zaloLink = 'https://zalo.me/0859964008';
const messLink = 'https://www.facebook.com/th.account?mibextid=wwXIfr&rdid=69p4ac6bxCiIEpdt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HPY65Sio3%2F%3Fmibextid%3DwwXIfr';
const phoneLink = 'tel:0859964008';

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Zalo link
  content = content.replace(
    /href=".*?"\s+class="floating-btn floating-btn--zalo"/g,
    `href="${zaloLink}" class="floating-btn floating-btn--zalo" target="_blank"`
  );

  // Replace Messenger link
  content = content.replace(
    /href=".*?"\s+class="floating-btn floating-btn--messenger"/g,
    `href="${messLink}" class="floating-btn floating-btn--messenger" target="_blank"`
  );

  // Replace Phone link
  content = content.replace(
    /href=".*?"\s+class="floating-btn floating-btn--phone"/g,
    `href="${phoneLink}" class="floating-btn floating-btn--phone"`
  );

  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
}
