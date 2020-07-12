<template>
  <div class="container">
    <Header nologo />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      categories: []
    }
  }
}
</script>
