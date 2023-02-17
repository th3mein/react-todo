import { useState, useEffect, useContext } from 'react'
import DataContext from '../context/DataContext'
import { RiDeleteBin6Line, RiEditBoxLine } from 'react-icons/ri'
import api from '../api/todos'
import TodoFilter from './TodoFilter'
import { useNavigate } from 'react-router-dom'

const TodoList = () => {
  const { todos, setTodos, todoFilter } = useContext(DataContext)
  const [filteredTodos, setFilteredTodos] = useState<typeof todos>([])

  const navigate = useNavigate()

  useEffect(() => {
    const newList = todos.filter((todo) => {
      if (todoFilter === 'all') {
        return todo
      } else if (todoFilter === 'completed') {
        return todo.completed === true
      } else {
        return todo.completed === false
      }
    })
    setFilteredTodos(newList)
  }, [todoFilter, todos])

  const deleteTodo = async (id: number) => {
    try {
      const response = await api.delete(`/todos/${id}`)
      const newList = todos.filter((todo) => todo.id !== id)
      setTodos(newList)
    } catch (error) {
      console.log('Error', error)
    }
  }

  const toggleTodo = async (id: number) => {
    const todoStatus = todos.filter((todo) => todo.id === id)[0]?.completed
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todoStatus } : todo
    )
    try {
      const response = await api.patch(`/todos/${id}`, {
        completed: !todoStatus,
      })
    } catch (error) {
      console.log('Error', error)
    }
    setTodos(updatedTodos)
  }
  return (
    <div className=' bg-gray-900 border border-gray-900 p-4 rounded-lg mt-4 text-gray-500'>
      <h2 className='mb-4 text-xl'>TodoList</h2>

      <TodoFilter />
      <ul className='text-sm'>
        {filteredTodos.length === 0 && <li>No items!</li>}
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className='flex items-center mb-2 pb-2 border-b-2 border-gray-800 last:border-0'
          >
            <input
              className='peer w-5 h-5'
              type='checkbox'
              name=''
              id='{todo.id}'
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <label className='flex-1 mx-1 peer-checked:line-through'>
              {todo.task}
            </label>
            <button
              className='rounded-sm bg-lime-800 text-gray-400 p-1 ml-1'
              onClick={() => {
                navigate(`/todo/${todo.id}`)
              }}
            >
              <RiEditBoxLine />
            </button>
            <button
              className='rounded-sm bg-red-800 text-gray-400 p-1 ml-1'
              onClick={() => deleteTodo(todo.id)}
            >
              <RiDeleteBin6Line />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
