<template>
  <div>
    <!-- ##################################################### -->
    <div class="row" style="margin-top:100px">
      <div class="col-lg-12">
        <div class="mb-3 card">
          <div class="card-header-tab card-header">
            <div
              class="card-header-title font-size-lg text-capitalize font-weight-normal"
            >
              <i
                class="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo"
              ></i>
              Technical Support
            </div>
          </div>
          <div>
            <b-pagination
              :total-rows="totalPhotos"
              :per-page="perPage"
              v-model="currentPage"
            ></b-pagination>
            <br />
            <b-table
              :items="myProvider"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :busy="isBusy"
            ></b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faCheck,
  faCalendarAlt,
  faAngleDown,
  faAngleUp,
  faTh
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faCheck, faAngleDown, faAngleUp, faTh, faCalendarAlt);
const axios = require("axios");

export default {
  components: {},
  data: () => ({
    totalPhotos: 0,
    perPage: 5,
    currentPage: 1,
    isBusy: false,

    fields: [
      {
        key: "dateTimeAppel",
        label: "Email",
        tdClass: "nameOfTheClass",
        sortable: true
      },
      {
        key: "gps_coordonnee",
        label: "Name",
        tdClass: "nameOfTheClass",
        sortable: true
      },
      { key: "show_details", label: "Role", tdClass: "nameOfTheClass" }
    ],

    heading: "Analytics Dashboard",
    subheading:
      "This is an example dashboard created using build-in elements and components.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure"
  }),

  methods: {
    myProvider(ctx) {
      this.isBusy = true;
      let url = `http://localhost:8000/API/getAllIntervention?limit=${ctx.perPage}`;
      // let url = `http://localhost:8000/API/getAllIntervention?page=${ctx.currentPage}&limit=${ctx.perPage}`;

      if (ctx.sortBy) {
        url = `${url}&_sort=${ctx.sortBy}&_order=${
          ctx.sortDesc ? "desc" : "asc"
        }`;
      }
      return axios
        .post(url, {})
        .then(res => {
          // console.log(res.data.data.interventions);
          this.isBusy = false;
          return res.data.data.interventions;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>
