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
      <div class="col-md-6">
        <b-form-datepicker
          id="example-datepicker"
          v-model="value"
          class="mb-2"
        ></b-form-datepicker>
      </div>
      <div class="col-md-6 input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search this blog"
          v-model="search"
        />
        <div class="input-group-append">
          <button
            class="btn btn-secondary"
            type="button"
            v-on:click="getAllIntervention"
          >
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
      <template v-slot:empty="">
        <h4 class="d-flex justify-content-center">table vide</h4>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2"
          >{{ row.detailsShowing ? "Hide" : "Show" }} Details</b-button
        >
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>numTel:</b>
            </b-col>
            <b-col>{{ row.item.numTel }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>gps_coordonnee:</b>
            </b-col>
            <b-col>{{ row.item.gps_coordonnee }}</b-col>
          </b-row>
        </b-card>
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
import PageTitle from "../../Layout/Components/PageTitle";
const axios = require("axios");

export default {
  components: {
    PageTitle
  },
  data() {
    return {
      value: "",
      heading: "Les agents",
      subheading:
        "This is an example dashboard created using build-in elements and components.",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      title: "Nouvelle équipe",
      link: "/nouvelle-equipe",
      fields: [
        {
          key: "num",
          label: "num",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "numTel",
          label: "numero de telephone",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        { key: "show_details", label: "Role", tdClass: "nameOfTheClass" }
      ],
      isBusy: false,
      items: [],
      limit: 5,
      rows: 0,
      currentPage: 1,
      sort: "dateTimeAppel",
      sortBy: "",
      search: ""
    };
  },
  methods: {
    getAllIntervention() {
      this.isBusy = true;
      var link =
        "http://localhost:8000/API/getAllIntervention?limit=" +
        this.limit +
        "&page=" +
        this.currentPage;
      if (this.search) {
        link = link + "&search=" + this.search;
      }
      if (this.sortBy != "") {
        link = link + "&sort=" + this.sortBy;
      }
      axios
        .post(link, {})
        .then(res => {
          this.items = res.data.data.interventions;
          this.rows = res.data.data.interventions_total;
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    foo(e) {
      if (e.sortDesc) {
        this.sortBy = "-" + e.sortBy;
      } else this.sortBy = e.sortBy;
      this.getAllIntervention();
    },

    hello() {
      alert(this.currentPage);
    }
  },
  created() {
    this.getAllIntervention();
  }
};
</script>
