/**
 * Point culture (en Français car je suis un peu obligé): 
 * Dans ce genre de jeu, un mot equivaut à 5 caractères, y compris les espaces. 
 * La précision, c'est le pourcentage de caractères tapés correctement sur tous les caractères tapés.
 * 
 * Sur ce... Amusez-vous bien ! 
 */
let startTime = null;
let currentWordIndex = 0;
let totalTyped = 0;
let correctTyped = 0;
let testEnded = false;
const wordsToType = [];

const modeSelect = document.getElementById("mode");
const wordCountInput = document.getElementById("word-count");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");

const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
};

// Génère un mot aléatoire selon le mode choisi
const getRandomWord = (mode, count) => {
    const list = words[mode];
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(list[Math.floor(Math.random() * list.length)]);
    }
    return result;
};

// Initialise le test de frappe
function startTest() {
    wordsToType.length = 0;
    wordDisplay.innerHTML = "";
    inputField.value = "";
    results.textContent = "Result :";    
    currentCharIndex = 0;
    correctTyped = 0;
    totalTyped = 0;
    testEnded = false;
    startTime = null;

    const mode = modeSelect.value;
    const wordCount = parseInt(wordCountInput.value) || 25;
    wordsToType.push(...getRandomWord(mode, wordCount));

    const allText = wordsToType.join(" ") + " ";
    for (let char of allText) {
        const span = document.createElement("span");
        span.textContent = char;
        wordDisplay.appendChild(span);
    }

    wordDisplay.children[0].classList.add("current");
    inputField.focus();
}

inputField.addEventListener("keydown", (e) => {
    if (testEnded) return;
    if (!startTime) startTime = Date.now();

    const spans = wordDisplay.children;
    e.preventDefault();

    if (e.key === "Backspace") {
        if (currentCharIndex === 0) return;
        currentCharIndex--;
        spans[currentCharIndex].classList.remove("correct", "incorrect", "current");
        spans[currentCharIndex].classList.add("current");

        inputField.value = inputField.value.slice(0, -1);
        return;
    }
    if (e.key.length !== 1) return;

    const expectedChar = spans[currentCharIndex]?.textContent;
    const typedChar = e.key;

    totalTyped++;

    if (typedChar === expectedChar) {
        spans[currentCharIndex].classList.remove("incorrect");
        spans[currentCharIndex].classList.add("correct");
        correctTyped++;
    } else {
        spans[currentCharIndex].classList.add("incorrect");
    }

    spans[currentCharIndex].classList.remove("current");
    currentCharIndex++;

    if (currentCharIndex < spans.length) {
        spans[currentCharIndex].classList.add("current");
    } else {
        endTest();
    }

// Nettoyer le champ après un mot (espace)
    if (typedChar === " ") {
        inputField.value = "";
    } else {
        inputField.value += typedChar;
    }
});
// Calcule les statistiques globales
function endTest() {
    testEnded = true;
    const elapsedTime = (Date.now() - startTime) / 1000;
    const wpm = (correctTyped / 5) / (elapsedTime / 60);
 // Calcule la précision caractère par caractère
    const accuracy = (correctTyped / totalTyped) * 100;

    results.textContent = `WPM = ${wpm.toFixed(2)}, Précision = ${accuracy.toFixed(2)}%`;
}