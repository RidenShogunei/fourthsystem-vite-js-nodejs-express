import { createStore } from 'vuex';

export default createStore({
  state: {
     state: 0 ,
     key:"1",
     name:''
  },
  mutations: {
    changestate(state, number) {
      state.state = number
    },
    changekey(state,number){
      state.key=number
    },
    changename(state,name){
      state.name=name
    }
  },
  actions: {},
  modules: {},
});