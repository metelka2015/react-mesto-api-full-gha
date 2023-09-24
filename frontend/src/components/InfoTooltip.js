import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

export function InfoTooltip({ isOpen, onClose, registeredIn }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__status-container">
        <img
          className="popup__image-status"
          src={registeredIn ? success : fail}
          alt={registeredIn ? "успешно" : "ошибка"}
        />
        <h2 className="popup__title_info">
          {registeredIn
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
