<template>
  <Showcase>
    <ContentArea overflow>
      <div class="large" v-html="film.introduction" />
      <ColumnContainer v-if="film.counters" class="green counter-container">
        <Column v-for="(counter, index) in film.counters" :key="index">
          <Counter :start-counter="startCounter" :data-val="counter.number" :val="counters[index]" :unit="counter.unit">
            {{ counter.text }}
          </Counter>
        </Column>
      </ColumnContainer>
      <Modules :modules="film.modules" />
    </ContentArea>
    <GetInTouch footer-links />
  </Showcase>
</template>

<script>
import CounterMixin from '~/components/mixins/CounterMixin'
export default {
  components: {
    Showcase: () => import('~/components/layout/Showcase'),
    ContentArea: () => import('~/components/layout/ContentArea'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column'),
    Counter: () => import('~/components/content/Counter'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Modules: () => import('~/components/content/Modules')
  },
  mixins: [CounterMixin],
  props: {
    film: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'white')
    }, 200)
  }
}
</script>

<style lang="stylus" scoped>
>>> .large p a:after
  border-bottom 1px solid $green
</style>
