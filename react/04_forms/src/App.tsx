import { useState } from "react";
import ContactForm from "./components/ContactForm";
import Person from "./models/Person";

interface State {
  greeting: string;
}

function App() {
  const [state, setState] = useState<State>({
    greeting: "No greeting yet",
  });

  const setGreeting = (person: Person) => {
    setState({
      greeting: `Hello ${person.firstname} ${person.lastname}`,
    });
  };
  return (
    <>
      <ContactForm setGreeting={setGreeting} />
      <h3>{state.greeting}</h3>
    </>
  );
}

export default App;
