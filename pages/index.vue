<template>
  <div class="window">
    <div class="window--front">
      <div class="page" :class="{ 'page--tertiary': partnersInFocus }">
        <div class="home-container">
          <Home :home="home" />
        </div>
        <GetInTouch />
      </div>
    </div>
    <MainMenu class="mainMenu mainMenu--hide" fixed />
    <img class="hidden" data-not-lazy src="/videoplayer/play-on.svg" alt="">
  </div>
</template>

<script>
import homeQuery from '~/apollo/queries/pages/home.gql'
export default {
  components: {
    Home: () => import('~/components/pages/Home'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    MainMenu: () => import('~/components/pages/MainMenu')
  },
  data () {
    return {
      home: {},
      partnersInFocus: false
    }
  },
  apollo: {
    home: {
      prefetch: false,
      query: homeQuery
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('header/hideLogo', false)
    next()
  },
  created () {
    this.$store.commit('header/setDefaultColor', 'black')
  },
  mounted () {
    this.$store.commit('header/hideLogo', true)
    window.addEventListener('scroll', () => {
      const fixedMenu = document.querySelector('.mainMenu--fixed')
      if (fixedMenu) {
        if (window.scrollY > 100) {
          fixedMenu.classList.remove('mainMenu--hide')
        } else {
          fixedMenu.classList.add('mainMenu--hide')
        }
      }

      const partners = document.querySelector('.partners')
      if (partners) {
        const partnersTop = partners.getBoundingClientRect().top
        if (partnersTop - (window.innerHeight / 2) < 0) {
          this.partnersInFocus = true
        } else {
          this.partnersInFocus = false
        }
      }
    })
  },
  head () {
    return {
      title: (this.home && this.home.seo && this.home.seo.title) || 'Gramafilm London - Branded Content Video Production Company',
      meta: [
        { hid: 'description', name: 'description', content: (this.home && this.home.seo && this.home.seo.description) || 'Gramafilm produce some of the world&#39;s most shared branded content, films, technology and experiences for global brands and broadcasters.' },
        { hid: 'og:title', name: 'og:title', content: (this.home && this.home.seo && this.home.seo.title) || 'Gramafilm London - Branded Content Video Production Company' },
        { hid: 'og:description', name: 'og:description', content: (this.home && this.home.seo && this.home.seo.description) || 'Gramafilm produce some of the world&#39;s most shared branded content, films, technology and experiences for global brands and broadcasters.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-container
  min-height 100vh

.page
  padding 0
  transition 1.4s background-color $ease

  &--tertiary
    background $tertiary
</style>
