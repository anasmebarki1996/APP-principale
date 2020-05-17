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
            v-on:click="getPlanning"
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

      <template v-slot:cell(engin.code_name)="data">
        {{ data.item.engin.code_name }}
      </template>

      <template v-slot:cell(chef)="data">
        <div v-for="agents in data.item.agents" :key="agents._id">
          <div v-if="agents.type == 'chef'">
            {{ agents.nom }} {{ agents.prenom }}
          </div>
        </div>
      </template>

      <template v-slot:cell(numTel)="data">
        <div v-for="agents in data.item.agents" :key="agents._id">
          <div v-if="agents.type == 'chef'">{{ agents.numTel }}</div>
        </div>
      </template>

      <template v-slot:cell(show_details)="data">
        <b-button variant="danger" v-on:click="deleteTeam(data.item._id)"
          ><font-awesome-icon icon="trash" />
        </b-button>
        <b-button variant="success" v-on:click="openUpdateEquipe(data.item._id)"
          ><font-awesome-icon icon="edit"
        /></b-button>
        <b-button @click="data.toggleDetails" class="mr-2"
          >{{ data.detailsShowing ? "Moins" : "Plus" }}
        </b-button>
      </template>

      <template v-slot:row-details="data">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Chef d'agrée :</b>
            </b-col>

            <b-col>
              <div v-for="agents in data.item.agents" :key="agents._id">
                <div v-if="agents.type == 'chef'">
                  {{ agents.nom }} {{ agents.prenom }} --- {{ agents.numTel }}
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Chauffeur :</b>
            </b-col>

            <b-col>
              <div v-for="agents in data.item.agents" :key="agents._id">
                <div v-if="agents.type == 'chauffeur'">
                  {{ agents.nom }} {{ agents.prenom }} --- {{ agents.numTel }}
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Engin :</b>
            </b-col>

            <b-col>
              {{ data.item.engin.code_name }} ---
              {{ data.item.engin.matricule }}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Secours :</b>
            </b-col>

            <b-col>
              <div v-for="agents in data.item.agents" :key="agents._id">
                <div v-if="agents.type == 'secours'">
                  {{ agents.nom }} {{ agents.prenom }} --- {{ agents.numTel }}
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="limit"
      aria-controls="my-table"
      v-on:click.native="getPlanning"
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
      heading: "Les agents",
      subheading:
        "This is an example dashboard created using build-in elements and components.",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      title: "Nouvelle équipe",
      link: "/nouvelle-equipe",
      fields: [
        {
          key: "engin.code_name",
          label: "Engin Type",
          tdClass: "nameOfTheClass",
          sortable: true,
        },
        {
          key: "chef",
          label: "chef d'agrée",
          tdClass: "nameOfTheClass",
        },
        {
          key: "numTel",
          label: "numero de telephone",
          tdClass: "nameOfTheClass",
        },
        { key: "show_details", label: "", tdClass: "nameOfTheClass" },
      ],
      isBusy: false,
      items: [],
      limit: 5,
      rows: 0,
      currentPage: 1,
      sort: "dateTimeAppel",
      sortBy: "",
      search: "",
      // #######################
      date: "2020-04-02",
    };
  },
  methods: {
    getPlanning() {
      this.isBusy = true;
      var link =
        "http://localhost:8000/API/planning/getPlanning?limit=" +
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
          date: this.date,
        })
        .then((res) => {
          this.items = res.data.teams;
          this.rows = res.data.teams_total;
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
      this.getPlanning();
    },

    deleteTeam(id_team) {
      dialog.showMessageBox(
        {
          title: "Supprimer un engin",
          buttons: ["&Yes", "&No", "&Cancel"],
          message: "Vous etes sur?",
        },
        (response) => {
          if (response == 0) {
            this.$http
              .post("http://localhost:8000/API/planning/deleteTeam", {
                id_team: id_team,
              })
              .then(() => {
                this.getPlanning();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      );
    },
    openUpdateEquipe(id_team) {
      this.$router.push({
        path: "/modifier-equipe",
        query: { id_team: id_team },
      });
    },
  },
  created() {
    this.getPlanning();
  },
};
</script>
