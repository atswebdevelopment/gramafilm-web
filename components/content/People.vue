<template>
  <div class="people">
    <div v-for="(person, index) in people" :key="index" class="people__person fade fadeIn">
      <div class="people__inner">
        <img v-if="person.image" :src="person.image.url" :alt="person.image.alternativeText">
        <div class="people__text" v-html="person.content" />
      </div>
    </div>
  </div>
</template>

<script>
import fadeIn from '~/helpers/fadeIn'
export default {
  name: 'People',
  props: {
    people: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    fadeIn()
  }
}
</script>

<style lang="stylus" scoped>
.people
  display inline-block
  width 100%
  margin 60px 0

  @media (max-width $bp-sm)
    margin 20px 0

  &__person
    width 25%
    float left

    @media (max-width $bp-sm)
      width 100%
      float none
      display flex
      align-items center
      justify-content center

  &__inner
    padding 46px 20px
    font-size 16px
    line-height 20px

    @media (max-width $bp-sm)
      padding 40px 0 0

  &__text
    margin 1em 0

    >>> p
      margin 0
      font-family 'whyteregular'
      font-size 18px
      line-height 24px
</style>
