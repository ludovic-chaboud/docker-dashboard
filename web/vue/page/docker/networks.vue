<template>
  <div>
    <h5><a name="networks">Networks</a></h5>
    <div class="card">
      <div class="row row-head">
        <div class="col-xs-3 cell">Name</div>
        <div class="col-xs-3 cell">Id</div>
        <div class="col-xs-3 cell">Driver</div>
        <div class="col-xs-3 cell">Actions</div>
      </div>
      <div class="row row-body"
        v-for="network in networks"
        v-bind:key="network.Id">
        <div class="col-xs-3 cell cell-head">{{network.Name}}</div>
        <div class="col-xs-3 cell">{{network.Id | truncate(13,'')}}</div>
        <div class="col-xs-3 cell">{{network.Driver}}</div>
        <div class="col-xs-3 cell">
          <a href="#" class="btn"
            v-on:click="remove(network.Id)">
            <i class="far fa-trash-alt"></i> Remove
          </a>
        </div>
        <div v-if="network.containers && network.containers.length > 0">
          <div class="col-xs-1">
          </div>
          <div class="col-xs-11">
            <b>Containers:</b> 
            <div class="card">
              <div class="row row-head">
                <div class="col-xs-3 cell">Container name</div>
                <div class="col-xs-3 cell">Container Id</div>
                <div class="col-xs-3 cell">Image</div>
                <div class="col-xs-3 cell">State</div>
              </div>
              <div class="row row-body"
                v-for="container in network.containers"
                v-bind:key="container.id">
                <div class="col-xs-3 cell cell-head"><span v-for="name in container.Names" v-bind:key="name">{{name}}</span></div>
                <div class="col-xs-3 cell">{{container.Id | truncate(13,'')}}</div>
                <div class="col-xs-3 cell">{{container.Image}}</div>
                <div class="col-xs-3 cell">
                  <container-state v-bind:state="container.State" />
                </div>
              </div>
            </div>
          </div>  
        </div>    
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: [
    'networks'
  ],
  data: function() {
    return {
      who: 'world'
    }
  },
  methods: {
    remove: function (networkId) {
      axios.get(`networks/`+networkId+'/remove')
        .then(response => {
          console.log('network remove:',response.data);
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