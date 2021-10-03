export default class UserInfo {
    constructor({profileName, profileJob }) {
      this._profileName = document.querySelector(profileName);
      this._profileJob = document.querySelector(profileJob);
    }
  
    getUserInfo() {
      const inputValues = {
        name: this._profileName.textContent,
        job: this._profileJob.textContent,
       
      }
      return inputValues;
    }
  
    setUserInfo(inputValues) {
        this._profileName.textContent = popupInputName.value;
        this._profileJob.textContent = popupInputJob.value;  
    }
}