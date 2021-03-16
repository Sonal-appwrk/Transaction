<template>
  <div>
    <b-form  v-if="show">
              <b-form-group id="input-group-3" label="Transation Type:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.type"
          :options="types"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Amount:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.amount"
          type="text"
          placeholder="Enter Amount"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.description"
          placeholder="Enter Description here"
          required
        ></b-form-input>
      </b-form-group>



      <b-button type="button" @click="onSubmit()" variant="primary">Submit</b-button>
      <b-button type="button" @click="onReset()" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import {  mapMutations } from 'vuex'
  export default {
    data() {
      return {
        form: {
          amount: '',
          description: '',
          type: null,
          date : new Date().toISOString().split("T")[0],
          
        },
        types: [{ text: 'Select One', value: null }, 'Debit','Credit'],
        show: true
      }
    },
    methods: {
         ...mapMutations([
      'ADD_USER_DATA'
    ]),
      onSubmit() {
        let data = {...this.form}
        this.ADD_USER_DATA(data)
      },
      onReset() {
        this.form.amount = ''
        this.form.description = ''
        this.form.type = null
        this.show = true
        
      }
    }
  }
</script>