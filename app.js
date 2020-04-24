import React from "react";
import "./styles.css";
import { render } from "react-dom";


const Todo = props => (
  <li>
    <input type="checkbox" checked ={props.todo.checked}
    onChange = {props.toggleTodo}/>
    <button onClick={props.onDelete}>Delete</button>
    <span>{props.todo.text}</span>
  </li>
)

let id = 0

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      todos: [],
    }
  }

  toggleTodo(id){
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }
  
  addTodo(){
    const text = prompt("What's to be done!")
    this.setState({
      todos: [...this.state.todos, 
        {id: id++, text: text, checked: false}],
    })
  }

  removeTodo(id){
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }
  render(){
    return (
    <div>
      <div>TODO COUNT: {this.state.todos.length}</div>
      <div>UNCHECKED TODO: 
      {this.state.todos.filter(todo => !todo.checked).length}</div>
      <button onClick={() => this.addTodo()}>ADD TODO</button>
      <ul>
        {this.state.todos.map(todo => 
        <Todo 
        onToggle={() => this.toggleTodo(todo.id)}
        onDelete={() => this.removeTodo(todo.id)}
        todo={todo}/>
        )}
        </ul>
      </div>
    )
  }
}


render(<App />, document.getElementById("root"));
