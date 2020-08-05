<template>
  <Showcase>
    <ContentArea overflow>
      <div class="large" v-html="events.introduction" />
      <ColumnContainer v-if="events.counters" class="orange counter-container">
        <Column v-for="(counter, index) in events.counters" :key="index">
          <Counter :start-counter="startCounter" :data-val="counter.number" :val="counters[index]" :unit="counter.unit">
            {{ counter.text }}
          </Counter>
        </Column>
      </ColumnContainer>
      <Modules :modules="events.modules" />
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
    events: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    this.$store.commit('header/setDefaultColor', 'white')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'white')
    }, 200)
  }
}
</script>

<style lang="stylus" scoped>
>>> .large p a:after
  border-bottom 1px solid $orange
</style>
