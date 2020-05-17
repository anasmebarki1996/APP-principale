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
      <div class="col-lg-7">
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
              label="Chauffeur:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <div class="row">
                <div class="col-md-8">
                  <b-form-input
                    v-model="chauffeur"
                    id="chauffeur"
                    :state="stateChauffeur"
                    list="listChauffeur"
                    v-on:change="stateChauffeur = null"
                  ></b-form-input>
                  <datalist id="listChauffeur">
                    <option v-for="agent in listAgents" :key="agent">
                      {{ agent }}
                    </option>
                  </datalist>
                </div>
                <div class="col-md-4">
                  <font-awesome-icon
                    icon="check"
                    color="green"
                    v-on:click="addChauffeur()"
                    class="d-inline"
                  />
                  /
                  <font-awesome-icon
                    icon="minus"
                    color="red"
                    v-on:click="deleteChauffeur()"
                    class="d-inline"
                  />
                </div>
              </div>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Matricule engin"
              label-align-sm="right"
              label-for="nested-city"
              ><div class="row">
                <div class="col-md-8">
                  <b-form-input
                    id="engin"
                    v-model="engin"
                    :state="stateEngin"
                    v-on:change="stateEngin = null"
                    list="listEngin"
                  ></b-form-input>
                  <datalist id="listEngin">
                    <option v-for="engin in listEngins" :key="engin">
                      {{ engin }}
                    </option>
                  </datalist>
                </div>
                <div class="col-md-4">
                  <font-awesome-icon
                    icon="check"
                    color="green"
                    v-on:click="addEngin()"
                    class="d-inline"
                  />
                  /
                  <font-awesome-icon
                    icon="minus"
                    color="red"
                    v-on:click="deleteEngin()"
                    class="d-inline"
                  />
                </div>
              </div>
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
              label="Chef d'agrée:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <div class="row">
                <div class="col-md-8">
                  <b-form-input
                    id="chef"
                    v-model="chef"
                    v-on:change="stateChef = null"
                    :state="stateChef"
                    list="listChef"
                  ></b-form-input>
                  <datalist id="listChef">
                    <option v-for="agent in listAgents" :key="agent">
                      {{ agent }}
                    </option>
                  </datalist>
                </div>
                <div class="col-md-4">
                  <font-awesome-icon
                    icon="check"
                    color="green"
                    v-on:click="addChef()"
                    class="d-inline"
                  />
                  /
                  <font-awesome-icon
                    icon="minus"
                    color="red"
                    v-on:click="deleteChef()"
                    class="d-inline"
                  />
                </div>
              </div>
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
              :label="`Agent #${index}`"
              label-align-sm="right"
              v-for="index in numberInput"
              :key="index"
              :id="`div${index}`"
            >
              <div class="row">
                <div class="col-md-8">
                  <b-form-input
                    :id="`nomAgent${index}`"
                    type="text"
                    required
                    placeholder="Entrer le nom de l'agent"
                    v-model="nomAgent[index]"
                    :state="stateNomAgent[index]"
                    v-on:change="stateNomAgent[index] = null"
                    :list="`listNomAgent${index}`"
                  ></b-form-input>
                  <datalist :id="`listNomAgent${index}`">
                    <option v-for="agent in listAgents" :key="agent">
                      {{ agent }}
                    </option>
                  </datalist>
                </div>
                <div class="col-md-4">
                  <font-awesome-icon
                    icon="check"
                    color="green"
                    v-on:click="addSecours(index)"
                    class="d-inline"
                  />
                  /
                  <font-awesome-icon
                    icon="minus"
                    color="red"
                    v-on:click="deleteSecours(index)"
                    class="d-inline"
                  />/
                  <font-awesome-icon
                    icon="plus"
                    color="green"
                    v-if="index == idOfLastDiv"
                    v-on:click="addDiv()"
                    class="d-inline"
                  />
                </div>
              </div>
            </b-form-group>
          </b-form-group>
        </b-card>
        <!-- ##################################################### -->
      </div>

      <b-card bg-variant="light" class="col-md-5">
        <b-calendar v-model="date" locale="fr" block></b-calendar>
        <br />
        <div id="childDiv" class="d-flex align-items-end flex-column">
          <div class="mt-auto">
            <b-button variant="success" v-on:click="updateDate()"
              >Modifier la date</b-button
            >
            <b-button variant="outline-primary" v-on:click="reset()"
              >Annuler</b-button
            >
          </div>
        </div>
      </b-card>
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
      heading: "Modifier equipe",
      subheading:
        "This is an example dashboard created using build-in elements and components.",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      title: "Nouvelle équipe",
      link: "/nouvelle-equipe",
      //##########
      index: 0,
      date: "",
      stateDate: null,
      chauffeur: "",
      stateChauffeur: null,
      engin: "",
      stateEngin: null,
      chef: "",
      stateChef: null,
      nomAgent: [],
      stateNomAgent: [],
      //##########
      idOfLastDiv: 0,
      numberOfDiv: 0,
      numberInput: 3,
      //##########
      listAgents: [],
      listEngins: [],
    };
  },
  methods: {
    getLastElementChild: async function() {
      var count = 0;
      var last;
      var div;
      var i = 1;
      while (i <= this.numberInput) {
        div = document.getElementById("nomAgent" + i);
        if (div && div.innerText != " ") {
          last = i;
          count++;
        }
        i++;
      }
      this.$nextTick().then(function() {
        div = document.getElementById("nomAgent" + i);
        if (div && div.innerText != "") {
          last = i;
          count++;
        }
      });
      await this.$nextTick();
      this.idOfLastDiv = last;
      this.numberOfDiv = count;
    },
    removeDiv: async function(index) {
      var list = document.getElementById("div" + index);
      var label;
      var getValueOfLabel;
      var i = 1;
      await this.$nextTick();
      this.getLastElementChild();
      await this.$nextTick();

      label = document.getElementById("div" + index + "__BV_label_");
      label = label.innerText;
      getValueOfLabel = parseInt(label.slice(7, 1000));

      if (getValueOfLabel == 1 && this.numberOfDiv == 1)
        alert("Vous ne pouvez pas supprimer");
      else {
        while (list.firstChild) {
          list.removeChild(list.firstChild);
        }
        this.nomAgent[index] = "";
        list.innerText = "";
        list.style.margin = "0px";
        await this.$nextTick();
        this.getLastElementChild();
        await this.$nextTick();
        index = 1;
        while (index <= this.numberInput && i <= this.idOfLastDiv) {
          label = document.getElementById("div" + index + "__BV_label_");
          if (label && label.innerText != "") {
            label = label.innerText;
            getValueOfLabel = label.slice(1, 1000);
            getValueOfLabel--;
            document.getElementById("div" + index + "__BV_label_").innerText =
              "Agent #" + i;
            i++;
          }
          index++;
        }
      }
    },
    addDiv: async function() {
      this.numberInput++;
      await this.$nextTick();
      this.getLastElementChild();
      await this.$nextTick();
      this.numberOfDiv;
      this.$nextTick(() => {
        document.getElementById(
          "div" + this.numberInput + "__BV_label_"
        ).innerText = "Agent #" + this.numberOfDiv;
      });
      await this.$nextTick();
    },

    getAgents() {
      this.$http.post("http://localhost:8000/API/searchAgent").then((res) => {
        this.listAgents = res.data.agents.map((el) => el.result);
      });
      this.$http.post("http://localhost:8000/API/searchEngin").then((res) => {
        this.listEngins = res.data.engins.map((el) => el.result);
      });
    },

    getTeam(id_team) {
      this.$http
        .post("http://localhost:8000/API/planning/getTeam", {
          id_team: id_team,
        })
        .then((res) => {
          this.engin =
            res.data.team.engin.code_name +
            " ---" +
            res.data.team.engin.matricule;
          if (this.engin) document.getElementById("engin").readOnly = true;
          this.date = new Date(res.data.team.date);
          let j = 1;
          for (let i = 0; i < res.data.team.agents.length; i++) {
            if (res.data.team.agents[i].type == "chef") {
              this.chef =
                res.data.team.agents[i].nom +
                " " +
                res.data.team.agents[i].prenom +
                " ---" +
                res.data.team.agents[i].username;
              document.getElementById("chef").readOnly = true;
            } else if (res.data.team.agents[i].type == "chauffeur") {
              this.chauffeur =
                res.data.team.agents[i].nom +
                " " +
                res.data.team.agents[i].prenom +
                " ---" +
                res.data.team.agents[i].username;
              document.getElementById("chauffeur").readOnly = true;
            } else {
              this.nomAgent[j] =
                res.data.team.agents[i].nom +
                " " +
                res.data.team.agents[i].prenom +
                " ---" +
                res.data.team.agents[i].username;
              document.getElementById("nomAgent" + j).readOnly = true;
              j++;
            }
            this.numberInput = j - 1 > 0 ? j - 1 : 1;
            this.getLastElementChild();
            this.getAgents();
          }
        });
    },
    // ######################## Chauffeur ########################
    addChauffeur() {
      let done = true;
      if (!this.chauffeur) {
        this.stateChauffeur = false;
        done = false;
      }
      if (done) {
        this.$http
          .post("http://localhost:8000/API/planning/addChauffeur", {
            chauffeur: this.chauffeur,
            id_team: this.$route.query.id_team,
          })
          .then(() => {
            document.getElementById("chauffeur").readOnly = true;
            this.$bvToast.toast("Toast body content", {
              title: `Variant`,
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
          });
      }
    },
    deleteChauffeur() {
      dialog.showMessageBox(
        {
          title: "Etes vous sur de supprimer le chauffeur",
          buttons: ["Yes", "No", "Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post("http://localhost:8000/API/planning/deleteChauffeur", {
                chauffeur: this.chauffeur,
                id_team: this.$route.query.id_team,
              })
              .then((res) => {
                console.log(res);
                this.$bvToast.toast("Chaffeur supprimé", {
                  title: `Varianfdsfdsfsdfdsfsdfdsdsfdsfdsdsfsdt`,
                  variant: "success",
                  solid: true,
                });
                this.chauffeur = "";
                document.getElementById("chauffeur").readOnly = false;
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
              });
          }
        }
      );
    },
    // ######################## Engin ########################
    addEngin() {
      let done = true;
      if (!this.engin) {
        this.stateEngin = false;
        done = false;
      }
      if (done) {
        this.$http
          .post("http://localhost:8000/API/planning/addEngin", {
            engin: this.engin,
            id_team: this.$route.query.id_team,
          })
          .then(() => {
            document.getElementById("engin").readOnly = true;
            this.$bvToast.toast("Toast body content", {
              title: `Variant`,
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
          });
      }
    },
    deleteEngin() {
      dialog.showMessageBox(
        {
          title: "Etes vous sur de supprimer le chauffeur",
          buttons: ["Yes", "No", "Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post("http://localhost:8000/API/planning/deleteEngin", {
                engin: this.engin,
                id_team: this.$route.query.id_team,
              })
              .then((res) => {
                console.log(res);
                this.$bvToast.toast("Engin supprimé", {
                  title: `Varianfdsfdsfsdfdsfsdfdsdsfdsfdsdsfsdt`,
                  variant: "success",
                  solid: true,
                });
                this.engin = "";
                document.getElementById("engin").readOnly = false;
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
              });
          }
        }
      );
    },
    // ######################## Chef ########################
    addChef() {
      let done = true;
      if (!this.chef) {
        this.stateChef = false;
        done = false;
      }
      if (done) {
        this.$http
          .post("http://localhost:8000/API/planning/addChef", {
            chef: this.chef,
            id_team: this.$route.query.id_team,
          })
          .then(() => {
            document.getElementById("chef").readOnly = true;
            this.$bvToast.toast("Toast body content", {
              title: `Variant`,
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
          });
      }
    },
    deleteChef() {
      dialog.showMessageBox(
        {
          title: "Etes vous sur de supprimer le chauffeur",
          buttons: ["Yes", "No", "Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post("http://localhost:8000/API/planning/deleteChef", {
                chef: this.chef,
                id_team: this.$route.query.id_team,
              })
              .then((res) => {
                console.log(res);
                this.$bvToast.toast("Chaffeur supprimé", {
                  title: `Varianfdsfdsfsdfdsfsdfdsdsfdsfdsdsfsdt`,
                  variant: "success",
                  solid: true,
                });
                this.chef = "";
                document.getElementById("chef").readOnly = false;
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
    },
    // ######################## Agent ########################
    addSecours(index) {
      let done = true;
      if (!this.nomAgent[index]) {
        this.stateNomAgent[index] = false;
        done = false;
      }
      if (done) {
        this.$http
          .post("http://localhost:8000/API/planning/addSecours", {
            secours: this.nomAgent[index],
            id_team: this.$route.query.id_team,
          })
          .then(() => {
            document.getElementById("nomAgent" + index).readOnly = true;
            this.$bvToast.toast("Toast body content", {
              title: `Variant`,
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
          });
      }
    },
    deleteSecours(index) {
      dialog.showMessageBox(
        {
          title: "Etes vous sur de supprimer le chauffeur",
          buttons: ["Yes", "No", "Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post("http://localhost:8000/API/planning/deleteSecours", {
                secours: this.nomAgent[index],
                id_team: this.$route.query.id_team,
              })
              .then(() => {
                this.removeDiv(index);
                this.$bvToast.toast("Chaffeur supprimé", {
                  title: `Varianfdsfdsfsdfdsfsdfdsdsfdsfdsdsfsdt`,
                  variant: "success",
                  solid: true,
                });

                this.nomAgent[index] = "";
                document.getElementById("nomAgent" + index).readOnly = false;
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
              });
          }
        }
      );
    },
    updateDate() {
      this.$http
        .post("http://localhost:8000/API/planning/updateDate", {
          date: this.date,
          id_team: this.$route.query.id_team,
        })
        .then((res) => {
          console.log(res);
          this.$bvToast.toast("Toast body content", {
            title: `Variant`,
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
        });
    },
    annuler() {
      this.$router.push({
        path: "/planning",
      });
    },
  },
  created() {},
  mounted() {
    if (!this.$route.query.id_team) {
      this.annuler();
    }
    this.getTeam(this.$route.query.id_team);
  },
};
</script>
