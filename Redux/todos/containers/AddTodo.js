import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions';

let AddTodo = ({dispatch}) => {
  let textInput;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!textInput.value.trim()) {
          return;
        }
        dispatch(addTodo(textInput.value));
        textInput.value = '';
      }}>
        <input ref={input => {textInput = input; }} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

AddTodo = connect()(AddTodo);//只注入 dispatch，不监听 store

export default AddTodo;
