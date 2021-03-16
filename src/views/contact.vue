<template>
<div>
  <span >
    Hover your mouse over me for a few seconds
    to see my dynamically bound title!
  </span>
  
  <span v-if="seen">Now you see me</span>
  {{message}}
    <!-- <span v-if="seen">Now you see me</span> -->

</div>
</template>
<script>
export default {
   data:function(){
     return {
       message: 'You loaded this page on ' + new Date().toLocaleString(),
       seen : false
    
  }
}
}
</script>
