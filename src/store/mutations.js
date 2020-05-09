import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'
export default {
  [ADD_COUNTER] (state, oldProduct) {
    oldProduct.count++
    console.log(oldProduct)
  },
  [ADD_TO_CART] (state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
