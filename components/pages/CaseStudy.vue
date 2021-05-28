<template>
  <div class="case">
    <Banner v-if="caseStudy.banner" class="case__banner" :video="desktop && caseStudy.banner.mime.includes('video')" :background="(caseStudy.banner && caseStudy.banner.mime.includes('video') && desktop && caseStudy.banner.url) || (caseStudy.banner && !caseStudy.banner.mime.includes('video') && caseStudy.banner.url) || (caseStudy.mobilebannger && caseStudy.mobilebannger.url)" :black="caseStudy.inverttext">
      <h1 :class="{ 'header-top': caseStudy.textposition === 'Top', 'header-center': caseStudy.textposition === 'Middle', 'header-bottom': caseStudy.textposition === 'Bottom'}">{{ caseStudy.title }}</h1>
      <div v-if="caseStudy.media && (caseStudy.media.image || caseStudy.media.qvideo)" class="banner__item banner__item--5">
        <div class="banner__media">
          <div v-if="caseStudy.media && caseStudy.media.image" class="banner__image" :style="`background-image:url(${caseStudy.media.image.url})`" />
          <Video v-else-if="caseStudy.media && caseStudy.media.qvideo" class="banner__image" :video="caseStudy.media.qvideo" />
        </div>
      </div>
    </Banner>
    <ContentArea>
      <p class="large" :class="{ 'large--no-gap': !caseStudy.media || (caseStudy.media && !caseStudy.media.image && !caseStudy.media.qvideo)}">
        {{ caseStudy.introduction }}
      </p>
      <ColumnContainer no-padding class="case__intro">
        <Column>
          <div class="nomargin">
            <b>Client</b>
            <div v-html="caseStudy.client" />
            <br>
            <b>What we did</b>
            <div v-html="caseStudy.whatwedid" />
          </div>
        </Column>
        <Column wide>
          <div v-html="caseStudy.content" />
        </Column>
      </ColumnContainer>
    </ContentArea>
    <div v-if="caseStudy.modules" class="casestudy">
      <div v-for="(section, index) in caseStudy.modules" :key="`section-${index}`" class="fade fadeIn" :class="{ 'bg-blue': bgBlue(section), 'bg-green': bgGreen(section) }">
        <template v-if="section.__typename === 'ComponentModulesVideo'">
          <div v-if="section.fullscreen" class="casestudy__item casestudy__item--3">
            <div class="casestudy__media">
              <img v-if="section.image && !section.image.mime.includes('video')" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
              <video v-else-if="section.image && section.image.mime.includes('video')" class="looped" loop muted>
                <source :src="section.image.url" type="video/mp4">
              </video>
              <Video v-else-if="section.qvideo" :video="section.qvideo" fullscreen />
            </div>
          </div>
          <ColumnContainer v-else>
            <Column v-if="section.image || section.qvideo || (section.content && section.content != '<p><br></p>')">
              <div class="casestudy__module">
                <div class="casestudy__item">
                  <div class="casestudy__media">
                    <img v-if="section.image && !section.image.mime.includes('video')" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                    <video v-else-if="section.image && section.image.mime.includes('video')" class="looped" loop muted>
                      <source :src="section.image.url" type="video/mp4">
                    </video>
                    <Video v-else-if="section.qvideo" :video="section.qvideo" />
                    <div v-if="section.content && section.content != '<p><br></p>'" v-html="section.content.replaceAll('<p><br></p>','')" />
                  </div>
                </div>
              </div>
            </Column>
          </ColumnContainer>
        </template>
        <div v-else-if="section.__typename === 'ComponentModules1X1'">
          <ColumnContainer>
            <Column>
              <div class="casestudy__module">
                <div class="casestudy__item">
                  <div class="casestudy__media">
                    <img v-if="section.column1image && !section.column1image.mime.includes('video')" :src="setResponsive(section.column1image.url)" :alt="section.column1image.alternativeText">
                    <video v-else-if="section.column1image && section.column1image.mime.includes('video')" class="looped" loop muted>
                      <source :src="section.column1image.url" type="video/mp4">
                    </video>
                    <Video v-else-if="section.column1video" :video="section.column1video" />
                    <div v-if="section.column1content && section.column1content != '<p><br></p>'" v-html="section.column1content" />
                  </div>
                </div>
              </div>
            </Column>
            <Column>
              <div class="casestudy__module">
                <div class="casestudy__item">
                  <div class="casestudy__media">
                    <img v-if="section.column2image && !section.column2image.mime.includes('video')" :src="setResponsive(section.column2image.url)" :alt="section.column2image.alternativeText">
                    <video v-else-if="section.column2image && section.column2image.mime.includes('video')" class="looped" loop muted>
                      <source :src="section.column2image.url" type="video/mp4">
                    </video>
                    <Video v-else-if="section.column2video" :video="section.column2video" />
                    <div v-if="section.column2content && section.column2content != '<p><br></p>'" v-html="section.column2content" />
                  </div>
                </div>
              </div>
            </Column>
          </ColumnContainer>
        </div>
        <div v-else-if="section.__typename === 'ComponentModules1X1Textleft'" class="casestudy__module casestudy__module--1">
          <ColumnContainer>
            <Column v-if="section.mainimage || section.mainvideo">
              <div class="casestudy__item casestudy__item--1">
                <div class="casestudy__media">
                  <img v-if="section.mainimage && !section.mainimage.mime.includes('video')" :src="setResponsive(section.mainimage.url)" :alt="section.mainimage.alternativeText">
                  <video v-else-if="section.mainimage && section.mainimage.mime.includes('video')" class="looped" loop muted>
                    <source :src="section.mainimage.url" type="video/mp4">
                  </video>
                  <Video v-else-if="section.mainvideo" :video="section.mainvideo" />
                </div>
              </div>
            </Column>
          </ColumnContainer>
          <ColumnContainer center>
            <Column v-if="section.content && section.content != '<p><br></p>'" :wide="section.contentposition === 'float'" :class="`column--${section.contentposition}`">
              <div class="casestudy__item">
                <div v-html="section.content" />
              </div>
            </Column>
            <Column :wide-w2="section.contentposition !== 'float'" class="column--top">
              <div class="casestudy__item">
                <div class="casestudy__media">
                  <img v-if="section.image && !section.image.mime.includes('video')" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                  <video v-else-if="section.image && section.image.mime.includes('video')" class="looped" loop muted>
                    <source :src="section.image.url" type="video/mp4">
                  </video>
                  <Video v-else-if="section.qvideo" :video="section.qvideo" />
                </div>
              </div>
            </Column>
          </ColumnContainer>
        </div>
        <div v-else-if="section.__typename === 'ComponentModules1X1Textright'" class="casestudy__module casestudy__module--1">
          <ColumnContainer center>
            <Column v-if="section.mainimage || section.mainvideo">
              <div class="casestudy__item casestudy__item--2">
                <div class="casestudy__media">
                  <img v-if="section.mainimage && !section.mainimage.mime.includes('video')" :src="setResponsive(section.mainimage.url)" :alt="section.mainimage.alternativeText">
                  <video v-else-if="section.mainimage && section.mainimage.mime.includes('video')" class="looped" loop muted>
                    <source :src="section.mainimage.url" type="video/mp4">
                  </video>
                  <Video v-else-if="section.mainvideo" :video="section.mainvideo" />
                </div>
              </div>
            </Column>
          </ColumnContainer>
          <ColumnContainer center>
            <Column wide-w2>
              <div class="casestudy__item">
                <div class="casestudy__media">
                  <img v-if="section.image && !section.image.mime.includes('video')" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                  <video v-else-if="section.image && section.image.mime.includes('video')" class="looped" loop muted>
                    <source :src="section.image.url" type="video/mp4">
                  </video>
                  <Video v-else-if="section.qvideo" :video="section.qvideo" />
                </div>
              </div>
            </Column>
            <Column v-if="section.content && section.content != '<p><br></p>'" :class="`column--${section.contentposition2}`">
              <div class="casestudy__item">
                <div v-html="section.content" />
              </div>
            </Column>
          </ColumnContainer>
        </div>
        <Quote v-else-if="section.__typename === 'ComponentModulesQuote'">
          <template slot="quote">
            {{ section.quote }}
          </template>
          <template v-if="section.citation" slot="cite">
            <div v-html="section.citation.replace(/\n/g, '<br>')" />
          </template>
        </Quote>
        <div v-else-if="section.__typename === 'ComponentModulesGallery'">
          <ColumnContainer>
            <Column>
              <div class="casestudy__module">
                <h2>{{ section.title }}</h2>
                <Slider v-if="section.images && section.images.length" :items="section.images" />
              </div>
            </Column>
          </ColumnContainer>
        </div>
      </div>
    </div>
    <ContentArea>
      <h2>Related work</h2>
    </ContentArea>
    <Slider v-if="relatedWork" :items="relatedWork" />
    <GetInTouch footer-links />
    <Banner
      v-if="caseStudy.case_study"
      class="case__banner"
      :class=" { 'banner--bottom': !caseStudy.case_study.inverttext }"
      :video="caseStudy.case_study && caseStudy.case_study.banner && caseStudy.case_study.banner.mime.includes('video')"
      :background="caseStudy.case_study && caseStudy.case_study.banner && caseStudy.case_study.banner.url"
      hide-overflow
      :black="caseStudy.case_study.inverttext"
    >
      <div class="banner__next" @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.case_study.url } })">
        Next
      </div>
      <h1 class="click" @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.case_study.url } })">{{ caseStudy.case_study.title }}</h1>
    </Banner>
  </div>
</template>

<script>
import { setResponsive } from '~/helpers/cdn'
import fadeIn from '~/helpers/fadeIn'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Banner: () => import('~/components/content/Banner'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column'),
    Quote: () => import('~/components/content/Quote'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Slider: () => import('~/components/content/Slider'),
    Video: () => import('~/components/content/Video')
  },
  props: {
    caseStudy: {
      type: Object,
      default: () => {}
    },
    caseStudies: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      relatedWork: null,
      setResponsive
    }
  },
  computed: {
    desktop () {
      return window.innerWidth > 1023
    }
  },
  watch: {
    caseStudies () {
      this.relatedWork = [...this.caseStudy.relatedwork, ...this.caseStudies.map(m => m.case_study).filter(m => m.type === this.caseStudy.type && m.id !== this.caseStudy.id)].splice(0, 5)
    }
  },
  mounted () {
    if (this.caseStudies) {
      this.relatedWork = [...this.caseStudy.relatedwork, ...this.caseStudies.map(m => m.case_study).filter(m => m.type === this.caseStudy.type && m.id !== this.caseStudy.id)].splice(0, 5)
    }
    this.$store.commit('header/setDefaultColor', this.caseStudy.inverttext ? 'black' : 'white')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', this.caseStudy.inverttext ? 'black' : 'white')
    }, 200)
    fadeIn()
    window.addEventListener('scroll', () => {
      const video = document.querySelectorAll('video.looped')
      if (video) {
        video.forEach((e, i) => {
          if (e.getBoundingClientRect().top - window.innerHeight < -(e.offsetHeight / 2) && e.getBoundingClientRect().top + e.offsetHeight > (e.offsetHeight / 2)) {
            e.play()
          } else {
            e.pause()
          }
        })
      }
    })
  },
  methods: {
    bgBlue (section) {
      // This code is awful, but done in a rush. Refactor
      if ((section.backgroundcolour && section.backgroundcolour === 'blue') ||
      (section.backgroundcolour2 && section.backgroundcolour2 === 'blue') ||
      (section.backgroundcolour3 && section.backgroundcolour3 === 'blue') ||
      (section.backgroundcolour4 && section.backgroundcolour4 === 'blue') ||
      (section.backgroundcolour5 && section.backgroundcolour5 === 'blue') ||
      (section.backgroundcolour6 && section.backgroundcolour6 === 'blue')) {
        return true
      }
      return false
    },
    bgGreen (section) {
      // This code is awful, but done in a rush. Refactor
      if ((section.backgroundcolour && section.backgroundcolour === 'green') ||
      (section.backgroundcolour2 && section.backgroundcolour2 === 'green') ||
      (section.backgroundcolour3 && section.backgroundcolour3 === 'green') ||
      (section.backgroundcolour4 && section.backgroundcolour4 === 'green') ||
      (section.backgroundcolour5 && section.backgroundcolour5 === 'green') ||
      (section.backgroundcolour6 && section.backgroundcolour6 === 'green')) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
.case
  overflow hidden

.case__banner h1
  font-size 112px
  line-height 120px
  margin 0
  max-width 1200px

  &.header-top
    top 10%

  &.header-center
    top 40%

  &.header-bottom
    top auto
    bottom 10%

>>> .banner__inner
  height 92vh

@media (max-width $bp-sm)
  .case__banner
    h1
      font-size 56px
      line-height 64px
      letter-spacing 0

      &.header-top
        top 15%

      &.header-bottom
        bottom 80px

    @media (max-width $bp-sm)
      .banner__next
        top 18vh

  >>> .banner__inner
    height 72vh

@media (max-width $bp-xs)
  .case__banner
    h1
      font-size 48px
      line-height 56px

      &.header-top
        top 15%

      &.header-bottom
        bottom 10px

.large
  margin 30vh auto 5vh

  &--no-gap
    margin-top 5vh

    @media (max-width $bp-sm)
      margin-top 2vh

.casestudy
  >>> .swiper__media
    max-width 532px

  p
    max-width 528px

  .quote
    padding 15vh 0

    @media (max-width $bp-sm)
      padding 10vh 0

  &__module
    width calc(100% + 16px)
    margin-left -8px

    @media (max-width $bp-sm)
      width 100%
      margin-left 0

    &--1
      width 100%
      margin 0

      .columns:first-child .column
        padding-bottom 0

  &__item
    width 100%

    img,
    video
      width 100%
      max-height none

    >>> p
      max-width 1000px

    &--1
      .casestudy__media
        max-width 880px

    &--2
      .casestudy__media
        margin-left auto
        max-width 432px

    &--3
      padding 3vh 0

  .columns
    padding 0

    @media (max-width $bp-sm)
      padding 0 18px

  .column
    padding 5vh 58px

    >>> p:first-of-type,
    >>> h2:first-of-type,
    >>> h3:first-of-type
      margin-top 0

    @media (max-width $bp-sm)
      padding 3vh 0
</style>
