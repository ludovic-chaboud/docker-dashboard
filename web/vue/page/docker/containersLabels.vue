<template>
  <div>
    <h5>Containers labels</h5>
    <div
      v-for="container in containers"
      v-bind:key="container.Id">
      <h6 v-for="name in container.Names" v-bind:key="name">{{name}}</h6>
      <div class="card">
        <div class="row row-head">
          <div class="col-xs-5 cell">Label name</div>
          <div class="col-xs-7 cell">Label value</div>
        </div>
        <div class="row row-body">
          <div v-for="(labelValue, labelName) in container.Labels" v-bind:key="labelName">
            <div class="col-xs-5 cell">{{labelName}}</div>
            <div class="col-xs-7 cell">{{labelValue}}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
module.exports = {
  props: [
    'containers'
  ]
}
</script>

<style>
</style>