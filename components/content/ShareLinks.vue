<template>
  <div class="shareLinks" :class="{ 'shareLinks--active': filterToggle }">
    <div>
      <span class="shareLinks__link" @click="filterToggle = !filterToggle"><b>Share</b></span>
      <a class="shareLinks__link" target="_blank" rel="noopener" title="Opens in a new window" href="https://www.instagram.com/gramafilm/?hl=en">Instagram</a>
      <a class="shareLinks__link" target="_blank" rel="noopener" title="Opens in a new window" href="https://www.facebook.com/Gramafilm/">Facebook</a>
      <a class="shareLinks__link" target="_blank" rel="noopener" title="Opens in a new window" href="https://uk.linkedin.com/organization-guest/company/gramafilm">LinkedIn</a>
      <a class="shareLinks__link" target="_blank" rel="noopener" title="Opens in a new window" href="https://www.youtube.com/gramafilm">YouTube</a>
      <a class="shareLinks__link" target="_blank" rel="noopener" title="Opens in a new window" href="https://twitter.com/Gramafilm">Twitter</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareLinks',
  data () {
    return {
      filterToggle: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.shareLinks
  box-sizing border-box
  font-size 16px
  line-height 19px
  text-align left

  &__link
    margin 0 15px
    color $black

      &--active
        opacity 1

    &:first-child
      margin-left 0

    &:last-child
      margin-right 0

  a
    @media (max-width $bp-sm)
      display none

    &:hover
      text-decoration underline

  @media (max-width $bp-sm)
    b:after
      content '+'
      margin-left 10px

  &--active
    @media (max-width $bp-sm)
      b:after
        content '-'

      a
        display block
        margin 10px 0 0
</style>
