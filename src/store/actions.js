import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  addCart ({ state, commit }, payload) {
    // console.log(payload)
    // let oldProduct = null
    // for (const item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // 判断oldProduct
    // if (oldProduct) {
    //   oldProduct.count += 1
    // } else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }
    // console.log(commit)
    return new Promise((resolve, reject) => {
      const oldProduct = state.cartList.find(item => item.iid === payload.iid)
      // console.log(oldProduct)
      if (oldProduct) {
        commit(ADD_COUNTER, oldProduct)
        // oldProduct.count += 1
        resolve('当前的商品的数量+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        commit(ADD_TO_CART, payload)
        resolve('商品添加成功！')
      }
    })
  }
}
