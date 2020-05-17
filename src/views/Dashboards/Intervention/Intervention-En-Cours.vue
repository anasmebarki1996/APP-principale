<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
    ></page-title>
    <div class="card mb-3">
      <div class="no-gutters row">
        <div class="col-md-12 col-lg-4">
          <ul class="list-group list-group-flush">
            <li class="bg-transparent list-group-item">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">Déstination :</div>
                      <div class="widget-subheading">
                        {{ destination.adresse_rue }} - {{ destination.daira }}
                      </div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-numbers text-success"></div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-12 col-lg-4">
          <ul class="list-group list-group-flush">
            <li class="bg-transparent list-group-item">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">Distance :</div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-numbers text-danger">
                        {{ destination.distance }} KM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-12 col-lg-4">
          <ul class="list-group list-group-flush">
            <li class="bg-transparent list-group-item">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">Temps Restant :</div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-numbers text-success">
                        {{ destination.duree }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col col-lg-4">
        <!-- ##################################################### -->
        <div class="card-hover-shadow-2x mb-3 card">
          <div class="scroll-area-lg">
            <VuePerfectScrollbar class="scrollbar-container" v-once>
              <div class="p-4">
                <div
                  class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column"
                >
                  <div class="dot-danger vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">{{ unite.nom }}</h4>
                      </div>
                    </div>
                  </div>
                  <div class="dot-warning vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <p>
                          Appel à
                          <span class="text-success">{{ dateTimeAppel }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="dot-warning vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <p>
                          Départ à
                          <span class="text-success">{{ dateTimeDepart }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="dot-success vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Arrivé à
                          <div class="badge badge-danger ml-2">15:00 PM</div>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="dot-primary vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Intervention : feux
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div class="dot-success vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Transfere à
                          <div class="badge badge-danger ml-2">Hopital</div>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="dot-info vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Départ à : 15h00
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="dot-info vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Arrivée à : 15h00
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="dot-warning vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <p>
                          Fin à
                          <span class="text-success">15:00 PM</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
      </div>
      <div class="col col-lg-8">
        <div class="content">
          <b-card class="main-card mb-4">
            <div id="maps-root">
              <google-map
                :center="center"
                :zoom="10"
                style="width: 100%; height: 360px"
              >
                <google-marker
                  v-for="(m, i) in markers"
                  :key="`marker-${i}`"
                  :position="m.position"
                  :icon="m.icon"
                  :clickable="true"
                  :draggable="true"
                  @click="center = m.position"
                ></google-marker>
              </google-map>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import PageTitle from "../../../Layout/Components/PageTitle";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import {
  faTrashAlt,
  faCheck,
  faCalendarAlt,
  faAngleDown,
  faAngleUp,
  faTh,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faCheck, faAngleDown, faAngleUp, faTh, faCalendarAlt);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc",
  },
  // Demonstrating how we can customize the name of the components
  installComponents: false,
});

export default {
  components: {
    PageTitle,
    VuePerfectScrollbar,
    "google-map": VueGoogleMaps.Map,
    "google-marker": VueGoogleMaps.Marker,
  },
  data: () => ({
    heading: "Intervention en cours",
    subheading: "Toutes les interventions en cours.",
    icon: "pe-7s-map icon-gradient bg-premium-dark",
    type: {
      accident: ["bus", "voiture"],
      feux: ["maison", "foret"],
    },

    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    zoom: 10,
    center2: [34.8973038, -1.3852],
    bounds: null,

    center: {
      lat: 34.8973038,
      lng: -1.3852,
    },
    markers: [],

    statut: "",
    destination: {
      adresse_rue: "",
      daira: "",
      wilaya: "",
      gps_coordonnee: {},
      distance: "",
      duree: "",
    },
    team: {
      nomChef: "",
      numTel: "",
      gps_coordonnee: "",
      engin: "",
    },
    unite: {
      nom: "",
      gps_coordonnee: {},
      numTel: "",
    },
    intervention: "",
    description: "",
    bilan: "",
    dateTimeAppel: "",
    dateTimeDepart: "",
    dateTimeArrive: "",
    transfere: {
      lieu: "",
      dateTimeDepart: "",
    },
    dateTimeFin: "",
  }),

  methods: {
    getIntervention(id_intervention) {
      this.$http
        .post("http://localhost:8000/API/intervention/getIntervention", {
          id_intervention: id_intervention,
        })
        .then(async (res) => {
          // ############ Intervention ############
          this.statut = res.data.intervention.statut;
          this.numTel = res.data.intervention.numTel;
          this.description = res.data.intervention.description;
          this.bilan = res.data.intervention.bilan;
          // ############ dateTime ############
          this.dateTimeAppel = res.data.intervention.dateTimeAppel;
          this.dateTimeDepart = res.data.intervention.dateTimeDepart;
          this.dateTimeArrive = res.data.intervention.dateTimeArrive;
          this.dateTimeFin = res.data.intervention.dateTimeFin;
          // ############ Adresse ############
          this.destination.adresse_rue =
            res.data.intervention.adresse.adresse_rue;
          this.destination.wilaya = res.data.intervention.adresse.wilaya;
          this.destination.daira = res.data.intervention.adresse.daira;
          this.destination.gps_coordonnee =
            res.data.intervention.adresse.gps_coordonnee;
          let data = await this.gpsTraitement();
          this.destination.duree = data.duree;
          this.destination.distance = data.distance;
          // ############ Team ############
          this.getAdresseTeam(res.data.intervention.id_team);
          this.getAgent(res.data.intervention.cco_agent);
          // ############ Unite ############
          this.getUnite(res.data.intervention.id_unite);
        })
        .catch((error) => {
          console.log(error);
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    async gpsTraitement() {
      return new Promise((resolve) => {
        let response;
        let data = {};
        this.$gmapApiPromiseLazy().then(() => {
          // eslint-disable-next-line
          var service = new google.maps.DistanceMatrixService();

          service.getDistanceMatrix(
            {
              origins: [{ lat: 50.087, lng: 14.421 }],
              destinations: [{ lat: 50.087, lng: 14.421 }],
              travelMode: "DRIVING",
            },
            function(res) {
              console.log(res.rows[0].elements[0].duration.text);
              if (res.rows[0].elements[0].status == "OK") {
                data.duree = res.rows[0].elements[0].duration.text;
                data.distance = res.rows[0].elements[0].distance.text;
                response = resolve(data);
              }
            }
          );
        });
        return response;
      });
    },
    getAgent(id_agent) {
      this.$http
        .post("http://localhost:8000/API/getAgent", {
          id_agent: id_agent,
        })
        .then((res) => {
          console.log(res.data);
          this.team.nomChef = res.data.agent.nom;
          this.team.numTel = res.data.agent.numTel;
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    getAdresseTeam(id_team) {
      this.$http
        .post("http://localhost:8000/API/team/getAdresseTeam", {
          id_team: id_team,
        })
        .then((res) => {
          console.log(res.data);
          this.team.gps_coordonnee = res.data.team.gps_coordonnee;
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    getUnite(id_unite) {
      this.$http
        .post("http://localhost:8000/API/getUnite", {
          id_unite: id_unite,
        })
        .then((res) => {
          this.unite.nom = res.data.unite.nom;
          this.unite.gps_coordonnee = res.data.unite.adresse.gps_coordonnee;
          this.unite.numTel = res.data.unite.numTel;
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
    let car = {
      position: {
        lat: 34.9011051,
        lng: -1.3367916,
      },
      icon: {
        url: require("../../../assets/images/avatars/taxi-stand.svg"),
      },
    };
    let station = {
      position: {
        lat: 34.8873038,
        lng: -1.3852001,
      },
      icon: {
        url: require("../../../assets/images/avatars/physiotherapist.svg"),
      },
    };
    this.markers = [car, station];
  },
  mounted() {
    this.$route.query.id_intervention = "5ebecfd83afd3f29342dadca";
    if (!this.$route.query.id_intervention) {
      // this.annuler();
    }
    this.getIntervention(this.$route.query.id_intervention);
  },
};
</script>
