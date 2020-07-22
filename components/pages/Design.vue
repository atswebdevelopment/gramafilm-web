<template>
  <Showcase>
    <Banner v-if="design.image" :video="design.image.mime.includes('video')" :background="design.image.url" black class="banner--top">
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
    <ContentArea overflow>
      <div class="large" v-html="design.introduction" />
      <ColumnContainer v-if="design.counters" class="blue counter-container">
        <Column v-for="(counter, index) in design.counters" :key="index">
          <Counter :start-counter="startCounter" :data-val="counter.number" :val="counters[index]" :unit="counter.unit">
            {{ counter.text }}
          </Counter>
        </Column>
      </ColumnContainer>
      <Modules :modules="design.modules" />
    </ContentArea>
    <GetInTouch footer-links />
    <Banner
      v-if="film.image"
      class="clickable"
      :video="film.image.mime.includes('video')"
      :background="film.image.url"
      hide-overflow
      @click.native="$nuxt.$router.push({ name: 'film' })"
    >
      <h1>Film</h1>
      <div v-if="film.headerimage1" class="banner__item banner__item--2">
        <div class="banner__media">
          <div class="banner__image" :style="`background-image:url(${film.headerimage1.url})`" />
        </div>
      </div>
      <div v-if="film.headerimage2" class="banner__item banner__item--1">
        <div class="banner__media">
          <div class="banner__image" :style="`background-image:url(${film.headerimage2.url})`" />
        </div>
      </div>
    </Banner>
  </Showcase>
</template>

<script>
import Rellax from 'rellax'
import CounterMixin from '~/components/mixins/CounterMixin'
import fadeIn from '~/helpers/fadeIn'
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
    design: {
      type: Object,
      default: () => {}
    },
    film: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    setTimeout(() => {
      new Rellax('.banner--top .banner__item--4', {})
      new Rellax('.banner--top .banner__item--1', {})
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
    fadeIn()
  }
}
</script>

<style lang="stylus" scoped>
>>> .large p a:after
  border-bottom 1px solid $blue
</style>
