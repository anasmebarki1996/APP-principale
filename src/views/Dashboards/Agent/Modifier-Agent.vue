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
              :invalid-feedback="invalidFeedbackNom"
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
              :invalid-feedback="invalidFeedbackPrenom"
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
              :invalid-feedback="invalidFeedbackDate_de_naissance"
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
              :invalid-feedback="invalidFeedbackNumTel"
            >
              <b-form-input
                id="numTel"
                v-model="numTel"
                :state="stateNumTel"
                v-on:change="stateNumTel = null"
              ></b-form-input>
            </b-form-group>
          </b-form-group>

          <div id="childDiv" class="d-flex align-items-end flex-column">
            <div class="mt-auto">
              <b-button variant="success" v-on:click="updatePersonnelAgent()"
                >Confirmer les modifications</b-button
              >
              <b-button variant="outline-primary" v-on:click="annuler()"
                >Annuler</b-button
              >
            </div>
          </div>
        </b-card>
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="Informations Compte"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Username:"
              label-align-sm="right"
              label-for="nested-street"
              :invalid-feedback="invalidFeedbackUsername"
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
              :invalid-feedback="invalidFeedbackRole"
            >
              <b-form-radio-group
                class="pt-2"
                id="role"
                v-model="role"
                :options="[
                  { text: 'Admin', value: 'admin' },
                  {
                    text: 'CCO Agent',
                    value: 'cco_agent',
                  },
                  {
                    text: 'Agent',
                    value: 'agent',
                  },
                ]"
              ></b-form-radio-group>
            </b-form-group>
          </b-form-group>

          <div id="childDiv" class="d-flex align-items-end flex-column">
            <div class="mt-auto">
              <b-button variant="success" v-on:click="updateCompteAgent()"
                >Confirmer les modifications</b-button
              >
              <b-button variant="outline-primary" v-on:click="annuler()"
                >Annuler</b-button
              >
            </div>
          </div>
        </b-card>
        <b-card bg-variant="light">
          <b-form-group
            label="Informations Mot de Passe"
            label-cols-lg="3"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Password:"
              label-align-sm="right"
              label-for="nested-street"
              :invalid-feedback="invalidFeedbackPassword"
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
              :invalid-feedback="invalidFeedbackPasswordConfirm"
            >
              <b-form-input
                id="passwordConfirm"
                v-model="passwordConfirm"
                v-on:change="statePasswordConfirm = null"
                :state="statePasswordConfirm"
              ></b-form-input>
            </b-form-group>
          </b-form-group>

          <div id="childDiv" class="d-flex align-items-end flex-column">
            <div class="mt-auto">
              <b-button variant="success" v-on:click="updatePasswordAgent()"
                >Confirmer les modifications</b-button
              >
              <b-button variant="outline-primary" v-on:click="annuler()"
                >Annuler</b-button
              >
            </div>
          </div>
        </b-card>

        <!-- ##################################################### -->
      </div>
    </div>
  </div>
</template>
<style scoped></style>

<script>
import PageTitle from "../../../Layout/Components/PageTitle";

const dialog = require("electron").remote.dialog;

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      heading: "Modifier Agent",
      subheading:
        "This is an example dashboard created using build-in elements and components.",
      icon: "pe-7s-users icon-gradient bg-tempting-azure",
      title: "",
      link: "",
      //##########
      nom: "",
      stateNom: null,
      invalidFeedbackNom: "",
      prenom: "",
      statePrenom: null,
      invalidFeedbackPrenom: "",
      date_de_naissance: "",
      stateDate_de_naissance: null,
      invalidFeedbackDate_de_naissance: "",
      numTel: "",
      stateNumTel: null,
      invalidFeedbackNumTel: "",
      username: "",
      stateUsername: null,
      invalidFeedbackUsername: "",
      role: "",
      stateRole: null,
      invalidFeedbackRole: "",
      password: "",
      statePassword: null,
      invalidFeedbackPassword: "",
      passwordConfirm: "",
      statePasswordConfirm: null,
      invalidFeedbackPasswordConfirm: "",

      //##########
      listAgents: [],
    };
  },
  methods: {
    getAgent(idAgent) {
      this.$http
        .post("http://localhost:8000/API/getAgent", {
          idAgent: idAgent,
        })
        .then((res) => {
          this.nom = res.data.agent.nom;
          this.prenom = res.data.agent.prenom;
          this.date_de_naissance = new Date(res.data.agent.date_de_naissance);
          this.numTel = res.data.agent.numTel;
          this.username = res.data.agent.username;
          this.role = res.data.agent.role;
        })
        .catch(() => {
          this.annuler();
        });
    },
    updatePersonnelAgent() {
      let done = true;
      if (!this.nom) {
        this.stateNom = false;
        this.invalidFeedbackNom = "Veuillez vous introduire le nom";
        done = false;
      }
      if (!this.prenom) {
        this.statePrenom = false;
        this.invalidFeedbackPrenom = "Veuillez vous introduire le nom";
        done = false;
      }
      if (!this.date_de_naissance) {
        this.stateDate_de_naissance = false;
        this.invalidFeedbackDate_de_naissance =
          "Veuillez vous introduire le nom";
        done = false;
      }
      if (!this.numTel) {
        this.stateNumTel = false;
        this.invalidFeedbackNumTel = "Veuillez vous introduire le nom";
        done = false;
      }

      if (done) {
        dialog.showMessageBox(
          {
            title: "Change statut panne",
            buttons: ["Yes", "No", "Cancel"],
            message: "Vous etes sur?",
          },
          (response) => {
            if (response == 0) {
              this.$http
                .post("http://localhost:8000/API/updatePersonnelAgent", {
                  _id: this.idAgent,
                  nom: this.nom,
                  prenom: this.prenom,
                  date_de_naissance: this.date_de_naissance,
                  numTel: this.numTel,
                })
                .then((res) => {
                  console.log(res);
                  this.$bvToast.toast("Agent modifié", {
                    title: `Varianfdsfdsfsdfdsfsdfdsdsfdsfdsdsfsdt`,
                    variant: "success",
                    solid: true,
                  });
                })
                .catch((error) => {
                  dialog.showErrorBox(
                    "error" + error.response.status,
                    error.response.data.message
                  );
                  this.$bvToast.toast("Toast body content", {
                    title: `Variant`,
                    variant: "danger",
                    solid: true,
                  });
                  this.invalidFeedbackPasswordConfirm =
                    "error.response.data.message";
                  console.log(error.response);
                });
            }
          }
        );
      }
    },
    updateCompteAgent() {
      let done = true;

      if (!this.username) {
        this.stateUsername = false;
        this.invalidFeedbackUsername = "Veuillez vous introduire le nom";
        done = false;
      }
      if (!this.role) {
        this.stateRole = false;
        this.invalidFeedbackRole = "Veuillez vous introduire le nom";
        done = false;
      }

      if (done) {
        dialog.showMessageBox(
          {
            title: "Change statut panne",
            buttons: ["Yes", "No", "Cancel"],
            message: "Vous etes sur?",
          },
          (response) => {
            if (response == 0) {
              this.$http
                .post("http://localhost:8000/API/updateCompteAgent", {
                  idAgent: this.idAgent,
                  username: this.username,
                  role: this.role,
                })
                .then((res) => {
                  console.log(res);
                  this.$bvToast.toast("Agent modifié", {
                    title: `Varianfdsfdsfsdfdsfsdfdsdsfdsfdsdsfsdt`,
                    variant: "success",
                    solid: true,
                  });
                })
                .catch((error) => {
                  dialog.showErrorBox(
                    "error" + error.response.status,
                    error.response.data.message
                  );
                  this.$bvToast.toast("Toast body content", {
                    title: `Variant`,
                    variant: "danger",
                    solid: true,
                  });
                  this.invalidFeedbackPasswordConfirm =
                    "error.response.data.message";
                  console.log(error.response);
                });
            }
          }
        );
      }
    },
    updatePasswordAgent() {
      let done = true;

      if (!this.password) {
        this.statePassword = false;
        this.invalidFeedbackPassword = "Veuillez vous introduire le nom";
        done = false;
      }
      if (!this.passwordConfirm) {
        this.statePasswordConfirm = false;
        this.invalidFeedbackPasswordConfirm = "Veuillez vous introduire le nom";
        done = false;
      }
      if (
        this.password &&
        this.passwordConfirm &&
        this.password != this.passwordConfirm
      ) {
        this.statePassword = false;
        this.statePasswordConfirm = false;
        this.invalidFeedbackPassword = "Veuillez vous rerrrrrrrrrrrrrrr le ";
        this.invalidFeedbackPasswordConfirm = "Veuillez vous rerrrrrrrrrrrrrrr";
        done = false;
      }
      if (done) {
        dialog.showMessageBox(
          {
            title: "Change statut panne",
            buttons: ["Yes", "No", "Cancel"],
            message: "Vous etes sur?",
          },
          (response) => {
            if (response == 0) {
              this.$http
                .post("http://localhost:8000/API/updatePasswordAgent", {
                  _id: this.idAgent,
                  password: this.password,
                })
                .then((res) => {
                  console.log(res);
                  this.$bvToast.toast("Agent modifié", {
                    title: `Varianfdsfdsfsdfdsfsdfdsdsfdsfdsdsfsdt`,
                    variant: "success",
                    solid: true,
                  });
                  this.reset();
                })
                .catch((error) => {
                  dialog.showErrorBox(
                    "error" + error.response.status,
                    error.response.data.message
                  );
                  this.$bvToast.toast("Toast body content", {
                    title: `Variant`,
                    variant: "danger",
                    solid: true,
                  });
                  this.invalidFeedbackPasswordConfirm =
                    "error.response.data.message";
                  console.log(error.response);
                });
            }
          }
        );
      }
    },

    annuler() {
      this.$router.push({
        path: "/agent",
      });
    },
  },
  created() {},
  mounted() {
    if (!this.$route.query.idAgent) {
      this.annuler();
    }
    this.getAgent(this.$route.query.idAgent);
  },
};
</script>
