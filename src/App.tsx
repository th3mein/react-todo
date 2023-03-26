import './index.css'

import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import EditTodo from './features/todos/EditTodo'
import Missing from './components/Missing'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='todo/:id' element={<EditTodo />} />
        <Route path='missing' element={<Missing />} />
        <Route path='*' element={<Navigate to='missing' replace />} />
      </Route>
    </Routes>
  )
}

export default App
