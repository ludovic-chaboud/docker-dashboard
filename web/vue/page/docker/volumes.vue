<template>
  <div>
    <h5>Volumes</h5>
    <div class="card">
      <div class="row row-head">
        <div class="col-xs-3 cell">Name</div>
        <div class="col-xs-6 cell">Labels</div>
        <div class="col-xs-3 cell">Actions</div>
      </div>
      <div class="row row-body"
        v-for="volume in volumes"
        v-bind:key="volume.Name">
        <div class="col-xs-3 cell cell-head">{{volume.Name}}</div>
        <div class="col-xs-6 cell cell-head">
          <ul>
            <li v-for="(labelValue, labelName) in volume.Labels" v-bind:key="labelName">
              {{labelName}}: {{labelValue}}
            </li>
          </ul>
        </div>
        <div class="col-xs-3 cell">
          <a href="#" class="btn"
            v-on:click="remove(volume.Name)">
            <i class="far fa-trash-alt"></i> Remove
          </a>
        </div>
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