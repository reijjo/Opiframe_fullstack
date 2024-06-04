import { ChangeEvent, SyntheticEvent, useState } from "react";
import ShoppingItem from "../models/ShoppingItem";

interface State {
  type: string;
  count: number;
  price: number;
}

interface Props {
  add(item: ShoppingItem): void;
}

const ShoppingForm = (props: Props) => {
  const [state, setState] = useState<State>({
    type: "",
    count: 0,
    price: 0,
  });

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

    const item = new ShoppingItem(state.type, state.count, state.price, 0);
    props.add(item);

    setState({
      type: "",
      count: 0,
      price: 0,
    });
  };

  return (
    <div
      style={{
        width: "40%",
        backgroundColor: "lightblue",
        margin: "auto",
        padding: "8px 16px",
      }}
    >
      <form onSubmit={onSubmit}>
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <input
          type="text"
          name="type"
          id="type"
          className="form-control"
          onChange={onChange}
          value={state.type}
        />

        <label htmlFor="count" className="form-label">
          Count
        </label>
        <input
          type="number"
          name="count"
          id="count"
          className="form-control"
          onChange={onChange}
          value={state.count}
        />

        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          step="0.01"
          className="form-control"
          onChange={onChange}
          value={state.price}
        />

        <input
          type="submit"
          value="Add"
          className="btn btn-secondary"
          style={{ marginTop: 8 }}
        />
      </form>
    </div>
  );
};

export default ShoppingForm;
