<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show (message = '默认文字', duration = 2000) {
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.7);
  padding: 15px;
  border-radius: 5px;

  z-index: 999;
}
.toast div{
  color: #fff;
}
</style>
