import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from './todosSlice'
import type { RootState } from '../../app/store'
import { MdListAlt } from 'react-icons/md'
import { BsListCheck, BsListTask } from 'react-icons/bs'

const TodoFilter = () => {
  const todoFilter = useSelector((state: RootState) => state.todos.filter)
  const dispatch = useDispatch()
  return (
    <ul className='flex text-md mb-4'>
      <li>
        <button
          className={`items-center pb-1 flex justify-center content-center mr-4 hover:text-blue-400 hover:border-solid hover:border-b-2 hover:border-blue-400 ${
            todoFilter === 'all'
              ? 'text-blue-400 border-b-2 border-solid border-blue-400'
              : ''
          }`}
          onClick={() => dispatch(setFilter('all'))}
        >
          <MdListAlt className='mr-2' />
          <label> All Tasks</label>
        </button>
      </li>
      <li>
        <button
          className={`items-center pb-1 flex justify-center content-center mr-4 hover:text-blue-400 hover:border-solid hover:border-b-2 hover:border-blue-400 ${
            todoFilter === 'completed'
              ? 'text-blue-400 border-b-2 border-solid border-blue-400'
              : ''
          }`}
          onClick={() => dispatch(setFilter('completed'))}
        >
          <BsListCheck className='mr-2' />
          <label> Completed</label>
        </button>
      </li>
      <li>
        <button
          className={`items-center pb-1 flex justify-center content-center mr-4 hover:text-blue-400 hover:border-solid hover:border-b-2 hover:border-blue-400 ${
            todoFilter === 'pending'
              ? 'text-blue-400 border-b-2 border-solid border-blue-400'
              : ''
          }`}
          onClick={() => dispatch(setFilter('pending'))}
        >
          <BsListTask className='mr-2' />
          <label> Pending</label>
        </button>
      </li>
    </ul>
  )
}

export default TodoFilter
