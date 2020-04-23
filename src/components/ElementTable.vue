<template>
<div>{{types}}</div>
  <div>{{elements}}</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
const R = require('ramda')

@Component
export default class ElementTable extends Vue {
  get elements() {
    return this.$store.getters.elementsByFilter((e) => e);
  }
  
  get types(){
      return this.elements.map(e => e.Category)
  }
}
</script>

<style scoped>
</style>
