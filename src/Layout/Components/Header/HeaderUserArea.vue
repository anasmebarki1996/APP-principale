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
            <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
              <span slot="button-content" v-if="role">
                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                  <img width="42" class="rounded-circle" :src="getIconPath()" alt />
                </div>
              </span>
              <button
                type="button"
                tabindex="0"
                class="dropdown-item"
                v-on:click="logout"
              >Se déconnecter</button>
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

export default {
  components: {},
  data: () => ({}),
  props: {
    nom: String,
    role: String
  },

  methods: {
    logout() {
      this.$http
        .post(process.env.VUE_APP_API + "/logout", {})
        .then(() => {
          this.$store.commit("delete_agent");
          this.$router.push({ path: "/login" });
        })
        .catch(error => {
          this.$dialog.showErrorBox(
            "error" + error.response.status,
            error.response.data.message
          );
        });
    },
    getIconPath() {
      return this.role
        ? require(`../../../assets/images/avatars/${this.role}.png`)
        : "";
    }
  }
};
</script>
