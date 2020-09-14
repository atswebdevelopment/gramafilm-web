<template>
  <div class="page">
    <Article v-if="particle && particle.id" :article="particle" />
    <Loader v-else />
  </div>
</template>

<script>
import articleQuery from '~/apollo/queries/article/article.gql'
export default {
  components: {
    Article: () => import('~/components/pages/Article'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      particle: {},
      tempdata: {}
    }
  },
  apollo: {
    particle: {
      prefetch: false,
      query: articleQuery,
      variables () {
        return {
          url: this.$route.params.id
        }
      },
      update (data) {
        if (data.articles && data.articles[0]) {
          this.particle = data.articles[0]
          console.log('done', this.particle)
          return data.articles[0]
        } else {
          return this.$nuxt.$router.push({ name: 'journal' })
        }
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
