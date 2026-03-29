// Multilingual course data
const courseDataByLanguage = {
    uz: [
        {
            name: "TRIZ Asoslari",
            logo: "macos-logo.png",
            page: "./src/pages/macos.html",
            image: "macos-image.png",
            description: "TRIZ metodologiyasining asosiy tushunchasi va qo'llanish usullari.",
            anchor: "triz-asoslari"
        },
        {
            name: "40 Ta Ijodiy Prinsip",
            logo: "windows-logo.png",
            page: "./src/pages/windows.html",
            image: "windows-image.png",
            description: "TRIZ metodologiyasining 40 ta ijodiy prinsiplari va ularning tadbiqi.",
            anchor: "40-prinsip"
        },
        {
            name: "Paradoks Matritsa",
            logo: "linux-logo.png",
            page: "./src/pages/linux.html",
            image: "linux-image.png",
            description: "TRIZ metodologiyasining markaziy vositasi - Paradoks matritsasidan foydalanish.",
            anchor: "paradoks-matritsa"
        },
        {
            name: "Amaliy Pedagogik Misollar",
            logo: "ios-logo.png",
            page: "./src/pages/ios.html",
            image: "ios-image.png",
            description: "TRIZ metodologiyasini real ta'lim jarayonida qo'llanish misollari.",
            anchor: "amaliy-misollar"
        },
        {
            name: "Metodika va Vositalari",
            logo: "android-logo.png",
            page: "./src/pages/android.html",
            image: "android-image.png",
            description: "TRIZ metodologiyasini amaliyotda qo'llanishning metodikasi va vositalari.",
            anchor: "metodika"
        }
    ],
    en: [
        {
            name: "TRIZ Foundations",
            logo: "macos-logo.png",
            page: "./src/pages/macos.html",
            image: "macos-image.png",
            description: "Basic concepts and application methods of TRIZ methodology.",
            anchor: "triz-foundations"
        },
        {
            name: "40 Inventive Principles",
            logo: "windows-logo.png",
            page: "./src/pages/windows.html",
            image: "windows-image.png",
            description: "40 inventive principles of TRIZ methodology and their applications.",
            anchor: "40-principles"
        },
        {
            name: "Contradiction Matrix",
            logo: "linux-logo.png",
            page: "./src/pages/linux.html",
            image: "linux-image.png",
            description: "Central tool of TRIZ methodology - Using the Contradiction Matrix.",
            anchor: "contradiction-matrix"
        },
        {
            name: "Practical Pedagogical Examples",
            logo: "ios-logo.png",
            page: "./src/pages/ios.html",
            image: "ios-image.png",
            description: "Examples of applying TRIZ methodology in real educational processes.",
            anchor: "practical-examples"
        },
        {
            name: "Methodology and Tools",
            logo: "android-logo.png",
            page: "./src/pages/android.html",
            image: "android-image.png",
            description: "Methodology and tools for practical application of TRIZ technology.",
            anchor: "methodology"
        }
    ],
    ru: [
        {
            name: "Основы ТРИЗ",
            logo: "macos-logo.png",
            page: "./src/pages/macos.html",
            image: "macos-image.png",
            description: "Основные концепции и методы применения методологии ТРИЗ.",
            anchor: "triz-osnovy"
        },
        {
            name: "40 изобретательских принципов",
            logo: "windows-logo.png",
            page: "./src/pages/windows.html",
            image: "windows-image.png",
            description: "40 изобретательских принципов методологии ТРИЗ и их применение.",
            anchor: "40-principov"
        },
        {
            name: "Матрица противоречий",
            logo: "linux-logo.png",
            page: "./src/pages/linux.html",
            image: "linux-image.png",
            description: "Центральный инструмент методологии ТРИЗ - использование матрицы противоречий.",
            anchor: "matrica-protivorechij"
        },
        {
            name: "Практические педагогические примеры",
            logo: "ios-logo.png",
            page: "./src/pages/ios.html",
            image: "ios-image.png",
            description: "Примеры применения методологии ТРИЗ в реальных учебных процессах.",
            anchor: "prakticheskie-primery"
        },
        {
            name: "Методология и инструменты",
            logo: "android-logo.png",
            page: "./src/pages/android.html",
            image: "android-image.png",
            description: "Методология и инструменты для практического применения технологии ТРИЗ.",
            anchor: "metodologiya"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const osData = courseDataByLanguage[i18n.getLanguage()] || courseDataByLanguage['uz'];

    const osCardsContainer = document.getElementById('os-cards');
    const listOs = document.getElementById('list-os');

    osData.forEach(os => {
        const card = document.createElement('div');
        card.className = 'col-lg-3 col-md-4 col-sm-6';
        card.id = os.anchor;
        card.innerHTML = `
            <a href="${os.page}" class="card">
                <img src="src/images/photos/os/${os.image}" class="card-img-top" alt="${os.name}">
                <div class="card-body">
                    <h5 class="card-title">${os.name}</h5>
                    <p class="card-text">${os.description}</p>
                </div>
            </a>
        `;
        osCardsContainer.appendChild(card);
    });

    listOs.innerHTML = osData.map(os => `<a href="${os.page}" class="card-title">${os.name}</a>`).join('');
});

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const label = document.getElementById('toggleLabel');
    const sidebarToggle = document.getElementById('sidebarToggle');

    // Sidebarni ochish va yopish
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (sidebar) sidebar.classList.toggle('active');
            if (label) label.classList.toggle('active');
        });
    }
});

// Global language change function
function changeLanguage(lang) {
    i18n.setLanguage(lang);
    document.documentElement.lang = lang;
    i18n.updatePageText();
    
    // Kurslari qayta yuklash
    const osCardsContainer = document.getElementById('os-cards');
    if (osCardsContainer) {
        osCardsContainer.innerHTML = '';
        const osData = courseDataByLanguage[lang] || courseDataByLanguage['uz'];
        osData.forEach(os => {
            const card = document.createElement('div');
            card.className = 'col-lg-3 col-md-4 col-sm-6';
            card.id = os.anchor;
            card.innerHTML = `
                <a href="${os.page}" class="card">
                    <img src="src/images/photos/os/${os.image}" class="card-img-top" alt="${os.name}">
                    <div class="card-body">
                        <h5 class="card-title">${os.name}</h5>
                        <p class="card-text">${os.description}</p>
                    </div>
                </a>
            `;
            osCardsContainer.appendChild(card);
        });
    }
    
    // Footer'ni qayta yuklash
    const listOs = document.getElementById('list-os');
    if (listOs) {
        const osData = courseDataByLanguage[lang] || courseDataByLanguage['uz'];
        listOs.innerHTML = osData.map(os => `<a href="${os.page}" class="card-title">${os.name}</a>`).join('');
    }
    
    // Navbar til tanlashini yangilash
    const currentLanguageEl = document.getElementById('currentLanguage');
    if (currentLanguageEl) {
        const langNames = {
            'uz': "O'zbek",
            'en': 'English',
            'ru': 'Русский'
        };
        currentLanguageEl.textContent = langNames[lang];
    }
    
    localStorage.setItem('language', lang);
}

// Automatic translation on language change
let currentTranslationLang = 'uz';

async function changeLanguageWithTranslation(lang) {
    i18n.setLanguage(lang);
    document.documentElement.lang = lang;
    i18n.updatePageText();
    currentTranslationLang = lang;
    
    // Kurslari qayta yuklash
    const osCardsContainer = document.getElementById('os-cards');
    if (osCardsContainer) {
        osCardsContainer.innerHTML = '';
        const osData = courseDataByLanguage[lang] || courseDataByLanguage['uz'];
        osData.forEach(os => {
            const card = document.createElement('div');
            card.className = 'col-lg-3 col-md-4 col-sm-6';
            card.id = os.anchor;
            card.innerHTML = `
                <a href="${os.page}" class="card">
                    <img src="src/images/photos/os/${os.image}" class="card-img-top" alt="${os.name}">
                    <div class="card-body">
                        <h5 class="card-title">${os.name}</h5>
                        <p class="card-text">${os.description}</p>
                    </div>
                </a>
            `;
            osCardsContainer.appendChild(card);
        });
    }
    
    // Footer'ni qayta yuklash
    const listOs = document.getElementById('list-os');
    if (listOs) {
        const osData = courseDataByLanguage[lang] || courseDataByLanguage['uz'];
        listOs.innerHTML = osData.map(os => `<a href="${os.page}" class="card-title">${os.name}</a>`).join('');
    }
    
    // Navbar til tanlashini yangilash
    const currentLanguageEl = document.getElementById('currentLanguage');
    if (currentLanguageEl) {
        const langNames = {
            'uz': "O'zbek",
            'en': 'English',
            'ru': 'Русский'
        };
        currentLanguageEl.textContent = langNames[lang];
    }
    
    localStorage.setItem('language', lang);
    
    // Sahifa elementlarini tarjima qilish (dars materiallari bundan mustasno)
    if (lang !== 'uz' && typeof TranslationAPI !== 'undefined') {
        setTimeout(() => {
            TranslationAPI.translatePageContent(lang);
        }, 300);
    }
}

// Initial page load language setup
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'uz';
    i18n.setLanguage(savedLang);
    document.documentElement.lang = savedLang;
    i18n.updatePageText();
    currentTranslationLang = savedLang;
    
    // Dastlabki tarjima qilish
    if (savedLang !== 'uz' && typeof TranslationAPI !== 'undefined') {
        setTimeout(() => {
            TranslationAPI.translatePageContent(savedLang);
        }, 500);
    }
});
