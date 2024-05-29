import ShoppingForm from "./components/ShoppingForm";
import useAction from "./hooks/useAction";

function App() {
  const { add } = useAction();

  return (
    <>
      <ShoppingForm add={add} />
    </>
  );
}

export default App;
