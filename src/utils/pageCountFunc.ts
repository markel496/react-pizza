//Работа с номерами страниц
//totalCount - общее число товаров
//limit - лимит товаров на странице

export const getPageCount = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit) //общее количество страниц, округленное в большее значение
}
