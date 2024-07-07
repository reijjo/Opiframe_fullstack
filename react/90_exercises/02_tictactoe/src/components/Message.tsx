interface MessageProps {
  message: string | null;
}

const Message = ({ message }: MessageProps) => {
  if (message !== null) {
    return <div style={{ fontSize: 24, padding: "0 16px" }}>{message}</div>;
  }

  return null;
};

export default Message;
