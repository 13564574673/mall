<template>
  <div class="cart-buttom-bar">
    <div class="bottom-bar" @click="checkClickAll">
        <check-button :isChecked="isSelectAll" class="check-button"></check-button>
        <span>全选</span>
    </div>
    <div class="cart-buttom-price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClicc">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartButtomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return '￥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      // return !(this.cartList.filter(item => !item.checked).length)
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClickAll () {
      // console.log('111')
      if (this.isSelectAll) {
        this.cartList.forEach(item => { item.checked = false })
      } else {
        this.cartList.forEach(item => { item.checked = true })
      }
    },
    calcClicc () {
      if (!this.isSelectAll) {
        this.$toast.show('请选择一件商品!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-buttom-bar{
  height: 40px;
  background: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  .bottom-bar{
    display: flex;
    align-items: center;
    width: 70px;
    .check-button{
      line-height: 20px;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  .cart-buttom-price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 100px;
    color:#fff;
    background-color: var(--color-tint);
    text-align: center;
  }
}
</style>
