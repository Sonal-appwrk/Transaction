<template>
  <div>
    <b-button
    v-b-hover 
      v-b-modal.modal-1
      @click="openmodal"
      class="button"
      variant="success"
      >ADD Transaction</b-button
    >

    <b-modal
      :hide-footer="true"
      id="modal-1"
      title="Add Transaction"
      v-if="hideModal"
    >
      <addtrans />
    </b-modal>
    <table class="transaction">
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Credit</th>
        <th>Debit</th>
        <th>Running Balance</th>
      </tr>
      <tbody>
        <tr v-for="(account, index) in items" :key="index">
          <td>{{ account.date }}</td>
          <td>{{ account.description }}</td>
          <td>{{ account.Credit }}</td>
          <td>{{ account.Debit }}</td>
          <td>{{ account.Balance }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <div class="container">
      <table>
        <tr>
          <td v-for="(page, index) in pagination" :key="index" >
            <button
            class="pageButton"
              @click="transactionLimitShow(index)"
              :style="isActive==index ? { background: '#17A2B8' } : { background: 'white' }"
              >{{ index + 1 }}</button
            >
          </td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
import addtrans from "../components/transactionform";
import store from "../store/index";
export default {
  data() {
    return {
      showmodal: "",
      page: 0,
      perPage: 4,
      pagelength: 1,
      skip: 0,
      isActive: 0,
    };
  },
  components: {
    store,
    addtrans,
  },
  created() {
    this.$store.dispatch("showTransaction", this.skip);
    
      this.$store.dispatch("getTransactionLength");
 //it will call only one time
  },

  computed: {
    // for function we dont need to call this function again again in computed property
    items() {
      
      this.$store.dispatch("showTransaction", this.skip);  ///it will call again when any changes happen
      const data = this.$store.getters.doneEdit; //it willl fetch the data
      return data;
    },
    pagination() {
      debugger;
      //call to the action ,action call to the api for data length
      
      this.pagelength = this.$store.getters.getTransactionLength; //it will fetch the length
      if (this.pagelength % 4 == 0) {
        //if the length is even we don't need add one more page
        let a = Array.from({ length: this.pagelength / this.perPage }); ///divide the records according to the perpage

        return a;
      } else {
        let a = Array.from({ length: this.pagelength / this.perPage + 1 });

        return a;
      }
    },
    hideModal() {
      // after submission the modal should be hide

      this.$store.dispatch("getTransactionLength");
      this.$store.dispatch("showTransaction", this.skip);
      return (this.showmodal = this.$store.getters.showModal);
    },
  },
  methods: {
    openmodal() {
      //if the modal is clicked
      let showmodal = true;
      this.$store.dispatch("offmodal", showmodal);
    },
    transactionLimitShow(index) {
      //this function is called by page Button

      this.page = index;
      this.skip = this.page * this.perPage; 
      this.isActive = index ///for active the button
      this.$store.dispatch("showTransaction", this.skip); //to call api for fetching the data
    },
  },
};
</script>
<style >
.transaction {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.transaction td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.transaction tr:nth-child(even) {
  background-color: #dddddd;
}
.button {
  float: right;
  margin: 10px;
}
.container {
  text-align: center;
  display: flex;
  justify-content: center;
}
.pageButton {
  border: whitesmoke;
  padding: 10px;
}



</style>