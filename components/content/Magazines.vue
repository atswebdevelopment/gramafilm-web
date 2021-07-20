<template>
  <div class="articles">
    <div
      v-for="(article, index) in articles"
      :key="index"
      :class="{ 'articles__item--right': index % 5 === 2 || index % 5 === 4, 'articles__item--wide': index % 5 === 0 }"
      class="articles__item"
      @click="$nuxt.$router.push({ name: 'magazine-id', params: { id: article.url } })"
    >
      <img v-if="article.image" :src="article.image.url" :alt="article.image.alternativeText">
      <div class="articles__content">
        <h2 :style="{ 'color': !article.inverttext && index % 5 === 0 ? 'white' : 'black' }">{{ article.title }}</h2>
        <div v-if="article.introduction && index % 5 !== 0" v-html="article.introduction" />
        <div v-else-if="article.content && index % 5 !== 0" v-html="article.content" />
      </div>
    </div>
  </div>
</template>

<script>
import fadeIn from '~/helpers/fadeIn'
export default {
  name: 'Articles',
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  },
  created () {
    fadeIn()
  }
}
</script>

<style lang="stylus" scoped>
.articles
  margin 7vh 50px 0

  @media (max-width $bp-sm)
    margin 0

  &__item
    margin 0 0 128px
    text-align left
    cursor pointer
    position relative
    display flex
    align-items center

    img
      width calc(50% - 50px)
      height 370px
      object-fit cover

    .articles__content
      width calc(50% - 50px)
      margin-left auto

      h2
        font-family $fontFamilySteiner
        font-size 65px
        line-height 72px
        margin 0 0 20px

    &--wide
      .articles__content
        position absolute
        bottom 52px
        left 52px

        h2
          margin 0

      img
        height 680px
        width 100%

    &--right
      flex-direction row-reverse

      .articles__content
        margin 0 auto 0 0

    @media (max-width $bp-sm)
      margin 0 0 20px
      width 100%
</style>
