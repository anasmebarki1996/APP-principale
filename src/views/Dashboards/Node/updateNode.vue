<template>
  <div>
    <!-- Modal -->

    <div class="row" style="margin-top: 10px;">
      <div class="col-12">
        <div>
          <h5 class="modal-title text-center" style="width:100%;">Modifier Nœud</h5>
          <div class="container">
            <div class="row">
              <div class="form-group col-12">
                <label for="Nom">Nom</label>
                <input class="form-control" id="Nom" v-model="node_to_update.name" />
              </div>
              <div class="form-group col-6">
                <label for="Nom">Description</label>
                <textarea
                  cols="30"
                  class="form-control"
                  rows="5"
                  v-model="node_to_update.description"
                ></textarea>
              </div>

              <div class="form-group col-6">
                <label for="Nom">Conseils et instructions</label>
                <input
                  class="form-control"
                  placeholder="Saisir une nouvelle instruction"
                  id="update_new_instruction"
                  v-on:keyup.enter="
                    node_to_update.Conseils_instructions.push(
                      $event.target.value
                    );
                    $event.target.value = '';
                  "
                />

                <select class="form-control" multiple>
                  <option
                    v-for="(instruction,
                    key) in node_to_update.Conseils_instructions"
                    :key="key"
                    :value="instruction"
                    style="cursor: no-drop;"
                    v-on:dblclick="
                      node_to_update.Conseils_instructions.splice(key, 1)
                    "
                    title="double-cliquez pour supprimer cet élément"
                  >{{ instruction }}</option>
                </select>
              </div>

              <div class="form-group col-6">
                <label for="Nom">Définir les moyens (Engins) pour cet cas d'intervention</label>

                <select
                  class="form-control"
                  v-on:change="
                    $event.target.value != null
                      ? node_to_update.decision.intern.push($event.target.value)
                      : null;
                    $event.target.value = 'null';
                  "
                >
                  <option value="null">Ajouter Engin</option>
                  <option
                    v-for="(engin, key) in Engins"
                    :key="key"
                    :value="engin.name"
                  >{{ engin.name }}</option>
                </select>

                <select class="form-control" multiple>
                  <option
                    v-for="(engin, key) in node_to_update.decision.intern"
                    :key="key"
                    :value="engin"
                    style="cursor: no-drop;"
                    v-on:dblclick="
                      node_to_update.decision.intern.splice(key, 1)
                    "
                    title="double-cliquez pour supprimer cet élément"
                  >{{ engin }}</option>
                </select>
              </div>

              <div class="form-group col-6">
                <label for="Nom">Les établissements extern nécéssaire pour cette intervention</label>

                <select
                  class="form-control"
                  v-on:change="
                    $event.target.value != null
                      ? node_to_update.decision.extern.push($event.target.value)
                      : null;
                    $event.target.value = 'null';
                  "
                >
                  <option value="null">Ajouter Une Etablissement Extern</option>
                  <option
                    v-for="(etablissement, key) in etablissement_extern"
                    :key="key"
                    :value="etablissement.name"
                  >{{ etablissement.name }}</option>
                </select>

                <select class="form-control" multiple>
                  <option
                    v-for="(etablissement, key) in node_to_update.decision
                      .extern"
                    :key="key"
                    :value="etablissement"
                    style="cursor: no-drop;"
                    v-on:dblclick="
                      node_to_update.decision.extern.splice(key, 1)
                    "
                    title="double-cliquez pour supprimer cet élément"
                  >
                    <!--{{etablissement.name }} ( {{etablissement._id}} )-->
                    {{ etablissement }}
                  </option>
                </select>
              </div>
            </div>
            <div id="childDiv" class="d-flex align-items-end flex-column">
              <div class="mt-auto">
                <b-button
                  variant="success"
                  id="add_submit"
                  v-on:click="submit_node_update()"
                >Confirmer les modifications</b-button>
                <b-button variant="outline-primary" v-on:click="annuler()">Annuler</b-button>
              </div>
            </div>
          </div>
          <br />
          <br />
          <!-- ##################################################### -->
        </div>
      </div>
    </div>

    <div></div>
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
    parent_node_id: "",
    selected_node: null,
    selected_node_display: null,
    node_to_update: null,
    selected_path: [],
    current_level: {},
    numTelInput: "",
    numTel: "",
    wilaya: "",
    daira: "",
    lieu: "",
    GpsAdresse: "",
    tree: [],
    niv1: {},
    niv2: [],
    decision: {},
    searchOpen: true,
    heading: "Analytics Dashboard",
    subheading:
      "This is an example dashboard created using build-in elements and components.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure",
    Engins: [],
    etablissement_extern: [
      {
        name: "Police"
      },
      {
        name: "Gendarmerie"
      },
      {
        name: "Conservation des forêts"
      },
      {
        name: "Hopital"
      }
    ],
    node_to_add: {
      decision: {
        intern: [],
        extern: []
      },
      icon: "",
      Conseils_instructions: [],

      name: "",
      description: "",
      parent_id: null
    }
  }),

  methods: {
    getAllEngins() {
      this.$http
        .get(process.env.VUE_APP_API + "/engin/")
        .then(res => {
          this.Engins = res.data.data;
        })
        .catch(error => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    submit_node_update() {
      this.$http
        .put(
          process.env.VUE_APP_API + "/tree/" + this.parent_node_id,
          this.node_to_update
        )
        .then(res => {
          this.selected_node = res.data.data;
          this.selected_node_display = this.selected_node;
          this.$dialog.showMessageBox({
            title: "success",
            message: "Nœud modifié avec succès"
          });
        })
        .catch(error => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    annuler() {
      this.$router.push({
        path: "/intervention/listnode"
      });
    }
  },

  watch: {
    "node_to_update.decision.intern": function() {
      if (this.node_to_update != null) {
        var tmp = [...new Set(this.node_to_update.decision.intern)];
        if (tmp.length != this.node_to_update.decision.intern.length)
          this.node_to_update.decision.intern = tmp;
      }
    },
    "node_to_update.decision.extern": function() {
      if (this.node_to_update != null) {
        var tmp = [...new Set(this.node_to_update.decision.extern)];
        if (tmp.length != this.node_to_update.decision.extern.length)
          this.node_to_update.decision.extern = tmp;
      }
    }
  },
  computed: {
    randomKey: function() {
      return Math.ceil(Math.random() * 10);
    }
  },
  created() {
    this.getAllEngins();
    this.parent_node_id = this.$route.params.parent_node_id;
    this.node_to_update = this.$route.params.selected_node;

    //this.current_level =
  }
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