export default class UserInfo{
    constructor(selectorName, selectorStatus, selectorAvatar) {
      this._selectorName = document.querySelector(selectorName);
      this._selectorStatus = document.querySelector(selectorStatus);
      this._selectorAvatar = document.querySelector(selectorAvatar);
    }

    getUserInfo(){
      this._userInfo = {};
      this._userInfo.name = this._selectorName.textContent;
      this._userInfo.status = this._selectorStatus.textContent;
      return this._userInfo;
    }

    setUserInfo(name, status, avatarLink) {
        this._selectorName.textContent = name;
        this._selectorStatus.textContent = status;
        this._selectorAvatar.src = avatarLink;
    }
}