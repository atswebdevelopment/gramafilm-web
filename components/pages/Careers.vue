<template>
  <div class="careers">
    <ContentArea>
      <div class="heading">
        <h1 class="h1-small">
          {{ careers.title }}
        </h1>
      </div>
    </ContentArea>
    <ContentArea>
      <Slider v-if="careers.gallery && careers.gallery.length" :items="careers.gallery" />
    </ContentArea>
    <div class="positions">
      <div class="positions__inner">
        <h3>Open positions</h3>
      </div>
      <table class="positions__table">
        <thead>
          <tr>
            <th class="title">Position</th>
            <th>Contract type</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(job, index) in careers.jobs" :key="index" @click="openRow($event)">
            <td class="title">
              {{ job.title }}
              <span class="description">
                {{ job.description }}
                <a class="arrowLink arrowLink--small" :href="`mailto:apply@gramafilm.com?subject=${job.title}`" target="_blank">Apply now</a>
              </span>
            </td>
            <td>{{ type(job.type) }}</td>
            <td>{{ job.location }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    Slider: () => import('~/components/content/Slider')
  },
  props: {
    careers: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    this.$store.commit('header/setDefaultColor', 'black')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
  },
  methods: {
    type (type) {
      return type === 'fulltime' ? 'Full time' : type === 'parttime' ? 'Part time' : type === 'contract' ? 'Contract' : null
    },
    openRow (row) {
      const active = document.querySelector('.active')
      if (active) {
        active.classList.remove('active')
      }
      row.srcElement.classList.add('active')
    }
  }
}
</script>

<style lang="stylus" scoped>
.positions
  padding 0 0 12vh

  &__inner
    padding 0 58px
    max-width 1440px
    margin 0 auto
    box-sizing border-box

    @media (max-width $bp-sm)
      padding 0 18px

  &__table
    width 100%
    text-align center

    @media (max-width $bp-sm)
      text-align left

    tr
      position relative
      display block
      border-bottom 1px solid #DEDDDA
      vertical-align top

      .description
        display block
        overflow hidden
        margin-top 26px
        font-size 24px
        line-height 30px
        max-height 0
        transition max-height 0.5s $ease

        a
          margin 64px 0 54px
          justify-content left
          font-size 40px

      .active .description
        max-height 500px

    td, th
      width 50%
      text-align left
      max-width 150px
      padding 30px
      display inline-block
      font-size 24px
      line-height 30px

      @media (max-width $bp-sm)
        padding 0 18px 30px
        width auto

    th
      @media (max-width $bp-sm)
        display none

    td.title
      font-size 32px
      line-height 38px
      max-width 630px
      cursor pointer
      padding-top 30px

      @media (max-width $bp-sm)
        display block

    th.title
      font-size 24px
      line-height 30px
      max-width 630px
</style>
