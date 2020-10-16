<template>
  <div>
    <div class="header" :class="{ 'header--open': menu, 'header--scrolled': scrolled }">
      <ContentArea class="header__container">
        <div class="header__inner">
          <div class="header__logo">
            <nuxt-link to="/" title="Back to Home" @click.native="closeMenu">
              <Logo :color="headerColor" />
            </nuxt-link>
          </div>
          <div class="header__util">
            <nuxt-link v-if="!menu" class="header__link" :class="{ 'header__link--black': headerColor === 'black' }" :to="{ name: 'contact'}">
              Contact
            </nuxt-link>
            <div class="menu" :class="{ 'menu--open': menu, 'menu--black': headerColor === 'black' }" @click="toggleMenu" />
          </div>
        </div>
      </ContentArea>
    </div>
    <MainMenu :show="menu" @close-menu="closeMenu" />
  </div>
</template>

<script>
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Logo: () => import('~/components/content/Logo'),
    MainMenu: () => import('~/components/pages/MainMenu')
  },
  data () {
    return {
      menu: false,
      scrolled: false,
      logoOnScroll: false
    }
  },
  computed: {
    headerColor () {
      return this.$store.state.header.color
    },
    hideLogo () {
      return this.$store.state.header.hideLogo
    }
  },
  mounted () {
    let oldScrollVal = window.scrollY
    let override = this.$store.state.header.defaultColor
    const header = document.querySelector('.header')
    window.addEventListener('mousemove', (e) => {
      if (e.clientY < 100) {
        header.classList.remove('header--hide')
      }
    })
    window.addEventListener('scroll', () => {
      if (window.scrollY < oldScrollVal) {
        header.classList.remove('header--hide')
      } else {
        header.classList.add('header--hide')
      }
      oldScrollVal = window.scrollY

      if (window.scrollY > 10) {
        setTimeout(() => {
          if (window.scrollY > 10) {
            this.scrolled = true
            if (this.headerColor === 'black') {
              this.$store.commit('header/setColor', 'white')
              override = this.$store.state.header.defaultColor
              this.$store.commit('header/setDefaultColor', 'white')
            }
          }
        }, 500)
      } else {
        this.scrolled = false
        this.$store.commit('header/setDefaultColor', override)
        this.$store.commit('header/setColor', this.$store.state.header.defaultColor)
      }

      // const banner = document.querySelector('.banner')
      // if (banner) {
      //   const elemHeight = banner.offsetHeight
      //   this.logoOnScroll = window.scrollY >= elemHeight - 50
      //   if (this.logoOnScroll && this.headerColor === 'white') {
      //     this.$store.commit('header/setColor', 'black')
      //   } else if (!this.logoOnScroll && this.headerColor === 'black') {
      //     this.$store.commit('header/setColor', this.$store.state.header.defaultColor)
      //   }
      // }

      // const elemBottom = document.querySelector('.banner--bottom')
      // if (elemBottom) {
      //   const logoOnMenu = window.scrollY + window.innerHeight >= document.body.scrollHeight - 50
      //   oldScrollVal = window.scrollY
      //   if (logoOnMenu && this.headerColor === 'black') {
      //     this.$store.commit('header/setColor', 'white')
      //   }
      // }
    })
  },
  methods: {
    closeMenu () {
      this.menu = false
    },
    toggleMenu () {
      this.menu = !this.menu
      this.$store.commit('header/setColor', this.menu ? 'white' : this.$store.state.header.defaultColor)
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  position fixed
  z-index 9
  top 4vh
  left 0
  width 100%
  transition transform 0.7s $ease

  &:before
    content ''
    opacity 0
    transition opacity 0.5s $ease
    width 100%
    height 12vh
    position absolute
    top -4vh
    left 0
    background linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 95%, rgba(0,0,0,0) 100%)

  &--scrolled:before
    opacity 1

  &--hide
    transform translateY(-150px)

  &__inner
    display flex
    align-items center
    height 37px

  &__util
    margin-left auto
    display flex
    align-items center

  &__link
    margin-right 20px
    color $white
    transition 0.4s color $ease
    margin-top -5px
    font-size 18px

    @media (max-width $bp-sm)
      letter-spacing 0
      margin-top 0

    @media (max-width $bp-xs)
      display none

    &--black
      color $black

  &__container.section
    padding 0

  >>> .inner
    max-width 1800px

.menu
  width 36px
  height 14px
  position relative
  top -2px
  transform rotate(0deg)
  transition .5s ease-in-out
  cursor pointer

  &:before,
  &:after
    content ''
    display block
    position absolute
    height 2px
    width 100%
    background $white
    opacity 1
    left 0
    transform rotate(0deg)
    transition .15s ease-in-out
    transform-origin left center

  &:before
    top 0px

  &:after
    top 12px

  &--open:before
    transform rotate(45deg)
    top -6px
    left 4px
    background $white

  &--open:after
    transform rotate(-45deg)
    top 20px
    left 4px
    background $white

  &--black:after,
  &--black:before
    background $black
</style>
