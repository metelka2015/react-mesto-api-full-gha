import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/header-logo.svg";

export function Header({ loggedIn, userInfo, onSignOut }) {
  return (
    <header className="header">
      <div className="header__container">
        <img src={logo} alt="логотип проекта Место" className="header__logo" />
        <div className="header__login-container">
          <h2 className="header__email">{loggedIn ? userInfo : ""}</h2>
          <h2 className="header__state">
            <Routes>
              <Route
                path="/sign-up"
                element={
                  <Link to="/sign-in" className="header__link-state">
                    {"Войти"}
                  </Link>
                }
              />
              <Route
                path="/sign-in"
                element={
                  <Link to="/sign-up" className="header__link-state">
                    {"Регистрация"}
                  </Link>
                }
              />
              <Route
                path="/"
                element={
                  <button onClick={onSignOut} className="header__link-button">
                    {"Выйти"}
                  </button>
                }
              />
            </Routes>
          </h2>
        </div>
      </div>
    </header>
  );
}
