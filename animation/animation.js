document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    const text = "Master touch typing with Vanilla Typing – the premier platform to refine your keyboard mastery.";
    const typedTextElement = document.getElementById('typed-text');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typedTextElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 50); 
        } else {
            typedTextElement.style.animation = "blinkCursor 0.7s infinite";
        }
    }
    setTimeout(typeWriter, 1000);

    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("blur-navbar");
            } else {
                navbar.classList.remove("blur-navbar");
            }
        });
    }
});
