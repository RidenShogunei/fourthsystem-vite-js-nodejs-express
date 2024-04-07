import { createStore } from 'vuex';

export default createStore({
  state: {
     state: 0 ,
     key:"1",
  },
  mutations: {
    changestate(state, number) {
      state.state = number
    },
    changekey(state,number){
      state.key=number
    }
  },
  actions: {},
  modules: {},
});