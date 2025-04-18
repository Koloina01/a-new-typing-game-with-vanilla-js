document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    const text = "Master touch typing with Vanilla Typing – ";
    const secondLineText = "the premier platform to refine your keyboard mastery.";
    const typedTextElement = document.getElementById('typed-text');
    let i = 0;
    let isFirstLineDone = false;
    
    function typeWriter() {
        if (!isFirstLineDone && i < text.length) {
            // Type the first line
            typedTextElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 50);
        } else if (!isFirstLineDone) {
            // First line is done, add line break and start second line
            typedTextElement.innerHTML += '<br>';
            typedTextElement.classList.add('text-descend');
            isFirstLineDone = true;
            i = 0;
            setTimeout(typeWriter, 300); // Slight pause before starting second line
        } else if (i < secondLineText.length) {
            // Type the second line
            typedTextElement.innerHTML += secondLineText.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 50);
        } else {
            // Everything is typed
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