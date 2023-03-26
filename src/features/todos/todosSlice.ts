import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import axios from 'axios'

export type Todo = { id: string; task: string; completed: boolean }

interface State extends EntityState<Todo> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  filter: string
  error: null | string | undefined
}

const TODOS_URL = 'http://localhost:3500/todos'
const todosAdapter = createEntityAdapter<Todo>()

const initialState: State = todosAdapter.getInitialState({
  status: 'idle', // idle | loading | succeeded | failed
  filter: 'all',
  error: null,
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(TODOS_URL)
  return response.data
})

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (initialTodo: {}) => {
    const response = await axios.post(TODOS_URL, initialTodo)
    return response.data
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId: number) => {
    const response = await axios.delete(`${TODOS_URL}/${todoId}`)
    // json-server returning empty object after delete
    return todoId
  }
)

export const updateTodo = createAsyncThunk(
  '.todos/updateTodo',
  async (initialTodo: Todo) => {
    const { id } = initialTodo
    const response = await axios.put(`${TODOS_URL}/${id}`, initialTodo)
    return response.data
  }
)
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        todosAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        todosAdapter.addOne(state, action.payload)
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        // TODO: Handle error
        console.log('Error', action.error.message)
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        todosAdapter.removeOne(state, action.payload)
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        todosAdapter.upsertOne(state, action.payload)
      })
      .addCase(updateTodo.rejected, (state, action) => {
        //TODO: Handle error
        console.log('Error', action.error.message)
      })
  },
})

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors<RootState>((state) => state.todos)

export const selectFilteredIds = (state: RootState) => {
  // if(state.todos.entities)
  // state.todos.entities.map((todo) => console.log(todo.id))
  // const ids = state?.todos?.entities?.map((todo) => {
  //   if (todo.completed == state.todos.filter) return todo.id
  // })
  const idFilter =
    state.todos.filter === 'completed'
      ? true
      : state.todos.filter === 'completed'
  const ids = state.todos.ids.filter(
    (id) =>
      state.todos.filter === 'all' ||
      state.todos.entities[id]?.completed === idFilter
  )
  return ids
  // console.log(
  //   '>>>>>>>>',
  //   state.todos.entities[1],
  //   typeof state.todos.ids.length,
  //   ':::::::'
  // )
}
// export const getFilter = (state: RootState) => state.todos.filter
export const getFilter = createSelector(
  [(state) => state.filter],
  (filter) => filter
)
export const { setFilter } = todosSlice.actions

export default todosSlice.reducer
