import { Dispatch, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  setName: Dispatch<React.SetStateAction<string>>;
}

const StartPage = ({ name, setName }: Props) => {
  const navigate = useNavigate();

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    navigate("/game");
  };
  console.log("name", name);

  return (
    <main>
      <h1>Number Guess Game</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name" style={{ marginBottom: 2 }}>
          Name
        </label>
        <input
          type="text"
          placeholder="name"
          style={{ marginBottom: 8 }}
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event?.target.value)}
        />
        <button type="submit">Start playing</button>
      </form>
    </main>
  );
};

export default StartPage;
