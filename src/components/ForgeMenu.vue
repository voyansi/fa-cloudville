<template>
  <b-menu>
    <b-menu-list label="Forge Hubs" class="is-clearfix">
      <b-menu-item icon="cloud" v-for="hub in hubs" :active="isActive" :key="hub.id" expanded>
        <template slot="label" slot-scope="props">
          {{hub.name}}
          <b-icon class="is-pulled-right" :icon="props.expanded ? 'chevron-down' : 'chevron-up'"></b-icon>
        </template>
        <b-menu-item
          v-for="project in projects.filter(p => p.inHub === hub.id)"
          icon="tree"
          :label="project.name"
          :key="project.id"
        ></b-menu-item>
      </b-menu-item>
    </b-menu-list>
    <b-menu-list label="Actions">
      <b-menu-item @click="loadData" label="LoadData"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ForgeMenu extends Vue {
  data() {
    return {
      isActive: null
    };
  }

  get hubs() {
    return this.$store.state.hubs;
  }

  get projects() {
    return this.$store.state.projects;
  }

  loadData(){
   this.$store.dispatch('loadData') 
  }
}
</script>