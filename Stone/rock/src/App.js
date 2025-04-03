import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [playerChoice, setPlayerChoice] = useState("");
    const [computerChoice, setComputerChoice] = useState("");
    const [result, setResult] = useState("");
    const [playerWins, setPlayerWins] = useState(0);
    const [computerWins, setComputerWins] = useState(0);

    const playGame = (choice) => {
        setPlayerChoice(choice);

        axios.post("http://localhost:5000/play", { playerChoice: choice })
            .then((response) => {
                setComputerChoice(response.data.computerChoice);
                setResult(response.data.result);
                setPlayerWins(response.data.playerWins);
                setComputerWins(response.data.computerWins);
            })
            .catch((error) => {
                console.error("Error playing the game:", error);
            });
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Stone, Paper, Scissors Game</h1>
            <div>
                <button onClick={() => playGame("stone")}>Stone 🪨</button>
                <button onClick={() => playGame("paper")}>Paper 🗞️</button>
                <button onClick={() => playGame("scissors")}>Scissors ✂️</button>
            </div>
            <div style={{ marginTop: "20px" }}>
                <h2>Your Choice: {playerChoice}</h2>
                <h2>Computer's Choice: {computerChoice}</h2>
                <h2>Result: {result}</h2>
                <h3>Player Wins: {playerWins}</h3>
                <h3>Computer Wins: {computerWins}</h3>
            </div>
        </div>
    );
};

export default App;
