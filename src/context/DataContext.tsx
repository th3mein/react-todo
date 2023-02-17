import { createContext, useState, useEffect, ReactNode } from 'react'

import useAxios from '../hooks/useAxios'
interface TodoType {
  id: number
  task: string
  completed: boolean
}
interface TodoContextType {
  todos: TodoType[]
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
  todoFilter: string
  setTodoFilter: React.Dispatch<React.SetStateAction<string>>
}

const DataContext = createContext<TodoContextType>({} as TodoContextType)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { data, fetchError, isLoading } = useAxios(
    'http://localhost:3500/todos'
  )
  const [todos, setTodos] = useState<TodoType[]>([])
  useEffect(() => {
    setTodos(data)
  }, [data])

  const [todoFilter, setTodoFilter] = useState('pending')
  return (
    <DataContext.Provider
      value={{
        todos,
        setTodos,
        todoFilter,
        setTodoFilter,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataContext
