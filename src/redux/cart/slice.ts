import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import {
  totalPrice,
  totalCount,
  getAddedPizzasFromLS,
  getCountItemsFromLS,
} from '../../utils/cartFunc'
import { CartSliceState, TotalItem } from './types'

const initialState: CartSliceState = {
  totalItems: getAddedPizzasFromLS() || [],
  //для кнопки(сколько пицц добавил в корзину)
  countItems: getCountItemsFromLS() || [],
  totalPrice: totalPrice(getAddedPizzasFromLS()),
  totalCount: totalCount(getCountItemsFromLS()),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TotalItem>) => {
      //action.payload содержит объект, который я создаю в PizzaBlock
      const findItem = state.totalItems.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        )
      })
      if (findItem) {
        findItem.count && findItem.count++
        if (findItem.finalPrice) {
          findItem.finalPrice = action.payload.price! * findItem.count!
        }
      } else {
        state.totalItems.push({
          ...action.payload,
          count: 1,
          finalPrice: action.payload.price,
        })
      }

      //Сортирую по убыванию цены
      const sortByPrice = (prev: TotalItem, next: TotalItem) => {
        return prev.finalPrice! > next.finalPrice! ? -1 : 1
      }

      state.totalItems = state.totalItems.sort(sortByPrice)

      console.log(current(state.totalItems))

      const countItem = state.countItems.find(
        (obj) => obj.id === action.payload.id
      )

      if (countItem) {
        if (countItem.count) {
          countItem.count++
        }
      } else {
        state.countItems.push({
          id: action.payload.id,
          count: 1,
        })
      }

      console.log(current(state.countItems))

      state.totalPrice = totalPrice(state.totalItems)

      state.totalCount = totalCount(state.totalItems)
    },

    removeItem: (state, action: PayloadAction<TotalItem>) => {
      const findCountItem = state.countItems.find(
        (obj) => obj.id === action.payload.id
      )!

      if (findCountItem.count) findCountItem.count -= action.payload.count!

      if (findCountItem.count === 0) {
        state.countItems = state.countItems.filter((obj) => obj.count !== 0)
      }

      state.totalItems = state.totalItems.filter(
        (obj) => obj.unique_id !== action.payload.unique_id
      )

      state.totalPrice = totalPrice(state.totalItems)

      state.totalCount = totalCount(state.totalItems)
    },

    plusPizza: (state, action: PayloadAction<TotalItem>) => {
      const findItem = state.totalItems.find(
        (obj) => obj.unique_id === action.payload.unique_id
      )!
      if (findItem.count) {
        findItem.count++
        findItem.finalPrice = action.payload.price! * findItem.count
      }

      const findCountItem = state.countItems.find(
        (obj) => obj.id === action.payload.id
      )!

      findCountItem.count && findCountItem.count++

      state.totalPrice = totalPrice(state.totalItems)

      state.totalCount = totalCount(state.totalItems)
    },

    minusPizza: (state, action: PayloadAction<TotalItem>) => {
      const findItem = state.totalItems.find(
        (obj) => obj.unique_id === action.payload.unique_id
      )!

      if (findItem.count && findItem.count > 1) {
        findItem.count--
        findItem.finalPrice = action.payload.price! * findItem.count

        const findCountItem = state.countItems.find(
          (obj) => obj.id === action.payload.id
        )!

        findCountItem.count && findCountItem.count--

        state.totalPrice = totalPrice(state.totalItems)

        state.totalCount = totalCount(state.totalItems)
      }
    },

    clearCart(state) {
      if (window.confirm('Вы действительно хотите очистить корзину?')) {
        state.totalItems = []
        state.countItems = []
        state.totalPrice = 0
        state.totalCount = 0
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, plusPizza, minusPizza, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
