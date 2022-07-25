import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { pizzaTypes } from '../../assets/variables'
import { stateFindCountItem } from '../../redux/cart/selectors'
import { TotalItem } from '../../redux/cart/types'
import { addItem } from '../../redux/cart/slice'

const FullPizza: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  type PizzaType = {
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number
  }

  const [pizza, setPizza] = useState<PizzaType>()

  const dispatch = useDispatch()
  const findItem = useSelector(stateFindCountItem(id!))

  const count = findItem ? findItem.count : 0

  const addPizza = () => {
    if (id) {
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
  }

  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(
          `https://629a1be96f8c03a97850e3ee.mockapi.io/pizzas/${id}`
        )
        setPizza(response.data)
      } catch (error) {
        alert('Произошла ошибка при загрузке пиццы :(')
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return (
      <div className="container">
        <h3>Загрузка...</h3>
      </div>
    )
  }

  const { imageUrl, title, types, sizes, price } = pizza

  return (
    <div className="container">
      <div className="pizza">
        <div className="pizza__img">
          <img src={imageUrl} alt="Pizza" />
        </div>
        <h3 className="pizza__title">{title}</h3>
        <p className="pizza__descr">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          aperiam rerum commodi dolores hic voluptatibus, dicta nobis! Voluptate
          quibusdam autem officiis laudantium culpa nobis, beatae, esse sequi,
          architecto labore suscipit.
        </p>
        <div className="pizza__params-wrapper">
          <div className="pizza__selector">
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
          <div className="pizza__bottom">
            <div className="pizza__price">от {price} ₽</div>
            <button
              onClick={addPizza}
              className="button button--outline button--add"
            >
              <svg
                width="15"
                height="15"
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
        <Link to="/" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>На главную</span>
        </Link>
      </div>
    </div>
  )
}

export default FullPizza
