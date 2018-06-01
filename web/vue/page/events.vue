<template>
  <div>
    <h5>Events</h5>
    <div class="card">
      <div v-for="event in events">
        <div class="row row-body">
          <div class="col-xs-2 cell">
            {{ event.Type }}
          </div>
          <div class="col-xs-2 cell">
            {{ event.Action }}
          </div>
          <div class="col-xs-3 cell cell-head">
            {{ event.from }}
          </div>
        </div>
        
        <!--
        <div class="col-xs-3 cell">
          <pre>{{event}}</pre>
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: [
    'isConnected',
    'events'
  ]
}
</script>

<style>
.event {
  border-top: 1px solid gray;
  padding: 10px;
}
</style>