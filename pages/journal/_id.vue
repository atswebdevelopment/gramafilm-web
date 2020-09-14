<template>
  <div class="page">
    <Article v-if="article && article.id" :article="article" />
    <Loader v-else />
    <Journal v-if="recentArticles.length && categories.length" :articles="recentArticles" :categories="categories" disable-load-more />
    <Loader v-else />
    <GetInTouch v-if="categories.length" footer-links />
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
      recentArticles: [],
      article: {}
    }
  },
  mounted () {
    setTimeout(() => {
      this.$apollo.query({ query: articlesQuery }).then(({ data }) => {
        this.recentArticles = [...data.articles]
      })
    }, 5000)
  },
  apollo: {
    categories: {
      prefetch: false,
      query: categoriesQuery
    },
    article: {
      prefetch: false,
      query: articleQuery,
      variables () {
        return {
          url: this.$route.params.id
        }
      },
      update (data) {
        return (data.articles && data.articles[0]) || this.$nuxt.$router.push({ name: 'journal' })
      }
    }
  },
  head () {
    return {
      title: (this.article && ((this.article.seo && this.article.seo.title) || this.article.title)) || 'Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: (this.article && this.article.seo && this.article.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' }
      ]
    }
  }
}
</script>
