<template>
  <div>
    <client-only>
      <swiper
        v-if="items.length"
        ref="carousel"
        class="swiper"
        :options="swiperOptions"
        @click="sliderClicked"
      >
        <swiper-slide
          v-for="(item, index) in items"
          :key="`${index}`"
          v-bind-data-index="index"
        >
          <template v-if="item.image">
            <div class="swiper__media link">
              <img
                v-if="item.image"
                :src="setResponsive(item.image.url, 767)"
                :alt="item.image.alternativeText || ''"
                :data-url="item.url"
                data-type="journal-id"
              >
            </div>
            <div class="swiper__text link">
              <span
                v-if="item.category"
                :class="getClass(item.category.name)"
                :data-url="item.url"
                data-type="journal-id"
              >
                {{ item.category.name }}
              </span> {{ item.title }}
            </div>
          </template>
          <template v-else-if="item.title">
            <div class="swiper__media link">
              <img
                v-if="item.thumbnailimage && item.thumbnailimage.url"
                :src="setResponsive(item.thumbnailimage.url, 767)"
                :alt="item.thumbnailimage.alternativeText || ''"
                :data-url="item.url"
                data-type="work-id"
              >
              <img
                v-else-if="item.thumbnail && item.thumbnail.url && !item.thumbnail.mime.includes('video')"
                :src="setResponsive(item.thumbnail.url, 767)"
                :alt="item.thumbnail.alternativeText || ''"
                :data-url="item.url"
                data-type="work-id"
              >
            </div>
            <div
              v-if="item.title"
              class="swiper__text link"
            >
              <span
                v-if="item.type"
                :class="getClass(item.type)"
                :data-url="item.url"
                data-type="work-id"
              >
                {{ capitalize(item.type) }}
              </span> {{ item.title }}
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
        <swiper-slide v-if="seeMore">
          <div class="work__link">
            <nuxt-link class="arrowLink" :to="{ name: 'work' }">
              See more
            </nuxt-link>
          </div>
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
    },
    seeMore: {
      type: Boolean,
      default: false
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
      case 'film':
        return 'orange'
      case 'Announcements':
        return 'blue'
      case 'design':
        return 'blue'
      default:
        return 'green'
      }
    },
    capitalize (text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
    sliderClicked (e) {
      const type = e.target.getAttribute('data-type')
      const url = e.target.getAttribute('data-url')
      this.$router.push({ name: type, params: { id: url } })
    }
  }
}
</script>

<style lang="stylus" scoped>
.work__link
  margin 120px 20px 0

.inner .swiper-container,
.casestudy .swiper-container
  padding 0 0 80px

  @media (max-width $bp-sm)
    padding 0 0 20px

.swiper-container
  padding 0 18px 80px
  overflow visible

.swiper
  cursor grab

  &-slide
    width auto
    margin-right 56px

    @media (max-width $bp-sm)
      max-width 80%

  &__media
    margin-bottom 16px
    max-width 432px
    min-width 200px

  &__text
    position absolute
    bottom -55px
    left 0
    height 58px

.link
  cursor pointer
</style>
