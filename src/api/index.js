// This is fake backend that is supposed to behave like a
// REST API. Simulates response times and network errors.

import products from './products.json'

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * This is used to simulate fetching of products from a backend API.
 * Has delay and occational error.
 * @return {Array}
 */
export const fetchProducts = () => {
  return delay(1000).then(() => {
    // Simulate network errors.
    if (Math.random() > 0.8) {
      throw new Error('Ett fel uppstod när produkter skulle hämtas från servern.')
    }

    return products
  })
}
