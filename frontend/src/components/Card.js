import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn && "element__delete-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="element__image"
      />
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
