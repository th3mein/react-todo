import { FormEvent, useState, useContext } from 'react'
import { CgAddR } from 'react-icons/cg'
import api from '../api/todos'
import DataContext from '../context/DataContext'

const AddTodoForm = () => {
  const [todo, setTodo] = useState('')

  const { todos, setTodos } = useContext(DataContext)

  const addNewTodo = async (e: FormEvent) => {
    e.preventDefault()
    const id = (todos.length ? todos[todos.length - 1].id + 1 : 1).toString()
    const task = todo
    const newTodo = { id, task, completed: false }
    try {
      const response = await api.post('/todos', newTodo)
      const allTodos = [...todos, response.data]
      setTodos(allTodos)
    } catch (error) {
      console.log('Error', error)
    }
  }
  return (
    <div className='add-todo-form-container w-full box-border bg-gray-900 border border-gray-800 p-2 rounded-lg'>
      <form
        className='add-todo-input-container p-1 w-full rounded-sm bg-gray-800'
        onSubmit={addNewTodo}
      >
        <input
          className='bg-transparent outline-0 text-gray-400'
          type='text'
          name='add-todo'
          id='add-todo'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className='rounded-sm bg-gray-800 text-gray-400 ml-2 p-1'
          onClick={addNewTodo}
        >
          <CgAddR className='m-auto' />
        </button>
      </form>
    </div>
  )
}
export default AddTodoForm
