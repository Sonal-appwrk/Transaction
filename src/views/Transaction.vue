<template>
  <div>
    <b-button
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
    <table>
      <tr>
        <th>Transaction-ID</th>
        <th>Date</th>
        <th>Description</th>
        <th>Credit</th>
        <th>Debit</th>
        <th>Running Balance</th>
      </tr>
      <tbody>
        <tr>
          <td>-</td>

          <td>-</td>

          <td>-</td>

          <td>-</td>

          <td>-</td>

          <td>-</td>
        </tr>
        <tr v-for="(account, index) in items" :key="index">
          <td>{{ account._id }}</td>
          <td>{{ account.date }}</td>
          <td>{{ account.description }}</td>
          <td>{{ account.Credit }}</td>
          <td>{{ account.Debit }}</td>
          <td>{{ account.Balance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import addtrans from "../components/Transactionform";
import store from "../store/index";
export default {
  data() {
    return {
      showmodal: "",
    };
  },
  components: {
    store,
    addtrans,
  },
  mounted() {
    /// function will automatic call when document loaded
    this.$store.dispatch("showTransaction");
  },
  computed: {
    // for function we dont need to call this function again again in computed property
    items() {
      const data = this.$store.getters.doneEdit; //it willl fetch the data

      console.log(data);
      return data;
    },
    hideModal() {
      return (this.showmodal = this.$store.getters.showModal);
    },
  },
  methods: {
    openmodal() {
      let showmodal = true;
      this.$store.dispatch("offmodal", showmodal);
    },
  },
};
</script>
<style >
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
button {
  float: right;
  margin: 10px;
}
</style>