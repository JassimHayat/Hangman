/*---------------------------------------------------- Constants -------------------------------------------------------------------------------*/
// list of words to choose from the below
const words = ["sport", "coffee", "v60","bahrain","elephant","computer","pizza" ];
let chosenWord = "";
let displayedWord = [];
let guessedLetters = [];
let remainingGuesses = 6;

// emoji stages
const hangmanStages = [
    "☠️👽💀",  // 0 guesses left (GAME OVER)
    "😱",    // 1 guesses left
    "😧",    // 2 guesses left
    "😦",    // 3 guesses left
    "😟",    // 4 guesses left
    "😐",    // 5 guesses left
    "🙂",    // 6 guesses left 
    
                        ]       


/*------------------------------------------------------function -------------------------------------------------------------------------------*/


 //start the game by pick random word
 //selecting the random word from list 
function startGame() {
    // Pick a random word from the array
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(chosenWord.length).fill('_');
    remainingGuesses = 6
    guessedLetters = []

   
     // Enable the guess-input & guess button when lose or win in the end of game // https://tiiny.host/html-validator/
     document.getElementById('guess-input').disabled = false;
     document.getElementById('guess-button').disabled = false;

    // Update the word display in 
    updateWordDisplay();
    document.getElementById('hangman-figure').textContent = hangmanStages[remainingGuesses]; // Update hangman-figure
    document.getElementById('remaining-guesses').textContent = remainingGuesses;  // Update remaining-guesses
    document.getElementById('guessed-letters').textContent = guessedLetters.join(', '); // update guessed-letters
    document.getElementById('message').textContent = ''; // update message
    document.getElementById('play-again-button').style.display = 'none'; //update play again button
}

// Function to update the word display with guessed letters // https://chatgpt.com/
function updateWordDisplay() {
    document.getElementById('word-display').textContent = displayedWord.join(' ');
}

// handle the user's guess
function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();

    if (guess && !guessedLetters.includes(guess) && chosenWord.includes(guess)) { //https://codebeautify.org/jsvalidate
        guessedLetters.push(guess); 
        // Update the displayed word
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === guess) {
                displayedWord[i] = guess;
            }
        }
    } else {
        if (!guessedLetters.includes(guess)) {
            guessedLetters.push(guess);
            remainingGuesses--;
        }
            }

    // Check for win/lose
    if (remainingGuesses === 0) {
        document.getElementById('message').textContent = `💀 Game Over! The word was ${chosenWord}💀`;
        document.getElementById('hangman-figure').textContent = hangmanStages[remainingGuesses];
        document.getElementById('play-again-button').style.display = 'inline'; // https://tiiny.host/html-validator/


        // Disable the guess-input & guess button (win/lose) in the end of game.  
        document.getElementById('guess-input').disabled = true; 
        document.getElementById('guess-button').disabled = true;
      
       
    } else if (!displayedWord.includes('_')) {

        document.getElementById('message').textContent = 'Congratulations, you won!😎';
        document.getElementById('play-again-button').style.display = 'inline'; 

        document.getElementById('guess-input').disabled = true; 
        document.getElementById('guess-button').disabled = true; 
     
            }
            
              

    // Update the displays
    document.getElementById('hangman-figure').textContent = hangmanStages[remainingGuesses];
    document.getElementById('remaining-guesses').textContent = remainingGuesses;
    document.getElementById('guessed-letters').textContent = guessedLetters.join(', ');
    updateWordDisplay();
    guessInput.value = '';
    
}



/*-----------------------------------------------------Event listeners -------------------------------------------------------------------------------*/

document.getElementById('guess-button').addEventListener('click', makeGuess);
document.getElementById('play-again-button').addEventListener('click', startGame);


// Start the game initially
startGame();
