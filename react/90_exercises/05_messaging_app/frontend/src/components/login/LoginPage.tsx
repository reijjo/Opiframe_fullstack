import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Notification, TextInput } from "../../components";
import { useAppDispatch } from "../../store/hooks";
import { setNotification } from "../../reducers/notificationReducer";
import "./LoginPage.css";

interface User {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const testMessage = () => {
    dispatch(setNotification("toimitaanko"));
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((user) => {
      return {
        ...user,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onRegister = (event: SyntheticEvent) => {
    event.preventDefault();

    console.log("submit jee", user);
  };

  console.log("user", user);

  return (
    <main>
      <Notification />
      <div className="form-wrapper">
        <h1>Register / Login</h1>
        <form className="form">
          <TextInput
            label="Username"
            type="text"
            id="username"
            name="username"
            onChange={onChange}
            value={user.username}
            autoComplete="off"
          />
          <TextInput
            label="Password"
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            value={user.password}
            autoComplete="off"
          />
          <div className="login-buttons">
            <button
              type="button"
              onClick={onRegister}
              className="button-filled"
            >
              Register
            </button>
            <button type="button" className="button-outline">
              Login
            </button>
          </div>

          <div className="login-buttons">
            <button
              type="button"
              className="button-outline"
              onClick={testMessage}
            >
              SetMessage
            </button>
            <button type="button" className="button-filled">
              ClearMessage
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
