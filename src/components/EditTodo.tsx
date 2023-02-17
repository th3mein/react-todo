import { useState, useContext } from 'react'
import DataContext from '../context/DataContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import api from '../api/todos'

const EditTodo = () => {
  const { id } = useParams()
  const { todos, setTodos } = useContext(DataContext)

  const toEditTodo = todos.filter((todo) => todo.id === Number(id))
  const [editTodo, setEditTodo] = useState({
    id: toEditTodo[0].id,
    task: toEditTodo[0].task,
    completed: toEditTodo[0].completed,
  })

  const saveTodo = async () => {
    try {
      const response = await api.put(`/todos/${id}`, editTodo)
      setTodos(
        todos.map((todo) =>
          todo.id === Number(id) ? { ...response.data } : todo
        )
      )
    } catch (error) {
      console.log('Error', error)
    }
  }
  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <div className=' bg-gray-900 border border-gray-900 p-4 rounded-lg mt-4 text-gray-500'>
        <h2 className='mb-4 text-xl'>Edit Todo</h2>

        <ul className='text-sm'>
          <li className='flex items-center mb-2 pb-2 border-b-2 border-gray-800 last:border-0'>
            <input
              className='peer w-5 h-5'
              type='checkbox'
              name=''
              id='{todo.id}'
              checked={editTodo.completed}
              onChange={(e) =>
                setEditTodo({ ...editTodo, completed: !editTodo.completed })
              }
            />
            <input
              className=' outline-0 bg-transparent text-gray-400 flex-1 ml-2'
              value={editTodo.task}
              onChange={(e) =>
                setEditTodo({ ...editTodo, task: e.target.value })
              }
            />
          </li>
          <li className='flex items-center mb-2 pb-2 border-b-2 border-gray-800 last:border-0'>
            <button
              className='block p-2 text-md mt-2 mr-2 bg-green-700 rounded-lg text-gray-400'
              onClick={saveTodo}
            >
              Save changes
            </button>
            <Link
              to='/'
              className='block p-2 text-sm underline mt-2 mr-2 bg-none rounded-lg text-gray-400'
            >
              Go back
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default EditTodo
