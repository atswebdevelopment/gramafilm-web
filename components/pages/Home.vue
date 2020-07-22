<template>
  <div class="home">
    <h1 class="hidden">
      Gramafilm
    </h1>
    <div class="intro-container">
      <Introduction :home="home" />
    </div>
    <Video v-if="home.introvideo" :video="home.introvideo" fullscreen />
    <ContentArea overflow>
      <h2>Work</h2>
      <WorkPortfolio home />
      <img no-lazy-load class="logo-circle" src="/logo-circle.svg" alt="">
    </ContentArea>
    <ContentArea class="partners" overflow>
      <h2><b>Partners</b></h2>
      <ContentSwitcher mirrored class="fade fadeIn">
        <template slot="tabs">
          <div v-for="(partner, index) in home.partners" :key="partner.id" class="contentSwitcher__tab" :class="{ 'contentSwitcher__tab--active': index === 0}">
            <b>{{ partner.title }}</b>
            <div class="contentSwitcher__tabcontent">
              <img v-if="partner.image" :src="partner.image.url" :alt="partner.image.alternativeText">
              <Video v-else-if="partner.qvideo" :video="partner.qvideo" />
              <div v-html="partner.content" />
            </div>
          </div>
        </template>
        <template slot="contentWindow">
          <div v-for="(partner, index) in home.partners" :key="partner.id" class="contentSwitcher__content" :class="{ 'contentSwitcher__content--active': index === 0}">
            <img v-if="partner.image" :src="partner.image.url" :alt="partner.image.alternativeText">
            <Video v-else-if="partner.qvideo" :video="partner.qvideo" />
            <div v-html="partner.content" />
          </div>
        </template>
      </ContentSwitcher>
    </ContentArea>
    <ContentArea class="journal">
      <h2>Journal</h2>
    </ContentArea>
    <Slider v-if="articles.length" :items="articles" />
  </div>
</template>

<script>
import articlesQuery from '~/apollo/queries/article/articles.gql'
import fadeIn from '~/helpers/fadeIn'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Introduction: () => import('~/components/content/Introduction'),
    WorkPortfolio: () => import('~/components/content/WorkPortfolio'),
    ContentSwitcher: () => import('~/components/content/ContentSwitcher'),
    Slider: () => import('~/components/content/Slider'),
    Video: () => import('~/components/content/Video')
  },
  props: {
    home: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      articles: []
    }
  },
  apollo: {
    articles: {
      prefetch: false,
      query: articlesQuery
    }
  },
  mounted () {
    fadeIn()
    window.addEventListener('scroll', () => {
      const logoCircle = document.querySelector('.logo-circle')
      if (logoCircle) {
        logoCircle.style.transform = 'rotateZ(' + (window.scrollY / 4) + 'deg)'
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.home
  overflow hidden

.intro-container
  min-height 100vh
  background $primary

.logo-circle
  position absolute
  bottom -30px
  left 50%
  margin-left 400px
  transition 2s transform $ease

  @media (max-width: $bp-sm)
    margin 0
    bottom -100px

.journal
  padding 4vh 0
</style>
