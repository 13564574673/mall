<template>
  <div class="home-recommend-view">
    <div class="recommend-item" v-for="item in recommends" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.home-recommend-view{
  display: flex;
  margin-top: 10px;
  font-size: 14px;
  padding-bottom: 30px;
  border-bottom: 10px solid #eee;
  .recommend-item{
    flex: 1;
    text-align: center;
  }
  .recommend-item img{
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
}
</style>
