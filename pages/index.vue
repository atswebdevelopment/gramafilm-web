<template>
  <div class="window">
    <div class="window--front">
      <div class="page" :class="{ 'page--tertiary': partnersInFocus, 'page--blue': blueBg, 'page--grey': greyBg, 'page--white': whiteBg }">
        <div class="home-container">
          <Home :home="homeData" />
        </div>
        <GetInTouch />
      </div>
    </div>
    <MainMenu class="mainMenu mainMenu--hide" fixed />
    <img class="hidden" src="/videoplayer/play-on.svg" alt="">
  </div>
</template>

<script>
import gql from 'graphql-tag'
import homeQuery from '~/apollo/queries/pages/home.gql'
export default {
  components: {
    Home: () => import('~/components/pages/Home'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    MainMenu: () => import('~/components/pages/MainMenu')
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('header/hideLogo', false)
    next()
  },
  data () {
    return {
      home: {},
      homeData: {},
      partnersInFocus: false,
      blueBg: false,
      greyBg: false,
      whiteBg: false
    }
  },
  apollo: {
    home: {
      prefetch: true,
      query: gql`
        query Seo {
          home {
            seo {
              ... on ComponentContentSeo {
                title
                description
                image {
                  url
                }
              }
            }
          }
        }
      `
    }
  },
  head () {
    return {
      title: (this.home && this.home.seo && this.home.seo.title) || 'Gramafilm London - Branded Content Video Production Company',
      meta: [
        { hid: 'description', name: 'description', content: (this.home && this.home.seo && this.home.seo.description) || 'Gramafilm produce some of the world&#39;s most shared branded content, films, technology and experiences for global brands and broadcasters.' },
        { hid: 'og:title', name: 'og:title', content: (this.home && this.home.seo && this.home.seo.title) || 'Gramafilm London - Branded Content Video Production Company' },
        { hid: 'og:description', name: 'og:description', content: (this.home && this.home.seo && this.home.seo.description) || 'Gramafilm produce some of the world&#39;s most shared branded content, films, technology and experiences for global brands and broadcasters.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'image', property: 'og:image', content: this.home && this.home.seo && this.home.seo.image && this.home.seo.image.url }
      ]
    }
  },
  created () {
    this.$apollo.query({ query: homeQuery }).then(({ data }) => {
      this.homeData = data.home
    })
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

      const blueBgs = document.querySelectorAll('.background-blue')
      if (blueBgs.length) {
        blueBgs.forEach((e, i) => {
          const sectionTop = e.getBoundingClientRect().top
          const sectionBound = sectionTop + e.offsetHeight
          if ((sectionTop - (window.innerHeight / 2) < 0) && (sectionBound > (window.innerHeight / 2))) {
            this.blueBg = true
          } else {
            this.blueBg = false
          }
        })
      }

      const greyBgs = document.querySelectorAll('.background-grey')
      if (greyBgs.length) {
        greyBgs.forEach((e, i) => {
          const sectionTop = e.getBoundingClientRect().top
          const sectionBound = sectionTop + e.offsetHeight
          if ((sectionTop - (window.innerHeight / 2) < 0) && (sectionBound > (window.innerHeight / 2))) {
            this.greyBg = true
          } else {
            this.greyBg = false
          }
        })
      }

      const partners = document.querySelector('.partners')
      if (partners) {
        const partnersTop = partners.getBoundingClientRect().top
        this.partnersInFocus = partnersTop - (window.innerHeight / 2) < 0
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.home-container
  min-height 100vh

.page
  padding 0
  transition 1.4s background-color $ease

  &--blue
    background #DBDCE6

  &--grey
    background #333

  &--white
    background $white

  &--tertiary
    background $tertiary
</style>
