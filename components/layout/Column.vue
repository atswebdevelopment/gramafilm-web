<template>
  <div class="column" :class="{ 'column--empty': empty, 'column--wide': wide, 'column--wide-2': wideW2 }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Column',
  props: {
    empty: {
      type: Boolean,
      default: false
    },
    wide: {
      type: Boolean,
      default: false
    },
    wideW2: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.column
  display flex
  flex-wrap wrap
  flex-basis 0
  flex-grow 1
  padding 3vh 58px 20vh
  align-self flex-start
  align-items flex-start

  @media (max-width $bp-sm)
    padding 3vh 0

  &--wide
    flex-basis 15%

  &--wide-2
    flex-basis 35%

  &--empty
    padding 0 !important
</style>
