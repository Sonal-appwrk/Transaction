import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    userData: [],
    showModal: true,
    transactionLength: 1,
  },
  getters: {//getter property can fetch state and it is used for bussiness logic
    doneEdit: state => {
      const data = state.userData;
      return data;
    },

    showModal: (state) => {
      var modalValue = state.showModal
      return modalValue;
    },
    getTransactionLength: (state) => {
      debugger;
      var transactionLength = state.transactionLength //store the state value in to new variable
      
      return transactionLength;
    }

  },
  mutations: { //this is use fro update the state

    ADD_USER_DATA: (state, data) => {
      
      state.userData = data;

    },
    Add_new_data: (state, data) => {
      state.userData.push(data);
    },
    HIDE_MODAL: (state, data) => {
      state.showModal = data
    },
    Get_Transaction_Length: (state, data) => {
      debugger;
      state.transactionLength = data
    }

  },
  actions: {//action is used to commit the mutation it means commit the function of mutation

    //     addNewData({commit}, newData){
    // commit('ADD_USER_DATA',newData);
    //     },
    async addNewData({ commit }, newData) {
      await axios.post("http://localhost:8080/newTransaction", newData).then(res => {
        const data = res.data;
        commit('Add_new_data', data);
      });

      return true;
    },
    async showTransaction({ commit }, skip) {
      await axios.get("http://localhost:8080/allTransaction/" + skip).then((res) => {
        const data = res.data;

        commit('ADD_USER_DATA', data);
      })



    },
    async getTransactionLength({ commit }) {
      debugger;
      await axios.get("http://localhost:8080/transactionLength").then((res) => {
        const data = res.data;

        commit('Get_Transaction_Length', data);
      })
    },
    offmodal({ commit }, data) {
      commit('HIDE_MODAL', data)
    }

  },
  modules: {}
});
