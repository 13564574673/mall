<template>
  <div class="scroll" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Object
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.scroll, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      pullDownRefresh: this.pullDownRefresh
    })
    // 2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position)
      this.$emit('scroll', position)
    })
    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      // console.log('position')
        this.$emit('pullingUp')
      })
    }

    this.scroll.on('pullingDown', () => {
      this.$emit('pullingDown')
    })
  },
  methods: {
    scrollTo (x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll.finishPullUp()
    },
    refresh () {
      console.log('----')
      this.scroll && this.scroll.refresh()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
