<template>
  <div class="app-container app-theme-white">
    <transition name="fade" mode="out-in" appear>
      <Header :nom="nom" :role="role"></Header>
    </transition>
    <transition name="fade" mode="out-in" appear>
      <Sidebar />
    </transition>
    <div class="app-main__outer">
      <div class="app-main__inner">
        <slot></slot>
      </div>
      <transition name="fade" mode="out-in" appear>
        <Footer />
      </transition>
    </div>
    <!-- Modal Component -->
    <b-modal id="modal1" title="Bootstrap-Vue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
    <b-modal id="modallg" size="lg" title="Large Modal">Hello Modal!</b-modal>
    <b-modal id="modalsm" size="sm" title="Small Modal">Hello Modal!</b-modal>
  </div>
</template>

<script>
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

export default {
  name: "app",
  components: {
    Header,
    Sidebar,
    Footer
  },
  data() {
    return {
      agent: {},
      nom: "",
      role: ""
    };
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
    }
  },
  mounted() {
    this.agent = this.$store.getters;
    if (this.agent.get_agent_id) {
      this.nom = this.agent.get_agent_nom;
      this.role = this.agent.get_agent_role;
    } else this.logout();
  }
};
</script>
