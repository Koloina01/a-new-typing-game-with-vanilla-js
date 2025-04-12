document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Animation de texte
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

    // Démarrer l'animation après un léger délai
    setTimeout(typeWriter, 1000);
});