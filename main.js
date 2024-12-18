
// Punktestand-Variable
let points = 0;
let currentLevel = 1;
let tasks = [
    { question: "Wandle die Dezimalzahl 26 in Hexadezimal um.", answer: "1A", answered: false },
    { question: "Wandle die Dezimalzahl 255 in Hexadezimal um.", answer: "FF", answered: false },
    { question: "Wandle die Dezimalzahl 123 in Hexadezimal um.", answer: "7B", answered: false }
];


// sounds
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

// Funktion: Zeige die erste Aufgabe
function showQuestion() {
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('question').style.display = 'block';
}

// Funktion: Überprüft die Antwort
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim().toUpperCase();+

    // Debug-Ausgaben hinzufügen
    console.log("Current Level:", currentLevel);
    console.log("Task Object:", tasks[currentLevel - 1]);


    if (userAnswer === tasks[currentLevel - 1].answer && !tasks[currentLevel - 1].answered) {
        document.getElementById('feedback').textContent = "Richtig!";
        document.getElementById('feedback').style.color = "green";
        points += 10;
        tasks[currentLevel - 1].answered = true; // Verhindert erneutes Punktesammeln
        document.getElementById('points').textContent = points;
        correctSound.play(); // Erfolgssound abspielen

        if (currentLevel < tasks.length) {
            document.getElementById('nextLevel').style.display = 'block';
        } else {
            document.getElementById('feedback').textContent += " Gratulation, du hast alle Aufgaben gelöst!";
        }
    } else if (userAnswer !== tasks[currentLevel - 1].answer) {
        document.getElementById('feedback').textContent = "Falsch, versuche es noch einmal.";
        document.getElementById('feedback').style.color = "red";
        incorrectSound.play(); // Fehler-Sound abspielen
    } else {
        document.getElementById('feedback').textContent = "Du hast diese Aufgabe bereits richtig gelöst.";
        document.getElementById('feedback').style.color = "blue";
    }
}
//tes
// Funktion: Gehe zum nächsten Level
function nextLevel() {
    currentLevel++;
    if (currentLevel <= tasks.length) {
        document.getElementById('task').textContent = tasks[currentLevel - 1].question;
        document.getElementById('answer').value = "";
        document.getElementById('feedback').textContent = "";
        document.getElementById('nextLevel').style.display = 'none';
    }

}