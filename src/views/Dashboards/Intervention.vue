<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="search-wrapper " v-bind:class="{ active: searchOpen }">
        <div class="input-holder " style="width:500px">
          <input
            type="text"
            class="search-input"
            placeholder="Type to search"
          />
          <button class="search-icon">
            <span />
          </button>
        </div>
      </div>
    </div>
    <!-- ##################################################### -->
    <div class="row" style="margin-top:100px">
      <div class="col-lg-12">
        <div class="mb-3 card">
          <div class="card-header-tab card-header">
            <div
              class="card-header-title font-size-lg text-capitalize font-weight-normal"
            >
              <i
                class="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo"
              >
              </i>
              Technical Support
            </div>
          </div>
          <div class=" p-0 card-body">
            <div class="p-1 slick-slider-sm mx-auto">
              <div class="widget-chart widget-chart2 text-left p-0">
                <div class="widget-chat-wrapper-outer">
                  <div
                    class="widget-chart-content widget-chart-content-lg pb-0"
                  >
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="card mb-3 widget-content">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                              <div class="widget-heading">Accident</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="card mb-3 widget-content">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                              <div class="widget-heading">Accident</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="card mb-3 widget-content">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                              <div class="widget-heading">Accident</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faCheck,
  faCalendarAlt,
  faAngleDown,
  faAngleUp,
  faTh
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faCheck, faAngleDown, faAngleUp, faTh, faCalendarAlt);

export default {
  components: {},
  data: () => ({
    type: {
      accident: ["bus", "voiture"],
      feux: ["maison", "foret"]
    },
    searchOpen: true,
    heading: "Analytics Dashboard",
    subheading:
      "This is an example dashboard created using build-in elements and components.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure"
  }),

  methods: {},
  created() {
    var data = {
      initial: ["Accident", "Feux", "maladie", "crime"],
      choices: {
        // TOP LEVEL

        Accident: {
          name: "Accident de route",
          children: ["Mortelle", "Blessure", "Rien"]
        },

        Feux: {
          name: "Feux",
          children: ["maison", "foret", "ville"]
        },

        Maladie: {
          name: "Maladie",
          children: ["Chronique", "foret", "ville"]
        },
        Crime: {
          name: "Crime",
          children: ["Chronique", "foret", "ville"]
        },

        // STAY IN

        "watch-movie": {
          name: "Watch a movie",
          children: ["romantic", "scary", "action", "comedy"]
        },
        "watch-tv": {
          name: "Watch a TV show",
          children: ["drama", "sport", "comedy-tv"]
        },
        cook: {
          name: "Cook a meal",
          children: ["spicy", "traditional"]
        },

        // GO OUT

        cinema: {
          name: "Go to the cinema",
          children: ["romantic-cine", "scary-cine"]
        },
        drink: {
          name: "Have a drink",
          children: ["beer", "whiskey"]
        },
        restaurant: {
          name: "Visit a restaurant",
          children: ["italian", "bbq"]
        },

        // WATCH MOVIE

        romantic: {
          name: "Holding hands"
        },
        scary: {
          name: "Terrified"
        },
        action: {
          name: "On the edge of our seats"
        },
        comedy: {
          name: "Spit out our popcorn"
        },

        // WATCH TV

        drama: {
          name: "Nail-biting suspense"
        },
        sport: {
          name: "Cheer for the winner"
        },
        "comedy-tv": {
          name: "Cry with laughter"
        },

        // COOK
        spicy: {
          name: "Hot and spicy"
        },
        traditional: {
          name: "Like Mum used to make"
        },

        // CINEMA
        "romantic-cine": {
          name: "Make out at the back"
        },
        "scary-cine": {
          name: "Covering our faces"
        },

        // DRINK
        beer: {
          name: "Pisswasser"
        },
        whiskey: {
          name: "Black Bush"
        },

        // RESTAURANT
        italian: {
          name: "Spag bol"
        },
        bbq: {
          name: "Meat in a bap"
        }
      }
    };
    console.log(data);
    console.log("############################");
    console.log(data.initial);
    console.log(data.choices["bbq"]);
  }
};
</script>
