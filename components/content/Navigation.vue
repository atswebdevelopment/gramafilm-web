<template>
  <div class="navigation" :class="{ 'navigation--open': show }">
    <div class="backgrounds">
      <div v-for="(item, index) in menu.navigation" :key="index" class="backgrounds__background" :style="`background-image:url(${(mobile && item.backgroundimage && item.backgroundimage.url) || ''})`">
        <div v-if="item.background && !mobile" class="backgrounds__video">
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
          :to="((logout && item.route === '/login') ? '/clientarea' : item.route)"
          class="navigation__link"
          :class="{ 'navigation__link--home': item.route === '/', 'navigation__link--page': item.route !== '/' }"
          @click.native="closeMenu(index)"
        >
          {{ ((logout && item.route === '/login') ? "Client Area" : item.title) }}
        </nuxt-link>
        <span
          v-if="logout"
          class="navigation__link navigation__link--page"
          @click="goLogout()"
        >
          Logout
        </span>
      </div>
      <FooterLinks :inverted="footerLinksInverted" @close-menu="closeMenu()" />
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
    },
    inverted: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeIndex: null,
      footerLinksInverted: null,
      logout: false
    }
  },
  computed: {
    mobile () {
      return window.innerWidth < 1024
    }
  },
  watch: {
    show (val) {
      const video = document.querySelector('.backgrounds__background--active video')
      if (video) {
        if (val) {
          setTimeout(() => {
            const navigation = document.querySelector('.mainMenu--open .navigation')
            this.setState(this.activeIndex, navigation)
          }, 10)
        } else {
          const video = document.querySelector('.backgrounds__background--active video')
          video.pause()
          this.$store.commit('header/setColor', this.$store.state.header.defaultColor)
        }
      }
    },
    $route () {
      this.checkLoginStatus()
    }
  },
  mounted () {
    this.ready()
    this.checkLoginStatus()
    this.footerLinksInverted = this.inverted
  },
  methods: {
    checkLoginStatus () {
      this.logout = !!this.$apolloHelpers.getToken()
    },
    goLogout () {
      this.$apolloHelpers.onLogout()
      this.logout = false
      localStorage.removeItem('m')
      this.closeMenu(0)
      this.$store.commit('auth/setUser', {
        user: null,
        token: null
      })
      this.$nuxt.$router.push('/')
    },
    setState (i, navigation) {
      // This whole section is quick and hacky, need refactoring through vue data
      navigation.querySelectorAll('.navigation__link').forEach((e, i) => {
        if ((e.classList.contains('nuxt-link-active') && e.classList.contains('navigation__link--page') && window.location.pathname.length > 1) || (e.classList.contains('nuxt-link-exact-active') && window.location.pathname.length <= 1)) {
          this.activeIndex = i
        }
      })
      if (!this.activeIndex) {
        this.activeIndex = 0
      }
      navigation.querySelectorAll('.backgrounds__background--active').forEach((e, index) => {
        e.classList.remove('backgrounds__background--active')
        const video = e.querySelector('video')
        if (video) {
          video.pause()
        }
      })
      if (!this.menu.navigation[i]) {
        i = 0
      }
      if (this.menu.navigation[i].inverttext) {
        navigation.classList.add('navigation--inverted')
        this.footerLinksInverted = false
      } else {
        navigation.classList.remove('navigation--inverted')
        this.footerLinksInverted = true
      }
      this.$store.commit('header/setColor', this.menu.navigation[i].inverttext ? 'black' : 'white')
      navigation.querySelectorAll('.backgrounds__background')[i].classList.add('backgrounds__background--active')
      const video = navigation.querySelector('.backgrounds__background--active video')
      if (video) {
        video.play()
      }
    },
    ready () {
      if (!document.querySelectorAll('.navigation__link').length > 0) {
        setTimeout(() => {
          this.ready()
        }, 100)
        return
      }
      const navigationObj = document.querySelectorAll('.navigation')
      navigationObj.forEach((navigation, i) => {
        navigation.querySelectorAll('.navigation__link').forEach((e, i) => {
          if ((e.classList.contains('nuxt-link-active') && e.classList.contains('navigation__link--page') && window.location.pathname.length > 1) || (e.classList.contains('nuxt-link-exact-active') && window.location.pathname.length <= 1)) {
            this.activeIndex = i
          }
          e.onmouseenter = () => {
            this.setState(i, navigation)
          }
        })
        if (!this.activeIndex) {
          this.activeIndex = 0
        }
        navigation.querySelectorAll('.backgrounds__background')[this.activeIndex].classList.add('backgrounds__background--active')
        if (this.menu.navigation[this.activeIndex].inverttext) {
          navigation.classList.add('navigation--inverted')
        } else {
          navigation.classList.remove('navigation--inverted')
        }
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
    closeMenu (index) {
      this.activeIndex = index
      this.$emit('close-menu')
    }
  }
}
</script>

<style lang="stylus" scoped>
.navigation
  color $white
  transition color 0.4s $ease

  >>> .section--fullscreen
    padding 0

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
    transition color 0.4s $ease
    cursor pointer

    @media (max-width $bp-xxs)
      margin 0 6px
      font-size 32px
      line-height 42px
      letter-spacing 0px

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

  &--inverted
    color $black

    .navigation__link
      color $black

    >>> .footerLinks__link
      color $black

>>> .footerLinks__link
  transition color 0.4s $ease
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
