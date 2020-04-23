<template>
  <section class="section">
    <div class="level">
      <b-dropdown v-model="etapas" @change="updateFilters" multiple aria-role="list">
        <button class="button is-primary" type="button" slot="trigger">
          <span>Etapa ({{ etapas.length }} / {{etapa.length}})</span>
          <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item v-for="s in etapa" :value="s" :key="s" aria-role="listitem">
          <span>{{s}}</span>
        </b-dropdown-item>
      </b-dropdown>

      <b-dropdown v-model="sectors" multiple aria-role="list">
        <button class="button is-primary" type="button" slot="trigger">
          <span>Sectors ({{ sectors.length }}/ {{sector.length}})</span>
          <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item v-for="s in sector" :value="s" :key="s" aria-role="listitem">
          <span>{{s}}</span>
        </b-dropdown-item>
      </b-dropdown>

      <b-dropdown @change="updateFilters" v-model="manzanas" multiple aria-role="list">
        <button class="button is-primary" type="button" slot="trigger">
          <span>Manzana ({{ manzanas.length }}/ {{manzana.length}})</span>
          <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item
          @change="updateFilters"
          v-for="s in manzana"
          :value="s"
          :key="s"
          aria-role="listitem"
        >
          <span>{{s}}</span>
        </b-dropdown-item>
      </b-dropdown>

      <!-- <b-dropdown v-model="parcelas" multiple aria-role="list">
        <button class="button is-primary" type="button" slot="trigger">
          <span>parcela ({{ parcelas.length }}/ {{parcela.length}})</span>
          <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item v-for="s in parcela" :value="s" :key="s" aria-role="listitem">
          <span>{{s}}</span>
        </b-dropdown-item>
      </b-dropdown>-->
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as R from "ramda";
import { Watch } from "vue-property-decorator";

@Component
export default class ForgeMenu extends Vue {
  data() {
    return {
      isActive: null,
      sectors: [],
      etapas: [],
      manzanas: [],
      parcelas: []
    };
  }

  isSelectedEtapa(e: any) {
    //@ts-ignore
    return this.etapas.includes(e["Etapa"]);
  }

  isSelectedSector(e: any) {
    //@ts-ignore
    return this.sectors.includes(e["Sector"]);
  }

  isSelectedManzana(e: any) {
    //@ts-ignore
    return this.manzanas.includes(e["Manzana"]);
  }

  get etapa() {
    return R.uniq(this.parameters.map(R.prop("Etapa")));
  }

  get sector() {
    return R.uniq(
      this.parameters.filter(this.isSelectedEtapa).map(R.prop("Sector"))
    );
  }

  get manzana() {
    return R.uniq(
      this.parameters.filter(this.isSelectedSector).map(R.prop("Manzana"))
    );
  }

  get parcela() {
    return R.uniq(
      this.parameters.filter(this.isSelectedManzana).map(R.prop("Parcela"))
    );
  }

  get parameters() {
    const s = ["Etapa", "Sector", "Tramo", "Manzana", "Parcela"];
    return this.$store.getters.filteredElements.map(R.pick(s));
  }

  updateFilters() {
    console.log('called')
    const filters = R.pipe(
      R.filter(this.isSelectedEtapa),
      R.filter(this.isSelectedSector),
      R.filter(this.isSelectedManzana)
    );

    this.$store.dispatch("updateUIFilterElements", filters);
    // return filters(this.$store.getters.filteredElements);
  }
}
</script>