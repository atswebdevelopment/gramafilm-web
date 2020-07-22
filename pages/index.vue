<template>
  <div class="window">
    <div class="window--front">
      <div class="page" :class="{ 'page--orange': partnersInFocus }">
        <div class="home-container">
          <Home v-if="home && home.id" :home="home" />
          <Loader v-else />
        </div>
        <GetInTouch />
      </div>
    </div>
    <MainMenu fixed />
  </div>
</template>

<script>
import homeQuery from '~/apollo/queries/pages/home.gql'
export default {
  layout: 'home',
  transition: 'page',
  components: {
    Home: () => import('~/components/pages/Home'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    MainMenu: () => import('~/components/pages/MainMenu'),
    Loader: () => import('~/components/content/Loader')
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
  created () {
    this.$store.commit('header/setDefaultColor', 'white')
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const partners = document.querySelector('.partners')
      if (partners) {
        const partnersHeight = partners.offsetHeight
        const partnersTop = partners.getBoundingClientRect().top
        if (partnersTop + (partnersHeight / 2) < 0) {
          this.partnersInFocus = false
        } else if (partnersTop - (window.innerHeight / 2) < 0) {
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
        { hid: 'description', name: 'description', content: (this.home && this.home.seo && this.home.seo.description) || 'Gramafilm produce some of the world&#39;s most shared branded content, films, technology and experiences for global brands and broadcasters.' }
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

  &--orange
    background $orange
</style>
