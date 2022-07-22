//enf - snipet

import { useState } from 'react'

//callback - некоторый запрос, перед которым нужно показать крутилку(индикатор загрузки) и после выполнения этого запроса крутилку нужно скрыть
export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false) //состояние, отвечающее за загрузку
  const [error, setError] = useState('') //обработка ошибок. Если произошла ошибка будем сюда помещеть текст ошибки
  const fetching = async () => {
    try {
      setIsLoading(true)
      await callback()
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false) //Убираем крутилку независимо от наличия ошибки
    }
  }

  return [fetching, isLoading, error]
  //Возвращаем функцию fetching, чтобы вызвать ее в нужном месте, состояние isLoading и ошибку. Это массив из 3х элементов
}
