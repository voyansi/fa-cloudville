import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as R from 'ramda'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
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
    async loadModelElements(store, elements) {
      store.commit('setElements', elements);
    },
    async updateUIFilterElements(store, elements) {
      store.commit('setUIElements', elements)
    },
    async selectParcela(store, id) {
      store.commit('selectParcela', id)
    }
  }
})
