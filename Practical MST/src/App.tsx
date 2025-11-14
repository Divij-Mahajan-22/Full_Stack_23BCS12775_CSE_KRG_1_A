import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import StudentList from './StudentList';
import TodoListPage from './TodoListPage';

type Todo = {
  id: string
  text: string
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    const text = input.trim()
    if (!text) return
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      done: false,
    }
    setTodos((t) => [newTodo, ...t])
    setInput("")
  }

  const toggleTodo = (id: string) => {
    setTodos((t) => t.map(td => td.id === id ? { ...td, done: !td.done } : td))
  }

  const removeTodo = (id: string) => {
    setTodos((t) => t.filter(td => td.id != id))
  }

  const remaining = todos.filter(t => !t.done).length;
  

  return (
    <TodoListPage todos={todos} input={input} setInput={setInput} addTodo={addTodo} toggleTodo={toggleTodo} removeTodo={removeTodo} remaining={remaining} />
    //<StudentList/>
  )
}

export default App
