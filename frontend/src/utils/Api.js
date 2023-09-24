export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._authorization = options.headers.authorization; //токен
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkRes);
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    });
  }

  setUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addNewCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
  }

  addLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  removeLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setUserAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "13586674-c353-49e6-be07-3fb91b47b641",
    "Content-Type": "application/json",
  },
});
