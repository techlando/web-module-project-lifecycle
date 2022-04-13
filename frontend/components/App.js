import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
    
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(err => console.error(err))
  }
componentDidMount() {
  this.fetchAllTodos()
  
}
  
  render() {
    return (
      <div>
      <h1>Todos:</h1>
        <ul>
          {
            this.state.todos.map(todo => {
              return <li key={todo.id}>{todo.name}</li>
            })
          }
        </ul>
        <form>
        <input />
          <button>Add</button>
          </form>
          <button>Clear Completed</button>
        </div>
       
    )
  }
}
