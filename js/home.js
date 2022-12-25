"use strict";

/////////////////////////////////////////////////////////////
// Declarating variables
let formAlpha = document.getElementById("formAlpha");
let formBeta = document.getElementById("formBeta");
let inputAlpha = document.getElementById("inputAlpha");
let inputBeta = document.getElementById("inputBeta");
let wordSpace = document.querySelector(".word-space");
let btnSubmit = document.querySelector(".btn-submit");
let btnFindWord = document.getElementById("btn-find-word");
let btnReboot = document.querySelector(".btn-reboot");
let redAlert = document.querySelector(".red-alert");
let counterDisplay = document.getElementById("updateCounter");
let success = document.querySelector(".success");
let failed = document.querySelector(".failed");

let letters;

let decrease, startCounter;

let hangman = document.querySelector(".hangman");
let lost = document.querySelector(".lost");

let listWords = [
  "codeur",
  "wagons",
  "arbres",
  "bagues",
  "faucon",
  "votres",
  "verres",
  "bouton",
  "casque",
  "baches",
  "montre",
  "stylos",
  "souris",
  "lettre",
  "mobile",
  "stands",
  "coucou",
  "cordon",
  "annexe",
  "boulon",
  "poeles",
  "crepes",
  "cremes",
  "salade",
  "tracer",
  "stylet",
  "rocket",
  "blouse",
  "patron",
  "portes",
  "squale",
  "jouets",
  "ballon",
  "ecrans",
  "boites",
  "pendue",
  "global",
  "lampes",
  "pretes",
  "chaise",
];

let initiateWord;


/////////////////////////////////////////////////////////////
// Game initialization
init();


/////////////////////////////////////////////////////////////
// Managing Forms

// Alpha form
formAlpha.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputAlpha.value) {
    checkLetter();
    inputAlpha.value = "";
    inputBeta.value = "";
  } else if (inputAlpha.value === " ") {
    redAlert.style.display = "block";
    inputAlpha.value = "";
    inputBeta.value = "";
  } else {
    decreaseCounter();
    inputAlpha.value = "";
    inputBeta.value = "";
  }
});

// Beta form
formBeta.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputBeta.value) {
    checkSolution();
  }
});


/////////////////////////////////////////////////////////////
// Managing Buttons
btnReboot.addEventListener("click", () => {
  reboot();
});

btnFindWord.addEventListener("click", () => {
  checkSolution();
});


/////////////////////////////////////////////////////////////
// Managing Functions

// Function to initialize game
function init() {
  // Initiate word to found
  initiateWord = (function randomWord() {
    return Array.from(listWords[Math.floor(Math.random() * listWords.length)]);
  })();

  //console.log(initiateWord);
  letters = document.querySelectorAll(".letters");

  inputAlpha.disabled = false;
  btnSubmit.disabled = false;
  inputBeta.disabled = false;
  btnFindWord.disabled = false;
  startCounter = 5;
  btnReboot.style.display = "none";
  redAlert.style.display = "none";
  success.style.display = "none";
  failed.style.display = "none";
  hangman.style.opacity = "0";
  lost.style.display = "none";
}

// Function to reboot game
function reboot() {
  wordSpace.innerHTML = `<li class="letters">_</li>
  <li class="letters">_</li>
  <li class="letters">_</li>
  <li class="letters">_</li>
  <li class="letters">_</li>
  <li class="letters">_</li>`;

  init();
  counterDisplay.textContent = "6";
  btnSubmit.textContent = "Deviner";
  btnFindWord.style.display = "block";
  btnFindWord.textContent = "Tu l'as ou pas ?";
}

// Function to check user's letters
function checkLetter() {
  let transformInput = inputAlpha.value.toLowerCase();
  let indexes = [];

  initiateWord.forEach((letter, i) => {
    if (letter === transformInput) indexes.push(i);
  });

  if (indexes.length >= 1) {
    displayLetters();
  } else {
    decreaseCounter();
  }

  function displayLetters() {
    for (const index of indexes) {
      Array.from(letters)[index].innerHTML = transformInput;
      checkUnderscores();
    }
  }

  // Function to check if underscores array are empty
  function checkUnderscores() {
    let underscores = letters;
    let array = [];

    for (const underscore of underscores) {
      if (underscore.innerHTML !== "_") {
        array.push(underscore.innerHTML);
      }

      if (array.length === 6) {
        btnSubmit.textContent = "🏆Bravo🏆";
        desactiveForms();

        setTimeout(() => {
          success.style.display = "none";
        }, 1000);

        setTimeout(() => {
          btnReboot.style.display = "block";
        }, 1300);
      }
    }
  }
}

// Function to check user's word in Beta form
function checkSolution() {
  const wordSolution = initiateWord;
  const transformInputBeta = [...inputBeta.value.toLowerCase()];

  if (JSON.stringify(transformInputBeta) === JSON.stringify(wordSolution)) {
    wordSpace.textContent = initiateWord.join("");
    inputBeta.value = "";
    desactiveForms();
    btnFindWord.textContent = "Mot trouvé 😋";
    success.style.display = " block";

    setTimeout(() => {
      success.style.display = "none";
    }, 1000);

    setTimeout(() => {
      btnReboot.style.display = "block";
    }, 1300);
  } else if (transformInputBeta.length < 6) {
    alert("😵‍💫 C'est pas 1 mot de 6 lettres 😵‍💫");

    inputBeta.value = "";
    inputAlpha.value = "";

    return;
  } else {
    decreaseCounter();

    inputBeta.value = "";
    inputAlpha.value = "";
    failed.style.display = "block";

    setTimeout(() => {
      failed.style.display = "none";
    }, 3500);
  }
}

// Function to desactive all forms
function desactiveForms() {
  inputAlpha.disabled = true;
  btnSubmit.disabled = true;
  inputBeta.disabled = true;
  btnFindWord.disabled = true;
}

// Function to decrease counter
function decreaseCounter() {
  if (decrease < 0) {
    counterDisplay.textContent = startCounter;
    inputAlpha.style.display = "none";

    reboot();
  } else {
    decrease = startCounter--;
    counterDisplay.textContent = decrease;
    displayHangman();
  }
}

// Function to display the hangman
function displayHangman() {
  let score = decrease;

  switch (score) {
    case 5:
      hangman.style.opacity = "0.15";
      break;
    case 4:
      hangman.style.opacity = "0.3";
      break;
    case 3:
      hangman.style.opacity = "0.45";
      break;
    case 2:
      hangman.style.opacity = "0.6";
      break;
    case 1:
      hangman.style.opacity = "0.70";
      break;
    case 0:
      hangman.style.opacity = "1";
      lost.style.display = "block";
      wordSpace.textContent = initiateWord.join("");
      inputAlpha.disabled = true;
      inputBeta.disabled = true;
      btnSubmit.textContent = "Tu as perdu !";
      btnSubmit.disabled = true;
      btnFindWord.style.display = "none";

      setTimeout(() => {
        btnReboot.style.display = "block";
      }, 1400);
      break;
    default:
      return;
  }
}


/////////////////////////////////////////////////////////////
// Update Year in Footer section
const date = new Date();
let year = date.getFullYear();

let updateDate = document.getElementById("date");
updateDate.textContent = year;
