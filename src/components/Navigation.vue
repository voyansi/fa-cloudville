<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/logo.png"
                >
            </b-navbar-item>

        </template>
           <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a @click="login" class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>   
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { forgeAPIWrapper } from '../../forge/forgeAPIWrapper';

const f = new forgeAPIWrapper()

@Component
export default class Navigation extends Vue {
  @Prop() private msg!: string;

  async login(){
      const token = await f.authenticate()
      console.log(token)
  }
}
</script>

<style lang="scss">

</style>