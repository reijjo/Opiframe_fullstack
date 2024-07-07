import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

interface CellProps {
  index: number;
  cell: string;
  setSign: (index: number) => void;
}

const Cell = ({ index, cell, setSign }: CellProps) => {
  return (
    <div
      key={index}
      className={`cell ${
        cell === "X" ? "x-cell" : cell === "O" ? "o-cell" : ""
      }`}
      onClick={() => setSign(index)}
    >
      {cell === "X" ? (
        <FontAwesomeIcon
          icon={faTimes}
          style={{
            display: "grid",
            placeItems: "center",
            fontSize: "2em",
          }}
        />
      ) : cell === "O" ? (
        <FontAwesomeIcon
          icon={faCircle}
          style={{
            display: "grid",
            placeItems: "center",
            fontSize: "1.8em",
          }}
        />
      ) : null}
    </div>
  );
};

export default Cell;
