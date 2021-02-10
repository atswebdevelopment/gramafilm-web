<template>
  <div class="mainMenu" :class="{ 'mainMenu--open': open, 'mainMenu--fixed': fixed }">
    <Navigation v-if="menu && menu.id && ready" :show="open" :menu="menu" @close-menu="closeMenu" />
  </div>
</template>

<script>
import menuQuery from '~/apollo/queries/pages/menu.gql'
export default {
  name: 'MainMenu',
  components: {
    Navigation: () => import('~/components/content/Navigation')
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: {},
      open: false,
      ready: false
    }
  },
  apollo: {
    menu: {
      prefetch: true,
      query: menuQuery
    }
  },
  watch: {
    show (val) {
      this.open = val
    }
  },
  mounted () {
    this.ready = true
  },
  methods: {
    closeMenu () {
      this.open = false
      this.$emit('close-menu')
    }
  }
}
</script>

<style lang="stylus" scoped>
.mainMenu
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  transform translateY(-150%)
  transition 0.35s $ease
  z-index 8

  &--hide
    display none

  &--open
    transform translateY(0%)

  &--fixed
    z-index 0
    transform translateY(0%)
</style>
