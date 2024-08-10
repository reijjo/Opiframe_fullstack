import { ChangeEvent, SyntheticEvent, useState } from "react";

import { Notification, TextInput } from "../../components";
// import { useAppDispatch } from "../../store/hooks";
// import { loginUser, registerUser } from "../../slices/userSlice";
import { User } from "../../utils/types";

import "./LoginPage.css";
import { useAppDispatch } from "../../store/hooks";
import { setNotification } from "../../slices/notificationSlice";
import { registerUser } from "../../slices/userSlice";

const LoginPage = () => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((user) => {
      return {
        ...user,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onRegister = async (event: SyntheticEvent) => {
    event.preventDefault();

    dispatch(registerUser(user));
  };

  const onLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    dispatch(setNotification("Logging user"));

    console.log("login");
  };

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
            <button type="button" className="button-outline" onClick={onLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
