import { ChangeEvent, SyntheticEvent, useState } from "react";
import LibraryItem from "../models/LibraryItem";
import { useNavigate } from "react-router-dom";

interface State {
  name: string;
  author: string;
  year: number;
  loaned: boolean;
}

interface Props {
  add(item: LibraryItem): void;
}

const AddBook = ({ add }: Props) => {
  const [state, setState] = useState<State>({
    name: "",
    author: "",
    year: 2000,
    loaned: false,
  });

  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const book = new LibraryItem(
      state.name,
      state.author,
      state.year,
      state.loaned,
      0
    );
    add(book);

    setState({
      name: "",
      author: "",
      year: 2000,
      loaned: false,
    });

    navigate("/");
  };

  return (
    <main>
      <div className="form-material">
        <h1>Add Book</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={onChange}
              value={state.name}
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              name="author"
              id="author"
              onChange={onChange}
              value={state.author}
            />
          </div>
          <div>
            <label>Year</label>
            <input
              type="number"
              name="year"
              id="year"
              onChange={onChange}
              value={state.year}
            />
          </div>
          <button>Add Book</button>
        </form>
      </div>
    </main>
  );
};

export default AddBook;
