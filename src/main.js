// Get lessons from i18n system
function getCourseDataByLanguage() {
    const langs = { uz: {}, en: {}, ru: {} };
    const lessons = i18n.t('lessons', []);
    
    // Lessons are now loaded from JSON i18n files with full descriptions
    return lessons.slice(0, 20).map((lesson, idx) => ({
        id: lesson.id,
        number: lesson.number,
        name: lesson.name,
        description: lesson.description,
        hours: lesson.hours,
        methodology: lesson.methodology,
        applications: lesson.applications,
        page: `./lesson.html?id=${lesson.id}`,
        image: `triz-lesson-${lesson.number}.jpg`
    }));
}

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
// Navbar, footer, buttons - i18n orqali
// Dars matni - TranslationAPI orqali
function changeLanguage(lang) {
    i18n.setLanguage(lang);
    document.documentElement.lang = lang;
    i18n.updatePageText();
    
    // Kurslari qayta yuklash (agar os-cards mavjud bo'lsa)
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
    
    // Footer'ni qayta yuklash (agar list-os mavjud bo'lsa)
    const listOs = document.getElementById('list-os');
    if (listOs) {
        const osData = courseDataByLanguage[lang] || courseDataByLanguage['uz'];
        listOs.innerHTML = osData.map(os => `<a href="${os.page}" class="card-title">${os.name}</a>`).join('');
    }
    
    localStorage.setItem('language', lang);
}
