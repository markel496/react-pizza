export type TotalItem = {
  id: string
  title: string
  imageUrl: string
  type: string
  size: number
  price?: number
  unique_id?: number
  count?: number
  finalPrice?: number
}

export type CountItem = {
  id: string
  count?: number
}

export interface CartSliceState {
  totalItems: TotalItem[]
  countItems: CountItem[]
  totalPrice: number
  totalCount: number
}
