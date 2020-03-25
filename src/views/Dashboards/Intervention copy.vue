<template>
  <div>
    <!-- ##################################################### -->
    <div class="row" style="margin-top:100px">
      <div class="col-lg-12">
        <div class="mb-3 card">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i class="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo"></i>
              Technical Support
            </div>
          </div>
          <div>
            <b-table striped hover :items="items" :fields="fields"></b-table>
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

export default {
  components: {},
  data: () => ({
    fields: ["first_name", "last_name", "age"],
    items: [
      { age: 40, first_name: "Dickerson", last_name: "Macdonnnnnnnnald" },
      { age: 21, first_name: "Larsen", last_name: "Shaw" },
      { age: 89, first_name: "Geneva", last_name: "Wilson" },
      { age: 38, first_name: "Jami", last_name: "Carney" }
    ],

    heading: "Analytics Dashboard",
    subheading:
      "This is an example dashboard created using build-in elements and components.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure"
  }),

  methods: {},
  created() {}
};
</script>
