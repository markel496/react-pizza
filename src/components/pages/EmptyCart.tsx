import { Link } from 'react-router-dom'
import img from '../../assets/img/empty-cart.png'

const EmptyCart = () => {
  return (
    <div className="container container--cart_empty">
      <div className="cart cart--empty">
        <h2>Корзина пустая</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={img} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>На главную</span>
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart
