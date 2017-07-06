import {connect} from 'react-redux';
import {setVisibilityFilter} from '../actions';
import Link from '../components/Link';

//mapStateToProps 是一个普通的函数,它的主要作用就是返回需要传递给子组件的State。
//任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
//该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
//connect会把返回的数据写入到react组件中，然后组件中就可以通过props读取数据了。
//参数ownProps的值为传递到组件的 props
//state表示当前状态
const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  // console.log("--------------");
  // console.log(ownProps);
  //state.visibilityFilter就是当前操作的action.filter
  return {
    active: ownProps.filter === state.visibilityFilter//这里是判断当前哪个状态被选中，将其对应的active设置为true
  }
}
//setVisibilityFilter是一个action creator
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  }
}
//connect会把State和dispatch转换成props传递给子组件
//这里是传给Link组件(展示组件)
//Link组件来实现相应的逻辑
//connect函数将被调用两次。第一次是设置参数，第二次是组件与 Redux store 连接
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;
