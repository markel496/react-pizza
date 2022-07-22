import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { categories } from '../assets/variables'
import { stateFilter } from '../redux/filter/selectors'
import { setCategory, setPage } from '../redux/filter/slice'

const Categories: React.FC = memo(() => {
  const { activeCategoryIndex } = useSelector(stateFilter)
  const dispatch = useDispatch()

  const changeCategory = (index: number) => {
    dispatch(setCategory(index))
    dispatch(setPage(1))
  }

  return (
    <>
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              onClick={() => changeCategory(index)}
              className={activeCategoryIndex === index ? 'active' : ''}
              key={category}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
})

export default Categories
