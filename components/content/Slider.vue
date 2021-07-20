<template>
  <div>
    <client-only>
      <splide v-if="items.length" ref="carousel" class="swiper" :options="options">
        <splide-slide
          v-for="(item, index) in items"
          :key="`${index}`"
          v-bind-data-index="index"
        >
          <a class="link" :href="sliderHref(item)" />
          <template v-if="item.image">
            <div class="swiper__media">
              <img
                v-if="item.image"
                :src="setResponsive(item.image.url, 767)"
                :alt="item.image.alternativeText || ''"
              >
            </div>
            <div v-if="item.introduction" class="swiper__text">
              <span
                class="title"
                :data-url="item.url"
                data-type="magazine-id"
              >{{ item.title }}</span>
              <span>{{ item.introduction }}</span>
            </div>
            <div v-else class="swiper__text">
              <span
                v-if="item.category"
                :class="getClass(item.category.name)"
              >
                {{ item.category.name }}
              </span> {{ item.title }}
            </div>
          </template>
          <template v-else-if="item.title">
            <div class="swiper__media">
              <img
                v-if="item.thumbnailimage && item.thumbnailimage.url"
                :src="setResponsive(item.thumbnailimage.url, 767)"
                :alt="item.thumbnailimage.alternativeText || ''"
              >
              <img
                v-else-if="item.thumbnail && item.thumbnail.url && !item.thumbnail.mime.includes('video')"
                :src="setResponsive(item.thumbnail.url, 767)"
                :alt="item.thumbnail.alternativeText || ''"
              >
            </div>
            <div
              v-if="item.title"
              class="swiper__text"
            >
              <span
                v-if="item.type"
                :class="getClass(item.type)"
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
        </splide-slide>
      </splide>
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
      options: {
        type: 'loop',
        gap: window && window.innerWidth < 767 ? '1rem' : '2rem',
        autoWidth: true,
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        pauseOnFocus: true,
        pagination: false,
        arrows: false
      },
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
    sliderHref (e) {
      const type = e.introduction ? 'magazine' : e.category ? 'journal' : 'work'
      return '/' + type + '/' + e.url
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

.splide
  padding 0 0 80px
  overflow visible

  >>> .splide__track
    overflow visible

  &__slide
    @media (max-width $bp-sm)
      max-width 80vw

.swiper
  cursor grab

  &__media
    margin-bottom 16px
    max-width 432px
    min-width 200px

  &__text
    max-width 432px

.link
  cursor pointer
  position absolute
  top 0
  left 0
  width 100%
  height 100%

.title
  font-family $fontFamilySteiner
  font-size 30px
  line-height 38px
  display block
  margin-bottom 20px
</style>
