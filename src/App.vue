<template>
  <div id="app">
    <navigation></navigation>
    <forge-viewer></forge-viewer>
    <div >
      <parcela-selector></parcela-selector>
    </div>
    <div>
      <parcela-viewer></parcela-viewer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ForgeViewer from '@/components/ForgeViewer.vue'
import ParcelaSelector from '@/components/ParcelaSelector.vue'
import ParcelaViewer from '@/components/ParcelaViewer.vue'
import Component from 'vue-class-component';
import Navigation from '@/components/Navigation.vue'

@Component({
  components:{
    ForgeViewer,
    ParcelaSelector,
    ParcelaViewer,
    Navigation
  } 
})

export default class Application extends Vue {
}
</script>

<style scoped>
#below-viewer {
  margin-top: 500px;
}
</style>
