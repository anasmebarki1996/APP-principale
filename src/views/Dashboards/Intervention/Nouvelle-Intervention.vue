<template>
  <div>
    <div class="d-flex justify-content-center">
      <div
        class="search-wrapper"
        v-bind:class="{ active: searchOpen }"
        style="width: auto;"
      >
        <div class="input-holder" style="width: 500px;">
          <input
            v-model="numTelInput"
            type="text"
            class="search-input"
            placeholder="Tapez ici le numéro"
          />
          <button class="search-icon" v-on:click="getAppel">
            <span />
          </button>
        </div>
      </div>
    </div>

    <!-- ##################################################### -->
    <div class="row" style="margin-top: 100px;">
      <div class="col-lg-12">
        <div>
          <!-- ##################################################### -->
          <b-card bg-variant="link" style="padding-buttom: 200px;">
            <b-form-group
              label-cols-lg="3"
              label="Informations Personnelles"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
              v-bind:disabled="numTel.length == 0"
            >
              <b-form-group
                label-cols-sm="3"
                label="Numéro du téléphone"
                label-align-sm="right"
                label-for="nested-street"
              >
                <b-form-input
                  id="nested-street"
                  v-model="numTel"
                  readonly
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Gps addresse"
                label-align-sm="right"
                label-for="gpsAdresse"
              >
                <b-form-input
                  id="gpsAdresse"
                  v-model="gpsAdresse"
                  readonly
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Wilaya"
                label-align-sm="right"
                label-for="nested-state"
              >
                <b-form-input id="nested-state" v-model="wilaya"></b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="3"
                label="Daira"
                label-align-sm="right"
                label-for="nested-state"
              >
                <b-form-input id="nested-state" v-model="daira"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Lieu"
                label-align-sm="right"
                label-for="nested-state"
              >
                <b-form-input
                  id="nested-state"
                  v-model="adresse_rue"
                ></b-form-input>
              </b-form-group>
            </b-form-group>
          </b-card>
          <br />
          <br />
          <!-- ##################################################### -->
        </div>

        <div class="row">
          <div class="col-lg-9">
            <div class="mb-3 card" style="min-height:400px">
              <ol class="breadcrumb" style="back" id="nodes_path">
                <div class="row">
                  <li class="breadcrumb-item">
                    <span
                      style="cursor:pointer"
                      class="badge badge-primary"
                      v-on:click="selecteNodeFromPath(null)"
                    >
                      <b>Niveau Principal</b>
                    </span>
                  </li>
                  <li
                    class="breadcrumb-item"
                    v-for="(path_item, key) in selected_path"
                    :key="key"
                  >
                    <span
                      style="cursor:pointer"
                      :class="
                        path_item._id ==
                        selected_path[selected_path.length - 1]._id
                          ? 'badge badge-success'
                          : 'badge badge-primary'
                      "
                      v-on:click="selecteNodeFromPath(path_item._id)"
                    >
                      {{ path_item.name }}
                      <span
                        style="margin-left:20px;"
                        v-if="
                          path_item._id ==
                            selected_path[selected_path.length - 1]._id
                        "
                      ></span>
                    </span>
                  </li>
                  <li class="breadcrumb-item" v-if="selected_path.length">
                    <span
                      style="cursor:pointer"
                      class="badge badge-warning"
                      v-on:click="terminer()"
                    >
                      <b>Terminer</b>
                    </span>
                  </li>
                </div>
              </ol>
              <div class="p-0 card-body">
                <div class="p-1 slick-slider-sm mx-auto">
                  <div class="widget-chart widget-chart2 text-left p-0">
                    <div class="widget-chat-wrapper-outer">
                      <div
                        class="row"
                        style="margin: 10px;"
                        v-if="!show_unites"
                      >
                        <div
                          class="col-4 col-4"
                          v-for="node in current_level"
                          :key="node._id"
                          style="margin-bottom:10px;"
                        >
                          <b-button
                            variant="light"
                            v-on:click="getChildren(node)"
                            style="width:260px;height:64px"
                          >
                            <div
                              class="widget-content"
                              style="padding:0px;"
                              v-bind:title="node.name"
                            >
                              <div class="widget-content-wrapper">
                                <div class="widget-content-outer">
                                  <div
                                    class="widget-heading"
                                    style="padding-left:25px;"
                                  >
                                    {{ node.name }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </b-button>
                        </div>
                      </div>
                      <!-- // ########################## -->

                      <div class="row col-md-12" v-if="show_unites">
                        <div
                          v-for="unite in unites"
                          :key="unite._id"
                          class="col-md-4 card mb-4 widget-content"
                        >
                          <div class>
                            <div class="widget-content-left col-md-12">
                              <div class="widget-heading">
                                {{ unite.nom_unite }}
                              </div>
                              <div
                                v-for="engin in unite.engins"
                                :key="engin._id"
                              >
                                <div class="widget-subheading">
                                  {{ engin.code_name }} {{ engin.nombre }}
                                </div>
                              </div>
                              <div class="widget-numbers text-success">
                                <span>{{ unite.duration }}</span>
                                <br />
                                <span>{{ unite.distanceEnKM }}</span>
                                <br />
                              </div>
                              <b-button
                                variant="light"
                                v-on:click="envoyerIntervention(unite.id_unite)"
                                >envoyer</b-button
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- // ########################## -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="mb-3 card" style="min-height:400px">
              <div class="p-0 card-body">
                <div v-if="selected_node_display != null">
                  <div id="description">
                    <ol class="breadcrumb" style="padding:5px;">
                      <span
                        style="cursor:pointer"
                        class="text-success text-capitalize"
                      >
                        <b>Description :</b>
                      </span>
                    </ol>

                    <div class="row">
                      <p class="col-12 pl-4">
                        {{ selected_node_display.description }}
                      </p>
                    </div>
                  </div>

                  <div id="Conseils_instructions">
                    <ol class="breadcrumb" style="padding:5px;">
                      <span
                        style="cursor:pointer"
                        class="text-success text-capitalize"
                      >
                        <b>Conseils et instructions :</b>
                      </span>
                    </ol>

                    <div class="row">
                      <div class="col-12 pl-4 pr-4">
                        <p
                          v-for="(instruction,
                          key) in selected_node_display.Conseils_instructions"
                          :key="key"
                          style="margin-bottom:3px;"
                        >
                          - {{ instruction }}
                        </p>
                      </div>

                      <div class="col-4">
                        <span></span>
                      </div>
                    </div>
                  </div>

                  <div id="intern_decision">
                    <ol class="breadcrumb" style="padding:5px;">
                      <span
                        style="cursor:pointer"
                        class="text-success text-capitalize"
                      >
                        <b>Moyen D'intervention Recommandée</b>
                      </span>
                    </ol>

                    <div
                      class="row"
                      v-for="d_intern in selected_node_display.decision.intern"
                      :key="d_intern"
                    >
                      <div class="col-8 pl-4">
                        <span>{{ d_intern }}</span>
                      </div>

                      <div class="col-4">
                        <span></span>
                      </div>
                    </div>
                  </div>

                  <div id="extern_decision">
                    <ol class="breadcrumb" style="padding:5px;">
                      <span
                        style="cursor:pointer"
                        class="text-success text-capitalize"
                      >
                        <b>Intervention Externe Recommandée</b>
                      </span>
                    </ol>

                    <div
                      class="row"
                      v-for="(d_extern, key) in selected_node_display.decision
                        .extern"
                      :key="key"
                    >
                      <div class="col-8 pl-4">
                        <span>{{ d_extern }}</span>
                      </div>

                      <div class="col-4">
                        <span></span>
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
  faTh,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faCheck, faAngleDown, faAngleUp, faTh, faCalendarAlt);

export default {
  components: {},
  data: () => ({
    parent_node_id: "",
    selected_node: null,
    selected_node_display: null,
    selected_path: [],
    current_level: {},
    numTelInput: "",
    numTel: "",
    wilaya: "",
    daira: "",
    adresse_rue: "",
    gpsAdresse: "",
    gps_coordonnee: "",
    searchOpen: true,
    heading: "Analytics Dashboard",
    subheading:
      "This is an example dashboard created using build-in elements and components.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure",
    Engins: [],
    etablissement_extern: [
      {
        name: "Police",
      },
      {
        name: "Gendarmerie",
      },
      {
        name: "Conservation des forêts",
      },
      {
        name: "Hopital",
      },
    ],
    node_to_add: {
      decision: {
        intern: [],
        extern: [],
      },
      icon: "",
      Conseils_instructions: [],

      name: "",
      description: "",
      parent_id: null,
    },
    // ################# partie unites #################

    unites: [],
    show_unites: false,
  }),

  methods: {
    getAllEngins() {
      this.$http
        .get(process.env.VUE_APP_API + "/engin/")
        .then((res) => {
          this.Engins = res.data.data;
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },

    getAppel() {
      if (this.numTelInput.length != 10) {
        this.$dialog.showErrorBox(
          "error",
          "vous devrez vérifier le numéro de téléphone"
        );
      } else {
        this.$dialog.showMessageBox(
          {
            title: "Vous confirmez ce numero ?",
            buttons: ["Yes", "No", "Cancel"],
            message: "Vous etes sur?",
          },
          (response) => {
            if (response == 0) {
              this.$http
                .post(process.env.VUE_APP_API + "/getAppel", {
                  numTel: this.numTelInput,
                })
                .then(async (res) => {
                  this.numTel = res.data.appel.numTel;
                  this.numTelInput = "";
                  this.gps_coordonnee = res.data.appel.gps_coordonnee;
                  this.gpsAdresse = await this.getLocationName(
                    this.gps_coordonnee
                  );
                })
                .catch((error) => {
                  this.$dialog.showErrorBox(
                    "erreur" + error.response.status,
                    error.response.data.message
                  );
                  if (error.response.status == 404) {
                    this.numTel = this.numTelInput;
                    this.numTelInput = "";
                    document.getElementById("gpsAdresse").readOnly = false;
                  }
                });
            }
          }
        );
      }
    },
    getCurrentLevel() {
      this.$http
        .get(process.env.VUE_APP_API + "/tree/nodes/" + this.parent_node_id)
        .then((res) => {
          this.current_level = res.data.data;
          if (!res.data.data.length) {
            this.getUnitePlusProche();
            this.show_unites = true;
          }
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    getChildren(node) {
      this.selected_node = node;

      //first thing is that this.parent_node_id is going to change
      this.parent_node_id = node._id;
    },
    displayNodeInfo(node) {
      this.selected_node = node;
    },
    getNodePath() {
      this.$http
        .get(process.env.VUE_APP_API + "/tree/path/" + this.parent_node_id)
        .then((res) => {
          this.selected_path = res.data.data.reverse();
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    nodeInfoDisplay(node) {
      if (node == null) this.selected_node_display = this.selected_node;
      else this.selected_node_display = node;
    },
    selecteNodeFromPath(id) {
      this.show_unites = false;
      if (id == null) {
        this.parent_node_id = "";
        this.selected_path = [];
        this.selected_node = null;
      } else {
        this.parent_node_id = id;
      }
    },

    // ########################### maps ##############################
    envoyerIntervention(id_unite) {
      let description = this.selected_path.map((x) => x.name);
      this.$dialog.showMessageBox(
        {
          title: "Etes vous sur de l'envoyer ?",
          buttons: ["oui", "non", "Cancel"],
          message: "Vous ne pourrez plus la retransmettre apres l'envoie",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post(
                process.env.VUE_APP_API + "/intervention/envoyerIntervention",
                {
                  id_unite: id_unite,
                  id_node: this.parent_node_id,
                  description: description,
                  wilaya: this.wilaya,
                  daira: this.daira,
                  adresse_rue: this.adresse_rue,
                  gps_coordonnee: this.gps_coordonnee,
                  numTel: this.numTel,
                }
              )
              .then(() => {
                this.$dialog.showMessageBox({
                  title: "success",
                  message: "intervention envoyé",
                });
                this.reset();
              })
              .catch((error) => {
                this.$dialog.showErrorBox(
                  "erreur" + error.response.status,
                  error.response.data.message
                );
              });
          }
        }
      );
    },
    async getUnitePlusProche() {
      await this.$http
        .post(process.env.VUE_APP_API + "/getUnitePlusProche", {
          lat: 34.6,
          lng: 0,
        })
        .then(async (res) => {
          console.log(this.gps_coordonnee.lat);
          this.unites = await this.gpsTraitement(
            {
              lat: Number(this.gps_coordonnee.lat),
              lng: Number(this.gps_coordonnee.lng),
            },
            res.data.unites
          );
          await this.order();
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    async gpsTraitement(secoursAdresse, unites) {
      return new Promise((resolve) => {
        console.log(this.gps_coordonnee);
        let response;
        let distances = [];
        this.$gmapApiPromiseLazy().then(() => {
          // eslint-disable-next-line
          var service = new google.maps.DistanceMatrixService();
          unites.forEach((e) => {
            service.getDistanceMatrix(
              {
                origins: [secoursAdresse],
                destinations: [e.adresse.gps_coordonnee],
                travelMode: "DRIVING",
              },
              function(resp) {
                console.log(resp);
                distances.push({
                  id_unite: e.id_unite,
                  nom_unite: e.nom_unite,
                  engins: e.engins,
                  secoursAdresse: resp.originAddresses[0],
                  uniteAdresse: e.adresse,
                  distanceEnKM: resp.rows[0].elements[0].distance.text,
                  duration: resp.rows[0].elements[0].duration.text,
                  duration_en_sec: resp.rows[0].elements[0].duration.value,
                });
                if (unites.length == distances.length) {
                  response = resolve(distances);
                }
              }
            );
          });
        });
        return response;
      });
    },
    async getLocationName(adresse) {
      return new Promise((resolve) => {
        let response;
        this.$gmapApiPromiseLazy().then(() => {
          // eslint-disable-next-line
          var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [adresse],
              destinations: [adresse],
              travelMode: "DRIVING",
            },
            function(resp) {
              response = resolve(resp.originAddresses[0]);
            }
          );
        });
        return response;
      });
    },
    getGpsAdresse() {
      this.$gmapApiPromiseLazy().then(() => {
        var options = {
          componentRestrictions: {
            country: "dz",
          },
        };
        // eslint-disable-next-line
        var places = new google.maps.places.Autocomplete(
          document.getElementById("gpsAdresse"),
          options
        );
        // eslint-disable-next-line
        new google.maps.event.addListener(places, "place_changed", function() {
          var place = places.getPlace();
          this.gpsAdresse = place.formatted_address;
          this.gps_coordonnee = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
        });
      });
    },
    order() {
      function compare(a, b) {
        if (a.duration_en_sec < b.duration_en_sec) return -1;
        if (a.duration_en_sec > b.duration_en_sec) return 1;
        return 0;
      }
      return this.unites.sort(compare);
    },
    reset() {
      this.numTel = "";
      this.numTelInput = "";
      this.wilaya = "";
      this.daira = "";
      this.adresse_rue = "";
      this.gpsAdresse = "";
      this.gps_coordonnee = "";
      this.unites = [];
      this.selecteNodeFromPath(null);
    },
    terminer() {
      if (this.selected_path.length) {
        this.show_unites = true;
        this.getUnitePlusProche();
      }
    },
  },

  watch: {
    parent_node_id: function() {
      //when ever this prop changes we get current_level nodes from db
      this.getCurrentLevel();
      this.getNodePath();
      this.selected_node_display = this.selected_node;
      this.node_to_update = this.selected_node;
    },
  },
  computed: {
    randomKey: function() {
      return Math.ceil(Math.random() * 10);
    },
  },
  created() {
    this.getAllEngins();
    this.getCurrentLevel();
    this.getGpsAdresse();
  },
};
</script>
<style scoped>
body {
  background: #eee;
}

span {
  font-size: 15px;
}

a {
  text-decoration: none;
  color: #0062cc;
  border-bottom: 2px solid #0062cc;
}

.box {
  padding: 60px 0px;
}

.box-part {
  background: #fff;
  border-radius: 0;
  padding: 60px 10px;
  margin: 30px 0px;
}

.text {
  margin: 20px 0px;
}

.fa {
  color: #4183d7;
}

.modal {
  top: 50px;
}
</style>
