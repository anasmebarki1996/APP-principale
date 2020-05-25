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
            <div class="mb-2 mr-sm-2 mb-sm-0 position-relative form-group">
              <label for="exampleEmail22" class="mr-sm-2">Intervention</label>
              <select class="mb-2 form-control" v-model="type">
                <option value="null" selected>Tout</option>
                <option
                  v-for="i in list_intervention"
                  :key="i.id_node"
                  :value="i.id_node"
                >{{ i.name }}</option>
              </select>
            </div>
            <button class="btn btn-primary" v-on:click="recherche()">recherche</button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <b-row>
        <b-col md="12">
          <b-card title="Area Chart">
            <heat-map />
          </b-card>
        </b-col>
      </b-row>
    </div>

    <br />
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle.vue";
import HeatMap from "./../../Components/Maps/HeatMap";

export default {
  components: {
    PageTitle,
    HeatMap
  },
  data: () => ({
    heading: "ChartJS",
    subheading: "Huge selection of charts created with the Vue ChartJS Plugin",
    icon: "pe-7s-bandaid icon-gradient bg-amy-crisp",
    labels: [],
    data: [
      { lat: 37.786117, lng: -122.440119 },
      { lat: 37.786564, lng: -122.440209 },
      { lat: 37.786905, lng: -122.44027 },
      { lat: 37.786956, lng: -122.440279 },
      { lat: 37.800224, lng: -122.43352 },
      { lat: 37.800155, lng: -122.434101 },
      { lat: 37.80016, lng: -122.43443 },
      { lat: 37.800378, lng: -122.434527 },
      { lat: 37.800738, lng: -122.434598 },
      { lat: 37.800938, lng: -122.43465 },
      { lat: 37.801024, lng: -122.434889 },
      { lat: 37.800955, lng: -122.435392 },
      { lat: 37.800886, lng: -122.435959 }
    ],
    chartData: [],
    chartLabels: [],
    chartTitle: "helooo",
    title: "helloo faloooo",
    date: null,
    datacollection: [1, 2, 3],
    list_intervention: [],
    type: null,
    year: null,
    current_year: null,
    month: null,
    day: null,
    choix: "annuel"
  }),

  methods: {
    getInterventionHeatMap() {
      this.$store.commit("delete_heatMap");
      this.$http
        .post(process.env.VUE_APP_API + "/statistique/getInterventionHeatMap", {
          date: this.date,
          id_node: this.type,
          choix: this.choix
        })
        .then(res => {
          this.data = [];
          for (var i = 0; i < res.data.interventions.length; i++) {
            this.data[i] = res.data.interventions[i].gps_coordonnee;
          }
          this.$store.commit("init_heatMap", this.data);
        })
        .catch(error => {
          this.chartData = [];
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
            this.getInterventionHeatMap();
          } else {
            if (!this.month) {
              this.$dialog.showErrorBox("error", "vous devrez saisir le mois");
            } else {
              if (this.choix == "mensuel") {
                this.date = this.year + "-" + this.month + "-01";
                this.date = this.$moment(this.date).format("YYYY-MM-DD");
                this.getInterventionHeatMap();
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
                  this.getInterventionHeatMap();
                }
              }
            }
          }
        }
      } else {
        this.$dialog.showErrorBox("error", "Il y a un erreur");
      }
    },
    getAllIntervention_name() {
      this.$http
        .get(process.env.VUE_APP_API + "/intervention/getAllIntervention_name")
        .then(res => {
          this.list_intervention = res.data.interventions;
        })
        .catch(error => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    }
  },
  created() {
    this.date = this.$moment().format("YYYY-MM-DD");
    this.getAllIntervention_name();
    this.getInterventionHeatMap();
    this.year = this.$moment().format("YYYY");
    this.month = this.$moment().format("MM");
    this.day = this.$moment().format("DD");
  }
};
</script>
