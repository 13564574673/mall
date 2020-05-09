<template>
  <div class="cart-list">
    <scroll class="centent" ref="scroll">
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    // console.log('111')
    this.$refs.scroll.refresh()
  }
}
</script>

<style lang="scss" scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 49px);
  .centent{
    height: 100%;
    overflow: hidden;
  }
}
</style>
