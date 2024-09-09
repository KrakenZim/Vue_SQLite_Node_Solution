<template>
  <div id="app">
    <DataDisplay />
  </div>
</template>

<script>
import DataDisplay from './components/DataDisplay.vue';

export default {
  components: {
    DataDisplay
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #f9f9f9; /* Light background for the whole app */
}
</style>