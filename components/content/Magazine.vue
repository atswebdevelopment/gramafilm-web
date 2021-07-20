<template>
  <div class="articles">
    <div
      class="articles__item articles__item--wide fade fadeIn"
      @click="$nuxt.$router.push({ name: 'magazine-id', params: { id: articles[0].url } })"
    >
      <img v-if="articles[0].image" :src="articles[0].image.url" :alt="articles[0].image.alternativeText">
      <div class="articles__content">
        <h2 :style="{ 'color': !articles[0].inverttext ? 'white' : 'black' }">{{ articles[0].title }}</h2>
      </div>
    </div>
    <div class="articles__flex">
      <div class="inner-flex">
        <div
          v-for="(article, index) in magazines"
          :key="index"
          class="articles__item fade fadeIn"
          @click="$nuxt.$router.push({ name: 'magazine-id', params: { id: article.url } })"
        >
          <img v-if="article.image" :src="article.image.url" :alt="article.image.alternativeText">
          <div class="articles__content">
            <h2>{{ article.title }}</h2>
            <div v-if="article.introduction && index % 5 !== 0" v-html="article.introduction" />
            <div v-else-if="article.content && index % 5 !== 0" v-html="article.content" />
          </div>
        </div>
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
    this.magazines = [...this.articles.slice(1, 4)]
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
    align-items center
    width 29.3%

    @media (max-width $bp-md)
      margin 0 0 68px

    @media (max-width $bp-md)
      margin 0 0 40px
      width 31.3%

    img
      width 100%

    .articles__content
      h2
        font-family $fontFamilySteiner
        font-size 65px
        line-height 72px
        margin 0 0 20px

      div
        @media (max-width $bp-md)
          font-size 22px
          line-height 30px

    &--wide
      width 100%
      .articles__content
        position absolute
        bottom 52px
        left 52px

        h2
          margin 0

          @media (max-width $bp-sm)
            font-size 45px
            line-height 53px

      img
        height 680px
        width 100%
        object-fit cover

        @media (max-width $bp-sm)
          height 536px

  &__flex
    overflow auto

    .inner-flex
      display flex
      justify-content space-between

      @media (max-width $bp-sm)
        width 250%

    img
      margin-bottom 24px

    .articles__content
      h2
        font-size 40px
        line-height 48px
</style>
