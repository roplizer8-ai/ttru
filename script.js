// وظائف JavaScript مخصصة لصفحة الهوتسبوت

document.addEventListener("DOMContentLoaded", function() {
    // Theme switcher functionality
    const themeToggle = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-theme') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // Slider functionality
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = slider.querySelectorAll('.slide');
        let currentSlide = 0;

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 3000); // Change slide every 3 seconds
    }

    // Terms Modal functionality for login.html
    setupModal('open-terms', 'terms-modal', 'close-modal', 'terms', 'login-button');

    // Terms Modal functionality for alogin.html
    setupModal('open-terms-voucher', 'terms-modal-voucher', 'close-modal-voucher', 'terms-voucher', 'login-button-voucher');
});

function setupModal(openId, modalId, closeId, checkboxId, buttonId) {
    const openBtn = document.getElementById(openId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);
    const termsCheckbox = document.getElementById(checkboxId);
    const loginButton = document.getElementById(buttonId);

    if (openBtn && modal && closeBtn && termsCheckbox && loginButton) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('visible');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('visible');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('visible');
            }
        });

        termsCheckbox.addEventListener('change', function() {
            loginButton.disabled = !this.checked;
        });
    }
}

function doLogin() {
    var username = document.login.username.value;
    var password = document.login.password.value;
    var chapId = document.login.chap_id.value;
    var chapChallenge = document.login.chap_challenge.value;

    if (username == "" || password == "") {
        alert("الرجاء إدخال اسم المستخدم وكلمة المرور.");
        return false;
    }

    // $(if chap-id) is a MikroTik variable that is only present when CHAP is used.
    // If it's present, we need to hash the password with the challenge.
    if (chapId) {
        document.login.response.value = hex_md5(chapId + password + chapChallenge);
    }

    return true;
}
