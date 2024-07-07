import { useEffect, useState } from "react";
import { checkWinner, throwConfetti } from "../utils/helperFunc";

import { Cellgrid, Header, ButtonContainer, Message } from "./";

const Home = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [gameMode, setGameMode] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (gameMode === 1 || gameMode === 2) {
      const winner = checkWinner(cells);

      if (!cells.includes(null) && !winner) {
        setMessage("It's a draw!");
      } else {
        if (winner) {
          setMessage(`${winner} wins!`);
          throwConfetti();
          setWon(true);
        }
      }
    }
  }, [gameMode, cells]);

  const setSign = (index: number) => {
    const nextTurn = turn === "X" ? "O" : "X";

    if (gameMode === 0 || won) {
      setMessage(
        won ? ` ${nextTurn} already won!` : "Game has not started yet"
      );

      if (won) {
        throwConfetti();
      }
      return;
    }

    if (cells[index] !== null) {
      return;
    }

    // 2 Player game
    if (gameMode === 2) {
      const newCells = [...cells];
      newCells[index] = turn;
      setCells(newCells);

      setTurn(nextTurn);
      setMessage(`${nextTurn}'s turn`);
    }
  };

  const restartGame = () => {
    setTurn("X");
    setCells(Array(9).fill(null));
    setGameMode(0);
    setMessage(null);
    setWon(false);
  };

  return (
    <main>
      <Header />
      <Cellgrid cells={cells} setSign={setSign} />
      <Message message={message} />
      <ButtonContainer
        gameMode={gameMode}
        setGameMode={setGameMode}
        setMessage={setMessage}
        turn={turn}
        restartGame={restartGame}
      />
    </main>
  );
};

export default Home;
