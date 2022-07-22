import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState } from './types'

const initialState: FilterSliceState = {
  activeCategoryIndex: 0,
  activeSortNameIndex: 0,
  activePage: 1,
  searchValue: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.activeCategoryIndex = action.payload
    },
    setSortName(state, action: PayloadAction<number>) {
      state.activeSortNameIndex = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.activePage = action.payload
    },
    setQueryParams(state, action: PayloadAction<qs.ParsedQs>) {
      state.activeCategoryIndex = Number(action.payload.category)
      state.activeSortNameIndex = Number(action.payload.sortBy)
      state.activePage = Number(action.payload.page)
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setCategory,
  setSortName,
  setPage,
  setQueryParams,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
