const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id){//如果当前state的id不等于action的id，则保持state不变
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
}

//todos最初是一个空数组
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>//数组的map函数是对数组中的每一项调用相应的函数
        todo(t, action)
      )
    default:
      return state;
  }
}

export default todos;
