import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
    }
    
  }
  onTodoNameChange = (e) => {
    const { value } = e.target
    this.setState({ ...this.state, todoNameInput: value })
  }
  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.fetchAllTodos()
      this.setState({...this.state, todoNameInput: ''})
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message})
    })
  }
  onTodoFormSubmit = (e) => {
    e.preventDefault()
    this.postNewTodo()
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message})
    })
  }
componentDidMount() {
  this.fetchAllTodos()
  
}
  
  render() {
    return (
      <div>
      <div id='error'>{this.state.error}</div>
        <h1>Todos:</h1>
          <ul>
            {
              this.state.todos.map(todo => {
                return <li key={todo.id}>{todo.name}</li>
              })
            }
          </ul>
        <form onSubmit={this.onTodoFormSubmit}>
        <input value={this.state.todoNameInput} onChange={this.onTodoNameChange} type="text" placeholder='Type Todo'/>
          <button>Add</button>
          </form>
          <button>Clear Completed</button>
        </div>
       
    )
  }
}
