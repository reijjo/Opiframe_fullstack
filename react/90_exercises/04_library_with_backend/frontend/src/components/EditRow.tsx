import { ChangeEvent, useState } from "react";
import LibraryItem from "../models/LibraryItem";

interface Props {
  book: LibraryItem;
  editItem(item: LibraryItem): void;
  changeMode(mode: string, index: number): void;
}

interface State {
  name: string;
  author: string;
  year: number;
  loaned: boolean;
}

const EditRow = ({ book, editItem, changeMode }: Props) => {
  const [state, setState] = useState<State>({
    name: book.name,
    author: book.author,
    year: book.year,
    loaned: book.loaned,
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;

    if (type === "checkbox") {
      setState((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setState((state) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  const updateItem = () => {
    const item = new LibraryItem(
      state.name,
      state.author,
      state.year,
      state.loaned,
      book.id
    );

    editItem(item);
  };

  console.log("loaned", state.loaned);

  return (
    <tr>
      <td>{state.name}</td>
      <td>{state.author}</td>
      <td>{state.year}</td>
      <td>
        <input
          type="checkbox"
          name="loaned"
          id="loaned"
          onChange={onChange}
          checked={state.loaned}
        />
      </td>
      <td>
        <button onClick={updateItem}>Save</button>
      </td>
      <td>
        <button onClick={() => changeMode("cancel", 0)}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditRow;
