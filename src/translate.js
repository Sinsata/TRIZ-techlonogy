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
    async translateElement(element, targetLang) {
        if (!element) return;
        
        // Don't translate certain elements
        const skipTags = ['SCRIPT', 'STYLE', 'IMG', 'INPUT'];
        if (skipTags.includes(element.tagName)) return;
        
        // Translate text nodes
        if (element.nodeType === Node.TEXT_NODE) {
            const text = element.textContent.trim();
            if (text && text.length > 0) {
                element.textContent = await this.translateText(text, targetLang);
            }
        } else {
            // Recursively translate child nodes
            for (let child of element.childNodes) {
                await this.translateElement(child, targetLang);
            }
        }
    },

    // Translate page content
    async translatePageContent(targetLang) {
        if (targetLang === 'uz') return; // Default language, no translation needed
        
        const body = document.body;
        const textElements = body.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, div.card-text, div.card-title, span.card-text, a');
        
        for (let element of textElements) {
            const text = element.textContent.trim();
            
            // Skip empty or very short texts
            if (!text || text.length < 3) continue;
            
            // Skip if already translated or contains special chars
            if (text.includes('{') || text.includes('[')) continue;
            
            try {
                const translated = await this.translateText(text, targetLang);
                if (translated && translated !== text) {
                    element.textContent = translated;
                }
            } catch (error) {
                console.error('[v0] Element translation error:', error);
            }
        }
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
