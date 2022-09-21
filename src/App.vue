<template>
  <div>
    <pre>{{ pages }}</pre>

    <fb:login-button
      scope="public_profile,email, pages_show_list, pages_messaging, pages_manage_metadata, pages_read_engagement"
      :onlogin="checkLoginState"
    >
    </fb:login-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pages: null,
    };
  },
  methods: {
    statusChangeCallback(response) {
      // Called with the results from FB.getLoginStatus().
      console.log("statusChangeCallback");
      console.log(response); // The current login status of the person.
      if (response.status === "connected") {
        // Logged into your webpage and Facebook.
        this.testAPI();
      } else {
        alert("please login")
      }
    },

    checkLoginState() {
      // Called when a person is finished with the Login Button.
      FB.getLoginStatus(function (response) {
        // See the onlogin handler
        this.statusChangeCallback(response);
      });
    },

    testAPI() {
      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
      console.log("Welcome!  Fetching your information.... ");
      FB.api("/me", function (response) {     
        console.log("me", response) 
      });
    },
  },
  created() {
    axios
      .get(
        "https://graph.facebook.com/v15.0/3357623767804012/accounts?fields=name,access_token,picture&access_token=EAANPqH2jYscBAEZBElDjZB8GFZCLE8BOpmiy6MoxZCxp1jZBIw4G3yzZAbrqCZBwpnTz6R2Kuw3wHZAfF7yDpSjKCHl7dtvzxzylW6fCkVPDMdWf8BInXcWZAgHC81zrGteeToRHZA7sRr5jyAGyqJRG9ZBDAwW6n1pxPbz5YJRf3Sy0J85lQn1SlgbK93ZAn7M2g0ZCMgN25Ux2g15ipQZBBXn14ZBXyV7EXT3nl8ZD"
      )
      .then((response) => {
        this.pages = response.data.data;
      });
  },
};
</script>
