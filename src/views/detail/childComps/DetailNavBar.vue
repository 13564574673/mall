<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div @click="titleClick(index)" v-for="(item,index) in titles" :key="index" :class="{active:index===currentIndex}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick () {
      this.$router.back()
    }
  },
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
.detail-nav-bar{
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.title{
  display: flex;
  // font-size: 13px;
  div{
    flex: 1;
  }
}
.back{
  img{
    margin-top:11px;
  }
}
.active{
  color:var(--color-high-text);
}
</style>
