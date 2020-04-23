<template>
  <div>
    <div class="content">
      <ol>
        <li v-for="t in types" :key="t">{{t}}</li>
        
      </ol>
      </div>
    <!-- <div v-for="e in elements" :key="e.id">
      <div class="content is-small is-left-aligned">
        <ol>
          <li v-for="(value, key) in e" :key="key">{{key}}: {{value}}</li>
        </ol>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
const R = require("ramda");

@Component
export default class ElementTable extends Vue {
  get elements() {
    const categories = []
    return this.$store.getters.elementsByFilter(R.identity).map(Object.keys)
    // return this.$store.getters.elementsByFilter((e: any) => e.Category == 'Revit Walls');
    
  }

  get types() {
    return R.uniq(R.flatten(this.elements))
  }
}
</script>

<style scoped>
</style>
