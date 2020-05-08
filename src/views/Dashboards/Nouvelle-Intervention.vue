<template>
  <div>
    

   

    <div class="d-flex justify-content-center">
      <div class="search-wrapper" v-bind:class="{ active: searchOpen }" style="width: auto;">
        <div class="input-holder" style="width: 500px;">
          <input v-model="numTelInput" type="text" class="search-input" placeholder="Type to search" />
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
          <b-card bg-variant="light" style="padding-buttom: 200px;">
            <b-form-group label-cols-lg="3" label="Informations Personnel" label-size="lg"
              label-class="font-weight-bold pt-0" class="mb-0" v-bind:disabled="numTel.length == 0">
              <b-form-group label-cols-sm="3" label="Numero de téléphone:" label-align-sm="right"
                label-for="nested-street">
                <b-form-input id="nested-street" v-model="numTel" readonly></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Gps addresse" label-align-sm="right" label-for="nested-city">
                <b-form-input id="nested-city" v-model="GpsAdresse" readonly></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Wilaya" label-align-sm="right" label-for="nested-state">
                <b-form-input id="nested-state" v-model="wilaya"></b-form-input>
              </b-form-group>
              <b-form-group label-cols-sm="3" label="Daira" label-align-sm="right" label-for="nested-state">
                <b-form-input id="nested-state" v-model="daira"></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Lieu" label-align-sm="right" label-for="nested-state">
                <b-form-input id="nested-state" v-model="lieu"></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label-align-sm="right" class="mb-0">
                <b-form-radio-group class="pt-2" :options="['En Ville', 'Hors Ville']"></b-form-radio-group>
              </b-form-group>
            </b-form-group>
          </b-card>
          <br />
          <br />
          <!-- ##################################################### -->
        </div>
        <div class="row">
          <div class="col-9">
            <div class="mb-3 card">
              <ol class="breadcrumb" style="back" id="nodes_path">
                <div class="row">
                  <li class="breadcrumb-item">
                    <span style="cursor:pointer" class="badge badge-primary" v-on:click="selecteNodeFromPath(null)">
                      <b>Niveau Principal</b>
                      <span v-if="selected_path.length == 0">
                        <router-link :to="{ name: 'addNode', params: { parent_node_id } }">
                          <img style="margin-left:20px;margin-top:-7px;" src="@/assets/images/add.png" width="15"
                          title="Ajouter Un nœud "  /> 
                        </router-link>

                      </span>
                    </span>
                  </li>

                  <li class="breadcrumb-item" v-for="(path_item,key) in selected_path" :key="key">

                    <span style="cursor:pointer"  
                      :class="(path_item._id == selected_path[selected_path.length-1]._id)? 'badge badge-success':'badge badge-primary'"
                    
                      v-on:click="selecteNodeFromPath(path_item._id)">{{ path_item.name }}

                      <span style="margin-left:20px;" v-if="(path_item._id == selected_path[selected_path.length-1]._id)">
                        <router-link :to="{ name: 'addNode', params: { parent_node_id } }">
                        <img style="margin-top:-7px;" src="@/assets/images/add.png" width="15"
                        title="Ajouter Un nœud "   /> 

                      </router-link>

                      <router-link :to="{ name: 'updateNode', params: { selected_node,parent_node_id } }">
                     <img style="margin-left:5px;margin-top:-7px;" src="@/assets/images/edit.png" width="15"
                    title="modifier cet nœud  " /> 

                  </router-link>

                  <img style="margin-left:5px;cursor:pointer;margin-top:-7px;" src="@/assets/images/remove.png" width="15"
                        title="Supprimer cet nœud sélectionné" v-on:click="removeNode()"  />

                      </span>
                      
                      </span>
                  </li>
                  

                   

                  
                  
                </div>
              </ol>

              <div class="p-0 card-body">
                <div class="p-1 slick-slider-sm mx-auto">
                  <div class="widget-chart widget-chart2 text-left p-0">
                    <div class="widget-chat-wrapper-outer">
                      <div class="row" style="margin: 10px;">
                        <div class="col-4 col-4" v-on:mouseover="nodeInfoDisplay(node)"
                          v-on:mouseleave="nodeInfoDisplay(null)" v-for="node in current_level" :key="node._id"
                          style="margin-bottom:10px;">
                          <!-- v-on:mouseover="tmp_selected_node = selected_node ; selected_node = node" v-on:mouseleave="selected_node = tmp_selected_node" -->
                          <b-button variant="light" v-on:click="getChildren(node)" style="width:260px;height:64px">
                            <div class="widget-content" style="padding:0px;" v-bind:title="node.name">
                              <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                  <div class="widget-heading">
                                    <img src="https://static.thenounproject.com/png/656264-200.png" width="50" alt
                                      srcset />
                                  </div>
                                </div>
                                <div class="widget-content-outer">
                                  <div class="widget-heading" style="padding-left:25px;">
                                    {{ node.name }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-3 p-0">
            <div class="mb-3 card">
              <div class="p-0 card-body">
                <div v-if="selected_node_display != null">
                  <div id="description">
                    <ol class="breadcrumb" style="padding:5px;">
                      <span style="cursor:pointer" class="text-success text-capitalize">
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
                      <span style="cursor:pointer" class="text-success text-capitalize">
                        <b>Conseils et instructions :</b>
                      </span>
                    </ol>

                    <div class="row">
                      <div class="col-12 pl-4 pr-4">
                        <p v-for="(instruction,
                          key) in selected_node_display.Conseils_instructions" :key="key" style="margin-bottom:3px;">
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
                      <span style="cursor:pointer" class="text-success text-capitalize">
                        <b>Moyen D'intervention Recommandée</b>
                      </span>
                    </ol>

                    <div class="row" v-for="d_intern in selected_node_display.decision.intern" :key="d_intern">
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
                      <span style="cursor:pointer" class="text-success text-capitalize">
                        <b>Intervention Externe Recommandée</b>
                      </span>
                    </ol>

                    <div class="row" v-for="(d_extern, key) in selected_node_display.decision
                        .extern" :key="key">
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
      selected_node_display: null,
      
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
      subheading: "This is an example dashboard created using build-in elements and components.",
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
      test(engin) {
        console.log(engin);
      },
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
      modal_next_click(direction) {
        if (direction) {
          // if true then next is clicked
          document.querySelector("#node_update_1").style.display = "none";
          document.querySelector("#node_update_2").style.display = "block";
          document.querySelector("#update_back").style.display = "block";
          document.querySelector("#update_next").style.display = "none";
          document.querySelector("#update_submit").style.display = "block";
        } else {
          document.querySelector("#update_back").style.display = "none";
          document.querySelector("#update_next").style.display = "block";
          document.querySelector("#update_submit").style.display = "none";

          document.querySelector("#node_update_2").style.display = "none";
          document.querySelector("#node_update_1").style.display = "block";
        }
      },
      add_modal_next_click(direction) {
        if (direction) {
          // if true then next is clicked
          document.querySelector("#node_add_1").style.display = "none";
          document.querySelector("#node_add_2").style.display = "block";
          document.querySelector("#add_back").style.display = "block";
          document.querySelector("#add_next").style.display = "none";
          document.querySelector("#add_submit").style.display = "block";
        } else {
          document.querySelector("#add_back").style.display = "none";
          document.querySelector("#add_next").style.display = "block";
          document.querySelector("#add_submit").style.display = "none";

          document.querySelector("#node_add_2").style.display = "none";
          document.querySelector("#node_add_1").style.display = "block";
        }
      },

      getAppel() {
        if (this.numTelInput.length != 10) {
          this.$swal(
            "vous devrez vérifier le numero : " +
            this.numTelInput +
            " ---> " +
            this.numTelInput.length +
            " --------"
          );
        } else {
          this.$swal
            .fire({
              title: "Vous confirmez ce numero ?",
              text: this.numTelInput,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Oui!",
              cancelButtonText: "Annuler",
            })
            .then((result) => {
              if (result.value) {
                this.$http
                  .post("http://localhost:8000/API/getAppel", {
                    numTel: this.numTelInput,
                  })
                  .then((res) => {
                    this.numTel = this.numTelInput;
                    this.numTelInput = "";
                    console.log(res);
                  })
                  .catch((error) => {
                    console.log(error.message);
                    this.$swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: error.response.data.message,
                    });
                  });
              }
            });
        }
      },
      getCurrentLevel() {
        this.$http
          .get("http://localhost:8000/api/tree/nodes/" + this.parent_node_id)
          .then((res) => {
            this.current_level = res.data.data;
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
          .get("http://localhost:8000/api/tree/path/" + this.parent_node_id)
          .then((res) => {
            this.selected_path = res.data.data.reverse();
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
      
      removeNode(){
       

          this.$swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le !'
          }).then((result) => {
            if (result.value) {
                this.$http
                    .delete(
                      "http://localhost:8000/api/tree/" + this.parent_node_id,
                    )
                    .then(() => {
                      this.$swal.fire(
                        'Supprimé!',
                        'le nœud a été supprimé.',
                        'success'
                      ).then(()=>{
                        
                        this.selected_path.pop()
                      })
                      
                    })
                    .catch((error) => {
                      
                      this.$swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data.message,
                      });
                    });
              
            }
          })
      }
     
    },

    watch: {
      parent_node_id: function () {
        //when ever this prop changes we get current_level nodes from db

        this.getCurrentLevel();
        this.getNodePath();
        this.selected_node_display = this.selected_node;
        this.node_to_update = this.selected_node;
      },
      
    },
    computed: {
      randomKey: function () {
        return Math.ceil(Math.random() * 10);
      },
    },
    created() {
      this.getAllEngins();
      this.getCurrentLevel();

      //this.current_level =
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