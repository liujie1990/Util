import {connect} from "react-redux";
import {toggleTodo} from "../actions";
import TodoList from "../components/TodoList";

//容器组件
//获取到相应的显示列表项
const getVisibleTodos = (todos,filter) => {
	switch(filter){
		case "SHOW_ALL":
			return todos;
		case "SHOW_COMPLETED":
			return todos.filter(t => t.completed);//这里的filter是数组的filter方法,用来返回completed为true的项
		case "SHOW_ACTIVE":
			return todos.filter(t => !t.completed);//这里的filter是数组的filter方法,用来返回completed为false的项
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		todos: getVisibleTodos(state.todos,state.visibilityFilter)//获取到相应的todos
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch(toggleTodo(id))//用来改变列表项的完成状态
		}
	}
}

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
	)(TodoList);

export default VisibleTodoList;
