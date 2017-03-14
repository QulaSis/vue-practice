// 增加代办事件
export const addevent = ({commit}, param) => {
  commit('ADDEVENT', {items: param})
}
//  未完成事件
export const eventToDo = ({commit}, param) => {
  commit('EVENTTODO', {id: param})
}
//  已完成事件
export const eventToDone = ({commit}, param) => {
  commit('EVENTTODONE', {id: param})
}
// 已取消事件
export const eventCancel = ({commit}, param) => {
  commit('EVENTCANCEL', {id: param})
}
//  编辑内容
export const editEvent = ({commit}, param) => {
  commit('EDITEVENT', param)
}
// 删除内容
export const delEvent = ({commit}, param) => {
  commit('DELEVENT', param)
}
// 清空
export const clearEvent = ({commit}) => {
  commit('CLEAREVENT')
}
