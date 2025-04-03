const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let playerWins = 0;
let computerWins = 0;

const choices = ["stone", "paper", "scissors"];

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return "It's a tie!";
    if (
        (playerChoice === "stone" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "stone")
    ) {
        playerWins++;
        return "You win!";
    }
    computerWins++;
    return "Computer wins!";
}

app.post("/play", (req, res) => {
    const { playerChoice } = req.body;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = determineWinner(playerChoice, computerChoice);

    res.json({ playerChoice, computerChoice, result, playerWins, computerWins });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
