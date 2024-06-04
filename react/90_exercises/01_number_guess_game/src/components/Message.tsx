interface Props {
  message: string;
  className: string;
}

const Message = ({ message, className }: Props) => {
  return (
    <h4
      style={{
        border: "2px solid",
        padding: "8px 16px",
        marginTop: 32,
        boxShadow: "0 4px 4px lightgray",
      }}
      className={className}
    >
      {message}
    </h4>
  );
};

export default Message;
