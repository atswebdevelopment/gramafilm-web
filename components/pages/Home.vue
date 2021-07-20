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
    </ContentArea>
    <ContentArea v-if="home && home.format" class="format" overflow>
      <div class="format__inner">
        <h2 class="extra-large">Format Development</h2>
        <img v-if="home.formatimage1" class="format__image format__image--1 fade fadeIn" :src="setResponsive(home.formatimage1.url)" :alt="home.formatimage1.alternativeText">
        <img v-if="home.formatimage2" class="format__image format__image--2 fade fadeIn" :src="setResponsive(home.formatimage2.url)" :alt="home.formatimage2.alternativeText">
        <div class="format__text">
          <p>{{ home.format }}</p>
          <a data-v-1aea2954="" href="/format" class="arrowLink">
            Learn more
          </a>
        </div>
      </div>
    </ContentArea>
    <!-- <ContentArea v-if="home" overflow>
      <h2>Studio news</h2>
      <StudioNews :home="home" class="fade fadeIn" />
    </ContentArea> -->
    <ContentArea v-if="home && magazines && magazines.length" overflow>
      <h2>Magazine</h2>
      <Magazine :articles="magazines" />
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
      <img class="logo-circle fade fadeIn" src="/logo-circle.svg" alt="">
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
import magazinesQuery from '~/apollo/queries/magazine/magazines.gql'
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
    Magazine: () => import('~/components/content/Magazine'),
    // StudioNews: () => import('~/components/content/StudioNews'),
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
      magazines: [],
      setResponsive
    }
  },
  apollo: {
    magazines: {
      prefetch: false,
      query: magazinesQuery
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
  top 0
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

.partners
  padding-top 200px

.format
  .extra-large
    font-size 112px
    line-height 120px
    font-family $fontFamily
    max-width 672px
    margin 45px 0 140px
    position relative
    z-index 1

    @media (max-width $bp-md)
      margin 25px 0 140px

    @media (max-width $bp-sm)
      font-size 69px
      line-height 77px
      margin -20px 0 25px

    @media (max-width $bp-xs)
      font-size 40px
      line-height 48px

  &__inner
    position relative

  &__image
    &--1
      position absolute
      right 0
      top -90px
      width 432px

      @media (max-width $bp-md)
        width 308px

      @media (max-width $bp-sm)
        width 100%
        max-width 254px
        position static
        margin-left auto
        margin-bottom 50px

    &--2
      width 55%
      margin-bottom 96px

      @media (max-width $bp-sm)
        width 100%
        max-width 459px

      @media (max-width $bp-xs)
        max-width 282px
        margin-bottom 40px

  &__text
    width 55%
    margin-left auto
    font-size 48px
    line-height 56px

    @media (max-width $bp-md)
      font-size 42px
      line-height 50px

    @media (max-width $bp-sm)
      width 100%
      font-size 36px
      line-height 44px

    p
      margin-bottom 80px

      @media (max-width $bp-xs)
        margin-bottom 40px

    a
      font-size 56px
      line-height 64px
      justify-content flex-start

      @media (max-width $bp-sm)
        font-size 40px
        line-height 48px

      &:after
        @media (max-width $bp-sm)
          width 39px
          height 30px
</style>
