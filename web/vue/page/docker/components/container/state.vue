<template>
  <span 
    class="state" 
    v-bind:class="{ 
      running: state === 'running',
      exited: state === 'exited'
    }"
  >
    {{state}}
  </span>
</template>

<script>
module.exports = {
  props: ['state']
}
</script>

<style>
.state {
  color: #fff;
  padding: 3px 10px;
  font-size: 12px;
  border-color: rgba(27,31,35,0.5);
}
.running {
  background-color: #34d058;
  /*background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);*/
}
.exited {
  background-color: #b5202c;
  /*background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);*/
  background-image: linear-gradient(-180deg, #de4450 0%, #cb2431 90%);
}
</style>