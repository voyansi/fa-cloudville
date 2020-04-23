<template>
  <div>
    <!-- <div class="block">
      <b-radio v-for="c in categories" :key="c" 
        :native-value="c"
        v-model="selectedCategory">{{c}}</b-radio>
    </div>-->
    <div v-for="e in elements" :key="e.id">
      <a class="content is-small is-left-aligned">
        {{e.name}}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
const R = require("ramda");

@Component
export default class ElementTable extends Vue {
  data() {
    return {
      selectedCategory: "Revit Document"
    };
  }


  get elements() {
    return this.$store.state.uiFilteredElements;
  }

  get filteredElements() {
    //@ts-ignore
    return this.elements.filter(e => e.Category === this.selectedCategory);
  }

  get categories() {
    return R.uniq(this.elements.map((e: any) => e.Category));
  }
}
</script>

<style scoped>
</style>
