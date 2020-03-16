import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        counter: 0,
        User_id: ""
    },
    getters: {
        get_user_id: state => {
            return state.User_id;
        }
    },
    mutations: {
        init_user_id: (state, user_id) => {
            state.User_id = user_id
        }
    }
});

export default store;