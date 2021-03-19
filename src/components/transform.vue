<template>
  <div>
    <form>
      <label for="type">Type:</label><br />
      <select v-model="form.selected">
        <option>Debit</option>
        <option>Credit</option></select
      ><br />
      <label>Amount</label><br />
      <input type="text" v-model.number="form.amount" /><br />

      <label>Purpose of Transaction</label><br />
      <textarea
        v-model="form.description"
        placeholder="add multiple lines"
      ></textarea
      ><br />

      <button
        type="button"
        style="background-color: red; color: white"
        @click="onSubmit"
        v-show="buttonshow"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        amount: "",
        description: "",
        selected: "Debit",
        date: new Date().toISOString().split("T")[0],
      },
      // types: [{ text: "Select One", value: "" }, "Debit", "Credit"],
      // show: true,
    };
  },

  computed: {
    buttonshow: function () {
      if (
        this.form.amount != "" &&
        this.form.name != "" &&
        this.form.description != "" &&
        this.form.selected != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    onSubmit() {
      let data = this.form;
      let checkamount = this.$store.getters.doneEdit;

      if (!isNaN(this.form.amount)) {
        if (checkamount.length > 0) {
          let lastamount = checkamount.length - 1;
          let checkbalance = checkamount[lastamount].Balance;
          console.log(checkbalance);
          if (checkbalance >= this.form.amount) {
            this.$store.dispatch("addNewData", data);
            this.form = "";
            let showmodel = false;
            this.$store.dispatch("offmodal", showmodel);
          } else {
            if (this.form.selected == "Credit") {
              this.$store.dispatch("addNewData", data);
              this.form = "";
              let showmodel = false;
              this.$store.dispatch("offmodal", showmodel);
            } else {
              alert("please enter sufficient amount");
            }
          }
        } else {
          if (this.form.selected == "Debit") {
            alert("Your balance is Null please credit some amount");
          } else {
            this.$store.dispatch("addNewData", data);
            this.form = "";
            let showmodel = false;
            this.$store.dispatch("offmodal", showmodel);
          }
        }
      } else {
        alert("Please enter correct amount");
      }
    },
  },
};
</script>
