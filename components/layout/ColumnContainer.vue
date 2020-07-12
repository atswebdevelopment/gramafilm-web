<template>
  <div class="columns" :class="{'columns--center': center, 'columns--collapse-mobile': collapse === 'mobile', 'columns--collapse-tablet': collapse === 'tablet', 'columns--no-padding': noPadding}">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ColumnContainer',
  props: {
    collapse: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    },
    noPadding: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.columns
  display flex
  flex-direction row
  max-width 1440px
  margin 0 auto
  box-sizing border-box

  @media (max-width $bp-sm)
    display block

  &--center
    >>> .column
      align-self center

  &--no-padding
    >>> .column
      padding-bottom 3vh
//   @media (max-width $breakpoint-sm)
//     display block
// .collapse-tablet
//   @media (max-width $breakpoint-lg)
//     display block
// .collapse-mobile
//   @media (max-width $breakpoint-sm)
//     display block
</style>
