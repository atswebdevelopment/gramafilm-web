<template>
  <div class="work">
    <ContentArea>
      <div class="heading">
        <h1 class="h1-small">
          {{ work.title }}
        </h1>
        <Filters>
          <div class="filters__filter" :class="{ 'filters__filter--active': type === '' }" @click="filterWork('')">
            All
          </div>
          <div class="filters__filter" :class="{ 'filters__filter--active': type === 'film' }" @click="filterWork('film')">
            Film
          </div>
          <div class="filters__filter" :class="{ 'filters__filter--active': type === 'event' }" @click="filterWork('event')">
            Event
          </div>
          <div class="filters__filter" :class="{ 'filters__filter--active': type === 'design' }" @click="filterWork('design')">
            Design
          </div>
        </Filters>
      </div>
      <WorkPortfolio :filtered-work="filteredWork" />
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
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
  },
  methods: {
    filterWork (type) {
      if (type) {
        this.filteredWork = this.work.casestudies.filter(caseStudy => caseStudy.case_study.type && caseStudy.case_study.type === type)
      } else {
        this.filteredWork = []
      }
      this.type = type
    }
  }
}
</script>
