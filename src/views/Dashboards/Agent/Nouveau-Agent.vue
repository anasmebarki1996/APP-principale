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
        <b-card bg-variant="link">
          <b-form-group
            label-cols-lg="3"
            label="Informations Personnelles"
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
        </b-card>
        <b-card bg-variant="link">
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
            <b-form-group
              label-cols-sm="3"
              label="Unité:"
              label-align-sm="right"
              label-for="nested-street"
              :invalid-feedback="invalidFeedbackUsername"
            >
              <select class="mb-2 form-control" v-model="id_unite">
                <option
                  v-bind:value="unite1._id"
                  v-for="unite1 in unites"
                  v-bind:key="unite1._id"
                  >{{ unite1.nom }}</option
                >
              </select>
            </b-form-group>
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
              <b-button variant="success" v-on:click="createAgent()"
                >Ajouter</b-button
              >
              <b-button variant="outline-primary" v-on:click="reset()"
                >reset</b-button
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

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      heading: "Nouveau Agent",
      subheading: "",
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
      role: "agent",
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
      unites: [],
      id_unite: "",
    };
  },
  methods: {
    createAgent() {
      let done = true;
      if (!this.nom) {
        this.stateNom = false;
        this.invalidFeedbackNom = "Veuillez vous introduire le nom";
        done = false;
      }
      if (!this.prenom) {
        this.statePrenom = false;
        this.invalidFeedbackPrenom = "Veuillez vous introduire le prénom";
        done = false;
      }
      if (!this.date_de_naissance) {
        this.stateDate_de_naissance = false;
        this.invalidFeedbackDate_de_naissance =
          "Veuillez vous introduire la date de naissance";
        done = false;
      }
      if (!this.numTel) {
        this.stateNumTel = false;
        this.invalidFeedbackNumTel =
          "Veuillez vous introduire le numéro de téléphone";
        done = false;
      }
      if (!this.username) {
        this.stateUsername = false;
        this.invalidFeedbackUsername =
          "Veuillez vous introduire le nom d'utilisateur";
        done = false;
      }
      if (!this.role) {
        this.stateRole = false;
        this.invalidFeedbackRole = "Veuillez vous introduire le role";
        done = false;
      }
      if (!this.password) {
        this.statePassword = false;
        this.invalidFeedbackPassword =
          "Veuillez vous introduire le mot de passer";
        done = false;
      }
      if (!this.passwordConfirm) {
        this.statePasswordConfirm = false;
        this.invalidFeedbackPasswordConfirm =
          "Veuillez vous introduire le mot de passe confirmation";
        done = false;
      }
      if (
        this.password &&
        this.passwordConfirm &&
        this.password != this.passwordConfirm
      ) {
        this.statePassword = false;
        this.statePasswordConfirm = false;
        this.invalidFeedbackPassword = "";
        this.invalidFeedbackPasswordConfirm = "Mot de passe non identiques";
        done = false;
      }
      if (done) {
        this.$dialog.showMessageBox(
          {
            title: "Ajouter un agent",
            buttons: ["Yes", "No", "Cancel"],
            message: "Vous etes sur?",
          },
          (response) => {
            if (response == 0) {
              this.$http
                .post(process.env.VUE_APP_API + "/createAgent", {
                  nom: this.nom,
                  prenom: this.prenom,
                  date_de_naissance: this.date_de_naissance,
                  numTel: this.numTel,
                  username: this.username,
                  role: this.role,
                  password: this.password,
                  passwordConfirm: this.passwordConfirm,
                  id_unite: this.id_unite,
                })
                .then(() => {
                  this.$dialog.showMessageBox({
                    title: "success",
                    message: "Agent ajouté avec succès",
                  });
                  this.reset();
                })
                .catch((error) => {
                  this.$dialog.showErrorBox(
                    "error" + error.response.status,
                    error.response.data.message
                  );
                  this.invalidFeedbackPasswordConfirm =
                    error.response.data.message;
                });
            }
          }
        );
      }
    },

    reset() {
      this.nom = "";
      this.stateNom = null;
      this.invalidFeedbackNom = "";
      this.prenom = "";
      this.statePrenom = null;
      this.invalidFeedbackPrenom = "";
      this.date_de_naissance = "";
      this.stateDate_de_naissance = null;
      this.invalidFeedbackDate_de_naissance = "";
      this.numTel = "";
      this.stateNumTel = null;
      this.invalidFeedbackNumTel = "";
      this.username = "";
      this.stateUsername = null;
      this.invalidFeedbackUsername = "";
      this.role = "";
      this.stateRole = null;
      this.invalidFeedbackRole = "";
      this.password = "";
      this.statePassword = null;
      this.invalidFeedbackPassword = "";
      this.passwordConfirm = "";
      this.statePasswordConfirm = null;
      this.invalidFeedbackPasswordConfirm = "";
      this.id_unite = "";
    },
    getListUnitePrincipaleAndSesSecondaire() {
      this.$http
        .post(
          process.env.VUE_APP_API + "/getListUnitePrincipaleAndSesSecondaire"
        )
        .then((res) => {
          this.unites = res.data.unites;
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
  },
  created() {
    this.id_unite = this.$store.getters.get_agent_id_unite;
    this.getListUnitePrincipaleAndSesSecondaire();
  },
  mounted() {},
};
</script>
