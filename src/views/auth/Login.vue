<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <main class="login-form">
      <div class="cotainer">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">Login</div>
              <div class="card-body">
                <form action method v-on:submit.prevent="onSubmit">
                  <div class="form-group row">
                    <label
                      for="email_address"
                      class="col-md-4 col-form-label text-md-right"
                      >E-Mail Address</label
                    >
                    <div class="col-md-6">
                      <input
                        type="email"
                        class="form-control"
                        v-model="email"
                        required
                        autofocus
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label
                      for="password"
                      class="col-md-4 col-form-label text-md-right"
                      >Password</label
                    >
                    <div class="col-md-6">
                      <input
                        type="password"
                        v-model="password"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <div class="col-md-6 offset-md-4">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" name="remember" /> Remember Me
                          {{ user_id }}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">
                      Login
                    </button>
                    <a href="#" class="btn btn-link">Forgot Your Password?</a>
                  </div>
                </form>

                <b-list-group>
                  <b-list-group-item>{{ messages }}</b-list-group-item>
                </b-list-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
const axios = require("axios");

export default {
  name: "Login",
  components: {},

  data() {
    return {
      email: "anasmebarki1996@outlook.fr",
      password: "123123123",
      messages: []
    };
  },
  methods: {
    onSubmit() {
      axios
        .post("http://localhost:8000/API/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.$store.commit("init_user_id", res.data.user_id);
          this.$router.push({ path: "/home" }).catch(err => {
            console.log(err);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMessage() {
      axios.get("http://localhost:8000/API/conversation").then(res => {
        this.messages = res.data.data.conversations[0].message;
      });
    }
  },
  created() {}
};
</script>

<style scoped>
body {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
  text-align: left;
  background-color: #f5f8fa;
}

.navbar-laravel {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.navbar-brand,
.nav-link,
.my-form,
.login-form {
  font-family: Raleway, sans-serif;
}

.my-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.my-form .row {
  margin-left: 0;
  margin-right: 0;
}

.login-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.login-form .row {
  margin-left: 0;
  margin-right: 0;
}
</style>
