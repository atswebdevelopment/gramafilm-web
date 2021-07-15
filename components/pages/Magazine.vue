<template>
  <div v-if="article.modules && article.modules.length" class="case">
    <span class="toptitle" :style="{ 'color': article.inverttext ? 'black' : 'white' }">{{ article.toptitle }}</span>
    <Banner v-if="article.image" class="case__banner" :background="article.image.url" :black="article.inverttext">
      <h1 :class="{ 'header-top': article.textposition === 'Top', 'header-center': article.textposition === 'Middle', 'header-bottom': article.textposition === 'Bottom'}">{{ article.title }}</h1>
    </Banner>
    <ContentArea>
      <p v-if="article.introduction" class="case__intro">
        {{ article.introduction }}
      </p>
      <div v-if="article.modules" class="casestudy">
        <div v-for="(section, index) in article.modules" :key="`section-${index}`" class="fade fadeIn module bgModule" :data-background="section.backgroundcolour || section.backgroundcolour2 || section.backgroundcolour3 || section.backgroundcolour4 || section.backgroundcolour5">
          <div class="module__inner">
            <template v-if="section.__typename === 'ComponentMagazines1'">
              <div class="casestudy__item">
                <div v-if="section.image" class="casestudy__media">
                  <div class="casestudy__image">
                    <img v-if="section.image && !section.image.mime.includes('video')" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                    <span class="caption">{{ section.image.caption }}</span>
                  </div>
                  <!-- <video v-else-if="section.image && section.image.mime.includes('video')" class="looped" loop muted>
                    <source :src="section.image.url" type="video/mp4">
                  </video>
                  <Video v-else-if="section.qvideo" :video="section.qvideo" fullscreen /> -->
                </div>
                <div v-else-if="section.content && section.content != '<p><br></p>'" class="casestudy__content" v-html="section.content.replaceAll('<p><br></p>','')" />
              </div>
            </template>
            <template v-else-if="section.__typename === 'ComponentMagazinesImageLeft'">
              <div class="casestudy__item">
                <div v-if="section.image" class="casestudy__media casestudy__media--left">
                  <div class="casestudy__image">
                    <img v-if="section.image && !section.image.mime.includes('video')" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                    <span class="caption">{{ section.image.caption }}</span>
                  </div>
                  <div v-if="section.content && section.content != '<p><br></p>'" class="casestudy__media-content" v-html="section.content.replaceAll('<p><br></p>','')" />
                  <!-- <video v-else-if="section.image && section.image.mime.includes('video')" class="looped" loop muted>
                    <source :src="section.image.url" type="video/mp4">
                  </video>
                  <Video v-else-if="section.qvideo" :video="section.qvideo" fullscreen /> -->
                </div>
              </div>
            </template>
            <template v-else-if="section.__typename === 'ComponentMagazinesImageRight'">
              <div class="casestudy__item">
                <div v-if="section.image" class="casestudy__media casestudy__media--right">
                  <div class="casestudy__image">
                    <img v-if="section.image && !section.image.mime.includes('video')" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                    <span class="caption">{{ section.image.caption }}</span>
                  </div>
                  <div v-if="section.content && section.content != '<p><br></p>'" class="casestudy__media-content" v-html="section.content.replaceAll('<p><br></p>','')" />
                  <!-- <video v-else-if="section.image && section.image.mime.includes('video')" class="looped" loop muted>
                    <source :src="section.image.url" type="video/mp4">
                  </video>
                  <Video v-else-if="section.qvideo" :video="section.qvideo" fullscreen /> -->
                </div>
              </div>
            </template>
            <template v-else-if="section.__typename === 'ComponentMagazinesImageCenter'">
              <div class="casestudy__item">
                <div v-if="section.image" class="casestudy__media casestudy__media--center">
                  <div class="casestudy__image">
                    <img v-if="section.image && !section.image.mime.includes('video')" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                    <span class="caption">{{ section.image.caption }}</span>
                  </div>
                  <div v-if="section.content && section.content != '<p><br></p>'" class="casestudy__media-content" v-html="section.content.replaceAll('<p><br></p>','')" />
                  <!-- <video v-else-if="section.image && section.image.mime.includes('video')" class="looped" loop muted>
                    <source :src="section.image.url" type="video/mp4">
                  </video>
                  <Video v-else-if="section.qvideo" :video="section.qvideo" fullscreen /> -->
                </div>
              </div>
            </template>
            <template v-else-if="section.__typename === 'ComponentMagazinesImageList'">
              <div class="casestudy__item">
                <div class="casestudy__media casestudy__media--list">
                  <div v-for="(image, index2) in section.images" :key="`section-${index2}`" class="casestudy__image">
                    <img v-if="!image.mime.includes('video')" :src="setResponsive(image.url)" :alt="image.alternativeText">
                    <span>{{ image.caption }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </ContentArea>
    <ContentArea>
      <h2>Magazine</h2>
      <Slider v-if="article.relatedmagazines" :items="getItems()" />
    </ContentArea>
    <GetInTouch footer-links />
  </div>
  <div v-else class="article">
    <ContentArea overflow>
      <div class="article__aside">
        <h1 class="h1-small">
          {{ article.title }}
        </h1>
        <ShareLinks />
      </div>
      <div class="article__content">
        <img v-if="article.image" :src="setResponsive(article.image.url)" class="article__image" :alt="article.image.alternativeText">
        <div v-html="article.content" />
      </div>
    </ContentArea>
  </div>
</template>

<script>
import { setResponsive } from '~/helpers/cdn'
import fadeIn from '~/helpers/fadeIn'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Banner: () => import('~/components/content/Banner'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Slider: () => import('~/components/content/Slider'),
    ShareLinks: () => import('~/components/content/ShareLinks')
  },
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      setResponsive
    }
  },
  mounted () {
    if (this.article.modules && this.article.modules.length) {
      this.$store.commit('header/setDefaultColor', this.article.inverttext ? 'black' : 'white')
      setTimeout(() => {
        this.$store.commit('header/setDefaultColor', this.article.inverttext ? 'black' : 'white')
      }, 200)
    } else {
      this.$store.commit('header/setDefaultColor', 'black')
      setTimeout(() => {
        this.$store.commit('header/setDefaultColor', 'black')
      }, 200)
    }
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
    getItems () {
      let items = this.article.relatedmagazines
      if (items.length < 8) {
        const m = this.article.relatedmagazines.concat(this.article.relatedmagazines)
        const test = this.article.relatedmagazines.concat(this.article.relatedmagazines)
        items = m.concat(test)
      }
      return items
    }
  }
}
</script>

<style lang="stylus" scoped>
.article
  padding-top 10vh
  background #eeede9

  &__aside
    position sticky
    top 17vh
    width 45%
    display inline-block
    vertical-align top
    margin -1em 0 1em

    @media (max-width: $bp-sm)
      position static
      width 100%
      margin 20px 0 40px

    h1
      margin-bottom 114px
      font-family $fontFamilySteiner

      @media (max-width: $bp-sm)
        margin 0 0 30px

  &__content
    width 49%
    margin-left 5%
    display inline-block
    vertical-align top

    @media (max-width: $bp-sm)
      width 100%
      margin-left 0

  &__image
    margin-bottom 2em

  &__category
    margin-bottom 0

.case
  overflow hidden

  &__intro
    display block
    max-width 1104px
    margin 0 auto 120px
    font-size 48px
    line-height 54px
    font-family $fontFamilyGTAlpina

.toptitle
  position absolute
  top 4vh
  left 50%
  z-index 3
  transform translate(-50%)
  font-size 50px
  line-height 58px
  font-family $fontFamilyGTAlpina
  color $white

.case__banner h1
  font-size 124px
  line-height 134px
  margin 0
  width 100%
  font-family $fontFamilySteiner
  text-align center

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
  max-width 1440px
  margin 0 auto

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

  &__content
    max-width 657px
    margin 0 auto 120px

    >>> *:first-child
      margin-top 0

  &__media
    margin 0 auto
    max-width 992px

    .casestudy__media-content
      position absolute
      top 50%
      transform translateY(-50%)
      width 650px
      font-family $fontFamilySteiner
      font-size 85px
      line-height 90px

    &--left
      max-width 880px
      margin 0

      img
        margin-left auto

      .casestudy__media-content
        right 0

    &--right
      max-width 880px
      margin 0 0 0 auto

      .casestudy__media-content
        left 0

    &--list
      display flex
      align-items center
      justify-content center
      max-width 1440px
      margin 0

      .casestudy__image
        width calc(33.33% - 112px)
        padding 0 56px

    &--center
      max-width 50%
      margin 0

      img
        margin-left auto

      .casestudy__media-content
        left calc(50% - 94px)
        font-size 48px
        line-height 54px
        font-family $fontFamilyGTAlpina

  &__item
    width 100%
    position relative
    margin-bottom 120px

    img,
    video
      max-width 100%
      max-height 660px

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

.caption
  color #9A9B9B
  margin-top 6px
  font-size 16px
  font-family $fontFamilyGTAlpina

.module__inner
  width 100%
  display inline-block

.bgModule[data-background=dark_blue],
.bgModule[data-background=dark_yellow]
  color $white

  .caption
    color #e5e5e5

.large
  max-width 1104px
</style>
