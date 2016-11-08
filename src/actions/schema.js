import { Schema, arrayOf } from 'normalizr';
export const product = new Schema('products', { idAttribute: 'produkt_id' })
export const arrayOfProducts = arrayOf(product)
