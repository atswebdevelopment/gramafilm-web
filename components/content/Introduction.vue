<template>
  <div>
    <div class="splash" :class="{ 'loaded': loaded, 'ready': ready, 'introVideoLoaded': introVideoLoaded }" @click="loadIntroVideo()">
      <div class="splash__title">
        <img src="/logo-white.svg" alt="Gramafilm logo">
      </div>
      <div class="scrolldown-pos">
        <img
          class="scrolldown"
          src="/totop.svg"
          alt="Scroll down"
          title="Scroll down"
        >
      </div>
      <video v-if="!introVideoLoaded" class="splash__video" loop muted playsinline>
        <source :src="introVideo" type="video/mp4">
      </video>
      <Video v-if="home && home.introvideo && introVideoLoaded" :video="home.introvideo" play fullscreen class="splash__introvideo" />
    </div>
    <div class="intro">
      <ContentArea>
        <p class="intro__about large">
          We're a London-based creative production studio. We develop <nuxt-link class="link-orange" :to="{ name: 'film' }">Films</nuxt-link>, <nuxt-link class="link-green" :to="{ name: 'events' }">Events</nuxt-link> and <nuxt-link class="link-blue" :to="{ name: 'design' }">Design</nuxt-link>.
        </p>
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
      introVideoLoaded: false,
      introVideo: null
    }
  },
  mounted () {
    this.loaded = true
    this.introVideo = window.innerWidth < 1024 ? 'https://player.vimeo.com/external/498070607.hd.mp4?s=df7a7f2b9890ab8fd95a9c3473c17dc976b157e1&profile_id=174' : 'https://player.vimeo.com/external/498072218.hd.mp4?s=3c9c382fe0cc07a8d4dd22b387112cd1d10c1a20&profile_id=175'
    setTimeout(() => {
      const introVideo = document.querySelector('.splash__video')
      if (introVideo) {
        introVideo.play()
        this.ready = true
      }
    }, 1800)
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
    document.onkeydown = (event) => {
      event = event || window.event
      if (event.keyCode === 27) {
        this.introVideoLoaded = false
        setTimeout(() => {
          const introVideo = document.querySelector('.splash__video')
          introVideo.play()
        }, 100)
      }
    }
  },
  methods: {
    load (e) {
      const path = e.path ? e.path[0] : e.srcElement || e.target
      setTimeout(() => {
        path.parentElement.classList.add('loaded')
      }, this.rand * 100)
      this.rand++
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
  justify-content left
  overflow hidden

  &.ready
    cursor url('/cursor-play.svg'), auto

  &__title
    text-align left
    font-size 56px
    line-height 62px
    padding 0 58px
    position relative
    width calc(100% - 116px)
    flex-shrink 0
    max-width 1684px
    margin 0 auto
    z-index 2
    opacity 0
    transform translateY(-20px)
    transition opacity 1s linear, transform 1s linear
    transition-delay 0.6s

    @media (max-width $bp-md)
      font-size 50px
      line-height 56px

    @media (max-width $bp-sm)
      padding 0 20px
      width calc(100% - 40px)
      font-size 40px
      line-height 46px

    @media (max-width $bp-xs)
      font-size 34px
      line-height 40px

    &:after
      @media (max-width $bp-sm)
        content ''
        display block
        width 48px
        height 48px
        background url('/cursor-play.svg')
        background-size 48px
        position absolute
        left 50%
        margin-left -24px
        bottom -80px

    img
      width 510px
      margin 0 auto

    .logo
      width 510px
      height 124px
      margin 0 auto

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

  &__video
    width: 177.77777778vh; /* 100 * 16 / 9 */
    min-width: 100%;
    min-height: 56.25vw; /* 100 * 9 / 16 */
    left: 50%; /* % of surrounding element */
    top: 50%;
    transform: translate(-50%, -50%); /* % of current element */

  &__introvideo.video
    opacity 1
    z-index 2

    @media (max-width $bp-sm)
      height 100% !important
      padding 0 !important

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

  @media (max-width $bp-sm)
    bottom 70px

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
  cursor auto

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

.link-blue,
.link-green,
.link-orange
  text-decoration none

.link-blue:after,
.link-green:after,
.link-orange:after
  bottom -4px
  border-bottom 2px solid $blue

  @media (max-width $bp-md)
    bottom 10px

  @media (max-width $bp-sm)
    bottom 6px

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
