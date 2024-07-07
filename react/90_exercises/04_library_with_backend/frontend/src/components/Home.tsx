import LibraryItem from "../models/LibraryItem";

interface Props {
  list: LibraryItem[];
}
const Home = ({ list }: Props) => {
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
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.author}</td>
              <td>{item.year}</td>
              <td>{item.loaned ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Home;
