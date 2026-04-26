// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 60 ? '0 1px 20px rgba(0,0,0,0.08)' : 'none';
});

// Intersection Observer for fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity = '1';
      el.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .plan-card, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Auto-select plan from pricing buttons
document.querySelectorAll('.plan-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = btn.closest('.plan-card');
    const badge = card ? card.querySelector('.plan-badge') : null;
    if (!badge) return;
    const planSelect = document.getElementById('plan');
    if (!planSelect) return;
    const text = badge.textContent.trim();
    if (text.includes('A')) planSelect.value = 'A';
    else if (text.includes('B')) planSelect.value = 'B';
    else if (text.includes('C')) planSelect.value = 'C';
  });
});

// Contact form validation & submit
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', errId: 'name-err', check: v => v.trim().length > 0 },
      { id: 'phone', errId: 'phone-err', check: v => /^[\d\s\-\+\(\)]{7,}$/.test(v.trim()) },
      { id: 'email', errId: 'email-err', check: v => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'date', errId: 'date-err', check: v => v.trim().length > 0 },
    ];

    fields.forEach(({ id, errId, check }) => {
      const input = document.getElementById(id);
      const group = input ? input.closest('.form-group') : null;
      if (!input || !group) return;
      if (!check(input.value)) {
        group.classList.add('has-error');
        valid = false;
      } else {
        group.classList.remove('has-error');
      }
    });

    if (!valid) return;

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.querySelector('.btn-text').textContent = '送出中...';

    setTimeout(() => {
      form.querySelectorAll('input:not([type=checkbox]), select, textarea').forEach(el => el.value = '');
      form.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
      document.getElementById('formSuccess').classList.add('show');
      btn.disabled = false;
      btn.querySelector('.btn-text').textContent = '送出詢問';
    }, 900);
  });

  // Clear errors on input
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.closest('.form-group')?.classList.remove('has-error');
    });
  });
}

// ===== FRAME SWITCHER =====
const frameData = {
  wedding: {
    name: '婚禮系列',
    bg: 'linear-gradient(160deg, #FDF8F2 0%, #F5EFE6 100%)',
    stripBg: '#FFFCF8',
    border: '2px solid #E8DACC',
    footerBg: '#F5EFE6',
    footerColor: '#8A7060',
    footerSubColor: '#B8A898',
    footerMain: '❦ 謝謝您的到來 ❦',
    footerSub: '2025 Wedding · With Love',
    title: '婚禮系列',
    desc: '典雅白金配色，細緻花卉邊框點綴，營造浪漫婚禮氛圍。可加入新人名字、婚禮日期與感謝語，讓每張照片都成為珍貴信物。',
    tags: ['白金配色', '花卉邊框', '可加名字', '可加日期'],
    colors: ['#F5F0E8', '#FDE8EC', '#E8F0F5', '#F0EDE8'],
  },
  birthday: {
    name: '生日派對',
    bg: 'linear-gradient(160deg, #FEF0F6 0%, #FCE4F0 100%)',
    stripBg: '#FFF5FA',
    border: '2px solid #F4C0D1',
    footerBg: '#FCE4F0',
    footerColor: '#993556',
    footerSubColor: '#C47095',
    footerMain: '🎂 Happy Birthday!',
    footerSub: '今天是最美好的一天',
    title: '生日派對',
    desc: '繽紛活潑的派對配色，充滿歡樂氣息。支援加入壽星名字與年齡，每位賓客都能帶走這份獨特的生日記念。',
    tags: ['粉色系', '派對感', '可加壽星名', '歡樂風格'],
    colors: ['#FDE8EC', '#FEF0B5', '#E8F5E8', '#F0E8FF'],
  },
  brand: {
    name: '品牌活動',
    bg: 'linear-gradient(160deg, #F0F4FC 0%, #E4EAF8 100%)',
    stripBg: '#F8FAFF',
    border: '2px solid #B5D4F4',
    footerBg: '#E4EAF8',
    footerColor: '#185FA5',
    footerSubColor: '#5A8FCC',
    footerMain: 'BRAND NAME',
    footerSub: '2025 Brand Event · Thank you',
    title: '品牌活動',
    desc: '簡潔專業的商務設計，可植入品牌 Logo、活動主題與 Slogan。黑白或品牌色調任選，完美呼應企業視覺識別。',
    tags: ['可植入 Logo', '品牌色調', '商務簡潔', '企業識別'],
    colors: ['#E6F1FB', '#F1EFE8', '#E8F5E8', '#1C1815'],
  },
  minimal: {
    name: '簡約系列',
    bg: 'linear-gradient(160deg, #F8F8F6 0%, #F0F0EC 100%)',
    stripBg: '#FAFAFA',
    border: '1px solid #DDDDD8',
    footerBg: '#F0F0EC',
    footerColor: '#5F5E5A',
    footerSubColor: '#9A9A94',
    footerMain: 'Hello Photobooth',
    footerSub: '2025 · Captured Moments',
    title: '簡約系列',
    desc: '極簡黑白設計，去蕪存菁只留下最純粹的美。適合任何場合，讓照片本身成為主角，時尚耐看不過時。',
    tags: ['黑白極簡', '百搭風格', '時尚耐看', '任何場合'],
    colors: ['#FFFFFF', '#F1EFE8', '#2C2C2A', '#888780'],
  },
  retro: {
    name: '復古底片',
    bg: 'linear-gradient(160deg, #F5EFE0 0%, #EDE3CC 100%)',
    stripBg: '#FAF5E8',
    border: '3px solid #A89060',
    footerBg: '#EDE3CC',
    footerColor: '#6B5030',
    footerSubColor: '#9A7A50',
    footerMain: '📽 底片時代',
    footerSub: 'Film · No. 24 · 2025',
    title: '復古底片',
    desc: '仿底片顆粒感邊框，懷舊溫暖色調，重現膠捲相機的獨特質感。讓數位照片擁有真實底片的靈魂與溫度。',
    tags: ['底片質感', '懷舊色調', '顆粒效果', '復古風格'],
    colors: ['#F5EFE0', '#E8D4B0', '#C8B080', '#8B6040'],
  },
};

function applyFrame(key) {
  const d = frameData[key];
  if (!d) return;

  const preview = document.getElementById('framePreview');
  const strip = document.getElementById('photoStrip');
  const footer = document.getElementById('frameFooter');
  const footerMain = document.getElementById('frameFooterMain');
  const footerSub = document.getElementById('frameFooterSub');
  const badge = document.getElementById('frameBadge');
  const title = document.getElementById('frameTitle');
  const desc = document.getElementById('frameDesc');
  const tagsEl = document.getElementById('frameTags');
  const colorsEl = document.getElementById('frameColors');

  if (preview) { preview.style.background = d.bg; preview.style.border = d.border; }
  if (strip) strip.style.background = d.stripBg;
  if (footer) footer.style.background = d.footerBg;
  if (footerMain) { footerMain.textContent = d.footerMain; footerMain.style.color = d.footerColor; }
  if (footerSub) { footerSub.textContent = d.footerSub; footerSub.style.color = d.footerSubColor; }
  if (badge) { badge.textContent = d.name; badge.style.background = d.footerColor; }
  if (title) title.textContent = d.title;
  if (desc) desc.textContent = d.desc;
  if (tagsEl) tagsEl.innerHTML = d.tags.map(t => `<span>${t}</span>`).join('');
  if (colorsEl) colorsEl.innerHTML = d.colors.map((c, i) =>
    `<div class="color-dot${i === 0 ? ' active' : ''}" style="background:${c};" onclick="this.parentElement.querySelectorAll('.color-dot').forEach(d=>d.classList.remove('active'));this.classList.add('active')"></div>`
  ).join('');
}

const tabs = document.querySelectorAll('.frame-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyFrame(tab.dataset.frame);
  });
});
if (tabs.length) applyFrame('wedding');

function selectFrame(el) {
  document.querySelectorAll('.frame-real-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}
