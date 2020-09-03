<template>
  <div class="intro">
    <ContentArea>
      <p class="intro__about large" @mouseleave="setBg()">
        We're a London-based creative production studio. We develop award-winning <nuxt-link class="link-orange" :to="{ name: 'film'}" @mouseenter.native="setBg('orange')">Films</nuxt-link>, <nuxt-link class="link-green" :to="{ name: 'events'}" @mouseenter.native="setBg('green')">Events</nuxt-link> and <nuxt-link class="link-blue" :to="{ name: 'design'}" @mouseenter.native="setBg('blue')">Design</nuxt-link>.
      </p>
      <div v-if="home && home.images" class="intro__images">
        <template v-if="screen === 'mobile'">
          <div v-for="(image, index) in home.images" :key="index" class="intro__image" :class="{ 'intro__image--active': index === 0 }" :style="`background-image:url('${setResponsive(image.url, 767)}')`">
            <img
              class="invisible"
              :src="setResponsive(home.images[0].url, 767)"
              @load="loaded($event)"
            >
          </div>
        </template>
        <video v-else-if="screen === 'desktop' && home.qvideo" loop muted autoplay>
          <source :src="home.qvideo.src" type="video/mp4">
        </video>
      </div>
      <div class="scrolldown-pos">
        <img
          class="scrolldown"
          src="/totop.svg"
          alt="Scroll down"
          title="Scroll down"
        >
      </div>
      <ColumnContainer v-if="home.counters" class="counter-container">
        <Column v-for="(counter, index) in home.counters" :key="index">
          <Counter :start-counter="startCounter" :data-val="counter.number" :val="counters[index]" :unit="counter.unit">
            {{ counter.text }}
          </Counter>
        </Column>
      </ColumnContainer>
    </ContentArea>
  </div>
</template>

<script>
import CounterMixin from '~/components/mixins/CounterMixin'
import { setResponsive } from '~/helpers/cdn'
export default {
  name: 'Introduction',
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
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
      rand: 0,
      screen: null,
      activeImage: 0
    }
  },
  mounted () {
    this.screen = window.innerWidth > 766 ? 'desktop' : 'mobile'
    window.addEventListener('scroll', () => {
      const video = document.querySelectorAll('.intro video')
      if (video) {
        video.forEach((e, i) => {
          if (e.getBoundingClientRect().top - window.innerHeight < -(e.offsetHeight / 2) && e.getBoundingClientRect().top + e.offsetHeight > (e.offsetHeight / 2)) {
            e.play()
          } else {
            e.pause()
          }
        })
      }
    })
    setInterval(() => {
      const images = document.querySelectorAll('.intro__image')
      const active = document.querySelector('.intro__image--active')
      if (active) {
        active.classList.remove('intro__image--active')
        this.activeImage++
        if (images[this.activeImage]) {
          images[this.activeImage].classList.add('intro__image--active')
        } else {
          images[0].classList.add('intro__image--active')
          this.activeImage = 0
        }
      }
    }, 5000)
  },
  methods: {
    loaded (e) {
      const path = e.path ? e.path[0] : e.srcElement || e.target
      setTimeout(() => {
        path.parentElement.classList.add('loaded')
      }, this.rand * 100)
      this.rand++
    },
    setBg (color) {
      const intro = document.querySelector('.intro')
      intro.classList.remove('intro--orange', 'intro--blue', 'intro--green')
      if (color) {
        intro.classList.add(`intro--${color}`)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.intro
  position relative
  z-index 2
  min-height 100vh
  background-color transparent
  transition 0.5s background-color $ease

  &--orange
    background-color #E6DDD5

  &--green
    background-color #DBDDCF

  &--blue
    background-color #DBDCE6

  &__about
    font-size 72px
    line-height 78px
    letter-spacing -1.25px
    max-width 1164px
    margin 0 auto
    padding 10vh 0 4vh

    @media (max-width $bp-md)
      font-size 56px
      line-height 62px

    @media (max-width $bp-sm)
      font-size 40px
      line-height 46px

    @media (max-width $bp-xs)
      padding 15vh 0 10vh

    a
      height 74px

      @media (max-width $bp-sm)
        height 52px

  &__images
    width 700px
    height 393px
    margin-left auto
    position relative
    overflow hidden

    @media (max-width $bp-md)
      width 550px
      height 309px

    @media (max-width $bp-sm)
      width 100%
      height 260px
      margin-bottom 7vh

    @media (max-width $bp-xs)
      width 100%
      height 215px

    video
      width 100%

  &__image
    width 100%
    height 100%
    background-size cover
    background-position 50%
    position absolute
    top 0
    left 0
    opacity 0
    transition opacity 1s $ease

    &--active.loaded
      opacity 1

.scrolldown-pos
  width 100%
  max-width 1164px
  margin 0 auto
  position relative
  bottom 24px

  @media (max-width $bp-sm)
    display none

.scrolldown
  transform rotateZ(180deg)

.counter-container .column
  padding 20vh 0 10vh

  @media (max-width $bp-sm)
    padding 20px 0

  >>> .counter__text
    color $black

.link-blue:after,
.link-green:after,
.link-orange:after
  bottom 0
  border-bottom 2px solid $blue

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
