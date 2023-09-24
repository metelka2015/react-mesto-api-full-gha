import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          id="avatarlink"
          ref={avatarRef}
          type="url"
          className="popup__input popup__input_type_placelink"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="error-avatarlink" className="popup__error-message"></span>
      </label>
    </PopupWithForm>
  );
}
