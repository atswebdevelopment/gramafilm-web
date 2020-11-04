<template>
  <div class="studio">
    <!-- <div v-for="(person, index) in people" :key="index" class="people__person fade fadeIn">
      <div class="people__inner">
        <img v-if="person.image" :src="person.image.url" :alt="person.image.alternativeText">
        <div class="people__text" v-html="person.content" />
      </div>
    </div> -->
    <div class="studio__column studio__column--left">
      <div class="studio__item">
        o
      </div>
    </div>
    <div class="studio__column studio__column--right">
      <div class="studio__item">
        o<br>o
      </div>
      <div class="studio__item">
        o
      </div>
      <div class="studio__item">
        o
      </div>
      <div class="studio__item">
        o
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudioNews',
  props: {
    // people: {
    //   type: Array,
    //   default: () => []
    // }
  },
  mounted () {
    //
  }
}
</script>

<style lang="stylus" scoped>
.studio
  display flex
  margin-top 96px

  &__column
    flex-grow 1
    flex-basis 0

  &__item
    display inline-block
    margin-left 32px
    width calc(50% - 36px)
    vertical-align top

  &__column--left
    .studio__item
      width 100%
      margin-left 0
</style>
