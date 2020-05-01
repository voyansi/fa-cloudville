<template>
  <section class="section">
    <b-field label="Find a parcela">
      <b-autocomplete
        v-model="parcela"
        placeholder="e.g. 0100-030"
        :keep-first="true"
        :open-on-focus="true"
        :data="filteredDataObj"
        @select="selectParcela"
      ></b-autocomplete>
    </b-field>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
const R = require("ramda");
import Component from "vue-class-component";

@Component
export default class ParcelaSelector extends Vue {
  data() {
    return {
      parcela: "",
      selected: null
    };
  }

  get parcelas() {
    return this.$store.getters.parcelas;
  }

  get filteredDataObj() {
    return this.parcelas.filter((option: string) => {
      //@ts-ignore
      return option.includes(this.parcela);
    });
  }
  selectParcela(selection: string){
      this.$store.dispatch('selectParcela', selection)
  }
}
</script>