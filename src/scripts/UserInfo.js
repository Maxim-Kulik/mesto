export default class UserInfo{
    constructor(selectorName, selectorStatus ) {
      this._selectorName = document.querySelector(selectorName);
      this._selectorStatus = document.querySelector(selectorStatus);
    }

    getUserInfo(){
      this._userInfo = {};
      this._userInfo.name = this._selectorName.textContent;
      this._userInfo.status = this._selectorStatus.textContent;
      return this._userInfo;
    }

    setUserInfo(name, status) {
        this._selectorName.textContent = name;
        this._selectorStatus.textContent = status
    }
}