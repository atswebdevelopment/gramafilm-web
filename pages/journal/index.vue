<template>
  <div class="page">
    <Journal v-if="articles && articles.length" :articles="articles" :categories="categories" />
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
      prefetch: false,
      query: categoriesQuery
    },
    articles: {
      prefetch: false,
      query: articlesQuery
    }
  },
  head () {
    return {
      title: 'Gramafilm > Journal',
      meta: [
        { hid: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page:before
  background linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(238,237,233,1) 80%)
</style>
