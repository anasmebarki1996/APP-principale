<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>

    <div class="main-card mb-3 card">
      <div class="card-body">
        <div class="d-flex justify-content-around">
          <div class="form-inline">
            <div class="mb-2 mr-sm-2 mb-sm-0 position-relative form-group">
              <label class="mr-sm-2">Choix</label>
              <select class="mb-2 form-control" v-model="choix">
                <option value="quotidien" selected>Quotidien</option>
                <option value="mensuel">Mensuel</option>
                <option value="annuel">Annuel</option>
              </select>
            </div>
            <div class="mb-2 mr-sm-2 mb-sm-0 position-relative form-group">
              <label for="exampleEmail22" class="mr-sm-2">Date</label>
              <select class="mb-2 form-control" v-model="day" v-if="choix == 'quotidien'">
                <option value="null" disabled selected>Jour</option>
                <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 31" v-bind:key="n">
                  <div v-if="n < 10">0{{ n }}</div>
                  <div v-else>{{ n }}</div>
                </option>
              </select>
              <select
                class="mb-2 form-control"
                v-model="month"
                v-if="choix == 'quotidien' || choix == 'mensuel'"
              >
                <option value="null" disabled selected>Mois</option>
                <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12" v-bind:key="n">
                  <div v-if="n < 10">0{{ n }}</div>
                  <div v-else>{{ n }}</div>
                </option>
              </select>
              <select class="mb-2 form-control" v-model="year">
                <option value="null" disabled selected>Année</option>
                <option v-bind:value="year - i" v-for="(n, i) in 5" v-bind:key="n">{{ year - i }}</option>
              </select>
            </div>
            <button class="btn btn-primary" v-on:click="recherche()">recherche</button>
          </div>
        </div>
      </div>
    </div>
    <b-table
      :items="items"
      :fields="fields"
      striped
      no-local-sorting
      responsive="sm"
      :busy="isBusy"
      show-empty
    >
      <template v-slot:empty>
        <h4 class="d-flex justify-content-center">table vide</h4>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(show_details)="row">
        <b-button size="sm" class="mr-2" v-on:click="showDetails(row.item._id)">détails</b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>numTel:</b>
            </b-col>
            <b-col>{{ row.item.numTel }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>gps_coordonnee:</b>
            </b-col>
            <b-col>{{ row.item.gps_coordonnee }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
    <br />
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle.vue";

export default {
  components: {
    PageTitle
  },
  data: () => ({
    heading: "ChartJS",
    subheading: "Huge selection of charts created with the Vue ChartJS Plugin",
    icon: "pe-7s-bandaid icon-gradient bg-amy-crisp",
    labels: [],
    data: [],

    date: null,
    datacollection: [1, 2, 3],
    list_intervention: [],
    type: null,
    year: null,
    current_year: null,
    month: null,
    day: null,
    choix: "annuel",

    fields: [
      {
        key: "nom",
        label: "Unites",
        tdClass: "nameOfTheClass"
      },
      {
        key: "nombreAgents",
        label: "Agents",
        tdClass: "nameOfTheClass"
      },
      {
        key: "nombreEngins",
        label: "Engins",
        tdClass: "nameOfTheClass"
      },
      {
        key: "nombreInterventions",
        label: "Interventions",
        tdClass: "nameOfTheClass"
      },
      {
        key: "tempsReponse",
        label: "Moyenne de temps de reponse",
        tdClass: "nameOfTheClass"
      }
    ],
    items: [],
    isBusy: false,
    limit: 5,
    rows: 0,
    currentPage: 1,
    sort: "dateTimeAppel",
    sortBy: "",
    search: ""
  }),

  methods: {
    getStatistiques() {
      this.$http
        .post(process.env.VUE_APP_API + "/statistique/getStatistiques", {
          date: this.date,
          choix: this.choix
        })
        .then(res => {
          this.items = res.data.unites;

          for (let j = 0; j < this.items.length; j++) {
            // ####### Nombre Agents #######
            for (let i = 0; i < res.data.nombreAgents.length; i++) {
              if (this.items[j].id_unite == res.data.nombreAgents[i].id_unite) {
                this.items[j].nombreAgents = res.data.nombreAgents[i].count;
              }
            }
            if (!this.items[j].nombreAgents) this.items[j].nombreAgents = 0;
            // ####### Nombre Engins #######
            for (let i = 0; i < res.data.nombreEngins.length; i++) {
              if (this.items[j].id_unite == res.data.nombreEngins[i].id_unite) {
                this.items[j].nombreEngins = res.data.nombreEngins[i].count;
              }
            }
            if (!this.items[j].nombreEngins) this.items[j].nombreEngins = 0;
            // ####### Nombre Interventions #######
            for (let i = 0; i < res.data.nombreInterventions.length; i++) {
              if (
                this.items[j].id_unite ==
                res.data.nombreInterventions[i].id_unite
              ) {
                this.items[j].nombreInterventions =
                  res.data.nombreInterventions[i].count;
              }
            }
            if (!this.items[j].nombreInterventions)
              this.items[j].nombreInterventions = 0;

            // ####### temps reponse #######
            for (let i = 0; i < res.data.tempsReponse.length; i++) {
              if (this.items[j].id_unite == res.data.tempsReponse[i].id_unite) {
                this.items[j].tempsReponse = this.$moment
                  .utc(res.data.tempsReponse[i].moy)
                  .format("HH:mm:ss");
              }
            }
            if (!this.items[j].tempsReponse) this.items[j].tempsReponse = 0;
          }
        })
        .catch(error => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    recherche() {
      if (
        this.choix &&
        ["quotidien", "mensuel", "annuel"].includes(this.choix)
      ) {
        if (!this.year) {
          this.$dialog.showErrorBox("error", "vous devrez saisir l'année");
        } else {
          if (this.choix == "annuel") {
            this.date = this.year + "-01-01";
            this.date = this.$moment(this.date).format("YYYY-MM-DD");
            this.getStatistiques();
          } else {
            if (!this.month) {
              this.$dialog.showErrorBox("error", "vous devrez saisir le mois");
            } else {
              if (this.choix == "mensuel") {
                this.date = this.year + "-" + this.month + "-01";
                this.date = this.$moment(this.date).format("YYYY-MM-DD");
                this.getStatistiques();
              }
              if (this.choix == "quotidien") {
                if (!this.day) {
                  this.$dialog.showErrorBox(
                    "error",
                    "vous devrez saisir le jour"
                  );
                } else {
                  this.date = this.year + "-" + this.month + "-" + this.day;
                  this.date = this.$moment(this.date).format("YYYY-MM-DD");
                  this.getStatistiques();
                }
              }
            }
          }
        }
      } else {
        this.$dialog.showErrorBox("error", "Il y a un erreur");
      }
    }
  },
  created() {
    this.date = this.$moment().format("YYYY-MM-DD");
    this.getStatistiques();
    this.year = this.$moment().format("YYYY");
    this.month = this.$moment().format("MM");
    this.day = this.$moment().format("DD");
  }
};
</script>
