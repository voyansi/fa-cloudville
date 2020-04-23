<template>
  <div class="">
    <div class="columns">
      <div class="column is-5">
        <forge-menu></forge-menu>
        <element-table></element-table>
      </div>
      <div class="column">
        <!-- <debug-view></debug-view> -->
        <forge-viewer></forge-viewer>
      </div>
      
    </div>
  </div>
</template>

<script>
import DebugView from './Debug.vue'
import ForgeMenu from '../components/ForgeMenu.vue'
import ForgeViewer from '../views/ForgeViewer.vue'
import ElementTable from '../components/ElementTable.vue'

export default {
  name: 'Home',
  components: {
    DebugView,
    ForgeMenu,
    ForgeViewer,
    ElementTable
  }
}
</script>
