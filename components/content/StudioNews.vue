<template>
  <div v-if="home.studionews" class="studio">
    <div class="studio__column studio__column--left">
      <div v-if="home.studionews[0]" class="studio__item">
        <a
          v-if="urlExternal(home.studionews[0].url)"
          :href="home.studionews[0].url"
          target="_blank"
          rel="noopener"
          title="Opens in a new window"
        >
          <img v-if="home.studionews[0].thumbnail" :src="home.studionews[0].thumbnail.url" :alt="home.studionews[0].thumbnail.alternativeText" class="studio__image-main">
          <p><span :class="getClass(home.studionews[0].label)">{{ capitalize(home.studionews[0].label) }}</span> {{ home.studionews[0].description }}</p>
        </a>
        <nuxt-link v-else :to="home.studionews[0].url">
          <img v-if="home.studionews[0].thumbnail" :src="home.studionews[0].thumbnail.url" :alt="home.studionews[0].thumbnail.alternativeText" class="studio__image-main">
          <p><span :class="getClass(home.studionews[0].label)">{{ capitalize(home.studionews[0].label) }}</span> {{ home.studionews[0].description }}</p>
        </nuxt-link>
        <a
          v-if="urlExternal(home.studionews[0].url)"
          :href="home.studionews[0].url"
          target="_blank"
          rel="noopener"
          title="Opens in a new window"
          class="arrowLink arrowLink--external"
        >
          {{ home.studionews[0].urlText || 'Visit site' }}
        </a>
        <nuxt-link v-else class="arrowLink arrowLink--internal" :to="home.studionews[0].url">
          {{ home.studionews[0].urlText || 'Read more' }}
        </nuxt-link>
      </div>
    </div>
    <div class="studio__column studio__column--right">
      <div v-for="(studionews, index) in home.studionews.slice(1, 4)" :key="index" class="studio__item">
        <a
          v-if="urlExternal(studionews.url)"
          :href="studionews.url"
          target="_blank"
          rel="noopener"
          title="Opens in a new window"
        >
          <div v-if="studionews.thumbnail" class="studio__image" :style="`background-image:url(${studionews.thumbnail.url})`" />
          <p><span :class="getClass(studionews.label)">{{ capitalize(studionews.label) }}</span> {{ studionews.description }}</p>
        </a>
        <nuxt-link v-else :to="studionews.url">
          <div v-if="studionews.thumbnail" class="studio__image" :style="`background-image:url(${studionews.thumbnail.url})`" />
          <p><span :class="getClass(studionews.label)">{{ capitalize(studionews.label) }}</span> {{ studionews.description }}</p>
        </nuxt-link>
        <a
          v-if="urlExternal(studionews.url)"
          :href="studionews.url"
          target="_blank"
          rel="noopener"
          title="Opens in a new window"
          class="arrowLink arrowLink--external"
        >
          {{ studionews.urlText || 'Visit site' }}
        </a>
        <nuxt-link v-else class="arrowLink arrowLink--internal" :to="studionews.url">
          {{ studionews.urlText || 'Read more' }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudioNews',
  props: {
    home: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getClass (type) {
      switch (type) {
      case 'work':
        return 'green'
      case 'announcement':
        return 'blue'
      case 'culture':
        return 'orange'
      default:
        return 'green'
      }
    },
    capitalize (text) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
    urlExternal (url) {
      return url.includes('http')
    }
  }
}
</script>

<style lang="stylus" scoped>
.studio
  display flex
  margin-top 96px

  @media (max-width $bp-md)
    display block

  &__column
    flex-grow 1
    flex-basis 0

  &__item
    display inline-block
    margin-left 32px
    margin-bottom 70px
    width calc(50% - 36px)
    vertical-align top

    @media (max-width $bp-sm)
      width 100%
      display block

    > a:first-child
      display block

  &__column--left
    .studio__item
      width 100%
      margin-left 0

  &__column--right
    @media (max-width $bp-md)
      width calc(100% + 40px)
      margin-left -20px

    @media (max-width $bp-sm)
      width 100%
      margin 0

    .studio__item
      @media (max-width $bp-md)
        margin 0 16px 70px

      @media (max-width $bp-sm)
        margin 0 0 40px

  &__image
    width 100%
    padding-top 100%
    background-position center
    background-size cover

  &__image-main
    width 100%
    max-height none
</style>
