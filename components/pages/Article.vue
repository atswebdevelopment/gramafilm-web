<template>
  <div class="article">
    <ContentArea overflow>
      <div class="article__aside">
        <p v-if="article.category && article.category.name" :class="article.category.colour">
          {{ article.category.name }}
        </p>
        <h1 class="h1-small">
          {{ article.title }}
        </h1>
        <ShareLinks />
      </div>
      <div class="article__content">
        <img v-if="article.image" :src="setCDNPath(article.image.url)" class="article__image" :alt="article.image.alternativeText">
        <div v-html="article.content" />
      </div>
    </ContentArea>
  </div>
  <!-- <div>
    <div v-if="article.image" id="banner" class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding" :data-src="api_url + article.image.url" uk-img>
      <h1>
        {{ article.title }}
      </h1>
    </div>
    <div class="uk-section">
      <div class="uk-container uk-container-small">
        eslint-disable-next-line
        <div v-if="article.content" id="editor" v-html="$md.render(article.content)" />
        <p v-if="article.published_at">
          {{ moment(article.published_at).format("MMM Do YY") }}
        </p>
      </div>
    </div>
  </div> -->
</template>

<script>
// const moment = require('moment')
import setCDNPath from '~/helpers/cdn'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
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
      setCDNPath
    }
  },
  mounted () {
    console.log(this.article)
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
  }
}
</script>

<style lang="stylus" scoped>
.article
  &__aside
    position sticky
    top 15vh
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

      @media (max-width: $bp-sm)
        margin-bottom 30px

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
</style>
