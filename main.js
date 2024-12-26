// Punktestand-Variable
let points = 0;
let currentLevel = 1;
let currentDecimal = 0; // Aktuelle Zufallszahl


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
let pointsElement = document.querySelector('.points');f
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



// Funktion: Dezimalzahl in Hexadezimalzahl umwandeln
function convertDecimalToHex(decimal) {
    let result = "";
    let steps = [];
    while (decimal > 0) {
        const remainder = decimal % 16;
        const hexDigit = remainder.toString(16).toUpperCase();
        steps.push(`Teilen: ${decimal} ÷ 16 = ${Math.floor(decimal / 16)}, Rest: ${remainder} (${hexDigit})`);
        result = hexDigit + result;
        decimal = Math.floor(decimal / 16);
    }
    steps.push(`Ergebnis: ${result}`);
    return { result, steps };
}

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

    // Zufällige Dezimalzahl generieren
    currentDecimal = Math.floor(Math.random() * 99) + 1;

    // Beispieltext ausblenden
    const exampleText = document.getElementById('exampleText');
    if (exampleText) {
        exampleText.style.display = 'none';
    }

    // Aufgabe anzeigen
    document.getElementById('task').textContent = `Wandle die Dezimalzahl ${currentDecimal} in Hexadezimal um.`;
    document.getElementById('steps').innerHTML = ""; // Schritte zurücksetzen
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
    const topicDetail = document.getElementById('topicDetail');
    const topicTitle = document.getElementById('topicTitle');
    const topicContent = document.getElementById('topicContent');

    console.log("Thema:", topic);
    console.log("Inhalt gefunden:", topics[topic]);

    if (topicDetail && topicTitle && topicContent) {
        topicDetail.style.display = 'block'; // Bereich anzeigen
        topicTitle.textContent = topic; // Titel setzen
        if (topics[topic]) {
            topicContent.innerHTML = topics[topic]; // Text aus 'topics' einfügen
        } else {
            topicContent.innerHTML = "Keine Inhalte für dieses Thema verfügbar."; // Fallback
        }
    } else {
        console.error("Ein erforderliches Element fehlt in der HTML-Struktur.");
    }

    pointsElement.style.display = 'none'; // Punktestand ausblenden, wenn ein Thema angezeigt wird
    pointsElement.style.visibility = 'hidden';

}


// Funktion: Überprüft die Antwort
function checkAnswer() {
        const userAnswer = document.getElementById('answer').value.trim().toUpperCase();
        const correctAnswer = convertDecimalToHex(currentDecimal).result;
    
        // Prüfen, ob die Aufgabe bereits gelöst wurde
        const nextLevelButton = document.getElementById('nextLevel');
        if (userAnswer === correctAnswer && nextLevelButton.style.display === 'block') {
            document.getElementById('feedback').textContent = "Du hast diese Aufgabe bereits richtig gelöst.";
            document.getElementById('feedback').style.color = "blue";
            return;
        }
    
        // Prüfen, ob die Antwort korrekt ist
        if (userAnswer === correctAnswer) {
            document.getElementById('feedback').textContent = "Richtig!";
            document.getElementById('feedback').style.color = "green";
            document.getElementById('success-icon').style.display = "inline";
            document.getElementById('error-icon').style.display = "none";
            points += 10; // Punkte hinzufügen
            pointsElement.textContent = `Punkte: ${points}`; // Punktestand aktualisieren
            correctSound.play(); // Erfolgssound abspielen
    
            stopTimer(); // Timer stoppen, wenn die Antwort richtig ist
    
            // Nächstes Level anzeigen
            nextLevelButton.style.display = 'block';
        } else {
            // Antwort ist falsch
            document.getElementById('feedback').textContent = "Falsch, versuche es noch einmal.";
            document.getElementById('feedback').style.color = "red";
            document.getElementById('error-icon').style.display = "inline";
            document.getElementById('success-icon').style.display = "none";
            incorrectSound.play(); // Fehler-Sound abspielen
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

// punktestand wird von css beeinflusst und wird dadurch trotzdem am anfang angezeigt
// durch die funktion, wird punktestand ausgeblendet
window.onload = () => {
    pointsElement.style.display = 'none';
    pointsElement.style.visibility = 'hidden';
};

