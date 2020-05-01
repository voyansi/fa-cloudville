<template>
  <div class="">
    <div class="">
        <forge-viewer></forge-viewer>
    </div>
    <!-- <div class="">
        <element-table></element-table>
    </div> -->
  </div>
</template>

<script>
import DebugView from './Debug.vue'
import ForgeMenu from '../components/ForgeMenu.vue'
import ElementTable from '../components/ElementTable.vue'

export default {
  name: 'Home',
  components: {
    DebugView,
    ForgeMenu,
    ElementTable
  }
}
</script>
