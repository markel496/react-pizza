import { RootState } from '../store'

export const stateCart = (state: RootState) => state.cart

export const stateFindCountItem = (id: string) => (state: RootState) =>
  state.cart.countItems.find((obj) => obj.id === id)

export const stateFindItem = (unique_id: number) => (state: RootState) =>
  state.cart.totalItems.find((obj) => obj.unique_id === unique_id)
