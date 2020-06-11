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
            label="Ajouter un engin"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Nom Complet D'engin"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="nested-street"
                v-model="name"
                list="engin_name_list"
              ></b-form-input>

              <datalist id="engin_name_list">
                <option
                  v-for="(engin_name, key) in engin_name_list"
                  :key="key"
                  >{{ engin_name }}</option
                >
              </datalist>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Abréviation"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="nested-street"
                v-model="code_name"
                list="engin_code_name_list"
              ></b-form-input>

              <datalist id="engin_code_name_list">
                <option
                  v-for="(engin_code_name, key) in engin_code_name_list"
                  :key="key"
                  >{{ engin_code_name }}</option
                >
              </datalist>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Matricule"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input id="nested-city" v-model="matricule"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Unité"
              label-align-sm="right"
              label-for="nested-street"
            >
              <select class="mb-2 form-control" v-model="id_unite_2">
                <option
                  v-bind:value="unite1._id"
                  v-for="unite1 in unites"
                  v-bind:key="unite1._id"
                  >{{ unite1.nom }}</option
                >
              </select>
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
              >Annuler</b-button
            >
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
              label="Nom Complet D'engin"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="nested-street"
                v-model="name"
                list="engin_name_list"
              ></b-form-input>

              <datalist id="engin_name_list">
                <option
                  v-for="(engin_name, key) in engin_name_list"
                  :key="key"
                  >{{ engin_name }}</option
                >
              </datalist>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Abréviation"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                id="nested-street"
                v-model="code_name"
                list="engin_code_name_list"
              ></b-form-input>

              <datalist id="engin_code_name_list">
                <option
                  v-for="(engin_code_name, key) in engin_code_name_list"
                  :key="key"
                  >{{ engin_code_name }}</option
                >
              </datalist>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Matricule"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input id="nested-city" v-model="matricule"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Unité"
              label-align-sm="right"
              label-for="nested-street"
            >
              <select
                class="mb-2 form-control"
                v-model="id_unite"
                v-on:change="getListEngin()"
              >
                <option value="" selected>Tout</option>
                <option
                  v-bind:value="unite1._id"
                  v-for="unite1 in unites"
                  v-bind:key="unite1._id"
                  >{{ unite1.nom }}</option
                >
              </select>
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
              >Annuler</b-button
            >
          </div>
        </b-card>
      </div>
      <div class="col-md-6 input-group">
        <select
          class="mb-2 form-control"
          v-model="id_unite"
          v-on:change="getListEngin()"
        >
          <option
            v-bind:value="unite1._id"
            v-for="unite1 in unites"
            v-bind:key="unite1._id"
            >{{ unite1.nom }}</option
          >
        </select>
      </div>
      <div class="col-md-6 input-group">
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
            v-on:click="getListEngin()"
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
      <template v-slot:cell(index)="data">{{
        (data.index + 1) * currentPage
      }}</template>
      <template v-slot:cell(panne)="data">
        <div v-if="!data.item.panne" class="mb-2 mr-2 badge badge-success">
          En service
        </div>
        <div v-else class="mb-2 mr-2 badge badge-warning">Hors Service</div>
      </template>
      <template v-slot:cell(show_details)="data">
        <b-button
          variant="warning"
          v-on:click="changeStatutPanne(data.item._id, data.item.panne)"
        >
          <font-awesome-icon icon="calendar-times" v-if="data.item.panne" />
          <font-awesome-icon icon="calendar-plus" v-else />
        </b-button>
        <b-button variant="danger" v-on:click="deleteEngin(data.item._id)">
          <font-awesome-icon icon="trash" />
        </b-button>
        <b-button variant="success" v-on:click="openUpdateEngin(data.item)">
          <font-awesome-icon icon="edit" />
        </b-button>
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
      engin_name_list: [],
      engin_code_name_list: [],
      unite_list: [],
      fields: [
        {
          key: "name",
          label: "Nom Complet",
          tdClass: "nameOfTheClass",
          sortable: true,
        },
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
        {
          key: "show_details",
          label: "",
        },
      ],
      isBusy: false,
      items: [],
      limit: 5,
      rows: 0,
      currentPage: 1,
      sort: "dateTimeAppel",
      sortBy: "",
      search: "",
      //*********** */

      name: "",
      code_name: "",
      matricule: "",
      id_engin: "",
      id_unite_2: "",
      updateOpen: false,

      unites: [],
      id_unite: "",
    };
  },
  methods: {
    getListEngin() {
      this.isBusy = true;
      var link =
        process.env.VUE_APP_API +
        "/getListEngin?limit=" +
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
        .post(link, {
          id_unite: this.id_unite,
        })
        .then((res) => {
          this.items = res.data.engins;
          this.rows = res.data.engins_total;
          this.engin_name_list = res.data.engin_name_list;
          this.engin_code_name_list = res.data.engin_code_name_list;
          this.isBusy = false;
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    getListUnite() {
      this.$http
        .post(process.env.VUE_APP_API + "/getListUnite", {})
        .then((res) => {
          this.unite_list = res.data.unites;
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
      this.getListEngin();
    },
    createEngin() {
      if (this.id_unite_2 == "Unité prinicipale") {
        this.id_unite_2 = "";
      }
      this.$http
        .post(process.env.VUE_APP_API + "/createEngin", {
          name: this.name,
          code_name: this.code_name,
          matricule: this.matricule,
          id_unite: this.id_unite_2,
        })
        .then(() => {
          this.$dialog.showMessageBox({
            title: "success",
            message: "Engin ajouté avec succès",
          });
          this.reset();
          this.getListEngin();
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    updateEngin() {
      this.$http
        .post(process.env.VUE_APP_API + "/updateEngin", {
          id_engin: this.id_engin,
          name: this.name,
          code_name: this.code_name,
          matricule: this.matricule,
          id_unite: this.id_unite_2,
        })
        .then(() => {
          this.$dialog.showMessageBox({
            title: "success",
            message: "Engin modifié avec succès",
          });
          this.updateOpen = false;
          this.reset();
          this.getListEngin();
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    deleteEngin(id_engin) {
      this.$dialog.showMessageBox(
        {
          title: "Supprimer un engin",
          buttons: ["&Yes", "&No", "&Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post(process.env.VUE_APP_API + "/deleteEngin", {
                id_engin: id_engin,
              })
              .then(() => {
                this.$dialog.showMessageBox({
                  title: "success",
                  message: "Engin supprimé avec succès",
                });
                this.getListEngin();
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
    changeStatutPanne(id_engin, statutPanne) {
      this.$dialog.showMessageBox(
        {
          title: "Change statut panne",
          buttons: ["&Yes", "&No", "&Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post(process.env.VUE_APP_API + "/changeStatutPanne", {
                id_engin: id_engin,
                panne: statutPanne,
              })
              .then(() => {
                this.getListEngin();
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
    openUpdateEngin(engin) {
      this.updateOpen = true;
      this.name = engin.name;
      this.code_name = engin.code_name;
      this.matricule = engin.matricule;
      this.id_engin = engin._id;
    },
    getListUnitePrincipaleAndSesSecondaire() {
      this.$http
        .post(
          process.env.VUE_APP_API + "/getListUnitePrincipaleAndSesSecondaire"
        )
        .then((res) => {
          this.unites = res.data.unites;
        })
        .catch((error) => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    reset() {
      this.name = "";
      this.code_name = "";
      this.matricule = "";
      this.id_engin = "";
      this.id_unite_2 = "";
    },
  },
  created() {
    this.id_unite_2 = this.$store.getters.get_agent_id_unite;
    this.getListUnitePrincipaleAndSesSecondaire();
    this.getListEngin();
    this.getListUnite();
  },
};
</script>
