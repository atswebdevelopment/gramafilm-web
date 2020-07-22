<template>
  <Showcase>
    <Banner v-if="events.image" :video="events.image.mime.includes('video')" :background="events.image.url" class="banner--top">
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
    <ContentArea overflow>
      <div class="large" v-html="events.introduction" />
      <ColumnContainer v-if="events.counters" class="orange counter-container">
        <Column v-for="(counter, index) in events.counters" :key="index">
          <Counter :start-counter="startCounter" :data-val="counter.number" :val="counters[index]" :unit="counter.unit">
            {{ counter.text }}
          </Counter>
        </Column>
      </ColumnContainer>
    </ContentArea>
    <Modules :modules="events.modules" />
    <GetInTouch footer-links />
    <Banner
      v-if="design.image"
      class="clickable"
      :video="design.image.mime.includes('video')"
      :background="design.image.url"
      hide-overflow
      black
      @click.native="$nuxt.$router.push({ name: 'design' })"
    >
      <h1>Design</h1>
      <div v-if="design.headerimage1" class="banner__item banner__item--4">
        <div class="banner__media">
          <div class="banner__image" :style="`background-image:url(${design.headerimage1.url})`" />
        </div>
      </div>
      <div v-if="design.headerimage2" class="banner__item banner__item--1">
        <div class="banner__media">
          <div class="banner__image" :style="`background-image:url(${design.headerimage2.url})`" />
        </div>
      </div>
    </Banner>
  </Showcase>
</template>

<script>
import Rellax from 'rellax'
import CounterMixin from '~/components/mixins/CounterMixin'
export default {
  components: {
    Showcase: () => import('~/components/layout/Showcase'),
    ContentArea: () => import('~/components/layout/ContentArea'),
    Banner: () => import('~/components/content/Banner'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column'),
    Counter: () => import('~/components/content/Counter'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Modules: () => import('~/components/content/Modules')
  },
  mixins: [CounterMixin],
  props: {
    events: {
      type: Object,
      default: () => {}
    },
    design: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    setTimeout(() => {
      new Rellax('.banner--top .banner__item--3', {})
      new Rellax('.banner--top .banner__item--1', {})
      this.$store.commit('header/setDefaultColor', 'white')
    }, 200)
  }
}
</script>

<style lang="stylus" scoped>
>>> .large p a:after
  border-bottom 1px solid $orange
</style>
