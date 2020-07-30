
<template>
  <Banner
    v-if="film && film.image"
    :video="film.image.mime.includes('video')"
    :background="film.image.url"
    :class="{ 'banner--top': bannerTop, 'banner--bottom clickable': !bannerTop }"
    :hide-overflow="!bannerTop"
    @click.native="!bannerTop && $nuxt.$router.push({ name: 'film' })"
  >
    <div v-if="!bannerTop" class="banner__next">
      Next
    </div>
    <h1>Film</h1>
    <div v-if="film.headerimage1" class="banner__item banner__item--2" data-rellax-speed="-3">
      <div class="banner__media">
        <div class="banner__image" :style="`background-image:url(${film.headerimage1.url})`" />
      </div>
    </div>
    <div v-if="film.headerimage2" class="banner__item banner__item--1" data-rellax-speed="3">
      <div class="banner__media">
        <div class="banner__image" :style="`background-image:url(${film.headerimage2.url})`" />
      </div>
    </div>
  </Banner>
</template>

<script>
import Rellax from 'rellax'
export default {
  components: {
    Banner: () => import('~/components/content/Banner')
  },
  props: {
    film: {
      type: Object,
      default: () => {}
    },
    bannerTop: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.bannerTop && window.innerWidth > 1023) {
        new Rellax('.banner--top .banner__item--2', {})
        new Rellax('.banner--top .banner__item--1', {})
      }
      this.$store.commit('showcase/setFilm', this.film)
    }, 200)
  }
}
</script>
