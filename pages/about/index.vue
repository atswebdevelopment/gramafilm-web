<template>
  <div class="page">
    <About v-if="aboutData && aboutData.id" :about="aboutData" />
    <Loader v-else />
    <GetInTouch v-if="aboutData && aboutData.id" footer-links />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import aboutQuery from '~/apollo/queries/pages/about.gql'
export default {
  components: {
    About: () => import('~/components/pages/About'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      about: {},
      aboutData: {}
    }
  },
  apollo: {
    about: {
      prefetch: true,
      query: gql`
        query Seo {
          about {
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
    this.$apollo.query({ query: aboutQuery }).then(({ data }) => {
      this.aboutData = data.about
    })
  },
  head () {
    return {
      title: (this.about && this.about.seo && this.about.seo.title) || 'About Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: (this.about && this.about.seo && this.about.seo.description) || 'About Gramafilm' },
        { hid: 'og:title', name: 'og:title', content: (this.about && this.about.seo && this.about.seo.title) || 'About Gramafilm' },
        { hid: 'og:description', name: 'og:description', content: (this.about && this.about.seo && this.about.seo.description) || 'About Gramafilm' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'og:image', content: this.about && this.about.seo && this.about.seo.image && this.about.seo.image.url }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  background $secondary
</style>
