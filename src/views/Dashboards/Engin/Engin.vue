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
      <div class="col-md-6 input-group"></div>
      <div class="col-md-6 input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Tapez ici pour rechercher"
          v-model="search"
        />
        <div class>
          <button class="btn btn-secondary" type="button" v-on:click="getListEngin">
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
      <template v-slot:cell(index)="data">{{ (data.index + 1) * currentPage }}</template>
      <template v-slot:cell(panne)="data">
        <div v-if="!data.item.panne" class="mb-2 mr-2 badge badge-success">En service</div>
        <div v-else class="mb-2 mr-2 badge badge-warning">Hors Service</div>
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
    PageTitle
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
      fields: [
        "index",
        {
          key: "name",
          label: "Nom Complet",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "code_name",
          label: "Code Name",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "matricule",
          label: "Matricule",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "panne",
          label: "Statut",
          tdClass: "nameOfTheClass",
          sortable: true
        }
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
      code_name: "",
      matricule: "",
      id_engin: "",
      updateOpen: false
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
        .post(link, {})
        .then(res => {
          this.items = res.data.engins;
          this.rows = res.data.engins_total;
          this.engin_name_list = res.data.engin_name_list;
          this.engin_code_name_list = res.data.engin_code_name_list;
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
      this.getListEngin();
    },

    reset() {
      this.name = "";
      this.code_name = "";
      this.matricule = "";
      this.id_engin = "";
    }
  },
  created() {
    this.getListEngin();
  }
};
</script>