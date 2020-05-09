<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isLoaded: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // startTimer () {
    //   this.$refs.swiper && this.$refs.swiper.startTimer()
    // },
    // stopTimer () {
    //   this.$refs.swiper && this.$refs.swiper.stopTimer()
    // }
    imageLoad () {
      if (!this.isLoaded) {
        this.$emit('swiperImageLoad')
        this.isLoaded = true
      }
    }
  }
}
</script>

<style scoped>
</style>
