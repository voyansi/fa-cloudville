import Vue from 'vue'
import Vuex from 'vuex'
import { forgeAPIWrapper } from '../../functions/forge/forgeAPIWrapper';
import { forgeAPINormalizer, forgeHub, forgeProject } from '../../functions/forge/forgeAPINormalizer';

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
    hubs: [],
    projects: [],
    items: [],
    folders: [],
    elements: []
  },
  getters: {
    elementsByFilter: (state) => (filter: any) => {
      return state.elements.filter(filter)
    }
  },
  mutations: {
    setHubs(state, hubs) {
      state.hubs = hubs
    },
    setProjects(state, projects) {
      state.projects = projects
    },
    setFolders(state, folders){
      state.folders = folders
    },
    setItems(state, items){
      state.items = items
    },
    setElements(state, elements){
      state.elements = elements
    }
  },
  actions: {
    async getToken() {
      return await forge.getToken()
    },
    // load available hubs
    async loadHubs(store) {
      const hubs = await forge.getHubs();
      const nHubs = forgeAPINormalizer.parseHubsResponse(hubs)
      store.commit('setHubs', nHubs);
    },
    // load available projects in those hubs
    async loadProjects(store) {
      const hubs = store.state.hubs;
      const projects = await Promise.all(hubs.map((h: forgeHub) => forge.getProjects(h.id)));
      const nProjects = forgeAPINormalizer.parseProjectsResponse(projects)
      store.commit('setProjects', nProjects)
    },
    async loadTopFolders(store) {
      const projects = store.state.projects;
      const folders = await (await Promise.all(
          projects.map(
            (m: forgeProject) => forge.getProjectTopFolder(m.inHub)(m.id)
            )))
            .reduce(arrayConcat)
      const nFolders = forgeAPINormalizer.parseFoldersResponse(folders)
      store.commit('setFolders', nFolders);
    },
    async getContents(store) {
      const project = 'b.7e8d1b7d-47bd-4606-b8b8-094e8de86f15'
      const folder = 'urn:adsk.wipprod:fs.folder:co.d9PTVReaTBOIVKmj9vhcbw'
      const contents = await forge.getProjectContents(project)(folder)
      store.commit('setItems', contents)
      // return contents
    },
    async loadData({ dispatch }) {
      await dispatch('loadHubs')
      await dispatch('loadProjects')
      await dispatch('loadTopFolders')
      await dispatch('getContents')
    },
    async loadModelElements(store, elements){
      store.commit('setElements', elements); 
    }
  },
  modules: {
  }
})

const arrayConcat = (a: any[], b: any[]) => a.concat(b)