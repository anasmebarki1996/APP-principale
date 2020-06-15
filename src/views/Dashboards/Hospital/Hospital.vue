<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :title="title"
      :link="link"
    ></page-title>
    <div class="row">
      <div class="col-md-12 mb-3">
        <b-card bg-variant="link" v-if="!updateOpen">
          <b-form-group
            label-cols-lg="3"
            label="Ajouter un hopital"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Nom Complet De l'hopital"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="name"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="laltitude"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="lat"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="longitude"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="lng"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Numéro de téléphone"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="numTel"></b-form-input>
            </b-form-group>
          </b-form-group>

          <div class="d-flex justify-content-end">
            <b-button
              variant="success"
              v-on:click="createHospital()"
              style="margin-right: 10px;"
              >confirmer</b-button
            >
            <b-button
              variant="primary"
              v-on:click="reset()"
              style="margin-right: 10px;"
              >Annuler</b-button
            >
          </div>
        </b-card>
        <b-card bg-variant="link" v-else>
          <b-form-group
            label-cols-lg="3"
            label="Modifier l'hopital"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Nom Complet De l'hopital"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="name"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="laltitude"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="lat"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="longitude"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="lng"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Numéro de téléphone"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="numTel"></b-form-input>
            </b-form-group>
          </b-form-group>

          <div class="d-flex justify-content-end">
            <b-button
              variant="success"
              v-on:click="updateHospital()"
              style="margin-right: 10px;"
              >confirmer</b-button
            >
            <b-button
              variant="primary"
              v-on:click="(updateOpen = false), reset()"
              style="margin-right: 10px;"
              >Annuler</b-button
            >
          </div>
        </b-card>
      </div>
      <div class="col-md-3"></div>
      <div class="col-md-6 input-group align-self-end">
        <input
          type="text"
          class="form-control"
          placeholder="Tapez ici pour rechercher"
          v-model="search"
        />
        <div class>
          <button
            class="btn btn-light"
            type="button"
            v-on:click="getListHospital"
          >
            <b-icon icon="search"></b-icon>
          </button>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
    <br />

    <b-table
      :items="items"
      :fields="fields"
      striped
      no-local-sorting
      responsive="sm"
      :busy="isBusy"
      @sort-changed="foo"
      show-empty
    >
      <template v-slot:empty>
        <h4 class="d-flex justify-content-center">table vide</h4>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Chargement...</strong>
        </div>
      </template>
      <template v-slot:cell(panne)="data">
        <div v-if="!data.item.panne" class="mb-2 mr-2 badge badge-success">
          En service
        </div>
        <div v-else class="mb-2 mr-2 badge badge-warning">Hors Service</div>
      </template>
      <template v-slot:cell(show_details)="data">
        <b-button variant="success" v-on:click="openUdapteHospital(data.item)">
          <font-awesome-icon icon="edit" />
        </b-button>
        <b-button variant="danger" v-on:click="deleteHospital(data.item._id)">
          <font-awesome-icon icon="trash" />
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="limit"
      aria-controls="my-table"
      v-on:click.native="getListHospital"
    ></b-pagination>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      value: "",
      heading: "Les hopitaux",
      subheading: "",
      icon: "pe-7s-bandaid icon-gradient bg-tempting-azure",
      title: "",
      link: "",

      fields: [
        {
          key: "name",
          label: "Nom Complet",
          tdClass: "nomOfTheClass",
          sortable: true,
        },
        {
          key: "numTel",
          label: "Numéro de téléphone",
          tdClass: "nomOfTheClass",
          sortable: true,
        },
        {
          key: "show_details",
          label: "",
          tdClass: "nomOfTheClass",
        },
      ],
      isBusy: false,
      items: [],
      limit: 10,
      rows: 0,
      currentPage: 1,
      sort: "dateTimeAppel",
      sortBy: "",
      search: "",
      //*********** */

      name: "",
      wilaya: "",
      daira: "",
      adresse_rue: "",
      lat: "",
      lng: "",
      numTel: "",
      id_hospital: "",
      updateOpen: false,
    };
  },
  methods: {
    getListHospital() {
      this.isBusy = true;
      var link =
        process.env.VUE_APP_API +
        "/getListHospital?limit=" +
        this.limit +
        "&page=" +
        this.currentPage;
      if (this.search) {
        link = link + "&search=" + this.search;
      }
      if (this.sortBy != "") {
        link = link + "&sort=" + this.sortBy;
      }
      this.$http
        .get(link)
        .then((res) => {
          this.items = res.data.hospitals;
          this.rows = res.data.hospitals_length;
          this.isBusy = false;
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    foo(e) {
      if (e.sortDesc) {
        this.sortBy = "-" + e.sortBy;
      } else this.sortBy = e.sortBy;
      this.getListHospital();
    },

    createHospital() {
      this.$http
        .post(process.env.VUE_APP_API + "/createHospital", {
          name: this.name,
          gps_coordonnee: {
            lat: this.lat,
            lng: this.lng,
          },
          numTel: this.numTel,
        })
        .then(() => {
          this.$dialog.showMessageBox({
            title: "success",
            message: "Hopital ajoutée avec succès",
          });
          this.reset();
          this.getListHospital();
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    updateHospital() {
      this.$http
        .post(process.env.VUE_APP_API + "/updateHospital", {
          id_hospital: this.id_hospital,
          name: this.name,
          gps_coordonnee: {
            lat: this.lat,
            lng: this.lng,
          },
          numTel: this.numTel,
        })
        .then(() => {
          this.$dialog.showMessageBox({
            title: "success",
            message: "Hopital modifié avec succès",
          });
          this.updateOpen = false;
          this.reset();
          this.getListHospital();
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    deleteHospital(id_hospital) {
      this.$dialog.showMessageBox(
        {
          title: "Supprimer un hopital",
          buttons: ["&Yes", "&No", "&Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post(process.env.VUE_APP_API + "/deleteHospital", {
                id_hospital: id_hospital,
              })
              .then(() => {
                this.$dialog.showMessageBox({
                  title: "success",
                  message: "Hopital supprimé avec succès",
                });
                this.getListHospital();
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
    openUdapteHospital(hospital) {
      this.updateOpen = true;
      this.name = hospital.name;
      this.lat = hospital.gps_coordonnee.lat;
      this.lng = hospital.gps_coordonnee.lng;
      this.numTel = hospital.numTel;
      this.id_hospital = hospital._id;
    },
    reset() {
      this.name = "";
      this.lat = "";
      this.lng = "";
      this.numTel = "";
    },
  },
  created() {
    this.getListHospital();
  },
};
</script>
