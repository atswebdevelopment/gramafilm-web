<template>
  <div class="page">
    <Article v-if="article && article.id" :article="article" />
    <Loader v-else />
    <div v-if="recentArticles.length && categories.length">
      <Journal :articles="recentArticles" :categories="categories" disable-load-more />
    </div>
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
    this.$apollo.query({ query: articlesQuery }).then(({ data }) => {
      this.recentArticles = [...data.articles]
    })
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
        { hid: 'description', name: 'description', content: (this.article && this.article.seo && this.article.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.article && this.article.seo && this.article.seo.title) || 'Gramafilm' },
        { hid: 'og:description', name: 'og:description', content: (this.article && this.article.seo && this.article.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'og:image', content: this.article && this.article.seo && this.article.seo.image && this.article.seo.image.url }
      ]
    }
  }
}
</script>
