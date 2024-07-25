interface Props {
  message: string | null;
}

const Message = ({ message }: Props) => {
  return message ? (
    <div className={`message`}>
      <h2>{message}</h2>
    </div>
  ) : null;
};

export default Message;
