import { CSSProperties } from "react";

interface Props {
  color: string;
  onColorChange(): void;
}

const Label = (props: Props) => {
  const labelStyle: CSSProperties = {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    // margin: 0,
    textAlign: "center",
  };

  return (
    <p style={labelStyle} onClick={props.onColorChange}>
      {props.color}
    </p>
  );
};

export default Label;
