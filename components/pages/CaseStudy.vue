<template>
  <div class="case">
    <Banner class="case__banner" :video="caseStudy.banner && caseStudy.banner.mime.includes('video')" :background="caseStudy.banner && caseStudy.banner.url">
      <h1>{{ caseStudy.title }}</h1>
      <div class="banner__item banner__item--5">
        <div class="banner__media">
          <div class="banner__image" style="background-image:url(/landscape.png)" />
        </div>
      </div>
    </Banner>
    <ContentArea overflow>
      <p class="large">
        {{ caseStudy.introduction }}
      </p>
      <ColumnContainer no-padding>
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
      <div v-if="caseStudy.modules" class="casestudy">
        <div v-for="(section, index) in caseStudy.modules" :key="`section-${index}`" class="fade fadeIn">
          <div v-if="section.__typename === 'ComponentModulesVideo'" class="casestudy__module casestudy__module--1">
            <ColumnContainer>
              <Column>
                <div class="casestudy__item">
                  <div class="casestudy__media">
                    <img v-if="section.image" :src="section.image.url" :alt="section.image.alternativeText">
                    <Video v-else-if="section.qvideo" :video="section.qvideo" />
                  </div>
                </div>
              </Column>
            </ColumnContainer>
          </div>
          <div v-else-if="section.__typename === 'ComponentModules1X1'" class="casestudy__module casestudy__module--2">
            <ColumnContainer>
              <Column>
                <div class="casestudy__item">
                  <div class="casestudy__media">
                    <img v-if="section.column1image" :src="section.column1image.url" :alt="section.column1image.alternativeText">
                    <Video v-else-if="section.column1video" :video="section.column1video" />
                    <div v-html="section.column1content" />
                  </div>
                </div>
              </Column>
              <Column>
                <div class="casestudy__item">
                  <div class="casestudy__media">
                    <img v-if="section.column2image" :src="section.column2image.url" :alt="section.column2image.alternativeText">
                    <Video v-else-if="section.column2video" :video="section.column2video" />
                    <div v-html="section.column2content" />
                  </div>
                </div>
              </Column>
            </ColumnContainer>
          </div>
          <Quote v-else-if="section.__typename === 'ComponentModulesQuote'" class="casestudy__module casestudy__module--3">
            <template slot="quote">
              {{ section.quote }}
            </template>
            <template slot="cite">
              {{ section.citation }}
            </template>
          </Quote>
          <div v-else-if="section.__typename === 'ComponentModulesGallery'" class="casestudy__module casestudy__module--4">
            <h2>{{ section.title }}</h2>
            <Slider v-if="section.images" :items="section.images" />
          </div>
        </div>
      </div>
    </ContentArea>
    <GetInTouch footer-links />
    <Banner
      v-if="caseStudy.case_study"
      class="case__banner banner--bottom"
      :video="caseStudy.case_study && caseStudy.case_study.banner && caseStudy.case_study.banner.mime.includes('video')"
      :background="caseStudy.case_study && caseStudy.case_study.banner && caseStudy.case_study.banner.url"
      hide-overflow
    >
      <div class="banner__next" @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.case_study.id } })">
        Next
      </div>
      <h1 class="click" @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.case_study.id } })">{{ caseStudy.case_study.title }}</h1>
    </Banner>
  </div>
</template>

<script>
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
    }
  },
  mounted () {
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'white')
    }, 200)
    fadeIn()
  }
}
</script>

<style lang="stylus" scoped>
@media (max-width $bp-sm)
  .case__banner
    h1
      font-size 56px
      line-height 64px
      top 30vh
      letter-spacing 0

.large
  margin 30vh auto 5vh

  @media (max-width $bp-sm)
    margin-top 20vh

.casestudy
  p
    max-width 528px

  .quote
    padding 15vh 0

    @media (max-width $bp-sm)
      padding 10vh 0

  &__item
    width 100%

    img
      width 100%

    // &--1
    //   .casestudy__media
    //     margin 5px 0

    // &--3
    //   .casestudy__media
    //     margin 0 auto
    //     max-width 880px

    // &--4
    //   .casestudy__media
    //     margin-left auto
    //     max-width 432px
  &__module
    width calc(100% + 16px)
    margin-left -8px

    .column
      padding 3vh 8px
</style>
