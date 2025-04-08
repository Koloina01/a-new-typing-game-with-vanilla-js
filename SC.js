/**
 * Point culture (en Français car je suis un peu obligé): 
 * Dans ce genre de jeu, un mot equivaut à 5 caractères, y compris les espaces. 
 * La précision, c'est le pourcentage de caractères tapés correctement sur tous les caractères tapés.
 * 
 * Sur ce... Amusez-vous bien ! 
 */
let startTime = null;
let previousEndTime = null;
let currentWordIndex = 0;
const wordsToType = [];

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");

const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
};

// Génère un mot aléatoire selon le mode choisi
const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// Initialise le test de frappe
const startTest = (wordCount = 50) => {
    wordsToType.length = 0;
    wordDisplay.innerHTML = "";
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        if (index === 0) span.style.color = "red";
        wordDisplay.appendChild(span);
    });

    inputField.value = "";
    results.textContent = "";
};

// Lance le chronomètre au premier caractère tapé
const startTimer = () => {
    if (!startTime) {
        startTime = Date.now();
        previousEndTime = startTime;
    }
};


const calculateAccuracy = (input, expected) => {
    let correctChars = 0;
    const maxLength = Math.max(input.length, expected.length);

    for (let i = 0; i < maxLength; i++) {
        if (input[i] === expected[i]) correctChars++;
    }

    return (correctChars / maxLength) * 100 || 0;
};

// Calcule les statistiques globales
const getGlobalStats = () => {
    const totalTime = (Date.now() - startTime) / 1000; // secondes
    const typedWords = wordsToType.slice(0, currentWordIndex);
    const totalChars = typedWords.join(" ").length;
    const wpm = (totalChars / 5) / (totalTime / 60);
    return parseFloat(wpm.toFixed(2));
};

// Gère la validation et le passage au mot suivant
const updateWord = (event) => {
    if (event.key === " ") {
        const typed = inputField.value.trim();
        const expected = wordsToType[currentWordIndex];

        if (typed.length === 0) return;

        const accuracy = calculateAccuracy(typed, expected);
        const wpm = getGlobalStats();

        if (typed === expected) {
            currentWordIndex++;
            previousEndTime = Date.now();
            highlightNextWord();
            inputField.style.backgroundColor = ""; // OK
        } else {
            inputField.style.backgroundColor = "#fdd"; // rouge clair
            setTimeout(() => {
                inputField.style.backgroundColor = "";
            }, 200);
        }

        results.textContent = `WPM: ${wpm}, Précision: ${accuracy.toFixed(2)}%`;
        inputField.value = "";
        event.preventDefault();
    }
};

// Surligne le mot en cours
const highlightNextWord = () => {
    const wordElements = wordDisplay.children;

    if (currentWordIndex < wordElements.length) {
        if (currentWordIndex > 0) {
            wordElements[currentWordIndex - 1].style.color = "black";
        }
        wordElements[currentWordIndex].style.color = "red";
    }
};

// Écouteurs d'événements
inputField.addEventListener("keydown", (event) => {
    startTimer();
    updateWord(event);
});

modeSelect.addEventListener("change", () => startTest());

// Lance automatiquement le test au chargement
startTest();
