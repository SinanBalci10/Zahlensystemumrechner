// Punktestand-Variable
let points = 0;
let currentLevel = 1;
let tasks = [
    { question: "Wandle die Dezimalzahl 26 in Hexadezimal um.", answer: "1A", answered: false },
    { question: "Wandle die Dezimalzahl 255 in Hexadezimal um.", answer: "FF", answered: false },
    { question: "Wandle die Dezimalzahl 123 in Hexadezimal um.", answer: "7B", answered: false }
];

// Variable für den Timer
let timerInterval;
let elapsedTime = 0;


// Timer-Element im DOM
const timerElement = document.createElement('div');
timerElement.className = 'timer';
timerElement.textContent = `Zeit: 0s`;
document.body.appendChild(timerElement);

// sounds
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

// Themen mit Erklärungstexten
const topics = {
    "Dezimal zu Hexadezimal": "Eine Dezimalzahl wird durch wiederholtes Teilen durch 16 in eine Hexadezimalzahl umgewandelt. Die Reste ergeben von unten nach oben die Hexadezimaldarstellung.",
    "Binär zu Dezimal": "Eine Binärzahl wird durch Multiplikation jedes Bits mit der entsprechenden Potenz von 2 in eine Dezimalzahl umgewandelt.",
    "Hexadezimal zu Binär": "Jede Hexadezimalziffer wird in ihre entsprechende 4-Bit-Binärdarstellung umgewandelt."
};

// Funktion: Timer starten
function startTimer() {
    elapsedTime = 0; // Zeit auf 0 setzen
    updateTimerDisplay(); // Anzeige aktualisieren

    // Timer-Interval starten
    timerInterval = setInterval(() => {
        elapsedTime++;
        updateTimerDisplay();
    }, 1000);
}

// Funktion: Timer stoppen
function stopTimer() {
    clearInterval(timerInterval); // Timer-Interval stoppen
}

// Funktion: Timer-Anzeige aktualisieren
function updateTimerDisplay() {
    timerElement.textContent = `Zeit: ${elapsedTime}s`;
}

// Funktion: Aufgabe starten und Timer zurücksetzen
function startNewTask() {
    stopTimer(); // Aktuellen Timer stoppen
    startTimer(); // Neuen Timer starten

    // Zusätzliche Logik zum Laden der neuen Aufgabe kann hier eingefügt werden
}

// Funktion: Zeige den Lernmodus
function showLearnMode() {
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('learnMode').style.display = 'block';
    document.getElementById('topicDetail').style.display = 'none';
}

// Funktion: Zeige die Themenauswahl
function showInstruction() {
    document.getElementById('learnMode').style.display = 'none';
    document.getElementById('question').style.display = 'none';
    document.getElementById('topicDetail').style.display = 'none';
    document.getElementById('instruction').style.display = 'block';
}

// Funktion: Zeige die erste Aufgabe
function showQuestion() {
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('learnMode').style.display = 'none';
    document.getElementById('topicDetail').style.display = 'none';
    document.getElementById('question').style.display = 'block';

    startNewTask(); // Timer starten, sobald die Übungsaufgaben beginnen

}

// Funktion: Zeige spezifisches Thema
function showTopic(topic) {
    document.getElementById('learnMode').style.display = 'none';
    document.getElementById('topicDetail').style.display = 'block';
    document.getElementById('topicTitle').textContent = topic;
    document.getElementById('topicContent').textContent = topics[topic];
}

// Funktion: Überprüft die Antwort
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim().toUpperCase();

    if (userAnswer === tasks[currentLevel - 1].answer && !tasks[currentLevel - 1].answered) {
        document.getElementById('feedback').textContent = "Richtig!";
        document.getElementById('feedback').style.color = "green";
        document.getElementById('success-icon').style.display = "inline";
        document.getElementById('error-icon').style.display = "none";
        points += 10;
        tasks[currentLevel - 1].answered = true; // Verhindert erneutes Punktesammeln
        document.getElementById('points').textContent = points;
        correctSound.play(); // Erfolgssound abspielen

        stopTimer(); // Timer stoppen, wenn die Antwort richtig ist

        if (currentLevel < tasks.length) {
            document.getElementById('nextLevel').style.display = 'block';
        } else {
            document.getElementById('feedback').textContent += " Gratulation, du hast alle Aufgaben gelöst!";
        }
    } else if (userAnswer !== tasks[currentLevel - 1].answer) {
        document.getElementById('feedback').textContent = "Falsch, versuche es noch einmal.";
        document.getElementById('feedback').style.color = "red";
        document.getElementById('error-icon').style.display = "inline";
        document.getElementById('success-icon').style.display = "none";
        incorrectSound.play(); // Fehler-Sound abspielen
    } else {
        document.getElementById('feedback').textContent = "Du hast diese Aufgabe bereits richtig gelöst.";
        document.getElementById('feedback').style.color = "blue";
    }
}

// Funktion: Gehe zum nächsten Level
function nextLevel() {
    currentLevel++;
    if (currentLevel <= tasks.length) {
        document.getElementById('task').textContent = tasks[currentLevel - 1].question;
        document.getElementById('answer').value = "";
        document.getElementById('feedback').textContent = "";
        document.getElementById('nextLevel').style.display = 'none';
        startNewTask(); // Timer für die neue Aufgabe starten
    }
}

// Funktion: Beispieltext ein-/ausblenden
function toggleExample() {
    const exampleText = document.getElementById('exampleText');
    if (exampleText.style.display === 'none' || exampleText.style.display === '') {
        exampleText.style.display = 'block';
    } else {
        exampleText.style.display = 'none';
    }
}
