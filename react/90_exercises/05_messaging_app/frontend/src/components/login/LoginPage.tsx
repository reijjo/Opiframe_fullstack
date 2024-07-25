import { SyntheticEvent } from "react";
import { Message } from "../../components";
import "./LoginPage.css";

const LoginPage = () => {
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    console.log("submit jee");
  };

  return (
    <main>
      <Message message="moi" />
      <div className="form-wrapper">
        <form className="form" onSubmit={onSubmit}>
          <div className="text-input">
            <label htmlFor="username">Username</label>
            <input type="text" />
          </div>
          <div className="text-input">
            <label htmlFor="password">Password</label>
            <input type="password" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
