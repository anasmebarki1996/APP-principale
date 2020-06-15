<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>
    <div class="row">
      <div class="col-md-6 input-group">
        <select class="mb-2 form-control" v-model="id_unite" v-on:change="getAllAgents()">
          <option value selected>Tout</option>
          <option
            v-bind:value="unite1._id"
            v-for="unite1 in unites"
            v-bind:key="unite1._id"
          >{{ unite1.nom }}</option>
        </select>
      </div>
      <div class="col-md-6 input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Tapez ici pour rechercher"
          v-model="search"
        />
        <div class="input-group-append">
          <button class="btn btn-light" type="button" v-on:click="getAllAgents">
            <b-icon icon="search"></b-icon>
          </button>
        </div>
      </div>
    </div>
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
      <template v-slot:cell(show_details)="data">
        <b-button variant="success" v-on:click="updateAgent(data.item._id)">
          <font-awesome-icon icon="edit" />
        </b-button>
        <b-button variant="danger" v-on:click="deleteAgent(data.item._id)">
          <font-awesome-icon icon="trash" />
        </b-button>
      </template>
      <template v-slot:empty>
        <h4 class="d-flex justify-content-center">Aucun agent</h4>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Chargement...</strong>
        </div>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="limit"
      aria-controls="my-table"
      v-on:click.native="getAllAgents"
    ></b-pagination>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle";

export default {
  components: {
    PageTitle
  },
  data() {
    return {
      heading: "Les agents",
      subheading: "",
      icon: "pe-7s-users icon-gradient bg-tempting-azure",
      fields: [
        {
          key: "nom",
          label: "Nom",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "prenom",
          label: "Prénom",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "username",
          label: "Nom d'utilisateur",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "role",
          label: "Role",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "numTel",
          label: "Numéro de téléphone",
          tdClass: "nameOfTheClass"
        },
        {
          key: "show_details",
          label: "",
          tdClass: "nameOfTheClass"
        }
      ],
      isBusy: false,
      items: [],
      limit: 5,
      rows: 0,
      currentPage: 1,
      sortBy: "",
      search: "",
      value: "",
      unites: [],
      id_unite: ""
    };
  },
  methods: {
    getAllAgents() {
      this.isBusy = true;
      var link =
        process.env.VUE_APP_API +
        "/getAllAgents?limit=" +
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
          id_unite: this.id_unite
        })
        .then(res => {
          this.items = res.data.agents;
          this.rows = res.data.agents_total;
          this.isBusy = false;
        })
        .catch(error => {
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
      this.getAllAgents();
    },
    getListUnitePrincipaleAndSesSecondaire() {
      this.$http
        .post(
          process.env.VUE_APP_API + "/getListUnitePrincipaleAndSesSecondaire"
        )
        .then(res => {
          this.unites = res.data.unites;
        })
        .catch(error => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    updateAgent(id_agent) {
      this.$router.push({
        path: "/modifier-agent",
        query: { id_agent: id_agent }
      });
    },
    deleteAgent(id_agent) {
      this.$dialog.showMessageBox(
        {
          title: "Supprimer un agent",
          buttons: ["Yes", "No", "Cancel"],
          message: "Vous etes sur?"
        },
        response => {
          if (response == 0) {
            this.$http
              .post(process.env.VUE_APP_API + "/deleteAgent", {
                id_agent: id_agent
              })
              .then(() => {
                this.$dialog.showMessageBox({
                  title: "success",
                  message: "Agent supprimé avec succès"
                });
                this.getAllAgents();
              })
              .catch(error => {
                this.$dialog.showErrorBox(
                  "error" + error.response.status,
                  error.response.data.message
                );
              });
          }
        }
      );
    }
  },
  created() {
    if (this.$route.query.id_unite) {
      this.id_unite = this.$route.query.id_unite;
    }
    this.getAllAgents();
    this.getListUnitePrincipaleAndSesSecondaire();
  }
};
</script>
