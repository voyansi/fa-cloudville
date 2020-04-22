import Vue from 'vue'
import Vuex from 'vuex'
import {forgeAPIWrapper} from '../../functions/forge/forgeAPIWrapper';
import {forgeAPINormalizer, forgeHub} from '../../functions/forge/forgeAPINormalizer';

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
    setHubs(state, hubs){
      state.hubs = hubs
    },
    setProjects(state, projects){
      state.projects = projects
    }
  },
  actions: {
    async getToken(){
      return await forge.getToken()
    },
    // load available hubs
    async loadHubs(store){
      const hubs = await forge.getHubs();
      const nHubs = forgeAPINormalizer.parseHubsResponse(hubs)
      store.commit('setHubs', nHubs);
    },
    // load available projects in those hubs
    async loadProjects(store){
       const hubs = store.state.hubs;
       const projects = await Promise.all(hubs.map((h: forgeHub) => forge.getProjects(h.id)));
       console.log(projects)
       const nProjects = forgeAPINormalizer.parseProjectsResponse(projects)
       store.commit('setProjects', nProjects)
    },
    async getContents(store, [hubId, projectId]: string[]){
      
    },
    async loadData({dispatch}){
      await dispatch('loadHubs')
      await dispatch('loadProjects')
    }
  },
  modules: {
  }
})
