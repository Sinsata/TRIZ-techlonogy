# JSON Tarjima Tizimi - TRIZ Ta'lim Platformasi

## Umumiy Tavsif

Platform **Google avto tarjima (TranslationAPI)** o'lib tashlandi. Hozir **JSON fayllar** orqali **3 tilda to'liq ko'llab-quvvatlash** mavjud:

- **src/lang/uz.json** - O'zbek tili
- **src/lang/en.json** - Ingliz tili
- **src/lang/ru.json** - Rus tili

## Tizim Arxitekturasi

```
┌─────────────────────────────────────┐
│      Til Tanlash (Language Dropdown) │
│              ↓                       │
│         changeLanguage(lang)         │
│              ↓                       │
│      i18n.setLanguage(lang)         │
│              ↓                       │
│    Load JSON (src/lang/uz.json)    │
│              ↓                       │
│   i18n.updatePageText()             │
│              ↓                       │
│  Update [data-i18n] elements        │
│  Update [data-i18n-placeholder]     │
│              ↓                       │
│      localStorage.setItem()         │
└─────────────────────────────────────┘
```

## i18n.js - Yangi Tizim

### Xususiyatlari

- **Async JSON Loading**: Sahifa yuklashda barcha tilda JSON fayllar yuklash
- **Nested Key Support**: `i18n.t('navbar.dashboard')` kabi to'liq kalit yo'llar
- **Course Data**: `i18n.getCourses()` - dars ma'lumotlarini to'g'ri tilada olish
- **Placeholder Support**: Input placeholder'larini tarjima qilish

### Asosiy Metodlar

```javascript
// Tilni o'zgartirish
i18n.setLanguage('en');

// Joriy tilni bilish
const lang = i18n.getLanguage();  // 'en', 'uz', yoki 'ru'

// Kalitni tarjima qilish
const text = i18n.t('navbar.dashboard');  // "Courses"

// Dars ma'lumotlarini olish
const courses = i18n.getCourses();
const course = i18n.getCourseById(1);

// Sahifa matnlarini yangilash (avtomatik)
i18n.updatePageText();  // Barcha [data-i18n] elementlarini yangilash
```

## JSON Fayl Strukturi

### uz.json (O'zbek)

```json
{
  "navbar": {
    "dashboard": "Dashboard",
    "courses": "Kurslar",
    "forum": "Forum",
    "profile": "Profil",
    "logout": "Chiqish"
  },
  "footer": {
    "platform": "TRIZ Texnologiyasi - Pedagogik Ijodiy Tafakkur Platformasi",
    "createdBy": "Platforma",
    "createdByName": "Sinsata",
    "createdFor": "uchun tayyorlangan",
    "creatorName": "Nabiyeva Nigora",
    "allRights": "2024 - Barcha huquqlar himoyalangan"
  },
  "auth": {
    "login": "Kirish",
    "signup": "Ro'yxatdan o'tish",
    "username": "Foydalanuvchi nomi",
    "password": "Parol",
    ...
  },
  "courses": {
    "title": "TRIZ Kurslar",
    "lessons": [
      {
        "id": 1,
        "number": 1,
        "name": "Dars nomi",
        "hours": 2,
        "methodology": "Metodika",
        "applications": "Qo'llanish"
      },
      ...
    ]
  },
  "buttons": {
    "save": "Saqlash",
    "cancel": "Bekor qilish",
    ...
  }
}
```

### en.json va ru.json

**Tarkibi bir xil, faqat qiymatlar inglizcha yoki ruscha.**

## HTML'da Qo'llaniladigan Atributlar

### 1. Element Matnini Tarjima Qilish

```html
<!-- i18n kalitini qo'yish -->
<a href="dashboard.html" data-i18n="navbar.dashboard">Dashboard</a>
<button data-i18n="buttons.save">Saqlash</button>
<h1 data-i18n="footer.platform">TRIZ Texnologiyasi...</h1>
```

### 2. Input Placeholder'ini Tarjima Qilish

```html
<!-- Placeholder uchun i18n kalitini qo'yish -->
<input type="text" data-i18n-placeholder="auth.username" placeholder="Foydalanuvchi nomini kiriting">
<input type="password" data-i18n-placeholder="auth.password" placeholder="Parolingizni kiriting">
```

### 3. JavaScript'da Tarjima Qilish

```javascript
// Kalitdan qiymat olish
const loginText = i18n.t('auth.login');  // "Kirish" yoki "Login"

// Nested kalitlar
const dashboardText = i18n.t('navbar.dashboard');  // "Dashboard"

// Default qiymat (agar kalit topilmasa)
const text = i18n.t('missing.key', 'Default text');
```

## Darslar va Testlar

### Dars Ma'lumotlari JSON'da

```json
"courses": {
  "lessons": [
    {
      "id": 1,
      "number": 1,
      "name": "Dars nomi (har tilada)",
      "hours": 2,
      "methodology": "Metodika (har tilada)",
      "applications": "Qo'llanish (har tilada)"
    }
  ]
}
```

### Darslarni Yuklash

```javascript
// O'zbek tilida darslar
const uzCourses = i18n.getCourses();

// Bitta darsni olish
const course = i18n.getCourseById(1);
console.log(course.name);  // "Dars nomi" (joriy tilada)
```

## Til O'zgarish Jarayoni

### 1. HTML Selector

```html
<!-- Til tanlash dropdown'i -->
<select onchange="changeLanguage(this.value)">
  <option value="uz">O'zbek</option>
  <option value="en">English</option>
  <option value="ru">Русский</option>
</select>
```

### 2. changeLanguage() Funksiyasi

```javascript
function changeLanguage(lang) {
  // 1. i18n'da tilni o'zgartirish
  i18n.setLanguage(lang);
  
  // 2. HTML lang atributini yangilash
  document.documentElement.lang = lang;
  
  // 3. Barcha [data-i18n] elementlarini yangilash
  i18n.updatePageText();
  
  // 4. localStorage'ga saqlash
  localStorage.setItem('language', lang);
}
```

### 3. Sahifa Yuklanishida

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  // i18n avtomatik initializatsiya bo'ladi (i18n.js'da)
  
  // Agar sохraнили til bo'lsa, uni qo'yish
  const savedLang = localStorage.getItem('language') || 'uz';
  i18n.setLanguage(savedLang);
  i18n.updatePageText();
});
```

## Yangilangan Fayllar

| Fayl | O'zgarish |
|------|-----------|
| src/i18n.js | **Butunlay yangi** - JSON yuklash, nested kalitlar |
| src/lang/uz.json | **Yangi** - 18 dars + 400+ text |
| src/lang/en.json | **Yangi** - Inglizcha |
| src/lang/ru.json | **Yangi** - Ruscha |
| src/main.js | TranslationAPI chaqiruvlari o'chirildi |
| src/auth.js | Allaqachon username orqali ishlaydi |
| index.html | translate.js skripti o'chirildi |
| login.html | translate.js o'chirildi, TranslationAPI o'chirildi |
| dashboard.html | TranslationAPI o'chirildi |
| courses.html | TranslationAPI o'chirildi |
| forum.html | TranslationAPI o'chirildi |
| profile.html | TranslationAPI o'chirildi |

## Foydalanuvchining Tajribasi

### 1. Bosh Sahifa

- **Default til**: O'zbek (uz)
- Til tanlash dropdown'i orqali o'zgartirish
- Barcha navbar, footer, tugmalar va darslar 3 tilda

### 2. Auth Sahifasi (login.html)

- **Username + Password** (email yo'q)
- Til o'zgarsa, barcha UI elementi o'zgaradi
- localStorage'da til saqlanadi

### 3. Kurs Sahifalari

- Dars mavzulari, metodika, qo'llanish - 3 tilda
- Til o'zgarsa, barcha ma'lumot o'zgaradi
- Dars testlari va izohlar - 3 tilda

## Performance Beneefits

| Xususiyat | Oldingi | Yangi |
|-----------|---------|-------|
| API chaqiruvi | Har til o'zgarishda API chaqiruvi | JSON o'ndan bir yuklana (ilk) |
| Tezlik | Sekin (API kutishi) | Tezroq (localStorage) |
| Offline | Ishlamaydi | Ishlaydi (JSON saqlandi) |
| Xatolar | API xatolariga bog'liq | Yo'q |
| Data Size | Dinamik | Belgilangan |

## Misollar

### Navbar Tarjimasi

```html
<!-- HTML -->
<a class="nav-link" href="dashboard.html" data-i18n="navbar.dashboard">Dashboard</a>

<!-- JavaScript (avtomatik) -->
i18n.updatePageText();  // "Dashboard" → "Courses" (en) → "Kurslar" (uz)
```

### Footer Tarjimasi

```html
<!-- HTML -->
<p data-i18n="footer.platform">TRIZ Texnologiyasi - Pedagogik Ijodiy Tafakkur Platformasi</p>

<!-- JSON -->
{
  "footer": {
    "platform": "TRIZ Texnologiyasi - Pedagogik Ijodiy Tafakkur Platformasi",  // uz
    // en.json: "TRIZ Technology - Pedagogical Creative Thinking Courses"
    // ru.json: "ТРИЗ Технология - Педагогические курсы творческого мышления"
  }
}
```

### Darslarni Olish

```javascript
// Joriy tilada darslarni yuklash
const courses = i18n.getCourses();  // Inglizcha, o'zbekcha, yoki ruscha

courses.forEach(course => {
  console.log(course.name);        // "Dars nomi" (joriy tilada)
  console.log(course.methodology); // "Metodika" (joriy tilada)
  console.log(course.applications);// "Qo'llanish" (joriy tilada)
});
```

## Yangi Dars Qo'shish

1. **JSON'da qo'shish** (uz.json, en.json, ru.json):

```json
{
  "courses": {
    "lessons": [
      // Allaqachon mavjud darslar...
      {
        "id": 19,
        "number": 19,
        "name": "Yangi dars nomi",
        "hours": 2,
        "methodology": "Yangi metodika",
        "applications": "Yangi qo'llanish"
      }
    ]
  }
}
```

2. **HTML'da ko'rsatish**:

```javascript
const courses = i18n.getCourses();
// ID 19 bilan dars avtomatik chiqadi
```

## Yakuniy Xulosa

✅ **JSON tarjima sistema** - 3 tilga to'liq qo'llab-quvvatlash  
✅ **Offline ishlashi** - localStorage orqali localStorage orqali  
✅ **Tezlik** - API chaqiruvlari yo'q  
✅ **Soddalik** - Nested kalitlar, placeholder support  
✅ **Skalabillik** - Yangi tillar qo'shish oson  
✅ **Darslar** - 18 dars + metodika + qo'llanish  

**Davomi:** Har bir tilada barcha UI element va dars ma'lumotlari!
