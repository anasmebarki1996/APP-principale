<template>
  <div>
    <div class="h-100 bg-plum-plate bg-animation">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <div class="app-logo-inverse mx-auto mb-3" />

          <div class="modal-dialog w-100 mx-auto">
            <div class="modal-content">
              <div class="modal-body">
                <div class="h5 modal-title text-center">
                  <h4 class="mt-2">
                    <div>Welcome back,</div>
                    <span>Please sign in to your account below.</span>
                  </h4>
                </div>
                <b-form-group
                  id="exampleInputGroup1"
                  label-for="exampleInput1"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    id="exampleInput1"
                    type="email"
                    v-model="email"
                    required
                    autofocus
                    placeholder="Enter email..."
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup2" label-for="exampleInput2">
                  <b-form-input
                    id="exampleInput2"
                    type="password"
                    v-model="password"
                    required
                    placeholder="Enter password..."
                  >
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="modal-footer clearfix">
                <div class="float-left">
                  <a href="javascript:void(0);" class="btn-lg btn btn-link"
                    >Recover Password</a
                  >
                </div>
                <div class="float-right">
                  <b-button variant="primary" size="lg"
                    >Login to Dashboard</b-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="text-center text-white opacity-8 mt-3">
            Copyright &copy; ArchitectUI 2019
          </div>
        </b-col>
      </div>
    </div>
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
