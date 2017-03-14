import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
Vue.use(Vuex)

// 获取当天日期
// const getDate = () => {
//   const date = new Date()
//   const mouth = parseInt(date.getMonth() + 1)
//   return date.getFullYear() + '-' + mouth + '-' + date.getDate()
// }

const localEvent = function (item) {
  this.get = () => {
    return JSON.parse(localStorage.getItem(item))
  }
  this.set = (obj) => {
    localStorage.setItem(item, JSON.stringify(obj))
  }
  this.clear = () => {
    localStorage.removeItem(item)
  }
}

const local = new localEvent('note')
const state = local.get() || {
  event: [],
  count: 0
}

const mutations = {
  ADDEVENT (states, obj) {
    states.count++
    obj.items.id = states.count
    states.event.unshift(obj.items)
    local.set(states)
  },
  EVENTTODO (states, obj) {
    let item = null
    for (let i = 0; i < states.event.length; i++) {
      if (states.event[i].id === obj.id) {
        states.event[i].type = 1
        item = states.event[i]
        states.event.splice(i, 1)
        break
      }
    }
    states.event.unshift(item)
    local.set(states)
  },
  EVENTTODONE (states, obj) {
    let item = null
    for (let i = 0; i < states.event.length; i++) {
      if (states.event[i].id === obj.id) {
        states.event[i].type = 2
        item = states.event[i]
        states.event.splice(i, 1)
        break
      }
    }
    states.event.unshift(item)
    local.set(states)
  },
  EVENTCANCEL (states, obj) {
    let item = null
    for (let i = 0; i < states.event.length; i++) {
      if (states.event[i].id === obj.id) {
        states.event[i].type = 3
        item = states.event[i]
        states.event.splice(i, 1)
        break
      }
    }
    states.event.unshift(item)
    local.set(states)
  },
  EDITEVENT (states, info) {
    if (states.event[info.index].id === info.id) {
      states.event[info.index].content = info.content
    } else {
      states.event.filter((item) => {
        if (item.id === info.id) {
          item.content = info.content
        }
      })
    }
    local.set(states)
  },
  DELEVENT (states, info) {
    if (states.event[info.index].id === info.id) {
      states.event.splice(info.index, 1)
    } else {
      states.event.filter((item, index) => {
        if (item.id === info.id) {
          states.event.splice(index, 1)
        }
      })
    }
    local.set(states)
  },
  CLEAREVENT (states) {
    states.event = []
    local.clear()
    local.set(states)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
