<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>
    <div class="row">
      <div class="col-md-6 input-group"></div>
      <div class="col-md-6 input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Tapez ici pour rechercher"
          v-model="search"
        />
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" v-on:click="getAllIntervention">
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
      <template v-slot:empty>
        <h4 class="d-flex justify-content-center">table vide</h4>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="limit"
      aria-controls="my-table"
      v-on:click.native="getAllIntervention"
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
      subheading:
        "This is an example dashboard created using build-in elements and components.",
      icon: "pe-7s-users icon-gradient bg-tempting-azure",
      fields: [
        {
          key: "nom",
          label: "nom",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "prenom",
          label: "prenom",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "username",
          label: "username",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "role",
          label: "role",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "numTel",
          label: "numTel",
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
      value: ""
    };
  },
  methods: {
    getAllIntervention() {
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
        .post(link, {})
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
      this.getAllIntervention();
    }
  },
  created() {
    this.getAllIntervention();
  }
};
</script>
