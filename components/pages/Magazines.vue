<template>
  <div class="journal">
    <ContentArea overflow stretch>
      <div class="heading heading--center">
        <h1 class="h1-small">
          Magazine
        </h1>
      </div>
    </ContentArea>
    <ContentArea overflow no-padding>
      <Magazines :articles="filteredArticles" class="article-container" :class="{ 'article-container--filtering': filtering }" />
      <div v-if="!disableLoadMore && !filtering && !loading" class="load-more" :class="{ 'load-more--clickable': loadText === 'Load more'}" @click="loadText === 'Load more' && loadMore()">
        {{ loadText }}
      </div>
      <Loader v-if="filtering || loading" inline />
    </ContentArea>
  </div>
</template>

<script>
import magazinesQuery from '~/apollo/queries/magazine/magazines.gql'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Magazines: () => import('~/components/content/Magazines'),
    Loader: () => import('~/components/content/Loader')
  },
  props: {
    magazines: {
      type: Array,
      default: () => []
    },
    disableLoadMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filtering: false,
      loading: false,
      filteredArticles: [],
      limit: 10,
      loadText: 'Load more'
    }
  },
  mounted () {
    this.filteredArticles = [...this.magazines]
    if (this.filteredArticles.length < this.limit) {
      this.loadText = 'No more articles'
    }
    this.$store.commit('header/setDefaultColor', 'black')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
  },
  methods: {
    loadMore () {
      const start = this.filteredArticles.length
      this.loading = true
      const variables = { start }
      this.$apollo.query({ query: magazinesQuery, variables }).then(({ data }) => {
        if (data.articles.length < this.limit) {
          this.loadText = 'No more articles'
        }
        this.filteredArticles = [...this.filteredArticles, ...data.articles]
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
h1
  font-family $fontFamilyGTAlpinaItalic

.load-more
  text-align center

  &--clickable
    cursor pointer
    font-family $fontFamilySemiBold
    font-size 40px
    line-height 48px
    letter-spacing -.9px

.article-container
  opacity 1
  transition 0.4s opacity $ease

  &--filtering
    opacity 0
</style>
