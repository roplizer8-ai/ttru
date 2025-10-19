// --- 1. GLOBAL TRANSLATIONS ---
const translations = {
    ar: {
        login: "تسجيل الدخول",
        agreeTo: "أوافق على",
        terms: "شروط الخدمة",
        loginButton: "دخول",
        loginWithVoucher: "تسجيل الدخول بكود الكارت",
        contactUs: "اتصل بنا",
        langToggle: "English",
        usernamePlaceholder: "اسم المستخدم",
        passwordPlaceholder: "كلمة المرور",
        voucherPlaceholder: "كود الكارت"
    },
    en: {
        login: "Login",
        agreeTo: "I agree to the",
        terms: "Terms of Service",
        loginButton: "Login",
        loginWithVoucher: "Login with Voucher",
        contactUs: "Contact Us",
        langToggle: "العربية",
        usernamePlaceholder: "Username",
        passwordPlaceholder: "Password",
        voucherPlaceholder: "Voucher Code"
    }
};

// --- 2. CORE FUNCTIONS ---
function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-lang]').forEach(el => {
        el.style.display = el.dataset.lang === lang ? '' : 'none';
    });

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    if (usernameInput) {
        if (document.getElementById('login-button-voucher')) {
            usernameInput.placeholder = translations[lang].voucherPlaceholder;
        } else {
            usernameInput.placeholder = translations[lang].usernamePlaceholder;
        }
    }
    if (passwordInput) passwordInput.placeholder = translations[lang].passwordPlaceholder;

    document.getElementById('lang-toggle').textContent = translations[lang].langToggle;
    localStorage.setItem('lang', lang);
}

function setupModal(openIds, modalId, closeId) {
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);

    if (!modal) return;

    document.querySelectorAll(openIds).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('visible');
        });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('visible'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('visible');
    });
}


// --- 3. EVENT LISTENERS & INITIALIZATION ---
document.addEventListener("DOMContentLoaded", function() {
    // Language Switcher
    const langToggle = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('lang') || 'ar';
    langToggle.addEventListener('click', () => {
        const newLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    });
    setLanguage(currentLang);

    // Theme Switcher
    const themeToggle = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-theme') themeToggle.checked = true;
    }
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', this.checked ? 'dark-theme' : '');
    });

    // Terms & Login Button Logic
    const termsCheckbox = document.getElementById('terms') || document.getElementById('terms-voucher');
    const loginButton = document.getElementById('login-button') || document.getElementById('login-button-voucher');
    if(termsCheckbox && loginButton) {
        termsCheckbox.addEventListener('change', () => {
            loginButton.disabled = !termsCheckbox.checked;
        });
    }

    // Modals
    setupModal(['#open-terms', '#open-terms-en', '#open-terms-voucher', '#open-terms-voucher-en'], 'terms-modal', 'close-terms-modal');
    setupModal(['#contact-us', '#contact-us-en'], 'contact-modal', 'close-contact-modal');

    // Advanced Ad Slider
    const adSlider = document.querySelector('.ad-slider');
    if (adSlider) {
        const slides = adSlider.querySelectorAll('.slide');
        let currentSlide = 0;
        let slideInterval = setInterval(nextSlide, 5000);

        function nextSlide() {
            slides[currentSlide].querySelector('video')?.pause();
            currentSlide = (currentSlide + 1) % slides.length;
            adSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
            slides[currentSlide].querySelector('video')?.play();
        }

        adSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        adSlider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));

        // Initial play for video if first slide is a video
        slides[0].querySelector('video')?.play();
    }
});


// --- 4. MIKROTIK SPECIFIC FUNCTIONS ---
function doLogin() {
    // This function remains for MikroTik's onSubmit event
    return true; // Basic validation can be added here if needed
}
