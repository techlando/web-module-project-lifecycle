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

  resetForm = () => {
    this.setState({...this.state, todoNameInput: ''})
  }

  setAxiosResponseError = (err) => {
    this.setState({ ...this.state, error: err.response.data.message})
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
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
    .catch(this.setAxiosResponseError)
    
  }
  toggleCompleted = id => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      debugger
      // this.setState({
        
      //   ...this.state, todos: this.state.todos.map(td => {
      //     debugger
      //     if (td.id !== id) return td
      //     return res.data.data;
      //   })
      // })
    })
   
    .catch(this.setAxiosResponseError)
  }


componentDidMount() {
  this.fetchAllTodos()
  
}
  
  render() {
    return (
      <div>
      <div id='error'>{this.state.error}</div>
      <div>
        <h1>Todos:</h1>
          <ul>
            {
              this.state.todos.map(todo => {
                return <li onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name} {todo.completed ? ' ✔️' : ''}</li>
              })
            }
          </ul>
          </div>
        <form onSubmit={this.onTodoFormSubmit}>
        <input value={this.state.todoNameInput} onChange={this.onTodoNameChange} type="text" placeholder='Type Todo'/>
          <button>Add</button>
          </form>
          <button>Clear Completed</button>
        </div>
       
    )
  }
}
