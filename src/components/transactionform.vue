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
          type="number"
          v-model.number="form.amount"
          placeholder="Enter amount"
          required
        ></b-form-input>
      </b-form-group>
      <label>Purpose of Transaction:</label><br />
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

    var formattedDate = format(date, "dd-MMM-YYY");

    return {
      form: {
        amount: "",
        description: "",
        selected: "Debit",
        date: formattedDate,
      },
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
      debugger;
      let data = this.form;
      let type = data.selected;
      let checkamount = this.$store.getters.doneEdit; ///call to the vuex store there is getter property and call the function of the property

      if (checkamount.length > 0) {
        let checkbalance = checkamount[0].Balance; //it is fetching the running balance of the account
        if (checkbalance >= data.amount) {
          this.$store.dispatch("addNewData", data); //it call the action of the vuex
        } else if (type == "Credit") {
          this.$store.dispatch("addNewData", data);
        } else {
          alert("please enter sufficient amount");
        }
      } else if (type == "Debit") {
        alert("Your balance is Null please credit some amount");
      } else {
        await this.$store.dispatch("addNewData", data);
      }
      let showmodal = false;
      this.$store.dispatch("offmodal", showmodal);
    },
  },
};
</script>
