<template>
  <div class="intro">
    <div v-if="home && home.images" class="intro__backgrounds">
      <div class="intro__background">
        <div class="intro__image-container intro__image-container--1">
          <img
            v-if="home.images[0] && !home.images[0].mime.includes('video')"
            class="intro__image intro__image--image-1"
            :src="setResponsive(home.images[0].url, 767)"
            :alt="home.images[0].alternativeText"
            data-rellax-speed="-6"
            @load="loaded($event)"
          >
          <video
            v-else-if="home.images[0] && home.images[0].mime.includes('video')"
            class="intro__image intro__image--image-1"
            loop
            muted
            autoplay
            data-rellax-speed="-6"
          >
            <source :src="home.images[0].url" type="video/mp4">
          </video>
        </div>
        <div class="intro__image-container intro__image-container--5">
          <img
            v-if="home.images[4] && !home.images[4].mime.includes('video')"
            class="intro__image intro__image--image-5"
            :src="setResponsive(home.images[4].url, 767)"
            :alt="home.images[4].alternativeText"
            data-rellax-speed="1"
            @load="loaded($event)"
          >
          <video
            v-else-if="home.images[4] && home.images[4].mime.includes('video')"
            class="intro__image intro__image--image-5"
            loop
            muted
            autoplay
            data-rellax-speed="1"
          >
            <source :src="home.images[4].url" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="intro__background intro__background--2">
        <div class="intro__image-container intro__image-container--3">
          <img
            v-if="home.images[2] && !home.images[2].mime.includes('video')"
            class="intro__image intro__image--image-3"
            :src="setResponsive(home.images[2].url, 767)"
            :alt="home.images[2].alternativeText"
            data-rellax-speed="-1"
            @load="loaded($event)"
          >
          <video
            v-else-if="home.images[2] && home.images[2].mime.includes('video')"
            class="intro__image intro__image--image-3"
            loop
            muted
            autoplay
            data-rellax-speed="-3"
          >
            <source :src="home.images[2].url" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="intro__background intro__background--3">
        <div class="intro__image-container intro__image-container--2">
          <img
            v-if="home.images[1] && !home.images[1].mime.includes('video')"
            class="intro__image intro__image--image-2"
            :src="setResponsive(home.images[1].url, 767)"
            :alt="home.images[1].alternativeText"
            data-rellax-speed="3"
            @load="loaded($event)"
          >
          <video
            v-else-if="home.images[1] && home.images[1].mime.includes('video')"
            class="intro__image intro__image--image-2"
            loop
            muted
            autoplay
            data-rellax-speed="3"
          >
            <source :src="home.images[1].url" type="video/mp4">
          </video>
        </div>
        <div class="intro__image-container intro__image-container--4">
          <img
            v-if="home.images[3] && !home.images[3].mime.includes('video')"
            class="intro__image intro__image--image-4"
            :src="setResponsive(home.images[3].url, 767)"
            :alt="home.images[3].alternativeText"
            data-rellax-speed="1"
            @load="loaded($event)"
          >
          <video
            v-else-if="home.images[3] && home.images[3].mime.includes('video')"
            class="intro__image intro__image--image-4"
            loop
            muted
            autoplay
            data-rellax-speed="1"
          >
            <source :src="home.images[3].url" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
    <Logo class="intro__logo" color="white" />
    <p class="intro__subtitle">
      {{ home.subtitle }}
    </p>
    <p class="intro__about large">
      We're a London-based creative production studio. We develop award-winning <nuxt-link class="link-green" :to="{ name: 'film'}">Films</nuxt-link>, <nuxt-link class="link-blue" :to="{ name: 'events'}">Events</nuxt-link> and <nuxt-link class="link-orange" :to="{ name: 'design'}">Design</nuxt-link>.
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
import { setResponsive } from '~/helpers/cdn'
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
  data () {
    return {
      setResponsive,
      rand: 0
    }
  },
  methods: {
    loaded (e) {
      const path = e.path ? e.path[0] : e.srcElement || e.target
      new Rellax(path, {})
      setTimeout(() => {
        path.classList.add('loaded')
      }, this.rand * 100)
      this.rand++
    }
  }
}
</script>

<style lang="stylus" scoped>
.intro
  text-align center
  color $white
  position relative
  z-index 2
  padding 0 18px
  min-height 100vh

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
    padding-bottom 85vh

    @media (max-width $bp-sm)
      font-size 24px
      line-height 30px
      letter-spacing -1px
      padding-bottom 45vh

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
    transform-origin 50vw 50vh

  &__image-container
    position absolute
    top 0
    left calc(50% - 160px)
    width 320px

    img
      opacity 0
      transition opacity 2s $ease

      &.loaded
        opacity 1

    @media (max-width $bp-sm)
      transform scale(0.5) !important
      transform-origin 0 0

    &--1
      left calc(50% - 225px)
      width 450px
      margin-left -329px

      @media (max-width $bp-sm)
        left 18px
        margin-left 0

    &--2
      margin-left 400px
      top 20vh

      @media (max-width $bp-sm)
        left auto
        right 0
        margin 0 18px 0 0
        transform-origin 100% 0

    &--3
      margin-left -280px
      top 74vh

      @media (max-width $bp-sm)
        margin 0
        left 0
        top 80vh

    &--4
      margin-left -500px
      top 85vh

      @media (max-width $bp-sm)
        margin 0
        left 100px
        top 74vh

    &--5
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

.counter-container .column
  padding-left 0
  padding-right 0

  >>> .counter__text
    color $white

.link-blue:after,
.link-green:after,
.link-orange:after
  bottom 20px
  border-bottom 1px solid $blue

  @media (max-width $bp-sm)
    bottom 12px

.link-green:after
  border-color $green

.link-orange:after
  border-color $orange

.link-blue:hover
  color $blue

.link-green:hover
  color $green

.link-orange:hover
  color $orange
</style>
