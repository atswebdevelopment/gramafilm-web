<template>
  <div class="page">
    <Journal v-if="articles.length" :articles="articles" :categories="categories" />
    <Loader v-else />
    <GetInTouch footer-links />
  </div>
</template>

<script>
import categoriesQuery from '~/apollo/queries/article/categories'
import articlesQuery from '~/apollo/queries/article/articles'
export default {
  components: {
    Journal: () => import('~/components/pages/Journal'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      categories: [],
      articles: []
    }
  },
  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery
    },
    articles: {
      prefetch: true,
      query: articlesQuery
    }
  }
}
</script>

<style lang="stylus" scoped>
.page:before
  background linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(238,237,233,1) 80%)
</style>
