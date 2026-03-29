// TRIZ texnologiyasi bo'yicha kurslar va darslar ma'lumotlari
const coursesData = [
  {
    id: 'triz-principles',
    name: 'TRIZ Asoslari',
    description: 'TRIZ metodologiyasining asosiy tushunchasi va qo\'llanish usullari',
    image: 'src/images/photos/os/macos-image.png',
    lessons: [
      {
        id: 'triz-lesson-1',
        title: 'TRIZ Nima va Uning Tarixchasi',
        content: `
          <h3>TRIZ - Teoriya Inventiv Problemalar Yechimi</h3>
          <p>TRIZ (Teoria Resheniya Izobretatelskyh Zadach) - bu Genrikh Altshullero'z tomonidan 1950-yillar boshida ishlab chiqilgan ijodiy muammolarni hal qilishning sistemali metodologiyasi.</p>
          <h4>TRIZ ning Tarixchasi:</h4>
          <ul>
            <li><strong>1956:</strong> Genrikh Altshullero'z birinchi TRIZ tamoyillarini ishlab chiqdi</li>
            <li><strong>1960-lar:</strong> 40 ta ijodiy prinsiplar formulalashtirildi</li>
            <li><strong>1970-lar:</strong> Paradoks matritsa ishlab chiqildi</li>
            <li><strong>1980-lar:</strong> S-kriva (evolventa) kontseptsiyasi</li>
            <li><strong>1990-lar:</strong> TRIZ dunyoga tarqaldi</li>
            <li><strong>2000-lar:</strong> Ta'limda TRIZ qo'llanilmay boshlandi</li>
          </ul>
          <h4>TRIZ ning Asosiy G'oyasi:</h4>
          <p>TRIZ qoidasiga ko'ra, muammolarni hal qilishning eng yaxshi usuli tayinlangan prinsiplar va metodlardan foydalanishdir. Bu prinsiplar tarixiy rivojlanish davomida o'nlab minglab mutaxassislar tomonidan aniqlangan.</p>
        `,
        videoUrl: 'https://www.youtube.com/embed/RXI74zJMUAA',
        order: 1,
        quiz: {
          questions: [
            {
              id: 'triz-1-q1',
              question: 'TRIZ qaysi mutaxassis tomonidan ishlab chiqildi?',
              options: ['Vladimir Vernadsky', 'Genrikh Altshullero\'z', 'Dmitriy Mendeleyev', 'Albert Ajnshteyn'],
              correct: 1,
              explanation: 'TRIZ Genrikh Altshullero\'z tomonidan 1950-yillar boshida ishlab chiqilgan.'
            },
            {
              id: 'triz-1-q2',
              question: 'Paradoks matritsa qachon ishlab chiqildi?',
              options: ['1950-lar', '1960-lar', '1970-lar', '1980-lar'],
              correct: 2,
              explanation: 'Paradoks matritsa 1970-larda ishlab chiqildi.'
            },
            {
              id: 'triz-1-q3',
              question: 'TRIZ ta\'limda qachon qo\'llanila boshlandi?',
              options: ['1970-lar', '1980-lar', '1990-lar', '2000-lar'],
              correct: 3,
              explanation: '2000-yillardan beri TRIZ ta\'limda qo\'llanila boshlandi.'
            }
          ],
          passingScore: 60
        }
      },
      {
        id: 'triz-lesson-2',
        title: 'TRIZ ning Asosiy Tamoyillari va Idealiligi',
        content: `
          <h3>TRIZ ning Asosiy Tamoyillari</h3>
          <p>TRIZ metodologiyasi bir nechta asosiy tamoyillarga asoslangan, bular muammoni hal qilishning fundamental prinsiplari.</p>
          <h4>Asosiy Tamoyillar:</h4>
          <ul>
            <li><strong>Idealliligi Prinsipi:</strong> Har bir sistema ideal holga intilishi kerak. Ideal sistema - bu zaxiralar yo'q bo'lganda maksimal natija beradigan sistema.</li>
            <li><strong>Qarama-qarshiliklari Prinsipi:</strong> Muammolar asosan qarama-qarshi talablardan tug'iladi. Masalan, yo mustahkam bo'ladi (og'ir) yoki yengil bo'ladi (zaif).</li>
            <li><strong>Evolventsiya Prinsipi:</strong> Tizimlar taraqqiyotning belgilangan qonunlari asosida rivojlanadi. Bu qonunlarni bilsa, kelajakka prognoz qilish mumkin.</li>
            <li><strong>Dinamika Prinsipi:</strong> Tizimning har bir qismi mo'ljallangan harakatiga mos ravishda dinamik bo'lishi kerak.</li>
            <li><strong>Resurs Prinsipi:</strong> Har bir sistema ichida muammoni hal qilishning resurslar mavjud bo'ladi. Ular noto'g'ri ishlatilib qolgan holda yotadi.</li>
          </ul>
          <h4>Ideallik Parametri:</h4>
          <p>Ideallik = Foydali funksiya / Zararli ta'sir</p>
          <p>Sistem yaxshi bo'lishi uchun numerator ko'payishi va yoki denominator kamayishi kerak.</p>
        `,
        videoUrl: 'https://www.youtube.com/embed/TvwxCvVfqJA',
        order: 2,
        quiz: {
          questions: [
            {
              id: 'triz-2-q1',
              question: 'Ideal sistema qanday xususiyatga ega?',
              options: ['Baland qiymati', 'Zaxiralar yo\'q bo\'lganda maksimal natija', 'Kam og\'irligi', 'Qulay shakli'],
              correct: 1,
              explanation: 'Ideal sistema - zaxiralar yo\'q bo\'lganda maksimal natija beradigan sistema.'
            },
            {
              id: 'triz-2-q2',
              question: 'Qarama-qarshilik muammosi nida tug\'iladi?',
              options: ['Yomon dizaynda', 'Qarama-qarshi talablardan', 'Kam budjetda', 'Vaqt yo\'talida'],
              correct: 1,
              explanation: 'Muammolar asosan qarama-qarshi talablardan tug\'iladi.'
            }
          ],
          passingScore: 70
        }
      }
    ]
  },
  {
    id: 'triz-40-principles',
    name: '40 Ta Ijodiy Prinsip',
    description: 'TRIZ metodologiyasining 40 ta ijodiy prinsiplari va ularning tadbiqi',
    image: 'src/images/photos/os/windows-image.png',
    lessons: [
      {
        id: '40-lesson-1',
        title: '40 Ta Prinsipning Birinchi Guruhi (Segmentatsiya)',
        content: `
          <h3>Segmentatsiya va Fragmentatsiya Prinsiplari</h3>
          <p>TRIZ ning 40 ta prinsipining birinchi guruhi jismni qismlarga bo'lishga doir. Bu prinsiplar o'quv jarayonida qo'llanishi mumkin.</p>
          <h4>1. Segmentatsiya (Ajralgan qo'llar bilan ishlash)</h4>
          <ul>
            <li>Jismni bir nechta qismlarga bo'lish</li>
            <li>Jarayonni alohida bosqichga bo'lish</li>
            <li>Pedagogik misol: Darsni qisqalashtirilgan modullarga bo'lish</li>
          </ul>
          <h4>2. Chiqarish (Olib tashlash)</h4>
          <ul>
            <li>Keraksiz qismlarni olib tashlash</li>
            <li>Asosiy funksiyani ajratib olish</li>
            <li>Pedagogik misol: Darsdan keraksiz ma'lumotlarni o'chirish</li>
          </ul>
          <h4>3. Mahalliy Xususiyat</h4>
          <ul>
            <li>Har bir qismning o'z xususiyatini ta'riflash</li>
            <li>Mahalliy muammolarni hal qilish</li>
            <li>Pedagogik misol: Har bir o'quvchi uchun individual yo'nalish</li>
          </ul>
          <h4>4. Asimmetriya</h4>
          <ul>
            <li>Teng emas narsalarni birlashtirish</li>
            <li>Nostandart yechimlarni topish</li>
            <li>Pedagogik misol: Turli xil ta'lim usullarini birlashtiirish</li>
          </ul>
        `,
        videoUrl: 'https://www.youtube.com/embed/RXI74zJMUAA',
        order: 1,
        quiz: {
          questions: [
            {
              id: '40-1-q1',
              question: 'Segmentatsiya prinsipi nima?',
              options: ['Jismni qismlarga bo\'lish', 'Jismni birlashtiirish', 'Jismni harakat qoldirish', 'Jismni o\'lchalash'],
              correct: 0,
              explanation: 'Segmentatsiya jismni bir nechta qismlarga bo\'lish prinsipidir.'
            },
            {
              id: '40-1-q2',
              question: 'Pedagogik kontekstda chiqarish prinsipi qanday qo\'llaniladi?',
              options: ['Dars vaqtini oshirish', 'Darsdan keraksiz ma\'lumotlarni o\'chirish', 'O\'quvchilarni sanini ko\'paytirish', 'Darsliklarni ko\'paytirish'],
              correct: 1,
              explanation: 'Chiqarish prinsipi darsdan keraksiz ma\'lumotlarni o\'chirishda qo\'llaniladi.'
            }
          ],
          passingScore: 60
        }
      },
      {
        id: '40-lesson-2',
        title: '40 Ta Prinsipning Ikkinchi Guruhi (Biriktirish)',
        content: `
          <h3>Biriktirish va Komplementar Prinsiplari</h3>
          <h4>5. Biriktirish (Konsolidatsiya)</h4>
          <ul>
            <li>Alohida qismlarni bir jismga biriktirish</li>
            <li>Bir nechta funksiyalarni birlashtiirish</li>
            <li>Pedagogik misol: Turli fanlarni modulli tizimda biriktirish</li>
          </ul>
          <h4>6. Universallashtirilgan Maqsad</h4>
          <ul>
            <li>Bir jism bir nechta funksiya bajaradi</li>
            <li>Ko'p maqsadli vositalardan foydalanish</li>
            <li>Pedagogik misol: Multimedia vositalari bir vaqtda bir nechta mazmunni o'rganish uchun</li>
          </ul>
          <h4>7. Ichki Komplementar Tizim</h4>
          <ul>
            <li>Tizimning ichidagi qismlari bir-biriga foydali bo'ladi</li>
            <li>O'zaro ta'siri kuchaytirish</li>
            <li>Pedagogik misol: O'quv jarayonida turli xil usullarni birlashtiirish</li>
          </ul>
        `,
        videoUrl: 'https://www.youtube.com/embed/TvwxCvVfqJA',
        order: 2,
        quiz: {
          questions: [
            {
              id: '40-2-q1',
              question: 'Universallashtirilgan maqsad prinsipi qanday ta\'riflanadi?',
              options: ['Bir jism bir funksiya bajaradi', 'Bir jism bir nechta funksiya bajaradi', 'Ko\'p jism bir funksiya bajaradi', 'Jism hech qanday funksiya bajaramaydi'],
              correct: 1,
              explanation: 'Universallashtirilgan maqsad - bir jism bir nechta funksiya bajarishidir.'
            }
          ],
          passingScore: 60
        }
      }
    ]
  },
  {
    id: 'contradiction-matrix',
    name: 'Paradoks Matritsa',
    description: 'TRIZ metodologiyasining markaziy vositasi - Paradoks matritsasidan foydalanish',
    image: 'src/images/photos/os/linux-image.png',
    lessons: [
      {
        id: 'matrix-lesson-1',
        title: 'Paradoks Matritsasini Tushunarli Qilish',
        content: `
          <h3>Paradoks Matritsa (Contradiction Matrix)</h3>
          <p>Paradoks matritsa - bu TRIZ metodologiyasining eng quvvati vositasi. U muammoning ishlatilunga qarama-qarshi talablarini yechib beradigan prinsiplarni topishda yordam beradi.</p>
          <h4>Matritsa Qanday Ishlaydi:</h4>
          <ul>
            <li>Gorizontal o'qlarda yaxshilanishi kerak bo'lgan parametrlar</li>
            <li>Vertikal o'qlarda buning natijaviy muammosi</li>
            <li>Kesishuvchi kataklarida hal etuvchi prinsiplar</li>
          </ul>
          <h4>Misol: O'quv Materialining Sifati va Qiymati</h4>
          <ul>
            <li><strong>Muammol:</strong> O'quv materialining sifatini oshirmooq kerak, lekin buning narxi ko'payadi</li>
            <li><strong>Parametr 1 (yaxshilanishi kerak):</strong> Sifat (bulsa 30 - qiymati yoki "xarajat")</li>
            <li><strong>Parametr 2 (noquvvati):</strong> Xarajat (bulsa 17)</li>
            <li><strong>Matritsa kesishishi:</strong> 30x17 = Tavsiyalangan prinsiplar</li>
          </ul>
          <h4>39x39 Matritsadagi Parametrlar:</h4>
          <p>1. Og'irlik, 2. Uzunlik, 3. Maydon, 4. Hajm, 5. Tezlik, 6. Kuch, 7. Energiya, 8. Issiqlik, 9. Temperatur, 10. Bosim, 11. Tashvish/Yo'talish, 12. Davomiylik, 13. Barqarorlik, 14. Mustahkamligi, 15. Elastikligi, 16. Muqavamati, 17. Isitish tashvishi, 18. Radiatsion ichimlashuvligi, 19. Uyg'unlik, 20. Qulay ish, 21. Hushyarligi bilan ishlash, 22. Qulay sho'x, 23. Xavfsizlik, 24. Sho'ruvchi, 25. Zaharli ichimlashuvligi, 26. Sho'ruvchining intensivligi, 27. Ishchi muhit, 28. Avtomatiklashtirilishning salohiyati, 29. Avtomat kontroli, 30. Tayyorlash, 31. Ko'p sanoat yo'talishi, 32. Zararlarga qarshi, 33. Tayyorlash vaqti, 34. Sho'ruvchi, 35. Noyoblilik, 36. Murakkabligi, 37. Nazariy murakkabli, 38. Operatsion murakkabli, 39. Remontning qulay ish</p>
        `,
        videoUrl: 'https://www.youtube.com/embed/RXI74zJMUAA',
        order: 1,
        quiz: {
          questions: [
            {
              id: 'matrix-1-q1',
              question: 'Paradoks matritsa nima uchun ishlatiladi?',
              options: ['Tarixiy ma\'lumotlar uchun', 'Muammoning qarama-qarshi talablarini yechish uchun', 'Talabalarning raqamini hisoblash uchun', 'Dars jadvalidini tuzish uchun'],
              correct: 1,
              explanation: 'Paradoks matritsa muammoning qarama-qarshi talablarini yechib beradigan prinsiplarni topishda yordam beradi.'
            },
            {
              id: 'matrix-1-q2',
              question: 'Paradoks matritsada nechta parametr mavjud?',
              options: ['20x20', '30x30', '39x39', '50x50'],
              correct: 2,
              explanation: 'Klassik TRIZ paradoks matritsada 39x39 parametr mavjud.'
            }
          ],
          passingScore: 60
        }
      }
    ]
  },
  {
    id: 'practical-examples',
    name: 'Amaliy Pedagogik Misollar',
    description: 'TRIZ metodologiyasini real ta\'lim jarayonida qo\'llanish misollari',
    image: 'src/images/photos/os/ios-image.png',
    lessons: [
      {
        id: 'practical-1',
        title: 'Misol 1: Interaktiv Dars O\'tkazish',
        content: `
          <h3>TRIZ bilan Interaktiv Dars Tashkil Etish</h3>
          <p>Pedagogik muammol: Darsni ham sifatli (chuqur o'rganish) ham vaqtga mos (30 minut) qilish.</p>
          <h4>Muammoni TRIZ bilan Yechish:</h4>
          <ul>
            <li><strong>Paradoks:</strong> Chuqur o'rganish vaqt oladi, lekin soat chegaralangan</li>
            <li><strong>Tavsiyalangan prinsipi:</strong> Dinamika - dars strategiyasi vaqt davomida o'zgaradi</li>
            <li><strong>Yechim:</strong>
              <ul>
                <li>Birinchi 10 minut: Tez tahlil va asosiy tushunchalar</li>
                <li>Ikkinchi 10 minut: Interaktiv misol yechimlar</li>
                <li>Uchinchi 10 minut: O'quvchilar o'z yechimlarini taqdim etadi</li>
              </ul>
            </li>
            <li><strong>Natijar:</strong> Ikkala shartni ham bajarish mumkin</li>
          </ul>
          <h4>Amaliy Mashq:</h4>
          <p>O'z fanning darslari uchun shunga o'xshash paradoksni aniqlang va TRIZ prinsiplariga asoslanog yechim taklif qiling.</p>
        `,
        videoUrl: 'https://www.youtube.com/embed/RXI74zJMUAA',
        order: 1,
        quiz: {
          questions: [
            {
              id: 'practical-1-q1',
              question: 'Darsni vaqtga mos qilish uchun qaysi TRIZ prinsipi qo\'llaniladi?',
              options: ['Biriktirish', 'Dinamika', 'Asimmetriya', 'Universallashtiirish'],
              correct: 1,
              explanation: 'Dinamika prinsipi - dars strategiyasi vaqt davomida o\'zgaradi.'
            }
          ],
          passingScore: 60
        }
      },
      {
        id: 'practical-2',
        title: 'Misol 2: Turli Salarni Birlashtiirish',
        content: `
          <h3>TRIZ bilan Turli Ta'lim Salarini Birlashtiirish</h3>
          <p>Pedagogik muammol: Matematik, fizika va san\'at darslarini birlashtiirish uchun vaqt yo\'t.</p>
          <h4>Muammoni TRIZ bilan Yechish:</h4>
          <ul>
            <li><strong>Paradoks:</strong> Alohida darslar zarur lekin vaqt yo\'taladi</li>
            <li><strong>Tavsiyalangan prinsipi:</strong> Universallashtirilgan maqsad - bir loyiha bir nechta fanni qamrab oladi</li>
            <li><strong>Yechim:</strong>
              <ul>
                <li>Integratsion loyiha: "Binoning arxitekturasi"</li>
                <li>Matematik: Geometrik formalar hisoblash</li>
                <li>Fizika: Konstruksiyaning mustahkamlik analizi</li>
                <li>San\'at: Dizayn va estetika</li>
              </ul>
            </li>
            <li><strong>Natijar:</strong> Uch fanni birlashtirib o'rganish mumkin</li>
          </ul>
        `,
        videoUrl: 'https://www.youtube.com/embed/TvwxCvVfqJA',
        order: 2,
        quiz: {
          questions: [
            {
              id: 'practical-2-q1',
              question: 'Turli darslarni birlashtiirish uchun qaysi TRIZ prinsipi qo\'llaniladi?',
              options: ['Chiqarish', 'Universallashtirilgan maqsad', 'Segmentatsiya', 'Mahalliy xususiyat'],
              correct: 1,
              explanation: 'Universallashtirilgan maqsad prinsipi bir nechta fanni birlashtiirish uchun ishlatiladi.'
            }
          ],
          passingScore: 60
        }
      }
    ]
  },
  {
    id: 'triz-methodology',
    name: 'Metodika va Vositalari',
    description: 'TRIZ metodologiyasini amaliyotda qo\'llanishning metodikasi va vositalari',
    image: 'src/images/photos/os/android-image.png',
    lessons: [
      {
        id: 'methodology-1',
        title: 'TRIZ O\'qitish Metodikasi',
        content: `
          <h3>TRIZ Metodologiyasini O\'qitish Bosqichlari</h3>
          <p>TRIZ ning kuchli taasiri uchun to'liq metodikani amal qilish zarur.</p>
          <h4>Bosqich 1: Ideallashtiirish (Ideal Final Result - IFR)</h4>
          <ul>
            <li>Muammoni eng ideal holatda qanday bo'lishi kerakligini shu'rola</li>
            <li>Reallik shartlarini hisobga olmasdan ideal yechim tushuntiirish</li>
            <li>Pedagogik misol: O'quv jarayoni "o'zini o'zi" amalga oshiradi, o'qituvchi faqat nazorat qiladi</li>
          </ul>
          <h4>Bosqich 2: Moslashgan Ideal Final Result</h4>
          <ul>
            <li>Reallik shartlarida qanday amalga oshirilsa bo'ladi</li>
            <li>Resurslarni hisobga olish</li>
            <li>Vaqt va budjetni hisoblash</li>
          </ul>
          <h4>Bosqich 3: TRIZ Prinsiplarini Qo\'llash</h4>
          <ul>
            <li>Muammoning qarama-qarshi talablarini aniqlash</li>
            <li>Paradoks matritsasidan foydalanish</li>
            <li>Tavsiyalangan prinsiplarni qo\'llash</li>
          </ul>
          <h4>Bosqich 4: Natijani Tekshirish</h4>
          <ul>
            <li>Yechim ishlayaptimi?</li>
            <li>Yangi muammolar paydo bo'ldimi?</li>
            <li>Yechimni takomillashtirish</li>
          </ul>
        `,
        videoUrl: 'https://www.youtube.com/embed/RXI74zJMUAA',
        order: 1,
        quiz: {
          questions: [
            {
              id: 'method-1-q1',
              question: 'Ideallashtiirish (IFR) nima?',
              options: ['Yomon yechim', 'Muammoning eng ideal holati', 'Haqiqiy yechim', 'Vaqtning sarfi'],
              correct: 1,
              explanation: 'Ideallashtiirish - muammoni eng ideal holatda qanday bo\'lishi keakligini shu\'rola.'
            },
            {
              id: 'method-1-q2',
              question: 'TRIZ metodikasining nechta bosqichi mavjud?',
              options: ['2', '3', '4', '5'],
              correct: 2,
              explanation: 'TRIZ metodikasining 4 ta asosiy bosqichi mavjud.'
            }
          ],
          passingScore: 70
        }
      }
    ]
  }
];

// Utility funksiyalar
function getCourseById(courseId) {
  return coursesData.find(course => course.id === courseId);
}

function getLessonById(courseId, lessonId) {
  const course = getCourseById(courseId);
  return course ? course.lessons.find(lesson => lesson.id === lessonId) : null;
}

function getQuizByCourseAndLesson(courseId, lessonId) {
  const lesson = getLessonById(courseId, lessonId);
  return lesson ? lesson.quiz : null;
}
