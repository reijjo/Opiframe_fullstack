import LibraryItem from "../models/LibraryItem";

interface Props {
  item: LibraryItem;
  index: number;
  changeMode(mode: string, index: number): void;
}

const Row = ({ item, index, changeMode }: Props) => {
  console.log("index", index);
  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.author}</td>
      <td>{item.year}</td>
      <td>{item.loaned ? "Yes" : "No"}</td>
      <td>
        <button
          className="edit-button"
          onClick={() => changeMode("edit", index)}
        >
          {item.loaned ? "Return" : "Loan"}
        </button>
      </td>
      <td>
        <button className="delete-button">Delete</button>
      </td>
    </tr>
  );
};

export default Row;
