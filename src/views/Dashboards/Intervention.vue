<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>

    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template v-slot:cell(show_details)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >{{ row.detailsShowing ? "Hide" : "Show" }} Details</b-button>
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
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
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
      heading: "Les intervention",
      subheading:
        "This is an example dashboard created using build-in elements and components.",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      fields: ["dateTimeAppel", "gps_coordonnee", "show_details"],
      items: []
    };
  },
  methods: {
    getAllIntervention() {
      axios
        .post("http://localhost:8000/API/getAllIntervention", {})
        .then(res => {
          console.log(res.data.data.interventions);
          this.items = res.data.data.interventions;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getAllIntervention();
  }
};
</script>
