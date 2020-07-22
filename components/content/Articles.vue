<template>
  <div class="articles">
    <div
      v-for="(article, index) in articles"
      :key="index"
      :class="{ 'articles__item--landscape': index % 10 === 1 || index % 10 === 7, 'articles__item--wide': index % 10 === 3 || index % 10 === 9 }"
      class="articles__item"
      @click="$nuxt.$router.push({ name: 'journal-id', params: { id: article.url } })"
    >
      <img :src="article.image.url" :alt="article.image.alternativeText">
      <p>{{ article.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Articles',
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
.articles
  margin 15vh 0 0
  text-align center

  @media (max-width $bp-sm)
    margin 5vh 0 0

  &__item
    vertical-align top
    display inline-block
    width 24%
    margin 0 2.5% 50px
    text-align left
    cursor pointer

    &--landscape
      width 36%

    &--wide
      width 65%

    @media (max-width $bp-sm)
      margin 0 0 20px
      width 100%

    img
      width 100%
</style>
