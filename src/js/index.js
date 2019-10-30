import '../sass/styles.scss';
import Authorisation from './authorization';
import Users from './users';

(async () => {
  const auth = new Authorisation();
  const promiseAuth = await auth;
  console.log(promiseAuth);

  if (promiseAuth.token !== null) {
    new Users();
    console.log( new Users());
  }

  // if (promiseAuth.token === null) {
  //   history.pushState(null, null, '/');
  //   // location.reload();
  // }
})();

// // administrator@sdkfinance.app
// // SfEFNbrdnusx8jXzgy8w
