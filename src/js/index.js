import '../sass/styles.scss';
import Authorisation from './authorization';
import Users from './users';

(async () => {
  const auth = new Authorisation();
  const promiseAuth = await auth;
  if (
    promiseAuth.token === null &&
    window.location.pathname.includes('dashboard')
  ) {
    history.pushState(null, null, 'index.html');
    document.location.reload(true);
  }
  if (promiseAuth.token !== null) {
    new Users();
  }
})();

// // administrator@sdkfinance.app
// // SfEFNbrdnusx8jXzgy8w
