<template>
  <div class="work" :class="{'work--home': home}">
    <div v-if="caseStudies.length">
      <div class="work__modules">
        <div class="work__column">
          <div
            v-for="(caseStudy, index) in workModulesMain"
            :key="index"
            class="work__module fade fadeIn"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media" :class="`work__media--${caseStudy.thumbnailPosition}`">
              <img v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :src="setResponsive(caseStudy.thumbnail.url, 1316)">
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <img v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :src="setResponsive(caseStudy.banner.url, 1316)">
              <img v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :src="setResponsive(caseStudy.media.url, 1316)">
              <div class="work__text">
                <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="screen === 'desktop'" class="work__column">
          <div
            v-for="(caseStudy, index) in workModules.filter((m, i) => i % 2 === 1)"
            :key="index"
            class="work__module fade fadeIn"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media" :class="`work__media--${caseStudy.thumbnailPosition}`">
              <img v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :src="setResponsive(caseStudy.thumbnail.url, 1316)">
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <img v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :src="setResponsive(caseStudy.banner.url, 1316)">
              <img v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :src="setResponsive(caseStudy.media.url, 1316)">
              <div class="work__text">
                <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
              </div>
            </div>
          </div>
          <div v-if="home" class="work__module work__module--see-more">
            <div class="work__link">
              <nuxt-link class="arrowLink" :to="{ name: 'work' }">
                See more
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import workQuery from '~/apollo/queries/work/work.gql'
import fadeIn from '~/helpers/fadeIn'
import { setResponsive } from '~/helpers/cdn'
export default {
  name: 'WorkPortfolio',
  props: {
    home: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      setResponsive,
      filtering: false,
      work: [],
      screen: null,
      caseStudies: [],
      workModules: [],
      workModulesMain: [],
      new: true
    }
  },
  apollo: {
    work: {
      prefetch: false,
      query: workQuery
    }
  },
  watch: {
    work () {
      if (this.type) {
        this.caseStudies = [...this.work.casestudies.filter(caseStudy => caseStudy.case_study.type && caseStudy.case_study.type === this.type)]
      } else {
        this.caseStudies = [...this.work.casestudies]
      }
      this.splitWork()
    }
  },
  mounted () {
    fadeIn()
    window.addEventListener('scroll', () => {
      const video = document.querySelectorAll('.work__media video')
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
    this.screen = window.innerWidth > 766 ? 'desktop' : 'mobile'
  },
  methods: {
    splitWork () {
      let caseStudies = [...this.caseStudies]
      caseStudies = caseStudies.map(caseStudy => caseStudy.case_study)
      this.workModules = this.home ? caseStudies.splice(0, 5) : caseStudies
      this.workModulesMain = this.screen === 'desktop' ? this.workModules.filter((m, i) => i % 2 === 0) : this.workModules
      fadeIn()
    },
    getClass (type) {
      switch (type) {
      case 'film':
        return 'orange'
      case 'design':
        return 'blue'
      default:
        return 'green'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.work
  margin 15vh 0 -15vh
  min-height 100vh

  @media (max-width: $bp-sm)
    margin-top 5vh

  &__modules
    display flex

    @media (max-width: $bp-xs)
      display block

  &__column
    flex-grow 1
    flex-basis 0
    margin-right 20px

    &:nth-child(even)
      margin-top 160px
      margin-right 0
      margin-left 20px

      @media (max-width: $bp-xs)
        margin-left 0

    @media (max-width: $bp-xs)
      margin-top 0
      margin-right 0

  &__modules
    display flex

  &__module
    margin-bottom 160px

    @media (max-width: $bp-sm)
      margin-bottom 96px
      width 100%

    @media (max-width: $bp-xs)
      margin-bottom 64px

    &--see-more
      width calc(50% - 10px)

  &__media
    max-width 80%

    @media (max-width: $bp-sm)
      max-width 100%

    &--Right
      margin-left auto

    &--Center
      margin 0 auto

  &__image
    max-width 100%
    max-height 530px
    cursor pointer

  &__text
    margin-top 20px
    cursor pointer
    display inline-block

    @media (max-width: $bp-sm)
      margin-top 10px
      display block

    span
      text-transform capitalize

  &__link
    font-size 56px
    width 650px
    line-height 64px
    text-align center
    margin 0 auto

    @media (max-width: $bp-sm)
      margin 100px auto 200px
      font-size 40px
      width 302px
      line-height 40px

    @media (max-width $bp-xs)
      font-size 34px
      line-height 42px

  &--home
    margin 96px 0 0

    @media (max-width: $bp-sm)
      margin 0
</style>
