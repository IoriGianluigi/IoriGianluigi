var vDomande = [
    {
        question: "Il comando ping viene utilizzato per:",
        options: [
            "Verificare la connettività di rete",
            "Invio di dati tramite la rete",
            "Configurare un router"
        ],
        correctAnswer: "Verificare la connettività di rete"
    },
    {
        question: "ICMP sta per:",
        options: [
            "Internet Control Management Protocol",
            "Internet Control Message Protocol", 
            "Internet Connection Management Protocol"
        ],
        correctAnswer: "Internet Control Message Protocol"
    },
    {
        question: "Quale tipo di messaggio ICMP viene utilizzato per indicare che un percorso è troppo lungo per essere completato?",
        options: [
            "Echo Request",
            "Destination Unreachable", 
            "Time Exceeded"
        ],
        correctAnswer: "Time Exceeded"
    },
    {
        question: "Qual è il significato del tempo di risposta visualizzato nel risultato di un ping?",
        options: [
            "La velocità della connessione di upload",
            "Il tempo impiegato per inviare un pacchetto alla destinazione e ricevere una risposta",
            "Il tempo totale di attività di rete"
        ],
        correctAnswer: "Il tempo impiegato per inviare un pacchetto alla destinazione e ricevere una risposta"
    },
    {
        question: "Qual è il numero massimo di hop che può essere specificato con il comando ping?",
        options: ["256", "128", "Non c'è un limite"],
        correctAnswer: "128"
    },
    {
        question: "Cosa significa 'TTL exceeded' nel risultato di un ping?",
        options: [
            "Il pacchetto ICMP ha superato il tempo massimo di vita (TTL) prima di raggiungere la destinazione.", 
            "La destinazione non è raggiungibile.", 
            "Il pacchetto ICMP è stato perso durante il trasferimento."
        ],
        correctAnswer: "Il pacchetto ICMP ha superato il tempo massimo di vita (TTL) prima di raggiungere la destinazione."
    },
    {
        question: "Qual è l'intervallo di tempo predefinito tra i pacchetti ICMP inviati da un comando ping?",
        options: [
            "1 secondo", 
            "5 secondi", 
            "10 secondi"
        ],
        correctAnswer: "1 secondo"
    }
];

var domanda;
var punteggio;
var rispostaData = false; // Flag per controllare se è stata data una risposta

$(document).ready(function() {
    $("#start-game").click(function() {
        domanda = 0;
        punteggio = 0;
        $(".hero").hide();
        $(".game-container").show();
        caricaDomanda();
    });

    $("#avanti").click(function() {
        if (!rispostaData) { // Verifica se è stata data una risposta
            return; // Esce se non è stata data una risposta
        }

        domanda++;
        rispostaData = false; // Ripristina il flag di risposta dopo aver avanzato alla prossima domanda

        if (domanda < vDomande.length) {
            caricaDomanda();
        } else {
            $(".hero").show();
            $(".game-container").hide();
            if (punteggio >= ((vDomande.length/10)*6)) {
                $("#risultato").text("TEST SUPERATO");
                $("#risultato").css("color", "green");
            } else {
                $("#risultato").text("TEST NON SUPERATO");
                $("#risultato").css("color", "red");
            }
        }
    });

    // Gestisci il clic sull'opzione di risposta
    $(".opzione").click(function() {
        if (!rispostaData) { // Verifica se non è stata data una risposta prima
            var giusta = $(this).data("correct");
            if (giusta) {
                punteggio++;
                $("#score").text("Punteggio: " + punteggio);
                $("#risultatoDomanda").text("Risposta corretta");
                $("#risultatoDomanda").css("color", "green");
            } else {
                $("#risultatoDomanda").text("Risposta errata");
                $("#risultatoDomanda").css("color", "red");
            }

            // Disabilita tutte le opzioni dopo che l'utente ha risposto
            $(".opzione").prop("disabled", true);

            rispostaData = true; // Imposta il flag di risposta a true
        }
    });
});

function caricaDomanda() {
    $("#question").text(vDomande[domanda].question);

    var opzioni = vDomande[domanda].options;
    $(".opzione").each(function(index) {
        $(this).text(opzioni[index]);
        if (opzioni[index] === vDomande[domanda].correctAnswer) {
            $(this).data("correct", true);
        } else {
            $(this).data("correct", false);
        }

        // Riabilita le opzioni per la nuova domanda
        $(this).prop("disabled", false);
    });

    // Azzera il risultato della domanda precedente
    $("#risultatoDomanda").text("");
    $("#risultatoDomanda").css("color", "");
}
