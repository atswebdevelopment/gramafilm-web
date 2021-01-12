<template>
  <div class="home">
    <h1 v-if="home" class="hidden">
      {{ home.title }}
    </h1>
    <div class="intro-container">
      <Introduction :home="home" />
    </div>
    <ContentArea v-if="home" overflow>
      <h2>Latest projects</h2>
      <WorkPortfolio home />
      <img no-lazy-load class="logo-circle" src="/logo-circle.svg" alt="">
    </ContentArea>
    <ContentArea v-if="home" overflow>
      <h2>Studio news</h2>
      <StudioNews :home="home" />
    </ContentArea>
    <ContentArea v-if="home && home.modules" no-padding>
      <div class="home__inner">
        <ColumnContainer v-for="(section, index) in home.modules" :key="`section-${index}`" center class="fade fadeIn" :class="`background-${section.backgroundcolor || section.backgroundcolor2}`">
          <template v-if="section.__typename === 'ComponentColumnsOneColumn'">
            <Column>
              <p class="large center" v-html="section.content" />
            </Column>
          </template>
          <template v-else>
            <Column v-if="!section.reverse">
              <video v-if="section.media && section.media.mime.includes('video')" loop muted autoplay class="video-max-100">
                <source :src="section.media.url" type="video/mp4">
              </video>
              <img v-else-if="section.media" :src="setResponsive(section.media.url)" :alt="section.media.alternativeText">
            </Column>
            <Column wide>
              <div v-html="section.content" />
            </Column>
            <Column v-if="section.reverse">
              <video v-if="section.media && section.media.mime.includes('video')" loop muted autoplay class="video-max-100">
                <source :src="section.media.url" type="video/mp4">
              </video>
              <img v-else-if="section.media" :src="setResponsive(section.media.url)" :alt="section.media.alternativeText">
            </Column>
          </template>
        </ColumnContainer>
      </div>
    </ContentArea>
    <ContentArea v-if="home && home.partners" class="partners" overflow>
      <h2><b>Partners</b></h2>
      <ContentSwitcher mirrored class="fade fadeIn">
        <template slot="tabs">
          <div v-for="(partner, index) in home.partners" :key="partner.id" class="contentSwitcher__tab" :class="{ 'contentSwitcher__tab--active': index === 0}">
            <b>{{ partner.title }}</b>
            <div v-if="mobile" class="contentSwitcher__tabcontent">
              <img v-if="partner.image" :src="setResponsive(partner.image.url, 767)" :alt="partner.image.alternativeText || ''">
              <Video v-else-if="partner.qvideo" :video="partner.qvideo" />
              <div v-html="partner.content" />
            </div>
          </div>
        </template>
        <template v-if="!mobile" slot="contentWindow">
          <div v-for="(partner, index) in home.partners" :key="partner.id" class="contentSwitcher__content" :class="{ 'contentSwitcher__content--active': index === 0}">
            <img v-if="partner.image" :src="setResponsive(partner.image.url, 767)" :alt="partner.image.alternativeText || ''">
            <Video v-else-if="partner.qvideo" :video="partner.qvideo" />
            <div v-html="partner.content" />
          </div>
        </template>
      </ContentSwitcher>
    </ContentArea>
  </div>
</template>

<script>
import articlesQuery from '~/apollo/queries/article/articles.gql'
import fadeIn from '~/helpers/fadeIn'
import { setResponsive } from '~/helpers/cdn'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column'),
    Introduction: () => import('~/components/content/Introduction'),
    WorkPortfolio: () => import('~/components/content/WorkPortfolio'),
    ContentSwitcher: () => import('~/components/content/ContentSwitcher'),
    StudioNews: () => import('~/components/content/StudioNews'),
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
      articles: [],
      setResponsive
    }
  },
  apollo: {
    articles: {
      prefetch: false,
      query: articlesQuery
    }
  },
  computed: {
    mobile () {
      return window.innerWidth < 1024
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

  &__inner
    padding 0 4.1667%

    @media (max-width $bp-sm)
      padding 0

    @media (max-width $bp-xs)
      font-family $fontFamily
      font-size 34px
      line-height 40px

    >>> h2
      font-size 48px
      line-height 54px
      font-family $fontFamily

.logo-circle
  position absolute
  bottom -30px
  left 50%
  margin-left 400px
  transition 2s transform $ease

  @media (max-width: $bp-sm)
    margin 0
    bottom -187px

  @media (max-width $bp-xs)
    width 250px

.journal
  padding 4vh 0
</style>
