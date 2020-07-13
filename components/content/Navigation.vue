<template>
  <div class="navigation" :class="{ 'navigation--open': show }">
    <div class="backgrounds">
      <div v-for="(item, index) in menu.navigation" :key="index" class="backgrounds__background" :style="`background-image:url(${(item.background && !item.background.mime.includes('video') && item.background.url) || ''})`">
        <div v-if="item.background && item.background.mime.includes('video')" class="backgrounds__video">
          <video loop muted>
            <source :src="item.background.url" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
    <ContentArea fullscreen center>
      <div class="navigation__links">
        <nuxt-link
          v-for="(item, index) in menu.navigation"
          :key="index"
          :to="item.route"
          class="navigation__link"
          :class="{ 'navigation__link--home': item.route === '/' }"
          @click.native="closeMenu"
        >
          {{ item.title }}
        </nuxt-link>
      </div>
      <FooterLinks />
    </ContentArea>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    FooterLinks: () => import('~/components/content/FooterLinks')
  },
  props: {
    menu: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show (val) {
      const video = document.querySelector('.backgrounds__background--active video')
      if (video) {
        if (val) {
          document.querySelector('.backgrounds__background--active video').play()
        } else {
          document.querySelector('.backgrounds__background--active video').pause()
        }
      }
    }
  },
  mounted () {
    this.ready()
  },
  methods: {
    ready () {
      if (!document.querySelectorAll('.navigation__link').length > 0) {
        setTimeout(() => {
          this.ready()
        }, 100)
        return
      }
      let activeIndex = 0
      const navigationObj = document.querySelectorAll('.navigation')
      navigationObj.forEach((navigation, i) => {
        navigation.querySelectorAll('.navigation__link').forEach((e, i) => {
          if (e.classList.contains('nuxt-link-active')) {
            activeIndex = i
          }
          navigation.querySelectorAll('.backgrounds__background')[activeIndex].classList.add('backgrounds__background--active')
          e.onmouseenter = () => {
            navigation.querySelectorAll('.backgrounds__background--active').forEach((e, i) => {
              e.classList.remove('backgrounds__background--active')
              const video = e.querySelector('video')
              if (video) {
                video.pause()
              }
            })
            navigation.querySelectorAll('.backgrounds__background')[i].classList.add('backgrounds__background--active')
            const video = navigation.querySelector('.backgrounds__background--active video')
            if (video) {
              video.play()
            }
          }
        })
      })

      let videoPlaying = false
      window.addEventListener('scroll', () => {
        const elemBottom = document.querySelector('.mainMenu--fixed')
        if (elemBottom) {
          const menuActive = window.scrollY + window.innerHeight >= document.body.scrollHeight - window.innerHeight
          const video = document.querySelector('.mainMenu--fixed .backgrounds__background--active video')
          if (menuActive && video && !videoPlaying) {
            video.play()
            videoPlaying = true
          } else if (!menuActive && video && videoPlaying) {
            video.pause()
            videoPlaying = false
          }
        }
      })
    },
    closeMenu () {
      this.$emit('close-menu')
    }
  }
}
</script>

<style lang="stylus" scoped>
.navigation
  color $white

  &__links
    left 26vw
    position relative

    @media (max-width $bp-sm)
      left 0

  &__link
    color $white
    display block
    font-weight 600
    font-size 48px
    line-height 58px
    letter-spacing -1.18519px
    opacity 0.5
    position relative
    z-index 1
    margin 0 18px

    &.nuxt-link-active,
    &:hover
      opacity 1

    &--home
      &.nuxt-link-active
        opacity 0.5

      &.nuxt-link-exact-active,
      &:hover
        opacity 1

    &:last-child
      margin-top 40px

>>> .footerLinks__link
  color $white

.backgrounds
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background-position 50%
  background-size cover

  &__background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color $primary
    background-position 50%
    background-size cover
    opacity 0
    transition 0.4s opacity $ease
    transition-delay 0.4s

    &--active
      opacity 1
      transition-delay 0s
      z-index 1

  &__video
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index -1
    overflow hidden

    video
      min-width 100%
      min-height 100%
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
</style>
