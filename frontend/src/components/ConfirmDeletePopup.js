import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";

export function ConfirmDeletePopup({ onClose, isOpen, onDeletePlace }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeletePlace();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      textButton="Да"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  );
}
