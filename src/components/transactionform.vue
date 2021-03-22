<template>
  <div>
    <form>
      <p>Type:</p>
      <b-form-select v-model="form.selected">
        <b-form-select-option value="Debit">Debit</b-form-select-option>
        <b-form-select-option value="Credit">Credit</b-form-select-option>
      </b-form-select>

      <b-form-group id="input-group-2" label="Amount:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model.number="form.amount"
          placeholder="Enter amount"
          required
        ></b-form-input>
      </b-form-group>

      <label>Purpose of Transaction</label><br />
      <b-form-textarea
        id="textarea-default"
        placeholder="Purpose Your Transaction"
        v-model="form.description"
      ></b-form-textarea
      ><br />
      <b-button variant="success" @click="onSubmit" v-if="buttonshow"
        >Submit</b-button
      >
    </form>
  </div>
</template>

<script>
import { format } from "date-fns";
export default {
  data() {
    var date = new Date();

    var formattedDate = format(date, "MMMM do, yyyy H:mma");

    return {
      form: {
        amount: "",
        description: "",
        selected: "Debit",
        date: formattedDate,
      },
      // types: [{ text: "Select One", value: "" }, "Debit", "Credit"],
      // show: true,
    };
  },

  computed: {
    buttonshow: function () {
      if (this.form.amount != "" && this.form.selected != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async onSubmit() {
      let data = this.form;
      let checkamount = this.$store.getters.doneEdit;

      if (!isNaN(this.form.amount)) {
        if (checkamount.length > 0) {
          let checkbalance = checkamount[0].Balance;
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
            await this.$store.dispatch("addNewData", data);
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
