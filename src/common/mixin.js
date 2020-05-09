import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted () {
    // 3.监听item中图片加载完成
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
// 回到顶部混入方法
export const backTopMixin = {
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick () {
      console.log(this.$refs.scroll)
      this.$refs.scroll.scrollTo(0, 0)
    }
  },
  components: {
    BackTop
  }
}
