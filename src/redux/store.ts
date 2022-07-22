import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/slice'
import cart from './cart/slice'
import pizzas from './pizzas/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch //AppDispatch - специальный тип, в котором содержатся все actions из всех слайсов

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
