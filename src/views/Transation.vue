<template>
  <div>
    <b-table striped hover :items="items"></b-table>
    <b-button v-b-modal.modal-1>ADD Transation</b-button>

    <b-modal id="modal-1" title="Add Transation">
      <addtrans />
    </b-modal>
  </div>
</template>

<script>
import addtrans from "../components/transform";
import store from "../store/index";
export default {
  components: {
    store,
    addtrans,
  },
  computed: {
    items() {
      const data = this.$store.state.userData;
      return data;
    },
  },
};
</script>