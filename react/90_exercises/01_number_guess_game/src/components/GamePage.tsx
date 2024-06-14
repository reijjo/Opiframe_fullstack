import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Message from "./Message";

interface Props {
  name: string;
}

interface Limits {
  closestSmaller: number;
  closestGreater: number;
}

const GamePage = ({ name }: Props) => {
  const [guess, setGuess] = useState("");
  const [theNumber, setTheNumber] = useState<number>(0);
  const [limits, setLimits] = useState<Limits>({
    closestSmaller: 0,
    closestGreater: 101,
  });
  const [message, setMessage] = useState("");
  const [guessList, setGuessList] = useState<number[]>([]);
  const [infoColor, setInfoColor] = useState("");

  // Set the answer
  useEffect(() => {
    const answer: number = Math.floor(Math.random() * 100) + 1;
    setTheNumber(answer);
  }, []);

  useEffect(() => {
    console.log("limits", limits);
  }, [limits]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuess(value);
  };

  // Add the answer to the numbers list
  if (guessList.length === 0) {
    setGuessList((list) => [...list, theNumber]);
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const myGuess = parseInt(guess);

    // Different checks
    // Not a number
    if (isNaN(myGuess)) {
      setMessage("Only numbers thanks");
      setInfoColor("error");
      setGuess("");
      return;
    }

    // Too big / too small
    if (myGuess >= limits.closestGreater || myGuess <= limits.closestSmaller) {
      setMessage(
        `Guess must be between ${limits.closestSmaller + 1} - ${
          limits.closestGreater - 1
        }`
      );
      setInfoColor("error");
      setGuess("");
      return;
    }

    // Guess too big / small
    if (myGuess < theNumber) {
      setMessage("Guess too low");
      setInfoColor("info");

      setGuessList((list) => {
        const updatedList = [...list, myGuess].sort((a, b) => a - b);

        for (let i = 0; i < updatedList.length; i++) {
          if (updatedList[i] < theNumber) {
            setLimits({
              ...limits,
              closestSmaller: updatedList[i],
            });
          }
        }

        return updatedList;
      });
    } else if (myGuess > theNumber) {
      setMessage("Guess too high");
      setInfoColor("info");

      setGuessList((list) => {
        const updatedList = [...list, myGuess].sort((a, b) => a - b);

        for (let i = 0; i < updatedList.length; i++) {
          if (updatedList[i] === theNumber) {
            setLimits({
              ...limits,
              closestGreater: updatedList[i + 1],
            });
          }
        }

        return updatedList;
      });
    } else {
      setGuessList((list) => [...list, myGuess]);
      setMessage("WOHOO CORRECT!");
      setInfoColor("correct");
    }

    setGuess("");
  };

  const reset = () => {
    const answer: number = Math.floor(Math.random() * 100) + 1;
    setTheNumber(answer);
    setGuessList([]);
    setLimits({ closestSmaller: 0, closestGreater: 101 });
    setMessage("");
  };

  return (
    <main>
      <h1>Okay {name || ""}</h1>
      <h2>
        Guess a number between {limits.closestSmaller + 1} -{" "}
        {limits.closestGreater - 1}
      </h2>
      {message && <Message message={message} className={infoColor} />}
      <form onSubmit={onSubmit}>
        <label htmlFor="guess">Your guess</label>
        <input
          type="string"
          name="guess"
          id="guess"
          value={guess}
          onChange={onChange}
          placeholder={`${limits.closestSmaller + 1} - ${
            limits.closestGreater - 1
          }`}
          style={{ marginBottom: 8 }}
        />
        <button
          type="submit"
          style={{ backgroundColor: "lightcyan", border: "1px solid black" }}
        >
          Guess
        </button>
      </form>

      <p style={{ marginTop: 32 }}>Guesses: {guessList.length - 1}</p>
      <button style={{ marginTop: "auto", padding: "4px 8px" }} onClick={reset}>
        Reset
      </button>
    </main>
  );
};

export default GamePage;
