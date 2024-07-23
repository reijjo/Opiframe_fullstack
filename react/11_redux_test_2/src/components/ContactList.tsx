import Contact from "../models/Contact";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducers/contactReducer";

const ContactList = () => {
  const dispatch = useDispatch();

  const listSelector = (state: AppState) => state.list;
  const list = useSelector(listSelector);

  const contactJSX = list.map((contact: Contact) => {
    return (
      <tr key={contact.id}>
        <td>{contact.firstname}</td>
        <td>{contact.lastname}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td>
          <button
            onClick={() => dispatch({ type: "REMOVE_CONTACT", id: contact.id })}
            style={{ backgroundColor: "red" }}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>{contactJSX}</tbody>
    </table>
  );
};

export default ContactList;
