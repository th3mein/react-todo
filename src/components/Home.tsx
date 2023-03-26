import React from 'react'

import NewTodo from '../features/todos/NewTodo'
import TodoList from '../features/todos/TodosList'
const Home = () => {
  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <NewTodo />
      <TodoList />
    </div>
  )
}

export default Home
