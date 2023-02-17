import React from 'react'
import { useContext } from 'react'
import DataContext from '../context/DataContext'

import { MdListAlt } from 'react-icons/md'
import { BsListCheck, BsListTask } from 'react-icons/bs'
const TodoFilter = () => {
  const { todoFilter, setTodoFilter } = useContext(DataContext)

  return (
    <ul className='flex text-md mb-4'>
      <li>
        <button
          className={`items-center pb-1 flex justify-center content-center mr-4 hover:text-blue-400 hover:border-solid hover:border-b-2 hover:border-blue-400 ${
            todoFilter === 'all'
              ? 'text-blue-400 border-b-2 border-solid border-blue-400'
              : ''
          }`}
          onClick={() => setTodoFilter('all')}
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
          onClick={() => setTodoFilter('completed')}
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
          onClick={() => setTodoFilter('pending')}
        >
          <BsListTask className='mr-2' />
          <label> Pending</label>
        </button>
      </li>
    </ul>
  )
}

export default TodoFilter
