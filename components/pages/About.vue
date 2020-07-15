<template>
  <div class="about">
    <ContentArea>
      <h1>{{ about.title }}</h1>
      <img class="image-1 fade fadeIn" src="/images/about-showcase-1.png" alt="">
      <img class="image-2 fade fadeIn" src="/images/about-showcase-2.png" alt="">
      <h3>About us</h3>
      <p class="large">
        {{ about.introduction }}
      </p>
      <div class="about__inner">
        <ColumnContainer v-for="(section, index) in about.content" :key="`section-${index}`" class="fade fadeIn">
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
            {{ item.title }}
            <div class="contentSwitcher__tabcontent">
              <img v-if="item.image" :src="item.image.url" :alt="item.image.alternativeText">
              <div v-html="item.content" />
            </div>
          </div>
        </template>
        <template slot="contentWindow">
          <div v-for="(item, index) in about.expertise" :key="`c-${index}`" class="contentSwitcher__content" :class="{ 'contentSwitcher__content--active': index === 0}">
            <img v-if="item.image" :src="item.image.url" :alt="item.image.alternativeText">
            <div v-html="item.content" />
          </div>
        </template>
      </ContentSwitcher>
    </ContentArea>
    <ContentArea class="logos">
      <h3>Our clients</h3>
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
    <ContentArea>
      <h3>Awards</h3>
      <div class="awards fade fadeIn">
        <img src="/images/logo-webby.png" alt="">
      </div>
    </ContentArea>
    <ContentArea>
      <h3>People</h3>
      <p class="large">
        Gramafilm has a core team of creative specialists based in London, but with a wider global network we have created over 10 years.
      </p>
      <People v-if="people.length" :people="people" />
    </ContentArea>
    <FollowUs />
  </div>
</template>

<script>
import fadeIn from '~/helpers/fadeIn'
import { setResponsive } from '~/helpers/cdn'
import peopleQuery from '~/apollo/queries/people/people.gql'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column'),
    Video: () => import('~/components/content/Video'),
    ContentSwitcher: () => import('~/components/content/ContentSwitcher'),
    People: () => import('~/components/content/People'),
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
      people: [],
      setResponsive
    }
  },
  apollo: {
    people: {
      prefetch: false,
      query: peopleQuery
    }
  },
  mounted () {
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

  &__inner
    margin-top 10vh
    padding 0 4.1667%

    @media (max-width $bp-sm)
      padding 0
      margin-top 5vh

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

.awards
  display flex
  margin 10vh 0

  @media (max-width $bp-sm)
    display block
    margin 0
    text-align center

@media (max-width $bp-sm)
  .logos .column
    display inline-block
    width 48%
    vertical-align middle
</style>
