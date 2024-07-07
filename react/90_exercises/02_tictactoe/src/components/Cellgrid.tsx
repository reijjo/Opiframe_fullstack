import Cell from "./Cell";

interface CellgridProps {
  cells: string[];
  setSign: (index: number) => void;
}

const Cellgrid = ({ cells, setSign }: CellgridProps) => {
  return (
    <section>
      {cells.map((cell, index) => (
        <Cell key={index} cell={cell} index={index} setSign={setSign} />
      ))}
    </section>
  );
};

export default Cellgrid;
