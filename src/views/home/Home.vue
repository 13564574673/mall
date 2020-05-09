<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <van-loading v-show="downRefresh"/>
    <tab-control
      ref="tabControl1"
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      :pull-down-refresh="{
        threshold: 50,
        stop: 30
      }"
      @pullingDown="DownRefresh"
      @pullingUp="loadMore"
    >
      <home-swiper @swiperImageLoad="swiperImageLoad" :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabControl2"
        class="tab-control"
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="ShowGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { POP, NEW, SELL } from 'common/const'

export default {
  name: 'Home',
  data () {
    return {
      // 轮播图数据
      banners: [],
      recommends: [],
      // tab栏整体数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: POP,
      downRefresh: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  created () {
    // console.log(this)
    // 请求多个数据
    this.getHomeMultidata()
    this.getHomeGoods(POP)
    this.getHomeGoods(NEW)
    this.getHomeGoods(SELL)
  },
  mixins: [itemListenerMixin, backTopMixin],

  mounted () {

  },
  computed: {
    ShowGoods () {
      return this.goods[this.currentType].list
    }
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
    // console.log(this.saveY)
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY)

    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    swiperImageLoad () {
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
    },
    /**
     * 网络请求相关方法
     */
    async getHomeMultidata () {
      const res = await getHomeMultidata()
      // console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    },
    // 请求商品数据
    async getHomeGoods (type) {
      const page = this.goods[type].page + 1
      const res = await getHomeGoods(type, page)
      console.log(res)
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1

      this.$refs.scroll.finishPullUp()
    },
    contentScroll (position) {
      // console.log(position)
      this.isShowBackTop = (-position.y) > 1000

      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore () {
      console.log('111')
      this.getHomeGoods(this.currentType)
    },
    // 上拉刷新
    DownRefresh () {
      // this.downRefresh = true
      // this.getHomeMultidata()
      // this.getHomeGoods('pop')
      // this.getHomeGoods('new')
      // this.getHomeGoods('sell')
      // this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
#home{
  // padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  // position: fixed;
  // left: 0;
  // right: 0;
  // top: 0;
  // z-index: 10;
}
.tab-control{
  position: relative;
  z-index: 10;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.fixed{
  position: fixed;
  left: 0;
  right: 0;
  top:44px;
}
// .content{
//   height: calc(100% - 93px);
//   overflow: hidden;
// }
</style>

<style lang="scss">
.van-loading{
  text-align: center;
}
</style>
