// Translation API using Google Translate (free API endpoint)
const TranslationAPI = {
    // Supported languages
    supportedLanguages: {
        'uz': 'uz',
        'en': 'en',
        'ru': 'ru'
    },

    // Translate text using Google Translate API
    async translateText(text, targetLang) {
        if (!text || text.trim() === '') return '';
        if (targetLang === 'uz') return text; // Default language
        
        try {
            // Using Google Translate free API endpoint
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=uz|${targetLang}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.responseStatus === 200) {
                return data.responseData.translatedText;
            }
            return text;
        } catch (error) {
            console.error('[v0] Translation error:', error);
            return text;
        }
    },

    // Translate HTML element content
    async translateElement(element, targetLang, skipSelectors = []) {
        if (!element) return;
        
        // Don't translate certain elements
        const skipTags = ['SCRIPT', 'STYLE', 'IMG', 'INPUT', 'A'];
        if (skipTags.includes(element.tagName)) return;
        
        // Skip elements with i18n attributes
        if (element.hasAttribute('data-i18n') || element.hasAttribute('data-i18n-placeholder')) return;
        
        // Translate text nodes
        if (element.nodeType === Node.TEXT_NODE) {
            const text = element.textContent.trim();
            if (text && text.length > 3 && !text.includes('{')) {
                const translated = await this.translateText(text, targetLang);
                if (translated && translated !== text) {
                    element.textContent = translated;
                }
            }
        } else {
            // Recursively translate child nodes (but skip certain parents)
            if (!this.shouldSkipElement(element, skipSelectors)) {
                for (let child of element.childNodes) {
                    await this.translateElement(child, targetLang, skipSelectors);
                }
            }
        }
    },

    // Translate only lesson content (exclude navbar, footer, UI text)
    async translatePageContent(targetLang) {
        if (targetLang === 'uz') return; // Default language, no translation needed
        
        // Elements to completely skip (navbar, footer, UI elements)
        const skipSelectors = ['nav', 'footer', '.navbar', '.navbar-brand', '.nav-link', '.form-control', '.btn', 'label[data-i18n]', '[data-i18n]'];
        
        // Only translate course/lesson content
        const contentElements = document.querySelectorAll('.course-content, .lesson-content, .page-header p:not([data-i18n]), .course-description, .post-content, .reply-content');
        
        for (let element of contentElements) {
            await this.translateElement(element, targetLang, skipSelectors);
        }
    },
    
    // Helper to check if element should be skipped
    shouldSkipElement(element, skipSelectors) {
        if (!element) return true;
        if (element.hasAttribute('data-i18n')) return true;
        if (element.hasAttribute('data-i18n-placeholder')) return true;
        
        for (let selector of skipSelectors) {
            if (element.matches(selector) || element.closest(selector)) {
                return true;
            }
        }
        return false;
    },

    // Translate course data
    async translateCourseData(courses, targetLang) {
        if (targetLang === 'uz') return courses;
        
        const translatedCourses = [];
        
        for (let course of courses) {
            const translated = { ...course };
            
            // Translate course name
            translated.name = await this.translateText(course.name, targetLang);
            
            // Translate course description
            translated.description = await this.translateText(course.description, targetLang);
            
            // Translate lessons
            if (course.lessons) {
                translated.lessons = [];
                for (let lesson of course.lessons) {
                    const translatedLesson = { ...lesson };
                    translatedLesson.title = await this.translateText(lesson.title, targetLang);
                    translatedLesson.content = await this.translateText(lesson.content, targetLang);
                    
                    // Translate quiz questions
                    if (lesson.quiz && lesson.quiz.questions) {
                        translatedLesson.quiz = { ...lesson.quiz };
                        translatedLesson.quiz.questions = [];
                        
                        for (let question of lesson.quiz.questions) {
                            const translatedQuestion = { ...question };
                            translatedQuestion.question = await this.translateText(question.question, targetLang);
                            translatedQuestion.explanation = await this.translateText(question.explanation, targetLang);
                            
                            // Translate options
                            if (question.options) {
                                translatedQuestion.options = [];
                                for (let option of question.options) {
                                    const translated = await this.translateText(option, targetLang);
                                    translatedQuestion.options.push(translated);
                                }
                            }
                            
                            translatedLesson.quiz.questions.push(translatedQuestion);
                        }
                    }
                    
                    translated.lessons.push(translatedLesson);
                }
            }
            
            translatedCourses.push(translated);
        }
        
        return translatedCourses;
    }
};
