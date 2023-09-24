export function PopupWithForm({
  name,
  title,
  textButton,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
          name={`popup-${name}-form`}
        >
          {children}
          <button className="popup__submit" type="submit">
            {textButton}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </section>
  );
}
