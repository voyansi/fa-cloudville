
<template>
  <div class="home">
    REDIRECT!!!
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Redirect extends Vue{

  async mounted(){
    console.log(this.$route.query)
    const query = this.$route.query
    const code = query.code
    //@ts-ignore
    // const token = await this.$forge.getThreeLeggedToken(code);
    console.log(token)
  }
}
</script>
