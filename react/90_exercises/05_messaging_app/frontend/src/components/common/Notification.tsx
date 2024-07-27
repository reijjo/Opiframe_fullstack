import { useAppSelector } from "../../store/hooks";

const Notification = () => {
  const notification = useAppSelector((state) => state.notification.value);

  return notification ? (
    <div className={`notification`}>
      <h2>{String(notification)}</h2>
    </div>
  ) : null;
};

export default Notification;
