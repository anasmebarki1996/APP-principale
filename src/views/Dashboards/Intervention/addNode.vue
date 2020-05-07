<template>
  <div>
    <!-- Modal -->

  


    <!-- ##################################################### -->
    <div class="row" style="margin-top: 10px;">
      <div class="col-lg-12">
        <div>
          <!-- ##################################################### -->
          
            <h5 class="modal-title text-center" style="width:100%;">
              Ajouter un nouveau nœud
            </h5>

            <div class="container">
              

                <div class="form-group">
                  <label for="Nom">Nom</label>
                  <input class="form-control" id="Nom" v-model="node_to_add.name" />
                </div>

                <div class="form-group">
                  <label for="Nom">Description</label>

                  <textarea cols="30" class="form-control" rows="4" v-model="node_to_add.description"></textarea>
                </div>



                <div class="form-group">
                  <label for="Nom">Conseils et instructions</label>

                  <input class="form-control" placeholder="Saisir une nouvelle instruction" id="update_new_instruction"
                    v-on:keyup.enter="
                    node_to_add.Conseils_instructions.push($event.target.value);
                    $event.target.value = '';
                  " />

                  <select class="form-control" multiple>
                    <option v-for="(instruction,
                    key) in node_to_add.Conseils_instructions" :key="key" :value="instruction" style="cursor: no-drop;"
                      v-on:dblclick="
                      node_to_add.Conseils_instructions.splice(key, 1)
                    " title="double-cliquez pour supprimer cet élément">{{ instruction }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="Nom">
                    Définir les moyens (Engins) pour cet cas d'intervention
                  </label>

                  <select class="form-control" v-on:change="
                    $event.target.value != null
                      ? node_to_add.decision.intern.push($event.target.value)
                      : null;
                    $event.target.value = 'null';
                  ">
                    <option value="null">Ajouter Engin</option>
                    <option v-for="(engin, key) in Engins" :key="key" :value="engin.name">{{ engin.name }}</option>
                  </select>

                  <select class="form-control" multiple>
                    <option v-for="(engin, key) in node_to_add.decision.intern" :key="key" :value="engin"
                      style="cursor: no-drop;" v-on:dblclick="node_to_add.decision.intern.splice(key, 1)"
                      title="double-cliquez pour supprimer cet élément">{{ engin }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="Nom">
                    Les établissements extern nécéssaire pour cette intervention
                  </label>

                  <select class="form-control" v-on:change="
                    $event.target.value != null
                      ? node_to_add.decision.extern.push($event.target.value)
                      : null;
                    $event.target.value = 'null';
                  ">
                    <option value="null">Ajouter Une Etablissement Extern</option>
                    <option v-for="(etablissement, key) in etablissement_extern" :key="key" :value="etablissement.name">
                      {{ etablissement.name }}</option>
                  </select>

                  <select class="form-control" multiple>
                    <option v-for="(etablissement, key) in node_to_add.decision.extern" :key="key"
                      :value="etablissement" style="cursor: no-drop;"
                      v-on:dblclick="node_to_add.decision.extern.splice(key, 1)"
                      title="double-cliquez pour supprimer cet élément">
                      <!--{{etablissement.name }} ( {{etablissement._id}} )-->
                      {{ etablissement }}
                    </option>
                  </select>
                </div>

              <button type="button" class="btn btn-primary" id="add_submit" v-on:click="submit_node()">
              Ajouter
            </button>
            </div>


          
          <br />
          <br />
          <!-- ##################################################### -->
        </div>

      </div>
    </div>

    <div>
      
    </div>
  </div>
</template>

<script>
  import {
    library
  } from "@fortawesome/fontawesome-svg-core";
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
      
      
      
      decision: {},
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      Engins: [],
      etablissement_extern: [{
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
     
      getAllEngins() {
        this.$http
          .get("http://localhost:8000/api/engin/")
          .then((res) => {
            this.Engins = res.data.data;
          })
          .catch((error) => {
            console.log(error.message);
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
          });
      },
      
      submit_node() {
        this.node_to_add.parent_id = this.parent_node_id;
        this.$http
          .post("http://localhost:8000/api/tree/", this.node_to_add)
          .then((res) => {
            this.parent_node_id = res.data.data._id;

            this.node_to_add = {
              decision: {
                intern: [],
                extern: [],
              },
              icon: "",
              Conseils_instructions: [],

              name: "",
              description: "",
              parent_id: null,
            };

            this.$swal.fire({
              icon: "success",
              title: "Nœud ajouté avec succès",
              
            });
          })
          .catch((error) => {
            console.log(error.message);
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
          });
      },
    },

    watch: {
      
      
      "node_to_add.decision.intern": function () {
        if (this.node_to_add != null) {
          var tmp = [...new Set(this.node_to_add.decision.intern)];
          if (tmp.length != this.node_to_add.decision.intern.length)
            this.node_to_add.decision.intern = tmp;
        }
      },
      "node_to_add.decision.extern": function () {
        var tmp = [...new Set(this.node_to_add.decision.extern)];
        if (tmp.length != this.node_to_add.decision.extern.length)
          this.node_to_add.decision.extern = tmp;
      },
    },
    computed: {
      randomKey: function () {
        return Math.ceil(Math.random() * 10);
      },
    },
    created() {
      this.getAllEngins();

      this.parent_node_id = this.$route.params.parent_node_id

      

      
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