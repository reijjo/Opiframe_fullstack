import LibraryItem from "../models/LibraryItem";

interface Props {
  item: LibraryItem;
  index: number;
  editItem(item: LibraryItem): void;
}

const Row = ({ item, editItem }: Props) => {
  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.author}</td>
      <td>{item.year}</td>
      <td>{item.loaned ? "Yes" : "No"}</td>
      <td>
        <button className="edit-button" onClick={() => editItem(item)}>
          {item.loaned ? "Return" : "Loan"}
        </button>
      </td>
    </tr>
  );
};

export default Row;
