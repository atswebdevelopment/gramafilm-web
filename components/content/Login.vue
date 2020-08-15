<template>
  <div class="login">
    <div class="form form--alt">
      <div class="form__field">
        <input id="username" v-model="username" type="text" name="username" placeholder="Username">
      </div>
      <div class="form__field">
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
          @keyup.enter="login"
        >
      </div>
      <a class="form__link" href="mailto:email@email.com">Forgot password?</a>
      <button @click="login">
        Enter
      </button>
      <p v-if="err" class="error">
        {{ err }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      err: '',
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const data = {
        identifier: this.username,
        password: this.password
      }
      this.$axios
        .post(this.$config.strapiBaseUri + '/auth/local', data)
        .then(async (response) => {
          // Handle success.
          this.$store.commit('auth/setUser', {
            user: response.data.user,
            token: response.data.jwt
          })
          await this.$apolloHelpers.onLogin(response.data.jwt)
          this.$nuxt.$router.push({ name: 'clientarea' })
        })
        .catch((error) => {
          this.err = (error.response.data && error.response.data.message[0] && error.response.data.message[0].messages[0] && error.response.data.message[0].messages[0].message) || 'Incorrect login. Please try again.'
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  width 431px
  margin 0 auto

  @media (max-width $bp-sm)
    max-width 431px
    width 100%

.form__link
  margin-top 32px
  float left
  color $white
  font-size 16px
  text-decoration underline

.error
  color $negative
  text-align center
</style>
