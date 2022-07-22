import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { stateFilter } from '../../../redux/filter/selectors'
import { setPage } from '../../../redux/filter/slice'
import { usePagination } from '../../hooks/usePagination'
import styles from './Pagination.module.scss'

type PaginationProps = {
  totalPages: number
}

//В этом компоненте необходимо получать номер текущей страницы, функцию, которая изменяет этот номер и массив, на основании которого необходимо отрисовывать элементы

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const dispatch = useDispatch()
  const { activePage } = useSelector(stateFilter)

  const pagesArray = usePagination(totalPages)

  const changePage = (page: number) => {
    dispatch(setPage(page))
    activePage !== page &&
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <ul className={styles.root}>
      {pagesArray.map((p) => (
        <li className={styles.li} onClick={() => changePage(p)} key={p}>
          <span
            className={
              activePage === p
                ? styles.pageBtn + ' ' + styles.current
                : styles.pageBtn
            }
          >
            {p}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default Pagination
