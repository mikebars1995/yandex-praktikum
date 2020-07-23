

class UserInfo {
  constructor({profileTitleSelector, profileDescriptionSelector}) {
    this._title = document.querySelector(profileTitleSelector)
    this._description = document.querySelector(profileDescriptionSelector)
  }

  getUserInfo() {
    const title = this._title.textContent
    const description = this._description.textContent
    return {title, description}
  }

  setUserInfo({title, description}) {
    this._title.textContent = title
    this._description.textContent = description
  }
}

export default UserInfo;