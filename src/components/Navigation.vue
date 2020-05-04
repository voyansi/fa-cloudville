<template>
  <div>
    <a href="https://aeclab.tech" target="_blank">
      <img class="logo" src="@/assets/logo.png" />
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {}
</script>

<style scoped>
.logo {
  height: 50px;
}
</style>