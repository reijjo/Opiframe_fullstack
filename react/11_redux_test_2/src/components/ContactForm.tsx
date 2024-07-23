import { ChangeEvent, SyntheticEvent, useState } from "react";
import Contact from "../models/Contact";
import { useDispatch } from "react-redux";

interface State {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

const ContactForm = () => {
  const [state, setState] = useState<State>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const dispatch = useDispatch();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (
      state.firstname === "" ||
      state.lastname === "" ||
      state.email === "" ||
      state.phone === ""
    ) {
      return;
    }
    const contact = new Contact(
      state.firstname,
      state.lastname,
      state.email,
      state.phone,
      0
    );

    dispatch({ type: "ADD_CONTACT", contact: contact });

    setState({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div
      style={{ width: "40%", backgroundColor: "lightgreen", margin: "auto" }}
    >
      <form onSubmit={onSubmit}>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          onChange={onChange}
          value={state.firstname}
        />
        <br />

        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          onChange={onChange}
          value={state.lastname}
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={onChange}
          value={state.email}
        />
        <br />

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          onChange={onChange}
          value={state.phone}
        />
        <br />

        <input type="submit" value="Add Contact" />
      </form>
    </div>
  );
};

export default ContactForm;
