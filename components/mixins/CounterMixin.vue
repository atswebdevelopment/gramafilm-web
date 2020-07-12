<script>
export default {
  name: 'CounterMixin',
  data () {
    return {
      startCounter: true,
      counters: [0, 0, 0, 0]
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      if (this.startCounter) {
        const counter = document.querySelector('.counter-container')
        if (counter) {
          const counterOffset = counter.getBoundingClientRect().top
          const counterHeight = counter.offsetHeight
          if (window.scrollY + window.innerHeight > counterOffset + (counterHeight * 2)) {
            if (document.querySelectorAll('.counter')[0]) {
              this.counters[0] = parseInt(document.querySelectorAll('.counter')[0].getAttribute('data-val'))
            }
            if (document.querySelectorAll('.counter')[1]) {
              this.counters[1] = parseInt(document.querySelectorAll('.counter')[1].getAttribute('data-val'))
            }
            if (document.querySelectorAll('.counter')[2]) {
              this.counters[2] = parseInt(document.querySelectorAll('.counter')[2].getAttribute('data-val'))
            }
            if (document.querySelectorAll('.counter')[3]) {
              this.counters[3] = parseInt(document.querySelectorAll('.counter')[3].getAttribute('data-val'))
            }
            this.startCounter = false
          }
        }
      }
    })
  }
}
</script>
