# Authentication & Translation System - O'zgarishlar Hisoboti

## 1. Auth Sahifalarida Email O'ligan O'zgarish

### login.html O'zgarishlari
- ✅ Email field'i olib tashlandi
- ✅ Login shakli: **Foydalanuvchi nomi + Parol**
- ✅ handleLogin() funksiyasi username orqali ishlaydi
- ✅ Error xabari: "Foydalanuvchi nomi yoki parol xato"

### login.html - Signup Shakli
- ✅ Email field'i olib tashlandi  
- ✅ Signup shakli: **Foydalanuvchi nomi + Parol + Parol tasdiqlash**
- ✅ handleSignup() funksiyasi username orqali ishlaydi
- ✅ Error xabari: "Bu foydalanuvchi nomi allaqachon olgan"

## 2. src/auth.js O'zgarishlari

### signup() Funksiyasi
```javascript
// Eski:
signup(username, email, password) {
    // Email tekshirish...
    const newUser = {
        id, username, email, passwordHash, createdAt, updatedAt
    };
}

// Yangi:
signup(username, password) {
    // Faqat username tekshirish
    const newUser = {
        id, username, passwordHash, createdAt, updatedAt
    };
}
```

### login() Funksiyasi
```javascript
// Eski:
login(email, password) {
    const user = users.find(u => u.email === email);
    // ...
}

// Yangi:
login(username, password) {
    const user = users.find(u => u.username === username);
    // ...
}
```

## 3. i18n.js O'zgarishlari

### Yangi Atributlar Qo'shildi

#### O'zbek (uz)
```javascript
invalidCredentials: 'Foydalanuvchi nomi yoki parol xato',
usernameTaken: 'Bu foydalanuvchi nomi allaqachon olgan',
```

#### English (en)
```javascript
invalidCredentials: 'Invalid username or password',
usernameTaken: 'This username is already taken',
```

#### Russian (ru)
```javascript
invalidCredentials: 'Неверное имя пользователя или пароль',
usernameTaken: 'Это имя пользователя уже занято',
```

## 4. Tarjima Tizimining Cheklovlari

### TranslationAPI - Faqat Dars Mazmuni Tarjima Qiladi
- ✅ Course titles va descriptions
- ✅ Lesson content
- ✅ Quiz questions va options
- ✅ Forum posts va comments

### Tarjima Qilinmaydigan Joylar
- ❌ Navbar elements (data-i18n bilan qo'lda tarjima)
- ❌ Footer (data-i18n bilan qo'lda tarjima)
- ❌ Button names (data-i18n bilan qo'lda tarjima)
- ❌ UI labels (data-i18n bilan qo'lda tarjima)
- ❌ Input placeholders (data-i18n-placeholder bilan qo'lda tarjima)

### Har Sahifaning Navbar va Footer
```html
<!-- Navbar navigatsiya qo'l tarjimasi -->
<a class="nav-link" href="dashboard.html" data-i18n="dashboard">Dashboard</a>
<a class="nav-link" href="courses.html" data-i18n="courses">Kurslar</a>
<a class="nav-link" href="forum.html" data-i18n="forum">Forum</a>
<a class="nav-link" href="profile.html" data-i18n="profile">Profil</a>
<a class="nav-link" href="#" onclick="logout();" data-i18n="logout">Chiqish</a>

<!-- Footer qo'l tarjimasi -->
<p data-i18n="footerPlatform">TRIZ Texnologiyasi - Pedagogik Ijodiy Tafakkur Platformasi</p>
<span data-i18n="footerCreatedBy">Platforma</span>
<span data-i18n="footerCreatedByName">Sinsata</span>
<span data-i18n="footerCreatorName">Nabiyeva Nigora</span>
```

## 5. Yangilangan Fayllar

| Fayl | O'zgarish |
|------|-----------|
| login.html | Email field olib tashlandi, username qo'shildi |
| src/auth.js | signup() va login() username orqali |
| src/i18n.js | invalidCredentials va usernameTaken qo'shildi |
| src/translate.js | Faqat dars mazmuni tarjimasi (cheklanmadi) |

## 6. Foydalanuvchi Ro'yxatdan O'tish Jarayoni

### Login
1. Foydalanuvchi nomini kiritish
2. Parolni kiritish
3. "Kirish" tugmasini bosish
4. auth.login(username, password) chaqiriladi
5. Agar muvaffaqiyatli - dashboard.html'ga o'tish

### Signup
1. Foydalanuvchi nomini kiritish
2. Parolni kiritish (kuch ko'rsatuvchisi bilan)
3. Parolni tasdiqlash
4. "Ro'yxatdan o'tish" tugmasini bosish
5. auth.signup(username, password) chaqiriladi
6. Agar muvaffaqiyatli - dashboard.html'ga o'tish

## 7. Xavfsizlik Eslatmalari

### Username/Password Xotirasi (localStorage)
```javascript
{
    "users": [
        {
            "id": "id_abc123...",
            "username": "user1",
            "passwordHash": "f4a9cf...",  // Hash qilingan
            "createdAt": "2026-03-30T...",
            "updatedAt": "2026-03-30T..."
        }
    ]
}
```

### Session Xotirasi
```javascript
{
    "currentSession": {
        "token": "id_xyz789...",
        "userId": "id_abc123...",
        "loginTime": "2026-03-30T..."
    }
}
```

## 8. Test Qilish

### Login Test
- ✅ Username kiritish
- ✅ Parol kiritish
- ✅ Kirish tugmasini bosish
- ✅ Dashboard'ga o'tish tekshirish

### Signup Test
- ✅ Yangi username kiritish
- ✅ Parol kiritish (6+ belgi)
- ✅ Parolni tasdiqlash
- ✅ Ro'yxatdan o'tish tugmasini bosish
- ✅ Dashboard'ga o'tish tekshirish

### Tarjima Test
- ✅ Til o'zgarish (en, ru)
- ✅ Navbar va footer i18n orqali tarjimasi
- ✅ Dars mazmuni TranslationAPI orqali tarjimasi
- ✅ Email field'i mavjud emasligini tekshirish

## 9. Kelasi Tekshiruvlar

- [ ] Barcha auth xatolari i18n orqali tarjima qilinganini tekshirish
- [ ] Email hech qanday joyda so'ralmaganini tekshirish
- [ ] Username uniqueness tekshiruvini tekshirish
- [ ] TranslationAPI faqat dars mazmunini tarjima qilingani tekshirish
- [ ] Navbar va footer HTML har joyda data-i18n bilan qo'lda tarjima qilingani tekshirish

## 10. Arkitektura

```
Auth System:
  ├── login.html (username + password)
  ├── src/auth.js (username orqali login/signup)
  └── src/i18n.js (error messages i18n)

Translation System:
  ├── navbar, footer, buttons -> i18n.js (JS qo'lda)
  ├── dars mazmuni -> TranslationAPI (online)
  └── placeholder'lar -> data-i18n-placeholder (JS qo'lda)
```

Bu o'zgarishlar bilan platform:
- ✅ Email siz, faqat username + password bilan auth
- ✅ Navbar/footer/buttons JS i18n orqali qo'lda tarjima
- ✅ Dars mazmuni TranslationAPI orqali avtomatik tarjima
- ✅ Barcha hatolilar i18n orqali o'zbekcha/inglizcha/ruscha
