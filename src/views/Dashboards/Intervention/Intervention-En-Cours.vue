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
                      <div class="widget-subheading">tlemcen hopital</div>
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
                      <div class="widget-numbers text-danger">200 KM</div>
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
                      <div class="widget-numbers text-success">3h 20min</div>
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
                        <h4 class="timeline-title">Nom Unite secondaire</h4>
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
                          Départ d'équipe à
                          <span class="text-success">15:00 PM</span>
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
    distance: null,
    duree: "",
    statut: "",
    destination: "",
    destinationGps: null,
    nomUnite: "",
    team: {
      nomChef: "",
      numTel: "",
      gps_coordonnee: "",
      engin: "",
    },
    unite: {
      nom: "",
      gps_coordonnee: null,
      numTel: "",
    },
    intervention: "",
    description: "",
    bilan: "",
    dateTimeAppel: "",
    dateTimeDepart: "",
    dateTimeArrive: "",
    transfere: {
      exist: Boolean,
      vers: "",
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
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    async gpsTraitement(secoursAdresse, engin) {
      this.$gmapApiPromiseLazy().then(() => {
        // eslint-disable-next-line
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [secoursAdresse],
            destinations: [engin],
            travelMode: "DRIVING",
          },
          function() {
            // distances.push({
            //   secoursAdresse: resp.originAddresses[0],
            //   uniteAdresse: e.adresse,
            //   distanceEnKM: resp.rows[0].elements[0].distance.text,
            //   duration: resp.rows[0].elements[0].duration.text,
            //   duration_en_sec: resp.rows[0].elements[0].duration.value,
            // });
          }
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
    if (!this.$route.query.id_intervention) {
      this.annuler();
    }
    this.getIntervention(this.$route.query.id_intervention);
  },
};
</script>
