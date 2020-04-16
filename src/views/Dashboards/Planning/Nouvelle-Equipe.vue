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
              <b-form-input
                v-model="chaffeur"
                id="chaffeur"
                :state="stateChauffeur"
                list="listChauffeur"
                v-on:change="stateChauffeur = null"
              ></b-form-input>
              <datalist id="listChauffeur">
                <option v-for="agent in listAgents" :key="agent">{{
                  agent
                }}</option>
              </datalist>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Matricule engin"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input
                id="engin"
                v-model="engin"
                :state="stateEngin"
                v-on:change="stateEngin = null"
                list="listEngin"
              ></b-form-input>
              <datalist id="listEngin">
                <option v-for="agent in listAgents" :key="agent">{{
                  agent
                }}</option>
              </datalist>
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
              <b-form-input
                id="chef"
                v-model="chef"
                v-on:change="stateChef = null"
                :state="stateChef"
                list="listChef"
              ></b-form-input>
              <datalist id="listChef">
                <option v-for="agent in listAgents" :key="agent">{{
                  agent
                }}</option>
              </datalist>
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
                <div class="col-md-11">
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
                    <option v-for="agent in listAgents" :key="agent">{{
                      agent
                    }}</option>
                  </datalist>
                </div>
                <div class="col-md-1">
                  <font-awesome-icon
                    icon="plus"
                    color="green"
                    v-if="index == idOfLastDiv"
                    v-on:click="addDiv()"
                  />
                  <font-awesome-icon
                    icon="minus"
                    color="red"
                    v-on:click="removeDiv(index)"
                  />
                </div>
              </div>
            </b-form-group>
          </b-form-group>
        </b-card>
        <!-- ##################################################### -->
      </div>

      <b-card bg-variant="light" class="col-md-5">
        <b-calendar v-model="date" locale="fr" block> </b-calendar>
      </b-card>
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
    PageTitle
  },
  data() {
    return {
      heading: "Les agents",
      subheading:
        "This is an example dashboard created using build-in elements and components.",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      title: "Nouvelle équipe",
      link: "/nouvelle-equipe",
      //##########
      index: 0,
      date: "",
      stateDate: null,
      chaffeur: "",
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
      listAgents: []
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
    addTeam() {
      let done = true;
      let agents = [];
      if (!this.chaffeur) {
        this.stateChauffeur = false;
        done = false;
      }
      if (!this.engin) {
        this.stateEngin = false;
        done = false;
      }
      if (!this.chef) {
        this.stateChef = false;
        done = false;
      }
      if (!this.date) {
        dialog.showErrorBox("title here", "Veuilliez vous introduire la date");
        done = false;
      }
      if (done) {
        agents.push({ agent: this.chaffeur, type: "chauffeur" });
        agents.push({ agent: this.chef, type: "chef" });
        for (var i = 1; i <= this.numberOfDiv; i++) {
          if (this.nomAgent[i]) {
            agents.push({ agent: this.nomAgent[i], type: "secours" });
          }
        }
        axios
          .post("http://localhost:8000/API/addTeam", {
            agents: agents,
            engin: this.engin,
            date: this.date
          })
          .then(res => {
            console.log(res);
            this.$bvToast.toast("Toast body content", {
              title: `Variant`,
              variant: "success",
              solid: true
            });
            this.reset();
          });
      }
    },
    getAgents() {
      axios.post("http://localhost:8000/API/searchAgent").then(res => {
        this.listAgents = res.data.agents.map(el => el.result);
      });
    },
    reset() {
      this.stateChauffeur = null;
      this.stateEngin = null;
      this.stateChef = null;
      this.chaffeur = "";
      this.engin = "";
      this.chef = "";
      this.date = "";
      for (var i = 1; i <= this.numberOfDiv; i++) {
        this.nomAgent[i] = "";
      }
    }
  },
  created() {},
  mounted() {
    this.getLastElementChild();
    this.getAgents();
  }
};
</script>
