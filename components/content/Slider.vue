<template>
  <div>
    <client-only>
      <swiper
        v-if="items.length"
        ref="carousel"
        class="swiper"
        :options="swiperOptions"
      >
        <swiper-slide
          v-for="(item, index) in items"
          :key="index"
        >
          <template v-if="item.image">
            <div class="swiper__media" @click="$nuxt.$router.push({ name: 'journal-id', params: { id: item.url } })">
              <img v-if="item.image" data-not-lazy :src="item.image.url" :alt="item.image.alternativeText">
            </div>
            <div class="swiper__text" @click="$nuxt.$router.push({ name: 'journal-id', params: { id: item.url } })">
              <span v-if="item.category" :class="getClass(item.category.name)">{{ item.category.name }}</span> {{ item.title }}
            </div>
          </template>
          <template v-else>
            <div class="swiper__media">
              <img v-if="item.url" data-not-lazy :src="item.url" :alt="item.alternativeText">
            </div>
            <div v-if="item.caption" class="swiper__text">
              {{ item.caption }}
            </div>
          </template>
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
export default {
  name: 'Slider',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 56,
        speed: 1000,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        }
      }
    }
  },
  methods: {
    getClass (type) {
      switch (type) {
        case 'Culture':
          return 'orange'
        case 'Announcements':
          return 'blue'
        default:
          return 'green'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.inner .swiper-container
  padding 0 0 80px

.swiper-container
  padding 0 18px 80px

.swiper
  cursor grab

  &-slide
    width auto

  &__media
    cursor pointer
    margin-bottom 16px
    max-width 432px

  &__text
    cursor pointer
    position absolute
    bottom -55px
    left 0
    height 58px
</style>
