<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="detailScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-image-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-image-info>
      <detail-param-info ref="params" :paramInfo="itemParams"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailImageInfo from './childComps/DetailImageInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, getRecommend, Goods } from 'network/detail'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { debounce } from 'common/utils'
import { BACK_POSITION } from 'common/const'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  async created () {
    // 1.获取iid
    this.iid = this.$route.query.iid
    // 2.请求详情数据
    const res = await getDetail(this.iid)
    // console.log(res)
    // 3.请求推荐数据
    const recommend = await getRecommend()
    // console.log(recommend)
    this.recommends = recommend.data.list
    const data = res.result
    // 取出轮播图数据
    this.topImages = data.itemInfo.topImages.filter((item, index) => index < 6)

    // console.log(this.topImages)
    // 创建商品的对象
    this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    // 取出店铺的信息
    this.shopInfo = data.shopInfo
    // 取出详情的信息
    this.detailInfo = data.detailInfo
    // 取出参数的信息
    this.itemParams = data.itemParams
    // 取出评论信息
    if (data.rate.cRate !== 0) {
      this.commentInfo = data.rate.list[0]
    }
    // 由于图片问题，还是不能正确获取offsetTop的值
    // this.$nextTick(() => {
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
    //   console.log(this.themeTopYs)
    // })
    // 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs)
    }, 200)
  },
  methods: {
    imageLoad () {
      this.newRefresh()

      this.getThemeTopY()
    },
    titleClick (index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    detailScroll (position) {
      const positionY = -position.y
      // console.log(positionY)
      // console.log(BACK_POSITION)
      this.isShowBackTop = positionY > BACK_POSITION

      const length = this.themeTopYs.length
      // 第一种方式
      // for (let i = 0; i < length; i++) {
      //   if (this.currentIndex !== i &&
      //   ((i < length - 1 && positionY >= this.themeTopYs[i] &&
      //   positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //     this.currentIndex = i
      //     // console.log(this.currentIndex)
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }

      // 第二种方式
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart () {
      // console.log('111')
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.title
      product.price = this.goodsInfo.realPrice
      product.iid = this.iid
      // 2.将商品添加到购物车
      this.$store.dispatch('addCart', product).then((res) => {
        // console.log(res)
        this.$toast.show(res)
      })
    }
  },
  mounted () {

  },
  updated () {

  },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  }
}
</script>

<style lang="scss" scoped>
  .detail{
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .content{
    background-color: #fff;
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
</style>
