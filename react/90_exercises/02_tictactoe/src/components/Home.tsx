import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import confetti from "canvas-confetti";

const Home = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      if (!cells.includes(null)) {
        setMessage("It's a draw!");
      } else {
        const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
          const [a, b, c] = combination;
          if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            setMessage(`${cells[a]} wins!`);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
            setWon(true);
            break;
          }
        }
      }
    }
  }, [gameStarted, cells]);

  const setSign = (index: number) => {
    // console.log("Sign set", turn, index);

    const nextTurn = turn === "X" ? "O" : "X";

    if (!gameStarted || won) {
      setMessage(
        won ? ` ${nextTurn} already won!` : "Game has not started yet"
      );

      if (won) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      return;
    }

    if (cells[index] !== null) {
      return;
    }

    const newCells = [...cells];
    newCells[index] = turn;
    setCells(newCells);

    setTurn(nextTurn);
    setMessage(`${nextTurn}'s turn`);
  };

  const restartGame = () => {
    setTurn("X");
    setCells(Array(9).fill(null));
    setGameStarted(false);
    setMessage(null);
    setWon(false);
  };

  return (
    <main>
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      <section>
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`cell ${
              cell === "X" ? "x-cell" : cell === "O" ? "o-cell" : ""
            }`}
            onClick={() => setSign(index)}
          >
            {cell === "X" ? (
              <FontAwesomeIcon
                icon={faTimes}
                style={{
                  display: "grid",
                  placeItems: "center",
                  fontSize: "2em",
                }}
              />
            ) : cell === "O" ? (
              <FontAwesomeIcon
                icon={faCircle}
                style={{
                  display: "grid",
                  placeItems: "center",
                  fontSize: "1.8em",
                }}
              />
            ) : null}
          </div>
        ))}
      </section>
      {message && (
        <div style={{ fontSize: 24, padding: "0 16px" }}>{message}</div>
      )}

      {!gameStarted ? (
        <div className="button-container">
          <button disabled={gameStarted} style={{ visibility: "hidden" }}>
            1 Player
          </button>
          <button
            disabled={gameStarted}
            onClick={() => {
              setGameStarted(true), setMessage(`${turn}'s turn`);
            }}
          >
            2 Player
          </button>
        </div>
      ) : (
        <div className="button-container">
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </main>
  );
};

export default Home;
