interface ButtonProps {
  onClick: () => void;
  value: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button = ({ onClick, value, disabled, style }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} style={style}>
      {value}
    </button>
  );
};

export default Button;
