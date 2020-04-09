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
            placeholder="Type to search"
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
          <b-card bg-variant="light" style="padding-buttom: 200px;">
            <b-form-group
              label-cols-lg="3"
              label="Informations Personnel"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
              v-bind:disabled="numTel.length == 0"
            >
              <b-form-group
                label-cols-sm="3"
                label="Numero de téléphone:"
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
                label-for="nested-city"
              >
                <b-form-input
                  id="nested-city"
                  v-model="GpsAdresse"
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
                <b-form-input id="nested-state" v-model="lieu"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label-align-sm="right"
                class="mb-0"
              >
                <b-form-radio-group
                  class="pt-2"
                  :options="['En Ville', 'Hors Ville']"
                ></b-form-radio-group>
              </b-form-group>
            </b-form-group>
          </b-card>
          <br />
          <br />
          <!-- ##################################################### -->
        </div>

        <div class="mb-3 card">
          
              <ol class="breadcrumb" style="back" id="nodes_path" >
                 <li class="breadcrumb-item" >
                  <span style="cursor:pointer" class="text-primary"> <b>Niveau Principal</b> </span>
                </li>
                <li class="breadcrumb-item " v-for="(selected_node) in selected_path" :key="selected_node">
                  <span style="cursor:pointer" class="text-primary"> selected_node </span>
                </li>
                
              </ol>
            

          <div class="p-0 card-body">
            <div class="p-1 slick-slider-sm mx-auto">
              <div class="widget-chart widget-chart2 text-left p-0">
                <div class="widget-chat-wrapper-outer">
                  <div class="row" style="margin: 10px;">
                    <b-button
                      variant="light"
                      class="col-lg-3 col-md-3"
                      v-for="(node) in current_level"
                      :key="node._id"
                      v-on:click="getChildren(node._id)"
                      style="margin: 10px;"
                    >
                      <div class="widget-content">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left">
                            <div class="widget-heading">
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

         
          <div class="card-header-tab card-header">
            <div
              class="card-header-title font-size-lg text-capitalize font-weight-normal"
            >
              <i
                class="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo"
              >
              </i>
              Décision
            </div>
          </div>
          <div class="p-0 card-body">
            <div class="p-1 slick-slider-sm mx-auto">
              <div class="widget-chart widget-chart2 text-left p-0">
                <div class="widget-chat-wrapper-outer">
                  <div class="widget-chart-content pb-0" style="padding: 20px;">
                    <div class="row">
                      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <div class="box-part text-center">
                          <i class="fa fa-github fa-3x" aria-hidden="true"></i>

                          <div class="title">
                            <h4>Github</h4>
                          </div>

                          <div class="text">
                            <span
                              >Lorem ipsum dolor sit amet, id quo eruditi
                              eloquentiam. Assum decore te sed. Elitr scripta
                              ocurreret qui ad.</span
                            >
                          </div>

                          <a href="#">Learn More</a>
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
  faTh,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faCheck, faAngleDown, faAngleUp, faTh, faCalendarAlt);
const axios = require("axios");

export default {
  components: {},
  data: () => ({
    parent_node_id:'',
    selected_path:[],
    current_level:{}, 
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
  }),

  methods: {
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
              axios
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
    getCurrentLevel(){
          axios
              .get("http://localhost:8000/api/tree/nodes/"+this.parent_node_id)
              .then((res) => {
              
                this.current_level = res.data.data
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
    getChildren(parent_node_id){
      //first thing is that this.parent_node_id is going to change 
      this.parent_node_id = parent_node_id
      this.selected_path.push(parent_node_id)
    }
  },
  watch:{
    parent_node_id : function(){
      //when ever this prop changes we get current_level nodes from db
       
      this.getCurrentLevel()
    }

  },
  created() {
    this.getCurrentLevel()

    
    
          
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
</style>