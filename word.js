var Letter = require("./letter.js");

function Word(word) {
  this.word = word;
  this.letters = [];

  this.makeLetters = function() {
    var wordArr = this.word.split("");
    for(var i = 0; i < wordArr.length; i++) {
      var newLetter = new Letter(wordArr[i]);
      this.letters.push(newLetter);
    }
  }

  this.makeGuess = function(guess) {
    this.letters.forEach(letter => {
      letter.fillLetter(guess);
    });
  }

  this.update = function() {
    var printedWord = "";
    this.letters.forEach(letter => {
      printedWord += letter.blanks() + " ";
    });
    return printedWord;
  }
}

module.exports = Word;