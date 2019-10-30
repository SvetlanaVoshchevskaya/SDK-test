import axios from 'axios';
// import Authorisation from './authorization';

export default class Users  {
  constructor() {
    
    this.userDataURL = '/api/v1/users/view';
    this.tBody = document.querySelector('tbody');
    this.userToken = JSON.parse(localStorage.getItem('token'));
    document.addEventListener('DOMContentLoaded', () => this.getUserData());
  }

  redirectToDashboard() {
    if (this.userToken) {
      history.pushState(null, null, 'dashboard.html');
      location.reload();
    }
  }

  getUserData() {
    axios
      .post(
        this.userDataURL,
        { pageSize: 10, pageNumber: 0 },
        { headers: { Authorization: `TOKEN ${this.userToken}` } }
      )
      .then(response => {
        console.log(response.data.records);
        const htmlString = response.data.records.reduce(
          (acc, item) =>
            acc +
            `<tr scope="row">
          <td>${item.name}</td>
          <td>${item.contact.email}</td>
          <td>${item.contact.phoneNumber}</td>
          <td>${new Date(item.createdAt).toGMTString()}</td>
          <td>${item.banExpiryDate}</td>
          <td>${item.status}</td>
        </tr>`,
          ''
        );
        this.tBody.innerHTML = htmlString;
      });
  }
}
