<template>
  <div class="row">
    <div class="col-sm-1">
      <sidebar></sidebar>
    </div>
    <div class="col-sm-11">
      <header></header>
      <docker></docker>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    header: httpVueLoader('vue/page/header.vue'),
    sidebar: httpVueLoader('vue/page/sidebar.vue'),
    docker: httpVueLoader('vue/page/docker.vue'),
  },
  data() { 
    return {
      errors: [],
      docker: [],
    }
  }
}
</script>

<style>
</style>