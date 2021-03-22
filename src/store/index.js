import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    userData: [],
    showModal: true
  },
  getters: {//getter property can fetch state and it is used for bussiness logiv
    doneEdit: state => {
      const data = state.userData;
      var arr = [];
      var Balance = 0;
      data.forEach(element => {
        if (element["selected"] == "Credit") {
          Balance = Balance + element.amount;
          var Debit = '-';
          var Credit = element.amount
          element.Balance = Balance;
          element.Debit = Debit;
          element.Credit = Credit;
          arr.push(element);

        }
        else {
          Balance = Balance - element.amount;
          var Credit = '-';

          var Debit = element.amount
          element.Balance = Balance;
          element.Debit = Debit;
          element.Credit = Credit;
          arr.push(element);

        }
      })
      const arrRev= arr.reverse();
      console.log(arrRev);
      return arrRev;
    },

    showModal: (state) => {
      var modalValue = state.showModal
      return modalValue;
    }

  },
  mutations: { //this is use fro update the state

    ADD_USER_DATA: (state, data) => {
      debugger;
      state.userData = data;

    },
    Add_new_data: (state, data) => {
      state.userData.push(data);
    },
    HIDE_MODAL: (state, data) => {
      state.showModal = data
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
    async showTransaction({ commit }) {
      await axios.get("http://localhost:8080/allTransaction").then((res) => {
        const data = res.data;

        commit('ADD_USER_DATA', data);
      })



    },
    offmodal({ commit }, data) {
      commit('HIDE_MODAL', data)
    }

  },
  modules: {}
});
