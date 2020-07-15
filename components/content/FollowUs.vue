<template>
  <ColumnContainer>
    <Column>
      <div class="newsletter">
        <p class="large">
          Sign up to our newsletter
        </p>
        <div class="form">
          <!-- Begin Mailchimp Signup Form -->
          <div id="mc_embed_signup">
            <form
              id="mc-embedded-subscribe-form"
              action="https://gramafilm.us2.list-manage.com/subscribe/post?u=b83507b88fd01b906b5675a41&amp;id=fe5b071194"
              method="post"
              name="mc-embedded-subscribe-form"
              class="validate"
              target="_blank"
              novalidate
            >
              <div id="mc_embed_signup_scroll">
                <div class="form__field mc-field-group">
                  <input id="mce-EMAIL" type="email" name="EMAIL" class="required email" placeholder="Email address">
                </div>
                <div id="mce-responses" class="clear">
                  <div id="mce-error-response" class="response" style="display:none" />
                  <div id="mce-success-response" class="response" style="display:none" />
                </div>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true">
                  <input type="text" name="b_b83507b88fd01b906b5675a41_fe5b071194" tabindex="-1" value="">
                </div>
                <div class="clear">
                  <button id="mc-embedded-subscribe" name="subscribe" type="submit" class="button">Sign up</button>
                </div>
              </div>
            </form>
          </div>
          <!--End mc_embed_signup-->
        </div>
      </div>
    </Column>
    <Column>
      <div class="social">
        <img src="/images/image-instagram.png" alt="">
        <div class="social__links">
          <div>Follow us</div>
          <a href="" target="_blank" title="Opens in a new window" class="social__link arrowLink arrowLink--hover">Instagram</a>
          <a href="" target="_blank" title="Opens in a new window" class="social__link arrowLink arrowLink--hover">Twitter</a>
          <a href="" target="_blank" title="Opens in a new window" class="social__link arrowLink arrowLink--hover">Linked in</a>
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
  },
  mounted () {
    const validateScript = document.createElement('script')
    validateScript.setAttribute('src', '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js')
    document.head.appendChild(validateScript)
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
