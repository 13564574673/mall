<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-buttom-bar></cart-buttom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'

import CartList from './childComps/CartList'
import CartButtomBar from './childComps/CartButtomBar'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['cartLength'])
  },
  components: {
    NavBar,
    CartList,
    CartButtomBar
  }
}
</script>

<style lang="scss" scoped>
.cart{
  height: 100vh;
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 700;
  }
}
</style>
