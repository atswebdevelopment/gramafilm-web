<template>
  <div class="page">
    <Design v-if="designData && designData.id" :work="designData" />
    <Loader v-else />
    <GetInTouch v-if="designData && designData.id" footer-links />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import designQuery from '~/apollo/queries/work/design.gql'
export default {
  components: {
    Design: () => import('~/components/pages/Design'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      design: {},
      designData: {}
    }
  },
  apollo: {
    design: {
      prefetch: false,
      query: designQuery
    },
    design: {
      prefetch: true,
      query: gql`
        query Seo {
          design {
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
    this.$apollo.query({ query: designQuery }).then(({ data }) => {
      this.designData = data.design
    })
  },
  head () {
    return {
      title: (this.design && this.design.seo && this.design.seo.title) || 'Gramafilm > Design',
      meta: [
        { hid: 'description', name: 'description', content: (this.design && this.design.seo && this.design.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.design && this.design.seo && this.design.seo.title) || 'Gramafilm > Design' },
        { hid: 'og:description', name: 'og:description', content: (this.design && this.design.seo && this.design.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'og:image', content: this.design && this.design.seo && this.design.seo.image && this.design.seo.image.url }
      ]
    }
  }
}
</script>
