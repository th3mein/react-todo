import { useSelector, useDispatch } from 'react-redux'
import { selectAllTodos, selectTodoById, updateTodo } from './todosSlice'

import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { EntityId } from '@reduxjs/toolkit'
import type { Todo } from './todosSlice'
import type { RootState, AppDispatch } from '../../app/store'
import ReactLoading from 'react-loading'
const EditTodo = () => {
  const { id } = useParams()

  const todos = useSelector(selectAllTodos)
  const dispatch = useDispatch<AppDispatch>()

  const [editPending, setEditPending] = useState(false)

  const toEditTodo = useSelector((state: RootState) =>
    selectTodoById(state, id as EntityId)
  )

  const [editTodo, setEditTodo] = useState({
    id: toEditTodo?.id,
    task: toEditTodo?.task,
    completed: toEditTodo?.completed,
  })

  // TODO: set loading, success and failed states
  const saveTodo = async () => {
    if (editPending) return // already processing
    setEditPending(true)
    try {
      await dispatch(updateTodo(editTodo as Todo)).unwrap()
    } catch (error) {
      console.log('Error', error)
    } finally {
      setEditPending(false)
    }
  }
  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <div className=' bg-gray-900 border border-gray-900 p-4 rounded-lg mt-4 text-gray-500'>
        <h2 className='mb-4 text-xl'>Edit Todo</h2>
        {!toEditTodo && <h1 className='text-red-600'>NO TO DO </h1>}
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
              className={`p-2 text-md mt-2 mr-2 bg-green-700 rounded-lg text-gray-400 flex  ${
                editPending ? 'animate-pulse' : ''
              }`}
              onClick={saveTodo}
            >
              {editPending ? (
                <>
                  <ReactLoading
                    color='#FFFFFD'
                    height={'20px'}
                    width={'20px'}
                  />
                  <div className='whitespace-nowrap ml-2'>Saving changes</div>{' '}
                </>
              ) : (
                <div className='whitespace-nowrap'>Save changes</div>
              )}
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
