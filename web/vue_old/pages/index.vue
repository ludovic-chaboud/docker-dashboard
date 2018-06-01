<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="card" style="width: 18rem;">
        <p v-if="isConnected">Connected to the server!</p>
        <ul>
          <li v-for="dockerMessage in dockerMessages">
            {{ dockerMessage }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="cards">
        <div
          v-for="container in containers"
          class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title" v-for="name in container.Names">{{name}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Image: {{container.Image}}</h6>
            <p class="card-text">
              State: {{container.Status}}
            </p>
            <p class="card-text">
              Id: {{container.Id}}
            </p>
            <a href="#" class="card-link" v-on:click="start(container.Id)">Start</a>
            <a href="#" class="card-link">Stop</a>
            <a href="#" class="card-link">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>