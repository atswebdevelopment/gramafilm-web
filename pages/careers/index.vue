<template>
  <div class="page">
    <career v-if="careerData && careerData.id" :careers="careerData" />
    <Loader v-else />
    <GetInTouch v-if="careerData && careerData.id" footer-links careers />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import careerQuery from '~/apollo/queries/pages/careers.gql'
export default {
  components: {
    Career: () => import('~/components/pages/Careers'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      career: {},
      careerData: {}
    }
  },
  apollo: {
    career: {
      prefetch: true,
      query: gql`
        query Seo {
          career {
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
    this.$apollo.query({ query: careerQuery }).then(({ data }) => {
      this.careerData = data.career
    })
  },
  head () {
    return {
      title: (this.career && this.career.seo && this.career.seo.title) || 'Gramafilm career',
      meta: [
        { hid: 'description', name: 'description', content: (this.career && this.career.seo && this.career.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.career && this.career.seo && this.career.seo.title) || 'Gramafilm career' },
        { hid: 'og:description', name: 'og:description', content: (this.career && this.career.seo && this.career.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'image', property: 'og:image', content: this.career && this.career.seo && this.career.seo.image && this.career.seo.image.url }
      ]
    }
  }
}
</script>
