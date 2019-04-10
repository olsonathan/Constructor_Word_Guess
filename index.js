var Word = require("./word.js");
var inquirer = require("inquirer");

var wordBank = [
  "apple", "grapes", "pumpkin",
  "watermellon", "orange", "pear",
  "bananna", "plum", "kiwi",
  ];

var  guesses;
var pickedWords;
var word;
var pickedWord;

function start() {
  pickedWords = [];
  console.log("Lets play a word guess game");
  console.log("------------------------------------------");
  playGame();
}

function playGame() {
  pickedWord = "";
  guesses = 10;
  if(pickedWords.length < wordBank.length) {
    pickedWord = getWord();
  } else {
    // WIN CONDITION
    console.log("you win");
    continuePrompt();
  }
  if(pickedWord) {
    word = new Word(pickedWord);
    word.makeLetters();
    makeGuess();
  }
}

function getWord() {
  var rand = Math.floor(Math.random() * wordBank.length);
  var randomWord = wordBank[rand];
  if(pickedWords.indexOf(randomWord) === -1) {
    pickedWords.push(randomWord);
    return randomWord;
  } else {
    return getWord();
  }
}

function makeGuess() {
  var checker = [];
  inquirer.prompt([
    {
      name: "guessedLetter",
      message: word.update() + 
              "\nGuess a letter!" +
              "\nGuesses Left: " + guesses
    }
  ])
  .then(data => {
    word.letters.forEach(letter => {
      letter.fillLetter(data.guessedLetter);
      checker.push(letter.blanks());
    });
    if(guesses > 0 && checker.indexOf("_") !== -1) {
      guesses--;
      if(guesses === 0) {
        console.log("YOU RAN OUT OF GUESSES! GAME OVER.");
        continuePrompt();
      } else {
        makeGuess();
      }
    } else {
      console.log("CONGRATULATIONS! YOU GOT THE WORD!");
      console.log(word.update());
      continuePrompt();
      //playGame();
    }
  });
}

function continuePrompt() {
  inquirer.prompt([
      {
        name: "continue",
        type: "list",
        message: "Would you like to play again?",
        choices: ["Yes", "No"]
      }
    ])
  .then(data => {
      if(data.continue === "Yes") {
        start();
      } else {
        console.log("Thanks for playing!");
      }
  });
}

start();