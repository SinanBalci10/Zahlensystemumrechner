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
timerElement.style.cssText = 'display: none; visibility: hidden;'; // Sicherstellen, dass es unsichtbar ist
document.body.appendChild(timerElement);

// Punktestand-Element im DOM, Punktestand-Element im DOM, nur erstellen, wenn es noch nicht existiert
let pointsElement = document.querySelector('.points');
if (!pointsElement) {
    pointsElement = document.createElement('div');
    pointsElement.className = 'points';
    pointsElement.textContent = `Punkte: ${points}`;
    pointsElement.style.cssText = 'display: none; visibility: hidden;'; // Standardmäßig unsichtbar
    document.body.appendChild(pointsElement);
}

// sounds
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

// Themen mit Erklärungstexten
const topics = {
    "Dezimal zu Hexadezimal": `<p>Eine Dezimalzahl ist eine Zahl im Zehnersystem (Basis 10),
    während eine Hexadezimalzahl im Sechzehnersystem (Basis 16) dargestellt wird.</p>
    <p>Die Umwandlung von einer Dezimalzahl in eine Hexadezimalzahl erfolgt durch
    wiederholte Division der Zahl durch 16, wobei die Reste notiert werden.
    Hexadezimalzahl (auch Basis-16) ist eine Zahl, die 16 verschiedene Ziffern
    verwendet: 0-9 und A-F (wobei A=10, B=11, ..., F=15 entspricht).</p>
    <p>Diese Reste, von unten nach oben gelesen, ergeben die Hexadezimaldarstellung.</p>

    <h3>Beispiel:</h3>

    <p>Um die Dezimalzahl 5078 in eine Hexadezimalzahl umzuwandeln:</p>

    <ol>
        <li>5078 ÷ 16 ergibt einen Quotienten von 317 und einen Rest von 6.</li>
        <li>317 ÷ 16 ergibt einen Quotienten von 19 und einen Rest von 13 (entspricht D
           im Hexadezimalsystem).</li>
        <li>19 ÷ 16 ergibt einen Quotienten von 1 und einen Rest von 3.</li>
        <li>1 ÷ 16 ergibt einen Quotienten von 0 und einen Rest von 1.</li>
    </ol>

    <h3>Reste ermitteln:</h3>

    <p>Wenn man sich als Beispiel 1. anguckt, schreibt man statt "÷" ein "-".
    Multipliziere dann mit dem Ergebnis, also:</p>
    <p>5078 - 16 * 317 = 6</p>
    <p>usw.</p>

    <p>Die Reste, von unten nach oben gelesen, sind 1, 3, D und 6.
    Daher ist die Hexadezimaldarstellung von 5078 gleich 13D6.</p>`,


    
    "Binär zu Dezimal": "Eine Binärzahl wird durch Multiplikation jedes Bits mit der entsprechenden Potenz von 2 in eine Dezimalzahl umgewandelt.",
    "Hexadezimal zu Binär": "Jede Hexadezimalziffer wird in ihre entsprechende 4-Bit-Binärdarstellung umgewandelt."
};

// Funktion: Timer starten
function startTimer() {
    elapsedTime = 0; // Zeit auf 0 setzen
    updateTimerDisplay(); // Anzeige aktualisieren

    timerElement.style.display = 'block'; // Timer anzeigen
    timerElement.style.visibility = 'visible';
    pointsElement.style.display = 'block'; // Punktestand anzeigen
    pointsElement.style.visibility = 'visible';

    // Timer-Interval starten
    timerInterval = setInterval(() => {
        elapsedTime++;
        updateTimerDisplay();
    }, 1000);
}

// Funktion: Timer stoppen
function stopTimer() {
    clearInterval(timerInterval); // Timer-Interval stoppen
    timerElement.style.display = 'none'; // Timer ausblenden
    timerElement.style.visibility = 'hidden';
    pointsElement.style.display = 'none'; // Punktestand ausblenden
    pointsElement.style.visibility = 'hidden';
}

// Funktion: Timer-Anzeige aktualisieren
function updateTimerDisplay() {
    timerElement.textContent = `Zeit: ${elapsedTime}s`;
}

// Funktion: Aufgabe starten und Timer zurücksetzen
function startNewTask() {
    stopTimer(); // Aktuellen Timer stoppen
    startTimer(); // Neuen Timer starten

    // Beispieltext ausblenden, wenn nächstes level
    document.getElementById('exampleText').style.display = 'none';
}

// Funktion: Zeige den Lernmodus
function showLearnMode() {
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('learnMode').style.display = 'block';
    document.getElementById('topicDetail').style.display = 'none';
}

// Funktion: Hauptmenü anzeigen
function showInstruction() {
    document.getElementById('learnMode').style.display = 'none';
    document.getElementById('question').style.display = 'none';
    document.getElementById('topicDetail').style.display = 'none';
    document.getElementById('instruction').style.display = 'block';

    stopTimer(); // Timer stoppen
    elapsedTime = 0; // Zeit zurücksetzen
    updateTimerDisplay(); // Anzeige auf 0 setzen

    // Punkte ebenfalls ausblenden, wenn ins Hauptmenü gewechselt wird
    pointsElement.style.display = 'none';
    pointsElement.style.visibility = 'hidden';
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
    document.getElementById('learnMode').style.display = 'none'; // Lernmodus ausblenden
    const topicDetail = document.getElementById('topicDetail');
    if (topicDetail) {
        topicDetail.style.display = 'block'; // Bereich anzeigen
    }
    const topicTitle = document.getElementById('topicTitle');
    if (topicTitle) {
        topicTitle.textContent = topic; // Titel aktualisieren
    }
    const topicContent = document.getElementById('topicContent');
    if (topicContent) {
        topicContent.innerHTML = topics[topic]; // Inhalte einfügen
    } else {
        console.error("Das Element mit der ID 'topicContent' wurde nicht gefunden.");
    }

    pointsElement.style.display = 'none'; // Punktestand ausblenden, wenn ein Thema angezeigt wird
    pointsElement.style.visibility = 'hidden';

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

window.onload = () => {
    pointsElement.style.display = 'none';
    pointsElement.style.visibility = 'hidden';
};
