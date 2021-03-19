<template>
  <div>
    <b-button v-b-modal.modal-1 @click="openmodal" >ADD Transation</b-button>
  <b-modal :hide-footer="true" id="modal-1" title="Add Transation" v-if="hideModal">
      <addtrans />
    </b-modal>
    <table>
  <tr>
    <th>Date</th>
    <th>Description</th>
    <th>Credit</th>
    <th>Debit</th>
    <th>Running Balance</th>
  </tr>
  <tbody >
<tr v-for="(account, index) in items" :key="index">
  <td>{{account.date}}</td>
   <td>{{account.description}}</td>
    <td>{{account.Credit}}</td>
     <td>{{account.Debit}}</td>
      <td>{{account.Balance}}</td>
</tr>
  </tbody>
  
</table>

      
  </div>
</template>

<script>
import addtrans from "../components/transform";
import store from "../store/index";
export default {
 
 data(){
   return{
     showmodel : ""
   }
 },
  components: {
    store,
    addtrans,
  },
  computed: {
    items() {

      const data = this.$store.getters.doneEdit;
      console.log(data)
      return data;
    },
    hideModal(){
      return this.showmodel = this.$store.getters.showModel
    }


  },
  methods:{
    openmodal(){
      
      let showmodel = true;
      this.$store.dispatch('offmodal',showmodel);
    }
  }
};
</script>
<style >
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>