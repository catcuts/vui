<template>
  <div id="app"><!--
    <img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
import 'semantic-ui-segment/segment.css'
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style>
/* custom properties */
:root {
  --content-centered: {
    margin: auto;
    position: absolute;
    left: 0; 
    right: 0;
  };
}

/* custom selectors */
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

/* custom styles */
.content-centered :--heading >  { 
  @apply --content-centered;
}
</style>
