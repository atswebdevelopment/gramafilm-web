<template>
  <div class="journal">
    <ContentArea overflow>
      <div class="heading">
        <h1 class="h1-small">
          Journal
        </h1>
        <Filters>
          <div class="filters__filter" :class="{ 'filters__filter--active': type === 0 }" @click="filterArticles(0)">
            All
          </div>
          <div v-for="filter in categories" :key="filter.id" class="filters__filter" :class="{ 'filters__filter--active': type === filter.id, 'filters__filter--green': filter.colour === 'green', 'filters__filter--blue': filter.colour === 'blue', 'filters__filter--orange': filter.colour === 'orange' }" @click="filterArticles(filter.id)">
            {{ filter.name }}
          </div>
        </Filters>
      </div>
      <Articles :articles="filteredArticles" class="article-container" :class="{ 'article-container--filtering': filtering }" />
      <div v-if="!disableLoadMore && !filtering && !loading" class="load-more" :class="{ 'load-more--clickable': loadText === 'Load more'}" @click="loadText === 'Load more' && loadMore()">
        {{ loadText }}
      </div>
      <Loader v-if="filtering || loading" inline />
    </ContentArea>
  </div>
</template>

<script>
import articlesByCategoryQuery from '~/apollo/queries/article/articles-by-category.gql'
import articlesQuery from '~/apollo/queries/article/articles.gql'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Filters: () => import('~/components/content/Filters'),
    Articles: () => import('~/components/content/Articles'),
    Loader: () => import('~/components/content/Loader')
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    articles: {
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
      category: [],
      type: 0,
      limit: 10,
      loadText: 'Load more'
    }
  },
  mounted () {
    this.filteredArticles = [...this.articles]
    if (this.filteredArticles.length < this.limit) {
      this.loadText = 'No more articles'
    }
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
  },
  methods: {
    filterArticles (type) {
      this.filtering = true
      setTimeout(async () => {
        if (type) {
          this.filteredArticles = []
          const variables = { id: type }
          await this.$apollo.query({ query: articlesByCategoryQuery, variables }).then(({ data }) => {
            this.filteredArticles = [...data.category.articles]
          })
        } else {
          this.filteredArticles = [...this.articles]
        }
        this.filtering = false
        this.loadText = this.filteredArticles.length ? this.filteredArticles.length < this.limit ? 'No more articles' : 'Load more' : 'No articles'
      }, 400)
      this.type = type
    },
    loadMore () {
      const start = this.filteredArticles.length
      this.loading = true
      if (this.type) {
        const variables = { id: this.type, start }
        this.$apollo.query({ query: articlesByCategoryQuery, variables }).then(({ data }) => {
          if (data.category.articles.length < this.limit) {
            this.loadText = 'No more articles'
          }
          this.filteredArticles = [...this.filteredArticles, ...data.category.articles]
          this.loading = false
        })
      } else {
        const variables = { start }
        this.$apollo.query({ query: articlesQuery, variables }).then(({ data }) => {
          if (data.articles.length < this.limit) {
            this.loadText = 'No more articles'
          }
          this.filteredArticles = [...this.filteredArticles, ...data.articles]
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.journal
  background $white

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
