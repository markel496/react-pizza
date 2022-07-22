import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setTotalCount } from './slice'
import { fetchPizzasArgs, PizzasData } from './types'

export const fetchPizzas = createAsyncThunk<PizzasData[], fetchPizzasArgs>(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { sortMethod, category, search, limit = 4, activePage } = params

    const response = await Promise.all([
      axios.get<PizzasData[]>(
        //https://629a1be96f8c03a97850e3ee.mockapi.io/pizzas
        `https://629a1be96f8c03a97850e3ee.mockapi.io/pizzas${sortMethod}${category}${search}`,
        {
          params: {
            //query параметры
            limit,
            page: activePage,
          },
        }
      ),
      //Запрос для пагинации
      axios.get<PizzasData[]>(
        `https://629a1be96f8c03a97850e3ee.mockapi.io/pizzas?${category}${search}`
      ),
    ])

    const pizzasTotalCount: number = response[1].data.length

    thunkAPI.dispatch(setTotalCount(pizzasTotalCount))

    return response[0].data
  }
)
