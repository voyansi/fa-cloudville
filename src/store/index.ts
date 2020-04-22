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

const forge = forgeAPIWrapper.withTwoLeggedAuth({
  clientId: process.env.VUE_APP_CLIENT_ID,
  clientSecret: process.env.VUE_APP_CLIENT_SECRET,
  // redirectUrl: process.env.VUE_APP_REDIRECT,
  scopes: 'data:read data:write data:create account:read account:write'
})

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getToken(){
      return await forge.getToken()
    },
    async getContents(){
      return await forge.getProjectContents('b.7e8d1b7d-47bd-4606-b8b8-094e8de86f15')('urn:adsk.wipprod:fs.folder:co.d9PTVReaTBOIVKmj9vhcbw')
    }
  },
  modules: {
  }
})
