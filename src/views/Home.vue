<template>
  <div class="">
    <div class="columns">
      <div class="column is-2">
        <forge-menu></forge-menu>
      </div>
      <div class="column">
        <debug-view></debug-view>
      </div>
      
    </div>
  </div>
</template>

<script>
import DebugView from './Debug.vue'
import ForgeMenu from '../components/ForgeMenu.vue'

export default {
  name: 'Home',
  components: {
    DebugView,
    ForgeMenu
  }
}
</script>
