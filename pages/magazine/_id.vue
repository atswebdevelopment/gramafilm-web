<template>
  <div class="page" :class="`page--${background}`">
    <Magazine v-if="magazines && magazines.id" :article="magazines" :articles="magazinesZ" />
    <Loader v-else />
    <GetInTouch v-if="categories.length" footer-links />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import magazinesQuery from '~/apollo/queries/magazine/magazines.gql'
import magazineQuery from '~/apollo/queries/magazine/magazine.gql'
export default {
  components: {
    Magazine: () => import('~/components/pages/Magazine'),
    // Journal: () => import('~/components/pages/Journal'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      categories: [],
      magazine: {},
      magazines: {},
      magazinesZ: {},
      whiteBg: false,
      background: ''
    }
  },
  head () {
    return {
      title: (this.magazine && ((this.magazine.seo && this.magazine.seo.title) || this.magazine.title)) || 'Gramafilm',
      meta: [
        { hid: 'description', name: 'description', content: (this.magazine && this.magazine.seo && this.magazine.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:title', name: 'og:title', content: (this.magazine && this.magazine.seo && this.magazine.seo.title) || 'Gramafilm' },
        { hid: 'og:description', name: 'og:description', content: (this.magazine && this.magazine.seo && this.magazine.seo.description) || 'Gramafilm produce branded content and films for broadcasters and brands. We&#39;re an independent production company based in London, UK.' },
        { hid: 'og:url', name: 'og:url', content: `https://www.gramafilm.com${this.$route.path}` },
        { hid: 'og:image', name: 'image', property: 'og:image', content: this.magazine && this.magazine.seo && this.magazine.seo.image && this.magazine.seo.image.url }
      ]
    }
  },
  mounted () {
    this.$apollo.query({ query: magazinesQuery }).then(({ data }) => {
      this.magazinesZ = [...data.magazines]
    })

    const journal = document.querySelector('.article-journal')
    if (journal) {
      window.addEventListener('scroll', () => {
        const sectionTop = journal.getBoundingClientRect().top
        const sectionBound = sectionTop + journal.offsetHeight
        if ((sectionTop - (window.innerHeight / 2) < 0) && (sectionBound > (window.innerHeight / 2))) {
          this.whiteBg = true
        } else {
          this.whiteBg = false
        }
      })
    }

    window.addEventListener('scroll', () => {
      let background = ''
      const bgs = document.querySelectorAll('.bgModule')
      if (bgs.length) {
        bgs.forEach((e, i) => {
          const sectionTop = e.getBoundingClientRect().top
          const sectionBound = sectionTop + e.offsetHeight
          if ((sectionTop - (window.innerHeight / 2) < 0) && (sectionBound > (window.innerHeight / 2))) {
            background = e.getAttribute('data-background')
          }
        })
      }
      this.background = background
    })
  },
  apollo: {
    magazines: {
      prefetch: false,
      query: magazineQuery,
      variables () {
        return {
          url: this.$route.params.id
        }
      },
      update (data) {
        return (data.magazines && data.magazines[0]) || this.$nuxt.$router.push({ name: 'magazine' })
      }
    },
    article: {
      prefetch: true,
      query: gql`
        query Seo ($url: String!) {
          magazines (where: { url: $url }) {
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
      `,
      variables () {
        return {
          url: this.$route.params.id
        }
      },
      update (data) {
        return (data.magazines && data.magazines[0]) || this.$nuxt.$router.push({ name: 'magazine' })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  padding 0
  background $white
  transition 1.4s background-color $ease

  &--tertiary
    background $tertiary

  &--pale_yellow
    background #EEEDE9

  &--pale_red
    background #E8DEDD

  &--pale_green
    background #E0E1D4

  &--pale_blue
    background #DBE3E6

  &--pale_pink
    background #EBE0E9

  &--orange
    background #EFB08D

  &--green
    background #BAC294

  &--blue
    background #9EBBB6

  &--dark_blue
    background #768393

  &--dark_yellow
    background #88877E
</style>
