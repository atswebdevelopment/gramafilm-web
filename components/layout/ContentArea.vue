<template>
  <div class="section" :class="{ 'section--nopadding': noPadding, 'section--overflow': overflow, 'section--fullscreen': fullscreen, 'section--center': center }">
    <div class="inner" :class="{ 'inner--stretch': stretch }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentArea',
  props: {
    stretch: {
      type: Boolean,
      default: false
    },
    overflow: {
      type: Boolean,
      default: false
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.section
  position relative
  display block
  width 100%
  padding 8vh 0
  box-sizing border-box
  z-index 1
  overflow hidden

  @media (max-width $bp-xs)
    padding 3vh 0

  &--overflow
    overflow visible

  &--fullscreen
    height 100vh

  &--nopadding
    padding 0

  &--center
    display flex
    align-items center
    justify-content center

    @media (max-width $bp-sm)
      .inner
        flex 1

.inner
  padding 0 58px
  max-width 1800px
  margin 0 auto
  box-sizing border-box

  @media (max-width $bp-sm)
    padding 0 18px
</style>
