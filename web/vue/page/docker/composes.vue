<template>
  <div>
    <h5>Compose</h5>
    <div class="card">
      <div class="row row-head">
        <div class="col-xs-3 cell">Name</div>
        <div class="col-xs-9 cell">Actions</div>
      </div>
      <div class="row row-body"
        v-for="compose in composes"
        v-bind:key="compose.name">
        <div class="col-xs-3 cell">{{compose.name}}</div>
        <div class="col-xs-9 cell">
          <a href="#" class="btn btn-start" v-on:click="start(compose.name)">
            <i class="fas fa-play"></i> Start
          </a>
          <a href="#" class="btn btn-stop" v-on:click="stop(compose.name)">
            <i class="fas fa-stop"></i> Stop
          </a>
          <a href="#" class="btn" v-on:click="remove(compose.name)">
            <i class="fas fa-trash-alt"></i> Remove
          </a>
        </div>
        <div class="col-xs-12">
          <div class="row row-head">
            <div class="col-xs-3 cell">Service</div>
            <div class="col-xs-3 cell">Container name</div>
            <div class="col-xs-2 cell">Container Id</div>
            <div class="col-xs-2 cell">Image</div>
            <div class="col-xs-2 cell">State</div>
          </div>
          <div
            v-for="service in compose.services"
            v-bind:key="service.name">
            <div class="row row-body"
              v-if="service.containers.length == 0">
              <div class="col-xs-3 cell">{{service.name}}</div>
            </div>
            <div class="row row-body"
              v-if="service.containers.length > 0"
              v-for="container in service.containers"
              v-bind:key="container.name">
            <div class="col-xs-3 cell">{{service.name}}</div>
            <div class="col-xs-3 cell cell-head"><span v-for="name in container.Names" v-bind:key="name">{{name}}</span></div>
            <div class="col-xs-2 cell">{{container.Id | truncate(13,'')}}</div>
            <div class="col-xs-2 cell">{{container.Image}}</div>
            <div class="col-xs-2 cell">
              <container-state v-bind:state="container.State" />
            </div>
            <div class="col-xs-12">
              <div class="row row-head">
                <div class="col-xs-6"></div>
                <div class="col-xs-3 cell">Ports</div>
              </div>
              <div class="row row-body">
                <div class="col-xs-6"></div>
                <div class="col-xs-3 cell">
                  <span
                    v-for="port in container.Ports">
                    ({{port.Type}}) {{port.PrivatePort}} -> {{port.PublicPort}}
                    <br/>
                  </span>
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
  components: {
    containerState: httpVueLoader('vue/page/docker/components/container/state.vue'),
  },
  props: [
    'composes'
  ],
  data: function() {
    return {
      who: 'world'
    }
  },
  methods: {
    start: function (composeId) {
      axios.get('composes/'+composeId+'/up')
        .then(response => {
          console.log('compose start:',response.data);
        })
        .catch(e => {
          this.errors.push(e);
        })
    },
    stop: function (composeId) {
      axios.get('composes/'+composeId+'/stop')
        .then(response => {
          console.log('compose stop:',response.data);
        })
        .catch(e => {
          this.errors.push(e);
        })
    },
    remove: function (composeId) {
      axios.get('composes/'+composeId+'/rm')
        .then(response => {
          console.log('compose remove:',response.data);
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