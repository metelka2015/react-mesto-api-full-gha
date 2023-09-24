export function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_image ${card ? "popup_opened" : ""}`}
      aria-label="Просмотр картинки"
    >
      <div className="popup__image-container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img src={card?.link} className="popup__image" alt={card?.name} />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}
