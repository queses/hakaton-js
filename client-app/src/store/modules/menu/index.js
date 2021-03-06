import * as types from '../../mutation-types'
// import statistics from './statistics'
import forms from './forms'
// import dashboard from './dashboard'
import tables from './tables'
import auth from './auth'

const state = {
  items: [
    auth,
    // dashboard,
    // statistics,
    forms,
    tables
  ]
}

const mutations = {
  [types.TOGGLE_EXPAND_MENU_ITEM] (state, payload) {
    let menuItem = payload.menuItem
    let expand = payload.expand
    if (menuItem.children && menuItem.meta) {
      menuItem.meta.expanded = expand
    }
  }
}

const actions = {
  toggleExpandMenuItem ({commit}, payload) {
    commit(types.TOGGLE_EXPAND_MENU_ITEM, payload)
  }
}

export default {
  state,
  mutations,
  actions
}
