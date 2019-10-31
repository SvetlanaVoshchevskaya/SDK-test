import axios from 'axios';

export default class Users {
  constructor() {
    this.userDataURL = '/api/v1/users/view';
    this.tBody = document.querySelector('tbody');
    this.userToken = JSON.parse(localStorage.getItem('token'));
    window.addEventListener('load', () => this.redirectToDashboard());
  }

  redirectToDashboard() {
    if (this.userToken && !window.location.pathname.includes('dashboard')) {
      history.pushState(null, null, 'dashboard.html');
      document.location.reload(true);
    }
    this.getUserData();
  }

  getUserData() {
    axios
      .post(
        this.userDataURL,
        { pageSize: 10, pageNumber: 0 },
        { headers: { Authorization: `TOKEN ${this.userToken}` } }
      )
      .then(response => {
        const htmlString = response.data.records.reduce(
          (acc, item) =>
            acc +
            `<tr scope="row">
          <td>${item.name}</td>
          <td>${item.contact.email}</td>
          <td>${
            item.contact.phoneNumber === null
              ? (item.contact.phoneNumber = '--')
              : item.contact.phoneNumber
          }</td>
          <td>${new Date(item.createdAt).toGMTString().slice(0, -3)}</td>
          <td>${
            item.banExpiryDate === null
              ? (item.banExpiryDate = '---')
              : item.banExpiryDate
          }</td>
          <td>${
            item.active ? (item.active = 'Activ') : (item.active = 'Not active')
          }</td>
        </tr>`,
          ''
        );
        this.tBody.innerHTML = htmlString;
      });
  }
}
