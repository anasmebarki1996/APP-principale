<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
    ></page-title>
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
                        <h4 class="timeline-title">All Hands Meetingeeee</h4>
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
                          Yet another one, at
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
                          Build the production release
                          <div class="badge badge-danger ml-2">NEW</div>
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
                          Something not important
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
                          Yet another one, at
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
                          Build the production release
                          <div class="badge badge-danger ml-2">NEW</div>
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
                          This dot has an info state
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="dot-dark vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">
                          This dot has a dark state
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="dot-danger vertical-timeline-element">
                    <div>
                      <span
                        class="vertical-timeline-element-icon bounce-in"
                      ></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">All Hands Meeting</h4>
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
                          Yet another one, at
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
                          Build the production release
                          <div class="badge badge-danger ml-2">NEW</div>
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
                          Something not important
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
      <div class="col col-lg-8">
        <div class="content">
          <b-card class="main-card mb-4">
            <div id="maps-root">
              <google-map
                :center="center"
                :zoom="7"
                style="width: 100%; height: 500px"
              >
                <google-marker
                  v-for="(m, i) in markers"
                  :key="`marker-${i}`"
                  :position="m.position"
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
    zoom: 3,
    center2: [47.41322, -1.219482],
    bounds: null,

    center: {
      lat: 4.0,
      lng: 4.0,
    },
    markers: [
      {
        position: {
          lat: 3.0,
          lng: 3.0,
        },
      },
      {
        position: {
          lat: 18.0,
          lng: 18.0,
        },
      },
    ],
  }),

  methods: {},
  created() {
    var data = {
      initial: ["Accident", "Feux", "maladie", "crime"],
      choices: {
        // TOP LEVEL

        Accident: {
          name: "Accident de route",
          children: ["Mortelle", "Blessure", "Rien"],
        },

        Feux: {
          name: "Feux",
          children: ["maison", "foret", "ville"],
        },

        Maladie: {
          name: "Maladie",
          children: ["Chronique", "foret", "ville"],
        },
        Crime: {
          name: "Crime",
          children: ["Chronique", "foret", "ville"],
        },

        // STAY IN

        "watch-movie": {
          name: "Watch a movie",
          children: ["romantic", "scary", "action", "comedy"],
        },
        "watch-tv": {
          name: "Watch a TV show",
          children: ["drama", "sport", "comedy-tv"],
        },
        cook: {
          name: "Cook a meal",
          children: ["spicy", "traditional"],
        },

        // GO OUT

        cinema: {
          name: "Go to the cinema",
          children: ["romantic-cine", "scary-cine"],
        },
        drink: {
          name: "Have a drink",
          children: ["beer", "whiskey"],
        },
        restaurant: {
          name: "Visit a restaurant",
          children: ["italian", "bbq"],
        },

        // WATCH MOVIE

        romantic: {
          name: "Holding hands",
        },
        scary: {
          name: "Terrified",
        },
        action: {
          name: "On the edge of our seats",
        },
        comedy: {
          name: "Spit out our popcorn",
        },

        // WATCH TV

        drama: {
          name: "Nail-biting suspense",
        },
        sport: {
          name: "Cheer for the winner",
        },
        "comedy-tv": {
          name: "Cry with laughter",
        },

        // COOK
        spicy: {
          name: "Hot and spicy",
        },
        traditional: {
          name: "Like Mum used to make",
        },

        // CINEMA
        "romantic-cine": {
          name: "Make out at the back",
        },
        "scary-cine": {
          name: "Covering our faces",
        },

        // DRINK
        beer: {
          name: "Pisswasser",
        },
        whiskey: {
          name: "Black Bush",
        },

        // RESTAURANT
        italian: {
          name: "Spag bol",
        },
        bbq: {
          name: "Meat in a bap",
        },
      },
    };
    console.log(data);
    console.log("############################");
    console.log(data.initial);
    console.log(data.choices["bbq"]);
  },
};
</script>
