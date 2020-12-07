<template>
  <div class="about">
    <ContentArea>
      <h1>{{ about.title }}</h1>
      <img v-if="about.image1 && about.image1.image && !about.image1.image.mime.includes('video')" class="image-1" :src="about.image1.image.url" :alt="about.image1.image.alternativeText">
      <video v-else-if="about.image1 && about.image1.image && about.image1.image.mime.includes('video')" loop muted autoplay>
        <source :src="about.image1.image.url" type="video/mp4">
      </video>
      <Video v-else-if="about.image1 && about.image1.qvideo" class="image-1" :video="about.image1.qvideo" />
      <img v-if="about.image2 && about.image2.image && !about.image2.image.mime.includes('video')" class="image-2" :src="about.image2.image.url" :alt="about.image2.image.alternativeText">
      <video v-else-if="about.image2 && about.image2.image && about.image2.image.mime.includes('video')" loop muted autoplay>
        <source :src="about.image2.image.url" type="video/mp4">
      </video>
      <Video v-else-if="about.image2 && about.image2.qvideo" class="image-1" :video="about.image2.qvideo" />
      <h3>About us</h3>
      <p class="large">
        {{ about.introduction }}
      </p>
      <div class="about__inner">
        <ColumnContainer v-for="(section, index) in about.content" :key="`section-${index}`" center class="fade fadeIn">
          <template v-if="section.__typename === 'ComponentColumnsOneColumn'">
            <Column>
              <p class="large center" v-html="section.content" />
            </Column>
          </template>
          <template v-else-if="section.__typename === 'ComponentColumnsVideo'">
            <Column>
              <Video v-if="section.qvideo" :video="section.qvideo" />
            </Column>
          </template>
          <template v-else>
            <Column v-if="!section.reverse">
              <img v-if="section.media" :src="setResponsive(section.media.url)" :alt="section.media.alternativeText">
            </Column>
            <Column wide>
              <div v-html="section.content" />
            </Column>
            <Column v-if="section.reverse">
              <img v-if="section.media" :src="setResponsive(section.media.url)" :alt="section.media.alternativeText">
            </Column>
          </template>
        </ColumnContainer>
      </div>
    </ContentArea>
    <ContentArea>
      <h3>Our expertise includes</h3>
      <ContentSwitcher>
        <template slot="tabs">
          <div v-for="(item, index) in about.expertise" :key="`t-${index}`" class="contentSwitcher__tab" :class="{ 'contentSwitcher__tab--active': index === 0}">
            <b>{{ item.title }}</b>
            <div v-if="mobile" class="contentSwitcher__tabcontent">
              <img v-if="item.image" :src="item.image.url" :alt="item.image.alternativeText || ''">
              <Video v-else-if="item.qvideo" :video="item.qvideo" />
              <div v-html="item.content" />
            </div>
          </div>
        </template>
        <template v-if="!mobile" slot="contentWindow">
          <div v-for="(item, index) in about.expertise" :key="`c-${index}`" class="contentSwitcher__content" :class="{ 'contentSwitcher__content--active': index === 0}">
            <img v-if="item.image" :src="item.image.url" :alt="item.image.alternativeText || ''">
            <Video v-else-if="item.qvideo" :video="item.qvideo" />
            <div v-html="item.content" />
          </div>
        </template>
      </ContentSwitcher>
    </ContentArea>
    <ContentArea class="logos">
      <h3>Clients</h3>
      <ColumnContainer no-padding center class="fade fadeIn">
        <Column>
          <img src="/images/logo-google.png" alt="">
        </Column>
        <Column>
          <img src="/images/logo-intel.png" alt="">
        </Column>
        <Column>
          <img src="/images/logo-microsoft.png" alt="">
        </Column>
        <Column>
          <img src="/images/logo-jeep.png" alt="">
        </Column>
      </ColumnContainer>
      <ColumnContainer no-padding center class="fade fadeIn">
        <Column>
          <img src="/images/logo-bbc.png" alt="">
        </Column>
        <Column>
          <img src="/images/logo-johnlewis.png" alt="">
        </Column>
        <Column>
          <img src="/images/logo-c4.png" alt="">
        </Column>
        <Column>
          <img src="/images/logo-samsung.png" alt="">
        </Column>
      </ColumnContainer>
    </ContentArea>
    <ContentArea class="awards">
      <h3>Awards</h3>
      <ColumnContainer no-padding center class="fade fadeIn">
        <Column>
          <img src="/images/logo-webby.png" alt="">
        </Column>
        <Column />
        <Column />
        <Column />
      </ColumnContainer>
    </ContentArea>
    <!-- <ContentArea>
      <h3>People</h3>
      <People v-if="people.length" :people="people" />
    </ContentArea> -->
    <FollowUs />
  </div>
</template>

<script>
import fadeIn from '~/helpers/fadeIn'
import { setResponsive } from '~/helpers/cdn'
// import peopleQuery from '~/apollo/queries/people/people.gql'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column'),
    Video: () => import('~/components/content/Video'),
    ContentSwitcher: () => import('~/components/content/ContentSwitcher'),
    // People: () => import('~/components/content/People'),
    FollowUs: () => import('~/components/content/FollowUs')
  },
  props: {
    about: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // people: [],
      setResponsive
    }
  },
  // apollo: {
  //   people: {
  //     prefetch: false,
  //     query: peopleQuery
  //   }
  // },
  computed: {
    mobile () {
      return window.innerWidth < 1024
    }
  },
  mounted () {
    this.$store.commit('header/setDefaultColor', 'black')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
    fadeIn()
  }
}
</script>

<style lang="stylus" scoped>
.about
  position relative
  z-index 1

  @media (max-width $bp-sm)
    h1
      font-size 15vw
      line-height 15vw

  &__inner
    margin-top 10vh
    padding 0 4.1667%

    @media (max-width $bp-sm)
      padding 0
      margin-top 5vh

    @media (max-width $bp-xs)
      font-family $fontFamily
      font-size 34px
      line-height 40px

    >>> h2
      font-size 48px
      line-height 54px
      font-family $fontFamily

.image-1
  width 41.667%
  margin-bottom 140px

  @media (max-width $bp-sm)
    margin-bottom 90px

.image-2
  width 33.33%
  position absolute
  right 0
  top 195px
  z-index -1

.awards .column
.logos .column
  justify-content center

  @media (max-width $bp-sm)
    display inline-block
    width 48%
    vertical-align middle

.awards img,
.logos img
  @media (max-width $bp-sm)
    margin 0 auto
    max-width 60%
    max-height 60px
</style>
