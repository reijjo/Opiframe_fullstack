// import { useState } from "react";
import LibraryItem from "../models/LibraryItem";
import { Row } from "./index";

interface Props {
  list: LibraryItem[];
  edit(item: LibraryItem): void;
  getList(): void;
  getLoaned(): void;
  getAvailable(): void;
}

const Home = ({ list, edit, getList, getLoaned, getAvailable }: Props) => {
  const editItem = (item: LibraryItem) => {
    edit(item);
  };

  const libraryItems = list.map((item, index) => {
    return <Row key={item.id} item={item} index={index} editItem={editItem} />;
  });

  if (list && list.length > 0) {
    console.log("HOMELIST", list);
  }

  return (
    <main>
      <div className="filter-buttons">
        <button onClick={getList}>All books</button>
        <button onClick={getAvailable}>Available books</button>
        <button onClick={getLoaned}>Loaned books</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Year</th>
            <th>Loaned</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{libraryItems}</tbody>
      </table>
    </main>
  );
};

export default Home;
