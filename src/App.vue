<template>
  <div>
    <pre>{{ pages }}</pre>
    <button @click="login">Facebook login</button>
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
    login() {
      FB.login(
        async function (response) {
          console.log("response", response);
          // handle the response
        },
        {
          scope:
            "public_profile,email, pages_show_list, pages_messaging, pages_manage_metadata, pages_read_engagement",
        }
      );
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
