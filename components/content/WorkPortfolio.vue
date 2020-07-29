<template>
  <div class="work" :class="{'work--home': home}">
    <div v-if="caseStudies.length">
      <div v-if="workModuleOne.length" class="work__module work__module--1" :class="{ 'work__module--filtering': filtering }">
        <div
          v-for="(caseStudy, index) in workModuleOne"
          :key="index"
          :class="`work__item work__item--${index} fade fadeIn`"
          @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.url } })"
        >
          <div class="work__media">
            <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 767)})`" />
            <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted autoplay>
              <source :src="caseStudy.thumbnail.url" type="video/mp4">
            </video>
            <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 767)})`" />
            <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 767)})`" />
          </div>
          <div class="work__text">
            <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
          </div>
        </div>
      </div>
      <div v-if="!home && workModuleOne.length" class="work__module work__module--4">
        <div class="work__marquee" />
      </div>
      <div v-if="workModuleTwo.length" class="work__module work__module--2" :class="{ 'work__module--filtering': filtering }">
        <div
          v-for="(caseStudy, index) in workModuleTwo"
          :key="index"
          :class="`work__item work__item--${index + 4} fade fadeIn`"
          @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.url } })"
        >
          <div class="work__media">
            <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 767)})`" />
            <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted autoplay>
              <source :src="caseStudy.thumbnail.url" type="video/mp4">
            </video>
            <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 767)})`" />
            <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 767)})`" />
          </div>
          <div class="work__text">
            <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
          </div>
        </div>
      </div>
      <div v-if="!home && workModuleThree.length" class="work__module work__module--5" :class="{ 'work__module--filtering': filtering }">
        <div
          v-for="(caseStudy, index) in workModuleThree"
          :key="index"
          :class="`work__item work__item--${index + 7} fade fadeIn`"
          @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.url } })"
        >
          <div class="work__media">
            <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 767)})`" />
            <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted autoplay>
              <source :src="caseStudy.thumbnail.url" type="video/mp4">
            </video>
            <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 767)})`" />
            <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 767)})`" />
          </div>
          <div class="work__text">
            <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
          </div>
        </div>
      </div>
      <div v-if="home && workModuleFour.length" class="work__module work__module--3" :class="{ 'work__module--filtering': filtering }">
        <div
          v-for="(caseStudy, index) in workModuleFour"
          :key="index"
          :class="`work__item work__item--${index + 5} fade fadeIn`"
          @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.url } })"
        >
          <div class="work__media">
            <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 767)})`" />
            <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted autoplay>
              <source :src="caseStudy.thumbnail.url" type="video/mp4">
            </video>
            <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 767)})`" />
            <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 767)})`" />
          </div>
          <div class="work__text">
            <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
          </div>
        </div>
        <div class="work__item work__item--6 fade fadeIn">
          <div class="work__link">
            <nuxt-link class="arrowLink" :to="{ name: 'work' }">
              See more of our work
            </nuxt-link>
          </div>
        </div>
      </div>
      <div v-if="!home && workModuleFive.length" class="work__module work__module--2" :class="{ 'work__module--filtering': filtering }">
        <div
          v-for="(caseStudy, index) in workModuleFive"
          :key="index"
          :class="`work__item work__item--${index + 4} fade fadeIn`"
          @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.url } })"
        >
          <div class="work__media">
            <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 767)})`" />
            <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted autoplay>
              <source :src="caseStudy.thumbnail.url" type="video/mp4">
            </video>
            <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 767)})`" />
            <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 767)})`" />
          </div>
          <div class="work__text">
            <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
          </div>
        </div>
      </div>
      <div v-if="!home && workModuleSix.length" class="work__module work__module--6" :class="{ 'work__module--filtering': filtering }">
        <div
          v-for="(caseStudy, index) in workModuleSix"
          :key="index"
          :class="`work__item work__item--${index + 10} fade fadeIn`"
          @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.url } })"
        >
          <div class="work__media">
            <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 767)})`" />
            <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted autoplay>
              <source :src="caseStudy.thumbnail.url" type="video/mp4">
            </video>
            <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 767)})`" />
            <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 767)})`" />
          </div>
          <div class="work__text">
            <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
          </div>
        </div>
      </div>
      <div v-if="!home && workModuleSeven.length" class="work__module work__module--2" :class="{ 'work__module--filtering': filtering }">
        <div
          v-for="(caseStudy, index) in workModuleSeven"
          :key="index"
          :class="`work__item work__item--${index + 4} fade fadeIn`"
          @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.url } })"
        >
          <div class="work__media">
            <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 767)})`" />
            <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted autoplay>
              <source :src="caseStudy.thumbnail.url" type="video/mp4">
            </video>
            <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 767)})`" />
            <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 767)})`" />
          </div>
          <div class="work__text">
            <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
          </div>
        </div>
      </div>
      <div v-if="!home && workModuleEight.length" class="work__module work__module--1">
        <div
          v-for="(caseStudy, index) in workModuleEight"
          :key="index"
          :class="`work__item work__item--${index} fade fadeIn`"
          @click="$nuxt.$router.push({ name: 'case-id', params: { id: caseStudy.url } })"
        >
          <div class="work__media">
            <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 767)})`" />
            <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted autoplay>
              <source :src="caseStudy.thumbnail.url" type="video/mp4">
            </video>
            <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 767)})`" />
            <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 767)})`" />
          </div>
          <div class="work__text">
            <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
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
    filteredWork: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      setResponsive,
      filtering: false,
      work: [],
      caseStudies: [],
      workModuleOne: [],
      workModuleTwo: [],
      workModuleThree: [],
      workModuleFour: [],
      workModuleFive: [],
      workModuleSix: [],
      workModuleSeven: [],
      workModuleEight: []
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
      this.caseStudies = [...this.work.casestudies]
      if (this.caseStudies.length < 7) {
        this.caseStudies = [...this.work.casestudies, ...this.work.casestudies]
      }
      if (this.caseStudies.length < 7) {
        this.caseStudies = [...this.work.casestudies, ...this.work.casestudies, ...this.work.casestudies]
      }
      this.splitWork()
    },
    filteredWork () {
      this.caseStudies = [...this.filteredWork]
      if (this.caseStudies.length < 7) {
        this.caseStudies = [...this.filteredWork, ...this.filteredWork]
      }
      if (this.caseStudies.length < 7) {
        this.caseStudies = [...this.filteredWork, ...this.filteredWork, ...this.filteredWork]
      }
      this.filtering = true
      setTimeout(() => {
        this.splitWork()
        this.filtering = false
      }, 400)
    }
  },
  mounted () {
    fadeIn()
  },
  methods: {
    splitWork () {
      let caseStudies = [...this.caseStudies]
      caseStudies = caseStudies.map(caseStudy => caseStudy.case_study)
      this.workModuleOne = []
      this.workModuleTwo = []
      this.workModuleThree = []
      this.workModuleFour = []
      this.workModuleFive = []
      this.workModuleSix = []
      this.workModuleSeven = []
      this.workModuleEight = []

      setTimeout(() => {
        this.workModuleOne = caseStudies.length > 0 ? caseStudies.slice(0, 4) : []
        this.workModuleTwo = caseStudies.length > 4 ? caseStudies.slice(4, 5) : []
        this.workModuleThree = caseStudies.length > 5 ? caseStudies.slice(5, 8) : []
        this.workModuleFour = caseStudies.length > 7 ? caseStudies.slice(7, 8) : []
        this.workModuleFive = caseStudies.length > 8 ? caseStudies.slice(8, 9) : []
        this.workModuleSix = caseStudies.length > 9 ? caseStudies.slice(9, 11) : []
        this.workModuleSeven = caseStudies.length > 11 ? caseStudies.slice(11, 12) : []
        this.workModuleEight = caseStudies.length > 12 ? caseStudies.slice(12, 16) : []
      }, 100)
      fadeIn()
    },
    getClass (type) {
      switch (type) {
        case 'event':
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

  &__module
    position relative
    margin-bottom 10vh
    transition 0.4s opacity $ease

    &--1
      height 1230px

    &--5,
    &--6
      .work__item
        display inline-block
        vertical-align top
        position static

    &--filtering
      opacity 0

    @media (max-width: $bp-sm)
      height auto
      margin 0

  &__item
    position absolute
    left 50%
    width 432px
    flex 1
    cursor pointer

    &--0
      margin-left 130px

    &--1
      top 160px
      width 658px
      margin-left -660px

      @media (max-width $bp-md)
        margin-left -482px
        width 568px

      .work__media
        height 438px

    &--2
      top 598px
      margin-left 224px

      .work__media
        height 576px

    &--3
      top 930px
      margin-left -532px

      @media (max-width $bp-md)
        margin-left -482px

    &--4
      position static
      width 1102px
      margin 0 auto

      .work__media
        height 689px

    &--5
      position static

      .work__media
        height 576px

    &--6
      top 240px
      margin-left 80px

    &--7
      width 32%

      .work__media
        height 217px

    &--8
      width 32%
      margin-left 5%

      .work__media
        height 217px

    &--9
      width 25%
      margin-left 5%

      .work__media
        height 426px

    &--10
      width 320px

      .work__media
        height 320px

    &--11
      width calc(89% - 320px)
      margin-left 10%

      .work__media
        height 370px

    @media (max-width: $bp-sm)
      position static
      margin 0
      width 100%
      margin-bottom 60px

  &__media
    width 100%
    height 243px
    margin-bottom 16px

    @media (max-width: $bp-sm)
      height 254px !important

  &__image
    width 100%
    height 100%
    background-position 50%
    background-size cover

  &__text span
    text-transform capitalize

  &__link
    font-size 56px
    width 382px
    line-height 64px
    text-align center

    @media (max-width: $bp-sm)
      margin 100px auto 200px
      font-size 40px
      width 302px
      line-height 40px

    @media (max-width $bp-xs)
      font-size 34px
      line-height 42px

  &__marquee
    height 51px
    background url(/logo.svg) 0 0
    background-size auto 51px
    width 3000px
    animation-name marquee
    animation-duration 4s
    animation-timing-function linear
    animation-iteration-count infinite
    transform translateX(-590px)
    margin-left -500px

    @media (max-width: $bp-sm)
      margin 100px 0

  &--home
    margin -50px 0 0

    @media (max-width: $bp-sm)
      margin 0

@keyframes marquee {
  from {
    transform translateX(0)
  }
  to {
    transform translateX(-590px)
  }
}
</style>
