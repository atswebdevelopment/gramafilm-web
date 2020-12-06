<template>
  <div class="work">
    <ContentArea stretch>
      <div class="heading">
        <h1 class="h1-small">
          {{ work.title }}
        </h1>
        <Filters>
          <div class="filters__filter" :class="{ 'filters__filter--active': type === '' }" @click="filterWork('')">
            All
          </div>
          <div class="filters__filter filters__filter--orange" :class="{ 'filters__filter--active': type === 'film' }" @click="filterWork('film')">
            Film
          </div>
          <div class="filters__filter filters__filter--green" :class="{ 'filters__filter--active': type === 'event' }" @click="filterWork('event')">
            Event
          </div>
          <div class="filters__filter filters__filter--blue" :class="{ 'filters__filter--active': type === 'design' }" @click="filterWork('design')">
            Design
          </div>
        </Filters>
      </div>
      <WorkPortfolio :filtered-work="filteredWork" @filter-work="filterWorkByUrl" />
    </ContentArea>
  </div>
</template>

<script>
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Filters: () => import('~/components/content/Filters'),
    WorkPortfolio: () => import('~/components/content/WorkPortfolio')
  },
  props: {
    work: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      type: '',
      filteredWork: []
    }
  },
  mounted () {
    this.$store.commit('header/setDefaultColor', 'black')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
    window.onpopstate = (event) => {
      const query = event.target.location.href.split('?')
      if (query[1]) {
        this.filteredWork = this.work.casestudies.filter(caseStudy => caseStudy.case_study.type && caseStudy.case_study.type === query[1])
      } else {
        this.filteredWork = this.work.casestudies
      }
      this.type = query[1]
    }
  },
  methods: {
    filterWork (type) {
      if (type) {
        this.filteredWork = this.work.casestudies.filter(caseStudy => caseStudy.case_study.type && caseStudy.case_study.type === type)
        history.pushState(
          { },
          null,
          this.$route.path + '?' + type
        )
      } else {
        this.filteredWork = this.work.casestudies
        history.pushState(
          { },
          null,
          this.$route.path
        )
      }
      this.type = type
    },
    filterWorkByUrl () {
      if (this.$nuxt.$route.query.film === null) {
        this.filterWork('film')
      } else if (this.$nuxt.$route.query.event === null) {
        this.filterWork('event')
      } else if (this.$nuxt.$route.query.design === null) {
        this.filterWork('design')
      }
    }
  }
}
</script>
