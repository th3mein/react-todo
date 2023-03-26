import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { addNewTodo, selectAllTodos } from './todosSlice'
import { FormEvent, useState, useEffect } from 'react'
import { CgAddR } from 'react-icons/cg'

const NewTodo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [todo, setTodo] = useState('')
  const [addNewTodoStatus, setAddNewTodoStatus] = useState('idle')
  const [addTodoError, setAddTodoError] = useState<null | boolean>(null)

  const todos = useSelector(selectAllTodos)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAddTodoError(null)
    }, 2000)

    return () => {
      clearTimeout(timeOut)
    }
  }, [addTodoError])

  const onSaveClicked = async (e: FormEvent) => {
    e.preventDefault()

    setAddTodoError(null)
    const task = todo
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1
    const newTodo = { id: id, task, completed: false }

    try {
      setAddNewTodoStatus('pending')
      await dispatch(addNewTodo(newTodo)).unwrap()
    } catch (error) {
      setAddTodoError(true)
      //console.log('Error', error)
    } finally {
      setAddNewTodoStatus('idle')
    }
  }
  return (
    <div className='add-todo-form-container w-full box-border bg-gray-900 border border-gray-800 p-2 rounded-lg'>
      <form
        className={`add-todo-input-container p-1 w-full rounded-sm bg-gray-800 ${addNewTodoStatus}`}
        onSubmit={onSaveClicked}
      >
        <input
          className='bg-transparent outline-0 text-gray-400'
          type='text'
          autoComplete='off'
          required
          name='add-todo'
          id='add-todo'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type='submit'
          className='rounded-sm bg-gray-800 text-gray-400 ml-2 p-1'
        >
          <CgAddR className='m-auto' />
        </button>
      </form>
      {addTodoError && (
        <>
          <p className='text-red-700 pt-1'>Error !</p>
        </>
      )}
    </div>
  )
}
export default NewTodo
