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
            <div class="swiper__media link" @click="$nuxt.$router.push({ name: 'journal-id', params: { id: item.url } })">
              <img v-if="item.image" data-not-lazy :src="setResponsive(item.image.url, 767)" :alt="item.image.alternativeText || ''">
            </div>
            <div class="swiper__text link" @click="$nuxt.$router.push({ name: 'journal-id', params: { id: item.url } })">
              <span v-if="item.category" :class="getClass(item.category.name)">{{ item.category.name }}</span> {{ item.title }}
            </div>
          </template>
          <template v-else-if="item.caption || item.caption === ''">
            <div class="swiper__media">
              <img v-if="item.url" data-not-lazy :src="setResponsive(item.url, 767)" :alt="item.alternativeText || ''">
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
import { setResponsive } from '~/helpers/cdn'
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
      setResponsive,
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
.inner .swiper-container,
.casestudy .swiper-container
  padding 0 0 80px

.swiper-container
  padding 0 18px 80px
  overflow visible

.swiper
  cursor grab

  &-slide
    width auto

    @media (max-width $bp-sm)
      max-width 80%

  &__media
    margin-bottom 16px
    max-width 432px

  &__text
    position absolute
    bottom -55px
    left 0
    height 58px

.link
  cursor pointer
</style>
