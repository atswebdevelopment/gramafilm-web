<template>
  <div>
    <div class="header" :class="{ 'header--open': menu }">
      <ContentArea class="header__container">
        <div class="header__inner">
          <div class="header__logo" :class="{ 'header__logo--hide': nologo, 'header__logo--show': logoOnScroll || menu }">
            <nuxt-link to="/">
              <Logo :color="headerColor" />
            </nuxt-link>
          </div>
          <div class="header__util">
            <nuxt-link class="header__link" :class="{ 'header__link--black': headerColor === 'black' }" :to="{ name: 'contact'}">
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
  props: {
    nologo: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: false,
      logoOnScroll: false
    }
  },
  computed: {
    headerColor () {
      return this.$store.state.header.color
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const intro = document.querySelector('.intro')
      if (intro) {
        const elemHeight = intro.offsetHeight
        const pastIntro = window.scrollY >= elemHeight - 100
        this.logoOnScroll = window.scrollY >= (window.innerHeight / 2) + 150
        if (pastIntro && this.headerColor === 'white') {
          this.$store.commit('header/setColor', 'black')
        } else if ((!this.logoOnScroll || !pastIntro) && this.headerColor === 'black') {
          this.$store.commit('header/setColor', 'white')
        }
      }

      const banner = document.querySelector('.banner')
      if (banner) {
        const elemHeight = banner.offsetHeight
        this.logoOnScroll = window.scrollY >= elemHeight - 50
        if (this.logoOnScroll && this.headerColor === 'white') {
          this.$store.commit('header/setColor', 'black')
        } else if (!this.logoOnScroll && this.headerColor === 'black') {
          this.$store.commit('header/setColor', this.$store.state.header.defaultColor)
        }
      }

      const elemBottom = document.querySelector('.mainMenu--fixed') || document.querySelector('.banner--bottom')
      if (elemBottom) {
        const logoOnMenu = window.scrollY + window.innerHeight >= document.body.scrollHeight - 100
        if (logoOnMenu && this.headerColor === 'black') {
          this.$store.commit('header/setColor', 'white')
        }
      }
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

    @media (max-width $bp-sm)
      font-size 18px
      letter-spacing 0
      margin-top 0

    &--black
      color $black

  &__container.section
    padding 0

  &__logo
    transition 0.4s opacity $ease

    &--hide
      opacity 0

    &--show
      opacity 1

  >>> .inner
    max-width 1800px

.menu
  width 36px
  height 14px
  position relative
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
