<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main class="wrapper">
    <RouterView />
  </main>
</template>

<style lang="scss">
@import "./assets/font";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  font-family: "Roboto-Regular", sans-serif;
  font-size: 16px;
}

#app,
.wrapper {
  height: 100%;
  width: 100%;
}
</style>
