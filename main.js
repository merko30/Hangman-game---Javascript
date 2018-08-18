//INPUT
var input = document.getElementById("letter");

// BUTTONS
var button = document.getElementById("tryLetter");
var resetButton = document.getElementById("reset");

// DRAWING CONTAINER
var image = document.getElementById("image");
var lines = Array.from(image.children);

// MESSAGES, ERRORS, WORD DISPLAY
var error = document.getElementById("error");
var w = document.getElementById("word");
var message = document.getElementById("message");

const words = [
    "people",
    "history",
    "way",
    "art",
    "world",
    "information",
    "map",
    "family",
    "government",
    "health",
    "system",
    "computer",
    "meat",
    "year",
    "thanks",
    "music",
    "person",
    "reading",
    "method",
    "data",
    "food",
    "understanding",
    "theory",
    "law",
    "bird",
    "literature",
    "problem",
    "software",
    "control",
    "knowledge",
    "power",
    "ability",
    "economics",
    "love",
    "internet",
    "television",
    "science",
    "library",
    "nature",
    "fact",
    "product",
    "idea",
    "temperature",
    "investment",
    "area",
    "society",
    "activity",
    "story",
    "industry",
    "media",
    "thing",
    "oven",
    "community",
    "definition",
    "safety",
    "quality",
    "development",
    "language",
    "management",
    "player",
    "variety",
    "video",
    "week",
    "security",
    "country",
    "exam",
    "movie",
    "organization",
    "equipment",
    "physics",
    "analysis",
    "policy",
    "series",
    "thought",
    "basis",
    "boyfriend",
    "direction",
    "strategy",
    "technology",
    "army",
    "camera",
    "freedom",
    "paper",
    "environment",
    "child",
    "instance",
    "month",
    "truth",
    "marketing",
    "university",
    "writing",
    "article",
    "department",
    "difference",
    "goal",
    "news",
    "audience",
    "fishing",
    "growth",
    "income"
];

// INITIAL VARIABLES

// Array with already used letters, prevents repeating letters...
let usedLetters = [];

// Drawing has 14 lines, set to -1 so it starts at zero...
let showedLines = -1;

// Shows underlines instead letters at the beginning...
function showUnderlines(splited) {
    for (let i = 0; i < splited.length; i++) {
        w.innerText += " _";
    }
}

// Checks if letter is already used...
function isLetterUsed(letter) {
    if (usedLetters.includes(letter)) {
        return true;
    } else {
        return false;
    }
}

// Checks if word includes the letter...
function checkLetterInWord(letter, splited) {
    if (splited.includes(letter)) {
        return true;
    } else {
        return false;
    }
}

// Takes a letter and splited word into array, checks if letter occure in word, replaces a underline with the letter or it draws one line as wrong answer...
function setLetter(letter, splited, word) {
    if (checkLetterInWord(letter, splited)) {
        for (let i = 0; i < splited.length; i++) {
            for (let i = 0; i < w.length; i++) {}
            if (splited[i] == letter) {
                let sp = w.innerText.split(" ");
                sp[i] = letter;
                w.innerText = sp.join(" ");
            }
        }
        checkWin(word, w.innerText);
    } else {
        if (showedLines !== image.children.length - 1) {
            showedLines++;
            lines[showedLines].style.display = "block";
        } else {
            showMessage(
                `You lost, the word we looked for is <b> ${word}</b>.
            New word comming in 3 seconds`,
                "fail"
            );
            setTimeout(() => {
                reset();
            }, 3000);
        }
    }
}

// Takes the value from input, validates it, push it to usedLetters if is used already..
// Word and splited parameters are there just to pass them to setLetter function...
function tryLetter(splited, word) {
    return function() {
        if (!input.value) {
            showError("Type something...");
        } else if (input.value && input.value.length > 1) {
            showError("Type just one letter...");
        } else {
            showError("");
            if (!isLetterUsed(input.value)) {
                showError("");
                setLetter(input.value, splited, word);
                usedLetters.push(input.value);
            } else {
                showError("You tried that letter already");
            }
        }
    };
}

// Shows the message...
function showMessage(mess, className) {
    if (mess !== "") {
        message.style.display = "block";
        message.classList.add(className);
        message.innerHTML = mess;
    } else {
        message.style.display = "none";
        message.classList.remove(className);
    }
}

// Shows the error...
function showError(err) {
    if (err !== "") {
        error.style.display = "block";
        error.innerText = err;
    } else {
        error.style.display = "none";
    }
}

// Returns random word...
function setWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Resets the game...
function reset() {
    for (let i = 0; i < image.children.length; i++) {
        lines[i].style.display = "none";
    }
    input.value = "";
    w.innerText = "";
    showError("");
    showMessage("", "fail");
    init();
}

function checkWin(initialWord, guess) {
    if (initialWord == guess.split(" ").join("")) {
        showMessage(
            "You won, congratulations. New word comming in 3 seconds...",
            "success"
        );
        setTimeout(() => {
            reset();
        }, 3000);
    }
}

// Start game function
function init() {
    usedLetters.length = 0;
    showedLines = -1;

    resetButton.addEventListener("click", reset);
    let word = setWord();
    let splited = word.split("");

    showUnderlines(splited);
    button.onclick = tryLetter(splited, word);
}

init();
