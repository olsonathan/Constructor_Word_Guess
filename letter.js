// constructor function used to create programmers objects
function Letter(letter) {
    this.letter = letter;
    this.guessed = false;
    
  
    
    this.blanks = function() {
      if(!this.guessed) {
        return "_";
      } else {
        return this.letter;
      }
    }
  
    this.fillLetter = function(guess) {
      if(guess === this.letter) {
        this.guessed = true;
      }
    }
  
}
  module.exports = Letter;