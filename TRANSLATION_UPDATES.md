# TRIZ Ta'lim Platformasi - Tarjima Tizimi (v2)

## Arxitektura

Platform ikki qat'a tarjima tizimi bilan ishlaydi:

```
┌─────────────────────────────────────────────┐
│         TRIZ Ta'lim Platformasi              │
├─────────────────────────────────────────────┤
│                                              │
│  ┌──────────────────┐  ┌──────────────────┐ │
│  │   i18n.js        │  │  TranslationAPI  │ │
│  │  (QO'L TARJIMA)  │  │ (AVTOMATIK API)  │ │
│  │                  │  │                  │ │
│  │  • Navbar        │  │  • Dars mazmuni  │ │
│  │  • Footer        │  │  • Forum postlari│ │
│  │  • Tugmalar      │  │  • Kurs tavsifi  │ │
│  │  • UI matnlari   │  │  • Lesson content│ │
│  │                  │  │                  │ │
│  │  JavaScript      │  │  Google Translate│ │
│  │  i18n atributlar │  │  (MyMemory API)  │ │
│  └──────────────────┘  └──────────────────┘ │
│                                              │
└─────────────────────────────────────────────┘
```

## 1. i18n.js - Qo'l Tarjima

### Manzil
`src/i18n.js` (350+ satir, 3 tilda)

### Qo'llaniladigi Joylar
- **Navbar** - Dashboard, Kurslar, Forum, Profil, Chiqish
- **Footer** - Platforma sarlavhasi, yaratuvchi ma'lumotlari
- **Tugmalar** - Kirish, Ro'yxatdan o'tish, Yuborish, Bekor qilish
- **UI Elementlari** - Xatoliklarni, shakl labellar, placeholder'lar

### HTML'da Qo'llaniladigan Atributlar

```html
<!-- Element matnini tarjima qilish -->
<a class="nav-link" href="dashboard.html" data-i18n="dashboard">Dashboard</a>
<button class="btn" data-i18n="login">Kirish</button>

<!-- Input placeholder'ini tarjima qilish -->
<input type="email" data-i18n-placeholder="email" placeholder="Email kiriting">

<!-- Footer tarjimasi -->
<p data-i18n="footerPlatform">TRIZ Texnologiyasi - Pedagogik Ijodiy Tafakkur Platformasi</p>
<span data-i18n="footerCreatedBy">Platforma</span>
<span data-i18n="footerCreatedFor">uchun tayyorlangan</span>
<a data-i18n="footerCreatorName">Nabiyeva Nigora</a>
```

### JavaScript API

```javascript
// Kalitdan tarjimani olish
const translated = i18n.t('footerPlatform');

// Sahifadagi barcha [data-i18n] elementlarini yangilash
i18n.updatePageText();

// Tilni o'zgartirish
i18n.setLanguage('en');

// Joriy tilni bilish
const lang = i18n.getLanguage();

// Barcha tillar
const langs = i18n.getLanguages(); // ['uz', 'en', 'ru']
```

## 2. translate.js - Avtomatik Tarjima

### Manzil
`src/translate.js` (150+ satir)

### Qo'llaniladigi Joylar
- **Dars mazmuni** - `.lesson-content`, `.course-content`
- **Forum postlari** - `.post-content`, `.reply-content`
- **Kurs tavsifi** - `.course-description`

### QAYTARILGAN JOYLAR (Tarjima qilinmaydi)
- Navbar va nav-link'lar
- Footer va [data-i18n] atributli elementlar
- Tugmalar (.btn, input, select)
- Script va Style taglar
- Operatsion tizim nomlari
- TRIZ tushunchasi nomlari

### JavaScript API

```javascript
// Matnni tarjima qilish
const translated = await TranslationAPI.translateText('Salom', 'en');
// -> "Hello"

// Sahifa matnlarini tarjima qilish
await TranslationAPI.translatePageContent('en');

// Element tarjimasi (internal, ixtiyoriy)
await TranslationAPI.translateElement(element, 'en');
```

### Qanday Ishlaydi

```javascript
// 1. Boshlanish
TranslationAPI.translatePageContent('en');

// 2. Selektorlar orqali kontent topish
const elements = document.querySelectorAll(
  '.course-content, .lesson-content, .post-content'
);

// 3. Skip qilish
if (element.hasAttribute('data-i18n')) return; // Skip
if (element.closest('nav, footer')) return;    // Skip

// 4. Matn tarjima qilish
const translated = await fetch(
  `https://api.mymemory.translated.net/get?q=${text}&langpair=uz|en`
);

// 5. HTML'ni yangilash
element.textContent = translated;
```

## 3. Footer - Yaratuvchi Ma'lumotlari

### Barcha Sahifalarida
```
┌──────────────────────────────────────────┐
│   TRIZ Texnologiyasi - Pedagogik Ijodiy  │
│   Tafakkur Platformasi                   │
├──────────────────────────────────────────┤
│   Platforma Sinsata tomonidan yaratilgan  │
│   Nabiyeva Nigora uchun tayyorlangan      │
└──────────────────────────────────────────┘
```

### Linklar
- **Sinsata**: https://t.me/sinsata
- **Nabiyeva Nigora**: https://t.me/Nodirjanovna

### HTML Kodi
```html
<footer style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); ...">
  <p data-i18n="footerPlatform">TRIZ Texnologiyasi - Pedagogik Ijodiy Tafakkur Platformasi</p>
  <hr style="border-color: rgba(255,255,255,0.3); ...">
  
  <p style="font-size: 12px; margin-bottom: 5px;">
    <span data-i18n="footerCreatedBy">Platforma</span>
    <strong>
      <a href="https://t.me/sinsata" target="_blank" style="color: #fff; text-decoration: underline;" 
         data-i18n="footerCreatedByName">Sinsata</a>
    </strong>
    <span data-i18n="footerCreatedFor">tomonidan yaratilgan</span>
  </p>
  
  <p style="font-size: 12px; margin: 0;">
    <strong>
      <a href="https://t.me/Nodirjanovna" target="_blank" style="color: #fff; text-decoration: underline;" 
         data-i18n="footerCreatorName">Nabiyeva Nigora</a>
    </strong>
    <span>uchun tayyorlangan</span>
  </p>
</footer>
```

## 4. Til O'zgarish Funksiyasi

### changeLanguage() Jarayoni

```javascript
function changeLanguage(lang) {
  // 1. i18n o'zgartirish
  i18n.setLanguage(lang);
  document.documentElement.lang = lang;
  i18n.updatePageText();  // Barcha [data-i18n] yangilash
  
  // 2. Kurs kartalarini qayta yuklash (agar index.html bo'lsa)
  const osCardsContainer = document.getElementById('os-cards');
  if (osCardsContainer) {
    osCardsContainer.innerHTML = '';
    const osData = courseDataByLanguage[lang] || courseDataByLanguage['uz'];
    osData.forEach(os => {
      const card = document.createElement('div');
      card.innerHTML = `...${os.name}... ${os.description}...`;
      osCardsContainer.appendChild(card);
    });
  }
  
  // 3. Dars matnlarini tarjima qilish (TranslationAPI)
  if (lang !== 'uz' && typeof TranslationAPI !== 'undefined') {
    setTimeout(() => {
      TranslationAPI.translatePageContent(lang);
    }, 300);
  }
  
  // 4. localStorage'da saqlash
  localStorage.setItem('language', lang);
}
```

## 5. Yangilangan Sahifalar

| Sahifa | Footer | i18n | TranslationAPI | Til Selector |
|--------|--------|------|---|---|
| index.html | ✅ | ✅ | ✅ | ✅ |
| login.html | ✅ | ✅ | ✅ | ✅ |
| dashboard.html | ✅ | ✅ | ✅ | ✅ |
| courses.html | ✅ | ✅ | ✅ | ✅ |
| forum.html | ✅ | ✅ | ✅ | ✅ |
| profile.html | ✅ | ✅ | ✅ | ✅ |

## 6. Tillar va Tarjimalar

| Kod | Nomi | i18n | TranslationAPI |
|-----|------|------|---|
| uz | Uzbek (O'zbek) | ✅ Asosiy | ✅ Chiqish |
| en | English | ✅ 350+ so'z | ✅ Online tarjima |
| ru | Русский | ✅ 350+ so'z | ✅ Online tarjima |

## 7. LocalStorage

### Saqlash
```javascript
localStorage.setItem('language', 'en');
```

### Olish (default 'uz')
```javascript
const lang = localStorage.getItem('language') || 'uz';
```

### Tozalash
```javascript
localStorage.clear();
```

### Hawola
- DOM'da: `localStorage.getItem('language')`
- Konsolda: `console.log(localStorage)`

## 8. I18n Tarjimalar

### Footer Atributlari
```javascript
i18n.t('footerPlatform')      // "TRIZ Texnologiyasi - Pedagogik Ijodiy Tafakkur Platformasi"
i18n.t('footerCreatedBy')     // "Platforma"
i18n.t('footerCreatedByName') // "Sinsata"
i18n.t('footerCreatedFor')    // "uchun tayyorlangan"
i18n.t('footerCreatorName')   // "Nabiyeva Nigora"
```

### UI Atributlari (misol)
```javascript
i18n.t('dashboard')      // "Dashboard"
i18n.t('courses')        // "Kurslar"
i18n.t('forum')          // "Forum"
i18n.t('profile')        // "Profil"
i18n.t('logout')         // "Chiqish"
i18n.t('login')          // "Kirish"
i18n.t('signup')         // "Ro'yxatdan o'tish"
// ... va boshqalar
```

## 9. TranslationAPI Filterlar

### Skip Qiladigan Selektorlar
```javascript
['nav', 'footer', '.navbar', '.nav-link', '.btn', 'label[data-i18n]']
```

### Skip Qiladigan Atributlar
```javascript
['data-i18n', 'data-i18n-placeholder']
```

### Skip Qiladigan Matnlar
```javascript
// 3 belgidan kichik
if (text.length < 3) skip();

// Qavs {} yoki [] o'z ichiga olgan
if (text.includes('{') || text.includes('[')) skip();

// Script yoki style
if (['SCRIPT', 'STYLE'].includes(element.tagName)) skip();
```

## 10. Muammoni Yechish

### Matn o'zgarmaydimi?
```javascript
// 1. localStorage tozalang
localStorage.clear();

// 2. Sahifani qaytadan yuklang
location.reload();

// 3. Konsolda tekshiring
console.log('i18n:', typeof i18n);
console.log('Tarjima:', i18n.t('footerPlatform'));
```

### Dars matni tarjima qilinmayaptimi?
```javascript
// 1. Internet ulanishini tekshiring (Wi-Fi yoki mobile)
// 2. TranslationAPI mavjudligini tekshiring
console.log('TranslationAPI:', typeof TranslationAPI);
// 3. API chaqiruvini monitor qiling (DevTools Network tab)
```

### Footer ko'rinmayaptimi?
```javascript
// 1. Footer HTML'i sahifada mavjud ekanligini tekshiring
console.log(document.querySelectorAll('footer').length);

// 2. [data-i18n] atributlarni tekshiring
console.log(document.querySelectorAll('[data-i18n]').length);

// 3. i18n.js yuklandi ekanligini tekshiring
console.log('i18n ob'jekti:', i18n);
```

## 11. Kod Misollari

### Til Tanlash HTML
```html
<select id="language-select" onchange="changeLanguage(this.value)">
  <option value="uz">Uzbek</option>
  <option value="en">English</option>
  <option value="ru">Русский</option>
</select>
```

### Til Tanlash Jadval o'rnatish
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-select');
  if (selector) {
    selector.value = i18n.getLanguage();
  }
});
```

### Til O'zgarish Dinamik
```javascript
// Button bilan
document.getElementById('lang-en').addEventListener('click', () => {
  changeLanguage('en');
});

// Select bilan (yuqorida)
<select onchange="changeLanguage(this.value)">...</select>
```

## 12. Xavfsizlik

### Nima Tarjima Qilinadi?
- ✅ Matn
- ✅ Placeholder'lar
- ✅ Dars mazmuni
- ✅ Forum postlari

### Nima Tarjima Qilinmaydi?
- ❌ HTML atributlar (id, href, src)
- ❌ [data-i18n] elementlari
- ❌ Navbar, footer (i18n qo'lda)
- ❌ JavaScript kodi
- ❌ Maxfiy ma'lumotlar

## 13. Performance

- **i18n.js** - Tezroq (qo'lda tarjimasi, caching)
- **TranslationAPI** - Sekinroq (API chaqiruvi, 300-500ms)
- **Optimal** - Navigatsiya tezroq, dars matni keyinroq tarjimasi

## 14. Yakuniy Xulosa

Platform endi to'liq ko'p tilga tayyor:

✅ **Qo'l Tarjima (i18n.js)**
- Navbar, footer, tugmalar
- Tezroq va samarali
- UI konsistensiyasi saqlanadi

✅ **Avtomatik Tarjima (TranslationAPI)**
- Dars mazmuni faqat
- Google Translate sifati
- Dinamik kontent

✅ **Footer Ma'lumotlari**
- Sinsata: https://t.me/sinsata
- Nabiyeva Nigora: https://t.me/Nodirjanovna

✅ **Barcha Sahifalar**
- index.html, login.html, dashboard.html
- courses.html, forum.html, profile.html

✅ **3 Tilda Qo'llab-Quvvatlash**
- O'zbek (uz) - asosiy
- English (en) - online tarjima
- Русский (ru) - online tarjima
