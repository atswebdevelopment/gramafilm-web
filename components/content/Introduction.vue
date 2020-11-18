<template>
  <div>
    <div class="splash" :class="{ 'loaded': loaded, 'ready': ready, 'introVideoLoaded': introVideoLoaded }" @click="loadIntroVideo()">
      <div class="splash__title">Producing the extraordinary</div>
      <div class="scrolldown-pos">
        <img
          class="scrolldown"
          src="/totop.svg"
          alt="Scroll down"
          title="Scroll down"
        >
      </div>
      <video v-if="!introVideoLoaded" class="splash__video" loop muted>
        <source src="https://player.vimeo.com/external/480858453.hd.mp4?s=550ba27914dd2cd96eff1865bd10362bdc7aeca2&profile_id=175" type="video/mp4">
      </video>
      <Video v-if="home && home.introvideo && introVideoLoaded" :video="home.introvideo" play fullscreen class="splash__introvideo" />
    </div>
    <div class="intro">
      <ContentArea>
        <p class="intro__about large" @mouseleave="setBg()">
          We're a London-based creative production studio. We develop award-winning <nuxt-link class="link-orange" :to="{ name: 'film'}">Films</nuxt-link>, <nuxt-link class="link-green" :to="{ name: 'events'}">Events</nuxt-link> and <nuxt-link class="link-blue" :to="{ name: 'design'}">Design</nuxt-link>.
        </p>
        <!-- <div v-if="home && home.images" class="intro__images">
          <template v-if="screen === 'mobile'">
            <div v-for="(image, index) in home.images" :key="index" class="intro__image" :class="{ 'intro__image--active': index === 0 }" :style="`background-image:url('${setResponsive(image.url, 767)}')`">
              <img
                class="invisible"
                :src="setResponsive(home.images[0].url, 767)"
                @load="load($event)"
              >
            </div>
          </template>
          <video v-else-if="screen === 'desktop' && home.qvideo" loop muted autoplay>
            <source :src="home.qvideo.src" type="video/mp4">
          </video>
        </div>
        <ColumnContainer v-if="home.counters" class="counter-container">
          <Column v-for="(counter, index) in home.counters" :key="index">
            <Counter :start-counter="startCounter" :data-val="counter.number" :val="counters[index]" :unit="counter.unit">
              {{ counter.text }}
            </Counter>
          </Column>
        </ColumnContainer> -->
      </ContentArea>
    </div>
  </div>
</template>

<script>
import CounterMixin from '~/components/mixins/CounterMixin'
import { setResponsive } from '~/helpers/cdn'
export default {
  name: 'Introduction',
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Video: () => import('~/components/content/Video')
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
      ready: false,
      loaded: false,
      activeImage: 0,
      introVideoLoaded: false
    }
  },
  mounted () {
    this.loaded = true
    setTimeout(() => {
      const introVideo = document.querySelector('.splash__video')
      introVideo.play()
      this.ready = true
    }, 1800)
    setTimeout(() => {
      const introTitle = document.querySelector('.splash__title')
      introTitle.classList.add('splash__title--finished')
    }, 3000)
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
    load (e) {
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
    },
    loadIntroVideo () {
      this.introVideoLoaded = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.splash
  min-height 100vh
  background-color $tertiary
  position relative
  z-index 2
  display flex
  align-items center
  justify-content center

  &.ready
    cursor url('/cursor-play.png'), auto

  &__title
    text-align center
    font-size 112px
    line-height 120px
    max-width 800px
    padding 0 20px
    position relative
    z-index 2
    opacity 0
    transform translateY(-20px)
    transition all 1s linear
    transition-delay 0.6s

    @media (max-width $bp-md)
      font-size 96px
      line-height 104px

    @media (max-width $bp-sm)
      font-size 56px
      line-height 62px

    @media (max-width $bp-xs)
      font-size 50px
      line-height 56px

    &--finished
      opacity 0 !important

      @media (max-width $bp-sm)
        opacity 1 !important

  &__introvideo.video,
  &__video
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    opacity 0
    transition-delay 1.8s

  &__introvideo.video
    opacity 1
    z-index 2

.scrolldown-pos
  width 100%
  max-width 1164px
  position absolute
  bottom 40px
  left 50%
  margin-left -12px
  transform translateY(-20px)
  opacity 0
  transition opacity 0.8s linear, transform 0.8s cubic-bezier(.78,2.37,.51,-0.48)
  transition-delay 1s
  z-index 1

.scrolldown
  transform rotateZ(180deg)

.loaded
  .splash__video
    opacity 1

  .splash__title
    opacity 1
    transform translateY(0px)

  .scrolldown-pos
    opacity 1
    transform translateY(0px)

.splash.ready.introVideoLoaded
  cursor url('/cursor-pause.png'), auto

.intro
  &__about
    font-size 72px
    line-height 78px
    letter-spacing -1.25px
    max-width 1200px
    padding 132px 0 42px

    @media (max-width $bp-md)
      font-size 56px
      line-height 62px
      padding 80px 0 0

    @media (max-width $bp-sm)
      font-size 40px
      line-height 46px

    @media (max-width $bp-xs)
      padding 30px 0 0

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
