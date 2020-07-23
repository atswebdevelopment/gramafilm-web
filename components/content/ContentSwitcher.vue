<template>
  <ColumnContainer class="contentSwitcher">
    <Column v-if="!mirrored">
      <div class="contentSwitcher__tabs">
        <slot name="tabs" />
      </div>
    </Column>
    <Column>
      <div class="contentSwitcher__contentWindow">
        <slot name="contentWindow" />
      </div>
    </Column>
    <Column v-if="mirrored">
      <div class="contentSwitcher__tabs contentSwitcher__tabs--center">
        <slot name="tabs" />
      </div>
    </Column>
  </ColumnContainer>
</template>

<script>
export default {
  name: 'ContentSwitcher',
  components: {
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column')
  },
  props: {
    mirrored: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.ready()
  },
  methods: {
    ready () {
      if (!document.querySelectorAll('.contentSwitcher__tab').length > 0) {
        setTimeout(() => {
          this.ready()
        }, 100)
        return
      }
      document.querySelectorAll('.contentSwitcher__tab').forEach((e, i) => {
        e.onclick = () => {
          document.querySelector('.contentSwitcher__content--active').classList.remove('contentSwitcher__content--active')
          document.querySelector('.contentSwitcher__tab--active').classList.remove('contentSwitcher__tab--active')
          document.querySelectorAll('.contentSwitcher__content')[i].classList.add('contentSwitcher__content--active')
          document.querySelectorAll('.contentSwitcher__tab')[i].classList.add('contentSwitcher__tab--active')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.contentSwitcher >>> .column
  padding-top 5vh
  padding-left 0
  padding-right 0

>>> .contentSwitcher
  &__tabs--center
    margin 0 auto

    @media (max-width: $bp-sm)
      margin 0
      width 100%

  &__tab
    font-size 36px
    line-height 45px
    margin-bottom 8px
    opacity 0.25
    cursor pointer

    &:hover,
    &--active
      opacity 1

      @media (max-width: $bp-sm)
        .contentSwitcher__tabcontent
          display block
          margin-top 1em

  &__tabcontent
    display none
    font-size 24px
    line-height 30px

  &__contentWindow
    position relative
    width 100%

    @media (max-width: $bp-sm)
      display none

  &__content
    position absolute
    top 0
    left 0
    width 100%
    opacity 0
    transition 0.5s all $ease

    &--active
      position relative
      opacity 1
      z-index 1
</style>
