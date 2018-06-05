<template>
  <div>
    <h5>Logs</h5>
    <div class="card card-logs">
      <div class="row" v-if="logs && logs.length > 0">
        <pre class="col-xs-12 cell"><code v-for="log in logs">{{ log }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: [
    'isConnected',
    'logs'
  ]
}
</script>

<style>
code { 
    font-family: 'Courier New', Courier, monospace;
}

pre {
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
}
.card-logs {
  background-color: #333;
  color: white;
}
</style>