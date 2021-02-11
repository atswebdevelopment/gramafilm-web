<template>
  <div class="page">
    <Journal v-if="articles && articles.length" :articles="articles" :categories="categories" />
    <Loader v-else />
    <GetInTouch v-if="articles && articles.length" footer-links />
  </div>
</template>

<script>
import categoriesQuery from '~/apollo/queries/article/categories.gql'
import articlesQuery from '~/apollo/queries/article/articles.gql'
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
      prefetch: false,
      query: articlesQuery
    }
  },
  head () {
    return {
      title: 'Gramafilm > Journal',
      meta: [
        { hid: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: 'Gramafilm > Journal' },
        { hid: 'og:description', name: 'og:description', content: 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  background $white
</style>
