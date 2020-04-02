<template>
  <div class="d-flex">
    <div class="header-btn-lg pr-0">
      <div class="widget-content p-0">
        <div class="widget-content-wrapper">
          <div class="widget-content-left">
            <div class="widget-heading">{{ nom }}</div>
            <div class="widget-subheading">{{ role }}</div>
          </div>
          <div class="widget-content-left">
            <b-dropdown
              toggle-class="p-0 mr-2"
              menu-class="dropdown-menu-lg"
              variant="link"
              right
            >
              <span slot="button-content">
                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                  <img
                    width="42"
                    class="rounded-circle"
                    src="./../../../assets/images/avatars/admin.png"
                    alt=""
                  />
                </div>
              </span>
              <button type="button" tabindex="0" class="dropdown-item">
                Menus
              </button>
              <button type="button" tabindex="0" class="dropdown-item">
                Settingsddd
              </button>
              <h6 tabindex="-1" class="dropdown-header">Header</h6>
              <button type="button" tabindex="0" class="dropdown-item">
                Actions
              </button>
              <div tabindex="-1" class="dropdown-divider"></div>
              <button
                type="button"
                tabindex="0"
                class="dropdown-item"
                v-on:click="logout"
              >
                Se déconnecter
              </button>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faAngleDown,
//   faCalendarAlt,
//   faTrashAlt,
//   faCheck,
//   faFileAlt,
//   faCloudDownloadAlt,
//   faFileExcel,
//   faFilePdf,
//   faFileArchive,
//   faEllipsisH
// } from "@fortawesome/free-solid-svg-icons";

// library.add(
//   faAngleDown,
//   faCalendarAlt,
//   faTrashAlt,
//   faCheck,
//   faFileAlt,
//   faCloudDownloadAlt,
//   faFileExcel,
//   faFilePdf,
//   faFileArchive,
//   faEllipsisH
// );
const axios = require("axios");

export default {
  components: {},
  data: () => ({}),
  props: {
    nom: String,
    role: String
  },

  methods: {
    logout() {
      axios
        .post("http://localhost:8000/API/logout", {})
        .then(() => {
          this.$store.commit("delete_agent");
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
