<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :title="title"
      :link="link"
    ></page-title>
    <div class="row ">
      <div class="col-md-6 input-group align-self-end ">
        <input
          type="text"
          class="form-control"
          placeholder="Search this blog"
          v-model="search"
        />
        <div class="">
          <button
            class="btn btn-secondary"
            type="button"
            v-on:click="getListEngin"
          >
            <b-icon icon="search"></b-icon>
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <b-card bg-variant="light" v-if="!updateOpen">
          <b-form-group
            label-cols-lg="3"
            label="Ajouter un engin"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Type d'engin:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="nested-street"
                v-model="code_name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Matricule"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input id="nested-city" v-model="matricule"></b-form-input>
            </b-form-group>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button
              variant="success"
              v-on:click="createEngin()"
              style="margin-right: 10px;"
              >confirmer</b-button
            >
            <b-button
              variant="primary"
              v-on:click="reset()"
              style="margin-right: 10px;"
              >Annuler
            </b-button>
          </div>
        </b-card>
        <b-card bg-variant="light" v-else>
          <b-form-group
            label-cols-lg="3"
            label="Modifier l'engin"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Type d'engin:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="nested-street"
                v-model="code_name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Matricule"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input id="nested-city" v-model="matricule"></b-form-input>
            </b-form-group>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button
              variant="success"
              v-on:click="updateEngin()"
              style="margin-right: 10px;"
              >Confirmer la modification</b-button
            >
            <b-button
              variant="primary"
              v-on:click="(updateOpen = false), reset()"
              style="margin-right: 10px;"
              >Annuler
            </b-button>
          </div>
        </b-card>
      </div>
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
      <template v-slot:empty="">
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
          Success
        </div>
        <div v-else class="mb-2 mr-2 badge badge-warning">En panne</div>
      </template>
      <template v-slot:cell(show_details)="data">
        <b-button
          variant="warning"
          v-on:click="changeStatutPanne(data.item._id, data.item.panne)"
          ><font-awesome-icon icon="calendar-times" v-if="data.item.panne" />
          <font-awesome-icon icon="calendar-plus" v-else />
        </b-button>
        <b-button variant="danger" v-on:click="deleteEngin(data.item._id)"
          ><font-awesome-icon icon="trash" />
        </b-button>
        <b-button variant="success" v-on:click="openUpdateEngin(data.item)"
          ><font-awesome-icon icon="edit"
        /></b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="limit"
      aria-controls="my-table"
      v-on:click.native="getListEngin"
    ></b-pagination>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle";

const dialog = require("electron").remote.dialog;

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      value: "",
      heading: "Les engins",
      subheading: "la liste des dsqdsqdsq",
      icon: "pe-7s-car icon-gradient bg-tempting-azure",
      title: "",
      link: "",
      fields: [
        "index",
        {
          key: "code_name",
          label: "Code Name",
          tdClass: "nameOfTheClass",
          sortable: true,
        },
        {
          key: "matricule",
          label: "Matricule",
          tdClass: "nameOfTheClass",
          sortable: true,
        },
        {
          key: "panne",
          label: "Statut",
          tdClass: "nameOfTheClass",
          sortable: true,
        },
        { key: "show_details", label: "", tdClass: "nameOfTheClass" },
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

      code_name: "",
      matricule: "",
      id_engin: "",
      updateOpen: false,
    };
  },
  methods: {
    getListEngin() {
      this.isBusy = true;
      var link =
        "http://localhost:8000/API/getListEngin?limit=" +
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
          this.items = res.data.engins;
          this.rows = res.data.engins_total;
          this.isBusy = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    foo(e) {
      if (e.sortDesc) {
        this.sortBy = "-" + e.sortBy;
      } else this.sortBy = e.sortBy;
      this.getListEngin();
    },

    changeStatutPanne(id_engin, statutPanne) {
      dialog.showMessageBox(
        {
          title: "Change statut panne",
          buttons: ["&Yes", "&No", "&Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post("http://localhost:8000/API/changeStatutPanne", {
                id_engin: id_engin,
                panne: statutPanne,
              })
              .then(() => {
                this.getListEngin();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      );
    },
    createEngin() {
      this.$http
        .post("http://localhost:8000/API/createEngin", {
          code_name: this.code_name,
          matricule: this.matricule,
        })
        .then(() => {
          this.$bvToast.toast("Engin Ajouté", {
            variant: "success",
            solid: true,
          });
          this.reset();
          this.getListEngin();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateEngin() {
      this.$http
        .post("http://localhost:8000/API/updateEngin", {
          id_engin: this.id_engin,
          code_name: this.code_name,
          matricule: this.matricule,
        })
        .then(() => {
          this.$bvToast.toast("Engin modifié", {
            variant: "success",
            solid: true,
          });
          this.updateOpen = false;
          this.reset();
          this.getListEngin();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteEngin(id_engin) {
      dialog.showMessageBox(
        {
          title: "Supprimer un engin",
          buttons: ["&Yes", "&No", "&Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post("http://localhost:8000/API/deleteEngin", {
                id_engin: id_engin,
              })
              .then(() => {
                this.getListEngin();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      );
    },
    openUpdateEngin(engin) {
      this.updateOpen = true;
      this.code_name = engin.code_name;
      this.matricule = engin.matricule;
      this.id_engin = engin._id;
    },
    reset() {
      this.code_name = "";
      this.matricule = "";
      this.id_engin = "";
    },
  },
  created() {
    this.getListEngin();
  },
};
</script>
