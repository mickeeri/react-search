import products from './products.json'

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const fetchProducts = (filter) => {
  return delay(500).then(() => {
    return products
  })
}
