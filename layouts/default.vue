<template>
  <div class="container">
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
export default {
  middleware: 'seo',
  components: {
    Header
  }
}
</script>
