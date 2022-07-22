import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { useSelector } from 'react-redux'
import Categories from '../Categories'
import Sort from '../Sort'
import PizzaBlock from '../PizzaBlock'
// import { useFetching } from '../hooks/useFetching'
import MyLoader from '../UI/loader/MyLoader'
import Pagination from '../UI/Pagination/Pagination'
import { stateFilter } from '../../redux/filter/selectors'
import { sortNames } from '../../assets/variables'
import { useAppDispatch } from '../../redux/store'
import { statePizzas } from '../../redux/pizzas/selectors'
import { setQueryParams } from '../../redux/filter/slice'
import { fetchPizzas } from '../../redux/pizzas/asyncActions'
import { Status } from '../../redux/pizzas/types'

const Main: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { activeCategoryIndex, activeSortNameIndex, searchValue, activePage } =
    useSelector(stateFilter)

  const { pizzas, status, totalPages, totalCount } = useSelector(statePizzas)

  const isUrl = useRef(false)
  const isRender = useRef(false)

  const fetchingPizzas = () => {
    const sortMethod = sortNames[activeSortNameIndex].includes('-')
      ? '?sortBy='.concat(
          sortNames[activeSortNameIndex].replace('-', '').concat('&order=desc')
        )
      : '?sortBy='.concat(sortNames[activeSortNameIndex])

    const category = activeCategoryIndex
      ? `&category=${activeCategoryIndex}`
      : ''

    const search = searchValue ? `&search=${searchValue}` : '' //в mockapi не ищет, если выбрать категорию, на нормальном бэкенде будет работать правильно

    dispatch(fetchPizzas({ sortMethod, category, search, activePage }))
  }

  useEffect(() => {
    console.log(window.location.search)
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      console.log(params)
      //возвращает индекс элемента из sortNames в строчном виде
      params.sortBy = sortNames.indexOf(params.sortBy as string).toString()
      dispatch(setQueryParams(params))
      isUrl.current =
        qs.stringify(params) !== 'sortBy=0&category=0&page=1' ? true : false
    }
  }, [])

  useEffect(() => {
    // console.log(isUrl.current)
    if (!isUrl.current) {
      fetchingPizzas()
    }
    isUrl.current = false
  }, [activeSortNameIndex, activeCategoryIndex, searchValue, activePage])

  useEffect(() => {
    if (isRender.current) {
      const queryString = qs.stringify({
        sortBy: sortNames[activeSortNameIndex],
        category: activeCategoryIndex,
        page: activePage,
      })
      navigate(`?${queryString}`)
    } else {
      isRender.current = true
    }
  }, [activeSortNameIndex, activeCategoryIndex, activePage])

  //Поиск без бэкенда
  // const items = pizzas.filter((obj) =>
  //   obj.title.toLowerCase().includes(searchValue.toLowerCase())
  // )

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === Status.ERROR && <h3>Ошибка!!!!</h3>}
        {status === Status.LOADING
          ? [...new Array(6)].map((_, index) => <MyLoader key={index} />)
          : pizzas.map((pizza) => (
              // {...pizza} - spread оператор
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
        {status === Status.SUCCESS && pizzas.length < 1 && 'Такой пиццы нет'}
      </div>
      {status === Status.SUCCESS && totalCount > 4 && (
        <Pagination totalPages={totalPages} />
      )}
    </div>
  )
}

export default Main
