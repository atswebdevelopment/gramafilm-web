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
  max-width 1800px
  margin 0 auto
  box-sizing border-box

  @media (max-width $bp-sm)
    display block

  &--center
    >>> .column
      align-self center

  >>> .column--bottom
    align-self flex-end

  >>> .column--top
    align-self flex-start

  >>> .column--float
    margin-top 144px

    @media (max-width: $bp-sm)
      margin-top 0

  &--no-padding
    >>> .column
      padding-bottom 3vh
</style>
