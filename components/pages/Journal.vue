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
          <div v-for="filter in categories" :key="filter.id" class="filters__filter" :class="{ 'filters__filter--active': type === filter.id }" @click="filterArticles(filter.id)">
            {{ filter.name }}
          </div>
        </Filters>
      </div>
      <Articles :articles="filteredArticles" class="article-container" :class="{ 'article-container--filtering': filtering }" />
      <div v-if="!disableLoadMore" class="load-more">
        Load more
      </div>
    </ContentArea>
  </div>
</template>

<script>
import articlesByCategoryQuery from '~/apollo/queries/article/articles-by-category.gql'
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Filters: () => import('~/components/content/Filters'),
    Articles: () => import('~/components/content/Articles')
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
      filteredArticles: [],
      category: [],
      type: 0
    }
  },
  mounted () {
    this.filteredArticles = [...this.articles]
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
  },
  methods: {
    filterArticles (type) {
      const variables = { id: type }
      this.$apollo.query({ query: articlesByCategoryQuery, variables })
      this.filtering = true
      setTimeout(() => {
        if (type) {
          this.filteredArticles = []
          const variables = { id: type }
          this.$apollo.query({ query: articlesByCategoryQuery, variables }).then(({ data }) => {
            this.filteredArticles = [...data.category.articles]
          })
        } else {
          this.filteredArticles = [...this.articles]
        }
        this.filtering = false
      }, 400)
      this.type = type
    }
  }
}
</script>

<style lang="stylus" scoped>
.load-more
  margin 15vh 0 -15vh
  text-align center

  @media (max-width $bp-sm)
    margin 5vh 0

.article-container
  opacity 1
  transition 0.4s opacity $ease

  &--filtering
    opacity 0
</style>
