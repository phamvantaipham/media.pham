const fs = require('fs');
const path = require('path');

const dir = 'd:/website_media';

const newFooter = `  <!-- Custom Footer -->
  <footer class="footer-custom">
    <div class="footer-custom__header">
      <a href="index.html" class="footer-custom__logo">
        <div class="header__logo-text text-4xl">JEXA<span class="accent">.</span></div>
      </a>
      <h2 class="footer-custom__company-name">CÔNG TY TNHH JEXA MEDIA</h2>
    </div>
    
    <div class="footer-custom__divider"></div>

    <div class="footer-custom__grid">
      <!-- Col 1 -->
      <div class="footer-custom__col footer-custom__col--info">
        <h4 class="footer-custom__col-title">THÔNG TIN LIÊN HỆ</h4>
        <div class="footer-custom__info-item">
          <span class="label">Trụ sở</span>
          <span class="value">123 Nguyễn Huệ, Phường Bến Nghé,<br>Quận 1, TP.HCM</span>
        </div>
        <div class="footer-custom__info-item">
          <span class="label">Điện thoại</span>
          <span class="value">
            0989.123.456 (Kinh doanh)<br>
            0869.789.012 (Hành chính)
          </span>
        </div>
        <div class="footer-custom__info-item">
          <span class="label">Email</span>
          <span class="value"><a href="mailto:hello@jexamedia.com">hello@jexamedia.com</a></span>
        </div>
      </div>

      <!-- Col 2 -->
      <div class="footer-custom__col">
        <h4 class="footer-custom__col-title">VỀ CHÚNG TÔI</h4>
        <ul class="footer-custom__links">
          <li><a href="about.html">Câu chuyện JEXA Media</a></li>
          <li><a href="about.html">— Triết lý sáng tạo</a></li>
          <li><a href="about.html">Giá trị cốt lõi</a></li>
          <li><a href="people.html">Con người</a></li>
        </ul>
      </div>

      <!-- Col 3 -->
      <div class="footer-custom__col">
        <h4 class="footer-custom__col-title">KHÁM PHÁ</h4>
        <ul class="footer-custom__links">
          <li><a href="services.html">Dịch vụ</a></li>
          <li><a href="projects.html">Dự án</a></li>
          <li><a href="blog.html">Blog & Tin tức</a></li>
        </ul>
      </div>

      <!-- Col 4 -->
      <div class="footer-custom__col">
        <h4 class="footer-custom__col-title">KẾT NỐI VỚI CHÚNG TÔI</h4>
        <ul class="footer-custom__links">
          <li><a href="#">Facebook</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">YouTube</a></li>
          <li><a href="#">Zalo</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-custom__bottom-pattern"></div>
  </footer>

  <!-- Floating Contact Buttons -->
  <div class="floating-contact">
    <a href="#" class="floating-btn floating-btn--zalo" aria-label="Zalo">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" style="width: 32px; height: 32px;">
    </a>
    <a href="#" class="floating-btn floating-btn--messenger" aria-label="Messenger">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.91 1.488 5.498 3.795 7.152.2.143.327.37.313.615l-.18 3.197c-.033.585.602.946 1.07.614l3.14-2.222c.2-.143.447-.202.69-.17a10.824 10.824 0 001.172.064c5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.093 12.38l-2.613-2.784a.8.8 0 00-1.16-.03l-3.35 3.52c-.37.388-.95-.084-.68-.535l3.52-5.914a1.2 1.2 0 011.66-.41l2.614 2.783a.8.8 0 001.16.03l3.35-3.52c.37-.388.95.084.68.535l-3.52 5.914a1.2 1.2 0 01-1.66.41z"></path></svg>
    </a>
    <a href="tel:0989123456" class="floating-btn floating-btn--phone" aria-label="Phone">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
    </a>
  </div>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace anything between <!-- Footer --> (or similar) and </footer> (inclusive)
  content = content.replace(/<!-- (Footer|Simplified Footer Include) -->[\s\S]*?<\/footer>/i, '');
  
  if (content.includes('<!-- Page Transition -->')) {
    content = content.replace('<!-- Page Transition -->', newFooter + '\n\n  <!-- Page Transition -->');
  } else if (content.includes('<script src="./js/')) {
    content = content.replace('<script src="./js/', newFooter + '\n\n  <script src="./js/');
  } else {
    content = content.replace('</body>', newFooter + '\n</body>');
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated', file);
}
