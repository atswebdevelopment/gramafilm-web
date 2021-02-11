<template>
  <div class="page">
    <Film v-if="filmData && filmData.id" :work="filmData" />
    <Loader v-else />
    <GetInTouch v-if="filmData && filmData.id" footer-links />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import filmQuery from '~/apollo/queries/work/film.gql'
export default {
  components: {
    Film: () => import('~/components/pages/Film'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      film: {},
      filmData: {}
    }
  },
  apollo: {
    film: {
      prefetch: false,
      query: filmQuery
    },
    film: {
      prefetch: true,
      query: gql`
        query Seo {
          film {
            seo {
              ... on ComponentContentSeo {
                title
                description
                image {
                  url
                }
              }
            }
          }
        }
      `
    }
  },
  created () {
    this.$apollo.query({ query: filmQuery }).then(({ data }) => {
      this.filmData = data.film
    })
  },
  head () {
    return {
      title: (this.film && this.film.seo && this.film.seo.title) || 'Gramafilm > Film',
      meta: [
        { hid: 'description', name: 'description', content: (this.film && this.film.seo && this.film.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.film && this.film.seo && this.film.seo.title) || 'Gramafilm > Film' },
        { hid: 'og:description', name: 'og:description', content: (this.film && this.film.seo && this.film.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'og:image', content: this.film && this.film.seo && this.film.seo.image && this.film.seo.image.url }
      ]
    }
  }
}
</script>
