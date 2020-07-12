<template>
  <ColumnContainer>
    <Column>
      <div class="newsletter">
        <p class="large">
          Sign up to our newsletter
        </p>
        <div class="form">
          <div class="form__field">
            <input id="email" type="email" name="email" placeholder="Email address">
          </div>
          <button>Sign up</button>
        </div>
      </div>
    </Column>
    <Column>
      <div class="social">
        <img src="/about/image-instagram.png" alt="">
        <div class="social__links">
          <div>Follow us</div>
          <a href="" target="_blank" title="Opens in a new window" class="social__link arrowLink arrowLink--tiny">Instagram</a>
          <a href="" target="_blank" title="Opens in a new window" class="social__link">Twitter</a>
          <a href="" target="_blank" title="Opens in a new window" class="social__link">Linked in</a>
        </div>
      </div>
    </Column>
  </ColumnContainer>
</template>

<script>
export default {
  name: 'FollowUs',
  components: {
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column')
  }
}
</script>

<style lang="stylus" scoped>
>>> .column
  padding-bottom 0

.newsletter
  width 382px

  @media (max-width $bp-sm)
    width 100%
    padding 0 18px
    box-sizing border-box

.social
  width 100%
  display flex
  align-items center
  justify-content center

  @media (max-width $bp-sm)
    padding 0 18px
    box-sizing border-box

    img
      max-width 50%

  &__links
    margin-left auto
    padding-left 20px

  &__link
    display flex
</style>
