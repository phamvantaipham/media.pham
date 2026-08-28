const fs = require('fs');
const path = require('path');

const dir = 'd:/website_media';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace Address
  content = content.replace(
    '123 Nguyễn Huệ, Phường Bến Nghé,<br>Quận 1, TP.HCM',
    '26/43 Đường số 40, phường Hiệp Bình,<br>Thành Phố Hồ Chí Minh'
  );
  
  // Replace Phone display
  content = content.replace(
    '0989.123.456 (Kinh doanh)<br>\n            0869.789.012 (Hành chính)',
    '0329032237 (Tài Phẩm)<br>\n            0859964008 (Trung Hiếu media)'
  );
  
  // Replace Email display and mailto link
  content = content.replace(
    /<a href="mailto:hello@jexamedia\.com">hello@jexamedia\.com<\/a>/g,
    '<a href="mailto:phamvantaipham0410@gmail.com">phamvantaipham0410@gmail.com</a>'
  );

  // Replace floating button phone link
  content = content.replace(
    '<a href="tel:0989123456"',
    '<a href="tel:0329032237"'
  );

  fs.writeFileSync(filePath, content);
  console.log('Updated', file);
}
