<template>
  <div class="home">
    <debug-view></debug-view>
  </div>
</template>

<script>
import DebugView from './Debug.vue'

export default {
  name: 'Home',
  components: {
    DebugView,
  }
}
</script>
