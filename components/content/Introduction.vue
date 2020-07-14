<template>
  <div class="intro">
    <!-- <div class="intro" @mousemove="moveBackground"> -->
    <div class="intro__background">
      <img v-if="home.images[0] && !home.images[0].mime.includes('video')" class="intro__image intro__image--image-1" :src="home.images[0].url" :alt="home.images[0].alternativeText" data-rellax-speed="-6">
      <video v-else-if="home.images[0] && home.images[0].mime.includes('video')" class="intro__image intro__image--image-1" loop muted autoplay>
        <source :src="home.images[0].url" type="video/mp4">
      </video>
      <img v-if="home.images[4] && !home.images[4].mime.includes('video')" class="intro__image intro__image--image-5" :src="home.images[4].url" :alt="home.images[4].alternativeText" data-rellax-speed="-3">
      <video v-else-if="home.images[4] && home.images[4].mime.includes('video')" class="intro__image intro__image--image-5" loop muted autoplay>
        <source :src="home.images[4].url" type="video/mp4">
      </video>
      <img v-if="home.images[5] && !home.images[5].mime.includes('video')" class="intro__image intro__image--image-6" :src="home.images[5].url" :alt="home.images[5].alternativeText" data-rellax-speed="6">
      <video v-else-if="home.images[5] && home.images[5].mime.includes('video')" class="intro__image intro__image--image-6" loop muted autoplay>
        <source :src="home.images[5].url" type="video/mp4">
      </video>
    </div>
    <div class="intro__background intro__background--2">
      <img v-if="home.images[2] && !home.images[2].mime.includes('video')" class="intro__image intro__image--image-3" :src="home.images[2].url" :alt="home.images[2].alternativeText" data-rellax-speed="-3">
      <video v-else-if="home.images[2] && home.images[2].mime.includes('video')" class="intro__image intro__image--image-3" loop muted autoplay>
        <source :src="home.images[2].url" type="video/mp4">
      </video>
    </div>
    <div class="intro__background intro__background--3">
      <img v-if="home.images[1] && !home.images[1].mime.includes('video')" class="intro__image intro__image--image-2" :src="home.images[1].url" :alt="home.images[1].alternativeText" data-rellax-speed="3">
      <video v-else-if="home.images[1] && home.images[1].mime.includes('video')" class="intro__image intro__image--image-2" loop muted autoplay>
        <source :src="home.images[1].url" type="video/mp4">
      </video>
      <img v-if="home.images[3] && !home.images[3].mime.includes('video')" class="intro__image intro__image--image-4" :src="home.images[3].url" :alt="home.images[3].alternativeText" data-rellax-speed="1">
      <video v-else-if="home.images[3] && home.images[3].mime.includes('video')" class="intro__image intro__image--image-4" loop muted autoplay>
        <source :src="home.images[3].url" type="video/mp4">
      </video>
    </div>
    <Logo class="intro__logo" color="white" />
    <p class="intro__subtitle">
      {{ home.subtitle }}
    </p>
    <p class="intro__about large">
      We are a global creative agency, creating beautiful <nuxt-link class="link-green" :to="{ name: 'film'}">Film</nuxt-link>, memorable <nuxt-link class="link-blue" :to="{ name: 'events'}">Events</nuxt-link> and impactful <nuxt-link class="link-orange" :to="{ name: 'design'}">Design</nuxt-link>.
    </p>
    <ColumnContainer v-if="home.counters" class="counter-container">
      <Column v-for="(counter, index) in home.counters" :key="index">
        <Counter :start-counter="startCounter" :data-val="counter.number" :val="counters[index]" :unit="counter.unit">
          {{ counter.text }}
        </Counter>
      </Column>
    </ColumnContainer>
  </div>
</template>

<script>
import Rellax from 'rellax'
import CounterMixin from '~/components/mixins/CounterMixin'
export default {
  name: 'Introduction',
  components: {
    Logo: () => import('~/components/content/Logo'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column'),
    Counter: () => import('~/components/content/Counter')
  },
  mixins: [CounterMixin],
  props: {
    home: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    new Rellax('.intro__image--image-1', {})
    new Rellax('.intro__image--image-2', {})
    new Rellax('.intro__image--image-3', {})
    new Rellax('.intro__image--image-4', {})
    new Rellax('.intro__image--image-5', {})
    new Rellax('.intro__image--image-6', {})
  }
  // methods: {
  //   moveBackground (e) {
  //     const bg = document.querySelector('.intro__background')
  //     const bg2 = document.querySelector('.intro__background--2')
  //     const bg3 = document.querySelector('.intro__background--3')
  //     const centerX = window.innerWidth / 2
  //     const centerY = window.innerHeight / 2
  //     if (this.isTimeToUpdate()) {
  //       bg.style.transform = `translate(${((centerX - e.clientX) / 10)}px,${((centerY - e.clientY) / 10)}px)`
  //       bg2.style.transform = `translate(${((centerX - e.clientX) / 5)}px,${((centerY - e.clientY) / 5)}px)`
  //       bg3.style.transform = `translate(${((centerX - e.clientX) / 7)}px,${((centerY - e.clientY) / 7)}px)`
  //     }
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
.intro
  background $primary
  text-align center
  color $white
  position relative
  z-index 2
  padding 0 18px

  &__logo.logo
    padding 40vh 0 0
    margin 0 auto
    width 595px
    height 147.18px

    @media (max-width $bp-sm)
      width 291.51px
      height 70.52px

  &__subtitle
    font-size 48px
    line-height 54px
    letter-spacing -1.5px
    padding-bottom 75vh

    @media (max-width $bp-sm)
      font-size 24px
      line-height 30px
      letter-spacing -1px

  &__about
    font-size 72px
    line-height 78px
    letter-spacing -2.25px
    max-width 1164px
    margin 0 auto
    padding-bottom 25vh

    @media (max-width $bp-sm)
      font-size 48px
      line-height 56px
      letter-spacing -1.25px
      padding-bottom 10vh

  &__background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    transition transform 0.4s

  &__image
    position absolute
    top 0
    left calc(50% - 160px)
    width 320px

    @media (max-width $bp-sm)
      transform scale(0.5) !important
      transform-origin 0 0

    &--image-1
      left calc(50% - 225px)
      width 450px
      margin-left -329px

      @media (max-width $bp-sm)
        left 18px
        margin-left 0

    &--image-2
      margin-left 400px
      top 20vh

      @media (max-width $bp-sm)
        left auto
        right 0
        margin 0 18px 0 0
        transform-origin 100% 0

    &--image-3
      margin-left -280px
      top 74vh

      @media (max-width $bp-sm)
        margin 0
        left 0
        top 80vh

    &--image-4
      margin-left -500px
      top 85vh

      @media (max-width $bp-sm)
        margin 0
        left 100px
        top 74vh

    &--image-5
      left calc(50% - 272px)
      width 544px
      margin-left 395px
      top 74vh

      @media (max-width $bp-sm)
        margin 0
        left auto
        right 0
        top 60vh
        transform-origin 100% 0

    &--image-6
      left calc(50% - 265px)
      width 530px
      top 100vh
      margin-left 15vw

      @media (max-width $bp-sm)
        display none

.counter-container .column
  padding-left 0
  padding-right 0

  >>> .counter__text
    color $white

.link-blue:after
  bottom 34px
  border-bottom 1px solid $blue

.link-green:after
  bottom 34px
  border-bottom 1px solid $green

.link-orange:after
  bottom 34px
  border-bottom 1px solid $orange
</style>
