import React from 'react'

import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'
const Home = () => {
  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <AddTodoForm />
      <TodoList />
    </div>
  )
}

export default Home
