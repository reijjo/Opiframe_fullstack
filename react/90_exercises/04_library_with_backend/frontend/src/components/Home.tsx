import { useState } from "react";
import LibraryItem from "../models/LibraryItem";
import { Row, EditRow } from "./index";

interface State {
  removeIndex: number;
  editIndex: number;
}

interface Props {
  list: LibraryItem[];
  edit(item: LibraryItem): void;
}
const Home = ({ list, edit }: Props) => {
  const [state, setState] = useState<State>({
    removeIndex: -1,
    editIndex: -1,
  });

  const changeMode = (mode: string, index: number) => {
    switch (mode) {
      case "remove":
        setState({
          removeIndex: index,
          editIndex: -1,
        });
        return;
      case "edit":
        setState({
          removeIndex: -1,
          editIndex: index,
        });
        return;
      case "cancel":
        setState({
          removeIndex: -1,
          editIndex: -1,
        });
        return;
      default:
        return;
    }
  };

  const editItem = (item: LibraryItem) => {
    console.log("editItem", item);
    edit(item);
    changeMode("cancel", 0);
  };

  const libraryItems = list.map((item, index) => {
    if (state.editIndex === index) {
      return (
        <EditRow
          key={item.id}
          book={item}
          editItem={editItem}
          changeMode={changeMode}
        />
      );
    }

    return (
      <Row key={item.id} item={item} changeMode={changeMode} index={index} />
    );
  });

  if (list && list.length > 0) {
    console.log("HOMELIST", list);
  }

  return (
    <main>
      <header>
        <h1>Library</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Year</th>
            <th>Loaned</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{libraryItems}</tbody>
      </table>
    </main>
  );
};

export default Home;
