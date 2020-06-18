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
          v-model="date"
          class="mb-2"
          reset-button
          close-button
          locale="fr"
          :disabled="true"
        ></b-form-datepicker>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Tapez ici pour rechercher"
            v-model="search"
          />
          <div class="input-group-append">
            <button class="btn btn-light" type="button" v-on:click="getAllIntervention_EnCours">
              <b-icon icon="search"></b-icon>
            </button>
          </div>
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
        <h4 class="d-flex justify-content-center">Aucune intervention en cours</h4>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Chargement...</strong>
        </div>
      </template>
      <template v-slot:cell(show_details)="row">
        <b-button
          variant="light"
          size="sm"
          class="mr-2"
          v-on:click="showDetails(row.item._id)"
        >détails</b-button>
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
      v-on:click.native="getAllIntervention_EnCours"
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
      heading: "Les interventions en cours",
      subheading: "",
      icon: "pe-7s-ribbon icon-gradient bg-tempting-azure",
      title: "Nouvelle Intervention",
      link: "/nouvelle-intervention",
      fields: [
        {
          key: "numTel",
          label: "Numéro de téléphone",
          tdClass: "nameOfTheClass",
          sortable: true
        },

        {
          key: "dateTimeAppel",
          label: "Heure d'appel",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "adresse.adresse_rue",
          label: "Adresse",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        {
          key: "statut",
          label: "Statut",
          tdClass: "nameOfTheClass",
          sortable: true
        },
        { key: "show_details", label: "", tdClass: "nameOfTheClass" }
      ],
      isBusy: false,
      items: [],
      limit: 5,
      rows: 0,
      currentPage: 1,
      sort: "dateTimeAppel",
      sortBy: "",
      search: "",
      date: "2020-04-02"
    };
  },
  methods: {
    getAllIntervention_EnCours() {
      this.isBusy = true;
      var link =
        process.env.VUE_APP_API +
        "/intervention/getAllIntervention_EnCours?limit=" +
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
          date: this.date
        })
        .then(res => {
          for (let i = 0; i < res.data.interventions.length; i++) {
            res.data.interventions[i].dateTimeAppel = this.$moment(
              res.data.interventions[i].dateTimeAppel
            ).format("YYYY-MM-DD à HH:mm");
          }
          this.items = res.data.interventions;
          this.rows = res.data.interventions_total;
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
      this.getAllIntervention_EnCours();
    },

    showDetails(id_intervention) {
      this.$router.push({
        path: "/intervention-details",
        query: { id_intervention: id_intervention }
      });
    }
  },
  created() {
    this.$socket.on("interventionStatusChange", data => {
      if (data.unites.includes(this.$store.getters.get_agent_id_unite)) {
        this.getAllIntervention_EnCours();
      }
    });
    this.getAllIntervention_EnCours();
  }
};
</script>
