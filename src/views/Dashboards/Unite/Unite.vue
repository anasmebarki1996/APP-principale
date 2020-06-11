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
        <b-card bg-variant="light" v-if="!updateOpen">
          <b-form-group
            label-cols-lg="3"
            label="Ajouter une unite"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Nom Complet De l'unite"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="nom"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Wilaya"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="wilaya"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Daira"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="daira"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="adresse_rue"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="nested-street"
                v-model="adresse_rue"
              ></b-form-input>
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
              v-on:click="createUnite()"
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
        <b-card bg-variant="light" v-else>
          <b-form-group
            label-cols-lg="3"
            label="Modifier l'unité"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Nom Complet De l'unite"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="nom"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Wilaya"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="wilaya"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Daira"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" v-model="daira"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="adresse_rue"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="nested-street"
                v-model="adresse_rue"
              ></b-form-input>
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
              v-on:click="updateInformationUnite()"
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
            class="btn btn-secondary"
            type="button"
            v-on:click="getListUnite"
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
      <template v-slot:cell(index)="data">
        {{ (data.index + 1) * currentPage }}
      </template>
      <template v-slot:cell(panne)="data">
        <div v-if="!data.item.panne" class="mb-2 mr-2 badge badge-success">
          En service
        </div>
        <div v-else class="mb-2 mr-2 badge badge-warning">Hors Service</div>
      </template>
      <template v-slot:cell(show_details)="data">
        <b-button variant="success" v-on:click="openUpdateUnite(data.item)">
          <font-awesome-icon icon="edit" />
        </b-button>
        <b-button variant="danger" v-on:click="deleteUnite(data.item._id)">
          <font-awesome-icon icon="trash" />
        </b-button>
        <b-button variant="danger" v-on:click="goToAgents(data.item._id)">
          Agents
        </b-button>
        <b-button variant="danger">
          Engins
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="limit"
      aria-controls="my-table"
      v-on:click.native="getListUnite"
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
      heading: "Les unites",
      subheading: "la liste des dsqdsqdsq",
      icon: "pe-7s-car icon-gradient bg-tempting-azure",
      title: "",
      link: "",
      unite_nom_list: [],
      unite_adresse_rue_list: [],
      fields: [
        "index",
        {
          key: "nom",
          label: "Nom Complet",
          tdClass: "nomOfTheClass",
          sortable: true,
        },
        {
          key: "adresse.daira",
          label: "Code Name",
          tdClass: "nomOfTheClass",
          sortable: true,
        },
        {
          key: "adresse.adresse_rue",
          label: "Matricule",
          tdClass: "nomOfTheClass",
          sortable: true,
        },
        {
          key: "numTel",
          label: "Statut",
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

      nom: "",
      wilaya: "",
      daira: "",
      adresse_rue: "",
      lat: "",
      lng: "",
      numTel: "",
      id_unite: "",
      updateOpen: false,
    };
  },
  methods: {
    getListUnite() {
      this.isBusy = true;
      var link =
        process.env.VUE_APP_API +
        "/getListUnite?limit=" +
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
        .post(link, {})
        .then((res) => {
          console.log(res.data);
          this.items = res.data.unites;
          this.rows = res.data.unites_total;
          this.unite_nom_list = res.data.unite_nom_list;
          this.unite_adresse_rue_list = res.data.unite_adresse_rue_list;
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
      this.getListUnite();
    },

    createUnite() {
      this.$http
        .post(process.env.VUE_APP_API + "/createUnite", {
          nom: this.nom,
          adresse: {
            wilaya: this.wilaya,
            daira: this.daira,
            adresse_rue: this.adresse_rue,
            gps_coordonnee: {
              lat: this.lat,
              lng: this.lng,
            },
          },
          numTel: this.numTel,
        })
        .then(() => {
          this.$dialog.showMessageBox({
            title: "success",
            message: "Unite ajoutée avec succès",
          });
          this.reset();
          this.getListUnite();
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    updateInformationUnite() {
      this.$http
        .post(process.env.VUE_APP_API + "/updateInformationUnite", {
          id_unite: this.id_unite,
          nom: this.nom,
          adresse: {
            wilaya: this.wilaya,
            daira: this.daira,
            adresse_rue: this.adresse_rue,
            gps_coordonnee: {
              lat: this.lat,
              lng: this.lng,
            },
          },
          numTel: this.numTel,
        })
        .then(() => {
          this.$dialog.showMessageBox({
            title: "success",
            message: "Unite modifié avec succès",
          });
          this.updateOpen = false;
          this.reset();
          this.getListUnite();
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    deleteUnite(id_unite) {
      this.$dialog.showMessageBox(
        {
          title: "Supprimer un unite",
          buttons: ["&Yes", "&No", "&Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post(process.env.VUE_APP_API + "/deleteUnite", {
                id_unite: id_unite,
              })
              .then(() => {
                this.$dialog.showMessageBox({
                  title: "success",
                  message: "Unite supprimé avec succès",
                });
                this.getListUnite();
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
    openUpdateUnite(unite) {
      this.updateOpen = true;
      this.nom = unite.nom;
      this.wilaya = unite.adresse.wilaya;
      this.daira = unite.adresse.daira;
      this.adresse_rue = unite.adresse.adresse_rue;
      this.lat = unite.adresse.gps_coordonnee.lat;
      this.lng = unite.adresse.gps_coordonnee.lng;
      this.numTel = unite.numTel;
      this.id_unite = unite._id;
    },
    reset() {
      this.nom = "";
      this.wilaya = "";
      this.daira = "";
      this.adresse_rue = "";
      this.lat = "";
      this.lng = "";
      this.numTel = "";
    },
    goToAgents(id_unite) {
      this.$router.push({
        path: "/agent",
        query: { id_unite: id_unite },
      });
    },
    goToEngins(id_unite) {
      this.$router.push({
        path: "/engin",
        query: { id_unite: id_unite },
      });
    },
  },
  created() {
    this.getListUnite();
  },
};
</script>
