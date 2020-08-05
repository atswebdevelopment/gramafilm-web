<template>
  <div class="article">
    <ContentArea overflow>
      <div class="article__aside">
        <p v-if="article.category && article.category.name" class="article__category" :class="article.category.colour">
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
</template>

<script>
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
    this.$store.commit('header/setDefaultColor', 'black')
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

  &__category
    margin-bottom 0
</style>
