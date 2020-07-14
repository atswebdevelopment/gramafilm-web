<template>
  <div class="page">
    <Article v-if="article && article.id" :article="article" />
    <Loader v-else />
    <Journal v-if="articles.length && categories.length" :articles="articles" :categories="categories" disable-load-more />
    <Loader v-else />
    <GetInTouch footer-links />
  </div>
</template>

<script>
import categoriesQuery from '~/apollo/queries/article/categories'
import articlesQuery from '~/apollo/queries/article/articles'
import articleQuery from '~/apollo/queries/article/article'
export default {
  components: {
    Article: () => import('~/components/pages/Article'),
    Journal: () => import('~/components/pages/Journal'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      categories: [],
      articles: [],
      article: {}
    }
  },
  apollo: {
    categories: {
      prefetch: false,
      query: categoriesQuery
    },
    articles: {
      prefetch: false,
      query: articlesQuery
    },
    article: {
      prefetch: false,
      query: articleQuery,
      variables () {
        return {
          id: parseInt(this.$route.params.id)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.page:before
  background linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(238,237,233,1) 80%)
</style>
