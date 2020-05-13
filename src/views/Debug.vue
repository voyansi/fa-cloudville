<template>
<div class="section">
   <div class="buttons"> 
     <b-button @click="getHubs">getHubs</b-button>
     <!-- <b-button @click="getProjects">getProjets</b-button> -->
   </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class DebugView extends Vue{
   async getHubs(){
      await this.$store.dispatch('loadData')
   }   
   
   // async getProjects(){
   //    await this.$store.dispatch('loadProjects')
   // }   
}
</script>

<style scoped>

</style>