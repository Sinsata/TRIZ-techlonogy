// Multi-language support system - loads translations from JSON files
const i18n = {
    currentLanguage: 'uz',
    translations: {},
    
    // Load translations from JSON file
    async loadLanguage(lang) {
        try {
            const response = await fetch(`/src/lang/${lang}.json`);
            if (!response.ok) {
                console.error(`[v0] Failed to load language file for ${lang}, status: ${response.status}`);
                return false;
            }
            
            this.translations[lang] = await response.json();
            console.log(`[v0] Loaded language: ${lang}`);
            return true;
        } catch (error) {
            console.error(`[v0] Error loading language file for ${lang}:`, error);
            return false;
        }
    },
    
    // Initialize languages
    async init() {
        const languages = ['uz', 'en', 'ru'];
        const loadedLangs = [];
        
        // Load all language files
        for (const lang of languages) {
            const success = await this.loadLanguage(lang);
            if (success) {
                loadedLangs.push(lang);
            } else {
                console.error(`[v0] Failed to load ${lang}.json`);
            }
        }
        
        // Set saved language or default to uz
        const savedLang = localStorage.getItem('language') || 'uz';
        if (loadedLangs.includes(savedLang)) {
            this.setLanguage(savedLang);
        } else if (loadedLangs.length > 0) {
            this.setLanguage(loadedLangs[0]);
            console.warn(`[v0] Requested language ${savedLang} not available, using ${loadedLangs[0]}`);
        } else {
            console.error('[v0] No language files loaded!');
            return;
        }
        
        console.log('[v0] i18n initialized with languages:', loadedLangs);
        this.updatePageText();
    },
    
    // Set current language
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            this.updatePageText();
            return true;
        }
        return false;
    },
    
    // Get current language
    getLanguage() {
        return this.currentLanguage;
    },
    
    // Get available languages
    getLanguages() {
        return Object.keys(this.translations);
    },
    
    // Translate key - supports nested keys (e.g., "navbar.dashboard")
    t(key, defaultValue = key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return defaultValue;
            }
        }
        
        return typeof value === 'string' ? value : defaultValue;
    },
    
    // Get entire course object
    getCourses() {
        return this.t('courses.lessons', []);
    },
    
    // Get course by ID
    getCourseById(id) {
        const courses = this.getCourses();
        return courses.find(course => course.id === id);
    },
    
    // Update all page text with [data-i18n] and [data-i18n-placeholder] attributes
    updatePageText() {
        // Update element content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.t(key);
            
            // Preserve inner HTML for elements with child elements
            if (element.children.length === 0) {
                element.textContent = text;
            } else {
                // Only update text nodes, preserve HTML structure
                Array.from(element.childNodes).forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.textContent = text;
                    }
                });
            }
        });
        
        // Update input placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const text = this.t(key);
            element.placeholder = text;
        });
    }
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        i18n.init();
    });
} else {
    i18n.init();
}
