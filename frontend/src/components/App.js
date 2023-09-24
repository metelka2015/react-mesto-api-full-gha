import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Header } from "./Header.js";
import { Main } from "./Main.js";
import { Footer } from "./Footer.js";
import { ImagePopup } from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/Api.js";
import * as auth from "../utils/auth.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";
import { ConfirmDeletePopup } from "./ConfirmDeletePopup.js";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { Login } from "./Login.js";
import { InfoTooltip } from "./InfoTooltip.js";
import { Register } from "./Register.js";

function App() {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registeredIn, setRegisteredIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.error);
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setSelectedCard(null);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setRegisteredIn(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch(console.error);
  }

  function handleCardDelete() {
    api
      .deleteCard(cardDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardDelete._id));
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar({ avatar: data })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setRegisteredIn(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        setRegisteredIn(false);
        console.log(error);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setUserInfo(email, password);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        setLoggedIn(false);
        console.log(error);
      });
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setUserInfo(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          localStorage.removeItem("token");
          navigate("/sign-up", { replace: true });
          console.log(error);
        });
    }
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  function handleCardConfirmDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardDelete(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userInfo={userInfo}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardConfirmDelete}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-up" replace />
              )
            }
          />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          registeredIn={registeredIn}
        />
        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmDeletePopup
          onClose={closeAllPopups}
          isOpen={isConfirmDeletePopupOpen}
          onDeletePlace={handleCardDelete}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
