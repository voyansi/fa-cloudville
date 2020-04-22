import Vue from 'vue'
import Vuex from 'vuex'
import {forgeAPIWrapper} from '../../functions/forge/forgeAPIWrapper';

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
  scope: 'data:read data:write data:create account:read account:write'
})

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    hubs:[],
    projects:[],
    items: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getToken(){
      return await forge.getToken()
    },
    // load available hubs
    async loadHubs(){
      
    },
    // load available projects in those hubs
    async loadProjects(){
       
    },
    async getContents(store, [hubId, projectId]: string[]){
      
    }
  },
  modules: {
  }
})
