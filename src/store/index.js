import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: [],
    showModal: true
  },
  getters: {
    doneEdit: state => {
      const data = state.userData;
      var arr = [];
      var Balance =0;
      data.forEach(element => {
        if (element["selected"] == "Credit") {
          Balance=Balance+element.amount;
          var Debit ='-';
          var Credit = element.amount
          element.Balance = Balance;
          element.Debit=Debit;
          element.Credit=Credit;
          arr.push(element);

        }
        else{
          Balance=Balance-element.amount;
          var Credit ='-';
          
          var Debit = element.amount
          element.Balance = Balance;
          element.Debit=Debit;
          element.Credit=Credit;
          arr.push(element);

        }
      })
      return arr;
    },

    showModel: (state)=>{
      var modalValue = state.showModal
      return modalValue;
    }
    
  },
  mutations: {
    ADD_USER_DATA: (state, data) => {
      state.userData.push(data)
    },
    HIDE_MODAL:(state,data)=>{
      state.showModal=data
    }
  },
  actions: {
    addNewData({commit}, newData){
commit('ADD_USER_DATA',newData);
    },
    offmodal({commit},data){
      commit('HIDE_MODAL',data)
    }

  },
  modules: {}
});
