import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    agent_id: "",
    agent_nom: "",
    agent_role: "",
    agent_username: "",
    agent_id_unite: "",
    tree: [],
    statistiques: {},
    heatMap: [],
  },
  getters: {

    get_agent_id: (state) => {
      return state.agent_id;
    },
    get_agent_nom: (state) => {
      return state.agent_nom;
    },
    get_agent_role: (state) => {
      return state.agent_role;
    },
    get_agent_username: (state) => {
      return state.agent_username;
    },
    get_agent_id_unite: (state) => {
      return state.agent_id_unite;
    },
    get_tree: (state) => {
      return state.tree;
    },
    get_statistiques: (state) => {
      return state.statistiques;
    },
    get_heatMap: (state) => {
      return state.heatMap;
    }
  },
  mutations: {
    init_agent: (state, agent) => {
      state.agent_id = agent.agent_id;
      state.agent_nom = agent.agent_nom;
      state.agent_role = agent.agent_role;
      state.agent_username = agent.agent_username;
      state.agent_id_unite = agent.id_unite
    },
    delete_agent: (state) => {
      state.agent_id = null;
      state.agent_nom = null;
      state.agent_role = null;
      state.agent_username = null;
      state.agent_id_unite = null;
    },
    init_tree: (state, data) => {
      state.tree = data;
    },
    init_statistiques: (state, data) => {
      state.statistiques = {
        data: data.data,
        labels: data.labels,
        title: data.title
      }
    },
    delete_statistiques: (state) => {
      state.statistiques = {
        data: [],
        labels: [],
        title: ""
      }
    },
    init_heatMap: (state, data) => {
      state.heatMap = data
    },
    delete_heatMap: (state) => {
      state.heatMap = []
    },
  },
});

export default store;