<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
    ></page-title>

    <!-- ##################################################### -->
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
                    path_item._id == selected_path[selected_path.length - 1]._id
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
                  <div class="row" style="margin: 10px;">
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
                </div>
                <!-- // ########################## -->
              </div>
            </div>

            <div class="d-flex justify-content-center" v-if="empty">
              <b-col class="d-flex justify-content-center"
                >Il n'y a plus des interventions fils</b-col
              >
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
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle";
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
  components: { PageTitle },
  data: () => ({
    parent_node_id: "",
    selected_node: null,
    selected_node_display: null,
    selected_path: [],
    current_level: {},
    numTelInput: "",
    empty: false,
    searchOpen: true,
    heading: "Arbre des intervention",
    subheading: "",
    icon: "pe-7s-edit icon-gradient bg-tempting-azure",
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
  }),

  methods: {
    getCurrentLevel() {
      this.empty = false;
      this.$http
        .get(process.env.VUE_APP_API + "/tree/nodes/" + this.parent_node_id)
        .then((res) => {
          this.current_level = res.data.data;
          if (!res.data.data.length) {
            this.empty = true;
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
      if (id == null) {
        this.parent_node_id = "";
        this.selected_path = [];
        this.selected_node = null;
      } else {
        this.parent_node_id = id;
      }
    },

    removeNode() {
      this.$dialog.showMessageBox(
        {
          title: "Êtes-vous sûr?",
          buttons: ["Yes", "No", "Cancel"],
          message: "Vous ne pourrez pas revenir en arrière !",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .delete(process.env.VUE_APP_API + "/tree/" + this.parent_node_id)
              .then(() => {
                this.selected_path.pop();
                this.$dialog.showMessageBox({
                  title: "success",
                  message: "le nœud a été supprimé.",
                });
              })
              .catch((error) => {
                this.$dialog.showErrorBox(
                  "error" + error.response.status,
                  error.response.data.message
                );
              });
          }
        }
      );
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
    this.getCurrentLevel();
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
