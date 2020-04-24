<template>
  <section class>
    <section class="buttons is-info">
      <a @click="reset" class="button is-light">Reset</a>
    </section>
    <b-table
      :per-page="300"
      :paginated="true"
      :data="elements"
      :checked-rows.sync="checkedRows"
      checkable
      :columns="columns"
    ></b-table>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
const R = require("ramda");
//@ts-ignore
import * as d3 from "d3";
import { Watch } from "vue-property-decorator";

@Component
export default class ElementTable extends Vue {
  data() {
    return {
      selectedCategory: "Revit Document",
      isOpen: 0,
      phaseMap: {
        Doors: "Revit Doors",
        Railings: "Revit Railings",
        Walls: "Revit Walls",
        Roofs: "Revit Roofs",
        Plumbing: "Revit Plumbing",
        Fixtures: "Revit Fixtures"
      },
      checkedRows: [],
      columns: [
        {
          field: "Id",
          label: "Id",
          width: "100",
          numeric: true,
          searchable: true
        },
        {
          field: "name",
          label: "Name",
          searchable: true
        },
        {
          field: "Category",
          label: "Category",
          sortable: true,
          searchable: true
        },
        {
          field: "Etapa",
          label: "Etapa",
          sortable: true,
          searchable: true
        },
        {
          field: "Manzana",
          label: "Manzana",
          sortable: true,
          searchable: true
        },
        {
          field: "Parcela",
          label: "Parcela",
          sortable: true,
          searchable: true
        }
      ]
    };
  }

  get elements() {
    return this.$store.getters.filteredElements;
  }

  filterBySelected(e: any) {
    //@ts-ignore
    const selectedIds = this.checkedRows.map(d => d.Id).includes(e.Id);
    return;
  }

  get selectedIds() {
    return this.$store.getters.selectedIds;
  }

  reset(){
    //@ts-ignore
    this.checkedRows = []
    this.$store.dispatch("updateUIFilterElements", [])
  }

  @Watch("checkedRows")
  updateFilters() {
    //@ts-ignore
    this.$store.dispatch(
      "updateUIFilterElements",
      //@ts-ignore
      this.checkedRows.map(d => d.Id)
    );
  }
}
</script>

<style scoped>
</style>
