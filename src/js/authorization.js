import axios from 'axios';

export default class Authorisation {
  constructor() {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.authUrl = '/api/v1/authorization';
    this.input = document.querySelectorAll('input');
    this.form = document.querySelector('.submit_form');
    this.title = document.querySelector('title');
    const getData = this.getuserAuthData;
    console.log(getData === getData);
    this.form.addEventListener('submit', getData);
    if (this.form === null) {
      this.form.removeEventListener('submit', getData);
    }
  }

  getuserAuthData(event) {
    event.preventDefault();
    const userAuthData = {};
    this.input.forEach(item => {
      userAuthData[item.name] = item.value;
      item.value = '';
    });

    this.postUserAuthData(userAuthData);
    this.redirectToDashboard();
  }

  postUserAuthData(data) {
    axios
      .post(this.authUrl, data)
      .then(response => {
        localStorage.setItem(
          'token',
          JSON.stringify(response.data.authorizationToken.token)
        );
      })
      .catch(error => console.log(error));
  }

  redirectToDashboard() {
    if (this.userToken) {
      history.pushState(null, null, 'dashboard.html');
      location.reload();
    }
    //this.form.removeEventListener('submit', this.getuserAuthData);
  }
}
