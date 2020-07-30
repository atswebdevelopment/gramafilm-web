<template>
  <Banner
    v-if="design && design.image"
    :video="design.image.mime.includes('video')"
    :background="design.image.url"
    :class="{ 'banner--top': bannerTop, 'clickable': !bannerTop }"
    :hide-overflow="!bannerTop"
    black
    @click.native="!bannerTop && $nuxt.$router.push({ name: 'design' })"
  >
    <div v-if="!bannerTop" class="banner__next">
      Next
    </div>
    <h1>Design</h1>
    <div v-if="design.headerimage1" class="banner__item banner__item--4" data-rellax-speed="-3">
      <div class="banner__media">
        <div class="banner__image" :style="`background-image:url(${design.headerimage1.url})`" />
      </div>
    </div>
    <div v-if="design.headerimage2" class="banner__item banner__item--1" data-rellax-speed="3">
      <div class="banner__media">
        <div class="banner__image" :style="`background-image:url(${design.headerimage2.url})`" />
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
    design: {
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
        new Rellax('.banner--top .banner__item--4', {})
        new Rellax('.banner--top .banner__item--1', {})
      }
      this.$store.commit('showcase/setDesign', this.design)
    }, 200)
  }
}
</script>
