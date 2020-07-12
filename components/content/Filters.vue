<template>
  <div class="filters" :class="{ 'filters--active': filterToggle }">
    <div class="filters__toggle" @click="filterToggle = !filterToggle">
      Filter
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Filters',
  data () {
    return {
      filterToggle: false
    }
  }
}
</script>

<style lang="stylus">
.filters
  margin-left auto
  display flex

  @media (max-width $bp-sm)
    display block

  &__filter
    margin-left 60px
    opacity 0.5
    cursor pointer

    @media (max-width $bp-sm)
      margin 7px 0
      display none

    &--active
      opacity 1

  &__toggle
    margin 25px 0
    display none

    @media (max-width $bp-sm)
      display block

    &:after
      content '+'
      margin-left 10px

  &--active
    .filters__toggle:after
      content '-'

    .filters__filter
      display block
</style>
