import Button from "./Button";

interface ButtonContainerProps {
  gameMode: number;
  setGameMode: (gameMode: number) => void;
  setMessage: (message: string) => void;
  turn: string;
  restartGame: () => void;
}

const ButtonContainer = ({
  gameMode,
  setGameMode,
  setMessage,
  turn,
  restartGame,
}: ButtonContainerProps) => {
  return (
    <div className="button-container">
      {!gameMode ? (
        <>
          {/* <Button
            onClick={() => {
              setGameMode(1), setMessage(`${turn}'s turn`);
            }}
            disabled={gameMode !== 0}
            style={{ display: "none" }}
            value="1 Player Game"
          /> */}
          <Button
            onClick={() => {
              setGameMode(2), setMessage(`${turn}'s turn`);
            }}
            disabled={gameMode !== 0}
            value="2 Player Game"
          />
        </>
      ) : (
        <Button onClick={restartGame} value="Restart" />
      )}
    </div>
  );
};

export default ButtonContainer;
