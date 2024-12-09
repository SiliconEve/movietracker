// Importing prompt package
const prompt = require('prompt');

// Starting prompt
prompt.start();

// To generate a random number between 0 and 1
const randomNUM = Math.random();
let computerSelection;

// To map the random number to Rock, Paper, Scissors based on ranges
if (randomNUM <= 0.34) {
    computerSelection = 'PAPER';
} else if (randomNUM <= 0.67) {
    computerSelection = 'SCISSORS';
} else {
    computerSelection = 'ROCK';
}

// To ask user for their choice
prompt.get(['userSelection'], function (err, result) {
    const userSelection = result.userSelection.toUpperCase();

    // To validate user input
    if (['ROCK', 'PAPER', 'SCISSORS'].includes(userSelection)) {
        // To display user and computer selections
        console.log(`User selected: ${userSelection}`);
        console.log(`Computer selected: ${computerSelection}`);

        // To determine the winner
        if (userSelection === computerSelection) {
            console.log("It's a tie!");
        } else if (
            (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
            (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
            (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
        ) {
            console.log("User Wins!");
        } else {
            console.log("Computer Wins!");
        }
    } else {
        // Invalidation message for invalid input
        console.log('Invalid entry. Please select ROCK, PAPER, or SCISSORS.');
    }
});
