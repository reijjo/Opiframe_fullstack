import { SyntheticEvent } from "react";
import { Message } from "../../components";
import "./LoginPage.css";

const LoginPage = () => {
  const onRegister = (event: SyntheticEvent) => {
    event.preventDefault();

    console.log("submit jee");
  };

  return (
    <main>
      <Message message="" />
      <div className="form-wrapper">
        <h1>Register / Login</h1>
        <form className="form">
          <div className="text-input">
            <label htmlFor="username">Username</label>
            <input type="text" />
          </div>
          <div className="text-input">
            <label htmlFor="password">Password</label>
            <input type="password" />
          </div>
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
            <button type="button" className="button-outline">
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
