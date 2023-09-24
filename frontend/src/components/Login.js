import React from "react";

export function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">{"Вход"}</h2>
        <label className="login__label">
          <input
            id="email"
            type="email"
            className="login__input login__input_type_email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChangeEmail}
            value={email || ""}
          />
          <span id="error-email" className="login__error-message"></span>
        </label>
        <label className="login__label">
          <input
            id="password"
            type="password"
            className="login__input login__input_type_password"
            name="password"
            placeholder="Пароль"
            value={password || ""}
            onChange={handleChangePassword}
            required
          />
          <span id="error-password" className="login__error-message"></span>
        </label>
        <button className="login__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}