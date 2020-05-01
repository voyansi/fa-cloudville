<template>
  <section>
    <b-steps v-model="activeStep">
      <template v-for="(step, index) in steps">
        <b-step-item :key="index" :label="step.label"></b-step-item>
      </template>
    </b-steps>
    <div>
      <b-taglist v-if="parcela.length > 0">
        <b-tag
          v-for="f in filteredElements"
          @click="selectElement"
          :key="f.Id"
        >{{f.name}}</b-tag>
      </b-taglist>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component
export default class ParcelaViewer extends Vue {
  data() {
    return {
      elementSelected: null,
      activeStep: 0,
      steps: [
        {
          label: "Existing",
          phase: ["E", "R", "D"]
        },
        {
          label: "Removal",
          phase: ["R"]
        },
        {
          label: "Demolition",
          phase: ["D"]
        },
        {
          label: "Enhancement",
          phase: ["M"]
        },
        {
          label: "Result",
          phase: ["E", "M"]
        }
      ]
    };
  }

  get parcela() {
    const p = this.$store.state.selectedParcela;
    if (p) {
      const [manzana, pac] = p.split("-");
      const elements = this.$store.getters.filteredElements.filter((e: any) => {
        return e.Manzana === manzana && e.Parcela === pac;
      });
      return elements;
    } else {
      return [];
    }
  }

  getType(e: any){
      console.log(e)
  }

  get filteredElements() {
    if (this.parcela.length > 0) {
      return this.parcela.filter((e: any) =>
        //@ts-ignore
        this.steps[this.activeStep].phase.includes(e.Etapa)
      );
    } else {
        return this.$store.getters.filteredElements.filter((e: any) =>
        //@ts-ignore
        this.steps[this.activeStep].phase.includes(e.Etapa)
      );
    }
  }

  selectElement(id: any) {
    console.log(id);
    this.$store.dispatch("updateUIFilterElements", [id]);
  }

  @Watch("activeStep")
  updateFilters() {
    //@ts-ignore
    this.$store.dispatch(
      "updateUIFilterElements",
      //@ts-ignore
      this.filteredElements.map(e => e.Id)
    );
  }

  @Watch("parcela")
  resetStep() {
    //@ts-ignore
    this.activeStep = 0;
  }
}
</script>