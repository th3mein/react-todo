import { useDispatch, useSelector } from 'react-redux'
import { EntityId } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '../../app/store'
import { updateTodo, deleteTodo, Todo, selectTodoById } from './todosSlice'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line, RiEditBoxLine } from 'react-icons/ri'

const TodoItem = ({ id }: { id: EntityId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const todo = useSelector((state: RootState) => selectTodoById(state, id))

  const toggleTodo = (todoId: number) => {
    const editTodo = { ...todo }

    editTodo.completed = !editTodo.completed
    dispatch(updateTodo(editTodo as Todo))
  }
  return (
    <>
      {todo && (
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
            onChange={() => toggleTodo(Number(todo.id))}
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
            onClick={() => dispatch(deleteTodo(Number(todo.id)))}
          >
            <RiDeleteBin6Line />
          </button>
        </li>
      )}
    </>
  )
}

export default TodoItem
