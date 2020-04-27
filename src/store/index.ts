import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as R from 'ramda'


// // const forgeAPI = new forgeAPIWrapper({
// //   // TODO: add logic to handle env vars in production
// //   // local vars in .env file
// //   //@ts-ignore
// //   clientId: process.env.VUE_APP_CLIENT_ID,
// //   //@ts-ignore
// //   clientSecret: process.env.VUE_APP_CLIENT_SECRET,
// //   //@ts-ignore
// //   redirectUrl: process.env.VUE_APP_REDIRECT,
// //   scopes: encodeURI('data:read')
// // })


// const forge = forgeAPIWrapper.withTwoLeggedAuth({
//   clientId: process.env.VUE_APP_CLIENT_ID,
//   clientSecret: process.env.VUE_APP_CLIENT_SECRET,
//   // redirectUrl: process.env.VUE_APP_REDIRECT,
//   scope: 'data:read data:write data:create account:read account:write'
// })

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    hubs: [],
    projects: [],
    items: [],
    folders: [],
    elements: [],
    uiFilteredElements: [],
    selectedParcela: ''
  },
  getters: {
    selectedIds: (state) => {
      return state.uiFilteredElements
    },
    unselectedIds: (state, getters) => {
      // return state.elements.map((e:any) => e.Id)
      return R.difference(state.elements.map((e: any) => e.Id), getters.selectedIds)
    },

    elementsByFilter: (state) => (filter: any) => {
      return state.elements.filter(filter)
    },
    filteredElements: (state) => {
      const parameters = ['Etapa', 'Sector', 'Renglon', 'Tramo', 'Manzana', 'Parcela']
      const customAttrFilter = (e: any) => R.intersection(R.keys(e), parameters).length > 0
      const categories = ['Revit Doors',
        'Revit Walls',
        'Revit Roofs',
        'Revit Windows',
        'Revit Stairs',
        'Revit Gutters',
        'Revit Plumbing Fixtures',
        'Revit Structural Framing',
        'Revit Strutural Columns',
        'Revit Railings']
      const categoriesFilter = (e: any) => categories.includes(e.Category)

      return state.elements.filter(customAttrFilter)
        .filter(categoriesFilter)
    }
  },
  mutations: {
    setHubs(state, hubs) {
      state.hubs = hubs
    },
    setProjects(state, projects) {
      state.projects = projects
    },
    setFolders(state, folders) {
      state.folders = folders
    },
    setItems(state, items) {
      state.items = items
    },
    setElements(state, elements) {
      state.elements = elements
    },
    setUIElements(state, elements) {
      state.uiFilteredElements = elements
    },
    selectParcela(state, p) {
      state.selectedParcela = p;
    }
  },
  actions: {
    async getToken() {
        const response = await axios.get('https://us-central1-fa-apm.cloudfunctions.net/fetchToken')
        return response.data
    },
    // load available hubs
    // async loadHubs(store) {
    //   const hubs = await forge.getHubs();
    //   const nHubs = forgeAPINormalizer.parseHubsResponse(hubs)
    //   store.commit('setHubs', nHubs);
    // },
    // // load available projects in those hubs
    // async loadProjects(store) {
    //   const hubs = store.state.hubs;
    //   const projects = await Promise.all(hubs.map((h: forgeHub) => forge.getProjects(h.id)));
    //   const nProjects = forgeAPINormalizer.parseProjectsResponse(projects)
    //   store.commit('setProjects', nProjects)
    // },
    // async loadTopFolders(store) {
    //   const projects = store.state.projects;
    //   const folders = await (await Promise.all(
    //     projects.map(
    //       (m: forgeProject) => forge.getProjectTopFolder(m.inHub)(m.id)
    //     )))
    //     .reduce(arrayConcat)
    //   const nFolders = forgeAPINormalizer.parseFoldersResponse(folders)
    //   store.commit('setFolders', nFolders);
    // },
    // async getContents(store) {
    //   const project = 'b.7e8d1b7d-47bd-4606-b8b8-094e8de86f15'
    //   const folder = 'urn:adsk.wipprod:fs.folder:co.d9PTVReaTBOIVKmj9vhcbw'
    //   const contents = await forge.getProjectContents(project)(folder)
    //   store.commit('setItems', contents)
    //   // return contents
    // },
    // async loadData({ dispatch }) {
    //   await dispatch('loadHubs')
    //   await dispatch('loadProjects')
    //   await dispatch('loadTopFolders')
    //   await dispatch('getContents')
    // },
    async loadModelElements(store, elements) {
      store.commit('setElements', elements);
    },
    async updateUIFilterElements(store, elements) {
      store.commit('setUIElements', elements)
    },
    async selectParcela(store, id) {
      store.commit('selectParcela', id)
    }
  },
  modules: {
  }
})

const arrayConcat = (a: any[], b: any[]) => a.concat(b)