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
import categoriesQuery from '~/apollo/queries/article/categories.gql'
import articlesQuery from '~/apollo/queries/article/articles.gql'
import articleQuery from '~/apollo/queries/article/article.gql'
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
  },
  head () {
    return {
      title: (this.article && (this.article.seotitle || this.article.title)) || 'Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: (this.article && this.article.seodescription) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>
