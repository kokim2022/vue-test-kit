<template>
  <div>
    <button class="button" @click="logInWithFacebook" v-if="pageListings">
      Login with Facebook
    </button>
    <div v-else>
      {{ pageListing }}
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "facebookLogin",
  created() {
    this.init()
  },
  data () {
    return {
      authResponse: null,
      pageListing : null
    }
  },
  methods: {
    async init() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
    },
    getPages () {
      axios.get(`https://graph.facebook.com/v15.0/${this.authResponse.userID}/accounts?fields=name,access_token,picture&access_token=${this.authResponse.accessToken}`)
      .then (response => {
        this.pageListing = response.data
      })
    },
    async logInWithFacebook() {
      window.FB.login(
        function (response) {
          if (response.authResponse) {
            this.authResponse = response.authResponse
            this.getPages()
            // Now you can redirect the user or do an AJAX request to
            // a PHP script that grabs the signed request from the cookie.
          } else {
            alert("User cancelled login or did not fully authorize.");
          }
        },
        {
          scope:
            "public_profile,email, pages_show_list, pages_messaging, pages_manage_metadata, pages_read_engagement",
        }
      );
      return false;
    },
    async initFacebook() {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "932010011091655",
          cookie: true, // Enable cookies to allow the server to access the session.
          xfbml: true, // Parse social plugins on this webpage.
          version: "v15.0", // Use this Graph API version for this call.
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },
  },
};
</script>
<style>
.button {
  color: white;
  min-width: 150px;
  background-color: #000000a1;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
}
</style>
