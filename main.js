// Variable für den aktuellen Punktestand
let punkte = 0;

// Variable für das aktuelle Level
let aktuellesLevel = 1;

// Die aktuelle zufällige Dezimalzahl, die generiert wurde
let aktuellesDezimal = 0;

// Zählt die bearbeiteten Aufgaben
let aufgabenzähler = 0;


// Timer-Element für die Zeitmessung
let zeitIntevall;
let abgelaufeneZeit = 0; // Speichert die abgelaufene Zeit in Sekunden

// Speichert den aktuellen Aufgabentyp (z. B. "Dezimal zu Hexadezimal")
let aktuellerAufgabentyp = null;

// Timer-Element im DOM, vorerst unsichtbar
const zeitElement = document.createElement('div');
zeitElement.className = 'timer';
zeitElement.textContent = `Zeit: 0s`;
zeitElement.style.cssText = 'display: none; visibility: hidden;'; // Sicherstellen, dass es unsichtbar ist

document.body.appendChild(zeitElement);

// Punktestand-Element im DOM erstellen, wenn es noch nicht existiert
if (!punkteElement) {
    punkteElement = document.createElement('div');
    punkteElement.className = 'punkte';
    punkteElement.textContent = `Punkte: ${punkte}`;
    punkteElement.style.cssText = 'display: none; visibility: hidden;';  // Unsichtbar, bis benötigt
    document.body.appendChild(punkteElement);
}

// Sound-Elemente für richtig und falsch
const richtigerSound = document.getElementById('richtigerSound');
const falscherSound = document.getElementById('falscherSound');

// Fortschritt für verschiedene Aufgabenarten (z. B. Dezimal zu Hexadezimal)
const aufgabenfortschritt = {
    dezimalZuHex: 0,  // Anzahl abgeschlossener Dezimal-zu-Hex-Aufgaben
    binärZuDezimal: 0,  // Anzahl abgeschlossener Binär-zu-Dezimal-Aufgaben
    // Weitere Aufgabenarten können hier ergänzt werden
};

function übungsmodusAnzeigen() {
    // Die Startseite ausblenden, da wir jetzt im Übungsmodus sind
    document.getElementById('anleitung').style.display = 'none';

    // Verstecke den Lernmodus und den Fragenbereich, um Platz für den Übungsmodus zu schaffen
    document.getElementById('lernmodus').style.display = 'none';
    document.getElementById('frage').style.display = 'none';

    // Zeige den Übungsmodus an
    document.getElementById('übungsmodus').style.display = 'block';

     // Verstecke den Zurück-zur-Übung-Button, falls er angezeigt wird
    const zurückZurÜbungButton = document.getElementById('zurückZurÜbungButton');
    if (zurückZurÜbungButton) {
        zurückZurÜbungButton.style.display = 'none';
    }

   // Blende den Hauptmenü-Button ein, damit der Nutzer zurück zum Hauptmenü gelangen kann
    const hauptmenüButton = document.getElementById('hauptmenüButton');
    if (hauptmenüButton) {
        hauptmenüButton.style.display = 'block';
        hauptmenüButton.style.visibility = 'visible';
    }
}


function übungAnzeigen(type) {
    // Übungsmodi ausblenden und Aufgabenbereich einblenden
    document.getElementById('übungsmodus').style.display = 'none';
    document.getElementById('frage').style.display = 'block';

    // Zurück-Button und Hauptmenü-Button sichtbar machen
    const zurückZurÜbungButton = document.getElementById('zurückZurÜbungButton');
    if (zurückZurÜbungButton) {
        zurückZurÜbungButton.style.display = 'block';
    }

    const hauptmenüButton = document.getElementById('hauptmenüButton');
    if (hauptmenüButton) {
        hauptmenüButton.style.display = 'block';
    }

    // Aufgabentyp festlegen
    if (type === 'Dezimal zu Hexadezimal') {
        aktuellerAufgabentyp = "dezimalZuHex"; // Setze den aktuellen Aufgabentyp
    } else if (type === 'Binär zu Dezimal') {
        aktuellerAufgabentyp = "binärZuDezimal"; // Setze den aktuellen Aufgabentyp
    } else {
        alert(`${type} ist noch nicht verfügbar. Bitte wähle eine andere Übung.`);
        return;
    }

    // Fortschritt zurücksetzen, falls alle Aufgaben abgeschlossen wurden
    if (aufgabenfortschritt[aktuellerAufgabentyp] >= 6) {
        aufgabenfortschritt[aktuellerAufgabentyp] = 0; // Fortschritt zurücksetzen
    }

    // Lade den aktuellen Fortschritt für die Übung
    aufgabenzähler = aufgabenfortschritt[aktuellerAufgabentyp] || 0;

    // Starte die erste Aufgabe für den ausgewählten Typ
    starteNeueAufgabe(aktuellerAufgabentyp);
}

function feedbackZurücksetzen() {
    // Feedback-Element im DOM finden
    const feedback = document.getElementById('feedback');
    if (feedback) {
        feedback.textContent = ""; // Feedback zurücksetzen
    }
}

function antwortfeldZurücksetzen() {
    // Eingabefeld im DOM finden
    const antwortfeld = document.getElementById('antwort');
    if (antwortfeld) {
        antwortfeld.value = ""; // Eingabefeld zurücksetzen
    }
}



// Funktion: Dezimalzahl in Hexadezimalzahl umwandeln
function dezimalZuHexaumwandeln(dezimalZahl) {
    // Ergebnis der Umwandlung
    let ergebnis = "";
    // Liste der Schritte für die Erklärung
    let schritte = [];

    // Solange die Zahl größer als 0 ist, weiter teilen
    while (dezimalZahl > 0) {
        const rest = dezimalZahl % 16; // Rest berechnen
        const hexadezimalziffeer = rest.toString(16).toUpperCase(); // Rest in Hexadezimal umwandeln
        schritte.push(`Teilen: ${dezimalZahl} ÷ 16 = ${Math.floor(dezimalZahl / 16)}, Rest: ${rest} (${hexadezimalziffeer})`);
        ergebnis = hexadezimalziffeer + ergebnis;
        dezimalZahl = Math.floor(dezimalZahl / 16);
    }
    // Hexadezimalziffer vorne anfügen
    schritte.push(`Ergebnis: ${ergebnis}`);
    // Dezimalzahl für die nächste Runde aktualisieren
    return { ergebnis, schritte };
}

// Funktion: Timer starten
function startTimer() {
    abgelaufeneZeit = 0; // Zeit auf 0 setzen
    timerAnzeigeAktualisieren(); // Anzeige aktualisieren

    zeitElement.style.display = 'block'; // Timer anzeigen
    zeitElement.style.visibility = 'visible';
    punkteElement.style.display = 'block'; // Punktestand anzeigen
    punkteElement.style.visibility = 'visible';

    // Timer-Interval starten
    zeitIntevall = setInterval(() => {
        abgelaufeneZeit++;
        timerAnzeigeAktualisieren();
    }, 1000);
}

// Funktion: Timer stoppen
function stopTimer() {
    clearInterval(zeitIntevall); // Timer-Interval stoppen
    //zeitElement.style.display = 'none'; // Timer ausblenden
    //zeitElement.style.visibility = 'hidden';
    //punkteElement.style.display = 'none'; // Punktestand ausblenden
    //punkteElement.style.visibility = 'hidden';
}

// Funktion: Timer-Anzeige aktualisieren
function timerAnzeigeAktualisieren() {
    zeitElement.textContent = `Zeit: ${abgelaufeneZeit}s`;
}

// Funktion: Aufgabe starten und Timer zurücksetzen
function starteNeueAufgabe(aufgabentyp) {
    stopTimer(); // Aktuellen Timer stoppen
    startTimer(); // Neuen Timer starten

    // Hauptmenü-Button sichtbar machen
    const hauptmenüButton = document.getElementById('hauptmenüButton');
    if (hauptmenüButton) {
        hauptmenüButton.style.display = 'block'; // Button einblenden
        hauptmenüButton.style.visibility = 'visible'; // Falls notwendig
    }

    // Notizbox zurücksetzen
    const notizblock = document.getElementById('notizblock');
    if (notizblock) {
        notizblock.value = ""; // Inhalt der Notizbox löschen
    }

    // Variablen zur Benennung der Aufgabe
    let aufgabenblock = 1; // 1 für erste Gruppe, 2 für zweite Gruppe
    let aufgabenkennzeichen = ""; // Buchstabe a, b oder c
    let aufgabeninhalt = ""; // Aufgabenbeschreibung
    let generierterWert = ""; // Generierter Wert (Dezimal oder Binär)

    // Aufgabe basierend auf Typ generieren
    if (aufgabenzähler < 3) {
        if (aufgabentyp === "dezimalZuHex") {
            generierterWert = Math.floor(Math.random() * 99) + 1; // Dezimalzahl (1 bis 99)
            aufgabeninhalt = `Wandle die Dezimalzahl (${generierterWert}) in Hexadezimal um.`;
        } else if (aufgabentyp === "binärZuDezimal") {
            const dezimalzahlWert = Math.floor(Math.random() * 99) + 1; // Dezimalwert (1 bis 99)
            generierterWert = dezimalzahlWert.toString(2); // In Binär umwandeln
            aufgabeninhalt = `Wandle die Binärzahl (${generierterWert}) in eine Dezimalzahl um.`;
        }
        aufgabenblock = 1;
        aufgabenkennzeichen = String.fromCharCode(96 + (aufgabenzähler % 3) + 1); // Generiert a, b, c
    } else if (aufgabenzähler < 6) {
        if (aufgabentyp === "dezimalZuHex") {
            generierterWert = Math.floor(Math.random() * 900) + 100; // Dezimalzahl (100 bis 999)
            aufgabeninhalt = `Wandle die Dezimalzahl (${generierterWert}) in Hexadezimal um.`;
        } else if (aufgabentyp === "binärZuDezimal") {
            const dezimalzahlWert = Math.floor(Math.random() * 900) + 100; // Dezimalwert (100 bis 999)
            generierterWert = dezimalzahlWert.toString(2); // In Binär umwandeln
            aufgabeninhalt = `Wandle die Binärzahl (${generierterWert}) in eine Dezimalzahl um.`;
        }
        aufgabenblock = 2;
        aufgabenkennzeichen = String.fromCharCode(96 + ((aufgabenzähler - 3) % 3) + 1); // Generiert a, b, c
    } else {
        // Nach 6 Aufgaben: Hauptmenü anzeigen
        const feedback = document.getElementById('feedback');
        if (feedback) {
            feedback.textContent = "Herzlichen Glückwunsch, du hast alle Aufgaben abgeschlossen!";
            feedback.style.color = "green";
        }
        anleitungAnzeigen(); // Zurück zum Hauptmenü
        aufgabenzähler = 0; // Zähler zurücksetzen für neue Runde
        return;
    }

    // Speichern des generierten Werts
    if (aufgabentyp === "dezimalZuHex") {
        aktuellesDezimal = generierterWert;
    } else if (aufgabentyp === "binärZuDezimal") {
        currentbinär = generierterWert;
    }

    // Button für nächste Aufgabe ausblenden
    const nächstesLevelButton = document.getElementById('nächstesLevel');
    if (nächstesLevelButton) {
        nächstesLevelButton.style.display = 'none'; // Ausblenden
    }

    // Überschrift mit Aufgabe aktualisieren
    const überschrift = document.getElementById('aufgabenüberschrift'); // Überschrift-Element
    if (überschrift) {
        überschrift.textContent = `Aufgabe ${aufgabenblock}${aufgabenkennzeichen}`; // Aufgabe 1a, 1b, etc.
    }

    // Aufgabe anzeigen
    const aufgaben = document.getElementById('aufgaben');
    if (aufgaben) {
        aufgaben.textContent = aufgabeninhalt; // Zeige die korrekte Aufgabenbeschreibung an
    }

    // Schritte zurücksetzen
    const schritteElement = document.getElementById('schritte');
    if (schritteElement) {
        schritteElement.innerHTML = "";
    }

    // Feedback zurücksetzen
    feedbackZurücksetzen();

    // Beispieltext ausblenden
    const beispielText = document.getElementById('beispielText');
    if (beispielText) {
        beispielText.style.display = 'none';
    }

    // Eingabefeld leeren
    antwortfeldZurücksetzen();
}

// Funktion zur Generierung einer Binärzahl
function zufallsbinärgenerieren(länge) {
    let binär = "";
    for (let i = 0; i < länge; i++) {
        binär += Math.floor(Math.random() * 2); // Zufällige 0 oder 1
    }
    return binär;
}



// Funktion: Zeige den Lernmodus
function lernmodusAnzeigen() {

    // Alle nicht benötigten Bereiche ausblenden
    document.getElementById('anleitung').style.display = 'none'; // Startseite ausblenden
    document.getElementById('frage').style.display = 'none'; // Aufgabenbereich ausblenden

     // Alle Themenbereiche ausblenden
     document.getElementById('dezimalZuHexaDefinition').style.display = 'none';
     document.getElementById('binärZuDezimalDefinition').style.display = 'none';

    // Themenbereich anzeigen
    document.getElementById('lernmodus').style.display = 'block';

    // Hauptmenü-Button sichtbar machen
    const hauptmenüButton = document.getElementById('hauptmenüButton');
    if (hauptmenüButton) {
        hauptmenüButton.style.display = 'block';
        hauptmenüButton.style.visibility = 'visible'; // Falls visibility hidden ist
    }
}

// Funktion: Hauptmenü anzeigen
function anleitungAnzeigen() {

    // Bereiche ausblenden, die nicht zum Hauptmenü gehören
    document.getElementById('lernmodus').style.display = 'none';
    document.getElementById('frage').style.display = 'none';
    document.getElementById('übungsmodus').style.display = 'none';

    // Zurück-zu-Übungsaufgaben-Button ausblenden
    const zurückZurÜbungButton = document.getElementById('zurückZurÜbungButton');
    if (zurückZurÜbungButton) {
        zurückZurÜbungButton.style.display = 'none';
    }


    // Hauptmenü anzeigen
    document.getElementById('anleitung').style.display = 'block';

    // Hauptmenü-Button ausblenden (weil wir bereits im Hauptmenü sind)
    const hauptmenüButton = document.getElementById('hauptmenüButton');
    if (hauptmenüButton) {
        hauptmenüButton.classList.remove('visible'); // Klasse entfernen
    }


    // Timer stoppen und zurücksetzen
    stopTimer();
    abgelaufeneZeit = 0;
    timerAnzeigeAktualisieren();

    //timer ausblenden
    zeitElement.style.display = "none";
    zeitElement.style.visibility = "hidden";

    // Punkteanzeige ausblenden
    punkteElement.style.display = 'none';
    punkteElement.style.visibility = 'hidden';

    // Notizbox leeren
    const notizblock = document.getElementById('notizblock');
    if (notizblock) {
        notizblock.value = ""; // Notizbox-Inhalt zurücksetzen
    }

}

// Funktion: Zeige die erste Aufgabe
function frageAnzeigen() {
    document.getElementById('anleitung').style.display = 'none'; // ausblenden
    document.getElementById('lernmodus').style.display = 'none'; //ausblenden

    document.getElementById('frage').style.display = 'block'; // frage einblenden
    document.getElementById('hauptmenüButton').style.display = 'block'; // Hauptmenü-Button anzeigen


    // Hauptmenü-Button sichtbar machen
    const hauptmenüButton = document.getElementById('hauptmenüButton');
    if (hauptmenüButton) {
        hauptmenüButton.style.display = 'block'; // Button einblenden
        hauptmenüButton.style.visibility = 'visible'; // Falls visibility hidden aktiv ist
    }

    starteNeueAufgabe(); // Timer starten, sobald die Übungsaufgaben beginnen

}

// Funktion: Zeige spezifisches Thema
function themaAnzeigen(thema) {
       // Alle Themenbereiche ausblenden
       document.getElementById('dezimalZuHexaDefinition').style.display = 'none';
       document.getElementById('binärZuDezimalDefinition').style.display = 'none';
       //document.getElementById('hexTodezimalZahlDefinition').style.display = 'none'; // Neu hinzugefügt
   
       // Themenbereich anzeigen basierend auf dem Thema
       if (thema === "Dezimal zu Hexadezimal") {
           document.getElementById('dezimalZuHexaDefinition').style.display = 'block';
        } else if (thema === "Binär zu Dezimal") {
              document.getElementById('binärZuDezimalDefinition').style.display = 'block';
       //} else if (thema === "Hexadezimal zu Dezimal") { // Neu hinzugefügt
         //  document.getElementById('hexTodezimalZahlDefinition').style.display = 'block';
       } else {
           console.error(`Unbekanntes Thema: "${thema}"`);
           return; // Beende die Funktion, wenn das Thema nicht existiert
       }
   
       // Hauptmenü und andere Bereiche ausblenden
       document.getElementById('lernmodus').style.display = 'none';
       document.getElementById('anleitung').style.display = 'none';
   
       // Punktestand ausblenden
       if (punkteElement) {
           punkteElement.style.display = 'none';
           punkteElement.style.visibility = 'hidden';
       }
   }



// Funktion: Überprüft die Antwort
function antwortÜberprüfen(aufgabentyp) {
    const userantwort = document.getElementById('antwort').value.trim().toUpperCase();
    let richtigeAntwort = "";
    let aufgabenbeschreibung = "";

    // Korrekte Antwort und Aufgabenbeschreibung basierend auf aufgabentyp festlegen
    if (aufgabentyp === "dezimalZuHex") {
        richtigeAntwort = dezimalZuHexaumwandeln(aktuellesDezimal).ergebnis;
        aufgabenbeschreibung = "Wandle die Dezimalzahl in eine Hexadezimalzahl um.";
    } else if (aufgabentyp === "binärZuDezimal") {
        richtigeAntwort = parseInt(currentbinär, 2).toString(); // Binär zu Dezimal
        aufgabenbeschreibung = "Wandle die Binärzahl in eine Dezimalzahl um.";
    } else {
        console.error("Ungültiger Aufgabentyp:", aufgabentyp);
        return;
    }

    const nächstesLevelButton = document.getElementById('nächstesLevel');

    // Prüfen, ob die Aufgabe bereits gelöst wurde
    if (userantwort === richtigeAntwort && nächstesLevelButton.style.display === 'block') {
        document.getElementById('feedback').textContent = "Du hast diese Aufgabe bereits richtig gelöst.";
        document.getElementById('feedback').style.color = "blue";
        return;
    }

    // Prüfen, ob die Antwort korrekt ist
    if (userantwort === richtigeAntwort) {
        document.getElementById('feedback').textContent = "Richtig!";
        document.getElementById('feedback').style.color = "green";

        document.getElementById('success-icon').style.display = "inline";
        document.getElementById('error-icon').style.display = "none";

        punkte += 10; // Punkte hinzufügen

        // Punkteanzeige sichtbar machen
        if (punkteElement) {
            punkteElement.style.display = 'block';
            punkteElement.style.visibility = 'visible';
            punkteElement.textContent = `Punkte: ${punkte}`;
        }

        // Timer sichtbar machen
        if (zeitElement) {
            zeitElement.style.display = 'block';
            zeitElement.style.visibility = 'visible';
        }

        richtigerSound.play(); // Erfolgssound abspielen

        stopTimer(); // Timer stoppen, wenn die Antwort richtig ist

        // Button für nächste Aufgabe anzeigen
        if (nächstesLevelButton) {
            nächstesLevelButton.style.display = 'block'; // Sichtbar machen
        }

        // aufgabenzähler hochzählen und prüfen, ob alle Aufgaben abgeschlossen sind
        aufgabenzähler++;

        // Buchstaben für aktuelle Aufgabe berechnen (a, b, c)
        let aufgabenblock = aufgabenzähler <= 3 ? 1 : 2; // Gruppe 1 (erste 3 Aufgaben), Gruppe 2 (nächste 3)
        let aufgabenkennzeichen = String.fromCharCode(96 + ((aufgabenzähler - 1) % 3) + 1);

        // Überschrift für die nächste Aufgabe anzeigen
        const überschrift = document.getElementById('aufgabenüberschrift');
        if (überschrift) {
            überschrift.textContent = `Aufgabe ${aufgabenblock}${aufgabenkennzeichen}`;
        }

        if (aufgabenzähler >= 6) {
            alert("Du hast alle Aufgaben abgeschlossen!");
            anleitungAnzeigen(); // Zurück zum Hauptmenü
            aufgabenzähler = 0; // Zähler zurücksetzen für neue Runde
        }
    } else {
        // Antwort ist falsch
        document.getElementById('feedback').textContent = "Falsch, versuche es noch einmal.";
        document.getElementById('feedback').style.color = "red";
        document.getElementById('error-icon').style.display = "inline";
        document.getElementById('success-icon').style.display = "none";

        falscherSound.play(); // Fehler-Sound abspielen
    }
}

// Funktion: Gehe zum nächsten Level
function nächstesLevel() {
    // Überprüfen, ob der aktuelle Aufgabentyp gesetzt ist
    if (!aktuellerAufgabentyp) {
        console.error("Kein Aufgabentyp definiert. Bitte wähle eine Übungsart aus.");
        return;
    }

    // Feedback und Eingabefelder zurücksetzen
    feedbackZurücksetzen();
    antwortfeldZurücksetzen();
    // Prüfen, ob alle Aufgaben abgeschlossen sind
    if (aufgabenzähler >= 6) {
        alert("Du hast alle Aufgaben abgeschlossen!");
        aufgabenfortschritt[aktuellerAufgabentyp] = 0; // Fortschritt für das aktuelle Thema zurücksetzen
        aufgabenzähler = 0; // Zähler zurücksetzen
        übungsmodusAnzeigen(); // Zurück zur Übungsmodi-Auswahl
        return;
    }

    // Speichere den Fortschritt für das aktuelle Thema
    aufgabenfortschritt[aktuellerAufgabentyp] = aufgabenzähler;

    // Starte die nächste Aufgabe
    starteNeueAufgabe(aktuellerAufgabentyp);

    // Button für nächste Aufgabe ausblenden
    const nächstesLevelButton = document.getElementById('nächstesLevel');
    if (nächstesLevelButton) {
        nächstesLevelButton.style.display = 'none';
    }
}

// Funktion: Beispieltext ein-/ausblenden
function beispielUmschalten() {
    const beispielText = document.getElementById('beispielText');
    if (beispielText.style.display === 'none' || beispielText.style.display === '') {
        // Aktualisiere den Beispieltext
        beispielText.innerHTML = `2023 ÷ 16 = 126 Rest 7<br>
126 ÷ 16 = 7 Rest 14 (E)<br>
7 ÷ 16 = 0 Rest 7<br>
Hexadezimal: 7E7`;

        // Text anzeigen
        beispielText.style.display = 'block';
    } else {
        // Text ausblenden
        beispielText.style.display = 'none';
    }
}

// punktestand wird von css beeinflusst und wird dadurch trotzdem am anfang angezeigt
// durch die funktion, wird punktestand ausgeblendet
window.onload = () => {
    document.getElementById('anleitung').style.display = 'block';
    punkteElement.style.display = 'none';
    punkteElement.style.visibility = 'hidden';
};

