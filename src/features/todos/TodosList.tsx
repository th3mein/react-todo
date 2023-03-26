import { useSelector } from 'react-redux'
import { selectFilteredIds } from './todosSlice'
import TodoFilter from './TodoFilter'
import TodoItem from './TodoItem'

const TodoList = () => {
  const ids = useSelector(selectFilteredIds)

  return (
    <div className=' bg-gray-900 border border-gray-900 p-4 rounded-lg mt-4 text-gray-500'>
      <h2 className='mb-4 text-xl'>TodoList</h2>
      <TodoFilter />
      <ul className='text-sm'>
        {ids.length === 0 && <li>No items!</li>}
        {ids.map((id) => (
          <TodoItem key={id} id={id} />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
