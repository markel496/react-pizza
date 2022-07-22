//Сокращенная запись, в случае, если у объекта все ключи - string и все значения number
//type fetchPizzasArgs = Record<string, number>

export type fetchPizzasArgs = {
  sortMethod: string
  category: string
  search: string
  limit?: number
  activePage: number
}

export interface PizzasData {
  id: string
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

export type PizzasSliseState = {
  pizzas: PizzasData[]
  status: Status
  totalPages: number
  totalCount: number
}
