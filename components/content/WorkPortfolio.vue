<template>
  <div class="work" :class="{'work--home': home}">
    <div v-if="caseStudies.length">
      <div class="work__modules">
        <div
          v-for="(caseStudy, index) in workModules"
          :key="index"
          class="work__module"
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
      <!-- <div v-for="(workModule, wmindex) in workModules" :key="wmindex">
        <div v-if="workModule.workModuleOne.length && wmindex === 0 || !home && workModule.workModuleOne.length && wmindex > 0" class="work__module work__module--1" :class="{ 'work__module--filtering': filtering }">
          <div
            v-for="(caseStudy, index) in workModule.workModuleOne"
            :key="index"
            :class="`work__item work__item--${index} ${index > 1 && 'fade fadeIn'}`"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media">
              <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 1316)})`" />
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 1316)})`" />
              <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 1316)})`" />
            </div>
            <div class="work__text">
              <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
            </div>
          </div>
        </div>
        <div v-if="workModule.workModuleTwo.length && wmindex === 0 || !home && workModule.workModuleTwo.length && wmindex > 0" class="work__module work__module--2" :class="{ 'work__module--filtering': filtering }">
          <div
            v-for="(caseStudy, index) in workModule.workModuleTwo"
            :key="index"
            :class="`work__item work__item--${index + 4} fade fadeIn`"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media">
              <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url)})`" />
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url)})`" />
              <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url)})`" />
            </div>
            <div class="work__text">
              <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
            </div>
          </div>
        </div>
        <div v-if="!home && workModule.workModuleThree.length" class="work__module work__module--5" :class="{ 'work__module--filtering': filtering }">
          <div
            v-for="(caseStudy, index) in workModule.workModuleThree"
            :key="index"
            :class="`work__item work__item--${index + 7} fade fadeIn`"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media">
              <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 1316)})`" />
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 1316)})`" />
              <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 1316)})`" />
            </div>
            <div class="work__text">
              <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
            </div>
          </div>
        </div>
        <div v-if="home && workModule.workModuleFour.length && wmindex === 0" class="work__module work__module--3" :class="{ 'work__module--filtering': filtering }">
          <div
            v-for="(caseStudy, index) in workModule.workModuleFour"
            :key="index"
            :class="`work__item work__item--${index + 5} fade fadeIn`"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media">
              <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 1316)})`" />
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 1316)})`" />
              <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 1316)})`" />
            </div>
            <div class="work__text">
              <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
            </div>
          </div>
          <div class="work__item work__item--6 fade fadeIn">
            <div class="work__link">
              <nuxt-link class="arrowLink" :to="{ name: 'work' }">
                See more
              </nuxt-link>
            </div>
          </div>
        </div>
        <div v-if="!home && workModule.workModuleFive.length" class="work__module work__module--2" :class="{ 'work__module--filtering': filtering }">
          <div
            v-for="(caseStudy, index) in workModule.workModuleFive"
            :key="index"
            :class="`work__item work__item--${index + 4} fade fadeIn`"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media">
              <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url)})`" />
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url)})`" />
              <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url)})`" />
            </div>
            <div class="work__text">
              <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
            </div>
          </div>
        </div>
        <div v-if="!home && workModule.workModuleSix.length" class="work__module work__module--6" :class="{ 'work__module--filtering': filtering }">
          <div
            v-for="(caseStudy, index) in workModule.workModuleSix"
            :key="index"
            :class="`work__item work__item--${index + 10} fade fadeIn`"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media">
              <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 1316)})`" />
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 1316)})`" />
              <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 1316)})`" />
            </div>
            <div class="work__text">
              <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
            </div>
          </div>
        </div>
        <div v-if="!home && workModule.workModuleSeven.length" class="work__module work__module--2" :class="{ 'work__module--filtering': filtering }">
          <div
            v-for="(caseStudy, index) in workModule.workModuleSeven"
            :key="index"
            :class="`work__item work__item--${index + 4} fade fadeIn`"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media">
              <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url)})`" />
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url)})`" />
              <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url)})`" />
            </div>
            <div class="work__text">
              <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
            </div>
          </div>
        </div>
        <div v-if="!home && workModule.workModuleEight.length" class="work__module work__module--1">
          <div
            v-for="(caseStudy, index) in workModule.workModuleEight"
            :key="index"
            :class="`work__item work__item--${index} fade fadeIn`"
            @click="$nuxt.$router.push({ name: 'work-id', params: { id: caseStudy.url } })"
          >
            <div class="work__media">
              <div v-if="caseStudy.thumbnail && !caseStudy.thumbnail.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.thumbnail.url, 1316)})`" />
              <video v-else-if="caseStudy.thumbnail" class="work__image" loop muted>
                <source :src="caseStudy.thumbnail.url" type="video/mp4">
              </video>
              <div v-else-if="caseStudy.banner && !caseStudy.banner.mime.includes('video')" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.banner.url, 1316)})`" />
              <div v-else-if="caseStudy.media && caseStudy.media.image" class="work__image" :style="`background-image:url(${setResponsive(caseStudy.media.image.url, 1316)})`" />
            </div>
            <div class="work__text">
              <span :class="getClass(caseStudy.type)">{{ caseStudy.type }}</span> {{ caseStudy.title }}
            </div>
          </div>
        </div>
      </div> -->
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
      workModules: []
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
      this.splitWork()
    },
    filteredWork () {
      this.caseStudies = [...this.filteredWork]
      this.filtering = true
      setTimeout(() => {
        this.splitWork()
        this.filtering = false
      }, 400)
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
  },
  methods: {
    splitWork () {
      let caseStudies = [...this.caseStudies]
      caseStudies = caseStudies.map(caseStudy => caseStudy.case_study)
      this.workModules = caseStudies
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
    width calc(50% - 2px)
    display inline-block
    margin-bottom 160px

    @media (max-width: $bp-sm)
      margin-bottom 96px
      width 100%

    @media (max-width: $bp-xs)
      margin-bottom 64px

    &:nth-child(even)
      position relative
      top 160px

      @media (max-width: $bp-sm)
        top 0

  &__media
    max-width 80%
    cursor pointer

    @media (max-width: $bp-sm)
      max-width 100%

    &--Right
      margin-left auto

    &--Center
      margin 0 auto

  &__image
    max-width 100%
    max-height 430px

  &__text
    margin-top 20px

    @media (max-width: $bp-sm)
      margin-top 10px

    span
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

  &--home
    margin -50px 0 0

    @media (max-width: $bp-sm)
      margin 0
</style>
