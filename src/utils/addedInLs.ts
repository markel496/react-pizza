import { TotalItem, CountItem } from '../redux/cart/types'

export const saveInLocalStorage = (
  itemToSave: TotalItem[] | CountItem[],
  key: string
) => {
  const json = JSON.stringify(itemToSave)
  localStorage.setItem(key, json)
}
