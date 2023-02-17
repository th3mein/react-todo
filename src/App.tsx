import './index.css'
import { useState, useEffect } from 'react'

import { DataProvider } from './context/DataContext'
import TodoFilter from './components/TodoFilter'

import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import EditTodo from './components/EditTodo'
import Missing from './components/Missing'

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='todo/:id' element={<EditTodo />} />
          <Route path='missing' element={<Missing />} />
          <Route path='*' element={<Navigate to='missing' replace />} />
        </Route>
      </Routes>
    </DataProvider>
  )
}

export default App
