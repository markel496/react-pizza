import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPageCount } from '../../utils/pageCountFunc'
import { fetchPizzas } from './asyncActions'
import { PizzasSliseState, Status } from './types'

const initialState = {
  pizzas: [],
  status: Status.LOADING, // loading | error | success
  totalPages: 0, //число страниц
  totalCount: 0, //число пицц
} as PizzasSliseState

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,

  reducers: {
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.pizzas = []
      state.totalPages = 0
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.pizzas = action.payload
      //const totalCount = response.headers['x-total-count'] - на нормальном бэкенде
      const limit = 4 //сколько пицц на странице
      state.totalPages = getPageCount(state.totalCount, limit)
    })

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.pizzas = []
      state.totalPages = 0
    })
  },

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading'
  //     state.pizzas = []
  //     state.totalPages = 0
  //   },

  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.status = 'success'
  //     state.pizzas = action.payload
  //     //const totalCount = response.headers['x-total-count'] - на нормальном бэкенде
  //     const limit = 4 //сколько пицц на странице
  //     state.totalPages = getPageCount(state.totalCount, limit)
  //   },

  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error'
  //     state.pizzas = []
  //     state.totalPages = 0
  //   },
  // },
})

export const { setTotalCount } = pizzasSlice.actions

export default pizzasSlice.reducer
