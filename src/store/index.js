import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: []
  },
  // getters: {
  //   doneEdit: state => {
  //     const data = state.userData;
  //     var arr = [];
  //     data.forEach(element => {
  //       if (element["type"] == "Credit") {
  //         arr.push(element);
  //       }
  //     })
  //     return arr;
  //   }
  // },
  mutations: {
    ADD_USER_DATA: (state, data) => {
      
      state.userData.push(data)
    }
  },
  actions: {},
  modules: {}
});
