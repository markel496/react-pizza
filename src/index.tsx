import React from 'react'
import ReactDOM from 'react-dom/client' //С помощью ReactDOM логика react преобразуется в html
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!) //Создание точки запуска react-проекта
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
