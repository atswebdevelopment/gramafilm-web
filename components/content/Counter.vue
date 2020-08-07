<template>
  <client-only>
    <div class="counter">
      <div class="counter__val" :class="{'counter__val--m': unit === 'm', 'counter__val--k': unit === 'k'}">
        <ICountUp
          :options="options"
          :end-val="val"
        />
      </div>
      <div class="counter__text">
        <slot />
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    val: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    },
    startCounter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      options: {
        autoplay: false,
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.counter
  padding-bottom 10vh
  margin 0 auto
  text-align center

  @media (max-width $bp-sm)
    padding-bottom 5vh

  &__val
    font-size 152px
    line-height 120px
    text-align center
    letter-spacing -5px
    margin-bottom 2vh
    display inline

    @media (max-width $bp-sm)
      font-size 120px

    &:after
      font-size 72px
      line-height 0

    &--m:after
      content: 'm'

    &--k:after
      content: 'k'

  &__text
    margin-top 4vh
    color $black

    @media (max-width $bp-sm)
      margin-top 2vh
</style>
