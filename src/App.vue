<template>
  <div id="app">
    <forge-viewer></forge-viewer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navigation from '@/components/Navigation.vue';
import ForgeViewer from '@/components/ForgeViewer.vue'
import Home from '@/views/Home.vue'
import Component from 'vue-class-component';

@Component({
  components:{
    ForgeViewer
  } 
})

export default class Application extends Vue {
}
</script>

<style lang="scss">
</style>
