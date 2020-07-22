<template>
  <Banner
    v-if="events && events.image"
    :video="events.image.mime.includes('video')"
    :background="events.image.url"
    :class="{ 'banner--top': bannerTop, 'clickable': !bannerTop }"
    :hide-overflow="!bannerTop"
    @click.native="!bannerTop && $nuxt.$router.push({ name: 'events' })"
  >
    <h1>Events</h1>
    <div v-if="events.headerimage1" class="banner__item banner__item--3" data-rellax-speed="-3">
      <div class="banner__media">
        <div class="banner__image" :style="`background-image:url(${events.headerimage1.url})`" />
      </div>
    </div>
    <div v-if="events.headerimage2" class="banner__item banner__item--1" data-rellax-speed="3">
      <div class="banner__media">
        <div class="banner__image" :style="`background-image:url(${events.headerimage2.url})`" />
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
    events: {
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
      if (this.bannerTop) {
        new Rellax('.banner--top .banner__item--3', {})
        new Rellax('.banner--top .banner__item--1', {})
      }
      this.$store.commit('showcase/setEvents', this.events)
    }, 200)
  }
}
</script>
