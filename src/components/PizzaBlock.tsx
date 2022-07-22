import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { pizzaTypes } from '../assets/variables'
import { stateFindCountItem } from '../redux/cart/selectors'
import { addItem } from '../redux/cart/slice'
import { TotalItem } from '../redux/cart/types'

type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}) => {
  const dispatch = useDispatch()
  //В массиве totalItems, который в cartSlice.js, мы ищем объект (пиццу), в котором id совпадает с id пиццы, на которую кликнули. Если такой объект нашелся, то достаю из него count
  const findItem = useSelector(stateFindCountItem(id))

  const count = findItem ? findItem.count : 0

  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const addPizza = () => {
    const pizzaItems: TotalItem = {
      id,
      title,
      imageUrl,
      type: pizzaTypes[activeType],
      size: sizes[activeSize],
      price,
      unique_id: Date.now(), //Date.now() возвращает количество миллисекунд, прошедших с 1 января 1970
    }
    dispatch(addItem(pizzaItems))
  }

  return (
    <div className="pizza-block">
      <div className="pizza-block__container">
        <Link to={'/pizzas/' + id}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                onClick={() => setActiveType(index)}
                className={activeType === index ? 'active' : ''}
                key={pizzaTypes[type]}
              >
                {pizzaTypes[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}
                key={size}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={addPizza}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {count ? count > 0 && <i>{count}</i> : ''}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
