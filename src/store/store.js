import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    agent_id: "",
    agent_nom: "",
    agent_role: "",
    agent_username: ""
  },
  getters: {
    get_agent_id: state => {
      return state.agent_id;
    },
    get_agent_nom: state => {
      return state.agent_nom;
    },
    get_agent_role: state => {
      return state.agent_role;
    },
    get_agent_username: state => {
      return state.agent_username;
    }
  },
  mutations: {
    init_agent: (state, agent) => {
      state.agent_id = agent.agent_id;
      state.agent_nom = agent.agent_nom;
      state.agent_role = agent.agent_role;
      state.agent_username = agent.agent_username;
    },
    delete_agent: state => {
      state.agent_id = null;
      state.agent_nom = null;
      state.agent_role = null;
      state.agent_username = null;
    }
  }
});

export default store;
