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

function clearFeedback() {
    const feedback = document.getElementById('feedback');
    if (feedback) {
        feedback.textContent = ""; // Feedback zurücksetzen
    }
}

function clearAnswerField() {
    const answerField = document.getElementById('answer');
    if (answerField) {
        answerField.value = ""; // Eingabefeld zurücksetzen
    }
}


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

    // Button für nächste Aufgabe ausblenden
    const nextLevelButton = document.getElementById('nextLevel');
    if (nextLevelButton) {
        nextLevelButton.style.display = 'none'; // Ausblenden
    }

    // Zufällige Dezimalzahl generieren
    currentDecimal = Math.floor(Math.random() * 99) + 1;

    // Aufgabe anzeigen
    const taskElement = document.getElementById('task');
    if (taskElement) {
        taskElement.textContent = `Wandle die Dezimalzahl ${currentDecimal} in Hexadezimal um.`;
    }

    // Schritte zurücksetzen
    const stepsElement = document.getElementById('steps');
    if (stepsElement) {
        stepsElement.innerHTML = "";
    }

     // Feedback zurücksetzen
     clearFeedback();

     // Beispieltext ausblenden
     const exampleText = document.getElementById('exampleText');
     if (exampleText) {
         exampleText.style.display = 'none';
     }
 
    // Eingabefeld leeren
    clearAnswerField();
}

// Funktion: Zeige den Lernmodus
function showLearnMode() {
    document.getElementById('instruction').style.display = 'none'; // Startseite ausblenden
    document.getElementById('question').style.display = 'none'; // Aufgabenbereich ausblenden
    document.getElementById('topicDetail').style.display = 'none'; // Thema-Details ausblenden
    document.getElementById('learnMode').style.display = 'block'; // Themen anzeigen
    document.getElementById('mainMenuButton').style.display = 'block'; // Hauptmenü-Button anzeigen
}

// Funktion: Hauptmenü anzeigen
function showInstruction() {
    
   // Bereiche ausblenden, die nicht zum Hauptmenü gehören
   document.getElementById('learnMode').style.display = 'none';
   document.getElementById('question').style.display = 'none';
   document.getElementById('topicDetail').style.display = 'none';

   // Hauptmenü anzeigen
   document.getElementById('instruction').style.display = 'block';

   // Hauptmenü-Button ausblenden
   document.getElementById('mainMenuButton').style.display = 'none';

   // Timer stoppen und zurücksetzen
   stopTimer();
   elapsedTime = 0;
   updateTimerDisplay();

   // Punkteanzeige ausblenden
   pointsElement.style.display = 'none';
   pointsElement.style.visibility = 'hidden';
}

// Funktion: Zeige die erste Aufgabe
function showQuestion() {
    document.getElementById('instruction').style.display = 'none'; // ausblenden
    document.getElementById('learnMode').style.display = 'none'; //ausblenden
    document.getElementById('topicDetail').style.display = 'none'; //ausblenden

    document.getElementById('question').style.display = 'block'; // frage einblenden
    document.getElementById('mainMenuButton').style.display = 'block'; // Hauptmenü-Button anzeigen

    startNewTask(); // Timer starten, sobald die Übungsaufgaben beginnen

}

// Funktion: Zeige spezifisches Thema
function showTopic(topic) {
    const topicDetail = document.getElementById('topicDetail');
    const topicTitle = document.getElementById('topicTitle');
    const topicContent = document.getElementById('topicContent');
    const learnMode = document.getElementById('learnMode'); // Bereich mit Themen-Buttons
    const instruction = document.getElementById('instruction'); // Bereich mit "Themen" und "Aufgaben"

    if (topicDetail && topicTitle && topicContent && learnMode && instruction) {
        // Thema anzeigen
        topicDetail.style.display = 'block'; // Bereich mit Inhalt anzeigen
        topicTitle.textContent = topic; // Titel setzen
        if (topics[topic]) {
            topicContent.innerHTML = topics[topic]; // Inhalt aus 'topics' einfügen
        } else {
            topicContent.innerHTML = "Keine Inhalte für dieses Thema verfügbar."; // Fallback
        }

        // Bereiche und Buttons ausblenden
        learnMode.style.display = 'none'; // Themen-Buttons ausblenden
        instruction.style.display = 'none'; // "Themen" und "Aufgaben" ausblenden
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
    const nextLevelButton = document.getElementById('nextLevel');

    // Prüfen, ob die Aufgabe bereits gelöst wurde
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

        // Button für nächste Aufgabe anzeigen
        if (nextLevelButton) {
            nextLevelButton.style.display = 'block'; // Sichtbar machen
        }
    } else {
        // Antwort ist falsch
        document.getElementById('feedback').textContent = "Falsch, versuche es noch einmal.";
        document.getElementById('feedback').style.color = "red";
        document.getElementById('error-icon').style.display = "inline";
        document.getElementById('success-icon').style.display = "none";
        incorrectSound.play(); // Fehler-Sound abspielen
    }

    // Sicherstellen, dass Punkte und Timer sichtbar bleiben
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.style.display = 'block';
    }
    const pointsElement = document.getElementById('points');
    if (pointsElement) {
        pointsElement.style.display = 'block';
    }
}

// Funktion: Gehe zum nächsten Level
function nextLevel() {
    clearFeedback();
    clearAnswerField();
    startNewTask(); // Timer zurücksetzen und neue Aufgabe generieren
    const nextLevelButton = document.getElementById('nextLevel');
    if (nextLevelButton) {
        nextLevelButton.style.display = 'none';
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
    document.getElementById('instruction').style.display = 'block';
    pointsElement.style.display = 'none';
    pointsElement.style.visibility = 'hidden';
};

