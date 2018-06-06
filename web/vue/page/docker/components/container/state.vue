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
  display: inline-block;
  font-size: 12px;
  border-color: rgba(27,31,35,0.5);
  text-align: center;
  width: 100px;
  border-radius: 2px;

}
.running {
  background-color: #34d058;
}
.exited {
  background-color: #d2303d;
}
</style>