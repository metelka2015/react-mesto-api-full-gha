import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          id="name"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Имя"
          value={name || ""}
          onChange={handleNameChange}
          required
          minLength="2"
          maxLength="30"
        />
        <span id="error-name" className="popup__error-message"></span>
      </label>
      <label className="popup__label">
        <input
          id="job"
          className="popup__input popup__input_type_job"
          name="about"
          placeholder="О себе"
          value={description || ""}
          onChange={handleDescriptionChange}
          required
          minLength="2"
          maxLength="30"
        />
        <span id="error-job" className="popup__error-message"></span>
      </label>
    </PopupWithForm>
  );
}
