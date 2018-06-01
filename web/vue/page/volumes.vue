<template>
  <div>
    <h5>Volumes</h5>
    <div class="card">
      <div class="row row-head">
        <div class="col-xs-3 cell">Name</div>
        <div class="col-xs-2 cell">Id</div>
        <div class="col-xs-3 cell">Actions</div>
      </div>
      <div class="row row-body"
        v-for="volume in volumes"
        v-bind:key="volume.Id">
        <div class="col-xs-3 cell cell-head"><span v-for="name in volume.Names" v-bind:key="name">{{name}}</span></div>
        <div class="col-xs-2 cell">{{volume.Id | truncate(13,'')}}</div>
        <div class="col-xs-3 cell">
          <a href="#" class="btn"
            v-on:click="remove(volume.Id)">
            <i class="far fa-trash-alt"></i> Remove
          </a>
        </div>"
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: [
    'volumes'
  ],
  data: function() {
    return {
      who: 'world'
    }
  },
  methods: {
    remove: function (volumeId) {
      axios.get(`volumes/`+volumeId+'/remove')
        .then(response => {
          console.log('volume remove:',response.data);
        })
        .catch(e => {
          this.errors.push(e);
        })
    }
  }
}
</script>

<style>
</style>