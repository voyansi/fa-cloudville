import Vue from 'vue'
import Vuex from 'vuex'
import {forgeAPIWrapper} from '../../forge/forgeAPIWrapper';

// const forgeAPI = new forgeAPIWrapper({
//   // TODO: add logic to handle env vars in production
//   // local vars in .env file
//   //@ts-ignore
//   clientId: process.env.VUE_APP_CLIENT_ID,
//   //@ts-ignore
//   clientSecret: process.env.VUE_APP_CLIENT_SECRET,
//   //@ts-ignore
//   redirectUrl: process.env.VUE_APP_REDIRECT,
//   scopes: encodeURI('data:read')
// })

Vue.use(Vuex)

interface VState {
  permission: boolean
}

const state: VState = {
  permission: false
}


export default new Vuex.Store({
  state,
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
