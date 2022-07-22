import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Main from './components/pages/Main'
import './scss/app.scss'

const FullPizza = React.lazy(
  () =>
    import(/* webpackChunkName: "FullPizza"*/ './components/pages/FullPizza')
)
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ './components/pages/Cart')
)
const ErrorPage = React.lazy(
  () =>
    import(/* webpackChunkName: "ErrorPage"*/ './components/pages/ErrorPage')
)

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Main />} />
        <Route
          path="pizzas/:id"
          element={
            <Suspense>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <ErrorPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
