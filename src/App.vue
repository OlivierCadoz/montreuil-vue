<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "@/components/HelloWorld.vue";
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

#app {
  height: 100%;
  width: 100%;
}

.wrapper {
  height: 100%;
  width: 100%;

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
}
</style>
