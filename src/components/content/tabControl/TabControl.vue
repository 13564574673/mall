<template>
  <!-- TabControl:tab栏 -->
  <div class="tab-control">
    <div class="tab-control-item" :class="{active:index === currentIndex}" v-for="(item,index) in titles" :key="index" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;

    .tab-control-item{
      flex: 1;
    }

    .tab-control-item span{
      padding: 5px;
    }

    .active{
      color: var(--color-high-text);
    }

    .active span{
      border-bottom: 3px solid var(--color-tint);
    }
  }
</style>
