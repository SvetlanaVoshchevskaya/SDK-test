import axios from 'axios';

export default class Authorisation {
  constructor() {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.authUrl = '/api/v1/authorization';
    this.input = document.querySelectorAll('input');
    this.form = document.querySelector('.submit_form');
    this.title = document.querySelector('title');
    this.form.addEventListener('submit', event => this.getuserAuthData(event));
  }

  getuserAuthData(event) {
    event.preventDefault();
    const userAuthData = {};
    this.input.forEach(item => {
      userAuthData[item.name] = item.value;
      item.value = '';
    });

    this.postUserAuthData(userAuthData);
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
}
