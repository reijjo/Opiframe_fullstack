import { CSSProperties } from "react";

interface Props {
  color: string;
}

const Square = (props: Props) => {
  const squareStyyle: CSSProperties = {
    backgroundColor: props.color,
    height: 150,
  };

  return <div style={squareStyyle}></div>;
};

export default Square;
