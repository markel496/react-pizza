import { TotalItem } from '../redux/cart/types'

export const totalPrice = (array: TotalItem[]) =>
  array.reduce((sum, obj) => sum + obj.price! * obj.count!, 0)

export const totalCount = (array: TotalItem[]) =>
  array.reduce((sum, obj) => sum + obj.count!, 0)

export const getAddedPizzasFromLS = () =>
  JSON.parse(localStorage.getItem('addedPizzas')!)

export const getCountItemsFromLS = () =>
  JSON.parse(localStorage.getItem('countItems')!)
