// وظائف JavaScript مخصصة لصفحة الهوتسبوت

document.addEventListener("DOMContentLoaded", function() {
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
});

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
