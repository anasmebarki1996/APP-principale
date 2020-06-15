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
                      <div
                        class="widget-subheading"
                        v-if="
                          destination.distance &&
                            statut != null &&
                            statut != 'termine'
                        "
                      >
                        {{ destination.distance }} KM
                      </div>
                      <div class="widget-subheading" v-else>---</div>
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
                      <div
                        class="widget-subheading"
                        v-if="
                          destination.duree &&
                            statut != null &&
                            statut != 'termine'
                        "
                      >
                        {{ destination.duree }} (
                        {{ team.gps_coordonnee.lastUpdate }})
                      </div>
                      <div class="widget-subheading" v-else>---</div>
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
      <div class="col-lg-4">
        <!-- ##################################################### -->
        <div class="card-hover-shadow-2x mb-3 card">
          <div class="scroll-area-lg">
            <VuePerfectScrollbar class="scrollbar-container">
              <div class="p-4">
                <div
                  class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column"
                >
                  <div>
                    <div class="vertical-timeline-element-content bounce-in">
                      <h4 v-if="unite.nom" class="timeline-title">
                        {{ unite.nom }}
                      </h4>
                      <h4 class="timeline-title"></h4>
                    </div>
                  </div>
                  <div v-if="team.nomChef">
                    <div>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">{{ team.nomChef }}</h4>
                      </div>
                    </div>
                    <div>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">{{ team.numTel }}</h4>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="vertical-timeline-element-content bounce-in">
                      <h4 class="timeline-title">Non transmis encore</h4>
                    </div>
                  </div>
                  <div class="dot-primary vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Type d'intervention :
                          <div
                            v-for="intervention in description"
                            :key="intervention.id"
                          >
                            {{ intervention }}
                          </div>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div
                    class="dot-success vertical-timeline-element"
                    v-if="dateTimeAppel"
                  >
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Appel à {{ dateTimeAppel | dateTime }}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div
                    class="dot-success vertical-timeline-element"
                    v-if="dateTimeDepart"
                  >
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Départ à {{ dateTimeDepart | dateTime }}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div
                    class="dot-success vertical-timeline-element"
                    v-if="dateTimeArrive"
                  >
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Arrivé à {{ dateTimeArrive | dateTime }}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div v-if="transfere.lieu">
                    <div class="dot-success vertical-timeline-element">
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Transfere à :
                          <div class="badge badge-danger ml-2">
                            {{ transfere.lieu }}
                          </div>
                        </h4>
                      </div>
                    </div>
                    <div class="dot-info vertical-timeline-element">
                      <div>
                        <span
                          class="vertical-timeline-element-icon bounce-in"
                        ></span>
                        <div
                          class="vertical-timeline-element-content bounce-in"
                        >
                          <h4 class="timeline-title">
                            Départ à : {{ transfere.dateTimeDepart | dateTime }}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="dot-info vertical-timeline-element"
                    v-if="dateTimeFin"
                  >
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          Fin à {{ dateTimeFin | dateTime }}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
      </div>
      <div class="col-lg-8" v-if="statut != null && statut != 'termine'">
        <div class="content">
          <b-card class="main-card mb-4">
            <div id="maps-root">
              <google-map
                :center="center"
                :zoom="10"
                :restriction="restriction"
                style="width: 100%; height: 360px"
              >
                <google-marker
                  v-if="this.unite.nom"
                  :position="this.unite.gps_coordonnee"
                  :icon="this.unite.icon"
                  :clickable="true"
                  :draggable="false"
                  @click="center = unite.position"
                ></google-marker>
                <google-marker
                  v-if="this.team.gps_coordonnee.lat"
                  :position="this.team.gps_coordonnee"
                  :icon="this.team.icon"
                  :clickable="true"
                  :draggable="false"
                  @click="center = unite.position"
                ></google-marker>
                <google-marker
                  v-if="this.destination.gps_coordonnee.lat"
                  :position="this.destination.gps_coordonnee"
                  :icon="this.destination.icon"
                  :clickable="true"
                  :draggable="false"
                  @click="center = unite.position"
                ></google-marker>
              </google-map>
            </div>
          </b-card>
        </div>
      </div>
      <div class="col-lg-8" v-if="statut == 'termine'">
        <div class="card-hover-shadow-2x mb-3 card">
          <div class="scroll-area-lg">
            <div class="container">
              <h1 style="text-align: center;">Bilan</h1>
              <div>{{ bilan }}</div>
            </div>
          </div>
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
    heading: "Détails interventions",
    subheading: "",
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
      icon: {
        url: require("../../../assets/images/avatars/physiotherapist.svg"),
      },
    },
    team: {
      nomChef: "",
      numTel: "",
      gps_coordonnee: {},
      engin: "",
      icon: {
        url: require("../../../assets/images/avatars/taxi-stand.svg"),
      },
    },
    unite: {
      nom: "",
      gps_coordonnee: {},
      numTel: "",
      icon: {
        url: require("../../../assets/images/avatars/political.svg"),
      },
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

    restriction: {
      latLngBounds: {
        north: 38,
        south: 19,
        west: -9,
        east: 12,
      },
      strictBounds: false,
    },
  }),

  methods: {
    getIntervention(id_intervention) {
      this.$http
        .post(process.env.VUE_APP_API + "/intervention/getIntervention", {
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
          // ############ transfere ############
          if (res.data.intervention.transfere.dateTimeDepart) {
            this.transfere.dateTimeDepart =
              res.data.intervention.transfere.dateTimeDepart;
            this.$http
              .get(
                process.env.VUE_APP_API +
                  "/hospital/" +
                  res.data.intervention.transfere.hospital
              )
              .then(async (res) => {
                this.transfere.lieu = res.data.name;
                this.transfere.gps_coordonnee = res.data.gps_coordonnee;
              });
          }
          // ############ Adresse ############
          this.destination.adresse_rue =
            res.data.intervention.adresse.adresse_rue;
          this.destination.wilaya = res.data.intervention.adresse.wilaya;
          this.destination.daira = res.data.intervention.adresse.daira;
          this.destination.gps_coordonnee =
            res.data.intervention.adresse.gps_coordonnee;
          this.markers[0] = {
            position: {
              lat: res.data.intervention.adresse.gps_coordonnee.lat,
              lng: res.data.intervention.adresse.gps_coordonnee.lng,
            },
            icon: {
              url: require("../../../assets/images/avatars/physiotherapist.svg"),
            },
          };
          // ############ Team ############
          this.getAdresseTeam(res.data.intervention.id_team);
          this.getTeam(res.data.intervention.id_team);
          // ############ Unite ############
          await this.getUnite(res.data.intervention.id_unite);
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
          this.$router.push({
            path: "/",
          });
        });
    },
    async gpsTraitement() {
      return new Promise((resolve) => {
        let response;
        let data = {};
        this.$gmapApiPromiseLazy().then(() => {
          // eslint-disable-next-line
          var service = new google.maps.DistanceMatrixService();
          let destination, depart;
          console.log(this.transfere);
          if (this.transfere.lieu) {
            destination = this.transfere.gps_coordonnee;
          } else {
            destination = this.destination.gps_coordonnee;
          }
          if (!this.team.gps_coordonnee.lat) {
            depart = this.unite.gps_coordonnee;
          } else {
            depart = this.team.gps_coordonnee;
          }
          service.getDistanceMatrix(
            {
              origins: [JSON.parse(JSON.stringify(destination))],
              destinations: [JSON.parse(JSON.stringify(depart))],
              travelMode: "DRIVING",
            },
            function(res) {
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
    getTeam(id_team) {
      this.$http
        .post(process.env.VUE_APP_API + "/team/getTeam", {
          id_team: id_team,
        })
        .then((res) => {
          for (let i = 0; i < res.data.team.agents.length; i++) {
            if (res.data.team.agents[i].type == "chef") {
              this.team.nomChef =
                res.data.team.agents[i].nom +
                " " +
                res.data.team.agents[i].prenom;
              this.team.numTel = res.data.team.agents[i].numTel;
            }
          }
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
        .post(process.env.VUE_APP_API + "/team/getAdresseTeam", {
          id_team: id_team,
        })
        .then((res) => {
          this.team.gps_coordonnee = {
            lat: res.data.team.gps_coordonnee.lat,
            lng: res.data.team.gps_coordonnee.lng,
            lastUpdate: this.$moment(
              new Date(res.data.team.gps_coordonnee.lastUpdate)
            ).fromNow(),
          };
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
        .post(process.env.VUE_APP_API + "/getUnite", {
          id_unite: id_unite,
        })
        .then(async (res) => {
          this.unite.nom = res.data.unite.nom;
          this.unite.gps_coordonnee = res.data.unite.adresse.gps_coordonnee;
          this.markers[1] = {
            position: {
              lat: res.data.unite.adresse.gps_coordonnee.lat,
              lng: res.data.unite.adresse.gps_coordonnee.lng,
            },
          };
          this.unite.numTel = res.data.unite.numTel;
          let data = await this.gpsTraitement();
          this.destination.duree = data.duree;
          this.destination.distance = data.distance;
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },

    annuler() {
      this.$router.push({
        path: "/",
      });
    },
  },
  created() {},
  mounted() {
    if (!this.$route.query.id_intervention) {
      this.annuler();
    }
    this.getIntervention(this.$route.query.id_intervention);
    this.$socket.on("interventionStatusChange", (data) => {
      if (data.id_intervention == this.$route.query.id_intervention) {
        this.getIntervention(this.$route.query.id_intervention);
      }
    });
  },
};
</script>
