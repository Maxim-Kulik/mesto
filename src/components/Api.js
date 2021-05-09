 export default class Api{
    constructor(config){
      this._url = config.url;
      this._headers = config.headers;
    }

    getAllTasks(){
      return fetch(`${this._url}/cards`, {
          method: 'GET',
          headers: this._headers
      })
      .then((res) => {
        return this._checkingResponse(res)
      })
    }

    addTasks(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then((res) => {
          return this._checkingResponse(res)
        })
    }

    deleteTasks(id){
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => {
          return this._checkingResponse(res)
        })
    }

    getUserInfo(){
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers,
    })
    .then((res) => {
      return this._checkingResponse(res)
    })
    }

    getAllNeedData(){
      return Promise.all([this.getAllTasks(), this.getUserInfo()])
    }

    editUserInfo(profileName, profileAbout){
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name: profileName, about: profileAbout})
    })
    .then((res) => {
      return this._checkingResponse(res)
    })
    }

    editAvatar(urlAvatar){
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar: urlAvatar})
    })
    .then((res) => {
      return this._checkingResponse(res)
    })
  }

    getLikesArray(id){
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers
    })
    .then((res) => {
      return this._checkingResponse(res)
    })
    }

    deletLikeElement(id){
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers
    })
    .then((res) => {
      return this._checkingResponse(res)
    })
    }

    _checkingResponse(res){
      if (res.ok){
        return res.json()
        }
        return Promise.reject('Произошла ошибка')
    }
}