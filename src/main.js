document.addEventListener('DOMContentLoaded', function() {
    const osData = [
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
    ];

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
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        toggleLabel.classList.toggle('active');
    });
});
