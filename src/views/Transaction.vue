<template>
  <div>
    <b-button v-b-modal.modal-1 @click="openmodal" class="button" variant="success">ADD Transaction</b-button>
    
    
  <b-modal :hide-footer="true" id="modal-1" title="Add Transaction" v-if="hideModal">
      <addtrans />
    </b-modal>
    <table>
  <tr>
    <th>Transaction-ID</th>
    <th>Date</th>
    <th>Description</th>
    <th>Credit</th>
    <th>Debit</th>
    <th>Running Balance</th>
  </tr>
  <tbody >
    <tr>
      <td>-</td>
      
      <td>-</td>
      
      <td>-</td>
      
      <td>-</td>
      
      <td>-</td>
      
      <td>-</td>
      
      <td>-</td>
    </tr>
<tr v-for="(account, index) in items " :key="index">
  <td>{{account._id}}</td>
  <td>{{account.date}}</td>
   <td>{{account.description}}</td>
    <td>{{account.Credit}}</td>
     <td>{{account.Debit}}</td>
      <td>{{account.Balance}}</td>
</tr>
  </tbody>
  
  
</table>
    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
        </li>
        <li class="page-item">
          <button type="button" class="page-link" v-for="(pageNumber,index) in pages.slice(page-1, page+5)" :key="index" @click="page = pageNumber"> {{pageNumber}} </button>
        </li>
        <li class="page-item">
          <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
        </li>
      </ul>
    </nav>   -->

  </div>
</template>

<script>
import addtrans from "../components/Transactionform";
import store from "../store/index";
export default {
 
 data(){
   return{
     showmodel : "",
      
   }
 },
  components: {
    store,
    addtrans,
  },
  mounted(){
    
    this.$store.dispatch("showTransaction");
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
button{
  float: right;
  margin: 10px;
}

</style>