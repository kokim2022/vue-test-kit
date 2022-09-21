import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'


function initFacebookSdk() {
  return new Promise(resolve => {
    // wait for facebook sdk to initialize before starting the vue app
    window.fbAsyncInit = function () {
      FB.init({
        appId: '932010011091655',
        cookie: true,                     // Enable cookies to allow the server to access the session.
        xfbml: true,                     // Parse social plugins on this webpage.
        version: 'v15.0'           // Use this Graph API version for this call.
      });
      // auto authenticate with the api if already logged in with facebook
      FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
        } else {
          resolve();
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}
initFacebookSdk().then(
  createApp(App).mount('#app')
)
