<template>
  <div class="quote">
    <blockquote>
      <slot name="quote" />
    </blockquote>
    <div class="cite">
      <slot name="cite" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quote'
}
</script>

<style lang="stylus" scoped>
.quote
  width 100%
  max-width 812px
  margin 0 auto
  padding-bottom 20vh

  @media (max-width $bp-sm)
    padding 6vh 0

  blockquote
    font-size 64px
    line-height 66px
    text-align left
    position relative
    margin 0 0 30px 0

    @media (max-width $bp-sm)
      font-size 40px
      line-height 42px
      margin 0 20px 30px

    // &:before
    //   content '“'
    //   position absolute
    //   left -20px
    //   top 0

    // &:after
    //   content '”'
    //   position absolute
    //   right -20px
    //   bottom 0

  .cite
    font-size 16px
    line-height 20px
    text-transform uppercase

    @media (max-width $bp-sm)
      margin 0 20px
</style>
