<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :title="title"
      :link="link"
    ></page-title>
    <div class="row">
      <div class="col">
        <!-- ##################################################### -->
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="Informations Personnel"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Nom:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                v-model="nom"
                id="nom"
                :state="stateNom"
                v-on:change="stateNom = null"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Prenom:"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input
                id="prenom"
                v-model="prenom"
                :state="statePrenom"
                v-on:change="statePrenom = null"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Date de naissance:"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-datepicker
                id="date_de_naissance"
                v-model="date_de_naissance"
                :state="stateDate_de_naissance"
                v-on:change="stateDate_de_naissance = null"
                locale="fr"
                class="mb-2"
              ></b-form-datepicker>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Numéro de téléphone:"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input
                id="numTel"
                v-model="numTel"
                :state="stateNumTel"
                v-on:change="stateNumTel = null"
              ></b-form-input>
            </b-form-group>
          </b-form-group>
        </b-card>
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Username:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="username"
                v-model="username"
                v-on:change="stateUsername = null"
                :state="stateUsername"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Role:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="role"
                v-model="role"
                v-on:change="stateRole = null"
                :state="stateRole"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Password:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="password"
                v-model="password"
                v-on:change="statePassword = null"
                :state="statePassword"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="confirmer password:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="passwordConfirm"
                v-model="passwordConfirm"
                v-on:change="statePasswordConfirm = null"
                :state="statePasswordConfirm"
              ></b-form-input>
            </b-form-group>
          </b-form-group>
        </b-card>

        <!-- ##################################################### -->
      </div>
    </div>

    <div id="childDiv" class="d-flex align-items-end flex-column">
      <div class="mt-auto">
        <b-button variant="success" v-on:click="addTeam()">Ajouter</b-button>
        <b-button variant="outline-primary" v-on:click="reset()"
          >reset</b-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<script>
import PageTitle from "../../../Layout/Components/PageTitle";
const axios = require("axios");
const dialog = require("electron").remote.dialog;
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      heading: "Nouveau Agent",
      subheading:
        "This is an example dashboard created using build-in elements and components.",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      title: "",
      link: "",
      //##########
      nom: "",
      stateNom: null,
      prenom: "",
      statePrenom: null,
      date_de_naissance: "",
      stateDate_de_naissance: null,
      numTel: "",
      stateNumTel: null,
      username: "",
      stateUsername: null,
      role: "",
      stateRole: null,
      password: "",
      statePassword: null,
      passwordConfirm: "",
      statePasswordConfirm: null,
      //##########
      listAgents: [],
    };
  },
  methods: {
    addTeam() {
      let done = true;
      let agents = [];
      if (!this.nom) {
        this.stateNom = false;
        done = false;
      }
      if (!this.prenom) {
        this.statePrenom = false;
        done = false;
      }
      if (!this.username) {
        this.stateUsername = false;
        done = false;
      }
      if (!this.date) {
        dialog.showErrorBox("title here", "Veuilliez vous introduire la date");
        done = false;
      }
      if (done) {
        agents.push({ agent: this.nom, type: "chauffeur" });
        agents.push({ agent: this.username, type: "username" });
        for (var i = 1; i <= this.numberOfDiv; i++) {
          if (this.nomAgent[i]) {
            agents.push({ agent: this.nomAgent[i], type: "secours" });
          }
        }
        axios
          .post("http://localhost:8000/API/addTeam", {
            agents: agents,
            prenom: this.prenom,
            date: this.date,
          })
          .then((res) => {
            console.log(res);
            this.$bvToast.toast("Toast body content", {
              title: `Variant`,
              variant: "success",
              solid: true,
            });
            this.reset();
          });
      }
    },

    reset() {
      this.stateNom = null;
      this.statePrenom = null;
      this.stateUsername = null;
      this.nom = "";
      this.prenom = "";
      this.username = "";
      this.date = "";
      for (var i = 1; i <= this.numberOfDiv; i++) {
        this.nomAgent[i] = "";
      }
    },
  },
  created() {},
  mounted() {
    this.getLastElementChild();
    this.getAgents();
  },
};
</script>
