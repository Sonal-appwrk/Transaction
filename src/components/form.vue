<template>
  <div>
    
    <h1>first page of vue</h1>
    
    firstname:<input type="text" v-model="firstname" /> 
    lastname:<input type="text"  v-model="lastname" />
    <h2>fullname: {{ fullname }}</h2>

    <h3>{{msg}}</h3>

    
  </div>
</template>
<script>
export default {
  name: "index",
  
  props:{
 msg : String,
  },
 
  data(){
     return {
         firstname : '',
         lastname: '',
     }
  },
  computed: {
    fullname: function () {
      return this.firstname + " " + this.lastname;
    },
  },
};
</script>