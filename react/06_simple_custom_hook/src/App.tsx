import useCount from "./hooks/useCount";

function App() {
  const [value, add, substract] = useCount(10);

  return (
    <>
      <h2>Current count: {value}</h2>
      <button onClick={add}>+</button>
      <button onClick={substract}>-</button>
    </>
  );
}

export default App;
