<template>
  <div id="parent">
    <div
      class="d-flex h-100 justify-content-center align-items-center"
      id="form_login"
    >
      <b-col md="4" style="margin-bottom:100px;">
        <div class="h5 modal-title text-center" style="margin:30px">
          <img
            src="./../../assets/images/protection_civile_logo.png"
            alt=""
            style="width:100px"
          />
        </div>
        <b-form-group
          id="exampleInputGroup1"
          label-for="username"
          :invalid-feedback="invalidFeedbackUsername"
        >
          <b-form-input
            id="username"
            type="text"
            v-model="username"
            :state="stateUsername"
            trim
            autofocus
            placeholder="Nom d'utilsateur"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="exampleInputGroup2"
          label-for="password"
          :invalid-feedback="invalidFeedbackPassword"
          :state="statePassword"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="password"
            :state="statePassword"
            placeholder="Mot de passe"
          >
          </b-form-input>
        </b-form-group>
        <div>
          <b-button class="btn btn-warning col-12" v-on:click="onSubmit"
            >Entrer</b-button
          >
        </div>
        <div class="d-flex justify-content-center">
          <div style="position: fixed;bottom: 0; margin-bottom:2%">
            <div>
              Copyright © 2020 Protection Civile.
            </div>
            <div>
              الحماية المدنية
            </div>
          </div>
        </div>
      </b-col>
    </div>
  </div>
</template>

<style scoped>
#parent {
  display: table;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
#form_login {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>
<script>
// @ is an alias to /src
const axios = require("axios");

export default {
  name: "Login",
  components: {},

  data() {
    return {
      username: "admin",
      password: "ANas123123123_",
      messages: [],
      stateUsername: null,
      invalidFeedbackUsername: null,
      statePassword: null,
      invalidFeedbackPassword: null
    };
  },
  methods: {
    onSubmit() {
      this.checkInput();
      if (this.stateUsername != false && this.statePassword != false) {
        axios
          .post("http://localhost:8000/API/login", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            this.$store.commit("init_agent", res.data);
            this.$router.push({ path: "/" }).catch(err => {
              console.log("------------------");
              console.log(err);
            });
          })
          .catch(error => {
            this.stateUsername = false;
            this.statePassword = false;
            this.invalidFeedbackUsername = "";
            this.invalidFeedbackPassword = error.response.data.message;
          });
      }
    },
    getMessage() {
      axios.get("http://localhost:8000/API/conversation").then(res => {
        this.messages = res.data.data.conversations[0].message;
      });
    },
    checkInput() {
      this.stateUsername = this.username.length >= 4 ? true : false;
      if (this.username.length >= 4) {
        this.invalidFeedbackUsername = "";
      } else if (this.username.length > 0) {
        this.invalidFeedbackUsername =
          "veuillez vous verifier votre nom d'utilisateur";
      } else {
        this.invalidFeedbackUsername =
          "veuillez vous introduire votre nom d'utilisateur";
      }

      // #####################################
      this.statePassword = this.password.length >= 8 ? true : false;
      if (this.password.length >= 8) {
        this.invalidFeedbackPassword = "";
      } else if (this.password.length > 0) {
        this.invalidFeedbackPassword =
          "veuillez vous verifier votre mot de passe";
      } else {
        this.invalidFeedbackPassword =
          "veuillez vous introduire votre mot de passe";
      }
    }
  },

  created() {},
  computed: {}
};
</script>
