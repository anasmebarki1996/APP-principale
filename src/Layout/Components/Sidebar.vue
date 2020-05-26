<template>
  <div
    class="app-sidebar sidebar-shadow"
    @mouseover="toggleSidebarHover('add', 'closed-sidebar-open')"
    @mouseleave="toggleSidebarHover('remove', 'closed-sidebar-open')"
  >
    <div class="app-header__logo">
      <!-- <div class="logo-src" /> -->
      <!-- <img
        src="./../../assets/images/logo-inverse.png"
        style="width:50px"
        alt="meeeeee"
      />
      protection civil-->

      <div class="header__pane ml-auto">
        <button
          type="button"
          class="hamburger close-sidebar-btn hamburger--elastic"
          v-bind:class="{ 'is-active': isOpen }"
          @click="toggleBodyClass('closed-sidebar')"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-sidebar-content">
      <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
        <sidebar-menu showOneChild :menu="menu" />
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    SidebarMenu,
    VuePerfectScrollbar,
  },
  data() {
    return {
      isOpen: false,
      sidebarActive: false,

      menu: [
        {
          header: true,
          title: "Main Navigation",
        },
        {
          title: "Interventions",
          icon: "pe-7s-rocket",
          child: [
            {
              href: "/intervention",
              title: "Intervention",
            },
            {
              href: "/nouvelle-intervention",
              title: "Nouvelle Intervention",
            },
            {
              href: "/intervention-en-cours",
              title: "Intervention En Cours",
            },
          ],
        },

        {
          title: "Agents",
          icon: "pe-7s-users",
          child: [
            {
              href: "/agent",
              title: "Les agents",
            },
          ],
        },
        {
          title: "Engins",
          icon: "pe-7s-car",
          child: [
            {
              href: "/engin",
              title: "Engin",
            },
          ],
        },
        {
          title: "Statistiques",
          icon: "pe-7s-graph2",
          child: [
            {
              href: "/",
              title: "Unites",
            },
            {
              href: "/statistiques/maps",
              title: "Heat Map",
            },
            {
              title: "journal",
              href: "/statistiques/journal",
            },
          ],
        },
      ],
      collapsed: true,
      windowWidth: 0,
      role: "",
    };
  },
  props: {
    sidebarbg: String,
  },
  methods: {
    toggleBodyClass(className) {
      const el = document.body;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    toggleSidebarHover(add, className) {
      const el = document.body;
      this.sidebarActive = !this.sidebarActive;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth > "992") {
        if (add === "add") {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      }
    },
    getWindowWidth() {
      const el = document.body;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth < "1350") {
        el.classList.add("closed-sidebar", "closed-sidebar-md");
      } else {
        el.classList.remove("closed-sidebar", "closed-sidebar-md");
      }
    },
  },
  mounted() {
    this.role = this.$store.getters.get_agent_role;
    if (this.role == "admin") {
      this.menu.push(
        {
          header: true,
          title: "Admin Interventions",
        },
        {
          title: "Interventions",
          icon: "pe-7s-rocket",
          child: [
            {
              href: "/intervention/listnode",
              title: "list intervention",
            },
          ],
        }
      );
    }
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
};
</script>
