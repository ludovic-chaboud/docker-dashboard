<template>
  <div>
    <h5>Containers details</h5>
      <div class="card">
        <div class="row row-head">
          <div class="col-xs-2 cell">Container</div>
          <div class="col-xs-10 cell">Details</div>
        </div>
        <div class="row row-body"
          v-for="container in containers"
          v-bind:key="container.Id">
            <div class="col-xs-2 cell">
              <span v-for="name in container.Names" v-bind:key="name">
                {{name}}
              </span>
            </div>
            <div class="col-xs-10 cell">
              <pre><code>{{container}}</code></pre>
            </div>
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