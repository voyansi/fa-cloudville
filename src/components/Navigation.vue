<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item>
            <a href="https://aeclab.tech" target="_blank">
                <img
                    src="@/assets/logo.png"
                >
            </a>
            </b-navbar-item>

        </template>
           <template slot="end">
            <b-navbar-item tag="div">
            </b-navbar-item>
        </template>
    </b-navbar>   
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { forgeAPIWrapper } from '../../functions/forge/forgeAPIWrapper';

@Component
export default class Navigation extends Vue {
  @Prop() private msg!: string;

  async reset(){
    this.$store.dispatch("updateUIFilterElements", []);
  }
}
</script>

<style lang="scss">

</style>