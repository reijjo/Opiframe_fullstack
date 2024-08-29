import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

const Notification = () => {
  const notification = useAppSelector(
    (state: RootState) => state.notification.value
  );

  return notification ? (
    <div className={`notification`}>
      <h2>{String(notification)}</h2>
    </div>
  ) : null;
};

export default Notification;
