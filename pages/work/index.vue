<template>
  <div class="page">
    <Work v-if="work.id" :work="work" />
    <Loader v-else />
    <GetInTouch footer-links />
  </div>
</template>

<script>
import workQuery from '~/apollo/queries/work/work'
export default {
  components: {
    Work: () => import('~/components/pages/Work'),
    GetInTouch: () => import('~/components/content/GetInTouch'),
    Loader: () => import('~/components/content/Loader')
  },
  data () {
    return {
      work: {}
    }
  },
  apollo: {
    work: {
      prefetch: false,
      query: workQuery
    }
  }
}
</script>
